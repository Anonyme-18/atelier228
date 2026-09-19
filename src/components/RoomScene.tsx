/* ============================================================
   Maquette 3D interactive du showroom — Three.js.
   Composant lazy-loadé : le poids de three n'est chargé que
   lorsque le visiteur ouvre la page Visite 3D.
   ============================================================ */

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export interface ViewPreset {
  pos: [number, number, number];
  target: [number, number, number];
}

interface SceneApi {
  flyTo: (p: ViewPreset) => void;
  setLamps: (on: boolean) => void;
  setAutoRotate: (on: boolean) => void;
}

/* Palette du site, appliquée à la maquette */
const C = {
  deep: "#142821",
  pine: "#1f3d31",
  pineSoft: "#2c5243",
  bone: "#f2f0e9",
  sand: "#e4dfd0",
  oak: "#a9805a",
  oakDark: "#7c5c3f",
  brass: "#b0812f",
  brassSoft: "#d9bc7f",
  moss: "#5f7367",
  leaf: "#3e5d4a",
  charcoal: "#232b27",
  sky: "#ffe6b8",
};

/** Texture de parquet chêne générée en canvas — zéro asset externe. */
function makeWoodTexture(): THREE.CanvasTexture {
  const cv = document.createElement("canvas");
  cv.width = 512;
  cv.height = 512;
  const ctx = cv.getContext("2d")!;
  ctx.fillStyle = C.oak;
  ctx.fillRect(0, 0, 512, 512);
  const plankH = 64;
  for (let row = 0; row < 8; row++) {
    const y = row * plankH;
    const offset = (row % 2) * 128;
    // teinte variable par planche
    for (let col = -1; col < 5; col++) {
      const x = col * 256 + offset;
      const shade = 0.9 + ((row * 7 + col * 13) % 5) * 0.035;
      ctx.fillStyle = `rgba(${Math.round(169 * shade)},${Math.round(128 * shade)},${Math.round(90 * shade)},1)`;
      ctx.fillRect(x, y, 256, plankH);
      // fil du bois
      ctx.strokeStyle = "rgba(90,60,35,0.16)";
      ctx.lineWidth = 1;
      for (let g = 0; g < 7; g++) {
        const gy = y + 6 + g * 8 + ((col + row + g) % 3) * 2;
        ctx.beginPath();
        ctx.moveTo(x + 2, gy);
        ctx.bezierCurveTo(x + 80, gy + 3, x + 170, gy - 3, x + 254, gy + 1);
        ctx.stroke();
      }
      // joint vertical
      ctx.fillStyle = "rgba(60,40,24,0.35)";
      ctx.fillRect(x, y, 2, plankH);
    }
    // joint horizontal
    ctx.fillStyle = "rgba(60,40,24,0.4)";
    ctx.fillRect(0, y, 512, 2);
  }
  const tex = new THREE.CanvasTexture(cv);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2.4, 2);
  tex.anisotropy = 4;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export default function RoomScene({
  preset,
  lampsOn,
  autoRotate,
}: {
  preset: ViewPreset | null;
  lampsOn: boolean;
  autoRotate: boolean;
}) {
  const mountRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<SceneApi | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    /* ——— Renderer / caméra / contrôles ——— */
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(C.deep);
    scene.fog = new THREE.Fog(C.deep, 16, 30);

    const camera = new THREE.PerspectiveCamera(
      44,
      mount.clientWidth / Math.max(1, mount.clientHeight),
      0.1,
      80
    );
    camera.position.set(7.5, 4.8, 8.5);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.07;
    controls.minDistance = 2.4;
    controls.maxDistance = 14;
    controls.maxPolarAngle = 1.53;
    controls.target.set(0, 1.1, 0);
    // Le visiteur prend la main → la rotation auto s'efface
    const stopAutoOnInteract = () => {
      controls.autoRotate = false;
    };
    renderer.domElement.addEventListener("pointerdown", stopAutoOnInteract);

    /* ——— Matériaux ——— */
    const mat = {
      floor: new THREE.MeshStandardMaterial({
        map: makeWoodTexture(),
        roughness: 0.65,
      }),
      wallBone: new THREE.MeshStandardMaterial({ color: C.bone, roughness: 0.95 }),
      wallPine: new THREE.MeshStandardMaterial({ color: C.pine, roughness: 0.9 }),
      ceiling: new THREE.MeshStandardMaterial({ color: "#efece2", roughness: 1 }),
      oak: new THREE.MeshStandardMaterial({ color: C.oak, roughness: 0.6 }),
      oakDark: new THREE.MeshStandardMaterial({ color: C.oakDark, roughness: 0.6 }),
      brass: new THREE.MeshStandardMaterial({
        color: C.brass,
        roughness: 0.3,
        metalness: 0.85,
      }),
      fabricSand: new THREE.MeshStandardMaterial({ color: "#ddd6c2", roughness: 1 }),
      fabricPine: new THREE.MeshStandardMaterial({ color: C.pineSoft, roughness: 1 }),
      fabricBrass: new THREE.MeshStandardMaterial({ color: C.brassSoft, roughness: 1 }),
      rug: new THREE.MeshStandardMaterial({ color: "#e0dac8", roughness: 1 }),
      charcoal: new THREE.MeshStandardMaterial({ color: C.charcoal, roughness: 0.4, metalness: 0.2 }),
      screen: new THREE.MeshStandardMaterial({ color: "#101512", roughness: 0.2, metalness: 0.4 }),
      pot: new THREE.MeshStandardMaterial({ color: "#a2684a", roughness: 0.85 }),
      leaf: new THREE.MeshStandardMaterial({ color: C.leaf, roughness: 0.8, flatShading: true }),
      trunk: new THREE.MeshStandardMaterial({ color: "#5d4630", roughness: 0.9 }),
      sky: new THREE.MeshBasicMaterial({ color: C.sky }),
      bulb: new THREE.MeshStandardMaterial({
        color: "#fff2d8",
        emissive: "#ffd9a0",
        emissiveIntensity: 1.6,
        roughness: 0.4,
      }),
      shade: new THREE.MeshStandardMaterial({
        color: C.brassSoft,
        roughness: 0.5,
        metalness: 0.6,
        side: THREE.DoubleSide,
      }),
    };

    const disposables: Array<{ dispose: () => void }> = [];
    const geo = <T extends THREE.BufferGeometry>(g: T): T => {
      disposables.push(g);
      return g;
    };

    const add = (
      g: THREE.BufferGeometry,
      m: THREE.Material,
      x: number,
      y: number,
      z: number,
      opts: { cast?: boolean; receive?: boolean } = {}
    ) => {
      const mesh = new THREE.Mesh(g, m);
      mesh.position.set(x, y, z);
      mesh.castShadow = opts.cast ?? true;
      mesh.receiveShadow = opts.receive ?? true;
      scene.add(mesh);
      return mesh;
    };
    const box = (
      w: number,
      h: number,
      d: number,
      m: THREE.Material,
      x: number,
      y: number,
      z: number,
      opts?: { cast?: boolean; receive?: boolean }
    ) => add(geo(new THREE.BoxGeometry(w, h, d)), m, x, y, z, opts);

    /* ——— La pièce (7 × 5 × 2,9 m) ——— */
    const floor = add(
      geo(new THREE.PlaneGeometry(7, 5)),
      mat.floor,
      0,
      0,
      0,
      { cast: false }
    );
    floor.rotation.x = -Math.PI / 2;

    const ceil = add(geo(new THREE.PlaneGeometry(7, 5)), mat.ceiling, 0, 2.9, 0, {
      cast: false,
      receive: false,
    });
    ceil.rotation.x = Math.PI / 2;

    // Mur du fond — vert pin
    box(7, 2.9, 0.12, mat.wallPine, 0, 1.45, -2.55, { cast: false });
    // Mur de droite — os
    box(0.12, 2.9, 5, mat.wallBone, 3.55, 1.45, 0, { cast: false });
    // Plinthes laiton
    box(7, 0.07, 0.03, mat.oakDark, 0, 0.05, -2.48, { cast: false });
    box(0.03, 0.07, 5, mat.oakDark, 3.48, 0.05, 0, { cast: false });

    /* Mur de gauche avec fenêtre */
    box(0.12, 0.9, 5, mat.wallBone, -3.55, 0.45, 0, { cast: false }); // soubassement
    box(0.12, 0.5, 5, mat.wallBone, -3.55, 2.65, 0, { cast: false }); // linteau
    box(0.12, 1.5, 2.0, mat.wallBone, -3.55, 1.65, -1.5, { cast: false }); // trumeau arrière
    box(0.12, 1.5, 0.5, mat.wallBone, -3.55, 1.65, 2.25, { cast: false }); // trumeau avant
    // Cadre + meneaux
    const frameMat = mat.charcoal;
    box(0.08, 0.07, 2.55, frameMat, -3.5, 2.4, 0.75, { cast: false });
    box(0.08, 0.07, 2.55, frameMat, -3.5, 0.9, 0.75, { cast: false });
    box(0.08, 1.57, 0.07, frameMat, -3.5, 1.65, -0.5, { cast: false });
    box(0.08, 1.57, 0.07, frameMat, -3.5, 1.65, 2.0, { cast: false });
    box(0.06, 1.5, 0.05, frameMat, -3.5, 1.65, 0.75, { cast: false });
    // "Extérieur" lumineux
    const sky = add(geo(new THREE.PlaneGeometry(2.5, 1.5)), mat.sky, -3.85, 1.65, 0.75, {
      cast: false,
      receive: false,
    });
    sky.rotation.y = Math.PI / 2;

    /* ——— Meuble TV sur le mur vert ——— */
    box(3.0, 0.42, 0.42, mat.oak, 0, 0.21, -2.28);
    box(3.0, 0.03, 0.3, mat.oakDark, 0, 0.45, -2.28, { cast: false });
    // Écran
    box(1.7, 0.95, 0.05, mat.charcoal, 0, 1.55, -2.44, { cast: false });
    add(geo(new THREE.PlaneGeometry(1.6, 0.85)), mat.screen, 0, 1.55, -2.41, {
      cast: false,
      receive: false,
    });
    // Étagères + objets
    box(0.05, 1.15, 0.28, mat.oak, -2.1, 1.35, -2.32);
    box(0.05, 1.15, 0.28, mat.oak, -1.15, 1.35, -2.32);
    box(1.0, 0.035, 0.28, mat.oak, -1.62, 1.05, -2.32, { cast: false });
    box(1.0, 0.035, 0.28, mat.oak, -1.62, 1.5, -2.32, { cast: false });
    const bookCols = [mat.brass, mat.fabricPine, mat.oakDark, mat.fabricSand];
    for (let i = 0; i < 6; i++) {
      const material = bookCols[i % 4];
      if (material) {
        box(
          0.05,
          0.28 - (i % 3) * 0.05,
          0.2,
          material,
          -2.0 + i * 0.12,
          1.2 - ((i % 3) * 0.05) / 2,
          -2.32,
          { cast: false }
        );
      }
    }
    // Vase laiton
    const vase = add(geo(new THREE.CylinderGeometry(0.07, 0.09, 0.24, 16)), mat.brass, -1.35, 1.65, -2.32);
    vase.castShadow = false;

    /* ——— Canapé ——— */
    const sofaX = 0.2;
    box(2.3, 0.32, 0.95, mat.fabricSand, sofaX, 0.32, 0.95); // assise
    box(2.3, 0.55, 0.22, mat.fabricSand, sofaX, 0.72, 1.4); // dossier
    box(0.22, 0.55, 0.95, mat.fabricSand, sofaX - 1.04, 0.55, 0.95); // accoudoir G
    box(0.22, 0.55, 0.95, mat.fabricSand, sofaX + 1.04, 0.55, 0.95); // accoudoir D
    box(1.0, 0.14, 0.85, mat.fabricSand, sofaX - 0.5, 0.55, 0.9, { cast: false }); // coussins
    box(1.0, 0.14, 0.85, mat.fabricSand, sofaX + 0.5, 0.55, 0.9, { cast: false });
    box(0.5, 0.4, 0.12, mat.fabricPine, sofaX - 0.65, 0.78, 1.28); // coussins déco
    box(0.45, 0.36, 0.12, mat.fabricBrass, sofaX + 0.6, 0.76, 1.28);
    for (const lx of [-1.0, 1.0])
      for (const lz of [0.55, 1.35])
        box(0.05, 0.16, 0.05, mat.oakDark, sofaX + lx, 0.08, lz, { cast: false });

    /* ——— Tapis + table basse ——— */
    const rug = add(geo(new THREE.CircleGeometry(1.55, 48)), mat.rug, 0.2, 0.012, 0.05, {
      cast: false,
    });
    rug.rotation.x = -Math.PI / 2;
    box(1.05, 0.055, 0.58, mat.oak, 0.2, 0.42, 0.05);
    for (const lx of [-0.45, 0.45])
      for (const lz of [-0.22, 0.22])
        box(0.035, 0.4, 0.035, mat.brass, 0.2 + lx, 0.2, 0.05 + lz, { cast: false });
    box(0.32, 0.035, 0.24, mat.fabricPine, 0.02, 0.47, 0.05, { cast: false }); // livres
    box(0.28, 0.03, 0.2, mat.brass, 0.03, 0.5, 0.05, { cast: false });
    const bowl = add(geo(new THREE.SphereGeometry(0.08, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2)), mat.brass, 0.45, 0.45, 0.1, { cast: false });
    bowl.scale.y = 0.5;

    /* ——— Bibliothèque mur droit ——— */
    box(0.06, 2.2, 0.32, mat.oak, 3.35, 1.1, -0.6);
    box(0.06, 2.2, 0.32, mat.oak, 3.35, 1.1, 0.6);
    for (let i = 0; i < 5; i++)
      box(0.32, 0.035, 1.25, mat.oak, 3.35, 0.3 + i * 0.45, 0, { cast: false });
    for (let i = 0; i < 8; i++) {
      const material = bookCols[(i + 1) % 4];
      if (material) {
        box(
          0.2,
          0.26 - (i % 4) * 0.04,
          0.055,
          material,
          3.35,
          0.45 + Math.floor(i / 4) * 0.9 - ((i % 4) * 0.04) / 2,
          -0.42 + (i % 4) * 0.24,
          { cast: false }
        );
      }
    }

    /* ——— Lampadaire arc (laiton) ——— */
    const lampX = -2.55;
    const lampZ = -1.7;
    add(geo(new THREE.CylinderGeometry(0.16, 0.2, 0.04, 24)), mat.charcoal, lampX, 0.02, lampZ, { cast: false });
    add(geo(new THREE.CylinderGeometry(0.022, 0.022, 1.85, 12)), mat.brass, lampX, 0.95, lampZ);
    const arc = add(geo(new THREE.TorusGeometry(0.55, 0.02, 8, 24, Math.PI / 2)), mat.brass, lampX + 0.55, 1.87, lampZ);
    arc.rotation.z = Math.PI;
    arc.rotation.y = Math.PI / 2;
    add(geo(new THREE.CylinderGeometry(0.02, 0.02, 0.3, 8)), mat.brass, lampX + 1.1, 1.72, lampZ);
    const arcShade = add(geo(new THREE.CylinderGeometry(0.14, 0.2, 0.22, 24, 1, true)), mat.shade, lampX + 1.1, 1.6, lampZ);
    arcShade.castShadow = false;
    const arcBulb = add(geo(new THREE.SphereGeometry(0.05, 12, 10)), mat.bulb, lampX + 1.1, 1.56, lampZ, { cast: false });

    /* ——— Suspensions au-dessus de la table basse ——— */
    const pendants: { bulb: THREE.Mesh; light: THREE.PointLight }[] = [];
    const makePendant = (x: number, z: number, drop: number) => {
      add(geo(new THREE.CylinderGeometry(0.008, 0.008, drop, 6)), mat.charcoal, x, 2.9 - drop / 2, z, { cast: false });
      const shade = add(geo(new THREE.CylinderGeometry(0.05, 0.17, 0.2, 24, 1, true)), mat.shade, x, 2.9 - drop - 0.08, z, { cast: false });
      void shade;
      const bulb = add(geo(new THREE.SphereGeometry(0.045, 12, 10)), mat.bulb, x, 2.9 - drop - 0.1, z, { cast: false });
      const light = new THREE.PointLight("#ffd9a0", 6, 7, 1.8);
      light.position.set(x, 2.9 - drop - 0.15, z);
      light.castShadow = false;
      scene.add(light);
      pendants.push({ bulb, light });
    };
    makePendant(-0.15, 0.05, 0.85);
    makePendant(0.55, 0.05, 1.05);

    /* ——— Plante près de la fenêtre ——— */
    const plant = (x: number, z: number, s: number) => {
      add(geo(new THREE.CylinderGeometry(0.16 * s, 0.12 * s, 0.3 * s, 16)), mat.pot, x, 0.15 * s, z);
      add(geo(new THREE.CylinderGeometry(0.02 * s, 0.03 * s, 0.7 * s, 8)), mat.trunk, x, 0.6 * s, z);
      const fol = new THREE.Group();
      for (let i = 0; i < 5; i++) {
        const blob = new THREE.Mesh(geo(new THREE.IcosahedronGeometry(0.22 * s, 0)), mat.leaf);
        blob.position.set(
          x + Math.cos((i / 5) * Math.PI * 2) * 0.16 * s,
          1.0 * s + (i % 2) * 0.18 * s,
          z + Math.sin((i / 5) * Math.PI * 2) * 0.16 * s
        );
        blob.castShadow = true;
        fol.add(blob);
      }
      scene.add(fol);
    };
    plant(-2.8, 1.7, 1.15);
    plant(2.9, 1.9, 0.8);

    /* ——— Fauteuil d'appoint ——— */
    box(0.75, 0.3, 0.7, mat.fabricPine, 2.1, 0.3, 1.1);
    box(0.75, 0.5, 0.16, mat.fabricPine, 2.1, 0.62, 1.42);
    box(0.16, 0.42, 0.7, mat.fabricPine, 1.75, 0.48, 1.1);
    box(0.16, 0.42, 0.7, mat.fabricPine, 2.45, 0.48, 1.1);
    const stool = add(geo(new THREE.CylinderGeometry(0.2, 0.2, 0.05, 24)), mat.oak, 2.1, 0.5, 0.45);
    stool.castShadow = true;
    add(geo(new THREE.CylinderGeometry(0.02, 0.02, 0.5, 8)), mat.brass, 2.1, 0.25, 0.45, { cast: false });

    /* ——— Lumières ——— */
    scene.add(new THREE.HemisphereLight("#f4ead2", "#22301f", 0.55));
    const sun = new THREE.DirectionalLight("#ffdfae", 2.6);
    sun.position.set(-7, 6.5, 2.5);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.left = -8;
    sun.shadow.camera.right = 8;
    sun.shadow.camera.top = 8;
    sun.shadow.camera.bottom = -8;
    sun.shadow.camera.far = 30;
    sun.shadow.bias = -0.0004;
    scene.add(sun);
    const fill = new THREE.DirectionalLight("#cfe3d8", 0.5);
    fill.position.set(5, 4, 6);
    scene.add(fill);
    const arcLight = new THREE.PointLight("#ffd9a0", 5, 6, 1.8);
    arcLight.position.set(lampX + 1.1, 1.5, lampZ);
    scene.add(arcLight);

    /* ——— API exposée au composant parent ——— */
    let pending: ViewPreset | null = null;
    const vPos = new THREE.Vector3();
    const vTgt = new THREE.Vector3();

    apiRef.current = {
      flyTo: (p) => {
        pending = p;
      },
      setLamps: (on) => {
        const i = on ? 1 : 0;
        arcLight.intensity = 5 * i;
        arcBulb.visible = on;
        for (const p of pendants) {
          p.light.intensity = 6 * i;
          p.bulb.visible = on;
        }
      },
      setAutoRotate: (on) => {
        controls.autoRotate = on;
        controls.autoRotateSpeed = 0.7;
      },
    };
    apiRef.current.setLamps(lampsOn);
    apiRef.current.setAutoRotate(autoRotate);

    /* ——— Boucle de rendu + vol de caméra amorti ——— */
    const clock = new THREE.Clock();
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(clock.getDelta(), 0.05);
      if (pending) {
        const k = 1 - Math.exp(-3.2 * dt);
        vPos.set(...pending.pos);
        vTgt.set(...pending.target);
        camera.position.lerp(vPos, k);
        controls.target.lerp(vTgt, k);
        if (camera.position.distanceTo(vPos) < 0.03) pending = null;
      }
      controls.update();
      renderer.render(scene, camera);
    };
    tick();

    const ro = new ResizeObserver(() => {
      const w = mount.clientWidth;
      const h = Math.max(1, mount.clientHeight);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    ro.observe(mount);

    /* ——— Nettoyage complet ——— */
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      renderer.domElement.removeEventListener("pointerdown", stopAutoOnInteract);
      controls.dispose();
      for (const d of disposables) d.dispose();
      Object.values(mat).forEach((m) => m.dispose());
      (mat.floor.map as THREE.Texture | null)?.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement === mount)
        mount.removeChild(renderer.domElement);
      apiRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Synchronisation des props vers la scène */
  const presetApplied = useRef<ViewPreset | null>(null);
  useEffect(() => {
    if (preset && preset !== presetApplied.current) {
      presetApplied.current = preset;
      apiRef.current?.flyTo(preset);
    }
  }, [preset]);
  useEffect(() => {
    apiRef.current?.setLamps(lampsOn);
  }, [lampsOn]);
  useEffect(() => {
    apiRef.current?.setAutoRotate(autoRotate);
  }, [autoRotate]);

  return <div ref={mountRef} className="h-full w-full cursor-grab active:cursor-grabbing" />;
}

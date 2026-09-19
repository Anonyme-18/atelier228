import { Component, lazy, Suspense, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { CTABand } from "../components/cards";
import {
  ButtonLink,
  cx,
  IconEye,
  IconSparkle,
  Overline,
  prefersReducedMotion,
  Reveal,
} from "../components/ui";
import { trackCta } from "../lib/analytics";
import { usePageMeta } from "../lib/usePageMeta";

const RoomScene = lazy(() => import("../components/RoomScene"));
import type { ViewPreset } from "../components/RoomScene";

/* ——— Points de vue caméra ——— */
const VIEWS: { id: string; label: string; preset: ViewPreset }[] = [
  {
    id: "overview",
    label: "Vue d'ensemble",
    preset: { pos: [6.2, 4.2, 7.2], target: [0, 1.0, 0] },
  },
  {
    id: "sofa",
    label: "Le salon",
    preset: { pos: [0.2, 1.5, 4.6], target: [0.2, 0.9, -0.4] },
  },
  {
    id: "media",
    label: "Le meuble TV",
    preset: { pos: [-1.6, 1.5, 1.2], target: [-0.4, 1.2, -2.3] },
  },
  {
    id: "window",
    label: "La lumière",
    preset: { pos: [1.4, 1.6, 1.8], target: [-3.4, 1.5, 0.7] },
  },
];

function LoadingFallback() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-5 bg-deep">
      <svg viewBox="0 0 120 80" className="h-20 w-28 text-brasssoft" fill="none" aria-hidden="true">
        {/* wireframe isométrique animé */}
        <g stroke="currentColor" strokeWidth="1.2">
          <path d="M60 8 104 30v30L60 82 16 60V30Z" className="pulse-soft" />
          <path d="M16 30l44 22 44-22M60 52v30" />
          <path d="M38 19v22l22 11 22-11V19" className="dim-fade" />
        </g>
      </svg>
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-paper/60">
        Construction de la maquette 3D…
      </p>
    </div>
  );
}

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed) {
      return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-deep px-6 text-center">
          <p className="font-display text-2xl font-medium text-paper">
            La maquette 3D n'a pas pu s'afficher.
          </p>
          <p className="max-w-md text-sm text-paper/60">
            Votre navigateur ne prend peut-être pas en charge WebGL. Nos réalisations en photos
            restent disponibles — et votre devis aussi.
          </p>
          <ButtonLink to="/realisations" variant="outlineLight">
            Voir les réalisations
          </ButtonLink>
        </div>
      );
    }
    return this.props.children;
  }
}

function Toggle({
  on,
  onClick,
  label,
  icon,
}: {
  on: boolean;
  onClick: () => void;
  label: string;
  icon: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={cx(
        "inline-flex h-11 cursor-pointer items-center gap-2.5 rounded-[3px] border px-4 text-[12px] font-semibold uppercase tracking-[0.12em] transition-all duration-300",
        on
          ? "border-brasssoft bg-brass text-deep"
          : "border-paper/25 text-paper/75 hover:border-paper/60 hover:text-paper"
      )}
    >
      {icon}
      {label}
    </button>
  );
}

export default function Visite3D() {
  usePageMeta(
    "Visite 3D du showroom — Atelier 228, Lomé",
    "Explorez en 3D le salon témoin d'Atelier 228 : matériaux, mobilier sur mesure, lumière. Tournez, zoomez, changez de point de vue — puis demandez votre devis."
  );

  const [viewId, setViewId] = useState("overview");
  const [lampsOn, setLampsOn] = useState(true);
  const [autoRotate, setAutoRotate] = useState(() => !prefersReducedMotion());
  const [activePreset, setActivePreset] = useState<ViewPreset | null>(null);

  const goView = (v: (typeof VIEWS)[number]) => {
    setViewId(v.id);
    setActivePreset({ ...v.preset });
    trackCta(`visite3d_vue_${v.id}`);
  };

  return (
    <>
      {/* ——— Scène plein écran ——— */}
      <section
        className="relative h-[74vh] min-h-[480px] w-full overflow-hidden bg-deep lg:h-[80vh]"
        aria-label="Maquette 3D interactive du salon témoin"
      >
        <SceneBoundary>
          <Suspense fallback={<LoadingFallback />}>
            <RoomScene preset={activePreset} lampsOn={lampsOn} autoRotate={autoRotate} />
          </Suspense>
        </SceneBoundary>

        {/* Superposition éditoriale */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 bg-gradient-to-b from-night/85 to-transparent">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 pb-10 pt-24 sm:px-8 sm:pt-32">
            <Reveal>
              <Overline tone="light">Visite 3D · Salon témoin</Overline>
            </Reveal>
            <Reveal delay={90}>
              <h1 className="max-w-2xl font-display text-3xl font-medium leading-[1.06] text-paper sm:text-5xl lg:text-[3.4rem]">
                Entrez dans la pièce, <em className="italic text-brasssoft">tournez autour.</em>
              </h1>
            </Reveal>
            <Reveal delay={180}>
              <p className="max-w-xl text-sm leading-relaxed text-paper/65 sm:text-base">
                Le salon témoin d'Atelier 228 modélisé en 3D — les mêmes matériaux, les mêmes
                teintes que sur nos chantiers. Glissez pour tourner, pincez ou molette pour zoomer.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Barre de contrôles */}
        <div className="absolute inset-x-0 bottom-0 z-10">
          <div className="mx-auto max-w-7xl px-5 pb-5 sm:px-8">
            <Reveal delay={260}>
              <div className="flex flex-col gap-2.5 lg:flex-row lg:items-center">
                {/* Points de vue : une rangée défilable sur mobile */}
                <div className="-mx-1 flex items-center gap-2 overflow-x-auto px-1 scrollbar-none lg:overflow-visible">
                  <span className="hidden shrink-0 items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-paper/50 sm:inline-flex">
                    <IconEye className="h-4 w-4 text-brasssoft" />
                    Points de vue
                  </span>
                  {VIEWS.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => goView(v)}
                      aria-pressed={viewId === v.id}
                      className={cx(
                        "shrink-0 cursor-pointer rounded-[3px] px-4 py-2.5 text-[12px] font-semibold uppercase tracking-[0.12em] transition-all duration-300",
                        viewId === v.id
                          ? "bg-brass text-deep"
                          : "border border-paper/25 text-paper/75 hover:border-paper/60 hover:text-paper"
                      )}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
                <span className="hidden h-6 w-px shrink-0 bg-paper/20 lg:block" />
                {/* Interrupteurs */}
                <div className="flex flex-wrap items-center gap-2">
                  <Toggle
                    on={lampsOn}
                    onClick={() => {
                      setLampsOn(!lampsOn);
                      trackCta("visite3d_lumieres");
                    }}
                    label={lampsOn ? "Lumières allumées" : "Lumières éteintes"}
                    icon={<IconSparkle className="h-4 w-4" />}
                  />
                  <Toggle
                    on={autoRotate}
                    onClick={() => setAutoRotate(!autoRotate)}
                    label="Rotation auto"
                    icon={
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        className="h-4 w-4"
                        aria-hidden="true"
                      >
                        <path d="M20 12a8 8 0 1 1-2.3-5.6" />
                        <path d="M20 3v4h-4" />
                      </svg>
                    }
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ——— Lecture éditoriale ——— */}
      <section className="border-b border-ink/10 bg-paper py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <Overline>Pourquoi une maquette 3D&nbsp;?</Overline>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-ink sm:text-4xl">
                  Juger un intérieur{" "}
                  <em className="italic text-brassdark">avant le premier coup de marteau.</em>
                </h2>
              </Reveal>
              <Reveal delay={150}>
                <p className="mt-6 leading-relaxed text-ink/70">
                  Sur nos chantiers, la modélisation 3D sert à valider les volumes, la circulation
                  et la lumière avec vous — avant d'engager le moindre budget. Ce salon témoin
                  reprend les matériaux que nous posons réellement : chêne, laiton, enduits, vert
                  profond.
                </p>
              </Reveal>
              <Reveal delay={220}>
                <p className="mt-4 leading-relaxed text-ink/70">
                  Chaque projet démarre ainsi : on tourne autour de la pièce ensemble, on ajuste,
                  puis on chiffre précisément.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <div className="grid gap-px overflow-hidden rounded-[4px] border border-ink/10 bg-ink/10 sm:grid-cols-2">
                {[
                  {
                    n: "01",
                    t: "Volumes & circulation",
                    d: "Vérifier que chaque mètre carré est utile avant de casser la moindre cloison.",
                  },
                  {
                    n: "02",
                    t: "Lumière naturelle",
                    d: "Tester l'orientation des ouvertures et l'ambiance du soir, lumières allumées.",
                  },
                  {
                    n: "03",
                    t: "Matériaux & teintes",
                    d: "Comparer chêne, laiton, enduits et tissus dans le même espace, en conditions réelles.",
                  },
                  {
                    n: "04",
                    t: "Chiffrage précis",
                    d: "Un projet validé en 3D, c'est un devis sans mauvaises surprises en cours de chantier.",
                  },
                ].map((item, i) => (
                  <Reveal key={item.n} delay={i * 90}>
                    <div className="group h-full bg-paper p-7 transition-colors duration-300 hover:bg-sand lg:p-8">
                      <span className="font-display text-2xl italic text-brassdark">{item.n}</span>
                      <h3 className="mt-3 font-display text-xl font-medium text-ink">{item.t}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink/65">{item.d}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
              <Reveal delay={200}>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <ButtonLink to="/contact?type=Aménagement intérieur" trackSource="visite3d_cta">
                    Demander un devis
                  </ButtonLink>
                  <Link
                    to="/realisations"
                    className="group inline-flex items-center gap-2 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-brassdark"
                  >
                    <span className="link-line">Voir les chantiers réels</span>
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <CTABand
        source="visite3d_bas"
        title={
          <>
            Cette pièce vous plaît&nbsp;?{" "}
            <em className="italic text-brasssoft">Imaginons la vôtre.</em>
          </>
        }
        text="Décrivez votre intérieur actuel : nous modélisons, vous validez, nous réalisons."
      />
    </>
  );
}

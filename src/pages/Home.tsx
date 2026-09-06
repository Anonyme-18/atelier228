import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ButtonLink,
  IconArrowRight,
  IconCalendar,
  IconCheck,
  IconDoc,
  IconEye,
  IconPerson,
  IconSparkle,
  Img,
  LinesReveal,
  Marquee,
  Overline,
  Reveal,
  SectionHead,
} from "../components/ui";
import {
  ProcessSteps,
  ProjectCard,
  ServiceLine,
} from "../components/cards";
import { consumeAnchor } from "../components/chrome";
import {
  CONTACT,
  IMAGES,
  PROJECTS,
  REASONS,
  SERVICES,
} from "../data/content";
import { trackCta } from "../lib/analytics";
import { usePageMeta } from "../lib/usePageMeta";

const REASON_ICONS = {
  interlocuteur: IconPerson,
  devis: IconDoc,
  planning: IconCalendar,
  execution: IconEye,
  chantier: IconSparkle,
} as const;

/* Cotes façon dessin d'architecte au-dessus du visuel hero */
function DimensionLines() {
  return (
    <svg
      className="dim-fade absolute -top-6 left-0 right-0 hidden w-full text-brasssoft/80 lg:block"
      viewBox="0 0 400 24"
      fill="none"
      aria-hidden="true"
    >
      <path d="M0 12h168M232 12h168" stroke="currentColor" strokeWidth="1" />
      <path d="M0 6v12M400 6v12M168 6v12M232 6v12" stroke="currentColor" strokeWidth="1" />
      <text
        x="200"
        y="16"
        textAnchor="middle"
        fill="currentColor"
        fontSize="10"
        letterSpacing="3"
        fontFamily="Archivo, sans-serif"
      >
        PIÈCE DE VIE — APRÈS TRAVAUX
      </text>
    </svg>
  );
}

export default function Home() {
  usePageMeta(
    "Atelier 228 — Rénovation & Aménagement intérieur à Lomé, Togo",
    "Rénovation complète, aménagement intérieur, cuisines et salles de bain à Lomé. Un interlocuteur unique, un devis détaillé gratuit, des finitions soignées."
  );

  /* Navigation "L'entreprise" depuis le header */
  useEffect(() => {
    const anchor = consumeAnchor();
    if (anchor) {
      const t = setTimeout(() => {
        document.getElementById(anchor)?.scrollIntoView({ block: "start" });
      }, 120);
      return () => clearTimeout(t);
    }
  }, []);

  const featured = PROJECTS.filter((p) => p.featured)[0] ?? PROJECTS[0];
  const others = PROJECTS.filter((p) => p.slug !== featured.slug);

  return (
    <>
      {/* ═══════════ HERO — la réalisation en premier ═══════════ */}
      <section className="relative overflow-hidden bg-deep text-paper">
        {/* halo discret */}
        <div
          className="pointer-events-none absolute -right-40 top-0 h-[42rem] w-[42rem] rounded-full opacity-[0.07]"
          style={{
            background:
              "radial-gradient(circle, var(--color-brasssoft) 0%, transparent 65%)",
          }}
          aria-hidden="true"
        />
        <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-14 pt-28 sm:px-8 lg:grid-cols-12 lg:items-center lg:gap-14 lg:pb-20 lg:pt-40">
          <div className="relative z-10 lg:col-span-6">
            <Reveal>
              <Overline tone="light">
                Rénovation · Aménagement — Lomé, Togo
              </Overline>
            </Reveal>
            <h1 className="mt-6 font-display text-[2.6rem] font-medium leading-[1.04] sm:text-6xl lg:text-[4.2rem]">
              <LinesReveal
                lines={[
                  <>Votre intérieur,</>,
                  <>
                    pensé et réalisé{" "}
                  </>,
                  <>
                    <em className="italic text-brasssoft">dans les règles de l'art.</em>
                  </>,
                ]}
              />
            </h1>
            <Reveal delay={350}>
              <p className="mt-7 max-w-xl text-base leading-relaxed text-paper/70 sm:text-lg">
                Atelier 228 pilote votre projet de bout en bout : rénovation
                complète, aménagement sur mesure, cuisines et salles de bain.
                Un interlocuteur unique, un devis détaillé, des finitions
                soignées.
              </p>
            </Reveal>
            <Reveal delay={430}>
              <div className="mt-9 flex flex-col gap-3.5 sm:flex-row">
                <ButtonLink
                  to="/contact"
                  trackSource="hero"
                  className="h-13 px-8 text-[13px]"
                >
                  Demander un devis
                </ButtonLink>
                <ButtonLink
                  to="/realisations"
                  variant="outlineLight"
                  trackSource="hero_secondaire"
                  className="h-13 px-8 text-[13px]"
                >
                  Voir nos réalisations
                </ButtonLink>
              </div>
            </Reveal>
            <Reveal delay={510}>
              <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-paper/12 pt-6 text-[13px] text-paper/60">
                <li className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rotate-45 bg-brasssoft" />
                  Lomé et environs
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rotate-45 bg-brasssoft" />
                  Particuliers & professionnels
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rotate-45 bg-brasssoft" />
                  Devis détaillé gratuit
                </li>
              </ul>
            </Reveal>
          </div>

          <div className="relative lg:col-span-6 lg:pt-2">
            <DimensionLines />
            <div className="group relative">
              <Img
                src={IMAGES.hero}
                alt="Pièce de vie rénovée par Atelier 228 à Lomé : sofa vert sapin, bois chaud et lumière traversante"
                ratio="aspect-[4/3]"
                kenburns
                eager
                className="rounded-[4px]"
              />
              <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-[3px] bg-deep/85 px-4 py-3 backdrop-blur-sm">
                <span className="pulse-soft h-2 w-2 rounded-full bg-brasssoft" />
                <span className="text-[12px] font-medium tracking-wide text-paper/90">
                  Visite sur site & devis — gratuits
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ Marquee éditorial ═══════════ */}
      <Marquee
        items={[
          ...SERVICES.map((s) => s.name),
          "Lomé — Togo",
          "Devis gratuit",
        ]}
      />

      {/* ═══════════ 01 — Services ═══════════ */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28" aria-labelledby="services-titre">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHead
            overline="01 · Nos services"
            title={
              <span id="services-titre">
                Quatre savoir-faire,{" "}
                <em className="italic text-brassdark">un même niveau d'exigence.</em>
              </span>
            }
            intro="Chaque prestation est menée par une équipe dédiée, avec des matériaux choisis pour durer sous climat tropical."
          />
          <Reveal delay={200} className="shrink-0">
            <ButtonLink
              to="/services"
              variant="outlineDark"
              trackSource="accueil_services"
            >
              Découvrir nos services
            </ButtonLink>
          </Reveal>
        </div>

        <div className="mt-12 border-b border-ink/12">
          {SERVICES.map((s, i) => (
            <ServiceLine
              key={s.slug}
              index={s.index}
              title={s.name}
              short={s.short}
              image={s.image}
              imageAlt={s.imageAlt}
              slug={s.slug}
              quoteType={s.name}
              delay={i * 70}
            />
          ))}
        </div>
      </section>

      {/* ═══════════ 02 — Réalisations (la preuve) ═══════════ */}
      <section className="bg-night py-20 text-paper lg:py-28" aria-labelledby="real-titre">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHead
              overline="02 · Nos réalisations"
              tone="light"
              title={
                <span id="real-titre">
                  Nous préférons <em className="italic text-brasssoft">prouver</em>{" "}
                  que promettre.
                </span>
              }
              intro="Des chantiers livrés à Lomé, photographiés tels quels. Jugez par vous-même du niveau de finition."
            />
            <Reveal delay={200} className="shrink-0">
              <ButtonLink
                to="/realisations"
                variant="outlineLight"
                trackSource="accueil_realisations"
              >
                Voir toutes nos réalisations
              </ButtonLink>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2">
            <div className="sm:row-span-2">
              <ProjectCard project={featured} aspect="aspect-[4/5] sm:h-full" />
            </div>
            {others.slice(0, 2).map((p, i) => (
              <ProjectCard key={p.slug} project={p} aspect="aspect-[4/3]" delay={100 + i * 90} />
            ))}
          </div>

          {others.length > 2 && (
            <div className="mt-12">
              <ProjectCard project={others[2]} aspect="aspect-[21/9]" delay={140} />
            </div>
          )}
        </div>
      </section>

      {/* ═══════════ 02bis — Teaser visite 3D ═══════════ */}
      <section className="relative overflow-hidden bg-pine text-paper" aria-labelledby="visite3d-titre">
        {/* grille de fond façon plan d'architecte */}
        <svg className="absolute inset-0 h-full w-full opacity-[0.06]" aria-hidden="true">
          <defs>
            <pattern id="grid3d" width="42" height="42" patternUnits="userSpaceOnUse">
              <path d="M42 0H0v42" fill="none" stroke="#f2f0e9" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid3d)" />
        </svg>

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:py-24">
          <div>
            <Reveal>
              <Overline tone="light">Nouveau · Visite 3D</Overline>
            </Reveal>
            <Reveal delay={80}>
              <h2 id="visite3d-titre" className="mt-4 font-display text-3xl font-medium leading-[1.08] sm:text-4xl lg:text-[2.75rem]">
                Entrez dans notre salon témoin,{" "}
                <em className="italic text-brasssoft">en 3D.</em>
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <p className="mt-5 max-w-xl leading-relaxed text-paper/70">
                Tournez autour de la pièce, allumez les lampes, changez de point
                de vue. La même méthode que sur nos chantiers : on valide
                l'espace en maquette avant de poser le premier matériau.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink to="/visite-3d" trackSource="accueil_visite3d">
                  Explorer la visite 3D
                </ButtonLink>
                <ButtonLink
                  to="/realisations"
                  variant="outlineLight"
                  trackSource="accueil_visite3d_real"
                >
                  Voir les chantiers réels
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          {/* Maquette isométrique dessinée */}
          <Reveal delay={180} className="relative">
            <svg
              viewBox="0 0 340 270"
              className="mx-auto w-full max-w-md"
              fill="none"
              role="img"
              aria-label="Illustration isométrique du salon témoin modélisé en 3D"
            >
              {/* sol */}
              <path d="M170 218 292 157 170 96 48 157Z" fill="#1a332a" stroke="#f2f0e9" strokeOpacity="0.5" />
              {/* mur gauche */}
              <path d="M48 157 170 96V30L48 91Z" fill="#152a22" stroke="#f2f0e9" strokeOpacity="0.5" />
              {/* mur droit */}
              <path d="M170 96 292 157V91L170 30Z" fill="#12241d" stroke="#f2f0e9" strokeOpacity="0.5" />
              {/* fenêtre mur gauche */}
              <path d="M72 128 130 99V64L72 93Z" fill="#ffe6b8" fillOpacity="0.85" stroke="#d9bc7f" />
              <path d="M101 113.5V81" stroke="#1f3d31" strokeWidth="2" />
              {/* canapé */}
              <g className="dim-fade">
                <path d="M150 196 218 162 196 151 128 185Z" fill="#5f7367" stroke="#f2f0e9" strokeOpacity="0.35" />
                <path d="M128 185 150 196v-26l-22-11Z" fill="#4d5f55" stroke="#f2f0e9" strokeOpacity="0.35" />
                <path d="M128 159 196 125v26l-68 34Z" fill="#6d8175" stroke="#f2f0e9" strokeOpacity="0.35" />
              </g>
              {/* suspension */}
              <g>
                <path d="M228 40v36" stroke="#d9bc7f" strokeWidth="1.5" />
                <circle cx="228" cy="80" r="6" fill="#ffd9a0" className="pulse-soft" />
              </g>
              {/* cotes d'architecte */}
              <g stroke="#d9bc7f" strokeOpacity="0.75" strokeDasharray="4 4" className="dim-fade">
                <path d="M170 240 300 175" />
                <path d="M166 238l8 4M296 173l8 4" strokeDasharray="none" />
              </g>
              <text x="216" y="224" fill="#d9bc7f" fontSize="11" fontFamily="Archivo, sans-serif" letterSpacing="2">
                5,20 m
              </text>
              {/* points sommets */}
              <circle cx="170" cy="30" r="3" fill="#d9bc7f" />
              <circle cx="48" cy="91" r="3" fill="#d9bc7f" />
              <circle cx="292" cy="91" r="3" fill="#d9bc7f" />
            </svg>
            <span className="absolute -top-2 right-0 rounded-[3px] bg-brass px-3 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.16em] text-deep sm:right-6">
              Interactive
            </span>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ 03 — Pourquoi nous (colonne sticky) ═══════════ */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28" aria-labelledby="pourquoi-titre">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <SectionHead
                overline="03 · Pourquoi nous choisir"
                title={
                  <span id="pourquoi-titre">
                    La confiance se gagne{" "}
                    <em className="italic text-brassdark">sur le chantier.</em>
                  </span>
                }
                intro="Pas de slogans : des engagements concrets, vérifiables à chaque étape de votre projet."
              />
              <Reveal delay={220}>
                <div className="mt-9">
                  <ButtonLink to="/contact" trackSource="accueil_pourquoi">
                    Demander un devis
                  </ButtonLink>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ul className="border-t border-ink/12">
              {REASONS.map((r, i) => {
                const IconCmp = REASON_ICONS[r.icon];
                return (
                  <Reveal as="li" key={r.title} delay={i * 80}>
                    <div className="group flex gap-5 border-b border-ink/12 py-6 transition-all duration-300 hover:translate-x-2 sm:gap-7">
                      <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-[3px] border border-brassdark/25 text-brassdark transition-colors duration-300 group-hover:bg-brassdark group-hover:text-paper">
                        <IconCmp className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 className="font-display text-xl font-medium text-ink sm:text-2xl">
                          {r.title}
                        </h3>
                        <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-ink/65">
                          {r.text}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* ═══════════ 04 — Processus ═══════════ */}
      <section className="bg-sand/70 py-20 lg:py-24" aria-labelledby="processus-titre">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHead
            overline="04 · Le déroulement"
            title={
              <span id="processus-titre">
                De la première visite à la remise des clés,{" "}
                <em className="italic text-brassdark">vous savez où vous en êtes.</em>
              </span>
            }
          />
          <div className="mt-12">
            <ProcessSteps />
          </div>
        </div>
      </section>

      {/* ═══════════ 05 — L'entreprise ═══════════ */}
      <section id="entreprise" className="scroll-mt-24 border-t border-ink/10 bg-paper" aria-labelledby="entreprise-titre">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:py-28">
          <Reveal>
            <div className="relative">
              <Img
                src={IMAGES.craft}
                alt="Assemblage précis d'une menuiserie en chêne dans notre atelier"
                ratio="aspect-[4/3]"
                hover
                className="group rounded-[4px]"
              />
              <div className="absolute -bottom-5 -right-3 hidden rounded-[3px] bg-deep px-5 py-4 text-paper sm:block">
                <p className="font-display text-lg italic text-brasssoft">La précision,</p>
                <p className="text-[12px] uppercase tracking-[0.18em] text-paper/70">
                  jusque dans les assemblages
                </p>
              </div>
            </div>
          </Reveal>
          <div>
            <SectionHead
              overline="05 · L'entreprise"
              title={
                <span id="entreprise-titre">
                  Un atelier, une équipe,{" "}
                  <em className="italic text-brassdark">une méthode.</em>
                </span>
              }
            />
            <Reveal delay={180}>
              <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-ink/70">
                <p>
                  Atelier 228 est né d'une conviction simple : à Lomé, un projet
                  de rénovation ne devrait jamais être une source d'inquiétude.
                  Nous avons construit l'entreprise autour de cela — une équipe
                  locale stable, des artisans qualifiés suivis au quotidien, et
                  une méthode qui vous garde informé du premier jour au dernier.
                </p>
                <p>
                  Nous choisissons des matériaux adaptés au climat et aux usages
                  réels, et nous contrôlons chaque étape avant de passer à la
                  suivante. C'est cette discipline, plus que les effets
                  d'annonce, qui fait la qualité d'un chantier livré.
                </p>
              </div>
            </Reveal>
            <Reveal delay={260}>
              <ul className="mt-7 space-y-3">
                {[
                  "Matériaux sélectionnés pour le climat tropical",
                  "Artisans qualifiés, encadrés sur chaque chantier",
                  "Votre espace de vie protégé et laissé propre",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-[15px] text-ink/80">
                    <IconCheck className="mt-0.5 h-4.5 w-4.5 shrink-0 text-brassdark" />
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={320}>
              <div className="mt-9">
                <ButtonLink
                  to="/contact"
                  variant="dark"
                  trackSource="accueil_entreprise"
                >
                  Parlons de votre projet
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════ CTA final ═══════════ */}
      <section className="bg-brass" aria-labelledby="cta-final">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
          <div className="max-w-3xl">
            <Reveal>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-deep/60">
                Prochaine étape
              </p>
            </Reveal>
            <h2
              id="cta-final"
              className="mt-4 font-display text-4xl font-medium leading-[1.05] text-deep sm:text-5xl lg:text-6xl"
            >
              <LinesReveal
                lines={[
                  <>Vous avez un projet&nbsp;?</>,
                  <>
                    <em className="italic">Parlons-en.</em>
                  </>,
                ]}
              />
            </h2>
            <Reveal delay={250}>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-deep/70 sm:text-lg">
                Décrivez votre projet en deux minutes. Nous vous rappelons pour
                organiser la visite et établir votre devis détaillé — gratuit et
                sans engagement.
              </p>
            </Reveal>
            <Reveal delay={330}>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
                <ButtonLink
                  to="/contact"
                  variant="dark"
                  trackSource="accueil_final"
                  className="h-13 px-9 text-[13px]"
                >
                  Demander un devis
                </ButtonLink>
                <a
                  href={CONTACT.phoneHref}
                  onClick={() => trackCta("accueil_final_tel")}
                  className="group inline-flex items-center gap-2.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-deep"
                >
                  <span className="link-line">ou appelez le {CONTACT.phoneDisplay}</span>
                  <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

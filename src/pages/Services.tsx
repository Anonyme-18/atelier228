import { Link } from "react-router-dom";
import { PageHead, CTABand } from "../components/cards";
import {
  ButtonLink,
  IconArrowRight,
  IconCheck,
  Img,
  Overline,
  Reveal,
  cx,
} from "../components/ui";
import { SERVICES } from "../data/content";
import { usePageMeta } from "../lib/usePageMeta";

export default function Services() {
  usePageMeta(
    "Nos services — Rénovation, aménagement, cuisine, salle de bain à Lomé | Atelier 228",
    "Rénovation complète, aménagement intérieur sur mesure, cuisines et salles de bain à Lomé, Togo. Découvrez nos quatre prestations et demandez un devis gratuit."
  );

  return (
    <>
      <PageHead
        overline="Nos services"
        title={
          <>
            La rénovation et l'aménagement,{" "}
            <em className="italic text-brassdark">de bout en bout.</em>
          </>
        }
        intro="Quatre prestations, une même méthode : visite sur site, devis détaillé poste par poste, réalisation suivie jusqu'à la livraison. Choisissez votre projet — nous nous occupons du reste."
      >
        <Reveal delay={220}>
          <div className="mt-8 flex flex-wrap gap-2.5">
            {SERVICES.map((s) => (
              <a
                key={s.slug}
                href={`#/services/${s.slug}`}
                className="rounded-[3px] border border-ink/15 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-ink/70 transition-colors hover:border-brassdark hover:bg-brassdark hover:text-paper"
              >
                <span className="mr-2 font-display italic text-brassdark">
                  {s.index}
                </span>
                {s.name}
              </a>
            ))}
          </div>
        </Reveal>
      </PageHead>

      <div className="mx-auto max-w-7xl space-y-20 px-5 py-16 sm:px-8 lg:space-y-28 lg:py-24">
        {SERVICES.map((s, i) => {
          const flip = i % 2 === 1;
          return (
            <section
              key={s.slug}
              aria-labelledby={`svc-${s.slug}`}
              className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
            >
              <Reveal className={cx(flip && "lg:order-2")}>
                <Link
                  to={`/services/${s.slug}`}
                  className="group block overflow-hidden rounded-[4px]"
                >
                  <Img src={s.image} alt={s.imageAlt} ratio="aspect-[4/3]" hover />
                </Link>
              </Reveal>

              <div className={cx(flip && "lg:order-1")}>
                <Reveal>
                  <Overline>
                    {s.index} · {s.name}
                  </Overline>
                </Reveal>
                <Reveal delay={70}>
                  <h2
                    id={`svc-${s.slug}`}
                    className="mt-4 font-display text-3xl font-medium leading-tight text-ink sm:text-4xl"
                  >
                    {s.short}
                  </h2>
                </Reveal>
                <Reveal delay={140}>
                  <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                    {s.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink/75">
                        <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-brassdark" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </Reveal>
                <Reveal delay={200}>
                  <p className="mt-6 text-[12px] font-semibold uppercase tracking-[0.16em] text-ink/45">
                    Projets concernés :{" "}
                    <span className="font-medium normal-case tracking-normal text-ink/65">
                      {s.projectTypes.join(" · ")}
                    </span>
                  </p>
                </Reveal>
                <Reveal delay={260}>
                  <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                    <ButtonLink
                      to={`/contact?type=${encodeURIComponent(s.name)}`}
                      trackSource={`services_${s.slug}`}
                    >
                      Demander un devis
                    </ButtonLink>
                    <Link
                      to={`/services/${s.slug}`}
                      className="group inline-flex items-center gap-2 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-brassdark"
                    >
                      <span className="link-line">Voir la page dédiée</span>
                      <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </Reveal>
              </div>
            </section>
          );
        })}
      </div>

      {/* Bandeau transversal — visite 3D */}
      <section className="mx-auto max-w-7xl px-5 pb-4 sm:px-8" aria-labelledby="svc-3d">
        <Reveal>
          <Link
            to="/visite-3d"
            className="group relative flex flex-col items-start justify-between gap-6 overflow-hidden rounded-[4px] bg-pine p-8 text-paper transition-colors duration-300 hover:bg-deep sm:flex-row sm:items-center lg:p-10"
          >
            <svg
              className="absolute -right-6 -top-8 h-48 w-48 opacity-15 transition-all duration-500 group-hover:rotate-3 group-hover:opacity-25"
              viewBox="0 0 100 100"
              fill="none"
              aria-hidden="true"
            >
              <path d="M50 8 90 30v40L50 92 10 70V30Z" stroke="#d9bc7f" strokeWidth="1.5" />
              <path d="M10 30l40 22 40-22M50 52v40" stroke="#d9bc7f" strokeWidth="1.5" />
            </svg>
            <div className="relative">
              <h2 id="svc-3d" className="font-display text-2xl font-medium sm:text-3xl">
                Avant de choisir, <em className="italic text-brasssoft">entrez dans la pièce.</em>
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-paper/65">
                Notre salon témoin est modélisé en 3D : matériaux, lumière,
                volumes — explorez-le librement pour juger de notre approche.
              </p>
            </div>
            <span className="relative inline-flex h-12 shrink-0 items-center gap-2.5 rounded-[3px] bg-brass px-7 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-deep transition-colors duration-300 group-hover:bg-brasssoft">
              Lancer la visite 3D
              <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Link>
        </Reveal>
      </section>

      <CTABand
        source="services_bas"
        title={
          <>
            Votre projet ne rentre dans aucune case&nbsp;?{" "}
            <em className="italic text-brasssoft">Décrivez-le quand même.</em>
          </>
        }
        text="Chaque chantier est unique. Parlez-nous du vôtre : nous vous dirons honnêtement si nous sommes les mieux placés pour le mener."
      />
    </>
  );
}

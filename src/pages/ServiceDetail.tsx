import { Link, Navigate, useParams } from "react-router-dom";
import { CTABand, ProcessSteps, ProjectCard } from "../components/cards";
import {
  Accordion,
  ButtonLink,
  IconArrowUpRight,
  IconCheck,
  Img,
  Overline,
  Reveal,
} from "../components/ui";
import {
  serviceBySlug,
  PROJECTS,
  type ProjectCategory,
} from "../data/content";
import { usePageMeta } from "../lib/usePageMeta";

const SLUG_TO_CATEGORY: Record<string, ProjectCategory> = {
  "renovation-complete": "renovation",
  "amenagement-interieur": "amenagement",
  cuisine: "cuisine",
  "salle-de-bain": "salle-de-bain",
};

export default function ServiceDetail() {
  const { slug = "" } = useParams();
  const service = serviceBySlug(slug);

  usePageMeta(
    service
      ? `${service.name} à Lomé — Devis gratuit | Atelier 228`
      : "Service introuvable | Atelier 228",
    service
      ? `${service.name} à Lomé, Togo : ${service.short} Demandez un devis gratuit et détaillé.`
      : "Ce service n'existe pas."
  );

  if (!service) return <Navigate to="/services" replace />;

  const category = SLUG_TO_CATEGORY[service.slug];
  const related = PROJECTS.filter((p) => p.category === category);
  const quoteTo = `/contact?type=${encodeURIComponent(service.name)}`;

  return (
    <>
      {/* ——— En-tête ——— */}
      <section className="border-b border-ink/10 bg-paper">
        <div className="mx-auto max-w-7xl px-5 pb-14 pt-28 sm:px-8 sm:pt-36">
          <Reveal>
            <nav aria-label="Fil d'Ariane" className="text-[12px] uppercase tracking-[0.16em] text-ink/50">
              <Link to="/services" className="link-line hover:text-ink">
                Services
              </Link>
              <span className="mx-2 text-brassdark">/</span>
              <span className="text-brassdark">{service.name}</span>
            </nav>
          </Reveal>
          <div className="mt-6 grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Reveal delay={60}>
                <Overline>
                  {service.index} · Prestation
                </Overline>
              </Reveal>
              <Reveal delay={120}>
                <h1 className="mt-4 font-display text-4xl font-medium leading-[1.05] text-ink sm:text-5xl lg:text-[3.4rem]">
                  {service.name}
                </h1>
              </Reveal>
              <Reveal delay={190}>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink/70 sm:text-lg">
                  {service.short}
                </p>
              </Reveal>
              <Reveal delay={260}>
                <div className="mt-8 flex flex-col gap-3.5 sm:flex-row">
                  <ButtonLink to={quoteTo} trackSource={`service_${service.slug}_haut`}>
                    Demander un devis
                  </ButtonLink>
                  <ButtonLink
                    to="/realisations"
                    variant="outlineDark"
                    trackSource={`service_${service.slug}_real`}
                  >
                    Voir les réalisations
                  </ButtonLink>
                </div>
              </Reveal>
            </div>
            <div className="lg:col-span-5">
              <Reveal delay={200}>
                <Img
                  src={service.image}
                  alt={service.imageAlt}
                  ratio="aspect-[4/3]"
                  hover
                  className="group rounded-[4px]"
                />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ——— Présentation + ce que nous réalisons ——— */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <Overline>Ce que comprend la prestation</Overline>
            </Reveal>
            <Reveal delay={70}>
              <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-ink sm:text-4xl">
                Tout est prévu,{" "}
                <em className="italic text-brassdark">rien n'est improvisé.</em>
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-6 leading-relaxed text-ink/70">{service.description}</p>
            </Reveal>
            <Reveal delay={200}>
              <div className="mt-8 rounded-[4px] border border-ink/12 bg-sand/60 p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brassdark">
                  Types de projets
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {service.projectTypes.map((t) => (
                    <span
                      key={t}
                      className="rounded-[3px] border border-ink/15 px-3 py-1.5 text-[12.5px] font-medium text-ink/70"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={120}>
              <ul className="grid gap-px overflow-hidden rounded-[4px] border border-ink/10 bg-ink/10 sm:grid-cols-2">
                {service.scope.map((item) => (
                  <li key={item} className="flex items-start gap-3.5 bg-paper p-6">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rotate-45 bg-brassdark" />
                    <span className="text-[15px] leading-relaxed text-ink/80">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={220}>
              <ul className="mt-8 space-y-3">
                {service.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-[15px] text-ink/75">
                    <IconCheck className="mt-0.5 h-4.5 w-4.5 shrink-0 text-brassdark" />
                    {b}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ——— Exemples de réalisations (ou état éditorial propre) ——— */}
      <section className="border-y border-ink/10 bg-sand/60 py-16 lg:py-24" aria-labelledby="ex-svc">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <Reveal>
              <Overline>Exemples de réalisations</Overline>
              <h2 id="ex-svc" className="mt-4 font-display text-3xl font-medium text-ink sm:text-4xl">
                Ce type de projet,{" "}
                <em className="italic text-brassdark">nous l'avons déjà livré.</em>
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <Link
                to="/realisations"
                className="group inline-flex items-center gap-2 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-brassdark"
              >
                <span className="link-line">Toutes nos réalisations</span>
                <IconArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </Reveal>
          </div>

          {related.length > 0 ? (
            <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <ProjectCard key={p.slug} project={p} aspect="aspect-[4/5]" delay={i * 90} />
              ))}
            </div>
          ) : (
            /* Cas limite 10 : prestation sans galerie — pas de grille vide */
            <Reveal delay={120}>
              <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-[4px] border border-ink/12 bg-paper p-8 sm:flex-row sm:items-center lg:p-10">
                <div>
                  <h3 className="font-display text-2xl font-medium text-ink">
                    Les photos de ce type de chantier arrivent bientôt.
                  </h3>
                  <p className="mt-2 max-w-xl text-ink/65">
                    En attendant, la meilleure façon de juger notre travail reste
                    la visite d'un chantier en cours — proposez-nous votre projet.
                  </p>
                </div>
                <ButtonLink to={quoteTo} trackSource={`service_${service.slug}_vide`} className="shrink-0">
                  Demander un devis
                </ButtonLink>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* ——— FAQ + processus ——— */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <Overline>Questions fréquentes</Overline>
              <h2 className="mt-4 font-display text-3xl font-medium text-ink sm:text-4xl">
                Avant de vous lancer,{" "}
                <em className="italic text-brassdark">voici ce qu'on nous demande.</em>
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <div className="mt-8 border-t border-ink/10">
                <Accordion items={service.faq} />
              </div>
            </Reveal>
          </div>
          <div>
            <Reveal delay={100}>
              <Overline>Le déroulement</Overline>
              <h2 className="mt-4 font-display text-3xl font-medium text-ink sm:text-4xl">
                Quatre étapes,{" "}
                <em className="italic text-brassdark">zéro flou.</em>
              </h2>
            </Reveal>
            <div className="mt-8">
              <ProcessSteps />
            </div>
            <Reveal delay={200}>
              <div className="mt-10 rounded-[4px] bg-deep p-8 text-paper lg:p-10">
                <p className="font-display text-2xl font-medium italic text-brasssoft sm:text-3xl">
                  Prêt à passer à l'étape 01&nbsp;?
                </p>
                <p className="mt-3 text-paper/65">
                  Deux minutes suffisent pour décrire votre projet {service.name.toLowerCase()}.
                </p>
                <div className="mt-6">
                  <ButtonLink to={quoteTo} trackSource={`service_${service.slug}_bas`}>
                    Demander un devis
                  </ButtonLink>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CTABand
        source={`service_${service.slug}_ctaband`}
        title={
          <>
            Un projet de {service.name.toLowerCase()} à Lomé&nbsp;?{" "}
            <em className="italic text-brasssoft">Obtenez votre devis.</em>
          </>
        }
        text="Visite sur site gratuite, devis détaillé poste par poste, sans engagement."
        to={quoteTo}
      />
    </>
  );
}

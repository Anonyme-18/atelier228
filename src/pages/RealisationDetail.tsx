import { Link, Navigate, useParams } from "react-router-dom";
import { CTABand, ProjectCard } from "../components/cards";
import { AvantApres } from "../components/AvantApres";
import {
  IconArrowUpRight,
  IconPin,
  Img,
  Overline,
  Reveal,
} from "../components/ui";
import {
  CATEGORY_LABELS,
  CATEGORY_TO_FORM_TYPE,
  projectBySlug,
  PROJECTS,
} from "../data/content";
import { usePageMeta } from "../lib/usePageMeta";

export default function RealisationDetail() {
  const { slug = "" } = useParams();
  const project = projectBySlug(slug);

  usePageMeta(
    project
      ? `${project.title} — ${project.location} | Atelier 228`
      : "Réalisation introuvable | Atelier 228",
    project
      ? `${project.summary} Un projet signé Atelier 228 à Lomé, Togo.`
      : "Cette réalisation n'existe pas."
  );

  if (!project) return <Navigate to="/realisations" replace />;

  const others = PROJECTS.filter((p) => p.slug !== project.slug).slice(0, 3);
  const quoteTo = `/contact?type=${encodeURIComponent(
    CATEGORY_TO_FORM_TYPE[project.category]
  )}`;

  return (
    <>
      {/* ——— En-tête sombre ——— */}
      <section className="bg-deep pb-14 pt-28 text-paper sm:pt-36">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <nav aria-label="Fil d'Ariane" className="text-[12px] uppercase tracking-[0.16em] text-paper/50">
              <Link to="/realisations" className="link-line hover:text-paper">
                Réalisations
              </Link>
              <span className="mx-2 text-brasssoft">/</span>
              <span className="text-brasssoft">{project.title}</span>
            </nav>
          </Reveal>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-3xl">
              <Reveal delay={70}>
                <span className="inline-block rounded-[3px] bg-brass px-3 py-1.5 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-deep">
                  {CATEGORY_LABELS[project.category]}
                </span>
              </Reveal>
              <Reveal delay={130}>
                <h1 className="mt-5 font-display text-4xl font-medium leading-[1.05] sm:text-5xl lg:text-6xl">
                  {project.title}
                </h1>
              </Reveal>
              <Reveal delay={200}>
                <p className="mt-4 flex items-center gap-2.5 text-paper/65">
                  <IconPin className="h-4.5 w-4.5 text-brasssoft" />
                  {project.location}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ——— Image principale ——— */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="-mt-0 translate-y-[-2rem]">
            <Img
              src={project.image}
              alt={project.imageAlt}
              ratio="aspect-[16/10]"
              eager
              kenburns
              className="rounded-[4px] shadow-[0_24px_60px_-20px_rgba(14,28,23,0.45)]"
            />
          </div>
        </Reveal>
      </section>

      {/* ——— Avant / Après ——— */}
      {project.before && project.after && (
        <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:py-16">
          <Reveal>
            <div className="mb-8">
              <Overline>Avant / Après</Overline>
              <h2 className="mt-3 font-display text-2xl font-medium text-ink sm:text-3xl">
                La transformation en un coup d'œil
              </h2>
              {project.beforeAfterNote && (
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink/70">
                  {project.beforeAfterNote}
                </p>
              )}
            </div>
          </Reveal>
          <Reveal delay={100}>
            <AvantApres
              before={project.before}
              after={project.after}
              alt={`${project.title} — Avant/Après`}
              className="shadow-[0_24px_60px_-20px_rgba(14,28,23,0.35)]"
            />
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-4 flex items-center gap-2.5 text-[12px] uppercase tracking-[0.14em] text-ink/50">
              <IconArrowUpRight className="h-4 w-4 text-brassdark" />
              Glissez le curseur pour révéler l'après
            </p>
          </Reveal>
        </section>
      )}

      {/* ——— Contenu ——— */}
      <section className="mx-auto max-w-7xl px-5 pb-20 pt-12 sm:px-8 lg:pb-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Colonne méta — sticky */}
          <div className="lg:col-span-4">
            <div className="space-y-8 lg:sticky lg:top-28">
              <Reveal>
                <div>
                  <Overline>Le projet</Overline>
                  <p className="mt-4 font-display text-2xl font-medium leading-snug text-ink">
                    {project.summary}
                  </p>
                </div>
              </Reveal>
              <Reveal delay={100}>
                <div>
                  <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brassdark">
                    Notre intervention
                  </h2>
                  <ul className="mt-3 space-y-2.5">
                    {project.scope.map((s) => (
                      <li key={s} className="flex items-start gap-3 text-[14.5px] leading-relaxed text-ink/75">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-brassdark" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
              <Reveal delay={160}>
                <div>
                  <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brassdark">
                    Matériaux
                  </h2>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.materials.map((m) => (
                      <span
                        key={m}
                        className="rounded-[3px] border border-ink/15 px-3 py-1.5 text-[12.5px] font-medium text-ink/70"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
              <Reveal delay={190}>
                <Link
                  to="/visite-3d"
                  className="group flex items-center justify-between gap-3 rounded-[4px] border border-ink/12 bg-sand/70 p-4 transition-colors hover:border-brassdark"
                >
                  <span className="text-[12.5px] font-semibold uppercase tracking-[0.12em] text-ink/75">
                    Voir aussi : la maquette 3D du showroom
                  </span>
                  <IconArrowUpRight className="h-4 w-4 shrink-0 text-brassdark transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </Reveal>
              <Reveal delay={220}>
                <div className="rounded-[4px] bg-deep p-7 text-paper">
                  <p className="font-display text-xl font-medium italic text-brasssoft">
                    Un projet similaire&nbsp;?
                  </p>
                  <p className="mt-2 text-sm text-paper/65">
                    Demandez votre devis {CATEGORY_TO_FORM_TYPE[project.category].toLowerCase()} — visite gratuite.
                  </p>
                  <Link
                    to={quoteTo}
                    className="group mt-5 inline-flex h-11 items-center gap-2.5 rounded-[3px] bg-brass px-6 text-[12px] font-semibold uppercase tracking-[0.14em] text-deep transition-colors hover:bg-brasssoft"
                  >
                    Demander un devis
                    <IconArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Colonne récit + galerie */}
          <div className="lg:col-span-8">
            <Reveal>
              <Overline>Contexte du projet</Overline>
            </Reveal>
            <Reveal delay={80}>
              <div className="mt-5 space-y-5">
                {project.context.map((p, i) => (
                  <p
                    key={i}
                    className={
                      i === 0
                        ? "font-display text-2xl font-medium leading-snug text-ink sm:text-[1.7rem]"
                        : "max-w-2xl leading-relaxed text-ink/70"
                    }
                  >
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={140}>
              <h2 className="mt-12 text-[11px] font-semibold uppercase tracking-[0.2em] text-brassdark">
                Galerie
              </h2>
            </Reveal>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              {project.gallery.map((g, i) => (
                <Reveal
                  as="figure"
                  key={`${g.src}-${i}`}
                  delay={i * 90}
                  className={i === 0 ? "sm:col-span-2" : ""}
                >
                  <div className="group overflow-hidden rounded-[4px]">
                    <Img src={g.src} alt={`${project.title} — ${g.label}`} ratio={g.ratio} position={g.position} hover />
                  </div>
                  <figcaption className="mt-2.5 text-[13px] text-ink/55">
                    <span className="mr-2 font-display italic text-brassdark">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {g.label}
                  </figcaption>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ——— Autres réalisations ——— */}
      {others.length > 0 && (
        <section className="border-t border-ink/10 bg-sand/60 py-16 lg:py-20" aria-labelledby="autres-real">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <Reveal>
                <Overline>Continuer la visite</Overline>
                <h2 id="autres-real" className="mt-3 font-display text-3xl font-medium text-ink sm:text-4xl">
                  Autres réalisations
                </h2>
              </Reveal>
              <Reveal delay={120}>
                <Link
                  to="/realisations"
                  className="group inline-flex items-center gap-2 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-brassdark"
                >
                  <span className="link-line">Tout voir</span>
                  <IconArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </Reveal>
            </div>
            <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((p, i) => (
                <ProjectCard key={p.slug} project={p} aspect="aspect-[4/5]" delay={i * 90} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABand
        source={`realisation_${project.slug}`}
        to={quoteTo}
        title={
          <>
            Vous avez un projet similaire&nbsp;?{" "}
            <em className="italic text-brasssoft">Demandez votre devis.</em>
          </>
        }
        text="Comme pour ce chantier : visite sur site, devis détaillé poste par poste, réalisation suivie jusqu'à la livraison."
      />
    </>
  );
}

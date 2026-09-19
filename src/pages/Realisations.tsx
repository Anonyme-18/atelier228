import { useMemo, useState } from "react";
import { CTABand, ProjectCard } from "../components/cards";
import { PageHead } from "../components/cards";
import { GalerieAvantApres } from "../components/GalerieAvantApres";
import { cx, Reveal, SectionHead } from "../components/ui";
import {
  CATEGORY_LABELS,
  PROJETS_RENOVATION,
  PROJECTS,
  type ProjectCategory,
} from "../data/content";
import { usePageMeta } from "../lib/usePageMeta";

type Filter = "tous" | ProjectCategory;

export default function Realisations() {
  usePageMeta(
    "Nos réalisations — Rénovation & aménagement à Lomé | Atelier 228",
    "Découvrez nos chantiers livrés à Lomé : rénovations complètes, aménagements sur mesure, cuisines et salles de bain. Des photos réelles, des finitions soignées."
  );

  const [filter, setFilter] = useState<Filter>("tous");
  const [query, setQuery] = useState("");
  const [onlyTransformations, setOnlyTransformations] = useState(false);

  const counts = useMemo(() => {
    const c: Record<string, number> = { tous: PROJECTS.length };
    for (const p of PROJECTS) c[p.category] = (c[p.category] ?? 0) + 1;
    return c;
  }, []);

  const visible = useMemo(
    () =>
      PROJECTS.filter((p) => {
        const matchesCategory = filter === "tous" || p.category === filter;
        const text = `${p.title} ${p.location} ${p.summary}`.toLowerCase();
        const matchesSearch = !query.trim() || text.includes(query.trim().toLowerCase());
        const matchesTransformation = !onlyTransformations || Boolean(p.before && p.after);
        return matchesCategory && matchesSearch && matchesTransformation;
      }),
    [filter, onlyTransformations, query]
  );

  const filters: { key: Filter; label: string }[] = [
    { key: "tous", label: "Tous les projets" },
    ...(Object.keys(CATEGORY_LABELS) as ProjectCategory[])
      .filter((cat) => (counts[cat] ?? 0) > 0)
      .map((cat) => ({ key: cat as Filter, label: CATEGORY_LABELS[cat] })),
  ];

  return (
    <>
      <PageHead
        overline="Nos réalisations"
        title={
          <>
            Des chantiers livrés,{" "}
            <em className="italic text-brassdark">photographiés tels quels.</em>
          </>
        }
        intro="Pas de promesses en l'air : voici ce que nous avons réellement conçu et réalisé à Lomé. Chaque projet peut être visité en détail — contexte, intervention, matériaux."
      >
        <Reveal delay={200}>
          <div
            className="mt-9 flex flex-wrap gap-2.5"
            role="group"
            aria-label="Filtrer les réalisations par catégorie"
          >
            {filters.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setFilter(f.key)}
                aria-pressed={filter === f.key}
                className={cx(
                  "cursor-pointer rounded-[3px] border px-4 py-2.5 text-[12px] font-semibold uppercase tracking-[0.12em] transition-all duration-300",
                  filter === f.key
                    ? "border-deep bg-deep text-paper"
                    : "border-ink/15 text-ink/65 hover:border-brassdark hover:text-brassdark"
                )}
              >
                {f.label}
                <span
                  className={cx(
                    "ml-2 font-display italic",
                    filter === f.key ? "text-brasssoft" : "text-brassdark"
                  )}
                >
                  {counts[f.key] ?? 0}
                </span>
              </button>
            ))}
          </div>
        </Reveal>
        <Reveal delay={260}>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="sr-only" htmlFor="project-search">
              Rechercher une réalisation
            </label>
            <input
              id="project-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher par lieu ou projet"
              className="h-11 rounded-[3px] border border-ink/15 bg-bone px-4 text-sm text-ink placeholder:text-ink/40 focus:border-brassdark focus:outline-none"
            />
            <label className="inline-flex items-center gap-2 text-sm text-ink/70">
              <input
                type="checkbox"
                checked={onlyTransformations}
                onChange={(e) => setOnlyTransformations(e.target.checked)}
                className="h-4 w-4 accent-brassdark"
              />{" "}
              Avec avant/après uniquement
            </label>
          </div>
        </Reveal>
      </PageHead>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20" aria-live="polite">
        {visible.length > 0 ? (
          <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
            {visible.map((p, i) => (
              <div key={p.slug} className="mb-10 break-inside-avoid">
                <ProjectCard
                  project={p}
                  aspect={p.portrait ? "aspect-[4/5]" : "aspect-[4/3]"}
                  delay={(i % 3) * 90}
                />
              </div>
            ))}
          </div>
        ) : (
          /* Cas limites 8 & 9 : jamais de grille vide */
          <div className="flex flex-col items-start justify-between gap-6 rounded-[4px] border border-ink/12 bg-sand/60 p-8 sm:flex-row sm:items-center lg:p-10">
            <div>
              <h2 className="font-display text-2xl font-medium text-ink">
                Aucun projet dans cette catégorie pour le moment.
              </h2>
              <p className="mt-2 max-w-xl text-ink/65">
                Chaque chantier publié ici est un chantier réel et livré. Cette catégorie se
                remplira au fil des projets.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setFilter("tous")}
              className="link-line shrink-0 cursor-pointer text-[12.5px] font-semibold uppercase tracking-[0.14em] text-brassdark"
            >
              Voir tous les projets
            </button>
          </div>
        )}

        <Reveal delay={150}>
          <p className="mt-4 border-l-2 border-brassdark/40 pl-4 text-xs leading-relaxed text-ink/45">
            Galerie de démonstration — les visuels seront remplacés par les photographies réelles
            des chantiers de l'entreprise. La structure accepte autant de projets que nécessaire,
            avec galeries et avant/après.
          </p>
        </Reveal>
      </section>

      {/* ——— Galeries avant/après par projet de rénovation complète ——— */}
      {PROJETS_RENOVATION.length > 0 && (
        <section className="border-t border-ink/10 bg-paper py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <Reveal>
              <SectionHead
                overline="Rénovations complètes"
                title={
                  <>
                    Pièce par pièce, <em className="italic text-brassdark">la transformation.</em>
                  </>
                }
                intro="Une rénovation complète, c'est transformer chaque espace de vie. Explorez nos projets pièce par pièce : glissez le curseur pour révéler l'avant/après de chaque pièce."
              />
            </Reveal>

            <div className="mt-12 space-y-20">
              {PROJETS_RENOVATION.map((projet, i) => (
                <Reveal key={projet.id} delay={i * 100}>
                  <GalerieAvantApres projet={projet} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABand
        source="realisations_bas"
        title={
          <>
            Votre projet mérite{" "}
            <em className="italic text-brasssoft">le même niveau de finition.</em>
          </>
        }
        text="Décrivez-le nous : visite sur site et devis détaillé gratuits, à Lomé et environs."
      />
    </>
  );
}

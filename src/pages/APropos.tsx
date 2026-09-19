import { CTABand } from "../components/cards";
import {
  ButtonLink,
  IconCheck,
  Img,
  Overline,
  Reveal,
  SectionHead,
} from "../components/ui";
import { IMAGES } from "../data/content";
import { usePageMeta } from "../lib/usePageMeta";

export default function APropos() {
  usePageMeta(
    "À propos d'Atelier 228 — Rénovation & Aménagement à Lomé",
    "Découvrez l'approche d'Atelier 228 : un interlocuteur unique, un devis détaillé, des finitions soignées. Rénovation complète, aménagement intérieur, cuisines et salles de bain à Lomé."
  );

  return (
    <>
      {/* ——— Hero éditorial ——— */}
      <section className="relative overflow-hidden bg-deep py-20 text-paper lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <Overline tone="light">À propos</Overline>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-medium leading-[1.08] sm:text-5xl lg:text-[3.5rem]">
              Un interlocuteur unique,{" "}
              <em className="italic text-brasssoft">du premier échange à la livraison.</em>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-paper/70 sm:text-lg">
              Atelier 228 pilote votre projet de rénovation ou d'aménagement
              intérieur de bout en bout. Pas de sous-traitance dispersée, pas de
              surprises en cours de chantier : une équipe coordonnée, un devis
              détaillé poste par poste, des finitions soignées.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-9 flex flex-col gap-3.5 sm:flex-row">
              <ButtonLink to="/contact" trackSource="apropos_hero">
                Demander un devis
              </ButtonLink>
              <ButtonLink to="/realisations" variant="outlineLight" trackSource="apropos_real">
                Voir nos réalisations
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ——— Notre approche ——— */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionHead
                overline="Notre approche"
                title={
                  <>
                    La rénovation se pense{" "}
                    <em className="italic text-brassdark">en amont.</em>
                  </>
                }
                intro="Un chantier réussi, c'est 80 % de préparation. Nous prenons le temps de comprendre votre usage, vos contraintes, votre budget — avant de poser le premier matériau."
              />
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <ul className="space-y-6">
              {[
                {
                  title: "Écoute & analyse",
                  text: "Visite sur site gratuite. Nous mesurons, photographions, échangeons sur votre quotidien. Pas de devis standardisé : chaque projet est chiffré poste par poste.",
                },
                {
                  title: "Conception & validation",
                  text: "Plans, maquettes 3D, échantillons de matériaux. Vous validez chaque choix avant le démarrage — pas de mauvaise surprise en cours de chantier.",
                },
                {
                  title: "Coordination & suivi",
                  text: "Un interlocuteur unique pilote les corps de métier. Planning respecté, points d'étape réguliers, réactivité en cas d'imprévu.",
                },
                {
                  title: "Finitions & livraison",
                  text: "Contrôle qualité pointilleux avant réception. Nous ne quittons le chantier que lorsque chaque détail est conforme à ce qui a été convenu.",
                },
              ].map((item, i) => (
                <Reveal key={item.title} delay={i * 90}>
                  <li className="flex gap-5 border-b border-ink/10 pb-6 last:border-b-0">
                    <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-[3px] bg-deep text-brasssoft">
                      <IconCheck className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-medium text-ink">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-ink/65">
                        {item.text}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ——— Image pleine largeur ——— */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <Img
            src={IMAGES.craft}
            alt="Artisanat et précision sur un chantier Atelier 228"
            ratio="aspect-[21/9]"
            className="rounded-[4px]"
          />
        </Reveal>
      </section>

      {/* ——— Équipe (placeholder) ——— */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
        <Reveal>
          <SectionHead
            overline="L'équipe"
            title={
              <>
                Des artisans,{" "}
                <em className="italic text-brassdark">pas des sous-traitants.</em>
              </>
            }
            intro="Notre équipe coordonne les corps de métier et garantit la qualité d'exécution. Chaque intervenant est sélectionné pour sa maîtrise du détail."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { role: "Direction de projet", placeholder: "Photo + bio à venir" },
            { role: "Menuiserie sur mesure", placeholder: "Photo + bio à venir" },
            { role: "Coordination chantier", placeholder: "Photo + bio à venir" },
          ].map((person, i) => (
            <Reveal key={person.role} delay={i * 90}>
              <div className="group rounded-[4px] border border-ink/10 bg-bone p-6 transition-colors duration-300 hover:border-brassdark">
                <div className="mb-4 flex h-48 items-center justify-center rounded-[3px] bg-sand">
                  <span className="text-sm italic text-ink/40">{person.placeholder}</span>
                </div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brassdark">
                  {person.role}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">
                  Présentation à compléter avec les informations réelles de l'équipe.
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <p className="mt-8 rounded-[4px] border border-brassdark/25 bg-sand/70 p-5 text-sm leading-relaxed text-ink/60">
            <strong className="text-brassdark">Contenu à compléter :</strong>{" "}
            ajoutez ici les photos et biographies des membres de l'équipe. Cette
            section humanise l'entreprise et renforce la confiance.
          </p>
        </Reveal>
      </section>

      {/* ——— Certifications & Partenaires (placeholder) ——— */}
      <section className="border-y border-ink/10 bg-sand/60 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <SectionHead
              overline="Certifications & Partenaires"
              title={
                <>
                  Des garanties,{" "}
                  <em className="italic text-brassdark">pas des promesses.</em>
                </>
              }
              intro="Nos qualifications et partenariats attestent de notre maîtrise technique et de notre engagement qualité."
            />
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Qualification professionnelle",
              "Assurance décennale",
              "Partenaires matériaux",
              "Formation continue",
            ].map((cert, i) => (
              <Reveal key={cert} delay={i * 90}>
                <div className="flex h-32 items-center justify-center rounded-[4px] border border-dashed border-ink/20 bg-bone p-6 text-center">
                  <span className="text-sm italic text-ink/40">{cert}</span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <p className="mt-8 rounded-[4px] border border-brassdark/25 bg-paper p-5 text-sm leading-relaxed text-ink/60">
              <strong className="text-brassdark">Contenu à compléter :</strong>{" "}
              ajoutez ici les logos et noms des certifications, qualifications
              et partenaires. Cette section rassure sur le professionnalisme.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ——— Avis clients (placeholder) ——— */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
        <Reveal>
          <SectionHead
            overline="Avis clients"
            title={
              <>
                La parole{" "}
                <em className="italic text-brassdark">à ceux qui nous ont fait confiance.</em>
              </>
            }
            intro="Des retours authentiques de clients dont nous avons rénové l'intérieur."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {[1, 2, 3].map((n, i) => (
            <Reveal key={n} delay={i * 90}>
              <blockquote className="flex h-full flex-col rounded-[4px] border border-ink/10 bg-bone p-7">
                <div className="mb-4 flex gap-1 text-brassdark">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="flex-1 text-[15px] italic leading-relaxed text-ink/70">
                  "Témoignage à compléter avec un avis réel d'un client satisfait."
                </p>
                <footer className="mt-5 border-t border-ink/10 pt-4">
                  <p className="font-semibold text-ink">Nom du client</p>
                  <p className="mt-1 text-xs text-ink/50">Type de projet — Ville</p>
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <p className="mt-8 rounded-[4px] border border-brassdark/25 bg-sand/70 p-5 text-sm leading-relaxed text-ink/60">
            <strong className="text-brassdark">Contenu à compléter :</strong>{" "}
            remplacez ces placeholders par de vrais témoignages clients. Les
            avis authentiques sont l'un des leviers de confiance les plus
            puissants. Demandez à vos clients satisfaits s'ils acceptent de
            partager leur expérience.
          </p>
        </Reveal>
      </section>

      {/* ——— Chiffres clés (placeholder) ——— */}
      <section className="bg-deep py-16 text-paper lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <Overline tone="light">En chiffres</Overline>
            <h2 className="mt-4 font-display text-3xl font-medium sm:text-4xl">
              Des résultats{" "}
              <em className="italic text-brasssoft">mesurables.</em>
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "—", label: "Années d'expérience" },
              { value: "—", label: "Projets livrés" },
              { value: "—", label: "Clients satisfaits" },
              { value: "—", label: "Corps de métier coordonnés" },
            ].map((stat, i) => (
              <Reveal key={stat.label} delay={i * 90}>
                <div className="text-center">
                  <p className="font-display text-5xl font-medium text-brasssoft">{stat.value}</p>
                  <p className="mt-3 text-sm uppercase tracking-[0.14em] text-paper/60">
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <p className="mt-10 rounded-[4px] border border-brasssoft/25 bg-pine/30 p-5 text-sm leading-relaxed text-paper/60">
              <strong className="text-brasssoft">Contenu à compléter :</strong>{" "}
              remplacez les "—" par des chiffres réels et vérifiables. Les
              chiffres concrets renforcent la crédibilité — mais seulement
              s'ils sont authentiques.
            </p>
          </Reveal>
        </div>
      </section>

      <CTABand
        source="apropos_bas"
        title={
          <>
            Prêt à démarrer{" "}
            <em className="italic text-brasssoft">votre projet&nbsp;?</em>
          </>
        }
        text="Visite sur site gratuite, devis détaillé poste par poste, sans engagement."
      />
    </>
  );
}

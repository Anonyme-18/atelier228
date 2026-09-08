import { useState } from "react";
import { AvantApres } from "./AvantApres";
import { Reveal } from "./ui";
import type { ProjetRenovation } from "../data/content";

export function GalerieAvantApres({ projet }: { projet: ProjetRenovation }) {
  const [pieceActive, setPieceActive] = useState(0);

  return (
    <div className="space-y-8">
      {/* En-tête du projet */}
      <Reveal>
        <div className="border-l-2 border-brass pl-6">
          <h3 className="font-display text-2xl font-medium text-ink sm:text-3xl">
            {projet.titre}
          </h3>
          <p className="mt-2 text-sm uppercase tracking-wide text-ink/60">
            {projet.lieu}
          </p>
          <p className="mt-4 text-base leading-relaxed text-ink/70">
            {projet.description}
          </p>
        </div>
      </Reveal>

      {/* Sélecteur de pièce */}
      <Reveal delay={100}>
        <div className="flex flex-wrap gap-2">
          {projet.galeries.map((g, i) => (
            <button
              key={g.piece}
              type="button"
              onClick={() => setPieceActive(i)}
              className={`cursor-pointer rounded-full px-5 py-2 text-sm font-medium transition-all ${
                pieceActive === i
                  ? "bg-deep text-paper"
                  : "bg-sand text-ink/70 hover:bg-ink/10"
              }`}
            >
              {g.piece}
            </button>
          ))}
        </div>
      </Reveal>

      {/* Comparateur avant/après */}
      <Reveal delay={200}>
        <div className="space-y-4">
          <AvantApres
            before={projet.galeries[pieceActive].avant}
            after={projet.galeries[pieceActive].apres}
            alt={`${projet.galeries[pieceActive].piece} - Avant/Après`}
          />
          <div className="rounded-lg bg-sand/50 p-5">
            <p className="text-sm font-medium text-ink/80">
              <span className="font-semibold text-brass">
                {projet.galeries[pieceActive].piece} :
              </span>{" "}
              {projet.galeries[pieceActive].details}
            </p>
          </div>
        </div>
      </Reveal>

      {/* Miniatures des autres pièces */}
      <Reveal delay={300}>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {projet.galeries.map((g, i) => (
            <button
              key={g.piece}
              type="button"
              onClick={() => setPieceActive(i)}
              className={`group relative aspect-square overflow-hidden rounded-lg transition-all ${
                pieceActive === i
                  ? "ring-2 ring-brass"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={g.apres}
                alt={g.piece}
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-3">
                <span className="text-xs font-medium text-white">
                  {g.piece}
                </span>
              </div>
            </button>
          ))}
        </div>
      </Reveal>
    </div>
  );
}

import { useCallback, useRef, useState } from "react";
import { cx } from "./ui";

/**
 * Comparateur avant/après — levier de crédibilité majeur en rénovation.
 * Glisser (souris + tactile) ou clavier (flèches) pour révéler la transformation.
 * `touch-action: pan-y` préserve le défilement vertical sur mobile.
 */
export function AvantApres({
  before,
  after,
  beforeLabel = "Avant",
  afterLabel = "Après",
  alt,
  className,
}: {
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
  alt: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const [touched, setTouched] = useState(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setDragging(true);
    setTouched(true);
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragging) updateFromClientX(e.clientX);
  };
  const stopDragging = () => setDragging(false);

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setTouched(true);
      setPos((p) => Math.max(0, p - 5));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setTouched(true);
      setPos((p) => Math.min(100, p + 5));
    }
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
      className={cx(
        "group relative aspect-[4/3] w-full cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-[4px] bg-sand",
        className
      )}
    >
      {/* Couche base : APRÈS */}
      <img
        src={after}
        alt={`${alt} — ${afterLabel.toLowerCase()}`}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Couche haute : AVANT (rognée à gauche du curseur) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        aria-hidden="true"
      >
        <img
          src={before}
          alt=""
          loading="lazy"
          decoding="async"
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      {/* Étiquettes */}
      <span className="absolute left-3 top-3 z-10 rounded-[3px] bg-night/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-paper/90 backdrop-blur-sm sm:left-4 sm:top-4">
        {beforeLabel}
      </span>
      <span className="absolute right-3 top-3 z-10 rounded-[3px] bg-brass px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-deep sm:right-4 sm:top-4">
        {afterLabel}
      </span>

      {/* Ligne de séparation + poignée */}
      <div
        className="absolute inset-y-0 z-10"
        style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
      >
        <div className="mx-auto h-full w-[2px] bg-paper/90 shadow-[0_0_12px_rgba(14,28,23,0.5)]" />
        <button
          type="button"
          role="slider"
          aria-label={`Révéler la vue ${afterLabel.toLowerCase()} — ${alt}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          onKeyDown={onKeyDown}
          className={cx(
            "absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border-2 border-paper bg-deep/85 text-paper shadow-lg backdrop-blur-sm transition-transform duration-200",
            dragging ? "scale-110" : "group-hover:scale-105"
          )}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
            <path d="m9 6-4 6 4 6" />
            <path d="m15 6 4 6-4 6" />
          </svg>
        </button>
      </div>

      {/* Invitation au geste */}
      <span
        className={cx(
          "pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-night/75 px-4 py-1.5 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-paper/90 backdrop-blur-sm transition-opacity duration-500 sm:bottom-4",
          touched ? "opacity-0" : "opacity-100"
        )}
      >
        Glissez pour comparer
      </span>
    </div>
  );
}

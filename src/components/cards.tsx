import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  CATEGORY_LABELS,
  PROCESS,
  type Project,
} from "../data/content";
import { trackCta } from "../lib/analytics";
import {
  ButtonLink,
  cx,
  IconArrowRight,
  IconArrowUpRight,
  Img,
  Overline,
  Reveal,
} from "./ui";

/* ═══════════ Carte réalisation ═══════════ */

export function ProjectCard({
  project,
  aspect = "aspect-[4/5]",
  delay = 0,
}: {
  project: Project;
  aspect?: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className="h-full">
      <Link
        to={`/realisations/${project.slug}`}
        className="group block h-full focus-visible:outline-2 focus-visible:outline-offset-4"
        aria-label={`${project.title} — voir le projet`}
      >
        <div className="relative overflow-hidden bg-sand">
          <Img
            src={project.image}
            alt={project.imageAlt}
            ratio={aspect}
            hover
          />
          <span className="absolute left-4 top-4 rounded-[3px] bg-deep/85 px-3 py-1.5 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-paper backdrop-blur-sm">
            {CATEGORY_LABELS[project.category]}
          </span>
        </div>
        <div className="flex items-start justify-between gap-4 pt-4">
          <div>
            <h3 className="font-display text-lg font-medium leading-snug text-ink transition-colors group-hover:text-brassdark sm:text-xl">
              {project.title}
            </h3>
            <p className="mt-1 text-sm text-ink/55">{project.location}</p>
          </div>
          <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink transition-all duration-300 group-hover:border-brassdark group-hover:bg-brassdark group-hover:text-paper">
            <IconArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

/* ═══════════ Bandeau CTA réutilisable (règle : 1 CTA / page) ═══════════ */

export function CTABand({
  title,
  text,
  source,
  tone = "dark",
  ctaLabel = "Demander un devis",
  to,
}: {
  title: ReactNode;
  text?: string;
  source: string;
  tone?: "dark" | "brass";
  ctaLabel?: string;
  to?: string;
}) {
  const dark = tone === "dark";
  return (
    <section className={cx(dark ? "bg-deep" : "bg-brass")}>
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 py-16 sm:px-8 lg:flex-row lg:items-center lg:py-20">
        <Reveal className="max-w-2xl">
          <h2
            className={cx(
              "font-display text-3xl font-medium leading-[1.1] sm:text-4xl lg:text-[2.6rem]",
              dark ? "text-paper" : "text-deep"
            )}
          >
            {title}
          </h2>
          {text && (
            <p
              className={cx(
                "mt-4 text-base leading-relaxed sm:text-lg",
                dark ? "text-paper/65" : "text-deep/70"
              )}
            >
              {text}
            </p>
          )}
        </Reveal>
        <Reveal delay={120} className="shrink-0">
          <ButtonLink
            to={to ?? "/contact"}
            variant={dark ? "primary" : "dark"}
            trackSource={source}
            className="h-13 px-9 text-[13px]"
          >
            {ctaLabel}
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════ Processus en 4 temps ═══════════ */

export function ProcessSteps({ tone = "light" }: { tone?: "light" | "dark" }) {
  const light = tone === "light";
  return (
    <ol className="grid gap-px overflow-hidden rounded-[4px] border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
      {PROCESS.map((p, i) => (
        <Reveal as="li" key={p.step} delay={i * 90} className={light ? "bg-paper" : "bg-deep"}>
          <div className="h-full p-7">
            <span
              className={cx(
                "font-display text-4xl font-medium italic",
                light ? "text-brassdark" : "text-brasssoft"
              )}
            >
              {p.step}
            </span>
            <h3
              className={cx(
                "mt-4 text-[13px] font-semibold uppercase tracking-[0.16em]",
                light ? "text-ink" : "text-paper"
              )}
            >
              {p.title}
            </h3>
            <p
              className={cx(
                "mt-2.5 text-sm leading-relaxed",
                light ? "text-ink/65" : "text-paper/60"
              )}
            >
              {p.text}
            </p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}

/* ═══════════ Ligne service (liste éditoriale) ═══════════ */

export function ServiceLine({
  index,
  title,
  short,
  image,
  imageAlt,
  slug,
  quoteType,
  delay = 0,
}: {
  index: string;
  title: string;
  short: string;
  image: string;
  imageAlt: string;
  slug: string;
  quoteType: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <div className="group relative grid cursor-pointer gap-5 border-t border-ink/12 py-7 transition-colors duration-300 hover:bg-sand/60 sm:grid-cols-12 sm:items-center sm:gap-6 sm:px-4">
        <Link
          to={`/services/${slug}`}
          className="absolute inset-0 z-10"
          aria-label={`${title} — découvrir la prestation`}
        />
        <div className="flex items-baseline gap-4 sm:col-span-4">
          <span className="font-display text-sm italic text-brassdark">
            {index}
          </span>
          <h3 className="font-display text-2xl font-medium text-ink transition-transform duration-300 group-hover:translate-x-1.5 sm:text-[1.7rem]">
            {title}
          </h3>
        </div>
        <p className="text-sm leading-relaxed text-ink/65 sm:col-span-5">
          {short}
        </p>
        <div className="flex items-center gap-5 sm:col-span-3 sm:justify-end">
          <div className="hidden w-24 shrink-0 overflow-hidden rounded-[3px] sm:block">
            <Img src={image} alt={imageAlt} ratio="aspect-[4/3]" hover />
          </div>
          <span className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-brassdark">
            Découvrir
            <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </span>
        </div>
      </div>
    </Reveal>
  );
}

/* ═══════════ En-tête éditorial de page ═══════════ */

export function PageHead({
  overline,
  title,
  intro,
  children,
}: {
  overline: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-ink/10 bg-paper">
      <div className="mx-auto max-w-7xl px-5 pb-12 pt-28 sm:px-8 sm:pb-16 sm:pt-36">
        <Reveal>
          <Overline>{overline}</Overline>
        </Reveal>
        <Reveal delay={70}>
          <h1 className="mt-5 max-w-4xl font-display text-4xl font-medium leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
            {title}
          </h1>
        </Reveal>
        {intro && (
          <Reveal delay={140}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink/70 sm:text-lg">
              {intro}
            </p>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}

export function trackAndGo(source: string) {
  trackCta(source);
}

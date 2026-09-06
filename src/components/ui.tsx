import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { Link } from "react-router-dom";
import { trackCta } from "../lib/analytics";

export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ═══════════ Icônes dessinées sur mesure ═══════════ */

function I({
  children,
  className = "h-5 w-5",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export const IconArrowRight = ({ className }: { className?: string }) => (
  <I className={className}>
    <path d="M4 12h16" />
    <path d="m13 5 7 7-7 7" />
  </I>
);
export const IconArrowUpRight = ({ className }: { className?: string }) => (
  <I className={className}>
    <path d="M7 17 17 7" />
    <path d="M8 7h9v9" />
  </I>
);
export const IconCheck = ({ className }: { className?: string }) => (
  <I className={className}>
    <path d="m5 12.5 4.5 4.5L19 7" />
  </I>
);
export const IconPlus = ({ className }: { className?: string }) => (
  <I className={className}>
    <path d="M12 5v14M5 12h14" />
  </I>
);
export const IconChevronDown = ({ className }: { className?: string }) => (
  <I className={className}>
    <path d="m6 9 6 6 6-6" />
  </I>
);
export const IconPhone = ({ className }: { className?: string }) => (
  <I className={className}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  </I>
);
export const IconWhatsApp = ({ className }: { className?: string }) => (
  <I className={className}>
    <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3Z" />
    <path d="M8.8 8.6c.3 2.7 3.9 6.3 6.6 6.6l1.1-1.4-2.2-1.3-1 .8a7.4 7.4 0 0 1-2.2-2.2l.8-1-1.3-2.2-1.8.7Z" />
  </I>
);
export const IconMail = ({ className }: { className?: string }) => (
  <I className={className}>
    <rect x="3" y="5" width="18" height="14" rx="1" />
    <path d="m3 7.5 9 6 9-6" />
  </I>
);
export const IconPin = ({ className }: { className?: string }) => (
  <I className={className}>
    <path d="M12 21s-7-5.4-7-11a7 7 0 0 1 14 0c0 5.6-7 11-7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </I>
);
export const IconClock = ({ className }: { className?: string }) => (
  <I className={className}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7v5l3.2 2" />
  </I>
);
export const IconBricks = ({ className }: { className?: string }) => (
  <I className={className}>
    <path d="M3 5h18v14H3z" />
    <path d="M3 9.7h18M3 14.3h18M9 5v4.7M15 9.7v4.6M9 14.3V19" />
  </I>
);
export const IconCabinet = ({ className }: { className?: string }) => (
  <I className={className}>
    <rect x="4" y="3" width="16" height="18" rx="1" />
    <path d="M12 3v18M4 12h16" />
    <path d="M9.5 8.5h.01M14.5 15.5h.01" />
  </I>
);
export const IconPan = ({ className }: { className?: string }) => (
  <I className={className}>
    <path d="M4 10h12v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-5Z" />
    <path d="M16 12.5h5" />
    <path d="M7.5 10V8M10.5 10V6.5M13.5 10V8" />
  </I>
);
export const IconShower = ({ className }: { className?: string }) => (
  <I className={className}>
    <path d="M7 21v-9a5 5 0 0 1 5-5" />
    <path d="M12 7h6v2.5h-6z" />
    <path d="M13.5 13v.01M16.5 13v.01M15 16.5v.01M18 16.5v.01M13.5 20v.01" />
  </I>
);
export const IconDoc = ({ className }: { className?: string }) => (
  <I className={className}>
    <path d="M7 3h7l4 4v14H7z" />
    <path d="M14 3v4h4M10 12h5M10 16h5" />
  </I>
);
export const IconCalendar = ({ className }: { className?: string }) => (
  <I className={className}>
    <rect x="4" y="5" width="16" height="16" rx="1" />
    <path d="M4 10h16M8 3v4M16 3v4" />
  </I>
);
export const IconEye = ({ className }: { className?: string }) => (
  <I className={className}>
    <path d="M2.5 12S6 6 12 6s9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
    <circle cx="12" cy="12" r="2.5" />
  </I>
);
export const IconSparkle = ({ className }: { className?: string }) => (
  <I className={className}>
    <path d="M12 4v4M12 16v4M4 12h4M16 12h4M6.5 6.5 9 9M15 15l2.5 2.5M17.5 6.5 15 9M9 15l-2.5 2.5" />
  </I>
);
export const IconPerson = ({ className }: { className?: string }) => (
  <I className={className}>
    <circle cx="9" cy="8" r="3" />
    <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
    <path d="M15.5 5.2a3 3 0 0 1 0 5.6M17.3 14.9a5.5 5.5 0 0 1 3.2 5.1" />
  </I>
);
export const IconDownload = ({ className }: { className?: string }) => (
  <I className={className}>
    <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 17v4h16v-4" />
  </I>
);
export const IconRuler = ({ className }: { className?: string }) => (
  <I className={className}>
    <path d="M3 9h18v6H3z" />
    <path d="M7 9v3M11 9v4M15 9v3" />
  </I>
);
export const IconSpinner = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={cx(className, "animate-spin")}
    aria-hidden="true"
  >
    <circle
      cx="12"
      cy="12"
      r="9"
      stroke="currentColor"
      strokeOpacity="0.25"
      strokeWidth="2.5"
    />
    <path
      d="M21 12a9 9 0 0 0-9-9"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

/* ═══════════ Révélations au scroll ═══════════ */

export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article" | "li" | "figure";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -36px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={cx(
        "transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
        shown ? "translate-y-0 opacity-100" : "translate-y-7 opacity-0",
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/** Titre révélé ligne par ligne (masque) — signature du site. */
export function LinesReveal({
  lines,
  className,
  lineClassName,
  stagger = 110,
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  stagger?: number;
}) {
  const [on, setOn] = useState(prefersReducedMotion());
  useEffect(() => {
    const t = setTimeout(() => setOn(true), 80);
    return () => clearTimeout(t);
  }, []);
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <span
            className={cx(
              "block transition-transform duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
              lineClassName
            )}
            style={{
              transform: on ? "translateY(0)" : "translateY(112%)",
              transitionDelay: `${i * stagger}ms`,
            } as CSSProperties}
          >
            {line}
          </span>
        </span>
      ))}
    </span>
  );
}

/* ═══════════ Petites pièces éditoriales ═══════════ */

export function Overline({
  children,
  tone = "dark",
  className,
}: {
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <p
      className={cx(
        "flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em]",
        tone === "light" ? "text-brasssoft" : "text-brassdark",
        className
      )}
    >
      <span
        className={cx(
          "h-px w-8",
          tone === "light" ? "bg-brasssoft/70" : "bg-brassdark/60"
        )}
      />
      {children}
    </p>
  );
}

export function SectionHead({
  overline,
  title,
  intro,
  tone = "dark",
  className,
}: {
  overline: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div className={cx("max-w-2xl", className)}>
      <Reveal>
        <Overline tone={tone}>{overline}</Overline>
      </Reveal>
      <Reveal delay={80}>
        <h2
          className={cx(
            "mt-4 font-display text-3xl leading-[1.08] font-medium sm:text-4xl lg:text-[2.75rem]",
            tone === "light" ? "text-paper" : "text-ink"
          )}
        >
          {title}
        </h2>
      </Reveal>
      {intro ? (
        <Reveal delay={150}>
          <p
            className={cx(
              "mt-5 text-base leading-relaxed sm:text-lg",
              tone === "light" ? "text-paper/70" : "text-ink/70"
            )}
          >
            {intro}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}

/* ═══════════ Boutons ═══════════ */

type BtnVariant = "primary" | "dark" | "light" | "outlineDark" | "outlineLight";

const btnBase =
  "group inline-flex h-12 cursor-pointer items-center justify-center gap-2.5 rounded-[3px] px-7 text-[12.5px] font-semibold uppercase tracking-[0.14em] transition-all duration-300 select-none";

const btnVariants: Record<BtnVariant, string> = {
  primary: "bg-brass text-deep hover:bg-brasssoft active:translate-y-px",
  dark: "bg-deep text-paper hover:bg-pine active:translate-y-px",
  light: "bg-paper text-deep hover:bg-sand active:translate-y-px",
  outlineDark:
    "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-paper",
  outlineLight:
    "border border-paper/35 text-paper hover:border-paper hover:bg-paper hover:text-deep",
};

export function ButtonArrow() {
  return (
    <IconArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
  );
}

export function ButtonLink({
  to,
  children,
  variant = "primary",
  arrow = true,
  trackSource,
  className,
}: {
  to: string;
  children: ReactNode;
  variant?: BtnVariant;
  arrow?: boolean;
  trackSource?: string;
  className?: string;
}) {
  return (
    <Link
      to={to}
      onClick={() => trackSource && trackCta(trackSource)}
      className={cx(btnBase, btnVariants[variant], className)}
    >
      {children}
      {arrow && <ButtonArrow />}
    </Link>
  );
}

export function ButtonAnchor({
  href,
  children,
  variant = "primary",
  arrow = false,
  onClick,
  className,
  external = true,
}: {
  href: string;
  children: ReactNode;
  variant?: BtnVariant;
  arrow?: boolean;
  onClick?: () => void;
  className?: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      className={cx(btnBase, btnVariants[variant], className)}
    >
      {children}
      {arrow && <ButtonArrow />}
    </a>
  );
}

/* ═══════════ Marquee éditorial ═══════════ */

export function Marquee({ items }: { items: string[] }) {
  const row = items.map((t, i) => (
    <span key={i} className="mx-6 inline-flex items-center gap-6">
      <span className="font-display text-xl italic font-medium text-brasssoft sm:text-2xl">
        {t}
      </span>
      <span className="h-1.5 w-1.5 rotate-45 bg-paper/25" aria-hidden="true" />
    </span>
  ));
  return (
    <div className="marquee overflow-hidden border-y border-paper/10 bg-deep py-4">
      <div className="marquee-track flex w-max whitespace-nowrap">
        <div className="flex items-center">{row}</div>
        <div className="flex items-center" aria-hidden="true">
          {row}
        </div>
      </div>
    </div>
  );
}

/* ═══════════ Image avec ratio réservé (anti layout-shift) ═══════════ */

export function Img({
  src,
  alt,
  ratio = "aspect-[4/3]",
  position = "object-center",
  hover = false,
  kenburns = false,
  eager = false,
  className,
}: {
  src: string;
  alt: string;
  ratio?: string;
  position?: string;
  hover?: boolean;
  kenburns?: boolean;
  eager?: boolean;
  className?: string;
}) {
  return (
    <div className={cx("overflow-hidden bg-sand", ratio, className)}>
      <img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className={cx(
          "h-full w-full object-cover",
          position,
          kenburns && "kenburns",
          hover &&
            "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
        )}
      />
    </div>
  );
}

/* ═══════════ Accordéon FAQ ═══════════ */

export function Accordion({
  items,
  tone = "light",
}: {
  items: { q: string; a: string }[];
  tone?: "light" | "dark";
}) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div
      className={cx(
        "divide-y",
        tone === "dark" ? "divide-paper/15" : "divide-ink/10"
      )}
    >
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className={cx(
                "flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left transition-colors",
                tone === "dark" ? "text-paper" : "text-ink"
              )}
            >
              <span className="font-display text-lg font-medium sm:text-xl">
                {item.q}
              </span>
              <span
                className={cx(
                  "shrink-0 transition-transform duration-300",
                  isOpen && "rotate-45",
                  tone === "dark" ? "text-brasssoft" : "text-brassdark"
                )}
              >
                <IconPlus className="h-5 w-5" />
              </span>
            </button>
            <div
              className={cx(
                "grid transition-[grid-template-rows] duration-400 ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              )}
            >
              <div className="overflow-hidden">
                <p
                  className={cx(
                    "pb-6 leading-relaxed",
                    tone === "dark" ? "text-paper/70" : "text-ink/70"
                  )}
                >
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

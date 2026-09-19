import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { BRAND, CONTACT, SERVICES } from "../data/content";
import { trackPageView, trackPhone, trackWhatsApp } from "../lib/analytics";
import { usePreferences } from "../lib/preferences";
import {
  ButtonAnchor,
  ButtonLink,
  cx,
  IconArrowUpRight,
  IconMail,
  IconPhone,
  IconPin,
  IconWhatsApp,
} from "./ui";

/* ————— Ancres différées (nav → section de l'accueil) ————— */
let pendingAnchor: string | null = null;
export function queueAnchor(id: string) {
  pendingAnchor = id;
}
export function consumeAnchor(): string | null {
  const a = pendingAnchor;
  pendingAnchor = null;
  return a;
}

/* ————— Logo ————— */
export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="4" className="fill-deep" />
      <path d="M7 24V11l9-4 9 4v13" fill="none" stroke="var(--color-brasssoft)" strokeWidth="2" />
      <path d="M12 24v-7h8v7" fill="none" stroke="var(--color-paper)" strokeWidth="2" />
    </svg>
  );
}

function Wordmark({ light }: { light: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-3" aria-label="Atelier 228 — Accueil">
      <LogoMark />
      <span className="leading-none">
        <span
          className={cx(
            "block font-body text-[15px] font-bold tracking-[0.18em]",
            light ? "text-paper" : "text-ink"
          )}
        >
          ATELIER&nbsp;228
        </span>
        <span
          className={cx(
            "mt-1 block text-[9.5px] font-medium uppercase tracking-[0.2em]",
            light ? "text-paper/60" : "text-ink/55"
          )}
        >
          Rénovation · Lomé
        </span>
      </span>
    </Link>
  );
}

/* ————— Header ————— */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { language, toggleLanguage, theme, toggleTheme } = usePreferences();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenu(false), [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menu]);

  const light = menu || (isHome && !scrolled);

  const goEntreprise = () => {
    setMenu(false);
    const onHome = window.location.hash === "#/" || window.location.hash === "";
    if (onHome) {
      setTimeout(
        () =>
          document.getElementById("entreprise")?.scrollIntoView({
            block: "start",
          }),
        80
      );
    } else {
      queueAnchor("entreprise");
      window.location.hash = "#/";
    }
  };

  const navLink = ({ isActive }: { isActive: boolean }) =>
    cx(
      "link-line text-[13px] font-semibold uppercase tracking-[0.14em] transition-colors",
      light ? "text-paper/85 hover:text-paper" : "text-ink/75 hover:text-ink",
      isActive && (light ? "text-brasssoft" : "text-brassdark")
    );

  return (
    <>
      <header
        className={cx(
          "fixed inset-x-0 top-0 z-40 transition-all duration-300",
          light
            ? "bg-transparent py-1"
            : "border-b border-ink/10 bg-paper/95 py-0 shadow-[0_1px_0_rgba(26,35,30,0.04)] backdrop-blur-md"
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:h-20">
          <Wordmark light={light} />

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Navigation principale">
            <NavLink to="/services" className={navLink}>
              Services
            </NavLink>
            <NavLink to="/realisations" className={navLink}>
              Réalisations
            </NavLink>
            <NavLink to="/visite-3d" className={navLink}>
              Visite 3D
            </NavLink>
            <NavLink to="/a-propos" className={navLink}>
              À propos
            </NavLink>
            <NavLink to="/contact" className={navLink}>
              Contact
            </NavLink>
            <NavLink to="/outils" className={navLink}>
              {language === "fr" ? "Studio" : "Studio"}
            </NavLink>
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleLanguage}
              className={cx(
                "hidden text-[11px] font-bold uppercase tracking-widest lg:block",
                light ? "text-paper/80" : "text-ink/70"
              )}
              aria-label="Change language"
            >
              {language === "fr" ? "EN" : "FR"}
            </button>
            <button
              type="button"
              onClick={toggleTheme}
              className={cx(
                "hidden h-9 w-9 rounded-full border text-sm lg:block",
                light ? "border-paper/30 text-paper" : "border-ink/20 text-ink"
              )}
              aria-label={theme === "light" ? "Activer le mode sombre" : "Activer le mode clair"}
            >
              {theme === "light" ? "☾" : "☀"}
            </button>
            <ButtonLink
              to="/contact"
              trackSource="header"
              className="hidden h-11 px-6 md:inline-flex"
            >
              Demander un devis
            </ButtonLink>

            {/* Burger */}
            <button
              type="button"
              onClick={() => setMenu(!menu)}
              aria-expanded={menu}
              aria-label={menu ? "Fermer le menu" : "Ouvrir le menu"}
              className="relative flex h-11 w-11 cursor-pointer items-center justify-center lg:hidden"
            >
              <span
                className={cx(
                  "absolute h-[2px] w-6 transition-all duration-300",
                  light && !menu ? "bg-paper" : "bg-ink",
                  menu ? "rotate-45 bg-paper" : "-translate-y-[4px]"
                )}
              />
              <span
                className={cx(
                  "absolute h-[2px] w-6 transition-all duration-300",
                  light && !menu ? "bg-paper" : "bg-ink",
                  menu ? "-rotate-45 bg-paper" : "translate-y-[4px]"
                )}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Menu mobile plein écran */}
      <div
        className={cx(
          "fixed inset-0 z-30 flex flex-col bg-night text-paper transition-all duration-400 lg:hidden",
          menu ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
        aria-hidden={!menu}
      >
        <div className="flex flex-1 flex-col justify-center gap-1 px-8 pt-20">
          {[
            { label: "Accueil", to: "/" },
            { label: "Services", to: "/services" },
            { label: "Réalisations", to: "/realisations" },
            { label: "Visite 3D", to: "/visite-3d" },
            { label: "À propos", to: "/a-propos" },
            { label: "Contact", to: "/contact" },
            { label: "Studio projet", to: "/outils" },
          ].map((item, i) => (
            <Link
              key={item.to}
              to={item.to}
              tabIndex={menu ? 0 : -1}
              onClick={() => setMenu(false)}
              className={cx(
                "rise-in group flex items-center justify-between border-b border-paper/10 py-4 font-display text-3xl font-medium transition-colors hover:text-brasssoft",
                menu ? "" : "opacity-0"
              )}
              style={{ animationDelay: `${90 + i * 70}ms` }}
            >
              {item.label}
              <IconArrowUpRight className="h-6 w-6 text-brasssoft opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          ))}
          <Link
            to="/"
            tabIndex={menu ? 0 : -1}
            onClick={goEntreprise}
            className="rise-in flex items-center justify-between border-b border-paper/10 py-4 font-display text-3xl font-medium transition-colors hover:text-brasssoft"
            style={{ animationDelay: "370ms" }}
          >
            L'entreprise
            <IconArrowUpRight className="h-6 w-6 text-brasssoft opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>

          <div className="rise-in mt-8" style={{ animationDelay: "430ms" }}>
            <ButtonLink to="/contact" trackSource="menu_mobile" className="w-full">
              Demander un devis
            </ButtonLink>
            <div className="mt-5 flex gap-3">
              <ButtonAnchor
                href={CONTACT.phoneHref}
                variant="outlineLight"
                onClick={trackPhone}
                className="flex-1"
                external={false}
              >
                <IconPhone className="h-4 w-4" /> Appeler
              </ButtonAnchor>
              <ButtonAnchor
                href={CONTACT.whatsappUrl}
                variant="outlineLight"
                onClick={trackWhatsApp}
                className="flex-1"
              >
                <IconWhatsApp className="h-4 w-4" /> WhatsApp
              </ButtonAnchor>
            </div>
          </div>
        </div>
        <p className="px-8 pb-8 text-xs tracking-wide text-paper/45">
          {BRAND.name} — {BRAND.baseline} · {BRAND.city}, {BRAND.country}
        </p>
      </div>
    </>
  );
}

/* ————— CTA mobile flottant (pages services & réalisations) ————— */
export function MobileCtaBar() {
  const { pathname } = useLocation();
  const visible = pathname.startsWith("/services") || pathname.startsWith("/realisations");
  if (!visible) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-paper/10 bg-deep/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md lg:hidden">
      <ButtonLink to="/contact" trackSource="barre_mobile" className="w-full">
        Demander un devis
      </ButtonLink>
    </div>
  );
}

/* ————— Scroll management + tracking de page view ————— */
export function ScrollManager() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    // Enregistre la visite de page pour le suivi de conversion
    trackPageView(location.pathname);
  }, [location.pathname]);
  return null;
}

/* ————— Footer ————— */
export function Footer() {
  return (
    <footer className="bg-night text-paper">
      {/* Bandeau CTA */}
      <div className="border-b border-paper/10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-5 py-12 sm:px-8 md:flex-row md:items-center">
          <div>
            <p className="font-display text-2xl font-medium italic text-brasssoft sm:text-3xl">
              Un projet en tête&nbsp;?
            </p>
            <p className="mt-2 text-paper/65">
              Visite sur site et devis détaillé gratuits, à Lomé et environs.
            </p>
          </div>
          <ButtonLink to="/contact" trackSource="footer" className="shrink-0">
            Demander un devis
          </ButtonLink>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-3">
            <LogoMark />
            <span className="text-[15px] font-bold tracking-[0.18em]">ATELIER&nbsp;228</span>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-paper/60">
            Entreprise de rénovation et d'aménagement intérieur basée à Lomé. Nous concevons et
            réalisons des espaces durables — maisons, appartements, commerces — avec un souci
            constant du détail.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonAnchor
              href={CONTACT.phoneHref}
              variant="outlineLight"
              onClick={trackPhone}
              className="h-10 px-4 text-[11px]"
              external={false}
            >
              <IconPhone className="h-4 w-4" /> {CONTACT.phoneDisplay}
            </ButtonAnchor>
            <ButtonAnchor
              href={CONTACT.whatsappUrl}
              variant="outlineLight"
              onClick={trackWhatsApp}
              className="h-10 px-4 text-[11px]"
            >
              <IconWhatsApp className="h-4 w-4" /> WhatsApp
            </ButtonAnchor>
          </div>
        </div>

        <nav className="lg:col-span-2" aria-label="Navigation pied de page">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brasssoft">
            Navigation
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm text-paper/70">
            {[
              { label: "Accueil", to: "/" },
              { label: "Services", to: "/services" },
              { label: "Réalisations", to: "/realisations" },
              { label: "Visite 3D", to: "/visite-3d" },
              { label: "À propos", to: "/a-propos" },
              { label: "Contact & devis", to: "/contact" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="link-line hover:text-paper">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="lg:col-span-3" aria-label="Nos services">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brasssoft">
            Services
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm text-paper/70">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link to={`/services/${s.slug}`} className="link-line hover:text-paper">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brasssoft">
            Coordonnées
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-paper/70">
            <li className="flex items-start gap-2.5">
              <IconPin className="mt-0.5 h-4 w-4 shrink-0 text-brasssoft" />
              {CONTACT.address}
            </li>
            <li className="flex items-start gap-2.5">
              <IconMail className="mt-0.5 h-4 w-4 shrink-0 text-brasssoft" />
              <a href={`mailto:${CONTACT.email}`} className="link-line hover:text-paper">
                {CONTACT.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <IconPhone className="mt-0.5 h-4 w-4 shrink-0 text-brasssoft" />
              <a
                href={CONTACT.phoneHref}
                className="link-line hover:text-paper"
                onClick={trackPhone}
              >
                {CONTACT.phoneDisplay}
              </a>
            </li>
          </ul>
          <p className="mt-4 text-xs text-paper/45">
            Zone d'intervention : {CONTACT.zone} · {CONTACT.hours}
          </p>
        </div>
      </div>

      <div className="border-t border-paper/10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-5 py-6 text-xs text-paper/45 sm:flex-row sm:items-center sm:px-8">
          <p>
            © {new Date().getFullYear()} {BRAND.name} — {BRAND.baseline}, {BRAND.city},{" "}
            {BRAND.country}
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ————— Layout global ————— */
export function Layout() {
  const { pathname } = useLocation();
  const withCtaBar = pathname.startsWith("/services") || pathname.startsWith("/realisations");
  return (
    <div className="grain flex min-h-screen flex-col">
      <Header />
      <main id="main" className={cx("flex-1", withCtaBar && "pb-20 lg:pb-0")}>
        <Outlet />
      </main>
      <Footer />
      <MobileCtaBar />
    </div>
  );
}

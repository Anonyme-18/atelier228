import { useMemo, useState, type FormEvent } from "react";
import { cx, IconChevronDown, IconDownload } from "../components/ui";
import { track } from "../lib/analytics";
import {
  listEvents,
  listQuotes,
  STATUS_LABELS,
  updateQuoteStatus,
  type QuoteRequest,
  type QuoteStatus,
} from "../lib/store";
import { usePageMeta } from "../lib/usePageMeta";

/* ⚠ Démo statique : dans cette version sans backend, le contrôle
   d'accès est symbolique (code affiché ci-dessous). En production,
   branchez une authentification serveur sur l'API des demandes. */
const DEMO_CODE = "2280";
const SESSION_KEY = "atelier228:admin";

const STATUS_STYLES: Record<QuoteStatus, string> = {
  NEW: "bg-brass text-deep",
  IN_PROGRESS: "bg-pine text-paper",
  COMPLETED: "bg-ok text-paper",
  ARCHIVED: "bg-ink/12 text-ink/55",
};

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/* ————— Écran d'accès ————— */
function Gate({ onSuccess }: { onSuccess: () => void }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (code.trim() === DEMO_CODE) {
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* ignore */
      }
      track("admin_login");
      onSuccess();
    } else {
      setError(true);
      track("admin_login_error");
    }
  };

  return (
    <section className="mx-auto flex max-w-md flex-col justify-center px-5 pb-24 pt-36 sm:px-8">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brassdark">
        Espace entreprise
      </p>
      <h1 className="mt-4 font-display text-3xl font-medium text-ink sm:text-4xl">
        Consultation des demandes
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-ink/60">
        Cet espace est réservé à l'équipe Atelier 228. Entrez le code d'accès
        pour consulter les demandes de devis enregistrées.
      </p>
      <form onSubmit={submit} className="mt-8 space-y-4">
        <div>
          <label
            htmlFor="admin-code"
            className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/70"
          >
            Code d'accès
          </label>
          <input
            id="admin-code"
            type="password"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setError(false);
            }}
            className={cx(
              "mt-2 w-full rounded-[3px] border bg-bone px-4 py-3 tracking-[0.3em] focus:outline-none",
              error ? "border-err" : "border-line focus:border-brassdark"
            )}
            autoComplete="off"
          />
          {error && (
            <p role="alert" className="mt-2 text-[13px] font-medium text-err">
              Code incorrect. Réessayez.
            </p>
          )}
        </div>
        <button
          type="submit"
          className="h-12 w-full cursor-pointer rounded-[3px] bg-deep text-[12.5px] font-semibold uppercase tracking-[0.14em] text-paper transition-colors hover:bg-pine"
        >
          Accéder au tableau de bord
        </button>
      </form>
      <p className="mt-6 rounded-[4px] border border-brassdark/25 bg-sand/70 p-4 text-xs leading-relaxed text-ink/60">
        <strong className="text-brassdark">Version de démonstration :</strong>{" "}
        code d'accès <code className="font-mono font-bold">2280</code>. Les
        demandes sont stockées sur cet appareil (localStorage) — à remplacer
        par une base serveur en production.
      </p>
    </section>
  );
}

/* ————— Ligne demande ————— */
function QuoteRow({
  quote,
  onChanged,
}: {
  quote: QuoteRequest;
  onChanged: () => void;
}) {
  const [open, setOpen] = useState(false);

  const changeStatus = (status: QuoteStatus) => {
    updateQuoteStatus(quote.id, status);
    track("admin_status_change", { ref: quote.ref, status });
    onChanged();
  };

  return (
    <li className="border-b border-ink/10">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex w-full cursor-pointer flex-wrap items-center gap-x-4 gap-y-2 py-4 text-left sm:grid sm:grid-cols-[110px_1fr_160px_120px_auto] sm:gap-4"
      >
        <span className="font-mono text-[13px] font-semibold tracking-wide text-brassdark">
          {quote.ref}
        </span>
        <span className="min-w-0 flex-1 basis-40 sm:basis-auto">
          <span className="block truncate font-semibold text-ink">
            {quote.fullName}
          </span>
          <span className="block truncate text-[12.5px] text-ink/55">
            {quote.projectType} · {quote.location || "Lieu non précisé"}
          </span>
        </span>
        <span className="hidden text-[12.5px] text-ink/55 sm:block">
          {fmtDate(quote.createdAt)}
        </span>
        <span
          className={cx(
            "rounded-[3px] px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.12em]",
            STATUS_STYLES[quote.status]
          )}
        >
          {STATUS_LABELS[quote.status]}
        </span>
        <IconChevronDown
          className={cx(
            "ml-auto h-4 w-4 text-ink/40 transition-transform duration-300 sm:ml-0",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div className="rise-in grid gap-6 rounded-[4px] bg-sand/60 p-5 sm:p-6 lg:grid-cols-2">
          <dl className="grid grid-cols-[130px_1fr] gap-x-4 gap-y-2.5 text-sm">
            <dt className="font-semibold text-ink/55">Nom</dt>
            <dd className="text-ink">{quote.fullName}</dd>
            <dt className="font-semibold text-ink/55">Email</dt>
            <dd>
              <a href={`mailto:${quote.email}`} className="link-line text-brassdark">
                {quote.email}
              </a>
            </dd>
            <dt className="font-semibold text-ink/55">Téléphone</dt>
            <dd>
              <a
                href={`tel:${quote.phone.replace(/\s/g, "")}`}
                className="link-line text-brassdark"
              >
                {quote.phone}
              </a>
            </dd>
            <dt className="font-semibold text-ink/55">Type de projet</dt>
            <dd className="text-ink">{quote.projectType}</dd>
            <dt className="font-semibold text-ink/55">Localisation</dt>
            <dd className="text-ink">{quote.location || "—"}</dd>
            <dt className="font-semibold text-ink/55">Budget</dt>
            <dd className="text-ink">{quote.budget}</dd>
            <dt className="font-semibold text-ink/55">Démarrage</dt>
            <dd className="text-ink">{quote.desiredDate}</dd>
            <dt className="font-semibold text-ink/55">Reçue le</dt>
            <dd className="text-ink">{fmtDate(quote.createdAt)}</dd>
            <dt className="font-semibold text-ink/55">Modifiée le</dt>
            <dd className="text-ink">{fmtDate(quote.updatedAt)}</dd>
          </dl>
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/55">
                Description du projet
              </p>
              <p className="mt-2 whitespace-pre-wrap rounded-[4px] border border-ink/10 bg-bone p-4 text-sm leading-relaxed text-ink/80">
                {quote.projectDescription}
              </p>
            </div>
            <div>
              <label
                htmlFor={`status-${quote.id}`}
                className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/55"
              >
                Changer le statut
              </label>
              <select
                id={`status-${quote.id}`}
                value={quote.status}
                onChange={(e) => changeStatus(e.target.value as QuoteStatus)}
                className="mt-2 w-full cursor-pointer rounded-[3px] border border-line bg-bone px-4 py-2.5 text-sm focus:border-brassdark focus:outline-none"
              >
                {(Object.keys(STATUS_LABELS) as QuoteStatus[]).map((s) => (
                  <option key={s} value={s}>
                    {STATUS_LABELS[s]}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </li>
  );
}

/* ————— Tableau de bord ————— */
function Dashboard() {
  const [tick, setTick] = useState(0);
  const [tab, setTab] = useState<"demandes" | "analytics" | "conversion">("demandes");
  const [filter, setFilter] = useState<QuoteStatus | "ALL">("ALL");
  const refresh = () => setTick((t) => t + 1);

  const quotes = useMemo(() => listQuotes(), [tick]);
  const events = useMemo(() => listEvents(), [tick]);

  const byStatus = useMemo(() => {
    const c: Record<QuoteStatus, number> = {
      NEW: 0,
      IN_PROGRESS: 0,
      COMPLETED: 0,
      ARCHIVED: 0,
    };
    for (const q of quotes) c[q.status] += 1;
    return c;
  }, [quotes]);

  const visible = filter === "ALL" ? quotes : quotes.filter((q) => q.status === filter);

  const eventCounts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const e of events) c[e.name] = (c[e.name] ?? 0) + 1;
    return Object.entries(c).sort((a, b) => b[1] - a[1]);
  }, [events]);

  // Données de conversion par page
  const conversionData = useMemo(() => {
    const pageViews: Record<string, number> = {};
    const formSubmissions: Record<string, number> = {};

    for (const e of events) {
      if (e.name === "page_view" && e.data?.pathname) {
        const path = e.data.pathname;
        pageViews[path] = (pageViews[path] ?? 0) + 1;
      }
      if (e.name === "form_submit_success" && e.data?.sourcePage) {
        const path = e.data.sourcePage;
        formSubmissions[path] = (formSubmissions[path] ?? 0) + 1;
      }
    }

    // Combiner les données
    const allPages = new Set([...Object.keys(pageViews), ...Object.keys(formSubmissions)]);
    const data = Array.from(allPages).map((page) => {
      const views = pageViews[page] ?? 0;
      const submissions = formSubmissions[page] ?? 0;
      const rate = views > 0 ? (submissions / views) * 100 : 0;
      return { page, views, submissions, rate };
    });

    // Trier par nombre de soumissions (desc)
    data.sort((a, b) => b.submissions - a.submissions);
    return data;
  }, [events]);

  const totalViews = conversionData.reduce((sum, d) => sum + d.views, 0);
  const totalSubmissions = conversionData.reduce((sum, d) => sum + d.submissions, 0);
  const globalRate = totalViews > 0 ? (totalSubmissions / totalViews) * 100 : 0;

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(quotes, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `demandes-atelier228-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    track("admin_export");
  };

  const maxCount = Math.max(1, ...eventCounts.map(([, n]) => n));

  return (
    <section className="mx-auto max-w-7xl px-5 pb-24 pt-28 sm:px-8 sm:pt-36">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brassdark">
            Espace entreprise
          </p>
          <h1 className="mt-3 font-display text-3xl font-medium text-ink sm:text-4xl">
            Demandes de devis
          </h1>
          <p className="mt-2 text-sm text-ink/60">
            {quotes.length} demande{quotes.length > 1 ? "s" : ""} enregistrée
            {quotes.length > 1 ? "s" : ""} · aucune ne peut disparaître silencieusement.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={exportJson}
            disabled={quotes.length === 0}
            className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-[3px] border border-ink/20 px-5 text-[12px] font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper disabled:cursor-not-allowed disabled:opacity-40"
          >
            <IconDownload className="h-4 w-4" /> Exporter (JSON)
          </button>
          <button
            type="button"
            onClick={refresh}
            className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-[3px] border border-ink/20 px-5 text-[12px] font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
          >
            Actualiser
          </button>
        </div>
      </div>

      {/* Compteurs par statut */}
      <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-[4px] border border-ink/10 bg-ink/10 sm:grid-cols-4">
        {(Object.keys(STATUS_LABELS) as QuoteStatus[]).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setFilter(filter === s ? "ALL" : s)}
            aria-pressed={filter === s}
            className={cx(
              "cursor-pointer bg-paper p-5 text-left transition-colors",
              filter === s && "bg-sand"
            )}
          >
            <span className="font-display text-3xl font-medium text-ink">
              {byStatus[s]}
            </span>
            <span className="mt-1 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/55">
              <span className={cx("h-2 w-2 rounded-full", STATUS_STYLES[s])} />
              {STATUS_LABELS[s]}
            </span>
          </button>
        ))}
      </div>

      {/* Onglets */}
      <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Sections du tableau de bord">
        {(
          [
            ["demandes", "Demandes"],
            ["conversion", "Conversion"],
            ["analytics", "Parcours visiteurs"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            role="tab"
            aria-selected={tab === key}
            onClick={() => setTab(key)}
            className={cx(
              "cursor-pointer rounded-[3px] px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.14em] transition-colors",
              tab === key
                ? "bg-deep text-paper"
                : "border border-ink/15 text-ink/60 hover:border-ink/40"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "demandes" ? (
        visible.length > 0 ? (
          <ul className="mt-6 rounded-[4px] border border-ink/10 bg-bone px-5">
            {visible.map((q) => (
              <QuoteRow key={q.id} quote={q} onChanged={refresh} />
            ))}
          </ul>
        ) : (
          <div className="mt-6 rounded-[4px] border border-dashed border-ink/25 bg-sand/50 p-10 text-center">
            <p className="font-display text-2xl font-medium italic text-ink/70">
              {filter === "ALL"
                ? "Aucune demande pour le moment."
                : `Aucune demande « ${STATUS_LABELS[filter as QuoteStatus]} ».`}
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm text-ink/55">
              Dès qu'un visiteur envoie le formulaire de devis, sa demande
              apparaît ici instantanément — avec référence unique et horodatage.
            </p>
            {filter !== "ALL" && (
              <button
                type="button"
                onClick={() => setFilter("ALL")}
                className="link-line mt-4 cursor-pointer text-[12px] font-semibold uppercase tracking-[0.14em] text-brassdark"
              >
                Afficher toutes les demandes
              </button>
            )}
          </div>
        )
      ) : tab === "conversion" ? (
        /* ——— Onglet Conversion ——— */
        <div className="mt-6 space-y-6">
          {/* Résumé global */}
          <div className="grid gap-px overflow-hidden rounded-[4px] border border-ink/10 bg-ink/10 sm:grid-cols-3">
            <div className="bg-paper p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/55">
                Visites totales
              </p>
              <p className="mt-2 font-display text-4xl font-medium text-ink">
                {totalViews}
              </p>
              <p className="mt-1 text-xs text-ink/45">Pages visitées</p>
            </div>
            <div className="bg-paper p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/55">
                Demandes reçues
              </p>
              <p className="mt-2 font-display text-4xl font-medium text-ink">
                {totalSubmissions}
              </p>
              <p className="mt-1 text-xs text-ink/45">Formulaires soumis</p>
            </div>
            <div className="bg-paper p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/55">
                Taux de conversion
              </p>
              <p className="mt-2 font-display text-4xl font-medium text-brassdark">
                {globalRate.toFixed(1)}%
              </p>
              <p className="mt-1 text-xs text-ink/45">Global</p>
            </div>
          </div>

          {/* Tableau par page */}
          <div className="rounded-[4px] border border-ink/10 bg-bone">
            <div className="border-b border-ink/10 p-5">
              <h2 className="font-display text-xl font-medium text-ink">
                Taux de conversion par page
              </h2>
              <p className="mt-1 text-sm text-ink/60">
                Quelle page génère le plus de demandes de devis ?
              </p>
            </div>
            {conversionData.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-ink/10 bg-sand/50">
                    <tr>
                      <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/55">
                        Page
                      </th>
                      <th className="px-5 py-3 text-right text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/55">
                        Visites
                      </th>
                      <th className="px-5 py-3 text-right text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/55">
                        Demandes
                      </th>
                      <th className="px-5 py-3 text-right text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/55">
                        Taux
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {conversionData.map((row) => (
                      <tr key={row.page} className="border-b border-ink/8 last:border-b-0">
                        <td className="px-5 py-4 font-mono text-[13px] text-ink/80">
                          {row.page}
                        </td>
                        <td className="px-5 py-4 text-right text-ink/70">
                          {row.views}
                        </td>
                        <td className="px-5 py-4 text-right font-semibold text-ink">
                          {row.submissions}
                        </td>
                        <td className="px-5 py-4 text-right">
                          <span
                            className={cx(
                              "inline-block rounded-[3px] px-2.5 py-1 font-mono text-[13px] font-semibold",
                              row.rate > 5
                                ? "bg-ok/15 text-ok"
                                : row.rate > 0
                                ? "bg-brass/15 text-brassdark"
                                : "bg-ink/8 text-ink/45"
                            )}
                          >
                            {row.rate.toFixed(1)}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-10 text-center">
                <p className="font-display text-xl font-medium italic text-ink/60">
                  Aucune donnée de conversion pour le moment.
                </p>
                <p className="mt-2 text-sm text-ink/50">
                  Les visites de pages et les soumissions de formulaire seront
                  trackées automatiquement.
                </p>
              </div>
            )}
          </div>

          <p className="rounded-[4px] border border-brassdark/25 bg-sand/70 p-4 text-xs leading-relaxed text-ink/60">
            <strong className="text-brassdark">Données réelles :</strong> ces
            chiffres sont basés sur les visites de pages et les soumissions
            effectives de formulaire. Aucune estimation, aucun chiffre inventé.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[4px] border border-ink/10 bg-bone p-6">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/55">
              Événements de conversion
            </h2>
            {eventCounts.length > 0 ? (
              <ul className="mt-4 space-y-3">
                {eventCounts.map(([name, count]) => (
                  <li key={name}>
                    <div className="flex items-baseline justify-between text-[13px]">
                      <span className="font-mono text-ink/75">{name}</span>
                      <span className="font-display text-lg italic text-brassdark">
                        {count}
                      </span>
                    </div>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-ink/8">
                      <div
                        className="h-full rounded-full bg-brassdark transition-all duration-700"
                        style={{ width: `${(count / maxCount) * 100}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-ink/55">
                Aucun événement enregistré pour l'instant.
              </p>
            )}
          </div>
          <div className="rounded-[4px] border border-ink/10 bg-bone p-6">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/55">
              Derniers événements
            </h2>
            <ul className="mt-4 max-h-96 space-y-2 overflow-y-auto">
              {[...events]
                .reverse()
                .slice(0, 30)
                .map((e, i) => (
                  <li
                    key={`${e.at}-${i}`}
                    className="flex items-baseline justify-between gap-3 border-b border-ink/8 pb-2 text-[12.5px]"
                  >
                    <span className="font-mono text-ink/75">
                      {e.name}
                      {e.data?.source ? (
                        <span className="text-ink/45"> · {e.data.source}</span>
                      ) : null}
                      {e.data?.ref ? (
                        <span className="text-brassdark"> · {e.data.ref}</span>
                      ) : null}
                    </span>
                    <span className="shrink-0 text-[11px] text-ink/40">
                      {fmtDate(e.at)}
                    </span>
                  </li>
                ))}
              {events.length === 0 && (
                <li className="text-sm text-ink/55">Aucun événement.</li>
              )}
            </ul>
          </div>
        </div>
      )}

      <p className="mt-8 rounded-[4px] border border-brassdark/25 bg-sand/70 p-4 text-xs leading-relaxed text-ink/60">
        <strong className="text-brassdark">Source de vérité :</strong> chaque
        demande n'est confirmée au visiteur qu'après enregistrement effectif
        dans le stockage persistant. En production, connectez cet espace à
        l'API serveur (mêmes signatures de fonctions dans{" "}
        <code className="font-mono">src/lib/store.ts</code>).
      </p>
    </section>
  );
}

export default function Admin() {
  usePageMeta(
    "Espace entreprise — Demandes de devis | Atelier 228",
    "Consultation des demandes de devis reçues par Atelier 228 : informations prospects, statuts, dates de réception."
  );

  const [authed, setAuthed] = useState(() => {
    try {
      return sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      return false;
    }
  });

  return authed ? (
    <Dashboard />
  ) : (
    <Gate
      onSuccess={() => {
        setAuthed(true);
      }}
    />
  );
}

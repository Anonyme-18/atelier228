/* ============================================================
   Store persistant — la base de données du site.
   Dans ce déploiement statique, le stockage est assuré par
   localStorage (les demandes survivent au rechargement et
   restent consultables par l'entreprise via /#/admin).
   Pour la production avec backend, remplacez les fonctions
   ci-dessous par des appels API : la signature reste identique.
   ============================================================ */

export type QuoteStatus = "NEW" | "IN_PROGRESS" | "COMPLETED" | "ARCHIVED";

export interface QuoteRequest {
  id: string;
  ref: string;
  fullName: string;
  email: string;
  phone: string;
  projectType: string;
  projectDescription: string;
  location: string;
  budget: string;
  desiredDate: string;
  status: QuoteStatus;
  createdAt: string; // ISO
  updatedAt: string; // ISO
}

export const STATUS_LABELS: Record<QuoteStatus, string> = {
  NEW: "Nouvelle",
  IN_PROGRESS: "En cours",
  COMPLETED: "Traitée",
  ARCHIVED: "Archivée",
};

const QUOTES_KEY = "atelier228:quotes:v1";
const EVENTS_KEY = "atelier228:events:v1";

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown): void {
  localStorage.setItem(key, JSON.stringify(value));
}

/* ————— Demandes de devis ————— */

export function listQuotes(): QuoteRequest[] {
  const rows = readJson<QuoteRequest[]>(QUOTES_KEY, []);
  return Array.isArray(rows) ? rows : [];
}

/** Insère une demande. Lève une erreur si l'écriture échoue. */
export function insertQuote(q: QuoteRequest): QuoteRequest {
  const rows = listQuotes();
  rows.unshift(q);
  writeJson(QUOTES_KEY, rows); // throw si quota/indisponible
  return q;
}

export function updateQuoteStatus(
  id: string,
  status: QuoteStatus
): QuoteRequest | null {
  const rows = listQuotes();
  const idx = rows.findIndex((r) => r.id === id);
  if (idx === -1) return null;
  rows[idx] = { ...rows[idx], status, updatedAt: new Date().toISOString() };
  writeJson(QUOTES_KEY, rows);
  return rows[idx];
}

/* ————— Journal d'événements (analytics) ————— */

export interface AnalyticsEvent {
  name: string;
  data?: Record<string, string>;
  at: string;
}

export function listEvents(): AnalyticsEvent[] {
  const rows = readJson<AnalyticsEvent[]>(EVENTS_KEY, []);
  return Array.isArray(rows) ? rows : [];
}

export function recordEvent(name: string, data?: Record<string, string>) {
  try {
    const rows = listEvents();
    rows.push({ name, data, at: new Date().toISOString() });
    writeJson(EVENTS_KEY, rows.slice(-400)); // borne le journal
  } catch {
    /* le journal ne doit jamais casser le parcours utilisateur */
  }
}

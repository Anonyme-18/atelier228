/* ============================================================
   API de soumission des demandes de devis.
   Joue le rôle du serveur : re-validation stricte des données,
   sanitation, anti-spam (honeypot), limitation de débit,
   puis enregistrement persistant via le store.
   Règle : une demande n'est "reçue" que si insertQuote a
   réellement réussi. Aucun faux succès possible.
   ============================================================ */

import { insertQuote, type QuoteRequest } from "./store";

export const PROJECT_TYPES = [
  "Rénovation complète",
  "Aménagement intérieur",
  "Cuisine",
  "Salle de bain",
  "Autre",
] as const;

export const BUDGET_OPTIONS = [
  "Moins de 1 million FCFA",
  "1 à 3 millions FCFA",
  "3 à 10 millions FCFA",
  "Plus de 10 millions FCFA",
  "À définir ensemble",
] as const;

export interface QuoteInput {
  fullName: string;
  email: string;
  phone: string;
  projectType: string;
  projectDescription: string;
  location: string;
  budget: string;
  desiredDate: string;
  website: string; // honeypot — doit rester vide
}

export type FieldErrors = Partial<Record<keyof QuoteInput, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?\d{8,15}$/;

export function sanitize(value: string, max: number): string {
  return value.replace(/\s+/g, " ").trim().slice(0, max);
}

/** Validation stricte — exécutée côté client ET "côté serveur". */
export function validateQuote(input: QuoteInput): FieldErrors {
  const errors: FieldErrors = {};

  const name = sanitize(input.fullName, 80);
  if (name.length < 2) errors.fullName = "Indiquez votre nom complet.";

  const email = input.email.trim().toLowerCase();
  if (!EMAIL_RE.test(email)) errors.email = "Indiquez une adresse email valide.";

  const phoneDigits = input.phone.replace(/[\s.\-()]/g, "");
  if (!PHONE_RE.test(phoneDigits))
    errors.phone = "Indiquez un numéro de téléphone valide (8 chiffres minimum).";

  if (
    !PROJECT_TYPES.includes(input.projectType as (typeof PROJECT_TYPES)[number])
  )
    errors.projectType = "Sélectionnez le type de projet.";

  const desc = sanitize(input.projectDescription, 1600);
  if (desc.length < 20)
    errors.projectDescription =
      "Décrivez votre projet en quelques phrases (20 caractères minimum).";
  else if (desc.length > 1500)
    errors.projectDescription =
      "Votre description dépasse 1500 caractères. Résumez l'essentiel.";

  if (input.location.length > 120)
    errors.location = "120 caractères maximum.";

  if (input.budget && !BUDGET_OPTIONS.includes(input.budget as never))
    errors.budget = "Sélectionnez une estimation dans la liste.";

  return errors;
}

export type SubmitResult =
  | { ok: true; id: string; ref: string; honeypot?: boolean }
  | {
      ok: false;
      code: "VALIDATION" | "RATE_LIMIT" | "STORAGE";
      error: string;
      errors?: FieldErrors;
    };

const RATE_LIMIT_MS = 30_000;
const LAST_KEY = "atelier228:lastsubmit";
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function makeId(): string {
  try {
    if (typeof crypto !== "undefined" && crypto.randomUUID)
      return crypto.randomUUID();
  } catch {
    /* ignore */
  }
  return `id-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function makeRef(): string {
  const d = new Date();
  const ym = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, "0")}`;
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `D-${ym}-${rand}`;
}

export async function submitQuoteRequest(
  input: QuoteInput
): Promise<SubmitResult> {
  // Latence réseau simulée (état "submitting" perceptible)
  await sleep(850 + Math.random() * 450);

  // 1. Honeypot : les bots remplissent ce champ caché.
  //    On acquitte silencieusement sans rien enregistrer.
  if (input.website && input.website.trim() !== "") {
    return { ok: true, id: "spam", ref: "SPAM", honeypot: true };
  }

  // 2. Re-validation stricte (ne jamais faire confiance au client)
  const errors = validateQuote(input);
  if (Object.keys(errors).length > 0) {
    return {
      ok: false,
      code: "VALIDATION",
      error: "Certains champs doivent être corrigés avant l'envoi.",
      errors,
    };
  }

  // 3. Limitation de débit (anti double-soumission / abus)
  try {
    const last = Number(localStorage.getItem(LAST_KEY) || 0);
    if (Date.now() - last < RATE_LIMIT_MS) {
      return {
        ok: false,
        code: "RATE_LIMIT",
        error:
          "Une demande vient déjà d'être envoyée depuis cet appareil. Patientez quelques secondes puis réessayez.",
      };
    }
  } catch {
    /* stockage indisponible : on laisse passer */
  }

  // 4. Enregistrement — la source de vérité
  const now = new Date().toISOString();
  const quote: QuoteRequest = {
    id: makeId(),
    ref: makeRef(),
    fullName: sanitize(input.fullName, 80),
    email: input.email.trim().toLowerCase(),
    phone: sanitize(input.phone, 30),
    projectType: input.projectType,
    projectDescription: sanitize(input.projectDescription, 1500),
    location: sanitize(input.location, 120),
    budget: input.budget || "—",
    desiredDate: input.desiredDate || "—",
    status: "NEW",
    createdAt: now,
    updatedAt: now,
  };

  try {
    insertQuote(quote);
    try {
      localStorage.setItem(LAST_KEY, String(Date.now()));
    } catch {
      /* non bloquant */
    }
    return { ok: true, id: quote.id, ref: quote.ref };
  } catch {
    return {
      ok: false,
      code: "STORAGE",
      error:
        "Nous n'avons pas pu enregistrer votre demande. Vérifiez votre connexion et réessayez. Vous pouvez aussi nous contacter directement par téléphone ou WhatsApp.",
    };
  }
}

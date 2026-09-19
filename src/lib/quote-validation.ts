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
  website: string;
}

export type FieldErrors = Partial<Record<keyof QuoteInput, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?\d{8,15}$/;

export function sanitize(value: string, max: number): string {
  return value.replace(/\s+/g, " ").trim().slice(0, max);
}

export function validateQuote(input: QuoteInput): FieldErrors {
  const errors: FieldErrors = {};
  const name = sanitize(input.fullName, 80);
  const email = input.email.trim().toLowerCase();
  const phone = input.phone.replace(/[\s.\-()]/g, "");
  const description = sanitize(input.projectDescription, 1500);

  if (name.length < 2) errors.fullName = "Indiquez votre nom complet.";
  if (!EMAIL_RE.test(email)) errors.email = "Indiquez une adresse email valide.";
  if (!PHONE_RE.test(phone))
    errors.phone = "Indiquez un numéro de téléphone valide (8 chiffres minimum).";
  if (!PROJECT_TYPES.includes(input.projectType as (typeof PROJECT_TYPES)[number]))
    errors.projectType = "Sélectionnez le type de projet.";
  if (description.length < 20)
    errors.projectDescription =
      "Décrivez votre projet en quelques phrases (20 caractères minimum).";
  if (input.location.length > 120) errors.location = "120 caractères maximum.";
  if (input.budget && !BUDGET_OPTIONS.includes(input.budget as (typeof BUDGET_OPTIONS)[number]))
    errors.budget = "Sélectionnez une estimation dans la liste.";
  if (input.desiredDate && !/^\d{4}-(0[1-9]|1[0-2])$/.test(input.desiredDate))
    errors.desiredDate = "Sélectionnez une date valide.";

  return errors;
}

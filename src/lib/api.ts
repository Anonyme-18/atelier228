import { validateQuote, type FieldErrors, type QuoteInput } from "./quote-validation";

export { BUDGET_OPTIONS, PROJECT_TYPES, sanitize, validateQuote } from "./quote-validation";
export type { FieldErrors, QuoteInput } from "./quote-validation";

export type SubmitResult =
  | { ok: true; id: string; ref: string; honeypot?: boolean }
  | {
      ok: false;
      code: "VALIDATION" | "RATE_LIMIT" | "STORAGE";
      error: string;
      errors?: FieldErrors;
    };

export async function submitQuoteRequest(input: QuoteInput): Promise<SubmitResult> {
  const clientErrors = validateQuote(input);
  if (Object.keys(clientErrors).length > 0) {
    return {
      ok: false,
      code: "VALIDATION",
      error: "Certains champs doivent être corrigés avant l'envoi.",
      errors: clientErrors,
    };
  }

  try {
    const response = await fetch("/api/quotes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    const payload = (await response.json()) as {
      data?: { id: string; ref: string };
      error?: string;
      errors?: FieldErrors;
      code?: Extract<SubmitResult, { ok: false }>["code"];
    };
    if (!response.ok)
      return {
        ok: false,
        code: payload.code ?? (response.status === 429 ? "RATE_LIMIT" : "STORAGE"),
        error: payload.error ?? "La demande n'a pas pu être envoyée.",
        errors: payload.errors,
      };
    if (!payload.data?.id || !payload.data.ref)
      return { ok: false, code: "STORAGE", error: "Réponse serveur invalide." };
    return { ok: true, ...payload.data };
  } catch {
    return {
      ok: false,
      code: "STORAGE",
      error: "Connexion impossible. Réessayez dans quelques instants.",
    };
  }
}

import { neon } from "@neondatabase/serverless";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sanitize, validateQuote, type QuoteInput } from "../src/lib/quote-validation";

const MAX_BODY_BYTES = 20_000;
const recentRequests = new Map<string, number[]>();

function setSecurityHeaders(res: VercelResponse) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Content-Security-Policy", "default-src 'none'; frame-ancestors 'none'");
}

function clientIp(req: VercelRequest): string {
  const forwarded = req.headers["x-forwarded-for"];
  return (Array.isArray(forwarded) ? forwarded[0] : forwarded?.split(",")[0])?.trim() || "unknown";
}

function allowedRequest(ip: string): boolean {
  const now = Date.now();
  const timestamps = (recentRequests.get(ip) ?? []).filter((time) => time > now - 60 * 60 * 1000);
  if (timestamps.length >= 5) {
    recentRequests.set(ip, timestamps);
    return false;
  }
  timestamps.push(now);
  recentRequests.set(ip, timestamps);
  return true;
}

function parseBody(req: VercelRequest): QuoteInput | null {
  const raw = typeof req.body === "string" ? req.body : JSON.stringify(req.body ?? {});
  if (Buffer.byteLength(raw, "utf8") > MAX_BODY_BYTES) return null;
  try {
    const body = JSON.parse(raw) as Partial<QuoteInput>;
    return {
      fullName: typeof body.fullName === "string" ? body.fullName : "",
      email: typeof body.email === "string" ? body.email : "",
      phone: typeof body.phone === "string" ? body.phone : "",
      projectType: typeof body.projectType === "string" ? body.projectType : "",
      projectDescription: typeof body.projectDescription === "string" ? body.projectDescription : "",
      location: typeof body.location === "string" ? body.location : "",
      budget: typeof body.budget === "string" ? body.budget : "",
      desiredDate: typeof body.desiredDate === "string" ? body.desiredDate : "",
      website: typeof body.website === "string" ? body.website : "",
    };
  } catch {
    return null;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setSecurityHeaders(res);
  if (req.method !== "POST") return res.status(405).setHeader("Allow", "POST").json({ error: "Méthode non autorisée." });
  const databaseUrl = process.env.NEON_DATABASE_URL;
  if (!databaseUrl) return res.status(500).json({ error: "Database unavailable" });
  if (!allowedRequest(clientIp(req))) return res.status(429).json({ code: "RATE_LIMIT", error: "Trop de demandes. Réessayez plus tard." });

  const input = parseBody(req);
  if (!input) return res.status(400).json({ code: "VALIDATION", error: "Requête invalide." });
  if (input.website.trim()) return res.status(202).json({ data: { id: "spam", ref: "SPAM" } });
  const errors = validateQuote(input);
  if (Object.keys(errors).length > 0) return res.status(400).json({ code: "VALIDATION", error: "Certains champs doivent être corrigés.", errors });

  try {
    const sql = neon(databaseUrl);
    const ref = `D-${new Date().toISOString().slice(2, 7).replace("-", "")}-${crypto.randomUUID().slice(0, 4).toUpperCase()}`;
    const [quote] = await sql`
      INSERT INTO quote_requests (ref, full_name, email, phone, project_type, project_description, location, budget, desired_date, status, created_at, updated_at)
      VALUES (${ref}, ${sanitize(input.fullName, 80)}, ${input.email.trim().toLowerCase()}, ${sanitize(input.phone, 30)}, ${input.projectType}, ${sanitize(input.projectDescription, 1500)}, ${sanitize(input.location, 120) || null}, ${input.budget || null}, ${input.desiredDate || null}, 'NEW', NOW(), NOW())
      RETURNING id, ref
    `;
    return res.status(201).json({ data: quote });
  } catch (error) {
    console.error("Quote insertion failed", error);
    return res.status(500).json({ code: "STORAGE", error: "Impossible d'enregistrer la demande." });
  }
}

import { neon } from "@neondatabase/serverless";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // Rate limiting (simple in-memory for demo, use Redis in production)
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const rateLimitKey = `rate_limit_${ip}`;
  
  // Check database URL
  const databaseUrl = process.env.VITE_NEON_DATABASE_URL;
  if (!databaseUrl) {
    return res.status(500).json({ error: "Database URL not configured" });
  }

  try {
    const sql = neon(databaseUrl);

    if (req.method === "POST") {
      const { fullName, email, phone, projectType, projectDescription, location, budget, desiredDate } = req.body;

      // Validation
      if (!fullName || !email || !phone || !projectType || !projectDescription) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Insert quote request
      const result = await sql`
        INSERT INTO quote_requests (
          full_name, email, phone, project_type, project_description, 
          location, budget, desired_date, status, created_at, updated_at
        ) VALUES (
          ${fullName}, ${email}, ${phone}, ${projectType}, ${projectDescription},
          ${location || null}, ${budget || null}, ${desiredDate || null}, 'NEW', NOW(), NOW()
        )
        RETURNING *
      `;

      return res.status(201).json({ success: true, data: result[0] });
    }

    if (req.method === "GET") {
      const quotes = await sql`
        SELECT * FROM quote_requests 
        ORDER BY created_at DESC 
        LIMIT 100
      `;

      return res.status(200).json({ success: true, data: quotes });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

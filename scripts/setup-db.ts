import { neon } from "@neondatabase/serverless";
import * as dotenv from "dotenv";

dotenv.config();

async function setupDatabase() {
  const databaseUrl = process.env.VITE_NEON_DATABASE_URL;
  
  if (!databaseUrl) {
    console.error("❌ VITE_NEON_DATABASE_URL not found in .env.local");
    process.exit(1);
  }

  console.log("🔧 Setting up database...");

  try {
    const sql = neon(databaseUrl);

    // Create quote_requests table
    await sql`
      CREATE TABLE IF NOT EXISTS quote_requests (
        id SERIAL PRIMARY KEY,
        ref VARCHAR(20) UNIQUE NOT NULL,
        full_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        project_type VARCHAR(100) NOT NULL,
        project_description TEXT NOT NULL,
        location VARCHAR(200),
        budget VARCHAR(100),
        desired_date VARCHAR(20),
        status VARCHAR(20) DEFAULT 'NEW',
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `;

    console.log("✅ Table 'quote_requests' created successfully");

    // Create index for faster queries
    await sql`
      CREATE INDEX IF NOT EXISTS idx_quote_requests_status 
      ON quote_requests(status)
    `;

    await sql`
      CREATE INDEX IF NOT EXISTS idx_quote_requests_created_at 
      ON quote_requests(created_at DESC)
    `;

    console.log("✅ Indexes created successfully");

    // Create analytics_events table
    await sql`
      CREATE TABLE IF NOT EXISTS analytics_events (
        id SERIAL PRIMARY KEY,
        event_name VARCHAR(100) NOT NULL,
        event_data JSONB,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;

    console.log("✅ Table 'analytics_events' created successfully");

    // Create index for analytics
    await sql`
      CREATE INDEX IF NOT EXISTS idx_analytics_events_name 
      ON analytics_events(event_name)
    `;

    await sql`
      CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at 
      ON analytics_events(created_at DESC)
    `;

    console.log("✅ Indexes created successfully");

    console.log("\n🎉 Database setup complete!");
    console.log("\n📊 Tables created:");
    console.log("   - quote_requests");
    console.log("   - analytics_events");
  } catch (error) {
    console.error("❌ Error setting up database:", error);
    process.exit(1);
  }
}

setupDatabase();

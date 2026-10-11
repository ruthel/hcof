import nextEnv from "@next/env";
import { Kysely, PostgresDialect } from "kysely";
nextEnv.loadEnvConfig(process.cwd());
if (!process.env.DATABASE_URL && !process.env.POSTGRES_URL) {
  console.log("PostgreSQL not connected yet; keeping the existing public content available.");
} else {
  const { getDatabase } = await import("../lib/database.js");
  const { createAuth, authConfigured } = await import("../lib/auth.js");
  const db = getDatabase(); const client = await db.connect();
  try {
    // Transaction-scoped lock also works with pooled PostgreSQL connections.
    await client.query("BEGIN");
    await client.query("SELECT pg_advisory_xact_lock(72638419)");
    await client.query(`CREATE TABLE IF NOT EXISTS hcof_content (
      id smallint PRIMARY KEY CHECK (id = 1), content jsonb NOT NULL, revision text NOT NULL,
      updated_at timestamptz NOT NULL DEFAULT now()
    ); CREATE TABLE IF NOT EXISTS hcof_photos (
      id text PRIMARY KEY, data bytea NOT NULL CHECK (octet_length(data) <= 3145728),
      content_type text NOT NULL CHECK (content_type IN ('image/jpeg', 'image/png', 'image/webp')),
      created_at timestamptz NOT NULL DEFAULT now()
    );`);
    if (authConfigured()) {
      // Run schema changes on the same connection holding the migration lock.
      const connection = { query: client.query.bind(client), release() {} };
      const migrationDb = new Kysely({ dialect: new PostgresDialect({ pool: { connect: async () => connection, end: async () => {} } }) });
      const auth = createAuth({ bootstrap: true, database: { db: migrationDb, type: "postgres" } });
      const { getMigrations } = await import("better-auth/db/migration");
      const { runMigrations } = await getMigrations(auth.options); await runMigrations();
      const email = (process.env.ADMIN_EMAILS || "").split(",")[0].trim().toLowerCase();
      const password = process.env.ADMIN_INITIAL_PASSWORD;
      if (email && password) {
        const { rows } = await client.query('SELECT id FROM "user" WHERE email = $1', [email]);
        if (!rows.length) {
          if (password.length < 12 || password.length > 128) throw new Error("Initial admin password must contain 12 to 128 characters.");
          await auth.api.signUpEmail({ body: { email, password, name: "HCOF Administrator" } });
          console.log("Initial administrator created. Remove ADMIN_INITIAL_PASSWORD after deployment.");
        }
      }
      console.log("PostgreSQL content and authentication tables are ready.");
    } else console.log("Content tables are ready; configure BETTER_AUTH_SECRET and BETTER_AUTH_URL for authentication.");
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK"); throw error;
  } finally {
    client.release(); await db.end();
  }
}

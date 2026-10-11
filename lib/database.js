import pg from "pg";
let pool;
export const databaseConfigured = () => Boolean(process.env.DATABASE_URL || process.env.POSTGRES_URL);
export function getDatabase() {
  if (!databaseConfigured()) throw new Error("database_not_configured");
  return pool ||= new pg.Pool({ connectionString: process.env.DATABASE_URL || process.env.POSTGRES_URL, max: 3, idleTimeoutMillis: 10000, connectionTimeoutMillis: 10000 });
}

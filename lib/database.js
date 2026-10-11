import pg from "pg";
let pool;
export function databaseUrl(env = process.env) {
  // Prisma exposes both direct PostgreSQL URLs and an Accelerate URL.
  // The pg driver requires the direct PostgreSQL connection.
  return [env.POSTGRES_URL, env.DATABASE_URL, env.PRISMA_DATABASE_URL].find((value) => /^postgres(ql)?:\/\//i.test(value || ""));
}
export const databaseConfigured = () => Boolean(databaseUrl());
export function getDatabase() {
  if (!databaseConfigured()) throw new Error("database_not_configured");
  return pool ||= new pg.Pool({ connectionString: databaseUrl(), max: 3, idleTimeoutMillis: 10000, connectionTimeoutMillis: 10000 });
}

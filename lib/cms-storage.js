import { randomUUID } from "node:crypto";
import { DEFAULT_CONTENT } from "./default-content.js";
import { getDatabase, databaseConfigured } from "./database.js";
export const storageConfigured = databaseConfigured;
export async function readContent() {
  if (!databaseConfigured()) return { content: DEFAULT_CONTENT, revision: "initial" };
  const { rows } = await getDatabase().query("SELECT content, revision FROM hcof_content WHERE id = 1");
  return rows[0] || { content: DEFAULT_CONTENT, revision: "initial" };
}
export async function writeContent(content, revision) {
  const nextRevision = randomUUID();
  const query = revision === "initial"
    ? "INSERT INTO hcof_content (id, content, revision) VALUES (1, $1::jsonb, $2) ON CONFLICT (id) DO NOTHING RETURNING content, revision"
    : "UPDATE hcof_content SET content = $1::jsonb, revision = $2, updated_at = now() WHERE id = 1 AND revision = $3 RETURNING content, revision";
  const { rows } = await getDatabase().query(query, revision === "initial" ? [JSON.stringify(content), nextRevision] : [JSON.stringify(content), nextRevision, revision]);
  if (!rows.length) throw new Error("content_conflict");
  return rows[0];
}
export async function storePhoto(id, bytes, contentType) {
  await getDatabase().query("INSERT INTO hcof_photos (id, data, content_type) VALUES ($1, $2, $3)", [id, bytes, contentType]);
}
export async function loadPhoto(id) {
  const { rows } = await getDatabase().query("SELECT data FROM hcof_photos WHERE id = $1", [id]);
  return rows[0]?.data || null;
}

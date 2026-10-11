import { get, put, BlobPreconditionFailedError } from "@vercel/blob";
import { createHash, randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile, rename, open, unlink } from "node:fs/promises";
import path from "node:path";
import { DEFAULT_CONTENT } from "./default-content.js";
const CONTENT_PATH = "hcof/cms/content.json";
const LOCAL_FOLDER = process.env.CMS_LOCAL_DATA_DIR || path.join(process.cwd(), ".cms");
const LOCAL_PATH = path.join(LOCAL_FOLDER, "content.json");
export const localStorageEnabled = () => process.env.CMS_LOCAL_STORAGE === "true" && !process.env.VERCEL && process.env.NODE_ENV !== "production";
export const storageConfigured = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN || localStorageEnabled());
export const revisionOf = (value) => createHash("sha256").update(value).digest("hex");
export async function readContent() {
  if (localStorageEnabled()) {
    try { const value = await readFile(LOCAL_PATH, "utf8"); return { content: JSON.parse(value), revision: revisionOf(value) }; }
    catch (error) { if (error.code !== "ENOENT") throw error; return { content: DEFAULT_CONTENT, revision: "initial" }; }
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) return { content: DEFAULT_CONTENT, revision: "initial" };
  const blob = await get(CONTENT_PATH, { access: "private", useCache: false });
  if (!blob) return { content: DEFAULT_CONTENT, revision: "initial" };
  return { content: await new Response(blob.stream).json(), revision: blob.blob.etag };
}
export async function writeContent(content, revision) {
  if (!storageConfigured()) throw new Error("storage_not_configured");
  const serialized = JSON.stringify(content);
  if (localStorageEnabled()) {
    await mkdir(path.dirname(LOCAL_PATH), { recursive: true });
    let lock; try { lock = await open(`${LOCAL_PATH}.lock`, "wx"); } catch { throw new Error("content_conflict"); }
    try {
      if ((await readContent()).revision !== revision) throw new Error("content_conflict");
      const temporary = `${LOCAL_PATH}.${randomUUID()}.tmp`; await writeFile(temporary, serialized); await rename(temporary, LOCAL_PATH);
    } finally { await lock.close(); await unlink(`${LOCAL_PATH}.lock`); }
    return { content, revision: revisionOf(serialized) };
  }
  try {
    const blob = await put(CONTENT_PATH, serialized, { access: "private", contentType: "application/json", addRandomSuffix: false, ...(revision === "initial" ? { allowOverwrite: false } : { ifMatch: revision }) });
    return { content, revision: blob.etag };
  } catch (error) { if (error instanceof BlobPreconditionFailedError || /already exists/i.test(error.message)) throw new Error("content_conflict"); throw error; }
}
export async function storePhoto(id, bytes, contentType) {
  if (localStorageEnabled()) { const folder = path.join(LOCAL_FOLDER, "photos"); await mkdir(folder, { recursive: true }); await writeFile(path.join(folder, id), bytes); }
  else { await put(`hcof/photos/${id}`, bytes, { access: "private", contentType, addRandomSuffix: false }); }
}
export async function loadPhoto(id) {
  if (localStorageEnabled()) { try { return await readFile(path.join(LOCAL_FOLDER, "photos", id)); } catch (error) { if (error.code === "ENOENT") return null; throw error; } }
  const blob = await get(`hcof/photos/${id}`, { access: "private" }); return blob?.statusCode === 200 ? blob.stream : null;
}

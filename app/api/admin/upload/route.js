import { randomUUID } from "node:crypto";
import { isAdmin, sameOrigin } from "../../../../lib/admin-auth.js";
import { storePhoto, storageConfigured } from "../../../../lib/cms-storage.js";
export const runtime = "nodejs";
export async function POST(request) {
  if (!sameOrigin(request)) return Response.json({ error: "forbidden" }, { status: 403 });
  if (!await isAdmin()) return Response.json({ error: "unauthorized" }, { status: 401 });
  if (!storageConfigured()) return Response.json({ error: "storage_not_configured" }, { status: 503 });
  try {
    if (Number(request.headers.get("content-length")) > 3_500_000) return Response.json({ error: "invalid_image" }, { status: 400 });
    const file = (await request.formData()).get("file");
    if (!(file instanceof File) || file.size > 3 * 1024 * 1024 || !file.size) return Response.json({ error: "invalid_image" }, { status: 400 });
    const bytes = Buffer.from(await file.arrayBuffer());
    const format = bytes.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10])) ? ["png", "image/png"] : bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255 ? ["jpg", "image/jpeg"] : bytes.toString("ascii", 0, 4) === "RIFF" && bytes.toString("ascii", 8, 12) === "WEBP" ? ["webp", "image/webp"] : null;
    if (!format || file.type !== format[1]) return Response.json({ error: "invalid_image" }, { status: 400 });
    const id = `${randomUUID()}.${format[0]}`; await storePhoto(id, bytes, format[1]); return Response.json({ id });
  } catch { return Response.json({ error: "upload_failed" }, { status: 503 }); }
}

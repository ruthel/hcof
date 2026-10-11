import { isAdmin, sameOrigin } from "../../../../lib/admin-auth.js";
import { readContent, writeContent } from "../../../../lib/cms-storage.js";
import { validateContent } from "../../../../lib/cms-validation.js";
export const dynamic = "force-dynamic";
export async function GET() {
  if (!await isAdmin()) return Response.json({ error: "unauthorized" }, { status: 401 });
  try { return Response.json(await readContent(), { headers: { "Cache-Control": "no-store" } }); }
  catch { return Response.json({ error: "content_unavailable" }, { status: 503 }); }
}
export async function PUT(request) {
  if (!sameOrigin(request)) return Response.json({ error: "forbidden" }, { status: 403 });
  if (!await isAdmin()) return Response.json({ error: "unauthorized" }, { status: 401 });
  try {
    const body = await request.text(); if (body.length > 2_000_000) throw new Error("invalid_content");
    const payload = JSON.parse(body); if (typeof payload.revision !== "string" || !payload.revision) throw new Error("invalid_content");
    return Response.json(await writeContent(validateContent(payload.content), payload.revision));
  } catch (error) {
    const known = ["invalid_content", "translation_required", "content_conflict", "storage_not_configured"];
    const code = known.includes(error.message) ? error.message : "save_failed";
    return Response.json({ error: code }, { status: code === "content_conflict" ? 409 : ["invalid_content", "translation_required"].includes(code) ? 400 : 503 });
  }
}

import { readContent } from "../../../lib/cms-storage.js";
import { publicContent } from "../../../lib/default-content.js";
export const dynamic = "force-dynamic";
export async function GET() {
  try { return Response.json(publicContent((await readContent()).content), { headers: { "Cache-Control": "no-store" } }); }
  catch { return Response.json({ error: "content_unavailable" }, { status: 503 }); }
}

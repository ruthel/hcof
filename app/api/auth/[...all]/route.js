import { getAuth, authConfigured } from "../../../../lib/auth.js";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
function handle(request) {
  if (!authConfigured()) return Response.json({ error: "not_configured" }, { status: 503 });
  return getAuth().handler(request);
}
export const GET = handle;
export const POST = handle;

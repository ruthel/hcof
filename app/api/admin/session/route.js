import { getAuth, authConfigured } from "../../../../lib/auth.js";
import { isAdmin, sameOrigin } from "../../../../lib/admin-auth.js";
export async function GET() { return Response.json({ authenticated: await isAdmin() }, { headers: { "Cache-Control": "no-store" } }); }
export async function DELETE(request) {
  if (!sameOrigin(request)) return Response.json({ error: "forbidden" }, { status: 403 });
  if (!authConfigured()) return Response.json({ error: "not_configured" }, { status: 503 });
  return getAuth().api.signOut({ headers: request.headers, asResponse: true });
}

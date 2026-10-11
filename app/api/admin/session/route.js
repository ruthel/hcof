import { cookies } from "next/headers";
import { ADMIN_COOKIE, adminCookieOptions, createAdminToken, isAdmin, localAuthEnabled, safeEquals, sameOrigin } from "../../../../lib/admin-auth.js";
const attempts = new Map(); // Development-only. Production authentication is handled by Clerk.
export async function GET() { return Response.json({ authenticated: await isAdmin(), local: localAuthEnabled() }, { headers: { "Cache-Control": "no-store" } }); }
export async function POST(request) {
  if (!localAuthEnabled()) return Response.json({ error: "not_configured" }, { status: 503 });
  if (!sameOrigin(request)) return Response.json({ error: "forbidden" }, { status: 403 });
  const ip = request.headers.get("x-forwarded-for") || "local"; const now = Date.now(); const previous = attempts.get(ip);
  const count = previous && previous.until > now ? previous.count : 0;
  if (count >= 10) return Response.json({ error: "too_many_attempts" }, { status: 429 });
  attempts.set(ip, { count: count + 1, until: previous?.until > now ? previous.until : now + 600_000 });
  let password; try { ({ password } = await request.json()); } catch { return Response.json({ error: "invalid_credentials" }, { status: 401 }); }
  if (typeof password !== "string" || password.length > 500 || !safeEquals(password, process.env.ADMIN_PASSWORD)) return Response.json({ error: "invalid_credentials" }, { status: 401 });
  attempts.delete(ip); (await cookies()).set(ADMIN_COOKIE, createAdminToken(), adminCookieOptions); return Response.json({ ok: true });
}
export async function DELETE(request) { if (!sameOrigin(request)) return Response.json({ error: "forbidden" }, { status: 403 }); (await cookies()).set(ADMIN_COOKIE, "", { ...adminCookieOptions, maxAge: 0 }); return Response.json({ ok: true }); }

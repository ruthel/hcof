import { headers } from "next/headers";
import { getAuth, authConfigured } from "./auth.js";
export async function isAdmin() {
  if (!authConfigured()) return false;
  const session = await getAuth().api.getSession({ headers: await headers() });
  const allowed = (process.env.ADMIN_EMAILS || "").split(",").map((email) => email.trim().toLowerCase()).filter(Boolean);
  return Boolean(session && allowed.includes(session.user.email.toLowerCase()));
}
export function sameOrigin(request) {
  try { return new URL(request.headers.get("origin")).origin === new URL(request.url).origin; } catch { return false; }
}

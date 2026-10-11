import { currentUser } from "@clerk/nextjs/server";
import { createHmac, timingSafeEqual, createHash } from "node:crypto";
import { cookies } from "next/headers";
import { localStorageEnabled } from "./cms-storage.js";
export const ADMIN_COOKIE = "hcof_local_admin";
export const clerkConfigured = () => Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY);
export const localAuthEnabled = () => localStorageEnabled() && Boolean(process.env.ADMIN_PASSWORD && process.env.ADMIN_SESSION_SECRET?.length >= 32);
export function createAdminToken() { const expires = String(Date.now() + 12 * 60 * 60 * 1000); return `${expires}.${createHmac("sha256", process.env.ADMIN_SESSION_SECRET).update(expires).digest("hex")}`; }
export function safeEquals(a, b) { return timingSafeEqual(createHash("sha256").update(String(a)).digest(), createHash("sha256").update(String(b)).digest()); }
export function verifyAdminToken(token) {
  if (!localAuthEnabled() || typeof token !== "string") return false;
  const [expires, signature] = token.split(".");
  if (!/^\d+$/.test(expires) || Number(expires) <= Date.now() || Number(expires) > Date.now() + 12 * 60 * 60 * 1000) return false;
  return safeEquals(signature, createHmac("sha256", process.env.ADMIN_SESSION_SECRET).update(expires).digest("hex"));
}
export async function isAdmin() {
  if (localAuthEnabled()) return verifyAdminToken((await cookies()).get(ADMIN_COOKIE)?.value);
  if (!clerkConfigured()) return false;
  const user = await currentUser();
  const allowed = (process.env.ADMIN_EMAILS || "").split(",").map((email) => email.trim().toLowerCase()).filter(Boolean);
  return Boolean(user?.emailAddresses.some((email) => email.verification?.status === "verified" && allowed.includes(email.emailAddress.toLowerCase())));
}
export function sameOrigin(request) { try { const origin = request.headers.get("origin"); return Boolean(origin && new URL(origin).host === request.headers.get("host")); } catch { return false; } }
export const adminCookieOptions = { httpOnly: true, sameSite: "strict", secure: false, path: "/", maxAge: 12 * 60 * 60 };

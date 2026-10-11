import { ClerkProvider } from "@clerk/nextjs";
import { clerkConfigured } from "../../lib/admin-auth.js";
export const metadata = { title: "Administration | HCOF", robots: { index: false, follow: false } };
export default function AdminLayout({ children }) {
  return clerkConfigured() ? <ClerkProvider signInUrl="/admin/sign-in" signInFallbackRedirectUrl="/admin">{children}</ClerkProvider> : children;
}

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { isAdmin, clerkConfigured, localAuthEnabled } from "../../lib/admin-auth.js";
import { storageConfigured } from "../../lib/cms-storage.js";
import AdminDashboard from "../../components/admin/AdminDashboard";
import AdminAccess from "../../components/admin/AdminAccess";
export const dynamic = "force-dynamic";
export default async function AdminPage() {
  const local = localAuthEnabled();
  if (!local && (!clerkConfigured() || !process.env.ADMIN_EMAILS || !storageConfigured())) return <AdminAccess mode="setup" />;
  if (await isAdmin()) return <AdminDashboard local={local} />;
  if (local) return <AdminAccess mode="local" />;
  if ((await auth()).userId) return <AdminAccess mode="denied" />;
  redirect("/admin/sign-in");
}

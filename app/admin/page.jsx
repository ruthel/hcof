import { isAdmin } from "../../lib/admin-auth.js";
import { authConfigured, getAuth } from "../../lib/auth.js";
import { headers } from "next/headers";
import AdminDashboard from "../../components/admin/AdminDashboard";
import AdminAccess from "../../components/admin/AdminAccess";
export const dynamic = "force-dynamic";
export default async function AdminPage() {
  if (!authConfigured() || !process.env.ADMIN_EMAILS) return <AdminAccess mode="setup" />;
  try {
    if (await isAdmin()) return <AdminDashboard />;
    const session = await getAuth().api.getSession({ headers: await headers() });
    return <AdminAccess mode={session ? "denied" : "login"} />;
  } catch { return <AdminAccess mode="setup" />; }
}

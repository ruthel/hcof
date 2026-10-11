import { SignIn } from "@clerk/nextjs";
import { clerkConfigured } from "../../../../lib/admin-auth.js";
import AdminAccess from "../../../../components/admin/AdminAccess";
export default function SignInPage() {
  if (!clerkConfigured()) return <AdminAccess mode="setup" />;
  return <main id="main" className="admin-signin"><SignIn routing="path" path="/admin/sign-in" withSignUp={false} /></main>;
}

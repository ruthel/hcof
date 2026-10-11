"use client";
import { useState } from "react";
import { useIntl } from "react-intl";
import { useRouter } from "next/navigation";
import Container from "../Container";
export default function AdminAccess({ mode }) {
  const intl = useIntl(); const t = (id) => intl.formatMessage({ id: `cms.admin.${id}` });
  const router = useRouter(); const [busy, setBusy] = useState(false); const [error, setError] = useState("");
  async function login(event) {
    event.preventDefault(); setBusy(true); setError("");
    const password = new FormData(event.currentTarget).get("password");
    try { const response = await fetch("/api/admin/session", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) }); if (!response.ok) throw new Error(); router.refresh(); }
    catch { setError(t("loginError")); } finally { setBusy(false); }
  }
  return <main id="main" className="admin-access"><Container><h1>{t("title")}</h1>
    {mode === "setup" && <div className="box"><h2>{t("setupTitle")}</h2><p>{t("setupText")}</p></div>}
    {mode === "denied" && <p role="alert">{t("denied")}</p>}
    {mode === "local" && <><p>{t("local")}</p><form onSubmit={login}><label htmlFor="admin-password">{t("password")}</label><input id="admin-password" name="password" type="password" autoComplete="current-password" required /><button className="btn green" disabled={busy}>{busy ? t("loading") : t("login")}</button><p role="alert">{error}</p></form></>}
  </Container></main>;
}

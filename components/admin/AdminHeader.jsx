"use client";
import Link from "next/link";
import { useIntl } from "react-intl";
import { useLocale } from "../I18nProvider";
import ThemeToggle from "../ThemeToggle";
export default function AdminHeader() {
  const intl = useIntl(); const { locale, setLocale } = useLocale();
  return <header className="admin-topbar"><Link href="/admin" className="admin-brand"><img src="/assets/logo-icon.jpg" alt="" width="40" height="40" /><span>HCOF <small>{intl.formatMessage({ id: "cms.admin.workspace" })}</small></span></Link><div className="admin-topbar-tools"><Link className="admin-site-link" href="/" target="_blank" rel="noopener noreferrer">{intl.formatMessage({ id: "cms.admin.viewSite" })} <span aria-hidden="true">↗</span></Link><div className="admin-locale" role="group" aria-label={intl.formatMessage({ id: "nav.language" })}>{["en", "fr"].map(value => <button type="button" key={value} aria-pressed={locale === value} onClick={() => setLocale(value)}>{value.toUpperCase()}</button>)}</div><ThemeToggle /></div></header>;
}

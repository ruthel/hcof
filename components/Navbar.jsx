"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useIntl } from "react-intl";
import Container from "./Container";
import { useLocale } from "./I18nProvider";

const links = [
  ["/about", "nav.who"],
  ["/programs", "nav.what"],
  ["/journey", "nav.journey"],
  ["/hopes-city", "nav.city"],
  ["/impact", "nav.impact"],
  ["/get-involved", "nav.involved"],
  ["/give", "nav.give"],
  ["/news", "nav.news"],
  ["/contact", "nav.contact"],
];

export default function Navbar() {
  const pathname = usePathname();
  const intl = useIntl();
  const { locale, setLocale } = useLocale();

  const navLinks = links.map(([href, id]) => (
    <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined}>
      {intl.formatMessage({ id })}
    </Link>
  ));

  return (
    <header className="site">
      <Container className="nav-container">
        <Link className="brand" href="/" aria-label="HCOF">
          <img src="/assets/logo-icon.jpg" alt="" width="190" height="185" />
          HCOF
        </Link>

        <nav className="main" aria-label="Main navigation">
          {navLinks}
        </nav>

        <div className="language-switcher" role="group" aria-label={intl.formatMessage({ id: "nav.language" })}>
          <button type="button" onClick={() => setLocale("en")} aria-pressed={locale === "en"}>EN</button>
          <button type="button" onClick={() => setLocale("fr")} aria-pressed={locale === "fr"}>FR</button>
        </div>

        <details className="menu">
          <summary>{intl.formatMessage({ id: "nav.menu" })}</summary>
          <div className="panel">{navLinks}</div>
        </details>
      </Container>
    </header>
  );
}

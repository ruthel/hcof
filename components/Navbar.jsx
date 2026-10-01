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

  const navLinks = links.map(([href, id]) => {
    const active = pathname === href;

    return (
      <Link
        key={href}
        href={href}
        aria-current={active ? "page" : undefined}
        className={`shrink-0 whitespace-nowrap rounded-full px-2.5 py-2 font-ui text-[0.76rem] font-semibold no-underline transition ${
          active
            ? "bg-hcof-gold-soft text-hcof-ink"
            : "text-hcof-text hover:bg-hcof-mist hover:text-hcof-ink"
        }`}
      >
        {intl.formatMessage({ id })}
      </Link>
    );
  });

  return (
    <header className="sticky top-0 z-40 border-b border-hcof-ink/10 bg-hcof-paper/95 backdrop-blur">
      <Container wide className="flex min-h-[72px] items-center gap-2">
        <Link
          className="mr-3 flex shrink-0 items-center gap-3 font-ui text-sm font-bold tracking-[0.08em] text-hcof-ink no-underline"
          href="/"
          aria-label="HCOF"
        >
          <img
            src="/assets/logo-icon.jpg"
            alt=""
            width="190"
            height="185"
            className="h-11 w-11 rounded-full object-contain"
          />
          HCOF
        </Link>

        <nav
          className="hidden flex-1 items-center justify-center gap-0.5 min-[1350px]:flex"
          aria-label="Main navigation"
        >
          {navLinks}
        </nav>

        <div
          className="ml-auto flex shrink-0 items-center gap-1 rounded-full border border-hcof-ink/10 p-1 min-[1350px]:ml-2"
          role="group"
          aria-label={intl.formatMessage({ id: "nav.language" })}
        >
          {["en", "fr"].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setLocale(item)}
              aria-pressed={locale === item}
              className={`rounded-full px-2.5 py-1.5 font-ui text-[0.68rem] font-bold transition ${
                locale === item
                  ? "bg-hcof-ink text-white"
                  : "bg-transparent text-hcof-ink hover:bg-hcof-mist"
              }`}
            >
              {item.toUpperCase()}
            </button>
          ))}
        </div>

        <details className="relative min-[1350px]:hidden">
          <summary className="cursor-pointer list-none rounded-full border border-hcof-ink/10 px-3 py-2 font-ui text-xs font-semibold text-hcof-ink">
            {intl.formatMessage({ id: "nav.menu" })}
          </summary>
          <div className="absolute right-0 top-12 grid min-w-64 gap-1 rounded-lg border border-hcof-ink/10 bg-white p-3">
            {navLinks}
          </div>
        </details>
      </Container>
    </header>
  );
}

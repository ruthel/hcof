"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  ["/about", "Who we are"],
  ["/programs", "What we do"],
  ["/journey", "Our journey"],
  ["/hopes-city", "Hope's City"],
  ["/impact", "Impact"],
  ["/get-involved", "Get involved"],
  ["/give", "Give"],
  ["/news", "News"],
  ["/contact", "Contact"],
];

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = links.map(([href, label]) => (
    <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined}>
      {label}
    </Link>
  ));

  return (
    <header className="site">
      <Link className="brand" href="/" aria-label="HCOF">
        <img src="/assets/logo-icon.jpg" alt="" width="190" height="185" />
        HCOF
      </Link>

      <nav className="main" aria-label="Main navigation">
        {navLinks}
      </nav>

      <details className="menu">
        <summary>Menu</summary>
        <div className="panel">{navLinks}</div>
      </details>
    </header>
  );
}

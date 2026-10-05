"use client";

import { useEffect, useState } from "react";
import { useIntl } from "react-intl";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");
  const intl = useIntl();

  useEffect(() => {
    const preference = window.matchMedia("(prefers-color-scheme: dark)");
    const sync = () => {
      let saved;
      try { saved = localStorage.getItem("hcof-theme"); } catch {}
      const next = saved === "light" || saved === "dark" ? saved : preference.matches ? "dark" : "light";
      document.documentElement.dataset.theme = next;
      setTheme(next);
    };
    sync();
    preference.addEventListener("change", sync);
    window.addEventListener("storage", sync);
    return () => {
      preference.removeEventListener("change", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    setTheme(next);
    try { localStorage.setItem("hcof-theme", next); } catch {}
  };
  const label = intl.formatMessage({ id: theme === "dark" ? "theme.light" : "theme.dark" });

  return (
    <button type="button" onClick={toggle} aria-label={label} title={label} aria-pressed={theme === "dark"}
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-hcof-ink/15 text-hcof-ink transition-colors hover:bg-hcof-mist">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {theme === "dark" ? <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" /></> : <path d="M20.9 13.2A9 9 0 0 1 10.8 3.1 9 9 0 1 0 20.9 13.2Z" />}
      </svg>
    </button>
  );
}

"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { IntlProvider } from "react-intl";
import { messages } from "../i18n/messages";

const LocaleContext = createContext({ locale: "en", setLocale: () => {} });
const STORAGE_KEY = "hcof-locale";

export function useLocale() {
  return useContext(LocaleContext);
}

export default function I18nProvider({ children }) {
  const [locale, setLocaleState] = useState("en");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "fr") {
      setLocaleState(saved);
      document.documentElement.lang = saved;
      return;
    }

    const browserLocale = navigator.language?.toLowerCase().startsWith("fr") ? "fr" : "en";
    setLocaleState(browserLocale);
    document.documentElement.lang = browserLocale;
  }, []);

  const setLocale = (nextLocale) => {
    if (nextLocale !== "en" && nextLocale !== "fr") return;
    setLocaleState(nextLocale);
    window.localStorage.setItem(STORAGE_KEY, nextLocale);
    document.documentElement.lang = nextLocale;
  };

  const value = useMemo(() => ({ locale, setLocale }), [locale]);

  return (
    <LocaleContext.Provider value={value}>
      <IntlProvider locale={locale} defaultLocale="en" messages={messages[locale]}>
        {children}
      </IntlProvider>
    </LocaleContext.Provider>
  );
}

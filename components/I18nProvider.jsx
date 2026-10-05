"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { IntlProvider } from "react-intl";
import { messages } from "../i18n/messages";

const LocaleContext = createContext({ locale: "en", setLocale: () => {} });

export function useLocale() {
  return useContext(LocaleContext);
}

export default function I18nProvider({ children }) {
  const [locale, setLocaleState] = useState("en");

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (nextLocale) => {
    if (nextLocale !== "en" && nextLocale !== "fr") return;
    setLocaleState(nextLocale);
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

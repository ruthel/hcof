"use client";

import { useEffect } from "react";
import { useIntl } from "react-intl";
import { PAGE_COMPONENTS } from "./pages";

export default function LocalizedPage({ pageKey }) {
  const intl = useIntl();
  const PageContent = PAGE_COMPONENTS[pageKey];
  const title = intl.formatMessage({ id: `pages.${pageKey}.title` });
  const pageDescription = intl.formatMessage({ id: `pages.${pageKey}.description` });
  const t = (id) => intl.formatMessage({ id });

  useEffect(() => {
    if (!PageContent) return;

    document.title = title;

    const description = document.querySelector('meta[name="description"]');
    if (description && pageDescription) {
      description.setAttribute("content", pageDescription);
    }
  }, [PageContent, title, pageDescription]);

  if (!PageContent) return null;

  return (
    <main id="main" className={`page page-${pageKey}`}>
      <PageContent t={t} />
    </main>
  );
}

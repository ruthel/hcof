"use client";

import { useEffect } from "react";
import { useIntl } from "react-intl";
import Container from "./Container";
import { PAGE_DEFINITIONS } from "../i18n/pageDefinitions";
import { PAGE_CONTENT, PAGE_META } from "../i18n/pageContent";

export default function LocalizedPage({ pageKey }) {
  const intl = useIntl();
  const locale = intl.locale === "fr" ? "fr" : "en";
  const sections = PAGE_DEFINITIONS[pageKey] ?? [];
  const content = PAGE_CONTENT[locale]?.[pageKey] ?? PAGE_CONTENT.en[pageKey] ?? [];
  const meta = PAGE_META[locale]?.[pageKey] ?? PAGE_META.en[pageKey];

  useEffect(() => {
    if (!meta) return;
    document.title = meta.title;
    const description = document.querySelector('meta[name="description"]');
    if (description && meta.description) description.setAttribute("content", meta.description);
  }, [meta]);

  return (
    <main id="main">
      {sections.map((section) => (
        <section key={`${pageKey}-${section.index}`} className={section.className || undefined}>
          <Container>
            <div
              className="localized-section"
              dangerouslySetInnerHTML={{ __html: content[section.index] ?? "" }}
            />
          </Container>
        </section>
      ))}
    </main>
  );
}

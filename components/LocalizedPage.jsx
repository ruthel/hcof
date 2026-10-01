"use client";

import { useEffect } from "react";
import { useIntl } from "react-intl";
import Container from "./Container";
import { EN_PAGE_CONTENT } from "../i18n/pageContent.en";
import { FR_PAGE_CONTENT } from "../i18n/pageContent.fr";

const contentByLocale = {
  en: EN_PAGE_CONTENT,
  fr: FR_PAGE_CONTENT,
};

export default function LocalizedPage({ pageKey }) {
  const intl = useIntl();
  const locale = intl.locale === "fr" ? "fr" : "en";
  const page = contentByLocale[locale]?.[pageKey] ?? EN_PAGE_CONTENT[pageKey];

  useEffect(() => {
    if (!page) return;

    document.title = page.title;

    const description = document.querySelector('meta[name="description"]');
    if (description && page.description) {
      description.setAttribute("content", page.description);
    }
  }, [page]);

  if (!page) return null;

  return (
    <main id="main" className={`page page-${pageKey}`}>
      {page.sections.map((section, index) => (
        <section
          key={`${pageKey}-${locale}-${index}`}
          className={section.className || undefined}
          data-section={index}
        >
          <Container>
            <div
              className="localized-section"
              dangerouslySetInnerHTML={{ __html: section.html }}
            />
          </Container>
        </section>
      ))}
    </main>
  );
}

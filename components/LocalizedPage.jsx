"use client";

import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import Container from "./Container";

function normalizeLinks(html) {
  return html
    .replace(/(src|href)="\.\.\/assets\//g, '$1="/assets/')
    .replace(/href="index\.html(#[^"]*)?"/g, (_, hash = "") => `href="/${hash}"`)
    .replace(/href="([a-z0-9-]+)\.html(#[^"]*)?"/gi, (_, slug, hash = "") => `href="/${slug}${hash}"`);
}

export default function LocalizedPage({ pageKey }) {
  const intl = useIntl();
  const locale = intl.locale === "fr" ? "fr" : "en";
  const [sections, setSections] = useState([]);

  useEffect(() => {
    let active = true;
    const file = pageKey === "index" ? "index.html" : `${pageKey}.html`;

    fetch(`/content/${locale}/${file}`)
      .then((response) => {
        if (!response.ok) throw new Error(`Unable to load ${file}`);
        return response.text();
      })
      .then((source) => {
        if (!active) return;

        const doc = new DOMParser().parseFromString(source, "text/html");
        const title = doc.querySelector("title")?.textContent?.trim();
        const description = doc.querySelector('meta[name="description"]')?.getAttribute("content");

        if (title) document.title = title;
        if (description) {
          document.querySelector('meta[name="description"]')?.setAttribute("content", description);
        }

        const parsed = [...doc.querySelectorAll("main#main > section")].map((section) => {
          const wrap = section.querySelector(":scope > .wrap");
          return {
            className: section.className || "",
            html: normalizeLinks((wrap || section).innerHTML),
          };
        });

        setSections(parsed);
      })
      .catch(() => {
        if (active) setSections([]);
      });

    return () => {
      active = false;
    };
  }, [locale, pageKey]);

  return (
    <main id="main" className={sections.length ? undefined : "page-loading"}>
      {sections.map((section, index) => (
        <section key={`${pageKey}-${locale}-${index}`} className={section.className || undefined}>
          <Container>
            <div className="localized-section" dangerouslySetInnerHTML={{ __html: section.html }} />
          </Container>
        </section>
      ))}
    </main>
  );
}

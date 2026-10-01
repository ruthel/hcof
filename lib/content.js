import fs from "node:fs";
import path from "node:path";

export const SLUGS = [
  "about",
  "child-protection",
  "contact",
  "get-involved",
  "give",
  "hopes-city",
  "impact",
  "journey",
  "legal",
  "media-kit",
  "news",
  "programs",
];

function sourcePath(slug) {
  const file = slug === "index" ? "index.html" : `${slug}.html`;
  return path.join(process.cwd(), "en", file);
}

function extract(source, pattern, fallback = "") {
  const match = source.match(pattern);
  return match?.[1]?.trim() ?? fallback;
}

function cleanLinks(html) {
  return html
    .replace(/(src|href)="\.\.\/assets\//g, '$1="/assets/')
    .replace(/href="index\.html(#[^"]*)?"/g, (_, hash = "") => `href="/${hash}"`)
    .replace(/href="([a-z0-9-]+)\.html(#[^"]*)?"/gi, (_, slug, hash = "") => `href="/${slug}${hash}"`);
}

export function getPage(slug) {
  if (slug !== "index" && !SLUGS.includes(slug)) return null;

  const source = fs.readFileSync(sourcePath(slug), "utf8");
  const title = extract(source, /<title>([\s\S]*?)<\/title>/i, "HCOF");
  const description = extract(
    source,
    /<meta\s+name="description"\s+content="([^"]*)"/i,
    "Hope's City Outreach Foundation"
  );
  const main = extract(source, /<main\s+id="main">([\s\S]*?)<\/main>/i);

  return {
    metadata: { title, description },
    html: cleanLinks(main),
  };
}

import { notFound } from "next/navigation";
import { getPage, SLUGS } from "../../lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = getPage(slug);
  return page?.metadata ?? {};
}

export default async function ContentPage({ params }) {
  const { slug } = await params;
  const page = getPage(slug);

  if (!page) notFound();

  return <main id="main" dangerouslySetInnerHTML={{ __html: page.html }} />;
}

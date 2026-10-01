import { getPage } from "../lib/content";

const page = getPage("index");

export const metadata = page.metadata;

export default function HomePage() {
  return <main id="main" dangerouslySetInnerHTML={{ __html: page.html }} />;
}

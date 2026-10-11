import Link from "next/link";
import { AlbumPreview } from "./GalleryAlbums";
import { useContent } from "./ContentProvider";
import { useLocale } from "./I18nProvider";
import { localized } from "../lib/default-content.js";

export default function DynamicNews({ t }) {
  const { news } = useContent(); const { locale } = useLocale();
  const featured = news.filter((item) => item.featured);
  function cards(items) {
    return <div className="album-grid album-preview-grid mt-10">{items.map((item) => <article className="item" key={item.id}>
      <AlbumPreview t={t} id={item.id} />
      {item.date && <time dateTime={item.date}>{new Intl.DateTimeFormat(locale, { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${item.date}T00:00:00Z`))}</time>}
      <p>{localized(item, "summary", locale)}</p>
      <Link className="album-link" href={`/gallery#${item.id}`}>{t("cms.readStory")} →</Link>
    </article>)}</div>;
  }
  return <>
    <h2>{t("journey.headlines.title")}</h2>
    {featured.length ? cards(featured) : <p>{t("cms.news.emptyFeatured")}</p>}
    <h2 className="mt-12">{t("cms.news.latest")}</h2>
    {news.length ? cards(news) : <p>{t("cms.news.empty")}</p>}
  </>;
}

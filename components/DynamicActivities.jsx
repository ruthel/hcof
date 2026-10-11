import ActivitiesCarousel from "./ActivitiesCarousel";
import { AlbumPreview } from "./GalleryAlbums";
import { useContent } from "./ContentProvider";
import { useLocale } from "./I18nProvider";
import { localized } from "../lib/default-content.js";

export default function DynamicActivities({ t }) {
  const { activities } = useContent();
  const { locale } = useLocale();
  if (!activities.length) return <p>{t("cms.activities.empty")}</p>;
  return <ActivitiesCarousel t={t}>{activities.map((item) => (
    <article className="item" key={item.id}>
      <AlbumPreview t={t} id={item.id} />
      <p>{localized(item, "summary", locale)}</p>
      {localized(item, "body", locale).split(/\n\n+/).filter(Boolean).map((paragraph, index) => <p className="cms-paragraph" key={index}>{paragraph}</p>)}
    </article>
  ))}</ActivitiesCarousel>;
}

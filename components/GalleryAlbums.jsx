import Link from "next/link";
import { useLocale } from "./I18nProvider";
import { useContent } from "./ContentProvider";
import { localized } from "../lib/default-content.js";

export function getAlbumImages(album) {
  if (album.photos?.length) return album.photos.map((photo) => ({ ...photo, src: `/api/media/${photo.id}` }));
  return [
    { id: `${album.id}-overview`, icon: album.icon, caption: "cms.gallery.overview" },
    { id: `${album.id}-support`, icon: "care", caption: "gallery.images.support" },
    { id: `${album.id}-followup`, icon: "report", caption: "gallery.images.followup" },
  ];
}

export function AlbumCover({ album }) {
  if (album.src) return <div className="album-cover"><img src={album.src} alt="" width="600" height="360" loading="lazy" className="album-photo" /></div>;
  return (
    <div className={`album-cover album-cover-${album.icon}`}>
      <svg viewBox="0 0 600 360" aria-hidden="true" focusable="false">
        <circle cx="440" cy="80" r="110" fill="currentColor" opacity=".07" />
        <circle cx="100" cy="320" r="170" fill="currentColor" opacity=".07" />
        <g transform="translate(210 90)" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
          {album.icon === "food" && <><path d="M20 90h140l-20 70H40zM10 90h160M65 60c-20-20 20-30 0-50M110 60c-20-20 20-30 0-50" /><path d="M35 170h110" /></>}
          {album.icon === "school" && <><path d="M90 40C65 20 30 20 5 30v115c30-10 60-10 85 10 25-20 55-20 85-10V30c-25-10-60-10-85 10v115" /><path d="M25 60h40M25 85h40M115 60h40M115 85h40" /></>}
          {album.icon === "care" && <><path d="M90 115 30 60C-10 20 50-15 90 30c40-45 100-10 60 30zM0 130l45 35h90l45-35M45 165v15M135 165v15" /></>}
          {album.icon === "mission" && <><path d="M15 165h150M40 165V90h100v75M20 90l70-65 70 65M75 165v-45h30v45M90 5v-20" /><path d="M160 20l15-15M20 20 5 5" /></>}
          {album.icon === "report" && <><path d="M35 5h85l30 30v140H35zM120 5v35h30M60 75h65M60 100h65M60 125h40" /></>}
        </g>
      </svg>
    </div>
  );
}

export function AlbumPreview({ t, id }) {
  const { locale } = useLocale();
  const content = useContent();
  const album = [...content.activities, ...content.news].find((item) => item.id === id);
  if (!album) return null;
  const cover = album.photos.find((photo) => photo.id === album.coverId) || album.photos[0];
  return (
    <Link className="album-preview" href={`/gallery#${album.id}`}>
      <AlbumCover album={cover ? { src: `/api/media/${cover.id}` } : album} />
      <span className="album-caption">
        <span className="album-kicker">{t(cover ? "gallery.rubric" : "gallery.illustration")}</span>
        <strong>{localized(album, "title", locale)}</strong>
        <span className="album-link">{t("gallery.viewAlbum")} <span aria-hidden="true">→</span></span>
      </span>
    </Link>
  );
}

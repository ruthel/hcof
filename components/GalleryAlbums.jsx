import Link from "next/link";

export const GALLERY_ALBUMS = [
  { id: "food", category: "activities", title: "pages.programs.section2.text2", description: "pages.programs.section2.text3", icon: "food", source: "/programs" },
  { id: "school", category: "activities", title: "pages.programs.section2.text9", description: "pages.programs.section2.text10", icon: "school", source: "/programs" },
  { id: "care", category: "activities", title: "pages.programs.section2.text16", description: "pages.programs.section2.text17", icon: "care", source: "/programs" },
  { id: "safeguarding", category: "activities", title: "gallery.safeguarding", description: "gallery.safeguarding.description", icon: "care", source: "/child-protection" },
  { id: "mission", category: "news", title: "pages.journey.section1.text16", description: "pages.journey.section1.text17", icon: "mission", source: "/journey" },
  { id: "accountability", category: "news", title: "gallery.accountability", description: "gallery.accountability.description", icon: "report", source: "/journey#impact" },
];

export function AlbumCover({ album }) {
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
  const album = GALLERY_ALBUMS.find((item) => item.id === id);
  return (
    <Link className="album-preview" href={`/gallery#${album.id}`}>
      <AlbumCover album={album} />
      <span className="album-caption">
        <span className="album-kicker">{t("gallery.illustration")}</span>
        <strong>{t(album.title)}</strong>
        <span className="album-link">{t("gallery.viewAlbum")} <span aria-hidden="true">→</span></span>
      </span>
    </Link>
  );
}

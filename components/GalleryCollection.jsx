"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { AlbumCover, GALLERY_ALBUMS } from "./GalleryAlbums";

export default function GalleryCollection({ t }) {
  const [category, setCategory] = useState("all");
  const [selected, setSelected] = useState(null);
  const dialog = useRef(null);
  const albums = GALLERY_ALBUMS.filter((album) => category === "all" || album.category === category);

  function enlarge(album) {
    setSelected(album);
    dialog.current.showModal();
  }

  return (
    <>
      <div className="album-filters" role="group" aria-label={t("gallery.filter")}>
        {["all", "activities", "news"].map((value) => (
          <button key={value} type="button" aria-pressed={category === value} onClick={() => setCategory(value)}>{t(`gallery.filter.${value}`)}</button>
        ))}
      </div>
      <div className="album-grid" aria-live="polite">
        {albums.map((album) => (
          <article id={album.id} key={album.id} className="gallery-album">
            <button type="button" className="album-enlarge" onClick={() => enlarge(album)} aria-label={`${t("gallery.enlarge")}: ${t(album.title)}`}>
              <AlbumCover album={album} />
              <span>{t("gallery.enlarge")} <span aria-hidden="true">↗</span></span>
            </button>
            <div className="album-body">
              <span className="album-kicker">{t(`gallery.filter.${album.category}`)} · {t("gallery.illustration")}</span>
              <h3>{t(album.title)}</h3>
              <p>{t(album.description)}</p>
              <p className="album-note">{t("gallery.album.pending")}</p>
              <Link className="album-link" href={album.source}>{t("gallery.readMore")} <span aria-hidden="true">→</span></Link>
            </div>
          </article>
        ))}
      </div>
      <dialog ref={dialog} className="gallery-dialog" aria-labelledby="gallery-dialog-title">
        <form method="dialog"><button className="gallery-close" aria-label={t("gallery.close")}>{t("gallery.close")} ×</button></form>
        {selected && <><AlbumCover album={selected} /><div className="album-body"><span className="album-kicker">{t("gallery.illustration")}</span><h2 id="gallery-dialog-title">{t(selected.title)}</h2><p>{t(selected.description)}</p></div></>}
      </dialog>
    </>
  );
}

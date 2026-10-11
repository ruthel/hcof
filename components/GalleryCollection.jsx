"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AlbumCover, getAlbumImages } from "./GalleryAlbums";
import { useContent } from "./ContentProvider";
import { useLocale } from "./I18nProvider";
import { localized } from "../lib/default-content.js";

export default function GalleryCollection({ t }) {
  const [category, setCategory] = useState("all");
  const [selected, setSelected] = useState(null);
  const dialog = useRef(null);
  const content = useContent();
  const { locale } = useLocale();
  const albums = [...content.activities.map((item) => ({ ...item, category: "activities" })), ...content.news.map((item) => ({ ...item, category: "news" }))].filter((album) => category === "all" || album.category === category);
  const caption = (image, album) => image.src ? localized(image, "caption", locale) || localized(album, "title", locale) : t(image.caption);

  useEffect(() => {
    let id; try { id = decodeURIComponent(window.location.hash.slice(1)); } catch { return; }
    if (!id) return;
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ block: "start", behavior: "instant" });
  }, [content, category]);

  function enlarge(album, imageIndex) {
    setSelected({ album, imageIndex });
    dialog.current.showModal();
  }

  function moveImage(direction) {
    setSelected((current) => ({ ...current, imageIndex: (current.imageIndex + direction + getAlbumImages(current.album).length) % getAlbumImages(current.album).length }));
  }

  const selectedImages = selected ? getAlbumImages(selected.album) : [];
  const selectedImage = selectedImages[selected?.imageIndex];

  return (
    <>
      <div className="album-filters" role="group" aria-label={t("gallery.filter")}>
        {["all", "activities", "news"].map((value) => (
          <button key={value} type="button" aria-pressed={category === value} onClick={() => setCategory(value)}>{t(`gallery.filter.${value}`)}</button>
        ))}
      </div>
      <div className="gallery-rubrics" aria-live="polite">
        {albums.map((album) => (
          <article id={album.id} key={album.id} className="gallery-album">
            <div className="album-body">
              <span className="album-kicker">{t(`gallery.filter.${album.category}`)} · {t("gallery.rubric")}</span>
              <h3>{localized(album, "title", locale)}</h3>
              <p>{localized(album, "summary", locale)}</p>
              {localized(album, "body", locale).split(/\n\n+/).filter(Boolean).map((paragraph, index) => <p className="cms-paragraph" key={index}>{paragraph}</p>)}
              {!album.photos.length && <p className="album-note">{t("gallery.album.pending")}</p>}
              <div className="gallery-photo-grid">
                {getAlbumImages(album).map((image, imageIndex) => (
                  <figure key={image.id}>
                    <button type="button" className="album-enlarge" onClick={() => enlarge(album, imageIndex)} aria-label={`${t("gallery.enlarge")}: ${caption(image, album)}`}>
                      <AlbumCover album={image} />
                      <span>{t("gallery.enlarge")} <span aria-hidden="true">↗</span></span>
                    </button>
                    <figcaption><strong>{caption(image, album)}</strong>{!image.src && <span className="album-kicker">{t("gallery.illustration")}</span>}</figcaption>
                  </figure>
                ))}
              </div>
              <Link className="album-link" href={album.category === "activities" ? "/programs" : "/journey#headlines"}>{t("gallery.readMore")} <span aria-hidden="true">→</span></Link>
            </div>
          </article>
        ))}
      </div>
      <dialog ref={dialog} className="gallery-dialog" aria-labelledby="gallery-dialog-title">
        <form method="dialog"><button className="gallery-close" aria-label={t("gallery.close")}>{t("gallery.close")} ×</button></form>
        {selected && <><AlbumCover album={selectedImage} /><div className="album-body"><span className="album-kicker">{selected.imageIndex + 1} / {selectedImages.length}</span><h2 id="gallery-dialog-title">{caption(selectedImage, selected.album)}</h2><p>{localized(selected.album, "title", locale)}</p><div className="album-filters"><button type="button" onClick={() => moveImage(-1)}>{t("gallery.previous")}</button><button type="button" onClick={() => moveImage(1)}>{t("gallery.next")}</button></div></div></>}
      </dialog>
    </>
  );
}

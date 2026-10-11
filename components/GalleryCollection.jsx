"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { AlbumCover, GALLERY_ALBUMS, getAlbumImages } from "./GalleryAlbums";

export default function GalleryCollection({ t }) {
  const [category, setCategory] = useState("all");
  const [selected, setSelected] = useState(null);
  const dialog = useRef(null);
  const albums = GALLERY_ALBUMS.filter((album) => category === "all" || album.category === category);

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
              <h3>{t(album.title)}</h3>
              <p>{t(album.description)}</p>
              <p className="album-note">{t("gallery.album.pending")}</p>
              <div className="gallery-photo-grid">
                {getAlbumImages(album).map((image, imageIndex) => (
                  <figure key={image.id}>
                    <button type="button" className="album-enlarge" onClick={() => enlarge(album, imageIndex)} aria-label={`${t("gallery.enlarge")}: ${t(image.caption)}`}>
                      <AlbumCover album={image} />
                      <span>{t("gallery.enlarge")} <span aria-hidden="true">↗</span></span>
                    </button>
                    <figcaption><strong>{t(image.caption)}</strong><span className="album-kicker">{t("gallery.illustration")}</span></figcaption>
                  </figure>
                ))}
              </div>
              <Link className="album-link" href={album.source}>{t("gallery.readMore")} <span aria-hidden="true">→</span></Link>
            </div>
          </article>
        ))}
      </div>
      <dialog ref={dialog} className="gallery-dialog" aria-labelledby="gallery-dialog-title">
        <form method="dialog"><button className="gallery-close" aria-label={t("gallery.close")}>{t("gallery.close")} ×</button></form>
        {selected && <><AlbumCover album={selectedImage} /><div className="album-body"><span className="album-kicker">{t("gallery.illustration")} · {selected.imageIndex + 1} / {selectedImages.length}</span><h2 id="gallery-dialog-title">{t(selectedImage.caption)}</h2><p>{t(selected.album.title)}</p><div className="album-filters"><button type="button" onClick={() => moveImage(-1)}>{t("gallery.previous")}</button><button type="button" onClick={() => moveImage(1)}>{t("gallery.next")}</button></div></div></>}
      </dialog>
    </>
  );
}

import PageSection from "../PageSection";
import GalleryCollection from "../GalleryCollection";

const images = [
  ["/assets/media/hcof-logo-principal.png", "gallery.logo"],
  ["/assets/media/hcof-logo-fond-vert.png", "gallery.greenLogo"],
  ["/assets/media/hcof-icone.png", "gallery.symbol"],
];

export default function GalleryContent({ t }) {
  return (
    <>
      <PageSection index={0} className="pagehead">
        <h1>{t("nav.gallery")}</h1>
        <p>{t("pages.gallery.description")}</p>
      </PageSection>
      <PageSection index={1}>
        <h2>{t("gallery.photos.heading")}</h2>
        <p>{t("gallery.photos.pending")}</p>
        <GalleryCollection t={t} />
      </PageSection>
      <PageSection index={2} className="alt">
        <h2>{t("gallery.identity")}</h2>
        <div className="grid grid-media mt-10">
          {images.map(([src, label]) => (
            <figure key={src} className="media-card">
              <a className="media-preview bg-white" href={src} target="_blank" rel="noopener noreferrer" aria-label={`${t("gallery.enlarge")}: ${t(label)}`}><img src={src} alt={t(label)} width="320" height="320" className="media-logo" loading="lazy" /></a>
              <figcaption>{t(label)} · {t("gallery.enlarge")}</figcaption>
            </figure>
          ))}
        </div>
      </PageSection>
    </>
  );
}

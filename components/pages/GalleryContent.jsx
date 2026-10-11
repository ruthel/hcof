import PageSection from "../PageSection";

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
      </PageSection>
      <PageSection index={2} className="alt">
        <h2>{t("gallery.identity")}</h2>
        <div className="grid grid-media mt-10">
          {images.map(([src, label]) => (
            <figure key={src} className="media-card">
              <div className="media-preview bg-white"><img src={src} alt={t(label)} width="320" height="320" className="media-logo" loading="lazy" /></div>
              <figcaption>{t(label)}</figcaption>
            </figure>
          ))}
        </div>
      </PageSection>
    </>
  );
}

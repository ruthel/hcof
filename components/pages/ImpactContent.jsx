import Link from "next/link";
import PageSection from "../PageSection";
import { AlbumPreview } from "../GalleryAlbums";

export default function ImpactContent({ t, embedded = false }) {
  return (
    <>
      {!embedded && <PageSection index={0} className="pagehead">
        <h1>
          {t("pages.impact.section0.text1")}
        </h1>
        <p>
          {t("pages.impact.section0.text2")}
        </p>
      </PageSection>}
      <PageSection index={embedded ? "impact" : 1} id="impact" className={embedded ? "alt" : undefined}>
        {embedded && <h2>{t("nav.impact")}</h2>}
        <div className="album-inline"><AlbumPreview t={t} id="accountability" /></div>
        <span className="tag t-next">
          {t("pages.impact.section1.text1")}
        </span>
        <h2>
          {t("pages.impact.section1.text2")}
        </h2>
        <p>
          {t("pages.impact.section1.text3")}
        </p>
        <ul className="facts">
          <li>
            {t("pages.impact.section1.text4")}
          </li>
          <li>
            {t("pages.impact.section1.text5")}
          </li>
          <li>
            {t("pages.impact.section1.text6")}
          </li>
          <li>
            {t("pages.impact.section1.text7")}
          </li>
        </ul>
        <div className="box">
          <strong>
            {t("pages.impact.section1.text8")}
          </strong>
          <p>
            {t("pages.impact.section1.text9")}
            <Link href="/documents">
              {t("pages.impact.section1.text10")}
            </Link>
            {t("pages.impact.section1.text11")}
          </p>
        </div>
      </PageSection>
    </>
  );
}

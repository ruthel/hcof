import Link from "next/link";
import PageSection from "../PageSection";

export default function MediaKitContent({ t }) {
  return (
    <>
      <PageSection index={0} className="pagehead">
        <h1>
          {t("pages.media-kit.section0.text1")}
        </h1>
        <p>
          {t("pages.media-kit.section0.text2")}
        </p>
      </PageSection>
      <PageSection index={1}>
        <h2>
          {t("pages.media-kit.section1.text1")}
        </h2>
        <div className="grid grid-wide">
          <div className="box">
            <strong>
              {t("pages.media-kit.section1.text2")}
            </strong>
            <p>
              {t("pages.media-kit.section1.text3")}
            </p>
          </div>
          <div className="box">
            <strong>
              {t("pages.media-kit.section1.text4")}
            </strong>
            <p>
              {t("pages.media-kit.section1.text5")}
            </p>
          </div>
        </div>
        <h2 className="mt-12">
          {t("pages.media-kit.section1.text6")}
        </h2>
        <ul className="facts">
          <li>
            <strong>
              {t("pages.media-kit.section1.text7")}
            </strong>
            {t("pages.media-kit.section1.text8")}
          </li>
          <li>
            <strong>
              {t("pages.media-kit.section1.text9")}
            </strong>
            {t("pages.media-kit.section1.text10")}
          </li>
          <li>
            <strong>
              {t("pages.media-kit.section1.text11")}
            </strong>
            {t("pages.media-kit.section1.text12")}
          </li>
          <li>
            <strong>
              {t("pages.media-kit.section1.text13")}
            </strong>
            {t("pages.media-kit.section1.text14")}
          </li>
          <li>
            <strong>
              {t("pages.media-kit.section1.text15")}
            </strong>
            {t("pages.media-kit.section1.text16")}
          </li>
          <li>
            <strong>
              {t("pages.media-kit.section1.text17")}
            </strong>
            {t("pages.media-kit.section1.text18")}
          </li>
          <li>
            <strong>
              {t("pages.media-kit.section1.text19")}
            </strong>
            {t("pages.media-kit.section1.text20")}
          </li>
          <li>
            <strong>
              {t("pages.media-kit.section1.text21")}
            </strong>
            {t("pages.media-kit.section1.text22")}
          </li>
        </ul>
      </PageSection>
      <PageSection index={2} className="alt">
        <h2>
          {t("pages.media-kit.section2.text1")}
        </h2>
        <p>
          {t("pages.media-kit.section2.text2")}
        </p>
        <div className="grid grid-media">
          <figure className="media-card">
            <div className="media-preview media-preview-light">
              <img src="/assets/media/hcof-logo-principal.png" alt={t("pages.media-kit.section2.text3")} className="media-logo" />
            </div>
            <figcaption>
              <strong>
                {t("pages.media-kit.section2.text4")}
              </strong>
              {t("pages.media-kit.section2.text5")}
              <br />
              <a href="/assets/media/hcof-logo-principal.png" download>
                {t("pages.media-kit.section2.text6")}
              </a>
            </figcaption>
          </figure>
          <figure className="media-card">
            <div className="media-preview media-preview-dark">
              <img src="/assets/media/hcof-logo-fond-vert.png" alt={t("pages.media-kit.section2.text7")} className="media-logo" />
            </div>
            <figcaption>
              <strong>
                {t("pages.media-kit.section2.text8")}
              </strong>
              <br />
              <a href="/assets/media/hcof-logo-fond-vert.png" download>
                {t("pages.media-kit.section2.text9")}
              </a>
            </figcaption>
          </figure>
          <figure className="media-card">
            <div className="media-preview media-preview-light">
              <img src="/assets/media/hcof-icone.png" alt={t("pages.media-kit.section2.text10")} className="media-logo" />
            </div>
            <figcaption>
              <strong>
                {t("pages.media-kit.section2.text11")}
              </strong>
              {t("pages.media-kit.section2.text12")}
              <br />
              <a href="/assets/media/hcof-icone.png" download>
                {t("pages.media-kit.section2.text13")}
              </a>
            </figcaption>
          </figure>
        </div>
        <h3 className="mt-10">
          {t("pages.media-kit.section2.text14")}
        </h3>
        <ul className="facts">
          <li>
            {t("pages.media-kit.section2.text15")}
          </li>
          <li>
            {t("pages.media-kit.section2.text16")}
          </li>
          <li>
            {t("pages.media-kit.section2.text17")}
          </li>
          <li>
            {t("pages.media-kit.section2.text18")}
          </li>
        </ul>
      </PageSection>
      <PageSection index={3}>
        <h2>
          {t("pages.media-kit.section3.text1")}
        </h2>
        <div className="swatches">
          <div className="swatch-item">
            <div className="swatch swatch-ink">

            </div>
            <small>
              {t("pages.media-kit.section3.text2")}
              <br />
              {t("pages.media-kit.section3.text3")}
            </small>
          </div>
          <div className="swatch-item">
            <div className="swatch swatch-leaf">

            </div>
            <small>
              {t("pages.media-kit.section3.text4")}
              <br />
              {t("pages.media-kit.section3.text5")}
            </small>
          </div>
          <div className="swatch-item">
            <div className="swatch swatch-gold">

            </div>
            <small>
              {t("pages.media-kit.section3.text6")}
              <br />
              {t("pages.media-kit.section3.text7")}
            </small>
          </div>
          <div className="swatch-item">
            <div className="swatch swatch-mist">

            </div>
            <small>
              {t("pages.media-kit.section3.text8")}
              <br />
              {t("pages.media-kit.section3.text9")}
            </small>
          </div>
        </div>
        <p className="mt-6">
          {t("pages.media-kit.section3.text10")}
          <strong>
            {t("pages.media-kit.section3.text11")}
          </strong>
          {t("pages.media-kit.section3.text12")}
          <strong>
            {t("pages.media-kit.section3.text13")}
          </strong>
          {t("pages.media-kit.section3.text14")}
        </p>
      </PageSection>
      <PageSection index={4} className="alt">
        <h2>
          {t("pages.media-kit.section4.text1")}
        </h2>
        <p>
          {t("pages.media-kit.section4.text2")}
          <Link href="/child-protection">
            {t("pages.media-kit.section4.text3")}
          </Link>
          {t("pages.media-kit.section4.text4")}
        </p>
        <h2 className="mt-8">
          {t("pages.media-kit.section4.text5")}
        </h2>
        <p>
          {t("pages.media-kit.section4.text6")}
          <Link href="/contact">
            {t("pages.media-kit.section4.text7")}
          </Link>
          {t("pages.media-kit.section4.text8")}
        </p>
      </PageSection>
    </>
  );
}

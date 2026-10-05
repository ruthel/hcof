import Link from "next/link";
import PageSection from "../PageSection";

export default function AboutContent({ t }) {
  return (
    <>
      <PageSection index={0} className="pagehead">
        <h1>
          {t("pages.about.section0.text1")}
        </h1>
        <p>
          {t("pages.about.section0.text2")}
        </p>
      </PageSection>
      <PageSection index={1}>
        <h2>
          {t("pages.about.section1.text1")}
        </h2>
        <p>
          {t("pages.about.section1.text2")}
        </p>
        <p>
          {t("pages.about.section1.text3")}
        </p>
        <div className="verse">
          {t("pages.about.section1.text4")}
          <cite>
            {t("pages.about.section1.text5")}
          </cite>
        </div>
      </PageSection>
      <PageSection index={2} className="alt">
        <h2>
          {t("pages.about.section2.text1")}
        </h2>
        <div className="grid">
          <div className="item">
            <h3>
              {t("pages.about.section2.text2")}
            </h3>
            <p>
              {t("pages.about.section2.text3")}
            </p>
          </div>
          <div className="item">
            <h3>
              {t("pages.about.section2.text4")}
            </h3>
            <p>
              {t("pages.about.section2.text5")}
            </p>
          </div>
          <div className="item">
            <h3>
              {t("pages.about.section2.text6")}
            </h3>
            <p>
              {t("pages.about.section2.text7")}
            </p>
          </div>
        </div>
      </PageSection>
      <PageSection index={3}>
        <h2>
          {t("pages.about.section3.text1")}
        </h2>
        <div className="grid">
          <div className="item">
            <h3>
              {t("pages.about.section3.text2")}
            </h3>
            <p>
              {t("pages.about.section3.text3")}
            </p>
          </div>
          <div className="item">
            <h3>
              {t("pages.about.section3.text4")}
            </h3>
            <p>
              {t("pages.about.section3.text5")}
            </p>
          </div>
          <div className="item">
            <h3>
              {t("pages.about.section3.text6")}
            </h3>
            <p>
              {t("pages.about.section3.text7")}
            </p>
          </div>
          <div className="item">
            <h3>
              {t("pages.about.section3.text8")}
            </h3>
            <p>
              {t("pages.about.section3.text9")}
            </p>
          </div>
          <div className="item">
            <h3>
              {t("pages.about.section3.text10")}
            </h3>
            <p>
              {t("pages.about.section3.text11")}
            </p>
          </div>
          <div className="item">
            <h3>
              {t("pages.about.section3.text12")}
            </h3>
            <p>
              {t("pages.about.section3.text13")}
            </p>
          </div>
        </div>
      </PageSection>
      <PageSection index={4} className="alt">
        <h2>
          {t("pages.about.section4.text1")}
        </h2>
        <p>
          {t("pages.about.section4.text2")}
        </p>
        <div className="verse">
          <p>
            {t("pages.about.section4.text3")}
          </p>
          <p>
            {t("pages.about.section4.text4")}
          </p>
          <p>
            {t("pages.about.section4.text5")}
          </p>
          <p>
            {t("pages.about.section4.text6")}
          </p>
          <cite>
            {t("pages.about.section4.text7")}
          </cite>
        </div>
      </PageSection>
      <PageSection index={5} id="governance">
        <h2>
          {t("pages.about.section5.text1")}
        </h2>
        <p>
          {t("pages.about.section5.text2")}
        </p>
        <ul className="facts">
          <li>
            <strong>
              {t("pages.about.section5.text3")}
            </strong>
            {t("pages.about.section5.text4")}
          </li>
          <li>
            <strong>
              {t("pages.about.section5.text5")}
            </strong>
            {t("pages.about.section5.text6")}
          </li>
          <li>
            <strong>
              {t("pages.about.section5.text7")}
            </strong>
            {t("pages.about.section5.text8")}
          </li>
          <li>
            <strong>
              {t("pages.about.section5.text9")}
            </strong>
            {t("pages.about.section5.text10")}
          </li>
          <li>
            <strong>
              {t("pages.about.section5.text11")}
            </strong>
            {t("pages.about.section5.text12")}
          </li>
          <li>
            <strong>
              {t("pages.about.section5.text13")}
            </strong>
            {t("pages.about.section5.text14")}
          </li>
        </ul>
        <p>
          {t("pages.about.section5.text15")}
        </p>
        <p>
          {t("pages.about.section5.text16")}
        </p>
      </PageSection>
      <PageSection index={6} className="alt">
        <h2 id="documents">
          {t("pages.about.section6.text1")}
        </h2>
        <p>
          {t("pages.about.section6.text2")}
        </p>
        <div className="grid document-list">
          <div className="item">
            <h3>
              {t("pages.about.section6.text3")}
            </h3>
            <p>
              {t("pages.about.section6.text4")}
            </p>
          </div>
          <div className="item">
            <h3>
              {t("pages.about.section6.text5")}
            </h3>
            <p>
              {t("pages.about.section6.text6")}
            </p>
          </div>
          <div className="item">
            <h3>
              {t("pages.about.section6.text7")}
            </h3>
            <p>
              {t("pages.about.section6.text8")}
            </p>
          </div>
          <div className="item">
            <h3>
              {t("pages.about.section6.text9")}
            </h3>
            <p>
              {t("pages.about.section6.text10")}
            </p>
          </div>
        </div>
        <p className="mt-10">
          <strong>
            {t("pages.about.section6.text11")}
          </strong>
          {t("pages.about.section6.text12")}
        </p>
        <p>
          <Link className="btn green" href="/documents">
            {t("pages.about.section6.text13")}
          </Link>
        </p>
      </PageSection>
    </>
  );
}

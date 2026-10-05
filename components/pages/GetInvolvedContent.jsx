import Link from "next/link";
import PageSection from "../PageSection";

export default function GetInvolvedContent({ t }) {
  return (
    <>
      <PageSection index={0} className="pagehead">
        <h1>
          {t("pages.get-involved.section0.text1")}
        </h1>
        <p>
          {t("pages.get-involved.section0.text2")}
        </p>
      </PageSection>
      <PageSection index={1}>
        <p>
          {t("pages.get-involved.section1.text1")}
        </p>
        <div className="grid grid-wide">
          <article className="item" id="volunteer">
            <h3>
              {t("pages.get-involved.section1.text2")}
            </h3>
            <p>
              {t("pages.get-involved.section1.text3")}
            </p>
            <ul className="facts">
              <li>
                {t("pages.get-involved.section1.text4")}
              </li>
              <li>
                {t("pages.get-involved.section1.text5")}
              </li>
              <li>
                {t("pages.get-involved.section1.text6")}
              </li>
              <li>
                {t("pages.get-involved.section1.text7")}
              </li>
              <li>
                {t("pages.get-involved.section1.text8")}
              </li>
              <li>
                {t("pages.get-involved.section1.text9")}
              </li>
            </ul>
            <Link className="btn green" href="/contact">
              {t("pages.get-involved.section1.text10")}
            </Link>
          </article>
          <article className="item" id="partner">
            <h3>
              {t("pages.get-involved.section1.text11")}
            </h3>
            <p>
              {t("pages.get-involved.section1.text12")}
            </p>
            <ul className="facts">
              <li>
                {t("pages.get-involved.section1.text13")}
              </li>
              <li>
                {t("pages.get-involved.section1.text14")}
              </li>
              <li>
                {t("pages.get-involved.section1.text15")}
              </li>
              <li>
                {t("pages.get-involved.section1.text16")}
              </li>
            </ul>
            <Link className="btn green" href="/contact">
              {t("pages.get-involved.section1.text17")}
            </Link>
          </article>
          <article className="item" id="churches">
            <h3>
              {t("pages.get-involved.section1.text18")}
            </h3>
            <p>
              {t("pages.get-involved.section1.text19")}
            </p>
            <Link className="btn green" href="/contact">
              {t("pages.get-involved.section1.text20")}
            </Link>
          </article>
          <article className="item" id="support">
            <h3>
              {t("pages.get-involved.section1.text21")}
            </h3>
            <p>
              {t("pages.get-involved.section1.text22")}
            </p>
            <Link className="btn green" href="/give">
              {t("pages.get-involved.section1.text23")}
            </Link>
          </article>
        </div>
      </PageSection>
      <PageSection index={2} className="alt">
        <h2>
          {t("pages.get-involved.section2.text1")}
        </h2>
        <ol className="road">
          <li className="now">
            <h3>
              {t("pages.get-involved.section2.text2")}
            </h3>
            <p>
              {t("pages.get-involved.section2.text3")}
            </p>
          </li>
          <li>
            <h3>
              {t("pages.get-involved.section2.text4")}
            </h3>
            <p>
              {t("pages.get-involved.section2.text5")}
            </p>
          </li>
          <li>
            <h3>
              {t("pages.get-involved.section2.text6")}
            </h3>
            <p>
              {t("pages.get-involved.section2.text7")}
              <Link href="/child-protection">
                {t("pages.get-involved.section2.text8")}
              </Link>
              {t("pages.get-involved.section2.text9")}
            </p>
          </li>
          <li>
            <h3>
              {t("pages.get-involved.section2.text10")}
            </h3>
            <p>
              {t("pages.get-involved.section2.text11")}
            </p>
          </li>
        </ol>
      </PageSection>
      <PageSection index={3}>
        <h2>
          {t("pages.get-involved.section3.text1")}
        </h2>
        <p>
          {t("pages.get-involved.section3.text2")}
          <Link href="/media-kit">
            {t("pages.get-involved.section3.text3")}
          </Link>
          {t("pages.get-involved.section3.text4")}
        </p>
      </PageSection>
    </>
  );
}

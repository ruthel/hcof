import Link from "next/link";
import PageSection from "../PageSection";

export default function ProgramsContent({ t }) {
  return (
    <>
      <PageSection index={0} className="pagehead">
        <h1>
          {t("pages.programs.section0.text1")}
        </h1>
        <p>
          {t("pages.programs.section0.text2")}
        </p>
      </PageSection>
      <PageSection index={1}>
        <h2>
          {t("pages.programs.section1.text1")}
        </h2>
        <p>
          {t("pages.programs.section1.text2")}
          <strong>
            {t("pages.programs.section1.text3")}
          </strong>
          {t("pages.programs.section1.text4")}
        </p>
        <p>
          <strong>
            {t("pages.programs.section1.text5")}
          </strong>
          {t("pages.programs.section1.text6")}
        </p>
      </PageSection>
      <PageSection index={2} className="alt">
        <div className="grid grid-wide">
          <article className="item">
            <span className="tag t-now">
              {t("pages.programs.section2.text1")}
            </span>
            <h3>
              {t("pages.programs.section2.text2")}
            </h3>
            <p>
              {t("pages.programs.section2.text3")}
            </p>
            <p>
              <strong>
                {t("pages.programs.section2.text4")}
              </strong>
              {t("pages.programs.section2.text5")}
            </p>
            <p>
              <strong>
                {t("pages.programs.section2.text6")}
              </strong>
              {t("pages.programs.section2.text7")}
            </p>
          </article>
          <article className="item">
            <span className="tag t-now">
              {t("pages.programs.section2.text8")}
            </span>
            <h3>
              {t("pages.programs.section2.text9")}
            </h3>
            <p>
              {t("pages.programs.section2.text10")}
            </p>
            <p>
              <strong>
                {t("pages.programs.section2.text11")}
              </strong>
              {t("pages.programs.section2.text12")}
            </p>
            <p>
              <strong>
                {t("pages.programs.section2.text13")}
              </strong>
              {t("pages.programs.section2.text14")}
            </p>
          </article>
          <article className="item">
            <span className="tag t-now">
              {t("pages.programs.section2.text15")}
            </span>
            <h3>
              {t("pages.programs.section2.text16")}
            </h3>
            <p>
              {t("pages.programs.section2.text17")}
            </p>
            <p>
              <strong>
                {t("pages.programs.section2.text18")}
              </strong>
              {t("pages.programs.section2.text19")}
            </p>
            <p>
              <strong>
                {t("pages.programs.section2.text20")}
              </strong>
              {t("pages.programs.section2.text21")}
            </p>
          </article>
        </div>
      </PageSection>
      <PageSection index={3}>
        <h2>
          {t("pages.programs.section3.text1")}
        </h2>
        <p>
          {t("pages.programs.section3.text2")}
        </p>
        <p>
          {t("pages.programs.section3.text3")}
          <Link href="/child-protection">
            {t("pages.programs.section3.text4")}
          </Link>
          {t("pages.programs.section3.text5")}
        </p>
      </PageSection>
      <PageSection index={4} className="alt">
        <h2>
          {t("pages.programs.section4.text1")}
        </h2>
        <p>
          {t("pages.programs.section4.text2")}
          <Link href="/impact">
            {t("pages.programs.section4.text3")}
          </Link>
          {t("pages.programs.section4.text4")}
          <Link href="/give">
            {t("pages.programs.section4.text5")}
          </Link>
          {t("pages.programs.section4.text6")}
        </p>
      </PageSection>
      <PageSection index={5}>
        <h2>
          {t("pages.programs.section5.text1")}
        </h2>
        <p>
          {t("pages.programs.section5.text2")}
        </p>
        <h3 className="mt-10">
          {t("pages.programs.section5.text3")}
        </h3>
        <p>
          {t("pages.programs.section5.text4")}
        </p>
        <div className="btns">
          <Link className="btn green" href="/journey">
            {t("pages.programs.section5.text5")}
          </Link>
          {" "}
          <Link className="btn ghost" href="/get-involved">
            {t("pages.programs.section5.text6")}
          </Link>
        </div>
      </PageSection>
    </>
  );
}

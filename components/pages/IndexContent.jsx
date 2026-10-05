import Link from "next/link";
import PageSection from "../PageSection";

export default function IndexContent({ t }) {
  return (
    <>
      <PageSection index={0} className="hero">
        <h1>
          {t("pages.index.section0.text1")}
        </h1>
        <p className="lead">
          {t("pages.index.section0.text2")}
        </p>
        <div className="btns">
          <Link className="btn" href="/get-involved">
            {t("pages.index.section0.text3")}
          </Link>
          {" "}
          <Link className="btn ghost" href="/journey">
            {t("pages.index.section0.text4")}
          </Link>
        </div>
        <p className="motto">
          {t("pages.index.section0.text5")}
        </p>
      </PageSection>
      <PageSection index={1}>
        <h2>
          {t("pages.index.section1.text1")}
        </h2>
        <p>
          {t("pages.index.section1.text2")}
        </p>
        <div className="grid">
          <div className="item">
            <span className="tag t-now">
              {t("pages.index.section1.text3")}
            </span>
            <h3>
              {t("pages.index.section1.text4")}
            </h3>
            <p>
              {t("pages.index.section1.text5")}
            </p>
          </div>
          <div className="item">
            <span className="tag t-now">
              {t("pages.index.section1.text6")}
            </span>
            <h3>
              {t("pages.index.section1.text7")}
            </h3>
            <p>
              {t("pages.index.section1.text8")}
            </p>
          </div>
          <div className="item">
            <span className="tag t-now">
              {t("pages.index.section1.text9")}
            </span>
            <h3>
              {t("pages.index.section1.text10")}
            </h3>
            <p>
              {t("pages.index.section1.text11")}
            </p>
          </div>
        </div>
        <div className="btns">
          <Link className="btn green" href="/programs">
            {t("pages.index.section1.text12")}
          </Link>
        </div>
      </PageSection>
      <PageSection index={2} className="alt">
        <h2>
          {t("pages.index.section2.text1")}
        </h2>
        <p>
          {t("pages.index.section2.text2")}
        </p>
        <div className="grid institution-grid">
          <div className="item">
            <span className="tag t-now">
              {t("pages.index.section2.text3")}
            </span>
            <h3>
              {t("pages.index.section2.text4")}
            </h3>
            <p>
              {t("pages.index.section2.text5")}
            </p>
          </div>
          <div className="item">
            <span className="tag t-next">
              {t("pages.index.section2.text6")}
            </span>
            <h3>
              {t("pages.index.section2.text7")}
            </h3>
            <p>
              {t("pages.index.section2.text8")}
            </p>
          </div>
          <div className="item">
            <span className="tag t-next">
              {t("pages.index.section2.text9")}
            </span>
            <h3>
              {t("pages.index.section2.text10")}
            </h3>
            <p>
              {t("pages.index.section2.text11")}
            </p>
          </div>
          <div className="item v">
            <span className="tag t-vision">
              {t("pages.index.section2.text12")}
            </span>
            <h3>
              {t("pages.index.section2.text13")}
            </h3>
            <p>
              {t("pages.index.section2.text14")}
            </p>
          </div>
        </div>
        <div className="box mt-10">
          <strong>
            {t("pages.index.section2.text15")}
          </strong>
          <p>
            {t("pages.index.section2.text16")}
          </p>
        </div>
        <div className="btns">
          <Link className="btn green" href="/journey">
            {t("pages.index.section2.text17")}
          </Link>
          {" "}
          <Link className="btn ghost" href="/hopes-city">
            {t("pages.index.section2.text18")}
          </Link>
        </div>
      </PageSection>
    </>
  );
}

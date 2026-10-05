import Link from "next/link";
import PageSection from "../PageSection";

export default function HopesCityContent({ t }) {
  return (
    <>
      <PageSection index={0} className="pagehead">
        <h1>
          {t("pages.hopes-city.section0.text1")}
        </h1>
        <p>
          {t("pages.hopes-city.section0.text2")}
        </p>
      </PageSection>
      <PageSection index={1}>
        <span className="tag t-vision">
          {t("pages.hopes-city.section1.text1")}
        </span>
        <h2>
          {t("pages.hopes-city.section1.text2")}
        </h2>
        <p>
          {t("pages.hopes-city.section1.text3")}
          <strong>
            {t("pages.hopes-city.section1.text4")}
          </strong>
          {t("pages.hopes-city.section1.text5")}
        </p>
        <div className="grid">
          <div className="item v">
            <span className="tag t-vision">
              {t("pages.hopes-city.section1.text6")}
            </span>
            <h3>
              {t("pages.hopes-city.section1.text7")}
            </h3>
            <p>
              {t("pages.hopes-city.section1.text8")}
            </p>
          </div>
          <div className="item v">
            <span className="tag t-vision">
              {t("pages.hopes-city.section1.text9")}
            </span>
            <h3>
              {t("pages.hopes-city.section1.text10")}
            </h3>
            <p>
              {t("pages.hopes-city.section1.text11")}
            </p>
          </div>
          <div className="item v">
            <span className="tag t-vision">
              {t("pages.hopes-city.section1.text12")}
            </span>
            <h3>
              {t("pages.hopes-city.section1.text13")}
            </h3>
            <p>
              {t("pages.hopes-city.section1.text14")}
            </p>
          </div>
          <div className="item v">
            <span className="tag t-vision">
              {t("pages.hopes-city.section1.text15")}
            </span>
            <h3>
              {t("pages.hopes-city.section1.text16")}
            </h3>
            <p>
              {t("pages.hopes-city.section1.text17")}
            </p>
          </div>
        </div>
        <div className="box mt-10">
          <strong>
            {t("pages.hopes-city.section1.text18")}
          </strong>
          <p>
            {t("pages.hopes-city.section1.text19")}
          </p>
        </div>
        <div className="btns">
          <Link className="btn green" href="/journey">
            {t("pages.hopes-city.section1.text20")}
          </Link>
        </div>
      </PageSection>
    </>
  );
}

import Link from "next/link";
import PageSection from "../PageSection";

export default function JourneyContent({ t }) {
  return (
    <>
      <PageSection index={0} className="pagehead">
        <h1>
          {t("pages.journey.section0.text1")}
        </h1>
        <p>
          {t("pages.journey.section0.text2")}
        </p>
      </PageSection>
      <PageSection index={1}>
        <p>
          {t("pages.journey.section1.text1")}
        </p>
        <h2>
          {t("pages.journey.section1.text2")}
        </h2>
        <div className="institution-current">
          <span className="tag t-now">
            {t("pages.journey.section1.text3")}
          </span>
          <h3>
            {t("pages.journey.section1.text4")}
          </h3>
          <p>
            {t("pages.journey.section1.text5")}
          </p>
        </div>
        <h2 className="mt-12">
          {t("pages.journey.section1.text6")}
        </h2>
        <p>
          {t("pages.journey.section1.text7")}
        </p>
        <div className="grid institution-grid">
          <div className="item">
            <span className="tag t-next">
              {t("pages.journey.section1.text8")}
            </span>
            <h3>
              {t("pages.journey.section1.text9")}
            </h3>
            <p>
              {t("pages.journey.section1.text10")}
            </p>
          </div>
          <div className="item">
            <span className="tag t-next">
              {t("pages.journey.section1.text11")}
            </span>
            <h3>
              {t("pages.journey.section1.text12")}
            </h3>
            <p>
              {t("pages.journey.section1.text13")}
            </p>
          </div>
        </div>
        <h2 className="mt-12">
          {t("pages.journey.section1.text14")}
        </h2>
        <div className="item v institution-foundation">
          <span className="tag t-vision">
            {t("pages.journey.section1.text15")}
          </span>
          <h3>
            {t("pages.journey.section1.text16")}
          </h3>
          <p>
            {t("pages.journey.section1.text17")}
          </p>
        </div>
        <div className="box mt-10">
          <strong>
            {t("pages.journey.section1.text18")}
          </strong>
          <p>
            {t("pages.journey.section1.text19")}
          </p>
        </div>
      </PageSection>
    </>
  );
}

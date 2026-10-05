import Link from "next/link";
import PageSection from "../PageSection";

export default function GiveContent({ t }) {
  return (
    <>
      <PageSection index={0} className="pagehead">
        <h1>
          {t("pages.give.section0.text1")}
        </h1>
        <p>
          {t("pages.give.section0.text2")}
        </p>
      </PageSection>
      <PageSection index={1}>
        <span className="tag t-next">
          {t("pages.give.section1.text1")}
        </span>
        <h2>
          {t("pages.give.section1.text2")}
        </h2>
        <p>
          {t("pages.give.section1.text3")}
        </p>
        <div className="box">
          {t("pages.give.section1.text4")}
        </div>
      </PageSection>
      <PageSection index={2} className="alt">
        <h2>
          {t("pages.give.section2.text1")}
        </h2>
        <p>
          {t("pages.give.section2.text2")}
        </p>
        <h2 className="mt-8">
          {t("pages.give.section2.text3")}
        </h2>
        <p>
          {t("pages.give.section2.text4")}
        </p>
        <ul className="facts">
          <li>
            {t("pages.give.section2.text5")}
          </li>
          <li>
            {t("pages.give.section2.text6")}
          </li>
          <li>
            {t("pages.give.section2.text7")}
          </li>
          <li>
            {t("pages.give.section2.text8")}
          </li>
          <li>
            {t("pages.give.section2.text9")}
          </li>
        </ul>
      </PageSection>
    </>
  );
}

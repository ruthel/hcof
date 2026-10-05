import Link from "next/link";
import PageSection from "../PageSection";

export default function LegalContent({ t }) {
  return (
    <>
      <PageSection index={0} className="pagehead">
        <h1>
          {t("pages.legal.section0.text1")}
        </h1>
        <p>
          {t("pages.legal.section0.text2")}
        </p>
      </PageSection>
      <PageSection index={1}>
        <h2>
          {t("pages.legal.section1.text1")}
        </h2>
        <p>
          {t("pages.legal.section1.text2")}
        </p>
        <p>
          {t("pages.legal.section1.text3")}
        </p>
        <h2>
          {t("pages.legal.section1.text4")}
        </h2>
        <p>
          {t("pages.legal.section1.text5")}
        </p>
        <h2>
          {t("pages.legal.section1.text6")}
        </h2>
        <p>
          {t("pages.legal.section1.text7")}
        </p>
      </PageSection>
    </>
  );
}

import Link from "next/link";
import PageSection from "../PageSection";

export default function ChildProtectionContent({ t }) {
  return (
    <>
      <PageSection index={0} className="pagehead">
        <h1>
          {t("pages.child-protection.section0.text1")}
        </h1>
        <p>
          {t("pages.child-protection.section0.text2")}
        </p>
      </PageSection>
      <PageSection index={1}>
        <p>
          {t("pages.child-protection.section1.text1")}
        </p>
        <h2>
          {t("pages.child-protection.section1.text2")}
        </h2>
        <ul className="facts">
          <li>
            {t("pages.child-protection.section1.text3")}
          </li>
          <li>
            {t("pages.child-protection.section1.text4")}
          </li>
          <li>
            {t("pages.child-protection.section1.text5")}
          </li>
          <li>
            {t("pages.child-protection.section1.text6")}
          </li>
        </ul>
        <p>
          {t("pages.child-protection.section1.text7")}
        </p>
        <h2>
          {t("pages.child-protection.section1.text8")}
        </h2>
        <p>
          {t("pages.child-protection.section1.text9")}
          <Link href="/contact">
            {t("pages.child-protection.section1.text10")}
          </Link>
          {t("pages.child-protection.section1.text11")}
        </p>
        <h2>
          {t("pages.child-protection.section1.text12")}
        </h2>
        <p>
          {t("pages.child-protection.section1.text13")}
        </p>
      </PageSection>
    </>
  );
}

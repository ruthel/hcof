import Link from "next/link";
import PageSection from "../PageSection";
import ContactForm from "../ContactForm";

export default function ContactContent({ t }) {
  return (
    <>
      <PageSection index={0} className="pagehead">
        <h1>
          {t("pages.contact.section0.text1")}
        </h1>
        <p>
          {t("pages.contact.section0.text2")}
        </p>
      </PageSection>
      <PageSection index={1}>
        <h2>
          {t("pages.contact.section1.text1")}
        </h2>
        <p>
          {t("pages.contact.section1.text2")}
        </p>
        <p className="mt-8">
          {t("pages.contact.section1.text3")}
        </p>
        <ContactForm />
      </PageSection>
      <PageSection index={2} className="alt">
        <h2>
          {t("pages.contact.section2.text1")}
        </h2>
        <details className="faq">
          <summary>
            {t("pages.contact.section2.text2")}
          </summary>
          <p>
            {t("pages.contact.section2.text3")}
          </p>
        </details>
        <details className="faq">
          <summary>
            {t("pages.contact.section2.text4")}
          </summary>
          <p>
            {t("pages.contact.section2.text5")}
          </p>
        </details>
        <details className="faq">
          <summary>
            {t("pages.contact.section2.text6")}
          </summary>
          <p>
            {t("pages.contact.section2.text7")}
          </p>
        </details>
        <details className="faq">
          <summary>
            {t("pages.contact.section2.text8")}
          </summary>
          <p>
            {t("pages.contact.section2.text9")}
          </p>
        </details>
        <details className="faq">
          <summary>
            {t("pages.contact.section2.text10")}
          </summary>
          <p>
            {t("pages.contact.section2.text11")}
            <Link href="/give">
              {t("pages.contact.section2.text12")}
            </Link>
            {t("pages.contact.section2.text13")}
          </p>
        </details>
        <details className="faq">
          <summary>
            {t("pages.contact.section2.text14")}
          </summary>
          <p>
            {t("pages.contact.section2.text15")}
            <Link href="/about#governance">
              {t("pages.contact.section2.text16")}
            </Link>
            {t("pages.contact.section2.text17")}
          </p>
        </details>
      </PageSection>
    </>
  );
}

import Link from "next/link";
import PageSection from "../PageSection";

export default function NewsContent({ t }) {
  return (
    <>
      <PageSection index={0} className="pagehead">
        <h1>
          {t("pages.news.section0.text1")}
        </h1>
        <p>
          {t("pages.news.section0.text2")}
        </p>
      </PageSection>
      <PageSection index={1}>
        <p>
          {t("pages.news.section1.text1")}
        </p>
        <form action="https://formspree.io/f/YOUR_ID" method="post">
          <input type="hidden" name="_subject" value={t("pages.news.section1.text2")} />
          <label htmlFor="nl">
            {t("pages.news.section1.text3")}
          </label>
          <input id="nl" name="email" type="email" required autoComplete="email" />
          <button className="btn green" type="submit">
            {t("pages.news.section1.text4")}
          </button>
        </form>
        <h2 className="mt-12">
          {t("pages.news.section1.text5")}
        </h2>
        <p>
          {t("pages.news.section1.text6")}
          <Link href="/contact">
            {t("pages.news.section1.text7")}
          </Link>
          {t("pages.news.section1.text8")}
          <Link href="/media-kit">
            {t("pages.news.section1.text9")}
          </Link>
          {t("pages.news.section1.text10")}
        </p>
      </PageSection>
    </>
  );
}

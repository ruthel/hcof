import PageSection from "../PageSection";
import DocumentCategories from "../DocumentCategories";

export default function DocumentsContent({ t }) {
  return (
    <>
      <PageSection index={0} className="pagehead">
        <h1>{t("pages.documents.section0.text1")}</h1>
        <p>{t("pages.documents.section0.text2")}</p>
      </PageSection>
      <PageSection index={1}>
        <p>{t("pages.documents.section1.text1")}</p>
        <DocumentCategories t={t} />
      </PageSection>
    </>
  );
}

import PageSection from "../PageSection";

export default function UpdatesContent({ t }) {
  return (
    <>
      <PageSection index={0} className="pagehead">
        <h1>{t("pages.updates.heading")}</h1>
        <p>{t("pages.updates.intro")}</p>
      </PageSection>
      <PageSection index={1}>
        <h2>{t("pages.updates.empty.heading")}</h2>
        <p>{t("pages.updates.empty.description")}</p>
      </PageSection>
    </>
  );
}

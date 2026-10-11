import Link from "next/link";
import PageSection from "../PageSection";

function PolicyContent({ t, pageKey, sections }) {
  return (
    <>
      <PageSection index={0} className="pagehead">
        <h1>{t(`policies.${pageKey}.heading`)}</h1>
        <p>{t(`pages.${pageKey}.description`)}</p>
      </PageSection>
      <PageSection index={1}>
        {sections.map((section) => (
          <div className="policy-section" key={section}>
            <h2>{t(`policies.${pageKey}.${section}.title`)}</h2>
            <p>{t(`policies.${pageKey}.${section}.text`)}</p>
            {section === "analytics" && <a className="album-link" href="https://vercel.com/docs/analytics/privacy-policy" target="_blank" rel="noopener noreferrer">{t("policies.analytics.reference")}</a>}
          </div>
        ))}
        <div className="btns mt-10">
          <Link className="btn green" href="/contact">{t("nav.contact")}</Link>
          <Link className="btn ghost" href={pageKey === "privacy-policy" ? "/terms-of-use" : "/privacy-policy"}>{t(pageKey === "privacy-policy" ? "footer.terms" : "footer.privacy")}</Link>
        </div>
      </PageSection>
    </>
  );
}

export function PrivacyContent({ t }) {
  return <PolicyContent t={t} pageKey="privacy-policy" sections={["scope", "forms", "providers", "analytics", "storage", "requests"]} />;
}

export function TermsContent({ t }) {
  return <PolicyContent t={t} pageKey="terms-of-use" sections={["purpose", "use", "content", "status", "links", "contact"]} />;
}

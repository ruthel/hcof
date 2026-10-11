"use client";

import Link from "next/link";
import { useIntl } from "react-intl";
import Container from "./Container";
import { SITE_LINKS } from "./siteNavigation";
import NewsletterForm from "./NewsletterForm";

export default function Footer() {
  const intl = useIntl();
  const t = (id) => intl.formatMessage({ id });

  return (
    <footer className="border-t-4 border-hcof-gold bg-hcof-deep py-14 text-white/80">
      <Container>
        <img
          src="/assets/logo-lockup-dark.jpg"
          alt="HCOF, Hope. Protection. Transformation."
          width="280"
          height="107"
          className="w-[min(320px,75vw)] rounded-xl"
        />

        <div className="mt-10 grid gap-10 border-t border-white/10 pt-10 md:grid-cols-3 md:gap-12">
          <div>
            <h3 className="mb-4 font-ui text-[0.72rem] font-bold uppercase tracking-[0.12em] text-hcof-gold-soft">
              {t("footer.site")}
            </h3>
            <ul className="grid list-none gap-2 p-0 font-body text-sm leading-6">
              {SITE_LINKS.filter(([href]) => href !== "/contact").map(([href, id]) => (
                <li key={href}><Link className="text-white no-underline hover:underline" href={href}>{t(id)}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-ui text-[0.72rem] font-bold uppercase tracking-[0.12em] text-hcof-gold-soft">
              {t("footer.trust")}
            </h3>
            <ul className="grid list-none gap-2 p-0 font-body text-sm leading-6">
              <li><Link className="text-white no-underline hover:underline" href="/child-protection">{t("footer.childProtection")}</Link></li>
              <li><Link className="text-white no-underline hover:underline" href="/media-kit">{t("footer.mediaKit")}</Link></li>
              <li><Link className="text-white no-underline hover:underline" href="/give">{t("footer.accountability")}</Link></li>
              <li><Link className="text-white no-underline hover:underline" href="/documents">{t("footer.transparency")}</Link></li>
              <li><Link className="text-white no-underline hover:underline" href="/legal">{t("footer.legal")}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-ui text-[0.72rem] font-bold uppercase tracking-[0.12em] text-hcof-gold-soft">
              {t("footer.contact")}
            </h3>
            <ul className="grid list-none gap-2 p-0 font-body text-sm leading-6">
              <li>{t("footer.location")}</li>
              <li><Link className="text-white no-underline hover:underline" href="/contact">{t("nav.contact")}</Link></li>
              <li><Link className="text-white no-underline hover:underline" href="/news">{t("footer.newsletter")}</Link></li>
            </ul>
            <NewsletterForm footer />
          </div>
        </div>

        <p className="mt-10 max-w-none border-t border-white/10 pt-6 font-body text-xs leading-6 text-white/55">
          © 2027 HCOF. {t("footer.rights")}
          <br />
          {t("footer.law")}
        </p>
      </Container>
    </footer>
  );
}

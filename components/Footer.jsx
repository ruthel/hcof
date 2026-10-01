"use client";

import Link from "next/link";
import { useIntl } from "react-intl";
import Container from "./Container";

export default function Footer() {
  const intl = useIntl();
  const t = (id) => intl.formatMessage({ id });

  return (
    <footer className="border-t-4 border-hcof-gold bg-hcof-ink py-14 text-white/80">
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
              <li><Link className="text-white no-underline hover:underline" href="/about">{t("nav.who")}</Link></li>
              <li><Link className="text-white no-underline hover:underline" href="/programs">{t("nav.what")}</Link></li>
              <li><Link className="text-white no-underline hover:underline" href="/journey">{t("nav.journey")}</Link></li>
              <li><Link className="text-white no-underline hover:underline" href="/hopes-city">{t("nav.city")}</Link></li>
              <li><Link className="text-white no-underline hover:underline" href="/impact">{t("nav.impact")}</Link></li>
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
              <li><Link className="text-white no-underline hover:underline" href="/about#documents">{t("footer.transparency")}</Link></li>
              <li><Link className="text-white no-underline hover:underline" href="/legal">{t("footer.legal")}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-ui text-[0.72rem] font-bold uppercase tracking-[0.12em] text-hcof-gold-soft">
              {t("footer.contact")}
            </h3>
            <ul className="grid list-none gap-2 p-0 font-body text-sm leading-6">
              <li>{t("footer.location")}</li>
              <li><Link className="text-white no-underline hover:underline" href="/contact">{t("footer.write")}</Link></li>
              <li><Link className="text-white no-underline hover:underline" href="/news">{t("footer.newsletter")}</Link></li>
            </ul>
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

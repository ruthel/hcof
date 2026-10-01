"use client";

import Link from "next/link";
import { useIntl } from "react-intl";
import Container from "./Container";

export default function Footer() {
  const intl = useIntl();
  const t = (id) => intl.formatMessage({ id });

  return (
    <footer className="site">
      <Container className="footer-container">
        <img
          src="/assets/logo-lockup-dark.jpg"
          alt="HCOF, Hope. Protection. Transformation."
          width="280"
          height="107"
        />

        <div className="cols">
          <div>
            <h3>{t("footer.site")}</h3>
            <ul>
              <li><Link href="/about">{t("nav.who")}</Link></li>
              <li><Link href="/programs">{t("nav.what")}</Link></li>
              <li><Link href="/journey">{t("nav.journey")}</Link></li>
              <li><Link href="/hopes-city">{t("nav.city")}</Link></li>
              <li><Link href="/impact">{t("nav.impact")}</Link></li>
            </ul>
          </div>

          <div>
            <h3>{t("footer.trust")}</h3>
            <ul>
              <li><Link href="/child-protection">{t("footer.childProtection")}</Link></li>
              <li><Link href="/media-kit">{t("footer.mediaKit")}</Link></li>
              <li><Link href="/give">{t("footer.accountability")}</Link></li>
              <li><Link href="/legal">{t("footer.legal")}</Link></li>
            </ul>
          </div>

          <div>
            <h3>{t("footer.contact")}</h3>
            <ul>
              <li>{t("footer.location")}</li>
              <li><Link href="/contact">{t("footer.write")}</Link></li>
              <li><Link href="/news">{t("footer.newsletter")}</Link></li>
            </ul>
          </div>
        </div>

        <p className="footer-legal">
          © 2027 HCOF. {t("footer.rights")}
          <br />
          {t("footer.law")}
        </p>
      </Container>
    </footer>
  );
}

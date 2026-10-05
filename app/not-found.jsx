"use client";

import Link from "next/link";
import { useIntl } from "react-intl";
import Container from "../components/Container";

export default function NotFound() {
  const intl = useIntl();
  const t = (id) => intl.formatMessage({ id });

  return (
    <main id="main" className="bg-hcof-mist py-20 sm:py-28">
      <Container className="text-center">
        <p className="mx-auto mb-6 font-ui text-6xl font-bold text-hcof-gold" aria-hidden="true">404</p>
        <h1>{t("notFound.title")}</h1>
        <p className="mx-auto mt-6 text-hcof-muted">{t("notFound.description")}</p>
        <div className="btns justify-center">
          <Link className="btn" href="/">{t("notFound.home")}</Link>
          <Link className="btn ghost" href="/contact">{t("notFound.contact")}</Link>
        </div>
      </Container>
    </main>
  );
}

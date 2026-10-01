"use client";

import { useIntl } from "react-intl";
import Container from "./Container";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function SiteChrome({ children }) {
  const intl = useIntl();

  return (
    <>
      <a className="skip" href="#main">{intl.formatMessage({ id: "skip" })}</a>
      <Navbar />
      <div className="status">
        <Container>{intl.formatMessage({ id: "status" })}</Container>
      </div>
      {children}
      <Footer />
    </>
  );
}

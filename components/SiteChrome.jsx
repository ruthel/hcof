"use client";

import { useIntl } from "react-intl";
import Container from "./Container";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { usePathname } from "next/navigation";
import AdminHeader from "./admin/AdminHeader";

export default function SiteChrome({ children }) {
  const intl = useIntl();
  const pathname = usePathname();
  if (pathname === "/admin" || pathname.startsWith("/admin/")) return <div className="admin-shell"><a className="skip" href="#main">{intl.formatMessage({ id: "skip" })}</a><AdminHeader />{children}</div>;

  return (
    <>
      <a className="skip" href="#main">
        {intl.formatMessage({ id: "skip" })}
      </a>

      <Navbar />

      <div className="bg-hcof-deep py-2 text-center font-ui text-[0.72rem] font-medium tracking-[0.02em] text-white/85">
        <Container>{intl.formatMessage({ id: "status" })}</Container>
      </div>

      {children}

      <Footer />
    </>
  );
}

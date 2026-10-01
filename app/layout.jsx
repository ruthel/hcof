import "../assets/style.css";
import I18nProvider from "../components/I18nProvider";
import SiteChrome from "../components/SiteChrome";

export const metadata = {
  title: "HCOF | Hope's City Outreach Foundation",
  description:
    "Christian non-profit association based in Douala, Cameroon, serving orphans, widows and the most vulnerable.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <I18nProvider>
          <SiteChrome>{children}</SiteChrome>
        </I18nProvider>
      </body>
    </html>
  );
}

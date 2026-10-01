import "../assets/style.css";
import { Fraunces, Montserrat } from "next/font/google";
import I18nProvider from "../components/I18nProvider";
import SiteChrome from "../components/SiteChrome";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata = {
  title: "HCOF | Hope's City Outreach Foundation",
  description:
    "Christian non-profit association based in Douala, Cameroon, serving orphans, widows and the most vulnerable.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${fraunces.variable}`}>
      <body>
        <I18nProvider>
          <SiteChrome>{children}</SiteChrome>
        </I18nProvider>
      </body>
    </html>
  );
}

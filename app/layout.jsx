import "./globals.css";
import { Cormorant_Garamond, Manrope, Sora } from "next/font/google";
import I18nProvider from "../components/I18nProvider";
import SiteChrome from "../components/SiteChrome";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["500", "600", "700"],
});

export const metadata = {
  title: "HCOF | Hope's City Outreach Foundation",
  description:
    "Christian non-profit association based in Douala, Cameroon, serving orphans, widows and the most vulnerable.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${sora.variable} ${cormorant.variable}`}
    >
      <body>
        <I18nProvider>
          <SiteChrome>{children}</SiteChrome>
        </I18nProvider>
      </body>
    </html>
  );
}

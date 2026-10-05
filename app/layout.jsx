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
      suppressHydrationWarning
      className={`${manrope.variable} ${sora.variable} ${cormorant.variable}`}
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: `(() => { let theme; try { theme = localStorage.getItem('hcof-theme'); } catch {} document.documentElement.dataset.theme = theme === 'dark' || theme === 'light' ? theme : window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'; })();` }} />
        <I18nProvider>
          <SiteChrome>{children}</SiteChrome>
        </I18nProvider>
      </body>
    </html>
  );
}

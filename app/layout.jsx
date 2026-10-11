import "./globals.css";
import { Cormorant_Garamond, Manrope, Sora } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import I18nProvider from "../components/I18nProvider";
import SiteChrome from "../components/SiteChrome";
import ContentProvider from "../components/ContentProvider";
import { readContent } from "../lib/cms-storage.js";
import { DEFAULT_CONTENT, publicContent } from "../lib/default-content.js";

export const dynamic = "force-dynamic";

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
  icons: {
    icon: { url: "/assets/favicon.png", type: "image/png", sizes: "64x62" },
  },
  title: "HCOF | Hope's City Outreach Foundation",
  description:
    "Christian non-profit association based in Douala, Cameroon, serving orphans, widows and the most vulnerable.",
};

export default async function RootLayout({ children }) {
  let content;
  try { content = publicContent((await readContent()).content); } catch { content = publicContent(DEFAULT_CONTENT); }
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${manrope.variable} ${sora.variable} ${cormorant.variable}`}
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: `(() => { let theme; try { theme = localStorage.getItem('hcof-theme'); } catch {} document.documentElement.dataset.theme = theme === 'dark' || theme === 'light' ? theme : window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'; })();` }} />
        <I18nProvider>
          <ContentProvider initialContent={content}><SiteChrome>{children}</SiteChrome></ContentProvider>
        </I18nProvider>
        <Analytics />
      </body>
    </html>
  );
}

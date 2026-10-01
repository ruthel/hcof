import "../assets/style.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: {
    default: "HCOF | Hope's City Outreach Foundation",
    template: "%s",
  },
  description:
    "Christian non-profit association based in Douala, Cameroon, serving orphans, widows and the most vulnerable.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <Navbar />
        <div className="status">
          Non-profit association being registered in Douala, Cameroon. Founded 2027.
        </div>
        {children}
        <Footer />
      </body>
    </html>
  );
}

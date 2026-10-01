import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site">
      <img
        src="/assets/logo-lockup-dark.jpg"
        alt="HCOF, Hope. Protection. Transformation."
        width="280"
        height="107"
      />

      <div className="cols">
        <div>
          <h3>Site</h3>
          <ul>
            <li><Link href="/about">Who we are</Link></li>
            <li><Link href="/programs">What we do</Link></li>
            <li><Link href="/journey">Our journey</Link></li>
            <li><Link href="/hopes-city">Hope&apos;s City</Link></li>
            <li><Link href="/impact">Impact</Link></li>
          </ul>
        </div>

        <div>
          <h3>Trust</h3>
          <ul>
            <li><Link href="/child-protection">Child protection</Link></li>
            <li><Link href="/media-kit">Media kit</Link></li>
            <li><Link href="/give">Financial accountability</Link></li>
            <li><Link href="/legal">Legal notice &amp; privacy</Link></li>
          </ul>
        </div>

        <div>
          <h3>Contact</h3>
          <ul>
            <li>Douala, Cameroon</li>
            <li><Link href="/contact">Write to us</Link></li>
            <li><Link href="/news">Newsletter</Link></li>
          </ul>
        </div>
      </div>

      <p style={{ marginTop: "2rem" }}>
        © 2027 HCOF. All rights reserved.
        <br />
        Association governed by Cameroonian law no. 90/053 of 19 December 1990 on freedom of association.
      </p>
    </footer>
  );
}

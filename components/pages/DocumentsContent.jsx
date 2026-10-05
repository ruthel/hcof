import Link from "next/link";
import PageSection from "../PageSection";

export default function DocumentsContent({ t }) {
  return (
    <>
      <PageSection index={0} className="pagehead">
        <h1>
          {t("pages.documents.section0.text1")}
        </h1>
        <p>
          {t("pages.documents.section0.text2")}
        </p>
      </PageSection>
      <PageSection index={1}>
        <p>
          {t("pages.documents.section1.text1")}
        </p>
        <h2>
          {t("pages.documents.section1.text2")}
        </h2>
        <ul className="facts">
          <li>
            <span className="tag t-next">
              {t("pages.documents.section1.text3")}
            </span>
            {" "}
            <strong>
              {t("pages.documents.section1.text4")}
            </strong>
            {t("pages.documents.section1.text5")}
          </li>
          <li>
            <span className="tag t-next">
              {t("pages.documents.section1.text6")}
            </span>
            {" "}
            <strong>
              {t("pages.documents.section1.text7")}
            </strong>
            {t("pages.documents.section1.text8")}
          </li>
          <li>
            <span className="tag t-next">
              {t("pages.documents.section1.text9")}
            </span>
            {" "}
            <strong>
              {t("pages.documents.section1.text10")}
            </strong>
            {t("pages.documents.section1.text11")}
          </li>
        </ul>
        <h2 style={{"marginTop": "2.5rem"}}>
          {t("pages.documents.section1.text12")}
        </h2>
        <ul className="facts">
          <li>
            <span className="tag t-now">
              {t("pages.documents.section1.text13")}
            </span>
            {" "}
            <strong>
              <Link href="/child-protection">
                {t("pages.documents.section1.text14")}
              </Link>
            </strong>
            {t("pages.documents.section1.text15")}
          </li>
          <li>
            <span className="tag t-now">
              {t("pages.documents.section1.text16")}
            </span>
            {" "}
            <strong>
              <Link href="/give">
                {t("pages.documents.section1.text17")}
              </Link>
            </strong>
            {t("pages.documents.section1.text18")}
          </li>
          <li>
            <span className="tag t-now">
              {t("pages.documents.section1.text19")}
            </span>
            {" "}
            <strong>
              <Link href="/legal">
                {t("pages.documents.section1.text20")}
              </Link>
            </strong>
          </li>
          <li>
            <span className="tag t-next">
              {t("pages.documents.section1.text21")}
            </span>
            {" "}
            <strong>
              {t("pages.documents.section1.text22")}
            </strong>
            {t("pages.documents.section1.text23")}
          </li>
          <li>
            <span className="tag t-next">
              {t("pages.documents.section1.text24")}
            </span>
            {" "}
            <strong>
              {t("pages.documents.section1.text25")}
            </strong>
          </li>
          <li>
            <span className="tag t-next">
              {t("pages.documents.section1.text26")}
            </span>
            {" "}
            <strong>
              {t("pages.documents.section1.text27")}
            </strong>
          </li>
          <li>
            <span className="tag t-next">
              {t("pages.documents.section1.text28")}
            </span>
            {" "}
            <strong>
              {t("pages.documents.section1.text29")}
            </strong>
            {t("pages.documents.section1.text30")}
          </li>
        </ul>
        <h2 style={{"marginTop": "2.5rem"}}>
          {t("pages.documents.section1.text31")}
        </h2>
        <ul className="facts">
          <li>
            <span className="tag t-next">
              {t("pages.documents.section1.text32")}
            </span>
            {" "}
            <strong>
              {t("pages.documents.section1.text33")}
            </strong>
            {t("pages.documents.section1.text34")}
          </li>
          <li>
            <span className="tag t-next">
              {t("pages.documents.section1.text35")}
            </span>
            {" "}
            <strong>
              {t("pages.documents.section1.text36")}
            </strong>
            {t("pages.documents.section1.text37")}
            <Link href="/impact">
              {t("pages.documents.section1.text38")}
            </Link>
            {t("pages.documents.section1.text39")}
          </li>
        </ul>
        <h2 style={{"marginTop": "2.5rem"}}>
          {t("pages.documents.section1.text40")}
        </h2>
        <div className="box">
          <p>
            {t("pages.documents.section1.text41")}
          </p>
        </div>
      </PageSection>
    </>
  );
}

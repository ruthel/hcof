import Link from "next/link";
import PageSection from "../PageSection";
import { AlbumPreview } from "../GalleryAlbums";
import DynamicActivities from "../DynamicActivities";

export default function ProgramsContent({ t }) {
  return <>
    <PageSection index={0} className="pagehead"><h1>{t("pages.programs.section0.text1")}</h1><p>{t("pages.programs.section0.text2")}</p></PageSection>
    <PageSection index={1}>
      <h2>{t("pages.programs.section1.text1")}</h2>
      <p>{t("pages.programs.section1.text2")}<strong>{t("pages.programs.section1.text3")}</strong>{t("pages.programs.section1.text4")}</p>
      <p><strong>{t("pages.programs.section1.text5")}</strong>{t("pages.programs.section1.text6")}</p>
    </PageSection>
    <PageSection index={2} className="alt"><DynamicActivities t={t} /></PageSection>
    <PageSection index={3}>
      <h2>{t("pages.programs.section3.text1")}</h2><p>{t("pages.programs.section3.text2")}</p>
      <p>{t("pages.programs.section3.text3")}<Link href="/child-protection">{t("pages.programs.section3.text4")}</Link>{t("pages.programs.section3.text5")}</p>
    </PageSection>
    <PageSection index={4} className="alt">
      <div className="album-inline"><AlbumPreview t={t} id="accountability" /></div>
      <h2>{t("pages.programs.section4.text1")}</h2>
      <p>{t("pages.programs.section4.text2")}<Link href="/journey#impact">{t("pages.programs.section4.text3")}</Link>{t("pages.programs.section4.text4")}<Link href="/give">{t("pages.programs.section4.text5")}</Link>{t("pages.programs.section4.text6")}</p>
    </PageSection>
    <PageSection index={5}>
      <h2>{t("pages.programs.section5.text1")}</h2><p>{t("pages.programs.section5.text2")}</p>
      <h3 className="mt-10">{t("pages.programs.section5.text3")}</h3><p>{t("pages.programs.section5.text4")}</p>
      <div className="btns"><Link className="btn green" href="/journey">{t("pages.programs.section5.text5")}</Link><Link className="btn ghost" href="/get-involved">{t("pages.programs.section5.text6")}</Link></div>
    </PageSection>
  </>;
}

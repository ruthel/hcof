import Link from "next/link";

// One catalog keeps the overview and document directory in the same order.
const categories = [
  { id: "legal-governance", items: [[4, 5], [7, 8], [10, 11]] },
  { id: "policies", items: [[14, 15, "/child-protection", true], [20, null, "/legal", true], [22, 23], [25], [27], [29, 30]] },
  { id: "accountability", items: [[17, 18, "/give", true], [33, 34], [36, 37, "/impact"]] },
  { id: "partnerships", items: [] },
];

export default function DocumentCategories({ t, preview = false }) {
  if (preview) {
    return (
      <div className="grid document-list">
        {categories.map(category => (
          <div key={category.id} className="item">
            <h3><Link href={`/documents#${category.id}`}>{t(`documentCategories.${category.id}.title`)}</Link></h3>
            <p>{t(`documentCategories.${category.id}.summary`)}</p>
          </div>
        ))}
      </div>
    );
  }
  return categories.map(category => (
    <div key={category.id} className="mt-10 scroll-mt-28" id={category.id}>
      <h2>{t(`documentCategories.${category.id}.title`)}</h2>
      {category.items.length ? (
        <ul className="facts">
          {category.items.map(([label, detail, href, phase]) => (
            <li key={label}>
              <span className={`tag ${phase ? "t-now" : "t-next"}`}>{t(`pages.documents.section1.text${phase ? 13 : 3}`)}</span>{" "}
              <strong>{href && label !== 36 ? <Link href={href}>{t(`pages.documents.section1.text${label}`)}</Link> : t(`pages.documents.section1.text${label}`)}</strong>
              {detail ? t(`pages.documents.section1.text${detail}`) : null}
              {label === 36 ? <><Link href="/impact">{t("pages.documents.section1.text38")}</Link>{t("pages.documents.section1.text39")}</> : null}
            </li>
          ))}
        </ul>
      ) : (
        <div className="box"><p>{t("pages.documents.section1.text41")}</p></div>
      )}
    </div>
  ));
}

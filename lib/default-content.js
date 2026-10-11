import { EN_MESSAGES } from "../i18n/messages.en.js";
import { FR_MESSAGES } from "../i18n/messages.fr.js";

const dictionary = { En: EN_MESSAGES, Fr: FR_MESSAGES };
const activities = ["food", "school", "care"].map((id, index) => {
  const first = index * 7 + 1;
  const item = { id, status: "published", order: index + 1, icon: id, photos: [], coverId: "", date: "", featured: false };
  for (const suffix of ["En", "Fr"]) {
    const key = (offset) => dictionary[suffix][`pages.programs.section2.text${first + offset}`];
    item[`title${suffix}`] = key(1);
    item[`summary${suffix}`] = key(2);
    item[`body${suffix}`] = `${key(3)}${key(4)}\n\n${key(5)}${key(6)}`;
  }
  return item;
});
activities.push({ id: "safeguarding", status: "published", order: 4, icon: "care", photos: [], coverId: "", date: "", featured: false, titleEn: EN_MESSAGES["gallery.safeguarding"], titleFr: FR_MESSAGES["gallery.safeguarding"], summaryEn: EN_MESSAGES["gallery.safeguarding.description"], summaryFr: FR_MESSAGES["gallery.safeguarding.description"], bodyEn: "", bodyFr: "" });
const news = ["mission", "accountability"].map((id, index) => {
  const item = { id, status: "published", order: index + 1, featured: id === "mission", date: "", icon: id === "mission" ? "mission" : "report", photos: [], coverId: "" };
  for (const suffix of ["En", "Fr"]) {
    const messages = dictionary[suffix];
    item[`title${suffix}`] = messages[id === "mission" ? "pages.journey.section1.text16" : "gallery.accountability"];
    item[`summary${suffix}`] = messages[id === "mission" ? "pages.journey.section1.text17" : "gallery.accountability.description"];
    item[`body${suffix}`] = id === "mission" ? messages["pages.journey.section1.text19"] : "";
  }
  return item;
});
export const DEFAULT_CONTENT = { activities, news };
export function localized(item, field, locale) { return item[`${field}${locale === "fr" ? "Fr" : "En"}`] || item[`${field}En`] || item[`${field}Fr`] || ""; }
export function publicContent(content) {
  return { activities: content.activities.filter((item) => item.status === "published").sort((a, b) => a.order - b.order).slice(0, 5), news: content.news.filter((item) => item.status === "published").sort((a, b) => (b.date || "").localeCompare(a.date || "") || a.order - b.order) };
}

const PHOTO_ID = /^[a-f0-9-]{36}\.(jpg|png|webp)$/;
function text(value, max) { if (typeof value !== "string" || value.length > max) throw new Error("invalid_content"); return value.trim(); }
export function validateContent(value) {
  if (!value || !Array.isArray(value.activities) || !Array.isArray(value.news) || value.activities.length > 5 || value.news.length > 200) throw new Error("invalid_content");
  const ids = new Set(); const result = {};
  for (const category of ["activities", "news"]) {
    result[category] = value[category].map((entry, index) => {
      if (!entry || !/^[a-z0-9][a-z0-9-]{0,79}$/.test(entry.id) || ids.has(entry.id) || !["draft", "published"].includes(entry.status)) throw new Error("invalid_content");
      ids.add(entry.id);
      if (entry.date && (!/^\d{4}-\d{2}-\d{2}$/.test(entry.date) || !Number.isFinite(Date.parse(entry.date)) || new Date(entry.date).toISOString().slice(0, 10) !== entry.date)) throw new Error("invalid_content");
      if (!Array.isArray(entry.photos) || entry.photos.length > 40) throw new Error("invalid_content");
      const photoIds = new Set();
      const photos = entry.photos.map((photo) => { if (!photo || !PHOTO_ID.test(photo.id) || photoIds.has(photo.id)) throw new Error("invalid_content"); photoIds.add(photo.id); return { id: photo.id, captionEn: text(photo.captionEn || "", 500), captionFr: text(photo.captionFr || "", 500) }; });
      const item = { id: entry.id, status: entry.status, order: index + 1, date: entry.date || "", featured: category === "news" && entry.featured === true, icon: ["food", "school", "care", "mission", "report"].includes(entry.icon) ? entry.icon : "care", photos, coverId: photos.some((photo) => photo.id === entry.coverId) ? entry.coverId : photos[0]?.id || "" };
      for (const suffix of ["En", "Fr"]) { item[`title${suffix}`] = text(entry[`title${suffix}`] || "", 180); item[`summary${suffix}`] = text(entry[`summary${suffix}`] || "", 2000); item[`body${suffix}`] = text(entry[`body${suffix}`] || "", 20000); }
      if (item.status === "published" && (!item.titleEn || !item.titleFr || !item.summaryEn || !item.summaryFr)) throw new Error("translation_required");
      return item;
    });
  }
  return result;
}
export function isPhotoId(value) { return PHOTO_ID.test(value); }

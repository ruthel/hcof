"use client";
import { useEffect, useRef, useState } from "react";
import { useIntl } from "react-intl";
import { useRouter } from "next/navigation";
import Container from "../Container";
import { localized } from "../../lib/default-content.js";

export default function AdminDashboard() {
  const intl = useIntl(); const t = (id) => intl.formatMessage({ id: `cms.admin.${id}` }); const router = useRouter();
  const [content, setContent] = useState(null); const [revision, setRevision] = useState(""); const [baseline, setBaseline] = useState("");
  const [category, setCategory] = useState("activities"); const [selected, setSelected] = useState(""); const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState(""); const [error, setError] = useState(""); const [reload, setReload] = useState(0);
  const removeDialog = useRef(null);
  const dirty = Boolean(content && JSON.stringify(content) !== baseline);
  const item = content?.[category].find((entry) => entry.id === selected);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/admin/content", { cache: "no-store", signal: controller.signal }).then(async (response) => {
      if (!response.ok) throw new Error(); const data = await response.json();
      setContent(data.content); setRevision(data.revision); setBaseline(JSON.stringify(data.content)); setSelected(data.content.activities[0]?.id || "");
    }).catch((cause) => { if (cause.name !== "AbortError") setError(t("loadError")); });
    return () => controller.abort();
  }, [reload]);

  useEffect(() => {
    if (!dirty) return;
    const prevent = (event) => { event.preventDefault(); event.returnValue = ""; };
    window.addEventListener("beforeunload", prevent); return () => window.removeEventListener("beforeunload", prevent);
  }, [dirty]);

  function update(patch) {
    setContent((current) => ({ ...current, [category]: current[category].map((entry) => entry.id === selected ? { ...entry, ...patch } : entry) }));
    setMessage(""); setError("");
  }
  function addItem() {
    const id = `${category === "activities" ? "activity" : "news"}-${crypto.randomUUID().slice(0, 8)}`;
    const entry = { id, status: "draft", order: content[category].length + 1, featured: false, date: "", icon: category === "activities" ? "care" : "report", coverId: "", photos: [], titleEn: "", titleFr: "", summaryEn: "", summaryFr: "", bodyEn: "", bodyFr: "" };
    setContent((current) => ({ ...current, [category]: [...current[category], entry] })); setSelected(id); setMessage("");
  }
  function moveItem(direction) {
    setContent((current) => {
      const entries = [...current[category]]; const index = entries.findIndex((entry) => entry.id === selected); const next = index + direction;
      if (next < 0 || next >= entries.length) return current;
      [entries[index], entries[next]] = [entries[next], entries[index]];
      return { ...current, [category]: entries.map((entry, i) => ({ ...entry, order: i + 1 })) };
    });
  }
  function removeItem() {
    const entries = content[category].filter((entry) => entry.id !== selected);
    setContent((current) => ({ ...current, [category]: entries })); setSelected(entries[0]?.id || ""); removeDialog.current.close();
  }
  async function save(event) {
    event.preventDefault(); setBusy(true); setError(""); setMessage("");
    try {
      const response = await fetch("/api/admin/content", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ content, revision }) });
      const result = await response.json();
      if (!response.ok) { const key = response.status === 409 ? "conflict" : result.error === "translation_required" ? "translationRequired" : response.status === 401 ? "sessionExpired" : "saveError"; throw new Error(t(key)); }
      setContent(result.content); setRevision(result.revision); setBaseline(JSON.stringify(result.content)); setMessage(t("saved"));
    } catch (cause) { setError(cause.message || t("saveError")); } finally { setBusy(false); }
  }
  async function upload(event) {
    const files = [...event.target.files]; event.target.value = "";
    if (!files.length) return;
    if (item.photos.length + files.length > 40) { setError(t("photoLimit")); return; }
    if (files.some((file) => file.size > 3 * 1024 * 1024 || !["image/jpeg", "image/png", "image/webp"].includes(file.type))) { setError(t("imageError")); return; }
    setBusy(true); setError(""); const uploaded = []; let uploadError = "";
    try {
      for (const file of files) {
        const form = new FormData(); form.set("file", file);
        const response = await fetch("/api/admin/upload", { method: "POST", body: form });
        if (!response.ok) throw new Error(t("uploadError"));
        const photo = await response.json(); uploaded.push({ id: photo.id, captionEn: "", captionFr: "" });
      }
    } catch (cause) { uploadError = cause.message; }
    finally {
      if (uploaded.length) update({ photos: [...item.photos, ...uploaded], coverId: item.coverId || uploaded[0].id });
      if (uploadError) setError(uploadError);
      setBusy(false);
    }
  }
  function updatePhoto(photoId, patch) { update({ photos: item.photos.map((photo) => photo.id === photoId ? { ...photo, ...patch } : photo) }); }
  function movePhoto(photoId, direction) {
    const photos = [...item.photos]; const index = photos.findIndex((photo) => photo.id === photoId); const next = index + direction;
    if (next < 0 || next >= photos.length) return; [photos[index], photos[next]] = [photos[next], photos[index]]; update({ photos });
  }

  return <main id="main" className="admin-dashboard"><Container>
    <div className="admin-heading"><div><span className="album-kicker">HCOF</span><h1>{t("title")}</h1></div><button type="button" disabled={busy} className="btn ghost" onClick={async () => { await fetch("/api/admin/session", { method: "DELETE" }); router.refresh(); }}>{t("logout")}</button></div>
    <p>{t("intro")}</p>
    <div className="admin-tabs" role="group" aria-label={t("sections")}>
      {["activities", "news"].map((value) => <button disabled={busy} type="button" key={value} aria-pressed={category === value} onClick={() => { setCategory(value); setSelected(content?.[value][0]?.id || ""); }}>{t(value)}</button>)}
    </div>
    <div className="admin-feedback" aria-live="polite">{message && <p>{message}</p>}{error && <p role="alert">{error}</p>}</div>
    {!content ? <><p>{t("loading")}</p>{error && <button type="button" className="btn ghost" onClick={() => { setError(""); setReload((value) => value + 1); }}>{t("retry")}</button>}</> : <form onSubmit={save}>
      <fieldset disabled={busy} className="admin-workspace">
        <aside className="admin-list">
          <button className="btn green" type="button" onClick={addItem} disabled={content[category].length >= (category === "activities" ? 5 : 200)}>{t("add")}</button>
          {category === "activities" && <p className="album-note">{t("activityLimit")}</p>}
          {content[category].map((entry) => <button type="button" className="admin-list-item" key={entry.id} aria-current={selected === entry.id ? "true" : undefined} onClick={() => setSelected(entry.id)}><strong>{localized(entry, "title", intl.locale) || t("untitled")}</strong><span>{t(entry.status)}</span></button>)}
        </aside>
        {item ? <div className="admin-editor">
          <div className="admin-editor-actions"><span className="album-kicker">{item.id}</span><button type="button" onClick={() => moveItem(-1)} disabled={content[category][0]?.id === item.id}>{t("moveUp")}</button><button type="button" onClick={() => moveItem(1)} disabled={content[category].at(-1)?.id === item.id}>{t("moveDown")}</button><button type="button" onClick={() => removeDialog.current.showModal()}>{t("remove")}</button></div>
          <div className="admin-options"><label>{t("status")}<select value={item.status} onChange={(event) => update({ status: event.target.value })}><option value="draft">{t("draft")}</option><option value="published">{t("published")}</option></select></label><label>{t("date")}<input type="date" value={item.date} onChange={(event) => update({ date: event.target.value })} /></label>{category === "news" && <label className="admin-checkbox"><input type="checkbox" checked={item.featured} onChange={(event) => update({ featured: event.target.checked })} />{t("featured")}</label>}</div>
          <div className="admin-languages">{[["En", "English"], ["Fr", "Français"]].map(([suffix, label]) => <div key={suffix}><h2>{label}</h2>{[["title", "titleField", 180, 1], ["summary", "summary", 2000, 4], ["body", "body", 20000, 9]].map(([field, labelKey, max, rows]) => <label key={field} htmlFor={`${item.id}-${field}-${suffix}`}>{t(labelKey)}{rows === 1 ? <input id={`${item.id}-${field}-${suffix}`} maxLength={max} value={item[`${field}${suffix}`]} onChange={(event) => update({ [`${field}${suffix}`]: event.target.value })} /> : <textarea id={`${item.id}-${field}-${suffix}`} rows={rows} maxLength={max} value={item[`${field}${suffix}`]} onChange={(event) => update({ [`${field}${suffix}`]: event.target.value })} />}</label>)}</div>)}</div>
          <h2>{t("photos")}</h2><p>{t("photosHelp")}</p><label htmlFor="admin-photos">{t("upload")}<input id="admin-photos" type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={upload} /></label>
          <div className="admin-photo-grid">{item.photos.map((photo, index) => <div className="admin-photo" key={photo.id}>
            <img src={`/api/media/${photo.id}`} alt={localized(photo, "caption", intl.locale) || localized(item, "title", intl.locale)} width="320" height="210" loading="lazy" />
            <label className="admin-checkbox"><input type="radio" name="cover" checked={item.coverId === photo.id} onChange={() => update({ coverId: photo.id })} />{t("cover")}</label>
            {[["En", "English"], ["Fr", "Français"]].map(([suffix, language]) => <label key={suffix}>{t("caption")} · {language}<input maxLength={500} value={photo[`caption${suffix}`]} onChange={(event) => updatePhoto(photo.id, { [`caption${suffix}`]: event.target.value })} /></label>)}
            <div className="admin-photo-actions"><button type="button" onClick={() => movePhoto(photo.id, -1)} disabled={index === 0}>{t("moveUp")}</button><button type="button" onClick={() => movePhoto(photo.id, 1)} disabled={index === item.photos.length - 1}>{t("moveDown")}</button><button type="button" onClick={() => update({ photos: item.photos.filter((entry) => entry.id !== photo.id), coverId: item.coverId === photo.id ? "" : item.coverId })}>{t("remove")}</button></div>
          </div>)}</div>
        </div> : <p>{t("selectItem")}</p>}
      </fieldset>
      <div className="admin-save"><span>{busy ? t("working") : dirty ? t("unsaved") : t("upToDate")}</span><button className="btn green" disabled={!dirty || busy}>{busy ? t("working") : t("save")}</button></div>
    </form>}
    <dialog ref={removeDialog} className="gallery-dialog"><div className="album-body"><h2>{t("removeTitle")}</h2><p>{t("removeText")}</p><div className="btns"><button type="button" className="btn ghost" onClick={() => removeDialog.current.close()}>{t("cancel")}</button><button type="button" className="btn green" onClick={removeItem}>{t("remove")}</button></div></div></dialog>
  </Container></main>;
}

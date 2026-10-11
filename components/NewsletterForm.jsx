"use client";

import { useId, useState } from "react";
import { useIntl } from "react-intl";

export default function NewsletterForm({ footer = false }) {
  const id = useId();
  const intl = useIntl();
  const t = key => intl.formatMessage({ id: key });
  const [status, setStatus] = useState("idle");

  async function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "Newsletter signup", email: values.get("email"), subject: "other", message: t("newsletter.request"), website: values.get("website"), locale: intl.locale }),
      });
      if (!response.ok) throw new Error("Newsletter request failed");
      form.reset();
      setStatus("success");
    } catch { setStatus("error"); }
  }

  return (
    <form onSubmit={submit} className={`newsletter-form mt-6 ${footer ? "newsletter-footer" : ""}`}>
      <label htmlFor={`${id}-email`}>{t("newsletter.label")}</label>
      <div className="flex flex-wrap items-end gap-3">
        <input id={`${id}-email`} name="email" type="email" autoComplete="email" required maxLength={254} placeholder={t("newsletter.placeholder")} className="min-w-0 flex-1" />
        <button type="submit" className="btn disabled:cursor-not-allowed disabled:opacity-50" disabled={status === "sending"}>
          {t(status === "sending" ? "contact.sending" : "newsletter.subscribe")}
        </button>
      </div>
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor={`${id}-website`}>Website</label>
        <input id={`${id}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <p className="newsletter-note mb-0 text-xs leading-5">{t("newsletter.note")}</p>
      <div role="status" aria-live="polite" className="text-sm">
        {status === "success" ? t("newsletter.success") : status === "error" ? t("contact.error") : null}
      </div>
    </form>
  );
}

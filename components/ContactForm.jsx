"use client";

import { useRef, useState } from "react";
import { useIntl } from "react-intl";

export default function ContactForm() {
  const intl = useIntl();
  const formRef = useRef(null);
  const [status, setStatus] = useState("idle");

  const t = (id) => intl.formatMessage({ id });

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("sending");

    const form = new FormData(event.currentTarget);
    const payload = {
      name: form.get("name"),
      email: form.get("email"),
      subject: form.get("subject"),
      message: form.get("message"),
      website: form.get("website"),
      locale: intl.locale === "fr" ? "fr" : "en",
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Contact request failed");
      }

      setStatus("success");
      formRef.current?.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="mt-10">
      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <label htmlFor="contact-name">{t("contact.name")}</label>
      <input
        id="contact-name"
        name="name"
        type="text"
        required
        maxLength={120}
        autoComplete="name"
      />

      <label htmlFor="contact-email">{t("contact.email")}</label>
      <input
        id="contact-email"
        name="email"
        type="email"
        required
        maxLength={254}
        autoComplete="email"
      />

      <label htmlFor="contact-subject">{t("contact.subject")}</label>
      <select id="contact-subject" name="subject" defaultValue="other">
        <option value="volunteering">{t("contact.subject.volunteering")}</option>
        <option value="partnership">{t("contact.subject.partnership")}</option>
        <option value="giving">{t("contact.subject.giving")}</option>
        <option value="press">{t("contact.subject.press")}</option>
        <option value="other">{t("contact.subject.other")}</option>
      </select>

      <label htmlFor="contact-message">{t("contact.message")}</label>
      <textarea
        id="contact-message"
        name="message"
        rows={6}
        required
        maxLength={6000}
      />

      <button
        className="btn green disabled:cursor-not-allowed disabled:opacity-50"
        type="submit"
        disabled={status === "sending"}
      >
        {status === "sending" ? t("contact.sending") : t("contact.send")}
      </button>

      <div aria-live="polite" className="min-h-7">
        {status === "success" && (
          <p className="mb-0 font-ui text-sm font-semibold text-hcof-leaf">
            {t("contact.success")}
          </p>
        )}

        {status === "error" && (
          <p className="contact-error mb-0 font-ui text-sm font-semibold text-red-700">
            {t("contact.error")}
          </p>
        )}
      </div>
    </form>
  );
}

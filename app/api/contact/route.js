import nodemailer from "nodemailer";

export const runtime = "nodejs";

const SUBJECT_LABELS = {
  en: {
    volunteering: "Volunteering",
    partnership: "Partnership",
    giving: "Giving",
    press: "Press",
    other: "Other",
  },
  fr: {
    volunteering: "Bénévolat",
    partnership: "Partenariat",
    giving: "Don",
    press: "Presse",
    other: "Autre",
  },
};

function cleanLine(value, maxLength) {
  return String(value ?? "")
    .replace(/[\r\n]+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function cleanMessage(value, maxLength) {
  return String(value ?? "").trim().slice(0, maxLength);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request) {
  try {
    const body = await request.json();

    // Honeypot field: bots often fill hidden fields.
    if (cleanLine(body.website, 200)) {
      return Response.json({ ok: true });
    }

    const name = cleanLine(body.name, 120);
    const email = cleanLine(body.email, 254);
    const subjectKey = cleanLine(body.subject, 40);
    const message = cleanMessage(body.message, 6000);
    const locale = body.locale === "fr" ? "fr" : "en";

    if (!name || !email || !message || !isEmail(email)) {
      return Response.json(
        { ok: false, error: "invalid_input" },
        { status: 400 }
      );
    }

    const allowedSubjects = SUBJECT_LABELS[locale];
    const subjectLabel = allowedSubjects[subjectKey] ?? allowedSubjects.other;

    const host = process.env.SMTP_HOST || "smtp.larksuite.com";
    const port = Number(process.env.SMTP_PORT || 465);
    const secure =
      process.env.SMTP_SECURE !== undefined
        ? process.env.SMTP_SECURE === "true"
        : port === 465;

    const smtpUser = process.env.SMTP_USER;
    const smtpPassword = process.env.SMTP_PASSWORD;
    const toEmail = process.env.CONTACT_TO_EMAIL;
    const fromEmail = process.env.CONTACT_FROM_EMAIL || smtpUser;
    const fromName = process.env.CONTACT_FROM_NAME || "HCOF Website";

    if (!smtpUser || !smtpPassword || !toEmail || !fromEmail) {
      console.error("Contact SMTP environment variables are incomplete.");
      return Response.json(
        { ok: false, error: "mail_not_configured" },
        { status: 503 }
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      requireTLS: port === 587,
      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },
    });

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeSubject = escapeHtml(subjectLabel);
    const safeMessage = escapeHtml(message).replaceAll("\n", "<br>");

    await transporter.sendMail({
      from: {
        name: fromName,
        address: fromEmail,
      },
      to: toEmail,
      replyTo: {
        name,
        address: email,
      },
      subject: `[HCOF Contact] ${subjectLabel} — ${name}`,
      text: [
        "New message from the HCOF website",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Subject: ${subjectLabel}`,
        "",
        message,
      ].join("\n"),
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#1B2B24">
          <h2 style="color:#103F2D">New message from the HCOF website</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Subject:</strong> ${safeSubject}</p>
          <hr style="border:0;border-top:1px solid #dbe4df;margin:24px 0">
          <p>${safeMessage}</p>
        </div>
      `,
    });

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Contact form delivery failed:", error);
    return Response.json(
      { ok: false, error: "send_failed" },
      { status: 500 }
    );
  }
}

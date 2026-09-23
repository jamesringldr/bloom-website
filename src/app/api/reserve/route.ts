import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type ChildPayload = {
  fullName: string;
  dob: string;
  accommodations?: string;
};

type ReservePayload = {
  parentName: string;
  email: string;
  phone: string;
  startDate: string;
  daysNeeded: string;
  hoursNeeded: string;
  comments?: string;
  children: ChildPayload[];
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TO_EMAIL = "hello@bloomearlyed.com";

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function validatePayload(body: unknown):
  | { ok: true; data: ReservePayload }
  | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request body." };
  }

  const raw = body as Record<string, unknown>;
  const parentName = raw.parentName;
  const email = raw.email;
  const phone = raw.phone;
  const startDate = raw.startDate;
  const daysNeeded = raw.daysNeeded;
  const hoursNeeded = raw.hoursNeeded;
  const comments = typeof raw.comments === "string" ? raw.comments.trim() : "";
  const childrenRaw = raw.children;

  if (!isNonEmptyString(parentName)) {
    return { ok: false, error: "Parent/guardian name is required." };
  }
  if (!isNonEmptyString(email) || !emailPattern.test(email.trim())) {
    return { ok: false, error: "A valid email is required." };
  }
  if (!isNonEmptyString(phone)) {
    return { ok: false, error: "Phone is required." };
  }
  if (!isNonEmptyString(startDate)) {
    return { ok: false, error: "Desired start date is required." };
  }
  if (!isNonEmptyString(daysNeeded)) {
    return { ok: false, error: "Days care needed is required." };
  }
  if (!isNonEmptyString(hoursNeeded)) {
    return { ok: false, error: "Hours care needed is required." };
  }
  if (!Array.isArray(childrenRaw) || childrenRaw.length === 0) {
    return { ok: false, error: "At least one child is required." };
  }

  const children: ChildPayload[] = [];
  for (const child of childrenRaw) {
    if (!child || typeof child !== "object") {
      return { ok: false, error: "Invalid child entry." };
    }
    const c = child as Record<string, unknown>;
    if (!isNonEmptyString(c.fullName) || !isNonEmptyString(c.dob)) {
      return {
        ok: false,
        error: "Each child needs a full name and date of birth.",
      };
    }
    children.push({
      fullName: c.fullName.trim(),
      dob: c.dob.trim(),
      accommodations:
        typeof c.accommodations === "string" ? c.accommodations.trim() : "",
    });
  }

  return {
    ok: true,
    data: {
      parentName: parentName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      startDate: startDate.trim(),
      daysNeeded: daysNeeded.trim(),
      hoursNeeded: hoursNeeded.trim(),
      comments,
      children,
    },
  };
}

function formatEmail(data: ReservePayload): { subject: string; text: string; html: string } {
  const childBlocks = data.children
    .map(
      (child, i) =>
        `Child ${i + 1}:\n  Name: ${child.fullName}\n  DOB: ${child.dob}\n  Accommodations: ${child.accommodations || "—"}`,
    )
    .join("\n\n");

  const subject = `Enrollment reservation — ${data.parentName}`;
  const text = [
    "New Bloom enrollment reservation",
    "",
    `Parent/Guardian: ${data.parentName}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Desired start date: ${data.startDate}`,
    `Days needed: ${data.daysNeeded}`,
    `Hours needed: ${data.hoursNeeded}`,
    `Comments: ${data.comments || "—"}`,
    "",
    childBlocks,
  ].join("\n");

  const childrenHtml = data.children
    .map(
      (child, i) => `
      <h3 style="margin:16px 0 8px;">Child ${i + 1}</h3>
      <ul>
        <li><strong>Name:</strong> ${escapeHtml(child.fullName)}</li>
        <li><strong>DOB:</strong> ${escapeHtml(child.dob)}</li>
        <li><strong>Accommodations:</strong> ${escapeHtml(child.accommodations || "—")}</li>
      </ul>`,
    )
    .join("");

  const html = `
    <div style="font-family:system-ui,sans-serif;line-height:1.5;color:#1a2a3a;">
      <h2>New Bloom enrollment reservation</h2>
      <ul>
        <li><strong>Parent/Guardian:</strong> ${escapeHtml(data.parentName)}</li>
        <li><strong>Email:</strong> ${escapeHtml(data.email)}</li>
        <li><strong>Phone:</strong> ${escapeHtml(data.phone)}</li>
        <li><strong>Desired start date:</strong> ${escapeHtml(data.startDate)}</li>
        <li><strong>Days needed:</strong> ${escapeHtml(data.daysNeeded)}</li>
        <li><strong>Hours needed:</strong> ${escapeHtml(data.hoursNeeded)}</li>
        <li><strong>Comments:</strong> ${escapeHtml(data.comments || "—")}</li>
      </ul>
      ${childrenHtml}
    </div>
  `;

  return { subject, text, html };
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export async function POST(request: NextRequest) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }

  const validated = validatePayload(json);
  if (!validated.ok) {
    return NextResponse.json({ ok: false, error: validated.error }, { status: 400 });
  }

  const { subject, text, html } = formatEmail(validated.data);
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail =
    process.env.RESEND_FROM_EMAIL ?? "Bloom Reservations <onboarding@resend.dev>";

  if (!apiKey) {
    console.info("[api/reserve] Mock mode — RESEND_API_KEY missing. Submission:", {
      subject,
      to: TO_EMAIL,
      from: fromEmail,
      text,
    });
    return NextResponse.json({
      ok: true,
      mocked: true,
      message:
        "Reservation accepted locally. Configure RESEND_API_KEY to email hello@bloomearlyed.com.",
    });
  }

  try {
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from: fromEmail,
      to: [TO_EMAIL],
      replyTo: validated.data.email,
      subject,
      text,
      html,
    });

    if (result.error) {
      console.error("[api/reserve] Resend error:", result.error);
      return NextResponse.json(
        { ok: false, error: "Unable to send reservation email. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, id: result.data?.id ?? null });
  } catch (error) {
    console.error("[api/reserve] Unexpected error:", error);
    return NextResponse.json(
      { ok: false, error: "Unable to send reservation email. Please try again." },
      { status: 500 },
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { postToAppsScript } from "@/lib/apps-script";
import { jobForm } from "@/lib/content";

export const runtime = "nodejs";

type JoinPayload = {
  fullName: string;
  email: string;
  phone: string;
  desiredPay: string;
  positions: string[];
  ageGroups: string[];
  education: string;
  cpr: string;
  cprOther: string;
  experience: string;
  loveMost: string;
  childrenNeed: string;
  playBased: string;
  familyRelationship: string;
  stressHandling: string;
  references: string;
  coverLetter: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SHORT_MAX = 200;
const LONG_MAX = 5000;

const requiredShort = [
  ["fullName", "Full name is required."],
  ["phone", "Phone number is required."],
  ["desiredPay", "Desired pay is required."],
] as const;

const optionalLong = [
  "experience",
  "loveMost",
  "childrenNeed",
  "playBased",
  "familyRelationship",
  "stressHandling",
  "coverLetter",
] as const;

function str(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function pickAllowed(value: unknown, allowed: readonly string[]): string[] {
  if (!Array.isArray(value)) return [];
  return allowed.filter((option) => value.includes(option));
}

function validatePayload(body: unknown):
  | { ok: true; data: JoinPayload }
  | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request body." };
  }
  const raw = body as Record<string, unknown>;

  for (const [field, message] of requiredShort) {
    if (!str(raw[field], SHORT_MAX)) return { ok: false, error: message };
  }
  const email = str(raw.email, SHORT_MAX);
  if (!email || !emailPattern.test(email)) {
    return { ok: false, error: "A valid email is required." };
  }

  const positions = pickAllowed(raw.positions, jobForm.positions);
  if (positions.length === 0) {
    return { ok: false, error: "Choose at least one position." };
  }
  const ageGroups = pickAllowed(raw.ageGroups, jobForm.ageGroups);
  if (ageGroups.length === 0) {
    return { ok: false, error: "Choose at least one age group." };
  }

  const cpr = str(raw.cpr, SHORT_MAX);
  if (!(jobForm.cpr as readonly string[]).includes(cpr)) {
    return { ok: false, error: "Tell us whether you are CPR / First Aid certified." };
  }
  const cprOther = str(raw.cprOther, SHORT_MAX);
  if (cpr === "Other" && !cprOther) {
    return { ok: false, error: "Tell us about your CPR / First Aid certification." };
  }

  const education = str(raw.education, SHORT_MAX);
  if (education && !(jobForm.education as readonly string[]).includes(education)) {
    return { ok: false, error: "Invalid education selection." };
  }

  const references = str(raw.references, LONG_MAX);
  if (!references) {
    return { ok: false, error: "Please list 3 references." };
  }

  const data = {
    fullName: str(raw.fullName, SHORT_MAX),
    email,
    phone: str(raw.phone, SHORT_MAX),
    desiredPay: str(raw.desiredPay, SHORT_MAX),
    positions,
    ageGroups,
    education,
    cpr,
    cprOther: cpr === "Other" ? cprOther : "",
    references,
  } as JoinPayload;
  for (const field of optionalLong) data[field] = str(raw[field], LONG_MAX);

  return { ok: true, data };
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

  const scriptUrl = process.env.GOOGLE_SCRIPT_URL_JOIN;

  if (!scriptUrl) {
    // Never fake a successful submission in production — the applicant would think it went through.
    if (process.env.NODE_ENV === "production") {
      console.error("[api/join] GOOGLE_SCRIPT_URL_JOIN is not set — application was NOT saved.");
      return NextResponse.json(
        { ok: false, error: "Unable to send your application. Please try again." },
        { status: 500 },
      );
    }
    console.info("[api/join] Mock mode — GOOGLE_SCRIPT_URL_JOIN missing. Submission:", validated.data);
    return NextResponse.json({
      ok: true,
      mocked: true,
      message: "Application accepted locally. Set GOOGLE_SCRIPT_URL_JOIN to save to the Google Sheet.",
    });
  }

  if (!(await postToAppsScript(scriptUrl, validated.data))) {
    return NextResponse.json(
      { ok: false, error: "Unable to send your application. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

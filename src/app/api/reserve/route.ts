import { NextRequest, NextResponse } from "next/server";

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

// Apps Script answers 200 even when it fails (HTML error page, or a login page if the
// deployment isn't "Anyone"), so a bare status check isn't enough.
function isScriptSuccess(response: Response, body: string): boolean {
  if (response.headers.get("content-type")?.includes("text/html")) return false;
  try {
    const parsed: unknown = JSON.parse(body);
    if (parsed && typeof parsed === "object") {
      const result = parsed as { ok?: unknown; error?: unknown };
      if (result.ok === false || typeof result.error === "string") return false;
    }
  } catch {
    // plain-text reply (e.g. "OK") — treat as success
  }
  return true;
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

  const scriptUrl = process.env.GOOGLE_SCRIPT_URL;

  if (!scriptUrl) {
    // Never fake a successful submission in production — the family would think they're on the list.
    if (process.env.NODE_ENV === "production") {
      console.error("[api/reserve] GOOGLE_SCRIPT_URL is not set — reservation was NOT saved.");
      return NextResponse.json(
        { ok: false, error: "Unable to save your reservation. Please try again." },
        { status: 500 },
      );
    }
    console.info("[api/reserve] Mock mode — GOOGLE_SCRIPT_URL missing. Submission:", validated.data);
    return NextResponse.json({
      ok: true,
      mocked: true,
      message: "Reservation accepted locally. Set GOOGLE_SCRIPT_URL to save to the Google Sheet.",
    });
  }

  try {
    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validated.data),
      signal: AbortSignal.timeout(10_000),
    });
    const body = await response.text();

    if (!response.ok || !isScriptSuccess(response, body)) {
      console.error("[api/reserve] Apps Script rejected the submission:", {
        status: response.status,
        contentType: response.headers.get("content-type"),
        body: body.slice(0, 300),
      });
      return NextResponse.json(
        { ok: false, error: "Unable to save your reservation. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[api/reserve] Unexpected error:", error);
    return NextResponse.json(
      { ok: false, error: "Unable to save your reservation. Please try again." },
      { status: 502 },
    );
  }
}

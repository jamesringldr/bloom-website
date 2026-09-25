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

/** POSTs JSON to a Google Apps Script web app. Returns whether the script accepted it. */
export async function postToAppsScript(url: string, data: unknown): Promise<boolean> {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      signal: AbortSignal.timeout(10_000),
    });
    const body = await response.text();

    if (!response.ok || !isScriptSuccess(response, body)) {
      console.error("[apps-script] Script rejected the submission:", {
        status: response.status,
        contentType: response.headers.get("content-type"),
        body: body.slice(0, 300),
      });
      return false;
    }
    return true;
  } catch (error) {
    console.error("[apps-script] Unexpected error:", error);
    return false;
  }
}

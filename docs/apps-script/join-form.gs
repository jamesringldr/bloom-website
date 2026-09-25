/**
 * Bloom — "Join The Team" application receiver (Google Apps Script web app).
 *
 * Receives the JSON POSTed by /api/join, appends one row per application to the
 * "Join" tab of the Bloom spreadsheet (the same file as Reservations), and emails
 * a notification to NOTIFY_EMAIL. Setup steps are at the bottom of this file.
 */

const NOTIFY_EMAIL = "hello@bloomearlyed.com";
const SHEET_NAME = "Join"; // the tab; created automatically if it does not exist

// The Bloom spreadsheet (same file as the Reservations tab). This is the long string in its URL:
// docs.google.com/spreadsheets/d/<ID>/edit
// Leave "" only if this script is bound to its own sheet (Extensions ▸ Apps Script inside that sheet).
const SPREADSHEET_ID = "1Syu9sBQWPikR5kCrM4CYCezshgzx2yVubkqbRWaIFDs";

// [column header, function that reads the value from the payload]
const COLUMNS = [
  ["Submitted", () => Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm:ss")],
  ["Full name", (d) => d.fullName],
  ["Email", (d) => d.email],
  ["Phone", (d) => d.phone],
  ["Desired pay", (d) => d.desiredPay],
  ["Positions", (d) => list(d.positions)],
  ["Age groups", (d) => list(d.ageGroups)],
  ["Education", (d) => d.education],
  ["CPR / First Aid", (d) => (d.cpr === "Other" ? "Other: " + (d.cprOther || "") : d.cpr)],
  ["Childcare experience", (d) => d.experience],
  ["Loves most about working with children", (d) => d.loveMost],
  ["What children need from teachers", (d) => d.childrenNeed],
  ["Play-based classroom", (d) => d.playBased],
  ["Relationship with a struggling family", (d) => d.familyRelationship],
  ["Handling stressful moments", (d) => d.stressHandling],
  ["References", (d) => d.references],
  ["Cover letter / resume", (d) => d.coverLetter],
];

function doPost(e) {
  let data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return reply({ ok: false, error: "Invalid JSON." });
  }
  if (!data || !data.fullName || !data.email) {
    return reply({ ok: false, error: "Missing name or email." });
  }

  let sheet;
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    sheet = saveRow(data);
  } catch (err) {
    console.error(err);
    return reply({ ok: false, error: "Could not save the application." });
  } finally {
    lock.releaseLock();
  }

  // A mail failure must not lose (or fail) an application that is already saved.
  try {
    notify(data, sheet);
  } catch (err) {
    console.error("Notification email failed: " + err);
  }
  return reply({ ok: true });
}

// Opening the /exec URL in a browser is a safe way to check the deployment is reachable.
function doGet() {
  return reply({ ok: true, service: "Bloom applications" });
}

function spreadsheet() {
  return SPREADSHEET_ID ? SpreadsheetApp.openById(SPREADSHEET_ID) : SpreadsheetApp.getActiveSpreadsheet();
}

function saveRow(data) {
  const ss = spreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLUMNS.map((c) => c[0]));
    sheet.getRange(1, 1, 1, COLUMNS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }

  const values = COLUMNS.map((c) => String(c[1](data) || ""));
  // Plain-text format so applicant input like "=IMPORTXML(...)" is stored, never executed as a formula.
  const range = sheet.getRange(sheet.getLastRow() + 1, 1, 1, COLUMNS.length);
  range.setNumberFormat("@").setValues([values]);
  return sheet;
}

function notify(data, sheet) {
  const lines = COLUMNS.slice(1).map((c) => c[0] + ": " + (c[1](data) || "—"));
  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    replyTo: data.email,
    subject: "New teacher application — " + String(data.fullName).replace(/[\r\n]+/g, " "),
    body: lines.join("\n\n") + "\n\nAll applications: " + spreadsheet().getUrl() + "#gid=" + sheet.getSheetId(),
  });
}

function list(value) {
  return Array.isArray(value) ? value.join(", ") : "";
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// Run this once from the editor (Run ▸ testDoPost) to grant permissions and confirm a row + email.
// It adds a fake "Test Teacher" row — delete it afterwards.
function testDoPost() {
  const sample = {
    fullName: "Test Teacher", email: "test@example.com", phone: "913-555-0100", desiredPay: "$18/hr",
    positions: ["Part-Time", "Float"], ageGroups: ["Toddlers"], education: "College / Program",
    cpr: "Other", cprOther: "Expires 2027", experience: "=1+1", loveMost: "Everything",
    childrenNeed: "", playBased: "", familyRelationship: "", stressHandling: "",
    references: "A, 555-0001, boss\nB, 555-0002, friend\nC, 555-0003, peer", coverLetter: "",
  };
  const out = doPost({ postData: { contents: JSON.stringify(sample) } });
  console.log(out.getContent());
}

/*
 SETUP
 1. Go to script.google.com ▸ New project. (Do NOT paste this into the Bloom sheet's own
    Extensions ▸ Apps Script — that project already has the Reservations doPost and this would overwrite it.)
 2. Delete the starter code, paste this whole file, Save.
 3. Run ▸ testDoPost. Approve the permissions prompt (Advanced ▸ Go to project ▸ Allow).
    Check that the "Join" tab has a header row plus one "Test Teacher" row and that an email arrived.
    Then delete the test row.
 4. Deploy ▸ New deployment ▸ type "Web app".
      Execute as: Me
      Who has access: Anyone
    Deploy, then copy the Web app URL (ends in /exec).
 5. Open that URL in a browser — you should see {"ok":true,"service":"Bloom applications"}.
 6. In Vercel ▸ Project ▸ Settings ▸ Environment Variables, add GOOGLE_SCRIPT_URL_JOIN = that URL
    (Production + Preview), then redeploy.
 7. Later code edits: Deploy ▸ Manage deployments ▸ pencil ▸ Version: New version ▸ Deploy.
    The URL stays the same. Just saving is not enough.
*/

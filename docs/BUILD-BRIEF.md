# Bloom Early Learning Center — Website Build Brief (for Cursor)
> **What this is:** worker-ready build brief, drafted by Igor (foreman) from the approved director plan v1 · **Created:** 2026-09-23 · **Status:** awaiting James's sign-off before dispatch

## 1. What you're building
Single-page marketing site for **Bloom Early Learning Center**, a commercial daycare in Lenexa, KS (ages 6 weeks–6 years), opening **January 2027**. One conversion goal: **enrollment reservations**. No tours exist yet — do not build a tour flow.

## 2. Stack & deploy
- Deploy target: **Vercel**, custom domain **bloomearlyed.com**, code in a GitHub repo.
- Static-first; framework optional if it speeds the build. Must include a serverless function (`/api/reserve`) that emails form submissions to **hello@bloomearlyed.com**.
- Responsive (mobile-first; parents browse on phones). Basic SEO: title, meta description, OG tags.

## 3. Page structure (in order)
Nav: Programs · Our Approach · Our Team · Tuition · **Reserve Enrollment** (CTA button)
1. **Hero** — BLOOM logo (`logo-bloom.png`) + Blossom mascot (`mascot-blossom.png`), headline in a warm playful voice, CTAs: Reserve Enrollment / Explore Programs. Hero imagery: placeholder of kids playing (see §6).
2. **Stat strip** — 4 classrooms · ages 6 weeks–6 years · Creative Curriculum + Handwriting Without Tears · opening January 2027.
3. **Programs** — 4 cards: Seeds (6 wks–1 yr), Sprouts (6 mo–2.5 yr), Sunflowers (2.5–4 yr), Wildflowers (4–6 yr). Copy: About + Goals per program in `website-brief.md`. Card accents cycle the logo rainbow (red → orange → green → blue).
4. **Our Approach** — drafted from `about-copy.md` (About Bloom) + FAQ in `website-brief.md`: purposeful play, relationships first, Creative Curriculum + Handwriting Without Tears, transitions by age + milestones (never calendar alone), family updates via the Brightwheel app.
5. **Tuition** — table from `tuition-table.png`: Infant $450/$400/$360/$280 · Toddler $375/$320/$255/$200 · Preschool $350/$300/$240/$180 (5/4/3/2-day). Fees: $150/family yearly enrollment · $100/child yearly supply.
6. **Our Team** — Jillian (owner/director) + Megan (assistant director) bios in `about-copy.md`, trimmed for web. Headshot placeholders.
7. **Our Story + 2027 Calendar** — story copy in `website-brief.md`; calendar events: Grand Opening January · Week of the Young Child 4/10–4/16 · Teacher Appreciation 5/3–5/7 · Muffins with Mom 5/7 · Donuts with Dad 5/18 · Pre-K Graduation 5/21 · closures (Memorial Day 5/28–5/31, July 4th 7/2–7/5, Inservice 8/6, Labor Day 9/6, Thanksgiving 11/24–11/26, Christmas 12/24–12/31).
8. **FAQ** — ages 6 wks–6 yrs · hours 7am–5pm Mon–Fri · part-time 5/4/3/2-day · curriculum · transitions · Brightwheel. Source: `website-brief.md`.
9. **Enrollment reservation form** — fields: Parent/Guardian Full Name, email, phone, Child Full Name, DOB, special accommodations needed, **add additional children** (repeatable child block), desired start date, days care needed, hours care needed, additional comments/questions. Validate required fields + email format. Submit → POST to `/api/reserve` → email to hello@bloomearlyed.com. **No payment in the form** — fees are invoiced later via a link.
10. **Footer** — hello@bloomearlyed.com · Lenexa, KS · hours 7am–5pm Mon–Fri · Blossom sign-off.

## 4. Design direction
- **Reference:** the Little Minds preschool page (section rhythm, program cards, testimonial block → use a "Google reviews coming soon" placeholder).
- **Type:** oversized rounded display headlines, friendly readable body.
- **Palette:** pull from `logo-bloom.png` — red, orange, green, blue, purple; section accents cycle in that order.
- **Mascot:** Blossom (`mascot-blossom.png`) in hero, peeking from CTA blocks, footer.
- **Note:** `logo-bloom.png` is on a black background — handle for light sections (mask, re-export, or request a transparent version; do not stretch/distort).

## 5. Assets included (in `bloom-assets/`)
`logo-bloom.png` · `mascot-blossom.png` · `tuition-table.png` · `building-ai-touched.jpg` · `website-brief.md` · `about-copy.md`

## 6. Placeholders & known limitations
- All kid/classroom/team photos are **placeholders** — clearly marked, easy to swap.
- `building-ai-touched.jpg` is AI-modified (sign + yard) and does NOT reflect the real building — do not present it as real; use only if James approves, otherwise omit.
- Google reviews block: placeholder ("reviews coming soon").
- Copy: use the provided files verbatim where possible; light trimming for web is fine, no invented facts (no invented address, phone, or staff).

## 7. Acceptance criteria
- All 10 sections render with provided copy; nav anchors smooth-scroll.
- Form validates, supports multiple children, posts to `/api/reserve`, shows success/error states.
- Deploys cleanly on Vercel; no console errors; passes a mobile viewport check.
- James sign-off gate: nothing merges to main / goes live without his explicit approval.

## 8. Out of scope
Payments, CMS, tour scheduling, Brightwheel integration, accounts/logins.

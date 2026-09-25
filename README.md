# Bloom Early Learning Center — Website

Single-page marketing site for **Bloom Early Learning Center** (Lenexa, KS). Primary conversion: enrollment reservations for the January 2027 opening.

Deploy target: **Vercel** · domain **bloomearlyed.com**

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS + shadcn/ui
- Serverless routes `POST /api/reserve` (enrollment reservations) and `POST /api/join` (teacher applications from `/join-the-team`) validate submissions and forward them as JSON to Google Apps Script web apps (Google Sheets)

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev -- --port 43123
```

Open [http://127.0.0.1:43123](http://127.0.0.1:43123).

Without its script URL, a form's submissions succeed in **mock mode** in development (logged to the server console, nothing saved). In production a missing URL returns an error instead, so a submission is never silently dropped.

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `GOOGLE_SCRIPT_URL` | Yes (production) | Apps Script web app `/exec` URL for **enrollment reservations**. Treat it like a secret — anyone with it can add rows to the sheet. |
| `GOOGLE_SCRIPT_URL_JOIN` | Yes (production) | Separate Apps Script `/exec` URL for **teacher applications** (`/join-the-team`). Use its own script/sheet so applications don't mix with reservations. |

Set them in Vercel Project → Settings → Environment Variables (Production + Preview), then redeploy. Each Apps Script deployment must be **Execute as: Me** and **Who has access: Anyone**, and must handle the JSON body its form sends (see `src/app/api/reserve/route.ts` and `src/app/api/join/route.ts` for the exact fields; `children[]`, `positions[]` and `ageGroups[]` are arrays). Any notification email (e.g. to `hello@bloomearlyed.com`) is sent from the script itself.

## Page sections

1. Hero (logo + Blossom mascot)
2. Stat strip
3. Programs (Seeds · Sprouts · Sunflowers · Wildflowers)
4. Our Approach (+ reviews placeholder)
5. Tuition
6. Our Team
7. Our Story + 2027 Calendar
8. FAQ
9. Enrollment reservation form
10. Footer

## Assets / copy policy

Copy and imagery come from the approved brief only. Kid/classroom/team photos are clearly marked placeholders. The AI-touched building exterior is **not** used on the live page pending James’s approval (`assets/reference/building-ai-touched.jpg`).

## Deploy (Vercel)

1. Connect this GitHub repo to a Vercel project
2. Set env vars above
3. Deploy a **preview** first — do not promote production / point `bloomearlyed.com` without James’s explicit approval

## Scripts

```bash
npm run dev      # development server
npm run build    # production build
npm run start    # serve production build
npm run lint     # ESLint
```

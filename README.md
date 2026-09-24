# Bloom Early Learning Center — Website

Single-page marketing site for **Bloom Early Learning Center** (Lenexa, KS). Primary conversion: enrollment reservations for the January 2027 opening.

Deploy target: **Vercel** · domain **bloomearlyed.com**

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS + shadcn/ui
- Serverless route `POST /api/reserve` validates submissions and forwards them as JSON to a Google Apps Script web app (Google Sheet)

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev -- --port 43123
```

Open [http://127.0.0.1:43123](http://127.0.0.1:43123).

Without `GOOGLE_SCRIPT_URL`, form submissions succeed in **mock mode** in development (logged to the server console, nothing saved). In production a missing URL returns an error instead, so a reservation is never silently dropped.

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `GOOGLE_SCRIPT_URL` | Yes (production) | The Apps Script web app `/exec` URL. Treat it like a secret — anyone with it can add rows to the sheet. |

Set it in Vercel Project → Settings → Environment Variables (Production + Preview), then redeploy. The Apps Script deployment must be **Execute as: Me**, **Who has access: Anyone**, and it must handle the JSON body (`parentName`, `email`, `phone`, `startDate`, `daysNeeded`, `hoursNeeded`, `comments`, `children[]`). Any notification email to `hello@bloomearlyed.com` is sent from the script itself.

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

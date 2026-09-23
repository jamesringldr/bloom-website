# Bloom Early Learning Center — Website

Single-page marketing site for **Bloom Early Learning Center** (Lenexa, KS). Primary conversion: enrollment reservations for the February 2027 opening.

Deploy target: **Vercel** · domain **bloomearlyed.com**

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS + shadcn/ui
- Serverless route `POST /api/reserve` emails submissions to `hello@bloomearlyed.com` via [Resend](https://resend.com)

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev -- --port 43123
```

Open [http://127.0.0.1:43123](http://127.0.0.1:43123).

Without `RESEND_API_KEY`, form submissions succeed in **mock mode** and are logged to the server console (no email sent).

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `RESEND_API_KEY` | For real email | Resend API key |
| `RESEND_FROM_EMAIL` | Optional | From address (default: `Bloom Reservations <onboarding@resend.dev>`). Use a verified domain sender in production, e.g. `Bloom <hello@bloomearlyed.com>`. |

Resend dashboard: create an API key, verify `bloomearlyed.com`, set the vars in Vercel Project → Settings → Environment Variables.

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

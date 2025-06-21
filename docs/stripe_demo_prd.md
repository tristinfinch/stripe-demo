# PRD – Stripe Demo “Finch Foundry Flight Pack”

**Filename:** `prd-stripe-demo.md`\
**Location:** `/tasks/`\
**Version:** 0.3 • 21 Jun 2025\
**Author:** ChatGPT (pair‑programming assistant)

---

## 1 Introduction / Overview

Build an interactive demo site—in **Next.js 14** (App Router, TypeScript)—that showcases four core Stripe payment integration patterns (**Payment Links, Checkout Sessions, Stripe Elements, direct Payment Intents API**) while selling a fun, professional digital good: the **Finch Foundry Flight Pack** (bird‑outline wallpapers, SVG icons, 3‑D printable desk glider).

The project serves two purposes:

- **Hands‑on learning** for Tristin Finch to master Stripe integrations (wax‑on / wax‑off).
- **Portfolio artifact** for Stripe recruiters & hiring managers during the Manager, Technical Account Management interview loop.

All payments run in **Stripe Test mode** only.

---

## 2 Goals

| # | Goal                                                  | Metric                                                         |
| - | ----------------------------------------------------- | -------------------------------------------------------------- |
| 1 | Tristin can explain & modify all four Stripe patterns | Successful live walkthrough during interviews                  |
| 2 | Impress recruiters with code & UX polish              | Code review feedback ≥ “strong hire”; UI demo bug‑free         |
| 3 | 100 % test‑payment success                            | Each flow completes payment in test mode                       |
| 4 | Performance & A11y excellence                         | Lighthouse Performance & Accessibility ≥ 90 (desktop & mobile) |

---

## 3 User Stories

- **As Tristin (site owner)**, I want AI‑generated code with inline explanations so I can review and learn before merging.
- **As a recruiter/hiring manager**, I want to complete a purchase quickly to see Tristin’s Stripe expertise and clean UI.
- **As a junior developer reading the repo**, I want clear comments and docs so I understand how each pattern works.

---

## 4 Functional Requirements

1. **Landing Page** (`/`) lists four cards—Payment Links, Checkout, Elements, Direct API—using shadcn `Card` + Framer Motion.
2. **Payment Links Flow** (`/payment-links`): static CTA button opens a Dashboard‑created Payment Link for the Flight Pack.
3. **Checkout Session Flow** (`/checkout`): client calls **tRPC procedure** `stripe.createCheckoutSession`; server uses `stripe.checkout.sessions.create()` and returns the session URL for redirect.
4. **Elements Flow** (`/elements`): client requests **tRPC** `stripe.createPaymentIntent`; renders `@stripe/react-stripe-js` Card Element; calls `stripe.confirmCardPayment` and handles errors.
5. **Direct API Flow** (`/direct-api`): server‑side action (tRPC `stripe.chargeDirect`) posts test card data directly via Stripe SDK (no Stripe.js) and renders receipt.
6. **Success / Cancel Pages** (`/success`, `/cancel`) display order id, amount, and next‑steps links.
7. **Webhook Handler** (`/api/webhooks/stripe`) remains a simple Next.js route (`route.ts`) verifying signatures and updating order status in memory.
8. **Testing**:
   - **Phase 1:** Vitest units + Playwright happy‑path E2E.
   - **Phase 2:** Add Playwright scenarios for card declines & 3‑DS.
9. **CI**: GitHub Actions run `pnpm lint`, `pnpm test`, then hit Coolify webhook to auto‑deploy.

---

## 5 Non‑Goals (MVP)

- Subscriptions, taxes/VAT, coupons, shipping, multi‑currency.
- Edge‑case handling (card failures, 3‑DS) until Phase 2.
- Dark‑mode toggle.

---

## 6 Design Considerations

- **Palette:** Primary #1C75BC, charcoal #151619, white background, slate accents.
- **Typography:** Inter via Tailwind.
- **Brand Motif:** Finch outline icon; hover animation using Framer Motion.
- **Components:** shadcn/ui (`Button`, `Card`, `Alert`, etc.).
- **Accessibility:** Contrast ≥ AA; visible focus rings.

---

## 7 Technical Considerations

- **Stack:** Next.js 14, React 18, TypeScript, Tailwind, shadcn/ui, **tRPC v10 (server & client)**, Stripe SDK v13, Framer Motion.
- **Data Persistence:** In‑memory JSON module `db/orders.ts` for order state (sufficient for demo).
- **Environment Variables:**
  ```
  STRIPE_SECRET_KEY=
  STRIPE_PUBLISHABLE_KEY=
  STRIPE_WEBHOOK_SECRET=
  NEXT_PUBLIC_SITE_URL=http://localhost:3000
  ```
- **Hosting:** Coolify on Tristin’s VPS (deployment webhook from GitHub).
- **tRPC Architecture:**
  ```
  src/
  ├─ server/
  │   ├─ trpc.ts          // initTRPC
  │   ├─ routers/
  │   │   └─ stripe.ts    // createCheckoutSession, createPaymentIntent, chargeDirect
  │   └─ index.ts         // merged router, appRouter
  └─ utils/api.ts         // tRPC client for hooks
  ```
- **Pair‑Programming Workflow:**
  1. AI scaffolds Next.js project, Tailwind, shadcn, tRPC boilerplate, landing page.
  2. For each Stripe flow, AI opens PR with code + line‑by‑line comments; Tristin reviews & merges.
  3. AI commit messages include rationale and learning pointers.

---

## 8 Success Metrics

| ID   | Metric                                 | Target                      |
| ---- | -------------------------------------- | --------------------------- |
| SM‑1 | Four flows succeed in Stripe Test mode | 100 % pass on latest commit |
| SM‑2 | Lighthouse Performance score           | ≥ 90                        |
| SM‑3 | Lighthouse Accessibility score         | ≥ 90                        |

---

## 9 Phase 2 Items (Post‑MVP)

- Playwright tests for card declines, 3‑DS challenges, and network errors.
- Optional DB swap (SQLite via Drizzle) to persist orders across restarts.
- Docs section on advanced Stripe patterns (webhooks queue, retries, idempotency).

---

## 10 Status & Next Steps

- **PRD v0.3 approved?**
- If approved, AI will:
  1. Scaffold repository with tRPC boilerplate.
  2. Commit landing page and Payment Links flow PR.
  3. Await Tristin’s review before proceeding to Checkout flow.

---

*End of PRD v0.3 – ready for implementation with tRPC.*


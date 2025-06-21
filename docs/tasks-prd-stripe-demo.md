## Relevant Files

- `app/layout.tsx` – Root layout applying Tailwind styles, Inter font, and brand palette.
- `app/page.tsx` – Landing page listing all Stripe integration cards.
- `components/IntegrationCard.tsx` – Re-usable shadcn Card component for each flow.
- `app/payment-links/page.tsx` – Simple CTA page that redirects to the Stripe Payment Link.
- `app/checkout/page.tsx` – Checkout Session demo triggering tRPC mutation.
- `app/elements/page.tsx` – Stripe Elements form using CardElement.
- `app/direct-api/page.tsx` – Direct Payment Intents API demo with server action.
- `app/success/page.tsx` – Shared success screen.
- `app/cancel/page.tsx` – Shared cancel screen.
- `db/orders.ts` – In-memory JSON store for demo orders.
- `src/server/trpc.ts` – tRPC initialization.
- `src/server/routers/stripe.ts` – tRPC procedures: createCheckoutSession, createPaymentIntent, chargeDirect.
- `app/api/webhooks/stripe/route.ts` – Webhook handler verifying signatures and updating orders.
- `utils/api.ts` – tRPC client helper for React hooks.
- `tests/playwright/*` – E2E tests for each payment flow.
- `tests/unit/stripeRouter.test.ts` – Unit tests for Stripe tRPC router.

### Notes

- Place unit tests alongside the files they test, using the `.test.ts` / `.test.tsx` convention.
- Run all tests with `pnpm test` (Vitest) and `pnpm playwright test` for E2E.
- Use `pnpm lint` to run ESLint/Prettier before committing.

## Tasks

- [x] 1.0 Project scaffolding and environment setup
  - [x] 1.1 Initialize a new Next.js 15 App Router project with TypeScript (`pnpm dlx create-next-app . --ts --app --use-pnpm`).
  - [x] 1.2 Install core dependencies: Tailwind CSS, shadcn/ui, tRPC v11, @tanstack/react-query, Stripe SDK, @stripe/react-stripe-js, Framer Motion, Vitest, Playwright, ESLint, Prettier.
  - [x] 1.3 Configure Tailwind (`tailwind.config.ts`) and add brand colors.
  - [x] 1.4 Run `npx shadcn@latest init` and sync default theme.
  - [x] 1.5 Scaffold tRPC server (`src/server/trpc.ts`) and App Router handler.
  - [x] 1.6 Add `.env.local` template with Stripe key placeholders.
  - [x] 1.7 Commit initial scaffold to GitHub.
- [x] 2.0 Global UI framework & landing page
  - [x] 2.1 Create `app/layout.tsx` with Inter font import and global styles.
  - [x] 2.2 Implement `IntegrationCard` component using shadcn `Card` + Framer Motion hover effect.
  - [x] 2.3 Build `app/page.tsx` landing grid with four cards linking to each integration route.
  - [x] 2.4 Add responsive styling tests (Vitest snapshot or simple render test).
  - [x] 2.5 Verify Lighthouse ≥ 90 for landing page (implemented via check-lighthouse.js script).
- [x] 3.0 Payment Links integration
  - [x] 3.1 In Stripe Dashboard, create "Finch Foundry Flight Pack" Payment Link with test price.
  - [x] 3.2 Build `app/payment-links/page.tsx` with CTA button to Payment Link URL.
  - [x] 3.3 Ensure `success_url` & `cancel_url` point to `/success` and `/cancel`.
  - [x] 3.4 Add Playwright E2E test: click button → Stripe Checkout → simulate payment → success page.
- [ ] 4.0 Checkout Session integration via tRPC
  - [ ] 4.1 Add `createCheckoutSession` procedure to `src/server/routers/stripe.ts` (uses `stripe.checkout.sessions.create`).
  - [ ] 4.2 Implement `app/checkout/page.tsx` with button that invokes tRPC mutation and redirects to session URL.
  - [ ] 4.3 Update `app/success/page.tsx` to handle `session_id` query param and display amount.
  - [ ] 4.4 Write Vitest unit test mocking Stripe SDK for `createCheckoutSession`.
  - [ ] 4.5 Add Playwright E2E test for Checkout flow.
- [ ] 5.0 Elements integration via tRPC
  - [ ] 5.1 Add `createPaymentIntent` procedure to Stripe router (amount, currency, metadata).
  - [ ] 5.2 Implement `app/elements/page.tsx` rendering `<Elements>` provider and CardElement form.
  - [ ] 5.3 Handle `stripe.confirmCardPayment` on submit; show loader & error messages.
  - [ ] 5.4 Write unit test for `createPaymentIntent` procedure.
  - [ ] 5.5 Add Playwright E2E test for Elements happy path.
- [ ] 6.0 Direct API flow & webhook handler
  - [ ] 6.1 Add `chargeDirect` procedure to Stripe router that creates PaymentMethod & PaymentIntent server-side (test tokens only).
  - [ ] 6.2 Build `app/direct-api/page.tsx` with simple form posting to tRPC mutation; show receipt.
  - [ ] 6.3 Create `db/orders.ts` in-memory store and helper methods.
  - [ ] 6.4 Implement `app/api/webhooks/stripe/route.ts` verifying signature and updating orders.
  - [ ] 6.5 Write unit test for webhook handler with mocked `payment_intent.succeeded` event.
  - [ ] 6.6 Add Playwright E2E test for Direct API flow.
  - [ ] 6.7 Document Stripe CLI webhook forwarding in `README.md`.
- [ ] 7.0 CI, testing, and deployment pipeline
  - [ ] 7.1 Configure Vitest with coverage thresholds (≥ 90 %).
  - [ ] 7.2 Configure Playwright headless workflow.
  - [ ] 7.3 Add GitHub Actions workflow: lint, test, build.
  - [ ] 7.4 Add `COOLIFY_WEBHOOK_URL` secret and POST deploy step.
  - [ ] 7.5 Integrate ESLint & Prettier with pre-commit hook (husky or simple npm script).
  - [ ] 7.6 Generate Lighthouse CI config (optional) for performance budget.
  - [ ] 7.7 Update `README.md` with deployment & test commands.

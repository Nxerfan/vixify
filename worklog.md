---
Task ID: 1
Agent: main (Z.ai Code)
Task: Build the Vixify landing page (/) — OTP-as-a-Service platform homepage with dark+light themes, EN+FA i18n with RTL, mouse-reactive animations, and full editorial design.

Work Log:
- Installed `sass` for SCSS module support.
- Rebuilt `src/app/globals.css` with a Vixify token system: warm near-black dark theme (primary) + warm-paper light theme, single gold accent (#FFDD6F via oklch), glassmorphism + grain + grid utilities, marquee/caret/pulse/float keyframes, reduced-motion guard, custom scrollbar.
- Root `layout.tsx`: loaded Inter Tight (display), JetBrains Mono (code), Vazirmatn (Persian) via next/font; wrapped app in ThemeProvider (next-themes, default dark) + LocaleProvider; SEO metadata with vixify.vercel.app base.
- Built lightweight client-side i18n (`src/i18n/`): locale-context with instant EN↔FA switching, persisted to localStorage, syncs `<html lang>` + `dir`; comprehensive messages.ts dictionary covering every landing string (header, hero, metrics, features, how-it-works, code, pricing, FAQ, CTA, footer, a11y labels).
- Brand primitives: `VixifyLogo` — custom SVG "verified V" mark (geometric V sweeping into a checkmark with a verification node, gold gradient) + wordmark, with mouse-dodge spring animation; `MagneticButton` (cursor-attracted link); `CursorGlow` (gold radial trail); `ThemeToggle`; `LanguageSwitcher`. All gated behind `useReducedMotion`.
- Landing sections built: Header (sticky, blur-on-scroll, mobile sheet), Hero (staggered entrance + live OTP terminal + floating phone card, signature moment), MetricsStrip (marquee with [BRACKETED_TOKENS]), FeaturesGrid (4 tilt-on-hover glass cards), HowItWorks (3 numbered steps with connector line), CodeExamples (Node/PHP/Python/cURL tabs with manual syntax highlighting + copy button, SCSS module), PricingPreview (5 tiers, Pro highlighted, links to /pricing), Faq (8-item accordion), FinalCta (gold radial panel), Footer (real contact info: email/phone/telegram/github/linkedin/whatsapp + link columns, sticky via flex).
- Page composition: min-h-screen flex-col, main flex-1, footer mt-auto (sticky-bottom compliant); ScrollProgress bar; skip link.
- Fixed React 19 lint rule `react-hooks/set-state-in-effect` for the two legitimate hydration-sync patterns (theme mount flag + locale localStorage read) with scoped eslint-disable comments.
- Added `allowedDevOrigins` to next.config for the preview environment.

Verification (Agent Browser + VLM):
- Page loads 200, no console/runtime errors.
- All 9 sections present with correct semantics (landmarks, heading levels, aria labels).
- Golden path verified: EN→FA language switch flips dir=rtl + Persian text instantly; theme toggle dark↔light; code tabs switch (Node/PHP/Python/cURL selected correctly); FAQ accordion single-collapsible expansion; mobile menu opens with full nav + switches + CTA at 390px; desktop 1440px layout intact.
- VLM visual audit: gold accent "strong and cohesive", typography "clear, bold, editorial", "high personality — does NOT look like a generic Vercel/Linear clone", hero terminal+phone "reads instantly". (Flagged "N" FAB is the preview environment's own widget, not part of the page.)
- `bun run lint` passes clean (0 errors, 0 warnings).

Stage Summary:
- Landing page complete and browser-verified at / route.
- Design system established: Vixify tokens (dark/light), gold accent, Inter Tight + JetBrains Mono + Vazirmatn, glassmorphism, mouse-reactive primitives — reusable for all subsequent pages (dashboard, auth, pricing).
- i18n infrastructure ready: add keys to messages.ts + use `useLocale().t()` anywhere.
- Produced artifacts: 21 component/hook/i18n files + 2 SCSS modules + rewritten globals.css/layout.tsx/page.tsx.
- Note for next steps: Transactional emails intentionally deferred — awaiting Nixify API docs from user before implementing email flows.

---
Task ID: 2
Agent: main (Z.ai Code)
Task: Fix critical business-model correction — Vixify is a managed OTP service (operator maintains the gateway phone), NOT a DIY gateway where customers provide hardware. Correct FAQ, rewrite Android Gateway Setup guides as operator-only, update pricing + landing copy.

Work Log:
- Audited all user-facing copy for the wrong "customer provides phone/SIM" framing.
- Corrected `src/i18n/messages.ts` (EN + FA) across 11 keys:
  - hero.subtitle: "turns any Android phone into an SMS gateway" → "handles all SMS infrastructure for you... no hardware, no carrier contracts"
  - hero.terminal.gateway: "Android gateway" → "Vixify gateway"
  - hero.phone.label: "Android SIM gateway" → "Your user's phone" (the phone mockup now represents the recipient, not the gateway)
  - features.4.desc/detail: "Your SIM, your carrier... phone in your drawer" → "Vixify's managed gateway... no infrastructure for you to maintain"
  - how.step3.desc: "your Android gateway dispatches it" → "our managed gateway dispatches it"
  - pricing.subtitle: "the SIM is yours" → "A fully managed service — no hardware, no carrier contracts"
  - faq.1.a: rewrote to "Vixify is a managed OTP service... Vixify's own Android gateway — operated and maintained by us"
  - faq.2.q/a: "Do I need my own SIM card?" / "Yes — you provide..." → "Do I need my own SIM card or phone?" / "No, you don't need any hardware. Vixify handles all SMS sending infrastructure..."
  - faq.6.a: "your SIM's carrier" → "Vixify's gateway delivers... our carrier's roaming"
  - cta.subtitle: "through a SIM you already own" → "We handle all the SMS infrastructure — you just integrate and pay per OTP"
  - Added new key pricing.managed: "Fully managed — no hardware required" (EN) / "کاملاً مدیریت‌شده — بدون نیاز به سخت‌افزار" (FA)
- Added a prominent gold "Fully managed — no hardware required" pill above the pricing grid in PricingPreview component.
- Fixed SEO metadata in `src/app/layout.tsx`: description, openGraph, twitter — all rewritten to "managed OTP service... no hardware required".
- Created `ANDROID_GATEWAY_SETUP.md` (EN): operator-only guide with prominent ⚠️ notice at top stating regular customers do NOT need to follow it. Covers the operator's single gateway phone setup (prerequisites, gateway secret, MacroDroid/Tasker polling macros for GET /api/v1/get-pending-sms → send SMS → POST /api/v1/confirm-sent, health monitoring, security, troubleshooting) + a customer-facing API reference section.
- Created `ANDROID_GATEWAY_SETUP_FA.md` (FA): full Persian translation of the operator guide with the same operator-only notice.
- Ran source sweep for residual wrong-model phrases ("you provide", "your SIM", "your carrier", "your Android", "phone in your drawer", "SIM you already own", "the SIM is yours", "turns any Android phone") → NONE FOUND.
- `bun run lint` passes clean.
- Browser-verified: EN hero subtitle, FAQ Q1 ("managed OTP service... operated and maintained by us"), FAQ Q2 ("No, you don't need any hardware..."), pricing managed pill all render correctly. FA versions verified (RTL, Persian text, managed pill "کاملاً مدیریت‌شده — بدون نیاز به سخت‌افزار", FAQ Q2 "خیر، به هیچ سخت‌افزاری نیاز ندارید").

Stage Summary:
- Business model corrected everywhere: Vixify is now consistently presented as a managed OTP service where the operator maintains the gateway and customers just integrate + pay per OTP.
- No page anywhere tells customers they need hardware.
- Android Gateway Setup guides are explicitly operator-only with prominent warnings; customers are pointed away from them.
- Pricing section now displays a "Fully managed — no hardware required" pill.
- Note: no standalone /pricing route exists (single-route constraint); the pricing preview section on / is the pricing surface and now communicates the managed-service nature. When a full pricing page is built later, the same messaging applies.

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

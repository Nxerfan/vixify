export type Locale = "en" | "fa";

export type MessageKey = string;

/**
 * Vixify i18n dictionaries.
 * Keys are flat with dot namespaces for clarity.
 * Every user-visible string on the landing page lives here.
 */
export const messages = {
  en: {
    // ---- Meta / header ----
    "meta.name": "Vixify",
    "meta.tagline": "OTP API for developers",
    "nav.features": "Features",
    "nav.howItWorks": "How it works",
    "nav.pricing": "Pricing",
    "nav.docs": "Docs",
    "nav.faq": "FAQ",
    "nav.getStarted": "Get API key",
    "nav.signIn": "Sign in",
    "nav.menu": "Menu",
    "nav.skipToContent": "Skip to content",
    "lang.label": "Language",
    "lang.en": "English",
    "lang.fa": "فارسی",
    "theme.toggle": "Toggle theme",
    "theme.dark": "Dark",
    "theme.light": "Light",

    // ---- Hero ----
    "hero.badge": "OTP-as-a-Service",
    "hero.title": "OTP API for developers, sent via real SIM cards.",
    "hero.titleAccent": "real SIM cards.",
    "hero.subtitle":
      "Vixify handles all SMS infrastructure for you. Integrate the API, send OTPs to your users, and pay only for what you send — no hardware, no carrier contracts, no per-message markup. Sub-300ms API, signed webhooks, and an SDK that drops into one line.",
    "hero.ctaPrimary": "Start free",
    "hero.ctaSecondary": "View docs",
    "hero.trust": "Free tier · 100 OTPs / month · no card required",
    "hero.terminal.request": "POST /api/request-otp",
    "hero.terminal.payload": '{"phone":"09120000000","brand":"Acme"}',
    "hero.terminal.response": "200 OK · pending",
    "hero.terminal.codeLabel": "Code",
    "hero.terminal.codeValue": "482913",
    "hero.terminal.gateway": "→ Vixify gateway dispatching…",
    "hero.terminal.sent": "✓ SMS delivered via SIM",
    "hero.terminal.title": "vixify · live request",
    "hero.phone.label": "Your user's phone",

    // ---- Metrics ----
    "metrics.label": "Trusted in production",
    "metrics.uptime": "Uptime",
    "metrics.uptimeValue": "[99.99%]",
    "metrics.delivery": "Delivery rate",
    "metrics.deliveryValue": "[98.7%]",
    "metrics.countries": "Countries",
    "metrics.countriesValue": "[12]",
    "metrics.sent": "OTPs sent",
    "metrics.sentValue": "[4.2M]",

    // ---- Features ----
    "features.kicker": "What you get",
    "features.title": "Everything an OTP pipeline needs. Nothing it doesn't.",
    "features.subtitle":
      "A focused, developer-first API built around one job: getting a code to a user's phone, fast.",
    "features.1.title": "Sub-300ms Delivery",
    "features.1.desc":
      "Codes are generated and persisted instantly. The async dispatch model returns success before the SMS even leaves the SIM — your API never blocks on carrier latency.",
    "features.1.detail": "Async pipeline · instant code generation",
    "features.2.title": "API Key Auth",
    "features.2.desc":
      "Scoped, revocable keys with per-request rate limiting (20/day per phone, 60s cooldown). Rotate without downtime and track usage down to the single request.",
    "features.2.detail": "Scoped keys · rotation · rate limits",
    "features.3.title": "Webhook Support",
    "features.3.desc":
      "HMAC-SHA256 signed events for sent, verified, failed, and delivered. Automatic retries and a full delivery ledger so nothing slips through the cracks.",
    "features.3.detail": "HMAC-signed · retries · delivery ledger",
    "features.4.title": "Global SMS",
    "features.4.desc":
      "Real SIM delivery to any country, handled entirely by Vixify's managed gateway. No third-party provider routes, no per-message markup, and no infrastructure for you to maintain — just call the API.",
    "features.4.detail": "Managed gateway · zero markup · global reach",

    // ---- How it works ----
    "how.kicker": "Three steps",
    "how.title": "From sign-up to first OTP in five minutes.",
    "how.subtitle":
      "No infrastructure to provision. No carrier contracts to sign. Just a key, a package, and a function call.",
    "how.step1.title": "Get an API key",
    "how.step1.desc":
      "Register with your mobile, verify with an OTP, complete your profile, and claim a scoped API key from the dashboard.",
    "how.step2.title": "Install the SDK",
    "how.step2.desc":
      "Add the official package and initialize a client with your key. Works in Node.js, PHP, and Python — plus raw REST anywhere.",
    "how.step3.title": "Send an OTP",
    "how.step3.desc":
      "Call requestOtp with a phone number. Vixify generates the code, our managed gateway dispatches it, and webhooks fire on delivery.",
    "how.step1.cmd": "dashboard → API keys",
    "how.step2.cmd": "yarn add @nixify/sms",
    "how.step3.cmd": "client.requestOtp(phone)",

    // ---- Code examples ----
    "code.kicker": "Developer experience",
    "code.title": "One client. Three languages. Zero ceremony.",
    "code.subtitle":
      "The @nixify/sms SDK wraps the REST API with sensible defaults. Prefer raw HTTP? The endpoints are the same.",
    "code.tab.node": "Node.js",
    "code.tab.php": "PHP",
    "code.tab.python": "Python",
    "code.tab.curl": "cURL",
    "code.copy": "Copy",
    "code.copied": "Copied",
    "code.comment.init": "// initialize with your API key",
    "code.comment.request": "// request a one-time code",
    "code.comment.verify": "// verify the code the user entered",

    // ---- Pricing preview ----
    "pricing.kicker": "Pricing",
    "pricing.title": "Start free. Scale when you're ready.",
    "pricing.subtitle":
      "Five tiers, including pay-as-you-go. A fully managed service — no hardware, no carrier contracts, no per-message markup.",
    "pricing.managed": "Fully managed — no hardware required",
    "pricing.free.name": "Free",
    "pricing.free.price": "0",
    "pricing.free.period": "/month",
    "pricing.free.feature": "100 OTPs / month",
    "pricing.go.name": "Go",
    "pricing.go.price": "150,000",
    "pricing.go.period": "Toman / mo",
    "pricing.go.feature": "5,000 OTPs / month",
    "pricing.pro.name": "Pro",
    "pricing.pro.price": "700,000",
    "pricing.pro.period": "Toman / mo",
    "pricing.pro.feature": "20,000 OTPs / month",
    "pricing.max.name": "Max",
    "pricing.max.price": "3,000,000",
    "pricing.max.period": "Toman / mo",
    "pricing.max.feature": "100,000 OTPs / month",
    "pricing.payg.name": "Pay-as-you-go",
    "pricing.payg.price": "500",
    "pricing.payg.period": "Toman / OTP",
    "pricing.payg.feature": "No minimum after first top-up",
    "pricing.popular": "Most popular",
    "pricing.viewAll": "View full pricing",
    "pricing.currency": "Toman",

    // ---- FAQ ----
    "faq.kicker": "FAQ",
    "faq.title": "Questions, answered.",
    "faq.subtitle":
      "Everything you need to know about the managed OTP service, billing, and the SDK.",
    "faq.1.q": "How does the Vixify SMS gateway work?",
    "faq.1.a": "Vixify is a managed OTP service. When you call /api/request-otp, Vixify generates a 6-digit code, stores it as pending, and returns immediately. Vixify's own Android gateway — operated and maintained by us — then dispatches the SMS via its SIM and confirms delivery. You never touch any hardware; you just call the API and pay for the OTPs you send.",
    "faq.2.q": "Do I need my own SIM card or phone?",
    "faq.2.a": "No, you don't need any hardware. Vixify handles all SMS sending infrastructure. You just integrate our API/SDK and we send OTPs to your users from our gateway. You only pay for the OTPs you send.",
    "faq.3.q": "What's included in the free tier?",
    "faq.3.a": "100 OTPs per month for one month, one per user, no card required. It's a real trial — full API access, webhooks, and the SDK. Branding customization is reserved for paid tiers.",
    "faq.4.q": "How is billing calculated?",
    "faq.4.a": "Subscription tiers (Go, Pro, Max) include a monthly OTP quota. Pay-as-you-go deducts 500 Toman per OTP from your wallet. Every /api/request-otp call passes an atomic billing gate: either an active subscription covers it, or 500 Toman is deducted from your wallet balance.",
    "faq.5.q": "Can I remove the Vixify signature from SMS?",
    "faq.5.a": "Branding is gated by plan. Free has no branding access. Go can customize text but keeps a non-removable '— Vixify' signature. Pro, Max, and Pay-as-you-go get full access, including signature removal. Segment math (160 GSM-7 / 70 UCS-2) is shown live in the editor.",
    "faq.6.q": "Which countries are supported?",
    "faq.6.a": "Vixify's gateway delivers to any country our carrier's roaming and international SMS agreements cover. Because we operate the SIM infrastructure, you never have to worry about routes or coverage — if a number can receive an SMS, we can reach it. Contact us for specific coverage questions.",
    "faq.7.q": "Is there an official SDK?",
    "faq.7.a": "Yes — @nixify/sms, part of the Nixify family. It's available for Node.js, PHP, and Python, with raw REST endpoints documented for any other language. Initialize with your API key and you're one function call away from a delivered OTP.",
    "faq.8.q": "How do webhooks work?",
    "faq.8.a": "Every OTP lifecycle emits HMAC-SHA256 signed events: otp.sent, otp.verified, otp.failed, and otp.delivered. Each payload includes a timestamp and signature header for verification. Failed deliveries are retried automatically, and a full delivery ledger is available in the dashboard.",

    // ---- Final CTA ----
    "cta.kicker": "Ready when you are",
    "cta.title": "Start sending OTPs in five minutes.",
    "cta.subtitle":
      "Claim your free API key, install the SDK, and send your first real OTP. We handle all the SMS infrastructure — you just integrate and pay per OTP.",
    "cta.primary": "Get your API key",
    "cta.secondary": "Read the docs",
    "cta.noCard": "No credit card · 100 OTPs free",

    // ---- Footer ----
    "footer.tagline": "OTP API for developers, sent via real SIM cards.",
    "footer.product": "Product",
    "footer.developers": "Developers",
    "footer.company": "Company",
    "footer.legal": "Legal",
    "footer.product.features": "Features",
    "footer.product.pricing": "Pricing",
    "footer.product.dashboard": "Dashboard",
    "footer.product.changelog": "Changelog",
    "footer.developers.docs": "Documentation",
    "footer.developers.sdk": "@nixify/sms",
    "footer.developers.api": "API reference",
    "footer.developers.status": "Status",
    "footer.company.about": "About",
    "footer.company.contact": "Contact",
    "footer.company.blog": "Blog",
    "footer.legal.privacy": "Privacy",
    "footer.legal.terms": "Terms",
    "footer.legal.security": "Security",
    "footer.contact.email": "Email",
    "footer.contact.phone": "Phone",
    "footer.family": "Part of the Nixify family",
    "footer.rights": "All rights reserved.",
    "footer.madeWith": "Built for developers, by developers.",

    // ---- Accessibility ----
    "a11y.logo": "Vixify home",
    "a11y.openMenu": "Open navigation menu",
    "a11y.closeMenu": "Close navigation menu",
    "a11y.copyCode": "Copy code to clipboard",
  },

  fa: {
    // ---- Meta / header ----
    "meta.name": "Vixify",
    "meta.tagline": "API او‌تی‌پی برای توسعه‌دهندگان",
    "nav.features": "امکانات",
    "nav.howItWorks": "نحوه کار",
    "nav.pricing": "قیمت‌گذاری",
    "nav.docs": "مستندات",
    "nav.faq": "سوالات متداول",
    "nav.getStarted": "دریافت کلید API",
    "nav.signIn": "ورود",
    "nav.menu": "منو",
    "nav.skipToContent": "رفتن به محتوا",
    "lang.label": "زبان",
    "lang.en": "English",
    "lang.fa": "فارسی",
    "theme.toggle": "تغییر تم",
    "theme.dark": "تیره",
    "theme.light": "روشن",

    // ---- Hero ----
    "hero.badge": "سرویس او‌تی‌پی",
    "hero.title": "API او‌تی‌پی برای توسعه‌دهندگان، ارسال با سیم‌کارت واقعی.",
    "hero.titleAccent": "سیم‌کارت واقعی.",
    "hero.subtitle":
      "Vixify تمام زیرساخت پیامک را برای شما مدیریت می‌کند. API را ادغام کنید، او‌تی‌پی را به کاربران خود بفرستید و فقط برای آنچه می‌فرستید پرداخت کنید — بدون سخت‌افزار، بدون قرارداد مخابراتی، بدون حاشیه‌سود به ازای هر پیام. API زیر ۳۰۰ میلی‌ثانیه، وب‌هوک‌های امضاشده و SDKی که با یک خط راه می‌افتد.",
    "hero.ctaPrimary": "شروع رایگان",
    "hero.ctaSecondary": "مشاهده مستندات",
    "hero.trust": "طرح رایگان · ۱۰۰ او‌تی‌پی در ماه · بدون کارت بانکی",
    "hero.terminal.request": "POST /api/request-otp",
    "hero.terminal.payload": '{"phone":"09120000000","brand":"Acme"}',
    "hero.terminal.response": "200 OK · در حال انتظار",
    "hero.terminal.codeLabel": "کد",
    "hero.terminal.codeValue": "۴۸۲۹۱۳",
    "hero.terminal.gateway": "→ در حال ارسال توسط دروازه Vixify…",
    "hero.terminal.sent": "✓ پیامک از طریق سیم‌کارت تحویل شد",
    "hero.terminal.title": "vixify · درخواست زنده",
    "hero.phone.label": "گوشی کاربر شما",

    // ---- Metrics ----
    "metrics.label": "مورد اعتماد در محیط عملیاتی",
    "metrics.uptime": "آپ‌تایم",
    "metrics.uptimeValue": "[۹۹٫۹۹٪]",
    "metrics.delivery": "نرخ تحویل",
    "metrics.deliveryValue": "[۹۸٫۷٪]",
    "metrics.countries": "کشورها",
    "metrics.countriesValue": "[۱۲]",
    "metrics.sent": "او‌تی‌پی ارسال‌شده",
    "metrics.sentValue": "[۴٫۲ میلیون]",

    // ---- Features ----
    "features.kicker": "چه چیزی دریافت می‌کنید",
    "features.title": "هرچه یک خط لوله او‌تی‌پی نیاز دارد. نه کم، نه زیاد.",
    "features.subtitle":
      "یک API متمرکز و توسعه‌دهنده-محور برای یک کار: رساندن کد به گوشی کاربر، سریع.",
    "features.1.title": "تحویل زیر ۳۰۰ میلی‌ثانیه",
    "features.1.desc":
      "کدها فوراً تولید و ذخیره می‌شوند. مدل ارسال ناهمگام پیش از خروج پیامک از سیم‌کارت، موفقیت را برمی‌گرداند — API شما هرگز روی تأخیر شبکه‌ی مخابراتی مسدود نمی‌شود.",
    "features.1.detail": "خط لوله ناهمگام · تولید فوری کد",
    "features.2.title": "احراز هویت با کلید API",
    "features.2.desc":
      "کلیدهای محدوده‌دار و قابل‌ابطال با محدودیت نرخ درخواست (۲۰ در روز به ازای هر شماره، فاصله ۶۰ ثانیه‌ای). چرخش بدون قطعی و ردیابی مصرف تا سطح یک درخواست.",
    "features.2.detail": "کلیدهای محدوده‌دار · چرخش · محدودیت نرخ",
    "features.3.title": "پشتیبانی وب‌هوک",
    "features.3.desc":
      "رویدادهای امضاشده HMAC-SHA256 برای ارسال، تأیید، شکست و تحویل. تلاش مجدد خودکار و دفتر تحویل کامل تا هیچ رویدادی از قلم نیفتد.",
    "features.3.detail": "امضای HMAC · تلاش مجدد · دفتر تحویل",
    "features.4.title": "پیامک جهانی",
    "features.4.desc":
      "تحویل با سیم‌کارت واقعی به هر کشور، کاملاً توسط دروازه مدیریت‌شده Vixify انجام می‌شود. بدون مسیر ارائه‌دهنده ثالث، بدون حاشیه‌سود به ازای هر پیام، و بدون زیرساختی که شما نگه دارید — فقط API را فراخوانی کنید.",
    "features.4.detail": "دروازه مدیریت‌شده · بدون حاشیه · دسترسی جهانی",

    // ---- How it works ----
    "how.kicker": "سه گام",
    "how.title": "از ثبت‌نام تا اولین او‌تی‌پی در پنج دقیقه.",
    "how.subtitle":
      "هیچ زیرساختی برای راه‌اندازی. هیچ قرارداد مخابراتی‌ای برای امضا. فقط یک کلید، یک پکیج و یک فراخوانی تابع.",
    "how.step1.title": "کلید API بگیرید",
    "how.step1.desc":
      "با شماره موبایل ثبت‌نام کنید، با او‌تی‌پی تأیید شوید، پروفایل را کامل کنید و یک کلید محدوده‌دار از داشبورد بگیرید.",
    "how.step2.title": "SDK را نصب کنید",
    "how.step2.desc":
      "پکیج رسمی را اضافه کنید و یک کلاینت با کلید خود مقداردهی کنید. در Node.js، PHP و Python کار می‌کند — و REST خام در هر زبانی.",
    "how.step3.title": "او‌تی‌پی بفرستید",
    "how.step3.desc":
      "requestOtp را با شماره تلفن فراخوانی کنید. Vixify کد را تولید می‌کند، دروازه مدیریت‌شده ما آن را ارسال می‌کند و وب‌هوک‌ها هنگام تحویل اجرا می‌شوند.",
    "how.step1.cmd": "داشبورد ← کلیدهای API",
    "how.step2.cmd": "yarn add @nixify/sms",
    "how.step3.cmd": "client.requestOtp(phone)",

    // ---- Code examples ----
    "code.kicker": "تجربه توسعه‌دهنده",
    "code.title": "یک کلاینت. سه زبان. بدون پیچیدگی.",
    "code.subtitle":
      "SDKی @nixify/sms روی REST API با پیش‌فرض‌های معقول قرار دارد. HTTP خام را ترجیح می‌دهید؟ endpointها همان هستند.",
    "code.tab.node": "Node.js",
    "code.tab.php": "PHP",
    "code.tab.python": "Python",
    "code.tab.curl": "cURL",
    "code.copy": "کپی",
    "code.copied": "کپی شد",
    "code.comment.init": "// مقداردهی با کلید API",
    "code.comment.request": "// درخواست کد یکبارمصرف",
    "code.comment.verify": "// تأیید کدی که کاربر وارد کرد",

    // ---- Pricing preview ----
    "pricing.kicker": "قیمت‌گذاری",
    "pricing.title": "رایگان شروع کنید. وقتی آماده بودید، گسترش دهید.",
    "pricing.subtitle":
      "پنج طرح، شامل پرداخت به‌میزان مصرف. یک سرویس کاملاً مدیریت‌شده — بدون سخت‌افزار، بدون قرارداد مخابراتی، بدون حاشیه‌سود به ازای هر پیام.",
    "pricing.managed": "کاملاً مدیریت‌شده — بدون نیاز به سخت‌افزار",
    "pricing.free.name": "رایگان",
    "pricing.free.price": "۰",
    "pricing.free.period": "/ماه",
    "pricing.free.feature": "۱۰۰ او‌تی‌پی / ماه",
    "pricing.go.name": "Go",
    "pricing.go.price": "۱۵۰٬۰۰۰",
    "pricing.go.period": "تومان / ماه",
    "pricing.go.feature": "۵٬۰۰۰ او‌تی‌پی / ماه",
    "pricing.pro.name": "Pro",
    "pricing.pro.price": "۷۰۰٬۰۰۰",
    "pricing.pro.period": "تومان / ماه",
    "pricing.pro.feature": "۲۰٬۰۰۰ او‌تی‌پی / ماه",
    "pricing.max.name": "Max",
    "pricing.max.price": "۳٬۰۰۰٬۰۰۰",
    "pricing.max.period": "تومان / ماه",
    "pricing.max.feature": "۱۰۰٬۰۰۰ او‌تی‌پی / ماه",
    "pricing.payg.name": "پرداخت به‌میزان مصرف",
    "pricing.payg.price": "۵۰۰",
    "pricing.payg.period": "تومان / او‌تی‌پی",
    "pricing.payg.feature": "بدون حداقل بعد از اولین شارژ",
    "pricing.popular": "محبوب‌ترین",
    "pricing.viewAll": "مشاهده قیمت‌گذاری کامل",
    "pricing.currency": "تومان",

    // ---- FAQ ----
    "faq.kicker": "سوالات متداول",
    "faq.title": "سوال‌ها، پاسخ داده شد.",
    "faq.subtitle":
      "هرآنچه باید درباره سرویس مدیریت‌شده او‌تی‌پی، صورت‌حساب و SDK بدانید.",
    "faq.1.q": "دروازه پیامک Vixify چگونه کار می‌کند؟",
    "faq.1.a": "Vixify یک سرویس مدیریت‌شده او‌تی‌پی است. هنگام فراخوانی /api/request-otp، Vixify یک کد ۶ رقمی تولید می‌کند، آن را به‌صورت در حال انتظار ذخیره می‌کند و فوراً برمی‌گرداند. سپس دروازه اندروید خود Vixify — که توسط ما راه‌اندازی و نگهداری می‌شود — پیامک را از طریق سیم‌کارت خود ارسال کرده و تحویل را تأیید می‌کند. شما هرگز با هیچ سخت‌افزاری سروکار ندارید؛ فقط API را فراخوانی کنید و به ازای او‌تی‌پی‌هایی که می‌فرستید پرداخت کنید.",
    "faq.2.q": "آیا به سیم‌کارت یا گوشی خودم نیاز دارم؟",
    "faq.2.a": "خیر، به هیچ سخت‌افزاری نیاز ندارید. Vixify تمام زیرساخت ارسال پیامک را مدیریت می‌کند. فقط API/SDK ما را ادغام کنید و ما او‌تی‌پی را از دروازه خود به کاربران شما می‌فرستیم. شما فقط به ازای او‌تی‌پی‌هایی که می‌فرستید پرداخت می‌کنید.",
    "faq.3.q": "طرح رایگان شامل چه چیزی است؟",
    "faq.3.a": "۱۰۰ او‌تی‌پی در ماه به مدت یک ماه، یکی به ازای هر کاربر، بدون کارت بانکی. یک آزمایش واقعی است — دسترسی کامل API، وب‌هوک‌ها و SDK. سفارشی‌سازی برندینگ مختص طرح‌های پولی است.",
    "faq.4.q": "صورت‌حساب چگونه محاسبه می‌شود؟",
    "faq.4.a": "طرح‌های اشتراکی (Go، Pro، Max) شامل سهمیه ماهانه او‌تی‌پی هستند. پرداخت به‌میزان مصرف، ۵۰۰ تومان به ازای هر او‌تی‌پی از کیف پول کسر می‌کند. هر فراخوانی /api/request-otp از یک گیت صورت‌حساب اتمیک عبور می‌کند: یا اشتراک فعال آن را پوشش می‌دهد یا ۵۰۰ تومان از موجودی کیف پول کسر می‌شود.",
    "faq.5.q": "آیا می‌توانم امضای Vixify را از پیامک حذف کنم؟",
    "faq.5.a": "برندینگ به طرح بستگی دارد. رایگان دسترسی به برندینگ ندارد. Go می‌تواند متن را سفارشی کند اما امضای غیرقابل‌حذف '— Vixify' را نگه می‌دارد. Pro، Max و پرداخت به‌میزان مصرف دسترسی کامل دارند، شامل حذف امضا. محاسبه بند کد (۱۶۰ GSM-7 / ۷۰ UCS-2) به‌صورت زنده در ویرایشگر نمایش داده می‌شود.",
    "faq.6.q": "کدام کشورها پشتیبانی می‌شوند؟",
    "faq.6.a": "دروازه Vixify به هر کشوری که قراردادهای رومینگ و پیامک بین‌المللی مخابرات ما پوشش می‌دهد، تحویل می‌دهد. از آنجا که ما زیرساخت سیم‌کارت را عملیاتی می‌کنیم، هرگز نگران مسیرها یا پوشش نیستید — اگر شماره‌ای بتواند پیامک دریافت کند، ما به آن می‌رسیم. برای سوالات خاص پوشش با ما تماس بگیرید.",
    "faq.7.q": "آیا SDK رسمی وجود دارد؟",
    "faq.7.a": "بله — @nixify/sms، بخشی از خانواده Nixify. برای Node.js، PHP و Python در دسترس است، با endpointهای REST خام برای هر زبان دیگر. با کلید API مقداردهی کنید و یک فراخوانی تابع تا تحویل او‌تی‌پی فاصله دارید.",
    "faq.8.q": "وب‌هوک‌ها چگونه کار می‌کنند؟",
    "faq.8.a": "هر چرخه حیات او‌تی‌پی رویدادهای امضاشده HMAC-SHA256 منتشر می‌کند: otp.sent، otp.verified، otp.failed و otp.delivered. هر payload شامل مهر زمان و هدر امضا برای تأیید است. تحویل‌های ناموفق به‌صورت خودکار تلاش مجدد می‌شوند و دفتر تحویل کامل در داشبورد در دسترس است.",

    // ---- Final CTA ----
    "cta.kicker": "هر زمان آماده بودید",
    "cta.title": "در پنج دقیقه شروع به ارسال او‌تی‌پی کنید.",
    "cta.subtitle":
      "کلید API رایگان خود را بگیرید، SDK را نصب کنید و اولین او‌تی‌پی واقعی را بفرستید. ما تمام زیرساخت پیامک را مدیریت می‌کنیم — شما فقط ادغام کنید و به ازای هر او‌تی‌پی پرداخت کنید.",
    "cta.primary": "دریافت کلید API",
    "cta.secondary": "خواندن مستندات",
    "cta.noCard": "بدون کارت بانکی · ۱۰۰ او‌تی‌پی رایگان",

    // ---- Footer ----
    "footer.tagline": "API او‌تی‌پی برای توسعه‌دهندگان، ارسال با سیم‌کارت واقعی.",
    "footer.product": "محصول",
    "footer.developers": "توسعه‌دهندگان",
    "footer.company": "شرکت",
    "footer.legal": "قوانین",
    "footer.product.features": "امکانات",
    "footer.product.pricing": "قیمت‌گذاری",
    "footer.product.dashboard": "داشبورد",
    "footer.product.changelog": "تغییرات",
    "footer.developers.docs": "مستندات",
    "footer.developers.sdk": "@nixify/sms",
    "footer.developers.api": "مرجع API",
    "footer.developers.status": "وضعیت",
    "footer.company.about": "درباره",
    "footer.company.contact": "تماس",
    "footer.company.blog": "وبلاگ",
    "footer.legal.privacy": "حریم خصوصی",
    "footer.legal.terms": "شرایط",
    "footer.legal.security": "امنیت",
    "footer.contact.email": "ایمیل",
    "footer.contact.phone": "تلفن",
    "footer.family": "بخشی از خانواده Nixify",
    "footer.rights": "تمام حقوق محفوظ است.",
    "footer.madeWith": "ساخته‌شده برای توسعه‌دهندگان، توسط توسعه‌دهندگان.",

    // ---- Accessibility ----
    "a11y.logo": "صفحه نخست Vixify",
    "a11y.openMenu": "باز کردن منوی ناوبری",
    "a11y.closeMenu": "بستن منوی ناوبری",
    "a11y.copyCode": "کپی کد به کلیپ‌بورد",
  },
} as const satisfies Record<Locale, Record<string, string>>;

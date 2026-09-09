import type { Metadata } from "next";
import { Inter_Tight, JetBrains_Mono, Vazirmatn } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { LocaleProvider } from "@/i18n/locale-context";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vixify.vercel.app"),
  title: "Vixify — OTP API for developers, sent via real SIM cards",
  description:
    "Vixify turns any Android phone into an SMS gateway. Generate OTP codes, verify users, and pay zero per-message carrier fees. Sub-300ms API, signed webhooks, and the @nixify/sms SDK.",
  keywords: [
    "Vixify",
    "OTP API",
    "SMS gateway",
    "SIM card OTP",
    "authentication",
    "phone verification",
    "Nixify",
    "developer API",
    "Iran SMS",
  ],
  authors: [{ name: "Vixify" }],
  applicationName: "Vixify",
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Vixify — OTP API via real SIM cards",
    description:
      "OTP API for developers, sent via real SIM cards. Sub-300ms, signed webhooks, @nixify/sms SDK.",
    url: "https://vixify.vercel.app",
    siteName: "Vixify",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vixify — OTP API via real SIM cards",
    description:
      "OTP API for developers, sent via real SIM cards. Sub-300ms, signed webhooks, @nixify/sms SDK.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body
        className={`${interTight.variable} ${jetbrainsMono.variable} ${vazirmatn.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider>
          <LocaleProvider>
            {children}
            <Toaster />
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

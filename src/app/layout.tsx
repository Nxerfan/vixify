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
    "Vixify is a managed OTP service. Integrate the API, send OTPs to your users from our real-SIM gateway, and pay only for what you send — no hardware, no carrier contracts. Sub-300ms API, signed webhooks, and the @nixify/sms SDK.",
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
    title: "Vixify — Managed OTP API for developers",
    description:
      "Vixify is a managed OTP service. Integrate the API, send OTPs from our real-SIM gateway, and pay per OTP — no hardware required. Sub-300ms, signed webhooks, @nixify/sms SDK.",
    url: "https://vixify.vercel.app",
    siteName: "Vixify",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vixify — Managed OTP API for developers",
    description:
      "Managed OTP service: integrate the API, send OTPs from our real-SIM gateway, pay per OTP. No hardware required. Sub-300ms, signed webhooks, @nixify/sms SDK.",
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

import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

// ABC Monument Grotesk closest free match — used for hero titles & big statements
const bricolage = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

// Suisse International closest free match — used for all body/UI text
const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Adwiser — AI-Powered Digital Growth | Lead Gen, Web & Automation",
  description:
    "Adwiser transforms your business with AI-powered lead generation, premium website development, and intelligent automation that converts visitors into customers.",
  keywords: [
    "Adwiser",
    "AI automation",
    "lead generation",
    "website development",
    "digital growth",
    "SaaS",
    "AI agency",
  ],
  authors: [{ name: "Adwiser" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "Adwiser — AI-Powered Digital Growth",
    description:
      "Generate quality leads, build premium websites, and automate your business with cutting-edge AI technology.",
    siteName: "Adwiser",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adwiser — AI-Powered Digital Growth",
    description:
      "AI-powered lead generation, premium websites, and intelligent automation.",
  },
};

import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${bricolage.variable} ${dmSans.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          <SonnerToaster position="top-center" richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}

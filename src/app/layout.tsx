import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
        <SonnerToaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}

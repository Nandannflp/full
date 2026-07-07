import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

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

const BASE_URL = "https://adwiser.ai";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
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
    "conversion optimization",
    "AI agents",
  ],
  authors: [{ name: "Adwiser", url: BASE_URL }],
  creator: "Adwiser",
  publisher: "Adwiser",
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "Adwiser — AI-Powered Digital Growth",
    description:
      "Generate quality leads, build premium websites, and automate your business with cutting-edge AI technology.",
    siteName: "Adwiser",
    type: "website",
    url: BASE_URL,
    locale: "en_US",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Adwiser — AI-Powered Digital Growth",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adwiser — AI-Powered Digital Growth",
    description:
      "AI-powered lead generation, premium websites, and intelligent automation.",
    site: "@adwiser",
    creator: "@adwiser",
    images: [`${BASE_URL}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

// ── Schema.org JSON-LD ────────────────────────────────────────────────────────
const schemaOrg = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "Adwiser",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
      },
      description:
        "AI-powered digital growth agency specializing in lead generation, website development, and AI automation.",
      email: "hello@adwiser.ai",
      telephone: "+1-415-555-0142",
      address: {
        "@type": "PostalAddress",
        addressLocality: "San Francisco",
        addressRegion: "CA",
        addressCountry: "US",
      },
      sameAs: [
        "https://twitter.com/adwiser",
        "https://linkedin.com/company/adwiser",
        "https://github.com/adwiser",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "Adwiser",
      publisher: { "@id": `${BASE_URL}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: `${BASE_URL}/?q={search_term_string}` },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Service",
      name: "Lead Generation",
      provider: { "@id": `${BASE_URL}/#organization` },
      description:
        "AI-driven funnels, smart capture forms, and intent scoring that deliver qualified prospects 24/7.",
      url: `${BASE_URL}/#lead-gen`,
    },
    {
      "@type": "Service",
      name: "Website Development",
      provider: { "@id": `${BASE_URL}/#organization` },
      description:
        "Award-worthy websites engineered for speed, SEO, and conversion using Next.js and modern web technologies.",
      url: `${BASE_URL}/#web-dev`,
    },
    {
      "@type": "Service",
      name: "AI Automation",
      provider: { "@id": `${BASE_URL}/#organization` },
      description:
        "Custom AI agents that automate support, follow-ups, reporting, and operations around the clock.",
      url: `${BASE_URL}/#ai-automation`,
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
        {/* MCP server discovery */}
        <link rel="alternate" type="application/json" href="/api/mcp" title="Adwiser MCP Server" />
      </head>
      <body
        className={`${bricolage.variable} ${dmSans.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
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

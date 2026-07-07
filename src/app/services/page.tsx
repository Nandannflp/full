import type { Metadata } from "next";
import ServicesHub from "./ServicesHub";

export const metadata: Metadata = {
  title: "Services — Adwiser | AI-Powered Digital Growth",
  description:
    "Twelve expert services — Personal Branding, Meta Ads, Google Ads, Lead Generation, Video Editing, and more. Scroll through our cinematic services showcase.",
  alternates: { canonical: "https://adwiser.ai/services" },
  openGraph: {
    title: "Services — Adwiser",
    description:
      "Twelve expert services engineered to grow your brand, capture leads, and automate your business.",
    url: "https://adwiser.ai/services",
    type: "website",
  },
};

export default function ServicesPage() {
  return <ServicesHub />;
}

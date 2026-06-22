"use client";

import { AuroraBackground } from "@/components/landing/aurora-background";
import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Services } from "@/components/landing/services";
import { Showcase } from "@/components/landing/showcase";
import { Stats } from "@/components/landing/stats";
import { Solutions } from "@/components/landing/solutions";
import { Pricing } from "@/components/landing/pricing";
import { Testimonials } from "@/components/landing/testimonials";
import { CTA } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <AuroraBackground />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Services />
        <Showcase />
        <Stats />
        <Solutions />
        <Pricing />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

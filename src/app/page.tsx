"use client";

import { AuroraBackground } from "@/components/landing/aurora-background";
import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Services } from "@/components/landing/services";
import { Solutions } from "@/components/landing/solutions";
import { Stats } from "@/components/landing/stats";
import { FounderTeam } from "@/components/landing/founder-team";
import { Testimonials } from "@/components/landing/testimonials";
import { FAQ } from "@/components/landing/faq";
import { CTA } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";
import { ScrollUtilities } from "@/components/landing/scroll-utilities";
import { FloatingSidebar } from "@/components/landing/floating-sidebar";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <AuroraBackground />
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <ScrollUtilities />
      <FloatingSidebar />
      <Navbar />
      <main id="main" className="flex-1">
        <Hero />
        <Services />
        <Solutions />
        <Stats />
        <FounderTeam />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

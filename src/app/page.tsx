"use client";

import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { LogosMarquee } from "@/components/landing/logos-marquee";
import { Services } from "@/components/landing/services";

import { Stats } from "@/components/landing/stats";
import { Solutions } from "@/components/landing/solutions";

import { Testimonials } from "@/components/landing/testimonials";
import { FAQ } from "@/components/landing/faq";
import { CTA } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";
import { ScrollUtilities } from "@/components/landing/scroll-utilities";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <ScrollUtilities />
      <Navbar />
      <main id="main" className="flex-1">
        <Hero />
        <LogosMarquee />
        <Services />
        <Stats />
        <Solutions />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

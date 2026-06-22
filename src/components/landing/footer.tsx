"use client";

import { Sparkles, Twitter, Linkedin, Github, Instagram, ArrowUpRight } from "lucide-react";

const COLUMNS = [
  {
    title: "Company",
    links: ["About", "Careers", "Blog", "Press", "Contact"],
  },
  {
    title: "Services",
    links: [
      "Lead Generation",
      "Website Development",
      "AI Automation",
      "SEO & Growth",
      "Analytics",
    ],
  },
  {
    title: "Resources",
    links: ["Documentation", "Case Studies", "Guides", "Webinars", "Help Center"],
  },
  {
    title: "Contact",
    links: ["hello@adwiser.ai", "+1 (415) 555-0142", "San Francisco, CA", "Book a call", "Support"],
  },
];

const SOCIALS = [
  { icon: Twitter, label: "Twitter" },
  { icon: Linkedin, label: "LinkedIn" },
  { icon: Github, label: "GitHub" },
  { icon: Instagram, label: "Instagram" },
];

export function Footer() {
  return (
    <footer className="relative mt-auto border-t border-white/10 bg-[#020617]/80 backdrop-blur-xl">
      {/* glass separator glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#3b82f6]/60 to-transparent" />

      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          {/* Brand */}
          <div className="max-w-xs">
            <a href="#home" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#2563eb] via-[#3b82f6] to-[#06b6d4] shadow-[0_0_24px_-4px_rgba(59,130,246,0.7)]">
                <Sparkles className="h-5 w-5 text-white" />
              </span>
              <span className="text-lg font-bold tracking-tight text-white">
                Adwiser
              </span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              AI-powered digital growth — lead generation, premium websites, and
              intelligent automation that converts visitors into customers.
            </p>
            <div className="mt-5 flex gap-2.5">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition-all hover:border-[#3b82f6]/50 hover:bg-[#3b82f6]/10 hover:text-[#38bdf8]"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-white">{col.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="group inline-flex items-center gap-1 text-sm text-slate-400 transition-colors hover:text-[#38bdf8]"
                    >
                      {l}
                      <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Adwiser. All rights reserved. Crafted
            with AI-powered precision.
          </p>
          <div className="flex gap-5 text-xs text-slate-500">
            <a href="#" className="transition-colors hover:text-slate-300">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-slate-300">
              Terms
            </a>
            <a href="#" className="transition-colors hover:text-slate-300">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

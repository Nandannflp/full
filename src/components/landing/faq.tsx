"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, MessageSquareMore } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Magnetic } from "./magnetic";

const EASE = [0.16, 1, 0.3, 1] as const;

const FAQS = [
  {
    q: "How quickly can we launch?",
    a: "Most projects go live in 2–4 weeks. Starter websites can ship in as little as 7 days, while custom AI automation builds typically take 3–6 weeks depending on complexity and integrations.",
  },
  {
    q: "Do you work with our existing CRM and tools?",
    a: "Yes. We integrate with HubSpot, Salesforce, Notion, Slack, Stripe, Zapier, and 200+ tools. Our AI agents connect to your stack via secure APIs, so lead data flows exactly where you need it.",
  },
  {
    q: "What makes your AI automation different?",
    a: "We don't just plug in a chatbot. We build custom AI agents trained on your business context — handling lead qualification, follow-ups, support triage, and reporting 24/7, with humans in the loop where it matters.",
  },
  {
    q: "Is there a long-term contract?",
    a: "No. All plans are month-to-month and cancel anytime. Enterprise engagements include flexible terms with SLAs and dedicated engineering capacity tailored to your roadmap.",
  },
  {
    q: "How do you measure success?",
    a: "We tie everything to revenue: qualified leads, conversion rate, pipeline value, and ROI. You get a live dashboard with real-time metrics and a monthly strategy review with your growth manager.",
  },
  {
    q: "What if I'm not technical?",
    a: "Perfect — that's our job. You get a dedicated growth manager who translates goals into execution, plus a polished dashboard so you can see results without touching code.",
  },
];

export function FAQ() {
  return (
    <section className="relative mx-auto w-full max-w-4xl px-4 py-20 sm:px-6 lg:py-28">
      <SectionHeading
        kicker="FAQ"
        title="Questions, meet"
        highlight="answers"
        description="Everything you need to know about working with Adwiser. Can't find what you're looking for? Our team is one message away."
      />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
        className="mt-12"
      >
        <Accordion
          type="single"
          collapsible
          defaultValue="faq-0"
          className="flex flex-col gap-3"
        >
          {FAQS.map((f, i) => (
            <AccordionItem
              key={f.q}
              value={`faq-${i}`}
              className="group overflow-hidden rounded-2xl border border-slate-900/10 bg-white/[0.03] px-5 backdrop-blur-sm transition-all duration-300 data-[state=open]:border-[#3b82f6]/40 data-[state=open]:bg-[#3b82f6]/[0.06] data-[state=open]:shadow-[0_8px_40px_-12px_rgba(37,99,235,0.4)]"
            >
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3 py-2 text-left">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-900/5 text-[#38bdf8] transition-colors duration-300 group-data-[state=open]:bg-gradient-to-br group-data-[state=open]:from-rose-500 group-data-[state=open]:to-orange-500 group-data-[state=open]:text-slate-900">
                    <HelpCircle className="h-4 w-4" />
                  </span>
                  <span className="text-base font-semibold text-slate-900">
                    {f.q}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-5 pt-1 text-sm leading-relaxed text-slate-600/90">
                <div className="pl-10">{f.a}</div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>

      {/* contact prompt */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
        className="mt-10 flex flex-col items-center justify-center gap-4 rounded-2xl glass-card p-6 text-center sm:flex-row sm:text-left"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-orange-500">
          <MessageSquareMore className="h-5 w-5 text-slate-900" />
        </span>
        <div className="flex-1">
          <p className="text-sm font-semibold text-slate-900">
            Still have questions?
          </p>
          <p className="text-sm text-slate-500">
            Chat with our team and get answers in minutes, not days.
          </p>
        </div>
        <Magnetic strength={0.25}>
          <a
            href="#contact"
            className="btn-ghost-glass inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold"
          >
            Talk to us
          </a>
        </Magnetic>
      </motion.div>
    </section>
  );
}

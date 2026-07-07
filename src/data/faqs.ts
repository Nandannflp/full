/**
 * Adwiser FAQs — single source of truth.
 * Extracted from faq.tsx FAQS array.
 */

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: "timeline" | "integrations" | "services" | "pricing" | "results" | "support";
}

export const FAQS: FAQ[] = [
  {
    id: "launch-timeline",
    question: "How quickly can we launch?",
    answer:
      "Most projects go live in 2–4 weeks. Starter websites can ship in as little as 7 days, while custom AI automation builds typically take 3–6 weeks depending on complexity and integrations.",
    category: "timeline",
  },
  {
    id: "crm-integration",
    question: "Do you work with our existing CRM and tools?",
    answer:
      "Yes. We integrate with HubSpot, Salesforce, Notion, Slack, Stripe, Zapier, and 200+ tools. Our AI agents connect to your stack via secure APIs, so lead data flows exactly where you need it.",
    category: "integrations",
  },
  {
    id: "ai-difference",
    question: "What makes your AI automation different?",
    answer:
      "We don't just plug in a chatbot. We build custom AI agents trained on your business context — handling lead qualification, follow-ups, support triage, and reporting 24/7, with humans in the loop where it matters.",
    category: "services",
  },
  {
    id: "contracts",
    question: "Is there a long-term contract?",
    answer:
      "No. All plans are month-to-month and cancel anytime. Enterprise engagements include flexible terms with SLAs and dedicated engineering capacity tailored to your roadmap.",
    category: "pricing",
  },
  {
    id: "success-metrics",
    question: "How do you measure success?",
    answer:
      "We tie everything to revenue: qualified leads, conversion rate, pipeline value, and ROI. You get a live dashboard with real-time metrics and a monthly strategy review with your growth manager.",
    category: "results",
  },
  {
    id: "non-technical",
    question: "What if I'm not technical?",
    answer:
      "Perfect — that's our job. You get a dedicated growth manager who translates goals into execution, plus a polished dashboard so you can see results without touching code.",
    category: "support",
  },
];

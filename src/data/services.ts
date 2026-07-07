/**
 * Adwiser Services — single source of truth.
 * Used by both the MCP server and (optionally) landing page components.
 */

export interface Service {
  id: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  category: string;
}

export const SERVICES: Service[] = [
  {
    id: "lead-gen",
    title: "Lead Generation",
    tagline: "Quality leads on autopilot",
    description:
      "AI-driven funnels, smart capture forms, and intent scoring that deliver qualified prospects directly to your pipeline — 24/7.",
    features: [
      "AI intent scoring",
      "Multi-channel capture",
      "Smart nurture sequences",
      "Real-time CRM sync",
    ],
    category: "Growth",
  },
  {
    id: "web-dev",
    title: "Website Development",
    tagline: "Premium, lightning-fast sites",
    description:
      "Award-worthy websites engineered for speed, SEO, and conversion. Built with modern stacks and pixel-perfect craft.",
    features: [
      "Next-gen performance",
      "Conversion-optimized UX",
      "SEO-ready architecture",
      "Headless CMS",
    ],
    category: "Technology",
  },
  {
    id: "ai-automation",
    title: "AI Automation",
    tagline: "Intelligent workflows that scale",
    description:
      "Automate support, follow-ups, reporting, and operations with custom AI agents that work around the clock.",
    features: [
      "Custom AI agents",
      "Workflow automation",
      "Smart chat support",
      "Predictive analytics",
    ],
    category: "Automation",
  },
];

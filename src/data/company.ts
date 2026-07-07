/**
 * Adwiser Company Information — single source of truth.
 * Extracted from footer.tsx and used across MCP server and website.
 */

export const COMPANY = {
  name: "Adwiser",
  tagline: "AI-Powered Digital Growth",
  description:
    "AI-powered digital growth — lead generation, premium websites, and intelligent automation that converts visitors into customers.",
  mission:
    "To transform businesses with AI-powered lead generation, premium website development, and intelligent automation that converts visitors into customers.",
  email: "hello@adwiser.ai",
  phone: "+1 (415) 555-0142",
  location: "San Francisco, CA",
  website: "https://adwiser.ai",
  founded: "2023",
  services: ["Lead Generation", "Website Development", "AI Automation"],
  industries: ["Fintech", "Healthcare", "E-commerce", "SaaS", "Creative", "Analytics"],
  socials: {
    twitter: "https://twitter.com/adwiser",
    linkedin: "https://linkedin.com/company/adwiser",
    github: "https://github.com/adwiser",
    instagram: "https://instagram.com/adwiser",
  },
  pricing: {
    model: "Month-to-month — no long-term contracts required",
    cancellation: "Cancel anytime, no lock-in",
    enterprise: "Custom SLAs and dedicated engineering capacity available for enterprise",
    consultation: "Free strategy consultation — book a call to get a custom quote",
  },
  stats: [
    { label: "Qualified leads per client (avg)", value: "+212%" },
    { label: "Average AOV increase", value: "+340%" },
    { label: "Client satisfaction score", value: "98%" },
    { label: "Hours saved weekly via automation", value: "30+" },
  ],
  integrations: [
    "HubSpot",
    "Salesforce",
    "Notion",
    "Slack",
    "Stripe",
    "Zapier",
    "200+ more",
  ],
  businessHours: "Monday–Friday, 9 AM–6 PM PT",
  responseTime: "Within 24 hours",
} as const;

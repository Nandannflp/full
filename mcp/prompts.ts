/**
 * MCP Prompts for Adwiser
 *
 * 6 prompts to prime AI assistants with Adwiser context:
 *  - services-overview
 *  - pricing-inquiry
 *  - company-information
 *  - marketing-strategy
 *  - lead-generation
 *  - website-development
 */

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SERVICES, COMPANY } from "../src/data/index.js";

export function registerPrompts(server: McpServer): void {
  // ── services-overview ────────────────────────────────────────────────────
  server.prompt(
    "services-overview",
    "Prime the AI with a comprehensive overview of all Adwiser services for accurate answers.",
    async () => ({
      messages: [
        {
          role: "user" as const,
          content: {
            type: "text" as const,
            text: [
              `You are a knowledgeable assistant for ${COMPANY.name}, an AI-powered digital growth agency.`,
              "",
              `**Company**: ${COMPANY.name} — ${COMPANY.tagline}`,
              `**Mission**: ${COMPANY.mission}`,
              "",
              "## Our Services",
              "",
              ...SERVICES.map(
                (s) =>
                  `### ${s.title} — ${s.tagline}\n${s.description}\n\n**Features:**\n${s.features.map((f) => `- ${f}`).join("\n")}`
              ),
              "",
              "Please answer questions about these services accurately, enthusiastically, and concisely.",
              `For bookings or inquiries, direct users to: ${COMPANY.email} or ${COMPANY.website}`,
            ].join("\n"),
          },
        },
      ],
    })
  );

  // ── pricing-inquiry ──────────────────────────────────────────────────────
  server.prompt(
    "pricing-inquiry",
    "Get context to accurately answer pricing and contract questions about Adwiser.",
    async () => ({
      messages: [
        {
          role: "user" as const,
          content: {
            type: "text" as const,
            text: [
              `You are answering pricing questions for ${COMPANY.name}.`,
              "",
              "## Pricing Model",
              `- **Structure**: ${COMPANY.pricing.model}`,
              `- **Cancellation**: ${COMPANY.pricing.cancellation}`,
              `- **Enterprise**: ${COMPANY.pricing.enterprise}`,
              `- **Get started**: ${COMPANY.pricing.consultation}`,
              "",
              "## Key Points to Communicate",
              "- No long-term lock-in — month-to-month for all plans",
              "- Custom pricing based on project scope and goals",
              "- Enterprise packages include SLAs and dedicated support",
              "- ROI is always tied to measurable revenue outcomes",
              "- Free strategy consultation available (no commitment)",
              "",
              "## Typical Client Results",
              ...COMPANY.stats.map((s) => `- ${s.label}: **${s.value}**`),
              "",
              `To get an exact quote, recommend booking a free call at ${COMPANY.website} or emailing ${COMPANY.email}.`,
            ].join("\n"),
          },
        },
      ],
    })
  );

  // ── company-information ──────────────────────────────────────────────────
  server.prompt(
    "company-information",
    "Get comprehensive Adwiser company information for AI context.",
    async () => ({
      messages: [
        {
          role: "user" as const,
          content: {
            type: "text" as const,
            text: [
              `## ${COMPANY.name} — Company Overview`,
              "",
              `**Tagline**: ${COMPANY.tagline}`,
              `**Description**: ${COMPANY.description}`,
              `**Founded**: ${COMPANY.founded}`,
              `**Location**: ${COMPANY.location}`,
              `**Website**: ${COMPANY.website}`,
              "",
              "## Contact",
              `- Email: ${COMPANY.email}`,
              `- Phone: ${COMPANY.phone}`,
              `- Business hours: ${COMPANY.businessHours}`,
              `- Response time: ${COMPANY.responseTime}`,
              "",
              "## Services",
              ...COMPANY.services.map((s) => `- ${s}`),
              "",
              "## Industries We Serve",
              ...COMPANY.industries.map((i) => `- ${i}`),
              "",
              "## Integrations",
              COMPANY.integrations.join(", "),
              "",
              "## Social Media",
              ...Object.entries(COMPANY.socials).map(
                ([k, v]) => `- ${k.charAt(0).toUpperCase() + k.slice(1)}: ${v}`
              ),
            ].join("\n"),
          },
        },
      ],
    })
  );

  // ── marketing-strategy ───────────────────────────────────────────────────
  server.prompt(
    "marketing-strategy",
    "Get Adwiser's digital marketing and growth strategy framework for AI context.",
    async () => ({
      messages: [
        {
          role: "user" as const,
          content: {
            type: "text" as const,
            text: [
              `You are explaining ${COMPANY.name}'s digital growth methodology.`,
              "",
              "## Core Philosophy",
              "Revenue-first digital marketing — every strategy is tied to measurable outcomes: qualified leads, conversion rates, pipeline value, and ROI.",
              "",
              "## The 4-Step Growth Framework",
              "1. **Attract** — AI-driven lead generation funnels and multi-channel capture",
              "2. **Convert** — Conversion-optimized websites and precision landing pages",
              "3. **Automate** — Custom AI agents for nurturing, follow-ups, and 24/7 support",
              "4. **Measure** — Live dashboards with real-time metrics + monthly strategy reviews",
              "",
              "## Key Differentiators",
              "- AI intent scoring to identify highest-quality prospects",
              "- Custom AI agents (not generic chatbots) — trained on client business context",
              "- Award-worthy websites with 90+ Lighthouse scores",
              `- Deep integrations: ${COMPANY.integrations.join(", ")}`,
              "- Month-to-month pricing — aligned incentives, no lock-in",
              "",
              "## Proven Results",
              ...COMPANY.stats.map((s) => `- ${s.label}: **${s.value}**`),
            ].join("\n"),
          },
        },
      ],
    })
  );

  // ── lead-generation ──────────────────────────────────────────────────────
  server.prompt(
    "lead-generation",
    "Get detailed context on Adwiser's Lead Generation service for precise AI answers.",
    async () => {
      const leadGenService = SERVICES.find((s) => s.id === "lead-gen")!;
      return {
        messages: [
          {
            role: "user" as const,
            content: {
              type: "text" as const,
              text: [
                `## ${COMPANY.name}: ${leadGenService.title} Service`,
                `*${leadGenService.tagline}*`,
                "",
                `**Overview**: ${leadGenService.description}`,
                "",
                "## What's Included",
                ...leadGenService.features.map((f) => `- ${f}`),
                "",
                "## How It Works",
                "1. AI intent scoring identifies high-value visitors in real time",
                "2. Multi-channel capture forms collect contact info across touchpoints",
                "3. Smart nurture sequences automate follow-ups at optimal times",
                "4. All leads sync to your CRM (HubSpot, Salesforce, etc.) instantly",
                "",
                "## Timeline",
                "- Setup: 1–2 weeks",
                "- First leads: typically within 2 weeks of launch",
                "- Full optimization: within 60 days",
                "",
                "## Pricing",
                `${COMPANY.pricing.model}. Custom quotes based on target lead volume and business size.`,
                "",
                `## Get Started`,
                `Email ${COMPANY.email} or book a free strategy call at ${COMPANY.website}`,
              ].join("\n"),
            },
          },
        ],
      };
    }
  );

  // ── website-development ──────────────────────────────────────────────────
  server.prompt(
    "website-development",
    "Get detailed context on Adwiser's Website Development service for precise AI answers.",
    async () => {
      const webService = SERVICES.find((s) => s.id === "web-dev")!;
      return {
        messages: [
          {
            role: "user" as const,
            content: {
              type: "text" as const,
              text: [
                `## ${COMPANY.name}: ${webService.title} Service`,
                `*${webService.tagline}*`,
                "",
                `**Overview**: ${webService.description}`,
                "",
                "## What's Included",
                ...webService.features.map((f) => `- ${f}`),
                "",
                "## Tech Stack",
                "- **Framework**: Next.js (React 19) — for maximum performance and SEO",
                "- **Styling**: Tailwind CSS v4 — utility-first, responsive design",
                "- **CMS options**: Sanity, Contentful, or custom headless CMS",
                "- **Hosting**: Vercel, Cloudflare Pages, or custom infrastructure",
                "- **Performance target**: 90+ Lighthouse scores, sub-2s load times",
                "",
                "## Delivery Timeline",
                "- Starter websites: 7–14 days",
                "- Custom builds: 2–4 weeks",
                "- Enterprise / complex builds: 4–8 weeks",
                "",
                "## Pricing",
                `${COMPANY.pricing.model}. Custom quotes based on project scope and features.`,
                "",
                "## Get Started",
                `Email ${COMPANY.email} or book a free strategy call at ${COMPANY.website}`,
              ].join("\n"),
            },
          },
        ],
      };
    }
  );
}

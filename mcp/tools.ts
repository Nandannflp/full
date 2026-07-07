/**
 * MCP Tools for Adwiser
 *
 * 9 tools registered:
 *  - get_services
 *  - get_service_details
 *  - get_portfolio
 *  - get_testimonials
 *  - get_faqs
 *  - search_website
 *  - create_lead
 *  - book_consultation
 *  - get_contact_information
 */

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import {
  SERVICES,
  PORTFOLIO,
  TESTIMONIALS,
  FAQS,
  COMPANY,
  BLOG_POSTS,
} from "../src/data/index.js";

export function registerTools(server: McpServer): void {
  // ── get_services ──────────────────────────────────────────────────────────
  server.tool(
    "get_services",
    "List all services offered by Adwiser: Lead Generation, Website Development, and AI Automation. Returns full descriptions and feature lists.",
    async () => ({
      content: [
        {
          type: "text" as const,
          text: JSON.stringify({ services: SERVICES, total: SERVICES.length }, null, 2),
        },
      ],
    })
  );

  // ── get_service_details ───────────────────────────────────────────────────
  server.tool(
    "get_service_details",
    "Get detailed information about a specific Adwiser service by its ID.",
    {
      id: z
        .string()
        .describe("Service ID — one of: 'lead-gen', 'web-dev', 'ai-automation'"),
    },
    async ({ id }) => {
      const service = SERVICES.find((s) => s.id === id);
      if (!service) {
        return {
          content: [
            {
              type: "text" as const,
              text: `Service '${id}' not found. Available service IDs: ${SERVICES.map((s) => s.id).join(", ")}`,
            },
          ],
          isError: true,
        };
      }
      return {
        content: [{ type: "text" as const, text: JSON.stringify(service, null, 2) }],
      };
    }
  );

  // ── get_portfolio ─────────────────────────────────────────────────────────
  server.tool(
    "get_portfolio",
    "Browse Adwiser's portfolio of client projects. Optionally filter by industry category.",
    {
      category: z
        .string()
        .optional()
        .describe(
          "Optional category filter, e.g. 'Fintech SaaS', 'Healthcare', 'E-commerce', 'Creative Agency', 'Data Platform'"
        ),
    },
    async ({ category }) => {
      const filtered = category
        ? PORTFOLIO.filter((p) =>
            p.category.toLowerCase().includes(category.toLowerCase()) ||
            p.industry.toLowerCase().includes(category.toLowerCase())
          )
        : PORTFOLIO;
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify({ projects: filtered, total: filtered.length }, null, 2),
          },
        ],
      };
    }
  );

  // ── get_testimonials ──────────────────────────────────────────────────────
  server.tool(
    "get_testimonials",
    "Read client testimonials and success stories from Adwiser customers.",
    async () => ({
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(
            { testimonials: TESTIMONIALS, total: TESTIMONIALS.length },
            null,
            2
          ),
        },
      ],
    })
  );

  // ── get_faqs ──────────────────────────────────────────────────────────────
  server.tool(
    "get_faqs",
    "Get frequently asked questions about working with Adwiser. Optionally filter by keyword or category.",
    {
      search: z
        .string()
        .optional()
        .describe("Optional keyword to filter FAQs (searches question and answer text)"),
      category: z
        .enum(["timeline", "integrations", "services", "pricing", "results", "support"])
        .optional()
        .describe("Optional category filter"),
    },
    async ({ search, category }) => {
      let filtered = FAQS;
      if (category) {
        filtered = filtered.filter((f) => f.category === category);
      }
      if (search) {
        const q = search.toLowerCase();
        filtered = filtered.filter(
          (f) =>
            f.question.toLowerCase().includes(q) ||
            f.answer.toLowerCase().includes(q)
        );
      }
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify({ faqs: filtered, total: filtered.length }, null, 2),
          },
        ],
      };
    }
  );

  // ── search_website ────────────────────────────────────────────────────────
  server.tool(
    "search_website",
    "Search across all Adwiser content: services, portfolio, FAQs, testimonials, and blog posts.",
    {
      query: z.string().describe("Search query — keywords to search across all content"),
    },
    async ({ query }) => {
      const q = query.toLowerCase();
      const results: Array<{
        type: string;
        id: string;
        title: string;
        excerpt: string;
      }> = [];

      SERVICES.forEach((s) => {
        if (
          s.title.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.tagline.toLowerCase().includes(q) ||
          s.features.some((f) => f.toLowerCase().includes(q))
        ) {
          results.push({ type: "service", id: s.id, title: s.title, excerpt: s.description });
        }
      });

      PORTFOLIO.forEach((p) => {
        if (
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.industry.toLowerCase().includes(q)
        ) {
          results.push({
            type: "portfolio",
            id: p.id,
            title: p.name,
            excerpt: `${p.category} — ${p.description} (${p.metric})`,
          });
        }
      });

      FAQS.forEach((f) => {
        if (
          f.question.toLowerCase().includes(q) ||
          f.answer.toLowerCase().includes(q)
        ) {
          results.push({ type: "faq", id: f.id, title: f.question, excerpt: f.answer });
        }
      });

      TESTIMONIALS.forEach((t) => {
        if (
          t.review.toLowerCase().includes(q) ||
          t.name.toLowerCase().includes(q) ||
          t.company.toLowerCase().includes(q)
        ) {
          results.push({
            type: "testimonial",
            id: t.id,
            title: `${t.name} — ${t.company}`,
            excerpt: t.review,
          });
        }
      });

      BLOG_POSTS.forEach((b) => {
        if (
          b.title.toLowerCase().includes(q) ||
          b.excerpt.toLowerCase().includes(q) ||
          b.category.toLowerCase().includes(q) ||
          b.tags.some((tag) => tag.toLowerCase().includes(q))
        ) {
          results.push({ type: "blog", id: b.id, title: b.title, excerpt: b.excerpt });
        }
      });

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              { query, results, total: results.length },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // ── create_lead ───────────────────────────────────────────────────────────
  server.tool(
    "create_lead",
    "Submit a lead inquiry to Adwiser. Use this when a user wants to get in touch, learn more, or request a quote.",
    {
      email: z.string().email().describe("Email address of the person inquiring"),
      message: z.string().optional().describe("Optional message or context"),
      source: z
        .string()
        .optional()
        .describe("Lead source tag, e.g. 'mcp-claude', 'mcp-cursor'"),
    },
    async ({ email, message, source }) => {
      try {
        const baseUrl = process.env.NEXT_APP_URL ?? "http://localhost:3000";
        const res = await fetch(`${baseUrl}/api/contact`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            message,
            source: source ?? "mcp-server",
          }),
        });
        const data = (await res.json()) as {
          ok: boolean;
          id?: string;
          message?: string;
          error?: string;
        };
        if (data.ok) {
          return {
            content: [
              {
                type: "text" as const,
                text: `✅ Lead submitted successfully (ID: ${data.id}). The Adwiser team will reach out to ${email} within ${COMPANY.responseTime}.`,
              },
            ],
          };
        }
        return {
          content: [
            {
              type: "text" as const,
              text: `Could not submit lead: ${data.error ?? "Unknown error"}. Please contact Adwiser directly at ${COMPANY.email}.`,
            },
          ],
          isError: true,
        };
      } catch {
        return {
          content: [
            {
              type: "text" as const,
              text: `Could not connect to the Adwiser API. Please contact us directly:\n📧 ${COMPANY.email}\n📞 ${COMPANY.phone}\n🌐 ${COMPANY.website}`,
            },
          ],
        };
      }
    }
  );

  // ── book_consultation ─────────────────────────────────────────────────────
  server.tool(
    "book_consultation",
    "Book a free strategy consultation with Adwiser. Submits contact info and the team will confirm within 24 hours.",
    {
      email: z.string().email().describe("Email address to confirm the booking"),
      name: z.string().optional().describe("Full name (optional but recommended)"),
      preferred_time: z
        .string()
        .optional()
        .describe("Preferred time slot or timezone, e.g. 'Tuesday 2 PM PT'"),
    },
    async ({ email, name, preferred_time }) => {
      const messageParts = [
        "Consultation booking via MCP",
        name ? `Name: ${name}` : null,
        preferred_time ? `Preferred time: ${preferred_time}` : null,
      ].filter(Boolean);

      try {
        const baseUrl = process.env.NEXT_APP_URL ?? "http://localhost:3000";
        const res = await fetch(`${baseUrl}/api/contact`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            message: messageParts.join("\n"),
            source: "mcp-consultation",
          }),
        });
        const data = (await res.json()) as { ok: boolean; id?: string; error?: string };
        if (data.ok) {
          return {
            content: [
              {
                type: "text" as const,
                text: `✅ Consultation request confirmed for ${email}${name ? ` (${name})` : ""}.\n\nThe Adwiser team will reach out within ${COMPANY.responseTime} to schedule your free strategy session.\n\nAlternatively: ${COMPANY.website} | ${COMPANY.email}`,
              },
            ],
          };
        }
        return {
          content: [
            {
              type: "text" as const,
              text: `Could not submit booking. Please book directly at ${COMPANY.website} or email ${COMPANY.email}.`,
            },
          ],
          isError: true,
        };
      } catch {
        return {
          content: [
            {
              type: "text" as const,
              text: `To book a free strategy consultation:\n📧 Email: ${COMPANY.email}\n📞 Phone: ${COMPANY.phone}\n🌐 Website: ${COMPANY.website}\n\nMention your preferred date/time and the team will confirm within 24 hours.`,
            },
          ],
        };
      }
    }
  );

  // ── get_contact_information ───────────────────────────────────────────────
  server.tool(
    "get_contact_information",
    "Get Adwiser's contact details: email, phone number, location, social media links, and business hours.",
    async () => ({
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(
            {
              email: COMPANY.email,
              phone: COMPANY.phone,
              location: COMPANY.location,
              website: COMPANY.website,
              businessHours: COMPANY.businessHours,
              responseTime: COMPANY.responseTime,
              socials: COMPANY.socials,
            },
            null,
            2
          ),
        },
      ],
    })
  );
}

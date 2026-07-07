/**
 * Adwiser HTTP MCP Endpoint
 *
 * Implements the MCP JSON-RPC 2.0 protocol over HTTP for web-based AI clients.
 *
 * GET  /api/mcp  — Server info + capabilities overview
 * POST /api/mcp  — JSON-RPC 2.0 handler (tools, resources, prompts)
 *
 * Protocol version: 2024-11-05
 */

import { NextResponse, type NextRequest } from "next/server";
import {
  SERVICES,
  PORTFOLIO,
  TESTIMONIALS,
  FAQS,
  TEAM,
  COMPANY,
  BLOG_POSTS,
} from "@/data";

// ── CORS headers ─────────────────────────────────────────────────────────────
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
} as const;

// ── Server metadata ───────────────────────────────────────────────────────────
const SERVER_INFO = {
  name: "adwiser-mcp",
  version: "1.0.0",
  protocolVersion: "2024-11-05",
};

// ── Tool schemas (MCP wire format) ────────────────────────────────────────────
const TOOLS = [
  {
    name: "get_services",
    description:
      "List all services offered by Adwiser: Lead Generation, Website Development, and AI Automation.",
    inputSchema: { type: "object", properties: {}, required: [] },
  },
  {
    name: "get_service_details",
    description: "Get detailed information about a specific Adwiser service by its ID.",
    inputSchema: {
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "Service ID — one of: 'lead-gen', 'web-dev', 'ai-automation'",
        },
      },
      required: ["id"],
    },
  },
  {
    name: "get_portfolio",
    description: "Browse Adwiser's client portfolio. Optionally filter by industry category.",
    inputSchema: {
      type: "object",
      properties: {
        category: {
          type: "string",
          description:
            "Optional category filter (e.g. 'Fintech SaaS', 'Healthcare', 'E-commerce')",
        },
      },
    },
  },
  {
    name: "get_testimonials",
    description: "Read client testimonials and success stories from Adwiser customers.",
    inputSchema: { type: "object", properties: {}, required: [] },
  },
  {
    name: "get_faqs",
    description:
      "Get frequently asked questions about working with Adwiser. Optionally filter by keyword or category.",
    inputSchema: {
      type: "object",
      properties: {
        search: { type: "string", description: "Keyword filter (searches question and answer)" },
        category: {
          type: "string",
          enum: ["timeline", "integrations", "services", "pricing", "results", "support"],
          description: "Category filter",
        },
      },
    },
  },
  {
    name: "search_website",
    description:
      "Search across all Adwiser content: services, portfolio, FAQs, testimonials, and blog posts.",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search query" },
      },
      required: ["query"],
    },
  },
  {
    name: "create_lead",
    description:
      "Submit a lead inquiry to Adwiser. Use when a user wants to get in touch or request a quote.",
    inputSchema: {
      type: "object",
      properties: {
        email: { type: "string", format: "email", description: "Email address" },
        message: { type: "string", description: "Optional message or context" },
        source: { type: "string", description: "Lead source tag" },
      },
      required: ["email"],
    },
  },
  {
    name: "book_consultation",
    description: "Book a free strategy consultation with Adwiser.",
    inputSchema: {
      type: "object",
      properties: {
        email: { type: "string", format: "email", description: "Email address" },
        name: { type: "string", description: "Full name (optional)" },
        preferred_time: { type: "string", description: "Preferred time or timezone" },
      },
      required: ["email"],
    },
  },
  {
    name: "get_contact_information",
    description: "Get Adwiser's email, phone, location, and social media links.",
    inputSchema: { type: "object", properties: {}, required: [] },
  },
];

// ── Resource schemas ──────────────────────────────────────────────────────────
const RESOURCES = [
  {
    uri: "adwiser://services",
    name: "Services",
    description: "Adwiser's complete service catalog.",
    mimeType: "application/json",
  },
  {
    uri: "adwiser://portfolio",
    name: "Portfolio",
    description: "Client portfolio with metrics and results.",
    mimeType: "application/json",
  },
  {
    uri: "adwiser://blog",
    name: "Blog",
    description: "Adwiser blog articles on AI, lead generation, and web development.",
    mimeType: "application/json",
  },
  {
    uri: "adwiser://team",
    name: "Team",
    description: "Adwiser team members and bios.",
    mimeType: "application/json",
  },
  {
    uri: "adwiser://company",
    name: "Company",
    description: "Company info, contact details, and pricing model.",
    mimeType: "application/json",
  },
];

// ── Prompt schemas ────────────────────────────────────────────────────────────
const PROMPTS = [
  { name: "services-overview", description: "Comprehensive Adwiser services context." },
  { name: "pricing-inquiry", description: "Pricing model and contract information." },
  { name: "company-information", description: "Brand, mission, team, and contact details." },
  { name: "marketing-strategy", description: "Adwiser's digital growth methodology." },
  { name: "lead-generation", description: "Lead Generation service details and timeline." },
  { name: "website-development", description: "Website Development service, tech stack, and timeline." },
];

// ── Tool call handler ─────────────────────────────────────────────────────────
async function callTool(
  name: string,
  args: Record<string, unknown>
): Promise<{ content: Array<{ type: string; text: string }>; isError?: boolean }> {
  switch (name) {
    case "get_services":
      return {
        content: [
          { type: "text", text: JSON.stringify({ services: SERVICES, total: SERVICES.length }, null, 2) },
        ],
      };

    case "get_service_details": {
      const id = String(args.id ?? "");
      const service = SERVICES.find((s) => s.id === id);
      if (!service)
        return {
          content: [
            { type: "text", text: `Service '${id}' not found. Available: ${SERVICES.map((s) => s.id).join(", ")}` },
          ],
          isError: true,
        };
      return { content: [{ type: "text", text: JSON.stringify(service, null, 2) }] };
    }

    case "get_portfolio": {
      const category = args.category ? String(args.category) : undefined;
      const filtered = category
        ? PORTFOLIO.filter(
            (p) =>
              p.category.toLowerCase().includes(category.toLowerCase()) ||
              p.industry.toLowerCase().includes(category.toLowerCase())
          )
        : PORTFOLIO;
      return {
        content: [
          { type: "text", text: JSON.stringify({ projects: filtered, total: filtered.length }, null, 2) },
        ],
      };
    }

    case "get_testimonials":
      return {
        content: [
          { type: "text", text: JSON.stringify({ testimonials: TESTIMONIALS, total: TESTIMONIALS.length }, null, 2) },
        ],
      };

    case "get_faqs": {
      const search = args.search ? String(args.search) : undefined;
      const category = args.category ? String(args.category) : undefined;
      let filtered = FAQS;
      if (category) filtered = filtered.filter((f) => f.category === category);
      if (search) {
        const q = search.toLowerCase();
        filtered = filtered.filter(
          (f) => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)
        );
      }
      return {
        content: [
          { type: "text", text: JSON.stringify({ faqs: filtered, total: filtered.length }, null, 2) },
        ],
      };
    }

    case "search_website": {
      const query = String(args.query ?? "");
      const q = query.toLowerCase();
      const results: Array<{ type: string; id: string; title: string; excerpt: string }> = [];

      SERVICES.forEach((s) => {
        if (
          s.title.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.tagline.toLowerCase().includes(q)
        )
          results.push({ type: "service", id: s.id, title: s.title, excerpt: s.description });
      });
      PORTFOLIO.forEach((p) => {
        if (p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
          results.push({ type: "portfolio", id: p.id, title: p.name, excerpt: p.description });
      });
      FAQS.forEach((f) => {
        if (f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q))
          results.push({ type: "faq", id: f.id, title: f.question, excerpt: f.answer });
      });
      TESTIMONIALS.forEach((t) => {
        if (t.review.toLowerCase().includes(q) || t.company.toLowerCase().includes(q))
          results.push({ type: "testimonial", id: t.id, title: `${t.name} — ${t.company}`, excerpt: t.review });
      });
      BLOG_POSTS.forEach((b) => {
        if (b.title.toLowerCase().includes(q) || b.excerpt.toLowerCase().includes(q))
          results.push({ type: "blog", id: b.id, title: b.title, excerpt: b.excerpt });
      });

      return { content: [{ type: "text", text: JSON.stringify({ query, results, total: results.length }, null, 2) }] };
    }

    case "create_lead": {
      const email = String(args.email ?? "");
      const message = args.message ? String(args.message) : undefined;
      const source = args.source ? String(args.source) : "mcp-http";
      try {
        const baseUrl = process.env.NEXT_APP_URL ?? "http://localhost:3000";
        const res = await fetch(`${baseUrl}/api/contact`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, message, source }),
        });
        const data = (await res.json()) as { ok: boolean; id?: string; error?: string };
        if (data.ok)
          return {
            content: [
              { type: "text", text: `✅ Lead submitted (ID: ${data.id}). Adwiser will reach out to ${email} within ${COMPANY.responseTime}.` },
            ],
          };
        return {
          content: [{ type: "text", text: `Failed: ${data.error ?? "Unknown error"}. Contact: ${COMPANY.email}` }],
          isError: true,
        };
      } catch {
        return {
          content: [{ type: "text", text: `API unavailable. Contact directly: ${COMPANY.email} | ${COMPANY.phone}` }],
        };
      }
    }

    case "book_consultation": {
      const email = String(args.email ?? "");
      const name = args.name ? String(args.name) : undefined;
      const preferred_time = args.preferred_time ? String(args.preferred_time) : undefined;
      const message = ["Consultation booking via MCP HTTP", name && `Name: ${name}`, preferred_time && `Time: ${preferred_time}`].filter(Boolean).join("\n");
      try {
        const baseUrl = process.env.NEXT_APP_URL ?? "http://localhost:3000";
        const res = await fetch(`${baseUrl}/api/contact`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, message, source: "mcp-http-consultation" }),
        });
        const data = (await res.json()) as { ok: boolean; id?: string; error?: string };
        if (data.ok)
          return {
            content: [
              { type: "text", text: `✅ Consultation request for ${email} received. Adwiser will confirm within ${COMPANY.responseTime}.` },
            ],
          };
        return {
          content: [{ type: "text", text: `Could not book. Contact: ${COMPANY.email} or ${COMPANY.website}` }],
          isError: true,
        };
      } catch {
        return { content: [{ type: "text", text: `Book at: ${COMPANY.website} | Email: ${COMPANY.email} | Phone: ${COMPANY.phone}` }] };
      }
    }

    case "get_contact_information":
      return {
        content: [
          {
            type: "text",
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
      };

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

// ── Resource read handler ─────────────────────────────────────────────────────
function readResource(uri: string): { contents: Array<{ uri: string; mimeType: string; text: string }> } {
  const data: Record<string, unknown> = {
    "adwiser://services": { services: SERVICES, total: SERVICES.length },
    "adwiser://portfolio": { projects: PORTFOLIO, total: PORTFOLIO.length },
    "adwiser://blog": { posts: BLOG_POSTS, total: BLOG_POSTS.length },
    "adwiser://team": { team: TEAM, total: TEAM.length },
    "adwiser://company": COMPANY,
  };
  const content = data[uri];
  if (!content) throw new Error(`Unknown resource: ${uri}`);
  return { contents: [{ uri, mimeType: "application/json", text: JSON.stringify(content, null, 2) }] };
}

// ── Prompt get handler ────────────────────────────────────────────────────────
function getPrompt(name: string): { messages: Array<{ role: string; content: { type: string; text: string } }> } {
  const prompts: Record<string, string> = {
    "services-overview": `You are a knowledgeable assistant for ${COMPANY.name}.\n\nServices:\n${SERVICES.map((s) => `- **${s.title}**: ${s.description}`).join("\n")}\n\nContact: ${COMPANY.email} | ${COMPANY.website}`,
    "pricing-inquiry": `${COMPANY.name} pricing:\n- ${COMPANY.pricing.model}\n- ${COMPANY.pricing.cancellation}\n- ${COMPANY.pricing.enterprise}\n- ${COMPANY.pricing.consultation}`,
    "company-information": `${COMPANY.name} — ${COMPANY.tagline}\n${COMPANY.description}\n\nContact: ${COMPANY.email} | ${COMPANY.phone} | ${COMPANY.location}`,
    "marketing-strategy": `${COMPANY.name} Growth Framework:\n1. Attract — AI lead generation\n2. Convert — optimized websites\n3. Automate — custom AI agents\n4. Measure — live dashboards\n\nResults: ${COMPANY.stats.map((s) => `${s.label}: ${s.value}`).join(", ")}`,
    "lead-generation": `${SERVICES.find((s) => s.id === "lead-gen")?.description ?? ""}\n\nFeatures: ${SERVICES.find((s) => s.id === "lead-gen")?.features.join(", ")}\n\nTimeline: 1–2 weeks setup, leads within 2 weeks.`,
    "website-development": `${SERVICES.find((s) => s.id === "web-dev")?.description ?? ""}\n\nTech: Next.js, React 19, Tailwind CSS v4, Headless CMS\nTimeline: 7–14 days starter, 2–4 weeks custom.`,
  };
  const text = prompts[name];
  if (!text) throw new Error(`Unknown prompt: ${name}`);
  return { messages: [{ role: "user", content: { type: "text", text } }] };
}

// ── Route handlers ────────────────────────────────────────────────────────────
export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS });
}

export async function GET() {
  return NextResponse.json(
    {
      ...SERVER_INFO,
      endpoint: "/api/mcp",
      transport: "http",
      capabilities: { tools: {}, resources: {}, prompts: {} },
      tools: TOOLS.map((t) => t.name),
      resources: RESOURCES.map((r) => r.uri),
      prompts: PROMPTS.map((p) => p.name),
      description: "Adwiser MCP Server — AI-Powered Digital Growth",
      usage: "Send JSON-RPC 2.0 requests via POST to this endpoint.",
    },
    { headers: CORS }
  );
}

export async function POST(request: NextRequest) {
  let id: unknown;
  try {
    const body = (await request.json()) as {
      jsonrpc?: string;
      id?: unknown;
      method?: string;
      params?: Record<string, unknown>;
    };
    id = body.id;
    const method = body.method ?? "";
    const params = body.params ?? {};

    let result: unknown;

    switch (method) {
      case "initialize":
        result = {
          protocolVersion: SERVER_INFO.protocolVersion,
          capabilities: { tools: {}, resources: {}, prompts: {} },
          serverInfo: { name: SERVER_INFO.name, version: SERVER_INFO.version },
        };
        break;

      case "ping":
        result = {};
        break;

      case "tools/list":
        result = { tools: TOOLS };
        break;

      case "tools/call":
        result = await callTool(
          String((params as { name?: unknown }).name ?? ""),
          ((params as { arguments?: Record<string, unknown> }).arguments ?? {}) as Record<string, unknown>
        );
        break;

      case "resources/list":
        result = { resources: RESOURCES };
        break;

      case "resources/read":
        result = readResource(String((params as { uri?: unknown }).uri ?? ""));
        break;

      case "prompts/list":
        result = { prompts: PROMPTS };
        break;

      case "prompts/get":
        result = getPrompt(String((params as { name?: unknown }).name ?? ""));
        break;

      default:
        return NextResponse.json(
          { jsonrpc: "2.0", id, error: { code: -32601, message: `Method not found: ${method}` } },
          { status: 404, headers: CORS }
        );
    }

    return NextResponse.json({ jsonrpc: "2.0", id, result }, { headers: CORS });
  } catch (error) {
    return NextResponse.json(
      {
        jsonrpc: "2.0",
        id,
        error: {
          code: -32000,
          message: error instanceof Error ? error.message : String(error),
        },
      },
      { status: 500, headers: CORS }
    );
  }
}

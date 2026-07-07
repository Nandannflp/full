/**
 * MCP Resources for Adwiser
 *
 * 5 resources exposed at adwiser:// URI scheme:
 *  - adwiser://services
 *  - adwiser://portfolio
 *  - adwiser://blog
 *  - adwiser://team
 *  - adwiser://company
 */

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import {
  SERVICES,
  PORTFOLIO,
  BLOG_POSTS,
  TEAM,
  COMPANY,
} from "../src/data/index.js";

export function registerResources(server: McpServer): void {
  // ── adwiser://services ───────────────────────────────────────────────────
  server.resource(
    "services",
    "adwiser://services",
    {
      mimeType: "application/json",
      description:
        "Complete list of Adwiser's services: Lead Generation, Website Development, and AI Automation.",
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "application/json",
          text: JSON.stringify({ services: SERVICES, total: SERVICES.length }, null, 2),
        },
      ],
    })
  );

  // ── adwiser://portfolio ──────────────────────────────────────────────────
  server.resource(
    "portfolio",
    "adwiser://portfolio",
    {
      mimeType: "application/json",
      description:
        "Adwiser's portfolio of client projects with results and metrics.",
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "application/json",
          text: JSON.stringify(
            { projects: PORTFOLIO, total: PORTFOLIO.length },
            null,
            2
          ),
        },
      ],
    })
  );

  // ── adwiser://blog ───────────────────────────────────────────────────────
  server.resource(
    "blog",
    "adwiser://blog",
    {
      mimeType: "application/json",
      description: "Adwiser blog articles on AI, lead generation, and web development.",
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "application/json",
          text: JSON.stringify(
            { posts: BLOG_POSTS, total: BLOG_POSTS.length },
            null,
            2
          ),
        },
      ],
    })
  );

  // ── adwiser://team ───────────────────────────────────────────────────────
  server.resource(
    "team",
    "adwiser://team",
    {
      mimeType: "application/json",
      description:
        "Adwiser team members — founders, AI experts, and growth strategists.",
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "application/json",
          text: JSON.stringify({ team: TEAM, total: TEAM.length }, null, 2),
        },
      ],
    })
  );

  // ── adwiser://company ────────────────────────────────────────────────────
  server.resource(
    "company",
    "adwiser://company",
    {
      mimeType: "application/json",
      description:
        "Adwiser company information: brand, contact details, pricing model, and integrations.",
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "application/json",
          text: JSON.stringify(COMPANY, null, 2),
        },
      ],
    })
  );
}

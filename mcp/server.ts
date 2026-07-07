#!/usr/bin/env node
/**
 * Adwiser MCP Server — Stdio Transport
 *
 * Exposes all Adwiser content (services, portfolio, FAQs, team, company info)
 * as MCP tools, resources, and prompts consumable by Claude Desktop, Cursor,
 * Windsurf, and any MCP-compatible AI client.
 *
 * Usage:
 *   npm run mcp:start          # production
 *   npm run mcp:dev            # watch mode (auto-restart on changes)
 *
 * Claude Desktop config (~/.config/claude/claude_desktop_config.json):
 *   {
 *     "mcpServers": {
 *       "adwiser": {
 *         "command": "npx",
 *         "args": ["tsx", "D:\\Download\\full stack website\\mcp\\server.ts"],
 *         "env": { "NEXT_APP_URL": "http://localhost:3000" }
 *       }
 *     }
 *   }
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerTools } from "./tools.js";
import { registerResources } from "./resources.js";
import { registerPrompts } from "./prompts.js";

// ── Server definition ────────────────────────────────────────────────────────
const server = new McpServer({
  name: "adwiser-mcp",
  version: "1.0.0",
});

// ── Register capabilities ────────────────────────────────────────────────────
registerTools(server);
registerResources(server);
registerPrompts(server);

// ── Start ────────────────────────────────────────────────────────────────────
async function main(): Promise<void> {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  // Use stderr so stdout stays clean for the MCP protocol
  process.stderr.write(
    "✅ Adwiser MCP server started (stdio transport)\n" +
      "   Tools: 9 | Resources: 5 | Prompts: 6\n"
  );
}

main().catch((error: unknown) => {
  process.stderr.write(`Fatal error starting Adwiser MCP server: ${String(error)}\n`);
  process.exit(1);
});

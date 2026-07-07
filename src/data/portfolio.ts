/**
 * Adwiser Portfolio — single source of truth.
 * Extracted from showcase.tsx PROJECTS array.
 */

export interface PortfolioProject {
  id: string;
  name: string;
  category: string;
  description: string;
  metric: string;
  industry: string;
}

export const PORTFOLIO: PortfolioProject[] = [
  {
    id: "nebula-finance",
    name: "Nebula Finance",
    category: "Fintech SaaS",
    description: "AI-powered portfolio dashboard with real-time analytics.",
    metric: "+212% conversions",
    industry: "Finance",
  },
  {
    id: "lumen-health",
    name: "Lumen Health",
    category: "Healthcare",
    description: "Patient engagement platform with AI triage assistant.",
    metric: "98% satisfaction",
    industry: "Healthcare",
  },
  {
    id: "vertex-commerce",
    name: "Vertex Commerce",
    category: "E-commerce",
    description: "Headless storefront with AI product recommendations.",
    metric: "+340% AOV",
    industry: "Retail",
  },
  {
    id: "orbit-studio",
    name: "Orbit Studio",
    category: "Creative Agency",
    description: "Award-winning portfolio with immersive motion design.",
    metric: "5 awards won",
    industry: "Creative",
  },
  {
    id: "pulse-analytics",
    name: "Pulse Analytics",
    category: "Data Platform",
    description: "Real-time data visualization suite for enterprises.",
    metric: "10M+ events/day",
    industry: "Analytics",
  },
];

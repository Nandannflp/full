/**
 * Adwiser Blog Articles — placeholder content.
 * Replace with database-backed posts when a blog is built.
 */

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  category: string;
  tags: string[];
  publishedAt: string;
  readTime: string;
  author: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "ai-lead-gen-2024",
    title: "How AI Is Transforming Lead Generation in 2024",
    slug: "ai-lead-generation-2024",
    excerpt:
      "From intent scoring to automated nurture sequences — a deep dive into how modern AI tools are delivering 3× more qualified leads than traditional methods.",
    category: "Lead Generation",
    tags: ["AI", "lead generation", "intent scoring", "automation"],
    publishedAt: "2024-11-01",
    readTime: "6 min",
    author: "Alex Carter",
  },
  {
    id: "nextjs-conversion-optimization",
    title: "Next.js for Conversion: Why Your Tech Stack Matters",
    slug: "nextjs-conversion-optimization",
    excerpt:
      "We analyzed 50+ client websites and found that Core Web Vitals improvements alone drove an average 28% increase in conversions. Here's exactly how we do it.",
    category: "Website Development",
    tags: ["Next.js", "performance", "Core Web Vitals", "conversion"],
    publishedAt: "2024-10-15",
    readTime: "8 min",
    author: "David Chen",
  },
  {
    id: "custom-ai-agents-guide",
    title: "Building Custom AI Agents: Beyond the Generic Chatbot",
    slug: "custom-ai-agents-guide",
    excerpt:
      "Generic chatbots answer FAQs. Custom AI agents close deals, qualify leads, and run entire support operations. This is the difference — and how to build it right.",
    category: "AI Automation",
    tags: ["AI agents", "automation", "chatbot", "lead qualification"],
    publishedAt: "2024-09-20",
    readTime: "10 min",
    author: "Sarah Jenkins",
  },
];

/**
 * Adwiser Team — single source of truth.
 * Extracted from founder-team.tsx TEAM array.
 */

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  socials?: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

export const TEAM: TeamMember[] = [
  {
    id: "alex-carter",
    name: "Alex Carter",
    role: "Founder & CEO",
    bio: "Former growth lead at top tech firms, obsessed with AI-driven scaling.",
    socials: {
      linkedin: "https://linkedin.com/in/alex-carter",
      twitter: "https://twitter.com/alexcarter",
    },
  },
  {
    id: "sarah-jenkins",
    name: "Sarah Jenkins",
    role: "Head of AI Automation",
    bio: "AI researcher turned automation expert. Builds systems that work 24/7.",
    socials: {
      linkedin: "https://linkedin.com/in/sarah-jenkins",
    },
  },
  {
    id: "david-chen",
    name: "David Chen",
    role: "Lead Strategist",
    bio: "Data-driven marketer focusing on conversion rate optimization and funnels.",
    socials: {
      linkedin: "https://linkedin.com/in/david-chen",
      twitter: "https://twitter.com/davidchen",
    },
  },
];

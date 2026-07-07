/**
 * Adwiser Testimonials — single source of truth.
 * Extracted from testimonials.tsx TESTIMONIALS array.
 */

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  review: string;
  rating: number;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "sarah-chen",
    name: "Sarah Chen",
    role: "CEO",
    company: "Nebula Finance",
    review:
      "Adwiser transformed our lead pipeline. Within 3 months we saw a 212% increase in qualified leads. Their AI automation runs our entire nurture sequence.",
    rating: 5,
  },
  {
    id: "marcus-reid",
    name: "Marcus Reid",
    role: "Founder",
    company: "Vertex Commerce",
    review:
      "The website they built is genuinely award-worthy. Fast, beautiful, and it converts. Our AOV jumped 340% after launch. Worth every penny.",
    rating: 5,
  },
  {
    id: "aisha-patel",
    name: "Aisha Patel",
    role: "CMO",
    company: "Lumen Health",
    review:
      "Their AI assistant handles patient triage 24/7. Satisfaction hit 98% and our team finally has bandwidth to focus on care, not admin.",
    rating: 5,
  },
  {
    id: "david-kim",
    name: "David Kim",
    role: "Director",
    company: "Orbit Studio",
    review:
      "Working with Adwiser felt like adding a senior growth team overnight. Strategic, fast, and relentlessly focused on results.",
    rating: 5,
  },
  {
    id: "elena-voss",
    name: "Elena Voss",
    role: "VP Growth",
    company: "Pulse Analytics",
    review:
      "We process 10M+ events a day and their dashboards make it all legible. The automation alone saved us 30 hours a week.",
    rating: 5,
  },
  {
    id: "tom-bradley",
    name: "Tom Bradley",
    role: "Owner",
    company: "Bradley & Co",
    review:
      "I've worked with many agencies. None come close to Adwiser's blend of design taste and technical depth. True partners.",
    rating: 5,
  },
];

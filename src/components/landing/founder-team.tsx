"use client";

import { motion } from "framer-motion";
import { Linkedin, Twitter, Mail } from "lucide-react";
import { SectionHeading } from "./section-heading";

const EASE = [0.16, 1, 0.3, 1] as const;

const TEAM = [
  {
    name: "Alex Carter",
    role: "Founder & CEO",
    bio: "Former growth lead at top tech firms, obsessed with AI-driven scaling.",
    initials: "AC",
    gradient: "from-[#3b82f6] to-[#06b6d4]",
  },
  {
    name: "Sarah Jenkins",
    role: "Head of AI Automation",
    bio: "AI researcher turned automation expert. Builds systems that work 24/7.",
    initials: "SJ",
    gradient: "from-rose-500 to-orange-500",
  },
  {
    name: "David Chen",
    role: "Lead Strategist",
    bio: "Data-driven marketer focusing on conversion rate optimization and funnels.",
    initials: "DC",
    gradient: "from-purple-500 to-pink-500",
  },
];

export function FounderTeam() {
  return (
    <section id="founder-team" className="relative mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
      <SectionHeading
        kicker="The Team"
        title="Meet the minds behind"
        titleHighlight="Adwiser"
        description="A collective of growth hackers, AI experts, and strategists dedicated to scaling your business."
      />

      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {TEAM.map((member, i) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
            className="group relative flex flex-col items-center rounded-3xl glass-card p-8 text-center transition-all duration-300 hover:glow-blue"
          >
            <div className="relative mb-6">
              <div
                className={`flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br ${member.gradient} text-3xl font-bold text-white shadow-xl ring-4 ring-background transition-transform duration-500 group-hover:scale-110`}
              >
                {member.initials}
              </div>
              <div className="absolute -inset-2 -z-10 rounded-full bg-gradient-to-br opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-50" />
            </div>

            <h3 className="text-xl font-bold text-foreground">{member.name}</h3>
            <p className="mt-1 text-sm font-medium text-[#38bdf8]">{member.role}</p>
            <p className="mt-4 text-sm text-muted-foreground">{member.bio}</p>

            <div className="mt-6 flex items-center gap-4 text-muted-foreground">
              <a href="#" className="transition-colors hover:text-foreground">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="#" className="transition-colors hover:text-foreground">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="transition-colors hover:text-foreground">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

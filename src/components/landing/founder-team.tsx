"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeading } from "./section-heading";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FOUNDERS = [
  {
    id: "founder",
    name: "Mr. Yuvraj Singh",
    role: "Founder & CEO",
    bio: "5+ years in digital marketing and lead generation",
    details: "Worked with Tata Motors and Royal Enfield",
    image: "/Founder.png",
    bgText: "5+",
    skills: ["Digital Marketer", "Lead Generation Expert"],
    size: "large",
  },
  {
    id: "cofounder",
    name: "Mr. Nandan Shetye",
    role: "Co-Founder & AI Expert",
    bio: "2+ years in AI, design, development, and content creation",
    details: "AI Expert • Graphic Designer • Web Developer • Content Creator",
    image: "/Co-founder.png",
    bgText: "2+",
    skills: ["AI Expert", "Full-Stack Dev", "Designer"],
    size: "medium",
  },
];

export function FounderTeam() {
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const bgTextRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Heading Animation
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );

      // Desktop Animations
      mm.add("(min-width: 768px)", () => {
        cardsRef.current.forEach((card, i) => {
          if (!card) return;
          const isLeft = i === 0;
          
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 75%",
            },
          });

          // Slide card in from sides
          tl.fromTo(
            card,
            { opacity: 0, x: isLeft ? -80 : 80, scale: 0.85 },
            { opacity: 1, x: 0, scale: 1, duration: 1, ease: "power3.out" }
          );

          // Reveal background text
          if (bgTextRefs.current[i]) {
            tl.fromTo(
              bgTextRefs.current[i],
              { opacity: 0, scale: 0.9, y: 20 },
              { opacity: 1, scale: 1, y: 0, duration: 1, ease: "power2.out" },
              "-=0.6"
            );
          }

          // Stagger skill pills
          const skills = card.querySelectorAll(".skill-pill");
          if (skills.length) {
            tl.fromTo(
              skills,
              { opacity: 0, y: 15 },
              { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, ease: "back.out(1.5)" },
              "-=0.5"
            );
          }
        });
      });

      // Mobile Animations
      mm.add("(max-width: 767px)", () => {
        cardsRef.current.forEach((card, i) => {
          if (!card) return;
          
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
          });

          // Fade up
          tl.fromTo(
            card,
            { opacity: 0, y: 80, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" }
          );

          // Reveal background text
          if (bgTextRefs.current[i]) {
            tl.fromTo(
              bgTextRefs.current[i],
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
              "-=0.4"
            );
          }
        });
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="founder-team"
      className="relative mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:py-32 overflow-hidden"
    >
      <div ref={headingRef}>
        <SectionHeading
          kicker="The Founders"
          title="Meet the minds behind"
          titleHighlight="Adwiser"
          description="A collective of growth hackers, AI experts, and strategists dedicated to scaling your business."
        />
      </div>

      {/* Embedded Styles for Hover Effects */}
      <style>{`
        .founder-card {
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
        }
        .founder-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.1), 0 0 40px color-mix(in srgb, var(--color-primary) 15%, transparent);
        }
        .founder-image-wrapper {
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .founder-card:hover .founder-image-wrapper {
          transform: scale(1.03);
        }
        .bg-typography {
          mix-blend-mode: overlay;
          -webkit-text-stroke: 1px color-mix(in srgb, var(--color-primary) 10%, transparent);
        }
      `}</style>

      <div className="mt-20 md:mt-32 flex flex-col md:flex-row items-center justify-between gap-16 md:gap-8 relative z-10">
        
        {/* Founder Card - Dominant / Left */}
        <div
          ref={(el) => { cardsRef.current[0] = el; }}
          className="relative w-full md:w-[55%] flex flex-col items-center md:items-start group founder-card rounded-[2.5rem] bg-surface/50 backdrop-blur-xl border border-white/10 p-6 md:p-10"
        >
          {/* Background Typography */}
          <div
            ref={(el) => { bgTextRefs.current[0] = el; }}
            className="absolute top-0 left-1/2 md:left-0 -translate-x-1/2 md:translate-x-[-15%] -translate-y-[45%] md:-translate-y-[30%] z-0 pointer-events-none"
          >
            <span className="font-display font-black tracking-tighter text-[110px] sm:text-[140px] md:text-[200px] lg:text-[240px] text-transparent bg-clip-text bg-gradient-to-b from-primary/10 to-transparent bg-typography uppercase leading-none whitespace-nowrap">
              {FOUNDERS[0].bgText}
            </span>
          </div>

          <div className="relative z-10 w-full flex flex-col items-center md:items-start">
            <div className="relative w-full aspect-[4/5] md:aspect-square max-w-[420px] rounded-3xl overflow-hidden mb-8 founder-image-wrapper ring-1 ring-white/10 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent z-10 mix-blend-overlay"></div>
              <Image
                src={FOUNDERS[0].image}
                alt={FOUNDERS[0].name}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 55vw"
                priority
              />
            </div>
            
            <div className="w-full text-center md:text-left">
              <h3 className="font-display text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
                {FOUNDERS[0].name}
              </h3>
              <p className="mt-2 text-primary font-bold tracking-wide uppercase text-sm md:text-base">
                {FOUNDERS[0].role}
              </p>
              
              <p className="mt-4 text-muted-foreground text-base md:text-lg leading-relaxed max-w-md mx-auto md:mx-0">
                {FOUNDERS[0].bio}
              </p>
              <p className="mt-2 text-foreground/80 font-medium max-w-md mx-auto md:mx-0">
                {FOUNDERS[0].details}
              </p>
              
              <div className="mt-6 flex flex-wrap gap-2 justify-center md:justify-start">
                {FOUNDERS[0].skills.map((skill) => (
                  <span
                    key={skill}
                    className="skill-pill px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider border border-primary/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Co-Founder Card - Slightly smaller / Right */}
        <div
          ref={(el) => { cardsRef.current[1] = el; }}
          className="relative w-full md:w-[45%] flex flex-col items-center md:items-end group founder-card rounded-[2.5rem] bg-surface/30 backdrop-blur-lg border border-white/5 p-6 md:p-8 md:mt-24"
        >
          {/* Background Typography */}
          <div
            ref={(el) => { bgTextRefs.current[1] = el; }}
            className="absolute top-0 right-1/2 md:right-0 translate-x-1/2 md:translate-x-[15%] -translate-y-[45%] md:-translate-y-[20%] z-0 pointer-events-none"
          >
            <span className="font-display font-black tracking-tighter text-[100px] sm:text-[120px] md:text-[160px] lg:text-[190px] text-transparent bg-clip-text bg-gradient-to-b from-secondary/10 to-transparent bg-typography uppercase leading-none whitespace-nowrap">
              {FOUNDERS[1].bgText}
            </span>
          </div>

          <div className="relative z-10 w-full flex flex-col items-center md:items-end">
            <div className="relative w-full aspect-[4/5] md:aspect-[3/4] max-w-[340px] rounded-3xl overflow-hidden mb-6 founder-image-wrapper ring-1 ring-white/10 shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-bl from-secondary/20 to-transparent z-10 mix-blend-overlay"></div>
              <Image
                src={FOUNDERS[1].image}
                alt={FOUNDERS[1].name}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 45vw"
              />
            </div>
            
            <div className="w-full text-center md:text-right">
              <h3 className="font-display text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">
                {FOUNDERS[1].name}
              </h3>
              <p className="mt-2 text-secondary font-bold tracking-wide uppercase text-sm">
                {FOUNDERS[1].role}
              </p>
              
              <p className="mt-4 text-muted-foreground text-sm md:text-base leading-relaxed max-w-sm ml-auto mr-auto md:mr-0">
                {FOUNDERS[1].bio}
              </p>
              <p className="mt-2 text-foreground/80 text-sm font-medium max-w-sm ml-auto mr-auto md:mr-0">
                {FOUNDERS[1].details}
              </p>
              
              <div className="mt-6 flex flex-wrap gap-2 justify-center md:justify-end">
                {FOUNDERS[1].skills.map((skill) => (
                  <span
                    key={skill}
                    className="skill-pill px-3 py-1.5 rounded-full bg-secondary/10 text-secondary text-[0.7rem] font-bold uppercase tracking-wider border border-secondary/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

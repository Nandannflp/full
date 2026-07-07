"use client";

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import {
  gsap,
  ScrollTrigger,
  SplitText,
  CustomEase,
} from "@/lib/gsap";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Sparkles, ChevronDown } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Service {
  id: number;
  title: string;
  tagline: string;
  description: string;
  benefit: string;
  color: string;
  rgb: string;
  dim: string; // dimmed / 20% opacity version
  category: string;
  cta: string;
  icon: string; // unicode symbol
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const SERVICES: Service[] = [
  {
    id: 1,
    title: "Personal\nBranding",
    tagline: "Define your icon",
    description:
      "Craft a compelling personal brand that positions you as the definitive authority in your field — with a visual identity, voice, and story that resonate instantly.",
    benefit: "Stand out with a brand that speaks before you do",
    color: "#8B5CF6",
    rgb: "139,92,246",
    dim: "rgba(139,92,246,0.12)",
    category: "01 — Brand & Identity",
    cta: "Build My Brand",
    icon: "◈",
  },
  {
    id: 2,
    title: "Content\nStrategy",
    tagline: "Content that converts",
    description:
      "Data-backed content strategies that grow your audience and turn every post, reel, and article into a revenue-generating asset working around the clock.",
    benefit: "Every piece of content moves the needle measurably",
    color: "#06B6D4",
    rgb: "6,182,212",
    dim: "rgba(6,182,212,0.12)",
    category: "02 — Growth & Content",
    cta: "Plan My Content",
    icon: "◉",
  },
  {
    id: 3,
    title: "Meta\nAds",
    tagline: "Precision at scale",
    description:
      "High-converting Meta ad campaigns engineered with a creative-first strategy, audience intelligence, and continuous AI-powered optimization for maximum ROAS.",
    benefit: "3× average ROAS for clients in the first 60 days",
    color: "#3B82F6",
    rgb: "59,130,246",
    dim: "rgba(59,130,246,0.12)",
    category: "03 — Paid Social",
    cta: "Launch Campaign",
    icon: "⬡",
  },
  {
    id: 4,
    title: "Google\nAds",
    tagline: "Intent meets impact",
    description:
      "Capture high-intent buyers at exactly the right moment with precision-tuned search, display, Performance Max, and shopping campaigns that turn clicks into customers.",
    benefit: "Appear when your customers are ready to buy",
    color: "#F59E0B",
    rgb: "245,158,11",
    dim: "rgba(245,158,11,0.12)",
    category: "04 — Paid Search",
    cta: "Start Advertising",
    icon: "◎",
  },
  {
    id: 5,
    title: "Snapchat\nAds",
    tagline: "Gen Z growth engine",
    description:
      "Reach the most engaged young audience through full-screen immersive Snap ads, AR lenses, and story formats built for the scroll-stop generation.",
    benefit: "Access 750M+ monthly users with premium placements",
    color: "#FBBF24",
    rgb: "251,191,36",
    dim: "rgba(251,191,36,0.12)",
    category: "05 — Paid Social",
    cta: "Run Snap Ads",
    icon: "◐",
  },
  {
    id: 6,
    title: "OTT\nAds",
    tagline: "Stream your story",
    description:
      "Deliver unskippable premium ads across leading streaming platforms — reaching cord-cutters and digital natives where they're most attentive and brand-receptive.",
    benefit: "TV-level reach with surgical digital precision",
    color: "#EF4444",
    rgb: "239,68,68",
    dim: "rgba(239,68,68,0.12)",
    category: "06 — Connected TV",
    cta: "Go Live",
    icon: "▶",
  },
  {
    id: 7,
    title: "Lead\nGeneration",
    tagline: "Qualified on autopilot",
    description:
      "AI-powered lead funnels that capture, score, and nurture your ideal prospects 24/7 — syncing qualified leads directly to your CRM without you lifting a finger.",
    benefit: "+212% qualified leads within 90 days — guaranteed",
    color: "#10B981",
    rgb: "16,185,129",
    dim: "rgba(16,185,129,0.12)",
    category: "07 — Growth",
    cta: "Generate Leads",
    icon: "◬",
  },
  {
    id: 8,
    title: "Poster\nDesigning",
    tagline: "Visual impact engineered",
    description:
      "High-impact poster and graphic design that stops thumbs mid-scroll — commanding instant attention across digital feeds, print media, and event promotions.",
    benefit: "Every design CRO-optimised for maximum visual impact",
    color: "#EC4899",
    rgb: "236,72,153",
    dim: "rgba(236,72,153,0.12)",
    category: "08 — Design",
    cta: "Design My Poster",
    icon: "◧",
  },
  {
    id: 9,
    title: "Thumbnail\nDesigning",
    tagline: "Click-worthy frames",
    description:
      "Custom thumbnails scientifically designed using eye-tracking principles to maximise click-through rates on YouTube, social feeds, and content discovery platforms.",
    benefit: "Up to 40% higher CTR vs. generic thumbnails",
    color: "#F97316",
    rgb: "249,115,22",
    dim: "rgba(249,115,22,0.12)",
    category: "09 — Design",
    cta: "Get Thumbnails",
    icon: "◫",
  },
  {
    id: 10,
    title: "Instagram\nBan Support",
    tagline: "Restore and protect",
    description:
      "Expert account recovery for banned or restricted Instagram accounts — fast, reliable resolutions with ongoing monitoring and protection strategies post-reinstatement.",
    benefit: "94% account recovery rate within 48 hours",
    color: "#A855F7",
    rgb: "168,85,247",
    dim: "rgba(168,85,247,0.12)",
    category: "10 — Account Support",
    cta: "Recover Account",
    icon: "◍",
  },
  {
    id: 11,
    title: "Video\nEditing",
    tagline: "Stories that stick",
    description:
      "Cinematic video editing for reels, YouTube, brand films, and paid ads — colour-graded, sound-designed, and paced to command attention and drive real engagement.",
    benefit: "2× higher engagement on professionally edited content",
    color: "#6366F1",
    rgb: "99,102,241",
    dim: "rgba(99,102,241,0.12)",
    category: "11 — Video Production",
    cta: "Edit My Video",
    icon: "⬟",
  },
  {
    id: 12,
    title: "Copyright\nSupport",
    tagline: "Protect your work",
    description:
      "Resolve copyright strikes, impersonation issues, and IP disputes across all major social platforms — fast, decisive, with platform-certified expertise on your side.",
    benefit: "Platform-certified experts. Fast, decisive resolutions.",
    color: "#F43F5E",
    rgb: "244,63,94",
    dim: "rgba(244,63,94,0.12)",
    category: "12 — Legal & Support",
    cta: "Get Protection",
    icon: "◈",
  },
];

// ─── Abstract SVG Morphing Shapes (400 × 400 viewBox) ────────────────────────
// Each shape is a closed polygon path compatible with MorphSVGPlugin.

const SHAPES: string[] = [
  // 01 Personal Branding — 5-point star
  "M200,60 L235,152 L343,154 L257,219 L288,322 L200,260 L112,322 L143,219 L57,154 L165,152 Z",
  // 02 Content Strategy — hexagon
  "M200,60 L321,130 L321,270 L200,340 L79,270 L79,130 Z",
  // 03 Meta Ads — 4-point cross star
  "M340,200 L241,241 L200,340 L159,241 L60,200 L159,159 L200,60 L241,159 Z",
  // 04 Google Ads — 12-gon (near circle)
  "M200,60 L270,79 L321,130 L340,200 L321,270 L270,321 L200,340 L130,321 L79,270 L60,200 L79,130 L130,79 Z",
  // 05 Snapchat Ads — pentagon
  "M200,60 L333,157 L282,313 L118,313 L67,157 Z",
  // 06 OTT Ads — diamond
  "M200,60 L340,200 L200,340 L60,200 Z",
  // 07 Lead Generation — triangle
  "M200,60 L340,320 L60,320 Z",
  // 08 Poster Designing — 6-point star (12 vertices)
  "M200,60 L233,144 L321,130 L265,200 L321,270 L233,256 L200,340 L167,256 L79,270 L135,200 L79,130 L167,144 Z",
  // 09 Thumbnail — wide rectangle
  "M60,145 L340,145 L340,255 L60,255 Z",
  // 10 Instagram — octagon
  "M200,70 L292,108 L330,200 L292,292 L200,330 L108,292 L70,200 L108,108 Z",
  // 11 Video Editing — 3-point star
  "M200,60 L252,170 L321,270 L200,260 L79,270 L148,170 Z",
  // 12 Copyright — inverted pentagon
  "M200,340 L67,243 L118,87 L282,87 L333,243 Z",
];

// ─── Particle positions for background ambience ───────────────────────────────
const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  x: 5 + (i * 17) % 90,
  y: 3 + (i * 23) % 94,
  size: 1 + (i % 3) * 0.5,
  delay: (i * 0.4) % 4,
  dur: 3 + (i % 4),
}));

// ─── Component ────────────────────────────────────────────────────────────────

export default function ServicesHub() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const pinTargetRef = useRef<HTMLDivElement>(null);
  const morphPathRef = useRef<SVGPathElement>(null);
  const morphEchoRef = useRef<SVGPathElement>(null);
  const glowBlobRef = useRef<HTMLDivElement>(null);
  const navCounterRef = useRef<HTMLSpanElement>(null);
  const bgNumRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);

  // Panel refs (one per service)
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  // SplitText instances (one per service)
  const splitCache = useRef<(SplitText | null)[]>(
    new Array(SERVICES.length).fill(null)
  );
  // Orbit dot refs
  const orbitDotRefs = useRef<(SVGCircleElement | null)[]>([]);

  useGSAP(
    () => {
      // ── Custom eases ────────────────────────────────────────────────────
      CustomEase.create("cinematic", "M0,0 C0.16,1 0.3,1 1,1");
      CustomEase.create("snap", "M0,0 C0.9,0.01 0.98,1 1,1");
      CustomEase.create("luxe", "M0,0 C0.25,0.1 0.25,1 1,1");

      // ── Internal state (no React re-renders during scroll) ───────────────
      let activeIdx = 0;

      // ── Helpers ──────────────────────────────────────────────────────────

      const updateDots = (idx: number) => {
        document.querySelectorAll<HTMLElement>("[data-dot]").forEach((dot) => {
          const i = Number(dot.dataset.dot);
          gsap.to(dot, {
            scale: i === idx ? 2 : 1,
            opacity: i === idx ? 1 : 0.2,
            duration: 0.35,
            ease: "power2.out",
            overwrite: true,
          });
          dot.style.background =
            i === idx ? SERVICES[idx].color : "rgba(255,255,255,0.4)";
        });
      };

      const updateChrome = (idx: number) => {
        const svc = SERVICES[idx];
        // Nav counter colour
        if (navCounterRef.current) {
          navCounterRef.current.textContent = `${String(idx + 1).padStart(2, "0")} / ${SERVICES.length}`;
          navCounterRef.current.style.color = svc.color;
        }
        // Big BG number
        if (bgNumRef.current)
          bgNumRef.current.textContent = String(idx + 1).padStart(2, "0");
        // Bottom counter
        if (counterRef.current)
          counterRef.current.textContent = `${String(idx + 1).padStart(2, "0")} — ${String(SERVICES.length).padStart(2, "0")}`;
        // Glow blob colour
        if (glowBlobRef.current)
          glowBlobRef.current.style.background = `radial-gradient(ellipse 65% 65% at 50% 50%, rgba(${svc.rgb},0.18) 0%, transparent 70%)`;
        // Progress fill colour
        const pf = document.querySelector<HTMLElement>(".progress-fill");
        if (pf) pf.style.background = svc.color;
        // Morph path stroke
        if (morphPathRef.current)
          morphPathRef.current.setAttribute("stroke", svc.color);
        // Nav dot update
        updateDots(idx);
      };

      // ── Animate out ──────────────────────────────────────────────────────

      const animateOut = (idx: number, dir: 1 | -1) => {
        const panel = panelRefs.current[idx];
        if (!panel) return;

        gsap.killTweensOf(panel);

        // Chars out
        if (splitCache.current[idx]) {
          const sp = splitCache.current[idx]!;
          gsap.killTweensOf(sp.chars);
          gsap.to(sp.chars, {
            y: dir * -38,
            opacity: 0,
            stagger: { amount: 0.1, from: "end" },
            duration: 0.28,
            ease: "snap",
            onComplete: () => {
              sp.revert();
              splitCache.current[idx] = null;
            },
          });
        }

        gsap.to(
          [
            panel.querySelector(".svc-tagline"),
            panel.querySelector(".svc-desc"),
            panel.querySelector(".svc-benefit"),
            panel.querySelector(".svc-cta"),
          ].filter(Boolean),
          { opacity: 0, y: dir * -16, stagger: 0.03, duration: 0.22, ease: "snap" }
        );

        gsap.to(panel, {
          autoAlpha: 0,
          y: dir * -45,
          duration: 0.32,
          ease: "snap",
          delay: 0.04,
        });
      };

      // ── Animate in ───────────────────────────────────────────────────────

      const animateIn = (idx: number, dir: 1 | -1, isFirst = false) => {
        const panel = panelRefs.current[idx];
        if (!panel) return;

        const svc = SERVICES[idx];
        gsap.killTweensOf(panel);

        // Position & show panel
        gsap.set(panel, { autoAlpha: 1, y: isFirst ? 0 : dir * 52 });
        if (!isFirst) {
          gsap.to(panel, { y: 0, duration: 0.55, ease: "cinematic" });
        }

        const delay = isFirst ? 0.55 : 0.08;

        // SplitText title
        const titleEl = panel.querySelector<HTMLElement>(".svc-title");
        if (titleEl) {
          if (splitCache.current[idx]) {
            splitCache.current[idx]?.revert();
            splitCache.current[idx] = null;
          }
          // Reset inner HTML so newlines become breaks
          titleEl.innerHTML = svc.title.replace("\n", "<br/>");
          const split = new SplitText(titleEl, { type: "chars,words" });
          splitCache.current[idx] = split;

          gsap.fromTo(
            split.chars,
            { y: isFirst ? 65 : dir * 48, opacity: 0, rotateX: isFirst ? -20 : dir * -15 },
            {
              y: 0,
              opacity: 1,
              rotateX: 0,
              stagger: { amount: 0.32, from: "start" },
              duration: 0.65,
              ease: "cinematic",
              delay,
            }
          );
        }

        // Category label
        gsap.fromTo(
          panel.querySelector(".svc-category"),
          { opacity: 0, x: -22 },
          { opacity: 1, x: 0, duration: 0.4, ease: "power2.out", delay: delay - 0.1 }
        );

        // DrawSVG accent line
        const line = panel.querySelector<SVGPathElement>(".svc-line");
        if (line) {
          gsap.set(line, { drawSVG: "0% 0%" });
          gsap.to(line, {
            drawSVG: "0% 100%",
            duration: 0.9,
            ease: "power2.inOut",
            delay: delay + 0.15,
          });
        }

        // Tagline
        gsap.fromTo(
          panel.querySelector(".svc-tagline"),
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", delay: delay + 0.2 }
        );

        // Description — ScrambleText
        const descEl = panel.querySelector<HTMLElement>(".svc-desc");
        if (descEl) {
          gsap.set(descEl, { opacity: 1 });
          gsap.to(descEl, {
            scrambleText: {
              text: svc.description,
              chars: "upperCase",
              speed: 0.4,
              delimiter: "",
            },
            duration: 0.9,
            ease: "none",
            delay: delay + 0.3,
          });
        }

        // Benefit pill
        gsap.fromTo(
          panel.querySelector(".svc-benefit"),
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.4, ease: "power2.out", delay: delay + 0.48 }
        );

        // CTA button
        gsap.fromTo(
          panel.querySelector(".svc-cta"),
          { opacity: 0, scale: 0.86 },
          { opacity: 1, scale: 1, duration: 0.42, ease: "back.out(1.6)", delay: delay + 0.58 }
        );

        // ── MorphSVG shape transition ──────────────────────────────────────
        if (morphPathRef.current) {
          gsap.to(morphPathRef.current, {
            morphSVG: SHAPES[idx],
            duration: 0.9,
            ease: "power2.inOut",
          });
          gsap.to(morphPathRef.current, {
            attr: { stroke: svc.color },
            duration: 0.5,
          });
        }
        if (morphEchoRef.current) {
          gsap.to(morphEchoRef.current, {
            morphSVG: SHAPES[idx],
            duration: 1.1,
            ease: "power2.inOut",
            delay: 0.05,
          });
        }

        // ── Chrome updates (counter, dots, glow) ──────────────────────────
        updateChrome(idx);
      };

      // ── Initialise ───────────────────────────────────────────────────────

      // Hide all panels; show panel 0
      panelRefs.current.forEach((p, i) => {
        if (p) gsap.set(p, { autoAlpha: i === 0 ? 1 : 0 });
      });

      updateChrome(0);
      animateIn(0, 1, true);

      // Hero entrance
      gsap.from(".hero-badge", { opacity: 0, y: 20, duration: 0.8, ease: "power3.out", delay: 0.2 });
      gsap.from(".hero-heading", { opacity: 0, y: 40, duration: 0.9, ease: "cinematic", delay: 0.4 });
      gsap.from(".hero-sub", { opacity: 0, y: 24, duration: 0.7, ease: "power2.out", delay: 0.7 });
      gsap.from(".hero-scroll-hint", { opacity: 0, duration: 0.6, delay: 1.1 });

      // ── matchMedia ───────────────────────────────────────────────────────
      const mm = gsap.matchMedia();

      // ════════════════ DESKTOP ═══════════════════════════════════════════
      mm.add("(min-width: 768px)", () => {
        // Pin the services section
        const pin = ScrollTrigger.create({
          trigger: pinWrapperRef.current,
          start: "top top",
          end: () => `+=${SERVICES.length * window.innerHeight}`,
          pin: pinTargetRef.current,
          pinSpacing: true,
          onUpdate: (self) => {
            const newIdx = Math.min(
              Math.floor(self.progress * SERVICES.length),
              SERVICES.length - 1
            );
            if (newIdx !== activeIdx) {
              const dir = (newIdx > activeIdx ? 1 : -1) as 1 | -1;
              const prev = activeIdx;
              activeIdx = newIdx;
              animateOut(prev, dir);
              animateIn(newIdx, dir);
            }
          },
        });

        // Scrubbed progress bar
        gsap.fromTo(
          ".progress-fill",
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: pinWrapperRef.current,
              start: "top top",
              end: () => `+=${SERVICES.length * window.innerHeight}`,
              scrub: true,
            },
          }
        );

        // Hero parallax exit
        gsap.to(".hero-content", {
          y: -90,
          opacity: 0,
          scrollTrigger: {
            trigger: ".services-hero",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });

        // Decorative DrawSVG lines animate in on page load
        gsap.set([".deco-h", ".deco-v"], { drawSVG: "50% 50%" });
        gsap.to(".deco-h", { drawSVG: "0% 100%", duration: 2, ease: "power2.inOut", delay: 1.4 });
        gsap.to(".deco-v", { drawSVG: "0% 100%", duration: 2, ease: "power2.inOut", delay: 1.6 });

        // Orbit dots — MotionPath
        const orbitSelectors = ["[data-orbit='0']", "[data-orbit='1']", "[data-orbit='2']"];
        const orbitSpeeds = [11, 15, 19];
        const orbitOffsets = [0, 0.33, 0.67];

        orbitSelectors.forEach((sel, i) => {
          const el = document.querySelector(sel);
          if (!el) return;
          gsap.to(el, {
            motionPath: {
              path: "#orbit-ring-path",
              align: "#orbit-ring-path",
              alignOrigin: [0.5, 0.5],
              start: orbitOffsets[i],
              end: orbitOffsets[i] + 1,
              autoRotate: false,
            },
            duration: orbitSpeeds[i],
            ease: "none",
            repeat: -1,
          });
        });

        // Outer orbit (slower)
        const el3 = document.querySelector("[data-orbit='3']");
        if (el3) {
          gsap.to(el3, {
            motionPath: {
              path: "#orbit-outer-path",
              align: "#orbit-outer-path",
              alignOrigin: [0.5, 0.5],
              start: 0.5,
              end: 1.5,
              autoRotate: false,
            },
            duration: 28,
            ease: "none",
            repeat: -1,
          });
        }

        // Subtle morph shape pulse
        gsap.to(morphPathRef.current, {
          attr: { strokeWidth: 2.5 },
          duration: 1.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 2,
        });

        // CTA section reveal
        gsap.from(".cta-inner", {
          y: 70,
          opacity: 0,
          duration: 0.85,
          ease: "cinematic",
          scrollTrigger: {
            trigger: ".cta-section",
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        });

        gsap.from(".cta-btn-row > *", {
          y: 30,
          opacity: 0,
          stagger: 0.15,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".cta-section",
            start: "top 65%",
            toggleActions: "play none none reverse",
          },
        });

        return () => {
          pin.kill();
        };
      });

      // ════════════════ MOBILE ════════════════════════════════════════════
      mm.add("(max-width: 767px)", () => {
        // Mobile: remove absolute stacking, reveal each card on scroll
        panelRefs.current.forEach((p) => {
          if (p) {
            gsap.set(p, { autoAlpha: 1, position: "relative", y: 0, clearProps: "position" });
          }
        });

        document.querySelectorAll<HTMLElement>(".mobile-svc-card").forEach((card) => {
          gsap.from(card, {
            opacity: 0,
            y: 46,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          });
        });
      });

      return () => {
        mm.revert();
        splitCache.current.forEach((s) => s?.revert());
      };
    },
    { scope: containerRef }
  );

  // Bg particles animation (CSS-driven, set with inline style)
  // Handled by CSS keyframes in <style> tag below

  return (
    <div
      ref={containerRef}
      style={{ background: "#080810", color: "#fff", overflowX: "hidden" }}
    >
      {/* ─── Embedded Styles ─────────────────────────────────────────────── */}
      <style>{`
        @keyframes floatUp {
          0%   { transform: translateY(0) scale(1); opacity: 0; }
          20%  { opacity: 1; }
          80%  { opacity: 0.4; }
          100% { transform: translateY(-60px) scale(0.6); opacity: 0; }
        }
        @keyframes hintBounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(7px); }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.15; }
          50%       { opacity: 0.28; }
        }
        .svc-cta:hover { opacity: 0.86 !important; transform: translateY(-1px); }
        .back-link:hover { color: rgba(255,255,255,0.85) !important; }
        .dot-btn:hover { opacity: 1 !important; transform: scale(1.5) !important; }
        .split-line { overflow: hidden; }
      `}</style>

      {/* ─── Fixed Minimal Nav ───────────────────────────────────────────── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.1rem 2rem",
          background: "rgba(8,8,16,0.75)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <Link
          href="/"
          className="back-link"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.45rem",
            color: "rgba(255,255,255,0.5)",
            textDecoration: "none",
            fontSize: "0.82rem",
            fontWeight: 500,
            transition: "color 0.2s",
          }}
        >
          <ArrowLeft size={13} />
          Adwiser
        </Link>

        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "0.68rem",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.28)",
          }}
        >
          Services
        </span>

        <span
          ref={navCounterRef}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "0.82rem",
            fontWeight: 700,
            letterSpacing: "0.06em",
            color: SERVICES[0].color,
            transition: "color 0.4s",
            minWidth: "56px",
            textAlign: "right",
          }}
        >
          01 / {SERVICES.length}
        </span>
      </nav>

      {/* ─── Hero ────────────────────────────────────────────────────────── */}
      <section
        className="services-hero"
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
          }}
        />

        {/* Ambient glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 70% 55% at 50% 40%, rgba(99,102,241,0.1) 0%, transparent 65%)",
            animation: "glowPulse 4s ease-in-out infinite",
          }}
        />

        {/* Floating particles */}
        {PARTICLES.map((p) => (
          <div
            key={p.id}
            style={{
              position: "absolute",
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.35)",
              animation: `floatUp ${p.dur}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}

        {/* Content */}
        <div className="hero-content" style={{ textAlign: "center", position: "relative", zIndex: 1, padding: "0 1.5rem", maxWidth: "760px" }}>
          <div
            className="hero-badge"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.45rem",
              padding: "0.45rem 1rem",
              border: "1px solid rgba(99,102,241,0.3)",
              borderRadius: "100px",
              marginBottom: "2rem",
              background: "rgba(99,102,241,0.06)",
            }}
          >
            <Sparkles size={12} style={{ color: "#6366F1" }} />
            <span
              style={{
                fontSize: "0.68rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#8183F4",
              }}
            >
              What We Do
            </span>
          </div>

          <h1
            className="hero-heading"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3.2rem, 8vw, 7.5rem)",
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: "-0.035em",
              marginBottom: "1.6rem",
            }}
          >
            Twelve Ways<br />
            <span
              style={{
                background:
                  "linear-gradient(135deg, #6366F1 0%, #8B5CF6 40%, #06B6D4 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              We Help You Win
            </span>
          </h1>

          <p
            className="hero-sub"
            style={{
              fontSize: "clamp(0.95rem, 2vw, 1.15rem)",
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.65,
              maxWidth: "480px",
              margin: "0 auto 3rem",
            }}
          >
            From brand to ads to automation — every service engineered
            to convert visitors into loyal customers.
          </p>

          <div
            className="hero-scroll-hint"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.4rem",
              color: "rgba(255,255,255,0.25)",
            }}
          >
            <span
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              Scroll to explore
            </span>
            <ChevronDown
              size={15}
              style={{ animation: "hintBounce 1.8s ease-in-out infinite" }}
            />
          </div>
        </div>
      </section>

      {/* ─── DESKTOP: Pinned Scroll Hub ───────────────────────────────────── */}
      <div
        ref={pinWrapperRef}
        className="hidden md:block"
        aria-label="Services showcase"
      >
        <div
          ref={pinTargetRef}
          style={{
            height: "100vh",
            position: "relative",
            display: "flex",
            background: "#080810",
            overflow: "hidden",
          }}
        >
          {/* ── Background decorative grid ─── */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
              pointerEvents: "none",
            }}
          />

          {/* ── Glow blob ─── */}
          <div
            ref={glowBlobRef}
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(ellipse 65% 65% at 50% 50%, ${SERVICES[0].dim} 0%, transparent 70%)`,
              transition: "background 0.8s ease",
              pointerEvents: "none",
              animation: "glowPulse 5s ease-in-out infinite",
            }}
          />

          {/* ══════ LEFT PANEL — Service text ══════ */}
          <div
            style={{
              width: "50%",
              height: "100%",
              position: "relative",
              zIndex: 10,
              padding: "5.5rem 3.5rem 4rem 4.5rem",
            }}
          >
            {SERVICES.map((svc, i) => (
              <div
                key={svc.id}
                ref={(el) => {
                  panelRefs.current[i] = el;
                }}
                data-service-panel={i}
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  padding: "5.5rem 3.5rem 4rem 4.5rem",
                  visibility: i === 0 ? "visible" : "hidden",
                  opacity: i === 0 ? 1 : 0,
                }}
              >
                {/* Category */}
                <div
                  className="svc-category"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: svc.color,
                    marginBottom: "1.1rem",
                    opacity: 0.9,
                  }}
                >
                  {svc.category}
                </div>

                {/* Title */}
                <div style={{ marginBottom: "1.1rem", overflow: "hidden" }}>
                  <div
                    className="svc-title"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(3.5rem, 5.2vw, 5.8rem)",
                      fontWeight: 800,
                      lineHeight: 1.02,
                      letterSpacing: "-0.03em",
                      color: "#FAFAFA",
                      perspective: "600px",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: svc.title.replace("\n", "<br/>"),
                    }}
                  />
                </div>

                {/* DrawSVG accent line */}
                <svg
                  width="220"
                  height="4"
                  style={{ marginBottom: "1.4rem", overflow: "visible" }}
                >
                  <path
                    className="svc-line"
                    d="M0,2 L220,2"
                    stroke={svc.color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>

                {/* Tagline */}
                <p
                  className="svc-tagline"
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    color: svc.color,
                    marginBottom: "0.85rem",
                    letterSpacing: "0.02em",
                    opacity: 0.95,
                  }}
                >
                  {svc.tagline}
                </p>

                {/* Description — ScrambleText target */}
                <p
                  className="svc-desc"
                  style={{
                    fontSize: "clamp(0.88rem, 1.15vw, 0.98rem)",
                    color: "rgba(255,255,255,0.55)",
                    lineHeight: 1.72,
                    maxWidth: "420px",
                    marginBottom: "1.5rem",
                    minHeight: "3.8rem",
                  }}
                >
                  {svc.description}
                </p>

                {/* Benefit */}
                <div
                  className="svc-benefit"
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.6rem",
                    marginBottom: "2.1rem",
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "17px",
                      height: "17px",
                      borderRadius: "50%",
                      background: svc.color,
                      fontSize: "0.6rem",
                      flexShrink: 0,
                      marginTop: "2px",
                    }}
                  >
                    ✓
                  </span>
                  <span
                    style={{
                      fontSize: "0.85rem",
                      color: "rgba(255,255,255,0.72)",
                      fontWeight: 500,
                      lineHeight: 1.45,
                    }}
                  >
                    {svc.benefit}
                  </span>
                </div>

                {/* CTA */}
                <Link
                  href="/#contact"
                  className="svc-cta"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.72rem 1.6rem",
                    background: svc.color,
                    color: "#fff",
                    borderRadius: "100px",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    textDecoration: "none",
                    width: "fit-content",
                    transition: "opacity 0.2s, transform 0.2s",
                    boxShadow: `0 0 24px rgba(${svc.rgb},0.3)`,
                  }}
                >
                  {svc.cta}
                  <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>

          {/* ══════ RIGHT PANEL — Visual / SVG ══════ */}
          <div
            style={{
              width: "50%",
              height: "100%",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 5,
            }}
          >
            {/* Large background service number */}
            <div
              ref={bgNumRef}
              style={{
                position: "absolute",
                fontFamily: "var(--font-display)",
                fontSize: "clamp(14rem, 22vw, 26rem)",
                fontWeight: 900,
                color: "rgba(255,255,255,0.022)",
                lineHeight: 1,
                userSelect: "none",
                letterSpacing: "-0.06em",
                zIndex: 0,
                pointerEvents: "none",
              }}
            >
              01
            </div>

            {/* SVG canvas */}
            <svg
              viewBox="0 0 400 400"
              style={{
                width: "100%",
                height: "100%",
                maxWidth: "520px",
                maxHeight: "520px",
                position: "relative",
                zIndex: 1,
                overflow: "visible",
              }}
            >
              <defs>
                {/* Glow filter for shape */}
                <filter id="shape-glow" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="9" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                {/* Softer glow for dots */}
                <filter id="dot-glow" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                {/* Inner orbit path (r=90) */}
                <path
                  id="orbit-ring-path"
                  d="M110,200 a90,90 0 1,1 180,0 a90,90 0 1,1 -180,0"
                  fill="none"
                />
                {/* Outer orbit path (r=148) */}
                <path
                  id="orbit-outer-path"
                  d="M52,200 a148,148 0 1,1 296,0 a148,148 0 1,1 -296,0"
                  fill="none"
                />
              </defs>

              {/* ── Decorative DrawSVG lines ── */}
              <line
                className="deco-h"
                x1="0"
                y1="200"
                x2="400"
                y2="200"
                stroke="rgba(255,255,255,0.04)"
                strokeWidth="0.6"
              />
              <line
                className="deco-v"
                x1="200"
                y1="0"
                x2="200"
                y2="400"
                stroke="rgba(255,255,255,0.04)"
                strokeWidth="0.6"
              />

              {/* Concentric decorative rings */}
              <circle cx="200" cy="200" r="50" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
              <circle cx="200" cy="200" r="90" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3,10" />
              <circle cx="200" cy="200" r="130" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
              <circle cx="200" cy="200" r="148" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" strokeDasharray="2,16" />

              {/* Centre dot */}
              <circle cx="200" cy="200" r="2.5" fill="rgba(255,255,255,0.22)" />

              {/* ── Echo shape (faded, slightly larger) ── */}
              <path
                ref={morphEchoRef}
                d={SHAPES[0]}
                fill="none"
                stroke={SERVICES[0].color}
                strokeWidth="0.6"
                opacity="0.15"
                transform="translate(200,200) scale(1.12) translate(-200,-200)"
              />

              {/* ── Main morphing shape ── */}
              <path
                ref={morphPathRef}
                id="morph-shape"
                d={SHAPES[0]}
                fill="none"
                stroke={SERVICES[0].color}
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#shape-glow)"
                opacity="0.88"
              />

              {/* ── Orbit dots ── */}
              {/* Inner orbit */}
              <circle
                ref={(el) => { orbitDotRefs.current[0] = el; }}
                data-orbit="0"
                cx="110"
                cy="200"
                r="4.5"
                fill={SERVICES[0].color}
                filter="url(#dot-glow)"
              />
              <circle
                ref={(el) => { orbitDotRefs.current[1] = el; }}
                data-orbit="1"
                cx="200"
                cy="110"
                r="2.8"
                fill="rgba(255,255,255,0.8)"
                filter="url(#dot-glow)"
              />
              <circle
                ref={(el) => { orbitDotRefs.current[2] = el; }}
                data-orbit="2"
                cx="290"
                cy="200"
                r="3.5"
                fill={SERVICES[0].color}
                opacity="0.55"
                filter="url(#dot-glow)"
              />
              {/* Outer orbit */}
              <circle
                ref={(el) => { orbitDotRefs.current[3] = el; }}
                data-orbit="3"
                cx="52"
                cy="200"
                r="2"
                fill="rgba(255,255,255,0.3)"
              />
            </svg>
          </div>

          {/* ══════ Vertical Nav Dots ══════ */}
          <div
            style={{
              position: "absolute",
              right: "1.25rem",
              top: "50%",
              transform: "translateY(-50%)",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              zIndex: 50,
            }}
          >
            {SERVICES.map((_, i) => (
              <div
                key={i}
                data-dot={i}
                className="dot-btn"
                style={{
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  background: i === 0 ? SERVICES[0].color : "rgba(255,255,255,0.2)",
                  opacity: i === 0 ? 1 : 0.2,
                  transition: "all 0.3s ease",
                  cursor: "default",
                }}
              />
            ))}
          </div>

          {/* ══════ Bottom progress bar ══════ */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "2px",
              background: "rgba(255,255,255,0.05)",
              zIndex: 50,
            }}
          >
            <div
              className="progress-fill"
              style={{
                height: "100%",
                background: SERVICES[0].color,
                transformOrigin: "left",
                transform: "scaleX(0)",
                boxShadow: `0 0 8px ${SERVICES[0].color}`,
              }}
            />
          </div>

          {/* ══════ Bottom chrome row ══════ */}
          <div
            style={{
              position: "absolute",
              bottom: "1.4rem",
              left: 0,
              right: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 4.5rem 0 4.5rem",
              zIndex: 50,
              pointerEvents: "none",
            }}
          >
            {/* Scroll hint */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                color: "rgba(255,255,255,0.18)",
                fontSize: "0.65rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              <ChevronDown size={11} />
              scroll to explore
            </div>
            {/* Counter */}
            <div
              ref={counterRef}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.72rem",
                fontWeight: 600,
                color: "rgba(255,255,255,0.22)",
                letterSpacing: "0.1em",
              }}
            >
              01 — {String(SERVICES.length).padStart(2, "0")}
            </div>
          </div>

          {/* ══════ Divider line (left/right split) ══════ */}
          <div
            style={{
              position: "absolute",
              top: "10%",
              bottom: "10%",
              left: "50%",
              width: "1px",
              background:
                "linear-gradient(to bottom, transparent, rgba(255,255,255,0.05) 30%, rgba(255,255,255,0.05) 70%, transparent)",
              zIndex: 4,
              pointerEvents: "none",
            }}
          />
        </div>
      </div>

      {/* ─── MOBILE: Vertical service cards ──────────────────────────────── */}
      <div
        className="block md:hidden"
        style={{ paddingTop: "5rem", paddingBottom: "2rem" }}
      >
        <div style={{ padding: "0 1.5rem", marginBottom: "2rem" }}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "2rem",
              fontWeight: 800,
              letterSpacing: "-0.025em",
              color: "#FAFAFA",
              marginBottom: "0.5rem",
            }}
          >
            Our Services
          </h2>
          <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.45)" }}>
            Scroll through all twelve.
          </p>
        </div>

        {SERVICES.map((svc, i) => (
          <div
            key={svc.id}
            className="mobile-svc-card"
            style={{
              margin: "0 1rem 1rem",
              padding: "1.8rem 1.5rem",
              borderRadius: "16px",
              border: `1px solid rgba(${svc.rgb},0.15)`,
              background: `linear-gradient(135deg, rgba(${svc.rgb},0.05) 0%, rgba(8,8,16,0.9) 100%)`,
              backdropFilter: "blur(8px)",
            }}
          >
            <div
              style={{
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: svc.color,
                marginBottom: "0.7rem",
              }}
            >
              {svc.category}
            </div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.9rem",
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
                color: "#FAFAFA",
                marginBottom: "0.85rem",
                whiteSpace: "pre-line",
              }}
            >
              {svc.title}
            </h3>
            <p
              style={{
                fontSize: "0.88rem",
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.65,
                marginBottom: "1rem",
              }}
            >
              {svc.description}
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "1.2rem",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  background: svc.color,
                  fontSize: "0.6rem",
                  flexShrink: 0,
                }}
              >
                ✓
              </span>
              <span style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.65)", fontWeight: 500 }}>
                {svc.benefit}
              </span>
            </div>
            <Link
              href="/#contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.6rem 1.3rem",
                background: svc.color,
                color: "#fff",
                borderRadius: "100px",
                fontSize: "0.82rem",
                fontWeight: 600,
                textDecoration: "none",
                boxShadow: `0 0 20px rgba(${svc.rgb},0.25)`,
              }}
            >
              {svc.cta}
              <ArrowRight size={13} />
            </Link>
          </div>
        ))}
      </div>

      {/* ─── CTA Section ─────────────────────────────────────────────────── */}
      <section
        className="cta-section"
        style={{
          minHeight: "82vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          background: "#080810",
        }}
      >
        {/* Background grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 40%, transparent 100%)",
          }}
        />

        {/* Ambient gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(99,102,241,0.09) 0%, transparent 60%)",
          }}
        />

        {/* Floating particles */}
        {PARTICLES.slice(0, 14).map((p) => (
          <div
            key={p.id}
            style={{
              position: "absolute",
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.25)",
              animation: `floatUp ${p.dur + 1}s ease-in-out ${p.delay + 0.5}s infinite`,
            }}
          />
        ))}

        {/* Content */}
        <div
          className="cta-inner"
          style={{
            textAlign: "center",
            position: "relative",
            zIndex: 1,
            padding: "5rem 1.5rem",
            maxWidth: "640px",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.45rem",
              padding: "0.45rem 1rem",
              border: "1px solid rgba(99,102,241,0.25)",
              borderRadius: "100px",
              marginBottom: "1.8rem",
              background: "rgba(99,102,241,0.05)",
            }}
          >
            <Sparkles size={12} style={{ color: "#6366F1" }} />
            <span
              style={{
                fontSize: "0.68rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#8183F4",
              }}
            >
              Ready to Grow?
            </span>
          </div>

          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.6rem, 5.5vw, 5rem)",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              marginBottom: "1.25rem",
            }}
          >
            Let&apos;s build something<br />
            <span
              style={{
                background:
                  "linear-gradient(135deg, #8B5CF6 0%, #06B6D4 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              remarkable together
            </span>
          </h2>

          <p
            style={{
              fontSize: "clamp(0.92rem, 1.6vw, 1.05rem)",
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.68,
              marginBottom: "2.8rem",
              maxWidth: "440px",
              margin: "0 auto 2.8rem",
            }}
          >
            Book a free strategy session and we&apos;ll map out exactly which
            of our twelve services will move the needle for your business.
          </p>

          <div
            className="cta-btn-row"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/#contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.9rem 2.1rem",
                background: "linear-gradient(135deg, #8B5CF6, #06B6D4)",
                color: "#fff",
                borderRadius: "100px",
                fontWeight: 700,
                fontSize: "0.95rem",
                textDecoration: "none",
                boxShadow: "0 0 32px rgba(139,92,246,0.3)",
                transition: "opacity 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
            >
              Book a Free Call
              <ArrowRight size={16} />
            </Link>

            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.9rem 2.1rem",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.6)",
                borderRadius: "100px",
                fontWeight: 600,
                fontSize: "0.95rem",
                textDecoration: "none",
                transition: "color 0.2s, border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.9)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.25)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
              }}
            >
              <ArrowLeft size={16} />
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Play, TrendingUp, Users, Bell, Bot,
  Globe, Activity, Star, Zap, BarChart3, Target, MousePointer,
} from "lucide-react";
import { Magnetic } from "./magnetic";
import { AnalyticsChart } from "./analytics-chart";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ---- animated counter ---- */
function useCounter(target: number, duration = 1400, delay = 400) {
  const [val, setVal] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts + delay;
      const elapsed = Math.max(0, ts - start);
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration, delay]);

  return { val, ref };
}

/* ---- live lead names cycling ---- */
const LEADS = [
  { name: "Sarah just signed up", country: "🇺🇸" },
  { name: "Rahul booked a call", country: "🇮🇳" },
  { name: "Mia purchased a plan", country: "🇬🇧" },
  { name: "Carlos requested demo", country: "🇧🇷" },
  { name: "Yuki opened dashboard", country: "🇯🇵" },
];

export function Hero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 120, damping: 18 });
  const px = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), { stiffness: 80, damping: 20 });
  const py = useSpring(useTransform(my, [-0.5, 0.5], [-10, 10]), { stiffness: 80, damping: 20 });

  const heroRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mx.set((e.clientX - rect.left) / rect.width - 0.5);
      my.set((e.clientY - rect.top) / rect.height - 0.5);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center gap-12 px-4 pt-28 pb-16 sm:px-6 lg:pt-36 lg:pb-24 xl:flex-row xl:items-center xl:gap-8"
    >
      {/* ---------- Left: copy ---------- */}
      <div className="flex-1 text-center xl:text-left">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }} className="mb-6 inline-flex">
          <span className="kicker">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-secondary" />
            </span>
            AI-Powered Digital Growth Platform
          </span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.05 }}
          className="text-balance text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-[4.2rem]">
          Transform Your Business With{" "}
          <span className="relative whitespace-nowrap">
            <span className="text-gradient-blue">AI-Powered</span>
            <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none" preserveAspectRatio="none">
              <motion.path d="M2 8C60 3 120 3 180 6C220 8 260 9 298 5" stroke="url(#under)" strokeWidth="3" strokeLinecap="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.1, delay: 0.6, ease: EASE }} />
              <defs>
                <linearGradient id="under" x1="0" y1="0" x2="300" y2="0">
                  <stop stopColor="var(--color-primary)" /><stop offset="0.5" stopColor="var(--color-secondary)" /><stop offset="1" stopColor="var(--color-accent)" />
                </linearGradient>
              </defs>
            </svg>
          </span>{" "}Digital Growth
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
          className="mx-auto mt-7 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground/90 sm:text-lg xl:mx-0">
          Generate quality leads, build premium websites, and automate your business with cutting-edge technology that converts visitors into customers.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center xl:justify-start">
          <Magnetic strength={0.4}>
            <a href="#contact" className="btn-primary-glow group inline-flex w-full items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold sm:w-auto">
              Book a Call <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Magnetic>
        </motion.div>

        {/* Trust row */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.35 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row xl:justify-start">
          <div className="flex -space-x-2.5">
            {["from-primary to-primary", "from-primary to-accent", "from-accent to-secondary", "from-secondary to-primary"].map((g, i) => (
              <span key={i} className={`flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br ${g} text-xs font-bold text-white ring-2 ring-background`}>
                {["A", "K", "M", "S"][i]}
              </span>
            ))}
          </div>
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center gap-1 sm:justify-start">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />)}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Trusted by <span className="font-semibold text-foreground">500+</span> growing brands
            </p>
          </div>
        </motion.div>
      </div>

      {/* ---------- Right: floating dashboard ---------- */}
      <motion.div initial={{ opacity: 0, scale: 0.94, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.2 }} className="relative flex-1 [perspective:1200px]">
        <motion.div style={{ rotateX: rx, rotateY: ry, x: px, y: py }} className="relative mx-auto max-w-xl">
          <DashboardMockup />
          <FloatingLeadCard />
          <FloatingStatCard />
          <FloatingAIWidget />
          <FloatingGlowOrb />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ============ DASHBOARD MOCKUP ============ */
function DashboardMockup() {
  const [activeTab, setActiveTab] = useState("overview");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const visitors = useCounter(24580, 1600, 300);
  const conversion = useCounter(78, 1400, 500);
  const leads = useCounter(312, 1200, 600);
  const revenue = useCounter(4020000, 1800, 400);

  const PERF = [
    { icon: <Users className="h-3.5 w-3.5" />, label: "Visitors", raw: 24580, display: "24.5K", delta: "+12%", color: "var(--color-primary)", ref: visitors },
    { icon: <MousePointer className="h-3.5 w-3.5" />, label: "Conversion", raw: 78, display: "7.8%", delta: "+2.4%", color: "var(--color-accent)", ref: conversion },
    { icon: <Target className="h-3.5 w-3.5" />, label: "New Leads", raw: 312, display: "312", delta: "+18%", color: "var(--color-accent)", ref: leads },
  ];

  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      className="relative overflow-hidden rounded-3xl bg-surface border border-border shadow-2xl shadow-black/40"
    >
      {/* ── Title bar ── */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ef4444]/80 cursor-pointer hover:bg-[#ef4444] transition-colors" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#f59e0b]/80 cursor-pointer hover:bg-[#f59e0b] transition-colors" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent/80 cursor-pointer hover:bg-accent transition-colors" />
        </div>
        <div className="flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-1 text-[10px] text-slate-400">
          <Globe className="h-3 w-3" /> app.adwiser.ai
        </div>
        <div className="flex items-center gap-1 text-[10px] text-accent">
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
          Live
        </div>
      </div>

      {/* ── Tab bar ── */}
      <div className="flex gap-1 border-b border-white/5 px-4 pt-2">
        {["overview", "leads", "analytics"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1.5 text-[10px] font-medium capitalize rounded-t-md transition-all duration-200 ${
              activeTab === tab
                ? "text-white border-b-2 border-primary bg-white/5"
                : "text-slate-500 hover:text-slate-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="p-3">
        {/* ── Top row: Revenue card + bar chart ── */}
        <div className="grid grid-cols-3 gap-2 mb-2">
          <div className="col-span-2 rounded-2xl bg-surface-elevated border-border p-3">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-[9px] text-slate-500 uppercase tracking-wider">Total Revenue</p>
                <p className="text-2xl font-bold text-white mt-0.5">
                  ₹<span ref={revenue.ref}>{(revenue.val / 100000).toFixed(1)}L</span>
                </p>
              </div>
              <span className="flex items-center gap-1 rounded-full bg-accent/15 px-2 py-0.5 text-[9px] font-semibold text-accent">
                <TrendingUp className="h-2.5 w-2.5" /> +24%
              </span>
            </div>
            {/* Mini sparkline bars */}
            <div className="flex h-10 items-end gap-0.5">
              {[35, 52, 44, 68, 59, 82, 100].map((h, i) => (
                <motion.div key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 0.7, delay: 0.4 + i * 0.06, ease: EASE }}
                  className="flex-1 rounded-sm"
                  style={{ background: i === 6 ? "linear-gradient(to top, #f43f5e, var(--color-primary))" : "rgba(59,130,246,0.25)", minHeight: 3 }}
                />
              ))}
            </div>
          </div>

          <div className="col-span-1 rounded-2xl bg-surface-elevated border-border p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[9px] text-slate-500">Growth</span>
              <BarChart3 className="h-3 w-3 text-slate-500" />
            </div>
            <div>
              <div className="text-lg font-bold text-white">8,940</div>
              <div className="text-[9px] text-accent font-semibold">+38% this week</div>
            </div>
            <div className="space-y-1">
              {[{ w: 85, c: "var(--color-primary)" }, { w: 60, c: "var(--color-accent)" }, { w: 40, c: "#f43f5e" }].map((b, i) => (
                <motion.div key={i} className="h-1 rounded-full bg-white/5 overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${b.w}%` }}
                    transition={{ duration: 1, delay: 0.6 + i * 0.12, ease: EASE }}
                    className="h-full rounded-full" style={{ background: b.c }} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ── 3 perf cards ── */}
        <div className="grid grid-cols-3 gap-2 mb-2">
          {PERF.map((c, i) => (
            <motion.div key={c.label}
              onHoverStart={() => setHoveredCard(i)}
              onHoverEnd={() => setHoveredCard(null)}
              animate={{ scale: hoveredCard === i ? 1.04 : 1 }}
              transition={{ duration: 0.2 }}
              className="rounded-2xl bg-surface-elevated border-border p-3 cursor-pointer"
            >
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-md" style={{ background: `${c.color}22`, color: c.color }}>
                  {c.icon}
                </span>
                <span className="text-[9px] text-slate-500">{c.label}</span>
              </div>
              <div className="text-sm font-bold text-white">
                <span ref={c.ref.ref}>{c.label === "Conversion" ? `${(c.ref.val / 10).toFixed(1)}%` : c.ref.val.toLocaleString()}</span>
              </div>
              <div className="mt-0.5 text-[9px] font-semibold text-accent">{c.delta}</div>
              <motion.div className="mt-2 h-0.5 rounded-full" style={{ background: `${c.color}33` }}>
                <motion.div initial={{ width: 0 }} animate={{ width: hoveredCard === i ? "100%" : "60%" }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="h-full rounded-full" style={{ background: c.color }} />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* ── Full-width chart ── */}
        <div className="rounded-2xl bg-surface-elevated border-border p-3 mb-2">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-semibold text-slate-300">Weekly Performance</span>
              <span className="flex items-center gap-1 text-[9px] text-slate-500">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Visitors
                <span className="ml-1.5 h-1.5 w-1.5 rounded-full bg-accent" /> Leads
              </span>
            </div>
            <span className="flex items-center gap-1 rounded-full bg-accent/15 px-2 py-0.5 text-[9px] font-semibold text-accent">
              <TrendingUp className="h-2.5 w-2.5" /> Trending up
            </span>
          </div>
          <AnalyticsChart height={80} />
        </div>

        {/* ── AI assistant bar ── */}
        <div className="flex items-center gap-2 rounded-2xl bg-surface-elevated border-border p-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
            <Bot className="h-4 w-4 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-semibold text-white">AI Assistant</span>
              <span className="flex items-center gap-1 rounded-full bg-secondary/10 px-2 py-0.5 text-[9px] text-secondary">
                <span className="h-1 w-1 rounded-full bg-secondary animate-pulse" /> typing
              </span>
            </div>
            <AITypingText />
          </div>
          <Zap className="h-4 w-4 text-[#f59e0b] shrink-0" />
        </div>
      </div>
    </motion.div>
  );
}

/* ── Cycling AI typing text ── */
const AI_MESSAGES = [
  "Optimizing your landing page…",
  "Analyzing lead quality score…",
  "Scheduling follow-up emails…",
  "A/B test variant ready…",
];
function AITypingText() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(p => (p + 1) % AI_MESSAGES.length), 2800);
    return () => clearInterval(t);
  }, []);
  return (
    <AnimatePresence mode="wait">
      <motion.p key={idx} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.3 }} className="mt-0.5 text-[10px] text-slate-500">
        {AI_MESSAGES[idx]}
      </motion.p>
    </AnimatePresence>
  );
}

/* ============ FLOATING CARDS ============ */
function FloatingLeadCard() {
  const [leadIdx, setLeadIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setLeadIdx(p => (p + 1) % LEADS.length), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div initial={{ opacity: 0, x: -30, y: 20 }} animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
      className="absolute -left-4 top-1/3 hidden sm:block lg:-left-10 z-10">
      <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="glass-strong w-48 rounded-2xl p-3 shadow-xl">
        <AnimatePresence mode="wait">
          <motion.div key={leadIdx} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35 }}>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent to-[#0d9488] text-white text-sm">
                <Bell className="h-4 w-4" />
              </span>
              <div>
                <div className="text-[9px] text-muted-foreground">New lead {LEADS[leadIdx].country}</div>
                <div className="text-[11px] font-semibold text-foreground">{LEADS[leadIdx].name}</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-muted">
          <motion.div key={`bar-${leadIdx}`} initial={{ width: "0%" }} animate={{ width: "72%" }}
            transition={{ duration: 1.2, ease: EASE }}
            className="h-full rounded-full bg-gradient-to-r from-primary to-accent" />
        </div>
      </motion.div>
    </motion.div>
  );
}

function FloatingStatCard() {
  return (
    <motion.div initial={{ opacity: 0, x: 30, y: -20 }} animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.8, delay: 0.85, ease: EASE }}
      className="absolute -right-3 top-6 hidden sm:block lg:-right-8 z-10">
      <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
        className="glass-strong w-40 rounded-2xl p-3 shadow-xl">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-muted-foreground">Revenue</span>
          <TrendingUp className="h-3.5 w-3.5 text-accent" />
        </div>
        <div className="mt-1 text-xl font-bold text-foreground">₹40.2L</div>
        <div className="text-[9px] font-semibold text-accent">+24% this month</div>
        <div className="mt-2 flex h-6 items-end gap-0.5">
          {[40, 55, 48, 70, 62, 85, 100].map((h, i) => (
            <motion.div key={i} initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ duration: 0.5, delay: 1 + i * 0.06, ease: EASE }}
              className="flex-1 rounded-sm bg-gradient-to-t from-primary/40 to-secondary" style={{ minHeight: 2 }} />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

function FloatingAIWidget() {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1, ease: EASE }}
      className="absolute -bottom-5 left-1/4 hidden sm:block z-10">
      <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        className="glass-strong flex items-center gap-2 rounded-full py-2 pl-2 pr-4 shadow-lg">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
          <Bot className="h-4 w-4 text-white" />
        </span>
        <span className="text-xs font-medium text-foreground">AI optimized 3 pages</span>
      </motion.div>
    </motion.div>
  );
}

function FloatingGlowOrb() {
  return <div className="absolute -right-10 -top-10 -z-10 h-32 w-32 rounded-full bg-primary/30 blur-2xl animate-pulse-glow" />;
}

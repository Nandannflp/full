"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  Play,
  TrendingUp,
  Users,
  Bell,
  Bot,
  Globe,
  Activity,
  Star,
} from "lucide-react";
import { Magnetic } from "./magnetic";
import { AnalyticsChart } from "./analytics-chart";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  // Mouse parallax for the dashboard cluster
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), {
    stiffness: 120,
    damping: 18,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), {
    stiffness: 120,
    damping: 18,
  });
  const px = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), {
    stiffness: 80,
    damping: 20,
  });
  const py = useSpring(useTransform(my, [-0.5, 0.5], [-10, 10]), {
    stiffness: 80,
    damping: 20,
  });

  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mx.set(x);
      my.set(y);
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-6 inline-flex"
        >
          <span className="kicker">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#38bdf8] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#38bdf8]" />
            </span>
            AI-Powered Digital Growth Platform
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.05 }}
          className="text-balance text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-[4.2rem]"
        >
          Transform Your Business With{" "}
          <span className="relative whitespace-nowrap">
            <span className="text-gradient-blue">AI-Powered</span>
            <svg
              className="absolute -bottom-2 left-0 w-full"
              viewBox="0 0 300 12"
              fill="none"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M2 8C60 3 120 3 180 6C220 8 260 9 298 5"
                stroke="url(#under)"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.1, delay: 0.6, ease: EASE }}
              />
              <defs>
                <linearGradient id="under" x1="0" y1="0" x2="300" y2="0">
                  <stop stopColor="#2563eb" />
                  <stop offset="0.5" stopColor="#38bdf8" />
                  <stop offset="1" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>
          </span>{" "}
          Digital Growth
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
          className="mx-auto mt-7 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground/90 sm:text-lg xl:mx-0"
        >
          Generate quality leads, build premium websites, and automate your
          business with cutting-edge technology that converts visitors into
          customers.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center xl:justify-start"
        >
          <Magnetic strength={0.4}>
            <a
              href="#contact"
              className="btn-primary-glow group inline-flex w-full items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold sm:w-auto"
            >
              Get Started
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Magnetic>
          <Magnetic strength={0.3}>
            <a
              href="#showcase"
              className="btn-ghost-glass group inline-flex w-full items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold sm:w-auto"
            >
              <Play className="h-4 w-4 fill-current" />
              Book Consultation
            </a>
          </Magnetic>
        </motion.div>

        {/* Trust row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.35 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row xl:justify-start"
        >
          <div className="flex -space-x-2.5">
            {[
              "from-rose-500 to-[#3b82f6]",
              "from-rose-500 to-orange-500",
              "from-[#06b6d4] to-[#38bdf8]",
              "from-[#38bdf8] to-[#2563eb]",
            ].map((g, i) => (
              <span
                key={i}
                className={`flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br ${g} text-xs font-bold text-foreground ring-2 ring-[#020617]`}
              >
                {["A", "K", "M", "S"][i]}
              </span>
            ))}
          </div>
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center gap-1 sm:justify-start">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-[#38bdf8] text-[#38bdf8]"
                />
              ))}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Trusted by <span className="font-semibold text-foreground">500+</span>{" "}
              growing brands
            </p>
          </div>
        </motion.div>
      </div>

      {/* ---------- Right: floating dashboard ---------- */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
        className="relative flex-1 [perspective:1200px]"
      >
        <motion.div
          style={{ rotateX: rx, rotateY: ry, x: px, y: py }}
          className="relative mx-auto max-w-xl"
        >
          <DashboardMockup />

          {/* Floating cards around the dashboard */}
          <FloatingLeadCard />
          <FloatingStatCard />
          <FloatingAIWidget />
          <FloatingGlowOrb />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------------- Dashboard mockup ---------------- */
function DashboardMockup() {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      className="glass-card relative overflow-hidden rounded-3xl p-3 sm:p-4"
    >
      {/* top bar */}
      <div className="mb-3 flex items-center justify-between px-2">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ef4444]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#f59e0b]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#22c55e]/70" />
        </div>
        <div className="flex items-center gap-1.5 rounded-md bg-slate-900/5 px-2.5 py-1 text-[10px] text-muted-foreground">
          <Globe className="h-3 w-3" /> app.adwiser.ai
        </div>
        <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
          <Activity className="h-3 w-3 text-[#22c55e]" /> Live
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2.5">
        {/* website preview */}
        <div className="col-span-2 overflow-hidden rounded-2xl border border-slate-900/10 bg-[#070f22]">
          <div className="relative aspect-[16/10]">
            {/* faux website */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0b1224] to-[#0a1830] p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="h-4 w-4 rounded bg-gradient-to-br from-rose-500 to-orange-500" />
                  <div className="h-2 w-12 rounded-full bg-[#0A0A0A]/20" />
                </div>
                <div className="flex gap-1.5">
                  <div className="h-1.5 w-6 rounded-full bg-[#0A0A0A]/10" />
                  <div className="h-1.5 w-6 rounded-full bg-[#0A0A0A]/10" />
                  <div className="h-1.5 w-8 rounded-full bg-[#3b82f6]/60" />
                </div>
              </div>
              <div className="mt-4 space-y-1.5">
                <div className="h-3 w-3/4 rounded-full bg-gradient-to-r from-white/70 to-white/30" />
                <div className="h-3 w-1/2 rounded-full bg-gradient-to-r from-[#38bdf8]/70 to-orange-500/40" />
              </div>
              <div className="mt-3 h-5 w-20 rounded-md bg-gradient-to-r from-rose-500 to-orange-500" />
              <div className="mt-4 grid grid-cols-3 gap-1.5">
                <div className="h-10 rounded-lg bg-slate-900/5" />
                <div className="h-10 rounded-lg bg-slate-900/5" />
                <div className="h-10 rounded-lg bg-slate-900/5" />
              </div>
            </div>
            {/* shine */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent" />
          </div>
        </div>

        {/* growth stat card */}
        <div className="col-span-1 rounded-2xl border border-slate-900/10 bg-[#070f22] p-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-muted-foreground">Growth</span>
            <span className="rounded-md bg-[#22c55e]/15 px-1.5 py-0.5 text-[9px] font-semibold text-[#22c55e]">
              +38%
            </span>
          </div>
          <div className="mt-1 text-lg font-bold text-foreground">8,940</div>
          <div className="mt-2 flex h-12 items-end gap-0.5">
            {[40, 55, 48, 70, 62, 85, 100].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.08, ease: EASE }}
                className="flex-1 rounded-sm bg-gradient-to-t from-rose-500/40 to-[#38bdf8]"
                style={{ minHeight: 4 }}
              />
            ))}
          </div>
        </div>

        {/* performance cards */}
        <PerfCard
          icon={<Users className="h-3.5 w-3.5" />}
          label="Visitors"
          value="24.5K"
          delta="+12%"
        />
        <PerfCard
          icon={<TrendingUp className="h-3.5 w-3.5" />}
          label="Conversion"
          value="7.8%"
          delta="+2.4%"
        />
        <PerfCard
          icon={<Bell className="h-3.5 w-3.5" />}
          label="New Leads"
          value="312"
          delta="+18%"
        />

        {/* full-width analytics chart */}
        <div className="col-span-3 rounded-2xl border border-slate-900/10 bg-[#070f22] p-3">
          <div className="mb-1 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-semibold text-foreground">
                Weekly Performance
              </span>
              <span className="flex items-center gap-1 text-[9px] text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-[#3b82f6]" /> Visitors
                <span className="ml-1.5 h-1.5 w-1.5 rounded-full bg-[#06b6d4]" /> Leads
              </span>
            </div>
            <span className="flex items-center gap-1 text-[9px] text-[#22c55e]">
              <TrendingUp className="h-3 w-3" /> Trending up
            </span>
          </div>
          <AnalyticsChart height={92} />
        </div>
      </div>

      {/* bottom analytics bar */}
      <div className="mt-2.5 flex items-center gap-2 rounded-2xl border border-slate-900/10 bg-[#070f22] p-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-rose-500 to-orange-500">
          <Bot className="h-4 w-4 text-white" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-semibold text-foreground">
              AI Assistant
            </span>
            <span className="flex items-center gap-1 text-[9px] text-[#38bdf8]">
              <span className="h-1 w-1 rounded-full bg-[#38bdf8] animate-blink" />
              typing
            </span>
          </div>
          <div className="mt-1 flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0A0A0A]/40 animate-bounce [animation-delay:-0.2s]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#0A0A0A]/40 animate-bounce [animation-delay:-0.1s]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#0A0A0A]/40 animate-bounce" />
            <span className="ml-1.5 text-[10px] text-muted-foreground">
              Optimizing your landing page…
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function PerfCard({
  icon,
  label,
  value,
  delta,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  delta: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-900/10 bg-[#070f22] p-3">
      <div className="flex items-center gap-1.5 text-muted-foreground">
        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-slate-900/5 text-[#38bdf8]">
          {icon}
        </span>
        <span className="text-[10px]">{label}</span>
      </div>
      <div className="mt-1.5 text-base font-bold text-foreground">{value}</div>
      <div className="text-[9px] font-semibold text-[#22c55e]">{delta}</div>
    </div>
  );
}

/* ---------------- Floating accents ---------------- */
function FloatingLeadCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30, y: 20 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
      className="absolute -left-4 top-1/3 hidden sm:block lg:-left-10"
    >
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="glass-strong w-44 rounded-2xl p-3 glow-blue-sm"
      >
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#22c55e] to-[#0d9488] text-white">
            <Bell className="h-4 w-4" />
          </span>
          <div>
            <div className="text-[10px] text-muted-foreground">New lead</div>
            <div className="text-xs font-semibold text-foreground">
              Sarah just signed up
            </div>
          </div>
        </div>
        <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-[#0A0A0A]/10">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "72%" }}
            transition={{ duration: 1.4, delay: 1 }}
            className="h-full rounded-full bg-gradient-to-r from-rose-500 to-orange-500"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

function FloatingStatCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30, y: -20 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.8, delay: 0.85, ease: EASE }}
      className="absolute -right-3 top-6 hidden sm:block lg:-right-8"
    >
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
        className="glass-strong w-40 rounded-2xl p-3 glow-cyan"
      >
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-muted-foreground">Revenue</span>
          <TrendingUp className="h-3.5 w-3.5 text-[#22c55e]" />
        </div>
        <div className="mt-1 text-xl font-bold text-foreground">$48.2K</div>
        <div className="text-[9px] font-semibold text-[#22c55e]">
          +24% this month
        </div>
      </motion.div>
    </motion.div>
  );
}

function FloatingAIWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1, ease: EASE }}
      className="absolute -bottom-5 left-1/4 hidden sm:block"
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        className="glass-strong flex items-center gap-2 rounded-full py-2 pl-2 pr-4 glow-blue-sm"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-orange-500">
          <Bot className="h-4 w-4 text-white" />
        </span>
        <span className="text-xs font-medium text-foreground">
          AI optimized 3 pages
        </span>
      </motion.div>
    </motion.div>
  );
}

function FloatingGlowOrb() {
  return (
    <div className="absolute -right-10 -top-10 -z-10 h-32 w-32 rounded-full bg-[#3b82f6]/30 blur-2xl animate-pulse-glow" />
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { ArrowUp } from "lucide-react";

/**
 * Two premium scroll utilities:
 *  - A thin gradient progress bar pinned to the top of the viewport
 *  - A floating back-to-top button that fades in after scrolling
 */
export function ScrollUtilities() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* scroll progress bar */}
      <motion.div
        style={{ scaleX }}
        className="scroll-progress fixed inset-x-0 top-0 z-[60] h-0.5 origin-left"
        aria-hidden="true"
      />

      {/* back to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, y: 14, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.85 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={() =>
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
            aria-label="Back to top"
            className="group fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full glass-strong text-white shadow-[0_8px_30px_-6px_rgba(2,6,23,0.8)] transition-all duration-300 hover:border-[#3b82f6]/60 hover:text-[#38bdf8] hover:shadow-[0_0_28px_-4px_rgba(59,130,246,0.7)]"
          >
            <ArrowUp className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
            <span className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-[#2563eb]/0 to-[#06b6d4]/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:from-[#2563eb]/20 group-hover:to-[#06b6d4]/20" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

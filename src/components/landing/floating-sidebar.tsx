"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "solutions", label: "Solutions" },
  { id: "why-adwiser", label: "Why Adwiser?" },
  { id: "founder-team", label: "Founder & Team" },
  { id: "testimonials", label: "Testimonials" },
  { id: "faq", label: "FAQs" },
  { id: "contact", label: "Contact" },
];

export function FloatingSidebar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sidebar only when scrolled down a bit
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Determine active section
      const sections = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
      
      let currentActive = activeSection;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2) {
            currentActive = section.id;
            break;
          }
        }
      }
      setActiveSection(currentActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initially
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed right-6 top-1/2 z-50 -translate-y-1/2">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="glass-strong flex flex-col items-center gap-6 rounded-full py-6 px-4 shadow-[0_8px_40px_-12px_rgba(15,23,42,0.1)]"
          >
            {SECTIONS.map((section) => {
              const isActive = activeSection === section.id;
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="group relative flex items-center justify-center h-4 w-4"
                  aria-label={section.label}
                >
                  <AnimatePresence mode="wait">
                    {isActive && (
                      <motion.span
                        key="active-label"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10, transition: { duration: 0.1 } }}
                        className="absolute right-8 whitespace-nowrap text-sm font-medium text-foreground"
                      >
                        {section.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  <motion.div
                    layout
                    className={`rounded-full transition-colors duration-300 ${
                      isActive 
                        ? "h-3 w-3 bg-foreground" 
                        : "h-1.5 w-1.5 bg-foreground/30 group-hover:bg-foreground/50"
                    }`}
                  />
                </a>
              );
            })}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

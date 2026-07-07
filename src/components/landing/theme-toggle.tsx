"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Avoid hydration mismatch by rendering a placeholder of the exact same size
    return <div className="h-[34px] w-[64px]" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex h-[34px] w-[64px] items-center rounded-full border border-border bg-surface-elevated p-1 shadow-inner transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      aria-label="Toggle theme"
    >
      <span className="sr-only">Toggle theme</span>
      
      {/* Sliding background pill */}
      <div
        className={`absolute h-6 w-6 rounded-full bg-background shadow-sm transition-transform duration-300 ease-in-out ${
          isDark ? "translate-x-[28px]" : "translate-x-0"
        }`}
      />
      
      {/* Icons container */}
      <div className="relative flex w-full justify-between px-1">
        <Sun
          className={`h-[14px] w-[14px] transition-colors duration-300 ${
            isDark ? "text-muted-foreground" : "text-primary"
          }`}
        />
        <Moon
          className={`h-[14px] w-[14px] transition-colors duration-300 ${
            isDark ? "text-primary" : "text-muted-foreground"
          }`}
        />
      </div>
    </button>
  );
}

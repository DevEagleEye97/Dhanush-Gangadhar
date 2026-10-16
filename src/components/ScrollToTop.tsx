"use client";

import { ArrowUp } from "lucide-react";

export function ScrollToTopButton() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-border-main bg-bg-card hover:border-accent text-text-muted hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ml-auto md:ml-2"
      aria-label="Scroll back to top of page"
    >
      <ArrowUp className="w-3 h-3" />
      <span>Top</span>
    </button>
  );
}

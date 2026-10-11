import { NotesSection } from "@/components/NotesSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notes & Engineering Journal",
  description: "Curated engineering notes, networking tutorials, cybersecurity lab reflections, and build-in-public logs by Bond.",
};

export default function NotesPage() {
  return (
    <div className="pt-6 sm:pt-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-4">
        <div className="p-6 rounded-2xl border border-border-main bg-bg-secondary/40">
          <p className="text-xs font-mono uppercase tracking-wider text-accent font-semibold mb-1">
            TECHNICAL JOURNAL
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary">
            Notes & Engineering Journal
          </h1>
          <p className="text-sm text-text-secondary mt-2 max-w-2xl leading-relaxed">
            Written notes documenting systems exploration, breakdown of networking protocols, reflections from hackathons, and learnings from independent software experiments.
          </p>
        </div>
      </div>
      <NotesSection limit={20} showViewAllLink={false} />
    </div>
  );
}

import { LearningTimeline } from "@/components/LearningTimeline";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learning Journey",
  description: "Chronological curriculum log tracking networking, Linux systems, cybersecurity fundamentals, C/Python, and web engineering.",
};

export default function LearningPage() {
  return (
    <div className="pt-6 sm:pt-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-4">
        <div className="p-6 rounded-2xl border border-border-main bg-bg-secondary/40">
          <p className="text-xs font-mono uppercase tracking-wider text-accent font-semibold mb-1">
            CURRICULUM & LAB LOG
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary">
            Computer Science Learning Journey
          </h1>
          <p className="text-sm text-text-secondary mt-2 max-w-2xl leading-relaxed">
            A transparent chronicle of the technical concepts, RFCs, protocols, and operating system internals I have studied, practiced, and mastered through hands-on labs.
          </p>
        </div>
      </div>
      <LearningTimeline showViewAllLink={false} />
    </div>
  );
}

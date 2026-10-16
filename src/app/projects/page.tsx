import { ProjectsSection } from "@/components/ProjectsSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects & GitHub Repositories",
  description: "Explore all technical projects, cybersecurity tools, web applications, and software experiments by Dhanush Gangadhar, synchronized with GitHub.",
};

export default function ProjectsPage() {
  return (
    <div className="pt-6 sm:pt-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-4">
        <div className="p-6 rounded-2xl border border-border-main bg-bg-secondary/40">
          <p className="text-xs font-mono uppercase tracking-wider text-accent font-semibold mb-1">
            PROJECT CATALOG
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary">
            Engineering Projects & Tools
          </h1>
          <p className="text-sm text-text-secondary mt-2 max-w-2xl leading-relaxed">
            All tools, scripts, and software developed during my studies. Each project includes transparent documentation of problems encountered, design trade-offs, and technical learnings.
          </p>
        </div>
      </div>
      <ProjectsSection showViewAllLink={false} />
    </div>
  );
}

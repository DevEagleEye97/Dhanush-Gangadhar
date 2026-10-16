import { Metadata } from "next";
import { CybersecurityRoadmapView } from "@/components/CybersecurityRoadmapView";
import { Shield, Sparkles, BookOpen, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { portfolioConfig } from "@/config/portfolio";

export const metadata: Metadata = {
  title: "Cybersecurity Learning Hub | Dhanush Gangadhar",
  description:
    "Self-paced 7-week cybersecurity curriculum roadmap covering computing fundamentals, computer networking, Linux systems administration, Security+ concepts, authorized ethical hacking labs, SIEM operations, and cloud security governance.",
  openGraph: {
    title: "Cybersecurity Learning Hub — Dhanush Gangadhar",
    description:
      "A structured 7-week self-paced cybersecurity roadmap with authentic video lectures, verified Wireshark/Linux/Nmap/SIEM labs, and a persistent technical study journal.",
  },
};

export default function CybersecurityPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
          <Link
            href="/"
            className="hover:text-accent flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <span>/</span>
          <span className="text-text-primary">Cybersecurity Learning Hub</span>
        </div>

        {/* Hero Section */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border-main bg-bg-card text-xs font-mono tracking-widest text-text-secondary">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="uppercase text-[11px] font-semibold">
              7-WEEK STRUCTURED ROADMAP
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary">
            Cybersecurity Learning Hub
          </h1>

          <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
            A self-paced, foundational path based on the 7-Week Cybersecurity Course Plan.
            Each module pairs verified video lectures from leading computer science educators
            with practical, hands-on labs executed in isolated personal environments.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-text-muted">
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-accent" />
              <span>Free Public Curricula</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-accent" />
              <span>Authorized Labs Only</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-accent" />
              <span>Interactive Checklist & Journal</span>
            </span>
          </div>
        </div>

        {/* Roadmap Interactive Component */}
        <CybersecurityRoadmapView />
      </div>
    </div>
  );
}

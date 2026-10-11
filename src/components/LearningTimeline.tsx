"use client";

import { useState } from "react";
import { learningData } from "@/data/learning";
import { LearningGroup, LearningStatus } from "@/types/portfolio";
import Link from "next/link";
import { 
  GraduationCap, 
  CheckCircle, 
  Clock, 
  Activity, 
  ArrowRight,
  Filter
} from "lucide-react";

interface LearningTimelineProps {
  limit?: number;
  showViewAllLink?: boolean;
}

export function LearningTimeline({ limit, showViewAllLink = true }: LearningTimelineProps) {
  const [selectedGroup, setSelectedGroup] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");

  const groups = [
    "All",
    "Networking & CCNA",
    "Linux & Systems",
    "Cybersecurity",
    "C & Python",
    "Web Engineering",
    "Cloud & Infrastructure",
  ];

  const filteredItems = learningData.filter((item) => {
    const matchesGroup = selectedGroup === "All" || item.group === selectedGroup;
    const matchesStatus = selectedStatus === "All" || item.status === selectedStatus;
    return matchesGroup && matchesStatus;
  });

  const displayedItems = limit ? filteredItems.slice(0, limit) : filteredItems;

  const getStatusBadge = (status: LearningStatus) => {
    switch (status) {
      case "completed":
        return {
          icon: <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />,
          label: "Completed",
          classes: "text-emerald-600 dark:text-emerald-400 border-emerald-500/20 bg-emerald-500/10",
        };
      case "practiced":
        return {
          icon: <Activity className="w-3.5 h-3.5 text-amber-500" />,
          label: "Practiced in Labs",
          classes: "text-amber-600 dark:text-amber-400 border-amber-500/20 bg-amber-500/10",
        };
      case "learning":
        return {
          icon: <Clock className="w-3.5 h-3.5 text-sky-500" />,
          label: "Currently Learning",
          classes: "text-sky-600 dark:text-sky-400 border-sky-500/20 bg-sky-500/10",
        };
    }
  };

  return (
    <section id="learning" className="py-16 sm:py-24 border-b border-border-subtle scroll-mt-16 bg-bg-secondary/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <GraduationCap className="w-4 h-4 text-accent" />
              <span className="text-xs font-mono uppercase tracking-widest text-accent font-bold">
                CURRICULUM LOG
              </span>
            </div>
            <h2 className="text-3xl font-bold text-text-primary tracking-tight">
              Learning Journey & Topics
            </h2>
            <p className="text-sm text-text-secondary mt-1 max-w-xl">
              An authentic chronological record of computer science concepts, protocols, and systems. Only marked completed when validated through hands-on labs or projects.
            </p>
          </div>

          {showViewAllLink && (
            <Link
              href="/learning"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-text-secondary hover:text-accent font-semibold transition-colors self-start md:self-auto"
            >
              <span>Explore full syllabus ({learningData.length} topics)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        {/* Group Filter Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {groups.map((grp) => (
            <button
              key={grp}
              type="button"
              onClick={() => setSelectedGroup(grp)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-colors border ${
                selectedGroup === grp
                  ? "bg-accent text-accent-badge-text border-accent font-semibold shadow-xs"
                  : "bg-bg-card text-text-secondary border-border-main hover:border-text-muted hover:text-text-primary"
              }`}
            >
              {grp}
            </button>
          ))}
        </div>

        {/* Timeline Layout */}
        <div className="relative border-l border-border-main ml-3 sm:ml-6 pl-6 sm:pl-8 space-y-8">
          {displayedItems.map((entry) => {
            const badge = getStatusBadge(entry.status);
            return (
              <div key={entry.id} className="relative group">
                {/* Timeline Node Dot */}
                <span className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-bg-main bg-accent group-hover:scale-125 transition-transform" />

                <div className="p-5 sm:p-6 rounded-xl border border-border-main bg-bg-card hover:border-accent/60 transition-colors space-y-3">
                  {/* Top metadata */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                    <span className="text-accent font-semibold uppercase tracking-wider">
                      {entry.group}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-text-muted">{entry.period}</span>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] ${badge.classes}`}>
                        {badge.icon}
                        <span>{badge.label}</span>
                      </span>
                    </div>
                  </div>

                  {/* Topic Title */}
                  <h3 className="text-base sm:text-lg font-bold text-text-primary">
                    {entry.topic}
                  </h3>

                  {/* Explanation */}
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {entry.shortExplanation}
                  </p>

                  {/* Key Concepts Tag Row */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-2">
                    <span className="text-[10px] font-mono text-text-muted mr-1">Concepts:</span>
                    {entry.keyConcepts.map((concept) => (
                      <span
                        key={concept}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-bg-secondary text-text-secondary border border-border-subtle"
                      >
                        {concept}
                      </span>
                    ))}
                  </div>

                  {/* Related project banner if present */}
                  {entry.relatedProject && (
                    <div className="pt-3 mt-3 border-t border-border-subtle flex items-center justify-between text-xs font-mono text-text-muted">
                      <span>Related Project: <span className="text-text-primary font-medium">{entry.relatedProject}</span></span>
                      <Link href="#projects" className="text-accent hover:underline flex items-center gap-1">
                        <span>View Project</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

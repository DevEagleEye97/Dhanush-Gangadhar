"use client";

import { UnifiedProject } from "@/lib/github";
import { Project } from "@/types/portfolio";
import Link from "next/link";
import { 
  X, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Lightbulb, 
  Target, 
  Compass, 
  Layers,
  Code,
  Calendar,
  GitFork,
  Star
} from "lucide-react";
import { GithubIcon } from "@/components/SocialIcons";

interface CaseStudyModalProps {
  project: UnifiedProject | Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CaseStudyModal({ project, isOpen, onClose }: CaseStudyModalProps) {
  if (!isOpen || !project) return null;

  const isUnified = "updatedAt" in project;
  const unified = isUnified ? (project as UnifiedProject) : null;
  const standard = !isUnified ? (project as Project) : null;

  const title = project.title;
  const description = standard ? standard.shortDescription : (unified?.description ?? "");
  const category = project.category;
  const status = project.status;
  const githubUrl = project.githubUrl;
  const demoUrl = project.demoUrl;
  const caseStudy = project.caseStudy;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Case Study: ${title}`}
    >
      <div
        className="w-full max-w-3xl max-h-[90vh] rounded-xl border border-border-main bg-bg-card text-text-primary shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-border-main bg-bg-secondary/40 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-[11px] font-mono uppercase tracking-wider text-accent font-semibold">
                {category}
              </span>
              <span className="text-text-muted">•</span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-bg-card border border-border-main text-text-muted">
                {status}
              </span>
              {unified?.language && (
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-bg-card border border-border-subtle text-accent font-semibold">
                  {unified.language}
                </span>
              )}
            </div>
            <h2 className="text-xl font-bold text-text-primary">
              {title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg border border-border-main bg-bg-card text-text-muted hover:text-text-primary hover:border-accent transition-colors cursor-pointer"
            aria-label="Close case study"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 text-sm leading-relaxed">
          {/* Summary */}
          <p className="text-base text-text-secondary">
            {description}
          </p>

          {/* If structured case study exists */}
          {caseStudy ? (
            <>
              {/* Problem & Goal */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border border-border-subtle bg-bg-secondary/40 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase font-semibold text-text-muted">
                    <AlertCircle className="w-4 h-4 text-amber-500" />
                    <span>The Problem</span>
                  </div>
                  <p className="text-text-secondary text-xs leading-relaxed">
                    {caseStudy.problem}
                  </p>
                </div>

                <div className="p-4 rounded-lg border border-border-subtle bg-bg-secondary/40 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase font-semibold text-text-muted">
                    <Target className="w-4 h-4 text-accent" />
                    <span>The Goal</span>
                  </div>
                  <p className="text-text-secondary text-xs leading-relaxed">
                    {caseStudy.goal}
                  </p>
                </div>
              </div>

              {/* Approach */}
              <div className="space-y-2">
                <h3 className="text-xs font-mono uppercase tracking-wider text-accent font-bold flex items-center gap-2">
                  <Compass className="w-4 h-4" />
                  <span>Engineering Approach</span>
                </h3>
                <p className="text-text-secondary">
                  {caseStudy.approach}
                </p>
              </div>

              {/* Challenges & Learnings */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-text-muted font-bold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-400" />
                    <span>Technical Challenges</span>
                  </h3>
                  <ul className="space-y-2 text-xs text-text-secondary">
                    {caseStudy.challenges.map((c, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-accent mt-0.5">•</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-text-muted font-bold flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-accent" />
                    <span>Key Takeaways</span>
                  </h3>
                  <ul className="space-y-2 text-xs text-text-secondary">
                    {caseStudy.whatILearned.map((l, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                        <span>{l}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          ) : (
            /* Fallback for auto-discovered repo without custom case study */
            <div className="p-4 rounded-xl border border-border-subtle bg-bg-secondary/30 space-y-3 text-xs text-text-secondary">
              <p className="font-mono text-text-primary font-semibold">Repository Metadata:</p>
              <p>This project is automatically synced from public GitHub repository records.</p>
              {unified?.topics && unified.topics.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {unified.topics.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded bg-bg-card border border-border-main text-text-muted font-mono text-[10px]">
                      #{t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-border-main bg-bg-secondary/30 flex flex-wrap items-center justify-between gap-3">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-text-primary hover:text-accent font-semibold transition-colors"
          >
            <span>Read full project page</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <div className="flex items-center gap-2">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border-main bg-bg-card hover:bg-bg-secondary text-xs font-mono text-text-primary transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>Source Code</span>
              </a>
            )}

            {demoUrl && (
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent text-accent-badge-text font-medium text-xs font-mono transition-opacity hover:opacity-90"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

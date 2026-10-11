"use client";

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
  Layers 
} from "lucide-react";
import { GithubIcon } from "@/components/SocialIcons";

interface CaseStudyModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CaseStudyModal({ project, isOpen, onClose }: CaseStudyModalProps) {
  if (!isOpen || !project) return null;

  const { caseStudy } = project;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Case Study: ${project.title}`}
    >
      <div
        className="w-full max-w-3xl max-h-[90vh] rounded-xl border border-border-main bg-bg-card text-text-primary shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-border-main bg-bg-secondary/40 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-accent font-semibold">
                {project.category}
              </span>
              <span className="text-text-muted">•</span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-bg-card border border-border-main text-text-muted">
                {project.status}
              </span>
            </div>
            <h2 className="text-xl font-bold text-text-primary">
              {project.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg border border-border-main bg-bg-card text-text-muted hover:text-text-primary hover:border-accent transition-colors"
            aria-label="Close case study"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 text-sm leading-relaxed">
          {/* Summary */}
          <p className="text-base text-text-secondary">
            {project.shortDescription}
          </p>

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

          {/* Technology Choices */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-accent font-bold flex items-center gap-2">
              <Layers className="w-4 h-4" />
              <span>Technology Stack & Rationale</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {caseStudy.techChoices.map((choice, i) => (
                <div key={i} className="p-3 rounded-md border border-border-main bg-bg-secondary/20">
                  <p className="font-mono text-xs font-bold text-text-primary">{choice.tech}</p>
                  <p className="text-xs text-text-muted mt-1">{choice.rationale}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Challenges Faced */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-accent font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span>Key Challenges Encountered</span>
            </h3>
            <ul className="space-y-1.5 list-disc list-inside text-xs text-text-secondary">
              {caseStudy.challenges.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>

          {/* What I Learned */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-emerald-500 font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>What I Learned (Authentic Takeaways)</span>
            </h3>
            <ul className="space-y-1.5 list-disc list-inside text-xs text-text-secondary">
              {caseStudy.whatILearned.map((l, i) => (
                <li key={i}>{l}</li>
              ))}
            </ul>
          </div>

          {/* Future Improvements */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-text-muted font-bold flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-accent" />
              <span>Planned Future Improvements</span>
            </h3>
            <ul className="space-y-1.5 list-disc list-inside text-xs text-text-secondary">
              {caseStudy.futureImprovements.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="px-6 py-4 border-t border-border-main bg-bg-secondary/40 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-text-primary hover:text-accent border border-border-main px-3 py-1.5 rounded-md bg-bg-card transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>View Source</span>
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-text-primary hover:text-accent border border-border-main px-3 py-1.5 rounded-md bg-bg-card transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Live Demo</span>
              </a>
            )}
          </div>

          <Link
            href={`/projects/${project.slug}`}
            onClick={onClose}
            className="inline-flex items-center gap-1 text-xs font-mono text-accent hover:underline font-semibold"
          >
            <span>Open Dedicated Page</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

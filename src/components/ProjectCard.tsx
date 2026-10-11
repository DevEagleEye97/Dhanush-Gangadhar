"use client";

import { Project } from "@/types/portfolio";
import Link from "next/link";
import { ExternalLink, BookOpen, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/SocialIcons";

interface ProjectCardProps {
  project: Project;
  onOpenCaseStudy: (project: Project) => void;
}

export function ProjectCard({ project, onOpenCaseStudy }: ProjectCardProps) {
  const getStatusBadge = (status: Project["status"]) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
      case "In Progress":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
      case "Experiment":
        return "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20";
      case "Concept":
        return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20";
      default:
        return "bg-bg-secondary text-text-muted border-border-main";
    }
  };

  return (
    <article className="group rounded-xl border border-border-main bg-bg-card p-6 flex flex-col justify-between hover:border-accent/70 hover:shadow-sm transition-all duration-200">
      <div className="space-y-4">
        {/* Category & Status header */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="text-[11px] font-mono uppercase tracking-wider text-accent font-semibold">
            {project.category}
          </span>
          <span
            className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border ${getStatusBadge(
              project.status
            )}`}
          >
            {project.status}
          </span>
        </div>

        {/* Project Title */}
        <h3 className="text-lg font-bold text-text-primary group-hover:text-accent transition-colors leading-snug">
          <Link href={`/projects/${project.slug}`} className="hover:underline">
            {project.title}
          </Link>
        </h3>

        {/* Short Description */}
        <p className="text-sm text-text-secondary leading-relaxed">
          {project.shortDescription}
        </p>

        {/* Technologies Pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="text-[11px] font-mono px-2 py-0.5 rounded bg-bg-secondary text-text-muted border border-border-subtle"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-6 pt-4 border-t border-border-subtle flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => onOpenCaseStudy(project)}
          className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-text-primary hover:text-accent transition-colors"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Case Study</span>
        </button>

        <div className="flex items-center gap-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-md border border-border-main text-text-muted hover:text-text-primary hover:border-accent transition-colors"
              aria-label={`Source code for ${project.title}`}
              title="GitHub repository"
            >
              <GithubIcon className="w-3.5 h-3.5" />
            </a>
          )}

          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-md border border-border-main text-text-muted hover:text-text-primary hover:border-accent transition-colors"
              aria-label={`Live demo for ${project.title}`}
              title="Live demo"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}

          <Link
            href={`/projects/${project.slug}`}
            className="p-1.5 rounded-md border border-border-main text-text-muted hover:text-accent hover:border-accent transition-colors"
            aria-label={`View full details for ${project.title}`}
            title="View details"
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

"use client";

import { UnifiedProject } from "@/lib/github";
import { Project } from "@/types/portfolio";
import Link from "next/link";
import { ExternalLink, BookOpen, ArrowUpRight, Star, GitFork, Calendar, Code } from "lucide-react";
import { GithubIcon } from "@/components/SocialIcons";

interface ProjectCardProps {
  project: UnifiedProject | Project;
  onOpenCaseStudy: (project: UnifiedProject | Project) => void;
}

export function ProjectCard({ project, onOpenCaseStudy }: ProjectCardProps) {
  // Check if it's a UnifiedProject
  const isUnified = "updatedAt" in project;
  const unified = isUnified ? (project as UnifiedProject) : null;
  const standard = !isUnified ? (project as Project) : null;

  const title = project.title;
  const description = standard ? standard.shortDescription : (unified?.description ?? "");
  const category = project.category;
  const status = project.status;
  const githubUrl = project.githubUrl;
  const demoUrl = project.demoUrl;
  const slug = project.slug;

  const technologies = standard
    ? standard.technologies
    : [
        ...(unified?.language ? [unified.language] : []),
        ...(unified?.topics || []).slice(0, 4),
      ];

  const getStatusBadge = (st: string) => {
    switch (st.toLowerCase()) {
      case "completed":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
      case "active":
      case "in progress":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
      case "experiment":
        return "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20";
      case "fork":
        return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20";
      case "archived":
        return "bg-bg-secondary text-text-muted border-border-main";
      default:
        return "bg-bg-secondary text-text-muted border-border-main";
    }
  };

  return (
    <article className="group rounded-xl border border-border-main bg-bg-card p-6 flex flex-col justify-between hover:border-accent/70 hover:shadow-xs transition-all duration-200">
      <div className="space-y-4">
        {/* Category & Status header */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-accent font-semibold">
              {category}
            </span>
            {unified?.isFork && (
              <span className="inline-flex items-center gap-1 text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <GitFork className="w-2.5 h-2.5" />
                <span>Fork</span>
              </span>
            )}
          </div>

          <span
            className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border ${getStatusBadge(
              status
            )}`}
          >
            {status}
          </span>
        </div>

        {/* Project Title */}
        <h3 className="text-lg font-bold text-text-primary group-hover:text-accent transition-colors leading-snug">
          <Link href={`/projects/${slug}`} className="hover:underline">
            {title}
          </Link>
        </h3>

        {/* Short Description */}
        <p className="text-sm text-text-secondary leading-relaxed line-clamp-3">
          {description}
        </p>

        {/* Technologies / Topics Pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="text-[11px] font-mono px-2 py-0.5 rounded bg-bg-secondary text-text-muted border border-border-subtle"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Metrics metadata (Stars, Forks, Updated date if GitHub repo) */}
        {unified && (
          <div className="flex items-center gap-4 text-[11px] font-mono text-text-muted pt-1">
            {unified.formattedDate && (
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{unified.formattedDate}</span>
              </span>
            )}
            {unified.stars > 0 && (
              <span className="flex items-center gap-1 text-amber-400">
                <Star className="w-3 h-3 fill-current" />
                <span>{unified.stars}</span>
              </span>
            )}
            {unified.forks > 0 && (
              <span className="flex items-center gap-1">
                <GitFork className="w-3 h-3" />
                <span>{unified.forks}</span>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="mt-6 pt-4 border-t border-border-subtle flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => onOpenCaseStudy(project)}
          className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-text-primary hover:text-accent transition-colors cursor-pointer"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Case Study</span>
        </button>

        <div className="flex items-center gap-2">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-md border border-border-main text-text-muted hover:text-text-primary hover:border-accent transition-colors"
              aria-label={`Source code for ${title} on GitHub`}
              title="GitHub repository"
            >
              <GithubIcon className="w-3.5 h-3.5" />
            </a>
          )}

          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-md border border-border-main text-text-muted hover:text-text-primary hover:border-accent transition-colors"
              aria-label={`Live demo for ${title}`}
              title="Live demo"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}

          <Link
            href={`/projects/${slug}`}
            className="p-1.5 rounded-md border border-border-main text-text-muted hover:text-accent hover:border-accent transition-colors"
            aria-label={`View full details for ${title}`}
            title="View details"
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

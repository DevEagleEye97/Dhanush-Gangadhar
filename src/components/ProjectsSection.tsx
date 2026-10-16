"use client";

import { useState, useEffect, useMemo } from "react";
import { ProjectFilterCategory, githubProjectsConfig } from "@/config/github-projects";
import { UnifiedProject } from "@/lib/github";
import { Project } from "@/types/portfolio";
import { projectsData } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { CaseStudyModal } from "@/components/CaseStudyModal";
import Link from "next/link";
import { 
  ArrowRight, 
  FolderKanban, 
  RotateCw, 
  Search, 
  GitBranch, 
  ExternalLink, 
  Check, 
  AlertCircle 
} from "lucide-react";
import { GithubIcon } from "@/components/SocialIcons";

interface ProjectsSectionProps {
  limit?: number;
  showViewAllLink?: boolean;
}

const CATEGORIES: ProjectFilterCategory[] = [
  "All projects",
  "Cybersecurity",
  "Web development",
  "Software development",
  "AI & Automation",
  "Other experiments",
];

export function ProjectsSection({ limit, showViewAllLink = true }: ProjectsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectFilterCategory>("All projects");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<UnifiedProject | Project | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // GitHub repositories state
  const [projects, setProjects] = useState<UnifiedProject[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isFallback, setIsFallback] = useState(false);
  const [lastSynced, setLastSynced] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Load repositories on client mount
  const fetchRepositories = async (isManual = false) => {
    if (isManual) setIsRefreshing(true);
    else setIsLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/github-repos");
      if (!res.ok) throw new Error("Failed to load GitHub repositories");
      const data = await res.json();
      if (data.projects && Array.isArray(data.projects)) {
        setProjects(data.projects);
        setIsFallback(Boolean(data.isFallback));
        setLastSynced(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
      }
    } catch (err: any) {
      setErrorMsg("GitHub sync unavailable. Displaying local verified catalog.");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

  // Combine fetched GitHub repos with any existing static projects that aren't duplicates
  const allProjects = useMemo(() => {
    if (projects.length > 0) {
      return projects;
    }
    // Fallback to static projects if API hasn't loaded yet
    return projectsData.map((p) => ({
      id: p.id,
      slug: p.slug,
      name: p.title,
      title: p.title,
      description: p.shortDescription,
      category: (p.category === "Development" ? "Software development" : p.category) as ProjectFilterCategory,
      language: p.technologies[0] || null,
      topics: p.technologies,
      githubUrl: p.githubUrl || `https://github.com/${githubProjectsConfig.username}`,
      demoUrl: p.demoUrl || null,
      updatedAt: p.startedDate,
      formattedDate: "Recent",
      stars: 0,
      forks: 0,
      isFork: false,
      isArchived: false,
      isFeatured: Boolean(p.featured),
      status: p.status,
      caseStudy: p.caseStudy,
    })) as UnifiedProject[];
  }, [projects]);

  // Filter projects by active category and search keyword
  const filteredProjects = useMemo(() => {
    return allProjects.filter((project) => {
      const matchesCategory =
        activeCategory === "All projects" || project.category === activeCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        project.title.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        (project.language && project.language.toLowerCase().includes(q)) ||
        project.topics.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [allProjects, activeCategory, searchQuery]);

  const displayedProjects = limit ? filteredProjects.slice(0, limit) : filteredProjects;

  const handleOpenCaseStudy = (project: UnifiedProject | Project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  return (
    <section id="projects" className="py-16 sm:py-24 border-b border-border-subtle scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <FolderKanban className="w-4 h-4 text-accent" />
              <span className="text-xs font-mono uppercase tracking-widest text-accent font-bold">
                AUTOMATIC GITHUB INTEGRATION
              </span>
            </div>
            <h2 className="text-3xl font-bold text-text-primary tracking-tight">
              Selected Projects & Repositories
            </h2>
            <p className="text-sm text-text-secondary max-w-xl leading-relaxed">
              Real public repositories discovered automatically from{" "}
              <a
                href={`https://github.com/${githubProjectsConfig.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-primary font-medium hover:text-accent underline inline-flex items-center gap-0.5"
              >
                <span>@{githubProjectsConfig.username}</span>
                <ExternalLink className="w-3 h-3 inline" />
              </a>
              . Filter by focus area or inspect authentic codebases.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {/* Live GitHub status indicator & refresh button */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border-main bg-bg-card text-xs font-mono text-text-muted">
              <span className={`w-2 h-2 rounded-full ${isFallback ? "bg-amber-400" : "bg-emerald-400"} animate-pulse`} />
              <span>
                {isFallback ? "Cached Repos" : "GitHub Sync"} ({allProjects.length})
              </span>
              <button
                type="button"
                onClick={() => fetchRepositories(true)}
                disabled={isRefreshing}
                className="p-1 rounded hover:bg-bg-secondary text-text-muted hover:text-text-primary transition-colors ml-1 cursor-pointer"
                title="Refresh repositories from GitHub"
                aria-label="Refresh GitHub repositories"
              >
                <RotateCw className={`w-3 h-3 ${isRefreshing ? "animate-spin text-accent" : ""}`} />
              </button>
            </div>

            {showViewAllLink && (
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-text-secondary hover:text-accent font-semibold transition-colors self-start sm:self-auto"
              >
                <span>All projects ({allProjects.length})</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-3 rounded-xl border border-border-main bg-bg-card">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-colors cursor-pointer ${
                    active
                      ? "bg-accent text-white dark:text-[#101210] font-bold shadow-xs"
                      : "bg-bg-secondary/60 text-text-secondary hover:text-text-primary hover:bg-bg-secondary"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search bar */}
          <div className="relative min-w-[220px]">
            <Search className="w-3.5 h-3.5 text-text-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search repo or tech..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-border-main bg-bg-secondary/40 text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-accent font-mono"
            />
          </div>
        </div>

        {/* Error / Fallback Notice (if any) */}
        {errorMsg && (
          <div className="p-3 rounded-lg border border-amber-500/30 bg-amber-500/10 text-xs font-mono text-amber-300 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span>{errorMsg}</span>
            </span>
            <button
              onClick={() => fetchRepositories(true)}
              className="underline hover:text-amber-100"
            >
              Retry
            </button>
          </div>
        )}

        {/* Projects Grid */}
        {displayedProjects.length === 0 ? (
          <div className="p-12 rounded-xl border border-border-main bg-bg-card text-center space-y-3">
            <Search className="w-8 h-8 text-text-muted mx-auto" />
            <h3 className="text-base font-bold text-text-primary">No repositories found</h3>
            <p className="text-xs text-text-secondary max-w-sm mx-auto">
              No projects match the current filter &quot;{activeCategory}&quot; or search query &quot;{searchQuery}&quot;.
            </p>
            <button
              onClick={() => {
                setActiveCategory("All projects");
                setSearchQuery("");
              }}
              className="px-4 py-2 rounded-lg bg-bg-secondary hover:bg-bg-card border border-border-main text-xs font-mono text-text-primary transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpenCaseStudy={handleOpenCaseStudy}
              />
            ))}
          </div>
        )}

        {/* Footer info: Public GitHub API attribution */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-text-muted">
          <p className="flex items-center gap-1.5">
            <GitBranch className="w-3.5 h-3.5 text-accent" />
            <span>
              Real-time synchronization via public GitHub REST API
            </span>
          </p>

          <a
            href={`https://github.com/${githubProjectsConfig.username}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-accent underline flex items-center gap-1"
          >
            <span>View full repository index on GitHub</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Case Study Modal */}
      <CaseStudyModal
        project={selectedProject}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
}

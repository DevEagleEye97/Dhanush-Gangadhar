"use client";

import { useState } from "react";
import { Project, ProjectCategory } from "@/types/portfolio";
import { projectsData } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { CaseStudyModal } from "@/components/CaseStudyModal";
import Link from "next/link";
import { ArrowRight, FolderKanban } from "lucide-react";

interface ProjectsSectionProps {
  limit?: number;
  showViewAllLink?: boolean;
}

const CATEGORIES: ProjectCategory[] = [
  "All",
  "Cybersecurity",
  "Development",
  "AI & Automation",
  "Experiments",
];

export function ProjectsSection({ limit, showViewAllLink = true }: ProjectsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filteredProjects = projectsData.filter((project) => {
    if (activeCategory === "All") return true;
    return project.category === activeCategory;
  });

  const displayedProjects = limit ? filteredProjects.slice(0, limit) : filteredProjects;

  const handleOpenCaseStudy = (project: Project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  return (
    <section id="projects" className="py-16 sm:py-24 border-b border-border-subtle scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <FolderKanban className="w-4 h-4 text-accent" />
              <span className="text-xs font-mono uppercase tracking-widest text-accent font-bold">
                ENGINEERING WORK
              </span>
            </div>
            <h2 className="text-3xl font-bold text-text-primary tracking-tight">
              Selected Projects
            </h2>
            <p className="text-sm text-text-secondary mt-1 max-w-xl">
              Authentic tools, scripts, and applications built during my computer science journey. Filter by focus area or inspect detailed case studies.
            </p>
          </div>

          {showViewAllLink && (
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-text-secondary hover:text-accent font-semibold transition-colors self-start md:self-auto"
            >
              <span>View all projects ({projectsData.length})</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        {/* Filter Pills Bar */}
        <div 
          className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar"
          role="tablist"
          aria-label="Filter projects by category"
        >
          {CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat;
            const count = cat === "All" 
              ? projectsData.length 
              : projectsData.filter(p => p.category === cat).length;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                role="tab"
                aria-selected={isSelected}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-colors border ${
                  isSelected
                    ? "bg-accent text-accent-badge-text border-accent font-semibold shadow-xs"
                    : "bg-bg-card text-text-secondary border-border-main hover:border-text-muted hover:text-text-primary"
                }`}
              >
                <span>{cat}</span>
                <span className="ml-1.5 opacity-70 text-[10px]">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        {displayedProjects.length === 0 ? (
          <div className="p-12 text-center rounded-xl border border-dashed border-border-main bg-bg-card/50">
            <p className="text-sm text-text-muted">
              No projects in the &ldquo;{activeCategory}&rdquo; category yet.
            </p>
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

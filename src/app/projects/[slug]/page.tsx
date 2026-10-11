import { notFound } from "next/navigation";
import Link from "next/link";
import { projectsData } from "@/data/projects";
import { 
  ArrowLeft, 
  ExternalLink, 
  Target, 
  AlertCircle, 
  Compass, 
  Layers, 
  CheckCircle2, 
  Lightbulb, 
  Calendar 
} from "lucide-react";
import { GithubIcon } from "@/components/SocialIcons";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} — Case Study`,
    description: project.shortDescription,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const { caseStudy } = project;

  return (
    <article className="py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Back Link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-mono text-text-muted hover:text-accent transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to all projects</span>
        </Link>

        {/* Header Block */}
        <div className="space-y-4 border-b border-border-main pb-8">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="text-accent uppercase tracking-wider font-semibold">
              {project.category}
            </span>
            <span className="text-text-muted">•</span>
            <span className="px-2 py-0.5 rounded border border-border-main bg-bg-secondary text-text-muted">
              {project.status}
            </span>
            <span className="text-text-muted">•</span>
            <span className="flex items-center gap-1 text-text-muted">
              <Calendar className="w-3.5 h-3.5" />
              <span>Started {project.startedDate}</span>
              {project.completedDate && <span>(Completed {project.completedDate})</span>}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary tracking-tight leading-tight">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
            {project.shortDescription}
          </p>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border-main bg-bg-card hover:border-accent text-text-primary text-xs font-mono transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>View Source Code</span>
              </a>
            )}

            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-accent-badge-text text-xs font-mono font-medium hover:opacity-90 transition-opacity"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Launch Demo</span>
              </a>
            )}
          </div>
        </div>

        {/* Case Study Content */}
        <div className="space-y-12">
          {/* Problem & Goal Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl border border-border-main bg-bg-card space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-amber-500">
                <AlertCircle className="w-4 h-4" />
                <span>The Problem & Need</span>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                {caseStudy.problem}
              </p>
            </div>

            <div className="p-6 rounded-xl border border-border-main bg-bg-card space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-accent">
                <Target className="w-4 h-4" />
                <span>The Goal & Scope</span>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                {caseStudy.goal}
              </p>
            </div>
          </div>

          {/* Approach */}
          <div className="space-y-4 p-6 rounded-xl border border-border-main bg-bg-card">
            <h2 className="text-base font-bold text-text-primary flex items-center gap-2">
              <Compass className="w-4 h-4 text-accent" />
              <span>Architectural & Engineering Approach</span>
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              {caseStudy.approach}
            </p>
          </div>

          {/* Technology Choices */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-text-primary flex items-center gap-2">
              <Layers className="w-4 h-4 text-accent" />
              <span>Technology Choices & Rationale</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {caseStudy.techChoices.map((tc, idx) => (
                <div key={idx} className="p-4 rounded-lg border border-border-main bg-bg-secondary/40">
                  <p className="font-mono text-xs font-bold text-text-primary">{tc.tech}</p>
                  <p className="text-xs text-text-secondary mt-1 leading-relaxed">{tc.rationale}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Key Challenges */}
          <div className="space-y-4 p-6 rounded-xl border border-border-main bg-bg-card">
            <h2 className="text-base font-bold text-text-primary flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400" />
              <span>Obstacles & Edge Cases Overcome</span>
            </h2>
            <ul className="space-y-2 list-disc list-inside text-sm text-text-secondary leading-relaxed">
              {caseStudy.challenges.map((c, idx) => (
                <li key={idx}>{c}</li>
              ))}
            </ul>
          </div>

          {/* What I Learned */}
          <div className="space-y-4 p-6 rounded-xl border border-accent-border bg-accent-surface/30">
            <h2 className="text-base font-bold text-text-primary flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>What I Learned (Authentic Takeaways)</span>
            </h2>
            <ul className="space-y-2.5 list-disc list-inside text-sm text-text-secondary leading-relaxed">
              {caseStudy.whatILearned.map((item, idx) => (
                <li key={idx} className="text-text-primary font-normal">{item}</li>
              ))}
            </ul>
          </div>

          {/* Future Improvements */}
          <div className="space-y-4 p-6 rounded-xl border border-border-main bg-bg-card">
            <h2 className="text-base font-bold text-text-primary flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-accent" />
              <span>Future Improvements & Roadmap</span>
            </h2>
            <ul className="space-y-2 list-disc list-inside text-sm text-text-secondary leading-relaxed">
              {caseStudy.futureImprovements.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="pt-8 border-t border-border-main flex items-center justify-between">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-mono text-text-muted hover:text-accent transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Projects Catalog</span>
          </Link>
          <Link
            href="/learning"
            className="inline-flex items-center gap-2 text-xs font-mono text-accent hover:underline"
          >
            <span>Inspect Learning Journey</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

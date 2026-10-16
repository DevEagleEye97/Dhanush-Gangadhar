import { notFound } from "next/navigation";
import Link from "next/link";
import { projectsData } from "@/data/projects";
import { getPublicRepositories, getRepoReadme, UnifiedProject } from "@/lib/github";
import { 
  ArrowLeft, 
  ExternalLink, 
  Target, 
  AlertCircle, 
  Compass, 
  Layers, 
  CheckCircle2, 
  Calendar,
  Star,
  GitFork,
  FileText,
  Code
} from "lucide-react";
import { GithubIcon } from "@/components/SocialIcons";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const staticParams = projectsData.map((project) => ({
    slug: project.slug,
  }));

  try {
    const { projects } = await getPublicRepositories();
    const githubParams = projects.map((p) => ({
      slug: p.slug,
    }));
    return [...staticParams, ...githubParams];
  } catch {
    return staticParams;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const standard = projectsData.find((p) => p.slug === slug);
  if (standard) {
    return {
      title: `${standard.title} — Case Study`,
      description: standard.shortDescription,
    };
  }

  const { projects } = await getPublicRepositories();
  const ghProject = projects.find((p) => p.slug === slug || p.name.toLowerCase() === slug.toLowerCase());
  if (ghProject) {
    return {
      title: `${ghProject.title} — GitHub Repository`,
      description: ghProject.description,
    };
  }

  return { title: "Project Not Found" };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  // 1. Check local static projects first
  const standard = projectsData.find((p) => p.slug === slug);

  // 2. Check GitHub projects
  let ghProject: UnifiedProject | undefined;
  let readmeContent: string | null = null;

  if (!standard) {
    const { projects } = await getPublicRepositories();
    ghProject = projects.find(
      (p) => p.slug === slug || p.name.toLowerCase() === slug.toLowerCase()
    );
    if (ghProject) {
      readmeContent = await getRepoReadme(ghProject.name);
    }
  }

  if (!standard && !ghProject) {
    notFound();
  }

  const title = standard ? standard.title : ghProject!.title;
  const description = standard ? standard.shortDescription : ghProject!.description;
  const category = standard ? standard.category : ghProject!.category;
  const status = standard ? standard.status : ghProject!.status;
  const githubUrl = standard ? standard.githubUrl : ghProject!.githubUrl;
  const demoUrl = standard ? standard.demoUrl : ghProject!.demoUrl;
  const technologies = standard
    ? standard.technologies
    : [
        ...(ghProject?.language ? [ghProject.language] : []),
        ...(ghProject?.topics || []),
      ];

  const caseStudy = standard ? standard.caseStudy : ghProject?.caseStudy;

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
              {category}
            </span>
            <span className="text-text-muted">•</span>
            <span className="px-2 py-0.5 rounded border border-border-main bg-bg-secondary text-text-muted">
              {status}
            </span>
            {ghProject && (
              <>
                <span className="text-text-muted">•</span>
                <span className="flex items-center gap-1 text-text-muted">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Updated {ghProject.formattedDate}</span>
                </span>
                {ghProject.stars > 0 && (
                  <span className="flex items-center gap-1 text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{ghProject.stars} stars</span>
                  </span>
                )}
                {ghProject.forks > 0 && (
                  <span className="flex items-center gap-1 text-text-muted">
                    <GitFork className="w-3.5 h-3.5" />
                    <span>{ghProject.forks} forks</span>
                  </span>
                )}
              </>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary tracking-tight leading-tight">
            {title}
          </h1>

          <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
            {description}
          </p>

          {/* Technology & Topics Pills */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {technologies.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded-md border border-border-main bg-bg-card font-mono text-xs text-text-secondary"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border-main bg-bg-card hover:border-accent text-text-primary text-xs font-mono transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>View on GitHub</span>
              </a>
            )}

            {demoUrl && (
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-white dark:text-[#101210] text-xs font-mono font-bold hover:opacity-90 transition-opacity"
              >
                <ExternalLink className="w-4 h-4 text-white dark:text-[#101210]" />
                <span>Launch Live Demo</span>
              </a>
            )}
          </div>
        </div>

        {/* Case Study Content or Repository README */}
        <div className="space-y-12">
          {caseStudy ? (
            <>
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
              {caseStudy.techChoices && caseStudy.techChoices.length > 0 && (
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
              )}

              {/* Key Challenges */}
              {caseStudy.challenges && caseStudy.challenges.length > 0 && (
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
              )}

              {/* What I Learned */}
              {caseStudy.whatILearned && caseStudy.whatILearned.length > 0 && (
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
              )}
            </>
          ) : null}

          {/* Verified Repository README / Documentation */}
          {readmeContent ? (
            <div className="space-y-4 p-6 sm:p-8 rounded-xl border border-border-main bg-bg-card">
              <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-accent" />
                  <h2 className="text-sm font-mono font-bold text-text-primary uppercase tracking-wider">
                    Repository README.md
                  </h2>
                </div>
                <span className="text-[11px] font-mono text-text-muted">
                  Direct from GitHub
                </span>
              </div>
              <div className="prose prose-sm dark:prose-invert max-w-none text-xs font-mono text-text-secondary whitespace-pre-wrap leading-relaxed overflow-x-auto bg-bg-secondary/40 p-4 rounded-lg border border-border-subtle">
                {readmeContent}
              </div>
            </div>
          ) : !caseStudy ? (
            <div className="p-8 rounded-xl border border-border-main bg-bg-card text-center space-y-3">
              <Code className="w-8 h-8 text-text-muted mx-auto" />
              <h3 className="text-base font-bold text-text-primary">
                Public Repository Codebase
              </h3>
              <p className="text-xs text-text-secondary max-w-md mx-auto">
                This repository is actively tracked from Dhanush&apos;s public GitHub account. You can inspect commit histories, branch structures, and raw source files on GitHub.
              </p>
              {githubUrl && (
                <div className="pt-2">
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-bg-secondary hover:bg-bg-card border border-border-main text-xs font-mono text-text-primary transition-colors"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>Inspect Code on GitHub</span>
                    <ExternalLink className="w-3 h-3 text-text-muted" />
                  </a>
                </div>
              )}
            </div>
          ) : null}
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

import Link from "next/link";
import { portfolioConfig } from "@/config/portfolio";
import { ArrowDown, ArrowRight, ShieldCheck, Terminal, Layers, Globe, ExternalLink } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";

export function Hero() {
  return (
    <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-border-subtle overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Subtle background ambient grid marker */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: `24px 24px`,
          }}
          aria-hidden="true"
        />

        <div className="max-w-3xl relative z-10 space-y-6">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border-main bg-bg-card text-xs font-mono tracking-widest text-text-secondary">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="uppercase text-[11px] font-semibold">{portfolioConfig.eyebrow}</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary leading-[1.12]">
            {portfolioConfig.heroHeadline}
          </h1>

          {/* Supporting Copy */}
          <p className="text-lg sm:text-xl text-text-secondary leading-relaxed font-normal">
            {portfolioConfig.heroSupportingCopy}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="#projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-white dark:text-[#101210] font-semibold text-sm hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent shadow-xs"
            >
              <span>Explore my work</span>
              <ArrowDown className="w-4 h-4 text-white dark:text-[#101210]" />
            </Link>

            <Link
              href="/cybersecurity"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border-main bg-bg-card hover:bg-bg-secondary text-text-primary font-medium text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <span>Explore my learning path</span>
              <ArrowRight className="w-4 h-4 text-accent" />
            </Link>
          </div>

          {/* Verified Profiles Quick Links */}
          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-mono text-text-secondary">
            <span className="text-text-muted">Verified Profiles:</span>
            {portfolioConfig.githubUrl && (
              <a
                href={portfolioConfig.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-border-subtle bg-bg-secondary/60 hover:text-text-primary hover:border-border-main transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5 text-text-muted" />
                <span>GitHub</span>
                <ExternalLink className="w-3 h-3 text-text-muted" />
              </a>
            )}

            {portfolioConfig.linkedinUrl && (
              <a
                href={portfolioConfig.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-border-subtle bg-bg-secondary/60 hover:text-text-primary hover:border-border-main transition-colors"
              >
                <LinkedinIcon className="w-3.5 h-3.5 text-text-muted" />
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3 text-text-muted" />
              </a>
            )}

            {portfolioConfig.existingPortfolioUrl && (
              <a
                href={portfolioConfig.existingPortfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-border-subtle bg-bg-secondary/60 hover:text-text-primary hover:border-border-main transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-text-muted" />
                <span>Live Portfolio</span>
                <ExternalLink className="w-3 h-3 text-text-muted" />
              </a>
            )}
          </div>
        </div>

        {/* Compact Information & Positioning Strip */}
        <div className="mt-12 pt-8 border-t border-border-subtle grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-start gap-3 p-3.5 rounded-lg border border-border-subtle bg-bg-card/70">
            <div className="p-2 rounded-md bg-bg-secondary text-accent border border-border-main/60 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-text-muted">Primary Focus</p>
              <p className="text-sm font-semibold text-text-primary">Cybersecurity & Networks</p>
              <p className="text-xs text-text-secondary">Defensive labs, packet analysis & Linux</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-lg border border-border-subtle bg-bg-card/70">
            <div className="p-2 rounded-md bg-bg-secondary text-accent border border-border-main/60 shrink-0">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-text-muted">Engineering</p>
              <p className="text-sm font-semibold text-text-primary">Software & Automations</p>
              <p className="text-xs text-text-secondary">Python CLI tools, C programs & Next.js</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-lg border border-border-subtle bg-bg-card/70">
            <div className="p-2 rounded-md bg-bg-secondary text-accent border border-border-main/60 shrink-0">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-text-muted">Venture</p>
              <p className="text-sm font-semibold text-text-primary">Velora Digital</p>
              <p className="text-xs text-text-secondary">Digital growth & automation systems</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

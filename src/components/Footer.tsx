import { portfolioConfig } from "@/config/portfolio";
import { Mail, FileText, Globe } from "lucide-react";
import { GithubIcon, LinkedinIcon, TelegramIcon } from "@/components/SocialIcons";
import { ScrollToTopButton } from "@/components/ScrollToTop";
import { CurrentYear } from "@/components/CurrentYear";

export function Footer() {
  return (
    <footer className="w-full border-t border-border-main bg-bg-secondary/40 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          {/* Brand & Tagline */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-base font-bold tracking-widest text-text-primary">
                {portfolioConfig.monogram}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full border border-border-main bg-bg-card text-text-muted font-mono">
                ENGINEERING LOG
              </span>
            </div>
            <p className="text-xs text-text-muted max-w-sm">
              Computer Science Engineering student exploring cybersecurity, networking, and software ventures. Documenting real work from first principles.
            </p>
          </div>

          {/* Social & External Links (Only shown if configured) */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-text-secondary">
            {portfolioConfig.githubUrl && (
              <a
                href={portfolioConfig.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            )}

            {portfolioConfig.linkedinUrl && (
              <a
                href={portfolioConfig.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
            )}

            {portfolioConfig.existingPortfolioUrl && (
              <a
                href={portfolioConfig.existingPortfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"
                aria-label="Existing Live Portfolio"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Existing Site</span>
              </a>
            )}

            {portfolioConfig.telegramUrl && (
              <a
                href={portfolioConfig.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"
                aria-label="Telegram Channel"
              >
                <TelegramIcon className="w-3.5 h-3.5" />
                <span>Telegram</span>
              </a>
            )}

            {portfolioConfig.email && (
              <a
                href={`mailto:${portfolioConfig.email}`}
                className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"
                aria-label="Email Address"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email</span>
              </a>
            )}

            {portfolioConfig.resumeUrl && (
              <a
                href={portfolioConfig.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"
                aria-label="Resume Document"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Resume</span>
              </a>
            )}

            {/* Back to top button */}
            <ScrollToTopButton />
          </div>
        </div>

        {/* Bottom copyright notice */}
        <div className="pt-8 mt-8 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-text-muted font-mono">
          <p>© <CurrentYear /> {portfolioConfig.displayName}. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span>Built with Next.js & Tailwind CSS</span>
            <span>•</span>
            <span className="text-accent">Zero fabricated statistics</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { useState } from "react";
import { portfolioConfig } from "@/config/portfolio";
import { 
  Mail, 
  Copy, 
  Check, 
  FileText, 
  ArrowUpRight, 
  MessageSquare,
  Globe
} from "lucide-react";
import { GithubIcon, LinkedinIcon, TelegramIcon } from "@/components/SocialIcons";

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (portfolioConfig.email) {
      navigator.clipboard.writeText(portfolioConfig.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const contactCategories = [
    {
      title: "Internship & Apprenticeship",
      description: "Roles in cybersecurity, systems engineering, Linux operations, and backend software engineering.",
    },
    {
      title: "Hackathon Collaborations",
      description: "Looking for teammates with strong work ethics to build pragmatic, functional prototypes.",
    },
    {
      title: "Open-Source & Security Research",
      description: "Contributing to defensive tools, Linux audit scripts, or networking experiments.",
    },
    {
      title: "Velora & Growth Inquiries",
      description: "Discussions regarding automated workflows, digital systems, and custom dispatchers.",
    },
  ];

  return (
    <section id="contact" className="py-16 sm:py-24 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Context & Invites (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <MessageSquare className="w-4 h-4 text-accent" />
                <span className="text-xs font-mono uppercase tracking-widest text-accent font-bold">
                  DIRECT OUTREACH
                </span>
              </div>
              <h2 className="text-3xl font-bold text-text-primary tracking-tight">
                Let&apos;s Build Together
              </h2>
              <p className="text-sm text-text-secondary mt-2 max-w-xl leading-relaxed">
                I am actively seeking technical learning opportunities, internship roles, and focused collaborations. I value straightforward communication and thoughtful engineering questions.
              </p>
            </div>

            {/* Opportunities List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactCategories.map((cat, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl border border-border-main bg-bg-card space-y-1.5"
                >
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-text-primary">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Direct Email & Social Box (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl border border-border-main bg-bg-card space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-accent font-semibold">
                Direct Channel
              </span>
              <h3 className="text-xl font-bold text-text-primary">
                Reach Out Directly
              </h3>
              <p className="text-xs text-text-secondary">
                To guarantee message delivery without third-party form intermediaries, email directly:
              </p>
            </div>

            {/* Email Action Box */}
            {portfolioConfig.email ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg border border-border-main bg-bg-secondary text-xs font-mono">
                  <span className="truncate text-text-primary font-medium mr-2">
                    {portfolioConfig.email}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-bg-card hover:bg-bg-main border border-border-main text-text-secondary hover:text-text-primary transition-colors shrink-0"
                    title="Copy email to clipboard"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <a
                  href={`mailto:${portfolioConfig.email}?subject=Collaboration%20Inquiry%20—%20Dhanush%20Gangadhar`}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-accent-badge-text font-medium text-xs hover:opacity-90 transition-opacity"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Open in Mail Client</span>
                </a>
              </div>
            ) : (
              <p className="text-xs text-text-muted italic">
                Direct email is available via GitHub or LinkedIn contact channels.
              </p>
            )}

            {/* Social channels (only shown if set) */}
            <div className="pt-6 border-t border-border-subtle space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-text-muted block">
                Public Profiles
              </span>

              <div className="space-y-2">
                {portfolioConfig.githubUrl && (
                  <a
                    href={portfolioConfig.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-lg border border-border-main bg-bg-secondary/40 hover:bg-bg-secondary text-xs font-mono text-text-secondary hover:text-text-primary transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>GitHub</span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}

                {portfolioConfig.linkedinUrl && (
                  <a
                    href={portfolioConfig.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-lg border border-border-main bg-bg-secondary/40 hover:bg-bg-secondary text-xs font-mono text-text-secondary hover:text-text-primary transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <LinkedinIcon className="w-3.5 h-3.5" />
                      <span>LinkedIn</span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}

                {portfolioConfig.existingPortfolioUrl && (
                  <a
                    href={portfolioConfig.existingPortfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-lg border border-border-main bg-bg-secondary/40 hover:bg-bg-secondary text-xs font-mono text-text-secondary hover:text-text-primary transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Globe className="w-3.5 h-3.5 text-accent" />
                      <span>Live Portfolio (Vercel)</span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}

                {portfolioConfig.telegramUrl && (
                  <a
                    href={portfolioConfig.telegramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-lg border border-border-main bg-bg-secondary/40 hover:bg-bg-secondary text-xs font-mono text-text-secondary hover:text-text-primary transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <TelegramIcon className="w-3.5 h-3.5" />
                      <span>Telegram</span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}

                {portfolioConfig.resumeUrl && (
                  <a
                    href={portfolioConfig.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-lg border border-border-main bg-bg-secondary/40 hover:bg-bg-secondary text-xs font-mono text-text-secondary hover:text-text-primary transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5" />
                      <span>View Resume</span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

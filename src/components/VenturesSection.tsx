import { portfolioConfig } from "@/config/portfolio";
import { Rocket, ArrowUpRight, CheckCircle2, ShieldAlert, Cpu } from "lucide-react";

export function VenturesSection() {
  const { ventures } = portfolioConfig;

  return (
    <section id="ventures" className="py-16 sm:py-24 border-b border-border-subtle scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-1">
            <Rocket className="w-4 h-4 text-accent" />
            <span className="text-xs font-mono uppercase tracking-widest text-accent font-bold">
              ENTREPRENEURSHIP
            </span>
          </div>
          <h2 className="text-3xl font-bold text-text-primary tracking-tight">
            Ventures & Independent Products
          </h2>
          <p className="text-sm text-text-secondary mt-1 max-w-xl">
            Commercial and entrepreneurial initiatives built separate from academic experiments. Focusing on practical automation, resilience, and software utility.
          </p>
        </div>

        {/* Ventures Grid */}
        <div className="space-y-8">
          {ventures.map((venture) => (
            <div
              key={venture.id}
              className="rounded-2xl border border-border-main bg-bg-card p-6 sm:p-8 relative overflow-hidden"
            >
              {/* Top Accent Strip */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl font-bold text-text-primary">
                      {venture.name}
                    </h3>
                    <span className="text-xs font-mono px-2.5 py-0.5 rounded-full border border-accent-border bg-accent-surface text-accent font-semibold">
                      {venture.status}
                    </span>
                  </div>
                  <p className="text-sm text-text-muted font-mono mt-1">
                    {venture.tagline}
                  </p>
                </div>

                {venture.websiteUrl ? (
                  <a
                    href={venture.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-accent-badge-text font-medium text-xs hover:opacity-90 transition-opacity"
                  >
                    <span>Visit Website</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="text-xs font-mono px-3 py-1.5 rounded-md border border-border-main bg-bg-secondary text-text-muted">
                    Private Pilot / Closed Beta
                  </span>
                )}
              </div>

              {/* Main Description */}
              <p className="text-base text-text-secondary leading-relaxed max-w-3xl mb-8">
                {venture.description}
              </p>

              {/* Two Column Breakdown: Services & Philosophy */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-border-subtle">
                {/* Services / Focus */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-text-primary font-bold flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-accent" />
                    <span>Focus Areas & Solutions</span>
                  </h4>
                  <ul className="space-y-2">
                    {venture.services.map((service, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-xs text-text-secondary"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Operating Principles */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-text-primary font-bold flex items-center gap-2">
                    <Rocket className="w-4 h-4 text-accent" />
                    <span>Building Philosophy</span>
                  </h4>
                  <ul className="space-y-2">
                    {venture.approach.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-xs text-text-secondary"
                      >
                        <span className="font-mono text-accent text-xs">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Truth-in-Reporting Callout (No fake ARR, honest stage note) */}
              <div className="mt-8 p-4 rounded-xl border border-border-main bg-bg-secondary/40 flex items-start gap-3">
                <ShieldAlert className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-semibold text-text-primary">Current Stage: </span>
                  <span className="text-text-secondary">{venture.metricsNote}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

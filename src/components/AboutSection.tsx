import { portfolioConfig } from "@/config/portfolio";
import { User, GraduationCap, Compass, Target, CheckCircle2, ShieldCheck } from "lucide-react";

export function AboutSection() {
  const { education, areasOfInterest, professionalGoals, personalPrinciples } = portfolioConfig;

  return (
    <section id="about" className="py-16 sm:py-24 border-b border-border-subtle scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-1">
            <User className="w-4 h-4 text-accent" />
            <span className="text-xs font-mono uppercase tracking-widest text-accent font-bold">
              BACKGROUND & PHILOSOPHY
            </span>
          </div>
          <h2 className="text-3xl font-bold text-text-primary tracking-tight">
            About Me
          </h2>
          <p className="text-sm text-text-secondary mt-1 max-w-xl">
            A computer science student taking a disciplined, low-level approach to cybersecurity, network infrastructure, and software engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Narrative & Education Card (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Authentic Narrative */}
            <div className="prose prose-sm text-text-secondary leading-relaxed space-y-4">
              <p className="text-base text-text-primary font-medium">
                I am a computer science engineering undergraduate who believes the best way to master computing is to look under the hood.
              </p>
              <p>
                Rather than treating modern software frameworks and operating systems as opaque abstractions, I spend my time investigating packet captures, examining Linux permissions and kernel sockets, writing low-level scripts, and dissecting protocol standards.
              </p>
              <p>
                My trajectory combines academic engineering rigor with an active focus on cybersecurity. At the same time, I am building practical software and exploring independent ventures with <span className="text-text-primary font-semibold">Velora</span>, where I apply automation and systems engineering to solve real operational bottlenecks.
              </p>
            </div>

            {/* Education Profile Card */}
            <div className="p-6 rounded-xl border border-border-main bg-bg-card space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accent font-bold">
                <GraduationCap className="w-4 h-4" />
                <span>Academic Standing</span>
              </div>

              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-xs font-mono text-text-muted">Degree Program:</span>
                  <p className="font-semibold text-text-primary">{education.degree}</p>
                </div>
                <div>
                  <span className="text-xs font-mono text-text-muted">Status:</span>
                  <p className="text-text-secondary">{education.status}</p>
                </div>
                {education.university && (
                  <div>
                    <span className="text-xs font-mono text-text-muted">Institution:</span>
                    <p className="text-text-secondary">{education.university}</p>
                  </div>
                )}
                {education.locationLabel && (
                  <div>
                    <span className="text-xs font-mono text-text-muted">Location:</span>
                    <p className="text-text-secondary">{education.locationLabel}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Areas of Interest */}
            <div className="p-6 rounded-xl border border-border-main bg-bg-card space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accent font-bold">
                <Compass className="w-4 h-4" />
                <span>Primary Technical Interests</span>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {areasOfInterest.map((interest, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-text-secondary">
                    <span className="text-accent font-mono">•</span>
                    <span>{interest}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Principles & Goals (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Core Operating Principles */}
            <div className="p-6 rounded-xl border border-border-main bg-bg-card space-y-5">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accent font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Operating Principles</span>
              </div>

              <div className="space-y-4 divide-y divide-border-subtle">
                {personalPrinciples.map((principle, i) => (
                  <div key={i} className={i === 0 ? "space-y-1" : "pt-4 space-y-1"}>
                    <h4 className="text-sm font-bold text-text-primary">
                      {principle.title}
                    </h4>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      {principle.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Professional Goals */}
            <div className="p-6 rounded-xl border border-border-main bg-bg-card space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accent font-bold">
                <Target className="w-4 h-4" />
                <span>Current Roadmaps & Goals</span>
              </div>
              <ul className="space-y-2.5">
                {professionalGoals.map((goal, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-text-secondary">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                    <span>{goal}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

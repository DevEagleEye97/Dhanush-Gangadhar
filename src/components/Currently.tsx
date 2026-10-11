import { portfolioConfig } from "@/config/portfolio";
import { BookOpen, Hammer, Compass, Calendar } from "lucide-react";

export function Currently() {
  const { currentFocus } = portfolioConfig;

  return (
    <section className="py-12 sm:py-16 border-b border-border-subtle bg-bg-secondary/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
              <h2 className="text-xs font-mono uppercase tracking-widest text-accent font-bold">
                CURRENTLY
              </h2>
            </div>
            <p className="text-xl font-bold text-text-primary mt-1">
              Active Focus & Learning Queue
            </p>
          </div>

          {currentFocus.lastUpdated && (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-border-main bg-bg-card text-xs font-mono text-text-muted self-start sm:self-auto">
              <Calendar className="w-3.5 h-3.5 text-text-muted" />
              <span>Updated: {currentFocus.lastUpdated}</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 1. Learning */}
          <div className="p-5 rounded-xl border border-border-main bg-bg-card flex flex-col justify-between space-y-4 hover:border-accent/60 transition-colors">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-text-muted font-semibold">
                  01 / Academic & Skills
                </span>
                <span className="p-1.5 rounded-md bg-bg-secondary text-accent border border-border-main/50">
                  <BookOpen className="w-4 h-4" />
                </span>
              </div>
              <h3 className="text-base font-bold text-text-primary">
                Learning
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {currentFocus.learning}
              </p>
            </div>
            <div className="pt-3 border-t border-border-subtle flex items-center justify-between text-xs font-mono text-text-muted">
              <span>Status: Active Study</span>
              <span className="text-accent">• In Progress</span>
            </div>
          </div>

          {/* 2. Building */}
          <div className="p-5 rounded-xl border border-border-main bg-bg-card flex flex-col justify-between space-y-4 hover:border-accent/60 transition-colors">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-text-muted font-semibold">
                  02 / Code & Systems
                </span>
                <span className="p-1.5 rounded-md bg-bg-secondary text-accent border border-border-main/50">
                  <Hammer className="w-4 h-4" />
                </span>
              </div>
              <h3 className="text-base font-bold text-text-primary">
                Building
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {currentFocus.building}
              </p>
            </div>
            <div className="pt-3 border-t border-border-subtle flex items-center justify-between text-xs font-mono text-text-muted">
              <span>Status: Active Repos</span>
              <span className="text-accent">• Iterating</span>
            </div>
          </div>

          {/* 3. Exploring */}
          <div className="p-5 rounded-xl border border-border-main bg-bg-card flex flex-col justify-between space-y-4 hover:border-accent/60 transition-colors">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-text-muted font-semibold">
                  03 / Research & Ventures
                </span>
                <span className="p-1.5 rounded-md bg-bg-secondary text-accent border border-border-main/50">
                  <Compass className="w-4 h-4" />
                </span>
              </div>
              <h3 className="text-base font-bold text-text-primary">
                Exploring
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {currentFocus.exploring}
              </p>
            </div>
            <div className="pt-3 border-t border-border-subtle flex items-center justify-between text-xs font-mono text-text-muted">
              <span>Status: Prototyping</span>
              <span className="text-accent">• Brainstorming</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

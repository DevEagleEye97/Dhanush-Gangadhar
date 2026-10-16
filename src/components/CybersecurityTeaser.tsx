import Link from "next/link";
import { Shield, ArrowRight, CheckCircle2, Terminal, BookOpen } from "lucide-react";
import { cybersecurityRoadmap } from "@/data/cybersecurity-roadmap";

export function CybersecurityTeaser() {
  return (
    <section className="py-16 sm:py-20 border-b border-border-subtle bg-bg-secondary/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="p-8 sm:p-10 rounded-2xl border border-border-main bg-bg-card relative overflow-hidden">
          {/* Subtle background tech accent */}
          <div 
            className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-accent/5 blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-border/50 bg-accent-surface/50 text-xs font-mono tracking-widest text-accent">
                <Shield className="w-3.5 h-3.5" />
                <span className="uppercase text-[11px] font-semibold">
                  FEATURED LEARNING HUB
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
                7-Week Cybersecurity Course Plan
              </h2>

              <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                A structured, self-paced roadmap translating high-yield lecture resources into practical defense.
                Covers foundational security principles, Wireshark packet dissection, Linux VM hardening, CompTIA Security+ concepts, authorized ethical testing, SIEM log monitoring, and cloud identity governance.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-text-muted">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-accent" />
                  <span>Interactive Task Checklist</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-accent" />
                  <span>Hands-on Authorized Labs</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-accent" />
                  <span>Local Persistent Journal</span>
                </span>
              </div>

              <div className="pt-2">
                <Link
                  href="/cybersecurity"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-white dark:text-[#101210] font-bold text-xs font-mono tracking-wider uppercase hover:opacity-90 transition-opacity shadow-xs"
                >
                  <span>Launch Cybersecurity Hub</span>
                  <ArrowRight className="w-4 h-4 text-white dark:text-[#101210]" />
                </Link>
              </div>
            </div>

            {/* Right Mini Roadmap Highlights (5 cols) */}
            <div className="lg:col-span-5 space-y-2 border-t lg:border-t-0 lg:border-l border-border-subtle pt-6 lg:pt-0 lg:pl-8">
              <p className="text-xs font-mono uppercase tracking-wider text-text-muted font-semibold mb-3">
                Curriculum Snapshot
              </p>
              <div className="space-y-2">
                {cybersecurityRoadmap.slice(0, 4).map((mod) => (
                  <div
                    key={mod.week}
                    className="p-2.5 rounded-lg border border-border-subtle bg-bg-secondary/40 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="px-1.5 py-0.5 rounded bg-bg-card border border-border-main text-[10px] font-mono text-accent font-bold">
                        W0{mod.week}
                      </span>
                      <span className="text-text-primary font-medium truncate">
                        {mod.title}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-text-muted shrink-0 ml-2">
                      {mod.provider.split("/")[0].trim()}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-[11px] font-mono text-text-muted pt-2 text-right">
                + 3 more weeks (Hands-on labs, SOC Splunk & Cloud) →
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

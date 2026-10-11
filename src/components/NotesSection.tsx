import Link from "next/link";
import { notesData } from "@/data/notes";
import { FileText, ArrowRight, Clock, Calendar } from "lucide-react";

interface NotesSectionProps {
  limit?: number;
  showViewAllLink?: boolean;
}

export function NotesSection({ limit = 4, showViewAllLink = true }: NotesSectionProps) {
  const displayedNotes = limit ? notesData.slice(0, limit) : notesData;

  return (
    <section id="notes" className="py-16 sm:py-24 border-b border-border-subtle scroll-mt-16 bg-bg-secondary/15">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <FileText className="w-4 h-4 text-accent" />
              <span className="text-xs font-mono uppercase tracking-widest text-accent font-bold">
                ENGINEERING JOURNAL
              </span>
            </div>
            <h2 className="text-3xl font-bold text-text-primary tracking-tight">
              Notes & Build-in-Public
            </h2>
            <p className="text-sm text-text-secondary mt-1 max-w-xl">
              Unfiltered technical logs, breakdown of networking fundamentals, security takeaways, and lessons from building software under real constraints.
            </p>
          </div>

          {showViewAllLink && (
            <Link
              href="/notes"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-text-secondary hover:text-accent font-semibold transition-colors self-start md:self-auto"
            >
              <span>Read all notes ({notesData.length})</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayedNotes.map((note) => (
            <article
              key={note.slug}
              className="group p-6 rounded-xl border border-border-main bg-bg-card hover:border-accent/70 transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Metadata */}
                <div className="flex items-center justify-between text-xs font-mono text-text-muted">
                  <span className="text-accent uppercase tracking-wider font-semibold">
                    {note.category}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {note.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {note.readTime}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-text-primary group-hover:text-accent transition-colors leading-snug">
                  <Link href={`/notes/${note.slug}`}>
                    {note.title}
                  </Link>
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-text-secondary leading-relaxed">
                  {note.excerpt}
                </p>
              </div>

              {/* Read Link */}
              <div className="mt-6 pt-4 border-t border-border-subtle flex items-center justify-between">
                <Link
                  href={`/notes/${note.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-text-primary group-hover:text-accent transition-colors"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

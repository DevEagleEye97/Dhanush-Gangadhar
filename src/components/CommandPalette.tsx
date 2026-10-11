"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { portfolioConfig } from "@/config/portfolio";
import { 
  Search, 
  Terminal, 
  Sun, 
  Moon, 
  User, 
  FolderGit2, 
  GraduationCap, 
  Rocket, 
  FileText, 
  Mail, 
  ExternalLink,
  Copy,
  Check
} from "lucide-react";

interface CommandItem {
  id: string;
  title: string;
  subtitle?: string;
  category: "Navigation" | "Actions" | "External Links";
  icon: React.ReactNode;
  action: () => void;
  keywords?: string[];
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTerminal?: () => void;
}

export function CommandPalette({ isOpen, onClose, onOpenTerminal }: CommandPaletteProps) {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const copyEmail = () => {
    if (portfolioConfig.email) {
      navigator.clipboard.writeText(portfolioConfig.email);
      setCopiedEmail(true);
      setTimeout(() => {
        setCopiedEmail(false);
        onClose();
      }, 1200);
    }
  };

  const commands: CommandItem[] = [
    // Navigation
    {
      id: "nav-about",
      title: "About Bond",
      subtitle: "Background, education & principles",
      category: "Navigation",
      icon: <User className="w-4 h-4 text-accent" />,
      action: () => {
        router.push("/#about");
        onClose();
      },
      keywords: ["about", "bio", "education", "student", "philosophy"],
    },
    {
      id: "nav-projects",
      title: "Explore Projects",
      subtitle: "Filterable work, case studies & repos",
      category: "Navigation",
      icon: <FolderGit2 className="w-4 h-4 text-accent" />,
      action: () => {
        router.push("/projects");
        onClose();
      },
      keywords: ["projects", "code", "github", "packetlens", "audit", "security"],
    },
    {
      id: "nav-learning",
      title: "Learning Journey",
      subtitle: "Curriculum timeline & concept progress",
      category: "Navigation",
      icon: <GraduationCap className="w-4 h-4 text-accent" />,
      action: () => {
        router.push("/learning");
        onClose();
      },
      keywords: ["learning", "timeline", "networking", "ccna", "linux", "c", "python"],
    },
    {
      id: "nav-ventures",
      title: "Ventures — Velora",
      subtitle: "Digital growth & automation initiative",
      category: "Navigation",
      icon: <Rocket className="w-4 h-4 text-accent" />,
      action: () => {
        router.push("/#ventures");
        onClose();
      },
      keywords: ["ventures", "velora", "business", "automation", "saas"],
    },
    {
      id: "nav-notes",
      title: "Notes & Build Logs",
      subtitle: "Technical articles & engineering journal",
      category: "Navigation",
      icon: <FileText className="w-4 h-4 text-accent" />,
      action: () => {
        router.push("/notes");
        onClose();
      },
      keywords: ["notes", "journal", "tutorials", "articles", "logs"],
    },
    {
      id: "nav-contact",
      title: "Contact & Opportunities",
      subtitle: "Internships, hackathons & discussions",
      category: "Navigation",
      icon: <Mail className="w-4 h-4 text-accent" />,
      action: () => {
        router.push("/#contact");
        onClose();
      },
      keywords: ["contact", "email", "internship", "collaborate", "hire"],
    },

    // Actions
    {
      id: "action-terminal",
      title: "Launch Developer Terminal",
      subtitle: "Simulated portfolio CLI interface",
      category: "Actions",
      icon: <Terminal className="w-4 h-4 text-accent" />,
      action: () => {
        onClose();
        if (onOpenTerminal) onOpenTerminal();
      },
      keywords: ["terminal", "cli", "shell", "developer", "console"],
    },
    {
      id: "action-theme",
      title: theme === "dark" ? "Switch to Light Theme" : "Switch to Dark Theme",
      subtitle: "Toggle color appearance",
      category: "Actions",
      icon: theme === "dark" ? <Sun className="w-4 h-4 text-accent" /> : <Moon className="w-4 h-4 text-accent" />,
      action: () => {
        setTheme(theme === "dark" ? "light" : "dark");
        onClose();
      },
      keywords: ["theme", "dark", "light", "mode", "color"],
    },
    ...(portfolioConfig.email
      ? [
          {
            id: "action-copy-email",
            title: copiedEmail ? "Email Copied!" : "Copy Contact Email",
            subtitle: portfolioConfig.email,
            category: "Actions" as const,
            icon: copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-accent" />,
            action: copyEmail,
            keywords: ["email", "copy", "contact"],
          },
        ]
      : []),

    // External Links (only if configured)
    ...(portfolioConfig.githubUrl
      ? [
          {
            id: "link-github",
            title: "Open GitHub Profile",
            subtitle: "External profile repository",
            category: "External Links" as const,
            icon: <ExternalLink className="w-4 h-4 text-text-muted" />,
            action: () => {
              window.open(portfolioConfig.githubUrl!, "_blank", "noopener,noreferrer");
              onClose();
            },
            keywords: ["github", "git", "source", "code"],
          },
        ]
      : []),
    ...(portfolioConfig.linkedinUrl
      ? [
          {
            id: "link-linkedin",
            title: "Open LinkedIn Profile",
            subtitle: "Professional network profile",
            category: "External Links" as const,
            icon: <ExternalLink className="w-4 h-4 text-text-muted" />,
            action: () => {
              window.open(portfolioConfig.linkedinUrl!, "_blank", "noopener,noreferrer");
              onClose();
            },
            keywords: ["linkedin", "network", "career"],
          },
        ]
      : []),
  ];

  const filteredCommands = commands.filter((cmd) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    const matchesTitle = cmd.title.toLowerCase().includes(q);
    const matchesSubtitle = cmd.subtitle?.toLowerCase().includes(q);
    const matchesKeywords = cmd.keywords?.some((k) => k.toLowerCase().includes(q));
    return matchesTitle || matchesSubtitle || matchesKeywords;
  });

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Keyboard navigation inside palette
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredCommands.length || 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % (filteredCommands.length || 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-150"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div
        className="w-full max-w-xl rounded-xl border border-border-main bg-bg-card shadow-2xl overflow-hidden text-text-primary"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 border-b border-border-main gap-3 bg-bg-card">
          <Search className="w-4 h-4 text-text-muted shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search..."
            className="w-full py-3.5 text-sm bg-transparent border-0 focus:outline-none focus:ring-0 text-text-primary placeholder:text-text-muted"
          />
          <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono font-medium rounded border border-border-main bg-bg-secondary text-text-muted">
            ESC
          </kbd>
        </div>

        {/* Command List */}
        <div
          ref={listRef}
          className="max-h-80 overflow-y-auto p-2 space-y-1 divide-y divide-border-subtle/50"
          role="listbox"
        >
          {filteredCommands.length === 0 ? (
            <div className="py-8 text-center text-sm text-text-muted">
              No matching commands found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={cmd.id}
                  type="button"
                  onClick={cmd.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left text-sm transition-colors ${
                    isSelected
                      ? "bg-bg-secondary text-text-primary border border-border-main/50"
                      : "text-text-secondary hover:bg-bg-secondary/60 hover:text-text-primary border border-transparent"
                  }`}
                  role="option"
                  aria-selected={isSelected}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="shrink-0 p-1 rounded-md bg-bg-secondary border border-border-main/40">
                      {cmd.icon}
                    </span>
                    <div className="min-w-0">
                      <p className="font-medium truncate text-text-primary">{cmd.title}</p>
                      {cmd.subtitle && (
                        <p className="text-xs text-text-muted truncate">{cmd.subtitle}</p>
                      )}
                    </div>
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted shrink-0 ml-3">
                    {cmd.category}
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Footer info strip */}
        <div className="px-4 py-2 border-t border-border-main bg-bg-secondary/40 flex items-center justify-between text-[11px] text-text-muted">
          <span>Navigate with <kbd className="font-mono">↑</kbd> <kbd className="font-mono">↓</kbd></span>
          <span>Select with <kbd className="font-mono">↵</kbd></span>
        </div>
      </div>
    </div>
  );
}

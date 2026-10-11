"use client";

import { useState, useRef, useEffect } from "react";
import { portfolioConfig } from "@/config/portfolio";
import { projectsData } from "@/data/projects";
import { learningData } from "@/data/learning";
import { useTheme } from "next-themes";
import { Terminal as TerminalIcon, X, CornerDownLeft, Minimize2 } from "lucide-react";

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface OutputEntry {
  type: "input" | "output" | "error" | "system";
  text: string | React.ReactNode;
}

export function TerminalModal({ isOpen, onClose }: TerminalModalProps) {
  const { theme, setTheme } = useTheme();
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const [logs, setLogs] = useState<OutputEntry[]>([
    {
      type: "system",
      text: "Bond Digital HQ [Portfolio Shell v1.0.0]\nType 'help' to inspect available commands.",
    },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  // Safe allowlisted command executor
  const handleCommand = (rawInput: string) => {
    const trimmed = rawInput.trim();
    if (!trimmed) return;

    setHistory((prev) => [...prev, trimmed]);
    setHistoryIdx(-1);

    const parts = trimmed.split(" ");
    const cmd = parts[0].toLowerCase();

    const newLogs: OutputEntry[] = [
      ...logs,
      { type: "input", text: `bond@hq:~$ ${trimmed}` },
    ];

    switch (cmd) {
      case "help":
        newLogs.push({
          type: "output",
          text: (
            <div className="space-y-1 font-mono text-xs">
              <p className="text-accent font-semibold">Available simulated commands:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 pt-1 text-text-secondary">
                <p><span className="text-text-primary font-medium">about</span> — View student identity and focus</p>
                <p><span className="text-text-primary font-medium">projects</span> — List all projects and status</p>
                <p><span className="text-text-primary font-medium">learning</span> — Inspect current curriculum progress</p>
                <p><span className="text-text-primary font-medium">ventures</span> — Details on Velora</p>
                <p><span className="text-text-primary font-medium">socials</span> — View configured public channels</p>
                <p><span className="text-text-primary font-medium">contact</span> — Get direct contact information</p>
                <p><span className="text-text-primary font-medium">theme [dark|light]</span> — Toggle or set site theme</p>
                <p><span className="text-text-primary font-medium">clear</span> — Reset terminal output screen</p>
                <p><span className="text-text-primary font-medium">exit</span> — Close developer terminal</p>
              </div>
            </div>
          ),
        });
        break;

      case "about":
        newLogs.push({
          type: "output",
          text: (
            <div className="space-y-1.5 font-mono text-xs text-text-secondary">
              <p className="text-text-primary font-semibold">{portfolioConfig.displayName}</p>
              <p>{portfolioConfig.professionalHeadline}</p>
              <p className="text-text-muted">{portfolioConfig.shortBio}</p>
              <div className="pt-1">
                <span className="text-accent">Education: </span>
                {portfolioConfig.education.degree} ({portfolioConfig.education.status})
              </div>
            </div>
          ),
        });
        break;

      case "projects":
        newLogs.push({
          type: "output",
          text: (
            <div className="space-y-2 font-mono text-xs">
              <p className="text-accent font-semibold">Projects ({projectsData.length}):</p>
              <div className="space-y-1.5">
                {projectsData.map((p) => (
                  <div key={p.id} className="border-l-2 border-border-main pl-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-text-primary">{p.title}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-bg-secondary text-text-muted">
                        [{p.status}]
                      </span>
                    </div>
                    <p className="text-text-secondary text-[11px]">{p.shortDescription}</p>
                    <p className="text-text-muted text-[10px]">Stack: {p.technologies.join(", ")}</p>
                  </div>
                ))}
              </div>
            </div>
          ),
        });
        break;

      case "learning":
        newLogs.push({
          type: "output",
          text: (
            <div className="space-y-2 font-mono text-xs">
              <p className="text-accent font-semibold">Learning Roadmap Highlights:</p>
              <div className="space-y-1">
                {learningData.slice(0, 6).map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-[11px]">
                    <span className="text-text-primary">{item.topic}</span>
                    <span className={`text-[10px] uppercase font-bold ${
                      item.status === "completed" ? "text-emerald-400" : item.status === "practiced" ? "text-amber-400" : "text-sky-400"
                    }`}>
                      [{item.status}]
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-text-muted pt-1">Visit /learning for the complete tracking timeline.</p>
            </div>
          ),
        });
        break;

      case "ventures":
        newLogs.push({
          type: "output",
          text: (
            <div className="space-y-1.5 font-mono text-xs text-text-secondary">
              <p className="text-accent font-semibold">Venture: Velora</p>
              <p className="text-text-primary font-medium">{portfolioConfig.ventures[0].tagline}</p>
              <p>{portfolioConfig.ventures[0].description}</p>
              <p className="text-text-muted text-[11px] pt-1">Status: {portfolioConfig.ventures[0].status} — {portfolioConfig.ventures[0].metricsNote}</p>
            </div>
          ),
        });
        break;

      case "socials":
        newLogs.push({
          type: "output",
          text: (
            <div className="space-y-1 font-mono text-xs text-text-secondary">
              <p className="text-accent font-semibold">Configured Channels:</p>
              <p>• GitHub: {portfolioConfig.githubUrl || "[Not configured]"}</p>
              <p>• LinkedIn: {portfolioConfig.linkedinUrl || "[Not configured]"}</p>
              <p>• Telegram: {portfolioConfig.telegramUrl || "[Not configured]"}</p>
              <p>• Email: {portfolioConfig.email || "[Not configured]"}</p>
            </div>
          ),
        });
        break;

      case "contact":
        newLogs.push({
          type: "output",
          text: (
            <div className="space-y-1 font-mono text-xs text-text-secondary">
              <p className="text-accent font-semibold">Contact Invitation:</p>
              <p>Send project inquiries, internship opportunities, or hackathon collabs to:</p>
              <p className="text-text-primary font-bold">{portfolioConfig.email || "No email configured"}</p>
            </div>
          ),
        });
        break;

      case "theme": {
        const targetTheme = parts[1]?.toLowerCase();
        if (targetTheme === "dark" || targetTheme === "light") {
          setTheme(targetTheme);
          newLogs.push({
            type: "output",
            text: `Theme set to: ${targetTheme}`,
          });
        } else {
          const next = theme === "dark" ? "light" : "dark";
          setTheme(next);
          newLogs.push({
            type: "output",
            text: `Theme toggled to: ${next}`,
          });
        }
        break;
      }

      case "clear":
        setLogs([]);
        setInputVal("");
        return;

      case "exit":
      case "quit":
        onClose();
        return;

      default:
        newLogs.push({
          type: "error",
          text: `Command not found: "${cmd}". Type 'help' to view the allowlist of simulated portfolio commands.`,
        });
        break;
    }

    setLogs(newLogs);
    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIdx = historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(nextIdx);
      setInputVal(history[nextIdx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx === -1) return;
      const nextIdx = historyIdx + 1;
      if (nextIdx >= history.length) {
        setHistoryIdx(-1);
        setInputVal("");
      } else {
        setHistoryIdx(nextIdx);
        setInputVal(history[nextIdx]);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Developer Terminal"
    >
      <div
        className="w-full max-w-2xl h-[520px] max-h-[85vh] rounded-xl border border-border-main bg-terminal-bg text-terminal-text shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Window Header Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-border-main bg-bg-secondary/80 select-none">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="ml-2 font-mono text-xs text-text-muted flex items-center gap-1.5">
              <TerminalIcon className="w-3.5 h-3.5 text-accent" />
              bond@digital-hq: ~ (portfolio-cli)
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded text-text-muted hover:text-text-primary hover:bg-bg-card transition-colors"
              aria-label="Close terminal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Terminal Output Area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-2 font-mono text-xs leading-relaxed">
          {logs.map((log, index) => (
            <div key={index} className="space-y-1">
              {log.type === "input" ? (
                <div className="text-accent flex items-center gap-1.5 font-semibold">
                  <span>{log.text}</span>
                </div>
              ) : log.type === "error" ? (
                <div className="text-red-400 bg-red-950/20 px-2 py-1 rounded border border-red-900/30">
                  {log.text}
                </div>
              ) : log.type === "system" ? (
                <div className="text-text-muted whitespace-pre-wrap">
                  {log.text}
                </div>
              ) : (
                <div className="text-terminal-text">
                  {log.text}
                </div>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Terminal Input Prompt */}
        <div className="p-3 border-t border-border-main bg-bg-secondary/40 flex items-center gap-2 font-mono text-xs">
          <span className="text-accent font-semibold shrink-0 select-none">
            bond@hq:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="type 'help'..."
            className="flex-1 bg-transparent border-0 text-terminal-text focus:outline-none focus:ring-0 text-xs font-mono placeholder:text-text-muted"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck="false"
          />
          <button
            type="button"
            onClick={() => handleCommand(inputVal)}
            className="p-1 rounded hover:bg-bg-secondary text-text-muted hover:text-accent transition-colors"
            title="Execute command"
            aria-label="Execute command"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

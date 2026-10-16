"use client";

import { useState, useEffect, useMemo } from "react";
import { 
  cybersecurityRoadmap, 
  roadmapGuidanceList 
} from "@/data/cybersecurity-roadmap";
import { CybersecurityModule } from "@/types/portfolio";
import { YoutubeIcon } from "@/components/SocialIcons";
import { 
  Shield, 
  ShieldCheck, 
  ExternalLink, 
  CheckCircle2, 
  Circle, 
  Clock, 
  AlertTriangle, 
  Search, 
  BookOpen, 
  Sparkles, 
  CheckSquare, 
  RotateCcw, 
  Download, 
  FileEdit, 
  ChevronDown, 
  ChevronUp, 
  Layers, 
  ListOrdered,
  Calendar,
  Lock,
  Terminal,
  Info
} from "lucide-react";

interface ModuleProgress {
  status: "Not started" | "In progress" | "Completed";
  startDate?: string;
  completionDate?: string;
  checkedTasks: { [taskIndex: number]: boolean };
  deliverableAnswers: { [fieldId: string]: string };
  personalNotes: string;
}

interface AllProgressState {
  [weekNumber: number]: ModuleProgress;
}

const STORAGE_KEY = "bond_cybersecurity_hub_progress_v1";

export function CybersecurityRoadmapView() {
  const [activeWeek, setActiveWeek] = useState<number>(1);
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [progressState, setProgressState] = useState<AllProgressState>({});
  const [activeTab, setActiveTab] = useState<"overview" | "task" | "notes">("overview");
  const [expandedGuidance, setExpandedGuidance] = useState<boolean>(true);
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);

  // Initialize from localStorage
  useEffect(() => {
    setIsClient(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setProgressState(JSON.parse(saved));
      }
    } catch {
      // LocalStorage unavailable / blocked
    }
  }, []);

  // Sync to localStorage
  const saveProgress = (newState: AllProgressState) => {
    setProgressState(newState);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    } catch {
      // Ignore quota errors
    }
  };

  // Get progress for a specific module
  const getModuleProgress = (week: number): ModuleProgress => {
    return (
      progressState[week] || {
        status: "Not started",
        checkedTasks: {},
        deliverableAnswers: {},
        personalNotes: cybersecurityRoadmap.find((m) => m.week === week)?.defaultNotesTemplate || "",
      }
    );
  };

  // Update a single module's progress
  const updateModuleProgress = (week: number, patch: Partial<ModuleProgress>) => {
    const current = getModuleProgress(week);
    const updated = { ...current, ...patch };

    // Auto-derive status if status wasn't explicitly patched
    if (!patch.status) {
      const moduleMeta = cybersecurityRoadmap.find((m) => m.week === week);
      const totalChecks = moduleMeta?.checklists.length || 0;
      const completedChecks = Object.values(updated.checkedTasks || {}).filter(Boolean).length;

      if (completedChecks === 0 && !updated.startDate) {
        updated.status = "Not started";
      } else if (completedChecks >= totalChecks && totalChecks > 0) {
        updated.status = "Completed";
        if (!updated.completionDate) {
          updated.completionDate = new Date().toISOString().split("T")[0];
        }
      } else {
        updated.status = "In progress";
      }
    }

    const nextState = {
      ...progressState,
      [week]: updated,
    };
    saveProgress(nextState);
  };

  const toggleChecklist = (week: number, taskIdx: number) => {
    const current = getModuleProgress(week);
    const updatedTasks = {
      ...current.checkedTasks,
      [taskIdx]: !current.checkedTasks[taskIdx],
    };
    
    // Automatically set start date if first checked
    const startDate = current.startDate || new Date().toISOString().split("T")[0];
    updateModuleProgress(week, { checkedTasks: updatedTasks, startDate });
  };

  const handleDeliverableChange = (week: number, fieldId: string, value: string) => {
    const current = getModuleProgress(week);
    const updatedAnswers = {
      ...current.deliverableAnswers,
      [fieldId]: value,
    };
    updateModuleProgress(week, { deliverableAnswers: updatedAnswers });
  };

  const handleNotesChange = (week: number, notes: string) => {
    updateModuleProgress(week, { personalNotes: notes });
  };

  const handleResetProgress = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setProgressState({});
      setShowResetConfirm(false);
    } catch {
      // Ignored
    }
  };

  const handleExportNotes = () => {
    const exportData = cybersecurityRoadmap.map((mod) => {
      const prog = getModuleProgress(mod.week);
      return {
        week: mod.week,
        title: mod.title,
        courseName: mod.courseName,
        status: prog.status,
        startDate: prog.startDate || null,
        completionDate: prog.completionDate || null,
        deliverableAnswers: prog.deliverableAnswers,
        personalNotes: prog.personalNotes,
      };
    });

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cybersecurity-learning-journal-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Derive genuine stats based strictly on user-checked items
  const overallStats = useMemo(() => {
    let totalChecklists = 0;
    let completedChecklists = 0;
    let modulesCompleted = 0;

    cybersecurityRoadmap.forEach((mod) => {
      totalChecklists += mod.checklists.length;
      const prog = progressState[mod.week];
      if (prog) {
        if (prog.status === "Completed") modulesCompleted++;
        if (prog.checkedTasks) {
          Object.values(prog.checkedTasks).forEach((isChecked) => {
            if (isChecked) completedChecklists++;
          });
        }
      }
    });

    const percentage = totalChecklists > 0 ? Math.round((completedChecklists / totalChecklists) * 100) : 0;

    return {
      totalChecklists,
      completedChecklists,
      modulesCompleted,
      totalModules: cybersecurityRoadmap.length,
      percentage,
    };
  }, [progressState]);

  // Filter modules based on search and status
  const filteredModules = useMemo(() => {
    return cybersecurityRoadmap.filter((mod) => {
      const prog = getModuleProgress(mod.week);
      const matchesStatus = 
        filterStatus === "All" || prog.status === filterStatus;
      
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        mod.title.toLowerCase().includes(q) ||
        mod.courseName.toLowerCase().includes(q) ||
        mod.topics.some((t) => t.toLowerCase().includes(q)) ||
        mod.practiceTask.title.toLowerCase().includes(q);

      return matchesStatus && matchesSearch;
    });
  }, [filterStatus, searchQuery, progressState]);

  const activeModule = useMemo(() => {
    return (
      cybersecurityRoadmap.find((m) => m.week === activeWeek) ||
      cybersecurityRoadmap[0]
    );
  }, [activeWeek]);

  const activeModuleProgress = getModuleProgress(activeModule.week);

  return (
    <div className="space-y-12">
      {/* Privacy & Browser-Local Warning Alert */}
      <div className="p-4 rounded-xl border border-border-main bg-bg-card flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-text-secondary">
        <div className="flex items-start sm:items-center gap-2.5">
          <Info className="w-4 h-4 text-accent shrink-0 mt-0.5 sm:mt-0" />
          <span>
            <strong className="text-text-primary">Browser-Local Persistence:</strong> Progress, tasks, and personal notes are stored directly in your local browser storage. They do not synchronize across devices and will be reset if browser cache is cleared.
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleExportNotes}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border-main hover:bg-bg-secondary text-text-primary font-mono transition-colors text-xs cursor-pointer"
            title="Download your notes and deliverables as a JSON file"
          >
            <Download className="w-3.5 h-3.5 text-accent" />
            <span>Export Notes</span>
          </button>
          <button
            onClick={() => setShowResetConfirm(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border-main hover:bg-red-500/10 hover:border-red-500/40 hover:text-red-400 text-text-muted font-mono transition-colors text-xs cursor-pointer"
            title="Reset all checked items and return to defaults"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="max-w-md w-full p-6 rounded-2xl border border-border-main bg-bg-card shadow-2xl space-y-4">
            <div className="flex items-center gap-2 text-red-400 font-bold">
              <AlertTriangle className="w-5 h-5" />
              <span>Confirm Reset</span>
            </div>
            <p className="text-sm text-text-secondary">
              This will clear all checked tasks, dates, and local deliverable entries across all 7 weeks in this browser. Are you sure you want to proceed?
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 rounded-lg border border-border-main text-text-secondary hover:text-text-primary text-xs font-mono"
              >
                Cancel
              </button>
              <button
                onClick={handleResetProgress}
                className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium text-xs font-mono"
              >
                Yes, Reset All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dashboard Metrics Header */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-border-main bg-bg-card space-y-1">
          <p className="text-xs font-mono text-text-muted uppercase tracking-wider">Overall Plan</p>
          <p className="text-2xl font-bold text-text-primary">7 Weekly Modules</p>
          <p className="text-xs text-text-secondary">Self-paced foundational curriculum</p>
        </div>

        <div className="p-4 rounded-xl border border-border-main bg-bg-card space-y-1">
          <p className="text-xs font-mono text-text-muted uppercase tracking-wider">Modules Completed</p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-text-primary">{overallStats.modulesCompleted}</span>
            <span className="text-xs font-mono text-text-muted">/ {overallStats.totalModules} Finished</span>
          </div>
          <p className="text-xs text-text-secondary">Marked through verified checklists</p>
        </div>

        <div className="p-4 rounded-xl border border-border-main bg-bg-card space-y-1">
          <p className="text-xs font-mono text-text-muted uppercase tracking-wider">Verified Tasks</p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-text-primary">{overallStats.completedChecklists}</span>
            <span className="text-xs font-mono text-text-muted">/ {overallStats.totalChecklists} Tasks</span>
          </div>
          <p className="text-xs text-text-secondary">Videos watched & hands-on labs executed</p>
        </div>

        <div className="p-4 rounded-xl border border-border-main bg-bg-card space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-mono text-text-muted uppercase tracking-wider">Track Progress</p>
            <span className="text-xs font-mono font-bold text-accent">{overallStats.percentage}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-bg-secondary border border-border-subtle overflow-hidden">
            <div 
              className="h-full bg-accent transition-all duration-300"
              style={{ width: `${overallStats.percentage}%` }}
            />
          </div>
          <p className="text-[11px] font-mono text-text-muted">Derived exclusively from completed tasks</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-3 rounded-xl border border-border-main bg-bg-card">
        {/* Status Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {(["All", "Not started", "In progress", "Completed"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-colors cursor-pointer ${
                filterStatus === status
                  ? "bg-accent text-accent-badge-text font-semibold shadow-xs"
                  : "bg-bg-secondary/60 text-text-secondary hover:text-text-primary hover:bg-bg-secondary"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative min-w-[240px]">
          <Search className="w-3.5 h-3.5 text-text-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search topic, course, or tool..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-border-main bg-bg-secondary/40 text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
      </div>

      {/* Main Split Grid: Module List & Active Module Deep Dive */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Weekly Roadmap Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-text-muted font-semibold">
              Weekly Modules (1 - 7)
            </h3>
            <span className="text-xs font-mono text-text-muted">
              {filteredModules.length} visible
            </span>
          </div>

          {filteredModules.length === 0 ? (
            <div className="p-8 rounded-xl border border-border-main bg-bg-card text-center space-y-2">
              <Search className="w-6 h-6 text-text-muted mx-auto" />
              <p className="text-sm font-medium text-text-primary">No modules found</p>
              <p className="text-xs text-text-muted">Try clearing your search query or status filter.</p>
            </div>
          ) : (
            filteredModules.map((module) => {
              const prog = getModuleProgress(module.week);
              const isActive = activeWeek === module.week;
              const totalChecks = module.checklists.length;
              const checkedCount = Object.values(prog.checkedTasks || {}).filter(Boolean).length;

              return (
                <div
                  key={module.week}
                  onClick={() => setActiveWeek(module.week)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer text-left ${
                    isActive
                      ? "border-accent bg-bg-card ring-1 ring-accent/30 shadow-xs"
                      : "border-border-main bg-bg-card/70 hover:border-border-main hover:bg-bg-card"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider ${
                        isActive ? "bg-accent text-accent-badge-text" : "bg-bg-secondary text-text-secondary border border-border-subtle"
                      }`}>
                        Week {module.week}
                      </span>
                      <span className="text-xs font-mono text-text-muted truncate">
                        {module.provider}
                      </span>
                    </div>

                    {/* Status Badge */}
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono ${
                      prog.status === "Completed"
                        ? "bg-accent/15 text-accent border border-accent/30 font-medium"
                        : prog.status === "In progress"
                        ? "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                        : "bg-bg-secondary text-text-muted border border-border-subtle"
                    }`}>
                      {prog.status === "Completed" ? (
                        <CheckCircle2 className="w-3 h-3 text-accent" />
                      ) : (
                        <Circle className="w-2.5 h-2.5" />
                      )}
                      <span>{prog.status}</span>
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-text-primary line-clamp-1">
                    {module.title}
                  </h4>
                  <p className="text-xs text-text-secondary line-clamp-2 mt-1">
                    {module.courseName}
                  </p>

                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-border-subtle text-[11px] font-mono text-text-muted">
                    <span className="flex items-center gap-1.5">
                      <CheckSquare className="w-3 h-3 text-accent" />
                      <span>{checkedCount}/{totalChecks} Tasks</span>
                    </span>
                    {module.estimatedDuration && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{module.estimatedDuration}</span>
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Column: Active Module Comprehensive Workspace (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 sm:p-8 rounded-2xl border border-border-main bg-bg-card space-y-6">
            {/* Header / Week banner */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-accent text-accent-badge-text text-xs font-mono font-bold tracking-wider uppercase">
                    Week {activeModule.week} of 7
                  </span>
                  <span className="text-xs font-mono text-text-muted">
                    {activeModule.provider}
                  </span>
                </div>

                {/* Status manual switcher */}
                <div className="flex items-center gap-2">
                  <label htmlFor="status-select" className="text-xs font-mono text-text-muted">Status:</label>
                  <select
                    id="status-select"
                    value={activeModuleProgress.status}
                    onChange={(e) =>
                      updateModuleProgress(activeModule.week, {
                        status: e.target.value as ModuleProgress["status"],
                      })
                    }
                    className="px-2.5 py-1 rounded-md border border-border-main bg-bg-secondary text-xs font-mono text-text-primary focus:outline-none focus:ring-1 focus:ring-accent"
                  >
                    <option value="Not started">Not started</option>
                    <option value="In progress">In progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-text-primary tracking-tight">
                {activeModule.title}
              </h2>
              <p className="text-sm text-text-secondary leading-relaxed">
                {activeModule.courseName}
              </p>
            </div>

            {/* Direct YouTube Resource Card */}
            <div className="p-4 rounded-xl border border-border-main bg-bg-secondary/40 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-red-400 font-semibold uppercase tracking-wider">
                    <YoutubeIcon className="w-4 h-4 text-red-500 fill-current" />
                    <span>Curated Video Resource</span>
                  </div>
                  <p className="text-sm font-semibold text-text-primary">
                    {activeModule.courseName}
                  </p>
                  {activeModule.estimatedDuration && (
                    <div className="flex items-center gap-1 text-xs font-mono text-text-muted">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Runtime: {activeModule.estimatedDuration}</span>
                    </div>
                  )}
                </div>

                <a
                  href={activeModule.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-medium text-xs tracking-wide transition-colors shrink-0 shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                >
                  <YoutubeIcon className="w-4 h-4 fill-current" />
                  <span>Watch on YouTube</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
                </a>
              </div>

              {/* Exact URL display for auditability */}
              <div className="pt-2 border-t border-border-subtle/80 flex items-center gap-1.5 text-[11px] font-mono text-text-muted truncate">
                <span className="text-text-secondary">Source Link:</span>
                <span className="truncate text-text-muted hover:text-text-primary">{activeModule.youtubeUrl}</span>
              </div>
            </div>

            {/* Sub-Tabs: Overview & Topics | Practical Lab Task | Personal Notes */}
            <div className="flex border-b border-border-subtle">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-4 py-2 text-xs font-mono font-semibold transition-colors border-b-2 cursor-pointer ${
                  activeTab === "overview"
                    ? "border-accent text-accent"
                    : "border-transparent text-text-secondary hover:text-text-primary"
                }`}
              >
                1. Topics & Checklist
              </button>
              <button
                onClick={() => setActiveTab("task")}
                className={`px-4 py-2 text-xs font-mono font-semibold transition-colors border-b-2 cursor-pointer ${
                  activeTab === "task"
                    ? "border-accent text-accent"
                    : "border-transparent text-text-secondary hover:text-text-primary"
                }`}
              >
                2. Practice Lab
              </button>
              <button
                onClick={() => setActiveTab("notes")}
                className={`px-4 py-2 text-xs font-mono font-semibold transition-colors border-b-2 cursor-pointer ${
                  activeTab === "notes"
                    ? "border-accent text-accent"
                    : "border-transparent text-text-secondary hover:text-text-primary"
                }`}
              >
                3. Technical Journal
              </button>
            </div>

            {/* TAB 1: Topics & Checklist */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Topics Covered */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-text-muted font-semibold">
                    Core Conceptual Topics
                  </h4>
                  <ul className="space-y-2">
                    {activeModule.topics.map((topic, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-text-secondary">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Practical Checklist */}
                <div className="space-y-3 pt-4 border-t border-border-subtle">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-text-muted font-semibold">
                      Module Verification Checklist
                    </h4>
                    <span className="text-[11px] font-mono text-text-muted">
                      Manual verification
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {activeModule.checklists.map((checkItem, idx) => {
                      const isChecked = !!activeModuleProgress.checkedTasks?.[idx];
                      return (
                        <label
                          key={idx}
                          className="flex items-start gap-3 p-3 rounded-lg border border-border-subtle hover:border-border-main bg-bg-secondary/20 hover:bg-bg-secondary/40 cursor-pointer transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleChecklist(activeModule.week, idx)}
                            className="mt-0.5 rounded border-border-main text-accent focus:ring-accent accent-[#C5E3A7]"
                          />
                          <span className={`text-xs leading-relaxed ${
                            isChecked ? "text-text-primary line-through opacity-70" : "text-text-primary"
                          }`}>
                            {checkItem}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Timeline metadata: start and completion date */}
                <div className="pt-4 border-t border-border-subtle grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                  <div>
                    <label className="text-text-muted block mb-1">Started Date:</label>
                    <input
                      type="date"
                      value={activeModuleProgress.startDate || ""}
                      onChange={(e) =>
                        updateModuleProgress(activeModule.week, { startDate: e.target.value })
                      }
                      className="w-full px-2.5 py-1.5 rounded-md border border-border-main bg-bg-secondary text-text-primary text-xs focus:ring-1 focus:ring-accent"
                    />
                  </div>
                  <div>
                    <label className="text-text-muted block mb-1">Completed Date:</label>
                    <input
                      type="date"
                      value={activeModuleProgress.completionDate || ""}
                      onChange={(e) =>
                        updateModuleProgress(activeModule.week, { completionDate: e.target.value })
                      }
                      className="w-full px-2.5 py-1.5 rounded-md border border-border-main bg-bg-secondary text-text-primary text-xs focus:ring-1 focus:ring-accent"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Practical Lab Task */}
            {activeTab === "task" && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-accent" />
                    <h3 className="text-sm font-bold text-text-primary">
                      {activeModule.practiceTask.title}
                    </h3>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {activeModule.practiceTask.description}
                  </p>
                </div>

                {/* Guidance snippet */}
                {activeModule.practiceTask.guidance && (
                  <div className="p-3.5 rounded-lg border border-border-subtle bg-bg-secondary/30 text-xs text-text-secondary space-y-1">
                    <p className="font-mono font-semibold text-text-primary">Recommended Approach:</p>
                    <p>{activeModule.practiceTask.guidance}</p>
                  </div>
                )}

                {/* Explicit Safety & Legal Warning */}
                {activeModule.practiceTask.warning && (
                  <div className="p-3.5 rounded-lg border border-amber-500/30 bg-amber-500/10 text-xs text-amber-200/90 flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <p className="leading-relaxed font-sans">{activeModule.practiceTask.warning}</p>
                  </div>
                )}

                {/* Deliverable Answer Fields */}
                {activeModule.practiceTask.deliverableFields && (
                  <div className="space-y-4 pt-3 border-t border-border-subtle">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-text-muted font-semibold">
                        Lab Observations & Deliverable Log
                      </h4>
                      <span className="text-[11px] font-mono text-accent">Auto-saved locally</span>
                    </div>

                    <div className="space-y-3.5">
                      {activeModule.practiceTask.deliverableFields.map((field) => (
                        <div key={field.id} className="space-y-1.5">
                          <label className="text-xs font-mono text-text-primary font-medium block">
                            {field.label}
                          </label>
                          <textarea
                            rows={3}
                            value={activeModuleProgress.deliverableAnswers?.[field.id] || ""}
                            onChange={(e) =>
                              handleDeliverableChange(activeModule.week, field.id, e.target.value)
                            }
                            placeholder={field.placeholder || "Enter your lab observation..."}
                            className="w-full p-2.5 rounded-lg border border-border-main bg-bg-secondary/40 text-text-primary text-xs font-mono placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-accent resize-y"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: Personal Notes */}
            {activeTab === "notes" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileEdit className="w-4 h-4 text-accent" />
                    <h3 className="text-xs font-mono uppercase tracking-wider text-text-muted font-semibold">
                      Markdown Notes & Syntax Reference
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono text-accent">Auto-saves on keystroke</span>
                </div>

                <p className="text-xs text-text-secondary">
                  Document key commands, protocol header offsets, architectural gotchas, or flashcard definitions.
                </p>

                <textarea
                  rows={14}
                  value={activeModuleProgress.personalNotes || ""}
                  onChange={(e) => handleNotesChange(activeModule.week, e.target.value)}
                  placeholder="## Module Notes..."
                  className="w-full p-3.5 rounded-xl border border-border-main bg-bg-secondary/40 text-text-primary font-mono text-xs leading-relaxed focus:outline-none focus:ring-1 focus:ring-accent resize-y placeholder:text-text-muted"
                />

                <div className="flex items-center justify-between text-[11px] font-mono text-text-muted">
                  <span>Character count: {(activeModuleProgress.personalNotes || "").length}</span>
                  <button
                    onClick={() => {
                      const template = activeModule.defaultNotesTemplate || "";
                      handleNotesChange(activeModule.week, template);
                    }}
                    className="text-text-secondary hover:text-accent underline cursor-pointer"
                  >
                    Restore default template
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ROADMAP GUIDANCE SECTION: 7 Essential Course Plan Principles */}
      <div className="p-6 sm:p-8 rounded-2xl border border-border-main bg-bg-card space-y-6">
        <div 
          onClick={() => setExpandedGuidance((prev) => !prev)}
          className="flex items-center justify-between cursor-pointer select-none"
        >
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-accent" />
            <div>
              <h3 className="text-base font-bold text-text-primary">
                Roadmap Study Guidance & Realistic Expectations
              </h3>
              <p className="text-xs text-text-secondary mt-0.5">
                Core principles from the 7-Week Cybersecurity Course Plan
              </p>
            </div>
          </div>
          <button className="p-1 rounded-md text-text-muted hover:text-text-primary">
            {expandedGuidance ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>

        {expandedGuidance && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2 border-t border-border-subtle">
            {roadmapGuidanceList.map((item, idx) => (
              <div 
                key={item.id} 
                className="p-4 rounded-xl border border-border-subtle bg-bg-secondary/30 space-y-1.5"
              >
                <div className="flex items-center gap-2 text-xs font-mono text-accent font-semibold">
                  <span>0{idx + 1}</span>
                  <span>/</span>
                  <span className="truncate">{item.rule}</span>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed font-sans">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

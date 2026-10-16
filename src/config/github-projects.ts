import { CaseStudy } from "@/types/portfolio";

export type ProjectFilterCategory =
  | "All projects"
  | "Cybersecurity"
  | "Web development"
  | "Software development"
  | "AI & Automation"
  | "Other experiments";

export interface GitHubRepoOverride {
  /** Custom display title if different from repo name */
  displayName?: string;
  /** Force a specific portfolio category */
  category?: Exclude<ProjectFilterCategory, "All projects">;
  /** Curated description when GitHub repo description is empty */
  customDescription?: string;
  /** Explicit project status */
  status?: "Active" | "Completed" | "Experiment" | "Concept" | "Maintenance";
  /** Feature on top of the list / home page */
  featured?: boolean;
  /** Optional case study notes written by you */
  caseStudy?: Partial<CaseStudy>;
  /** Live demo URL if not specified in GitHub repository homepage */
  demoUrl?: string | null;
}

export interface GitHubProjectsConfig {
  /** Public GitHub username */
  username: string;
  /** Repositories marked as featured */
  featuredRepos: string[];
  /** Repositories to hide from public portfolio display */
  hiddenRepos: string[];
  /** Per-repository overrides for custom categorization or descriptions */
  repoOverrides: Record<string, GitHubRepoOverride>;
}

export const githubProjectsConfig: GitHubProjectsConfig = {
  username: "DevEagleEye97",

  // Repositories prioritized at the top of the portfolio
  featuredRepos: [
    "Threat-X",
    "Shvasa-Banking-co",
    "basic-chess-game-",
    "Dhanush-Gangadhar",
  ],

  // Repositories hidden from portfolio (e.g. initial scratch/test repos)
  hiddenRepos: [
    "first-repo",
  ],

  // Manual enrichments — GitHub discovery supplies the base, overrides supply extra context
  repoOverrides: {
    "Threat-X": {
      displayName: "Threat-X — Digital Threat Investigation Tool",
      category: "Cybersecurity",
      status: "Active",
      featured: true,
      caseStudy: {
        problem: "Triaging threat evidence and investigating security indicators often requires switching across multiple disjointed tools during time-sensitive incidents.",
        goal: "Build an evidence-driven digital threat investigation tool designed to structure threat telemetry into an actionable product.",
        approach: "Built initially as an intensive hackathon prototype, now evolving into a structured cybersecurity investigative tool with streamlined indicator analysis.",
        challenges: [
          "Organizing threat indicator correlations into a clean, responsive interface",
          "Designing evidence ingestion workflows that don't overwhelm security operators",
        ],
        whatILearned: [
          "Translating hackathon architecture into modular, maintainable production components",
          "Structuring threat telemetry data models for rapid evidence verification",
        ],
        futureImprovements: [
          "Integrate automated STIX/TAXII threat intel feeds",
          "Add exportable incident investigation timeline reports",
        ],
      },
    },

    "Shvasa-Banking-co": {
      displayName: "Shvasa Banking — Modern Financial Web Platform",
      category: "Web development",
      status: "Active",
      customDescription: "Responsive online banking interface focusing on account management workflows, transaction visualizations, and clean frontend UX.",
      featured: true,
      caseStudy: {
        problem: "Traditional banking dashboards are often cluttered and confusing for modern users managing day-to-day accounts.",
        goal: "Develop an intuitive, performant financial interface with clear transaction histories and responsive controls.",
        approach: "Crafted accessible interface components using modern JavaScript and structured CSS layouts, prioritizing responsive accessibility.",
        challenges: [
          "State management across multi-step transaction and payment flows",
          "Ensuring responsive layout fidelity on mobile screens without horizontal clipping",
        ],
        whatILearned: [
          "Financial UI ergonomics and form validation patterns",
          "DOM state synchronization and modular styling architecture",
        ],
        futureImprovements: [
          "Add simulated two-factor authentication modal",
          "Implement spending categorization charts",
        ],
      },
    },

    "basic-chess-game-": {
      displayName: "Python Chess Game & Move Engine",
      category: "Software development",
      status: "Completed",
      customDescription: "Interactive chess implementation in Python with complete rule verification, board state evaluation, and turn mechanics.",
      featured: true,
      caseStudy: {
        problem: "Chess move validation requires tracking complex non-trivial board state conditions (castling, en passant, check, and checkmate).",
        goal: "Implement a complete, bug-free move validator and gameplay engine in Python from foundational data structures.",
        approach: "Represented the 8x8 board with coordinate matrices and designed piece-specific legal move generation algorithms.",
        challenges: [
          "Accurately detecting discovered checks and pinning states before allowing moves",
          "Handling special pawn promotion and king castling validation cleanly",
        ],
        whatILearned: [
          "Object-oriented state management for complex rule engines",
          "Algorithmic board traversal and performance considerations",
        ],
        futureImprovements: [
          "Implement Minimax engine with Alpha-Beta pruning for AI opponent",
          "Add PGN (Portable Game Notation) export and import support",
        ],
      },
    },

    "shvasaa": {
      displayName: "Shvasa Web Experience",
      category: "Web development",
      status: "Experiment",
      customDescription: "Frontend design system and responsive styling experiment exploring modern CSS layouts and typography.",
    },

    "Dhanush-Gangadhar": {
      displayName: "Personal Digital Headquarters & Learning Hub",
      category: "Web development",
      status: "Active",
      customDescription: "Source code for this personal portfolio, cybersecurity learning hub, and technical build-in-public headquarters.",
      featured: true,
      demoUrl: "https://dhanush-gangadhar.vercel.app/",
    },

    "Dhanush-Gangadhar.": {
      displayName: "Portfolio Workspace",
      category: "Web development",
      status: "Active",
      customDescription: "Main development workspace repository for portfolio site and cybersecurity hub.",
      demoUrl: "https://dhanush-gangadhar.vercel.app/",
    },
  },
};

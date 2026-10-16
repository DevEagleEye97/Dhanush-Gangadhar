export type ProjectCategory = 
  | "All"
  | "Cybersecurity"
  | "Development"
  | "AI & Automation"
  | "Experiments";

export type ProjectStatus = "Completed" | "In Progress" | "Experiment" | "Concept";

export interface CaseStudy {
  problem: string;
  goal: string;
  approach: string;
  techChoices: {
    tech: string;
    rationale: string;
  }[];
  challenges: string[];
  whatILearned: string[];
  futureImprovements: string[];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  category: "Cybersecurity" | "Development" | "AI & Automation" | "Experiments";
  technologies: string[];
  status: ProjectStatus;
  featured?: boolean;
  coverImage?: string;
  githubUrl?: string | null;
  demoUrl?: string | null;
  startedDate: string;
  completedDate?: string;
  caseStudy: CaseStudy;
}

export type LearningStatus = "learning" | "practiced" | "completed";

export type LearningGroup = 
  | "Networking & CCNA"
  | "Linux & Systems"
  | "Cybersecurity"
  | "C & Python"
  | "Web Engineering"
  | "Cloud & Infrastructure";

export interface LearningEntry {
  id: string;
  topic: string;
  group: LearningGroup;
  shortExplanation: string;
  period: string;
  status: LearningStatus;
  relatedProject?: string;
  notesLink?: string;
  keyConcepts: string[];
}

export type NoteCategory = 
  | "What I learned"
  | "Project development logs"
  | "Technical tutorials"
  | "Hackathon reflections"
  | "Business experiments"
  | "Useful resources";

export interface Note {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: NoteCategory;
  readTime: string;
  externalUrl?: string | null;
  content: string[]; // Structured paragraphs/blocks
}

export interface Venture {
  id: string;
  name: string;
  tagline: string;
  status: "Active Venture" | "Experiment" | "Concept";
  description: string;
  services: string[];
  websiteUrl?: string | null;
  metricsNote: string;
  approach: string[];
}

export interface CurrentFocus {
  lastUpdated: string;
  learning: string;
  building: string;
  exploring: string;
}

export interface PortfolioConfig {
  displayName: string;
  monogram: string;
  professionalHeadline: string;
  shortBio: string;
  eyebrow: string;
  heroHeadline: string;
  heroSupportingCopy: string;
  
  // Authentic Education (no fabricated universities or metrics)
  education: {
    degree: string;
    status: string;
    university: string | null;
    locationLabel: string | null;
  };

  areasOfInterest: string[];
  professionalGoals: string[];
  personalPrinciples: {
    title: string;
    description: string;
  }[];

  // Optional External Contact Links (null if not configured)
  domain: string | null;
  email: string | null;
  githubUrl: string | null;
  linkedinUrl: string | null;
  existingPortfolioUrl?: string | null;
  telegramUrl: string | null;
  resumeUrl: string | null;

  currentFocus: CurrentFocus;
  ventures: Venture[];
}

export interface PracticeTaskField {
  id: string;
  label: string;
  placeholder?: string;
}

export interface CybersecurityModule {
  week: number;
  title: string;
  courseName: string;
  provider: string;
  estimatedDuration?: string;
  youtubeUrl: string;
  isPlaylist?: boolean;
  topics: string[];
  practiceTask: {
    title: string;
    description: string;
    guidance?: string;
    warning?: string;
    deliverableFields?: PracticeTaskField[];
  };
  checklists: string[];
  defaultNotesTemplate?: string;
}

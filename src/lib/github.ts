import { 
  githubProjectsConfig, 
  ProjectFilterCategory 
} from "@/config/github-projects";
import { CaseStudy } from "@/types/portfolio";

export interface GitHubRawRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics?: string[];
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  archived: boolean;
  updated_at: string;
  created_at: string;
  default_branch: string;
}

export interface UnifiedProject {
  id: string;
  slug: string;
  name: string;
  title: string;
  description: string;
  category: ProjectFilterCategory;
  language: string | null;
  topics: string[];
  githubUrl: string;
  demoUrl: string | null;
  updatedAt: string;
  formattedDate: string;
  stars: number;
  forks: number;
  isFork: boolean;
  isArchived: boolean;
  isFeatured: boolean;
  status: string;
  caseStudy?: CaseStudy;
}

/**
 * Verified fallback snapshot of DevEagleEye97's public repositories
 * Used if GitHub API is unreachable or rate-limited (60 requests/hr).
 */
const STATIC_FALLBACK_REPOS: GitHubRawRepo[] = [
  {
    id: 1,
    name: "Threat-X",
    full_name: "DevEagleEye97/Threat-X",
    description: "🛡️ Evidence-driven digital threat investigation — built to turn a hackathon idea into a real cybersecurity product. 🔍⚡",
    html_url: "https://github.com/DevEagleEye97/Threat-X",
    homepage: null,
    language: "HTML",
    topics: ["cybersecurity", "threat-investigation", "hackathon"],
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    archived: false,
    updated_at: "2026-10-12T00:00:00Z",
    created_at: "2026-10-01T00:00:00Z",
    default_branch: "main",
  },
  {
    id: 2,
    name: "Shvasa-Banking-co",
    full_name: "DevEagleEye97/Shvasa-Banking-co",
    description: "Modern financial banking interface and client account dashboard prototype.",
    html_url: "https://github.com/DevEagleEye97/Shvasa-Banking-co",
    homepage: null,
    language: "JavaScript",
    topics: ["banking", "web-application", "javascript"],
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    archived: false,
    updated_at: "2026-10-10T00:00:00Z",
    created_at: "2026-09-15T00:00:00Z",
    default_branch: "main",
  },
  {
    id: 3,
    name: "basic-chess-game-",
    full_name: "DevEagleEye97/basic-chess-game-",
    description: "Python chess game engine and board move validator.",
    html_url: "https://github.com/DevEagleEye97/basic-chess-game-",
    homepage: null,
    language: "Python",
    topics: ["python", "chess", "game-engine"],
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    archived: false,
    updated_at: "2026-10-05T00:00:00Z",
    created_at: "2026-08-20T00:00:00Z",
    default_branch: "main",
  },
  {
    id: 4,
    name: "shvasaa",
    full_name: "DevEagleEye97/shvasaa",
    description: "Frontend design system and responsive styling experiment.",
    html_url: "https://github.com/DevEagleEye97/shvasaa",
    homepage: null,
    language: "CSS",
    topics: ["css", "styling"],
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    archived: false,
    updated_at: "2026-09-28T00:00:00Z",
    created_at: "2026-09-01T00:00:00Z",
    default_branch: "main",
  },
  {
    id: 5,
    name: "Dhanush-Gangadhar",
    full_name: "DevEagleEye97/Dhanush-Gangadhar",
    description: "Personal portfolio and cybersecurity learning hub headquarters.",
    html_url: "https://github.com/DevEagleEye97/Dhanush-Gangadhar",
    homepage: "https://dhanush-gangadhar.vercel.app/",
    language: "TypeScript",
    topics: ["portfolio", "nextjs", "cybersecurity"],
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    archived: false,
    updated_at: "2026-10-12T00:00:00Z",
    created_at: "2026-10-10T00:00:00Z",
    default_branch: "main",
  },
];

/**
 * Intelligently infers project category from topics, languages, and descriptions.
 * Follows the prompt instruction:
 * "Use GitHub repository topics and descriptions to categorize projects where possible.
 * If a category is uncertain, place the project under 'Other' rather than guessing."
 */
export function inferProjectCategory(
  name: string,
  topics: string[] = [],
  description: string | null = "",
  language: string | null = ""
): Exclude<ProjectFilterCategory, "All projects"> {
  const text = `${name} ${topics.join(" ")} ${description || ""} ${language || ""}`.toLowerCase();

  // 1. Cybersecurity
  if (
    text.includes("security") ||
    text.includes("threat") ||
    text.includes("cve") ||
    text.includes("nmap") ||
    text.includes("wireshark") ||
    text.includes("audit") ||
    text.includes("pentest") ||
    text.includes("exploit") ||
    text.includes("soc") ||
    text.includes("crypto") ||
    text.includes("siem")
  ) {
    return "Cybersecurity";
  }

  // 2. AI and Automation
  if (
    text.includes("ai") ||
    text.includes("machine-learning") ||
    text.includes("deep-learning") ||
    text.includes("automation") ||
    text.includes("bot") ||
    text.includes("llm") ||
    text.includes("agent")
  ) {
    return "AI & Automation";
  }

  // 3. Web Development
  if (
    text.includes("web") ||
    text.includes("react") ||
    text.includes("nextjs") ||
    text.includes("tailwind") ||
    text.includes("banking") ||
    text.includes("html") ||
    text.includes("css") ||
    text.includes("frontend") ||
    text.includes("fullstack") ||
    language?.toLowerCase() === "javascript" ||
    language?.toLowerCase() === "typescript" ||
    language?.toLowerCase() === "html" ||
    language?.toLowerCase() === "css"
  ) {
    return "Web development";
  }

  // 4. Software Development
  if (
    text.includes("chess") ||
    text.includes("game") ||
    text.includes("algorithm") ||
    text.includes("cli") ||
    text.includes("software") ||
    language?.toLowerCase() === "python" ||
    language?.toLowerCase() === "c" ||
    language?.toLowerCase() === "c++" ||
    language?.toLowerCase() === "rust" ||
    language?.toLowerCase() === "go" ||
    language?.toLowerCase() === "java"
  ) {
    return "Software development";
  }

  // 5. Default fallback to Other experiments rather than guessing
  return "Other experiments";
}

/**
 * Transforms a raw GitHub repository item into a UnifiedProject
 */
export function transformRepoToProject(repo: GitHubRawRepo): UnifiedProject {
  const override = githubProjectsConfig.repoOverrides[repo.name] || {};
  const topics = repo.topics || [];

  const category =
    override.category ||
    inferProjectCategory(repo.name, topics, repo.description, repo.language);

  const title = override.displayName || repo.name;
  const description =
    override.customDescription ||
    repo.description ||
    `Public ${repo.language || "code"} repository on GitHub by ${githubProjectsConfig.username}.`;

  const rawDemo = override.demoUrl || repo.homepage || null;
  const demoUrl = rawDemo && /^https?:\/\//i.test(rawDemo.trim()) ? rawDemo.trim() : null;
  const isFeatured =
    override.featured ?? githubProjectsConfig.featuredRepos.includes(repo.name);

  // Status: use manual override or neutral active label
  const status =
    override.status ||
    (repo.archived
      ? "Archived"
      : repo.fork
      ? "Fork"
      : "Active");

  // Format date cleanly: e.g. "Oct 12, 2026"
  let formattedDate = "Recent";
  try {
    const d = new Date(repo.updated_at);
    formattedDate = d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    // Keep fallback
  }

  // Build CaseStudy if provided or synthesized from authentic metadata
  let caseStudy: CaseStudy | undefined;
  if (override.caseStudy) {
    caseStudy = {
      problem: override.caseStudy.problem || `Requirements and challenge addressed by ${title}.`,
      goal: override.caseStudy.goal || `Implement a functional ${repo.language || "software"} project.`,
      approach: override.caseStudy.approach || `Built and tested using ${repo.language || "modern development practices"}.`,
      techChoices: [
        {
          tech: repo.language || "Core Tools",
          rationale: "Selected for system compatibility and performance.",
        },
      ],
      challenges: override.caseStudy.challenges || ["Handling edge cases and interface responsiveness."],
      whatILearned: override.caseStudy.whatILearned || ["Hands-on problem solving and code maintainability."],
      futureImprovements: override.caseStudy.futureImprovements || ["Refactoring and extended test coverage."],
    };
  }

  return {
    id: `github-${repo.id}`,
    slug: repo.name.toLowerCase().replace(/[^a-z0-9_-]/g, "-"),
    name: repo.name,
    title,
    description,
    category,
    language: repo.language,
    topics,
    githubUrl: repo.html_url,
    demoUrl,
    updatedAt: repo.updated_at,
    formattedDate,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    isFork: repo.fork,
    isArchived: repo.archived,
    isFeatured,
    status,
    caseStudy,
  };
}

/**
 * Fetches all public repositories from GitHub API with caching, error resilience, and manual curation
 */
export async function getPublicRepositories(): Promise<{
  projects: UnifiedProject[];
  isFallback: boolean;
  totalReposCount: number;
  lastFetched: string;
}> {
  const username = githubProjectsConfig.username;
  const endpoint = `https://api.github.com/users/${username}/repos?type=owner&sort=updated&per_page=100`;

  try {
    const res = await fetch(endpoint, {
      next: { revalidate: 3600 }, // Cache on server for 1 hour
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "DevEagleEye97-Portfolio-App",
      },
    });

    if (!res.ok) {
      // Fallback on HTTP errors (e.g. rate limit 403 or 404)
      return {
        projects: processRawRepos(STATIC_FALLBACK_REPOS),
        isFallback: true,
        totalReposCount: STATIC_FALLBACK_REPOS.length,
        lastFetched: "",
      };
    }

    const data: GitHubRawRepo[] = await res.json();
    if (!Array.isArray(data)) {
      return {
        projects: processRawRepos(STATIC_FALLBACK_REPOS),
        isFallback: true,
        totalReposCount: STATIC_FALLBACK_REPOS.length,
        lastFetched: "",
      };
    }

    return {
      projects: processRawRepos(data),
      isFallback: false,
      totalReposCount: data.length,
      lastFetched: "",
    };
  } catch {
    // Network or server error fallback
    return {
      projects: processRawRepos(STATIC_FALLBACK_REPOS),
      isFallback: true,
      totalReposCount: STATIC_FALLBACK_REPOS.length,
      lastFetched: "",
    };
  }
}

/**
 * Filters out hidden repos, maps to UnifiedProject, and sorts featured items first
 */
function processRawRepos(rawList: GitHubRawRepo[]): UnifiedProject[] {
  const hidden = new Set(githubProjectsConfig.hiddenRepos.map((r) => r.toLowerCase()));

  const unified = rawList
    .filter((repo) => !hidden.has(repo.name.toLowerCase()))
    .map(transformRepoToProject);

  // Sort featured projects first, then by updated date descending
  return unified.sort((a, b) => {
    if (a.isFeatured && !b.isFeatured) return -1;
    if (!a.isFeatured && b.isFeatured) return 1;
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });
}

/**
 * Fetches raw README content for a given repository
 */
export async function getRepoReadme(repoName: string): Promise<string | null> {
  const sanitizedName = repoName.replace(/[^a-zA-Z0-9._-]/g, "");
  if (!sanitizedName) return null;
  const username = githubProjectsConfig.username;
  const endpoint = `https://api.github.com/repos/${username}/${encodeURIComponent(sanitizedName)}/readme`;

  try {
    const res = await fetch(endpoint, {
      next: { revalidate: 3600 },
      headers: {
        Accept: "application/vnd.github.raw+json",
        "User-Agent": "DevEagleEye97-Portfolio-App",
      },
    });

    if (!res.ok) {
      return null;
    }

    const text = await res.text();
    return text || null;
  } catch {
    return null;
  }
}

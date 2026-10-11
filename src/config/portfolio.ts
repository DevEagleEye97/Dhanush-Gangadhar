import { PortfolioConfig } from "@/types/portfolio";

/**
 * BOND — PERSONAL DIGITAL HEADQUARTERS CONFIGURATION
 * 
 * Edit this file to update your personal details, external URLs, current focus,
 * and venture information. All unknown or unpurchased links are deliberately set to `null`
 * so the site never generates fake or broken links.
 */
export const portfolioConfig: PortfolioConfig = {
  displayName: "Bond",
  monogram: "BOND",
  professionalHeadline: "Computer Science Engineering Student | Aspiring Cybersecurity Professional | Software Builder",
  eyebrow: "COMPUTER SCIENCE · CYBERSECURITY · BUILDING",
  heroHeadline: "I build things. I learn how they work.",
  heroSupportingCopy: "I'm a computer science engineering student exploring cybersecurity, software engineering, and entrepreneurship. I document what I learn and turn ideas into working projects.",
  shortBio: "Computer science engineering student dedicated to understanding systems from first principles. Focusing on networking, Linux internals, defensive security practices, and shipping resilient software.",

  education: {
    degree: "Computer Science & Engineering",
    status: "Undergraduate Engineering Student",
    university: null, // Set to your university name when ready
    locationLabel: null, // Set to your region/city if desired
  },

  areasOfInterest: [
    "Cybersecurity and ethical security research",
    "Networking, Linux, and infrastructure",
    "Software engineering and web development",
    "Artificial intelligence and automation",
    "SaaS products and entrepreneurship",
    "Open-source projects and hackathons",
  ],

  professionalGoals: [
    "Build a rigorous, low-level foundation in computer networking, TCP/IP, and Linux operating systems.",
    "Develop practical defensive and offensive security methodology through hands-on labs and vulnerability analysis.",
    "Ship functional, cleanly architected web tools and automation systems that solve real problems.",
    "Turn technical problem-solving into sustainable digital ventures starting with Velora.",
  ],

  personalPrinciples: [
    {
      title: "First Principles Over Abstractions",
      description: "Understand the packet headers, memory allocations, and kernel calls before accepting high-level frameworks as black boxes.",
    },
    {
      title: "Build to Verify Understanding",
      description: "Passive reading creates the illusion of competence. Real understanding is proved by building small tools and fixing breaking edge cases.",
    },
    {
      title: "Radical Transparency",
      description: "Never fabricate credentials, metrics, or experience. Honest technical curiosity and steady iteration outlast inflated claims.",
    },
    {
      title: "Pragmatic Architecture",
      description: "Keep systems simple, robust, and readable. Avoid unnecessary bloat and maintain absolute control over the codebase.",
    },
  ],

  // Set external links here. Any null link is cleanly omitted or replaced with safe dev fallback.
  domain: null, // e.g. "https://bonddigital.me"
  email: "bond@example.com", // Set your preferred contact email
  githubUrl: "https://github.com/DevEagleEye97", // Configured personal GitHub profile
  linkedinUrl: null, // Set your LinkedIn profile URL when available
  telegramUrl: null, // Set your public Telegram channel/handle when available
  resumeUrl: null, // Link to your PDF resume when ready

  currentFocus: {
    lastUpdated: "October 2026",
    learning: "Networking protocols (TCP/IP stack, CIDR routing), Linux systems administration & C memory models, and fundamental web security concepts.",
    building: "Personal digital headquarters, modular automation utilities, and hands-on protocol packet parsers.",
    exploring: "Upcoming hackathon tracks, defensive security capture-the-flag (CTF) environments, and service architectures for Velora.",
  },

  ventures: [
    {
      id: "velora",
      name: "Velora",
      tagline: "Digital growth and automation venture",
      status: "Active Venture",
      description: "A focused entrepreneurial initiative exploring how automated workflows, modern web infrastructure, and data dispatchers can help digital creators and modern operators scale without manual overhead.",
      services: [
        "Automated Lead Ingestion & Webhook Dispatching",
        "Modern High-Performance Web Presence",
        "Workflow Automation & Data Synchronization",
        "Technical Systems Optimization",
      ],
      websiteUrl: null, // Add URL when production launch occurs
      metricsNote: "In active development. Currently testing automation pipelines and validating service offerings with initial pilot workflows.",
      approach: [
        "Focus on lean, reliable automation stacks rather than fragile multi-tool chains.",
        "Combine modern web engineering with robust backend integrations.",
        "Prioritize clear documentation and transparent client deliverables.",
      ],
    },
  ],
};

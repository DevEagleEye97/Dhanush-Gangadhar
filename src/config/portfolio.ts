import { PortfolioConfig } from "@/types/portfolio";

/**
 * BOND — PERSONAL DIGITAL HEADQUARTERS CONFIGURATION
 * 
 * Edit this file to update your personal details, external URLs, current focus,
 * and venture information. All unknown or unpurchased links are deliberately set to `null`
 * so the site never generates fake or broken links.
 */
export const portfolioConfig: PortfolioConfig = {
  displayName: "Dhanush Gangadhar",
  monogram: "DG",
  professionalHeadline: "Computer Science Engineering Student | Aspiring Cybersecurity Professional | Software Builder",
  eyebrow: "COMPUTER SCIENCE · CYBERSECURITY · BUILDING",
  heroHeadline: "Learning how systems work. Building what comes next.",
  heroSupportingCopy: "I'm Dhanush Gangadhar, a computer science engineering student exploring cybersecurity, networking, Linux, software development, and technology entrepreneurship. I document what I learn and put it into practice through projects and hands-on experiments.",
  shortBio: "Computer science engineering student dedicated to understanding systems from first principles. Focusing on networking, Linux internals, defensive security practices, and shipping resilient software.",

  education: {
    degree: "Computer Science & Engineering",
    status: "Undergraduate Engineering Student",
    university: null, // Left configurable - no fabricated credentials
    locationLabel: null, // Set to your region/city if desired
  },

  areasOfInterest: [
    "Cybersecurity and ethical security research",
    "Networking, Linux, and infrastructure",
    "Software engineering and web development",
    "Artificial intelligence and automation",
    "Technology entrepreneurship & digital ventures",
    "Open-source projects and hands-on labs",
  ],

  professionalGoals: [
    "Build a rigorous, low-level foundation in computer networking, TCP/IP, and Linux operating systems.",
    "Develop practical defensive security skills and ethical testing methodology through authorized hands-on labs.",
    "Ship functional, cleanly architected web tools and automation systems that solve real problems.",
    "Turn technical problem-solving into sustainable digital ventures starting with Velora.",
  ],

  personalPrinciples: [
    {
      title: "First Principles Over Abstractions",
      description: "Understand packet headers, memory allocations, and kernel permissions before treating high-level abstractions as black boxes.",
    },
    {
      title: "Build to Verify Understanding",
      description: "Passive reading creates the illusion of competence. Real understanding is proved by building small tools, labs, and solving breaking edge cases.",
    },
    {
      title: "Radical Transparency",
      description: "Never fabricate credentials, metrics, or experience. Honest technical curiosity and steady iteration outlast inflated claims.",
    },
    {
      title: "Ethical Responsibility",
      description: "Security knowledge exists to protect and harden systems. Practice exclusively within authorized, self-hosted, or designated lab environments.",
    },
  ],

  // Verified External Links
  domain: null, // e.g. "https://dhanush-gangadhar.vercel.app/"
  email: null, // Configure your public contact email
  githubUrl: "https://github.com/DevEagleEye97",
  linkedinUrl: "https://www.linkedin.com/in/dhanushgangadhar/",
  existingPortfolioUrl: "https://dhanush-gangadhar.vercel.app/",
  telegramUrl: null, // Configure when available
  resumeUrl: null, // Link to PDF resume when ready

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

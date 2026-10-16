import { Project } from "@/types/portfolio";

export const projectsData: Project[] = [
  {
    id: "threat-x",
    slug: "threat-x",
    title: "Threat-X — Digital Threat Investigation Tool",
    shortDescription: "Evidence-driven digital threat investigation tool built to structure threat indicators and attack telemetry into an actionable product.",
    category: "Cybersecurity",
    technologies: ["HTML", "JavaScript", "Threat Investigation", "Security Engineering"],
    status: "In Progress",
    featured: true,
    githubUrl: "https://github.com/DevEagleEye97/Threat-X",
    demoUrl: null,
    startedDate: "October 2026",
    caseStudy: {
      problem: "Triaging threat evidence and investigating security indicators often requires switching across multiple disjointed tools during time-sensitive security incident investigations.",
      goal: "Build an evidence-driven digital threat investigation tool designed to structure threat indicators and telemetry into an intuitive, responsive product interface.",
      approach: "Built initially as an intensive hackathon prototype, now actively evolving into a structured cybersecurity investigative tool with streamlined indicator correlation.",
      techChoices: [
        {
          tech: "JavaScript & DOM Architecture",
          rationale: "Lightweight client-side performance and rapid event correlation without heavy framework overhead.",
        },
        {
          tech: "Modular Security Workflows",
          rationale: "Separates ingestion, indicator analysis, and evidence reporting into distinct maintainable components.",
        },
      ],
      challenges: [
        "Organizing multi-source threat indicator correlations into a clean, responsive layout without cognitive overload.",
        "Designing evidence ingestion workflows that allow rapid verification during triage.",
      ],
      whatILearned: [
        "Translating hackathon architecture into modular, maintainable production components.",
        "Structuring threat telemetry data models for rapid evidence verification.",
      ],
      futureImprovements: [
        "Integrate automated STIX/TAXII threat intelligence format parsing.",
        "Add exportable incident investigation timeline reports in PDF and Markdown.",
      ],
    },
  },
  {
    id: "shvasa-banking-co",
    slug: "shvasa-banking-co",
    title: "Shvasa Banking — Modern Financial Web Platform",
    shortDescription: "Modern financial banking interface and client account dashboard prototype with clean transaction flows and responsive design.",
    category: "Development",
    technologies: ["JavaScript", "HTML", "CSS", "Frontend Architecture"],
    status: "In Progress",
    featured: true,
    githubUrl: "https://github.com/DevEagleEye97/Shvasa-Banking-co",
    demoUrl: null,
    startedDate: "September 2026",
    caseStudy: {
      problem: "Traditional banking dashboards are often cluttered and confusing for modern users managing day-to-day accounts and transaction histories.",
      goal: "Develop an intuitive, performant financial interface with clear transaction histories, account metrics, and responsive controls.",
      approach: "Crafted accessible interface components using modern JavaScript and structured CSS layouts, prioritizing responsive accessibility and clear user feedback.",
      techChoices: [
        {
          tech: "Vanilla JavaScript",
          rationale: "Direct DOM manipulation ensuring minimal bundle footprint and fast load times.",
        },
        {
          tech: "CSS Grid & Flexbox",
          rationale: "Ensures fluid responsiveness across mobile devices and desktop resolutions without layout shifts.",
        },
      ],
      challenges: [
        "State management across multi-step transaction and payment flows.",
        "Ensuring responsive layout fidelity on mobile screens without horizontal clipping.",
      ],
      whatILearned: [
        "Financial UI ergonomics and input validation patterns.",
        "DOM state synchronization and modular styling architecture.",
      ],
      futureImprovements: [
        "Add simulated two-factor authentication modal during transfers.",
        "Implement interactive spending categorization charts.",
      ],
    },
  },
  {
    id: "basic-chess-game",
    slug: "basic-chess-game",
    title: "Python Chess Game & Move Engine",
    shortDescription: "Interactive chess implementation in Python with complete board state validation, turn mechanics, and rule enforcement.",
    category: "Development",
    technologies: ["Python", "Object-Oriented Design", "Game Engine", "Algorithms"],
    status: "Completed",
    featured: true,
    githubUrl: "https://github.com/DevEagleEye97/basic-chess-game-",
    demoUrl: null,
    startedDate: "August 2026",
    completedDate: "October 2026",
    caseStudy: {
      problem: "Chess move validation requires tracking complex non-trivial board state conditions (castling, en passant, check, and checkmate detection).",
      goal: "Implement a complete, bug-free move validator and gameplay engine in Python from foundational data structures.",
      approach: "Represented the 8x8 board with coordinate matrices and designed piece-specific legal move generation algorithms.",
      techChoices: [
        {
          tech: "Python 3",
          rationale: "Clean syntax and rapid execution of algorithmic matrix lookups and rule verification.",
        },
      ],
      challenges: [
        "Accurately detecting discovered checks and pinning states before allowing moves.",
        "Handling special pawn promotion and king castling validation cleanly.",
      ],
      whatILearned: [
        "Object-oriented state management for complex rule engines.",
        "Algorithmic board traversal and performance considerations.",
      ],
      futureImprovements: [
        "Implement Minimax engine with Alpha-Beta pruning for AI opponent.",
        "Add PGN (Portable Game Notation) export and import support.",
      ],
    },
  },
  {
    id: "dhanush-gangadhar",
    slug: "dhanush-gangadhar",
    title: "Personal Digital Headquarters & Learning Hub",
    shortDescription: "High-performance personal website and 7-week cybersecurity curriculum roadmap built with Next.js 16, TypeScript, and Tailwind CSS.",
    category: "Development",
    technologies: ["Next.js 16", "TypeScript", "Tailwind CSS v4", "React 19"],
    status: "Completed",
    featured: true,
    githubUrl: "https://github.com/DevEagleEye97/Dhanush-Gangadhar",
    demoUrl: "https://dhanush-gangadhar.vercel.app/",
    startedDate: "October 2026",
    completedDate: "October 2026",
    caseStudy: {
      problem: "Most developer portfolios are static resumes with placeholder project links and no verifiable learning curriculum.",
      goal: "Build a high-performance personal headquarters combining automatic GitHub repository discovery, a structured 7-week cybersecurity learning hub, and interactive developer tooling.",
      approach: "Engineered with Next.js 16 App Router, partial prefetching, automatic GitHub REST API integration with fallback caching, and browser-local persistent study tracking.",
      techChoices: [
        {
          tech: "Next.js 16 & Turbopack",
          rationale: "Blazing fast build speeds and native static generation with incremental revalidation.",
        },
        {
          tech: "TypeScript & Tailwind CSS v4",
          rationale: "Strict type safety across API boundaries and modern CSS design tokens with dark/light theme support.",
        },
      ],
      challenges: [
        "Implementing deterministic static builds with Next.js 16 prerendering constraints.",
        "Balancing real-time GitHub sync with strict rate-limit resilience.",
      ],
      whatILearned: [
        "Advanced HTTP security headers (CSP, HSTS, Permissions Policy).",
        "React 19 state synchronization patterns without cascading effect re-renders.",
      ],
      futureImprovements: [
        "Add automated CI/CD security scanning pipeline.",
      ],
    },
  },
  {
    id: "packetlens",
    slug: "packetlens",
    title: "PacketLens — CLI Traffic & Header Inspector (Lab Study)",
    shortDescription: "A terminal packet inspection study lab designed to decode Ethernet, IPv4, and TCP/UDP frames during networking protocol studies.",
    category: "Cybersecurity",
    technologies: ["Python", "Raw Sockets", "Wireshark Labs", "Linux"],
    status: "Concept",
    featured: false,
    githubUrl: null,
    demoUrl: null,
    startedDate: "August 2026",
    caseStudy: {
      problem: "Understanding byte offsets and header structures during CCNA studies can feel abstract when viewing packet captures purely through GUI applications.",
      goal: "Study how raw socket parsers unpack Ethernet frames (14 bytes), IPv4 headers (20 bytes), and TCP flags from network interfaces.",
      approach: "Designed as an educational protocol dissection exercise using Python struct unpacking and Wireshark verification in a local virtual lab.",
      techChoices: [
        {
          tech: "Python struct module",
          rationale: "Unpacking binary network byte order streams directly into integer and bitmask fields.",
        },
      ],
      challenges: [
        "Correctly unpacking variable length IP Options and TCP Options fields without dropping malformed frames.",
      ],
      whatILearned: [
        "Deepened understanding of endianness (network byte order vs. host byte order).",
        "The exact bitmask calculations required to extract IP Version, IHL, TTL, and TCP SYN/ACK/FIN flags.",
      ],
      futureImprovements: [
        "Package into an open-source terminal utility once lab testing is finalized.",
      ],
    },
  },
  {
    id: "linux-audit-bench",
    slug: "linux-audit-bench",
    title: "Linux CIS Security Audit & Hardening Tool (Lab Study)",
    shortDescription: "A security baseline auditor study script inspecting file permissions, SUID/SGID binaries, SSH daemon configuration, and open listening sockets.",
    category: "Cybersecurity",
    technologies: ["Bash", "Linux / POSIX", "Systemd", "Auditd"],
    status: "Concept",
    featured: false,
    githubUrl: null,
    demoUrl: null,
    startedDate: "June 2026",
    completedDate: "July 2026",
    caseStudy: {
      problem: "Fresh Linux installations often leave insecure defaults: password authentication enabled on SSH or world-writable directories without sticky bits.",
      goal: "Study automated auditing techniques that scan a Debian/Ubuntu system against CIS Level 1 recommendations.",
      approach: "Researched audit check modules: Account Security, Filesystem Permissions, Network Services, and SSH hardening.",
      techChoices: [
        {
          tech: "POSIX Shell",
          rationale: "Zero-dependency execution across minimal Linux server distributions.",
        },
      ],
      challenges: [
        "Differentiating legitimate SUID binaries from potentially vulnerable custom binaries.",
      ],
      whatILearned: [
        "Linux file permission bits (SUID, SGID, Sticky bit) and why misconfigurations lead to privilege escalation.",
        "Key security directives in /etc/ssh/sshd_config.",
      ],
      futureImprovements: [
        "Develop into a validated automated hardening script for Ubuntu 24.04 LTS.",
      ],
    },
  },
];

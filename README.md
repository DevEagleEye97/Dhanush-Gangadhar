# BOND — Personal Digital Headquarters

> Production-quality personal portfolio for a Computer Science Engineering student, aspiring cybersecurity researcher, and software builder.

Built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**, and **Lucide Icons**. Designed with an editorial, technical aesthetic inspired by Linear and Stripe, featuring a dark-first color system (#101210 / #C4E3A6 sage green), an interactive Developer Terminal, Command Palette (`⌘K` / `Ctrl+K`), and honest, un-fabricated student documentation.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
npm run start
```

---

## 📁 Project Architecture

```
portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root layout with ThemeProvider, SEO, Viewport
│   │   ├── page.tsx               # Homepage assembling all headquarters sections
│   │   ├── globals.css            # Tailwind CSS v4 design tokens (Dark & Light)
│   │   ├── icon.tsx               # Dynamic monogram ("B") favicon generator
│   │   ├── sitemap.ts             # Dynamic XML sitemap generator
│   │   ├── robots.ts              # SEO crawlers robots.txt
│   │   ├── projects/              # Dedicated /projects catalog
│   │   │   ├── page.tsx           # Full filterable projects grid
│   │   │   └── [slug]/page.tsx    # Comprehensive project case study page
│   │   ├── learning/              # Dedicated /learning curriculum page
│   │   │   └── page.tsx           # Complete chronological syllabus timeline
│   │   ├── notes/                 # Dedicated /notes engineering journal
│   │   │   ├── page.tsx           # Notes index with category filters
│   │   │   └── [slug]/page.tsx    # Editorial article reader page
│   │   └── about/                 # Dedicated /about background & principles
│   │       └── page.tsx
│   ├── components/
│   │   ├── Navbar.tsx             # Responsive header with ⌘K & Terminal triggers
│   │   ├── Footer.tsx             # Dynamic year, back-to-top, social channels
│   │   ├── Hero.tsx               # Bold headline, authentic copy, domain strip
│   │   ├── Currently.tsx          # Active focus cards (Learning, Building, Exploring)
│   │   ├── ProjectsSection.tsx    # Filterable project gallery (Cybersec, Dev, AI, Exp)
│   │   ├── ProjectCard.tsx        # Reusable card with status & case study triggers
│   │   ├── CaseStudyModal.tsx     # In-page case study reader dialog
│   │   ├── LearningTimeline.tsx   # Structured curriculum tracker with subject filters
│   │   ├── VenturesSection.tsx    # Dedicated Velora venture feature
│   │   ├── NotesSection.tsx       # Build-in-public & technical notes grid
│   │   ├── AboutSection.tsx       # Authentic student background & core principles
│   │   ├── ContactSection.tsx     # Direct email mailto & clipboard copy box
│   │   ├── CommandPalette.tsx     # Accessible ⌘K / Ctrl+K keyboard command menu
│   │   ├── TerminalModal.tsx      # Safe simulated portfolio CLI shell
│   │   ├── ThemeProvider.tsx      # next-themes provider wrapper
│   │   ├── ThemeToggle.tsx        # Accessible Dark/Light mode toggle button
│   │   └── SocialIcons.tsx        # Clean SVG brand icons (GitHub, LinkedIn, Telegram)
│   ├── config/
│   │   └── portfolio.ts           # CENTRAL CONFIG: Name, links, bio, education, Velora
│   ├── data/
│   │   ├── projects.ts            # Realistic projects with in-depth case studies
│   │   ├── learning.ts            # Curriculum milestones (Networking, Linux, C, Web)
│   │   └── notes.ts               # Technical tutorials and engineering log entries
│   └── types/
│       └── portfolio.ts           # Strict TypeScript interfaces
```

---

## ⚙️ Content Configuration Guide

All personal and profile information is centralized in [`src/config/portfolio.ts`](file:///c:/Users/BONDWARE007/Desktop/portfolio/src/config/portfolio.ts).

### 1. Updating Profile & Contact URLs
Open [`src/config/portfolio.ts`](file:///c:/Users/BONDWARE007/Desktop/portfolio/src/config/portfolio.ts):
```ts
export const portfolioConfig = {
  displayName: "Bond",
  email: "your-email@example.com",     // Your real contact email
  githubUrl: "https://github.com/...", // Your GitHub profile
  linkedinUrl: null,                   // Set to your LinkedIn URL when ready
  telegramUrl: null,                   // Set to your public Telegram handle
  resumeUrl: null,                     // Set to "/resume.pdf" or external URL
  domain: null,                        // Set once you purchase a custom domain
  // ...
}
```
*Note: Any field set to `null` is automatically omitted from the website so broken or placeholder links are never displayed.*

### 2. Adding a New Project
Edit [`src/data/projects.ts`](file:///c:/Users/BONDWARE007/Desktop/portfolio/src/data/projects.ts):
```ts
{
  id: "my-tool",
  slug: "my-tool",
  title: "My Custom Security Tool",
  shortDescription: "One-sentence technical summary...",
  category: "Cybersecurity", // "Cybersecurity" | "Development" | "AI & Automation" | "Experiments"
  technologies: ["Python", "Linux", "Scapy"],
  status: "Completed",       // "Completed" | "In Progress" | "Experiment" | "Concept"
  githubUrl: "https://github.com/...",
  demoUrl: null,
  startedDate: "October 2026",
  caseStudy: {
    problem: "...",
    goal: "...",
    approach: "...",
    techChoices: [{ tech: "Python", rationale: "..." }],
    challenges: ["..."],
    whatILearned: ["..."],
    futureImprovements: ["..."],
  }
}
```

### 3. Adding a Learning Topic
Edit [`src/data/learning.ts`](file:///c:/Users/BONDWARE007/Desktop/portfolio/src/data/learning.ts):
```ts
{
  id: "linux-ebpf",
  topic: "eBPF & Kernel Tracing Basics",
  group: "Linux & Systems",
  shortExplanation: "Observing socket events and packet drops via BPF programs.",
  period: "November 2026",
  status: "learning", // "learning" | "practiced" | "completed"
  keyConcepts: ["Kernel probes", "BCC tools", "Tracepoints"],
}
```

### 4. Publishing a Technical Note
Edit [`src/data/notes.ts`](file:///c:/Users/BONDWARE007/Desktop/portfolio/src/data/notes.ts):
```ts
{
  slug: "understanding-linux-capabilities",
  title: "Understanding Linux Capabilities: Splitting Root Privileges",
  date: "October 15, 2026",
  category: "Technical tutorials",
  readTime: "4 min read",
  excerpt: "How CAP_NET_RAW and CAP_NET_ADMIN grant granular network access...",
  content: [
    "First paragraph of the article...",
    "Second paragraph explaining the implementation...",
  ],
}
```

---

## ⌨️ Signature Interactive Features

### 1. Command Palette (`⌘K` / `Ctrl+K`)
- Press **Cmd+K** on macOS or **Ctrl+K** on Windows/Linux from any page.
- Instant search across all sections, navigation links, theme toggle, and email copying.
- Full arrow-key navigation, Enter to execute, Escape to dismiss.

### 2. Developer Terminal (`portfolio-cli`)
- Click the terminal icon (`>_`) in the navigation bar.
- Supported safe commands:
  - `help` — Show available commands
  - `about` — Display student identity, degree, and bio
  - `projects` — Output current projects and status
  - `learning` — Output curriculum highlights
  - `ventures` — View Velora status and approach
  - `socials` — Print configured communication channels
  - `contact` — Print direct email address
  - `theme [dark|light]` — Toggle or switch theme
  - `clear` — Clear the screen
  - `exit` — Close the terminal
- *Security Note: The terminal strictly enforces a fixed allowlist. It does not execute arbitrary shell commands or code.*

### 3. Dark & Light Theme System
- Default: Dark-first theme (`#101210` background, `#1B1F1B` cards, `#C4E3A6` muted sage accent, `#303630` borders).
- Light theme: Warm off-white background (`#F7F8F4`), dark readable text, and accessible sage green highlights.
- Zero flash of unstyled content (FOUC), fully persisted in `localStorage`.

---

## 🌐 Deployment to Vercel

This application is ready to deploy directly to the Vercel Hobby tier without any extra environment variables.

### Deploy via Vercel CLI
```bash
npm install -g vercel
vercel
```

### Deploy via GitHub
1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "feat: complete bond personal digital headquarters"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```
2. Go to [vercel.com/new](https://vercel.com/new).
3. Import your `portfolio` repository.
4. Keep all default build settings (Framework Preset: Next.js).
5. Click **Deploy**.

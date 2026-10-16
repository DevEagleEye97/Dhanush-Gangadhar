# Dhanush Gangadhar — Personal Portfolio & Cybersecurity Learning Hub

> Production-grade personal portfolio and interactive Cybersecurity Learning Hub for Computer Science Engineering student and aspiring cybersecurity builder **Dhanush Gangadhar**.

Live Deployments & Profiles:
- **GitHub:** [https://github.com/DevEagleEye97](https://github.com/DevEagleEye97)
- **LinkedIn:** [https://www.linkedin.com/in/dhanushgangadhar/](https://www.linkedin.com/in/dhanushgangadhar/)
- **Live Vercel Site:** [https://dhanush-gangadhar.vercel.app/](https://dhanush-gangadhar.vercel.app/)

Built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**, and **Lucide Icons**. Styled with a dark-first editorial aesthetic inspired by Linear and Stripe (#101210 / #C5E3A7 accent), an interactive simulated Developer Terminal, Command Palette (`Ctrl+K` / `⌘K`), and a 7-week cybersecurity curriculum with client-side persistence and verified YouTube resources.

---

## ⚡ Key Features

1. **Cybersecurity Learning Hub (`/cybersecurity`)**:
   - Structured 7-week curriculum based on the *7-Week Cybersecurity Course Plan*.
   - Exact curated lecture and course resources from Harvard CS50, freeCodeCamp, Professor Messer, and Heath Adams.
   - Hands-on practical labs: Wireshark packet dissection, Linux VM hardening, Security+ flashcards, authorized Nmap scanning, SIEM Splunk log collection, and Cloud identity governance.
   - Interactive verification checklists and deliverable answer fields.
   - Local browser persistence (LocalStorage) with export notes capability.
   - Explicit ethical warnings: strictly authorized testing on self-owned lab environments.

2. **Personal Portfolio & Case Studies (`/projects`)**:
   - Filterable projects across Cybersecurity, Software Development, Web Development, and AI.
   - Authentic case studies detailing problem statement, technical rationale, challenges, and lessons learned.

3. **Learning Log (`/learning`)**:
   - Chronological engineering syllabus tracking networking (OSI/TCP-IP), Linux internals, C programming, and systems security.

4. **Technical Notes & Build-in-Public Journal (`/notes`)**:
   - Categorized technical deep dives into raw sockets, SUID binaries, and protocol internals.

5. **Technology Ventures (`#ventures`)**:
   - Exploration of **Velora**, an automation and digital growth venture.

6. **Interactive Developer Tools**:
   - **Command Palette (`Ctrl+K` or `⌘K`)**: Fast keyboard navigation across all site pages and external profiles.
   - **Simulated CLI Terminal**: Sandboxed terminal accepting predefined safe commands (`help`, `about`, `projects`, `learning`, `cybersecurity`, `ventures`, `socials`, `clear`, `exit`, `theme`). Zero operating system commands or arbitrary code execution.

7. **Production Security & Standards**:
   - Strict Content Security Policy (CSP), HSTS, X-Frame-Options DENY, nosniff, and COOP/CORP headers configured in `next.config.ts`.
   - `rel="noopener noreferrer"` enforced on all external URLs.
   - Runtime input sanitization against XSS and protocol injections.

---

## 🚀 Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Dev Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

### 3. Build & Test Production Bundle
```bash
npm run build
npm run start
```

---

## 🛠️ Configuration & Content Editing

All personal data, links, and content are separated into typed configuration files:

- **`src/config/portfolio.ts`**: Edit display name, headline, verified profile URLs (GitHub, LinkedIn, existing Vercel portfolio), current focus topics, and venture descriptions.
- **`src/data/cybersecurity-roadmap.ts`**: Edit or extend the 7-week cybersecurity modules, course links, checklists, and lab tasks.
- **`src/data/projects.ts`**: Add new software or security projects and case studies.
- **`src/data/learning.ts`**: Update the chronological learning syllabus.
- **`src/data/notes.ts`**: Add technical articles and engineering notes.

---

## 🌐 Deploying to Vercel (Hobby Tier)

This application is optimized for Vercel Free Hobby hosting:

1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "Deploy Dhanush Gangadhar Portfolio & Cybersecurity Learning Hub"
   git push origin main
   ```
2. Import the repository on [Vercel](https://vercel.com).
3. Framework preset: **Next.js**.
4. Build command: `next build` (default).
5. Output directory: `.next` (default).
6. Click **Deploy**. No additional environment variables or databases required!

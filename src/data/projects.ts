import { Project } from "@/types/portfolio";

export const projectsData: Project[] = [
  {
    id: "packetlens",
    slug: "packetlens",
    title: "PacketLens — CLI Traffic & Header Inspector",
    shortDescription: "A lightweight terminal packet inspector built to decode raw Ethernet, IPv4, and TCP/UDP frames to visualize protocol distribution during networking labs.",
    category: "Cybersecurity",
    technologies: ["Python", "Raw Sockets", "Scapy", "Rich CLI", "Linux"],
    status: "In Progress",
    featured: true,
    githubUrl: "https://github.com",
    demoUrl: null,
    startedDate: "August 2026",
    caseStudy: {
      problem: "Standard packet capture tools like Wireshark provide comprehensive GUI inspection but can feel overly complex when trying to isolate and understand fundamental byte offsets and header structures during CCNA & networking studies.",
      goal: "Construct a clean, minimal command-line packet inspector that parses network packets from a specified interface and clearly prints layer-by-layer header fields with human-readable explanations.",
      approach: "Used low-level socket programming on Linux (`socket.AF_PACKET`) combined with struct unpacking to dissect Ethernet frames (14 bytes), IPv4 headers (20 bytes), and TCP flags. Implemented a curses/Rich terminal dashboard to group packet types by transport protocol.",
      techChoices: [
        {
          tech: "Python & socket library",
          rationale: "Rapid prototyping of network protocols and direct access to raw sockets on Linux without kernel driver overhead.",
        },
        {
          tech: "Rich CLI",
          rationale: "Clean terminal rendering of tables and real-time packet counters without high memory consumption.",
        },
      ],
      challenges: [
        "Handling socket permissions: raw packet capture requires elevated capabilities (`CAP_NET_RAW`) or sudo privileges.",
        "Correctly unpacking variable length IP Options and TCP Options fields without dropping malformed frames.",
      ],
      whatILearned: [
        "Deepened understanding of endianness (network byte order vs. host byte order).",
        "The exact bitmask calculations required to extract IP Version, IHL, TTL, and TCP SYN/ACK/FIN flags.",
        "How promiscuous mode functions on physical and virtual network interfaces.",
      ],
      futureImprovements: [
        "Add BPF (Berkeley Packet Filter) syntax support for targeted capture filters.",
        "Implement export to PCAP file format for cross-tool interoperability with Wireshark.",
      ],
    },
  },
  {
    id: "linux-audit-bench",
    slug: "linux-audit-bench",
    title: "Linux CIS Security Audit & Hardening Tool",
    shortDescription: "An automated bash and Python baseline auditor that inspects file permissions, SUID/SGID binaries, SSH daemon configuration, and open listening sockets against basic security benchmarks.",
    category: "Cybersecurity",
    technologies: ["Bash", "Python", "Linux / POSIX", "Systemd", "Auditd"],
    status: "Completed",
    featured: true,
    githubUrl: "https://github.com",
    demoUrl: null,
    startedDate: "June 2026",
    completedDate: "July 2026",
    caseStudy: {
      problem: "Fresh Linux installations often leave insecure defaults: password authentication enabled on SSH, world-writable directories without sticky bits, or unnecessary services listening on 0.0.0.0.",
      goal: "Write an idempotent, auditable script that scans a Debian/Ubuntu system, identifies common security weaknesses, and generates a structured JSON report and remediation suggestions.",
      approach: "Structured the audit into distinct check modules: Account Security, Filesystem & Permissions, Network Services, and Logging. The script runs non-destructively by default, generating findings with standard severity levels.",
      techChoices: [
        {
          tech: "Bash & POSIX shell tools",
          rationale: "Zero-dependency execution on minimal Linux server images without needing package manager installations.",
        },
        {
          tech: "Python parser",
          rationale: "Transforms collected audit results into structured JSON and an HTML overview report.",
        },
      ],
      challenges: [
        "Differentiating legitimate SUID binaries (like `sudo` or `passwd`) from potentially dangerous or custom binaries.",
        "Ensuring the audit script does not alter file timestamps or execute untrusted binaries during inspection.",
      ],
      whatILearned: [
        "Linux file permission bits (SUID, SGID, Sticky bit) and why misconfigurations lead to privilege escalation.",
        "Key security directives in `/etc/ssh/sshd_config` (PermitRootLogin, MaxAuthTries, PubkeyAuthentication).",
        "How `/proc/net/tcp` represents network socket states at the kernel level.",
      ],
      futureImprovements: [
        "Add automated remediation mode with dry-run verification.",
        "Incorporate CIS Level 1 automated benchmark scoring.",
      ],
    },
  },
  {
    id: "velora-dispatcher",
    slug: "velora-dispatcher",
    title: "Velora Automation & Webhook Dispatcher",
    shortDescription: "A resilient webhook intake and asynchronous task dispatch service designed to connect marketing forms, notification queues, and external CRM systems with guaranteed retries.",
    category: "Development",
    technologies: ["TypeScript", "Node.js", "Express", "SQLite", "Tailwind CSS"],
    status: "In Progress",
    featured: true,
    githubUrl: null,
    demoUrl: null,
    startedDate: "September 2026",
    caseStudy: {
      problem: "Third-party automation tools frequently fail silently on webhook delivery timeouts or rate limits, causing lost inbound leads and manual troubleshooting for small business workflows.",
      goal: "Create a lightweight, self-hostable webhook receptor and dispatcher that persists payloads immediately to local disk storage before scheduling background delivery with exponential backoff.",
      approach: "Built with Node.js and TypeScript. Incoming requests are validated against HMAC signatures, written to an embedded SQLite WAL database, and processed via an in-memory priority queue.",
      techChoices: [
        {
          tech: "TypeScript & Node.js",
          rationale: "Strict type safety for heterogeneous JSON payload structures and broad ecosystem compatibility.",
        },
        {
          tech: "SQLite with WAL mode",
          rationale: "Zero external database infrastructure required for single-node reliability and sub-millisecond writes.",
        },
      ],
      challenges: [
        "Designing idempotency key tracking to avoid duplicate deliveries during network retries.",
        "Handling backpressure when upstream webhook targets throttle requests.",
      ],
      whatILearned: [
        "How to implement exponential backoff with randomized jitter.",
        "Asynchronous error handling patterns in production Node.js services.",
        "HMAC SHA-256 signature generation and constant-time comparison to prevent timing attacks.",
      ],
      futureImprovements: [
        "Develop a lightweight web dashboard for visualizing failed webhook retries and manual replay.",
        "Add OpenTelemetry trace instrumentation.",
      ],
    },
  },
  {
    id: "reconscope-cli",
    slug: "reconscope-cli",
    title: "ReconScope — Passive DNS Enumeration CLI",
    shortDescription: "A command-line passive reconnaissance tool that gathers subdomains by querying public Certificate Transparency logs (crt.sh) and historical DNS archives without touching the target infrastructure.",
    category: "Experiments",
    technologies: ["Python", "Asyncio", "HTTPX", "DNS Resolver", "CLI"],
    status: "Completed",
    featured: false,
    githubUrl: "https://github.com",
    demoUrl: null,
    startedDate: "July 2026",
    completedDate: "August 2026",
    caseStudy: {
      problem: "Active DNS brute forcing generates noisy network traffic and can be blocked. Passive reconnaissance allows security learners to understand public attack surfaces purely from open, public records.",
      goal: "Implement an asynchronous passive enumeration CLI that queries public Certificate Transparency logs and validates whether discovered subdomains currently resolve.",
      approach: "Used `httpx` with `asyncio` to query `crt.sh` and AlienVault OTX feeds concurrently, cleaned and deduplicated domain strings, then resolved active records using asynchronous DNS lookups.",
      techChoices: [
        {
          tech: "Python Asyncio",
          rationale: "Performing hundreds of DNS resolutions sequentially takes minutes; async I/O reduces this to a few seconds.",
        },
      ],
      challenges: [
        "Handling frequent timeouts and rate limits from public crt.sh endpoints.",
        "Wildcard DNS resolution filtering (detecting when an authoritative name server points all non-existent subdomains to a catch-all IP).",
      ],
      whatILearned: [
        "How the Certificate Transparency ecosystem works and why SSL certificates are a goldmine for asset discovery.",
        "DNS record types (A, AAAA, CNAME, TXT) and how wildcard DNS records skew enumeration datasets.",
      ],
      futureImprovements: [
        "Add recursive sub-domain probing for high-depth domains.",
        "Output structured Markdown summaries suitable for security audit documentation.",
      ],
    },
  },
  {
    id: "localdoc-rag",
    slug: "localdoc-rag",
    title: "LocalDoc — Semantic Engineering Note Indexer",
    shortDescription: "An experimental offline retrieval tool that embeds local Markdown study notes and RFC specifications into a vector store for semantic search during study sessions.",
    category: "AI & Automation",
    technologies: ["Python", "ChromaDB", "Sentence Transformers", "CLI"],
    status: "Experiment",
    featured: false,
    githubUrl: "https://github.com",
    demoUrl: null,
    startedDate: "September 2026",
    caseStudy: {
      problem: "As personal study notes and networking RFC bookmarks multiply, simple keyword grep search struggles to locate concepts when queries use synonyms (e.g., 'packet loss detection' vs 'TCP congestion window').",
      goal: "Build a privacy-preserving, entirely local semantic search utility that embeds markdown files into an on-disk vector database and answers queries with exact source line citations.",
      approach: "Chunked markdown files by headers and semantic sections, embedded chunks using an all-MiniLM-L6-v2 model running on local CPU, and queried results through a fast terminal interface.",
      techChoices: [
        {
          tech: "Sentence Transformers (all-MiniLM-L6-v2)",
          rationale: "Runs fast on standard CPU hardware without requiring an external GPU or paid cloud API keys.",
        },
        {
          tech: "ChromaDB",
          rationale: "Lightweight local vector storage without managing a dedicated server container.",
        },
      ],
      challenges: [
        "Determining optimal chunk boundaries so that code blocks and explanations don't get severed across vector boundaries.",
        "Managing cold-start model load times in a quick-response CLI.",
      ],
      whatILearned: [
        "Vector cosine similarity metrics and vector dimensionality fundamentals.",
        "The trade-offs between dense semantic retrieval and traditional lexical BM25 search.",
      ],
      futureImprovements: [
        "Implement hybrid search combining BM25 keyword matching with vector embeddings for best accuracy.",
      ],
    },
  },
];

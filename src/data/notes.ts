import { Note } from "@/types/portfolio";

export const notesData: Note[] = [
  {
    slug: "demystifying-tcp-flags-with-raw-sockets",
    title: "Demystifying TCP Flags and Bitmasks with Raw Sockets in Python",
    date: "October 02, 2026",
    category: "Technical tutorials",
    readTime: "5 min read",
    excerpt: "A practical guide to how the 16-bit offset and flags field in the TCP header is structured, and how to extract SYN, ACK, FIN, and RST bits using bitwise operations in Python.",
    content: [
      "When studying networking from textbooks, diagrams of the TCP header show neat 32-bit words with single-bit flags like SYN, ACK, and FIN. But when you receive a raw packet from a network interface, it arrives as an unformatted stream of bytes.",
      "The TCP header has an offset word that packs the Data Offset (4 bits), Reserved field (3 bits), and Control Flags (9 bits). In Python, using `struct.unpack('!HHLLBBHHH', tcp_header)` gives you the raw byte containing the flags.",
      "To check if a packet is a SYN packet, you perform a bitwise AND with `0x02` (binary `00000010`). For an ACK packet, you test against `0x10` (`00010000`). If both evaluate to non-zero, you have identified a SYN-ACK packet during the 3-way handshake.",
      "Writing a small script to capture this live during an SSH connection solidified why network filters and stateful firewalls look at these specific bits to track session state.",
    ],
  },
  {
    slug: "why-suid-binaries-matter-in-linux-security",
    title: "Why SUID Binaries Matter: Notes from Auditing Linux Permissions",
    date: "September 18, 2026",
    category: "What I learned",
    readTime: "4 min read",
    excerpt: "Reflections from building a Linux security auditing script. How the SUID bit alters execution context, why GTFOBins is an essential reference, and how to find misconfigured binaries.",
    content: [
      "In standard Linux permission models, an executable runs with the privileges of the user who executes it. However, the SUID (Set User ID) bit allows a binary to execute with the privileges of the file owner—frequently `root`.",
      "While binaries like `/usr/bin/passwd` genuinely require SUID to write to `/etc/shadow`, system administrators or custom scripts sometimes accidentally leave SUID enabled on standard utilities like `find`, `vim`, or `bash`.",
      "During my audit script development, I learned to write safe `find / -perm -4000 -type f 2>/dev/null` queries and filter against known system whitelists.",
      "Understanding SUID reinforces the principle of least privilege: binaries should never possess elevated execution rights unless strictly necessary, and administrative access should be partitioned with precise sudo rules rather than universal SUID flags.",
    ],
  },
  {
    slug: "building-velora-part-1-pragmatic-automation",
    title: "Building Velora Part 1: Why Most Small Business Automations Fail",
    date: "August 29, 2026",
    category: "Business experiments",
    readTime: "6 min read",
    excerpt: "Analyzing common failure points in digital growth workflows and why resilient webhook ingestion matters more than flashy tool integrations.",
    content: [
      "When founders or small teams build automations using no-code platforms, they often string together multiple third-party services with fragile triggers. The moment one API returns a 502 Bad Gateway or a rate-limit error, the entire pipeline breaks silently.",
      "With Velora, the goal is to build digital growth systems that prioritize durability. Every incoming event or lead must be captured locally and acknowledged before downstream processing begins.",
      "By introducing a simple SQLite write-ahead log (WAL) and an exponential backoff dispatcher, we ensure zero data loss even if downstream targets experience temporary outages.",
      "The key takeaway from our initial experiments: reliability is the most valuable feature in automation. A simple system that works 100% of the time beats an intricate 10-step workflow that breaks twice a week.",
    ],
  },
  {
    slug: "hackathon-reflections-building-under-constraints",
    title: "Hackathon Reflections: What 36 Hours Taught Me About Scope Control",
    date: "July 14, 2026",
    category: "Hackathon reflections",
    readTime: "4 min read",
    excerpt: "Lessons on avoiding feature creep, prioritizing a rock-solid core user flow, and why clear technical communication wins judges over unfinished complexity.",
    content: [
      "During our recent college hackathon, our team initially brainstormed a sprawling AI-assisted network vulnerability scanner with a live 3D graph view and autonomous remediation agents.",
      "Four hours in, we realized that building five complex subsystems would result in a broken demo. We aggressively cut scope down to one single, polished flow: a clean CLI that parses local router configuration files and flags the top 3 critical misconfigurations.",
      "By narrowing our focus, we were able to write unit tests, handle malformed input gracefully, and deliver a live demonstration that never crashed during judging.",
      "The engineering lesson was clear: finishing a focused, dependable tool is infinitely better than presenting a grand concept that only works under ideal presentation conditions.",
    ],
  },
  {
    slug: "linux-networking-commands-reference",
    title: "Essential Modern Linux Networking Commands: Moving Beyond ifconfig",
    date: "June 25, 2026",
    category: "Useful resources",
    readTime: "5 min read",
    excerpt: "A concise reference for replacing legacy net-tools (`ifconfig`, `netstat`, `route`) with the modern `iproute2` suite (`ip addr`, `ss`, `ip route`).",
    content: [
      "Many computer science tutorials still reference deprecated tools from the 1990s like `ifconfig` and `netstat`. In modern Linux distributions, the `iproute2` suite is faster, supports network namespaces, and interfaces directly with the Linux kernel netlink API.",
      "Quick replacements: instead of `ifconfig`, use `ip -brief address show`. Instead of `netstat -tuln`, use `ss -tulnp` (which queries `/proc` and socket tables substantially faster on busy servers). Instead of `route -n`, use `ip route show`.",
      "Learning these modern utilities not only makes command-line operations faster during labs but also matches the tooling used on modern production Linux servers and container environments.",
    ],
  },
];

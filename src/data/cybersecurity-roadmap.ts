import { CybersecurityModule } from "@/types/portfolio";

export interface RoadmapGuidance {
  id: string;
  rule: string;
  detail: string;
}

export const roadmapGuidanceList: RoadmapGuidance[] = [
  {
    id: "starting-point",
    rule: "Starting Point, Not Complete Qualification",
    detail: "One video each week is a useful starting point, not a complete cybersecurity engineering qualification or degree substitute.",
  },
  {
    id: "spaced-learning",
    rule: "Spread Learning Over the Week",
    detail: "Spread study sessions over the week with active note-taking, protocol verification, and hands-on terminal practice rather than passive binge-watching.",
  },
  {
    id: "verify-resources",
    rule: "Independently Verify Resources",
    detail: "Check upload dates, documentation, and views before starting videos because external curriculum details and tooling commands evolve frequently.",
  },
  {
    id: "hands-on-labs",
    rule: "Complete a Practical Lab After Each Video",
    detail: "Theoretical retention drops without practical application. Run local virtual machines or inspect captured packets in an isolated sandbox.",
  },
  {
    id: "public-notes",
    rule: "Publish Technical Notes on GitHub",
    detail: "Keep structured Markdown notes of command syntaxes, packet dissections, and lessons learned in a public GitHub repository.",
  },
  {
    id: "beyond-week-seven",
    rule: "Continue Beyond Week Seven",
    detail: "After week seven, continue with formal Security+ preparation, TryHackMe/HackTheBox defensive paths, and customized home network labs.",
  },
  {
    id: "no-job-promises",
    rule: "Realistic Expectations",
    detail: "Completing these seven beginner modules develops foundational literacy; it does not automatically guarantee job-readiness or professional security mastery.",
  },
];

export const cybersecurityRoadmap: CybersecurityModule[] = [
  {
    week: 1,
    title: "Cybersecurity Basics & Security Mindset",
    courseName: "Harvard CS50's Introduction to Cybersecurity",
    provider: "freeCodeCamp / Harvard CS50",
    estimatedDuration: "Approx. 8 hours",
    youtubeUrl: "https://www.youtube.com/watch?v=9HOpanT0GRs",
    isPlaylist: false,
    topics: [
      "Securing accounts (passwords, password managers, entropy, multi-factor authentication)",
      "Securing data (symmetric/asymmetric encryption, hashing, salts, backups)",
      "Securing systems and software (patching, malware types, attack surfaces, buffer overflows)",
      "Privacy (digital footprint, tracking cookies, VPNs, threat modeling)",
    ],
    practiceTask: {
      title: "Executive Synthesis: 5 Core Architectural Ideas",
      description: "Write a one-page structured summary outlining the five biggest foundational ideas learned from the lecture, focusing on threat modeling and defense in depth.",
      guidance: "Reflect on how modern adversaries bypass single controls and why layered security is necessary across identity, transport, and device endpoints.",
      deliverableFields: [
        {
          id: "idea1",
          label: "1. Threat Modeling & Attack Surface",
          placeholder: "Key insight on identifying assets, adversaries, and entry vectors...",
        },
        {
          id: "idea2",
          label: "2. Authentication & Credential Entropy",
          placeholder: "Why length and MFA outweigh arbitrary complexity rules...",
        },
        {
          id: "idea3",
          label: "3. Cryptographic Primitives & Hashing",
          placeholder: "Distinction between encryption, hashing, and HMAC verification...",
        },
        {
          id: "idea4",
          label: "4. System Hardening & Patch Management",
          placeholder: "Preventing known CVE exploitation via proactive update lifecycles...",
        },
        {
          id: "idea5",
          label: "5. Privacy vs Anonymity & Operational Security",
          placeholder: "Separating network confidentiality from metadata leakage...",
        },
      ],
    },
    checklists: [
      "Watch the full Harvard CS50 Cybersecurity lecture",
      "Document the distinction between hashing, symmetric encryption, and asymmetric encryption",
      "Review account security settings and enable TOTP-based MFA on personal accounts",
      "Complete the 5-point executive synthesis in the notes tab below",
    ],
    defaultNotesTemplate: `## Week 1 Notes — CS50 Cybersecurity

### Key Takeaways
- Security is an economic trade-off, not an absolute state.
- Passphrase length generates significantly more entropy than short complex strings.
- Never roll your own crypto: rely on vetted implementations (e.g. AES-256-GCM, Argon2id).

### Actions Taken
- [ ] Audited personal credential security.
- [ ] Documented core threat model for home workstation.`,
  },
  {
    week: 2,
    title: "Computer Networking Foundations",
    courseName: "Beginner Networking Course Playlist",
    provider: "Curated Networking Series",
    estimatedDuration: "Full Playlist",
    youtubeUrl: "https://www.youtube.com/watch?v=S7MNX_UD7vY&list=PLIhvC56v63IJVXv0GJcl9vO5Z6znCVb1P",
    isPlaylist: true,
    topics: [
      "How networks work (encapsulation, PDU, OSI 7-layer model vs TCP/IP stack)",
      "IP addressing (IPv4 subnets, CIDR notation, private RFC 1918 ranges, IPv6 basics)",
      "Domain Name System (DNS resolution flow, root servers, A/AAAA, CNAME, PTR records)",
      "Common network protocols (TCP vs UDP, DHCP, HTTP/HTTPS, ARP, ICMP)",
    ],
    practiceTask: {
      title: "Wireshark Packet Dissection: DNS Query & TCP 3-Way Handshake",
      description: "Capture network traffic originating strictly from your own workstation or local lab environment. Filter for and inspect a DNS query/response and a TCP 3-way handshake (SYN, SYN-ACK, ACK).",
      guidance: "Use Wireshark display filters: 'dns' to see UDP port 53 traffic, and 'tcp.flags.syn == 1' to isolate handshake packets.",
      warning: "Only inspect traffic on your own personal device or authorized lab subnet. Never collect or analyze traffic from third-party devices on public or shared networks without explicit permission.",
      deliverableFields: [
        {
          id: "dnsLookup",
          label: "DNS Query & Answer Observation",
          placeholder: "Queried domain, transaction ID, DNS server IP, resolved A record...",
        },
        {
          id: "tcpHandshake",
          label: "TCP Handshake Flags & Sequence Numbers",
          placeholder: "Source/Destination ports, Initial Sequence Numbers (ISN), SYN/ACK flags...",
        },
      ],
    },
    checklists: [
      "Complete the beginner networking playlist modules",
      "Draw the encapsulation diagram from Application Data down to Ethernet Frame",
      "Practice subnetting calculations (/24, /26, /28, /30)",
      "Install Wireshark in local lab and capture DNS query and TCP handshake",
    ],
    defaultNotesTemplate: `## Week 2 Notes — Computer Networking

### TCP Handshake Breakdown
1. Client -> Server: SYN (Seq=0)
2. Server -> Client: SYN, ACK (Seq=0, Ack=1)
3. Client -> Server: ACK (Seq=1, Ack=1)

### Subnetting Quick Reference
- /24 = 256 addresses (254 usable) - Netmask 255.255.255.0
- /26 = 64 addresses (62 usable) - Netmask 255.255.255.192
- /30 = 4 addresses (2 usable point-to-point) - Netmask 255.255.255.252`,
  },
  {
    week: 3,
    title: "Linux Operating System for Beginners",
    courseName: "Linux for Beginners Full Course",
    provider: "freeCodeCamp",
    estimatedDuration: "Approx. 5.5 hours",
    youtubeUrl: "https://www.youtube.com/watch?v=sWbUDq4S6Y8",
    isPlaylist: false,
    topics: [
      "Terminal navigation & core shell commands (ls, cd, pwd, cat, grep, find, awk)",
      "Linux Filesystem Hierarchy Standard (FHS: /etc, /var/log, /home, /bin, /dev)",
      "User & group management (useradd, usermod, /etc/passwd, /etc/shadow, sudoers)",
      "POSIX file permissions (chmod numeric & symbolic, chown, umask, SUID/SGID/sticky bit)",
    ],
    practiceTask: {
      title: "Linux Virtual Machine Setup & Permission Hardening",
      description: "Set up a clean Linux VM (Ubuntu Server, Debian, or Rocky Linux) in VirtualBox or UTM. Create dedicated unprivileged user accounts, organize a project directory with strict group ownership, and enforce least-privilege permissions.",
      guidance: "Create a shared directory /opt/devops with group devteam, permission 2770 (SGID set), and verify that newly created files inherit the parent group.",
      deliverableFields: [
        {
          id: "distroVersion",
          label: "Lab VM Distribution & Kernel Version",
          placeholder: "e.g., Ubuntu 24.04 LTS, Kernel 6.8.0-generic (via uname -r)...",
        },
        {
          id: "usersCreated",
          label: "Created Accounts & Group Assignments",
          placeholder: "Created user alice, bob; added to group securitylab; verified in /etc/group...",
        },
        {
          id: "permissionsTested",
          label: "File Permission Commands Practiced",
          placeholder: "chmod 750, chown root:securitylab, chmod g+s, tested suid behavior...",
        },
      ],
    },
    checklists: [
      "Watch the Linux for Beginners video course",
      "Spin up local Linux VM (Ubuntu/Debian in VirtualBox or UTM)",
      "Practice navigating directories, pipes, and redirection ('|', '>', '>>', '2>&1')",
      "Configure unprivileged users and set up sudo privileges safely in /etc/sudoers.d/",
      "Practice numeric chmod (r=4, w=2, x=1) and test directory execution bit behavior",
    ],
    defaultNotesTemplate: `## Week 3 Notes — Linux Systems Administration

### Important Permissions Logic
- Read (4): view directory contents / read file
- Write (2): delete or create files in directory / modify file
- Execute (1): cd into directory / run executable binary

### SUID / SGID Reference
- SUID (4000): runs with file owner privileges (e.g. /usr/bin/passwd)
- SGID (2000): files inherit parent directory group
- Sticky Bit (1000): only file creator or root can delete (e.g. /tmp)`,
  },
  {
    week: 4,
    title: "CompTIA Security+ Core Concepts",
    courseName: "CompTIA Security+ SY0-701 Training Course",
    provider: "Professor Messer / Security+ Training Series",
    estimatedDuration: "Full Playlist",
    youtubeUrl: "https://www.youtube.com/watch?v=KiEptGbnEBc&list=PLG49S3nxzAnl4QDVqK-hOnoqcSKEIDDuv",
    isPlaylist: true,
    topics: [
      "Threats & vulnerability vectors (social engineering, phishing, supply chain, zero-days)",
      "Attacks & malware mechanisms (ransomware, trojans, rootkits, SQLi, XSS, CSRF, DDoS)",
      "Cryptography fundamentals (ciphers, PKI, digital certificates, TLS handshakes, hashing)",
      "Access control & identity models (DAC, MAC, RBAC, ABAC, principle of least privilege)",
      "Risk management principles (CIA triad, risk appetite, RTO, RPO, business impact analysis)",
    ],
    practiceTask: {
      title: "Active Recall Flashcards: Threats, Cryptography & Access Control",
      description: "Build an active recall flashcard repository covering the primary conceptual domains of Security+. Synthesize real-world scenarios to explain why each defense works.",
      guidance: "Focus on distinguishing difficult pairs: DAC vs MAC, Symmetric vs Asymmetric algorithms, Vulnerability Assessment vs Penetration Test.",
      warning: "This is a personal study companion and flashcard notes area. It does not confer an official certification claim or endorsement.",
      deliverableFields: [
        {
          id: "flashcardThreats",
          label: "Threats & Attack Vectors Flashcards",
          placeholder: "E.g. Typosquatting vs Homograph attack; Credential stuffing vs Brute force...",
        },
        {
          id: "flashcardCrypto",
          label: "Cryptography & PKI Concepts",
          placeholder: "E.g. CA role, CRL vs OCSP, Perfect Forward Secrecy (PFS), AES vs RSA...",
        },
        {
          id: "flashcardAccessControl",
          label: "Access Control & Governance Models",
          placeholder: "E.g. RBAC (roles) vs ABAC (attributes/context); Zero Trust Architecture...",
        },
      ],
    },
    checklists: [
      "Review the Security+ core concept playlist videos",
      "Write active recall flashcard definitions in the notes field",
      "Explain the CIA Triad and AAA framework in plain words without jargon",
      "Review the difference between vulnerability scanning and active penetration testing",
    ],
    defaultNotesTemplate: `## Week 4 Notes — Security+ Fundamentals

### CIA Triad
- Confidentiality: Encryption (AES), Access controls (RBAC)
- Integrity: Hashing (SHA-256), Digital signatures
- Availability: Redundancy (RAID), Load balancing, DDoS mitigation

### AAA Framework
- Authentication: proving identity (passwords, tokens, biometrics)
- Authorization: granting access permissions based on policy
- Accounting: logging and audit trail of actions taken`,
  },
  {
    week: 5,
    title: "Hands-on Cybersecurity & Ethical Testing",
    courseName: "Ethical Hacking in 12 Hours - Full Course",
    provider: "freeCodeCamp / Heath Adams (TCM Security)",
    estimatedDuration: "Approx. 12 hours",
    youtubeUrl: "https://www.youtube.com/watch?v=ug8W0sFiVJo",
    isPlaylist: false,
    topics: [
      "Ethical hacking methodology & legal scoping boundaries",
      "Network scanning & host discovery using Nmap (SYN scan, service detection, OS fingerprinting)",
      "Packet analysis & protocol inspection using Wireshark",
      "Kali Linux toolchains & safe lab environment setup (Metasploitable, TryHackMe)",
      "Vulnerability assessment workflows and responsible disclosure",
    ],
    practiceTask: {
      title: "Controlled Nmap Audit of Authorized Local Lab Host",
      description: "Run targeted Nmap scans against an intentionally vulnerable machine running in your own local virtualized lab (such as Metasploitable2 or a TryHackMe personal target). Document open ports, services, and versions discovered.",
      guidance: "Use: nmap -sS -sV -p- -O <target_ip> on your isolated host-only network adapter.",
      warning: "LEGAL NOTICE: Only test systems you own or have explicit, documented permission to assess. Unauthorized scanning of third-party IP addresses or public networks is illegal and unethical. Never target unauthorized infrastructure.",
      deliverableFields: [
        {
          id: "targetInfo",
          label: "Authorized Lab Target Environment",
          placeholder: "Host-only VM IP: 192.168.56.101 (Metasploitable 2 in local VirtualBox)...",
        },
        {
          id: "scanCommand",
          label: "Nmap Command Syntax Executed",
          placeholder: "nmap -sV -sC -O -oN scan-results.txt 192.168.56.101...",
        },
        {
          id: "portsFound",
          label: "Discovered Ports & Running Services",
          placeholder: "Port 21 (vsftpd 2.3.4), Port 22 (OpenSSH 4.7p1), Port 80 (Apache 2.2.8)...",
        },
      ],
    },
    checklists: [
      "Watch the ethical hacking methodology sections of the course",
      "Set up an isolated host-only network in VirtualBox or VMware",
      "Deploy an authorized vulnerable target VM (Metasploitable2 or OWASP BWA)",
      "Execute safe SYN scan (-sS) and service detection (-sV) on the local target",
      "Analyze findings and document defensive remediations for legacy services",
    ],
    defaultNotesTemplate: `## Week 5 Notes — Ethical Testing & Reconnaissance

### Useful Nmap Flags
- -sS: TCP SYN stealth scan (half-open, doesn't complete handshake)
- -sV: Probe open ports to determine service/version info
- -sC: Run default safe scripts from Nmap Scripting Engine (NSE)
- -p-: Scan all 65,535 TCP ports
- -oN output.txt: Save output to normal text file

### Safety Verification
- Target verified on host-only virtual adapter: Yes
- Scanned outside unauthorized IPs: Never`,
  },
  {
    week: 6,
    title: "SOC Operations & SIEM Log Monitoring",
    courseName: "Splunk Tutorial for Beginners (Cyber Security Tools)",
    provider: "Cyber Security Tools Guide",
    estimatedDuration: "Comprehensive Tutorial",
    youtubeUrl: "https://www.youtube.com/watch?v=3CiRs6WaWaU",
    isPlaylist: false,
    topics: [
      "Security Information and Event Management (SIEM) architecture & log ingestion pipelines",
      "Log sources (auth.log, syslog, Windows Event Logs, web server access logs)",
      "Search Processing Language (SPL) fundamentals: searching, filtering, aggregating, tables",
      "Configuring alerts and detection thresholds for suspicious authentication spikes",
      "SOC analyst triage workflows and incident prioritization",
    ],
    practiceTask: {
      title: "Forward VM Logs to Local SIEM & Construct an Alert Rule",
      description: "Set up a free local instance of Splunk Enterprise (Trial/Developer Free license) or an open-source SIEM (such as Elastic Stack or Wazuh). Forward Linux authentication logs (/var/log/auth.log) and construct an alert that triggers upon multiple failed SSH logins.",
      guidance: "Trigger test events by attempting incorrect SSH logins to the VM: ssh invaliduser@<vm_ip>. Search in Splunk using index=linux_auth \"Failed password\" | stats count by src_ip.",
      warning: "Keep all logging infrastructure, forwarded sources, and simulation traffic completely local and confined to your authorized lab virtual network.",
      deliverableFields: [
        {
          id: "labEnvironment",
          label: "1. Lab Environment Setup",
          placeholder: "Ubuntu VM with Splunk Forwarder sending logs to host Splunk Free...",
        },
        {
          id: "logSource",
          label: "2. Ingested Log Source & Data Input",
          placeholder: "/var/log/auth.log (sourcetype=syslog / linux_secure)...",
        },
        {
          id: "searchQuery",
          label: "3. SPL Search Query Used",
          placeholder: "index=main sourcetype=syslog \"Failed password\" | stats count by src_ip, user...",
        },
        {
          id: "alertPurpose",
          label: "4. Alert Rule Purpose & Threshold",
          placeholder: "Trigger email/notification when count > 5 failed logins within 5 minutes...",
        },
        {
          id: "whatILearned",
          label: "5. Key Lesson from Log Analysis",
          placeholder: "How timestamps, source IPs, and SSH daemon events form an audit trail...",
        },
      ],
    },
    checklists: [
      "Watch the Splunk Tutorial for Beginners video",
      "Install local Splunk Enterprise Developer Free or Wazuh agent on lab VM",
      "Configure log ingestion for system authentication logs",
      "Practice basic SPL queries (search, stats, timechart, table)",
      "Create a functional alert rule detecting simulated failed logon attempts",
    ],
    defaultNotesTemplate: `## Week 6 Notes — SIEM & Log Analysis

### Basic SPL Queries
\`\`\`spl
index=main sourcetype=syslog "Failed password"
| stats count by src_ip, user
| sort - count
\`\`\`

### Investigation Lifecycle
1. Detection: SIEM alert fires based on threshold rule
2. Triage: Verify true positive vs false positive (misconfigured script)
3. Scope: Inspect surrounding logs for same source IP
4. Containment: Block IP at firewall if external threat
5. Documentation: Record IOCs (Indicators of Compromise) in ticket`,
  },
  {
    week: 7,
    title: "Cloud Architecture & Identity Governance",
    courseName: "Microsoft Security, Compliance, and Identity (SC-900) Full Course",
    provider: "freeCodeCamp / John Savill Training",
    estimatedDuration: "Approx. 4 hours",
    youtubeUrl: "https://www.youtube.com/watch?v=LLKza5oULAA",
    isPlaylist: false,
    topics: [
      "Cloud security shared responsibility model (IaaS, PaaS, SaaS demarcation)",
      "Cloud identity & Entra ID (Azure AD): users, groups, conditional access policies",
      "Zero Trust security architecture (Explicit verification, Least privilege, Assume breach)",
      "Cloud compliance, posture management, data classification, and regulatory frameworks",
      "Multi-factor authentication (MFA) enforcement & privileged identity protection",
    ],
    practiceTask: {
      title: "Cloud Tenant Hardening: MFA & Least-Privilege Role Assignment",
      description: "Create a free personal cloud tier (Azure Free, AWS Free Tier, or Google Cloud Free), enforce Multi-Factor Authentication (MFA) across all administrative access, configure budget alerts, and verify role-based access control (RBAC) permissions.",
      guidance: "Ensure root/global administrator accounts are protected with hardware or authenticator TOTP keys, and create a separate low-privilege account for everyday console tasks.",
      warning: "SECURITY SAFEGUARD: Never request or store cloud passwords, secret keys, recovery codes, AWS access keys, or API authentication tokens in this application or anywhere public.",
      deliverableFields: [
        {
          id: "cloudProvider",
          label: "Cloud Platform Selected",
          placeholder: "Azure Free Tier / AWS Free Tier / GCP Free Tier...",
        },
        {
          id: "mfaConfigured",
          label: "MFA Verification Method Applied",
          placeholder: "Configured Microsoft Authenticator TOTP on tenant admin account...",
        },
        {
          id: "rbacApplied",
          label: "Least-Privilege Role Strategy Enforced",
          placeholder: "Separate non-admin account used for daily activities; Reader role used for inspection...",
        },
      ],
    },
    checklists: [
      "Watch the SC-900 Cloud Security and Identity course",
      "Understand the Shared Responsibility Model across IaaS vs PaaS vs SaaS",
      "Set up free personal cloud sandbox with strict billing alerts ($0 budget alert)",
      "Enforce MFA on root/administrator accounts",
      "Implement principle of least privilege using cloud RBAC",
    ],
    defaultNotesTemplate: `## Week 7 Notes — Cloud Identity & Governance

### Zero Trust Pillars
1. Verify Explicitly: Always authenticate and authorize based on all available data points.
2. Use Least Privilege: Limit user access with Just-In-Time (JIT) and Just-Enough-Access (JEA).
3. Assume Breach: Minimize blast radius and segment access; encrypt end-to-end.

### Shared Responsibility Model
- SaaS: Cloud provider manages physical, host, OS, network, and application; Customer manages data & identity.
- PaaS: Customer manages data, identity, and application code.
- IaaS: Customer manages data, identity, applications, OS, and network configuration.`,
  },
];

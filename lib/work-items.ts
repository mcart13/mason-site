export type WorkItem = {
  title: string;
  description: string;
  year: string;
  tags: string[];
  href?: string;
};

export const workItems: WorkItem[] = [
  {
    title: "Suites (Stealth)",
    description:
      "AI operating system for turning founder context, planning, and execution into a compounding workflow across teams and agents.",
    year: "2026",
    tags: ["AI", "Execution Systems", "Stealth"],
  },
  {
    title: "BOMVault",
    description:
      "Enterprise-grade SBOM generation and management platform for regulated compliance across FDA, DoD, and federal procurement workflows.",
    year: "2025",
    tags: ["Compliance", "Infrastructure", "B2B SaaS"],
  },
  {
    title: "Sightglass",
    description:
      "Local-first design review toolkit for real React apps, built around live editing, critique, and motion tuning.",
    year: "2026",
    tags: ["TypeScript", "React", "Design Tooling"],
    href: "https://github.com/mcart13/sightglass",
  },
  {
    title: "ACO",
    description:
      "Cross-platform desktop overlay for accessible, real-time captions with secure routing, local storage, and enterprise deployment requirements.",
    year: "2026",
    tags: ["Accessibility", "Desktop", "Tauri"],
  },
  {
    title: "Bookwise",
    description:
      "Correctness-first, API-first bookkeeping platform designed for SMB owners and finance workflows that need strong operational discipline.",
    year: "2026",
    tags: ["Fintech", "Go", "API-First"],
  },
  {
    title: "Skill Distiller",
    description:
      "Tooling for turning videos, URLs, docs, and notes into reusable agent skills with a tighter path from source material to execution.",
    year: "2026",
    tags: ["Python", "Developer Tools", "AI"],
    href: "https://github.com/mcart13/skill-distiller",
  },
  {
    title: "ReelEstate",
    description:
      "Zillow-to-video SaaS for turning listing data into generated real-estate marketing reels through an automated media pipeline.",
    year: "2025",
    tags: ["Real Estate", "Video", "SaaS"],
    href: "https://github.com/mcart13/reelestate",
  },
];

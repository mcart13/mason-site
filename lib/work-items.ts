export type WorkItem = {
  title: string;
  description: string;
  year: string;
  tags: string[];
  href: string;
};

export const workItems: WorkItem[] = [
  {
    title: "MachineAuth",
    description:
      "Authentication and permission infrastructure for AI agents to securely access APIs, tools, and services.",
    year: "2025",
    tags: ["Go", "AI Agents", "Security"],
    href: "https://github.com/mandarwagh9/MachineAuth",
  },
  {
    title: "OpenEyes",
    description:
      "Vision system for humanoid robots - perception pipeline for real-time environmental understanding.",
    year: "2025",
    tags: ["Python", "Computer Vision", "Robotics"],
    href: "https://github.com/mandarwagh9/openeyes",
  },
  {
    title: "VL-JEPA Jetson",
    description:
      "Vision-Language Joint Embedding Predictive Architecture optimized for NVIDIA Jetson Orin.",
    year: "2024",
    tags: ["Python", "Deep Learning", "Edge AI"],
    href: "https://github.com/mandarwagh9/vl-jepa-jetson",
  },
  {
    title: "Image Segmentation (SAM2)",
    description:
      "Image segmentation application using SAM2 (Segment Anything Model) via API.",
    year: "2024",
    tags: ["Python", "SAM2", "Computer Vision"],
    href: "https://github.com/mandarwagh9/Image-segmenting-using-SAM2",
  },
  {
    title: "KisanAI",
    description:
      "Flask-based WhatsApp chatbot for farmers and agricultural communities in India.",
    year: "2024",
    tags: ["Python", "NLP", "Agriculture"],
    href: "https://github.com/mandarwagh9/KisanAI",
  },
  {
    title: "Web Scraper",
    description:
      "Flask-based web application to scrape various types of content from URLs.",
    year: "2024",
    tags: ["Python", "Flask", "Web Scraping"],
    href: "https://github.com/mandarwagh9/web-scraper",
  },
];

import Link from "next/link";

import { PageShell } from "@/components/page-shell";

export default function AboutPage() {
  return (
    <PageShell>
      <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-8">About</h1>
      <div className="prose prose-lg dark:prose-invert">
        <p className="text-xl text-muted-foreground leading-relaxed">
          I&apos;m Mason — CSE (AI/ML) student from Nagpur, India, building systems
          that solve real problems.
        </p>
        <p className="text-lg mt-8">
          Since 2021, I&apos;ve been diving deep into AI/ML, computer vision, and
          agentic systems. My focus is on building practical AI solutions — not
          just models, but tools that actually help people.
        </p>
        <p className="text-lg mt-6">
          I build everything from vision systems for robots to authentication
          infrastructure for AI agents. The goal: make complex technology accessible
          and useful.
        </p>
        <h2 className="text-2xl font-medium mt-16 mb-4">What I Build</h2>
        <ul className="list-disc pl-6 text-lg space-y-2">
          <li>AI Agents & autonomous systems</li>
          <li>Computer vision pipelines</li>
          <li>Edge AI applications</li>
          <li>ML infrastructure</li>
        </ul>
        <h2 className="text-2xl font-medium mt-16 mb-4">Tech Stack</h2>
        <ul className="list-disc pl-6 text-lg space-y-2">
          <li>Python, Go</li>
          <li>PyTorch, TensorFlow</li>
          <li>OpenCV, SAM2</li>
          <li>NVIDIA Jetson, Edge Devices</li>
        </ul>
        <h2 className="text-2xl font-medium mt-16 mb-4">Get in Touch</h2>
        <p className="text-lg">
          Interested in collaborating or just want to say hi?{" "}
          <Link className="underline underline-offset-4" href="/contact">
            Let&apos;s talk
          </Link>
          .
        </p>
      </div>
    </PageShell>
  );
}

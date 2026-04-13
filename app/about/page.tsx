import Link from "next/link";

import { PageShell } from "@/components/page-shell";

export default function AboutPage() {
  return (
    <PageShell>
      <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-8">About</h1>
      <div className="max-w-3xl">
        <p className="text-xl text-muted-foreground leading-relaxed">
          I&apos;m Mason. I build technology, businesses, and systems around hard
          problems that reward critical thinking and execution.
        </p>
        <p className="text-lg mt-8">
          I&apos;m interested in leverage: work that compounds, removes bottlenecks,
          and creates asymmetric advantage. That includes software, AI,
          infrastructure, operations, and the practical decisions that turn ideas
          into durable outcomes.
        </p>
        <p className="text-lg mt-6">
          I care about first-principles thinking, speed with rigor, and building
          stuff that&apos;s actually useful. This site is where I share what I&apos;m
          working on, what I&apos;m learning, and the projects worth paying
          attention to.
        </p>
      </div>
      <div className="max-w-2xl">
        <h2 className="text-2xl font-medium mt-16 mb-4">What I Build</h2>
        <ul className="list-disc pl-6 text-lg space-y-2">
          <li>Software that turns context into action</li>
          <li>Execution systems for teams moving at founder speed</li>
          <li>Tools that cut complex work down to one clear next step</li>
          <li>Infrastructure for finance, compliance, and real operations</li>
        </ul>
      </div>
      <div className="max-w-2xl">
        <h2 className="text-2xl font-medium mt-16 mb-4">Tech Stack</h2>
        <ul className="list-disc pl-6 text-lg space-y-2">
          <li>TypeScript, JavaScript, Python</li>
          <li>React, Next.js, Node.js</li>
          <li>Tailwind CSS, Framer Motion</li>
          <li>Turborepo, Yarn/pnpm workspaces, Playwright, Vitest</li>
        </ul>
      </div>
      <div className="max-w-2xl">
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

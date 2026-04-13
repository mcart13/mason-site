import Link from "next/link";

import { AnimatedEnter } from "@/components/animated-enter";

export default function HomePage() {
  return (
    <main>
      <section className="px-6 pt-40 pb-20 md:px-12 md:pt-48 md:pb-32 min-h-screen flex flex-col justify-center">
        <div className="max-w-6xl mx-auto">
          <AnimatedEnter>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium leading-[1.1] tracking-tight max-w-4xl">
              Mastering the art of <span className="text-muted-foreground">figuring it out</span>.
            </h1>
          </AnimatedEnter>

          <AnimatedEnter className="mt-8" delay={0.15}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
              @mbcartwright | Robotics & AI. Building vision systems for humanoid robots.
            </p>
          </AnimatedEnter>

          <AnimatedEnter className="mt-12 flex flex-wrap gap-4" delay={0.3}>
            <Link
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded-full hover:opacity-90 transition-opacity"
              href="/work"
              style={{
                backgroundColor: "var(--foreground)",
                color: "var(--background)",
              }}
            >
              View Work
            </Link>
            <Link
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium border border-border rounded-full hover:bg-accent transition-colors"
              href="/contact"
            >
              Get in Touch
            </Link>
          </AnimatedEnter>
        </div>
      </section>
    </main>
  );
}

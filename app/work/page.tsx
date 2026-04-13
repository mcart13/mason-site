import { PageShell } from "@/components/page-shell";
import { ProjectCard } from "@/components/project-card";
import { workItems } from "@/lib/work-items";

export default function WorkPage() {
  return (
    <PageShell>
      <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">Work</h1>
      <p className="text-lg text-muted-foreground mb-16 max-w-xl">
        Selected projects I&apos;ve worked on. Each one taught me something new.
      </p>
      <div className="border-t border-border">
        {workItems.map((item, index) => (
          <ProjectCard index={index} key={item.href} {...item} />
        ))}
      </div>
    </PageShell>
  );
}

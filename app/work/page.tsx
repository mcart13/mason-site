import { PageShell } from "@/components/page-shell";
import { ProjectCard } from "@/components/project-card";
import { workItems } from "@/lib/work-items";

export default function WorkPage() {
  return (
    <PageShell>
      <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">Work</h1>
      <p className="text-lg text-muted-foreground mb-16 max-w-xl">
        Selected products, tools, and systems across software, AI, infrastructure,
        and operations.
      </p>
      <div className="border-t border-border">
        {workItems.map((item, index) => (
          <ProjectCard index={index} key={`${item.title}-${item.year}`} {...item} />
        ))}
      </div>
    </PageShell>
  );
}

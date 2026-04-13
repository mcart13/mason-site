import { BlogList } from "@/components/blog-list";
import { PageShell } from "@/components/page-shell";

export default function WritingPage() {
  return (
    <PageShell>
      <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">Writing</h1>
      <p className="text-lg text-muted-foreground mb-16 max-w-xl">
        Thoughts on building products, design, and technology.
      </p>
      <BlogList />
    </PageShell>
  );
}

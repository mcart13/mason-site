import { ContactForm } from "@/components/contact-form";
import { PageShell } from "@/components/page-shell";

export default function ContactPage() {
  return (
    <PageShell maxWidth="2xl">
      <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">
        Get in Touch
      </h1>
      <p className="text-lg text-muted-foreground mb-12">
        Have something in mind? I&apos;d love to hear from you.
      </p>
      <ContactForm />
    </PageShell>
  );
}

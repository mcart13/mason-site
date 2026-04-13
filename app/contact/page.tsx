import { PageShell } from "@/components/page-shell";
import { footerLinks } from "@/lib/navigation";

const contactLinks = [
  {
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=mason@cartwrightne.com",
    label: "Email",
  },
  ...footerLinks,
];

export default function ContactPage() {
  return (
    <PageShell maxWidth="2xl">
      <h1 className="mb-4 text-4xl font-medium tracking-tight md:text-5xl">
        Contact
      </h1>
      <p className="mb-6 text-lg text-muted-foreground">
        I&apos;m always open to discussing new opportunities, creative projects,
        or potential collaborations.
      </p>
      <p className="mb-10 text-lg text-muted-foreground">
        Feel free to reach out to me through any of the platforms below:
      </p>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-lg">
        {contactLinks.map((link) => (
          <a
            className="underline-offset-4 transition-opacity hover:opacity-70 hover:underline"
            href={link.href}
            key={link.href}
            rel="noreferrer"
            target="_blank"
          >
            {link.label}
          </a>
        ))}
      </div>
    </PageShell>
  );
}

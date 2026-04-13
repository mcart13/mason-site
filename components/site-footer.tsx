import Link from "next/link";

import { footerLinks } from "@/lib/navigation";

export function SiteFooter() {
  return (
    <footer className="px-6 py-12 md:px-12 md:py-16 mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">Mason</p>
          <p className="text-xs text-muted-foreground">
            Building technology, businesses, and systems around hard problems.
          </p>
        </div>
        <div className="flex items-center gap-6">
          {footerLinks.map((link) => (
            <a
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              href={link.href}
              key={link.href}
              rel="noopener noreferrer"
              target="_blank"
            >
              {link.label}
            </a>
          ))}
          <Link
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            href="/contact"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}

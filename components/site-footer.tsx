import Link from "next/link";

import { footerLinks } from "@/lib/navigation";

export function SiteFooter() {
  return (
    <footer className="mt-auto px-6 pt-12 pb-24 md:px-12 md:py-16">
      <div className="max-w-6xl mx-auto pl-14 md:pl-0 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">Mason</p>
          <p className="text-xs text-muted-foreground">
            Building technology, businesses, and systems around hard problems.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
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

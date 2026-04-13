"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import { navItems } from "@/lib/navigation";

function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-5 md:px-12 md:py-8">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link
          className="text-sm font-medium tracking-tight hover:opacity-70 transition-opacity"
          href="/"
        >
          Mason
        </Link>
        <nav className="flex items-center gap-6 md:gap-8">
          {navItems.map((item) => (
            <Link
              className={cn(
                "text-sm transition-colors relative",
                pathname === item.href
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
              href={item.href}
              key={item.href}
            >
              {item.label}
              {pathname === item.href ? (
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-px bg-foreground"
                  layoutId="nav-underline"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              ) : null}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

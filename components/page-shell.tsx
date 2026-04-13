import type { PropsWithChildren } from "react";

type PageShellProps = PropsWithChildren<{
  maxWidth?: "2xl" | "4xl" | "6xl";
}>;

const widths = {
  "2xl": "max-w-2xl",
  "4xl": "max-w-4xl",
  "6xl": "max-w-6xl",
} as const;

export function PageShell({
  children,
  maxWidth = "4xl",
}: PageShellProps) {
  return (
    <main className="px-6 pt-40 pb-20 md:px-12 md:pt-48 md:pb-32">
      <div className={`${widths[maxWidth]} mx-auto`}>{children}</div>
    </main>
  );
}

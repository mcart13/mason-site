"use client";

import { motion } from "framer-motion";

import type { WorkItem } from "@/lib/work-items";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

type ProjectCardProps = WorkItem & {
  index: number;
};

export function ProjectCard({
  description,
  href,
  index,
  tags,
  title,
  year,
}: ProjectCardProps) {
  const wrapperClassName = href
    ? "group block py-8 border-t border-border"
    : "block py-8 border-t border-border";
  const titleClassName = href
    ? "text-xl md:text-2xl font-medium group-hover:text-muted-foreground transition-colors"
    : "text-xl md:text-2xl font-medium";
  const content = (
    <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
      <div className="flex-1">
        <h3 className={titleClassName}>{title}</h3>
        <p className="mt-2 text-muted-foreground max-w-xl">{description}</p>
      </div>
      <div className="flex flex-wrap gap-2 md:order-last">
        {tags.map((tag) => (
          <span
            className="text-xs px-2 py-1 bg-secondary text-muted-foreground rounded"
            key={tag}
          >
            {tag}
          </span>
        ))}
      </div>
      <span className="text-sm text-muted-foreground font-mono">{year}</span>
    </div>
  );

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease }}
      viewport={{ once: true }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {href ? (
        <a className={wrapperClassName} href={href}>
          {content}
        </a>
      ) : (
        <div className={wrapperClassName}>{content}</div>
      )}
    </motion.article>
  );
}

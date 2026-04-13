"use client";

import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

type AnimatedEnterProps = PropsWithChildren<{
  className?: string;
  delay?: number;
}>;

export function AnimatedEnter({
  children,
  className,
  delay = 0,
}: AnimatedEnterProps) {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

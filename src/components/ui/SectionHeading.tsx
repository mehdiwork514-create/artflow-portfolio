"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  subtitle: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeading({ subtitle, title, description, className }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={cn("mb-16 text-center", className)}
    >
      <span className="mb-4 inline-block rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-indigo-400">
        {subtitle}
      </span>
      <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl">
        <span className="gradient-text">{title}</span>
      </h2>
      {description && (
        <p className="mx-auto max-w-2xl text-base text-muted md:text-lg">{description}</p>
      )}
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";
import { Briefcase, Code2, FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Stat } from "@/types";

const iconMap = {
  briefcase: Briefcase,
  folder: FolderOpen,
  code: Code2,
};

interface StatCardProps {
  stat: Stat;
  label: string;
  index: number;
}

export function StatCard({ stat, label, index }: StatCardProps) {
  const Icon = iconMap[stat.icon as keyof typeof iconMap] ?? Code2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl p-6 md:p-8",
        "glass glow-box glow-box-hover transition-all duration-500",
      )}
    >
      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-indigo-500/10 blur-2xl transition-all duration-500 group-hover:bg-indigo-500/20" />
      <div className="relative">
        <div className="mb-4 inline-flex rounded-xl bg-indigo-500/10 p-3 text-indigo-400 transition-colors group-hover:bg-indigo-500/20 group-hover:text-indigo-300">
          <Icon size={24} />
        </div>
        <p className="mb-1 text-3xl font-bold gradient-text md:text-4xl">{stat.value}</p>
        <p className="text-sm text-muted">{label}</p>
      </div>
    </motion.div>
  );
}

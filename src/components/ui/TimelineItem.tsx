"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

interface TimelineItemProps {
  title: string;
  company: string;
  description: string;
  period: string;
  type: "work" | "education";
  workLabel: string;
  educationLabel: string;
  index: number;
  isLast: boolean;
}

export function TimelineItem({
  title,
  company,
  description,
  period,
  type,
  workLabel,
  educationLabel,
  index,
  isLast,
}: TimelineItemProps) {
  const { isRtl } = useLanguage();
  const isWork = type === "work";

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? (isRtl ? 40 : -40) : isRtl ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative flex gap-6 md:gap-8"
    >
      <div className="relative flex flex-col items-center">
        <motion.div
          whileHover={{ scale: 1.2 }}
          className={cn(
            "relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full",
            "glass border-2 transition-all duration-300",
            isWork
              ? "border-indigo-500/50 text-indigo-400 shadow-lg shadow-indigo-500/20"
              : "border-cyan-500/50 text-cyan-400 shadow-lg shadow-cyan-500/20",
          )}
        >
          {isWork ? <Briefcase size={20} /> : <GraduationCap size={20} />}
        </motion.div>
        {!isLast && (
          <div className="absolute top-12 h-full w-px bg-gradient-to-b from-indigo-500/50 via-cyan-500/30 to-transparent" />
        )}
      </div>

      <div className="mb-10 flex-1 pb-2">
        <motion.div
          whileHover={{ x: isRtl ? -4 : 4 }}
          className={cn(
            "rounded-2xl p-6 transition-all duration-300",
            "glass glow-box hover:glow-box-hover",
          )}
        >
          <div className="mb-2 flex flex-wrap items-center gap-3">
            <span
              className={cn(
                "rounded-full px-3 py-0.5 text-xs font-medium",
                isWork
                  ? "bg-indigo-500/10 text-indigo-400"
                  : "bg-cyan-500/10 text-cyan-400",
              )}
            >
              {isWork ? workLabel : educationLabel}
            </span>
            <span className="text-xs text-muted">{period}</span>
          </div>
          <h3 className="mb-1 text-lg font-bold md:text-xl">{title}</h3>
          <p className="mb-3 text-sm font-medium text-indigo-400">{company}</p>
          <p className="text-sm leading-relaxed text-muted">{description}</p>
        </motion.div>
      </div>
    </motion.div>
  );
}

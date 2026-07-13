"use client";

import { useRef, useState, type ComponentType, type MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Braces,
  Clapperboard,
  Code2,
  Database,
  FileCode,
  Film,
  Globe,
  Hammer,
  Image,
  Layers,
  LayoutTemplate,
  Palette,
  Server,
  Terminal,
  Waypoints,
  Wind,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import type { Skill, SkillCategory } from "@/types";

const iconMap: Record<string, ComponentType<{ size?: number; className?: string }>> = {
  web: Globe,
  video: Film,
  photoshop: Image,
  wood: Hammer,
  poster: LayoutTemplate,
  teaser: Clapperboard,
  automation: Zap,
  bot: Bot,
  n8n: Waypoints,
  html: FileCode,
  css: Layers,
  javascript: Braces,
  react: Wind,
  nextjs: Terminal,
  nodejs: Server,
  python: Code2,
  database: Database,
  design: Palette,
};

interface SkillCategoryCardProps {
  category: SkillCategory;
  index: number;
}

export function SkillCategoryCard({ category, index }: SkillCategoryCardProps) {
  const { t, isRtl } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [expanded, setExpanded] = useState(false);

  const Icon = iconMap[category.icon] ?? Code2;
  const categoryName =
    t.skills.categories[category.id as keyof typeof t.skills.categories];

  const handleMouseMove = (e: MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientY - rect.top - rect.height / 2) / 12;
    const y = -(e.clientX - rect.left - rect.width / 2) / 12;
    setRotate({ x, y });
  };

  const handleMouseLeave = () => setRotate({ x: 0, y: 0 });

  const getSubSkillName = (id: string) =>
    t.skills.subSkills[id as keyof typeof t.skills.subSkills] ?? id;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: "transform 0.15s ease-out",
      }}
      className={cn("group relative", category.items && "md:col-span-2")}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl p-6",
          "glass transition-all duration-500 hover:border-white/20",
        )}
        style={{
          boxShadow: `0 0 0 1px rgba(255,255,255,0.05), 0 0 30px ${category.color}15`,
        }}
      >
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${category.color}12, transparent 70%)`,
          }}
        />

        <div className="relative">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div
              className="inline-flex rounded-xl p-3 transition-all duration-300 group-hover:scale-110"
              style={{
                backgroundColor: `${category.color}15`,
                color: category.color,
                boxShadow: `0 0 20px ${category.color}30`,
              }}
            >
              <Icon size={28} />
            </div>
            <span
              className="rounded-full px-3 py-1 text-sm font-bold"
              style={{
                backgroundColor: `${category.color}15`,
                color: category.color,
              }}
            >
              {category.level}%
            </span>
          </div>

          <h3 className="mb-3 text-xl font-semibold">{categoryName}</h3>

          <div className="h-2 overflow-hidden rounded-full bg-white/5">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${category.level}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.1 + 0.2 }}
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(${isRtl ? "270deg" : "90deg"}, ${category.color}, ${category.color}88)`,
                boxShadow: `0 0 10px ${category.color}60`,
              }}
            />
          </div>

          {category.items && (
            <>
              <button
                type="button"
                onClick={() => setExpanded(!expanded)}
                className="mt-4 text-sm text-indigo-400 transition-colors hover:text-indigo-300"
              >
                {expanded ? "▲" : "▼"} {t.skills.techStack}
              </button>

              <AnimatePresence>
                {expanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {category.items.map((item: Skill, i: number) => {
                        const SubIcon = iconMap[item.icon] ?? Code2;
                        return (
                          <div
                            key={item.id}
                            className="rounded-xl border border-white/5 bg-white/5 p-3 transition-colors hover:border-white/10"
                          >
                            <div className="mb-2 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span style={{ color: item.color }}>
                                  <SubIcon size={16} />
                                </span>
                                <span className="text-sm font-medium">
                                  {getSubSkillName(item.id)}
                                </span>
                              </div>
                              <span className="text-xs text-muted">{item.level}%</span>
                            </div>
                            <div className="h-1 overflow-hidden rounded-full bg-white/5">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${item.level}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: i * 0.05 + 0.3 }}
                                className="h-full rounded-full"
                                style={{ backgroundColor: item.color }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}

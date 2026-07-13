"use client";

import { useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { GitHubIcon } from "@/components/ui/SocialIcons";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  title: string;
  description: string;
  index: number;
}

export function ProjectCard({ project, title, description, index }: ProjectCardProps) {
  const { t } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const showTechnologies = !project.hideTechnologies && (project.technologies?.length ?? 0) > 0;

  const handleMouseMove = (e: MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientY - rect.top - rect.height / 2) / 20;
    const y = -(e.clientX - rect.left - rect.width / 2) / 20;
    setRotate({ x, y });
  };

  const handleMouseLeave = () => setRotate({ x: 0, y: 0 });

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1200px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: "transform 0.2s ease-out",
      }}
      className="group relative"
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl",
          "glass glow-box transition-all duration-500 hover:glow-box-hover",
        )}
      >
        <div
          className={cn(
            "relative h-48 overflow-hidden md:h-56",
            !project.image && cn("bg-gradient-to-br", project.gradient),
          )}
        >
          {project.image ? (
            <>
              <Image
                src={project.image}
                alt={title}
                fill
                className="object-cover opacity-25 blur-sm scale-110 transition-transform duration-700 group-hover:scale-125"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-amber-950/80 via-stone-950/70 to-black/80" />
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="relative h-28 w-28 transition-transform duration-500 group-hover:scale-110 md:h-36 md:w-36">
                  <Image
                    src={project.image}
                    alt={title}
                    fill
                    className="object-contain drop-shadow-2xl"
                    sizes="144px"
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="absolute inset-0 grid-bg opacity-50" />
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ color: project.accent }}
              >
                <div className="text-5xl font-bold opacity-20 transition-transform duration-500 group-hover:scale-110 group-hover:opacity-30 md:text-6xl">
                  {title.charAt(0)}
                </div>
              </div>
            </>
          )}

          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#030712] to-transparent" />
          <div
            className="absolute top-4 rounded-full px-3 py-1 text-xs font-medium"
            style={{
              backgroundColor: `${project.accent}20`,
              color: project.accent,
              border: `1px solid ${project.accent}30`,
              insetInlineStart: "1rem",
            }}
          >
            {t.projects.featured}
          </div>
        </div>

        <div className="p-6">
          <h3 className="mb-2 text-xl font-bold transition-colors group-hover:text-indigo-300">
            {title}
          </h3>
          <p className={cn("text-sm leading-relaxed text-muted", showTechnologies ? "mb-4" : "mb-5")}>
            {description}
          </p>

          {showTechnologies && (
            <div className="mb-5 flex flex-wrap gap-2">
              {project.technologies!.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm transition-all hover:border-indigo-500/40 hover:bg-indigo-500/10 hover:text-indigo-300"
              >
                <GitHubIcon className="h-4 w-4" />
                {t.projects.github}
              </a>
            )}
            {project.live !== "#" && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm transition-all hover:border-cyan-500/40 hover:bg-cyan-500/10 hover:text-cyan-300"
              >
                <ExternalLink size={16} />
                {t.projects.liveDemo}
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

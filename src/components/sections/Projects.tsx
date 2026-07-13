"use client";

import { projects } from "@/lib/data";
import { useLanguage } from "@/context/LanguageContext";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";

export function Projects() {
  const { t } = useLanguage();

  return (
    <section id="projects" className="section-padding relative">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          subtitle={t.projects.subtitle}
          title={t.projects.title}
          description={t.projects.description}
        />

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, index) => {
            const item = t.projects.items[project.id as keyof typeof t.projects.items];
            return (
              <ProjectCard
                key={project.id}
                project={project}
                title={item.title}
                description={item.description}
                index={index}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

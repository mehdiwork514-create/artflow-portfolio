"use client";

import { skillCategories } from "@/lib/data";
import { useLanguage } from "@/context/LanguageContext";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillCategoryCard } from "@/components/ui/SkillCategoryCard";

export function Skills() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          subtitle={t.skills.subtitle}
          title={t.skills.title}
          description={t.skills.description}
        />

        <div className="grid gap-5 sm:grid-cols-2">
          {skillCategories.map((category, index) => (
            <SkillCategoryCard key={category.id} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

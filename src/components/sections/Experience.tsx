"use client";

import { experiences } from "@/lib/data";
import { getExperiencePeriod } from "@/lib/i18n/translations";
import { useLanguage } from "@/context/LanguageContext";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TimelineItem } from "@/components/ui/TimelineItem";

export function Experience() {
  const { t, locale } = useLanguage();

  return (
    <section id="experience" className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent" />

      <div className="relative mx-auto max-w-3xl">
        <SectionHeading
          subtitle={t.experience.subtitle}
          title={t.experience.title}
          description={t.experience.description}
        />

        <div className="relative">
          {experiences.map((item, index) => {
            const content = t.experience.items[item.id as keyof typeof t.experience.items];
            return (
              <TimelineItem
                key={item.id}
                title={content.title}
                company={content.company}
                description={content.description}
                period={getExperiencePeriod(item.id, locale)}
                type={item.type}
                workLabel={t.experience.work}
                educationLabel={t.experience.education}
                index={index}
                isLast={index === experiences.length - 1}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

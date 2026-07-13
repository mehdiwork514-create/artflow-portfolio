"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { stats } from "@/lib/data";
import { useLanguage } from "@/context/LanguageContext";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatCard } from "@/components/ui/StatCard";

export function About() {
  const { t } = useLanguage();

  const statLabels: Record<string, string> = {
    experience: t.about.stats.experience,
    projects: t.about.stats.projects,
    skills: t.about.stats.skills,
  };

  return (
    <section id="about" className="section-padding relative">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          subtitle={t.about.subtitle}
          title={t.about.title}
          description={t.about.description}
        />

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-6 whitespace-pre-line text-base leading-relaxed text-muted md:text-lg">
              {t.about.text}
            </p>

            <div className="mb-8 flex items-center gap-2 text-sm text-muted">
              <MapPin size={16} className="text-indigo-400" />
              {t.about.location}
            </div>

            <div className="flex flex-wrap gap-3">
              {t.about.tags.map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {stats.map((stat, index) => (
              <StatCard
                key={stat.id}
                stat={stat}
                label={statLabels[stat.id]}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

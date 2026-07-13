"use client";

import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import { useTypingEffect } from "@/hooks/useTypingEffect";
import { useLanguage } from "@/context/LanguageContext";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ParticleBackground } from "@/components/effects/ParticleBackground";
import { HeroVisualShowcase } from "@/components/effects/HeroVisualShowcase";
import { cn } from "@/lib/utils";

export function Hero() {
  const { t, isRtl } = useLanguage();
  const typedText = useTypingEffect(t.hero.typingTexts);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20"
    >
      <ParticleBackground />

      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[120px]" />

      <div
        className={cn(
          "relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-12 px-6 lg:gap-16",
          isRtl ? "lg:flex-row-reverse" : "lg:flex-row",
        )}
      >
        <motion.div
          initial={{ opacity: 0, x: isRtl ? 50 : -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 2.4 }}
          className={cn("flex-1", isRtl ? "text-center lg:text-right" : "text-center lg:text-left")}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300"
          >
            <Sparkles size={16} />
            {t.hero.badge}
          </motion.div>

          <h1 className="mb-4 text-4xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
            {t.hero.greeting}{" "}
            <span className="gradient-text glow-text">{t.hero.name}</span>
          </h1>

          <p className="mb-2 text-xl text-muted md:text-2xl">{t.hero.title}</p>

          <div
            className={cn(
              "mb-8 flex h-10 items-center gap-1 font-mono text-lg text-cyan-400 md:text-xl",
              isRtl ? "justify-center lg:justify-end" : "justify-center lg:justify-start",
            )}
            dir="ltr"
          >
            <span className="text-indigo-400">{">"}</span>
            <span>{typedText}</span>
            <span className="typing-cursor text-indigo-400">|</span>
          </div>

          <p className="mb-10 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            {t.hero.tagline}
          </p>

          <div
            className={cn(
              "flex flex-wrap items-center gap-4",
              isRtl ? "justify-center lg:justify-end" : "justify-center lg:justify-start",
            )}
          >
            <MagneticButton href="#projects" variant="primary">
              {t.hero.viewProjects}
            </MagneticButton>
            <MagneticButton href="#contact" variant="secondary">
              {t.hero.contactMe}
            </MagneticButton>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 2.6 }}
          className="relative w-full max-w-lg flex-shrink-0"
        >
          <HeroVisualShowcase />
        </motion.div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted transition-colors hover:text-foreground"
        aria-label={t.hero.scrollLabel}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown size={24} />
        </motion.div>
      </motion.a>
    </section>
  );
}

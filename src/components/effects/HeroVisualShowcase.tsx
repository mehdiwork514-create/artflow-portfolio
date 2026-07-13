"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import dynamic from "next/dynamic";
import { CodeTerminal } from "@/components/effects/CodeTerminal";
import { HeroN8nFlow } from "@/components/effects/HeroN8nFlow";
import { HeroTelegramMock } from "@/components/effects/HeroTelegramMock";
import { HeroWoodCircuit } from "@/components/effects/HeroWoodCircuit";
import { cn } from "@/lib/utils";

const HeroOrbVisual = dynamic(
  () => import("@/components/effects/HeroOrbVisual").then((m) => m.HeroOrbVisual),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 animate-pulse bg-white/5" />,
  },
);

const SLIDES = ["code", "n8n", "telegram", "wood", "orb"] as const;
type SlideId = (typeof SLIDES)[number];

const SLIDE_LABELS: Record<SlideId, string> = {
  code: "Code terminal",
  n8n: "n8n automation flow",
  telegram: "Telegram bot chat",
  wood: "Wood craft and circuit",
  orb: "3D brand orb",
};

const DISPLAY_MS = 14000;
const PAUSE_BEFORE_SWITCH_MS = 900;
const ENTER_DELAY_S = 0.6;
const ENTER_DURATION_S = 1.15;
const EXIT_DURATION_S = 0.95;
const EASE = [0.22, 1, 0.36, 1] as const;

function buildVariants(withEnterDelay: boolean): Variants {
  return {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: ENTER_DURATION_S,
        delay: withEnterDelay ? ENTER_DELAY_S : 0,
        ease: EASE,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: EXIT_DURATION_S, ease: EASE },
    },
  };
}

function nextSlide(current: SlideId): SlideId {
  const index = SLIDES.indexOf(current);
  return SLIDES[(index + 1) % SLIDES.length];
}

function renderSlide(id: SlideId) {
  switch (id) {
    case "code":
      return <CodeTerminal />;
    case "n8n":
      return <HeroN8nFlow />;
    case "telegram":
      return <HeroTelegramMock />;
    case "wood":
      return <HeroWoodCircuit />;
    case "orb":
      return <HeroOrbVisual />;
  }
}

export function HeroVisualShowcase() {
  const [active, setActive] = useState<SlideId>("code");
  const [isPreparingSwitch, setIsPreparingSwitch] = useState(false);
  const [hasSwitched, setHasSwitched] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const queueTimer = useCallback((fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms);
    timersRef.current.push(id);
  }, []);

  const startCycle = useCallback(() => {
    clearTimers();
    setIsPreparingSwitch(false);

    queueTimer(() => {
      setIsPreparingSwitch(true);

      queueTimer(() => {
        setActive((prev) => nextSlide(prev));
        setHasSwitched(true);
        setIsPreparingSwitch(false);
        startCycle();
      }, PAUSE_BEFORE_SWITCH_MS);
    }, DISPLAY_MS);
  }, [clearTimers, queueTimer]);

  useEffect(() => {
    void import("@/components/effects/HeroOrbVisual");
    startCycle();
    return clearTimers;
  }, [startCycle, clearTimers]);

  const handleManualSwitch = (item: SlideId) => {
    if (item === active) return;
    clearTimers();
    setIsPreparingSwitch(false);
    setHasSwitched(true);
    setActive(item);
    startCycle();
  };

  const variants = buildVariants(hasSwitched);

  return (
    <div dir="ltr" className="relative w-full max-w-lg">
      <div className="pointer-events-none absolute -inset-4 rounded-2xl bg-gradient-to-br from-indigo-500/15 via-transparent to-cyan-500/15 blur-2xl" />

      <div className="relative h-[20rem] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#030712] shadow-2xl shadow-indigo-500/20 md:h-[24rem]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            variants={variants}
            initial={hasSwitched ? "initial" : false}
            animate="animate"
            exit="exit"
            className="absolute left-0 top-0 h-full w-full"
          >
            {renderSlide(active)}
          </motion.div>
        </AnimatePresence>

        {isPreparingSwitch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="pointer-events-none absolute inset-0 bg-indigo-500/5"
          />
        )}

        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
      </div>

      <div className="mt-5 flex items-center justify-center gap-1.5">
        {SLIDES.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => handleManualSwitch(item)}
            aria-label={SLIDE_LABELS[item]}
            className={cn(
              "h-2 rounded-full transition-all duration-700",
              active === item ? "w-7 bg-gradient-to-r from-indigo-500 to-cyan-500" : "w-2 bg-white/20",
            )}
          />
        ))}
      </div>
    </div>
  );
}

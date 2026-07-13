"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const CYCLE_S = 14;
const EASE = [0.45, 0, 0.25, 1] as const;

/** Rest: full oval frame · zoom: birds inside oval · return */
const PHASE = {
  scale: [1, 1, 1.32, 1.32, 1],
  glow: [0.18, 0.18, 0.75, 0.75, 0.18],
  spotlight: [0, 0, 0.9, 0.9, 0],
  sweep: [0, 0, 0.65, 0.65, 0],
  times: [0, 0.2, 0.45, 0.68, 1],
};

const DUST_PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${10 + ((i * 21) % 80)}%`,
  delay: i * 0.3,
  size: i % 4 === 0 ? "h-1 w-1" : "h-0.5 w-0.5",
}));

export function HeroWoodCircuit() {
  const { isRtl } = useLanguage();

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#060403]">
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background: `
            radial-gradient(ellipse at 50% 40%, rgba(146, 88, 38, 0.2), transparent 62%),
            linear-gradient(165deg, #0e0805 0%, #1a1008 48%, #060403 100%)
          `,
        }}
      />

      {DUST_PARTICLES.map((p) => (
        <motion.span
          key={p.id}
          className={`pointer-events-none absolute rounded-full bg-amber-500/40 blur-[0.5px] ${p.size}`}
          style={{ left: p.left, bottom: `${14 + (p.id % 4) * 5}%` }}
          animate={{
            y: [0, -35, -70],
            opacity: [0, 0.55, 0],
          }}
          transition={{
            duration: 3.8,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeOut",
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 flex items-center justify-center p-4 pb-14 pt-11"
      >
        {/* Oval viewport — always oval, even when zoomed */}
        <div className="relative aspect-[5/6] h-full max-h-[15.5rem] w-auto max-w-[11.5rem] sm:max-h-[17rem] sm:max-w-[13rem]">
          <motion.div
            className="absolute -inset-5 rounded-[50%] blur-2xl"
            animate={{ opacity: PHASE.glow }}
            transition={{ duration: CYCLE_S, repeat: Infinity, times: PHASE.times, ease: EASE }}
            style={{
              background:
                "radial-gradient(ellipse at 50% 55%, rgba(251, 191, 36, 0.4), transparent 70%)",
            }}
          />

          <div className="relative h-full w-full overflow-hidden rounded-[50%] bg-[#060403] shadow-[0_0_0_1px_rgba(120,72,32,0.25),0_8px_32px_rgba(0,0,0,0.55)]">
            <motion.div
              className="absolute inset-0"
              style={{ originX: "50%", originY: "56%" }}
              animate={{ scale: PHASE.scale }}
              transition={{ duration: CYCLE_S, repeat: Infinity, times: PHASE.times, ease: EASE }}
            >
              <Image
                src="/wood/moarrag-artwork.png"
                alt={isRtl ? "اثر منبت و معرق چوب" : "Wood carving and inlay artwork"}
                fill
                unoptimized
                className="object-cover object-[center_52%]"
                sizes="(max-width: 768px) 200px, 240px"
                priority={false}
              />
            </motion.div>

            <motion.div
              className="pointer-events-none absolute inset-0 mix-blend-soft-light"
              animate={{ opacity: PHASE.glow }}
              transition={{ duration: CYCLE_S, repeat: Infinity, times: PHASE.times, ease: EASE }}
              style={{
                background:
                  "radial-gradient(ellipse at 50% 54%, rgba(255, 220, 160, 0.45), transparent 55%)",
              }}
            />

            <motion.div
              className="pointer-events-none absolute inset-[-8%] skew-x-12 bg-gradient-to-r from-transparent via-amber-50/25 to-transparent"
              animate={{
                x: ["-150%", "-150%", "150%", "150%", "-150%"],
                opacity: PHASE.sweep,
              }}
              transition={{ duration: CYCLE_S, repeat: Infinity, times: PHASE.times, ease: EASE }}
            />

            <div className="pointer-events-none absolute inset-0 rounded-[50%] shadow-[inset_0_0_28px_rgba(0,0,0,0.45)]" />
            <div className="pointer-events-none absolute inset-[2%] rounded-[50%] ring-1 ring-amber-800/50 ring-inset" />
          </div>
        </div>
      </motion.div>

      <div className="absolute inset-x-0 top-3 z-10 flex justify-center gap-2 px-3">
        <motion.span
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="rounded-full border border-amber-500/40 bg-amber-950/75 px-2.5 py-0.5 text-[9px] font-medium text-amber-100 backdrop-blur-md"
        >
          {isRtl ? "منبت‌کاری" : "Monabat"}
        </motion.span>
        <span className="text-[9px] text-amber-500/35">◆</span>
        <motion.span
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="rounded-full border border-amber-400/35 bg-black/55 px-2.5 py-0.5 text-[9px] font-medium text-amber-50 backdrop-blur-md"
        >
          {isRtl ? "معرق‌کاری" : "Moarrag"}
        </motion.span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.7 }}
        className="absolute bottom-8 left-0 right-0 px-4 text-center"
      >
        <p className="text-xs font-semibold text-amber-100/90">
          {isRtl ? "هنر دست — منبت و معرق چوب" : "Handcraft — Carving & Inlay"}
        </p>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-between border-t border-amber-900/40 bg-black/50 px-3 py-1.5 font-mono text-[9px] text-amber-400/75 backdrop-blur-sm">
        <span>{isRtl ? "۱۰۰٪ دست‌ساز" : "100% handmade"}</span>
        <span className="text-amber-500/50">ArtFlow Studio</span>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_34%,rgba(0,0,0,0.58)_100%)]" />
    </div>
  );
}

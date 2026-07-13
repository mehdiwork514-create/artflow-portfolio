"use client";

import { motion } from "framer-motion";
import { Hammer } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const CIRCUIT_PATHS = [
  "M 40 140 L 120 140 L 120 80 L 200 80",
  "M 200 80 L 280 80 L 280 160 L 200 160 L 200 200",
  "M 120 140 L 120 200 L 60 200",
  "M 200 160 L 160 160 L 160 220 L 100 220",
];

const CARVE_PATH = "M 70 100 Q 120 60 170 100 T 270 100";

export function HeroWoodCircuit() {
  const { isRtl } = useLanguage();

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#1a1208]">
      <div
        className="absolute inset-0 opacity-90"
        style={{
          background: `
            repeating-linear-gradient(
              92deg,
              transparent,
              transparent 18px,
              rgba(120, 72, 32, 0.15) 18px,
              rgba(120, 72, 32, 0.15) 19px
            ),
            linear-gradient(165deg, #2d1f0f 0%, #4a3020 35%, #3d2818 70%, #1f140a 100%)
          `,
        }}
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-amber-900/20 via-transparent to-indigo-900/25" />

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 320 280"
        preserveAspectRatio="xMidYMid meet"
      >
        {CIRCUIT_PATHS.map((d, i) => (
          <g key={d}>
            <path d={d} fill="none" stroke="rgba(6, 182, 212, 0.12)" strokeWidth="2" />
            <motion.path
              d={d}
              fill="none"
              stroke="url(#circuit-glow)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0.4, 1, 0.6] }}
              transition={{
                pathLength: { duration: 2.2, delay: i * 0.35, ease: "easeInOut" },
                opacity: { duration: 3, repeat: Infinity, repeatType: "reverse", delay: i * 0.2 },
              }}
            />
          </g>
        ))}

        <motion.path
          d={CARVE_PATH}
          fill="none"
          stroke="#d97706"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, repeatDelay: 1.5 }}
        />

        {[
          { cx: 120, cy: 80 },
          { cx: 200, cy: 80 },
          { cx: 280, cy: 160 },
          { cx: 120, cy: 200 },
        ].map((node, i) => (
          <motion.circle
            key={i}
            cx={node.cx}
            cy={node.cy}
            r="4"
            fill="#06b6d4"
            animate={{ opacity: [0.4, 1, 0.4], r: [3.5, 5, 3.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
          />
        ))}

        <defs>
          <linearGradient id="circuit-glow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="50%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6">
        <motion.div
          animate={{ rotate: [0, 3, -3, 0], y: [0, -4, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-950/50 shadow-lg shadow-amber-900/30"
        >
          <Hammer size={28} className="text-amber-400" />
        </motion.div>
        <p className="text-center text-sm font-medium text-amber-100/90">
          {isRtl ? "هنر چوب × تکنولوژی" : "Wood Craft × Technology"}
        </p>
        <p className="max-w-[14rem] text-center text-[10px] leading-relaxed text-amber-200/50">
          {isRtl
            ? "ترکیب هنر دستی منبت و معرق با طراحی دیجیتال"
            : "Blending hand-carved wood art with digital design"}
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 border-t border-amber-900/40 bg-black/30 px-4 py-2 font-mono text-[10px] text-amber-400/80 backdrop-blur-sm">
        {isRtl ? "منبت و معرق چوب" : "Wood Carving & Inlay"}
      </div>
    </div>
  );
}

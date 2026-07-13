"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const INLAY_PIECES = [
  { d: "M160 80 L200 80 L200 120 L160 120 Z", fill: "#c4a574", delay: 0 },
  { d: "M200 80 L240 80 L240 120 L200 120 Z", fill: "#8b5a2b", delay: 0.15 },
  { d: "M160 120 L200 120 L200 160 L160 160 Z", fill: "#6b3f1f", delay: 0.3 },
  { d: "M200 120 L240 120 L240 160 L200 160 Z", fill: "#d4a96a", delay: 0.45 },
  { d: "M180 100 L220 100 L220 140 L180 140 Z", fill: "#a0622a", delay: 0.6 },
];

const CARVE_PATHS = [
  "M 50 200 Q 100 140 150 180 T 250 160",
  "M 60 210 Q 130 150 200 195",
  "M 280 60 Q 300 100 270 140 Q 250 170 290 200",
];

const WOOD_CHIPS = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: 20 + (i * 23) % 280,
  delay: i * 0.35,
}));

export function HeroWoodCircuit() {
  const { isRtl } = useLanguage();
  const [carveIndex, setCarveIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCarveIndex((p) => (p + 1) % CARVE_PATHS.length), 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#120c06]">
      <div
        className="absolute inset-0"
        style={{
          background: `
            repeating-linear-gradient(
              88deg,
              transparent,
              transparent 14px,
              rgba(90, 55, 28, 0.12) 14px,
              rgba(90, 55, 28, 0.12) 15px
            ),
            linear-gradient(160deg, #1a0f08 0%, #3d2818 40%, #2a1a10 75%, #0d0804 100%)
          `,
        }}
      />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(217,119,6,0.12),transparent_55%)]" />

      {WOOD_CHIPS.map((chip) => (
        <motion.span
          key={chip.id}
          className="absolute h-1 w-2 rounded-sm bg-amber-700/60"
          style={{ left: `${chip.x}px`, top: "55%" }}
          animate={{
            y: [0, -30, -60],
            x: [0, (chip.id % 2 ? 8 : -8), 0],
            opacity: [0, 0.8, 0],
            rotate: [0, 45, 90],
          }}
          transition={{ duration: 2.5, repeat: Infinity, delay: chip.delay, ease: "easeOut" }}
        />
      ))}

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 320 260"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <pattern id="moarrag-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M0 20 L20 0 M-5 5 L5 -5 M15 25 L25 15" stroke="rgba(212,169,106,0.08)" strokeWidth="0.5" />
          </pattern>
          <linearGradient id="carve-glow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
        </defs>

        <rect width="320" height="260" fill="url(#moarrag-grid)" />

        {/* معرق — geometric inlay */}
        <g transform="translate(40, 30)">
          <motion.polygon
            points="120,0 160,70 120,140 80,70"
            fill="none"
            stroke="rgba(212,169,106,0.25)"
            strokeWidth="1"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          {INLAY_PIECES.map((piece) => (
            <motion.path
              key={piece.d}
              d={piece.d}
              fill={piece.fill}
              stroke="rgba(0,0,0,0.3)"
              strokeWidth="0.5"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0.5, 1, 0.7], scale: 1 }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatType: "reverse",
                delay: piece.delay,
              }}
              style={{ transformOrigin: "200px 120px" }}
            />
          ))}
          <motion.polygon
            points="120,50 145,70 120,90 95,70"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1, opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </g>

        {/* منبت — carving strokes */}
        {CARVE_PATHS.map((d, i) => (
          <g key={d}>
            <path d={d} fill="none" stroke="rgba(60,35,15,0.5)" strokeWidth="3" strokeLinecap="round" />
            <motion.path
              d={d}
              fill="none"
              stroke="url(#carve-glow)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: carveIndex === i ? 1 : carveIndex > i ? 1 : 0, opacity: carveIndex === i ? 1 : 0.35 }}
              transition={{ duration: 2.8, ease: "easeInOut" }}
            />
          </g>
        ))}

        {/* Chisel tip */}
        <motion.g
          animate={{
            x: [50, 150, 250, 150],
            y: [200, 170, 190, 200],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <polygon points="0,0 8,-4 8,4" fill="#e2e8f0" />
          <rect x="8" y="-2" width="14" height="4" rx="1" fill="#94a3b8" />
        </motion.g>
      </svg>

      <div className="absolute inset-x-0 top-3 flex justify-center gap-2 px-3">
        <span className="rounded-full border border-amber-500/30 bg-amber-950/60 px-2.5 py-0.5 text-[9px] font-medium text-amber-300 backdrop-blur-sm">
          {isRtl ? "منبت‌کاری" : "Carving"}
        </span>
        <span className="rounded-full border border-amber-400/20 bg-black/30 px-2.5 py-0.5 text-[9px] text-amber-200/50">
          +
        </span>
        <span className="rounded-full border border-amber-600/30 bg-amber-900/50 px-2.5 py-0.5 text-[9px] font-medium text-amber-200 backdrop-blur-sm">
          {isRtl ? "معرق‌کاری" : "Inlay"}
        </span>
      </div>

      <div className="absolute bottom-8 left-0 right-0 px-4 text-center">
        <p className="text-xs font-semibold text-amber-100/90">
          {isRtl ? "هنر دست — منبت و معرق چوب" : "Handcraft — Carving & Inlay"}
        </p>
        <p className="mt-1 text-[9px] leading-relaxed text-amber-200/45">
          {isRtl
            ? "طراحی ظریف، برش دقیق و چیدمان قطعات معرق"
            : "Fine design, precise cuts, inlaid wood pieces"}
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between border-t border-amber-900/50 bg-black/40 px-3 py-1.5 font-mono text-[9px] text-amber-400/75 backdrop-blur-sm">
        <span>{isRtl ? "گردو · افرا · راش" : "Walnut · Maple · Beech"}</span>
        <span>{isRtl ? "۱۰۰٪ دست‌ساز" : "100% handmade"}</span>
      </div>
    </div>
  );
}

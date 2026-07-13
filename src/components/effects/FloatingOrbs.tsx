"use client";

import { motion } from "framer-motion";

const orbs = [
  { size: 300, color: "rgba(99, 102, 241, 0.15)", x: "10%", y: "20%", delay: 0 },
  { size: 200, color: "rgba(6, 182, 212, 0.12)", x: "80%", y: "60%", delay: 2 },
  { size: 250, color: "rgba(168, 85, 247, 0.1)", x: "60%", y: "10%", delay: 4 },
];

export function FloatingOrbs() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: orb.color,
          }}
          animate={{
            y: [0, -30, 0, 30, 0],
            x: [0, 20, 0, -20, 0],
            scale: [1, 1.1, 1, 0.9, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            delay: orb.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

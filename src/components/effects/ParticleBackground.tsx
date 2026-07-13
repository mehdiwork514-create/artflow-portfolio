"use client";

import { useMemo } from "react";
import {
  Particles,
  ParticlesProvider,
  useParticlesProvider,
} from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

function ParticleCanvas() {
  const { loaded } = useParticlesProvider();

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: false,
      background: { color: { value: "transparent" } },
      fpsLimit: 60,
      particles: {
        number: { value: 80, density: { enable: true, width: 1920, height: 1080 } },
        color: { value: ["#6366f1", "#06b6d4", "#a855f7"] },
        shape: { type: "circle" },
        opacity: {
          value: { min: 0.1, max: 0.5 },
          animation: { enable: true, speed: 1, sync: false },
        },
        size: { value: { min: 1, max: 3 } },
        links: {
          enable: true,
          distance: 150,
          color: "#6366f1",
          opacity: 0.15,
          width: 1,
        },
        move: {
          enable: true,
          speed: 0.8,
          direction: "none",
          random: true,
          outModes: { default: "out" },
        },
      },
      interactivity: {
        detectsOn: "canvas",
        events: {
          onHover: { enable: true, mode: "grab" },
          onClick: { enable: true, mode: "push" },
          resize: { enable: true },
        },
        modes: {
          grab: { distance: 140, links: { opacity: 0.4 } },
          push: { quantity: 3 },
        },
      },
      detectRetina: true,
    }),
    [],
  );

  if (!loaded) return null;

  return (
    <Particles
      id="tsparticles"
      options={options}
      className="absolute inset-0 -z-10 h-full w-full"
    />
  );
}

export function ParticleBackground() {
  return (
    <ParticlesProvider init={loadSlim}>
      <ParticleCanvas />
    </ParticlesProvider>
  );
}

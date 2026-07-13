"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Torus, Stars } from "@react-three/drei";
import type { Mesh } from "three";

function CoreOrb() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.18;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.25;
  });

  return (
    <Float speed={2.2} rotationIntensity={0.6} floatIntensity={1.8}>
      <Sphere ref={meshRef} args={[1.4, 64, 64]}>
        <MeshDistortMaterial
          color="#6366f1"
          attach="material"
          distort={0.45}
          speed={2.5}
          roughness={0.15}
          metalness={0.9}
          emissive="#4f46e5"
          emissiveIntensity={0.45}
        />
      </Sphere>
    </Float>
  );
}

function OrbitRings() {
  const ring1 = useRef<Mesh>(null);
  const ring2 = useRef<Mesh>(null);
  const ring3 = useRef<Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ring1.current) {
      ring1.current.rotation.x = Math.PI / 2.5;
      ring1.current.rotation.z = t * 0.35;
    }
    if (ring2.current) {
      ring2.current.rotation.y = Math.PI / 3;
      ring2.current.rotation.x = t * 0.28;
    }
    if (ring3.current) {
      ring3.current.rotation.z = t * 0.4;
    }
  });

  return (
    <>
      <mesh ref={ring1}>
        <torusGeometry args={[2.2, 0.025, 16, 120]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.75} />
      </mesh>
      <mesh ref={ring2}>
        <torusGeometry args={[2.6, 0.018, 16, 120]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.55} />
      </mesh>
      <Torus ref={ring3} args={[1.9, 0.012, 16, 100]}>
        <meshBasicMaterial color="#818cf8" transparent opacity={0.4} />
      </Torus>
    </>
  );
}

function ParticleField() {
  return <Stars radius={80} depth={40} count={1200} factor={3} saturation={0} fade speed={0.6} />;
}

export function HeroOrbVisual() {
  return (
    <div className="absolute inset-0 bg-[#030712]">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-500/15 via-transparent to-cyan-500/15" />
      <div className="absolute left-0 top-0 h-full w-full hero-visual-canvas">
        <Canvas
          style={{ display: "block", width: "100%", height: "100%" }}
          camera={{ position: [0, 0, 7], fov: 42 }}
          gl={{ antialias: true }}
          dpr={[1, 2]}
        >
          <color attach="background" args={["#030712"]} />
          <ambientLight intensity={0.25} />
          <pointLight position={[8, 8, 8]} intensity={1.2} color="#6366f1" />
          <pointLight position={[-8, -6, -4]} intensity={0.7} color="#06b6d4" />
          <pointLight position={[0, -8, 4]} intensity={0.4} color="#a855f7" />
          <ParticleField />
          <CoreOrb />
          <OrbitRings />
        </Canvas>
      </div>
      <div className="pointer-events-none absolute bottom-3 left-3 rounded-lg bg-black/40 px-2 py-1 font-mono text-[10px] text-cyan-400 backdrop-blur-sm">
        3D · WebGL
      </div>
    </div>
  );
}

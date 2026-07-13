"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import type { Mesh } from "three";

function AnimatedSphere() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
      <Sphere ref={meshRef} args={[1.8, 64, 64]}>
        <MeshDistortMaterial
          color="#6366f1"
          attach="material"
          distort={0.35}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          emissive="#4f46e5"
          emissiveIntensity={0.3}
        />
      </Sphere>
    </Float>
  );
}

function WireframeRing() {
  const ringRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.3;
      ringRef.current.rotation.x = Math.PI / 3;
    }
  });

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[2.5, 0.02, 16, 100]} />
      <meshBasicMaterial color="#06b6d4" transparent opacity={0.6} />
    </mesh>
  );
}

export function ThreeAvatar() {
  return (
    <div className="relative h-72 w-72 md:h-96 md:w-96">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500/20 via-transparent to-cyan-500/20 blur-3xl animate-pulse-glow" />
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        className="rounded-full"
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#6366f1" />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#06b6d4" />
        <AnimatedSphere />
        <WireframeRing />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 rounded-full border border-white/10" />
    </div>
  );
}

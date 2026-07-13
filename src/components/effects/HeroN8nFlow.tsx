"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Bot,
  Braces,
  Filter,
  GitBranch,
  Globe,
  Table2,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const VB_W = 520;
const VB_H = 228;
const CYCLE_MS = 750;
const TOTAL_STEPS = 17;

const NODE_W = 34;
const NODE_H = 30;
const NODE_HW = NODE_W / 2;
const NODE_HH = NODE_H / 2;

const COL = [36, 98, 160, 222, 284, 346, 408, 468] as const;
const LANE = { patient: 46, doctor: 114, fallback: 182 } as const;

type NodeKind = "trigger" | "code" | "switch" | "if" | "db" | "http";

type FlowNode = {
  id: string;
  label: string;
  sub?: string;
  kind: NodeKind;
  icon: LucideIcon;
  color: string;
  x: number;
  y: number;
  step: number;
};

const KIND_BORDER: Record<NodeKind, string> = {
  trigger: "#38bdf866",
  code: "#fb923c55",
  switch: "#60a5fa66",
  if: "#4ade8066",
  db: "#f8717155",
  http: "#a78bfa66",
};

function portOut(n: { x: number; y: number }) {
  return { x: n.x + NODE_HW, y: n.y };
}

function portIn(n: { x: number; y: number }) {
  return { x: n.x - NODE_HW, y: n.y };
}

function edgePath(from: { x: number; y: number }, to: { x: number; y: number }) {
  const a = portOut(from);
  const b = portIn(to);
  const gap = b.x - a.x;
  const dy = Math.abs(b.y - a.y);

  if (dy < 4) {
    const dx = Math.max(18, gap * 0.5);
    return `M ${a.x} ${a.y} C ${a.x + dx} ${a.y}, ${b.x - dx} ${b.y}, ${b.x} ${b.y}`;
  }

  const mx = a.x + gap * 0.5;
  return `M ${a.x} ${a.y} C ${mx} ${a.y}, ${mx} ${b.y}, ${b.x} ${b.y}`;
}

function FlowPulse({ path, active }: { path: string; active: boolean }) {
  if (!active) return null;
  return (
    <g filter="url(#glow)">
      <motion.circle
        r="3.5"
        fill="#a5f3fc"
        opacity={0.35}
        initial={{ offsetDistance: "0%" }}
        animate={{ offsetDistance: ["0%", "100%"] }}
        transition={{ duration: 0.55, ease: "linear", repeat: Infinity }}
        style={{ offsetPath: `path('${path}')` }}
      />
      <motion.circle
        r="2"
        fill="#ecfeff"
        initial={{ offsetDistance: "0%", opacity: 0.4 }}
        animate={{ offsetDistance: ["0%", "100%"], opacity: [0.4, 1, 1, 0.4] }}
        transition={{ duration: 0.55, ease: "linear", repeat: Infinity }}
        style={{ offsetPath: `path('${path}')` }}
      />
    </g>
  );
}

const NODE_DEFS: (Omit<FlowNode, "sub"> & { sub?: string })[] = [
  { id: "t1", label: "TG Trigger", kind: "trigger", icon: Bot, color: "#38BDF8", x: COL[0], y: LANE.doctor, step: 0 },
  { id: "p1", label: "Parse Start", kind: "code", icon: Braces, color: "#FB923C", x: COL[1], y: LANE.doctor, step: 1 },
  { id: "sw", label: "Switch", kind: "switch", icon: GitBranch, color: "#60A5FA", x: COL[2], y: LANE.doctor, step: 2 },
  { id: "pb", label: "Pt. Build", kind: "code", icon: Braces, color: "#FB923C", x: COL[3], y: LANE.patient, step: 3 },
  { id: "gs", label: "Get Session", kind: "db", icon: Table2, color: "#F87171", x: COL[4], y: LANE.patient, step: 4 },
  { id: "gp", label: "Pt. Get", kind: "db", icon: Table2, color: "#F87171", x: COL[5], y: LANE.patient, step: 5 },
  { id: "if1", label: "Found?", kind: "if", icon: Filter, color: "#4ADE80", x: COL[6], y: LANE.patient, step: 6 },
  { id: "sb", label: "Send Btn", kind: "http", icon: Globe, color: "#A78BFA", x: COL[7], y: LANE.patient, step: 7 },
  { id: "db_b", label: "Dr. Build", kind: "code", icon: Braces, color: "#FB923C", x: COL[3], y: LANE.doctor, step: 8 },
  { id: "if2", label: "Linked?", kind: "if", icon: Filter, color: "#4ADE80", x: COL[4], y: LANE.doctor, step: 9 },
  { id: "up", label: "Upsert", kind: "db", icon: Table2, color: "#F87171", x: COL[5], y: LANE.doctor, step: 10 },
  { id: "if3", label: "Auto?", kind: "if", icon: Filter, color: "#4ADE80", x: COL[6], y: LANE.doctor, step: 11 },
  { id: "st", label: "Send Text", kind: "http", icon: Globe, color: "#A78BFA", x: COL[7], y: LANE.doctor, step: 12 },
  { id: "hp", label: "Help", kind: "code", icon: Braces, color: "#FB923C", x: COL[3], y: LANE.fallback, step: 13 },
  { id: "fb", label: "Fallback", kind: "code", icon: Braces, color: "#FB923C", x: COL[4], y: LANE.fallback, step: 14 },
  { id: "st2", label: "Send Text", kind: "http", icon: Globe, color: "#A78BFA", x: COL[7], y: LANE.fallback, step: 15 },
];

type BuiltEdge = {
  id: string;
  path: string;
  activatesAt: number;
  label?: string;
  labelX: number;
  labelY: number;
  from: { x: number; y: number };
  to: { x: number; y: number };
};

function buildEdges(): BuiltEdge[] {
  const n = (id: string) => {
    const node = NODE_DEFS.find((x) => x.id === id)!;
    return { x: node.x, y: node.y };
  };

  const defs = [
    { id: "e0", from: n("t1"), to: n("p1"), activatesAt: 1 },
    { id: "e1", from: n("p1"), to: n("sw"), activatesAt: 2 },
    { id: "e2", from: n("sw"), to: n("pb"), activatesAt: 3, label: "patient" },
    { id: "e3", from: n("pb"), to: n("gs"), activatesAt: 4 },
    { id: "e4", from: n("gs"), to: n("gp"), activatesAt: 5 },
    { id: "e5", from: n("gp"), to: n("if1"), activatesAt: 6 },
    { id: "e6", from: n("if1"), to: n("sb"), activatesAt: 7, label: "true" },
    { id: "e7", from: n("sw"), to: n("db_b"), activatesAt: 8, label: "doctor" },
    { id: "e8", from: n("db_b"), to: n("if2"), activatesAt: 9 },
    { id: "e9", from: n("if2"), to: n("up"), activatesAt: 10, label: "false" },
    { id: "e10", from: n("up"), to: n("if3"), activatesAt: 11 },
    { id: "e11", from: n("if3"), to: n("st"), activatesAt: 12, label: "true" },
    { id: "e12", from: n("sw"), to: n("hp"), activatesAt: 13, label: "fallback" },
    { id: "e13", from: n("hp"), to: n("fb"), activatesAt: 14 },
    { id: "e14", from: n("fb"), to: n("st2"), activatesAt: 15 },
  ];

  return defs.map((e) => {
    const a = portOut(e.from);
    const b = portIn(e.to);
    return {
      ...e,
      path: edgePath(e.from, e.to),
      labelX: (a.x + b.x) / 2,
      labelY: (a.y + b.y) / 2 - 7,
    };
  });
}

const EDGES = buildEdges();

function SvgNode({
  node,
  active,
  done,
}: {
  node: FlowNode;
  active: boolean;
  done: boolean;
}) {
  const Icon = node.icon;
  const x = node.x - NODE_HW;
  const y = node.y - NODE_HH;

  return (
    <g>
      {active && (
        <rect
          x={x - 2}
          y={y - 2}
          width={NODE_W + 4}
          height={NODE_H + 4}
          rx={6}
          fill="none"
          stroke="#22d3ee"
          strokeWidth={1}
          opacity={0.5}
        />
      )}
      <rect
        x={x}
        y={y}
        width={NODE_W}
        height={NODE_H}
        rx={4}
        fill="#2a2f3a"
        stroke={active ? "#22d3ee55" : KIND_BORDER[node.kind]}
        strokeWidth={1}
      />
      {node.kind === "trigger" && (
        <polygon
          points={`${x - 5},${node.y} ${x - 1},${node.y - 3} ${x - 1},${node.y + 3}`}
          fill="#fbbf24"
        />
      )}
      <rect x={x + 4} y={y + 4} width={12} height={12} rx={2} fill={`${node.color}22`} />
      <foreignObject x={x + 4} y={y + 4} width={12} height={12}>
        <div
          style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 12, height: 12 }}
        >
          <Icon size={8} color={node.color} strokeWidth={2} />
        </div>
      </foreignObject>
      <text
        x={node.x}
        y={y + 22}
        textAnchor="middle"
        fill={done || active ? "#e2e8f0" : "#cbd5e1"}
        fontSize={6.5}
        fontFamily="ui-monospace, monospace"
        fontWeight={500}
      >
        {node.label}
      </text>
      {node.sub && (
        <text x={node.x} y={y + 28} textAnchor="middle" fill="#64748b" fontSize={5.5} fontFamily="ui-monospace, monospace">
          {node.sub}
        </text>
      )}
      {active && <circle cx={x + NODE_W - 2} cy={y + 2} r={2} fill="#22d3ee" />}
    </g>
  );
}

export function HeroN8nFlow() {
  const { isRtl } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);
  const [runs, setRuns] = useState(4821);

  const nodes: FlowNode[] = useMemo(
    () =>
      NODE_DEFS.map((n) => ({
        ...n,
        sub: isRtl
          ? n.id === "st2"
            ? "راهنما"
            : n.id === "st"
              ? "پاسخ"
              : n.id === "sb"
                ? "پیام"
                : n.sub
          : n.sub,
      })),
    [isRtl],
  );

  const statusLines = useMemo(
    () =>
      isRtl
        ? [
            "▶ Telegram Trigger — پیام ورودی",
            "▶ Parse Start — استخراج mode",
            "▶ Switch Mode",
            "▶ patient → Patient Build",
            "▶ Get Patient Session",
            "▶ Patient Get By doctor_id",
            "▶ IF Found By ID? → true",
            "▶ Send Button Message ✓",
            "▶ doctor → Doctor Build",
            "▶ IF Already linked? → false",
            "▶ Upsert Patient Session",
            "▶ IF Auto link? → true",
            "▶ Send Text — TG Reply ✓",
            "▶ fallback → Help Payload",
            "▶ Fallback Parse",
            "▶ Send Text — Help ✓",
            "✓ Workflow OK — Paziresh 24",
          ]
        : [
            "▶ Telegram Trigger — incoming message",
            "▶ Parse Start — extract mode",
            "▶ Switch Mode",
            "▶ patient → Patient Build",
            "▶ Get Patient Session",
            "▶ Patient Get By doctor_id",
            "▶ IF Found By ID? → true",
            "▶ Send Button Message ✓",
            "▶ doctor → Doctor Build",
            "▶ IF Already linked? → false",
            "▶ Upsert Patient Session",
            "▶ IF Auto link? → true",
            "▶ Send Text — TG Reply ✓",
            "▶ fallback → Help Payload",
            "▶ Fallback Parse",
            "▶ Send Text — Help ✓",
            "✓ Workflow OK — Paziresh 24",
          ],
    [isRtl],
  );

  useEffect(() => {
    const id = setInterval(() => {
      setActiveStep((prev) => {
        const next = (prev + 1) % TOTAL_STEPS;
        if (next === 0) setRuns((r) => r + 1);
        return next;
      });
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="absolute inset-0 flex flex-col bg-[#1a1d23]">
      <div className="flex items-center justify-between border-b border-white/5 bg-[#22252b] px-2.5 py-1.5">
        <div className="flex items-center gap-1.5">
          <Zap size={12} className="text-amber-400" />
          <span className="font-mono text-[9px] font-medium text-slate-200">
            {isRtl ? "نوبینو | پذیرش ۲۴ — Workflow" : "Nobino | Paziresh 24 — Workflow"}
          </span>
        </div>
        <span className="rounded bg-emerald-500/15 px-1.5 py-0.5 font-mono text-[8px] text-emerald-400">
          {isRtl ? "فعال" : "Active"}
        </span>
      </div>

      <div className="relative min-h-0 flex-1 bg-[#1e2128] p-2">
        <svg
          className="h-full w-full"
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <pattern id="grid" width="14" height="14" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.8" fill="rgba(255,255,255,0.05)" />
            </pattern>
            <filter id="glow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="2" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect width={VB_W} height={VB_H} fill="url(#grid)" />

          {/* lane guides */}
          {[LANE.patient, LANE.doctor, LANE.fallback].map((ly) => (
            <line
              key={ly}
              x1={8}
              y1={ly}
              x2={VB_W - 8}
              y2={ly}
              stroke="rgba(255,255,255,0.03)"
              strokeWidth={1}
            />
          ))}

          {EDGES.map((edge) => {
            const lit = activeStep >= edge.activatesAt;
            const flowing = activeStep === edge.activatesAt;
            const a = portOut(edge.from);
            const b = portIn(edge.to);

            return (
              <g key={edge.id}>
                <path d={edge.path} fill="none" stroke="#404a58" strokeWidth={1.5} strokeLinecap="round" />
                <motion.path
                  d={edge.path}
                  fill="none"
                  stroke={lit ? "#8b9cb3" : "#4b5563"}
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  animate={{ opacity: lit ? 0.9 : 0.35 }}
                  transition={{ duration: 0.2 }}
                />
                {flowing && (
                  <motion.path
                    d={edge.path}
                    fill="none"
                    stroke="#22d3ee"
                    strokeWidth={1}
                    strokeLinecap="round"
                    strokeDasharray="4 6"
                    animate={{ strokeDashoffset: [0, -20] }}
                    transition={{ duration: 0.7, ease: "linear", repeat: Infinity }}
                    opacity={0.6}
                  />
                )}
                <circle cx={a.x} cy={a.y} r={2} fill="#6b7280" opacity={lit ? 0.85 : 0.4} />
                <circle cx={b.x} cy={b.y} r={2} fill="#6b7280" opacity={lit ? 0.85 : 0.4} />
                {edge.label && (
                  <text
                    x={edge.labelX}
                    y={edge.labelY}
                    textAnchor="middle"
                    fill={lit ? "#94a3b8" : "#4b5563"}
                    fontSize={6}
                    fontFamily="ui-monospace, monospace"
                  >
                    {edge.label}
                  </text>
                )}
                <FlowPulse path={edge.path} active={flowing} />
              </g>
            );
          })}

          {nodes.map((node) => (
            <SvgNode
              key={node.id}
              node={node}
              active={activeStep === node.step}
              done={activeStep > node.step}
            />
          ))}
        </svg>
      </div>

      <div className="border-t border-white/5 bg-[#22252b] px-2.5 py-1">
        <motion.p
          key={activeStep}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="truncate font-mono text-[8px] text-slate-300"
        >
          {statusLines[activeStep]}
        </motion.p>
        <div className="mt-0.5 flex items-center justify-between font-mono text-[7px] text-slate-500">
          <span>
            {runs.toLocaleString()} {isRtl ? "اجرا" : "executions"}
          </span>
          <span>16 nodes · 15 {isRtl ? "اتصال" : "connections"}</span>
        </div>
      </div>
    </div>
  );
}

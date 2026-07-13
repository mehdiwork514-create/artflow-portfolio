"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  Bot,
  Braces,
  CalendarDays,
  Database,
  Filter,
  GitMerge,
  Globe,
  Link2,
  Mail,
  MessageCircle,
  Server,
  Sparkles,
  Stethoscope,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

const NODE_CYCLE_MS = 1000;
const TOTAL_STEPS = 15;

type FlowNode = {
  id: string;
  label: string;
  sub: string;
  icon: LucideIcon;
  color: string;
  x: number;
  y: number;
  step: number;
};

type FlowEdge = {
  id: string;
  path: string;
  activatesAt: number;
};

function FlowParticle({ path, active }: { path: string; active: boolean }) {
  if (!active) return null;
  return (
    <motion.circle
      r="2"
      fill="#34d399"
      filter="url(#n8n-glow)"
      initial={{ offsetDistance: "0%" }}
      animate={{ offsetDistance: "100%" }}
      transition={{ duration: 0.75, ease: "linear", repeat: Infinity }}
      style={{ offsetPath: `path('${path}')` }}
    />
  );
}

export function HeroN8nFlow() {
  const { isRtl } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);
  const [executions, setExecutions] = useState(3847);

  const nodes: FlowNode[] = useMemo(
    () =>
      isRtl
        ? [
            { id: "tg", label: "نوبینو", sub: "TG", icon: Bot, color: "#0EA5E9", x: 4, y: 54, step: 0 },
            { id: "hook", label: "Webhook", sub: "POST", icon: Link2, color: "#6366F1", x: 14, y: 54, step: 1 },
            { id: "ai", label: "NLP", sub: "AI", icon: Sparkles, color: "#A855F7", x: 24, y: 54, step: 2 },
            { id: "http", label: "HTTP", sub: "API", icon: Globe, color: "#8B5CF6", x: 34, y: 54, step: 3 },
            { id: "cal", label: "تقویم", sub: "Sync", icon: CalendarDays, color: "#14B8A6", x: 44, y: 54, step: 4 },
            { id: "if", label: "IF", sub: "شرط", icon: Filter, color: "#F59E0B", x: 54, y: 54, step: 5 },
            { id: "db", label: "DB", sub: "رزرو", icon: Database, color: "#10B981", x: 64, y: 16, step: 6 },
            { id: "redis", label: "Redis", sub: "Cache", icon: Server, color: "#EF4444", x: 74, y: 16, step: 7 },
            { id: "sms", label: "SMS", sub: "24h", icon: Bell, color: "#EC4899", x: 84, y: 16, step: 8 },
            { id: "mail", label: "ایمیل", sub: "Dr.", icon: Mail, color: "#F472B6", x: 94, y: 16, step: 9 },
            { id: "wait", label: "صف", sub: "Wait", icon: Stethoscope, color: "#F97316", x: 64, y: 88, step: 10 },
            { id: "crm", label: "CRM", sub: "Sync", icon: Braces, color: "#FB923C", x: 74, y: 88, step: 11 },
            { id: "reply", label: "پاسخ", sub: "TG", icon: MessageCircle, color: "#38BDF8", x: 84, y: 88, step: 12 },
            { id: "merge", label: "Merge", sub: "Log", icon: GitMerge, color: "#22D3EE", x: 94, y: 54, step: 13 },
          ]
        : [
            { id: "tg", label: "Nobino", sub: "TG", icon: Bot, color: "#0EA5E9", x: 4, y: 54, step: 0 },
            { id: "hook", label: "Webhook", sub: "POST", icon: Link2, color: "#6366F1", x: 14, y: 54, step: 1 },
            { id: "ai", label: "NLP", sub: "AI", icon: Sparkles, color: "#A855F7", x: 24, y: 54, step: 2 },
            { id: "http", label: "HTTP", sub: "API", icon: Globe, color: "#8B5CF6", x: 34, y: 54, step: 3 },
            { id: "cal", label: "Calendar", sub: "Sync", icon: CalendarDays, color: "#14B8A6", x: 44, y: 54, step: 4 },
            { id: "if", label: "IF", sub: "Check", icon: Filter, color: "#F59E0B", x: 54, y: 54, step: 5 },
            { id: "db", label: "DB", sub: "Book", icon: Database, color: "#10B981", x: 64, y: 16, step: 6 },
            { id: "redis", label: "Redis", sub: "Cache", icon: Server, color: "#EF4444", x: 74, y: 16, step: 7 },
            { id: "sms", label: "SMS", sub: "24h", icon: Bell, color: "#EC4899", x: 84, y: 16, step: 8 },
            { id: "mail", label: "Email", sub: "Dr.", icon: Mail, color: "#F472B6", x: 94, y: 16, step: 9 },
            { id: "wait", label: "Queue", sub: "Wait", icon: Stethoscope, color: "#F97316", x: 64, y: 88, step: 10 },
            { id: "crm", label: "CRM", sub: "Sync", icon: Braces, color: "#FB923C", x: 74, y: 88, step: 11 },
            { id: "reply", label: "Reply", sub: "TG", icon: MessageCircle, color: "#38BDF8", x: 84, y: 88, step: 12 },
            { id: "merge", label: "Merge", sub: "Log", icon: GitMerge, color: "#22D3EE", x: 94, y: 54, step: 13 },
          ],
    [isRtl],
  );

  const edges: FlowEdge[] = useMemo(
    () => [
      { id: "e0", path: "M 22 128 L 42 128", activatesAt: 1 },
      { id: "e1", path: "M 62 128 L 82 128", activatesAt: 2 },
      { id: "e2", path: "M 102 128 L 122 128", activatesAt: 3 },
      { id: "e3", path: "M 142 128 L 162 128", activatesAt: 4 },
      { id: "e4", path: "M 182 128 L 202 128", activatesAt: 5 },
      { id: "e5", path: "M 222 128 C 238 128, 242 48, 258 44", activatesAt: 6 },
      { id: "e6", path: "M 278 44 L 298 44", activatesAt: 7 },
      { id: "e7", path: "M 318 44 L 338 44", activatesAt: 8 },
      { id: "e8", path: "M 358 44 L 378 44", activatesAt: 9 },
      { id: "e9", path: "M 222 128 C 238 128, 242 208, 258 212", activatesAt: 10 },
      { id: "e10", path: "M 278 212 L 298 212", activatesAt: 11 },
      { id: "e11", path: "M 318 212 L 338 212", activatesAt: 12 },
      { id: "e12", path: "M 358 128 L 378 128", activatesAt: 13 },
      { id: "e13", path: "M 378 44 C 390 44, 392 128, 378 128", activatesAt: 14 },
      { id: "e14", path: "M 378 212 C 390 212, 392 128, 378 128", activatesAt: 14 },
    ],
    [],
  );

  const statusLines = useMemo(
    () =>
      isRtl
        ? [
            "▶ [1/14] پیام بیمار → نوبینو",
            "▶ [2/14] Webhook POST /api/booking",
            "▶ [3/14] NLP: intent=رزرو_نوبت",
            "▶ [4/14] HTTP → API پذیرش ۲۴",
            "▶ [5/14] Sync تقویم دکتر احمدی",
            "▶ [6/14] IF: slot 10:30 available ✓",
            "▶ [7/14] TRUE → INSERT نوبت DB",
            "▶ [8/14] Redis cache invalidate",
            "▶ [9/14] Schedule SMS +24h",
            "▶ [10/14] Notify doctor email",
            "▶ [11/14] FALSE → waitlist queue",
            "▶ [12/14] CRM patient sync",
            "▶ [13/14] TG reply PZ-4821",
            "▶ [14/14] Merge → audit log",
            "✓ Workflow OK — 847ms · 14 nodes",
          ]
        : [
            "▶ [1/14] Patient msg → Nobino",
            "▶ [2/14] Webhook POST /api/booking",
            "▶ [3/14] NLP: intent=book_appt",
            "▶ [4/14] HTTP → Paziresh 24 API",
            "▶ [5/14] Sync Dr. Ahmadi calendar",
            "▶ [6/14] IF: slot 10:30 available ✓",
            "▶ [7/14] TRUE → INSERT booking DB",
            "▶ [8/14] Redis cache invalidate",
            "▶ [9/14] Schedule SMS +24h",
            "▶ [10/14] Notify doctor email",
            "▶ [11/14] FALSE → waitlist queue",
            "▶ [12/14] CRM patient sync",
            "▶ [13/14] TG reply PZ-4821",
            "▶ [14/14] Merge → audit log",
            "✓ Workflow OK — 847ms · 14 nodes",
          ],
    [isRtl],
  );

  useEffect(() => {
    const id = setInterval(() => {
      setActiveStep((prev) => {
        const next = (prev + 1) % TOTAL_STEPS;
        if (next === 0) setExecutions((e) => e + 1);
        return next;
      });
    }, NODE_CYCLE_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="absolute inset-0 flex flex-col bg-[#060a12]">
      <div className="flex items-center justify-between border-b border-white/5 bg-[#0c121c] px-2.5 py-1.5">
        <div className="flex items-center gap-1.5">
          <Zap size={12} className="text-emerald-400" />
          <span className="font-mono text-[9px] font-medium text-slate-200 sm:text-[10px]">
            {isRtl ? "n8n · نوبینو | پذیرش ۲۴" : "n8n · Nobino | Paziresh 24"}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[8px] text-slate-400">
            14 {isRtl ? "نود" : "nodes"}
          </span>
          <span className="rounded-full bg-emerald-500/15 px-1.5 py-0.5 font-mono text-[8px] text-emerald-400">
            live
          </span>
        </div>
      </div>

      <div className="relative min-h-0 flex-1 overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(99,102,241,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.06) 1px, transparent 1px)",
            backgroundSize: "12px 12px",
          }}
        />

        <div className="absolute right-2 top-2 z-20 space-y-1">
          {["99.8%", "847ms", "14/14"].map((m, i) => (
            <motion.span
              key={m}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: [0.4, 0.9, 0.4], x: 0 }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              className="block rounded border border-white/5 bg-black/40 px-1.5 py-0.5 font-mono text-[7px] text-emerald-400/80"
            >
              {m}
            </motion.span>
          ))}
        </div>

        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 400 256"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="n8n-edge" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
            <filter id="n8n-glow">
              <feGaussianBlur stdDeviation="1.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <text x="228" y="36" fill="rgba(52,211,153,0.45)" fontSize="7" fontFamily="monospace">
            TRUE ↗
          </text>
          <text x="228" y="222" fill="rgba(249,115,22,0.45)" fontSize="7" fontFamily="monospace">
            FALSE ↘
          </text>

          {edges.map((edge) => {
            const isLit = activeStep >= edge.activatesAt;
            const isFlowing = activeStep === edge.activatesAt;

            return (
              <g key={edge.id}>
                <path
                  d={edge.path}
                  fill="none"
                  stroke="rgba(148,163,184,0.08)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <motion.path
                  d={edge.path}
                  fill="none"
                  stroke="url(#n8n-edge)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  animate={{
                    pathLength: isLit ? 1 : 0,
                    opacity: isLit ? 0.85 : 0.08,
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                />
                <FlowParticle path={edge.path} active={isFlowing} />
              </g>
            );
          })}
        </svg>

        {nodes.map((node) => {
          const Icon = node.icon;
          const isActive = activeStep === node.step;
          const isDone = activeStep > node.step;

          return (
            <motion.div
              key={node.id}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              animate={{ scale: isActive ? 1.12 : 1 }}
              transition={{ duration: 0.25 }}
            >
              <div
                className={cn(
                  "relative flex w-[2.35rem] flex-col items-center gap-0.5 rounded-md border px-0.5 py-0.5 sm:w-[2.6rem]",
                  isActive || isDone
                    ? "border-white/20 bg-[#101828]/95"
                    : "border-white/5 bg-[#0a0f18]/85",
                )}
                style={{ boxShadow: isActive ? `0 0 16px ${node.color}66` : undefined }}
              >
                <div
                  className={cn(
                    "flex h-6 w-6 items-center justify-center rounded border sm:h-7 sm:w-7",
                    isActive || isDone ? "border-white/10 bg-white/8" : "border-white/5 bg-white/[0.02]",
                  )}
                >
                  <Icon size={12} style={{ color: isActive || isDone ? node.color : "#475569" }} />
                </div>
                <span className="max-w-full truncate text-center text-[6px] font-bold text-slate-200 sm:text-[7px]">
                  {node.label}
                </span>
                <span className="text-[5px] text-slate-500 sm:text-[6px]">{node.sub}</span>
                {(isActive || isDone) && (
                  <span
                    className={cn(
                      "absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full border border-[#060a12]",
                      isActive ? "bg-cyan-400" : "bg-emerald-400",
                    )}
                  />
                )}
              </div>
            </motion.div>
          );
        })}

        <motion.div
          key={activeStep}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-1.5 left-1.5 right-1.5 rounded-md border border-emerald-500/15 bg-black/60 px-2 py-1 backdrop-blur-md"
        >
          <p className="truncate font-mono text-[8px] text-emerald-300/90 sm:text-[9px]">
            {statusLines[activeStep]}
          </p>
          <div className="mt-0.5 h-0.5 overflow-hidden rounded-full bg-white/5">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 via-cyan-400 to-violet-500"
              animate={{ width: `${((activeStep + 1) / TOTAL_STEPS) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>
      </div>

      <div className="flex items-center justify-between border-t border-white/5 bg-[#0c121c] px-2.5 py-1 font-mono text-[8px] text-muted">
        <span>{executions.toLocaleString()} {isRtl ? "اجرا" : "runs"}</span>
        <span className="text-emerald-400/70">PZ-4821</span>
      </div>
    </div>
  );
}

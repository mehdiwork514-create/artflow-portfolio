"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Bot,
  Braces,
  Filter,
  Link2,
  Mail,
  MessageCircle,
  Megaphone,
  Sheet,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

const NODE_CYCLE_MS = 1600;
const TOTAL_STEPS = 10;

type FlowNode = {
  id: string;
  label: string;
  sub: string;
  icon: LucideIcon;
  color: string;
  x: number;
  y: number;
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
      r="3.5"
      fill="#22d3ee"
      filter="url(#n8n-glow)"
      initial={{ offsetDistance: "0%" }}
      animate={{ offsetDistance: "100%" }}
      transition={{ duration: 1.1, ease: "easeInOut", repeat: Infinity }}
      style={{ offsetPath: `path('${path}')` }}
    />
  );
}

export function HeroN8nFlow() {
  const { isRtl } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);
  const [executions, setExecutions] = useState(1284);

  const nodes: FlowNode[] = useMemo(
    () =>
      isRtl
        ? [
            { id: "tg", label: "تلگرام", sub: "Trigger", icon: Bot, color: "#0EA5E9", x: 7, y: 42 },
            { id: "hook", label: "Webhook", sub: "POST", icon: Link2, color: "#6366F1", x: 22, y: 42 },
            { id: "code", label: "کد JS", sub: "Function", icon: Braces, color: "#A855F7", x: 37, y: 42 },
            { id: "if", label: "شرط IF", sub: "Branch", icon: Filter, color: "#F59E0B", x: 52, y: 42 },
            { id: "sheet", label: "Sheet", sub: "ذخیره", icon: Sheet, color: "#10B981", x: 68, y: 18 },
            { id: "mail", label: "ایمیل", sub: "Send", icon: Mail, color: "#EC4899", x: 84, y: 18 },
            { id: "reply", label: "پاسخ TG", sub: "Reply", icon: MessageCircle, color: "#38BDF8", x: 68, y: 66 },
            { id: "slack", label: "Slack", sub: "Alert", icon: Megaphone, color: "#E879F9", x: 84, y: 66 },
          ]
        : [
            { id: "tg", label: "Telegram", sub: "Trigger", icon: Bot, color: "#0EA5E9", x: 7, y: 42 },
            { id: "hook", label: "Webhook", sub: "POST", icon: Link2, color: "#6366F1", x: 22, y: 42 },
            { id: "code", label: "JS Code", sub: "Function", icon: Braces, color: "#A855F7", x: 37, y: 42 },
            { id: "if", label: "IF Node", sub: "Branch", icon: Filter, color: "#F59E0B", x: 52, y: 42 },
            { id: "sheet", label: "Sheets", sub: "Save", icon: Sheet, color: "#10B981", x: 68, y: 18 },
            { id: "mail", label: "Gmail", sub: "Send", icon: Mail, color: "#EC4899", x: 84, y: 18 },
            { id: "reply", label: "TG Reply", sub: "Bot", icon: MessageCircle, color: "#38BDF8", x: 68, y: 66 },
            { id: "slack", label: "Slack", sub: "Alert", icon: Megaphone, color: "#E879F9", x: 84, y: 66 },
          ],
    [isRtl],
  );

  const edges: FlowEdge[] = useMemo(
    () => [
      { id: "e0", path: "M 38 118 L 78 118", activatesAt: 1 },
      { id: "e1", path: "M 118 118 L 158 118", activatesAt: 2 },
      { id: "e2", path: "M 198 118 L 238 118", activatesAt: 3 },
      { id: "e3", path: "M 268 118 C 290 118, 295 58, 318 52", activatesAt: 4 },
      { id: "e4", path: "M 358 52 L 398 52", activatesAt: 5 },
      { id: "e5", path: "M 268 118 C 290 118, 295 178, 318 184", activatesAt: 6 },
      { id: "e6", path: "M 358 184 L 398 184", activatesAt: 7 },
    ],
    [],
  );

  const statusLines = useMemo(
    () =>
      isRtl
        ? [
            "▶ دریافت پیام تلگرام...",
            "▶ ارسال به Webhook...",
            "▶ پردازش داده با JavaScript...",
            "▶ ارزیابی شرط IF...",
            "▶ شاخه TRUE → ذخیره در Sheet...",
            "▶ ارسال ایمیل به مدیر...",
            "▶ شاخه FALSE → پاسخ خودکار تلگرام...",
            "▶ اعلان فوری در Slack...",
            "▶ همگام‌سازی CRM...",
            "✓ ورک‌فلو کامل — ۱.۲ ثانیه",
          ]
        : [
            "▶ Receiving Telegram message...",
            "▶ Forwarding to Webhook...",
            "▶ Processing with JavaScript...",
            "▶ Evaluating IF condition...",
            "▶ TRUE branch → Save to Sheet...",
            "▶ Sending manager email...",
            "▶ FALSE branch → Auto Telegram reply...",
            "▶ Posting Slack alert...",
            "▶ Syncing CRM record...",
            "✓ Workflow complete — 1.2s",
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
    <div className="absolute inset-0 flex flex-col bg-[#080c14]">
      <div className="flex items-center justify-between border-b border-white/5 bg-[#0f1520] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <Zap size={14} className="text-orange-400" />
          <span className="font-mono text-xs font-medium text-slate-200">
            {isRtl ? "ورک‌فلو n8n — فروشگاه هوشمند" : "n8n Workflow — Smart Store"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden font-mono text-[10px] text-slate-500 sm:inline">
            {isRtl ? "اجرا:" : "runs:"} {executions.toLocaleString()}
          </span>
          <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 font-mono text-[10px] text-emerald-400">
            {isRtl ? "● زنده" : "● live"}
          </span>
        </div>
      </div>

      <div className="relative min-h-0 flex-1 overflow-hidden">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(99,102,241,0.15) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-cyan-500/10" />

        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 440 240"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="n8n-edge" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="50%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
            <filter id="n8n-glow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {edges.map((edge) => {
            const isLit = activeStep >= edge.activatesAt;
            const isFlowing = activeStep === edge.activatesAt;

            return (
              <g key={edge.id}>
                <path
                  d={edge.path}
                  fill="none"
                  stroke="rgba(148,163,184,0.12)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <motion.path
                  d={edge.path}
                  fill="none"
                  stroke="url(#n8n-edge)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0.15 }}
                  animate={{
                    pathLength: isLit ? 1 : 0,
                    opacity: isLit ? 0.95 : 0.12,
                  }}
                  transition={{ duration: 0.65, ease: "easeInOut" }}
                />
                <FlowParticle path={edge.path} active={isFlowing} />
              </g>
            );
          })}
        </svg>

        {nodes.map((node, index) => {
          const Icon = node.icon;
          const nodeStep = index < 4 ? index : index === 4 ? 4 : index === 5 ? 5 : index === 6 ? 6 : 7;
          const isActive = activeStep === nodeStep;
          const isDone = activeStep > nodeStep;

          return (
            <motion.div
              key={node.id}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              animate={{
                scale: isActive ? 1.08 : 1,
                y: isActive ? -6 : 0,
              }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <div
                className={cn(
                  "relative flex w-[4.5rem] flex-col items-center gap-1 rounded-xl border px-1.5 py-2 backdrop-blur-sm transition-all duration-500 sm:w-[5.25rem]",
                  isActive || isDone
                    ? "border-white/25 bg-[#151d2e]/95 shadow-xl"
                    : "border-white/8 bg-[#0d121c]/80",
                )}
                style={{
                  boxShadow: isActive ? `0 0 32px ${node.color}44, 0 8px 24px rgba(0,0,0,0.4)` : undefined,
                }}
              >
                {(isActive || isDone) && (
                  <motion.div
                    className="absolute inset-0 rounded-xl"
                    style={{ background: `linear-gradient(135deg, ${node.color}18, transparent)` }}
                    animate={isActive ? { opacity: [0.5, 1, 0.5] } : { opacity: 0.6 }}
                    transition={{ duration: 1.5, repeat: isActive ? Infinity : 0 }}
                  />
                )}
                <div
                  className={cn(
                    "relative flex h-10 w-10 items-center justify-center rounded-lg border sm:h-11 sm:w-11",
                    isActive || isDone ? "border-white/15 bg-white/10" : "border-white/5 bg-white/[0.03]",
                  )}
                >
                  <Icon
                    size={20}
                    style={{ color: isActive || isDone ? node.color : "#64748b" }}
                  />
                </div>
                <span className="relative max-w-full truncate text-center text-[9px] font-semibold text-slate-200 sm:text-[10px]">
                  {node.label}
                </span>
                <span className="relative text-[8px] text-slate-500">{node.sub}</span>
                {(isActive || isDone) && (
                  <span
                    className={cn(
                      "absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-[#080c14]",
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
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-3 left-3 right-3 rounded-xl border border-cyan-500/20 bg-black/50 px-3 py-2 backdrop-blur-md"
        >
          <p className="font-mono text-[10px] text-cyan-300 sm:text-[11px]">
            {statusLines[activeStep]}
          </p>
          <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/5">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-violet-500"
              animate={{ width: `${((activeStep + 1) / TOTAL_STEPS) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </motion.div>
      </div>

      <div className="flex items-center justify-between border-t border-white/5 bg-[#0f1520] px-4 py-2 font-mono text-[10px] text-muted">
        <span>n8n · {isRtl ? "اتوماسیون چندشاخه‌ای" : "Multi-branch Automation"}</span>
        <span className="text-emerald-400/80">99.8% {isRtl ? "موفق" : "success"}</span>
      </div>
    </div>
  );
}

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
  Link2,
  MessageCircle,
  Sparkles,
  Stethoscope,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

const NODE_CYCLE_MS = 1300;
const TOTAL_STEPS = 12;

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
      r="2.5"
      fill="#34d399"
      filter="url(#n8n-glow)"
      initial={{ offsetDistance: "0%" }}
      animate={{ offsetDistance: "100%" }}
      transition={{ duration: 0.9, ease: "easeInOut", repeat: Infinity }}
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
            { id: "tg", label: "پذیرش۲۴", sub: "Bot", icon: Bot, color: "#0EA5E9", x: 5, y: 50, step: 0 },
            { id: "hook", label: "Webhook", sub: "POST", icon: Link2, color: "#6366F1", x: 17, y: 50, step: 1 },
            { id: "ai", label: "NLP", sub: "Intent", icon: Sparkles, color: "#A855F7", x: 29, y: 50, step: 2 },
            { id: "cal", label: "تقویم", sub: "API", icon: CalendarDays, color: "#14B8A6", x: 41, y: 50, step: 3 },
            { id: "if", label: "IF", sub: "نوبت؟", icon: Filter, color: "#F59E0B", x: 53, y: 50, step: 4 },
            { id: "db", label: "DB", sub: "رزرو", icon: Database, color: "#10B981", x: 65, y: 22, step: 5 },
            { id: "sms", label: "SMS", sub: "یادآور", icon: Bell, color: "#EC4899", x: 77, y: 22, step: 6 },
            { id: "confirm", label: "تأیید", sub: "TG", icon: MessageCircle, color: "#38BDF8", x: 89, y: 22, step: 7 },
            { id: "wait", label: "لیست", sub: "انتظار", icon: Stethoscope, color: "#F97316", x: 65, y: 78, step: 8 },
            { id: "code", label: "کد", sub: "PZ-ID", icon: Braces, color: "#818CF8", x: 77, y: 78, step: 9 },
            { id: "reply", label: "پاسخ", sub: "بیمار", icon: MessageCircle, color: "#22D3EE", x: 89, y: 78, step: 10 },
          ]
        : [
            { id: "tg", label: "Paziresh24", sub: "Bot", icon: Bot, color: "#0EA5E9", x: 5, y: 50, step: 0 },
            { id: "hook", label: "Webhook", sub: "POST", icon: Link2, color: "#6366F1", x: 17, y: 50, step: 1 },
            { id: "ai", label: "NLP", sub: "Intent", icon: Sparkles, color: "#A855F7", x: 29, y: 50, step: 2 },
            { id: "cal", label: "Calendar", sub: "API", icon: CalendarDays, color: "#14B8A6", x: 41, y: 50, step: 3 },
            { id: "if", label: "IF", sub: "Slot?", icon: Filter, color: "#F59E0B", x: 53, y: 50, step: 4 },
            { id: "db", label: "DB", sub: "Book", icon: Database, color: "#10B981", x: 65, y: 22, step: 5 },
            { id: "sms", label: "SMS", sub: "Remind", icon: Bell, color: "#EC4899", x: 77, y: 22, step: 6 },
            { id: "confirm", label: "Confirm", sub: "TG", icon: MessageCircle, color: "#38BDF8", x: 89, y: 22, step: 7 },
            { id: "wait", label: "Queue", sub: "Wait", icon: Stethoscope, color: "#F97316", x: 65, y: 78, step: 8 },
            { id: "code", label: "Code", sub: "PZ-ID", icon: Braces, color: "#818CF8", x: 77, y: 78, step: 9 },
            { id: "reply", label: "Reply", sub: "Patient", icon: MessageCircle, color: "#22D3EE", x: 89, y: 78, step: 10 },
          ],
    [isRtl],
  );

  const edges: FlowEdge[] = useMemo(
    () => [
      { id: "e0", path: "M 28 120 L 52 120", activatesAt: 1 },
      { id: "e1", path: "M 82 120 L 106 120", activatesAt: 2 },
      { id: "e2", path: "M 136 120 L 160 120", activatesAt: 3 },
      { id: "e3", path: "M 190 120 L 214 120", activatesAt: 4 },
      { id: "e4", path: "M 244 120 C 262 120, 268 58, 286 54", activatesAt: 5 },
      { id: "e5", path: "M 316 54 L 340 54", activatesAt: 6 },
      { id: "e6", path: "M 364 54 L 388 54", activatesAt: 7 },
      { id: "e7", path: "M 244 120 C 262 120, 268 182, 286 186", activatesAt: 8 },
      { id: "e8", path: "M 316 186 L 340 186", activatesAt: 9 },
      { id: "e9", path: "M 364 186 L 388 186", activatesAt: 10 },
    ],
    [],
  );

  const statusLines = useMemo(
    () =>
      isRtl
        ? [
            "▶ پیام بیمار از بات پذیرش ۲۴...",
            "▶ Webhook دریافت درخواست نوبت...",
            "▶ تشخیص intent: «رزرو نوبت عمومی»...",
            "▶ بررسی تقویم دکتر احمدی...",
            "▶ IF: نوبت ۱۰:۳۰ آزاد است ✓",
            "▶ شاخه TRUE → ثبت در دیتابیس...",
            "▶ زمان‌بندی SMS یادآوری ۲۴h...",
            "▶ ارسال تأیید به تلگرام بیمار...",
            "▶ شاخه FALSE → افزودن به لیست انتظار...",
            "▶ تولید کد پیگیری PZ-4821...",
            "▶ پاسخ نهایی به بیمار...",
            "✓ نوبت ثبت شد — ۰.۹ ثانیه",
          ]
        : [
            "▶ Patient message from Paziresh 24 bot...",
            "▶ Webhook received booking request...",
            "▶ Intent detected: general appointment...",
            "▶ Checking Dr. Ahmadi calendar...",
            "▶ IF: 10:30 slot available ✓",
            "▶ TRUE → Saving to database...",
            "▶ Scheduling 24h SMS reminder...",
            "▶ Sending TG confirmation to patient...",
            "▶ FALSE → Adding to waitlist queue...",
            "▶ Generating tracking code PZ-4821...",
            "▶ Final reply to patient...",
            "✓ Appointment booked — 0.9s",
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
      <div className="flex items-center justify-between border-b border-white/5 bg-[#0f1520] px-3 py-2">
        <div className="flex items-center gap-1.5">
          <Zap size={13} className="text-emerald-400" />
          <span className="font-mono text-[10px] font-medium text-slate-200 sm:text-[11px]">
            {isRtl ? "n8n — پذیرش ۲۴ نوبت‌دهی" : "n8n — Paziresh 24 Booking"}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[9px] text-slate-500">
            {executions.toLocaleString()} {isRtl ? "نوبت" : "runs"}
          </span>
          <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 font-mono text-[9px] text-emerald-400">
            live
          </span>
        </div>
      </div>

      <div className="relative min-h-0 flex-1 overflow-hidden">
        <div
          className="absolute inset-0 opacity-35"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(16,185,129,0.12) 1px, transparent 1px)",
            backgroundSize: "14px 14px",
          }}
        />

        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 420 240"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="n8n-edge" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
            <filter id="n8n-glow">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <text x="268" y="42" fill="rgba(52,211,153,0.5)" fontSize="8" fontFamily="monospace">
            TRUE
          </text>
          <text x="268" y="174" fill="rgba(249,115,22,0.5)" fontSize="8" fontFamily="monospace">
            FALSE
          </text>

          {edges.map((edge) => {
            const isLit = activeStep >= edge.activatesAt;
            const isFlowing = activeStep === edge.activatesAt;

            return (
              <g key={edge.id}>
                <path
                  d={edge.path}
                  fill="none"
                  stroke="rgba(148,163,184,0.1)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <motion.path
                  d={edge.path}
                  fill="none"
                  stroke="url(#n8n-edge)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0.1 }}
                  animate={{
                    pathLength: isLit ? 1 : 0,
                    opacity: isLit ? 0.9 : 0.1,
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
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
              animate={{ scale: isActive ? 1.1 : 1 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className={cn(
                  "relative flex w-[2.85rem] flex-col items-center gap-0.5 rounded-lg border px-0.5 py-1 backdrop-blur-sm sm:w-[3.1rem]",
                  isActive || isDone
                    ? "border-white/20 bg-[#121a28]/95"
                    : "border-white/5 bg-[#0a0f18]/90",
                )}
                style={{
                  boxShadow: isActive ? `0 0 20px ${node.color}55` : undefined,
                }}
              >
                <div
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-md border sm:h-8 sm:w-8",
                    isActive || isDone ? "border-white/10 bg-white/8" : "border-white/5 bg-white/[0.02]",
                  )}
                >
                  <Icon
                    size={14}
                    style={{ color: isActive || isDone ? node.color : "#475569" }}
                  />
                </div>
                <span className="max-w-full truncate text-center text-[7px] font-bold text-slate-200 sm:text-[8px]">
                  {node.label}
                </span>
                <span className="text-[6px] text-slate-500 sm:text-[7px]">{node.sub}</span>
                {(isActive || isDone) && (
                  <span
                    className={cn(
                      "absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full border border-[#080c14]",
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
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-2 left-2 right-2 rounded-lg border border-emerald-500/20 bg-black/55 px-2.5 py-1.5 backdrop-blur-md"
        >
          <p className="font-mono text-[9px] leading-snug text-emerald-300/90 sm:text-[10px]">
            {statusLines[activeStep]}
          </p>
          <div className="mt-1 h-0.5 overflow-hidden rounded-full bg-white/5">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-cyan-400 to-indigo-500"
              animate={{ width: `${((activeStep + 1) / TOTAL_STEPS) * 100}%` }}
              transition={{ duration: 0.35 }}
            />
          </div>
        </motion.div>
      </div>

      <div className="flex items-center justify-between border-t border-white/5 bg-[#0f1520] px-3 py-1.5 font-mono text-[9px] text-muted">
        <span>{isRtl ? "اتوماسیون نوبت پزشک" : "Medical booking automation"}</span>
        <span className="text-emerald-400/80">PZ-4821</span>
      </div>
    </div>
  );
}

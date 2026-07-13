"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Bot, Filter, Sheet, Send, Zap } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

const NODE_CYCLE_MS = 2200;

export function HeroN8nFlow() {
  const { isRtl } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);

  const nodes = isRtl
    ? [
        { id: "trigger", label: "تلگرام", sub: "Trigger", icon: Bot, color: "#0EA5E9" },
        { id: "filter", label: "فیلتر", sub: "Condition", icon: Filter, color: "#A855F7" },
        { id: "sheet", label: "Google Sheet", sub: "Save", icon: Sheet, color: "#10B981" },
        { id: "notify", label: "پیامک", sub: "Notify", icon: Send, color: "#F59E0B" },
      ]
    : [
        { id: "trigger", label: "Telegram", sub: "Trigger", icon: Bot, color: "#0EA5E9" },
        { id: "filter", label: "Filter", sub: "Condition", icon: Filter, color: "#A855F7" },
        { id: "sheet", label: "Google Sheet", sub: "Save", icon: Sheet, color: "#10B981" },
        { id: "notify", label: "SMS", sub: "Notify", icon: Send, color: "#F59E0B" },
      ];

  useEffect(() => {
    const id = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % (nodes.length + 1));
    }, NODE_CYCLE_MS);
    return () => clearInterval(id);
  }, [nodes.length]);

  return (
    <div className="absolute inset-0 flex flex-col bg-[#0a0f1a]">
      <div className="flex items-center justify-between border-b border-white/5 bg-[#111827] px-4 py-3">
        <div className="flex items-center gap-2">
          <Zap size={14} className="text-orange-400" />
          <span className="font-mono text-xs text-slate-300">
            {isRtl ? "ورک‌فلو n8n" : "n8n Workflow"}
          </span>
        </div>
        <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 font-mono text-[10px] text-emerald-400">
          {isRtl ? "فعال" : "active"}
        </span>
      </div>

      <div className="relative flex flex-1 flex-col items-center justify-center gap-3 p-4">
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 320 280"
          preserveAspectRatio="xMidYMid meet"
        >
          {[0, 1, 2].map((i) => (
            <motion.path
              key={i}
              d={`M ${80 + i * 80} 72 L ${160 + i * 80} 72`}
              fill="none"
              stroke="url(#n8n-line)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0.2 }}
              animate={{
                pathLength: activeStep > i ? 1 : 0,
                opacity: activeStep > i ? 0.9 : 0.15,
              }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            />
          ))}
          <defs>
            <linearGradient id="n8n-line" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </svg>

        <div className="flex w-full max-w-[18rem] items-center justify-between">
          {nodes.map((node, index) => {
            const Icon = node.icon;
            const isActive = activeStep === index;
            const isDone = activeStep > index;

            return (
              <motion.div
                key={node.id}
                animate={{
                  scale: isActive ? 1.06 : 1,
                  y: isActive ? -4 : 0,
                }}
                transition={{ duration: 0.35 }}
                className="relative z-10 flex flex-col items-center gap-1.5"
              >
                <div
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-500",
                    isActive || isDone
                      ? "border-white/20 bg-white/10 shadow-lg"
                      : "border-white/5 bg-white/[0.03]",
                  )}
                  style={{
                    boxShadow: isActive ? `0 0 24px ${node.color}55` : undefined,
                  }}
                >
                  <Icon
                    size={18}
                    style={{ color: isActive || isDone ? node.color : "#64748b" }}
                  />
                </div>
                <span className="max-w-[4.5rem] truncate text-center text-[9px] font-medium text-slate-300">
                  {node.label}
                </span>
                <span className="text-[8px] text-slate-500">{node.sub}</span>
                {(isActive || isDone) && (
                  <motion.span
                    layoutId={`pulse-${node.id}`}
                    className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-emerald-400"
                    animate={{ scale: isActive ? [1, 1.3, 1] : 1 }}
                    transition={{ repeat: isActive ? Infinity : 0, duration: 1.2 }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 rounded-lg border border-white/5 bg-black/30 px-3 py-2 font-mono text-[10px] text-cyan-300/90"
        >
          {activeStep === 0 &&
            (isRtl ? "▶ دریافت پیام از تلگرام..." : "▶ Receiving Telegram message...")}
          {activeStep === 1 &&
            (isRtl ? "▶ بررسی شرط و فیلتر..." : "▶ Running condition filter...")}
          {activeStep === 2 &&
            (isRtl ? "▶ ذخیره در Google Sheet..." : "▶ Saving to Google Sheet...")}
          {activeStep === 3 &&
            (isRtl ? "▶ ارسال اعلان به مشتری..." : "▶ Sending customer notification...")}
          {activeStep === 4 &&
            (isRtl ? "✓ ورک‌فلو با موفقیت اجرا شد" : "✓ Workflow completed successfully")}
        </motion.div>
      </div>

      <div className="border-t border-white/5 bg-[#111827] px-4 py-2 font-mono text-[10px] text-muted">
        n8n · {isRtl ? "اتوماسیون هوشمند" : "Smart Automation"}
      </div>
    </div>
  );
}

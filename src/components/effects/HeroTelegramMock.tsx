"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

type ChatMessage = { id: number; from: "user" | "bot"; text: string };

export function HeroTelegramMock() {
  const { isRtl } = useLanguage();
  const [visibleCount, setVisibleCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const messages: ChatMessage[] = useMemo(
    () =>
      isRtl
        ? [
            { id: 1, from: "user", text: "سلام، قیمت محصول چنده؟" },
            { id: 2, from: "bot", text: "سلام! در حال بررسی موجودی هستم..." },
            { id: 3, from: "bot", text: "قیمت: ۲۵۰,۰۰۰ تومان ✓ موجود در انبار" },
            { id: 4, from: "user", text: "ممنون! سفارش می‌دم." },
            { id: 5, from: "bot", text: "عالی! لینک ثبت سفارش برای شما ارسال شد 🚀" },
          ]
        : [
            { id: 1, from: "user", text: "Hi, what's the product price?" },
            { id: 2, from: "bot", text: "Hello! Checking inventory..." },
            { id: 3, from: "bot", text: "Price: $12 — In stock ✓" },
            { id: 4, from: "user", text: "Thanks! I'll place an order." },
            { id: 5, from: "bot", text: "Great! Order link sent to you 🚀" },
          ],
    [isRtl],
  );

  useEffect(() => {
    setVisibleCount(0);
    setIsTyping(false);
  }, [isRtl]);

  useEffect(() => {
    if (visibleCount >= messages.length) {
      const reset = setTimeout(() => {
        setVisibleCount(0);
        setIsTyping(false);
      }, 3500);
      return () => clearTimeout(reset);
    }

    const next = messages[visibleCount];
    const delay = next?.from === "bot" ? 900 : 600;

    if (next?.from === "bot") {
      setIsTyping(true);
      const typingTimer = setTimeout(() => {
        setIsTyping(false);
        setVisibleCount((c) => c + 1);
      }, delay);
      return () => clearTimeout(typingTimer);
    }

    const timer = setTimeout(() => setVisibleCount((c) => c + 1), delay);
    return () => clearTimeout(timer);
  }, [visibleCount, messages.length]);

  return (
    <div className="absolute inset-0 flex flex-col bg-[#0e1621]">
      <div className="flex items-center gap-3 border-b border-white/5 bg-[#17212b] px-4 py-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-500/20">
          <Bot size={18} className="text-sky-400" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-white">
            {isRtl ? "بات فروشگاه" : "Shop Bot"}
          </p>
          <p className="text-[10px] text-emerald-400">
            {isRtl ? "آنلاین" : "online"}
          </p>
        </div>
      </div>

      <div
        className={cn(
          "flex flex-1 flex-col gap-2.5 overflow-hidden p-4",
          isRtl ? "items-end" : "items-start",
        )}
      >
        <AnimatePresence>
          {messages.slice(0, visibleCount).map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.35 }}
              className={cn(
                "max-w-[85%] rounded-2xl px-3 py-2 text-xs leading-relaxed",
                msg.from === "user"
                  ? "rounded-br-md bg-[#2b5278] text-white"
                  : "rounded-bl-md bg-[#182533] text-slate-200",
                isRtl && msg.from === "user" && "rounded-br-2xl rounded-bl-md",
                isRtl && msg.from === "bot" && "rounded-bl-2xl rounded-br-md",
              )}
            >
              {msg.text}
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-[#182533] px-3 py-2.5"
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="h-1.5 w-1.5 rounded-full bg-slate-400"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
              />
            ))}
          </motion.div>
        )}
      </div>

      <div className="border-t border-white/5 bg-[#17212b] px-4 py-2 font-mono text-[10px] text-muted">
        Telegram · {isRtl ? "بات هوشمند" : "Smart Bot"}
      </div>
    </div>
  );
}

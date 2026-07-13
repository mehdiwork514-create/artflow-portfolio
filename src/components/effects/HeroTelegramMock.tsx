"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Stethoscope } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

type ChatMessage = {
  id: number;
  from: "user" | "bot";
  text: string;
  keyboard?: string[];
};

const DONE_PAUSE_MS = 900;

export function HeroTelegramMock({ onSequenceComplete }: { onSequenceComplete?: () => void }) {
  const { isRtl } = useLanguage();
  const [visibleCount, setVisibleCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const messages: ChatMessage[] = useMemo(
    () =>
      isRtl
        ? [
            { id: 1, from: "user", text: "سلام، می‌خوام نوبت دکتر بگیرم" },
            {
              id: 2,
              from: "bot",
              text: "به نوبینو خوش آمدید 🏥\nسامانه نوبت‌دهی پذیرش ۲۴\nلطفاً تخصص پزشک را انتخاب کنید:",
              keyboard: ["عمومی", "دندانپزشکی", "پوست"],
            },
            { id: 3, from: "user", text: "عمومی" },
            {
              id: 4,
              from: "bot",
              text: "دکتر احمدی — چهارشنبه ۲۲ تیر\n🕙 ساعت ۱۰:۳۰ — ظرفیت: ۱ نفر",
            },
            { id: 5, from: "user", text: "این زمان مناسبه، رزرو کن" },
            {
              id: 6,
              from: "bot",
              text: "✅ نوبت شما ثبت شد!\n📋 کد پیگیری: PZ-4821\n⏰ یادآوری ۲۴ ساعت قبل ارسال می‌شود.",
            },
          ]
        : [
            { id: 1, from: "user", text: "Hi, I need a doctor appointment" },
            {
              id: 2,
              from: "bot",
              text: "Welcome to Nobino 🏥\nPaziresh 24 appointment system\nPlease choose a specialty:",
              keyboard: ["General", "Dental", "Dermatology"],
            },
            { id: 3, from: "user", text: "General" },
            {
              id: 4,
              from: "bot",
              text: "Dr. Ahmadi — Wed Jul 13\n🕙 10:30 AM — 1 slot left",
            },
            { id: 5, from: "user", text: "Book this slot please" },
            {
              id: 6,
              from: "bot",
              text: "✅ Appointment confirmed!\n📋 Ref: PZ-4821\n⏰ Reminder sent 24h before.",
            },
          ],
    [isRtl],
  );

  useEffect(() => {
    setVisibleCount(0);
    setIsTyping(false);
  }, [isRtl]);

  useEffect(() => {
    if (visibleCount >= messages.length) return;

    const next = messages[visibleCount];
    const delay = next?.from === "bot" ? 1000 : 650;

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
  }, [visibleCount, messages]);

  useEffect(() => {
    if (visibleCount < messages.length || !onSequenceComplete) return;

    const timer = setTimeout(onSequenceComplete, DONE_PAUSE_MS);
    return () => clearTimeout(timer);
  }, [visibleCount, messages.length, onSequenceComplete]);

  return (
    <div className="absolute inset-0 flex flex-col bg-[#0e1621]">
      <div className="flex items-center gap-3 border-b border-white/5 bg-[#17212b] px-4 py-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/20">
          <Stethoscope size={18} className="text-emerald-400" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-white">
            {isRtl ? "نوبینو | پذیرش ۲۴" : "Nobino | Paziresh 24"}
          </p>
          <p className="text-[10px] text-emerald-400">
            {isRtl ? "بات نوبت‌دهی — آنلاین" : "Appointment bot — online"}
          </p>
        </div>
      </div>

      <div
        className={cn(
          "flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto p-3",
          isRtl ? "items-end" : "items-start",
        )}
      >
        <AnimatePresence>
          {messages.slice(0, visibleCount).map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={cn("max-w-[92%]", isRtl ? "text-right" : "text-left")}
            >
              <div
                className={cn(
                  "rounded-2xl px-3 py-2 text-[11px] leading-relaxed whitespace-pre-line",
                  msg.from === "user"
                    ? "rounded-br-md bg-[#2b5278] text-white"
                    : "rounded-bl-md bg-[#182533] text-slate-200",
                  isRtl && msg.from === "user" && "rounded-br-2xl rounded-bl-md",
                  isRtl && msg.from === "bot" && "rounded-bl-2xl rounded-br-md",
                )}
              >
                {msg.text}
              </div>
              {msg.keyboard && (
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {msg.keyboard.map((btn) => (
                    <span
                      key={btn}
                      className="rounded-lg border border-sky-500/30 bg-sky-500/10 px-2 py-1 text-[9px] font-medium text-sky-300"
                    >
                      {btn}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-[#182533] px-3 py-2"
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="h-1.5 w-1.5 rounded-full bg-emerald-400/70"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
              />
            ))}
          </motion.div>
        )}
      </div>

      <div className="border-t border-white/5 bg-[#17212b] px-4 py-2 font-mono text-[10px] text-muted">
        Telegram · {isRtl ? "نوبینو — نوبت‌دهی پذیرش ۲۴" : "Nobino — Paziresh 24 Booking"}
      </div>
    </div>
  );
}

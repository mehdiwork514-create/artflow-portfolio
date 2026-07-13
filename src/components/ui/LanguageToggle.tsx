"use client";

import { Languages } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

interface LanguageToggleProps {
  className?: string;
}

export function LanguageToggle({ className }: LanguageToggleProps) {
  const { locale, toggleLocale, t } = useLanguage();

  return (
    <motion.button
      type="button"
      onClick={toggleLocale}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium transition-all",
        "hover:border-indigo-500/40 hover:bg-indigo-500/10 hover:shadow-lg hover:shadow-indigo-500/10",
        className,
      )}
      aria-label={`Switch to ${t.lang.switchTo}`}
    >
      <Languages size={16} className="text-indigo-400" />
      <span className="font-mono text-xs text-muted">{t.lang.current}</span>
      <span className="hidden text-muted sm:inline">|</span>
      <span className="hidden text-xs sm:inline">{t.lang.switchTo}</span>
    </motion.button>
  );
}

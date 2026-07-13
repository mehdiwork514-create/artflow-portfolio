"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export function LoadingScreen() {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#030712]"
        >
          <div className="relative">
            <div className="h-20 w-20 rounded-full border-2 border-white/10" />
            <div className="loader-ring absolute inset-0 h-20 w-20 rounded-full border-2 border-transparent border-t-indigo-500 border-r-cyan-500" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-mono text-xs text-indigo-400">{"</>"}</span>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 font-mono text-sm text-muted"
          >
            {t.loading.text}
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ...
            </motion.span>
          </motion.p>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "200px" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="mt-4 h-0.5 rounded-full bg-gradient-to-r from-indigo-500 via-cyan-500 to-purple-500"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

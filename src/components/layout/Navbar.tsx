"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinkIds, siteConfig } from "@/lib/data";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { cn } from "@/lib/utils";

const hrefMap: Record<string, string> = {
  home: "#home",
  about: "#about",
  skills: "#skills",
  projects: "#projects",
  experience: "#experience",
  contact: "#contact",
};

export function Navbar() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = [...navLinkIds].reverse();
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getLabel = (id: string) => t.nav[id as keyof typeof t.nav];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, delay: 2.2 }}
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-500",
        scrolled ? "glass-strong py-3 shadow-lg shadow-black/20" : "bg-transparent py-4",
      )}
    >
      <nav className="mx-auto grid min-h-14 w-full max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 sm:px-6">
        {/* چپ — دکمه‌ها */}
        <div className="flex items-center justify-start gap-2 sm:gap-3">
          <LanguageToggle />
          <a
            href="#contact"
            className="hidden rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-indigo-500/40 md:inline-flex"
          >
            {t.nav.hireMe}
          </a>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg glass md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* وسط — منو */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinkIds.map((id) => (
            <li key={id}>
              <a
                href={hrefMap[id]}
                className={cn(
                  "relative rounded-full px-3 py-2 text-sm transition-colors lg:px-4",
                  activeSection === id ? "text-foreground" : "text-muted hover:text-foreground",
                )}
              >
                {getLabel(id)}
                {activeSection === id && (
                  <motion.span
                    layoutId="activeNav"
                    className="absolute inset-0 -z-10 rounded-full bg-white/5"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* راست — لوگو */}
        <a
          href="#home"
          dir="ltr"
          className="group z-10 flex items-center justify-end gap-2.5 transition-opacity hover:opacity-90"
        >
          <Image
            src={siteConfig.brandLogo}
            alt={siteConfig.brandName}
            width={120}
            height={48}
            priority
            unoptimized
            className="h-10 w-auto object-contain sm:h-12"
          />
          <div className="hidden flex-col leading-none lg:flex">
            <span className="bg-gradient-to-r from-violet-400 to-white bg-clip-text text-sm font-bold tracking-wider text-transparent">
              ARTFLOW
            </span>
            <span className="mt-0.5 text-[10px] font-medium tracking-[0.3em] text-muted">
              STUDIO
            </span>
          </div>
        </a>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden glass-strong md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {navLinkIds.map((id) => (
                <li key={id}>
                  <a
                    href={hrefMap[id]}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-lg px-4 py-3 text-sm transition-colors hover:bg-white/5"
                  >
                    {getLabel(id)}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="mt-2 block rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 px-4 py-3 text-center text-sm font-medium text-white"
                >
                  {t.nav.hireMe}
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

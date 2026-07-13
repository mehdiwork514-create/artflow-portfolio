"use client";

import { motion } from "framer-motion";
import { FloatingOrbs } from "@/components/effects/FloatingOrbs";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";
import { LanguageProvider } from "@/context/LanguageContext";

export function Portfolio() {
  return (
    <LanguageProvider>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 2 }}
      >
        <LoadingScreen />
        <CustomCursor />
        <FloatingOrbs />

        <div className="noise-overlay relative min-h-screen">
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Contact />
          </main>
          <Footer />
        </div>
      </motion.div>
    </LanguageProvider>
  );
}

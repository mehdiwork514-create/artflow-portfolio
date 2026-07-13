"use client";

import { socialLinks } from "@/lib/data";
import { useLanguage } from "@/context/LanguageContext";
import { SocialLinks } from "@/components/ui/SocialLinks";

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <div className="text-center md:text-start">
          <p className="font-semibold">
            {t.hero.name}
            <span className="text-indigo-400">.</span>
          </p>
          <p className="mt-1 text-sm text-muted">{t.footer.builtWith}</p>
        </div>

        <SocialLinks links={socialLinks} />

        <p className="text-sm text-muted">
          &copy; {year} {t.hero.name}. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}

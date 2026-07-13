"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { siteConfig, socialLinks } from "@/lib/data";
import { useLanguage } from "@/context/LanguageContext";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { formatPhoneDisplay, formatTelLink } from "@/lib/utils";
import { TelegramIcon } from "@/components/ui/SocialIcons";

export function Contact() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${siteConfig.email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone || "—",
            message: formData.message,
            _subject: `پیام جدید از پورتفولیو — ${formData.name}`,
            _template: "table",
            _captcha: "false",
          }),
        },
      );

      if (!response.ok) throw new Error("Send failed");

      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-padding relative">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          subtitle={t.contact.subtitle}
          title={t.contact.title}
          description={t.contact.description}
        />

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="mb-4 text-2xl font-bold">{t.contact.getInTouch}</h3>
            <p className="mb-8 leading-relaxed text-muted">{t.contact.contactText}</p>

            <a
              href={`mailto:${siteConfig.email}`}
              className="mb-4 inline-flex w-full items-center gap-3 rounded-xl glass px-5 py-4 transition-all hover:border-indigo-500/30 hover:glow-box sm:w-auto"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-xs text-muted">{t.contact.emailLabel}</p>
                <p className="font-medium" dir="ltr">
                  {siteConfig.email}
                </p>
              </div>
            </a>

            {siteConfig.phone && (
              <a
                href={`tel:${formatTelLink(siteConfig.phone)}`}
                className="mb-4 inline-flex w-full items-center gap-3 rounded-xl glass px-5 py-4 transition-all hover:border-cyan-500/30 hover:glow-box sm:w-auto"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs text-muted">{t.contact.phoneLabel}</p>
                  <p className="font-medium tracking-wide" dir="ltr">
                    {formatPhoneDisplay(siteConfig.phone)}
                  </p>
                </div>
              </a>
            )}

            {siteConfig.telegramUrl && (
              <a
                href={siteConfig.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-8 inline-flex w-full items-center gap-3 rounded-xl glass px-5 py-4 transition-all hover:border-sky-500/30 hover:glow-box sm:w-auto"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400">
                  <TelegramIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted">{t.contact.telegramLabel}</p>
                  <p className="font-medium" dir="ltr">
                    @{siteConfig.telegram}
                  </p>
                </div>
              </a>
            )}

            <p className="mb-4 text-sm text-muted">{t.contact.followMe}</p>
            <SocialLinks links={socialLinks} />
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            className="rounded-2xl glass-strong p-8 glow-box"
          >
            <div className="mb-5">
              <label htmlFor="name" className="mb-2 block text-sm font-medium">
                {t.contact.name}
              </label>
              <input
                id="name"
                type="text"
                required
                disabled={loading}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={t.contact.namePlaceholder}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition-all placeholder:text-muted/50 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 disabled:opacity-50"
              />
            </div>

            <div className="mb-5">
              <label htmlFor="email" className="mb-2 block text-sm font-medium">
                {t.contact.email}
              </label>
              <input
                id="email"
                type="email"
                required
                disabled={loading}
                dir="ltr"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder={t.contact.emailPlaceholder}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition-all placeholder:text-muted/50 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 disabled:opacity-50"
              />
            </div>

            <div className="mb-5">
              <label htmlFor="phone" className="mb-2 block text-sm font-medium">
                {t.contact.phone}
              </label>
              <input
                id="phone"
                type="tel"
                disabled={loading}
                dir="ltr"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder={t.contact.phonePlaceholder}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition-all placeholder:text-muted/50 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 disabled:opacity-50"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="mb-2 block text-sm font-medium">
                {t.contact.message}
              </label>
              <textarea
                id="message"
                required
                disabled={loading}
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder={t.contact.messagePlaceholder}
                className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition-all placeholder:text-muted/50 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 disabled:opacity-50"
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 flex items-center gap-2 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-400"
              >
                <AlertCircle size={18} />
                {t.contact.error}
              </motion.div>
            )}

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-2 rounded-full bg-emerald-500/10 py-3.5 text-emerald-400"
              >
                <CheckCircle size={20} />
                {t.contact.success}
              </motion.div>
            ) : (
              <MagneticButton type="submit" variant="primary" className="w-full">
                {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                {loading ? t.contact.sending : t.contact.send}
              </MagneticButton>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}

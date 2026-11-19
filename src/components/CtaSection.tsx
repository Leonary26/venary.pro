import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';

interface CtaSectionProps {
  onContactClick: () => void;
}

export function CtaSection({ onContactClick }: CtaSectionProps) {
  const { t } = useLanguage();

  return (
    <section
      aria-label={t.accessibility.ctaSectionAria}
      className="relative overflow-hidden bg-gradient-to-br from-[#D91E2A] via-[#C41622] to-[#980E18] text-white py-20 lg:py-24"
    >
      {/* Motif architectural subtil en grille */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:72px_72px]"
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row lg:items-center justify-between gap-8"
        >
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-red-100 mb-3">
              {t.cta.kicker}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-white text-balance leading-[1.12]">
              {t.cta.heading}
            </h2>
          </div>

          <div className="shrink-0">
            <button
              type="button"
              onClick={onContactClick}
              className="inline-flex items-center gap-3 px-7 py-4 bg-white hover:bg-zinc-100 text-[#111113] text-sm sm:text-base font-semibold rounded-sm transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <span>{t.cta.buttonLabel}</span>
              <ArrowRight className="w-4 h-4 text-[#D91E2A] shrink-0" aria-hidden="true" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

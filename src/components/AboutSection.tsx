import { motion } from 'motion/react';
import { ABOUT_VISUAL } from '../data/venaryData';
import { useLanguage } from '../i18n/LanguageContext';
import { SafeImage } from './SafeImage';
import { VenaryLogo } from './VenaryLogo';

export function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="a-propos" className="bg-white border-b border-zinc-200 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-stretch">
          {/* Colonne Visuel Atelier */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex"
          >
            <div className="relative w-full min-h-[300px] sm:min-h-[380px] border border-zinc-200 rounded-sm overflow-hidden bg-zinc-100">
              <SafeImage
                src={ABOUT_VISUAL.imageUrl}
                alt={t.about.visualAlt}
                fallbackTitle={t.about.visualFallback}
                width={1100}
                height={821}
                className="w-full h-full lg:h-full object-cover"
              />
              <div className="absolute bottom-4 left-4">
                <VenaryLogo surface="light" tone="crimson" size="sm" />
              </div>
            </div>
          </motion.div>

          {/* Colonne Présentation, Vision, Mission, Valeurs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-between"
          >
            <div className="mb-10">
              <p className="text-sm font-medium text-[#D91E2A] mb-3">
                {t.about.kicker}
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#111113] text-balance leading-[1.15] mb-5">
                {t.about.heading}
              </h2>
              <p className="text-base sm:text-lg text-zinc-600 leading-relaxed max-w-2xl">
                {t.about.intro}
              </p>
            </div>

            <div className="divide-y divide-zinc-200 border-t border-b border-zinc-200">
              {t.about.pillars.map((pillar, index) => (
                <div
                  key={pillar.title}
                  className="py-6 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 items-baseline"
                >
                  <div className="sm:col-span-4 flex items-center gap-3">
                    <span className="text-xs font-semibold text-[#D91E2A] tabular-nums">
                      0{index + 1}
                    </span>
                    <h3 className="font-display text-lg font-semibold text-[#111113]">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="sm:col-span-8 text-sm sm:text-[15px] text-zinc-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

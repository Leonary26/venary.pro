import { ArrowRight, ArrowDownRight } from 'lucide-react';
import { motion } from 'motion/react';
import { HERO_VISUAL } from '../data/venaryData';
import { useLanguage } from '../i18n/LanguageContext';
import { SafeImage } from './SafeImage';
import { VenaryLogo } from './VenaryLogo';

interface HeroSectionProps {
  onDiscussProject: () => void;
}

export function HeroSection({ onDiscussProject }: HeroSectionProps) {
  const { t } = useLanguage();

  return (
    <section
      id="accueil"
      className="relative bg-white border-b border-zinc-200 overflow-hidden"
    >
      {/* Grille architecturale subtile en arrière-plan */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#11111308_1px,transparent_1px),linear-gradient(to_bottom,#11111308_1px,transparent_1px)] bg-[size:64px_64px]"
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-12 pb-12 lg:pt-20 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Colonne gauche : Proposition éditoriale */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-between py-2"
          >
            <div>
              <p className="text-sm font-medium text-[#D91E2A] tracking-wide mb-5">
                {t.hero.kicker}
              </p>

              <h1 className="font-display text-[clamp(2.35rem,4.4vw,4.15rem)] font-bold tracking-tight leading-[1.06] text-[#111113] text-balance mb-6">
                {t.hero.titlePrefix}
                <span className="text-[#D91E2A]">{t.hero.titleHighlight}</span>
              </h1>

              <p className="text-base sm:text-lg text-zinc-600 leading-relaxed max-w-xl mb-9">
                {t.hero.description}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onDiscussProject}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#D91E2A] hover:bg-[#B51621] text-white text-sm sm:text-base font-medium rounded-sm transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D91E2A]"
                >
                  <span>{t.hero.primaryCta}</span>
                  <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                </button>

                <a
                  href="#services"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-zinc-50 text-[#111113] border border-zinc-300 hover:border-zinc-900 text-sm sm:text-base font-medium rounded-sm transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111113]"
                >
                  <span>{t.hero.secondaryCta}</span>
                  <ArrowDownRight className="w-4 h-4 shrink-0 text-[#D91E2A]" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Ligne éditoriale discrète en pied de colonne */}
            <div className="mt-10 pt-6 border-t border-zinc-200 flex items-center justify-between text-xs sm:text-sm text-zinc-500">
              <span>{t.hero.editorialLeft}</span>
              <span className="font-medium text-zinc-800">{t.hero.editorialRight}</span>
            </div>
          </motion.div>

          {/* Colonne droite : Composition visuelle architecturale */}
          <motion.div
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex"
          >
            <div className="relative w-full min-h-[320px] sm:min-h-[400px] lg:min-h-[470px] bg-zinc-100 border border-zinc-200 rounded-sm overflow-hidden">
              <div
                aria-hidden="true"
                className="absolute top-0 right-0 z-10 w-20 h-2 bg-[#D91E2A]"
              />
              <SafeImage
                src={HERO_VISUAL.imageUrl}
                alt={t.hero.visualAlt}
                fallbackTitle="VENARY Studio"
                priority
                width={1376}
                height={768}
                className="w-full h-full lg:h-full object-cover object-center"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent px-6 py-5 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-medium text-red-200">
                    {t.hero.visualKicker}
                  </p>
                  <p className="font-display text-base sm:text-lg font-semibold text-white">
                    {t.hero.visualHeadline}
                  </p>
                </div>
                <div className="hidden sm:flex shrink-0 border border-white/25 rounded-sm">
                  <VenaryLogo surface="light" tone="crimson" size="xs" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bande de 4 piliers pleine largeur sous le split Hero */}
        <div className="mt-12 pt-8 border-t border-zinc-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {t.hero.pillars.map((pillar, index) => (
            <div key={pillar.title} className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-xs font-medium text-[#D91E2A] tabular-nums">
                <span>0{index + 1}</span>
                <span className="h-px w-5 bg-zinc-300" aria-hidden="true" />
              </div>
              <h2 className="font-display text-base font-semibold text-[#111113]">
                {pillar.title}
              </h2>
              <p className="text-sm text-zinc-600 leading-snug">{pillar.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import {
  ArrowUpRight,
  Code2,
  Compass,
  Globe,
  Layers,
  PenTool,
  Sparkles,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';
import type { ServiceItem } from '../types/venary';
import { VenaryLogo } from './VenaryLogo';

interface ServicesSectionProps {
  onSelectService: (serviceId: string) => void;
}

const ICON_MAP: Record<ServiceItem['iconName'], typeof Globe> = {
  Globe,
  Code2,
  PenTool,
  Layers,
  Compass,
  Sparkles,
};

export function ServicesSection({ onSelectService }: ServicesSectionProps) {
  const { t } = useLanguage();

  return (
    <section id="services" className="bg-[#FAFAFA] border-b border-zinc-200 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* En-tête de section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-14">
          <div className="lg:col-span-7">
            <p className="text-sm font-medium text-[#D91E2A] mb-3">
              {t.services.kicker}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.65rem] font-bold tracking-tight text-[#111113] text-balance leading-[1.12]">
              {t.services.heading}
            </h2>
          </div>
          <div className="lg:col-span-5 flex items-start justify-between gap-5">
            <p className="text-base text-zinc-600 leading-relaxed">
              {t.services.intro}
            </p>
            <div className="hidden sm:block shrink-0 pt-1">
              <VenaryLogo surface="light" tone="crimson" size="xs" />
            </div>
          </div>
        </div>

        {/* Grille asymétrique 12 colonnes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 lg:gap-6">
          {t.services.items.map((service, idx) => {
            const Icon = ICON_MAP[service.iconName];
            const isFeatured = Boolean(service.featured);
            const colSpanClass = isFeatured ? 'lg:col-span-6' : 'lg:col-span-3 md:col-span-1';

            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.35,
                  delay: idx * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`${colSpanClass} group relative bg-white border border-zinc-200 hover:border-[#D91E2A] rounded-sm p-6 sm:p-8 flex flex-col justify-between transition-colors duration-200`}
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="w-11 h-11 rounded-sm bg-zinc-50 border border-zinc-200 group-hover:bg-[#D91E2A] group-hover:border-[#D91E2A] text-[#111113] group-hover:text-white flex items-center justify-center transition-colors duration-200">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <span className="font-display text-sm font-semibold text-zinc-400 group-hover:text-[#D91E2A] tabular-nums transition-colors duration-200">
                      {service.number}.
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-semibold text-[#111113] mb-3 leading-snug">
                    {service.title}
                  </h3>

                  <p className="text-sm sm:text-[15px] text-zinc-600 leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                <div className="pt-5 border-t border-zinc-100 flex flex-col gap-4">
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    {service.deliverables.join(' · ')}
                  </p>

                  <button
                    type="button"
                    onClick={() => onSelectService(service.id)}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[#111113] group-hover:text-[#D91E2A] transition-colors cursor-pointer w-fit focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D91E2A] rounded-sm"
                  >
                    <span>{t.services.ctaLabel}</span>
                    <ArrowUpRight
                      className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

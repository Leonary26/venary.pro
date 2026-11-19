import { motion } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';

export function MethodSection() {
  const { t } = useLanguage();

  return (
    <section id="methode" className="bg-white border-b border-zinc-200 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="max-w-2xl mb-14">
          <p className="text-sm font-medium text-[#D91E2A] mb-3">
            {t.method.kicker}
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.65rem] font-bold tracking-tight text-[#111113] text-balance leading-[1.12]">
            {t.method.heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-zinc-200">
          {t.method.steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.35,
                delay: index * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group border-r border-b border-zinc-200 p-7 sm:p-8 flex flex-col justify-between bg-white hover:bg-[#FAFAFA] transition-colors duration-200"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="font-display text-3xl font-bold text-[#D91E2A] tabular-nums">
                    {step.number}
                  </span>
                  <span
                    aria-hidden="true"
                    className="h-px w-10 bg-zinc-200 group-hover:w-14 group-hover:bg-[#D91E2A] transition-all duration-200"
                  />
                </div>

                <h3 className="font-display text-lg font-semibold text-[#111113] mb-3 leading-snug">
                  {step.title}
                </h3>

                <p className="text-sm text-zinc-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

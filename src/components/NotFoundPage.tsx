import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { VenaryLogo } from './VenaryLogo';

interface NotFoundPageProps {
  onGoHome: (sectionId?: string) => void;
}

export function NotFoundPage({ onGoHome }: NotFoundPageProps) {
  const { t } = useLanguage();

  return (
    <section className="flex-1 flex items-center justify-center bg-white py-20 px-5 sm:px-8">
      <div className="max-w-xl w-full border border-zinc-200 bg-[#FAFAFA] rounded-sm p-8 sm:p-12">
        <div className="flex items-center justify-between gap-4 pb-8 mb-8 border-b border-zinc-200">
          <VenaryLogo surface="light" tone="crimson" size="sm" />
          <span className="font-display text-sm font-semibold text-[#D91E2A] tabular-nums">
            {t.notFound.code} · {t.notFound.kicker}
          </span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#111113] text-balance leading-[1.15] mb-4">
          {t.notFound.heading}
        </h1>

        <p className="text-base text-zinc-600 leading-relaxed mb-8">
          {t.notFound.description}
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => onGoHome()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#D91E2A] hover:bg-[#B51621] text-white text-sm font-medium rounded-sm transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D91E2A]"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{t.notFound.backHome}</span>
          </button>

          <button
            type="button"
            onClick={() => onGoHome('contact')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-zinc-50 text-[#111113] border border-zinc-300 hover:border-zinc-900 text-sm font-medium rounded-sm transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111113]"
          >
            <span>{t.notFound.contactUs}</span>
            <ArrowRight className="w-4 h-4 shrink-0 text-[#D91E2A]" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}

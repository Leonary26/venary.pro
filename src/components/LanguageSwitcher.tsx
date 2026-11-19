import { useLanguage } from '../i18n/LanguageContext';
import type { Language } from '../i18n/types';

interface LanguageSwitcherProps {
  className?: string;
}

const LANGUAGES: Language[] = ['fr', 'en'];

export function LanguageSwitcher({ className = '' }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      role="group"
      aria-label={
        language === 'fr' ? 'Sélecteur de langue' : 'Language selector'
      }
      className={`inline-flex items-center border border-zinc-200 bg-zinc-50 rounded-sm p-0.5 shrink-0 ${className}`}
    >
      {LANGUAGES.map((lang, idx) => {
        const isActive = language === lang;
        return (
          <span key={lang} className="inline-flex items-center">
            {idx > 0 && (
              <span
                aria-hidden="true"
                className="text-zinc-300 text-xs px-0.5 select-none"
              >
                |
              </span>
            )}
            <button
              type="button"
              onClick={() => setLanguage(lang)}
              aria-pressed={isActive}
              aria-label={
                lang === 'fr'
                  ? 'Passer le site en français'
                  : 'Switch website to English'
              }
              className={`px-2 py-1 text-xs font-semibold tracking-wide uppercase rounded-sm transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D91E2A] ${
                isActive
                  ? 'bg-[#D91E2A] text-white'
                  : 'text-zinc-600 hover:text-[#111113]'
              }`}
            >
              {lang.toUpperCase()}
            </button>
          </span>
        );
      })}
    </div>
  );
}

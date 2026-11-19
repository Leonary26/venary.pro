import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { en } from './en';
import { fr } from './fr';
import type { Language, TranslationDictionary } from './types';

const STORAGE_KEY = 'venary_language';

const DICTIONARIES: Record<Language, TranslationDictionary> = {
  fr,
  en,
};

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationDictionary;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
);

function getInitialLanguage(): Language {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === 'fr' || saved === 'en') {
      return saved;
    }
  } catch {
    // Ignore storage access errors in restricted environments
  }
  return 'fr';
}

function updateMetaTag(selector: string, content: string) {
  const element = document.querySelector(selector);
  if (element) {
    element.setAttribute('content', content);
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  const setLanguage = (nextLang: Language) => {
    setLanguageState(nextLang);
    try {
      window.localStorage.setItem(STORAGE_KEY, nextLang);
    } catch {
      // Ignore storage access errors
    }
  };

  const t = DICTIONARIES[language];

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = t.seo.title;

    const currentUrl = window.location.origin + window.location.pathname;
    let canonicalLink = document.querySelector(
      'link[rel="canonical"]',
    ) as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = currentUrl;

    updateMetaTag('meta[name="description"]', t.seo.description);
    updateMetaTag('meta[name="keywords"]', t.seo.keywords);
    updateMetaTag('meta[property="og:title"]', t.seo.title);
    updateMetaTag('meta[property="og:description"]', t.seo.description);
    updateMetaTag('meta[property="og:locale"]', t.seo.ogLocale);
    updateMetaTag('meta[property="og:url"]', currentUrl);
    updateMetaTag('meta[name="twitter:title"]', t.seo.title);
    updateMetaTag('meta[name="twitter:description"]', t.seo.description);
  }, [language, t]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

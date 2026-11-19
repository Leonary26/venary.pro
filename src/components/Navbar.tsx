import { useEffect, useState, type MouseEvent } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { VenaryLogo } from './VenaryLogo';

interface NavbarProps {
  isNotFound?: boolean;
  onNavigateSection: (sectionId: string) => void;
  onStartProject: () => void;
}

const SECTION_IDS = [
  'accueil',
  'a-propos',
  'services',
  'realisations',
  'contact',
] as const;

export function Navbar({
  isNotFound = false,
  onNavigateSection,
  onStartProject,
}: NavbarProps) {
  const { t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('accueil');

  const navLinks = [
    { id: 'accueil', label: t.nav.home, href: '#accueil' },
    { id: 'a-propos', label: t.nav.about, href: '#a-propos' },
    { id: 'services', label: t.nav.services, href: '#services' },
    { id: 'realisations', label: t.nav.portfolio, href: '#realisations' },
    { id: 'contact', label: t.nav.contact, href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isNotFound || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: '-25% 0px -55% 0px',
        threshold: [0.1, 0.3, 0.6],
      },
    );

    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [isNotFound]);

  const handleLinkClick = (
    event: MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    event.preventDefault();
    setMobileOpen(false);
    setActiveSection(sectionId);
    onNavigateSection(sectionId);
  };

  const handleCtaClick = () => {
    setMobileOpen(false);
    onStartProject();
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-colors duration-200 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-zinc-200'
          : 'bg-white border-b border-zinc-200/70'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-[72px] lg:h-[80px] flex items-center justify-between gap-6 lg:gap-8">
        {/* Zone 1 : Logo officiel VENARY uniquement */}
        <a
          href="/#accueil"
          onClick={(e) => handleLinkClick(e, 'accueil')}
          aria-label={t.accessibility.logoHomeAria}
          className="inline-flex items-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D91E2A] rounded-sm shrink-0 transition-opacity hover:opacity-95"
        >
          <VenaryLogo surface="light" tone="crimson" size="sm" />
        </a>

        {/* Zone 2 : Liens de navigation principaux */}
        <nav
          aria-label={t.accessibility.mainNavAria}
          className="hidden md:flex items-center gap-6 lg:gap-8"
        >
          {navLinks.map((item) => {
            const isActive = !isNotFound && activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`/${item.href}`}
                onClick={(e) => handleLinkClick(e, item.id)}
                aria-current={isActive ? 'location' : undefined}
                className={`group relative py-1 text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D91E2A] rounded-sm ${
                  isActive
                    ? 'text-[#111113]'
                    : 'text-zinc-600 hover:text-[#111113]'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 bottom-0 h-[2px] w-full origin-left bg-[#D91E2A] transition-transform duration-200 ${
                    isActive
                      ? 'scale-x-100'
                      : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3 : Sélecteur FR | EN + Action principale + Menu mobile */}
        <div className="flex items-center gap-3 shrink-0">
          <LanguageSwitcher />

          <button
            type="button"
            onClick={handleCtaClick}
            className="hidden md:inline-flex items-center gap-2 px-4 py-2.5 bg-[#D91E2A] hover:bg-[#B51621] text-white text-sm font-medium rounded-sm transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D91E2A]"
          >
            <span>{t.nav.startProject}</span>
            <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label={
              mobileOpen
                ? t.accessibility.closeMenuAria
                : t.accessibility.openMenuAria
            }
            className="md:hidden inline-flex items-center justify-center w-11 h-11 text-zinc-900 hover:text-[#D91E2A] border border-zinc-200 rounded-sm transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D91E2A]"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-white border-b border-zinc-200 px-5 pt-3 pb-6"
          >
            <nav
              aria-label={t.accessibility.mobileNavAria}
              className="flex flex-col divide-y divide-zinc-100"
            >
              {navLinks.map((item) => {
                const isActive = !isNotFound && activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={`/${item.href}`}
                    onClick={(e) => handleLinkClick(e, item.id)}
                    aria-current={isActive ? 'location' : undefined}
                    className={`py-3.5 text-base font-medium transition-colors flex items-center justify-between ${
                      isActive
                        ? 'text-[#D91E2A]'
                        : 'text-zinc-800 hover:text-[#D91E2A]'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight
                      className={`w-4 h-4 ${
                        isActive ? 'text-[#D91E2A]' : 'text-zinc-400'
                      }`}
                      aria-hidden="true"
                    />
                  </a>
                );
              })}
            </nav>
            <div className="pt-4">
              <button
                type="button"
                onClick={handleCtaClick}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#D91E2A] hover:bg-[#B51621] text-white text-sm font-medium rounded-sm transition-colors cursor-pointer"
              >
                <span>{t.nav.startProject}</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

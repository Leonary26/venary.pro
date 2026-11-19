import type { MouseEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/venaryData';
import { useLanguage } from '../i18n/LanguageContext';
import { VenaryLogo } from './VenaryLogo';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
}

export function Footer({ onNavigateSection }: FooterProps) {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const footerNav = [
    { id: 'accueil', label: t.nav.home, href: '/#accueil' },
    { id: 'a-propos', label: t.nav.about, href: '/#a-propos' },
    { id: 'services', label: t.nav.services, href: '/#services' },
    { id: 'realisations', label: t.nav.portfolio, href: '/#realisations' },
    { id: 'methode', label: t.footer.methodLink, href: '/#methode' },
    { id: 'contact', label: t.nav.contact, href: '/#contact' },
  ];

  const handleNavClick = (
    event: MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    event.preventDefault();
    onNavigateSection(sectionId);
  };

  return (
    <footer className="bg-[#111113] text-white border-t-2 border-[#D91E2A]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-zinc-800">
          {/* Colonne Marque & Présentation */}
          <div className="lg:col-span-4">
            <a
              href="/#accueil"
              onClick={(e) => handleNavClick(e, 'accueil')}
              aria-label={t.accessibility.footerTopAria}
              className="inline-block mb-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D91E2A] rounded-sm transition-opacity hover:opacity-90"
            >
              <VenaryLogo surface="dark" size="lg" />
            </a>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">
              {t.footer.shortDescription}
            </p>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-sm font-semibold text-white mb-4">
              {t.footer.navigationTitle}
            </h3>
            <ul className="space-y-2.5">
              {footerNav.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className="text-sm text-zinc-400 hover:text-white transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h3 className="font-display text-sm font-semibold text-white mb-4">
              {t.footer.servicesTitle}
            </h3>
            <ul className="space-y-2.5">
              {t.services.items.map((service) => (
                <li key={service.id}>
                  <a
                    href="/#services"
                    onClick={(e) => handleNavClick(e, 'services')}
                    className="text-sm text-zinc-400 hover:text-white transition-colors"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coordonnées & Réseaux sociaux */}
          <div className="lg:col-span-3">
            <h3 className="font-display text-sm font-semibold text-white mb-4">
              {t.footer.contactTitle}
            </h3>
            <div className="space-y-2.5 text-sm text-zinc-400 mb-6">
              <p>{t.contact.availabilityValue}</p>
              {COMPANY_INFO.email && (
                <p>
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="hover:text-white transition-colors"
                  >
                    {COMPANY_INFO.email}
                  </a>
                </p>
              )}
              {COMPANY_INFO.phone && (
                <p>
                  <a
                    href={`tel:${COMPANY_INFO.phone.replace(/\s+/g, '')}`}
                    className="hover:text-white transition-colors"
                  >
                    {COMPANY_INFO.phone}
                  </a>
                </p>
              )}
              {COMPANY_INFO.location && <p>{COMPANY_INFO.location}</p>}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              {COMPANY_INFO.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  onClick={(e) => {
                    if (social.href === '#contact') {
                      handleNavClick(e, 'contact');
                    }
                  }}
                  className="inline-flex items-center gap-1 text-sm font-medium text-zinc-300 hover:text-[#D91E2A] transition-colors"
                >
                  <span>{social.label}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-zinc-500">
          <p>
            © {currentYear} {COMPANY_INFO.name}. {t.footer.rightsReserved}
          </p>
          <p>{t.footer.slogan}</p>
        </div>
      </div>
    </footer>
  );
}

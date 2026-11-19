import { lazy, Suspense, useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { AboutSection } from './components/AboutSection';
import { BackToTop } from './components/BackToTop';
import { ContactSection } from './components/ContactSection';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { MethodSection } from './components/MethodSection';
import { Navbar } from './components/Navbar';
import { PortfolioSection } from './components/PortfolioSection';
import { ServicesSection } from './components/ServicesSection';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';
import type { ProjectCategoryKey } from './types/venary';

const NotFoundPage = lazy(() =>
  import('./components/NotFoundPage').then((mod) => ({
    default: mod.NotFoundPage,
  })),
);

const CATEGORY_TO_PROJECT_ID: Record<
  Exclude<ProjectCategoryKey, 'all'>,
  string
> = {
  web: 'dev-sur-mesure',
  graphic: 'design-graphique',
  identity: 'identite-visuelle',
};

function isHomePath(pathname: string): boolean {
  return pathname === '/' || pathname === '/index.html';
}

function VenarySiteContent() {
  const { t } = useLanguage();
  const [preselectedProjectId, setPreselectedProjectId] = useState<string>('');
  const [isNotFound, setIsNotFound] = useState<boolean>(
    () => !isHomePath(window.location.pathname),
  );

  useEffect(() => {
    const handlePopState = () => {
      setIsNotFound(!isHomePath(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateToSection = (sectionId?: string, projectId?: string) => {
    if (projectId) {
      setPreselectedProjectId(projectId);
    }

    if (isNotFound) {
      window.history.pushState({}, '', sectionId ? `/#${sectionId}` : '/');
      setIsNotFound(false);
      window.setTimeout(() => {
        if (sectionId && sectionId !== 'accueil') {
          document
            .getElementById(sectionId)
            ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 60);
      return;
    }

    if (!sectionId || sectionId === 'accueil') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    document
      .getElementById(sectionId)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSelectService = (serviceId: string) => {
    navigateToSection('contact', serviceId);
  };

  const handleRequestSimilarProject = (
    categoryKey: Exclude<ProjectCategoryKey, 'all'>,
  ) => {
    const mappedId = CATEGORY_TO_PROJECT_ID[categoryKey] || 'autre';
    navigateToSection('contact', mappedId);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#111113]">
      <a
        href="#contenu-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#D91E2A] focus:text-white focus:rounded-sm focus:text-sm focus:font-medium"
      >
        {t.accessibility.skipToContent}
      </a>

      <Navbar
        isNotFound={isNotFound}
        onNavigateSection={(sectionId) => navigateToSection(sectionId)}
        onStartProject={() => navigateToSection('contact')}
      />

      <main id="contenu-principal" className="flex-1 flex flex-col">
        {isNotFound ? (
          <Suspense
            fallback={
              <div className="flex-1 bg-white" aria-busy="true" />
            }
          >
            <NotFoundPage
              onGoHome={(sectionId) => navigateToSection(sectionId)}
            />
          </Suspense>
        ) : (
          <>
            <HeroSection onDiscussProject={() => navigateToSection('contact')} />
            <ServicesSection onSelectService={handleSelectService} />
            <AboutSection />
            <PortfolioSection onRequestSimilar={handleRequestSimilarProject} />
            <MethodSection />
            <CtaSection onContactClick={() => navigateToSection('contact')} />
            <ContactSection preselectedProjectId={preselectedProjectId} />
          </>
        )}
      </main>

      <Footer onNavigateSection={(sectionId) => navigateToSection(sectionId)} />
      {!isNotFound && <BackToTop />}
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MotionConfig reducedMotion="user">
        <VenarySiteContent />
      </MotionConfig>
    </LanguageProvider>
  );
}

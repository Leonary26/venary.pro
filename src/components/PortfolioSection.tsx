import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Check, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';
import type { TranslatedPortfolioProject } from '../i18n/types';
import type { ProjectCategoryKey } from '../types/venary';
import { SafeImage } from './SafeImage';
import { VenaryLogo } from './VenaryLogo';

interface PortfolioSectionProps {
  onRequestSimilar: (categoryKey: Exclude<ProjectCategoryKey, 'all'>) => void;
}

export function PortfolioSection({ onRequestSimilar }: PortfolioSectionProps) {
  const { t } = useLanguage();
  const [activeCategoryKey, setActiveCategoryKey] =
    useState<ProjectCategoryKey>('all');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null,
  );

  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  const filteredProjects =
    activeCategoryKey === 'all'
      ? t.portfolio.projects
      : t.portfolio.projects.filter(
          (project) => project.categoryKey === activeCategoryKey,
        );

  const selectedProject: TranslatedPortfolioProject | null = selectedProjectId
    ? t.portfolio.projects.find((p) => p.id === selectedProjectId) ?? null
    : null;

  const openModal = (projectId: string) => {
    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    setSelectedProjectId(projectId);
  };

  const closeModal = () => {
    setSelectedProjectId(null);
  };

  useEffect(() => {
    if (!selectedProjectId) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 50);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedProjectId(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      lastFocusedRef.current?.focus?.();
    };
  }, [selectedProjectId]);

  return (
    <section
      id="realisations"
      className="bg-[#FAFAFA] border-b border-zinc-200 py-20 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* En-tête + Filtres par catégorie */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-[#D91E2A] mb-3">
              {t.portfolio.kicker}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.65rem] font-bold tracking-tight text-[#111113] text-balance leading-[1.12]">
              {t.portfolio.heading}
            </h2>
          </div>

          {/* Barre de filtres segmentée interactive */}
          <div
            role="tablist"
            aria-label={t.accessibility.portfolioFilterAria}
            className="flex flex-wrap items-center gap-1.5 p-1.5 bg-white border border-zinc-200 rounded-sm w-fit"
          >
            {t.portfolio.categories.map((category) => {
              const isActive = activeCategoryKey === category.key;
              return (
                <button
                  key={category.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategoryKey(category.key)}
                  className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-sm transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D91E2A] ${
                    isActive
                      ? 'bg-[#D91E2A] text-white'
                      : 'text-zinc-600 hover:text-[#111113] hover:bg-zinc-50'
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Galerie de réalisations */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="group bg-white border border-zinc-200 hover:border-[#D91E2A] rounded-sm overflow-hidden flex flex-col justify-between transition-colors duration-200"
              >
                <div>
                  <button
                    type="button"
                    onClick={() => openModal(project.id)}
                    aria-label={`${t.portfolio.viewProjectAriaPrefix} ${project.title}`}
                    className="relative block w-full aspect-[4/3] overflow-hidden bg-zinc-100 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D91E2A]"
                  >
                    <SafeImage
                      src={project.imageUrl}
                      alt={project.imageAlt}
                      fallbackTitle={project.title}
                      width={1100}
                      height={821}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-1 bg-[#D91E2A] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                    />
                  </button>

                  <div className="p-6 sm:p-7">
                    <div className="flex items-center gap-2 text-xs text-zinc-500 mb-3">
                      <span className="font-medium text-[#D91E2A]">
                        {project.categoryLabel}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{project.scopeLabel}</span>
                    </div>

                    <h3 className="font-display text-xl font-semibold text-[#111113] mb-2.5 leading-snug">
                      {project.title}
                    </h3>

                    <p className="text-sm text-zinc-600 leading-relaxed">
                      {project.summary}
                    </p>
                  </div>
                </div>

                <div className="px-6 sm:px-7 pb-6 pt-4 border-t border-zinc-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => openModal(project.id)}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[#111113] group-hover:text-[#D91E2A] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D91E2A] rounded-sm"
                  >
                    <span>{t.portfolio.viewDetails}</span>
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Fenêtre modale de détail d'une réalisation */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 sm:p-6"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-3xl bg-white border border-zinc-200 rounded-sm overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <button
                ref={closeBtnRef}
                type="button"
                onClick={closeModal}
                aria-label={t.accessibility.closeModalAria}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/95 hover:bg-[#D91E2A] text-[#111113] hover:text-white border border-zinc-200 rounded-sm flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D91E2A]"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>

              <div className="aspect-[16/9] w-full bg-zinc-100 border-b border-zinc-200">
                <SafeImage
                  src={selectedProject.imageUrl}
                  alt={selectedProject.imageAlt}
                  fallbackTitle={selectedProject.title}
                  width={1100}
                  height={821}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-2 text-xs text-zinc-500 mb-3">
                  <span className="font-medium text-[#D91E2A]">
                    {selectedProject.categoryLabel}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedProject.scopeLabel}</span>
                </div>

                <h3
                  id="project-modal-title"
                  className="font-display text-2xl sm:text-3xl font-bold text-[#111113] mb-4"
                >
                  {selectedProject.title}
                </h3>

                <p className="text-base text-zinc-600 leading-relaxed mb-7">
                  {selectedProject.description}
                </p>

                <div className="border-t border-zinc-200 pt-6 mb-7">
                  <h4 className="font-display text-sm font-semibold text-[#111113] mb-4">
                    {t.portfolio.deliverablesHeading}
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedProject.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-zinc-700"
                      >
                        <Check
                          className="w-4 h-4 text-[#D91E2A] shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-zinc-200">
                  <div className="flex items-center gap-3">
                    <VenaryLogo surface="light" tone="crimson" size="xs" />
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-3 py-2 text-sm font-medium text-zinc-600 hover:text-[#111113] transition-colors cursor-pointer"
                    >
                      {t.portfolio.closeButton}
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const catKey = selectedProject.categoryKey;
                      closeModal();
                      onRequestSimilar(catKey);
                    }}
                    className="inline-flex items-center gap-2 px-5 py-3 bg-[#D91E2A] hover:bg-[#B51621] text-white text-sm font-medium rounded-sm transition-colors cursor-pointer"
                  >
                    <span>{t.portfolio.requestSimilarButton}</span>
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

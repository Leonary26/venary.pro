import type {
  CompanyValue,
  MethodStep,
  ProjectCategoryKey,
  ServiceItem,
} from '../types/venary';

export type Language = 'fr' | 'en';

export interface TranslatedPortfolioProject {
  id: string;
  categoryKey: Exclude<ProjectCategoryKey, 'all'>;
  categoryLabel: string;
  title: string;
  scopeLabel: string;
  summary: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  deliverables: string[];
}

export interface TranslationDictionary {
  seo: {
    title: string;
    description: string;
    keywords: string;
    ogLocale: string;
  };
  accessibility: {
    skipToContent: string;
    logoHomeAria: string;
    openMenuAria: string;
    closeMenuAria: string;
    mainNavAria: string;
    mobileNavAria: string;
    portfolioFilterAria: string;
    closeModalAria: string;
    ctaSectionAria: string;
    footerTopAria: string;
    backToTopAria: string;
  };
  nav: {
    home: string;
    about: string;
    services: string;
    portfolio: string;
    contact: string;
    startProject: string;
  };
  hero: {
    kicker: string;
    titlePrefix: string;
    titleHighlight: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    editorialLeft: string;
    editorialRight: string;
    visualAlt: string;
    visualKicker: string;
    visualHeadline: string;
    pillars: Array<{
      title: string;
      detail: string;
    }>;
  };
  services: {
    kicker: string;
    heading: string;
    intro: string;
    ctaLabel: string;
    items: ServiceItem[];
  };
  about: {
    kicker: string;
    heading: string;
    intro: string;
    visualAlt: string;
    visualFallback: string;
    pillars: CompanyValue[];
  };
  portfolio: {
    kicker: string;
    heading: string;
    categories: Array<{
      key: ProjectCategoryKey;
      label: string;
    }>;
    viewDetails: string;
    viewProjectAriaPrefix: string;
    deliverablesHeading: string;
    closeButton: string;
    requestSimilarButton: string;
    projects: TranslatedPortfolioProject[];
  };
  method: {
    kicker: string;
    heading: string;
    steps: MethodStep[];
  };
  cta: {
    kicker: string;
    heading: string;
    buttonLabel: string;
  };
  contact: {
    kicker: string;
    heading: string;
    intro: string;
    availabilityLabel: string;
    availabilityValue: string;
    responseDelayValue: string;
    emailLabel: string;
    phoneLabel: string;
    locationLabel: string;
    form: {
      fullNameLabel: string;
      fullNamePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      projectTypeLabel: string;
      messageLabel: string;
      messagePlaceholder: string;
      charactersUnit: string;
      requiredNotePrefix: string;
      requiredNoteSuffix: string;
      submitButton: string;
      submittingButton: string;
      projectTypeOptions: Array<{
        id: string;
        label: string;
      }>;
      validation: {
        fullName: string;
        emailRequired: string;
        emailInvalid: string;
        projectTypeRequired: string;
        messageMinLength: string;
      };
      genericError: string;
      networkError: string;
      errorByCode: Record<string, string>;
      successBadge: string;
      successHeading: string;
      successMessage: string;
      sendAnotherButton: string;
    };
  };
  footer: {
    shortDescription: string;
    navigationTitle: string;
    servicesTitle: string;
    contactTitle: string;
    methodLink: string;
    rightsReserved: string;
    slogan: string;
  };
  notFound: {
    code: string;
    kicker: string;
    heading: string;
    description: string;
    backHome: string;
    contactUs: string;
  };
}

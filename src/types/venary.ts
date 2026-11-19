export type ProjectCategoryKey = 'all' | 'web' | 'graphic' | 'identity';

export type ProjectCategory =
  | 'Tous'
  | 'Développement web'
  | 'Design graphique'
  | 'Identité visuelle';

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortLabel: string;
  description: string;
  deliverables: string[];
  iconName:
    | 'Globe'
    | 'Code2'
    | 'PenTool'
    | 'Layers'
    | 'Compass'
    | 'Sparkles';
  featured?: boolean;
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: Exclude<ProjectCategory, 'Tous'>;
  summary: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  deliverables: string[];
  scopeLabel: string;
}

export interface MethodStep {
  number: string;
  title: string;
  description: string;
}

export interface CompanyValue {
  title: string;
  description: string;
}

export interface SocialLink {
  label: string;
  href: string;
  platform: 'linkedin' | 'instagram' | 'behance' | 'x';
}

export interface CompanyInfo {
  name: string;
  slogan: string;
  shortDescription: string;
  availability: string;
  responseDelay: string;
  /**
   * Champs modifiables : renseignez vos coordonnées officielles ci-dessous
   * lorsqu'elles sont prêtes à être publiées.
   */
  email?: string;
  phone?: string;
  location?: string;
  socials: SocialLink[];
}

export interface ContactFormValues {
  fullName: string;
  email: string;
  projectType: string;
  message: string;
}

export interface ContactPayload extends ContactFormValues {
  website?: string;
  formStartedAt?: number;
  locale?: 'fr' | 'en';
}


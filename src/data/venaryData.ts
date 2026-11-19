import type {
  CompanyInfo,
  CompanyValue,
  MethodStep,
  PortfolioProject,
  ProjectCategory,
  ServiceItem,
} from '../types/venary';

/**
 * CONFIGURATION CENTRALE VENARY
 * Modifiez librement ce fichier pour mettre à jour les coordonnées,
 * ajouter de nouvelles réalisations ou ajuster les descriptions de services.
 */

export const COMPANY_INFO: CompanyInfo = {
  name: 'VENARY',
  slogan: 'Donnons vie à vos idées numériques.',
  shortDescription:
    'Entreprise de services numériques dédiée à la création de sites web, au développement sur mesure et au design de marque.',
  availability: 'Accompagnement à distance et sur rendez-vous',
  responseDelay: 'Réponse sous 24 à 48 h ouvrées',
  // Renseignez ci-dessous vos coordonnées réelles dès qu'elles sont définies :
  email: '',
  phone: '',
  location: '',
  socials: [
    { label: 'LinkedIn', href: '#contact', platform: 'linkedin' },
    { label: 'Instagram', href: '#contact', platform: 'instagram' },
    { label: 'Behance', href: '#contact', platform: 'behance' },
  ],
};

export const HERO_VISUAL = {
  imageUrl: '/src/assets/images/hero_venary_studio_1795087682841.jpg',
  imageAlt:
    'Espace de travail architectural du studio VENARY présentant une interface web moderne en blanc, noir et rouge',
};

export const ABOUT_VISUAL = {
  imageUrl: '/src/assets/images/about_venary_atelier_1795087683507.jpg',
  imageAlt:
    'Atelier de création VENARY avec ouvrages éditoriaux rouges et nuanciers sur table sombre minimaliste',
};

export const HERO_PILLARS = [
  {
    title: 'Sites web & Applications',
    detail: 'Architecture moderne, rapide et responsive',
  },
  {
    title: 'Identité visuelle',
    detail: 'Logotypes, chartes et direction artistique',
  },
  {
    title: 'Supports publicitaires',
    detail: 'Flyers, brochures et visuels print',
  },
  {
    title: 'Accompagnement dédié',
    detail: 'De la réflexion stratégique au lancement',
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'sites-web',
    number: '01',
    title: 'Création de sites web professionnels',
    shortLabel: 'Site web professionnel',
    description:
      'Conception de sites vitrines et institutionnels pensés pour refléter votre crédibilité, structurer votre offre et convertir vos visiteurs sur tous les écrans.',
    deliverables: ['Design responsive', 'Optimisation SEO', 'Performance & accessibilité'],
    iconName: 'Globe',
    featured: true,
  },
  {
    id: 'dev-sur-mesure',
    number: '02',
    title: 'Développement web sur mesure',
    shortLabel: 'Développement web sur mesure',
    description:
      'Développement d’interfaces web interactives, portails clients et applications métier conçus avec un code propre, évolutif et adapté à vos processus.',
    deliverables: ['Architecture front & back', 'Interfaces réactives', 'Code maintenable'],
    iconName: 'Code2',
    featured: true,
  },
  {
    id: 'identite-visuelle',
    number: '03',
    title: "Création d'identités visuelles",
    shortLabel: 'Identité visuelle',
    description:
      'Élaboration de systèmes de marque complets : logotype, palette chromatique, typographie et charte graphique pour affirmer votre positionnement.',
    deliverables: ['Logotype & déclinaisons', 'Charte graphique', 'Univers de marque'],
    iconName: 'Compass',
  },
  {
    id: 'design-graphique',
    number: '04',
    title: 'Design graphique',
    shortLabel: 'Design graphique',
    description:
      'Direction artistique et création de visuels percutants pour vos campagnes digitales, réseaux sociaux, présentations commerciales et interfaces.',
    deliverables: ['Visuels digitaux', 'Supports de présentation', 'Cohérence éditoriale'],
    iconName: 'PenTool',
  },
  {
    id: 'flyers-publicitaires',
    number: '05',
    title: 'Création de flyers et supports publicitaires',
    shortLabel: 'Flyers & supports publicitaires',
    description:
      'Mise en page professionnelle de flyers, brochures, affiches et cartes de visite prêts pour l’impression avec une lisibilité irréprochable.',
    deliverables: ['Flyers & affiches', 'Brochures commerciales', 'Fichiers prêts à imprimer'],
    iconName: 'Layers',
  },
  {
    id: 'solutions-personnalisees',
    number: '06',
    title: 'Solutions numériques personnalisées',
    shortLabel: 'Solution numérique personnalisée',
    description:
      'Accompagnement global et outils digitaux adaptés aux besoins spécifiques des entreprises, entrepreneurs et porteurs de projets.',
    deliverables: ['Audit & conseil digital', 'Outils sur mesure', 'Évolutions continues'],
    iconName: 'Sparkles',
  },
];

export const ABOUT_CONTENT = {
  heading: 'Une approche exigeante du numérique et du design.',
  intro:
    'VENARY accompagne les entreprises, entrepreneurs et particuliers à chaque étape de leur développement digital. Nous unissons rigueur technique et sensibilité graphique pour concevoir des supports durables, lisibles et fidèles à votre ambition.',
  pillars: [
    {
      title: 'Notre Vision',
      description:
        'Rendre les standards d’excellence du design et de l’ingénierie web accessibles aux projets ambitieux, quelle que soit leur taille.',
    },
    {
      title: 'Notre Mission',
      description:
        'Transformer des idées complexes en expériences numériques claires, rapides et esthétiques qui renforcent durablement la présence en ligne de nos clients.',
    },
    {
      title: 'Nos Valeurs',
      description:
        'Exigence du détail, transparence dans l’échange, fiabilité technique et respect absolu de l’identité de chaque marque accompagnée.',
    },
  ] satisfies CompanyValue[],
};

export const PORTFOLIO_CATEGORIES: ProjectCategory[] = [
  'Tous',
  'Développement web',
  'Design graphique',
  'Identité visuelle',
];

/**
 * RÉALISATIONS & CONCEPTS DE RÉFÉRENCE VENARY
 * Ajoutez ou modifiez chaque entrée ci-dessous selon vos projets clients.
 */
export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'plateforme-corporate-web',
    title: 'Plateforme vitrine & architecture web B2B',
    category: 'Développement web',
    scopeLabel: 'Site vitrine · Responsive · SEO',
    summary:
      'Conception et développement d’une interface web claire structurée autour d’une hiérarchie éditoriale forte et d’un parcours de prise de contact optimisé.',
    description:
      'Ce modèle de réalisation illustre notre savoir-faire en création de sites web professionnels : temps de chargement maîtrisés, mise en page éditoriale rigoureuse, compatibilité mobile native et intégration soignée des appels à l’action.',
    imageUrl: '/src/assets/images/project_web_platform_1795087682682.jpg',
    imageAlt:
      'Présentation sur écran studio d’un site web corporate moderne en blanc, noir et rouge',
    deliverables: [
      'Direction artistique web',
      'Développement React & TypeScript',
      'Structure sémantique optimisée SEO',
      'Formulaire de qualification de projet',
    ],
  },
  {
    id: 'systeme-identite-marque',
    title: 'Identité visuelle & système de papeterie',
    category: 'Identité visuelle',
    scopeLabel: 'Logotype · Charte graphique · Papeterie',
    summary:
      'Élaboration d’une identité visuelle structurée mêlant emblème géométrique, typographie architecturale et déclinaisons sur supports imprimés.',
    description:
      'Un système identitaire complet conçu pour assurer une reconnaissance immédiate sur tous les points de contact : logotype vectoriel, règles d’utilisation chromatique, cartes de visite, chemises de présentation et documents officiels.',
    imageUrl: '/src/assets/images/project_brand_identity_1795087682841.jpg',
    imageAlt:
      'Ensemble de papeterie et cartes de visite minimalistes noires, blanches et rouges posées sur papier texturé',
    deliverables: [
      'Création du logotype & monogramme',
      'Charte graphique complète',
      'Cartes de visite & chemise corporative',
      'Gabarits de documents professionnels',
    ],
  },
  {
    id: 'collection-supports-print',
    title: 'Flyers & supports publicitaires éditoriaux',
    category: 'Design graphique',
    scopeLabel: 'Print · Flyers · Édition',
    summary:
      'Création d’une gamme de flyers, dépliants et supports promotionnels à fort contraste typographique pour valoriser une offre commerciale.',
    description:
      'Conception graphique orientée lisibilité et impact visuel. Chaque support est pensé avec des grilles suisses précises, un équilibre maîtrisé entre espaces blancs et accents rouges, et des fichiers prêts pour l’impression professionnelle.',
    imageUrl: '/src/assets/images/project_print_flyer_1795087683054.jpg',
    imageAlt:
      'Flyers et brochures publicitaires modernes en blanc, noir et rouge disposés sur une table en pierre claire',
    deliverables: [
      'Flyers promotionnels recto-verso',
      'Dépliants & brochures d’entreprise',
      'Grille typographique modulaire',
      'Préparation technique haute définition (CMJN)',
    ],
  },
];

export const METHOD_STEPS: MethodStep[] = [
  {
    number: '01',
    title: 'Échange et compréhension du besoin',
    description:
      'Nous analysons vos objectifs, votre public et vos contraintes afin de poser un cadre clair et réaliste dès le départ.',
  },
  {
    number: '02',
    title: 'Proposition et conception',
    description:
      'Nous définissons l’architecture, la direction artistique et les maquettes sur mesure en validant chaque étape avec vous.',
  },
  {
    number: '03',
    title: 'Développement et création',
    description:
      'Nous donnons vie au projet avec un code fiable, des visuels soignés et une attention constante portée à la fluidité et aux détails.',
  },
  {
    number: '04',
    title: 'Livraison et accompagnement',
    description:
      'Mise en ligne, remise des fichiers finaux et suivi post-lancement pour garantir l’autonomie et l’évolution de vos outils.',
  },
];

export const PROJECT_TYPE_OPTIONS = [
  'Création de site web professionnel',
  'Développement web sur mesure',
  'Design graphique',
  'Création de flyers et supports publicitaires',
  "Création d'identités visuelles",
  'Solutions numériques personnalisées',
  'Autre demande',
];

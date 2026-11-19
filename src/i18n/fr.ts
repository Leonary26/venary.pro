import type { TranslationDictionary } from './types';

export const fr: TranslationDictionary = {
  seo: {
    title: 'VENARY – Agence Digitale Madagascar | Web & Design',
    description:
      'Agence digitale à Madagascar : création de site web professionnel, développement web sur mesure, design graphique et identité visuelle pour votre activité.',
    keywords:
      'Création de site web à Madagascar, Développement web professionnel, Agence digitale Madagascar, Design graphique, Identité visuelle, VENARY',
    ogLocale: 'fr_FR',
  },
  accessibility: {
    skipToContent: 'Aller au contenu principal',
    logoHomeAria: "VENARY – Retour à l'accueil",
    openMenuAria: 'Ouvrir le menu',
    closeMenuAria: 'Fermer le menu',
    mainNavAria: 'Navigation principale',
    mobileNavAria: 'Navigation mobile',
    portfolioFilterAria: 'Filtrer les réalisations par catégorie',
    closeModalAria: 'Fermer la fiche projet',
    ctaSectionAria: "Appel à l'action",
    footerTopAria: 'VENARY – Retour en haut de page',
    backToTopAria: 'Remonter en haut de la page',
  },
  nav: {
    home: 'Accueil',
    about: 'À propos',
    services: 'Nos services',
    portfolio: 'Réalisations',
    contact: 'Contact',
    startProject: 'Démarrer un projet',
  },
  hero: {
    kicker: 'Services numériques · Web · Identité visuelle',
    titlePrefix: 'Donnons vie à vos ',
    titleHighlight: 'idées numériques.',
    description:
      'VENARY accompagne les entreprises, entrepreneurs et particuliers dans la conception de sites web professionnels, le développement sur mesure et la création d’identités visuelles fortes.',
    primaryCta: 'Parlons de votre projet',
    secondaryCta: 'Découvrir nos services',
    editorialLeft: 'Studio digital · Conception & ingénierie web',
    editorialRight: 'Rouge, blanc & rigueur',
    visualAlt:
      'Espace de travail architectural du studio VENARY présentant une interface web moderne en blanc, noir et rouge',
    visualKicker: 'Direction artistique & développement',
    visualHeadline: 'Des solutions digitales claires, rapides et distinctives.',
    pillars: [
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
    ],
  },
  services: {
    kicker: 'Nos expertises',
    heading: 'Des services numériques pensés pour valoriser votre activité.',
    intro:
      'De la conception de votre identité de marque jusqu’au déploiement de votre plateforme web, chaque prestation est réalisée sur mesure avec un haut niveau d’exigence.',
    ctaLabel: 'Demander un devis',
    items: [
      {
        id: 'sites-web',
        number: '01',
        title: 'Création de sites web professionnels',
        shortLabel: 'Création de site web professionnel',
        description:
          'Conception de sites vitrines et institutionnels pensés pour refléter votre crédibilité, structurer votre offre et convertir vos visiteurs sur tous les écrans.',
        deliverables: [
          'Design responsive',
          'Optimisation SEO',
          'Performance & accessibilité',
        ],
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
        deliverables: [
          'Architecture front & back',
          'Interfaces réactives',
          'Code maintenable',
        ],
        iconName: 'Code2',
        featured: true,
      },
      {
        id: 'identite-visuelle',
        number: '03',
        title: "Création d'identités visuelles",
        shortLabel: "Création d'identités visuelles",
        description:
          'Élaboration de systèmes de marque complets : logotype, palette chromatique, typographie et charte graphique pour affirmer votre positionnement.',
        deliverables: [
          'Logotype & déclinaisons',
          'Charte graphique',
          'Univers de marque',
        ],
        iconName: 'Compass',
      },
      {
        id: 'design-graphique',
        number: '04',
        title: 'Design graphique',
        shortLabel: 'Design graphique',
        description:
          'Direction artistique et création de visuels percutants pour vos campagnes digitales, réseaux sociaux, présentations commerciales et interfaces.',
        deliverables: [
          'Visuels digitaux',
          'Supports de présentation',
          'Cohérence éditoriale',
        ],
        iconName: 'PenTool',
      },
      {
        id: 'flyers-publicitaires',
        number: '05',
        title: 'Création de flyers et supports publicitaires',
        shortLabel: 'Création de flyers et supports publicitaires',
        description:
          'Mise en page professionnelle de flyers, brochures, affiches et cartes de visite prêts pour l’impression avec une lisibilité irréprochable.',
        deliverables: [
          'Flyers & affiches',
          'Brochures commerciales',
          'Fichiers prêts à imprimer',
        ],
        iconName: 'Layers',
      },
      {
        id: 'solutions-personnalisees',
        number: '06',
        title: 'Solutions numériques personnalisées',
        shortLabel: 'Solutions numériques personnalisées',
        description:
          'Accompagnement global et outils digitaux adaptés aux besoins spécifiques des entreprises, entrepreneurs et porteurs de projets.',
        deliverables: [
          'Audit & conseil digital',
          'Outils sur mesure',
          'Évolutions continues',
        ],
        iconName: 'Sparkles',
      },
    ],
  },
  about: {
    kicker: 'À propos de VENARY',
    heading: 'Une approche exigeante du numérique et du design.',
    intro:
      'VENARY accompagne les entreprises, entrepreneurs et particuliers à chaque étape de leur développement digital. Nous unissons rigueur technique et sensibilité graphique pour concevoir des supports durables, lisibles et fidèles à votre ambition.',
    visualAlt:
      'Atelier de création VENARY avec ouvrages éditoriaux rouges et nuanciers sur table sombre minimaliste',
    visualFallback: 'Atelier VENARY',
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
    ],
  },
  portfolio: {
    kicker: 'Nos réalisations',
    heading: 'Des créations pensées pour durer et se démarquer.',
    categories: [
      { key: 'all', label: 'Tous' },
      { key: 'web', label: 'Développement web' },
      { key: 'graphic', label: 'Design graphique' },
      { key: 'identity', label: 'Identité visuelle' },
    ],
    viewDetails: 'Voir les détails',
    viewProjectAriaPrefix: 'Découvrir le projet :',
    deliverablesHeading: 'Livrables inclus dans cette approche',
    closeButton: 'Fermer',
    requestSimilarButton: 'Lancer un projet similaire',
    projects: [
      {
        id: 'plateforme-corporate-web',
        categoryKey: 'web',
        categoryLabel: 'Développement web',
        title: 'Plateforme vitrine & architecture web B2B',
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
        categoryKey: 'identity',
        categoryLabel: 'Identité visuelle',
        title: 'Identité visuelle & système de papeterie',
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
        categoryKey: 'graphic',
        categoryLabel: 'Design graphique',
        title: 'Flyers & supports publicitaires éditoriaux',
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
    ],
  },
  method: {
    kicker: 'Notre méthode',
    heading: 'Un processus clair, structuré en quatre étapes.',
    steps: [
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
    ],
  },
  cta: {
    kicker: 'Prêt à passer à l’action ?',
    heading: 'Vous avez un projet en tête ? Construisons-le ensemble.',
    buttonLabel: 'Discuter de votre projet',
  },
  contact: {
    kicker: 'Contact',
    heading: 'Parlons de votre prochain projet numérique.',
    intro:
      'Partagez-nous vos besoins via le formulaire ci-contre. Chaque demande est transmise directement à notre équipe afin de vous proposer une réponse adaptée à vos objectifs.',
    availabilityLabel: 'Disponibilité & délai',
    availabilityValue: 'Accompagnement à distance et sur rendez-vous',
    responseDelayValue: 'Réponse sous 24 à 48 h ouvrées',
    emailLabel: 'Adresse e-mail',
    phoneLabel: 'Téléphone',
    locationLabel: 'Localisation',
    form: {
      fullNameLabel: 'Nom complet',
      fullNamePlaceholder: 'Votre nom et prénom',
      emailLabel: 'Adresse e-mail',
      emailPlaceholder: 'nom@entreprise.fr',
      projectTypeLabel: 'Type de projet',
      messageLabel: 'Message',
      messagePlaceholder:
        'Décrivez vos objectifs, vos délais souhaités et les fonctionnalités envisagées...',
      charactersUnit: 'caractères',
      requiredNotePrefix: 'Les champs marqués d’un',
      requiredNoteSuffix: 'sont obligatoires.',
      submitButton: 'Envoyer',
      submittingButton: 'Envoi en cours...',
      projectTypeOptions: [
        { id: 'sites-web', label: 'Création de site web professionnel' },
        { id: 'dev-sur-mesure', label: 'Développement web sur mesure' },
        { id: 'design-graphique', label: 'Design graphique' },
        {
          id: 'flyers-publicitaires',
          label: 'Création de flyers et supports publicitaires',
        },
        { id: 'identite-visuelle', label: "Création d'identités visuelles" },
        {
          id: 'solutions-personnalisees',
          label: 'Solutions numériques personnalisées',
        },
        { id: 'autre', label: 'Autre demande' },
      ],
      validation: {
        fullName:
          'Veuillez renseigner votre nom complet (2 caractères minimum).',
        emailRequired: 'Veuillez saisir votre adresse e-mail.',
        emailInvalid: 'Le format de l’adresse e-mail semble invalide.',
        projectTypeRequired: 'Veuillez sélectionner un type de projet.',
        messageMinLength:
          'Décrivez brièvement votre besoin (15 caractères minimum) afin que nous puissions vous répondre utilement.',
      },
      genericError: 'Une erreur est survenue. Veuillez réessayer.',
      networkError:
        'Impossible de contacter le serveur. Vérifiez votre connexion internet et réessayez.',
      errorByCode: {
        RATE_LIMIT:
          'Trop de messages envoyés récemment. Veuillez patienter quelques minutes avant de réessayer.',
        SPAM: 'Requête refusée par la protection anti-spam.',
        TOO_FAST: 'Soumission trop rapide détectée. Veuillez réessayer.',
        INVALID_NAME:
          'Le nom complet doit contenir entre 2 et 120 caractères.',
        INVALID_EMAIL: 'Veuillez fournir une adresse e-mail valide.',
        INVALID_PROJECT_TYPE: 'Veuillez sélectionner un type de projet valide.',
        INVALID_MESSAGE:
          'Le message doit contenir entre 15 et 5000 caractères.',
        SERVICE_UNAVAILABLE:
          "Le service d'envoi de messages est momentanément indisponible. Veuillez réessayer ultérieurement.",
        RESEND_ERROR:
          "L'envoi du message a échoué pour le moment. Veuillez réessayer dans quelques instants.",
        SERVER_ERROR: 'Une erreur est survenue. Veuillez réessayer.',
        INVALID_JSON: 'Format de requête invalide.',
        NETWORK_ERROR:
          'Impossible de contacter le serveur. Vérifiez votre connexion internet et réessayez.',
        METHOD_NOT_ALLOWED: 'Méthode HTTP non autorisée.',
      },
      successBadge: 'Confirmation',
      successHeading: 'Message envoyé avec succès !',
      successMessage:
        'Votre message a été envoyé avec succès ! Nous vous répondrons rapidement.',
      sendAnotherButton: 'Envoyer un autre message',
    },
  },
  footer: {
    shortDescription:
      'Entreprise de services numériques dédiée à la création de sites web, au développement sur mesure et au design de marque.',
    navigationTitle: 'Navigation',
    servicesTitle: 'Services',
    contactTitle: 'Coordonnées & Réseaux',
    methodLink: 'Notre méthode',
    rightsReserved: 'Tous droits réservés.',
    slogan: 'Donnons vie à vos idées numériques.',
  },
  notFound: {
    code: '404',
    kicker: 'Page introuvable',
    heading: "Cette page n'existe pas ou a été déplacée.",
    description:
      'Le lien suivi semble incorrect ou obsolète. Revenez à la page d’accueil VENARY pour découvrir nos services ou nous contacter directement.',
    backHome: "Retour à l'accueil",
    contactUs: 'Nous contacter',
  },
};

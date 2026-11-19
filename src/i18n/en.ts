import type { TranslationDictionary } from './types';

export const en: TranslationDictionary = {
  seo: {
    title: 'VENARY – Digital Agency Madagascar | Web & Brand Design',
    description:
      'Digital agency in Madagascar specializing in graphic design and web development: professional websites, custom web engineering, and brand identity.',
    keywords:
      'Digital agency Madagascar, Graphic design and web development, Professional website creation, Custom web development, Brand identity, VENARY',
    ogLocale: 'en_US',
  },
  accessibility: {
    skipToContent: 'Skip to main content',
    logoHomeAria: 'VENARY – Back to home',
    openMenuAria: 'Open navigation menu',
    closeMenuAria: 'Close navigation menu',
    mainNavAria: 'Primary navigation',
    mobileNavAria: 'Mobile navigation',
    portfolioFilterAria: 'Filter portfolio projects by category',
    closeModalAria: 'Close project details',
    ctaSectionAria: 'Call to action',
    footerTopAria: 'VENARY – Back to top',
    backToTopAria: 'Back to top',
  },
  nav: {
    home: 'Home',
    about: 'About Us',
    services: 'Our Services',
    portfolio: 'Our Work',
    contact: 'Contact',
    startProject: 'Start a Project',
  },
  hero: {
    kicker: 'Digital Services · Web · Brand Identity',
    titlePrefix: 'Bringing your ',
    titleHighlight: 'digital ideas to life.',
    description:
      'VENARY partners with businesses, entrepreneurs, and individuals to craft professional websites, custom web applications, and memorable visual identities.',
    primaryCta: "Let's Talk About Your Project",
    secondaryCta: 'Explore Our Services',
    editorialLeft: 'Digital Studio · Design & Web Engineering',
    editorialRight: 'Red, white & precision',
    visualAlt:
      'Architectural workspace at VENARY studio displaying a modern web interface in white, black, and crimson red',
    visualKicker: 'Art Direction & Engineering',
    visualHeadline: 'Clear, fast, and distinctive digital solutions.',
    pillars: [
      {
        title: 'Websites & Applications',
        detail: 'Modern, fast, and responsive architecture',
      },
      {
        title: 'Visual Identity',
        detail: 'Logotypes, brand guidelines, and art direction',
      },
      {
        title: 'Promotional Print',
        detail: 'Flyers, brochures, and advertising collateral',
      },
      {
        title: 'Dedicated Partnership',
        detail: 'From strategic discovery to launch',
      },
    ],
  },
  services: {
    kicker: 'Our Expertise',
    heading: 'Digital services built to elevate your business.',
    intro:
      'From shaping your visual brand identity to launching your custom web platform, every deliverable is crafted to the highest technical and aesthetic standards.',
    ctaLabel: 'Request a Quote',
    items: [
      {
        id: 'sites-web',
        number: '01',
        title: 'Professional Website Creation',
        shortLabel: 'Professional Website Creation',
        description:
          'Corporate and showcase websites engineered to reinforce your credibility, clarify your offering, and convert visitors seamlessly across every screen.',
        deliverables: [
          'Responsive design',
          'SEO optimization',
          'Speed & accessibility',
        ],
        iconName: 'Globe',
        featured: true,
      },
      {
        id: 'dev-sur-mesure',
        number: '02',
        title: 'Custom Web Development',
        shortLabel: 'Custom Web Development',
        description:
          'Interactive web interfaces, client portals, and tailored business applications built with clean, scalable code aligned with your workflows.',
        deliverables: [
          'Front & back architecture',
          'Responsive interfaces',
          'Maintainable code',
        ],
        iconName: 'Code2',
        featured: true,
      },
      {
        id: 'identite-visuelle',
        number: '03',
        title: 'Brand Identity Systems',
        shortLabel: 'Brand Identity Systems',
        description:
          'Comprehensive brand design systems—logotypes, color palettes, typography, and brand guidelines—built to establish a sharp market presence.',
        deliverables: [
          'Logo & mark variations',
          'Brand guidelines',
          'Visual system',
        ],
        iconName: 'Compass',
      },
      {
        id: 'design-graphique',
        number: '04',
        title: 'Graphic Design',
        shortLabel: 'Graphic Design',
        description:
          'Art direction and high-impact visual assets tailored for digital campaigns, social channels, pitch decks, and product interfaces.',
        deliverables: [
          'Digital assets',
          'Sales presentations',
          'Editorial consistency',
        ],
        iconName: 'PenTool',
      },
      {
        id: 'flyers-publicitaires',
        number: '05',
        title: 'Flyers & Advertising Collateral',
        shortLabel: 'Flyers & Advertising Collateral',
        description:
          'Structured editorial layouts for flyers, brochures, posters, and business cards delivered print-ready with crisp typographic hierarchy.',
        deliverables: [
          'Flyers & posters',
          'Corporate brochures',
          'Print-ready files',
        ],
        iconName: 'Layers',
      },
      {
        id: 'solutions-personnalisees',
        number: '06',
        title: 'Tailored Digital Solutions',
        shortLabel: 'Tailored Digital Solutions',
        description:
          'End-to-end digital consulting and bespoke software tools crafted around the exact operational goals of companies and founders.',
        deliverables: [
          'Digital audit & strategy',
          'Custom tooling',
          'Ongoing support',
        ],
        iconName: 'Sparkles',
      },
    ],
  },
  about: {
    kicker: 'About VENARY',
    heading: 'A disciplined approach to digital engineering and design.',
    intro:
      'VENARY supports companies, entrepreneurs, and individuals through every stage of their digital growth. We combine engineering rigor with graphic clarity to build durable, legible digital products true to your ambition.',
    visualAlt:
      'VENARY creative studio featuring crimson editorial books and material swatches on a minimalist dark table',
    visualFallback: 'VENARY Studio',
    pillars: [
      {
        title: 'Our Vision',
        description:
          'Make top-tier design and web engineering accessible to ambitious projects, regardless of scale.',
      },
      {
        title: 'Our Mission',
        description:
          'Turn complex ideas into clear, fast, and refined digital experiences that strengthen our clients’ online presence.',
      },
      {
        title: 'Our Values',
        description:
          'Attention to detail, transparent collaboration, technical reliability, and deep respect for every brand identity we craft.',
      },
    ],
  },
  portfolio: {
    kicker: 'Our Work',
    heading: 'Crafted projects designed to stand out and endure.',
    categories: [
      { key: 'all', label: 'All' },
      { key: 'web', label: 'Web Development' },
      { key: 'graphic', label: 'Graphic Design' },
      { key: 'identity', label: 'Brand Identity' },
    ],
    viewDetails: 'View Details',
    viewProjectAriaPrefix: 'Explore project:',
    deliverablesHeading: 'Deliverables included in this approach',
    closeButton: 'Close',
    requestSimilarButton: 'Start a Similar Project',
    projects: [
      {
        id: 'plateforme-corporate-web',
        categoryKey: 'web',
        categoryLabel: 'Web Development',
        title: 'Corporate Showcase & B2B Web Architecture',
        scopeLabel: 'Website · Responsive · SEO',
        summary:
          'Design and engineering of a structured corporate web interface built around clear editorial hierarchy and an intuitive lead capture flow.',
        description:
          'This showcase model illustrates our approach to professional website creation: fast load performance, disciplined editorial grid layout, native mobile responsiveness, and clear conversion pathways.',
        imageUrl: '/src/assets/images/project_web_platform_1795087682682.jpg',
        imageAlt:
          'Studio display presenting a modern corporate website interface in white, charcoal, and crimson red',
        deliverables: [
          'Web art direction',
          'React & TypeScript engineering',
          'SEO-ready semantic structure',
          'Project qualification form',
        ],
      },
      {
        id: 'systeme-identite-marque',
        categoryKey: 'identity',
        categoryLabel: 'Brand Identity',
        title: 'Brand Identity & Stationery System',
        scopeLabel: 'Logotype · Brand Guidelines · Stationery',
        summary:
          'Creation of a cohesive visual identity uniting a geometric emblem, architectural typography, and tactile print stationery.',
        description:
          'A complete brand system engineered for immediate recognition across every touchpoint: vector logotype, color rules, business cards, presentation folders, and official corporate templates.',
        imageUrl: '/src/assets/images/project_brand_identity_1795087682841.jpg',
        imageAlt:
          'Minimalist black, white, and red corporate stationery and business cards arranged on textured cotton paper',
        deliverables: [
          'Logotype & monogram design',
          'Complete brand guidelines',
          'Business cards & corporate folder',
          'Official document templates',
        ],
      },
      {
        id: 'collection-supports-print',
        categoryKey: 'graphic',
        categoryLabel: 'Graphic Design',
        title: 'Editorial Flyers & Promotional Print Series',
        scopeLabel: 'Print · Flyers · Editorial',
        summary:
          'Graphic design of flyers, folded brochures, and advertising collateral driven by strong typographic contrast to showcase commercial offers.',
        description:
          'Print design focused on legibility and visual authority. Every piece follows precise Swiss grid geometry, balanced white space, crimson highlights, and press-ready CMYK production specs.',
        imageUrl: '/src/assets/images/project_print_flyer_1795087683054.jpg',
        imageAlt:
          'Modern white, black, and red promotional flyers and brochures arranged on a light stone studio table',
        deliverables: [
          'Double-sided promotional flyers',
          'Corporate folders & brochures',
          'Modular typographic grid',
          'High-resolution CMYK print prep',
        ],
      },
    ],
  },
  method: {
    kicker: 'Our Process',
    heading: 'A clear workflow structured in four steps.',
    steps: [
      {
        number: '01',
        title: 'Discovery & Alignment',
        description:
          'We analyze your goals, audience, and constraints to establish a clear, realistic project roadmap from day one.',
      },
      {
        number: '02',
        title: 'Proposal & Design',
        description:
          'We define the information architecture, art direction, and bespoke wireframes, validating every milestone together.',
      },
      {
        number: '03',
        title: 'Development & Creation',
        description:
          'We bring your project to life with reliable code, refined visuals, and relentless attention to speed and detail.',
      },
      {
        number: '04',
        title: 'Launch & Support',
        description:
          'Production deployment, delivery of final assets, and ongoing post-launch guidance to keep your tools performing.',
      },
    ],
  },
  cta: {
    kicker: 'Ready to get started?',
    heading: "Have a project in mind? Let's build it together.",
    buttonLabel: 'Discuss Your Project',
  },
  contact: {
    kicker: 'Contact',
    heading: "Let's talk about your next digital project.",
    intro:
      'Share your requirements through the form alongside. Every inquiry goes directly to our team so we can get back to you with a tailored response.',
    availabilityLabel: 'Availability & response time',
    availabilityValue: 'Remote collaboration & scheduled consultations',
    responseDelayValue: 'Reply within 24 to 48 business hours',
    emailLabel: 'Email address',
    phoneLabel: 'Phone',
    locationLabel: 'Location',
    form: {
      fullNameLabel: 'Full Name',
      fullNamePlaceholder: 'Your first and last name',
      emailLabel: 'Email Address',
      emailPlaceholder: 'name@company.com',
      projectTypeLabel: 'Project Type',
      messageLabel: 'Message',
      messagePlaceholder:
        'Tell us about your goals, timeline, and desired features...',
      charactersUnit: 'characters',
      requiredNotePrefix: 'Fields marked with',
      requiredNoteSuffix: 'are required.',
      submitButton: 'Send message',
      submittingButton: 'Sending...',
      projectTypeOptions: [
        { id: 'sites-web', label: 'Professional Website Creation' },
        { id: 'dev-sur-mesure', label: 'Custom Web Development' },
        { id: 'design-graphique', label: 'Graphic Design' },
        {
          id: 'flyers-publicitaires',
          label: 'Flyers & Advertising Collateral',
        },
        { id: 'identite-visuelle', label: 'Brand Identity Systems' },
        {
          id: 'solutions-personnalisees',
          label: 'Tailored Digital Solutions',
        },
        { id: 'autre', label: 'Other Inquiry' },
      ],
      validation: {
        fullName: 'Please enter your full name (minimum 2 characters).',
        emailRequired: 'Please enter your email address.',
        emailInvalid: 'Please enter a valid email address.',
        projectTypeRequired: 'Please select a project type.',
        messageMinLength:
          'Please briefly describe your project (minimum 15 characters) so we can assist you effectively.',
      },
      genericError: 'An error occurred. Please try again.',
      networkError:
        'Unable to reach the server. Please check your internet connection and try again.',
      errorByCode: {
        RATE_LIMIT:
          'Too many messages sent recently. Please wait a few minutes before trying again.',
        SPAM: 'Request rejected by anti-spam protection.',
        TOO_FAST: 'Submission detected as too fast. Please try again.',
        INVALID_NAME: 'Full name must be between 2 and 120 characters.',
        INVALID_EMAIL: 'Please provide a valid email address.',
        INVALID_PROJECT_TYPE: 'Please select a valid project type.',
        INVALID_MESSAGE: 'Message must be between 15 and 5000 characters.',
        SERVICE_UNAVAILABLE:
          'The message delivery service is temporarily unavailable. Please try again later.',
        RESEND_ERROR:
          'Unable to deliver your message right now. Please try again in a moment.',
        SERVER_ERROR: 'An error occurred. Please try again.',
        INVALID_JSON: 'Invalid request format.',
        NETWORK_ERROR:
          'Unable to reach the server. Please check your internet connection and try again.',
      },
      successBadge: 'Confirmed',
      successHeading: 'Message sent successfully!',
      successMessage:
        'Your message has been sent successfully! We will get back to you shortly.',
      sendAnotherButton: 'Send Another Message',
    },
  },
  footer: {
    shortDescription:
      'Digital services agency dedicated to professional website creation, custom web development, and brand design.',
    navigationTitle: 'Navigation',
    servicesTitle: 'Services',
    contactTitle: 'Contact & Socials',
    methodLink: 'Our Process',
    rightsReserved: 'All rights reserved.',
    slogan: 'Bringing your digital ideas to life.',
  },
  notFound: {
    code: '404',
    kicker: 'Page Not Found',
    heading: 'This page does not exist or has been moved.',
    description:
      'The link you followed may be outdated or mistyped. Return to the VENARY homepage to explore our services or reach out directly.',
    backHome: 'Back to Home',
    contactUs: 'Contact Us',
  },
};

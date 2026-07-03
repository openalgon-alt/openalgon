export const SITE_URL = 'https://openalgon.com';
export const SITE_NAME = 'OpenAlgon';
export const SITE_TWITTER = '@OpenAlgon';
export const OG_IMAGE = `${SITE_URL}/og-image.png`;

/**
 * Master keyword list — covers brand, services, location, startup & cybersecurity verticals.
 * These are injected globally in index.html and supplemented per-page.
 */
export const GLOBAL_KEYWORDS = [
  // Brand
  'OpenAlgon',
  'Open Algon',
  'openalgon',
  'openalgon.com',
  'Openalgon Bangalore',
  'OpenAlgon tech',
  // Core services
  'tech solutions',
  'technology solutions',
  'technology company',
  'software company',
  'IT company India',
  'software development company',
  'custom software development',
  'digital solutions',
  'intelligent technology solutions',
  'technology partner',
  // Cybersecurity
  'cybersecurity solutions',
  'cyber security company',
  'cyber security solutions India',
  'network security',
  'data security',
  'information security',
  'application security',
  'cloud security',
  'cybersecurity Bangalore',
  'IT security',
  'managed security services',
  'security compliance',
  // AI & Automation
  'AI solutions',
  'artificial intelligence',
  'machine learning',
  'AI automation',
  'intelligent automation',
  'AI company India',
  'AI startup Bangalore',
  'workflow automation',
  'robotic process automation',
  'LLM solutions',
  'generative AI',
  // Web & Mobile
  'web development',
  'web application development',
  'mobile app development',
  'React development',
  'full stack development',
  'enterprise software',
  'SaaS development',
  'API development',
  // Cloud & DevOps
  'cloud solutions',
  'cloud infrastructure',
  'DevOps services',
  'AWS solutions',
  'Azure solutions',
  'cloud migration',
  'cloud engineering',
  'microservices',
  'Kubernetes',
  // Startup & Budget
  'best startup in Bangalore',
  'top startup Bangalore',
  'startup technology company',
  'tech startup India',
  'startup solutions India',
  'low budget tech solutions',
  'affordable software development',
  'affordable tech solutions',
  'budget-friendly IT solutions',
  'low cost software development',
  'cost-effective technology',
  'startup MVP development',
  'startup consulting Bangalore',
  'startup digital transformation',
  'SaaS startup Bangalore',
  'product startup India',
  // Location
  'Bangalore tech company',
  'Bengaluru tech company',
  'Mahadevpura Bangalore',
  'India software company',
  'Bengaluru IT company',
  'Karnataka tech startup',
  'Bangalore IT services',
  'Bengaluru software development',
  'Bangalore startup ecosystem',
  'India tech solutions',
  // Engineering
  'product engineering',
  'MVP development',
  'digital transformation',
  'enterprise solutions',
  'digital engineering',
  'software engineering services',
  'technology consulting',
  'IT consulting India',
].join(', ');

export type PageSEO = {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  ogImage?: string;
};

export const pageSEO: Record<string, PageSEO> = {
  home: {
    title: 'OpenAlgon — Intelligent Technology Solutions | Best Tech Startup Bangalore',
    description:
      'OpenAlgon is Bangalore\'s leading tech startup delivering AI, automation, cybersecurity, web & mobile development, and cloud solutions at startup-friendly pricing. Build smarter — from MVP to enterprise scale.',
    keywords: `${GLOBAL_KEYWORDS}, homepage, intelligent systems, modern enterprise, OpenAlgon home`,
    canonical: SITE_URL,
  },
  services: {
    title: 'Services — AI, Cybersecurity, Web & Cloud | OpenAlgon Bangalore',
    description:
      'Explore OpenAlgon\'s full service portfolio: AI & automation, cybersecurity solutions, web & mobile app development, product engineering, and cloud & DevOps. Affordable tech solutions for startups and enterprises in Bangalore.',
    keywords: `${GLOBAL_KEYWORDS}, services, AI services, cybersecurity services, web development services, cloud DevOps services, affordable services Bangalore`,
    canonical: `${SITE_URL}/services`,
  },
  industries: {
    title: 'Industries We Serve — Startups, SaaS, Enterprise | OpenAlgon',
    description:
      'OpenAlgon serves startups, SaaS companies, enterprises, agencies, retail, education, and finance sectors in Bangalore and across India. Domain expertise with low-budget tech solutions.',
    keywords: `${GLOBAL_KEYWORDS}, industries, startups SaaS, enterprise technology, agency partner, retail tech, edtech, fintech Bangalore`,
    canonical: `${SITE_URL}/industries`,
  },
  pricing: {
    title: 'Pricing — Affordable Tech Plans for Startups | OpenAlgon Bangalore',
    description:
      'Transparent, startup-friendly pricing from OpenAlgon. Starter, Growth, and Enterprise plans — value-based pricing with no hidden fees. Low-budget technology solutions in Bangalore, India.',
    keywords: `${GLOBAL_KEYWORDS}, pricing, affordable plans, startup pricing, low budget software, cost-effective IT, cheap tech solutions Bangalore, software pricing India`,
    canonical: `${SITE_URL}/pricing`,
  },
  company: {
    title: 'About OpenAlgon — Best Startup Bangalore | Our Story & Mission',
    description:
      'Learn about OpenAlgon, one of Bangalore\'s best tech startups. Our mission is to empower businesses with intelligent technology. Based in Mahadevpura, Bangalore, serving clients globally.',
    keywords: `${GLOBAL_KEYWORDS}, about OpenAlgon, company, mission, vision, Bangalore startup story, tech company India, Open Algon team`,
    canonical: `${SITE_URL}/company`,
  },
  careers: {
    title: 'Careers at OpenAlgon — Tech Jobs in Bangalore | Join Our Startup',
    description:
      'Join OpenAlgon, Bangalore\'s fastest-growing tech startup. Open positions in AI engineering, full stack development, DevOps, cybersecurity, design, and more. Remote & Bangalore-based roles.',
    keywords: `${GLOBAL_KEYWORDS}, careers, jobs Bangalore, tech jobs India, AI engineer jobs, software developer jobs Bangalore, startup careers, join OpenAlgon`,
    canonical: `${SITE_URL}/careers`,
  },
  contact: {
    title: 'Contact OpenAlgon — Get a Free Tech Consultation | Bangalore',
    description:
      'Contact OpenAlgon for a free technology consultation. Reach us at info@openalgon.com or +91 9742182343. Office in Mahadevpura, Bangalore. We respond within 24 hours.',
    keywords: `${GLOBAL_KEYWORDS}, contact OpenAlgon, get in touch, tech consultation, Bangalore tech company contact, Open Algon phone, Open Algon email`,
    canonical: `${SITE_URL}/contact`,
  },
  resources: {
    title: 'Resources — AI & Tech Insights | OpenAlgon Blog Bangalore',
    description:
      'Explore OpenAlgon\'s resource library: articles on AI, automation, cybersecurity, cloud engineering, and digital transformation. Expert insights from Bangalore\'s leading tech startup.',
    keywords: `${GLOBAL_KEYWORDS}, resources, blog, AI articles, tech insights, cybersecurity guides, digital transformation case studies, Bangalore tech blog`,
    canonical: `${SITE_URL}/resources`,
  },
  admin: {
    title: 'Admin — OpenAlgon Internal Dashboard',
    description: 'OpenAlgon admin dashboard for managing internship listings and applications.',
    keywords: 'admin, dashboard, internship management',
    canonical: `${SITE_URL}/admin`,
  },
};

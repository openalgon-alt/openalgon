import { useEffect } from 'react';
import { SITE_URL, SITE_NAME } from '@/lib/seo';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'OpenAlgon',
  alternateName: ['Open Algon', 'openalgon'],
  url: SITE_URL,
  logo: `${SITE_URL}/Balgin-black.png`,
  description:
    'OpenAlgon is a Bangalore-based technology company providing AI solutions, cybersecurity services, web & mobile development, cloud solutions, and digital transformation for startups and enterprises.',
  foundingDate: '2023',
  founders: [{ '@type': 'Person', name: 'OpenAlgon Founding Team' }],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Mahadevpura',
    addressLocality: 'Bangalore',
    addressRegion: 'Karnataka',
    postalCode: '560048',
    addressCountry: 'IN',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+91-9742182343',
      contactType: 'customer service',
      email: 'info@openalgon.com',
      areaServed: ['IN', 'US', 'GB'],
      availableLanguage: ['English'],
    },
  ],
  sameAs: [
    'https://www.linkedin.com/company/openalgon',
    'https://twitter.com/OpenAlgon',
    'https://github.com/openalgon',
  ],
  knowsAbout: [
    'Artificial Intelligence',
    'Cybersecurity',
    'Cloud Computing',
    'Software Development',
    'Machine Learning',
    'DevOps',
    'Digital Transformation',
  ],
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_URL}/#local-business`,
  name: 'OpenAlgon',
  image: `${SITE_URL}/Balgin-black.png`,
  description:
    'OpenAlgon — Best tech startup in Bangalore providing affordable AI, cybersecurity, and software development solutions.',
  url: SITE_URL,
  telephone: '+91-9742182343',
  email: 'info@openalgon.com',
  priceRange: '₹₹',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Mahadevpura',
    addressLocality: 'Bangalore',
    addressRegion: 'Karnataka',
    postalCode: '560048',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 12.9958,
    longitude: 77.6972,
  },
  openingHours: 'Mo-Fr 09:00-18:00',
  areaServed: {
    '@type': 'Country',
    name: 'India',
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  description: 'OpenAlgon — Intelligent Technology Solutions for Startups and Enterprises',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

const servicesSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'OpenAlgon Services',
  description: 'Technology services offered by OpenAlgon',
  itemListElement: [
    {
      '@type': 'Service',
      position: 1,
      name: 'AI & Automation Solutions',
      description: 'Intelligent agents, workflow automation, and advanced analytics powered by AI and machine learning.',
      provider: { '@type': 'Organization', name: 'OpenAlgon' },
      areaServed: 'India',
      serviceType: 'AI Technology',
    },
    {
      '@type': 'Service',
      position: 2,
      name: 'Cybersecurity Solutions',
      description: 'Comprehensive cybersecurity services including network security, data security, and compliance for startups and enterprises.',
      provider: { '@type': 'Organization', name: 'OpenAlgon' },
      areaServed: 'India',
      serviceType: 'Cybersecurity',
    },
    {
      '@type': 'Service',
      position: 3,
      name: 'Web & Mobile App Development',
      description: 'Enterprise-grade web and mobile application development tailored for startups and growing businesses.',
      provider: { '@type': 'Organization', name: 'OpenAlgon' },
      areaServed: 'India',
      serviceType: 'Software Development',
    },
    {
      '@type': 'Service',
      position: 4,
      name: 'Cloud & DevOps',
      description: 'Cloud infrastructure setup, migration, and DevOps automation for scalable and reliable systems.',
      provider: { '@type': 'Organization', name: 'OpenAlgon' },
      areaServed: 'India',
      serviceType: 'Cloud Services',
    },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is OpenAlgon?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'OpenAlgon is a technology company based in Bangalore, India. We provide AI solutions, cybersecurity services, web & mobile app development, cloud infrastructure, and digital transformation services at startup-friendly pricing.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where is OpenAlgon located?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'OpenAlgon is headquartered in Mahadevpura, Bangalore, Karnataka, India. We serve clients globally.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does OpenAlgon offer affordable tech solutions for startups?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! OpenAlgon specializes in low-budget, cost-effective technology solutions for startups. Our Starter plan begins from $15K, and we offer flexible pricing for Indian startups and businesses.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does OpenAlgon provide cybersecurity services?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, OpenAlgon provides comprehensive cybersecurity solutions including network security, data security, application security, cloud security, and IT security compliance for businesses in Bangalore and across India.',
      },
    },
  ],
};

const schemas = [organizationSchema, localBusinessSchema, websiteSchema, servicesSchema, faqSchema];

/**
 * StructuredData — Injects JSON-LD structured data schemas into <head>.
 * Covers Organization, LocalBusiness, WebSite (with SearchAction), Services ItemList, and FAQ.
 */
const StructuredData = () => {
  useEffect(() => {
    const scriptId = 'openalgon-structured-data';
    let existing = document.getElementById(scriptId);
    if (!existing) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(schemas);
      document.head.appendChild(script);
    }

    return () => {
      // Keep structured data persistent — only remove if unmounting root
    };
  }, []);

  return null;
};

export default StructuredData;

import { useEffect } from 'react';
import { OG_IMAGE, SITE_NAME, SITE_TWITTER } from '@/lib/seo';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  ogImage?: string;
}

/**
 * SEOHead — dynamically updates the document <head> for each page.
 * Covers: title, description, keywords, canonical, Open Graph, Twitter Card.
 */
const SEOHead = ({
  title,
  description,
  keywords,
  canonical,
  ogImage = OG_IMAGE,
}: SEOHeadProps) => {
  useEffect(() => {
    // Title
    document.title = title;

    const setMeta = (selector: string, attribute: string, value: string) => {
      let el = document.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement('meta');
        document.head.appendChild(el);
      }
      el.setAttribute(attribute, value);
    };

    const setLink = (rel: string, href: string) => {
      let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement('link');
        el.rel = rel;
        document.head.appendChild(el);
      }
      el.href = href;
    };

    // Standard meta
    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[name="keywords"]', 'content', keywords);
    setMeta('meta[name="robots"]', 'content', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

    // Open Graph
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:url"]', 'content', canonical);
    setMeta('meta[property="og:image"]', 'content', ogImage);
    setMeta('meta[property="og:type"]', 'content', 'website');
    setMeta('meta[property="og:site_name"]', 'content', SITE_NAME);
    setMeta('meta[property="og:locale"]', 'content', 'en_IN');

    // Twitter Card
    setMeta('meta[name="twitter:title"]', 'content', title);
    setMeta('meta[name="twitter:description"]', 'content', description);
    setMeta('meta[name="twitter:image"]', 'content', ogImage);
    setMeta('meta[name="twitter:card"]', 'content', 'summary_large_image');
    setMeta('meta[name="twitter:site"]', 'content', SITE_TWITTER);

    // Canonical
    setLink('canonical', canonical);
  }, [title, description, keywords, canonical, ogImage]);

  return null;
};

export default SEOHead;

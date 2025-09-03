/**
 * Schema.org structured data utilities for local businesses
 * Supports LocalBusiness, MedicalClinic, Organization, and other business types
 */

import { getBusinessName, getBusinessDescription, getContactEmail, getContactPhone, getBusinessAddress, getBusinessCoordinates, getBusinessHours, getSocialLinks, getLegalInfo } from '../config/site.config';

export interface LocalBusinessSchema {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  url: string;
  telephone: string;
  email: string;
  address: {
    '@type': string;
    streetAddress: string;
    addressLocality: string;
    postalCode: string;
    addressCountry: string;
    addressRegion?: string;
  };
  geo?: {
    '@type': string;
    latitude: number;
    longitude: number;
  };
  openingHoursSpecification: Array<{
    '@type': string;
    dayOfWeek: string[];
    opens: string;
    closes: string;
  }>;
  sameAs?: string[];
  logo?: string;
  image?: string;
  priceRange?: string;
  currenciesAccepted?: string;
  paymentAccepted?: string[];
  areaServed?: {
    '@type': string;
    name: string;
  };
}

export interface MedicalClinicSchema extends LocalBusinessSchema {
  '@type': 'MedicalClinic';
  medicalSpecialty: string[];
  numberOfEmployees?: number;
  hasOfferCatalog?: {
    '@type': string;
    name: string;
    itemListElement: Array<{
      '@type': string;
      name: string;
      description: string;
      offers?: {
        '@type': string;
        price: number;
        priceCurrency: string;
      };
    }>;
  };
}

export interface ServiceProviderSchema extends LocalBusinessSchema {
  '@type': 'LocalBusiness';
  serviceArea?: {
    '@type': string;
    name: string;
  };
  hasOfferCatalog?: {
    '@type': string;
    name: string;
    itemListElement: Array<{
      '@type': string;
      name: string;
      description: string;
      offers?: {
        '@type': string;
        price: number;
        priceCurrency: string;
      };
    }>;
  };
}

export interface OrganizationSchema {
  '@type': 'Organization';
  name: string;
  description: string;
  url: string;
  logo?: string;
  image?: string;
  address: {
    '@type': string;
    streetAddress: string;
    addressLocality: string;
    postalCode: string;
    addressCountry: string;
    addressRegion?: string;
  };
  contactPoint?: {
    '@type': string;
    telephone: string;
    contactType: string;
    email?: string;
  };
  sameAs?: string[];
  foundingDate?: string;
  numberOfEmployees?: number;
  vatID?: string;
  taxID?: string;
}

export interface FAQSchema {
  '@type': 'FAQPage';
  mainEntity: Array<{
    '@type': 'Question';
    name: string;
    acceptedAnswer: {
      '@type': 'Answer';
      text: string;
    };
  }>;
}

export interface ReviewSchema {
  '@type': 'Review';
  reviewRating: {
    '@type': 'Rating';
    ratingValue: number;
    bestRating: number;
    worstRating: number;
  };
  author: {
    '@type': 'Person';
    name: string;
  };
  reviewBody: string;
  datePublished: string;
  itemReviewed: {
    '@type': 'LocalBusiness';
    name: string;
  };
}

export interface BreadcrumbSchema {
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item: string;
  }>;
}

/**
 * Convert business hours to schema format
 */
function convertBusinessHoursToSchema(hours: Record<string, string>): Array<{
  '@type': string;
  dayOfWeek: string[];
  opens: string;
  closes: string;
}> {
  const dayMapping: Record<string, string> = {
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    sunday: 'Sunday',
  };

  const openingHours: Array<{
    '@type': string;
    dayOfWeek: string[];
    opens: string;
    closes: string;
  }> = [];

  Object.entries(hours).forEach(([day, hoursString]) => {
    if (hoursString.toLowerCase() !== 'closed') {
      const [opens, closes] = hoursString.split(' - ');
      if (opens && closes) {
        openingHours.push({
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [dayMapping[day]],
          opens: opens.trim(),
          closes: closes.trim(),
        });
      }
    }
  });

  return openingHours;
}

/**
 * Generate LocalBusiness schema
 */
export function generateLocalBusinessSchema(
  businessType: 'LocalBusiness' | 'MedicalClinic' = 'LocalBusiness',
  additionalData: Record<string, unknown> = {}
): LocalBusinessSchema | MedicalClinicSchema {
  const baseSchema: LocalBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': businessType,
    name: getBusinessName(),
    description: getBusinessDescription(),
    url: '',
    telephone: getContactPhone(),
    email: getContactEmail(),
    address: {
      '@type': 'PostalAddress',
      streetAddress: '', // Will be filled from config
      addressLocality: '', // Will be filled from config
      postalCode: '', // Will be filled from config
      addressCountry: '', // Will be filled from config
    },
    openingHoursSpecification: convertBusinessHoursToSchema(getBusinessHours() as unknown as Record<string, string>),
    sameAs: Object.values(getSocialLinks()).filter(Boolean),
    ...additionalData,
  };

  // Add geo coordinates if available
  const coordinates = getBusinessCoordinates();
  if (coordinates) {
    baseSchema.geo = {
      '@type': 'GeoCoordinates',
      latitude: coordinates.lat,
      longitude: coordinates.lng,
    };
  }

  // Add address details
  const address = getBusinessAddress();
  const addressParts = address.split(', ');
  if (addressParts.length >= 3) {
    baseSchema.address.streetAddress = addressParts[0];
    baseSchema.address.postalCode = addressParts[1];
    baseSchema.address.addressLocality = addressParts[2];
    baseSchema.address.addressCountry = addressParts[3] || 'Greece';
  }

  if (businessType === 'MedicalClinic') {
    return {
      ...baseSchema,
      '@type': 'MedicalClinic',
      medicalSpecialty: additionalData.medicalSpecialty || [],
    } as MedicalClinicSchema;
  }

  return baseSchema;
}

/**
 * Generate Organization schema
 */
export function generateOrganizationSchema(additionalData: Record<string, unknown> = {}): OrganizationSchema {
  const legalInfo = getLegalInfo();
  
  return {
    '@type': 'Organization',
    name: getBusinessName(),
    description: getBusinessDescription(),
    url: '',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '', // Will be filled from config
      addressLocality: '', // Will be filled from config
      postalCode: '', // Will be filled from config
      addressCountry: '', // Will be filled from config
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: getContactPhone(),
      contactType: 'customer service',
      email: getContactEmail(),
    },
    sameAs: Object.values(getSocialLinks()).filter(Boolean),
    vatID: legalInfo.vatNumber,
    taxID: legalInfo.registrationNumber,
    ...additionalData,
  };
}

/**
 * Generate FAQ schema
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>): FAQSchema {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate Review schema
 */
export function generateReviewSchema(
  rating: number,
  author: string,
  reviewBody: string,
  datePublished: string
): ReviewSchema {
  return {
    '@type': 'Review',
    reviewRating: {
      '@type': 'Rating',
      ratingValue: rating,
      bestRating: 5,
      worstRating: 1,
    },
    author: {
      '@type': 'Person',
      name: author,
    },
    reviewBody,
    datePublished,
    itemReviewed: {
      '@type': 'LocalBusiness',
      name: getBusinessName(),
    },
  };
}

/**
 * Generate Breadcrumb schema
 */
export function generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>): BreadcrumbSchema {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

/**
 * Generate Service schema
 */
export function generateServiceSchema(
  name: string,
  description: string,
  price?: number,
  currency: string = 'EUR'
): Record<string, unknown> {
  return {
    '@type': 'Service',
    name,
    description,
    provider: {
      '@type': 'LocalBusiness',
      name: getBusinessName(),
    },
    ...(price && {
      offers: {
        '@type': 'Offer',
        price,
        priceCurrency: currency,
      },
    }),
  };
}

/**
 * Generate Person schema for team members
 */
export function generatePersonSchema(
  name: string,
  jobTitle: string,
  description?: string,
  image?: string,
  credentials?: string[]
): Record<string, unknown> {
  return {
    '@type': 'Person',
    name,
    jobTitle,
    description,
    image,
    worksFor: {
      '@type': 'Organization',
      name: getBusinessName(),
    },
    ...(credentials && {
      hasCredential: credentials.map(cred => ({
        '@type': 'EducationalOccupationalCredential',
        name: cred,
      })),
    }),
  };
}

/**
 * Generate WebSite schema
 */
export function generateWebSiteSchema(): Record<string, unknown> {
  /**
   * Safely resolve the current origin in browser environments while staying SSR-safe
   */
  function getBrowserOrigin(): string {
    try {
      const g = globalThis as unknown as { location?: { origin?: string } } & { window?: { location?: { origin?: string } } };
      const origin = g?.location?.origin ?? g?.window?.location?.origin;
      return typeof origin === 'string' ? origin : '';
    } catch {
      return '';
    }
  }

  return {
    '@type': 'WebSite',
    name: getBusinessName(),
    description: getBusinessDescription(),
    url: '',
    publisher: {
      '@type': 'Organization',
      name: getBusinessName(),
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${getBrowserOrigin()}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Generate WebPage schema
 */
export function generateWebPageSchema(
  name: string,
  description: string,
  url: string,
  isPartOf?: string
): Record<string, unknown> {
  return {
    '@type': 'WebPage',
    name,
    description,
    url,
    isPartOf: isPartOf || {
      '@type': 'WebSite',
      name: getBusinessName(),
    },
    publisher: {
      '@type': 'Organization',
      name: getBusinessName(),
    },
  };
}

/**
 * Combine multiple schemas
 */
export function combineSchemas(...schemas: Record<string, unknown>[]): Record<string, unknown>[] {
  return schemas.filter(Boolean);
}

/**
 * Generate schema script tag
 */
export function generateSchemaScript(schema: Record<string, unknown>): string {
  return `<script type="application/ld+json">${JSON.stringify(schema, null, 2)}</script>`;
}

/**
 * Generate multiple schema script tags
 */
export function generateSchemaScripts(schemas: Record<string, unknown>[]): string {
  return schemas.map(generateSchemaScript).join('\n');
}

/**
 * Validate schema against schema.org
 */
export function validateSchema(schema: Record<string, unknown>): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!schema['@context']) {
    errors.push('Missing @context');
  }
  
  if (!schema['@type']) {
    errors.push('Missing @type');
  }
  
  if (!schema.name) {
    errors.push('Missing name');
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
}

// Export default schemas
export const defaultSchemas = {
  localBusiness: () => generateLocalBusinessSchema(),
  organization: () => generateOrganizationSchema(),
  website: () => generateWebSiteSchema(),
};

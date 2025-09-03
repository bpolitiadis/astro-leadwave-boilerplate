/**
 * Site configuration for easy customization per client
 * This file contains all the business-specific information that can be easily swapped
 */

export interface BusinessInfo {
  name: string;
  tagline?: string;
  description: string;
  url: string;
  logo?: string;
  favicon?: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
    region?: string;
  };
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface BusinessHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

export interface SocialLinks {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
  whatsapp?: string;
  github?: string;
}

export interface LegalInfo {
  vatNumber?: string;
  registrationNumber?: string;
  privacyPolicyUrl: string;
  termsOfServiceUrl: string;
  cookiePolicyUrl?: string;
}

export interface AnalyticsConfig {
  googleAnalytics?: string;
  plausible?: string;
  umami?: string;
  sentry?: string;
}

export interface ConsentConfig {
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
  required: boolean;
}

export interface SiteConfig {
  business: BusinessInfo;
  contact: ContactInfo;
  hours: BusinessHours;
  social: SocialLinks;
  legal: LegalInfo;
  analytics: AnalyticsConfig;
  consent: ConsentConfig;
  languages: string[];
  defaultLanguage: string;
  currency: string;
  timezone: string;
}

// Default configuration - replace with client-specific values
export const siteConfig: SiteConfig = {
  business: {
    name: 'Astro Tailwind Boilerplate',
    tagline: 'Production-ready boilerplate for modern web development',
    description: 'Production-ready Astro + Tailwind CSS boilerplate with TypeScript, ESLint, Prettier, Playwright, and SEO optimization',
    url: 'https://your-domain.com',
    logo: '/logo.svg',
    favicon: '/favicon.svg',
  },
  
  contact: {
    email: 'hello@example.com',
    phone: '+1 (555) 123-4567',
    address: {
      street: '123 Main Street',
      city: 'Athens',
      postalCode: '106 78',
      country: 'Greece',
      region: 'Attica',
    },
    coordinates: {
      lat: 37.9755,
      lng: 23.7348,
    },
  },
  
  hours: {
    monday: '9:00 AM - 6:00 PM',
    tuesday: '9:00 AM - 6:00 PM',
    wednesday: '9:00 AM - 6:00 PM',
    thursday: '9:00 AM - 6:00 PM',
    friday: '9:00 AM - 6:00 PM',
    saturday: '10:00 AM - 4:00 PM',
    sunday: 'Closed',
  },
  
  social: {
    facebook: 'https://facebook.com/yourbusiness',
    twitter: 'https://twitter.com/yourbusiness',
    instagram: 'https://instagram.com/yourbusiness',
    linkedin: 'https://linkedin.com/company/yourbusiness',
    youtube: 'https://youtube.com/yourbusiness',
    whatsapp: 'https://wa.me/1234567890',
    github: 'https://github.com/yourbusiness',
  },
  
  legal: {
    vatNumber: 'GR123456789',
    registrationNumber: '123456789',
    privacyPolicyUrl: '/privacy',
    termsOfServiceUrl: '/terms',
    cookiePolicyUrl: '/cookies',
  },
  
  analytics: {
    googleAnalytics: 'GA_MEASUREMENT_ID',
    plausible: 'your-domain.com',
    umami: 'https://analytics.yourdomain.com',
    sentry: 'YOUR_SENTRY_DSN',
  },
  
  consent: {
    analytics: true,
    marketing: true,
    functional: true,
    required: true,
  },
  
  languages: ['en', 'el'],
  defaultLanguage: 'en',
  currency: 'EUR',
  timezone: 'Europe/Athens',
};

// Helper functions for common configurations
export function getBusinessName(): string {
  return siteConfig.business.name;
}

export function getBusinessDescription(): string {
  return siteConfig.business.description;
}

export function getContactEmail(): string {
  return siteConfig.contact.email;
}

export function getContactPhone(): string {
  return siteConfig.contact.phone;
}

export function getBusinessAddress(): string {
  const { address } = siteConfig.contact;
  return `${address.street}, ${address.postalCode} ${address.city}, ${address.country}`;
}

export function getBusinessCoordinates(): { lat: number; lng: number } | null {
  return siteConfig.contact.coordinates || null;
}

export function getSocialLinks(): SocialLinks {
  return siteConfig.social;
}

export function getBusinessHours(): BusinessHours {
  return siteConfig.hours;
}

export function getLegalInfo(): LegalInfo {
  return siteConfig.legal;
}

export function getAnalyticsConfig(): AnalyticsConfig {
  return siteConfig.analytics;
}

export function getConsentConfig(): ConsentConfig {
  return siteConfig.consent;
}

export function getSupportedLanguages(): string[] {
  return siteConfig.languages;
}

export function getDefaultLanguage(): string {
  return siteConfig.defaultLanguage;
}

export function getCurrency(): string {
  return siteConfig.currency;
}

export function getTimezone(): string {
  return siteConfig.timezone;
}

// Business type specific configurations
export interface MedicalClinicConfig extends SiteConfig {
  specialties: string[];
  doctors: Array<{
    name: string;
    specialty: string;
    credentials: string[];
    photo?: string;
  }>;
  services: Array<{
    name: string;
    description: string;
    price?: number;
  }>;
}

export interface ServiceProviderConfig extends SiteConfig {
  services: Array<{
    name: string;
    description: string;
    price?: number;
    category: string;
  }>;
  team: Array<{
    name: string;
    role: string;
    bio: string;
    photo?: string;
  }>;
  certifications: string[];
}

// Example configurations for different business types
export const medicalClinicConfig: MedicalClinicConfig = {
  ...siteConfig,
  business: {
    ...siteConfig.business,
    name: 'Athens Medical Clinic',
    tagline: 'Your health, our priority',
    description: 'Leading medical clinic in Athens providing comprehensive healthcare services with experienced doctors and modern facilities.',
  },
  specialties: [
    'General Medicine',
    'Cardiology',
    'Dermatology',
    'Pediatrics',
    'Gynecology',
    'Orthopedics',
  ],
  doctors: [
    {
      name: 'Dr. Maria Papadopoulos',
      specialty: 'General Medicine',
      credentials: ['MD', 'PhD'],
    },
    {
      name: 'Dr. Nikos Georgiou',
      specialty: 'Cardiology',
      credentials: ['MD', 'FACC'],
    },
  ],
  services: [
    {
      name: 'General Consultation',
      description: 'Comprehensive health check-up and consultation',
      price: 50,
    },
    {
      name: 'Cardiology Consultation',
      description: 'Specialized heart health assessment',
      price: 80,
    },
  ],
};

export const serviceProviderConfig: ServiceProviderConfig = {
  ...siteConfig,
  business: {
    ...siteConfig.business,
    name: 'Athens Electric Services',
    tagline: 'Professional electrical services for your home and business',
    description: 'Licensed electricians providing reliable electrical services in Athens and surrounding areas.',
  },
  services: [
    {
      name: 'Electrical Installation',
      description: 'Complete electrical system installation for new buildings',
      price: 500,
      category: 'Installation',
    },
    {
      name: 'Electrical Repair',
      description: 'Fast and reliable electrical repair services',
      price: 80,
      category: 'Repair',
    },
  ],
  team: [
    {
      name: 'Yannis Kostas',
      role: 'Master Electrician',
      bio: '20+ years of experience in electrical services',
    },
  ],
  certifications: [
    'Licensed Electrician',
    'ISO 9001 Certified',
    'Safety Certified',
  ],
};

// Configuration validation
export function validateSiteConfig(config: SiteConfig): string[] {
  const errors: string[] = [];
  
  if (!config.business.name) {
    errors.push('Business name is required');
  }
  
  if (!config.business.description) {
    errors.push('Business description is required');
  }
  
  if (!config.contact.email) {
    errors.push('Contact email is required');
  }
  
  if (!config.contact.phone) {
    errors.push('Contact phone is required');
  }
  
  if (!config.legal.privacyPolicyUrl) {
    errors.push('Privacy policy URL is required');
  }
  
  if (!config.legal.termsOfServiceUrl) {
    errors.push('Terms of service URL is required');
  }
  
  return errors;
}

// Export default configuration
export default siteConfig;

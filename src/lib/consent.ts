/**
 * GDPR Consent Management System
 * Handles user consent for analytics, marketing, and functional cookies
 */

import { getConsentConfig } from '../config/site.config';

export interface ConsentPreferences {
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
  required: boolean;
}

export interface ConsentState {
  hasConsented: boolean;
  preferences: ConsentPreferences;
  timestamp: number;
  version: string;
}

export interface ConsentConfig {
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
  required: boolean;
}

const CONSENT_VERSION = '1.0.0';
const CONSENT_STORAGE_KEY = 'consent-preferences';
const CONSENT_COOKIE_NAME = 'consent';

/**
 * Consent Manager Class
 */
export class ConsentManager {
  private config: ConsentConfig;
  private state: ConsentState | null = null;
  private listeners: Array<(state: ConsentState) => void> = [];

  constructor(config: ConsentConfig = getConsentConfig()) {
    this.config = config;
    this.loadConsentState();
  }

  /**
   * Load consent state from storage
   */
  private loadConsentState(): void {
    if (typeof window === 'undefined') return;

    try {
      // Try localStorage first
      const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.version === CONSENT_VERSION) {
          this.state = parsed;
          return;
        }
      }

      // Try cookie as fallback
      const cookie = this.getCookie(CONSENT_COOKIE_NAME);
      if (cookie) {
        const parsed = JSON.parse(decodeURIComponent(cookie));
        if (parsed.version === CONSENT_VERSION) {
          this.state = parsed;
          this.saveConsentState(parsed);
          return;
        }
      }
    } catch (error) {
      console.warn('Failed to load consent state:', error);
    }

    // Default state
    this.state = {
      hasConsented: false,
      preferences: {
        analytics: false,
        marketing: false,
        functional: false,
        required: true, // Always true
      },
      timestamp: Date.now(),
      version: CONSENT_VERSION,
    };
  }

  /**
   * Save consent state to storage
   */
  private saveConsentState(state: ConsentState): void {
    if (typeof window === 'undefined') return;

    try {
      // Save to localStorage
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(state));
      
      // Save to cookie as backup
      const cookieValue = encodeURIComponent(JSON.stringify(state));
      const expires = new Date();
      expires.setFullYear(expires.getFullYear() + 1); // 1 year expiry
      
      document.cookie = `${CONSENT_COOKIE_NAME}=${cookieValue}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
    } catch (error) {
      console.warn('Failed to save consent state:', error);
    }
  }

  /**
   * Get cookie value
   */
  private getCookie(name: string): string | null {
    if (typeof document === 'undefined') return null;

    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(';').shift() || null;
    }
    return null;
  }

  /**
   * Get current consent state
   */
  public getConsentState(): ConsentState {
    return this.state || {
      hasConsented: false,
      preferences: {
        analytics: false,
        marketing: false,
        functional: false,
        required: true,
      },
      timestamp: Date.now(),
      version: CONSENT_VERSION,
    };
  }

  /**
   * Check if user has consented
   */
  public hasConsented(): boolean {
    return this.getConsentState().hasConsented;
  }

  /**
   * Check if specific consent is given
   */
  public hasConsentFor(type: keyof ConsentPreferences): boolean {
    const state = this.getConsentState();
    return state.hasConsented && state.preferences[type];
  }

  /**
   * Set consent preferences
   */
  public setConsent(preferences: Partial<ConsentPreferences>): void {
    const currentState = this.getConsentState();
    
    const newState: ConsentState = {
      hasConsented: true,
      preferences: {
        ...currentState.preferences,
        ...preferences,
        required: true, // Always true
      },
      timestamp: Date.now(),
      version: CONSENT_VERSION,
    };

    this.state = newState;
    this.saveConsentState(newState);
    this.notifyListeners(newState);
  }

  /**
   * Revoke all consent
   */
  public revokeConsent(): void {
    const newState: ConsentState = {
      hasConsented: false,
      preferences: {
        analytics: false,
        marketing: false,
        functional: false,
        required: true,
      },
      timestamp: Date.now(),
      version: CONSENT_VERSION,
    };

    this.state = newState;
    this.saveConsentState(newState);
    this.notifyListeners(newState);
  }

  /**
   * Accept all consent
   */
  public acceptAll(): void {
    this.setConsent({
      analytics: this.config.analytics,
      marketing: this.config.marketing,
      functional: this.config.functional,
    });
  }

  /**
   * Accept only required consent
   */
  public acceptRequired(): void {
    this.setConsent({
      analytics: false,
      marketing: false,
      functional: false,
    });
  }

  /**
   * Add consent change listener
   */
  public addListener(listener: (state: ConsentState) => void): () => void {
    this.listeners.push(listener);
    
    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  /**
   * Notify all listeners
   */
  private notifyListeners(state: ConsentState): void {
    this.listeners.forEach(listener => {
      try {
        listener(state);
      } catch (error) {
        console.warn('Error in consent listener:', error);
      }
    });
  }

  /**
   * Get consent banner configuration
   */
  public getBannerConfig() {
    return {
      title: 'Cookie Consent',
      description: 'We use cookies to enhance your experience, analyze site traffic, and personalize content. You can choose which cookies to accept.',
      acceptAll: 'Accept All',
      acceptRequired: 'Accept Required Only',
      customize: 'Customize',
      privacyPolicy: 'Privacy Policy',
      cookiePolicy: 'Cookie Policy',
      version: CONSENT_VERSION,
    };
  }

  /**
   * Get consent preferences configuration
   */
  public getPreferencesConfig() {
    return {
      required: {
        title: 'Required Cookies',
        description: 'These cookies are necessary for the website to function and cannot be switched off.',
        enabled: true,
        disabled: true,
      },
      functional: {
        title: 'Functional Cookies',
        description: 'These cookies enable enhanced functionality and personalization.',
        enabled: this.config.functional,
        disabled: false,
      },
      analytics: {
        title: 'Analytics Cookies',
        description: 'These cookies help us understand how visitors interact with our website.',
        enabled: this.config.analytics,
        disabled: false,
      },
      marketing: {
        title: 'Marketing Cookies',
        description: 'These cookies are used to deliver personalized advertisements.',
        enabled: this.config.marketing,
        disabled: false,
      },
    };
  }
}

/**
 * Global consent manager instance
 */
let globalConsentManager: ConsentManager | null = null;

export function getConsentManager(): ConsentManager {
  if (!globalConsentManager) {
    globalConsentManager = new ConsentManager();
  }
  return globalConsentManager;
}

/**
 * Initialize consent management
 */
export function initConsentManagement(): ConsentManager {
  const manager = getConsentManager();
  
  // Set up analytics based on consent
  manager.addListener((state) => {
    if (state.hasConsented) {
      if (state.preferences.analytics) {
        // Initialize analytics
        initializeAnalytics();
      } else {
        // Disable analytics
        disableAnalytics();
      }
      
      if (state.preferences.marketing) {
        // Initialize marketing
        initializeMarketing();
      } else {
        // Disable marketing
        disableMarketing();
      }
    }
  });
  
  return manager;
}

/**
 * Initialize analytics (placeholder)
 */
function initializeAnalytics(): void {
  // This would initialize Google Analytics, Plausible, etc.
  console.log('Analytics initialized');
}

/**
 * Disable analytics (placeholder)
 */
function disableAnalytics(): void {
  // This would disable analytics tracking
  console.log('Analytics disabled');
}

/**
 * Initialize marketing (placeholder)
 */
function initializeMarketing(): void {
  // This would initialize marketing tools
  console.log('Marketing initialized');
}

/**
 * Disable marketing (placeholder)
 */
function disableMarketing(): void {
  // This would disable marketing tracking
  console.log('Marketing disabled');
}

/**
 * Consent utilities
 */
export const consentUtils = {
  /**
   * Check if analytics is allowed
   */
  isAnalyticsAllowed(): boolean {
    return getConsentManager().hasConsentFor('analytics');
  },

  /**
   * Check if marketing is allowed
   */
  isMarketingAllowed(): boolean {
    return getConsentManager().hasConsentFor('marketing');
  },

  /**
   * Check if functional cookies are allowed
   */
  isFunctionalAllowed(): boolean {
    return getConsentManager().hasConsentFor('functional');
  },

  /**
   * Get consent status for display
   */
  getConsentStatus(): {
    hasConsented: boolean;
    analytics: boolean;
    marketing: boolean;
    functional: boolean;
  } {
    const state = getConsentManager().getConsentState();
    return {
      hasConsented: state.hasConsented,
      analytics: state.preferences.analytics,
      marketing: state.preferences.marketing,
      functional: state.preferences.functional,
    };
  },

  /**
   * Show consent banner if needed
   */
  shouldShowBanner(): boolean {
    return !getConsentManager().hasConsented();
  },
};

// Export default consent manager
export default getConsentManager();

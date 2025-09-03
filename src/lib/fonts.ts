/**
 * Font loading utilities for optimal performance
 * Supports Greek and Latin character sets with font-display: swap
 */

export interface FontConfig {
  family: string;
  weights: number[];
  display: 'auto' | 'block' | 'swap' | 'fallback' | 'optional';
  preload?: boolean;
  unicodeRange?: string;
}

export const FONT_CONFIGS: FontConfig[] = [
  {
    family: 'Inter',
    weights: [400, 500, 600, 700],
    display: 'swap',
    preload: true,
    unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
  },
  {
    family: 'Inter',
    weights: [400, 500, 600, 700],
    display: 'swap',
    preload: true,
    unicodeRange: 'U+0370-03FF', // Greek
  },
];

/**
 * Generate font preload links for critical fonts
 */
export function generateFontPreloads(): string {
  return FONT_CONFIGS
    .filter(config => config.preload)
    .map(config => {
      // const weights = config.weights.join(','); // Unused for now
      const filename = config.unicodeRange === 'U+0370-03FF' 
        ? 'inter-var-greek.woff2' 
        : 'inter-var.woff2';
      
      return `<link rel="preload" href="/fonts/${filename}" as="font" type="font/woff2" crossorigin>`;
    })
    .join('\n    ');
}

/**
 * Generate font face declarations
 */
export function generateFontFaces(): string {
  return FONT_CONFIGS
    .map(config => {
      const filename = config.unicodeRange === 'U+0370-03FF' 
        ? 'inter-var-greek.woff2' 
        : 'inter-var.woff2';
      
      return `@font-face {
  font-family: '${config.family}';
  font-style: normal;
  font-weight: ${config.weights.join(' ')};
  font-display: ${config.display};
  src: url('/fonts/${filename}') format('woff2-variations');
  unicode-range: ${config.unicodeRange};
}`;
    })
    .join('\n\n');
}

/**
 * Check if font is loaded
 */
export function isFontLoaded(fontFamily: string): boolean {
  if (typeof document === 'undefined') return false;
  
  try {
    return document.fonts.check(`16px ${fontFamily}`);
  } catch {
    return false;
  }
}

/**
 * Wait for font to load
 */
export function waitForFont(fontFamily: string, timeout = 3000): Promise<boolean> {
  if (typeof document === 'undefined') return Promise.resolve(false);
  
  return new Promise((resolve) => {
    if (isFontLoaded(fontFamily)) {
      resolve(true);
      return;
    }

    const timeoutId = setTimeout(() => resolve(false), timeout);
    
    document.fonts.ready.then(() => {
      clearTimeout(timeoutId);
      resolve(isFontLoaded(fontFamily));
    });
  });
}

/**
 * Preload critical fonts
 */
export function preloadCriticalFonts(): void {
  if (typeof document === 'undefined') return;
  
  const criticalFonts = FONT_CONFIGS.filter(config => config.preload);
  
  criticalFonts.forEach(config => {
    const filename = config.unicodeRange === 'U+0370-03FF' 
      ? 'inter-var-greek.woff2' 
      : 'inter-var.woff2';
    
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = `/fonts/${filename}`;
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    
    document.head.appendChild(link);
  });
}

/**
 * Font loading performance metrics
 */
export function measureFontLoading(): void {
  if (typeof document === 'undefined') return;
  
  const g: any = globalThis as any;
  const perfNow: () => number = typeof g?.performance?.now === 'function' ? () => g.performance.now() : () => Date.now();
  const startTime = perfNow();
  
  document.fonts.ready.then(() => {
    const loadTime = perfNow() - startTime;
    
    // Log font loading performance
    const fontsAny: any = (document as any).fonts;
    const fontsLoaded = typeof fontsAny?.size === 'number' ? fontsAny.size : undefined;
    const gAny: any = globalThis as any;
    if (typeof gAny?.logPerformance === 'function') {
      gAny.logPerformance('font_loading', loadTime, {
        fontsLoaded,
        loadTime: Math.round(loadTime),
      });
    }
  });
}

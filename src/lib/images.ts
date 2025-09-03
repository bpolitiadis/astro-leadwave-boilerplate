/**
 * Image optimization utilities for optimal performance
 * Supports WebP/AVIF, responsive images, and lazy loading
 */

import type { ImageMetadata } from 'astro';

export interface ImageConfig {
  src: string | ImageMetadata;
  alt: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'sync' | 'auto';
  sizes?: string;
  quality?: number;
  format?: 'webp' | 'avif' | 'png' | 'jpg';
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

export interface ResponsiveImageConfig extends ImageConfig {
  breakpoints: number[];
  aspectRatio?: number;
}

/**
 * Generate responsive image sizes
 */
export function generateImageSizes(breakpoints: number[], maxWidth?: number): string {
  const sizes = breakpoints
    .filter(bp => !maxWidth || bp <= maxWidth)
    .map(bp => `(max-width: ${bp}px) ${bp}px`)
    .join(', ');
  
  return maxWidth 
    ? `${sizes}, ${maxWidth}px`
    : `${sizes}, 100vw`;
}

/**
 * Generate srcset for responsive images
 */
export function generateSrcSet(
  baseSrc: string,
  breakpoints: number[],
  format: 'webp' | 'avif' | 'png' | 'jpg' = 'webp'
): string {
  return breakpoints
    .map(bp => `${baseSrc}?w=${bp}&f=${format} ${bp}w`)
    .join(', ');
}

/**
 * Generate multiple format srcset for modern browsers
 */
export function generateMultiFormatSrcSet(
  baseSrc: string,
  breakpoints: number[]
): { webp: string; avif: string; fallback: string } {
  return {
    webp: generateSrcSet(baseSrc, breakpoints, 'webp'),
    avif: generateSrcSet(baseSrc, breakpoints, 'avif'),
    fallback: generateSrcSet(baseSrc, breakpoints, 'jpg'),
  };
}

/**
 * Default responsive breakpoints
 */
export const DEFAULT_BREAKPOINTS = [320, 640, 768, 1024, 1280, 1536];

/**
 * Generate blur placeholder
 */
export function generateBlurPlaceholder(width: number, height: number): string {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  
  // Create a simple gradient placeholder
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#f3f4f6');
  gradient.addColorStop(1, '#e5e7eb');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  return canvas.toDataURL('image/jpeg', 0.1);
}

/**
 * Lazy loading intersection observer
 */
export class LazyImageLoader {
  private observer: IntersectionObserver;
  private loadedImages = new Set<string>();

  constructor(options: IntersectionObserverInit = {}) {
    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      {
        rootMargin: '50px',
        threshold: 0.1,
        ...options,
      }
    );
  }

  private handleIntersection(entries: IntersectionObserverEntry[]): void {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        this.loadImage(img);
        this.observer.unobserve(img);
      }
    });
  }

  private loadImage(img: HTMLImageElement): void {
    const src = img.dataset.src;
    if (!src || this.loadedImages.has(src)) return;

    this.loadedImages.add(src);
    
    // Add loading class
    img.classList.add('loading');
    
    const newImg = new Image();
    newImg.onload = () => {
      img.src = src;
      img.classList.remove('loading');
      img.classList.add('loaded');
      
      // Remove data attributes
      delete img.dataset.src;
      delete img.dataset.srcset;
    };
    
    newImg.onerror = () => {
      img.classList.remove('loading');
      img.classList.add('error');
    };
    
    newImg.src = src;
    
    // Load srcset if available
    const srcset = img.dataset.srcset;
    if (srcset) {
      newImg.srcset = srcset;
    }
  }

  public observe(img: HTMLImageElement): void {
    this.observer.observe(img);
  }

  public unobserve(img: HTMLImageElement): void {
    this.observer.unobserve(img);
  }

  public disconnect(): void {
    this.observer.disconnect();
  }
}

/**
 * Global lazy image loader instance
 */
let globalLazyLoader: LazyImageLoader | null = null;

export function getLazyImageLoader(): LazyImageLoader {
  if (!globalLazyLoader) {
    globalLazyLoader = new LazyImageLoader();
  }
  return globalLazyLoader;
}

/**
 * Initialize lazy loading for all images with data-src
 */
export function initLazyLoading(): void {
  if (typeof document === 'undefined') return;
  
  const lazyImages = document.querySelectorAll('img[data-src]');
  const loader = getLazyImageLoader();
  
  lazyImages.forEach(img => {
    loader.observe(img as HTMLImageElement);
  });
}

/**
 * Image loading performance metrics
 */
export function measureImageLoading(): void {
  if (typeof document === 'undefined') return;
  
  const images = document.querySelectorAll('img');
  let loadedCount = 0;
  const totalImages = images.length;
  
  if (totalImages === 0) return;
  
  const startTime = performance.now();
  
  images.forEach(img => {
    if (img.complete) {
      loadedCount++;
    } else {
      img.addEventListener('load', () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          const loadTime = performance.now() - startTime;
          
          if (typeof window !== 'undefined' && (window as any).logPerformance) {
            (window as any).logPerformance('image_loading', loadTime, {
              totalImages,
              loadTime: Math.round(loadTime),
            });
          }
        }
      });
    }
  });
  
  // If all images are already loaded
  if (loadedCount === totalImages) {
    const loadTime = performance.now() - startTime;
    
    if (typeof window !== 'undefined' && (window as any).logPerformance) {
      (window as any).logPerformance('image_loading', loadTime, {
        totalImages,
        loadTime: Math.round(loadTime),
      });
    }
  }
}

/**
 * Preload critical images
 */
export function preloadCriticalImages(imageUrls: string[]): void {
  if (typeof document === 'undefined') return;
  
  imageUrls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = url;
    link.as = 'image';
    document.head.appendChild(link);
  });
}

/**
 * Generate image optimization URL
 */
export function getOptimizedImageUrl(
  src: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'avif' | 'png' | 'jpg';
  } = {}
): string {
  const params = new URLSearchParams();
  
  if (options.width) params.set('w', options.width.toString());
  if (options.height) params.set('h', options.height.toString());
  if (options.quality) params.set('q', options.quality.toString());
  if (options.format) params.set('f', options.format);
  
  const queryString = params.toString();
  return queryString ? `${src}?${queryString}` : src;
}

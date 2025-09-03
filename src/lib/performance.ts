/**
 * Performance monitoring utilities for Core Web Vitals and custom metrics
 */

export interface PerformanceMetric {
  name: string;
  value: number;
  delta: number;
  id: string;
  navigationType: string;
}

export interface PerformanceBudget {
  metric: string;
  threshold: number;
  unit: 'ms' | 'score' | 'count';
}

// Performance budgets for Greek SME landing pages
export const PERFORMANCE_BUDGETS: PerformanceBudget[] = [
  { metric: 'LCP', threshold: 2500, unit: 'ms' },
  { metric: 'FID', threshold: 100, unit: 'ms' },
  { metric: 'CLS', threshold: 0.05, unit: 'score' },
  { metric: 'INP', threshold: 200, unit: 'ms' },
  { metric: 'TTFB', threshold: 600, unit: 'ms' },
  { metric: 'FCP', threshold: 1800, unit: 'ms' },
];

/**
 * Safe global accessor for SSR and browser environments
 */
function getGlobal(): Record<string, unknown> {
  try {
    return typeof globalThis !== 'undefined' ? (globalThis as unknown as Record<string, unknown>) : {};
  } catch {
    return {};
  }
}

/**
 * Core Web Vitals monitoring
 */
export class PerformanceMonitor {
  private metrics: Map<string, PerformanceMetric> = new Map();
  private budgets: PerformanceBudget[];
  private onMetric?: (metric: PerformanceMetric) => void;
  private onBudgetExceeded?: (metric: string, value: number, threshold: number) => void;

  constructor(
    budgets: PerformanceBudget[] = PERFORMANCE_BUDGETS,
    onMetric?: (metric: PerformanceMetric) => void,
    onBudgetExceeded?: (metric: string, value: number, threshold: number) => void
  ) {
    this.budgets = budgets;
    this.onMetric = onMetric;
    this.onBudgetExceeded = onBudgetExceeded;
  }

  /**
   * Start monitoring Core Web Vitals
   */
  public startMonitoring(): void {
    const g = getGlobal();
    if (!g || typeof g.document === 'undefined') return;

    // LCP - Largest Contentful Paint
    this.observeLCP();
    
    // FID - First Input Delay
    this.observeFID();
    
    // CLS - Cumulative Layout Shift
    this.observeCLS();
    
    // INP - Interaction to Next Paint
    this.observeINP();
    
    // TTFB - Time to First Byte
    this.observeTTFB();
    
    // FCP - First Contentful Paint
    this.observeFCP();
  }

  private observeLCP(): void {
    const g = getGlobal();
    const PO = g.PerformanceObserver as typeof PerformanceObserver | undefined;
    if (!PO) return;

    type AnyEntry = Partial<{
      id: string;
      navigationType: string;
      startTime: number;
    }>;
    const observer = new PO((list: PerformanceObserverEntryList) => {
      const entries = list.getEntries() as AnyEntry[];
      const lastEntry = entries[entries.length - 1] as AnyEntry;
      
      const metric: PerformanceMetric = {
        name: 'LCP',
        value: (lastEntry.startTime ?? 0),
        delta: (lastEntry.startTime ?? 0),
        id: lastEntry.id ?? 'lcp',
        navigationType: lastEntry.navigationType ?? 'navigate',
      };
      
      this.recordMetric(metric);
    });

    observer.observe({ entryTypes: ['largest-contentful-paint'] });
  }

  private observeFID(): void {
    const g = getGlobal();
    const PO = g.PerformanceObserver as typeof PerformanceObserver | undefined;
    if (!PO) return;

    type AnyEntry = Partial<{
      id: string;
      navigationType: string;
      processingStart: number;
      startTime: number;
    }>;
    const observer = new PO((list: PerformanceObserverEntryList) => {
      const entries = list.getEntries() as AnyEntry[];
      entries.forEach((entry: AnyEntry) => {
        const metric: PerformanceMetric = {
          name: 'FID',
          value: (entry.processingStart ?? 0) - (entry.startTime ?? 0),
          delta: (entry.processingStart ?? 0) - (entry.startTime ?? 0),
          id: entry.id || 'fid',
          navigationType: entry.navigationType || 'navigate',
        };
        
        this.recordMetric(metric);
      });
    });

    observer.observe({ entryTypes: ['first-input'] });
  }

  private observeCLS(): void {
    const g = getGlobal();
    const PO = g.PerformanceObserver as typeof PerformanceObserver | undefined;
    if (!PO) return;

    let clsValue = 0;
    type AnyEntry = Partial<{ hadRecentInput: boolean; value: number }>;
    const observer = new PO((list: PerformanceObserverEntryList) => {
      const entries = list.getEntries() as AnyEntry[];
      entries.forEach((entry: AnyEntry) => {
        if (!entry.hadRecentInput && typeof entry.value === 'number') {
          clsValue += entry.value;
        }
      });
      
      const metric: PerformanceMetric = {
        name: 'CLS',
        value: clsValue,
        delta: clsValue,
        id: 'cls-observer',
        navigationType: 'navigate',
      };
      
      this.recordMetric(metric);
    });

    observer.observe({ entryTypes: ['layout-shift'] });
  }

  private observeINP(): void {
    const g = getGlobal();
    const PO = g.PerformanceObserver as typeof PerformanceObserver | undefined;
    if (!PO) return;

    let inpValue = 0;
    type AnyEntry = Partial<{ interactionId: number; processingEnd: number; startTime: number }>;
    const observer = new PO((list: PerformanceObserverEntryList) => {
      const entries = list.getEntries() as AnyEntry[];
      entries.forEach((entry: AnyEntry) => {
        if (entry.interactionId && typeof entry.processingEnd === 'number' && typeof entry.startTime === 'number') {
          inpValue = entry.processingEnd - entry.startTime;
        }
      });
      
      const metric: PerformanceMetric = {
        name: 'INP',
        value: inpValue,
        delta: inpValue,
        id: 'inp-observer',
        navigationType: 'navigate',
      };
      
      this.recordMetric(metric);
    });

    observer.observe({ entryTypes: ['event'] });
  }

  private observeTTFB(): void {
    const g = getGlobal();
    const PO = g.PerformanceObserver as typeof PerformanceObserver | undefined;
    if (!PO) return;

    type AnyEntry = Partial<{ responseStart: number; requestStart: number; id: string; navigationType: string }>;
    const observer = new PO((list: PerformanceObserverEntryList) => {
      const entries = list.getEntries() as AnyEntry[];
      entries.forEach((entry: AnyEntry) => {
        const responseStart = entry.responseStart ?? 0;
        const requestStart = entry.requestStart ?? 0;
        const metric: PerformanceMetric = {
          name: 'TTFB',
          value: responseStart - requestStart,
          delta: responseStart - requestStart,
          id: entry.id || 'ttfb',
          navigationType: entry.navigationType || 'navigate',
        };
        
        this.recordMetric(metric);
      });
    });

    observer.observe({ entryTypes: ['navigation'] });
  }

  private observeFCP(): void {
    const g = getGlobal();
    const PO = g.PerformanceObserver as typeof PerformanceObserver | undefined;
    if (!PO) return;

    type AnyEntry = Partial<{ id: string; navigationType: string; startTime: number }>;
    const observer = new PO((list: PerformanceObserverEntryList) => {
      const entries = list.getEntries() as AnyEntry[];
      entries.forEach((entry: AnyEntry) => {
        const safeStart = entry.startTime ?? 0;
        const metric: PerformanceMetric = {
          name: 'FCP',
          value: safeStart,
          delta: safeStart,
          id: entry.id || 'fcp',
          navigationType: entry.navigationType || 'navigate',
        };
        
        this.recordMetric(metric);
      });
    });

    observer.observe({ entryTypes: ['paint'] });
  }

  private recordMetric(metric: PerformanceMetric): void {
    this.metrics.set(metric.name, metric);
    
    // Check against performance budgets
    const budget = this.budgets.find(b => b.metric === metric.name);
    if (budget && metric.value > budget.threshold) {
      this.onBudgetExceeded?.(metric.name, metric.value, budget.threshold);
    }
    
    // Call custom metric handler
    this.onMetric?.(metric);
    
    // Log to console in development
    const gConsole = (getGlobal().console ?? null) as Console | null;
    const isDev = Boolean((import.meta as any)?.env?.DEV);
    if (isDev && gConsole?.log) {
      gConsole.log(`Performance Metric: ${metric.name} = ${metric.value}${budget?.unit || 'ms'}`);
    }
  }

  /**
   * Get all recorded metrics
   */
  public getMetrics(): Map<string, PerformanceMetric> {
    return new Map(this.metrics);
  }

  /**
   * Get a specific metric
   */
  public getMetric(name: string): PerformanceMetric | undefined {
    return this.metrics.get(name);
  }

  /**
   * Check if all metrics are within budget
   */
  public isWithinBudget(): boolean {
    for (const budget of this.budgets) {
      const metric = this.metrics.get(budget.metric);
      if (metric && metric.value > budget.threshold) {
        return false;
      }
    }
    return true;
  }
}

/**
 * Global performance monitor instance
 */
let globalPerformanceMonitor: PerformanceMonitor | null = null;

export function getPerformanceMonitor(): PerformanceMonitor {
  if (!globalPerformanceMonitor) {
    globalPerformanceMonitor = new PerformanceMonitor(
      PERFORMANCE_BUDGETS,
      (metric) => {
        // Log performance metrics
        const g = getGlobal();
        if (typeof g?.logPerformance === 'function') {
          g.logPerformance(metric.name.toLowerCase(), metric.value, {
            metric: metric.name,
            value: metric.value,
            delta: metric.delta,
            id: metric.id,
            navigationType: metric.navigationType,
          });
        }
      },
      (metric, value, threshold) => {
        // Log budget violations
        const g = getGlobal();
        const gConsole = (g.console ?? null) as Console | null;
        if (gConsole?.warn) {
          gConsole.warn(`Performance Budget Exceeded: ${metric} = ${value} (threshold: ${threshold})`);
        }
        
        if (typeof g?.logPerformance === 'function') {
          g.logPerformance('budget_violation', value, {
            metric,
            value,
            threshold,
            violation: true,
          });
        }
      }
    );
  }
  return globalPerformanceMonitor;
}

/**
 * Initialize performance monitoring
 */
export function initPerformanceMonitoring(): void {
  const g = getGlobal();
  if (!g || typeof g.document === 'undefined') return;
  
  const monitor = getPerformanceMonitor();
  monitor.startMonitoring();
  
  // Log performance monitoring start
  if (typeof g?.logPerformance === 'function') {
    g.logPerformance('monitoring_start', 0, {
      budgets: PERFORMANCE_BUDGETS.length,
      timestamp: Date.now(),
    });
  }
}

/**
 * Measure custom performance metrics
 */
export function measurePerformance<T>(
  name: string,
  fn: () => T | Promise<T>
): T | Promise<T> {
  const gPerf = (getGlobal().performance ?? null) as Performance | null;
  const now = typeof gPerf?.now === 'function' ? () => gPerf.now() : () => Date.now();
  const startTime = now();
  
  const result = fn();
  
  if (result instanceof Promise) {
    return result.then((value) => {
      const endTime = now();
      const duration = endTime - startTime;
      
      const gAny = getGlobal() as any;
      if (typeof gAny?.logPerformance === 'function') {
        gAny.logPerformance(name, duration, {
          operation: name,
          duration: Math.round(duration),
          async: true,
        });
      }
      
      return value;
    });
  } else {
    const endTime = now();
    const duration = endTime - startTime;
    
    const gAny = getGlobal() as any;
    if (typeof gAny?.logPerformance === 'function') {
      gAny.logPerformance(name, duration, {
        operation: name,
        duration: Math.round(duration),
        async: false,
      });
    }
    
    return result;
  }
}

/**
 * Performance budget validation
 */
export function validatePerformanceBudgets(): boolean {
  const monitor = getPerformanceMonitor();
  return monitor.isWithinBudget();
}

/**
 * Get performance report
 */
export function getPerformanceReport(): {
  metrics: Record<string, PerformanceMetric>;
  budgets: PerformanceBudget[];
  withinBudget: boolean;
  violations: Array<{ metric: string; value: number; threshold: number }>;
} {
  const monitor = getPerformanceMonitor();
  const metrics = Object.fromEntries(monitor.getMetrics());
  const violations: Array<{ metric: string; value: number; threshold: number }> = [];
  
  for (const budget of PERFORMANCE_BUDGETS) {
    const metric = metrics[budget.metric];
    if (metric && metric.value > budget.threshold) {
      violations.push({
        metric: budget.metric,
        value: metric.value,
        threshold: budget.threshold,
      });
    }
  }
  
  return {
    metrics,
    budgets: PERFORMANCE_BUDGETS,
    withinBudget: violations.length === 0,
    violations,
  };
}

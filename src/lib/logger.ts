import pino from 'pino';

// Environment-aware logger configuration
const isDevelopment = (import.meta as any).env?.DEV ?? false;
const isProduction = (import.meta as any).env?.PROD ?? true;
const isVercel = (import.meta as any).env?.VERCEL === '1';

// Log levels for different environments
const logLevel = isDevelopment ? 'debug' : 'info';

// Base logger configuration
const baseConfig = {
  level: logLevel,
  timestamp: pino.stdTimeFunctions.isoTime,
  formatters: {
    level: (label: string) => ({ level: label }),
    log: (object: any) => {
      // Add environment context
      return {
        ...object,
        env: isVercel ? 'vercel' : isProduction ? 'production' : 'development',
        timestamp: new Date().toISOString(),
      };
    },
  },
  // Add request context for API routes
  mixin() {
    return {
      service: 'astro-app',
      version: '1.0.0',
    };
  },
};

// Development configuration with pretty printing
const devConfig = {
  ...baseConfig,
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname',
      messageFormat: '{msg} {req.method} {req.url} {responseTime}ms',
    },
  },
};

// Production configuration optimized for Vercel
const prodConfig = {
  ...baseConfig,
  // In production, output JSON for better parsing
  transport: isVercel
    ? undefined
    : {
        target: 'pino-pretty',
        options: {
          colorize: false,
          translateTime: false,
          ignore: 'pid,hostname',
        },
      },
};

// Create the main logger instance
export const logger = pino(isDevelopment ? devConfig : prodConfig);

// Specialized loggers for different contexts
export const apiLogger = logger.child({ context: 'api' });
export const pageLogger = logger.child({ context: 'page' });
export const componentLogger = logger.child({ context: 'component' });
export const emailLogger = logger.child({ context: 'email' });
export const securityLogger = logger.child({ context: 'security' });

// Request logging middleware for API routes
export function logRequest(req: any, startTime: number) {
  const url = new (globalThis as any).URL(req.url);
  const method = req.method;
  const userAgent = req.headers.get('user-agent') || 'unknown';
  const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';

  apiLogger.info({
    msg: 'API Request',
    method,
    url: url.pathname,
    query: url.search,
    userAgent,
    ip,
    startTime,
  });
}

// Response logging middleware for API routes
export function logResponse(req: any, response: any, startTime: number) {
  const url = new (globalThis as any).URL(req.url);
  const method = req.method;
  const status = response.status;
  const responseTime = Date.now() - startTime;

  const logLevel = status >= 400 ? 'warn' : 'info';

  apiLogger[logLevel]({
    msg: 'API Response',
    method,
    url: url.pathname,
    status,
    responseTime,
    success: status < 400,
  });
}

// Error logging utility
export function logError(error: Error, context: Record<string, any> = {}) {
  logger.error({
    msg: 'Application Error',
    error: {
      name: error.name,
      message: error.message,
      stack: error.stack,
    },
    ...context,
  });
}

// Security event logging
export function logSecurityEvent(event: string, details: Record<string, any> = {}) {
  securityLogger.warn({
    msg: 'Security Event',
    event,
    ...details,
  });
}

// Email logging utility
export function logEmailEvent(event: string, details: Record<string, any> = {}) {
  emailLogger.info({
    msg: 'Email Event',
    event,
    ...details,
  });
}

// Page view logging
export function logPageView(page: string, userAgent?: string, ip?: string) {
  pageLogger.info({
    msg: 'Page View',
    page,
    userAgent,
    ip,
  });
}

// Component lifecycle logging
export function logComponentLifecycle(
  component: string,
  action: string,
  details: Record<string, any> = {}
) {
  componentLogger.debug({
    msg: 'Component Lifecycle',
    component,
    action,
    ...details,
  });
}

// Performance logging
export function logPerformance(
  operation: string,
  duration: number,
  details: Record<string, any> = {}
) {
  logger.info({
    msg: 'Performance',
    operation,
    duration,
    ...details,
  });
}

// Export types for better TypeScript support
export type LogLevel = 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace';
export type LoggerContext = 'api' | 'page' | 'component' | 'email' | 'security';

// Utility function to create context-specific loggers
export function createLogger(context: LoggerContext, additionalFields: Record<string, any> = {}) {
  return logger.child({ context, ...additionalFields });
}

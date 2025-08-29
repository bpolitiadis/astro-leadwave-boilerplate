# Logging Guide

> Template/Boilerplate Notice
>
> This guide documents the logging implementation shipped with the boilerplate template. Keep the structure, but customize destinations, levels, and redaction rules to match your environment and privacy policy.

This guide covers the comprehensive logging system implemented in the Astro Tailwind Boilerplate using Pino.

## Overview

The logging system provides structured, environment-aware logging with specialized loggers for different contexts. It's optimized for both development and production environments, with special integration for Vercel's logging dashboard.

## Core Features

- **Structured Logging**: JSON-formatted logs for easy parsing and analysis
- **Environment-Aware**: Different configurations for development, production, and Vercel
- **Context-Specific Loggers**: Specialized loggers for different parts of the application
- **Performance Tracking**: Built-in performance monitoring capabilities
- **Privacy-First**: Automatic masking of sensitive data like emails and IPs
- **Vercel Integration**: Optimized for Vercel's logging dashboard

## Logger Types

### Main Logger

```typescript
import { logger } from '../lib/logger';

logger.info('Application started');
logger.error('Something went wrong');
```

### Specialized Loggers

```typescript
import { apiLogger, pageLogger, componentLogger, emailLogger, securityLogger } from '../lib/logger';

// API logging
apiLogger.info({ msg: 'API Request', method: 'POST', url: '/api/contact' });

// Page logging
pageLogger.info({ msg: 'Page View', page: '/contact' });

// Component logging
componentLogger.debug({ msg: 'Component Rendered', component: 'Header' });

// Email logging
emailLogger.info({ msg: 'Email Sent', to: 'user@example.com' });

// Security logging
securityLogger.warn({ msg: 'Security Event', event: 'failed_login' });
```

## Utility Functions

### Error Logging

```typescript
import { logError } from '../lib/logger';

try {
  // Some operation
} catch (error) {
  logError(error, {
    context: 'user_action',
    userId: '123',
    action: 'form_submit',
  });
}
```

### Performance Logging

```typescript
import { logPerformance } from '../lib/logger';

const startTime = Date.now();
// ... perform operation
const duration = Date.now() - startTime;

logPerformance('database_query', duration, {
  table: 'users',
  operation: 'select',
  rows: 100,
});
```

### Security Event Logging

```typescript
import { logSecurityEvent } from '../lib/logger';

logSecurityEvent('failed_login', {
  ip: '192.168.1.1',
  userAgent: 'Mozilla/5.0...',
  username: 'user@example.com',
});
```

### Email Event Logging

```typescript
import { logEmailEvent } from '../lib/logger';

logEmailEvent('sent', {
  emailId: 'email_123',
  to: 'user@example.com',
  subject: 'Welcome',
  duration: 150,
});
```

### Page View Logging

```typescript
import { logPageView } from '../lib/logger';

logPageView('/contact', userAgent, ip);
```

### Component Lifecycle Logging

```typescript
import { logComponentLifecycle } from '../lib/logger';

logComponentLifecycle('ContactForm', 'render', {
  hasUserData: true,
  formType: 'contact',
});
```

## API Route Logging

For API routes, use the request/response logging middleware:

```typescript
import { logRequest, logResponse } from '../lib/logger';

export const POST: APIRoute = async ({ request }) => {
  const startTime = Date.now();

  // Log incoming request
  logRequest(request, startTime);

  try {
    // ... handle request

    const response = new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

    // Log response
    logResponse(request, response, startTime);
    return response;
  } catch (error) {
    // Log error
    logError(error, { context: 'api_route' });

    const errorResponse = new Response(JSON.stringify({ error: 'Internal error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });

    logResponse(request, errorResponse, startTime);
    return errorResponse;
  }
};
```

## Component Logging

### Server-Side (Astro Components)

```astro
---
import { logComponentLifecycle } from '../lib/logger';

logComponentLifecycle('MyComponent', 'render', {
  props: Astro.props,
  pathname: Astro.url.pathname,
});
---

<div>Component content</div>
```

### Client-Side (Script Tags)

```astro
<script>
  import { logComponentLifecycle } from '../lib/logger';

  // Log when component becomes interactive
  logComponentLifecycle('MyComponent', 'interactive', {
    pathname: window.location.pathname,
  });

  // Track user interactions
  document.querySelector('button').addEventListener('click', () => {
    logComponentLifecycle('MyComponent', 'button_click', {
      buttonId: 'submit-btn',
    });
  });
</script>
```

## Environment Configuration

### Development

- Pretty-printed logs with colors
- Debug level logging
- Human-readable timestamps

### Production

- JSON-structured logs
- Info level logging
- ISO timestamps
- Optimized for log aggregation

### Vercel

- JSON-structured logs
- Automatic environment detection
- Optimized for Vercel dashboard

## Environment Variables

Configure logging behavior through environment variables:

```env
# Log level (trace, debug, info, warn, error, fatal)
LOG_LEVEL=info

# Environment (development, production, vercel)
LOG_ENVIRONMENT=development

# Enable structured JSON logging
ENABLE_STRUCTURED_LOGGING=true

# Vercel environment detection
VERCEL=1
```

## Log Levels

- **trace**: Detailed debugging information
- **debug**: Debug information
- **info**: General information (default)
- **warn**: Warning messages
- **error**: Error messages
- **fatal**: Fatal errors

## Best Practices

### 1. Use Appropriate Log Levels

```typescript
// Good
logger.debug('Processing user data', { userId: '123' });
logger.info('User logged in successfully', { userId: '123' });
logger.warn('Rate limit approaching', { userId: '123', requests: 95 });
logger.error('Database connection failed', { error: 'Connection timeout' });

// Avoid
logger.info('Debug information'); // Use debug level instead
logger.error('Normal operation'); // Use info level instead
```

### 2. Include Context

```typescript
// Good
logger.info('User action completed', {
  userId: '123',
  action: 'profile_update',
  duration: 150,
  success: true,
});

// Avoid
logger.info('Action completed'); // Missing context
```

### 3. Mask Sensitive Data

```typescript
// Good - Email masking
const maskedEmail = email ? `${email.substring(0, 3)}***@${email.split('@')[1]}` : 'missing';
logger.info('Email sent', { email: maskedEmail });

// Good - IP masking for privacy
const maskedIp = ip ? `${ip.split('.')[0]}.${ip.split('.')[1]}.*.*` : 'unknown';
logger.info('Request received', { ip: maskedIp });
```

### 4. Use Structured Data

```typescript
// Good
logger.info({
  msg: 'API Request',
  method: 'POST',
  url: '/api/contact',
  statusCode: 200,
  responseTime: 150,
  userAgent: 'Mozilla/5.0...',
});

// Avoid
logger.info('POST /api/contact 200 150ms'); // Not structured
```

### 5. Performance Logging

```typescript
// Good
const startTime = Date.now();
try {
  await performOperation();
  const duration = Date.now() - startTime;
  logPerformance('operation_name', duration, { success: true });
} catch (error) {
  const duration = Date.now() - startTime;
  logPerformance('operation_name', duration, { success: false, error: error.message });
}
```

## Vercel Integration

When deployed to Vercel, logs are automatically:

- Structured as JSON for easy parsing
- Available in the Vercel dashboard
- Integrated with function performance metrics
- Correlated with request/response data

### Viewing Logs in Vercel

1. Go to your Vercel dashboard
2. Select your project
3. Navigate to the "Functions" tab
4. Click on a function to view its logs
5. Use the log viewer to filter and search logs

### Log Correlation

Logs include correlation data for tracking requests:

```json
{
  "level": "info",
  "msg": "API Request",
  "method": "POST",
  "url": "/api/contact",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "env": "vercel",
  "service": "astro-app",
  "version": "1.0.0"
}
```

## Troubleshooting

### Common Issues

1. **Logs not appearing in Vercel**
   - Ensure `VERCEL=1` environment variable is set
   - Check that logs are being written to stdout/stderr
   - Verify function timeout settings

2. **Performance impact**
   - Use appropriate log levels
   - Avoid logging in hot paths
   - Consider using conditional logging

3. **Sensitive data exposure**
   - Always mask emails, IPs, and other PII
   - Use the provided masking utilities
   - Review logs before deployment

### Debug Mode

Enable debug logging for troubleshooting:

```env
LOG_LEVEL=debug
```

This will show detailed information about the logging system itself.

## Monitoring and Alerting

### Log Aggregation

Consider using log aggregation services:

- **Vercel Analytics**: Built-in with Vercel deployment
- **Logtail**: Real-time log aggregation
- **Datadog**: Comprehensive monitoring
- **Sentry**: Error tracking and performance monitoring

### Alerting

Set up alerts for:

- Error rate thresholds
- Performance degradation
- Security events
- API failures

Example alert configuration:

```typescript
// Alert on high error rate
if (errorCount > threshold) {
  logSecurityEvent('high_error_rate', {
    errorCount,
    threshold,
    timeWindow: '5m',
  });
}
```

## Performance Considerations

### Logging Impact

- **Development**: Minimal impact with pretty printing
- **Production**: Optimized JSON output
- **Vercel**: Structured for efficient processing

### Optimization Tips

1. **Use appropriate log levels**
2. **Avoid logging in loops**
3. **Batch log operations when possible**
4. **Use conditional logging for expensive operations**

```typescript
// Good - Conditional logging
if (logger.level === 'debug') {
  logger.debug('Expensive operation details', expensiveData);
}

// Good - Batch logging
const events = [];
// ... collect events
logger.info('Batch events processed', { events, count: events.length });
```

This logging system provides comprehensive monitoring capabilities while maintaining performance and privacy standards.

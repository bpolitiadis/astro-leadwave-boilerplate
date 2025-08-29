# Architecture Guide

> **Template/Boilerplate Notice**
>
> This document describes the technical architecture of the boilerplate template. Use this to understand how the system works and how to extend it.

## Tech Stack

### Core Framework
- **Astro**: v5.12.0 - Static site generator with SSR capabilities
- **Tailwind CSS**: v3.4.17 - Utility-first CSS framework
- **TypeScript**: v5.6.3 - Type-safe JavaScript

### Key Integrations
- **Pino**: v9.7.0 - High-performance logging
- **Resend**: v4.8.0 - Email service integration
- **Playwright**: v1.54.2 - End-to-end testing
- **ESLint**: v9.32.0 - Code quality and linting
- **Prettier**: v3.6.2 - Code formatting

## Runtime Model

### Build Output
- **Output Directory**: `dist/` (configurable in `astro.config.mjs`)
- **Build Target**: Static site with API routes
- **Hydration**: None by default (static rendering)

### Rendering Strategy
- **Static Generation**: All pages are pre-built at build time
- **API Routes**: Dynamic server-side functionality via `/api/*` endpoints
- **Client-side**: Minimal JavaScript for form handling and logging

## Routing & Pages

### File-based Routing
```
src/pages/
├── index.astro          # Homepage (/)
├── contact.astro        # Contact page (/contact)
├── api/
│   └── contact.ts       # Contact form API (/api/contact)
├── sitemap.xml.ts       # Dynamic sitemap generation
└── robots.txt.ts        # Dynamic robots.txt generation
```

### API Routes
- **Contact Form**: `POST /api/contact` - Handles form submissions with email sending
- **Sitemap**: `GET /sitemap.xml` - Generates XML sitemap dynamically
- **Robots**: `GET /robots.txt` - Generates robots.txt dynamically

### Route Features
- **Type Safety**: Full TypeScript support with `APIRoute` types
- **Error Handling**: Comprehensive error handling and logging
- **Validation**: Form validation with detailed error messages
- **Security**: Input sanitization and rate limiting considerations

## Components & UI

### Component Architecture
- **Layout Components**: `src/layouts/Layout.astro` - Base page structure
- **UI Components**: `src/components/*.astro` - Reusable UI elements
- **Page Components**: `src/pages/*.astro` - Page-specific content

### Component Patterns
```astro
---
// Props interface for type safety
export interface Props {
  title: string;
  description?: string;
}

const { title, description = 'Default description' } = Astro.props;
---

<!-- Component template -->
<div class="component">
  <h1>{title}</h1>
  <p>{description}</p>
  <slot />
</div>
```

### Component Features
- **Props Interface**: TypeScript interfaces for component props
- **Default Values**: Sensible defaults for optional props
- **Slot System**: Content projection via Astro slots
- **Lifecycle Logging**: Automatic logging of component events

## State & Configuration

### Environment Variables
```bash
# Email Configuration
RESEND_API_KEY=your_resend_api_key_here
FROM_EMAIL=noreply@yourdomain.com
TO_EMAIL=hello@example.com

# Logging Configuration
LOG_LEVEL=info
LOG_ENVIRONMENT=development
ENABLE_STRUCTURED_LOGGING=true

# Site Configuration
SITE_URL=https://yourdomain.com
```

### Configuration Files
- **Astro Config**: `astro.config.mjs` - Framework configuration
- **Tailwind Config**: `tailwind.config.mjs` - CSS framework settings
- **Vercel Config**: `vercel.json` - Deployment configuration
- **Playwright Config**: `playwright.config.ts` - Testing configuration

## Assets & Images

### Asset Pipeline
- **Images**: `src/images/` - Optimized image imports
- **Static Files**: `public/` - Direct file serving
- **Styles**: `src/styles/global.css` - Global CSS and Tailwind imports

### Image Usage
```astro
---
// Import images for optimization
import heroImage from '../images/hero.jpg';
---

<img src={heroImage} alt="Hero image" />
```

### Asset Features
- **Automatic Optimization**: Astro optimizes imported images
- **Type Safety**: TypeScript support for asset imports
- **Performance**: Lazy loading and optimization built-in

## Build & Output

### Build Process
1. **Type Checking**: `astro check` validates TypeScript
2. **Asset Processing**: Images and styles are optimized
3. **Page Generation**: Static HTML is generated
4. **API Routes**: Serverless functions are prepared

### Output Structure
```
dist/
├── _astro/              # Astro-generated assets
├── api/                 # API route handlers
├── contact/             # Contact page
├── index.html           # Homepage
├── sitemap.xml          # Generated sitemap
└── robots.txt           # Generated robots.txt
```

### Build Features
- **Type Safety**: Full TypeScript compilation
- **Asset Optimization**: Automatic image and CSS optimization
- **SEO Generation**: Meta tags and structured data
- **Performance**: Optimized bundle sizes

## Security Considerations

### Form Handling
- **Input Validation**: Server-side validation for all form inputs
- **File Uploads**: Restricted file types and size limits
- **CSRF Protection**: Form token validation (not implemented yet)
- **Rate Limiting**: Request throttling (not implemented yet)

### API Security
- **Input Sanitization**: All inputs are validated and sanitized
- **Error Handling**: Generic error messages to prevent information leakage
- **Logging**: Security events are logged for monitoring
- **Headers**: Security headers configured in `vercel.json`

### Data Protection
- **Email Masking**: Sensitive data is masked in logs
- **Privacy Compliance**: GDPR-ready consent handling
- **Secure Headers**: Security headers for production deployment

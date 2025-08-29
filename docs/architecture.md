# Architecture Guide

This document outlines the technical architecture, patterns, and implementation details of the Astro Tailwind Boilerplate.

## 🏗️ Tech Stack

### Core Framework
- **Astro**: v5.12.0 - Modern static site generator with hybrid rendering
- **Tailwind CSS**: v3.4.17 - Utility-first CSS framework
- **TypeScript**: v5.6.3 - Type-safe JavaScript development

### Runtime & Build Tools
- **Node.js**: >=18.0.0 - JavaScript runtime
- **Vite**: Built-in with Astro - Fast build tool and dev server
- **Sharp**: v0.33.2 - High-performance image processing

### Development Tools
- **ESLint**: v9.32.0 - Code linting and quality
- **Prettier**: v3.6.2 - Code formatting
- **Playwright**: v1.54.2 - End-to-end testing

### Production Services
- **Pino**: v9.7.0 - Structured logging
- **Resend**: v4.8.0 - Email service
- **Vercel**: Production deployment platform

## ⚡ Runtime Model

### Static Generation (Default)
- **Build Time**: Pages are pre-rendered at build time
- **Performance**: Fastest possible page loads
- **SEO**: Optimal for search engine crawling
- **Use Case**: Content-heavy sites, blogs, documentation

### API Routes (Serverless)
- **Runtime**: Node.js 20.x on Vercel
- **Execution**: On-demand serverless functions
- **Use Case**: Contact forms, dynamic data, user interactions

### Hybrid Approach
- **Static Pages**: Pre-rendered for performance
- **Dynamic Content**: API routes for interactivity
- **Best of Both**: Performance + functionality

## 🗂️ File-Based Routing

### Page Structure
```
src/pages/
├── index.astro          # / (homepage)
├── contact.astro        # /contact
├── api/
│   ├── contact.ts       # POST /api/contact
│   ├── sitemap.ts       # GET /api/sitemap
│   └── robots.ts        # GET /api/robots
└── robots.txt.ts        # /robots.txt
```

### Routing Conventions
- **`.astro` files**: Generate HTML pages
- **`.ts` files in `/api`**: Generate API endpoints
- **`.ts` files in root**: Generate special files (robots.txt, sitemap.xml)
- **Dynamic routes**: `[param].astro` for dynamic content

### URL Structure
- **Clean URLs**: No file extensions in production
- **SEO Friendly**: Semantic URL structure
- **Redirects**: Automatic redirects for common patterns

## 🧩 Component Architecture

### Layout Components
```astro
<!-- src/layouts/Layout.astro -->
---
interface Props {
  title: string;
  description: string;
  image?: string;
}

const { title, description, image = '/og-image.jpg' } = Astro.props;
---

<html lang="en">
  <head>
    <!-- SEO meta tags -->
  </head>
  <body>
    <slot />
  </body>
</html>
```

### UI Components
- **Reusable**: Self-contained with clear interfaces
- **Composable**: Can be combined for complex layouts
- **Accessible**: Built with WCAG guidelines in mind
- **Responsive**: Mobile-first design approach

### Component Patterns
- **Props Interface**: TypeScript interfaces for component props
- **Slot System**: Flexible content injection
- **Scoped Styles**: Component-specific CSS
- **Client Scripts**: Interactive functionality when needed

## ⚙️ State & Configuration

### Environment Variables
```env
# Email Configuration
RESEND_API_KEY=re_123456789
FROM_EMAIL=noreply@yourdomain.com
TO_EMAIL=hello@example.com

# Site Configuration
SITE_URL=https://yourdomain.com

# Logging Configuration
LOG_LEVEL=info
LOG_ENVIRONMENT=production
ENABLE_STRUCTURED_LOGGING=true
```

### Configuration Files
- **`astro.config.mjs`**: Astro framework configuration
- **`tailwind.config.mjs`**: Tailwind CSS customization
- **`vercel.json`**: Vercel deployment settings
- **`tsconfig.json`**: TypeScript compilation options

### Build Configuration
```javascript
// astro.config.mjs
export default defineConfig({
  site: 'https://your-domain.com',
  integrations: [tailwind()],
  build: {
    inlineStylesheets: 'auto',
    assets: '_astro'
  },
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' },
    formats: ['webp', 'avif', 'jpeg'],
    quality: 80
  }
});
```

## 🖼️ Assets & Images

### Image Pipeline
- **Source**: Place images in `src/images/`
- **Processing**: Automatic optimization with Sharp
- **Formats**: WebP, AVIF, JPEG with fallbacks
- **Responsive**: Automatic responsive image generation

### Static Assets
- **Location**: `public/` directory
- **Direct Access**: Referenced by URL path
- **Examples**: Favicon, robots.txt, sitemap.xml

### Asset Optimization
```astro
---
import Image from '../images/hero.jpg';
---

<Image 
  src={Image} 
  alt="Hero image" 
  width={800} 
  height={600}
  format="webp"
  quality={80}
/>
```

## 🔨 Build & Output

### Build Process
1. **Type Checking**: `astro check` for TypeScript validation
2. **Asset Processing**: Image optimization and format conversion
3. **CSS Processing**: Tailwind compilation and purging
4. **Bundle Generation**: JavaScript bundling and optimization
5. **Static Generation**: HTML page generation

### Output Structure
```
dist/
├── _astro/              # Optimized assets
├── api/                 # API route handlers
├── contact/             # Generated pages
├── index.html           # Homepage
├── sitemap.xml          # SEO sitemap
└── robots.txt           # Search engine instructions
```

### Performance Features
- **CSS Inlining**: Critical CSS automatically inlined
- **Asset Optimization**: Compressed images and minified code
- **Bundle Splitting**: Optimized chunk loading
- **Tree Shaking**: Unused code elimination

## 🔒 Security Considerations

### Form Handling
- **Input Validation**: Server-side validation for all forms
- **CSRF Protection**: Built-in protection against cross-site attacks
- **File Upload Security**: Type and size validation
- **Rate Limiting**: Protection against abuse

### API Security
- **Input Sanitization**: Automatic sanitization of user input
- **Error Handling**: Secure error messages without information leakage
- **Authentication Ready**: Structure for JWT or session-based auth
- **CORS Configuration**: Proper cross-origin resource sharing

### Headers & Policies
```json
{
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()"
}
```

## 📊 Monitoring & Observability

### Logging System
- **Structured Logging**: JSON format for production
- **Context Tracking**: Request correlation and user context
- **Performance Monitoring**: Response time and resource usage
- **Error Tracking**: Comprehensive error logging with stack traces

### Performance Metrics
- **Core Web Vitals**: LCP, FID, CLS tracking
- **Build Metrics**: Bundle size and compilation time
- **Runtime Metrics**: API response times and error rates
- **User Experience**: Page load times and interaction metrics

### Health Checks
- **API Endpoints**: Health check endpoints for monitoring
- **Build Status**: Automated build and test verification
- **Deployment Health**: Post-deployment validation
- **Performance Baselines**: Continuous performance monitoring

## 🚀 Deployment Architecture

### Vercel Integration
- **Automatic Deployments**: Git-based deployment pipeline
- **Edge Functions**: Global API route distribution
- **CDN**: Global content delivery network
- **Analytics**: Built-in performance and user analytics

### Docker Support
- **Multi-stage Builds**: Optimized production images
- **Nginx Serving**: High-performance static file serving
- **Environment Configuration**: Flexible environment variable management
- **Production Ready**: Security and performance optimized

## 🔄 Development Workflow

### Local Development
```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Run tests
pnpm test
```

### Quality Gates
- **Linting**: ESLint with Astro-specific rules
- **Formatting**: Prettier for consistent code style
- **Type Checking**: TypeScript compilation validation
- **Testing**: Playwright end-to-end test suite

### Continuous Integration
- **Automated Testing**: Run tests on every commit
- **Build Verification**: Ensure production builds succeed
- **Code Quality**: Automated linting and formatting
- **Deployment**: Automatic deployment on successful builds

---

*This architecture provides a solid foundation for building scalable, performant, and maintainable web applications with modern web technologies.*

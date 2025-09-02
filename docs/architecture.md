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
- **Sharp**: v0.33.5 - High-performance image processing

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
- **Runtime**: Node.js 18.x on Vercel
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
├── components.astro     # /components (showcase)
├── api/
│   └── contact.ts       # POST /api/contact
├── robots.txt.ts        # /robots.txt
└── sitemap.xml.ts       # /sitemap.xml
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
  description?: string;
  image?: string;
}

const {
  title,
  description = 'Production-ready Astro + Tailwind CSS boilerplate...',
  image,
} = Astro.props;

// Use the optimized image if provided, otherwise use our default
const ogImage = image || boilerplateImage6.src;

// Log page view and component lifecycle
logPageView(Astro.url.pathname);
logComponentLifecycle('Layout', 'render', {
  title,
  pathname: Astro.url.pathname,
});
---

<!doctype html>
<html lang='en'>
  <head>
    <!-- SEO meta tags -->
  </head>
  <body>
    <Header />
    <main>
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

### UI Components
- **Reusable**: Self-contained with clear interfaces
- **Composable**: Can be combined for complex layouts
- **Accessible**: Built with WCAG guidelines in mind
- **Responsive**: Mobile-first design approach

### Component Library Structure
```
src/components/
├── ui/                   # Base UI components
│   ├── Button.astro     # Button component
│   ├── Card.astro       # Card components
│   ├── Input.astro      # Form input
│   ├── Textarea.astro   # Form textarea
│   ├── Badge.astro      # Badge component
│   └── index.ts         # Component exports
├── Header.astro         # Site header
├── Footer.astro         # Site footer
└── ContactForm.astro    # Contact form
```

## 🔌 API Architecture

### Contact Form API
```typescript
// src/pages/api/contact.ts
export async function POST({ request }: APIContext) {
  const startTime = Date.now();
  
  try {
    // Log request
    logRequest(request, startTime);
    
    // Process form data
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;
    
    // Send email via Resend
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject: 'New Contact Form Submission',
      html: generateEmailHTML({ email, message }),
    });
    
    // Log success
    logResponse(request, { status: 200 }, startTime);
    
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    // Log error
    logError(error, { context: 'contact_api' });
    
    return new Response(JSON.stringify({ error: 'Failed to send message' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
```

### API Features
- **Request Logging**: All API requests are logged with timing
- **Error Handling**: Comprehensive error handling and logging
- **Response Logging**: Response status and timing tracking
- **Security**: Input validation and sanitization

## 📊 Logging Architecture

### Logger Configuration
```typescript
// src/lib/logger.ts
const baseConfig = {
  level: logLevel,
  timestamp: pino.stdTimeFunctions.isoTime,
  formatters: {
    level: (label: string) => ({ level: label }),
    log: (object: any) => ({
      ...object,
      env: isVercel ? 'vercel' : isProduction ? 'production' : 'development',
      timestamp: new Date().toISOString(),
    }),
  },
  mixin() {
    return {
      service: 'astro-app',
      version: '1.0.0',
    };
  },
};
```

### Specialized Loggers
- **apiLogger**: API request/response logging
- **pageLogger**: Page view and navigation logging
- **componentLogger**: Component lifecycle logging
- **emailLogger**: Email sending and delivery logging
- **securityLogger**: Security event logging

### Logging Features
- **Environment-Aware**: Different configs for dev/prod/vercel
- **Structured**: JSON format for production, pretty for development
- **Contextual**: Request context, timing, and metadata
- **Performance**: Built-in performance tracking

## 🧪 Testing Architecture

### Test Structure
```
tests/
├── e2e/                  # End-to-end tests
│   ├── contact.spec.ts   # Contact form tests
│   └── home.spec.ts      # Homepage tests
├── fixtures/             # Test data
│   └── test-document.txt # Test fixtures
└── page-objects/         # Page object models
    ├── BasePage.ts       # Base page class
    ├── ContactPage.ts    # Contact page model
    ├── HomePage.ts       # Home page model
    └── index.ts          # Exports
```

### Test Features
- **Playwright**: Modern end-to-end testing
- **Page Objects**: Maintainable test structure
- **Fixtures**: Reusable test data
- **CI/CD Ready**: Optimized for automated testing

## 🎨 Styling Architecture

### Tailwind Configuration
```javascript
// tailwind.config.mjs
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // CSS custom properties for theming
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          // Extended color palette
          50: '#eff6ff',
          100: '#dbeafe',
          // ... more shades
        },
        // Semantic colors
        success: { DEFAULT: '#10b981' },
        warning: { DEFAULT: '#f59e0b' },
        error: { DEFAULT: '#ef4444' },
        info: { DEFAULT: '#3b82f6' },
      },
      // Custom animations
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      // Custom spacing
      spacing: {
        '1': '0.25rem', /* 4px */
        '2': '0.5rem',  /* 8px */
        // ... more spacing values
      },
    },
  },
  plugins: [],
};
```

### CSS Architecture
- **CSS Custom Properties**: Theme variables for consistent theming
- **Utility-First**: Tailwind utilities for rapid development
- **Component Classes**: Reusable component styles
- **Responsive Design**: Mobile-first approach

## 🚀 Build & Deployment

### Build Process
1. **Type Checking**: `astro check` for TypeScript validation
2. **Asset Optimization**: Sharp for image processing
3. **Code Splitting**: Automatic by Astro/Vite
4. **Minification**: CSS, JS, and HTML optimization
5. **Static Generation**: Pre-rendered pages for performance

### Deployment Options
- **Vercel**: Optimized serverless deployment
- **Docker**: Containerized deployment
- **Static Hosting**: Any static hosting service
- **Netlify**: Alternative deployment platform

### Environment Configuration
```env
# Email Configuration
RESEND_API_KEY=your_resend_api_key_here
FROM_EMAIL=noreply@yourdomain.com
TO_EMAIL=hello@example.com

# Logging Configuration
LOG_LEVEL=info
LOG_ENVIRONMENT=development
ENABLE_STRUCTURED_LOGGING=true
```

## 🔒 Security & Performance

### Security Features
- **Input Validation**: Form data validation and sanitization
- **CSRF Protection**: Built-in CSRF protection
- **Content Security Policy**: Configurable CSP headers
- **HTTPS Only**: All deployments use HTTPS

### Performance Features
- **Static Generation**: Pre-rendered pages for fast loading
- **Image Optimization**: WebP format, lazy loading
- **Code Splitting**: Automatic by Astro
- **Caching**: Optimized cache headers
- **Minification**: CSS, JS, and HTML minification

## 📱 Responsive Design

### Breakpoint Strategy
- **Mobile-First**: Base styles for mobile devices
- **Progressive Enhancement**: Features added for larger screens
- **Flexible Grids**: Responsive grid systems
- **Touch-Friendly**: Optimized for touch interfaces

### Component Responsiveness
- **Flexible Layouts**: Components adapt to screen size
- **Responsive Typography**: Scalable text sizing
- **Adaptive Spacing**: Context-aware spacing
- **Mobile Navigation**: Touch-optimized navigation

## ♿ Accessibility

### WCAG Compliance
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: Proper ARIA labels
- **Color Contrast**: WCAG AA compliant contrast ratios
- **Focus Management**: Clear focus indicators

### Accessibility Features
- **Semantic HTML**: Proper heading structure
- **Alt Text**: Descriptive image alt text
- **Form Labels**: Associated form labels
- **Error Messages**: Clear error communication

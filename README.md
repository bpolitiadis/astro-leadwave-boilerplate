# Astro Tailwind Boilerplate

> Template/Boilerplate Notice
>
> This repository is a production-ready boilerplate template. It ships with working core functionality (Astro, Tailwind CSS, logging, testing, SEO, and deployment) so you can parameterize it (branding, copy, tokens, config) and start building immediately.

A production-ready Astro + Tailwind CSS boilerplate with TypeScript, ESLint, Prettier, Playwright, comprehensive logging, and SEO optimization.

## 🚀 Features

- **⚡ Fast Performance**: Built with Astro for optimal performance and SEO
- **🎨 Modern Design**: Styled with Tailwind CSS for beautiful, responsive design
- **🔒 Type Safe**: Full TypeScript support for better development experience
- **📊 Comprehensive Logging**: Structured logging with Pino for production monitoring
- **🔍 SEO Optimized**: Built-in SEO features with meta tags, Open Graph, and sitemap
- **🧪 Testing Ready**: Playwright for end-to-end testing
- **🚀 Production Ready**: Docker configuration and Vercel deployment ready
- **♿ Accessible**: Built with accessibility in mind

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build) ^5.12.0
- **Styling**: [Tailwind CSS](https://tailwindcss.com) ^3.4.17
- **Language**: [TypeScript](https://www.typescriptlang.org) ^5.6.3
- **Logging**: [Pino](https://getpino.io) ^9.7.0
- **Email**: [Resend](https://resend.com) ^4.8.0
- **Testing**: [Playwright](https://playwright.dev) ^1.54.2
- **Linting**: [ESLint](https://eslint.org) ^9.32.0
- **Formatting**: [Prettier](https://prettier.io) ^3.6.2

## 📊 Logging System

This boilerplate includes a comprehensive logging system built with Pino:

### Features

- **Structured Logging**: JSON-formatted logs for easy parsing
- **Environment-Aware**: Different configurations for development and production
- **Vercel Integration**: Optimized for Vercel's logging dashboard
- **Context-Specific Loggers**: Specialized loggers for API, pages, components, and security
- **Performance Tracking**: Built-in performance monitoring
- **Privacy-First**: Automatic email masking and sensitive data protection

### Log Categories

- **API Logs**: Request/response tracking with performance metrics
- **Page Views**: User navigation and page interaction tracking
- **Component Lifecycle**: Component render and interaction events
- **Email Events**: Email sending and delivery tracking
- **Security Events**: Security-related incidents and anomalies
- **Performance Metrics**: Operation timing and performance data

### Usage Examples

```typescript
import { logger, apiLogger, logError, logPerformance, logSecurityEvent } from '../lib/logger';

// Basic logging
logger.info('Application started');

// API logging
apiLogger.info({
  msg: 'API Request',
  method: 'POST',
  url: '/api/contact',
  responseTime: 150,
});

// Error logging
logError(new Error('Something went wrong'), {
  context: 'user_action',
  userId: '123',
});

// Performance tracking
logPerformance('database_query', 45, {
  table: 'users',
  operation: 'select',
});

// Security events
logSecurityEvent('failed_login', {
  ip: '192.168.1.1',
  userAgent: 'Mozilla/5.0...',
});
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- pnpm 8.0.0 or higher

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd astro-tailwind-boilerplate
```

2. Install dependencies:

```bash
pnpm install
```

3. Copy environment variables:

```bash
cp env.example .env
```

4. Configure your environment variables in `.env`:

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

### Development

Start the development server:

```bash
pnpm dev
```

The application will be available at `http://localhost:4321`

### Use as a Template (Parameterization)

When creating a new project from this boilerplate, customize:

- **Branding & Tokens**: Update theme colors, fonts, and tokens in `tailwind.config.mjs` and follow `docs/branding-ux-guidelines.md`.
- **Content & Copy**: Replace example content in `src/pages/`, `src/components/`, and metadata in `src/layouts/`.
- **Assets**: Swap logos and images in `public/` and `src/images/`.
- **Environment**: Duplicate `env.example` to `.env` and set real values.
- **SEO**: Update titles/descriptions/Open Graph in pages and `sitemap`/`robots`.
- **Integrations**: Adjust logger settings (`src/lib/logger.ts`), email config, and deploy target (`vercel.json`).

This template is intentionally minimal yet complete: keep what you need, delete the rest.

### Building

Build for production:

```bash
pnpm build
```

Preview the production build:

```bash
pnpm preview
```

## 🧪 Testing

Run all tests:

```bash
pnpm test
```

Run tests with UI:

```bash
pnpm test:ui
```

Run tests in headed mode:

```bash
pnpm test:headed
```

## 📝 Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint errors
- `pnpm format` - Format code with Prettier
- `pnpm test` - Run Playwright tests
- `pnpm type-check` - Run TypeScript type checking

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy!

The boilerplate is optimized for Vercel with:

- Automatic function optimization
- Structured logging integration
- Performance monitoring
- Security headers

### Docker

Build the Docker image:

```bash
docker build -t astro-tailwind-boilerplate .
```

Run the container:

```bash
docker run -p 4321:4321 astro-tailwind-boilerplate
```

## 📊 Monitoring & Logs

### Vercel Dashboard

- View real-time logs in the Vercel dashboard
- Monitor function performance and errors
- Track API request/response metrics

### Local Development

- Pretty-printed logs in development
- JSON-structured logs in production
- Performance metrics and timing data

### Log Levels

- `trace` - Detailed debugging information
- `debug` - Debug information
- `info` - General information
- `warn` - Warning messages
- `error` - Error messages
- `fatal` - Fatal errors

## 🔧 Configuration

### Logging Configuration

The logging system can be configured through environment variables:

```env
LOG_LEVEL=info                    # Log level (trace, debug, info, warn, error, fatal)
LOG_ENVIRONMENT=development       # Environment (development, production, vercel)
ENABLE_STRUCTURED_LOGGING=true   # Enable structured JSON logging
```

### Tailwind Configuration

Customize Tailwind CSS in `tailwind.config.mjs`:

```javascript
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      // Your custom theme extensions
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
```

## 📁 Project Structure

```
astro-tailwind-boilerplate/
├── src/
│   ├── components/          # Reusable components
│   ├── layouts/            # Page layouts
│   ├── lib/                # Utility libraries (including logger)
│   ├── pages/              # Pages and API routes
│   └── styles/             # Global styles
├── public/                 # Static assets
├── e2e/                    # End-to-end tests
├── docs/                   # Documentation
└── vercel.json            # Vercel configuration
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Run the test suite
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [documentation](docs/)
2. Search existing [issues](../../issues)
3. Create a new issue with detailed information

## 🙏 Acknowledgments

- [Astro](https://astro.build) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com) for the utility-first CSS framework
- [Pino](https://getpino.io) for the excellent logging library
- [Vercel](https://vercel.com) for the deployment platform

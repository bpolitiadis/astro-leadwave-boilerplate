# Astro Tailwind Boilerplate Documentation

> **Template/Boilerplate Notice**
>
> This repository is a production-ready boilerplate template. It ships with working core functionality (Astro, Tailwind CSS, logging, testing, SEO, and deployment) so you can parameterize it (branding, copy, tokens, config) and start building immediately.

## What This Boilerplate Is

A production-ready Astro + Tailwind CSS boilerplate that provides a solid foundation for building modern web applications. It includes comprehensive logging with Pino, end-to-end testing with Playwright, SEO optimization, and deployment configurations for both Vercel and Docker.

## Key Features

- **⚡ Fast Performance**: Built with Astro for optimal performance and SEO
- **🎨 Modern Design**: Styled with Tailwind CSS for beautiful, responsive design
- **🔒 Type Safe**: Full TypeScript support for better development experience
- **📊 Comprehensive Logging**: Structured logging with Pino for production monitoring
- **🔍 SEO Optimized**: Built-in SEO features with meta tags, Open Graph, and sitemap
- **🧪 Testing Ready**: Playwright for end-to-end testing
- **🚀 Production Ready**: Docker configuration and Vercel deployment ready
- **♿ Accessible**: Built with accessibility in mind

## Quick Start

### Prerequisites
- Node.js 18.0.0 or higher
- pnpm 8.0.0 or higher

### Installation & Development
```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

### One-Click Deploy
This boilerplate is optimized for Vercel deployment:
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on every push

## Project Structure

```
src/
├── components/          # Reusable UI components
├── layouts/            # Page layouts with SEO
├── lib/                # Logger and utilities
├── pages/              # Pages and API routes
├── images/             # Image assets
├── assets/             # Static assets
└── styles/             # Global CSS and Tailwind
```

## Common Tasks

### Add a Page
1. Create a new `.astro` file in `src/pages/`
2. Import and use the `Layout` component
3. Add your content and styling

### Add a Component
1. Create a new `.astro` file in `src/components/`
2. Export any props interface
3. Import and use in your pages

### Add Images/Assets
- **Images**: Place in `src/images/` and import with `import Image from '../images/image.jpg'`
- **Static files**: Place in `public/` and reference directly (e.g., `/favicon.svg`)

## Where to Go Next

- **[Architecture Guide](./architecture.md)** - Tech stack, routing, and component patterns
- **[SEO Guide](./seo.md)** - SEO strategy and content authoring
- **[Tailwind Guide](./tailwind.md)** - Styling conventions and customization
- **[Quality Guide](./quality.md)** - Testing, linting, and code quality
- **[Deployment Guide](./deployment.md)** - Vercel and Docker deployment
- **[Content Guide](./content-guide.md)** - Adding pages, components, and assets
- **[Troubleshooting](./troubleshooting.md)** - Common issues and solutions
- **[Branding & UX Guidelines](./branding-ux-guidelines.md)** - Design system and UX principles
- **[Logging Guide](./logging.md)** - Comprehensive logging system and monitoring

## Getting Help

- Check the [troubleshooting guide](./troubleshooting.md) for common issues
- Review the [architecture guide](./architecture.md) for technical details
- Run `pnpm test` to verify everything is working
- Check the [boilerplate review](./boilerplate-review.md) for gaps and recommendations

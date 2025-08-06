# Astro Tailwind Boilerplate

A production-ready boilerplate for modern web applications built with [Astro](https://astro.build), [Tailwind CSS](https://tailwindcss.com), and [TypeScript](https://www.typescriptlang.org).

## 🚀 Features

- **⚡ Lightning Fast**: Built with Astro for optimal performance
- **🎨 Beautiful by Default**: Tailwind CSS with custom design system
- **🔒 Type Safe**: Full TypeScript support with strict configuration
- **🔍 SEO Optimized**: Meta tags, Open Graph, Twitter cards, sitemap, robots.txt
- **♿ Accessible**: WCAG compliant with proper ARIA labels and semantic HTML
- **🧪 Tested**: Playwright for end-to-end testing
- **📦 Production Ready**: Docker, Vercel deployment, comprehensive tooling
- **🎯 Developer Experience**: ESLint, Prettier, hot reload, and more

## 🛠 Tech Stack

- **Framework**: [Astro](https://astro.build) v5.12.x
- **Styling**: [Tailwind CSS](https://tailwindcss.com) v3.4.x
- **Language**: [TypeScript](https://www.typescriptlang.org) v5.6.x
- **Testing**: [Playwright](https://playwright.dev) v1.54.x
- **Linting**: [ESLint](https://eslint.org) v9.32.x
- **Formatting**: [Prettier](https://prettier.io) v3.6.x
- **Package Manager**: [pnpm](https://pnpm.io) v10.11.x
- **Deployment**: [Vercel](https://vercel.com) ready

## 📁 Project Structure

```
astro-tailwind-boilerplate/
├── src/
│   ├── components/          # Reusable UI components
│   ├── layouts/            # Page layouts and templates
│   ├── pages/              # Astro pages and API routes
│   ├── styles/             # Global styles and Tailwind config
│   ├── assets/             # Static assets (SVGs, etc.)
│   └── images/             # Image files
├── public/                 # Static files (favicon, robots.txt, etc.)
├── e2e/                   # Playwright end-to-end tests
├── dist/                  # Build output (generated)
├── .astro/                # Astro cache (generated)
├── astro.config.mjs       # Astro configuration
├── tailwind.config.mjs    # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
├── package.json           # Dependencies and scripts
├── vercel.json           # Vercel deployment configuration
├── Dockerfile            # Docker configuration
├── nginx.conf            # Nginx configuration
└── README.md             # This file
```

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org) 18.0.0 or higher
- [pnpm](https://pnpm.io) 8.0.0 or higher

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd astro-tailwind-boilerplate
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Start development server**

   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:4321](http://localhost:4321)

## 📜 Available Scripts

| Command             | Description                  |
| ------------------- | ---------------------------- |
| `pnpm dev`          | Start development server     |
| `pnpm build`        | Build for production         |
| `pnpm preview`      | Preview production build     |
| `pnpm lint`         | Run ESLint                   |
| `pnpm lint:fix`     | Fix ESLint errors            |
| `pnpm format`       | Format code with Prettier    |
| `pnpm format:check` | Check code formatting        |
| `pnpm type-check`   | Run TypeScript type checking |
| `pnpm test`         | Run Playwright tests         |
| `pnpm test:ui`      | Run tests with UI            |
| `pnpm test:headed`  | Run tests in headed mode     |
| `pnpm test:debug`   | Run tests in debug mode      |
| `pnpm clean`        | Clean build artifacts        |

## 🎨 Styling

### Tailwind CSS

This project uses Tailwind CSS v4 with a custom design system:

```css
/* Custom colors */
.primary-600 {
  /* #3b82f6 */
}
.primary-700 {
  /* #2563eb */
}

/* Custom components */
.btn {
  /* Button base styles */
}
.btn-primary {
  /* Primary button variant */
}
.container-custom {
  /* Responsive container */
}
```

### Custom Components

Reusable components are available in `src/components/`:

- `Header.astro` - Responsive navigation header
- `Footer.astro` - Site footer with links

### Global Styles

Global styles are defined in `src/styles/global.css` with:

- Tailwind directives
- Custom CSS variables
- Accessibility focus styles
- Responsive utilities

## 🔍 SEO & Meta Tags

### Layout Props

The main layout accepts comprehensive SEO props:

```astro
<Layout
  title='Page Title'
  description='Page description'
  image='/og-image.jpg'
  type='website'
  canonical='/page-url'
  publishedTime='2024-01-01'
  author='Author Name'
  tags={['tag1', 'tag2']}
/>
```

### Generated Files

- **Sitemap**: `/sitemap.xml` (auto-generated)
- **Robots**: `/robots.txt` (auto-generated)
- **Favicon**: `/favicon.svg`

### Meta Tags Included

- Open Graph (Facebook)
- Twitter Cards
- Canonical URLs
- Article meta tags
- Structured data ready

## 🧪 Testing

### Playwright Setup

Tests are located in `e2e/` and include:

- **Navigation tests**: Link functionality
- **SEO tests**: Meta tag verification
- **Accessibility tests**: ARIA compliance
- **Responsive tests**: Mobile/desktop views
- **Performance tests**: Asset loading

### Running Tests

```bash
# Install Playwright browsers
pnpm install:playwright

# Run all tests
pnpm test

# Run with UI
pnpm test:ui

# Run in headed mode
pnpm test:headed
```

### Test Structure

```typescript
// Example test
test('should load homepage successfully', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Astro Tailwind Boilerplate/);
});
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect repository** to Vercel
2. **Deploy automatically** on push to main branch
3. **Environment variables** configured in Vercel dashboard

### Docker

```bash
# Build image
docker build -t astro-app .

# Run container
docker run -p 80:80 astro-app
```

### Manual Deployment

```bash
# Build for production
pnpm build

# Deploy dist/ folder to your hosting provider
```

## 🔧 Configuration

### Astro Config (`astro.config.mjs`)

```javascript
export default defineConfig({
  site: 'https://your-domain.com',
  integrations: [],
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
```

### Tailwind Config (`tailwind.config.mjs`)

```javascript
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        /* Custom colors */
      },
      fontFamily: {
        /* Custom fonts */
      },
      animation: {
        /* Custom animations */
      },
    },
  },
};
```

### TypeScript Config (`tsconfig.json`)

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

## 📱 Responsive Design

The boilerplate is fully responsive with:

- **Mobile-first** approach
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Flexible layouts** using CSS Grid and Flexbox
- **Touch-friendly** navigation and interactions

## ♿ Accessibility

Built with accessibility in mind:

- **Semantic HTML** structure
- **ARIA labels** and roles
- **Keyboard navigation** support
- **Focus management** with visible indicators
- **Screen reader** compatibility
- **Color contrast** compliance

## 🔒 Security

Security features included:

- **Content Security Policy** headers
- **XSS protection** headers
- **Frame options** to prevent clickjacking
- **Referrer policy** configuration
- **HTTPS enforcement** ready

## 📈 Performance

Optimized for performance:

- **Static site generation** with Astro
- **Image optimization** pipeline
- **CSS purging** with Tailwind
- **Code splitting** and lazy loading
- **Caching strategies** for assets
- **Gzip compression** ready

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Astro](https://astro.build) team for the amazing framework
- [Tailwind CSS](https://tailwindcss.com) for the utility-first CSS framework
- [Playwright](https://playwright.dev) for end-to-end testing
- [Vercel](https://vercel.com) for deployment platform

## 📞 Support

- **Documentation**: [Astro Docs](https://docs.astro.build)
- **Issues**: [GitHub Issues](https://github.com/your-repo/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-repo/discussions)

---

**Built with ❤️ using Astro + Tailwind CSS**

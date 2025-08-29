# SEO Guide

> **Template/Boilerplate Notice**
>
> This document describes the SEO strategy and implementation in the boilerplate template. Use this to understand how SEO is configured and how to optimize your content.

## SEO Strategy as Implemented

### Head Tags & Meta Components
The boilerplate implements a comprehensive SEO component pattern through the `Layout.astro` component:

```astro
<!-- src/layouts/Layout.astro -->
<meta charset='UTF-8' />
<meta name='description' content={description} />
<meta name='viewport' content='width=device-width, initial-scale=1.0' />
<link rel='icon' type='image/svg+xml' href='/favicon.svg' />
<meta name='generator' content={Astro.generator} />
<title>{title}</title>

<!-- Open Graph -->
<meta property='og:type' content='website' />
<meta property='og:title' content={title} />
<meta property='og:description' content={description} />
<meta property='og:image' content={new URL(image, Astro.url)} />

<!-- Twitter Card -->
<meta name='twitter:card' content='summary_large_image' />
<meta name='twitter:title' content={title} />
<meta name='twitter:description' content={description} />
<meta name='twitter:image' content={new URL(image, Astro.url)} />
```

### Sitemap Generation
Dynamic sitemap generation via `src/pages/sitemap.xml.ts`:

```typescript
// src/pages/sitemap.xml.ts
export const GET: APIRoute = () => {
  const baseUrl = import.meta.env.SITE || 'https://your-domain.com';
  
  const pages = [
    {
      url: baseUrl,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/contact`,
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: 0.8,
    },
  ];
  
  // Generate XML sitemap...
};
```

### Robots.txt Rules
Dynamic robots.txt generation via `src/pages/robots.txt.ts`:

```typescript
// src/pages/robots.txt.ts
export const GET: APIRoute = () => {
  const robotsTxt = `
User-agent: *
Allow: /

# Sitemap
Sitemap: ${import.meta.env.SITE || 'https://your-domain.com'}/sitemap.xml
`.trim();
  
  return new Response(robotsTxt, {
    status: 200,
    headers: { 'Content-Type': 'text/plain' },
  });
};
```

### Favicons & Manifest
- **Favicon**: Located at `public/favicon.svg`
- **Open Graph Image**: Located at `public/og-image.jpg`
- **Manifest**: Not implemented yet

## Content Authoring Guidelines

### Page Metadata
Each page should provide proper metadata through the Layout component:

```astro
---
import Layout from '../layouts/Layout.astro';

export interface Props {
  title: string;
  description?: string;
  image?: string;
}

const { title, description, image } = Astro.props;
---

<Layout 
  title={title}
  description={description}
  image={image}
>
  <!-- Page content -->
</Layout>
```

### Title Guidelines
- **Length**: 50-60 characters maximum
- **Format**: `Primary Keyword | Brand Name`
- **Examples**: 
  - `Contact Us | Astro Boilerplate`
  - `About Our Company | Astro Boilerplate`

### Meta Description Guidelines
- **Length**: 150-160 characters maximum
- **Content**: Clear, compelling description with primary keyword
- **Call-to-Action**: Include action words when appropriate
- **Examples**:
  - `Get in touch with our team for support, partnerships, or general inquiries.`
  - `Learn about our mission, values, and the team behind our success.`

### Open Graph Guidelines
- **Image Dimensions**: 1200x630 pixels (16:9 ratio)
- **Image Format**: JPG or PNG
- **Content**: Relevant to the page content
- **Alt Text**: Descriptive alt text for accessibility

## Internationalization

### Current Status
- **Not implemented yet** - The boilerplate is currently English-only
- **Future Considerations**: 
  - Locale-based routing (`/en/`, `/es/`, etc.)
  - Translation files
  - Hreflang tags
  - Localized sitemaps

## Performance Considerations

### Images
- **Optimization**: Astro automatically optimizes imported images
- **Formats**: Use WebP when possible for better compression
- **Lazy Loading**: Implement lazy loading for below-the-fold images
- **Responsive Images**: Use `srcset` for different screen sizes

### Fonts
- **Web Fonts**: Inter font family loaded from system fonts
- **Performance**: Font loading is optimized for performance
- **Fallbacks**: System font fallbacks for better loading experience

### Critical CSS
- **Tailwind**: Utility-first approach reduces unused CSS
- **Purge**: Tailwind automatically purges unused styles in production
- **Inlining**: Critical CSS can be inlined for better performance

## SEO Implementation Files

### Core SEO Files
- **Layout Component**: `src/layouts/Layout.astro` - Base SEO structure
- **Sitemap Generator**: `src/pages/sitemap.xml.ts` - Dynamic sitemap
- **Robots Generator**: `src/pages/robots.txt.ts` - Dynamic robots.txt
- **Homepage**: `src/pages/index.astro` - Example SEO implementation

### Configuration Files
- **Astro Config**: `astro.config.mjs` - Site URL configuration
- **Environment**: `.env` - Site URL and meta configuration
- **Vercel Config**: `vercel.json` - SEO-friendly redirects and headers

## SEO Best Practices Implemented

### Technical SEO
✅ **Meta Tags**: Complete meta tag implementation  
✅ **Open Graph**: Social media sharing optimization  
✅ **Twitter Cards**: Twitter-specific meta tags  
✅ **Sitemap**: Dynamic XML sitemap generation  
✅ **Robots.txt**: Search engine crawling instructions  
✅ **Structured Data**: Basic structured data support  
✅ **Performance**: Optimized images and CSS  

### Content SEO
✅ **Semantic HTML**: Proper heading hierarchy  
✅ **Alt Text**: Image accessibility and SEO  
✅ **Internal Linking**: Navigation and content linking  
✅ **URL Structure**: Clean, descriptive URLs  
✅ **Content Optimization**: Keyword-optimized content  

### User Experience
✅ **Mobile-First**: Responsive design for all devices  
✅ **Accessibility**: ARIA labels and keyboard navigation  
✅ **Page Speed**: Optimized loading performance  
✅ **Navigation**: Clear site structure and navigation  

## Future SEO Enhancements

### Planned Features
- **Schema Markup**: Enhanced structured data
- **Breadcrumbs**: Navigation and SEO improvement
- **Local SEO**: Location-based optimization
- **Analytics**: SEO performance tracking
- **Core Web Vitals**: Performance monitoring

### Implementation Notes
- All SEO features are production-ready
- Configuration is environment-aware
- SEO is automatically applied to all pages
- Performance is prioritized alongside SEO

# Content Guide

> **Template/Boilerplate Notice**
>
> This document describes how to add and manage content in the boilerplate template. Use this to understand the content structure and add new pages, components, and assets.

## How to Add Pages

### Astro Page Conventions
Pages in Astro use file-based routing. Create `.astro` files in the `src/pages/` directory:

```
src/pages/
├── index.astro          # Homepage (/)
├── about.astro          # About page (/about)
├── contact.astro        # Contact page (/contact)
├── blog/
│   ├── index.astro      # Blog listing (/blog)
│   └── [slug].astro     # Dynamic blog post (/blog/post-title)
└── api/
    └── contact.ts       # API routes (/api/contact)
```

### Basic Page Structure
```astro
---
import Layout from '../layouts/Layout.astro';

export interface Props {
  title: string;
  description?: string;
}

const { title, description = 'Default description' } = Astro.props;
---

<Layout title={title} description={description}>
  <div class="container-custom py-16">
    <h1 class="text-4xl font-bold text-gray-900 mb-6">{title}</h1>
    <p class="text-lg text-gray-600 mb-8">{description}</p>
    
    <!-- Page content goes here -->
    <div class="prose prose-lg max-w-none">
      <p>Your page content here...</p>
    </div>
  </div>
</Layout>
```

### Dynamic Routes
For dynamic content like blog posts:

```astro
---
// src/pages/blog/[slug].astro
import Layout from '../../layouts/Layout.astro';

export async function getStaticPaths() {
  // Generate paths for all blog posts
  const posts = await getBlogPosts();
  
  return posts.map(post => ({
    params: { slug: post.slug },
    props: { post }
  }));
}

export interface Props {
  post: BlogPost;
}

const { post } = Astro.props;
---

<Layout title={post.title} description={post.excerpt}>
  <article class="container-custom py-16">
    <h1 class="text-4xl font-bold text-gray-900 mb-6">{post.title}</h1>
    <div class="prose prose-lg max-w-none">
      {post.content}
    </div>
  </article>
</Layout>
```

### Page Metadata
Always provide proper metadata for SEO:

```astro
---
export interface Props {
  title: string;
  description?: string;
  image?: string;
  canonical?: string;
}

const { 
  title, 
  description = 'Default description',
  image = '/og-image.jpg',
  canonical 
} = Astro.props;

// Set canonical URL
if (canonical) {
  Astro.url.pathname = canonical;
}
---

<Layout 
  title={title}
  description={description}
  image={image}
>
  <!-- Page content -->
</Layout>
```

## How to Add Components

### Component Structure
Components are reusable UI elements stored in `src/components/`:

```
src/components/
├── Header.astro          # Site header
├── Footer.astro          # Site footer
├── ContactForm.astro     # Contact form
├── Button.astro          # Reusable button
├── Card.astro            # Card component
└── ui/                   # UI component library
    ├── Button.astro
    ├── Input.astro
    └── Modal.astro
```

### Component Template
```astro
---
// src/components/Button.astro
export interface Props {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  href?: string;
  class?: string;
}

const { 
  variant = 'primary',
  size = 'md',
  disabled = false,
  href,
  class: className = ''
} = Astro.props;

const baseClasses = 'btn';
const variantClasses = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  outline: 'btn-outline'
};
const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base'
};

const classes = [
  baseClasses,
  variantClasses[variant],
  sizeClasses[size],
  disabled ? 'opacity-50 cursor-not-allowed' : '',
  className
].filter(Boolean).join(' ');
---

{href ? (
  <a href={href} class={classes} aria-disabled={disabled}>
    <slot />
  </a>
) : (
  <button class={classes} disabled={disabled}>
    <slot />
  </button>
)}
```

### Using Components
```astro
---
import Button from '../components/Button.astro';
import Card from '../components/Card.astro';
---

<div class="space-y-6">
  <Card>
    <h2 class="card-header">Component Example</h2>
    <p class="text-gray-600 mb-4">This shows how to use components.</p>
    <div class="flex gap-4">
      <Button variant="primary">Primary Action</Button>
      <Button variant="secondary">Secondary Action</Button>
    </div>
  </Card>
</div>
```

### Component Props
- **Required Props**: Define in interface without default values
- **Optional Props**: Use `?` and provide sensible defaults
- **Validation**: TypeScript ensures proper prop usage
- **Documentation**: Comment complex props for clarity

## How to Add Images/Assets

### Image Management
Astro provides optimized image handling:

```
src/images/              # Optimized images
├── hero.jpg             # Hero section image
├── logo.svg             # Company logo
├── team/                # Team photos
│   ├── member1.jpg
│   └── member2.jpg
└── icons/               # Icon assets
    ├── check.svg
    └── arrow.svg
```

### Importing Images
```astro
---
import heroImage from '../images/hero.jpg';
import logo from '../images/logo.svg';
---

<div class="hero-section">
  <img 
    src={heroImage} 
    alt="Hero image description"
    class="w-full h-64 object-cover rounded-lg"
  />
  <img 
    src={logo} 
    alt="Company logo"
    class="h-12 w-auto"
  />
</div>
```

### Static Assets
Files in `public/` are served directly:

```
public/
├── favicon.svg          # Site favicon
├── og-image.jpg         # Open Graph image
├── robots.txt           # Robots file
├── sitemap.xml          # Sitemap
└── assets/              # Static assets
    ├── fonts/           # Custom fonts
    ├── icons/           # Icon files
    └── documents/       # PDFs, docs
```

### Referencing Static Assets
```astro
<!-- Direct reference from public/ -->
<img src="/assets/icons/check.svg" alt="Check icon" />
<a href="/assets/documents/brochure.pdf">Download Brochure</a>
<link rel="icon" href="/favicon.svg" />
```

### Image Optimization
- **Automatic Optimization**: Astro optimizes imported images
- **Format Conversion**: Automatic WebP conversion when supported
- **Responsive Images**: Use `srcset` for different screen sizes
- **Lazy Loading**: Implement for below-the-fold images

## Content Authoring Guidelines

### Writing Style
- **Clear & Concise**: Use simple, direct language
- **Consistent Tone**: Maintain brand voice across all content
- **Action-Oriented**: Use active voice and clear calls-to-action
- **Accessible**: Write for all reading levels

### SEO Content
- **Keyword Research**: Identify relevant keywords for each page
- **Title Optimization**: 50-60 characters with primary keyword
- **Meta Descriptions**: 150-160 characters with compelling summary
- **Heading Structure**: Use H1, H2, H3 hierarchy properly
- **Internal Linking**: Link to related pages within your site

### Accessibility Guidelines
- **Alt Text**: Descriptive alt text for all images
- **Semantic HTML**: Use proper HTML elements (article, section, nav)
- **ARIA Labels**: Add ARIA labels for complex interactions
- **Keyboard Navigation**: Ensure all interactive elements are keyboard accessible
- **Color Contrast**: Maintain sufficient contrast ratios

### Content Types

#### Text Content
```astro
<div class="prose prose-lg max-w-none">
  <h2>Section Heading</h2>
  <p>Paragraph text with proper spacing and typography.</p>
  
  <ul>
    <li>List item one</li>
    <li>List item two</li>
    <li>List item three</li>
  </ul>
  
  <blockquote>
    <p>Quote or testimonial content.</p>
    <cite>— Attribution</cite>
  </blockquote>
</div>
```

#### Interactive Elements
```astro
<div class="space-y-4">
  <button class="btn btn-primary">
    Primary Action
  </button>
  
  <form class="space-y-4">
    <label for="email" class="form-label">Email Address</label>
    <input 
      type="email" 
      id="email" 
      name="email" 
      class="form-input"
      required
    />
  </form>
</div>
```

#### Media Content
```astro
<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
  <div class="aspect-video">
    <img 
      src={image1} 
      alt="Description of image 1"
      class="w-full h-full object-cover rounded-lg"
    />
  </div>
  
  <div class="aspect-video">
    <img 
      src={image2} 
      alt="Description of image 2"
      class="w-full h-full object-cover rounded-lg"
    />
  </div>
</div>
```

## Content Management Workflow

### Content Planning
1. **Audience Research**: Understand your target audience
2. **Content Strategy**: Plan content themes and topics
3. **SEO Planning**: Identify target keywords and search intent
4. **Content Calendar**: Schedule content creation and updates

### Content Creation
1. **Outline**: Create content structure and flow
2. **Draft**: Write initial content with SEO in mind
3. **Review**: Check for accuracy, clarity, and brand consistency
4. **Optimize**: Apply SEO best practices and accessibility guidelines

### Content Maintenance
1. **Regular Updates**: Keep content fresh and relevant
2. **Performance Monitoring**: Track content performance metrics
3. **User Feedback**: Incorporate user feedback and analytics
4. **SEO Audits**: Regular content and technical SEO reviews

## Best Practices

### Content Organization
- **Logical Structure**: Organize content in logical, intuitive ways
- **Consistent Formatting**: Use consistent styling and layout patterns
- **Clear Navigation**: Provide clear paths to related content
- **Search Functionality**: Implement search for larger content sites

### Performance Optimization
- **Image Optimization**: Compress and optimize all images
- **Lazy Loading**: Implement lazy loading for images and media
- **Content Caching**: Use appropriate caching strategies
- **CDN Delivery**: Serve content from edge locations

### Quality Assurance
- **Content Review**: Regular content accuracy and quality reviews
- **Accessibility Testing**: Test with screen readers and keyboard navigation
- **Cross-browser Testing**: Ensure content displays correctly across browsers
- **Mobile Testing**: Verify content works well on mobile devices

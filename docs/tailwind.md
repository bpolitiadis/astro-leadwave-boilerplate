# Tailwind CSS Guide

> **Template/Boilerplate Notice**
>
> This document describes the Tailwind CSS configuration and usage patterns in the boilerplate template. Use this to understand how to customize styles and maintain consistency.

## Tailwind Configuration

### Version & Setup
- **Tailwind CSS**: v3.4.17
- **Integration**: @astrojs/tailwind v6.0.2
- **Typography Plugin**: @tailwindcss/typography v0.5.16

### Configuration File
```javascript
// tailwind.config.mjs
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      // Custom theme extensions
    },
  },
  plugins: [],
};
```

### Content Paths
Tailwind scans these file types for class usage:
- `.astro` - Astro components and pages
- `.html` - HTML files
- `.js/.jsx` - JavaScript/React files
- `.ts/.tsx` - TypeScript files
- `.md/.mdx` - Markdown files
- `.svelte` - Svelte components
- `.vue` - Vue components

## Theme Tokens

### Color Palette
The boilerplate includes a comprehensive color system:

```javascript
// tailwind.config.mjs
colors: {
  primary: {
    50: '#eff6ff',   // Lightest
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',  // Base
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554',  // Darkest
  },
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  slate: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  success: { /* Green variants */ },
  warning: { /* Yellow variants */ },
  error: { /* Red variants */ },
  info: { /* Blue variants */ },
}
```

### Typography
- **Font Family**: Inter (system fallback)
- **Font Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold), 800 (extrabold)
- **Line Heights**: Tight, normal, relaxed
- **Text Sizes**: xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl

### Spacing Scale
Custom spacing values for consistent layouts:
```javascript
spacing: {
  '1': '0.25rem',    // 4px
  '2': '0.5rem',     // 8px
  '3': '0.75rem',    // 12px
  '4': '1rem',       // 16px
  '5': '1.25rem',    // 20px
  '6': '1.5rem',     // 24px
  '8': '2rem',       // 32px
  '10': '2.5rem',    // 40px
  '12': '3rem',      // 48px
  '16': '4rem',      // 64px
  '20': '5rem',      // 80px
  '24': '6rem',      // 96px
  '28': '7rem',      // 112px
  '32': '8rem',      // 128px
}
```

### Border Radius
Custom border radius values:
```javascript
borderRadius: {
  'sm': '0.125rem',  // 2px
  'md': '0.375rem',  // 6px
  'lg': '0.5rem',    // 8px
  'xl': '0.75rem',   // 12px
  '2xl': '1rem',     // 16px
  '3xl': '1.5rem',   // 24px
}
```

### Enhanced Shadows
Custom shadow values for depth:
```javascript
boxShadow: {
  'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
  'glow': '0 0 20px rgba(59, 130, 246, 0.15)',
  'glow-lg': '0 0 40px rgba(59, 130, 246, 0.2)',
}
```

### Animations
Custom animation keyframes:
```javascript
animation: {
  'fade-in': 'fadeIn 0.5s ease-in-out',
  'slide-up': 'slideUp 0.3s ease-out',
  'float': 'float 6s ease-in-out infinite',
  'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
}
```

## Utility Conventions

### Container System
Use the custom container class for consistent page layouts:
```css
/* src/styles/global.css */
.container-custom {
  @apply mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 xl:px-16;
}
```

### Button Components
Pre-built button styles with consistent variants and enhanced hover states:

```css
.btn {
  @apply inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none;
}

.btn-primary {
  @apply bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 hover:shadow-lg hover:shadow-primary-500/25;
}

.btn-secondary {
  @apply bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-300 hover:shadow-lg hover:shadow-gray-500/25;
}

/* Hero-specific button variants */
.btn-hero {
  @apply px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-200 hover:shadow-lg;
}

.btn-hero-primary {
  @apply bg-gray-900 text-white hover:bg-gray-800 hover:shadow-xl hover:shadow-gray-900/25;
}

.btn-hero-secondary {
  @apply bg-white text-gray-800 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-xl hover:shadow-gray-500/25;
}
```

### Form Components
Consistent form styling across the application:
```css
.form-input {
  @apply block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm;
}

.form-label {
  @apply block text-sm font-medium text-gray-700;
}

.form-error {
  @apply mt-1 text-sm text-red-600;
}
```

### Navigation Components
Standard navigation styling with improved hover states:
```css
.nav-link {
  @apply text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-gray-50;
}

.nav-link-active {
  @apply text-primary-600 bg-primary-50 font-medium px-3 py-2 rounded-md text-sm;
}
```

## Custom Components

### Card System
Reusable card components with enhanced hover effects:
```css
.card {
  @apply bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300;
}

.card-header {
  @apply text-lg font-semibold text-gray-900 mb-4;
}
```

### Message States
Success and error message styling:
```css
.message-success {
  @apply bg-green-50 text-green-800 border border-green-200 rounded-md p-4;
}

.message-error {
  @apply bg-red-50 text-red-800 border border-red-200 rounded-md p-4;
}
```

## Responsive Design

### Breakpoint System
Standard Tailwind breakpoints:
- **sm**: 640px and up
- **md**: 768px and up
- **lg**: 1024px and up
- **xl**: 1280px and up
- **2xl**: 1536px and up

### Mobile-First Approach
```astro
<!-- Example responsive design -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div class="text-center">
    <!-- Content -->
  </div>
</div>
```

## Animation & Transitions

### Built-in Animations
```css
animation: {
  'fade-in': 'fadeIn 0.5s ease-in-out',
  'slide-up': 'slideUp 0.3s ease-out',
  'float': 'float 6s ease-in-out infinite',
  'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
}
```

### Keyframes
```css
keyframes: {
  fadeIn: {
    '0%': { opacity: '0' },
    '100%': { opacity: '1' },
  },
  slideUp: {
    '0%': { transform: 'translateY(10px)', opacity: '0' },
    '100%': { transform: 'translateY(0)', opacity: '1' },
  },
  float: {
    '0%, 100%': { transform: 'translateY(0px)' },
    '50%': { transform: 'translateY(-10px)' },
  },
  pulseSoft: {
    '0%, 100%': { opacity: '0.8' },
    '50%': { opacity: '0.4' },
  },
}
```

### Transition Classes
```astro
<!-- Smooth transitions with enhanced hover effects -->
<button class="transition-all duration-200 hover:shadow-lg hover:shadow-primary-500/25">
  Hover me
</button>
```

## Accessibility

### Focus Management
```css
/* Global focus styles */
*:focus-visible {
  @apply outline-none ring-2 ring-primary-500 ring-offset-2;
}
```

### Color Contrast
- **Primary colors**: Meet WCAG AA contrast requirements
- **Text colors**: High contrast for readability
- **Interactive elements**: Clear focus indicators

## Customization Guidelines

### Adding New Colors
1. Add to `tailwind.config.mjs` under `theme.extend.colors`
2. Use semantic naming (e.g., `brand`, `accent`)
3. Include full color scale (50-950)

### Adding New Components
1. Create in `src/styles/global.css` under `@layer components`
2. Use consistent naming convention
3. Include responsive variants when needed
4. Add enhanced hover states and transitions

### Overriding Defaults
```javascript
// tailwind.config.mjs
theme: {
  extend: {
    // Add new values
  },
  // Override defaults
  colors: {
    // Custom color palette
  },
}
```

## Performance Considerations

### PurgeCSS Integration
- **Automatic purging**: Unused CSS is removed in production
- **Content scanning**: All file types are scanned for class usage
- **Safe mode**: Critical classes are preserved

### CSS Optimization
- **Minification**: CSS is minified in production builds
- **Critical CSS**: Important styles are inlined
- **Lazy loading**: Non-critical styles are loaded asynchronously

## Best Practices

### Class Organization
1. **Layout first**: Container, grid, flexbox
2. **Spacing**: Margins, padding, positioning
3. **Typography**: Text size, weight, color
4. **Visual**: Background, border, shadow
5. **Interactive**: Hover, focus, active states
6. **Transitions**: Smooth animations and hover effects

### Responsive Design
1. **Mobile-first**: Start with mobile styles
2. **Progressive enhancement**: Add complexity for larger screens
3. **Consistent spacing**: Use the spacing scale consistently

### Component Consistency
1. **Reuse patterns**: Use existing component classes
2. **Variant system**: Create consistent component variants
3. **Enhanced interactions**: Include hover states and transitions
4. **Documentation**: Document new component patterns

### Visual Hierarchy
1. **Consistent spacing**: Use the defined spacing scale
2. **Enhanced shadows**: Apply appropriate shadow levels for depth
3. **Smooth transitions**: Use consistent transition durations
4. **Hover states**: Provide clear visual feedback for interactions

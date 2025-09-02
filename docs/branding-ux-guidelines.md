# Branding & UX Guidelines

> **Template/Boilerplate Notice**
>
> These are default branding and UX guidelines provided by the boilerplate template. Treat every token, color, and pattern as a starting point—replace them with your brand's system and update theme tokens in `tailwind.config.mjs`.

This document outlines the design system, branding guidelines, and UX principles for the Astro Tailwind Boilerplate.

## 🎨 Design System

### Color Palette

#### Primary Colors

```css
/* Blue - Primary brand color */
--color-primary-50: #eff6ff;
--color-primary-100: #dbeafe;
--color-primary-200: #bfdbfe;
--color-primary-300: #93c5fd;
--color-primary-400: #60a5fa;
--color-primary-500: #3b82f6; /* Main brand color */
--color-primary-600: #2563eb;
--color-primary-700: #1d4ed8;
--color-primary-800: #1e40af;
--color-primary-900: #1e3a8a;
--color-primary-950: #172554;
```

#### Neutral Colors

```css
/* Gray scale for text and backgrounds */
--color-gray-50: #f9fafb;
--color-gray-100: #f3f4f6;
--color-gray-200: #e5e7eb;
--color-gray-300: #d1d5db;
--color-gray-400: #9ca3af;
--color-gray-500: #6b7280;
--color-gray-600: #4b5563;
--color-gray-700: #374151;
--color-gray-800: #1f2937;
--color-gray-900: #111827;
```

#### Semantic Colors

```css
/* Success, Warning, Error states */
--color-success: #10b981; /* Green */
--color-warning: #f59e0b; /* Amber */
--color-error: #ef4444; /* Red */
--color-info: #3b82f6; /* Blue */
```

### Typography

#### Font Stack

```css
/* Primary font family */
font-family:
  'Inter',
  -apple-system,
  BlinkMacSystemFont,
  'Segoe UI',
  'Roboto',
  'Oxygen',
  'Ubuntu',
  'Cantarell',
  sans-serif;
```

#### Type Scale

```css
/* Heading sizes */
--text-xs: 0.75rem; /* 12px */
--text-sm: 0.875rem; /* 14px */
--text-base: 1rem; /* 16px */
--text-lg: 1.125rem; /* 18px */
--text-xl: 1.25rem; /* 20px */
--text-2xl: 1.5rem; /* 24px */
--text-3xl: 1.875rem; /* 30px */
--text-4xl: 2.25rem; /* 36px */
--text-5xl: 3rem; /* 48px */
--text-6xl: 3.75rem; /* 60px */
```

#### Font Weights

```css
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;
```

### Spacing System

```css
/* Consistent spacing scale */
--spacing-1: 0.25rem;  /* 4px */
--spacing-2: 0.5rem;   /* 8px */
--spacing-3: 0.75rem;  /* 12px */
--spacing-4: 1rem;     /* 16px */
--spacing-5: 1.25rem;  /* 20px */
--spacing-6: 1.5rem;   /* 24px */
--spacing-8: 2rem;     /* 32px */
--spacing-10: 2.5rem;  /* 40px */
--spacing-12: 3rem;    /* 48px */
--spacing-16: 4rem;    /* 64px */
--spacing-20: 5rem;    /* 80px */
--spacing-24: 6rem;    /* 96px */
--spacing-28: 7rem;    /* 112px */
--spacing-32: 8rem;    /* 128px */
```

### Border Radius

```css
/* Consistent border radius scale */
--radius-sm: 0.125rem;  /* 2px */
--radius-md: 0.375rem;  /* 6px */
--radius-lg: 0.5rem;    /* 8px */
--radius-xl: 0.75rem;   /* 12px */
--radius-2xl: 1rem;     /* 16px */
--radius-3xl: 1.5rem;   /* 24px */
```

## 🎭 Component Design

### Button Components

#### Primary Button
```astro
<!-- Primary button with hover effects -->
<button class="bg-primary-500 hover:bg-primary-600 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
  Primary Action
</button>
```

#### Secondary Button
```astro
<!-- Secondary button with outline style -->
<button class="border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white font-medium px-6 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
  Secondary Action
</button>
```

#### Ghost Button
```astro
<!-- Ghost button for subtle actions -->
<button class="text-primary-500 hover:bg-primary-50 font-medium px-6 py-3 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
  Ghost Action
</button>
```

### Card Components

#### Basic Card
```astro
<!-- Basic card with consistent spacing -->
<div class="bg-white border border-gray-200 rounded-lg p-6 shadow-soft hover:shadow-glow transition-shadow duration-200">
  <h3 class="text-xl font-semibold text-gray-900 mb-2">Card Title</h3>
  <p class="text-gray-600">Card content goes here with consistent typography and spacing.</p>
</div>
```

#### Interactive Card
```astro
<!-- Interactive card with hover effects -->
<div class="bg-white border border-gray-200 rounded-lg p-6 shadow-soft hover:shadow-glow hover:border-primary-200 transition-all duration-200 cursor-pointer">
  <h3 class="text-xl font-semibold text-gray-900 mb-2">Interactive Card</h3>
  <p class="text-gray-600">This card responds to user interaction with smooth transitions.</p>
</div>
```

### Form Components

#### Input Field
```astro
<!-- Consistent input styling -->
<div class="space-y-2">
  <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
  <input 
    type="email" 
    id="email" 
    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
    placeholder="Enter your email"
  />
</div>
```

#### Textarea
```astro
<!-- Textarea with consistent styling -->
<div class="space-y-2">
  <label for="message" class="block text-sm font-medium text-gray-700">Message</label>
  <textarea 
    id="message" 
    rows="4"
    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 resize-vertical"
    placeholder="Enter your message"
  ></textarea>
</div>
```

## 🎨 Animation System

### Micro-Interactions

#### Fade In
```css
/* Smooth fade in animation */
.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
```

#### Slide Up
```css
/* Slide up animation for content */
.animate-slide-up {
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  0% { 
    transform: translateY(10px); 
    opacity: 0; 
  }
  100% { 
    transform: translateY(0); 
    opacity: 1; 
  }
}
```

#### Float
```css
/* Gentle floating animation */
.animate-float {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}
```

#### Pulse Soft
```css
/* Subtle pulse animation */
.animate-pulse-soft {
  animation: pulseSoft 2s ease-in-out infinite;
}

@keyframes pulseSoft {
  0%, 100% { opacity: 0.8; }
  50% { opacity: 0.4; }
}
```

### Hover Effects

#### Button Hover
```css
/* Smooth button hover transitions */
.btn-primary {
  @apply bg-primary-500 text-white px-6 py-3 rounded-lg;
  transition: all 0.2s ease-in-out;
}

.btn-primary:hover {
  @apply bg-primary-600 shadow-glow;
  transform: translateY(-1px);
}
```

#### Card Hover
```css
/* Card hover effects */
.card {
  @apply bg-white border border-gray-200 rounded-lg p-6;
  transition: all 0.2s ease-in-out;
}

.card:hover {
  @apply shadow-glow border-primary-200;
  transform: translateY(-2px);
}
```

## 📱 Responsive Design

### Breakpoint Strategy

```css
/* Mobile-first responsive design */
.container {
  @apply px-4 mx-auto;
}

/* Small screens (640px and up) */
@media (min-width: 640px) {
  .container {
    @apply px-6;
  }
}

/* Medium screens (768px and up) */
@media (min-width: 768px) {
  .container {
    @apply px-8;
  }
}

/* Large screens (1024px and up) */
@media (min-width: 1024px) {
  .container {
    @apply px-12;
  }
}
```

### Grid Systems

#### Responsive Grid
```astro
<!-- Responsive grid layout -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div class="card">Grid Item 1</div>
  <div class="card">Grid Item 2</div>
  <div class="card">Grid Item 3</div>
</div>
```

#### Flexbox Layouts
```astro
<!-- Flexible flexbox layouts -->
<div class="flex flex-col md:flex-row items-center justify-between gap-4">
  <div class="flex-1">Content</div>
  <div class="flex-shrink-0">Actions</div>
</div>
```

## ♿ Accessibility Guidelines

### Color Contrast

- **Text**: Minimum 4.5:1 contrast ratio for normal text
- **Large Text**: Minimum 3:1 contrast ratio for text 18px+ or 14px+ bold
- **Interactive Elements**: Minimum 3:1 contrast ratio for buttons and links

### Focus Management

```css
/* Clear focus indicators */
.focus-visible {
  @apply outline-none ring-2 ring-primary-500 ring-offset-2;
}

/* Focus ring for interactive elements */
.btn:focus {
  @apply outline-none ring-2 ring-primary-500 ring-offset-2;
}
```

### Screen Reader Support

```astro
<!-- Proper ARIA labels -->
<button 
  aria-label="Close modal"
  class="btn-close"
>
  <span aria-hidden="true">&times;</span>
</button>

<!-- Semantic HTML structure -->
<nav aria-label="Main navigation">
  <ul role="menubar">
    <li role="none"><a role="menuitem" href="/">Home</a></li>
    <li role="none"><a role="menuitem" href="/about">About</a></li>
  </ul>
</nav>
```

## 🎯 UX Principles

### User Experience Guidelines

1. **Clarity**: Clear visual hierarchy and information architecture
2. **Consistency**: Uniform patterns across all components and pages
3. **Efficiency**: Minimize cognitive load and streamline user flows
4. **Accessibility**: Ensure usability for all users regardless of ability
5. **Responsiveness**: Optimize for all device sizes and interaction methods

### Interaction Patterns

#### Progressive Disclosure
- Show essential information first
- Reveal additional details on demand
- Use accordions, tabs, and expandable sections

#### Feedback & Validation
- Provide immediate feedback for user actions
- Show clear error messages and validation states
- Use loading states and progress indicators

#### Navigation Patterns
- Consistent navigation structure across pages
- Clear breadcrumbs for complex hierarchies
- Logical information architecture

## 🔧 Implementation

### Tailwind Configuration

Update your `tailwind.config.mjs` to include custom design tokens:

```javascript
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Your custom color palette
        primary: {
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
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
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
      },
      spacing: {
        '1': '0.25rem', /* 4px */
        '2': '0.5rem',  /* 8px */
        // ... more spacing values
      },
      borderRadius: {
        'sm': '0.125rem', /* 2px */
        'md': '0.375rem', /* 6px */
        // ... more radius values
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 20px rgba(59, 130, 246, 0.15)',
        'glow-lg': '0 0 40px rgba(59, 130, 246, 0.2)',
      },
    },
  },
  plugins: [],
};
```

### CSS Custom Properties

Define CSS custom properties for consistent theming:

```css
/* src/styles/global.css */
:root {
  /* Color tokens */
  --color-primary: 59 130 246;
  --color-primary-foreground: 255 255 255;
  
  /* Border tokens */
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 59 130 246;
  
  /* Background tokens */
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  
  /* Semantic colors */
  --color-success: 16 185 129;
  --color-warning: 245 158 11;
  --color-error: 239 68 68;
  --color-info: 59 130 246;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  :root {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
  }
}
```

## 📚 Resources

### Design Tools
- [Figma](https://figma.com) - Design and prototyping
- [Adobe XD](https://adobe.com/products/xd.html) - UI/UX design
- [Sketch](https://sketch.com) - Digital design for Mac

### Color Tools
- [Coolors](https://coolors.co) - Color palette generator
- [Adobe Color](https://color.adobe.com) - Color wheel and themes
- [Contrast Checker](https://webaim.org/resources/contrastchecker/) - Accessibility testing

### Typography Resources
- [Google Fonts](https://fonts.google.com) - Web font library
- [Type Scale](https://type-scale.com) - Typography scale generator
- [Font Pair](https://fontpair.co) - Font combination suggestions

---

*These guidelines provide a foundation for creating consistent, accessible, and user-friendly interfaces. Adapt and extend them to match your brand's unique identity and user needs.*

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

#### Base Spacing Unit

```css
/* 4px base unit system */
--space-1: 0.25rem; /* 4px */
--space-2: 0.5rem; /* 8px */
--space-3: 0.75rem; /* 12px */
--space-4: 1rem; /* 16px */
--space-5: 1.25rem; /* 20px */
--space-6: 1.5rem; /* 24px */
--space-8: 2rem; /* 32px */
--space-10: 2.5rem; /* 40px */
--space-12: 3rem; /* 48px */
--space-16: 4rem; /* 64px */
--space-20: 5rem; /* 80px */
--space-24: 6rem; /* 96px */
```

### Border Radius

```css
/* Consistent border radius */
--radius-sm: 0.125rem; /* 2px */
--radius-md: 0.375rem; /* 6px */
--radius-lg: 0.5rem; /* 8px */
--radius-xl: 0.75rem; /* 12px */
--radius-2xl: 1rem; /* 16px */
--radius-full: 9999px; /* Full circle */
```

## 🎯 UX Principles

### 1. Accessibility First

- **WCAG 2.1 AA compliance** minimum
- **Keyboard navigation** support
- **Screen reader** compatibility
- **Color contrast** ratios of 4.5:1 minimum
- **Focus indicators** always visible

### 2. Mobile-First Design

- **Responsive breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Touch targets** minimum 44px × 44px
- **Gesture-friendly** interactions
- **Fast loading** on mobile networks

### 3. Progressive Enhancement

- **Core functionality** works without JavaScript
- **Enhanced experience** with modern browsers
- **Graceful degradation** for older browsers
- **Performance optimization** for all devices

### 4. User-Centered Design

- **Clear information hierarchy**
- **Intuitive navigation** patterns
- **Consistent interaction** patterns
- **Helpful error messages** and feedback

## 🧩 Component Guidelines

### Button Components

#### Primary Button

```astro
<button class='btn btn-primary'> Primary Action </button>
```

#### Secondary Button

```astro
<button class='btn btn-secondary'> Secondary Action </button>
```

#### Button States

- **Default**: Primary brand color
- **Hover**: Darker shade (+100)
- **Active**: Darker shade (+200)
- **Disabled**: Gray with reduced opacity
- **Loading**: Spinner with disabled state

### Form Elements

#### Input Fields

```astro
<div class='form-group'>
  <label for='email' class='form-label'>Email</label>
  <input type='email' id='email' class='form-input' placeholder='Enter your email' required />
  <div class='form-error'>Please enter a valid email</div>
</div>
```

#### Form Validation

- **Real-time validation** where appropriate
- **Clear error messages** with specific guidance
- **Success states** for completed fields
- **Accessible error announcements**

### Navigation

#### Header Navigation

```astro
<nav class='nav-primary' role='navigation' aria-label='Main navigation'>
  <ul class='nav-list'>
    <li><a href='/' class='nav-link'>Home</a></li>
    <li><a href='/about' class='nav-link'>About</a></li>
    <li><a href='/contact' class='nav-link'>Contact</a></li>
  </ul>
</nav>
```

#### Mobile Navigation

- **Hamburger menu** for mobile
- **Overlay navigation** with backdrop
- **Smooth animations** for open/close
- **Keyboard accessible** menu controls

## 📱 Responsive Design Patterns

### Container System

```css
/* Responsive container */
.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}

@media (min-width: 640px) {
  .container {
    max-width: 640px;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 768px;
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 1024px;
  }
}
```

### Grid System

```css
/* CSS Grid for layouts */
.grid {
  display: grid;
  gap: 1rem;
}

.grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}
.grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
.grid-cols-3 {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

@media (max-width: 768px) {
  .grid-cols-2,
  .grid-cols-3 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}
```

## 🎨 Visual Hierarchy

### Content Structure

1. **Page Title** (H1) - Largest, most prominent
2. **Section Headers** (H2) - Clear section breaks
3. **Subsection Headers** (H3) - Supporting content
4. **Body Text** - Readable paragraph text
5. **Supporting Text** - Captions, metadata

### Information Architecture

- **Clear page purpose** in first 5 seconds
- **Logical content flow** from general to specific
- **Consistent navigation** patterns
- **Breadcrumb navigation** for complex sites

## 🔧 Implementation Guidelines

### CSS Custom Properties

```css
/* Use CSS custom properties for consistency */
:root {
  --color-primary: #3b82f6;
  --color-primary-hover: #2563eb;
  --spacing-unit: 0.25rem;
  --border-radius: 0.375rem;
}

/* Apply consistently */
.btn-primary {
  background-color: var(--color-primary);
  border-radius: var(--border-radius);
  padding: calc(var(--spacing-unit) * 4);
}
```

### Component Naming

- **BEM methodology** for CSS classes
- **Semantic HTML** elements
- **Descriptive class names**
- **Consistent naming patterns**

### Performance Considerations

- **Optimize images** for web delivery
- **Minimize CSS** bundle size
- **Lazy load** non-critical resources
- **Use semantic HTML** for better performance

## 📋 Brand Guidelines Checklist

### Before Launch

- [ ] Color contrast meets WCAG AA standards
- [ ] All interactive elements are keyboard accessible
- [ ] Images have appropriate alt text
- [ ] Form validation provides clear feedback
- [ ] Mobile navigation is intuitive
- [ ] Loading states are implemented
- [ ] Error states are handled gracefully
- [ ] Performance metrics meet targets

### Ongoing Maintenance

- [ ] Regular accessibility audits
- [ ] Performance monitoring
- [ ] User feedback collection
- [ ] Design system updates
- [ ] Component documentation updates

## 🔗 Related Documentation

- **[Tailwind Guide](./tailwind.md)** - Detailed Tailwind CSS configuration and customization
- **[Content Guide](./content-guide.md)** - How to add and manage content with proper styling
- **[Quality Guide](./quality.md)** - Testing and maintaining design consistency
- **[Architecture Guide](./architecture.md)** - Technical implementation details

## 🎨 Customization Workflow

### 1. Brand Analysis
- Identify your brand colors and typography
- Define your design principles
- Establish your visual voice

### 2. Token Mapping
- Map brand colors to Tailwind color scale
- Define custom spacing and typography values
- Create component variants

### 3. Implementation
- Update `tailwind.config.mjs` with custom tokens
- Modify `src/styles/global.css` for custom components
- Update component examples with your brand

### 4. Validation
- Test across different devices and browsers
- Verify accessibility compliance
- Ensure performance standards are met

---

_These guidelines ensure consistency, accessibility, and user experience across all implementations of this boilerplate. For technical implementation details, see the [Tailwind Guide](./tailwind.md) and [Architecture Guide](./architecture.md)._

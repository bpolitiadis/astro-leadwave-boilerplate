# shadcn/ui Setup Guide

This document describes how shadcn/ui components are set up and integrated into the Astro Tailwind Boilerplate.

## Overview

shadcn/ui is a collection of beautifully designed, accessible, and customizable components built with Radix UI and Tailwind CSS. Since Astro doesn't have native shadcn/ui support, we've manually implemented the core components following the same design principles and patterns.

## Components Available

### Core Components

- **Button** - Multiple variants (default, secondary, destructive, outline, ghost, link) and sizes (sm, default, lg, icon)
- **Input** - Form input with consistent styling and accessibility features
- **Textarea** - Multi-line text input component
- **Card** - Container component with header, content, and footer sections
- **Badge** - Status indicators and labels with multiple variants

### Component Structure

Each component follows the shadcn/ui pattern:
- TypeScript interfaces for props
- Consistent class naming using Tailwind CSS
- Accessibility features built-in
- Responsive design by default
- CSS custom properties for theming

## File Structure

```
src/
├── components/
│   ├── ui/
│   │   ├── Button.astro
│   │   ├── Input.astro
│   │   ├── Textarea.astro
│   │   ├── Card.astro
│   │   ├── CardHeader.astro
│   │   ├── CardTitle.astro
│   │   ├── CardDescription.astro
│   │   ├── CardContent.astro
│   │   ├── CardFooter.astro
│   │   ├── Badge.astro
│   │   └── index.ts
│   └── ...
├── lib/
│   └── utils.ts
└── styles/
    └── global.css
```

## Usage Examples

### Basic Button

```astro
---
import { Button } from '../components/ui';
---

<Button variant="default" size="lg">
  Click me
</Button>
```

### Button as Link

```astro
---
import { Button } from '../components/ui';
---

<Button as="a" href="/contact" variant="outline">
  Contact Us
</Button>
```

### Form Input

```astro
---
import { Input } from '../components/ui';
---

<Input 
  type="email" 
  placeholder="your@email.com" 
  required 
/>
```

### Card Component

```astro
---
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui';
---

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
</Card>
```

## Styling and Theming

### CSS Custom Properties

The components use CSS custom properties for consistent theming:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  /* ... more variables */
}
```

### Tailwind Configuration

The Tailwind config includes all necessary color variables and utilities:

```javascript
colors: {
  border: "hsl(var(--border))",
  input: "hsl(var(--input))",
  ring: "hsl(var(--ring))",
  background: "hsl(var(--background))",
  foreground: "hsl(var(--foreground))",
  // ... more colors
}
```

## Responsive Design

All components are built with mobile-first responsive design:

- Use `sm:`, `md:`, `lg:`, and `xl:` breakpoints
- Components adapt to different screen sizes
- Touch-friendly interactions on mobile devices
- Consistent spacing across viewports

## Accessibility Features

- Proper ARIA labels and descriptions
- Keyboard navigation support
- Focus management
- Screen reader compatibility
- Semantic HTML structure

## Adding New Components

To add a new shadcn/ui component:

1. Create the component file in `src/components/ui/`
2. Follow the existing component pattern
3. Add TypeScript interfaces for props
4. Use consistent class naming
5. Include accessibility features
6. Export from `src/components/ui/index.ts`
7. Update this documentation

## Dependencies

The following packages are required for shadcn/ui components:

```json
{
  "devDependencies": {
    "@types/node": "^24.3.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.3.1"
  }
}
```

## Utility Functions

### `cn()` Function

The `cn()` utility function combines `clsx` and `tailwind-merge` for optimal class merging:

```typescript
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

## Best Practices

1. **Consistency**: Use the same prop patterns across components
2. **Accessibility**: Always include proper ARIA attributes
3. **Responsiveness**: Design for mobile-first, then enhance for larger screens
4. **TypeScript**: Use strict typing for all component props
5. **Documentation**: Document any non-obvious functionality
6. **Testing**: Ensure components work across different viewports and devices

## Troubleshooting

### Common Issues

1. **Styling conflicts**: Ensure Tailwind CSS is properly configured
2. **Type errors**: Check that all required props are provided
3. **Responsive issues**: Verify breakpoint usage in Tailwind config
4. **Accessibility warnings**: Use proper ARIA attributes and semantic HTML

### Getting Help

- Check the [shadcn/ui documentation](https://ui.shadcn.com/)
- Review the component examples in `/components` page
- Check the browser console for any errors
- Verify Tailwind CSS compilation

## Future Enhancements

Potential improvements for the shadcn/ui integration:

- Add more component variants
- Implement dark mode support
- Add animation and transition utilities
- Create component playground for development
- Add automated testing for components
- Implement component composition patterns

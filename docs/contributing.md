# Contributing Guide

> **Template/Boilerplate Notice**
>
> This document describes how to contribute to the boilerplate template. Use this to understand the development workflow and coding standards.

## Development Workflow

### Getting Started
1. **Fork the Repository**: Create your own fork of the boilerplate
2. **Clone Locally**: Clone your fork to your local machine
3. **Install Dependencies**: Run `pnpm install` to install dependencies
4. **Set Up Environment**: Copy `env.example` to `.env` and configure
5. **Start Development**: Run `pnpm dev` to start the development server

### Branching Strategy
```bash
# Create feature branch from main
git checkout -b feature/new-feature

# Create bugfix branch
git checkout -b bugfix/fix-issue

# Create documentation branch
git checkout -b docs/update-readme
```

### Commit Guidelines
Follow conventional commit format:
```bash
# Feature additions
git commit -m "feat: add new contact form validation"

# Bug fixes
git commit -m "fix: resolve contact form submission issue"

# Documentation updates
git commit -m "docs: update deployment guide"

# Performance improvements
git commit -m "perf: optimize image loading"

# Breaking changes
git commit -m "feat!: change API response format"
```

### Pull Request Process
1. **Create PR**: Submit PR from your feature branch to main
2. **Description**: Provide clear description of changes
3. **Testing**: Ensure all tests pass
4. **Code Review**: Address review comments
5. **Merge**: Merge after approval

## Code Quality Standards

### Pre-commit Checklist
Before committing code, ensure:
- [ ] **Linting**: `pnpm lint` passes with no errors
- [ ] **Formatting**: `pnpm format:check` shows no issues
- [ ] **Type Checking**: `pnpm type-check` passes
- [ ] **Tests**: `pnpm test` passes
- [ ] **Build**: `pnpm build` completes successfully

### Code Style Guidelines

#### TypeScript
```typescript
// Use explicit types for function parameters and return values
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Use interfaces for object shapes
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

// Use enums for constants
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest',
}
```

#### Astro Components
```astro
---
// Always define Props interface
export interface Props {
  title: string;
  description?: string;
  image?: string;
}

// Use destructuring with defaults
const { 
  title, 
  description = 'Default description',
  image = '/og-image.jpg' 
} = Astro.props;

// Log component lifecycle for debugging
logComponentLifecycle('ComponentName', 'render', {
  title,
  pathname: Astro.url.pathname,
});
---

<!-- Use semantic HTML elements -->
<article class="component">
  <header>
    <h1>{title}</h1>
    {description && <p>{description}</p>}
  </header>
  
  <main>
    <slot />
  </main>
</article>
```

#### CSS/Tailwind
```css
/* Use @layer for organization */
@layer components {
  .btn {
    @apply inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors;
  }
  
  .btn-primary {
    @apply bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800;
  }
}

/* Use consistent spacing scale */
.container-custom {
  @apply mx-auto max-w-7xl px-4 sm:px-6 lg:px-8;
}

/* Use semantic class names */
.form-input {
  @apply block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500;
}
```

### Testing Standards

#### Unit Tests
```typescript
// tests/unit/validation.test.ts
import { describe, it, expect } from 'vitest';
import { validateEmail, validatePhone } from '../../src/lib/validation';

describe('Validation Functions', () => {
  describe('validateEmail', () => {
    it('should validate correct email addresses', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name@domain.co.uk')).toBe(true);
    });

    it('should reject invalid email addresses', () => {
      expect(validateEmail('invalid-email')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
    });
  });
});
```

#### E2E Tests
```typescript
// tests/e2e/contact.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test('should submit form successfully', async ({ page }) => {
    await page.goto('/contact');
    
    // Fill form
    await page.fill('#name', 'John Doe');
    await page.fill('#email', 'john@example.com');
    await page.fill('#message', 'Test message');
    await page.check('#consent');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Verify success
    await expect(page.locator('.message-success')).toBeVisible();
  });
});
```

### Documentation Standards

#### Code Comments
```typescript
/**
 * Validates email address format
 * @param email - Email address to validate
 * @returns true if email is valid, false otherwise
 * @example
 * validateEmail('test@example.com') // true
 * validateEmail('invalid-email') // false
 */
export function validateEmail(email: string): boolean {
  // Implementation
}
```

#### README Updates
- Update relevant documentation when adding features
- Include code examples for new functionality
- Update changelog for significant changes
- Maintain cross-references between documents

## Quality Gates

### Automated Checks
The following checks must pass before merging:

#### Linting & Formatting
```bash
# ESLint must pass with no errors
pnpm lint

# Prettier must pass with no formatting issues
pnpm format:check

# TypeScript must pass with no type errors
pnpm type-check
```

#### Testing
```bash
# All tests must pass
pnpm test

# Test coverage should not decrease
# (when coverage is implemented)
```

#### Build
```bash
# Production build must succeed
pnpm build

# Build output should be valid
# Check dist/ directory structure
```

### Manual Review Checklist
- [ ] **Code Quality**: Code follows established patterns
- [ ] **Performance**: No performance regressions introduced
- [ ] **Accessibility**: Maintains accessibility standards
- [ ] **Security**: No security vulnerabilities introduced
- [ ] **Documentation**: Code is properly documented
- [ ] **Testing**: Adequate test coverage for changes

## Development Environment

### Required Tools
- **Node.js**: Version 18.0.0 or higher
- **pnpm**: Version 8.0.0 or higher
- **Git**: Latest version
- **Editor**: VS Code with recommended extensions

### VS Code Extensions
```json
{
  "recommendations": [
    "astro-build.astro-vscode",
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next"
  ]
}
```

### Environment Setup
```bash
# Install dependencies
pnpm install

# Install Playwright browsers
pnpm install:playwright

# Set up environment variables
cp env.example .env
# Edit .env with your values

# Start development server
pnpm dev
```

## Troubleshooting Development Issues

### Common Development Problems

#### Hot Reload Not Working
```bash
# Restart development server
pnpm dev

# Check file watching
# Ensure files are in src/ directory
```

#### TypeScript Errors
```bash
# Check TypeScript configuration
pnpm type-check

# Restart TypeScript server in VS Code
# Cmd+Shift+P > "TypeScript: Restart TS Server"
```

#### Test Failures
```bash
# Run tests with UI for debugging
pnpm test:ui

# Check if development server is running
# Tests require dev server on port 4321
```

### Getting Help
1. **Check Documentation**: Review relevant guides
2. **Search Issues**: Look for similar problems
3. **Create Issue**: Provide detailed problem description
4. **Ask Community**: Use Astro or Tailwind communities

## Release Process

### Version Updates
1. **Update Version**: Update version in `package.json`
2. **Update Changelog**: Add new version entry
3. **Create Tag**: Tag the release commit
4. **Deploy**: Deploy to production
5. **Announce**: Notify users of new release

### Breaking Changes
- **Major Version**: Increment major version number
- **Migration Guide**: Provide detailed migration steps
- **Deprecation Notice**: Give advance warning of changes
- **Testing**: Ensure migration works correctly

---

*This contributing guide helps maintain code quality and consistency across the boilerplate template.*

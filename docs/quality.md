# Quality Guide

> **Template/Boilerplate Notice**
>
> This document describes the code quality tools and testing setup in the boilerplate template. Use this to maintain high code standards and run quality checks.

## ESLint Configuration

### Version & Setup
- **ESLint**: v9.32.0
- **Configuration**: Flat config format (`eslint.config.js`)
- **TypeScript Support**: @typescript-eslint/eslint-plugin v8.39.0

### Configuration File
```javascript
// eslint.config.js
import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import astro from 'eslint-plugin-astro';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,ts,astro}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      'astro': astro,
      'jsx-a11y': jsxA11y,
    },
    rules: {
      // TypeScript rules
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/explicit-function-return-type': 'warn',
      
      // Accessibility rules
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/anchor-has-content': 'error',
      
      // Astro-specific rules
      'astro/no-conflict-set-directives': 'error',
      'astro/no-unused-define-vars-in-style': 'error',
    },
  },
  prettier, // Must be last to override other configs
];
```

### Rule Sets
- **JavaScript**: ESLint recommended rules
- **TypeScript**: TypeScript-specific linting rules
- **Accessibility**: JSX A11Y accessibility rules
- **Astro**: Astro-specific best practices
- **Prettier**: Code formatting rules

### Running ESLint
```bash
# Check for linting errors
pnpm lint

# Fix automatically fixable errors
pnpm lint:fix
```

### Ignored Files
- `*.astro` files (handled by Astro plugin)
- `dist/` directory (build output)
- `node_modules/` directory (dependencies)

## Prettier Configuration

### Version & Setup
- **Prettier**: v3.6.2
- **Astro Plugin**: prettier-plugin-astro v0.14.1
- **Configuration**: `.prettierrc` or package.json

### Configuration
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "plugins": ["prettier-plugin-astro"]
}
```

### File Types Covered
- **JavaScript/TypeScript**: `.js`, `.ts`, `.jsx`, `.tsx`
- **Astro**: `.astro` files
- **JSON**: `.json` files
- **Markdown**: `.md` files
- **CSS/SCSS**: `.css`, `.scss` files

### Running Prettier
```bash
# Format all files
pnpm format

# Check formatting without changing files
pnpm format:check
```

### Integration with ESLint
- **eslint-config-prettier**: Disables ESLint rules that conflict with Prettier
- **eslint-plugin-prettier**: Runs Prettier as an ESLint rule (optional)

## Playwright Testing

### Version & Setup
- **Playwright**: v1.54.2
- **Configuration**: `playwright.config.ts`
- **Test Directory**: `tests/e2e/`

### Configuration File
```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:4321',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
```

### Test Structure
```
tests/
└── e2e/
    ├── contact.spec.ts    # Contact form tests
    └── home.spec.ts       # Homepage tests
```

### Test Coverage

#### Contact Form Tests (`contact.spec.ts`)
- **Form Loading**: Verify form elements are present
- **Validation**: Test required field validation
- **Input Validation**: Email format, phone format, message length
- **File Upload**: File type and size validation
- **Form Submission**: Success and error handling
- **Accessibility**: ARIA labels and form associations
- **Responsiveness**: Mobile device compatibility

#### Homepage Tests (`home.spec.ts`)
- **Page Loading**: Verify homepage loads successfully
- **SEO Meta Tags**: Check meta description and Open Graph tags
- **Accessibility**: Heading structure and alt text
- **Navigation**: Test navigation links and mobile menu
- **Responsiveness**: Desktop and mobile viewport testing
- **Asset Loading**: Verify no console errors

### Running Tests
```bash
# Run all tests
pnpm test

# Run tests with UI
pnpm test:ui

# Run tests in headed mode
pnpm test:headed

# Run tests in debug mode
pnpm test:debug

# Install Playwright browsers
pnpm install:playwright
```

### Test Features
- **Cross-browser Testing**: Chrome, Firefox, Safari
- **Mobile Testing**: Mobile Chrome and Safari
- **Visual Testing**: Screenshots on failure
- **Tracing**: Performance tracing for debugging
- **Parallel Execution**: Tests run in parallel for speed
- **CI Integration**: Optimized for continuous integration

## TypeScript Configuration

### Version & Setup
- **TypeScript**: v5.6.3
- **Astro Integration**: @astrojs/check v0.9.4
- **Configuration**: `tsconfig.json`

### Type Checking
```bash
# Run TypeScript type checking
pnpm type-check

# Type checking is also part of the build process
pnpm build
```

### Configuration Features
- **Strict Mode**: Enabled for better type safety
- **Module Resolution**: ES modules with Node.js resolution
- **Target**: ES2020 for modern browser support
- **JSX Support**: React JSX for component development

## Code Quality Workflow

### Pre-commit Checks
```bash
# Run all quality checks
pnpm lint && pnpm format:check && pnpm type-check
```

### CI/CD Integration
```yaml
# Example GitHub Actions workflow
- name: Quality Checks
  run: |
    pnpm lint
    pnpm format:check
    pnpm type-check
    pnpm test
```

### Quality Gates
- **Linting**: Zero ESLint errors
- **Formatting**: All files properly formatted
- **Type Safety**: Zero TypeScript errors
- **Tests**: All tests passing
- **Build**: Successful production build

## Best Practices

### Code Style
1. **Consistent Formatting**: Use Prettier for automatic formatting
2. **Type Safety**: Leverage TypeScript for better code quality
3. **Accessibility**: Follow JSX A11Y rules for inclusive design
4. **Performance**: Write efficient, maintainable code

### Testing Strategy
1. **E2E First**: Focus on user experience testing
2. **Cross-browser**: Test on multiple browsers and devices
3. **Accessibility**: Include accessibility testing in E2E tests
4. **Performance**: Monitor test execution time

### Quality Maintenance
1. **Regular Checks**: Run quality tools before committing
2. **Automated CI**: Integrate quality checks in CI/CD pipeline
3. **Code Reviews**: Use quality tools during code reviews
4. **Documentation**: Keep quality guidelines up to date

## Troubleshooting

### Common Issues

#### ESLint Errors
```bash
# Check for configuration issues
pnpm lint --debug

# Fix auto-fixable issues
pnpm lint:fix
```

#### Prettier Conflicts
```bash
# Check formatting
pnpm format:check

# Format all files
pnpm format
```

#### Test Failures
```bash
# Run tests with verbose output
pnpm test --reporter=verbose

# Debug specific test
pnpm test:debug --grep "test name"
```

#### Type Errors
```bash
# Check TypeScript configuration
pnpm type-check

# Verify tsconfig.json settings
cat tsconfig.json
```

### Performance Optimization
- **Parallel Testing**: Tests run in parallel by default
- **Browser Reuse**: Browsers are reused between test runs
- **Selective Testing**: Run specific test files or test suites
- **CI Optimization**: Reduced workers and retries in CI environment

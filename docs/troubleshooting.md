# Troubleshooting Guide

> **Template/Boilerplate Notice**
>
> This document provides solutions to common issues you may encounter when working with the boilerplate template. Use this to quickly resolve problems and get back to development.

## Common Issues

### Build & Development Issues

#### Node Version Mismatch
**Problem**: Build fails with Node version errors
```bash
Error: Node.js version 16.x.x is not supported. Expected 18.0.0 or higher.
```

**Solution**: Update Node.js to version 18 or higher
```bash
# Check current version
node --version

# Update using nvm (recommended)
nvm install 18
nvm use 18

# Or download from nodejs.org
# https://nodejs.org/en/download/
```

#### Package Manager Issues
**Problem**: `pnpm` command not found or version too old
```bash
Error: pnpm: command not found
Error: pnpm version 7.x.x is not supported. Expected 8.0.0 or higher.
```

**Solution**: Install or update pnpm
```bash
# Install pnpm globally
npm install -g pnpm

# Check version
pnpm --version

# Update to latest
npm update -g pnpm
```

#### Dependency Installation Failures
**Problem**: `pnpm install` fails with dependency errors
```bash
Error: ENOENT: no such file or directory
Error: Cannot find module
```

**Solution**: Clear cache and reinstall
```bash
# Clear pnpm cache
pnpm store prune

# Remove node_modules and lock file
rm -rf node_modules pnpm-lock.yaml

# Reinstall dependencies
pnpm install
```

#### Build Failures
**Problem**: `pnpm build` fails with compilation errors
```bash
Error: TypeScript compilation failed
Error: Build failed
```

**Solution**: Check TypeScript and fix errors
```bash
# Run type checking first
pnpm type-check

# Fix linting issues
pnpm lint:fix

# Check for syntax errors
pnpm lint

# Try building again
pnpm build
```

### Development Server Issues

#### Port Already in Use
**Problem**: Development server fails to start
```bash
Error: listen EADDRINUSE: address already in use :::4321
```

**Solution**: Kill existing process or use different port
```bash
# Find process using port 4321
lsof -ti:4321

# Kill the process
kill -9 $(lsof -ti:4321)

# Or use different port
pnpm dev --port 3000
```

#### Hot Reload Not Working
**Problem**: Changes don't reflect in browser automatically
```bash
# No error message, just no hot reload
```

**Solution**: Check file watching and restart server
```bash
# Restart development server
pnpm dev

# Check if files are being watched
# Ensure you're editing files in src/ directory

# Clear browser cache
# Hard refresh: Ctrl+Shift+R (Cmd+Shift+R on Mac)
```

#### Environment Variables Not Loading
**Problem**: Environment variables not accessible in code
```bash
console.log(import.meta.env.RESEND_API_KEY) // undefined
```

**Solution**: Check environment file and restart server
```bash
# Ensure .env file exists
ls -la .env

# Copy from example if missing
cp env.example .env

# Edit .env with your values
nano .env

# Restart development server
pnpm dev
```

### Testing Issues

#### Playwright Browsers Not Installed
**Problem**: Tests fail with browser not found errors
```bash
Error: Browser not found. Please install browsers with 'npx playwright install'
```

**Solution**: Install Playwright browsers
```bash
# Install all browsers
pnpm install:playwright

# Or install specific browser
npx playwright install chromium
npx playwright install firefox
npx playwright install webkit
```

#### Test Failures
**Problem**: Tests fail with timeout or assertion errors
```bash
Error: Timeout 30000ms exceeded
Error: Expected element to be visible
```

**Solution**: Debug test issues
```bash
# Run tests with UI for debugging
pnpm test:ui

# Run tests in headed mode
pnpm test:headed

# Run specific test file
pnpm test tests/e2e/contact.spec.ts

# Run with debug output
pnpm test:debug
```

#### Test Server Issues
**Problem**: Tests fail because development server isn't running
```bash
Error: connect ECONNREFUSED 127.0.0.1:4321
```

**Solution**: Ensure development server is running
```bash
# Start development server in one terminal
pnpm dev

# Run tests in another terminal
pnpm test
```

### Linting & Formatting Issues

#### ESLint Errors
**Problem**: `pnpm lint` shows many errors
```bash
Error: Multiple ESLint errors found
```

**Solution**: Fix linting issues
```bash
# Fix auto-fixable issues
pnpm lint:fix

# Check remaining issues
pnpm lint

# Fix specific file
pnpm lint src/components/Button.astro --fix
```

#### Prettier Conflicts
**Problem**: `pnpm format:check` shows formatting issues
```bash
Error: Prettier found files that are not formatted correctly
```

**Solution**: Format all files
```bash
# Format all files
pnpm format

# Check formatting again
pnpm format:check

# Format specific file
pnpm format src/components/Button.astro
```

#### TypeScript Errors
**Problem**: `pnpm type-check` shows type errors
```bash
Error: TypeScript compilation failed
```

**Solution**: Fix type issues
```bash
# Check TypeScript configuration
cat tsconfig.json

# Fix type errors in code
# Common issues:
# - Missing type annotations
# - Incorrect interface definitions
# - Missing imports

# Run type check again
pnpm type-check
```

### Deployment Issues

#### Vercel Build Failures
**Problem**: Vercel deployment fails during build
```bash
Error: Build failed
Error: Command failed
```

**Solution**: Check build locally and fix issues
```bash
# Test build locally
pnpm build

# Check for errors
pnpm lint
pnpm type-check
pnpm test

# Verify environment variables in Vercel dashboard
# Check vercel.json configuration
```

#### Environment Variable Issues
**Problem**: Environment variables not available in production
```bash
Error: RESEND_API_KEY is not defined
```

**Solution**: Configure environment variables in Vercel
```bash
# Check Vercel dashboard
# Settings > Environment Variables

# Ensure all required variables are set:
# - RESEND_API_KEY
# - FROM_EMAIL
# - TO_EMAIL
# - SITE_URL

# Redeploy after adding variables
```

#### API Route Issues
**Problem**: API routes return 500 errors
```bash
Error: Internal Server Error
```

**Solution**: Check function logs and configuration
```bash
# Check Vercel function logs
# Functions > View Function Logs

# Verify vercel.json configuration
# Check runtime and maxDuration settings

# Test API locally
curl -X POST http://localhost:4321/api/contact
```

### Performance Issues

#### Slow Build Times
**Problem**: `pnpm build` takes too long
```bash
# Build takes several minutes
```

**Solution**: Optimize build process
```bash
# Check for unnecessary dependencies
pnpm list

# Use faster package manager
npm install -g pnpm

# Clear cache
pnpm store prune

# Check for large files in src/
du -sh src/*
```

#### Large Bundle Size
**Problem**: Production build is too large
```bash
# dist/ folder is very large
```

**Solution**: Analyze and optimize bundle
```bash
# Check bundle size
du -sh dist/

# Remove unused dependencies
pnpm list --depth=0

# Optimize images
# Use WebP format when possible
# Compress images before adding to src/images/

# Check Tailwind purge
# Ensure content paths are correct in tailwind.config.mjs
```

#### Slow Page Load
**Problem**: Pages load slowly in production
```bash
# Lighthouse shows poor performance
```

**Solution**: Optimize performance
```bash
# Check image optimization
# Ensure images are properly sized and compressed

# Verify caching headers in vercel.json
# Check for unnecessary JavaScript

# Run Lighthouse audit
# Use Chrome DevTools Performance tab
```

## Debugging Tools

### Development Tools
```bash
# Check Node.js version
node --version

# Check pnpm version
pnpm --version

# Check Astro version
pnpm list astro

# Check TypeScript version
pnpm list typescript
```

### Logging & Debugging
```bash
# Enable debug logging
DEBUG=* pnpm dev

# Check build output
pnpm build --verbose

# Run tests with debug output
pnpm test:debug

# Check for console errors in browser
# Open DevTools > Console
```

### Performance Analysis
```bash
# Check bundle size
pnpm build
du -sh dist/

# Analyze dependencies
pnpm list --depth=0

# Check for duplicate packages
pnpm dedupe

# Profile build process
time pnpm build
```

## Getting Help

### Check Documentation
1. **This Guide**: Review relevant troubleshooting sections
2. **Architecture Guide**: Understand how components work together
3. **Quality Guide**: Review testing and linting setup
4. **Deployment Guide**: Check deployment configuration

### Common Resources
- **Astro Documentation**: [docs.astro.build](https://docs.astro.build)
- **Tailwind CSS**: [tailwindcss.com/docs](https://tailwindcss.com/docs)
- **TypeScript**: [typescriptlang.org/docs](https://typescriptlang.org/docs)
- **Playwright**: [playwright.dev/docs](https://playwright.dev/docs)

### When to Seek Help
- **Build consistently fails** after trying solutions above
- **Runtime errors** that don't appear in development
- **Performance issues** that persist after optimization
- **Integration problems** with third-party services

### Providing Helpful Information
When seeking help, include:
- **Error messages** (full text)
- **Steps to reproduce** the issue
- **Environment details** (OS, Node version, pnpm version)
- **What you've tried** to fix the issue
- **Relevant code** that might be causing the problem

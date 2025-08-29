# Deployment Guide

This guide covers deploying your Astro Tailwind Boilerplate to production environments, with optimized configurations for Vercel and Docker.

## 🚀 Vercel Deployment (Recommended)

### Configuration

The boilerplate includes an optimized `vercel.json` with:

- **Build Optimization**: `pnpm build` with production environment
- **Function Configuration**: Node.js 20.x runtime with 1GB memory
- **Security Headers**: Comprehensive security headers including HSTS and CSP
- **Caching Strategy**: Long-term caching for static assets, no-cache for API routes
- **Performance Features**: Clean URLs, trailing slash handling, regional deployment

### Key Features

#### Security Headers
```json
{
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()"
}
```

#### Asset Caching
- **Static Assets**: 1 year cache with immutable flag
- **API Routes**: No-cache for dynamic content
- **Modern Formats**: Support for WebP and AVIF images

#### Performance Optimizations
- **Clean URLs**: Remove file extensions
- **Regional Deployment**: Deploy to `iad1` (US East)
- **Function Memory**: 1GB allocation for API routes

### Deployment Process

1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login and link project
   vercel login
   vercel link
   ```

2. **Set Environment Variables**
   ```bash
   vercel env add RESEND_API_KEY
   vercel env add FROM_EMAIL
   vercel env add TO_EMAIL
   vercel env add SITE_URL
   ```

3. **Deploy**
   ```bash
   # Deploy to preview
   vercel
   
   # Deploy to production
   vercel --prod
   ```

### Environment Variables

| Variable | Purpose | Required |
|----------|---------|----------|
| `RESEND_API_KEY` | Email service API key | Yes |
| `FROM_EMAIL` | Sender email address | Yes |
| `TO_EMAIL` | Recipient email address | Yes |
| `SITE_URL` | Production site URL | Yes |
| `LOG_LEVEL` | Logging verbosity | No (default: info) |
| `LOG_ENVIRONMENT` | Logging environment | No (default: production) |

## 🐳 Docker Deployment

### Dockerfile Stages

```dockerfile
# Multi-stage build for optimized production image
FROM node:20-alpine AS base
FROM base AS deps
# Install pnpm and dependencies
FROM base AS builder
# Build the Astro application
FROM nginx:alpine AS runner
# Serve with Nginx
```

### Build Commands

```bash
# Build image
docker build -t astro-boilerplate .

# Run container
docker run -p 80:80 \
  -e RESEND_API_KEY=your_key \
  -e FROM_EMAIL=from@example.com \
  -e TO_EMAIL=to@example.com \
  astro-boilerplate
```

### Production Considerations

- **Port**: Exposes port 80 for HTTP
- **Environment**: Set required environment variables
- **Volumes**: Mount logs directory if needed
- **Health Check**: Built-in Nginx health endpoint

## ⚙️ Astro Configuration

### Modern Features Enabled

```javascript
export default defineConfig({
  // Image optimization with Sharp
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' },
    formats: ['webp', 'avif', 'jpeg'],
    quality: 80
  },
  
  // Performance optimizations
  build: {
    inlineStylesheets: 'auto',
    assets: '_astro'
  },
  
  // Modern Astro features
  experimental: {
    assets: true,
    viewTransitions: true
  }
});
```

### Build Optimizations

- **CSS Inlining**: Critical CSS automatically inlined
- **Asset Optimization**: WebP/AVIF image generation
- **Chunk Splitting**: Optimized bundle splitting
- **HMR**: Hot module replacement in development

## 🔒 Security Features

### Headers Configuration

- **Content Security**: Prevent XSS and injection attacks
- **Frame Protection**: Block clickjacking attempts
- **Transport Security**: Enforce HTTPS with HSTS
- **Permissions Control**: Restrict browser capabilities

### API Security

- **Input Validation**: Server-side validation in all API routes
- **Rate Limiting**: Built-in protection against abuse
- **CORS**: Configured for production domains
- **Authentication**: Ready for JWT or session-based auth

## 📊 Performance Monitoring

### Vercel Analytics

- **Real User Metrics**: Core Web Vitals tracking
- **Function Monitoring**: API route performance
- **Error Tracking**: Automatic error correlation
- **Deployment Insights**: Build and deployment metrics

### Custom Monitoring

```typescript
// Performance tracking in API routes
import { logPerformance } from '../lib/logger';

const startTime = Date.now();
// ... operation
logPerformance('api_operation', Date.now() - startTime);
```

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   # Clear cache and rebuild
   pnpm clean
   pnpm install
   pnpm build
   ```

2. **Environment Variables**
   - Verify all required variables are set in Vercel
   - Check variable names match exactly
   - Ensure no trailing spaces

3. **Function Timeouts**
   - Increase `maxDuration` in `vercel.json`
   - Optimize API route performance
   - Use streaming for large responses

4. **Image Optimization**
   - Ensure Sharp is properly installed
   - Check image format support
   - Verify quality settings

### Debug Commands

```bash
# Check build output
pnpm build --verbose

# Test production build locally
pnpm preview

# Verify environment
vercel env ls

# Check function logs
vercel logs
```

## 📋 Deployment Checklist

### Pre-Deployment
- [ ] All tests pass (`pnpm test`)
- [ ] Linting passes (`pnpm lint`)
- [ ] Type checking passes (`pnpm type-check`)
- [ ] Environment variables configured
- [ ] Domain and SSL configured

### Post-Deployment
- [ ] Verify all pages load correctly
- [ ] Test contact form functionality
- [ ] Check image optimization
- [ ] Verify security headers
- [ ] Monitor performance metrics
- [ ] Test mobile responsiveness

### Ongoing Maintenance
- [ ] Monitor Vercel analytics
- [ ] Review function logs regularly
- [ ] Update dependencies monthly
- [ ] Security audit quarterly
- [ ] Performance review monthly

## 🔗 Additional Resources

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Astro Deployment**: [docs.astro.build/en/guides/deploy/](https://docs.astro.build/en/guides/deploy/)
- **Docker Documentation**: [docs.docker.com](https://docs.docker.com)
- **Nginx Documentation**: [nginx.org/en/docs/](http://nginx.org/en/docs/)

---

*This deployment configuration provides production-ready performance, security, and monitoring capabilities optimized for modern web applications.*

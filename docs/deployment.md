# Deployment Guide

> **Template/Boilerplate Notice**
>
> This document describes the deployment options and configuration for the boilerplate template. Use this to deploy your application to Vercel or Docker.

## Vercel Deployment

### Overview
This boilerplate is optimized for Vercel deployment with automatic builds, serverless functions, and performance optimization.

### Configuration File
```json
// vercel.json
{
  "buildCommand": "pnpm build",
  "outputDirectory": "dist",
  "framework": "astro",
  "installCommand": "pnpm install",
  "functions": {
    "src/pages/api/**/*.ts": {
      "runtime": "nodejs20.x",
      "maxDuration": 30
    }
  },
  "build": {
    "env": {
      "NODE_ENV": "production"
    }
  },
  "env": {
    "VERCEL": "1"
  }
}
```

### Key Configuration

#### Build Settings
- **Build Command**: `pnpm build` - Custom build script
- **Output Directory**: `dist` - Astro build output
- **Framework**: `astro` - Framework detection
- **Install Command**: `pnpm install` - Package manager

#### Serverless Functions
- **Runtime**: Node.js 20.x for API routes
- **Max Duration**: 30 seconds for function execution
- **Pattern**: All TypeScript files in `src/pages/api/`

#### Environment Variables
- **NODE_ENV**: Set to `production` during build
- **VERCEL**: Set to `1` for Vercel-specific optimizations

### Deployment Process

#### 1. Connect Repository
1. Push your code to GitHub/GitLab/Bitbucket
2. Connect your repository to Vercel
3. Vercel automatically detects Astro framework

#### 2. Configure Environment Variables
Set these in your Vercel dashboard:
```bash
# Email Configuration
RESEND_API_KEY=your_resend_api_key_here
FROM_EMAIL=noreply@yourdomain.com
TO_EMAIL=hello@example.com

# Site Configuration
SITE_URL=https://yourdomain.com

# Logging Configuration
LOG_LEVEL=info
LOG_ENVIRONMENT=production
ENABLE_STRUCTURED_LOGGING=true
```

#### 3. Deploy
- **Automatic**: Deploys on every push to main branch
- **Manual**: Trigger deployments from Vercel dashboard
- **Preview**: Automatic preview deployments for pull requests

### Vercel Features

#### Performance Optimization
- **Edge Functions**: API routes run at the edge
- **CDN**: Global content delivery network
- **Image Optimization**: Automatic image optimization
- **Caching**: Intelligent caching strategies

#### Security Headers
```json
"headers": [
  {
    "source": "/(.*)",
    "headers": [
      {
        "key": "X-Content-Type-Options",
        "value": "nosniff"
      },
      {
        "key": "X-Frame-Options",
        "value": "DENY"
      },
      {
        "key": "X-XSS-Protection",
        "value": "1; mode=block"
      },
      {
        "key": "Referrer-Policy",
        "value": "strict-origin-when-cross-origin"
      }
    ]
  }
]
```

#### Caching Strategy
```json
"headers": [
  {
    "source": "/assets/(.*)",
    "headers": [
      {
        "key": "Cache-Control",
        "value": "public, max-age=31536000, immutable"
      }
    ]
  },
  {
    "source": "/(.*\\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot))",
    "headers": [
      {
        "key": "Cache-Control",
        "value": "public, max-age=31536000, immutable"
      }
    ]
  }
]
```

#### URL Rewrites
```json
"rewrites": [
  {
    "source": "/sitemap.xml",
    "destination": "/api/sitemap"
  },
  {
    "source": "/robots.txt",
    "destination": "/api/robots"
  }
]
```

## Docker Deployment

### Overview
Multi-stage Docker build optimized for production deployment with Nginx.

### Dockerfile Stages
```dockerfile
# Multi-stage build for production
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm install -g pnpm && pnpm build

# Production image, copy all the files and run the app
FROM nginx:alpine AS runner
WORKDIR /usr/share/nginx/html
COPY --from=builder /app/dist .
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Build Process
1. **Dependencies Stage**: Install Node.js dependencies
2. **Builder Stage**: Build the Astro application
3. **Runner Stage**: Serve static files with Nginx

### Nginx Configuration
```nginx
# nginx.conf
events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
    
    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;
        
        # Security headers
        add_header X-Frame-Options "DENY" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-XSS-Protection "1; mode=block" always;
        
        # Static file caching
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
        
        # HTML files
        location ~* \.html$ {
            expires -1;
            add_header Cache-Control "no-cache, no-store, must-revalidate";
        }
        
        # API routes (if needed)
        location /api/ {
            try_files $uri $uri/ /index.html;
        }
        
        # Fallback for SPA routing
        location / {
            try_files $uri $uri/ /index.html;
        }
    }
}
```

### Build & Run Commands
```bash
# Build Docker image
docker build -t astro-tailwind-boilerplate .

# Run container
docker run -p 4321:80 astro-tailwind-boilerplate

# Run with custom environment
docker run -p 4321:80 \
  -e NODE_ENV=production \
  -e SITE_URL=https://yourdomain.com \
  astro-tailwind-boilerplate
```

### Production Considerations
- **Port**: Exposes port 80 (HTTP)
- **Environment**: Production-optimized Nginx configuration
- **Caching**: Static asset caching for performance
- **Security**: Security headers and best practices

## Environment Variables

### Required Variables
| Variable | Purpose | Example |
|----------|---------|---------|
| `RESEND_API_KEY` | Email service API key | `re_123456789` |
| `FROM_EMAIL` | Sender email address | `noreply@yourdomain.com` |
| `TO_EMAIL` | Recipient email address | `hello@example.com` |

### Optional Variables
| Variable | Purpose | Default |
|----------|---------|---------|
| `SITE_URL` | Site base URL | `https://yourdomain.com` |
| `LOG_LEVEL` | Logging level | `info` |
| `LOG_ENVIRONMENT` | Logging environment | `development` |
| `ENABLE_STRUCTURED_LOGGING` | Enable structured logs | `true` |

### Environment-Specific Configs
```bash
# Development
LOG_LEVEL=debug
LOG_ENVIRONMENT=development
ENABLE_STRUCTURED_LOGGING=false

# Production
LOG_LEVEL=info
LOG_ENVIRONMENT=production
ENABLE_STRUCTURED_LOGGING=true

# Vercel
VERCEL=1
LOG_ENVIRONMENT=vercel
```

## Deployment Checklist

### Pre-Deployment
- [ ] Environment variables configured
- [ ] API keys and secrets set
- [ ] Domain and SSL configured
- [ ] Build passes locally (`pnpm build`)
- [ ] Tests pass (`pnpm test`)

### Post-Deployment
- [ ] Site loads correctly
- [ ] Contact form works
- [ ] Sitemap accessible (`/sitemap.xml`)
- [ ] Robots.txt accessible (`/robots.txt`)
- [ ] Performance metrics acceptable
- [ ] Error monitoring configured

### Monitoring
- **Vercel Analytics**: Built-in performance monitoring
- **Logs**: Structured logging for debugging
- **Uptime**: Automatic uptime monitoring
- **Performance**: Core Web Vitals tracking

## Troubleshooting

### Common Issues

#### Build Failures
```bash
# Check build locally
pnpm build

# Verify dependencies
pnpm install

# Check TypeScript
pnpm type-check
```

#### Environment Variables
```bash
# Verify environment variables
echo $RESEND_API_KEY
echo $SITE_URL

# Check Vercel dashboard
# Settings > Environment Variables
```

#### API Route Issues
```bash
# Check function logs in Vercel
# Functions > View Function Logs

# Verify runtime configuration
# vercel.json > functions
```

#### Performance Issues
```bash
# Check bundle size
pnpm build --analyze

# Verify image optimization
# Check dist/ directory for optimized assets
```

### Support Resources
- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Astro Deployment**: [docs.astro.build/en/guides/deploy/](https://docs.astro.build/en/guides/deploy/)
- **Docker Documentation**: [docs.docker.com](https://docs.docker.com)
- **Nginx Documentation**: [nginx.org/en/docs/](http://nginx.org/en/docs/)

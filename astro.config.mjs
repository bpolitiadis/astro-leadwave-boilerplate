// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  // Site configuration for SEO and sitemap generation
  site: 'https://your-domain.com',
  
  // Integrations
  integrations: [
    tailwind()
  ],

  // Build configuration
  build: {
    // Inline critical CSS for better performance
    inlineStylesheets: 'auto',
    // Optimize assets
    assets: '_astro'
  },

  // Image optimization
  image: {
    // Use default Sharp service
  },

  // Vite configuration for better performance
  vite: {
    // Build optimizations
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'astro': ['astro'],
            'tailwind': ['tailwindcss']
          }
        }
      }
    }
  }
});

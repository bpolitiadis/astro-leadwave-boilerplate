import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const robotsTxt = `
User-agent: *
Allow: /

# Sitemap
Sitemap: ${import.meta.env.SITE || 'https://your-domain.com'}/sitemap.xml
`.trim();

  return new Response(robotsTxt, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
    },
  });
};

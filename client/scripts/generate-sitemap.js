// scripts/generate-sitemap.js
// Runs automatically after `vite build` via the postbuild script in package.json.
// Generates: client/dist/sitemap.xml and client/dist/robots.txt

import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ─── Configuration ──────────────────────────────────────────────────────────
const BASE_URL = 'https://vortextsoft.com';
const OUTPUT_DIR = resolve(__dirname, '../dist');

// Public routes only — admin routes are deliberately excluded from the sitemap
const ROUTES = [
  { path: '/',              changefreq: 'weekly',  priority: '1.0' },
  { path: '/services',      changefreq: 'weekly',  priority: '0.9' },
  { path: '/case-studies',  changefreq: 'weekly',  priority: '0.8' },
  { path: '/blog',          changefreq: 'daily',   priority: '0.8' },
  { path: '/about',         changefreq: 'monthly', priority: '0.7' },
  { path: '/careers',       changefreq: 'weekly',  priority: '0.7' },
  { path: '/contact',       changefreq: 'monthly', priority: '0.6' },
  { path: '/privacy',       changefreq: 'yearly',  priority: '0.3' },
  { path: '/terms',         changefreq: 'yearly',  priority: '0.3' },
];

// ─── Sitemap Generator ───────────────────────────────────────────────────────
const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
          http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${ROUTES.map(({ path, changefreq, priority }) => `  <url>
    <loc>${BASE_URL}${path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('\n')}
</urlset>`;

// ─── Robots.txt Generator ────────────────────────────────────────────────────
const robotsTxt = `# robots.txt — vortextsoft.com
# Generated: ${today}

User-agent: *
Allow: /

# Block admin panel from indexing
Disallow: /admin/
Disallow: /admin

# Block API routes
Disallow: /api/

# Sitemap location
Sitemap: ${BASE_URL}/sitemap.xml
`;

// ─── Write Files ─────────────────────────────────────────────────────────────
writeFileSync(`${OUTPUT_DIR}/sitemap.xml`, sitemapXml, 'utf-8');
console.log('✅  sitemap.xml generated →', `${OUTPUT_DIR}/sitemap.xml`);

writeFileSync(`${OUTPUT_DIR}/robots.txt`, robotsTxt, 'utf-8');
console.log('✅  robots.txt generated  →', `${OUTPUT_DIR}/robots.txt`);

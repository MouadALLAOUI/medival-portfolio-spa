import fs from 'fs';
import path from 'path';
import { blogs } from '../src/data/blogs.data.js';

const DOMAIN = 'https://mouad-portfolio.netlify.app'; // Update with actual domain
const SITEMAP_PATH = path.join(process.cwd(), 'public', 'sitemap.xml');

const generateSitemap = () => {
  const staticPages = [
    '',
    '/home',
    '/blogs',
    '/crmef',
    '/fallingletters',
    '/privacy',
    '/settings'
  ];

  const blogPages = blogs
    .filter(blog => !blog.isDraft)
    .map(blog => `/blogs/${blog.slug}`);

  const allPages = [...staticPages, ...blogPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPages.map(page => `
  <url>
    <loc>${DOMAIN}${page}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.startsWith('/blogs/') ? 'monthly' : 'weekly'}</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('')}
</urlset>`;

  fs.writeFileSync(SITEMAP_PATH, sitemap);
  console.log('✅ Sitemap generated at /public/sitemap.xml');
};

generateSitemap();

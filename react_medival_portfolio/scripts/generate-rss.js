import fs from 'fs';
import path from 'path';
import blogs from '../src/data/blogs.js';

const DOMAIN = 'https://mouad-portfolio.netlify.app'; // Update with actual domain
const RSS_PATH = path.join(process.cwd(), 'public', 'rss.xml');

const generateRSS = () => {
  const items = blogs
    .filter(blog => !blog.isDraft)
    .map(blog => `
    <item>
      <title><![CDATA[${blog.title}]]></title>
      <link>${DOMAIN}/blogs/${blog.slug}</link>
      <guid>${DOMAIN}/blogs/${blog.slug}</guid>
      <pubDate>${new Date(blog.date.yyyy, blog.date.MM - 1, blog.date.dd).toUTCString()}</pubDate>
      <description><![CDATA[${blog.desc}]]></description>
      <category>${blog.tags.join(', ')}</category>
    </item>`).join('');

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Mouad the Coder - Chamber of Chronicles</title>
  <link>${DOMAIN}/blogs</link>
  <description>Technical scrolls and medieval musings on web development and cybersecurity.</description>
  <language>en-us</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  <atom:link href="${DOMAIN}/rss.xml" rel="self" type="application/rss+xml" />
  ${items}
</channel>
</rss>`;

  fs.writeFileSync(RSS_PATH, rss);
  console.log('✅ RSS feed generated at /public/rss.xml');
};

generateRSS();

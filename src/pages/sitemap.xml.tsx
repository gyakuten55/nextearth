import type { GetServerSideProps } from 'next';
import { client } from '@/lib/microcms';
import { SITE_URL } from '@/lib/siteConfig';

/**
 * 動的 sitemap.xml
 * 静的ページ＋microCMS全記事を毎回取得して生成（記事を公開した瞬間に反映）。
 * lastmod は記事の revisedAt。microCMS取得失敗時は静的URLのみ返す。
 */

type StaticEntry = { path: string; changefreq: string; priority: string };

const STATIC_PATHS: StaticEntry[] = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/services', changefreq: 'weekly', priority: '0.9' },
  { path: '/company', changefreq: 'monthly', priority: '0.8' },
  { path: '/blog', changefreq: 'daily', priority: '0.7' },
  { path: '/contact', changefreq: 'monthly', priority: '0.7' },
  { path: '/recruit', changefreq: 'monthly', priority: '0.5' },
  { path: '/privacy', changefreq: 'yearly', priority: '0.3' },
  { path: '/terms', changefreq: 'yearly', priority: '0.3' },
];

type BlogStub = { id: string; revisedAt?: string; updatedAt?: string; publishedAt?: string };

function urlEntry(loc: string, lastmod?: string, changefreq?: string, priority?: string) {
  return (
    '  <url>\n' +
    `    <loc>${loc}</loc>\n` +
    (lastmod ? `    <lastmod>${lastmod}</lastmod>\n` : '') +
    (changefreq ? `    <changefreq>${changefreq}</changefreq>\n` : '') +
    (priority ? `    <priority>${priority}</priority>\n` : '') +
    '  </url>'
  );
}

async function fetchAllBlogs(): Promise<BlogStub[]> {
  const limit = 100;
  let offset = 0;
  let all: BlogStub[] = [];
  // 100件超でも欠落しないようページング（安全のため最大10ページで打ち切り）
  for (let i = 0; i < 10; i++) {
    const data: { contents: BlogStub[]; totalCount: number } = await client.get({
      endpoint: 'blogs',
      queries: { fields: 'id,revisedAt,updatedAt,publishedAt', limit, offset, orders: '-revisedAt' },
    });
    all = all.concat(data.contents);
    if (offset + limit >= data.totalCount || data.contents.length === 0) break;
    offset += limit;
  }
  return all;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const base = SITE_URL;
  const urls: string[] = [];
  let blogLastmod: string | undefined;

  let blogs: BlogStub[] = [];
  try {
    blogs = await fetchAllBlogs();
    for (const b of blogs) {
      const lm = b.revisedAt || b.updatedAt || b.publishedAt;
      if (lm && (!blogLastmod || lm > blogLastmod)) blogLastmod = lm;
    }
  } catch (err) {
    console.error('sitemap: failed to fetch blogs, falling back to static URLs', err);
  }

  for (const p of STATIC_PATHS) {
    const loc = p.path === '/' ? base : base + p.path;
    // /blog 一覧の lastmod は最新記事の更新日時に追従
    const lastmod = p.path === '/blog' ? blogLastmod : undefined;
    urls.push(urlEntry(loc, lastmod, p.changefreq, p.priority));
  }

  for (const b of blogs) {
    const lastmod = b.revisedAt || b.updatedAt || b.publishedAt;
    urls.push(urlEntry(`${base}/blog/${b.id}`, lastmod, 'monthly', '0.6'));
  }

  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls.join('\n') +
    '\n</urlset>\n';

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.write(xml);
  res.end();

  return { props: {} };
};

export default function Sitemap() {
  return null;
}

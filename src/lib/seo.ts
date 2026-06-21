/**
 * seo — URL正規化とブログのメタ自動生成ヘルパ
 *
 * ブログを書くだけで一意な title / description / OG が自動生成される土台。
 * microCMS に metaTitle / metaDescription / ogImage が追加されたら自動で優先される。
 */
import { SITE_URL, siteConfig } from './siteConfig';
import type { Blog } from './microcms';

/** 相対パス→絶対URL。既に絶対URLならそのまま返す。 */
export function absUrl(pathOrUrl: string): string {
  if (!pathOrUrl) return SITE_URL;
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  return SITE_URL + (pathOrUrl.startsWith('/') ? pathOrUrl : '/' + pathOrUrl);
}

/** canonical / og:url 用。末尾スラッシュ無し・絶対。ルートは SITE_URL のみ。 */
export function canonicalUrl(path: string): string {
  if (!path || path === '/') return SITE_URL;
  const p = path.startsWith('/') ? path : '/' + path;
  return (SITE_URL + p).replace(/\/+$/, '');
}

/** HTML本文 → プレーンテキスト抜粋（タグ/エンティティ/連続空白を除去し maxLen で切出し）。 */
export function excerptFromHtml(html: string, maxLen = 120): string {
  if (!html) return '';
  const text = html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#0?39;|&apos;/gi, "'")
    .replace(/&#[0-9]+;|&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen).trim() + '…';
}

/** 記事の<title>を解決（metaTitle優先→タイトル＋社名サフィックス）。 */
export function resolveBlogTitle(blog: Blog): string {
  const base = (blog.metaTitle && blog.metaTitle.trim()) || blog.title;
  return `${base}｜${siteConfig.titleSuffix}`;
}

/** 記事の description を解決（metaDescription→description→本文抜粋）。 */
export function resolveBlogDescription(blog: Blog): string {
  return (
    (blog.metaDescription && blog.metaDescription.trim()) ||
    (blog.description && blog.description.trim()) ||
    excerptFromHtml(blog.content, 120)
  );
}

/** 記事のOG画像を解決（専用ogImage→アイキャッチ→既定OG）。絶対URL化。 */
export function resolveBlogOgImage(blog: Blog): string {
  return absUrl(blog.ogImage?.url || blog.eyecatch?.url || siteConfig.defaultOgImage);
}

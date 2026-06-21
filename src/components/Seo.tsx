/**
 * Seo — head専用の共通SEOコンポーネント（描画DOMなし）
 *
 * title / description / canonical / robots / OGP / Twitter / 構造化データ を出力。
 * 各 <meta> に key を付与し、_app の既定をページ側が後勝ちで上書きできる。
 * WebPage と BreadcrumbList の JSON-LD は props から自動生成。
 */
import Head from 'next/head';
import { siteConfig } from '@/lib/siteConfig';
import { absUrl, canonicalUrl } from '@/lib/seo';
import { breadcrumbNode, graph, webPageNode } from '@/lib/jsonLd';

type Crumb = { name: string; path?: string };
type ArticleMeta = { publishedTime?: string; modifiedTime?: string; section?: string };

interface SeoProps {
  title: string;
  description: string;
  /** ルート相対パス（例: '/services'）。canonical / og:url の生成に使用 */
  path: string;
  ogType?: 'website' | 'article';
  /** 絶対/相対どちらも可。未指定なら既定OG画像 */
  ogImage?: string;
  noindex?: boolean;
  /** OG画像の実寸（判明している場合のみ。未指定かつ既定OG使用時は1200x630） */
  ogImageWidth?: number | null;
  ogImageHeight?: number | null;
  /** WebPage の主要画像URL（記事など）。未指定なら組織ロゴ */
  primaryImage?: string;
  /** パンくず（最終要素は path 省略で現在ページ扱い） */
  breadcrumb?: Crumb[];
  article?: ArticleMeta;
  /** ページ固有の追加JSON-LDノード（Service / ItemList / BlogPosting 等） */
  jsonLd?: Record<string, unknown>[];
  /** WebPageノードの自動付与（既定 true） */
  includeWebPage?: boolean;
}

/** JSON-LD文字列中の "<" をエスケープして </script> 注入を防ぐ */
function safeJsonLd(obj: unknown): string {
  return JSON.stringify(obj).replace(/</g, '\\u003c');
}

export default function Seo({
  title,
  description,
  path,
  ogType = 'website',
  ogImage,
  ogImageWidth,
  ogImageHeight,
  primaryImage,
  noindex = false,
  breadcrumb,
  article,
  jsonLd = [],
  includeWebPage = true,
}: SeoProps) {
  const canonical = canonicalUrl(path);
  const usingDefaultOg = !ogImage;
  const image = absUrl(ogImage || siteConfig.defaultOgImage);
  // 寸法が判明している場合のみ og:image:width/height を出力（既定OGは実寸が既知）
  const ogW = ogImageWidth ?? (usingDefaultOg ? siteConfig.defaultOgImageWidth : undefined);
  const ogH = ogImageHeight ?? (usingDefaultOg ? siteConfig.defaultOgImageHeight : undefined);
  const hasBreadcrumb = !!(breadcrumb && breadcrumb.length);

  const nodes: Record<string, unknown>[] = [];
  if (includeWebPage) {
    nodes.push(webPageNode({ path, name: title, description, hasBreadcrumb, primaryImage }));
  }
  if (hasBreadcrumb) nodes.push(breadcrumbNode(path, breadcrumb!));
  nodes.push(...jsonLd);

  return (
    <Head>
      <title key="title">{title}</title>
      <meta key="description" name="description" content={description} />
      <link key="canonical" rel="canonical" href={canonical} />
      <meta
        key="robots"
        name="robots"
        content={
          noindex
            ? 'noindex,nofollow'
            : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'
        }
      />

      {/* Open Graph */}
      <meta key="og:type" property="og:type" content={ogType} />
      <meta key="og:title" property="og:title" content={title} />
      <meta key="og:description" property="og:description" content={description} />
      <meta key="og:url" property="og:url" content={canonical} />
      <meta key="og:image" property="og:image" content={image} />
      {ogW && ogH && (
        <meta key="og:image:width" property="og:image:width" content={String(ogW)} />
      )}
      {ogW && ogH && (
        <meta key="og:image:height" property="og:image:height" content={String(ogH)} />
      )}
      <meta key="og:site_name" property="og:site_name" content={siteConfig.ogSiteName} />
      <meta key="og:locale" property="og:locale" content={siteConfig.locale} />

      {/* Twitter */}
      <meta key="tw:card" name="twitter:card" content={siteConfig.twitterCard} />
      <meta key="tw:title" name="twitter:title" content={title} />
      <meta key="tw:description" name="twitter:description" content={description} />
      <meta key="tw:image" name="twitter:image" content={image} />

      {/* Article（記事のみ） */}
      {ogType === 'article' && article?.publishedTime && (
        <meta
          key="article:published_time"
          property="article:published_time"
          content={article.publishedTime}
        />
      )}
      {ogType === 'article' && article?.modifiedTime && (
        <meta
          key="article:modified_time"
          property="article:modified_time"
          content={article.modifiedTime}
        />
      )}
      {ogType === 'article' && article?.section && (
        <meta key="article:section" property="article:section" content={article.section} />
      )}

      {nodes.length > 0 && (
        <script
          key="ldjson-page"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(graph(nodes)) }}
        />
      )}
    </Head>
  );
}

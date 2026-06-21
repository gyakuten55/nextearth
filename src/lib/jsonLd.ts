/**
 * jsonLd — schema.org 構造化データ(JSON-LD) ビルダー
 *
 * @id で各エンティティを相互参照し、知識グラフを一意化（GEO/AIO の核）。
 * 組織ノードは _app で1回だけ出力し、各ページは #organization / #website を @id 参照する。
 */
import { SITE_URL, siteConfig } from './siteConfig';
import { absUrl, canonicalUrl } from './seo';
import type { Blog } from './microcms';

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const LOGO_ID = `${SITE_URL}/#logo`;

type Node = Record<string, unknown>;

/** schema.org の @graph ラッパ */
export function graph(nodes: Node[]) {
  return { '@context': 'https://schema.org', '@graph': nodes };
}

/** Organization + RecyclingCenter（ローカルビジネス） */
export function organizationNode(): Node {
  const a = siteConfig.address;
  const node: Node = {
    '@type': ['Organization', 'RecyclingCenter'],
    '@id': ORG_ID,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    alternateName: siteConfig.alternateName,
    url: `${SITE_URL}/`,
    logo: {
      '@type': 'ImageObject',
      '@id': LOGO_ID,
      url: absUrl(siteConfig.logo),
      width: siteConfig.logoWidth,
      height: siteConfig.logoHeight,
    },
    image: { '@id': LOGO_ID },
    telephone: siteConfig.telE164,
    email: siteConfig.email,
    foundingDate: siteConfig.foundingDate,
    founder: { '@type': 'Person', name: siteConfig.founderName },
    numberOfEmployees: { '@type': 'QuantitativeValue', value: siteConfig.numberOfEmployees },
    slogan: siteConfig.slogan,
    priceRange: siteConfig.priceRange,
    address: {
      '@type': 'PostalAddress',
      postalCode: a.postalCode,
      addressRegion: a.addressRegion,
      addressLocality: a.addressLocality,
      streetAddress: a.streetAddress,
      addressCountry: a.addressCountry,
    },
    areaServed: [
      { '@type': 'AdministrativeArea', name: siteConfig.domesticRegion },
      ...siteConfig.kantoRegions.map((n) => ({ '@type': 'AdministrativeArea', name: n })),
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteConfig.telE164,
      email: siteConfig.email,
      contactType: 'customer service',
      areaServed: 'JP',
      availableLanguage: 'Japanese',
    },
    iso6523Code: siteConfig.iso6523,
    identifier: { '@type': 'PropertyValue', propertyID: '法人番号', value: siteConfig.corporateNumber },
  };
  // geo は正確な座標が設定されているときのみ出力（不正確な座標は address との矛盾になるため）
  if (siteConfig.geo) {
    node.geo = {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.geo.lat,
      longitude: siteConfig.geo.lng,
    };
  }
  if (siteConfig.sameAs.length) node.sameAs = siteConfig.sameAs;
  return node;
}

/** WebSite */
export function webSiteNode(): Node {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: siteConfig.name,
    inLanguage: 'ja',
    publisher: { '@id': ORG_ID },
  };
}

/** 全ページ共通グラフ（_app で1回のみ出力） */
export function siteGraph() {
  return graph([organizationNode(), webSiteNode()]);
}

/** WebPage（各ページ1つ。Seo コンポーネントが自動付与） */
export function webPageNode(opts: {
  path: string;
  name: string;
  description?: string;
  hasBreadcrumb?: boolean;
  /** 記事など、そのページ固有の主要画像URL。未指定なら組織ロゴ(#logo) */
  primaryImage?: string;
}): Node {
  const url = canonicalUrl(opts.path);
  const node: Node = {
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: opts.name,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORG_ID },
    inLanguage: 'ja',
    primaryImageOfPage: opts.primaryImage
      ? { '@type': 'ImageObject', url: opts.primaryImage }
      : { '@id': LOGO_ID },
  };
  if (opts.description) node.description = opts.description;
  if (opts.hasBreadcrumb) node.breadcrumb = { '@id': `${url}#breadcrumb` };
  return node;
}

/** BreadcrumbList（最終要素は現在ページのため item を付けない） */
export function breadcrumbNode(path: string, items: { name: string; path?: string }[]): Node {
  const url = canonicalUrl(path);
  return {
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: items.map((it, i) => {
      const li: Node = { '@type': 'ListItem', position: i + 1, name: it.name };
      if (it.path) li.item = canonicalUrl(it.path);
      return li;
    }),
  };
}

/** 不用品回収の料金 OfferCatalog */
function collectionOfferCatalog(): Node {
  return {
    '@type': 'OfferCatalog',
    name: '不用品回収料金プラン',
    itemListElement: siteConfig.priceCatalog.map((p) => {
      const offer: Node = { '@type': 'Offer', name: p.plan };
      if (p.desc) offer.description = p.desc;
      if (p.minPrice != null) {
        offer.priceSpecification = {
          '@type': 'PriceSpecification',
          priceCurrency: 'JPY',
          minPrice: p.minPrice,
        };
      }
      return offer;
    }),
  };
}

/** /services の Service ノード群（provider は #organization 参照） */
export function serviceNodes(path = '/services'): Node[] {
  const url = canonicalUrl(path);
  const kanto = [
    { '@type': 'AdministrativeArea', name: siteConfig.domesticRegion },
    ...siteConfig.kantoRegions.map((n) => ({ '@type': 'AdministrativeArea', name: n })),
  ];
  return siteConfig.services.map((s) => {
    const node: Node = {
      '@type': 'Service',
      '@id': `${url}#${s.id}`,
      name: s.name,
      serviceType: s.serviceType,
      description: s.description,
      provider: { '@id': ORG_ID },
      areaServed: s.area === 'global' ? { '@type': 'Place', name: 'Global' } : kanto,
    };
    if (s.id === 'service-collection') node.hasOfferCatalog = collectionOfferCatalog();
    return node;
  });
}

/** ItemList（ブログ一覧・サービス一覧。AIクローラ/理解向け） */
export function itemListNode(path: string, items: { name: string; path: string }[]): Node {
  const url = canonicalUrl(path);
  return {
    '@type': 'ItemList',
    '@id': `${url}#itemlist`,
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: canonicalUrl(it.path),
      name: it.name,
    })),
  };
}

/** BlogPosting（記事ページ。author/publisher は #organization 参照） */
export function blogPostingNode(
  blog: Blog,
  opts: { path: string; description: string; image: string },
): Node {
  const url = canonicalUrl(opts.path);
  const keywords = [blog.category?.name, '不用品回収', 'リサイクル', '遺品整理'].filter(
    (k): k is string => Boolean(k),
  );
  const node: Node = {
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    mainEntityOfPage: { '@id': `${url}#webpage` },
    headline: blog.title.length > 110 ? blog.title.slice(0, 110) : blog.title,
    description: opts.description,
    image: [opts.image],
    datePublished: blog.publishedAt,
    dateModified: blog.revisedAt || blog.updatedAt || blog.publishedAt,
    inLanguage: 'ja',
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    keywords,
  };
  if (blog.category?.name) node.articleSection = blog.category.name;
  return node;
}

/**
 * siteConfig — 全SEO/構造化データ/sitemap/robots の単一情報源 (SSOT)
 *
 * ここを更新すれば、head要素・JSON-LD・sitemap・OGP がすべて追従します。
 * 表示（見た目）には影響しません。NAP（社名・住所・電話）は1文字も揺らさない確定表記。
 */

const RAW_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://nextearth.site';

/** 末尾スラッシュ無し・https・www無しに正規化した本番ドメイン */
export const SITE_URL = RAW_SITE_URL.replace(/\/+$/, '');

export const siteConfig = {
  siteUrl: SITE_URL,
  lang: 'ja',
  locale: 'ja_JP',
  themeColor: '#e692a8',

  // ── 組織 / NAP（確定表記。JSON-LD・title・og:site_name で統一） ──
  name: '株式会社NextEarth',
  legalName: '株式会社NextEarth',
  alternateName: ['NextEarth', 'Next Earth'],
  nameEn: 'NextEarth Inc.',
  shortName: 'NextEarth',

  tel: '050-5574-3058', // 表示用
  telE164: '+81-50-5574-3058', // JSON-LD telephone 用
  telHref: 'tel:+815055743058', // aタグ用
  email: 'info@biz-nextearth.com',

  address: {
    postalCode: '350-0204',
    addressRegion: '埼玉県',
    addressLocality: '坂戸市',
    streetAddress: '大字紺屋866番地1',
    addressCountry: 'JP',
  },
  // 坂戸市紺屋地区の座標。番地レベルの厳密値ではない（地区中心の近似）。
  // 正確値はGoogleマップで該当地点を右クリック→座標をコピーして差し替え推奨。
  // 厳密値が不明で誤差が大きいと感じる場合は null にすれば JSON-LD から geo を省略し、
  // Google が住所(address)から自動ジオコーディングします。
  geo: { lat: 35.9595, lng: 139.4493 } as { lat: number; lng: number } | null,

  corporateNumber: '3010003041673',
  iso6523: '0188:3010003041673', // ICD 0188 = 日本の会社法人等番号
  founderName: '宮脇トニー',
  foundingDate: '2023-09-12',
  numberOfEmployees: 20,
  slogan: 'Re-Earth ― 再利用から始まる地球',
  priceRange: '¥8,000〜',

  // ── 対応エリア ──
  domesticRegion: '埼玉県',
  domesticAreas: ['坂戸市', '鶴ヶ島市', '川越市', '東松山市'],
  kantoRegions: ['東京都', '千葉県', '神奈川県', '群馬県', '栃木県', '茨城県'],

  // ── sameAs（実在URLのみ。確定分だけ段階追加） ──
  sameAs: [
    'https://www.houjin-bangou.nta.go.jp/henkorireki-johoto.html?selHoujinNo=3010003041673',
  ] as string[],

  // ── 既定メタ / OG ──
  defaultTitle: '不用品回収・遺品整理なら坂戸市のNextEarth｜埼玉県西部',
  titleSuffix: '株式会社NextEarth',
  defaultDescription:
    '埼玉県坂戸市の不用品回収・遺品整理・生前整理・ゴミ屋敷片付け・リサイクル買取はNextEarthへ。坂戸市・鶴ヶ島・川越・東松山など埼玉県西部に対応。現地見積無料・即日対応・SS8,000円〜。捨てない選択で地球に貢献します。',
  ogSiteName: '株式会社NextEarth',
  defaultOgImage: '/og-default.jpg', // 1200x630
  defaultOgImageWidth: 1200,
  defaultOgImageHeight: 630,
  logo: '/logo.png',
  logoWidth: 755, // public/logo.png の実寸（差し替え時は要同期）
  logoHeight: 804,
  twitterCard: 'summary_large_image',

  // ── サービス（JSON-LD Service / OfferCatalog に利用） ──
  services: [
    {
      id: 'service-export',
      name: 'リサイクル品の海外輸出・販売代行',
      serviceType: 'リサイクル海外輸出',
      area: 'global' as const,
      description:
        '再生品を海外へ輸出し、国際的な資源循環を実現。BtoB調達ネットワークを活用した販売代行にも対応します。',
    },
    {
      id: 'service-collection',
      name: '不用品回収・片付けサービス',
      serviceType: '不用品回収・遺品整理',
      area: 'kanto' as const,
      description:
        'ご家庭・車両・企業の不用品回収から片付けまで対応。ゴミ屋敷対応・特殊清掃のご相談も承り、現地お見積もりは無料です。',
    },
    {
      id: 'service-buy',
      name: 'リサイクル買取・BtoB取引代行',
      serviceType: 'リサイクル買取',
      area: 'kanto' as const,
      description:
        '中古品の買取からBtoBの取引代行まで、買い手ネットワークを活用した積極的な買取を行います。',
    },
    {
      id: 'service-memorial',
      name: '遺品整理・生前整理',
      serviceType: '遺品整理',
      area: 'kanto' as const,
      description: '遺品整理・生前整理を、ご遺族・ご本人の想いに寄り添い丁寧にサポートします。',
    },
  ],

  // ── 料金プラン（OfferCatalog に利用。3Lは虚偽価格を入れず price 省略） ──
  priceCatalog: [
    { plan: 'SSプラン', minPrice: 8000, desc: '軽トラック未満の少量回収の目安' },
    { plan: 'Sプラン', minPrice: 15000, desc: '家具・家電など単身向けの処分' },
    { plan: 'Mプラン', minPrice: 30000, desc: '1R〜1Kのお部屋整理' },
    { plan: 'Lプラン', minPrice: 50000, desc: '1DK〜1LDK・家族引越し対応' },
    { plan: 'LLプラン', minPrice: 100000, desc: '2DK以上・倉庫/事務所・法人回収' },
    { plan: '3Lプラン', minPrice: null as number | null, desc: 'ゴミ屋敷・大量残置物・特殊清掃相談は個別見積' },
  ],
};

export type SiteConfig = typeof siteConfig;

import { Html, Head, Main, NextScript } from 'next/document';
import { siteConfig } from '@/lib/siteConfig';

/**
 * _document — 全ページ共通の静的head（可変メタは入れない）。
 * lang=ja、microCMS画像CDNへのpreconnect、ファビコン群、manifest、theme-color。
 */
export default function Document() {
  return (
    <Html lang={siteConfig.lang}>
      <Head>
        <meta charSet="utf-8" />

        {/* Google Search Console サイト所有権の確認 */}
        <meta
          name="google-site-verification"
          content="NZHq1DWAQ1ZcgmGcKL5cxiiEseMeRwJFUmiU5n9qQ6I"
        />

        {/* microCMS 画像CDNへ事前接続（LCP改善） */}
        <link rel="preconnect" href="https://images.microcms-assets.io" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.microcms-assets.io" />

        {/* ファビコン群（従来 /favicon.ico の404を解消） */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        <meta name="theme-color" content={siteConfig.themeColor} />
        {/* 電話番号はtap-to-callを残すためtelephoneは無効化しない */}
        <meta name="format-detection" content="email=no,address=no" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

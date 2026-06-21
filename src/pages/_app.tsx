import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { siteGraph } from '@/lib/jsonLd';

// 全ページ共通の Organization / WebSite 構造化データ（一度だけ出力）。
// "<" をエスケープして </script> 注入を防止。
const SITE_LD = JSON.stringify(siteGraph()).replace(/</g, '\\u003c');

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          key="ldjson-site"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: SITE_LD }}
        />
      </Head>
      <Header />
      <main className="pt-16 min-h-screen">
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}

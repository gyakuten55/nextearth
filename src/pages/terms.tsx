import Head from 'next/head';
import { useEffect, useState } from 'react';
import PageHero from '@/components/PageHero';

export default function Terms() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <Head>
        <title>利用規約 - Next Earth</title>
      </Head>

      <div className="min-h-screen bg-white">
        <PageHero titleJp="利用規約" titleEn="Terms of Service" />

        {/* コンテンツ */}
        <section className="relative py-16 bg-white overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              background:
                'radial-gradient(circle at 10% 20%, #f9e4ea 0%, transparent 35%), radial-gradient(circle at 90% 80%, #dde7f1 0%, transparent 35%)',
            }}
          />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className={`relative bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 overflow-hidden transition-all duration-1000 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div
                className="absolute top-0 left-0 h-1 w-full"
                style={{
                  background:
                    'linear-gradient(90deg, #f0a3b9 0%, #c8b3d2 50%, #a8c5dd 100%)',
                }}
              />
              <p className="text-gray-600 leading-relaxed">準備中です。</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

import React, { useEffect, useState } from 'react';

interface PageHeroProps {
  titleJp: string;
  titleEn: string;
  description?: string;
}

const PageHero: React.FC<PageHeroProps> = ({ titleJp, titleEn, description }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative overflow-hidden bg-white">
      {/* 背景の水彩ブロブ */}
      <div
        className="absolute -top-40 -right-32 w-[560px] h-[560px] rounded-full opacity-40 blur-[120px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #f0a3b9 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute -bottom-48 -left-40 w-[640px] h-[640px] rounded-full opacity-35 blur-[120px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #a8c5dd 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute top-1/3 left-1/2 w-[420px] h-[420px] rounded-full opacity-25 blur-[120px] pointer-events-none -translate-x-1/2"
        style={{
          background: 'radial-gradient(circle, #c8b3d2 0%, transparent 70%)',
        }}
      />

      {/* グリッドの微かなテクスチャ */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='g' width='60' height='60' patternUnits='userSpaceOnUse'%3E%3Cpath d='M0 0 L 60 0 M0 0 L 0 60' fill='none' stroke='%23000' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23g)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* コンテンツ */}
      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-28 md:py-36 lg:py-40">
        <div
          className={`transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {/* アイブロウ */}
          <div className="flex items-center gap-4 mb-8">
            <div
              className="h-px w-14"
              style={{
                background: 'linear-gradient(90deg, #f0a3b9 0%, #a8c5dd 100%)',
              }}
            />
            <span
              className="text-[11px] font-semibold tracking-[0.4em] uppercase"
              style={{
                background:
                  'linear-gradient(90deg, #e692a8 0%, #c8b3d2 50%, #8eb4d4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {titleEn}
            </span>
          </div>

          {/* 大見出し */}
          <h1
            className="font-bold text-gray-700 leading-[1.15] tracking-[0.04em]"
            style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)' }}
          >
            {titleJp}
          </h1>

          {/* 説明 */}
          {description && (
            <p className="mt-8 max-w-2xl text-base md:text-lg text-gray-500 leading-loose">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* 下部の薄いグラデーションライン */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, #f0a3b9 25%, #c8b3d2 50%, #a8c5dd 75%, transparent 100%)',
          opacity: 0.6,
        }}
      />
    </section>
  );
};

export default PageHero;

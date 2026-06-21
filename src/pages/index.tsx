import Seo from '@/components/Seo';
import Link from 'next/link';
import Image from 'next/image';

const GRADIENT_TEXT = {
  background: 'linear-gradient(90deg, #e692a8 0%, #c8b3d2 50%, #8eb4d4 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
} as const;

const GRADIENT_NUMBER = {
  background: 'linear-gradient(180deg, #f0a3b9 0%, #c8b3d2 50%, #a8c5dd 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
} as const;

const BUTTON_GRADIENT =
  'linear-gradient(90deg, #f0a3b9 0%, #e3a8c0 30%, #c8b3d2 55%, #aec3dd 80%, #a8c5dd 100%)';

const OUTLINE_NUMBER_STYLE: React.CSSProperties = {
  WebkitTextStroke: '1px #e7d0d8',
  color: 'transparent',
  fontWeight: 700,
  letterSpacing: '-0.04em',
};

export default function Home() {
  return (
    <>
      <Seo
        title="不用品回収・遺品整理なら坂戸市のNextEarth｜埼玉県西部"
        description="埼玉県坂戸市の不用品回収・遺品整理・生前整理・ゴミ屋敷片付け・リサイクル買取はNextEarthへ。坂戸市・鶴ヶ島・川越・東松山など埼玉県西部に対応。現地見積無料・即日対応・SS8,000円〜。捨てない選択で地球に貢献します。"
        path="/"
        ogType="website"
      />

      {/* ── HERO ───────────────────────────── */}
      <section
        className="relative w-full overflow-hidden"
        style={{
          minHeight: 'calc(100vh - 4rem)',
          backgroundImage: "url('/top.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#ffffff',
        }}
      >
        <div
          className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex items-center"
          style={{ minHeight: 'calc(100vh - 4rem)' }}
        >
          <div className="max-w-xl">
            <h1
              className="font-bold text-gray-700 leading-[1.25] tracking-wide"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
            >
              地球と共に、
              <br />
              未来をつくる。
            </h1>
            <p className="mt-8 text-sm md:text-base text-gray-600 leading-relaxed">
              Next Earthは、持続可能な社会の実現に向けて、
              <br className="hidden sm:block" />
              テクノロジーとアイデアで新しい価値を創造します。
            </p>
            <Link
              href="/company"
              className="mt-10 inline-flex items-center justify-between w-64 px-8 py-3.5 text-sm font-medium text-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-200"
              style={{ background: BUTTON_GRADIENT }}
            >
              <span>私たちについて</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
          <span className="text-xs tracking-[0.3em] text-gray-500 mb-3">SCROLL</span>
          <div className="w-px h-12 bg-gray-400/70" />
        </div>
      </section>

      {/* ── 01 ABOUT — タイポ主役の見開き ───────────────────────────── */}
      <section className="relative overflow-hidden bg-white py-32 md:py-40">
        {/* 巨大アウトラインナンバー（背景装飾） */}
        <div
          aria-hidden
          className="absolute -top-6 -right-6 md:-top-10 md:-right-10 pointer-events-none select-none"
          style={{
            ...OUTLINE_NUMBER_STYLE,
            fontSize: 'clamp(14rem, 32vw, 30rem)',
            lineHeight: 0.8,
          }}
        >
          01
        </div>

        {/* 縦書きラベル */}
        <div className="hidden lg:flex absolute top-32 left-10 flex-col items-center gap-4 pointer-events-none">
          <div
            className="w-px h-20"
            style={{ background: 'linear-gradient(180deg, #f0a3b9 0%, #a8c5dd 100%)' }}
          />
          <span
            className="text-[10px] font-semibold tracking-[0.5em] text-gray-400 uppercase"
            style={{ writingMode: 'vertical-rl' }}
          >
            About · 会社情報
          </span>
        </div>

        <div className="relative max-w-6xl mx-auto px-6 sm:px-10 lg:px-24">
          <div className="grid grid-cols-12 gap-8 md:gap-12 items-start">
            <div className="col-span-12 md:col-span-5 md:sticky md:top-24">
              <p className="text-[11px] font-semibold tracking-[0.4em] text-gray-400 uppercase mb-3">
                01 — About
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-700 tracking-wide mb-10">
                会社情報
              </h2>
              <Link
                href="/company"
                className="inline-flex items-center gap-3 text-sm font-medium text-gray-700 hover:text-gray-900 group"
              >
                <span className="tracking-wider">VIEW MORE</span>
                <span
                  className="block h-px w-12 transition-all duration-300 group-hover:w-16"
                  style={{ background: 'linear-gradient(90deg, #f0a3b9 0%, #a8c5dd 100%)' }}
                />
              </Link>
            </div>

            <div className="col-span-12 md:col-span-7 space-y-10">
              <p
                className="font-bold leading-[1.05] tracking-tight"
                style={{
                  fontSize: 'clamp(3rem, 7vw, 6rem)',
                  ...GRADIENT_TEXT,
                }}
              >
                Re-Earth
              </p>
              <p className="text-xl md:text-2xl font-bold text-gray-700 leading-snug tracking-wide">
                再利用から始まる地球。
              </p>
              <p className="text-gray-600 leading-loose max-w-xl">
                Next Earthは、限りある地球資源を次世代へ引き継ぐ責任を胸に、資源の再利用を通じて環境破壊を抑止し、持続可能な社会の実現を目指します。あらゆる資源を“使い捨て”ではなく“活かし続ける”循環型の仕組みを築き、地球と人が共に豊かに生きる未来を創造します。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 02 SERVICES — ナンバー＋画像の横並びインデックス ───────────────────────────── */}
      <section className="relative bg-gray-50/70 py-32 md:py-40 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
          {/* ヘッダー：横長 */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.4em] text-gray-400 uppercase mb-3">
                02 — Services
              </p>
              <h2 className="font-bold text-gray-700 tracking-wide" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
                3つの事業で、
                <br />
                <span style={GRADIENT_TEXT}>資源循環</span>を実現する。
              </h2>
            </div>
            <Link
              href="/services"
              className="self-start md:self-end inline-flex items-center gap-3 text-sm font-medium text-gray-700 hover:text-gray-900 group whitespace-nowrap"
            >
              <span className="tracking-wider">ALL SERVICES</span>
              <span
                className="block h-px w-12 transition-all duration-300 group-hover:w-16"
                style={{ background: 'linear-gradient(90deg, #f0a3b9 0%, #a8c5dd 100%)' }}
              />
            </Link>
          </div>

          {/* 3事業を横並びカード（罫線型・画像トリミング） */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-200">
            {[
              {
                no: '001',
                title: 'リサイクル関連の輸出業',
                en: 'Recycling Export',
                desc: '再生品を海外へ輸出し、資源の国際的な循環を実現。',
                image: '/S__49135679.jpg',
                href: '/services#export',
              },
              {
                no: '002',
                title: '不用品回収・片付け',
                en: 'Collection & Cleanup',
                desc: 'ご家庭や車両、企業様の不用品回収を丁寧にサポート。',
                image: '/S__49135683.jpg',
                href: '/services#collection',
              },
              {
                no: '003',
                title: 'リサイクル売買・買取',
                en: 'Trading & Buyback',
                desc: '中古品の買取からBtoBの取引代行まで幅広く対応。',
                image: '/S__49135687.jpg',
                href: '/services#buyback',
              },
            ].map(item => (
              <Link
                key={item.no}
                href={item.href}
                className="group relative block bg-white p-8 md:p-10 hover:bg-gray-50 transition-colors duration-300"
              >
                <div className="aspect-[4/3] mb-8 overflow-hidden bg-gray-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-baseline gap-4 mb-4">
                  <span
                    className="text-3xl md:text-4xl font-bold leading-none"
                    style={GRADIENT_NUMBER}
                  >
                    {item.no}
                  </span>
                  <span className="text-[10px] tracking-[0.3em] text-gray-400 uppercase">
                    {item.en}
                  </span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-700 mb-3 tracking-wide">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                <div className="mt-8 flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-gray-500 uppercase">
                  <span>Read</span>
                  <span
                    className="block h-px w-8 transition-all duration-300 group-hover:w-12"
                    style={{ background: 'linear-gradient(90deg, #f0a3b9 0%, #a8c5dd 100%)' }}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 03 RECRUIT — マニフェスト型 / センター大文字組 ───────────────────────────── */}
      <section className="relative overflow-hidden bg-white py-32 md:py-44">
        {/* 背面のソフトオーブ */}
        <div
          aria-hidden
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-25 blur-[140px] pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, #f0a3b9 0%, #c8b3d2 35%, #a8c5dd 70%, transparent 90%)',
          }}
        />

        <div className="relative max-w-4xl mx-auto px-6 sm:px-10 lg:px-16 text-center">
          <p className="text-[11px] font-semibold tracking-[0.4em] text-gray-400 uppercase mb-10">
            03 — Recruit
          </p>

          <div
            className="mx-auto mb-10 h-px w-16"
            style={{ background: 'linear-gradient(90deg, #f0a3b9 0%, #a8c5dd 100%)' }}
          />

          <p
            className="font-bold text-gray-700 leading-[1.15] tracking-wide"
            style={{ fontSize: 'clamp(2.25rem, 5.5vw, 4.5rem)' }}
          >
            地球の未来を、
            <br />
            <span style={GRADIENT_TEXT}>ともに描く仲間</span>を。
          </p>

          <p className="mt-10 text-gray-600 leading-loose max-w-xl mx-auto">
            ドライバー / 仕分け / 事務 / 営業 ──
            <br />
            さまざまなポジションでメンバーを募集しています。
          </p>

          {/* タグ風スキル一覧 */}
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {['Driver', '仕分け', '事務スタッフ', '営業', 'その他'].map(tag => (
              <span
                key={tag}
                className="text-xs tracking-[0.15em] text-gray-500 px-4 py-2 border border-gray-200 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-14">
            <Link
              href="/recruit"
              className="inline-flex items-center justify-center px-10 py-4 text-white font-medium rounded-full shadow-md hover:shadow-lg transition-shadow duration-200"
              style={{ background: BUTTON_GRADIENT }}
            >
              採用情報を見る
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

    </>
  );
}

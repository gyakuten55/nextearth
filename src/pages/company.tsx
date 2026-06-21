import Head from 'next/head';
import { useEffect, useState } from 'react';
import PageHero from '@/components/PageHero';

export default function Company() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const companyInfo = [
    { label: '会社名', value: '株式会社NextEarth' },
    { label: '法人番号', value: '3010003041673' },
    { label: '代表者', value: '宮脇トニー' },
    { label: '設立日', value: '2023年9月12日' },
    { label: '従業員数', value: '20名' },
    { label: '所在地', value: '〒350-0204 埼玉県坂戸市大字紺屋866番地1' },
    { label: '電話番号', value: '050-5574-3058' },
    { label: 'メールアドレス', value: 'info@biz-nextearth.com' },
    {
      label: '事業内容',
      value: 'リサイクル海外輸出、及び販売代行\n不用品回収、買取\n遺品、生前整理',
    },
  ];

  return (
    <>
      <Head>
        <title>会社情報 - Next Earth</title>
        <meta name="description" content="株式会社NextEarthの会社概要、企業理念、アクセス情報" />
      </Head>

      <div className="min-h-screen bg-white">
        <PageHero
          titleJp="会社情報"
          titleEn="Company Information"
          description="環境と未来を見据えた、持続可能な社会の実現を目指します。"
        />

        {/* 企業理念 */}
        <section className="py-24 md:py-32 bg-white">
          <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">
            <div
              className={`transition-all duration-1000 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <div className="mb-16 md:mb-20 flex items-center gap-5">
                <span
                  className="text-5xl md:text-6xl font-bold leading-none"
                  style={{
                    background:
                      'linear-gradient(90deg, #f0a3b9 0%, #c8b3d2 50%, #a8c5dd 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  01
                </span>
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.4em] text-gray-400 uppercase mb-1">
                    Philosophy
                  </p>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-700 tracking-wide">
                    企業理念
                  </h2>
                </div>
              </div>

              <div className="space-y-20">
                {/* Mission */}
                <div className="grid grid-cols-12 gap-6 md:gap-10">
                  <div className="col-span-12 md:col-span-3 relative">
                    <div
                      className="hidden md:block absolute top-1 left-0 w-10 h-px"
                      style={{
                        background:
                          'linear-gradient(90deg, #f0a3b9 0%, #a8c5dd 100%)',
                      }}
                    />
                    <p className="md:pl-14 text-xs font-semibold tracking-[0.3em] text-gray-500 uppercase">
                      Mission
                    </p>
                  </div>
                  <div className="col-span-12 md:col-span-9 space-y-6">
                    <p className="text-2xl md:text-3xl font-bold leading-snug tracking-wide text-gray-700">
                      『
                      <span
                        style={{
                          background:
                            'linear-gradient(90deg, #e692a8 0%, #c8b3d2 50%, #8eb4d4 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}
                      >
                        Re-Earth
                      </span>
                      』
                      <br />
                      再利用から始まる地球。
                    </p>
                    <p className="text-gray-600 leading-loose">
                      私たちは、限りある地球資源を次世代へ引き継ぐ責任を胸に、資源の再利用を通じて環境破壊を抑止し、持続可能な社会の実現を目指します。
                    </p>
                    <p className="text-gray-600 leading-loose">
                      あらゆる資源を“使い捨て”ではなく“活かし続ける”循環型の仕組みを築くことで、地球と人が共に豊かに生きる未来を創造していきます。
                    </p>
                  </div>
                </div>

                <div
                  className="h-px w-full"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent 0%, #f0a3b9 20%, #c8b3d2 50%, #a8c5dd 80%, transparent 100%)',
                    opacity: 0.45,
                  }}
                />

                {/* Vision */}
                <div className="grid grid-cols-12 gap-6 md:gap-10">
                  <div className="col-span-12 md:col-span-3 relative">
                    <div
                      className="hidden md:block absolute top-1 left-0 w-10 h-px"
                      style={{
                        background:
                          'linear-gradient(90deg, #f0a3b9 0%, #a8c5dd 100%)',
                      }}
                    />
                    <p className="md:pl-14 text-xs font-semibold tracking-[0.3em] text-gray-500 uppercase">
                      Vision
                    </p>
                  </div>
                  <div className="col-span-12 md:col-span-9 space-y-6">
                    <p className="text-2xl md:text-3xl font-bold leading-snug tracking-wide text-gray-700">
                      捨てない選択が、
                      <span
                        style={{
                          background:
                            'linear-gradient(90deg, #e692a8 0%, #c8b3d2 50%, #8eb4d4 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}
                      >
                        地球を救う
                      </span>
                      。
                    </p>
                    <p className="text-gray-600 leading-loose">
                      再利用で描く、環境破壊のない未来を目指します。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 会社概要 */}
        <section className="py-24 md:py-32 bg-white border-t border-gray-100">
          <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">
            <div
              className={`transition-all duration-1000 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <div className="mb-16 md:mb-20 flex items-center gap-5">
                <span
                  className="text-5xl md:text-6xl font-bold leading-none"
                  style={{
                    background:
                      'linear-gradient(90deg, #f0a3b9 0%, #c8b3d2 50%, #a8c5dd 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  02
                </span>
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.4em] text-gray-400 uppercase mb-1">
                    Overview
                  </p>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-700 tracking-wide">
                    会社概要
                  </h2>
                </div>
              </div>

              <dl>
                {companyInfo.map((item, index) => (
                  <div
                    key={index}
                    className={`grid grid-cols-12 gap-4 md:gap-10 py-6 ${
                      index === 0 ? 'border-t border-gray-100' : ''
                    } border-b border-gray-100`}
                  >
                    <dt className="col-span-12 md:col-span-3 text-sm font-semibold text-gray-700 tracking-wide">
                      {item.label}
                    </dt>
                    <dd className="col-span-12 md:col-span-9 text-sm md:text-base text-gray-600 whitespace-pre-line leading-relaxed">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* アクセス */}
        <section className="py-24 md:py-32 bg-white border-t border-gray-100">
          <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">
            <div
              className={`transition-all duration-1000 delay-400 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <div className="mb-16 md:mb-20 flex items-center gap-5">
                <span
                  className="text-5xl md:text-6xl font-bold leading-none"
                  style={{
                    background:
                      'linear-gradient(90deg, #f0a3b9 0%, #c8b3d2 50%, #a8c5dd 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  03
                </span>
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.4em] text-gray-400 uppercase mb-1">
                    Access
                  </p>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-700 tracking-wide">
                    アクセス
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-6 md:gap-10 mb-12">
                <div className="col-span-12 md:col-span-3">
                  <p className="text-xs font-semibold tracking-[0.3em] text-gray-400 uppercase">
                    Address
                  </p>
                </div>
                <div className="col-span-12 md:col-span-9 text-gray-600 leading-loose">
                  〒350-0204
                  <br />
                  埼玉県坂戸市大字紺屋866番地1
                </div>
              </div>

              <div className="grid grid-cols-12 gap-6 md:gap-10 mb-16">
                <div className="col-span-12 md:col-span-3">
                  <p className="text-xs font-semibold tracking-[0.3em] text-gray-400 uppercase">
                    Contact
                  </p>
                </div>
                <div className="col-span-12 md:col-span-9 text-gray-600 leading-loose">
                  <p>
                    <span className="inline-block w-14 text-gray-500">TEL</span>
                    080-7685-6774
                  </p>
                  <p>
                    <span className="inline-block w-14 text-gray-500">Email</span>
                    info@biz-nextearth.com
                  </p>
                </div>
              </div>

              <iframe
                src="https://maps.google.com/maps?q=%E5%9F%BC%E7%8E%89%E7%9C%8C%E5%9D%82%E6%88%B8%E5%B8%82%E5%A4%A7%E5%AD%97%E7%B4%BA%E5%B1%8B866%E7%95%AA%E5%9C%B01&output=embed"
                width="100%"
                height="420"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

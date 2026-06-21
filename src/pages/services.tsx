import Seo from '@/components/Seo';
import { serviceNodes } from '@/lib/jsonLd';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PageHero from '@/components/PageHero';

const GRADIENT_TEXT = {
  background: 'linear-gradient(90deg, #e692a8 0%, #c8b3d2 50%, #8eb4d4 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
} as const;

const GRADIENT_NUMBER = {
  background: 'linear-gradient(90deg, #f0a3b9 0%, #c8b3d2 50%, #a8c5dd 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
} as const;

const BUTTON_GRADIENT =
  'linear-gradient(90deg, #f0a3b9 0%, #e3a8c0 30%, #c8b3d2 55%, #aec3dd 80%, #a8c5dd 100%)';

interface SectionHeadingProps {
  number: string;
  eyebrow: string;
  title: string;
}

function SectionHeading({ number, eyebrow, title }: SectionHeadingProps) {
  return (
    <div className="mb-16 md:mb-20 flex items-center gap-5">
      <span className="text-5xl md:text-6xl font-bold leading-none" style={GRADIENT_NUMBER}>
        {number}
      </span>
      <div>
        <p className="text-[11px] font-semibold tracking-[0.4em] text-gray-400 uppercase mb-1">
          {eyebrow}
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-700 tracking-wide">{title}</h2>
      </div>
    </div>
  );
}

export default function Services() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const services = [
    {
      id: 'export',
      index: '001',
      title: 'リサイクル関連の輸出業',
      subtitle: 'Recycling Export Business',
      description: '再生品を海外へ輸出し、資源の国際的な循環を実現しています。',
      features: [
        '再生品の海外輸出',
        '資源の有効活用による環境負荷低減',
        '国際的な調達ネットワークの構築',
        'グローバルな資源循環への貢献',
      ],
      image: '/S__49135679.jpg',
    },
    {
      id: 'collection',
      index: '002',
      title: '不用品回収・片付けサービス',
      subtitle: 'Unwanted Items Collection & Cleanup',
      description: 'ご家庭や車両の不用品回収から、お部屋の片付けまで、丁寧にサポートいたします。',
      features: [
        'お部屋の片付け・整理整頓',
        '不用品の回収・処分',
        '現地お見積もり無料',
        'ご家庭・車両の両方に対応',
      ],
      image: '/S__49135683.jpg',
    },
    {
      id: 'buyback',
      index: '003',
      title: 'リサイクル売買・買取',
      subtitle: 'Recycling Trading & Buyback',
      description: '中古品の買取から、BtoBの取引代行まで、幅広いリサイクル事業を展開しています。',
      features: [
        '中古品の買取サービス',
        'リサイクル品の売買',
        'BtoB取引代行',
        '買い手ネットワークを活用した積極的な買取',
      ],
      image: '/S__49135687.jpg',
    },
  ];

  const pricing = [
    { plan: 'SSプラン', target: 'ちょっとした片付け向け', features: ['目安：1㎡', '軽トラック相当', '少量の不用品'], price: '¥8,000〜' },
    { plan: 'Sプラン', target: '家具・家電の処分向け', features: ['目安：1.5㎡', '単身向け', '洗濯機・冷蔵庫など'], price: '¥15,000〜' },
    { plan: 'Mプラン', target: '1R〜1Kのお部屋整理', features: ['目安：3㎡', '一人暮らし向け', '引越し前後にも対応'], price: '¥30,000〜' },
    { plan: 'Lプラン', target: '1DK〜1LDK向け', features: ['目安：5㎡', '家族引越し対応', '大型回収対応'], price: '¥50,000〜' },
    { plan: 'LLプラン', target: '2DK以上・大量回収', features: ['目安：10㎡', '倉庫・事務所対応', '法人回収OK'], price: '¥100,000〜' },
    { plan: '3Lプラン', target: 'ゴミ屋敷・遺品整理', features: ['一軒家対応', '大量残置物', '特殊清掃相談可'], price: 'お見積り対応' },
  ];

  return (
    <>
      <Seo
        title="不用品回収・遺品整理・買取｜坂戸市・川越のNextEarth"
        description="不用品回収・遺品整理・生前整理・ゴミ屋敷片付け・出張買取・リサイクル海外輸出までNextEarthが一括対応。家庭・車両・企業の片付け、特殊清掃のご相談も。坂戸市・鶴ヶ島・川越・東松山・埼玉県西部へ出張、現地見積もり無料。料金SS8,000円〜LL10万円〜。"
        path="/services"
        breadcrumb={[{ name: 'ホーム', path: '/' }, { name: '事業内容' }]}
        jsonLd={serviceNodes('/services')}
      />

      <div className="min-h-screen bg-white">
        <PageHero
          titleJp="事業内容"
          titleEn="Our Services"
          description="資源の循環を通じて、持続可能な社会の実現に貢献します。"
        />

        {/* 01 Services */}
        <section className="py-24 md:py-32 bg-white">
          <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">
            <div
              className={`transition-all duration-1000 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <SectionHeading number="01" eyebrow="Services" title="3つの事業" />

              <div className="space-y-20 md:space-y-24">
                {services.map((service, index) => (
                  <article key={service.id} id={service.id}>
                    <div className="grid grid-cols-12 gap-6 md:gap-10">
                      <div className="col-span-12 md:col-span-3">
                        <p className="text-xs font-semibold tracking-[0.3em] text-gray-500 uppercase mb-2">
                          No. {service.index}
                        </p>
                        <p className="text-xs text-gray-400 tracking-wider">{service.subtitle}</p>
                      </div>

                      <div className="col-span-12 md:col-span-9 space-y-8">
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-700 leading-snug tracking-wide">
                          {service.title}
                        </h3>

                        <div className="overflow-hidden">
                          <Image
                            src={service.image}
                            alt={service.title}
                            width={1200}
                            height={700}
                            className="w-full h-auto object-cover"
                          />
                        </div>

                        <p className="text-gray-600 leading-loose">{service.description}</p>

                        <ul className="divide-y divide-gray-100 border-t border-b border-gray-100">
                          {service.features.map((feature, featureIndex) => (
                            <li
                              key={featureIndex}
                              className="flex items-center gap-4 py-3.5 text-sm md:text-base"
                            >
                              <span
                                className="inline-block w-6 h-px flex-shrink-0"
                                style={{
                                  background:
                                    'linear-gradient(90deg, #f0a3b9 0%, #a8c5dd 100%)',
                                }}
                              />
                              <span className="text-gray-600">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {index < services.length - 1 && (
                      <div
                        className="mt-20 md:mt-24 h-px w-full"
                        style={{
                          background:
                            'linear-gradient(90deg, transparent 0%, #f0a3b9 20%, #c8b3d2 50%, #a8c5dd 80%, transparent 100%)',
                          opacity: 0.4,
                        }}
                      />
                    )}
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 02 Pricing */}
        <section className="py-24 md:py-32 bg-white border-t border-gray-100">
          <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">
            <div
              className={`transition-all duration-1000 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <SectionHeading number="02" eyebrow="Pricing" title="料金プラン" />

              <p className="text-sm text-gray-500 mb-10">
                ※料金は目安です。詳細はお問い合わせください。
              </p>

              {/* 料金プランカード */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {pricing.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col border border-gray-100 rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    <p className="text-2xl font-bold" style={GRADIENT_TEXT}>
                      {item.plan}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">{item.target}</p>

                    <ul className="mt-5 space-y-2.5 flex-1">
                      {item.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-3 text-sm">
                          <span
                            className="inline-block w-4 h-px flex-shrink-0"
                            style={{
                              background: 'linear-gradient(90deg, #f0a3b9 0%, #a8c5dd 100%)',
                            }}
                          />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <p className="mt-6 pt-5 border-t border-gray-100 text-2xl font-bold text-gray-700">
                      {item.price}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-12 grid grid-cols-12 gap-6 md:gap-10">
                <div className="col-span-12 md:col-span-3">
                  <p className="text-xs font-semibold tracking-[0.3em] text-gray-500 uppercase">
                    Notes
                  </p>
                </div>
                <ul className="col-span-12 md:col-span-9 text-gray-600 text-sm space-y-2 leading-relaxed">
                  <li>現地でのお見積もりは無料です。</li>
                  <li>物量や作業内容により料金が変動する場合があります。</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 03 BtoB */}
        <section className="py-24 md:py-32 bg-white border-t border-gray-100">
          <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">
            <div
              className={`transition-all duration-1000 delay-400 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <SectionHeading number="03" eyebrow="B to B" title="法人取引にも対応" />

              <div className="grid grid-cols-12 gap-6 md:gap-10">
                <div className="col-span-12 md:col-span-3">
                  <p className="text-xs font-semibold tracking-[0.3em] text-gray-500 uppercase">
                    For Business
                  </p>
                </div>
                <div className="col-span-12 md:col-span-9 space-y-8">
                  <p className="text-2xl md:text-3xl font-bold leading-snug tracking-wide text-gray-700">
                    企業様向けの取引代行や、
                    <br />
                    <span style={GRADIENT_TEXT}>大量の不用品回収</span>
                    も承ります。
                  </p>
                  <p className="text-gray-600 leading-loose">
                    買い手ネットワークを活用し、積極的な買取を実施しています。継続的な取引・物流体制のご相談もお気軽にどうぞ。
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center px-8 py-3.5 text-white font-medium rounded-full shadow-md hover:shadow-lg transition-shadow duration-200"
                      style={{ background: BUTTON_GRADIENT }}
                    >
                      お問い合わせ
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                    <Link
                      href="/company"
                      className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-gray-600 font-medium rounded-full hover:bg-gray-50 transition-colors duration-200 border border-gray-200"
                    >
                      会社情報を見る
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 04 Philosophy */}
        <section className="py-24 md:py-32 bg-white border-t border-gray-100">
          <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">
            <div
              className={`transition-all duration-1000 delay-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <SectionHeading number="04" eyebrow="Philosophy" title="私たちの想い" />

              <div className="grid grid-cols-12 gap-6 md:gap-10">
                <div className="col-span-12 md:col-span-3">
                  <p className="text-xs font-semibold tracking-[0.3em] text-gray-500 uppercase">
                    Re-Earth
                  </p>
                </div>
                <div className="col-span-12 md:col-span-9 space-y-6">
                  <p className="text-2xl md:text-3xl font-bold leading-snug tracking-wide text-gray-700">
                    『
                    <span style={GRADIENT_TEXT}>Re-Earth</span>
                    』
                    <br />
                    再利用から始まる地球。
                  </p>
                  <p className="text-gray-600 leading-loose">
                    私たちは、限りある地球資源を次世代へ引き継ぐ責任を胸に、資源の再利用を通じて環境破壊を抑止し、持続可能な社会の実現を目指します。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

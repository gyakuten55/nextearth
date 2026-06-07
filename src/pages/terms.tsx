import Head from 'next/head';
import { useEffect, useState } from 'react';
import PageHero from '@/components/PageHero';

const sections = [
  {
    title: '第1条（適用）',
    body: [
      '本利用規約（以下「本規約」といいます。）は、株式会社Next Earth（以下「当社」といいます。）が提供する不用品回収、買取、リサイクル、その他関連サービス（以下「本サービス」といいます。）の利用に関する条件を、本サービスを利用するお客様（以下「利用者」といいます。）と当社との間で定めるものです。',
      '利用者は、本サービスを利用することにより、本規約の全ての内容に同意したものとみなされます。',
    ],
  },
  {
    title: '第2条（定義）',
    body: [
      '本規約において使用する用語の定義は、次のとおりとします。',
    ],
    list: [
      '「本サービス」とは、当社が提供する不用品回収・買取、リサイクル品の売買・輸出、遺品整理・生前整理、配送・運送その他の役務をいいます。',
      '「有価物」とは、再利用または再資源化が可能で経済的価値を有する物品をいいます。',
      '「無価物」とは、経済的価値を有しない廃棄物等をいいます。',
    ],
  },
  {
    title: '第3条（サービスの内容）',
    body: [
      '当社は、利用者に対し、不用品の回収・買取、リサイクル品の売買、遺品整理・生前整理、これらに付随する配送・運送等のサービスを提供します。',
      '具体的なサービス内容、対応範囲、作業日時等については、別途当社と利用者との間で取り交わすお見積りまたは契約により定めるものとします。',
    ],
  },
  {
    title: '第4条（料金および支払い）',
    body: [
      '本サービスの料金は、回収・運搬に用いる車種、作業人員、対象物が有価物か無価物かの別等に応じて、当社が別途定める料金表またはお見積りに基づき算定します。',
      '無価物（廃棄物）の取り扱いについては、内容により別途お見積りのうえご相談とさせていただきます。',
      '料金の支払い方法および支払い時期については、当社が別途指定する方法によるものとします。',
    ],
  },
  {
    title: '第5条（禁止事項）',
    body: [
      '利用者は、本サービスの利用にあたり、以下の行為をしてはなりません。',
    ],
    list: [
      '法令または公序良俗に違反する行為',
      '当社または第三者の権利・利益を侵害する行為',
      '回収・買取の対象物に関して、虚偽の申告を行う行為',
      '法令により取り扱いが禁止・制限されている物品の回収・買取を依頼する行為',
      '当社の運営を妨害し、または信用を毀損する行為',
      'その他、当社が不適切と判断する行為',
    ],
  },
  {
    title: '第6条（サービスの提供の停止・中断）',
    body: [
      '当社は、以下のいずれかの事由があると判断した場合、利用者に事前に通知することなく、本サービスの全部または一部の提供を停止または中断することができるものとします。',
    ],
    list: [
      '天災地変、悪天候、交通事情その他の不可抗力により本サービスの提供が困難となった場合',
      '本サービスに関わる設備・車両等の保守点検または更新を行う場合',
      'その他、当社が本サービスの提供が困難と判断した場合',
    ],
  },
  {
    title: '第7条（免責事項）',
    body: [
      '当社は、本サービスに関して利用者に生じた損害について、当社の故意または重大な過失による場合を除き、責任を負わないものとします。',
      '利用者が回収・買取を依頼した物品の中に、利用者の確認不足等により重要な物品・書類等が含まれていた場合であっても、当社は当該物品の返還その他の責任を負いません。回収依頼前に内容物のご確認をお願いいたします。',
    ],
  },
  {
    title: '第8条（知的財産権）',
    body: [
      '本ウェブサイトに掲載されている文章、画像、ロゴ、デザインその他のコンテンツに関する著作権、商標権その他の知的財産権は、当社または正当な権利者に帰属します。利用者は、当社の事前の承諾なくこれらを複製、転用、改変その他の方法で利用してはなりません。',
    ],
  },
  {
    title: '第9条（規約の変更）',
    body: [
      '当社は、必要と判断した場合には、利用者に通知することなく本規約を変更することができるものとします。変更後の本規約は、本ウェブサイトに掲載した時点から効力を生じるものとし、変更後に本サービスを利用した利用者は、変更後の本規約に同意したものとみなされます。',
    ],
  },
  {
    title: '第10条（準拠法・裁判管轄）',
    body: [
      '本規約の解釈にあたっては、日本法を準拠法とします。',
      '本サービスに関して当社と利用者との間で紛争が生じた場合には、当社の本店所在地を管轄する裁判所を第一審の専属的合意管轄裁判所とします。',
    ],
  },
];

export default function Terms() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <Head>
        <title>利用規約 - Next Earth</title>
        <meta
          name="description"
          content="株式会社Next Earthが提供する各種サービスの利用規約です。"
        />
      </Head>

      <div className="min-h-screen bg-white">
        <PageHero
          titleJp="利用規約"
          titleEn="Terms of Service"
          description="本サービスをご利用いただく際の条件を定めています。ご利用前にご確認ください。"
        />

        {/* コンテンツ */}
        <section className="relative py-16 md:py-24 bg-white overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              background:
                'radial-gradient(circle at 10% 20%, #f9e4ea 0%, transparent 35%), radial-gradient(circle at 90% 80%, #dde7f1 0%, transparent 35%)',
            }}
          />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className={`relative bg-white rounded-3xl p-8 md:p-14 shadow-sm border border-gray-100 overflow-hidden transition-all duration-1000 delay-200 ${
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

              <p className="text-gray-600 leading-loose mb-12">
                この利用規約（以下「本規約」といいます。）は、株式会社Next Earthが提供する各種サービスのご利用条件を定めるものです。利用者の皆さまには、本規約に従って本サービスをご利用いただきます。
              </p>

              <div className="space-y-12">
                {sections.map((section, index) => (
                  <div key={index}>
                    <h2 className="text-lg md:text-xl font-bold text-gray-700 tracking-wide mb-4 flex items-center gap-3">
                      <span
                        className="inline-block w-8 h-px"
                        style={{
                          background:
                            'linear-gradient(90deg, #f0a3b9 0%, #a8c5dd 100%)',
                        }}
                      />
                      {section.title}
                    </h2>
                    <div className="space-y-4 pl-0 md:pl-11">
                      {section.body.map((paragraph, i) => (
                        <p key={i} className="text-gray-600 leading-loose text-sm md:text-base">
                          {paragraph}
                        </p>
                      ))}
                      {section.list && (
                        <ul className="space-y-2 mt-2">
                          {section.list.map((item, i) => (
                            <li
                              key={i}
                              className="flex gap-3 text-gray-600 leading-relaxed text-sm md:text-base"
                            >
                              <span
                                className="mt-2 inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
                                style={{
                                  background:
                                    'linear-gradient(90deg, #f0a3b9 0%, #a8c5dd 100%)',
                                }}
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-16 pt-10 border-t border-gray-100 text-right text-xs md:text-sm text-gray-400">
                制定日：2023年9月12日
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

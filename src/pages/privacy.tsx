import Head from 'next/head';
import { useEffect, useState } from 'react';
import PageHero from '@/components/PageHero';

const sections = [
  {
    title: '第1条（個人情報の定義）',
    body: [
      '本プライバシーポリシーにおいて「個人情報」とは、個人情報の保護に関する法律に定める個人情報を指し、生存する個人に関する情報であって、当該情報に含まれる氏名、住所、電話番号、メールアドレスその他の記述等により特定の個人を識別できる情報、および個人識別符号が含まれる情報をいいます。',
    ],
  },
  {
    title: '第2条（個人情報の収集方法）',
    body: [
      '当社は、お客様からのお問い合わせ、求人へのご応募、サービスのお申し込みの際に、氏名、住所、電話番号、メールアドレス、その他必要な情報をお預かりすることがあります。',
      'また、お客様と提携先等との間でなされたお取引に関する情報を、当社の提携先などから収集することがあります。',
    ],
  },
  {
    title: '第3条（個人情報を利用する目的）',
    body: ['当社が個人情報を収集・利用する目的は、以下のとおりです。'],
    list: [
      'お客様からのお問い合わせに対応するため',
      '不用品回収・買取・リサイクル等の各種サービスのご提供および運営のため',
      'お見積りのご提示、ご契約内容のご連絡、アフターサービスのため',
      '求人へのご応募に対する採用選考および採用業務のため',
      'お客様に有益と思われる情報・サービスをご案内するため',
      '利用規約に違反する行為への対応のため',
      '上記の利用目的に付随する目的のため',
    ],
  },
  {
    title: '第4条（個人情報の第三者提供）',
    body: [
      '当社は、次に掲げる場合を除き、あらかじめお客様の同意を得ることなく、第三者に個人情報を提供することはありません。',
    ],
    list: [
      '法令に基づく場合',
      '人の生命、身体または財産の保護のために必要があり、お客様の同意を得ることが困難である場合',
      '公衆衛生の向上または児童の健全な育成の推進のために特に必要があり、お客様の同意を得ることが困難である場合',
      '国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合',
    ],
  },
  {
    title: '第5条（個人情報の安全管理）',
    body: [
      '当社は、お預かりした個人情報の漏えい、滅失またはき損の防止その他の個人情報の安全管理のために、必要かつ適切な措置を講じます。個人情報を取り扱う従業者や委託先に対して、必要かつ適切な監督を行います。',
    ],
  },
  {
    title: '第6条（個人情報の開示・訂正・削除）',
    body: [
      'お客様は、当社の保有するご自身の個人情報について、開示、訂正、追加、削除、利用停止を求めることができます。ご請求の際は、本人確認をさせていただいたうえで、合理的な期間内に対応いたします。お手続きをご希望の場合は、本ポリシー末尾のお問い合わせ窓口までご連絡ください。',
    ],
  },
  {
    title: '第7条（Cookie・アクセス解析）',
    body: [
      '当社のウェブサイトでは、サービス向上やアクセス状況の把握のために、Cookieおよびアクセス解析ツールを利用する場合があります。これらにより収集される情報には、個人を特定する情報は含まれません。ブラウザの設定によりCookieを無効にすることが可能ですが、その場合一部のサービスがご利用いただけないことがあります。',
    ],
  },
  {
    title: '第8条（プライバシーポリシーの変更）',
    body: [
      '本ポリシーの内容は、法令その他本ポリシーに別段の定めのある事項を除いて、お客様に通知することなく変更することができるものとします。当社が別途定める場合を除き、変更後のプライバシーポリシーは、本ウェブサイトに掲載したときから効力を生じるものとします。',
    ],
  },
];

export default function Privacy() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <Head>
        <title>プライバシーポリシー - Next Earth</title>
        <meta
          name="description"
          content="株式会社NextEarthのプライバシーポリシー。個人情報の取り扱いについてご説明します。"
        />
      </Head>

      <div className="min-h-screen bg-white">
        <PageHero
          titleJp="プライバシーポリシー"
          titleEn="Privacy Policy"
          description="お客様の個人情報を適切に保護することは、私たちの社会的責務であると考えています。"
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
                株式会社NextEarth（以下「当社」といいます。）は、お客様の個人情報の重要性を認識し、その適切な取り扱いと保護に努めます。当社は、個人情報の保護に関する法律その他の関係法令を遵守し、以下のとおりプライバシーポリシーを定めます。
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

              {/* お問い合わせ窓口 */}
              <div className="mt-16 pt-10 border-t border-gray-100">
                <h2 className="text-lg md:text-xl font-bold text-gray-700 tracking-wide mb-4 flex items-center gap-3">
                  <span
                    className="inline-block w-8 h-px"
                    style={{
                      background:
                        'linear-gradient(90deg, #f0a3b9 0%, #a8c5dd 100%)',
                    }}
                  />
                  お問い合わせ窓口
                </h2>
                <div className="pl-0 md:pl-11 text-gray-600 leading-loose text-sm md:text-base">
                  <p className="mb-4">
                    本ポリシーに関するお問い合わせ、個人情報の開示等のご請求は、下記までご連絡ください。
                  </p>
                  <p>株式会社NextEarth</p>
                  <p>〒350-0204　埼玉県坂戸市大字紺屋866番地1</p>
                  <p>TEL：080-7685-6774</p>
                  <p>Email：info@biz-nextearth.com</p>
                </div>
              </div>

              <p className="mt-12 text-right text-xs md:text-sm text-gray-400">
                制定日：2023年9月12日
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

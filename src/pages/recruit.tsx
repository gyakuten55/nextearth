import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import PageHero from '@/components/PageHero';
import SectionHeading from '@/components/SectionHeading';

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

const HAIRLINE = 'linear-gradient(90deg, #f0a3b9 0%, #a8c5dd 100%)';

// 仕事の魅力
const HIGHLIGHTS = [
  { label: '選べる時間帯', body: '日勤から夜勤まで、全6パターンから選べます。' },
  { label: '選べる働き方', body: '正社員、または出来高制の業務委託を選択できます。' },
  { label: '高単価', body: '業務委託なら日割り歩合で、日給換算3万円も可能です。' },
  { label: '免許取得支援', body: '準中型へのキャリアアップも、会社が応援します。' },
];

// 仕事内容（具体的には）
const TASKS = [
  { title: 'リサイクル・不用品回収', body: '家具、家電、什器などの運び出し・運搬' },
  { title: '配送業務', body: '軽貨物から中型まで、案件に応じた配送' },
  { title: '日常清掃', body: '契約先施設でのゴミ回収や清掃作業' },
];

// ここに注目
const APPEALS = [
  '未経験者歓迎。学歴・職歴は不問です。',
  '準中型免許をお持ちでない方も、入社後の取得を支援します。',
];

// 月収例
const SALARY_EXAMPLES = [
  { label: '標準的な働き方', formula: '日割り歩合 16,000円 × 24日', total: '384,000' },
  { label: 'ガッツリ稼ぐ働き方', formula: '日割り歩合 19,000円 × 24日', total: '456,000' },
];

// 選考の流れ
const STEPS = [
  { no: '01', title: 'エントリー', body: 'ページ下部のボタンからご応募ください。' },
  { no: '02', title: '面接（1回）', body: 'ご希望や働き方をヒアリングします。' },
  { no: '03', title: '内定', body: 'スピード選考で、早期のご入社も可能です。' },
];

function Fade({
  show,
  delay = '',
  children,
}: {
  show: boolean;
  delay?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`transition-all duration-1000 ${delay} ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      {children}
    </div>
  );
}

export default function Recruit() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <Head>
        <title>求人・採用 - Next Earth</title>
        <meta
          name="description"
          content="株式会社NextEarthの求人・採用情報。リサイクル・不用品回収、配送、日常清掃のお仕事。日勤〜夜勤まで全6パターン、正社員 or 業務委託の選択制。免許取得支援あり。"
        />
      </Head>

      <div className="min-h-screen bg-white">
        <PageHero
          titleJp="求人・採用"
          titleEn="Recruit"
          description="地球の未来をともに描く、新しい仲間を募集しています。"
        />

        {/* 01 仕事の魅力 */}
        <section className="py-24 md:py-32 bg-white">
          <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">
            <Fade show={isVisible} delay="delay-200">
              <SectionHeading number="01" eyebrow="Highlights" title="仕事の魅力" />

              <div className="grid grid-cols-12 gap-6 md:gap-10">
                <div className="col-span-12 md:col-span-3">
                  <p className="text-xs font-semibold tracking-[0.3em] text-gray-500 uppercase">
                    Why Us
                  </p>
                </div>
                <div className="col-span-12 md:col-span-9">
                  <div className="grid sm:grid-cols-2 gap-x-10 gap-y-12">
                    {HIGHLIGHTS.map((item) => (
                      <div key={item.label}>
                        <div className="h-px w-10 mb-5" style={{ background: HAIRLINE }} />
                        <p className="text-lg font-bold tracking-wide mb-3" style={GRADIENT_TEXT}>
                          {item.label}
                        </p>
                        <p className="text-gray-600 leading-loose">{item.body}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Fade>
          </div>
        </section>

        {/* 02 仕事内容 */}
        <section className="py-24 md:py-32 bg-white border-t border-gray-100">
          <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">
            <Fade show={isVisible} delay="delay-300">
              <SectionHeading number="02" eyebrow="Job Description" title="仕事内容" />

              <div className="grid grid-cols-12 gap-6 md:gap-10">
                <div className="col-span-12 md:col-span-3">
                  <p className="text-xs font-semibold tracking-[0.3em] text-gray-500 uppercase">
                    Overview
                  </p>
                </div>
                <div className="col-span-12 md:col-span-9 space-y-10">
                  <p className="text-gray-600 leading-loose">
                    リサイクル物や不用品の回収、配送業務、および日常清掃をお任せします。
                    適性や希望を考慮し、
                    <span className="text-gray-700 font-medium">「倉庫内での管理業務」</span>
                    または
                    <span className="text-gray-700 font-medium">「現場での回収・配送業務」</span>
                    のいずれかを担当していただきます。
                  </p>

                  <p className="text-gray-600 leading-loose">
                    <span className="text-xs font-semibold tracking-[0.2em] text-gray-500 uppercase mr-3">
                      Area
                    </span>
                    対応エリア：
                    <span className="text-gray-700 font-medium">東京都・埼玉県内</span>
                  </p>

                  <div>
                    <p className="text-sm font-semibold text-gray-700 tracking-wide mb-4">
                      具体的には
                    </p>
                    <ul className="divide-y divide-gray-100 border-t border-b border-gray-100">
                      {TASKS.map((task) => (
                        <li key={task.title} className="flex gap-4 py-4">
                          <span
                            className="inline-block w-6 h-px flex-shrink-0 mt-3"
                            style={{ background: HAIRLINE }}
                          />
                          <span className="text-gray-600 leading-relaxed">
                            <span className="text-gray-700 font-medium">{task.title}</span>
                            <br />
                            {task.body}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 稼ぎたい分だけ */}
                  <div className="pt-2">
                    <div
                      className="h-px w-full mb-10"
                      style={{
                        background:
                          'linear-gradient(90deg, transparent 0%, #f0a3b9 20%, #c8b3d2 50%, #a8c5dd 80%, transparent 100%)',
                        opacity: 0.45,
                      }}
                    />
                    <p className="text-xl md:text-2xl font-bold text-gray-700 leading-snug tracking-wide mb-4">
                      稼ぎたい分だけ、
                      <span style={GRADIENT_TEXT}>案件を上乗せ</span>。
                    </p>
                    <p className="text-gray-600 leading-loose">
                      メインの配送・回収業務に「清掃」や「スポット回収」を組み合わせることで、
                      1日の報酬を最大化できます。仕事は豊富にありますので、稼ぎたい方にはどんどんお任せします。
                    </p>
                  </div>
                </div>
              </div>
            </Fade>
          </div>
        </section>

        {/* 03 応募資格 */}
        <section className="py-24 md:py-32 bg-white border-t border-gray-100">
          <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">
            <Fade show={isVisible} delay="delay-500">
              <SectionHeading number="03" eyebrow="Requirements" title="応募資格" />

              <div className="grid grid-cols-12 gap-6 md:gap-10">
                <div className="col-span-12 md:col-span-3">
                  <p className="text-xs font-semibold tracking-[0.3em] text-gray-500 uppercase">
                    Qualifications
                  </p>
                </div>
                <div className="col-span-12 md:col-span-9 space-y-10">
                  <div className="grid sm:grid-cols-2 gap-x-10 gap-y-10">
                    <div>
                      <p className="text-[11px] font-semibold tracking-[0.3em] text-gray-400 uppercase mb-3">
                        Must
                      </p>
                      <p className="text-gray-700 font-medium leading-relaxed">
                        普通自動車運転免許（AT限定可）
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold tracking-[0.3em] text-gray-400 uppercase mb-3">
                        Welcome
                      </p>
                      <p className="text-gray-700 font-medium leading-relaxed">
                        準中型自動車免許 保持者
                      </p>
                      <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                        担当できる業務の幅が広がるため、さらに単価が上がりやすくなります。
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-700 tracking-wide mb-4">
                      ここに注目
                    </p>
                    <ul className="divide-y divide-gray-100 border-t border-b border-gray-100">
                      {APPEALS.map((appeal) => (
                        <li key={appeal} className="flex items-center gap-4 py-4">
                          <span
                            className="inline-block w-6 h-px flex-shrink-0"
                            style={{ background: HAIRLINE }}
                          />
                          <span className="text-gray-600 leading-relaxed">{appeal}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Fade>
          </div>
        </section>

        {/* 04 給与 */}
        <section className="py-24 md:py-32 bg-white border-t border-gray-100">
          <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">
            <Fade show={isVisible} delay="delay-700">
              <SectionHeading number="04" eyebrow="Salary" title="給与" />

              <div className="grid grid-cols-12 gap-6 md:gap-10">
                <div className="col-span-12 md:col-span-3">
                  <p className="text-xs font-semibold tracking-[0.3em] text-gray-500 uppercase">
                    Payment
                  </p>
                </div>
                <div className="col-span-12 md:col-span-9 space-y-12">
                  <div className="grid sm:grid-cols-2 gap-x-10 gap-y-10">
                    {/* 正社員 */}
                    <div>
                      <p className="text-[11px] font-semibold tracking-[0.3em] text-gray-400 uppercase mb-4">
                        Full-time / 正社員
                      </p>
                      <p className="leading-none">
                        <span className="text-sm text-gray-500 mr-2">月給</span>
                        <span className="text-4xl font-bold" style={GRADIENT_TEXT}>
                          300,000
                        </span>
                        <span className="text-sm text-gray-500 ml-1">円〜</span>
                      </p>
                      <p className="mt-4 text-sm text-gray-500 leading-relaxed">
                        試用期間中：日給 10,000円／終了後：日給 12,000円（× 25日の場合）
                      </p>
                    </div>

                    {/* 業務委託 */}
                    <div>
                      <p className="text-[11px] font-semibold tracking-[0.3em] text-gray-400 uppercase mb-4">
                        Contractor / 業務委託
                      </p>
                      <p className="leading-none">
                        <span className="text-sm text-gray-500 mr-2">日割り歩合給</span>
                        <span className="text-4xl font-bold" style={GRADIENT_TEXT}>
                          12,000
                        </span>
                        <span className="text-lg text-gray-400 mx-1">〜</span>
                        <span className="text-4xl font-bold" style={GRADIENT_TEXT}>
                          30,000
                        </span>
                        <span className="text-sm text-gray-500 ml-1">円</span>
                      </p>
                      <p className="mt-4 text-sm text-gray-500 leading-relaxed">
                        「回収件数」や「案件の単価」に応じて、日々の報酬が決まります。
                      </p>
                    </div>
                  </div>

                  {/* 月収例 */}
                  <div>
                    <p className="text-sm font-semibold text-gray-700 tracking-wide mb-2">
                      月収例（業務委託・月24日稼働の場合）
                    </p>
                    <div className="grid sm:grid-cols-2 gap-x-10 border-t border-gray-100">
                      {SALARY_EXAMPLES.map((ex) => (
                        <div key={ex.label} className="py-7 border-b border-gray-100">
                          <p className="text-xs text-gray-500 tracking-wide mb-2">{ex.label}</p>
                          <p className="text-sm text-gray-600 mb-3">{ex.formula}</p>
                          <p className="leading-none">
                            <span className="text-3xl md:text-4xl font-bold" style={GRADIENT_TEXT}>
                              {ex.total}
                            </span>
                            <span className="text-sm text-gray-500 ml-1">円</span>
                          </p>
                        </div>
                      ))}
                    </div>
                    <p className="mt-5 text-xs text-gray-400 leading-relaxed">
                      ※さらに高単価案件を組み合わせることで、日給換算3万円を目指すことも可能です。
                    </p>
                  </div>
                </div>
              </div>
            </Fade>
          </div>
        </section>

        {/* 05 募集要項 */}
        <section className="py-24 md:py-32 bg-white border-t border-gray-100">
          <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">
            <Fade show={isVisible} delay="delay-700">
              <SectionHeading number="05" eyebrow="Details" title="募集要項" />

              <dl>
                {/* 勤務時間 */}
                <div className="grid grid-cols-12 gap-4 md:gap-10 py-7 border-t border-b border-gray-100">
                  <dt className="col-span-12 md:col-span-3 text-sm font-semibold text-gray-700 tracking-wide">
                    勤務時間
                  </dt>
                  <dd className="col-span-12 md:col-span-9 text-gray-600 leading-relaxed">
                    <p className="mb-4">
                      ライフスタイルに合わせて、以下の時間帯から選べます。
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-2.5">
                      {[
                        '08:00 〜 17:00',
                        '09:00 〜 18:00',
                        '10:00 〜 19:00',
                        '11:00 〜 20:00',
                        '12:00 〜 21:00',
                        '24:00 〜 09:00（夜勤帯・現場着）',
                      ].map((h) => (
                        <div key={h} className="flex items-center gap-3">
                          <span
                            className="inline-block w-4 h-px flex-shrink-0"
                            style={{ background: HAIRLINE }}
                          />
                          <span className="text-gray-700 font-medium text-sm md:text-base">{h}</span>
                        </div>
                      ))}
                    </div>
                    <p className="mt-5 text-sm text-gray-500 leading-relaxed">
                      実働8時間／休憩1時間。「夜型なので深夜から働きたい」といったご希望も歓迎です。
                    </p>
                  </dd>
                </div>

                {/* 勤務形態 */}
                <div className="grid grid-cols-12 gap-4 md:gap-10 py-7 border-b border-gray-100">
                  <dt className="col-span-12 md:col-span-3 text-sm font-semibold text-gray-700 tracking-wide">
                    勤務形態
                  </dt>
                  <dd className="col-span-12 md:col-span-9 text-gray-600 leading-relaxed">
                    正社員 または 業務委託（選択制）
                  </dd>
                </div>

                {/* 休日休暇 */}
                <div className="grid grid-cols-12 gap-4 md:gap-10 py-7 border-b border-gray-100">
                  <dt className="col-span-12 md:col-span-3 text-sm font-semibold text-gray-700 tracking-wide">
                    休日休暇
                  </dt>
                  <dd className="col-span-12 md:col-span-9 text-gray-600 leading-relaxed">
                    <p>シフト制（希望休申請あり）</p>
                    <p className="mt-2 text-sm text-gray-500">
                      月4〜6日（休みたい日を優先して調整します）。曜日の固定や連休のご相談も柔軟に対応可能です。
                    </p>
                  </dd>
                </div>

                {/* 福利厚生・待遇 */}
                <div className="grid grid-cols-12 gap-4 md:gap-10 py-7 border-b border-gray-100">
                  <dt className="col-span-12 md:col-span-3 text-sm font-semibold text-gray-700 tracking-wide">
                    福利厚生・待遇
                  </dt>
                  <dd className="col-span-12 md:col-span-9 text-gray-600 leading-relaxed">
                    <ul className="space-y-2.5">
                      <li>
                        <span className="text-gray-700 font-medium">免許アップデート補助制度</span>
                        <span className="block text-sm text-gray-500 mt-1">
                          試用期間（1〜2ヶ月）終了後、準中型免許などの取得に必要な経費は会社が全額負担します。
                        </span>
                      </li>
                      <li>車・バイク通勤OK</li>
                      <li>副業OK</li>
                      <li>正社員登用あり</li>
                    </ul>
                  </dd>
                </div>
              </dl>
            </Fade>
          </div>
        </section>

        {/* 06 選考の流れ */}
        <section className="py-24 md:py-32 bg-white border-t border-gray-100">
          <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">
            <Fade show={isVisible} delay="delay-700">
              <SectionHeading number="06" eyebrow="Flow" title="選考の流れ" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
                {STEPS.map((step) => (
                  <div key={step.no}>
                    <div className="flex items-center gap-4 mb-5">
                      <span
                        className="text-4xl md:text-5xl font-bold leading-none"
                        style={GRADIENT_NUMBER}
                      >
                        {step.no}
                      </span>
                      <span
                        className="h-px flex-1"
                        style={{ background: HAIRLINE, opacity: 0.6 }}
                      />
                    </div>
                    <p className="text-[11px] font-semibold tracking-[0.3em] text-gray-400 uppercase mb-2">
                      Step {step.no}
                    </p>
                    <h3 className="text-xl font-bold text-gray-700 tracking-wide mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-loose text-sm">{step.body}</p>
                  </div>
                ))}
              </div>
            </Fade>
          </div>
        </section>

        {/* 07 応募について（CTA） */}
        <section className="py-24 md:py-32 bg-white border-t border-gray-100">
          <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">
            <Fade show={isVisible} delay="delay-700">
              <div className="grid grid-cols-12 gap-6 md:gap-10">
                <div className="col-span-12 md:col-span-3">
                  <p className="text-xs font-semibold tracking-[0.3em] text-gray-500 uppercase">
                    Apply
                  </p>
                </div>
                <div className="col-span-12 md:col-span-9 space-y-8">
                  <p className="text-2xl md:text-3xl font-bold leading-snug tracking-wide text-gray-700">
                    まずは、
                    <span style={GRADIENT_TEXT}>ご相談だけ</span>
                    でも大歓迎です。
                  </p>
                  <p className="text-gray-600 leading-loose">
                    「どのくらい稼ぎたいか」「どの時間帯がいいか」といったご相談から、お気軽にどうぞ。
                    お問い合わせフォームよりご連絡ください。
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center px-8 py-3.5 text-white font-medium rounded-full shadow-md hover:shadow-lg transition-shadow duration-200"
                      style={{ background: BUTTON_GRADIENT }}
                    >
                      応募する
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
            </Fade>
          </div>
        </section>
      </div>
    </>
  );
}

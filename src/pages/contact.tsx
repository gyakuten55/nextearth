import Head from 'next/head';
import { useEffect, useState, ChangeEvent } from 'react';
import Link from 'next/link';
import PageHero from '@/components/PageHero';

type FormType = 'inquiry' | 'recruitment';

interface InquiryFormData {
  name: string;
  email: string;
  phone: string;
  inquiryType: string;
  message: string;
  privacyConsent: boolean;
}

interface RecruitmentFormData {
  name: string;
  email: string;
  phone: string;
  position: string;
  resume: File | null;
  photo: File | null;
  message: string;
  privacyConsent: boolean;
}

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

const INPUT_CLASS =
  'w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-400 transition-all duration-200';

const SELECT_CLASS = `${INPUT_CLASS} appearance-none cursor-pointer`;

interface SectionHeadingProps {
  number: string;
  eyebrow: string;
  title: string;
}

function SectionHeading({ number, eyebrow, title }: SectionHeadingProps) {
  return (
    <div className="mb-12 md:mb-16 flex items-center gap-5">
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

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<FormType>('inquiry');

  const [inquiryForm, setInquiryForm] = useState<InquiryFormData>({
    name: '',
    email: '',
    phone: '',
    inquiryType: '',
    message: '',
    privacyConsent: false,
  });

  const [recruitmentForm, setRecruitmentForm] = useState<RecruitmentFormData>({
    name: '',
    email: '',
    phone: '',
    position: '',
    resume: null,
    photo: null,
    message: '',
    privacyConsent: false,
  });

  const [resumePreview, setResumePreview] = useState<string>('');
  const [photoPreview, setPhotoPreview] = useState<string>('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // File を base64（データ部分のみ）に変換
  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(',')[1] || '');
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleInquiryChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    setInquiryForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleRecruitmentChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    setRecruitmentForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, fileType: 'resume' | 'photo') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('ファイルサイズは5MB以下にしてください');
      return;
    }

    setRecruitmentForm(prev => ({
      ...prev,
      [fileType]: file,
    }));

    const reader = new FileReader();
    reader.onloadend = () => {
      if (fileType === 'resume') {
        setResumePreview(file.name);
      } else {
        setPhotoPreview(reader.result as string);
      }
    };

    if (fileType === 'photo' && file.type.startsWith('image/')) {
      reader.readAsDataURL(file);
    } else {
      setResumePreview(file.name);
    }
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitResult(null);

    if (!inquiryForm.name || !inquiryForm.email || !inquiryForm.inquiryType || !inquiryForm.message) {
      setSubmitResult({ type: 'error', message: '必須項目を入力してください。' });
      return;
    }

    if (!inquiryForm.privacyConsent) {
      setSubmitResult({ type: 'error', message: 'プライバシーポリシーに同意してください。' });
      return;
    }

    if (!emailRegex.test(inquiryForm.email)) {
      setSubmitResult({ type: 'error', message: '正しいメールアドレスを入力してください。' });
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'inquiry',
          name: inquiryForm.name,
          email: inquiryForm.email,
          phone: inquiryForm.phone,
          inquiryType: inquiryForm.inquiryType,
          message: inquiryForm.message,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || '送信に失敗しました。');
      }
      setSubmitResult({
        type: 'success',
        message: 'お問い合わせを送信しました。担当者よりご連絡いたします。',
      });
      setInquiryForm({
        name: '',
        email: '',
        phone: '',
        inquiryType: '',
        message: '',
        privacyConsent: false,
      });
    } catch (err) {
      setSubmitResult({
        type: 'error',
        message:
          err instanceof Error
            ? err.message
            : '送信に失敗しました。時間をおいて再度お試しください。',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRecruitmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitResult(null);

    if (
      !recruitmentForm.name ||
      !recruitmentForm.email ||
      !recruitmentForm.phone ||
      !recruitmentForm.position
    ) {
      setSubmitResult({ type: 'error', message: '必須項目を入力してください。' });
      return;
    }

    if (!recruitmentForm.privacyConsent) {
      setSubmitResult({ type: 'error', message: 'プライバシーポリシーに同意してください。' });
      return;
    }

    if (!emailRegex.test(recruitmentForm.email)) {
      setSubmitResult({ type: 'error', message: '正しいメールアドレスを入力してください。' });
      return;
    }

    setIsSubmitting(true);
    try {
      const attachments: { filename: string; content: string }[] = [];
      if (recruitmentForm.resume) {
        attachments.push({
          filename: recruitmentForm.resume.name,
          content: await fileToBase64(recruitmentForm.resume),
        });
      }
      if (recruitmentForm.photo) {
        attachments.push({
          filename: recruitmentForm.photo.name,
          content: await fileToBase64(recruitmentForm.photo),
        });
      }

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'recruitment',
          name: recruitmentForm.name,
          email: recruitmentForm.email,
          phone: recruitmentForm.phone,
          position: recruitmentForm.position,
          message: recruitmentForm.message,
          attachments,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || '送信に失敗しました。');
      }
      setSubmitResult({
        type: 'success',
        message: 'ご応募ありがとうございます。担当者よりご連絡いたします。',
      });
      setRecruitmentForm({
        name: '',
        email: '',
        phone: '',
        position: '',
        resume: null,
        photo: null,
        message: '',
        privacyConsent: false,
      });
      setResumePreview('');
      setPhotoPreview('');
    } catch (err) {
      setSubmitResult({
        type: 'error',
        message:
          err instanceof Error
            ? err.message
            : '送信に失敗しました。時間をおいて再度お試しください。',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inquiryTypes = [
    { value: '', label: '選択してください' },
    { value: 'general', label: '一般お問い合わせ' },
    { value: 'service', label: 'サービスについて' },
    { value: 'quote', label: 'お見積もり依頼' },
    { value: 'other', label: 'その他' },
  ];

  const positions = [
    { value: '', label: '選択してください' },
    { value: 'driver', label: 'ドライバー' },
    { value: 'sorter', label: '仕分け作業員' },
    { value: 'office', label: '事務スタッフ' },
    { value: 'sales', label: '営業' },
    { value: 'other', label: 'その他' },
  ];

  const required = <span style={{ color: '#e692a8', marginLeft: 4 }}>*</span>;

  const labelClass = 'block text-sm font-semibold text-gray-700 mb-2';

  return (
    <>
      <Head>
        <title>お問い合わせ - Next Earth</title>
        <meta
          name="description"
          content="株式会社NextEarthへのお問い合わせ・求人応募はこちらから。お気軽にご連絡ください。"
        />
      </Head>

      <div className="min-h-screen bg-white">
        <PageHero
          titleJp="お問い合わせ"
          titleEn="Contact Us"
          description="お気軽にお問い合わせください。求人応募も受け付けております。"
        />

        {/* 01 Form */}
        <section className="py-24 md:py-32 bg-white">
          <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-16">
            <div
              className={`transition-all duration-1000 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <SectionHeading number="01" eyebrow="Form" title="お問い合わせフォーム" />

              {/* タブ（下線型） */}
              <div className="border-b border-gray-200 mb-10">
                <div className="flex gap-8 md:gap-12">
                  {(
                    [
                      { id: 'inquiry', label: '一般お問い合わせ' },
                      { id: 'recruitment', label: '求人応募' },
                    ] as { id: FormType; label: string }[]
                  ).map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setSubmitResult(null);
                      }}
                      className={`relative pb-4 text-sm md:text-base font-medium tracking-wide transition-colors duration-200 ${
                        activeTab === tab.id ? 'text-gray-700' : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      {tab.label}
                      {activeTab === tab.id && (
                        <span
                          className="absolute -bottom-px left-0 right-0 h-px"
                          style={{
                            background:
                              'linear-gradient(90deg, #f0a3b9 0%, #c8b3d2 50%, #a8c5dd 100%)',
                          }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <p className="text-xs text-gray-400 mb-8">
                <span style={{ color: '#e692a8' }}>*</span> は必須項目です。
              </p>

              {/* 一般お問い合わせフォーム */}
              {activeTab === 'inquiry' && (
                <form onSubmit={handleInquirySubmit} className="space-y-6">
                  <div>
                    <label htmlFor="inquiry-name" className={labelClass}>
                      お名前{required}
                    </label>
                    <input
                      type="text"
                      id="inquiry-name"
                      name="name"
                      value={inquiryForm.name}
                      onChange={handleInquiryChange}
                      required
                      className={INPUT_CLASS}
                      placeholder="山田 太郎"
                    />
                  </div>

                  <div>
                    <label htmlFor="inquiry-email" className={labelClass}>
                      メールアドレス{required}
                    </label>
                    <input
                      type="email"
                      id="inquiry-email"
                      name="email"
                      value={inquiryForm.email}
                      onChange={handleInquiryChange}
                      required
                      className={INPUT_CLASS}
                      placeholder="example@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="inquiry-phone" className={labelClass}>
                      電話番号
                    </label>
                    <input
                      type="tel"
                      id="inquiry-phone"
                      name="phone"
                      value={inquiryForm.phone}
                      onChange={handleInquiryChange}
                      className={INPUT_CLASS}
                      placeholder="090-1234-5678"
                    />
                  </div>

                  <div>
                    <label htmlFor="inquiry-type" className={labelClass}>
                      お問い合わせ種類{required}
                    </label>
                    <select
                      id="inquiry-type"
                      name="inquiryType"
                      value={inquiryForm.inquiryType}
                      onChange={handleInquiryChange}
                      required
                      className={SELECT_CLASS}
                    >
                      {inquiryTypes.map(type => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="inquiry-message" className={labelClass}>
                      お問い合わせ内容{required}
                    </label>
                    <textarea
                      id="inquiry-message"
                      name="message"
                      value={inquiryForm.message}
                      onChange={handleInquiryChange}
                      required
                      rows={6}
                      className={`${INPUT_CLASS} resize-none`}
                      placeholder="お問い合わせ内容をご記入ください"
                    />
                  </div>

                  <div className="flex items-start gap-3 pt-2">
                    <input
                      type="checkbox"
                      id="inquiry-privacy"
                      name="privacyConsent"
                      checked={inquiryForm.privacyConsent}
                      onChange={handleInquiryChange}
                      required
                      className="mt-1 w-4 h-4 accent-gray-700"
                    />
                    <label htmlFor="inquiry-privacy" className="text-sm text-gray-600 leading-relaxed">
                      <Link href="/privacy" className="underline hover:opacity-80 transition-opacity" style={GRADIENT_TEXT}>
                        プライバシーポリシー
                      </Link>
                      に同意します{required}
                    </label>
                  </div>

                  {submitResult && (
                    <div
                      className={`rounded-lg px-4 py-3 text-sm ${
                        submitResult.type === 'success'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                          : 'bg-rose-50 text-rose-600 border border-rose-100'
                      }`}
                    >
                      {submitResult.message}
                    </div>
                  )}

                  <div className="pt-6">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center px-10 py-4 text-white font-medium rounded-full shadow-md hover:shadow-lg transition-shadow duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                      style={{ background: BUTTON_GRADIENT }}
                    >
                      {isSubmitting ? '送信中...' : '送信する'}
                      {!isSubmitting && (
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </form>
              )}

              {/* 求人応募フォーム */}
              {activeTab === 'recruitment' && (
                <form onSubmit={handleRecruitmentSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="recruitment-name" className={labelClass}>
                      お名前{required}
                    </label>
                    <input
                      type="text"
                      id="recruitment-name"
                      name="name"
                      value={recruitmentForm.name}
                      onChange={handleRecruitmentChange}
                      required
                      className={INPUT_CLASS}
                      placeholder="山田 太郎"
                    />
                  </div>

                  <div>
                    <label htmlFor="recruitment-email" className={labelClass}>
                      メールアドレス{required}
                    </label>
                    <input
                      type="email"
                      id="recruitment-email"
                      name="email"
                      value={recruitmentForm.email}
                      onChange={handleRecruitmentChange}
                      required
                      className={INPUT_CLASS}
                      placeholder="example@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="recruitment-phone" className={labelClass}>
                      電話番号{required}
                    </label>
                    <input
                      type="tel"
                      id="recruitment-phone"
                      name="phone"
                      value={recruitmentForm.phone}
                      onChange={handleRecruitmentChange}
                      required
                      className={INPUT_CLASS}
                      placeholder="090-1234-5678"
                    />
                  </div>

                  <div>
                    <label htmlFor="recruitment-position" className={labelClass}>
                      応募職種{required}
                    </label>
                    <select
                      id="recruitment-position"
                      name="position"
                      value={recruitmentForm.position}
                      onChange={handleRecruitmentChange}
                      required
                      className={SELECT_CLASS}
                    >
                      {positions.map(pos => (
                        <option key={pos.value} value={pos.value}>
                          {pos.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="recruitment-resume" className={labelClass}>
                      履歴書
                    </label>
                    <input
                      type="file"
                      id="recruitment-resume"
                      name="resume"
                      onChange={e => handleFileChange(e, 'resume')}
                      accept=".pdf,.doc,.docx"
                      className="w-full text-sm text-gray-600 file:mr-4 file:py-2.5 file:px-5 file:rounded-full file:border-0 file:text-xs file:font-semibold file:tracking-wider file:uppercase file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer"
                    />
                    {resumePreview && (
                      <p className="mt-3 text-sm text-gray-500">選択中: {resumePreview}</p>
                    )}
                    <p className="mt-2 text-xs text-gray-400">PDF、Word形式（5MB以下）</p>
                  </div>

                  <div>
                    <label htmlFor="recruitment-photo" className={labelClass}>
                      写真
                    </label>
                    <input
                      type="file"
                      id="recruitment-photo"
                      name="photo"
                      onChange={e => handleFileChange(e, 'photo')}
                      accept="image/*"
                      className="w-full text-sm text-gray-600 file:mr-4 file:py-2.5 file:px-5 file:rounded-full file:border-0 file:text-xs file:font-semibold file:tracking-wider file:uppercase file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer"
                    />
                    {photoPreview && (
                      <div className="mt-4">
                        <img
                          src={photoPreview}
                          alt="プレビュー"
                          className="w-32 h-32 object-cover rounded-lg border border-gray-200"
                        />
                      </div>
                    )}
                    <p className="mt-2 text-xs text-gray-400">JPG、PNG形式（5MB以下）</p>
                  </div>

                  <div>
                    <label htmlFor="recruitment-message" className={labelClass}>
                      自己PR・志望動機
                    </label>
                    <textarea
                      id="recruitment-message"
                      name="message"
                      value={recruitmentForm.message}
                      onChange={handleRecruitmentChange}
                      rows={6}
                      className={`${INPUT_CLASS} resize-none`}
                      placeholder="自己PRや志望動機をご記入ください"
                    />
                  </div>

                  <div className="flex items-start gap-3 pt-2">
                    <input
                      type="checkbox"
                      id="recruitment-privacy"
                      name="privacyConsent"
                      checked={recruitmentForm.privacyConsent}
                      onChange={handleRecruitmentChange}
                      required
                      className="mt-1 w-4 h-4 accent-gray-700"
                    />
                    <label htmlFor="recruitment-privacy" className="text-sm text-gray-600 leading-relaxed">
                      <Link href="/privacy" className="underline hover:opacity-80 transition-opacity" style={GRADIENT_TEXT}>
                        プライバシーポリシー
                      </Link>
                      に同意します{required}
                    </label>
                  </div>

                  {submitResult && (
                    <div
                      className={`rounded-lg px-4 py-3 text-sm ${
                        submitResult.type === 'success'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                          : 'bg-rose-50 text-rose-600 border border-rose-100'
                      }`}
                    >
                      {submitResult.message}
                    </div>
                  )}

                  <div className="pt-6">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center px-10 py-4 text-white font-medium rounded-full shadow-md hover:shadow-lg transition-shadow duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                      style={{ background: BUTTON_GRADIENT }}
                    >
                      {isSubmitting ? '送信中...' : '応募する'}
                      {!isSubmitting && (
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* 02 Notes */}
        <section className="py-24 md:py-32 bg-white border-t border-gray-100">
          <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-16">
            <div
              className={`transition-all duration-1000 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <SectionHeading number="02" eyebrow="Notes" title="ご注意事項" />

              <ul className="divide-y divide-gray-100 border-t border-b border-gray-100">
                {[
                  'いただいたお問い合わせには、原則2営業日以内にご返信いたします。',
                  'お問い合わせ内容によっては、回答までにお時間をいただく場合がございます。',
                  '土日祝日のお問い合わせは、翌営業日以降の対応となります。',
                  '個人情報は、お問い合わせへの回答および当社サービスのご案内にのみ使用いたします。',
                ].map((note, index) => (
                  <li key={index} className="flex items-start gap-4 py-4 text-sm md:text-base">
                    <span
                      className="inline-block w-6 h-px flex-shrink-0 mt-3"
                      style={{
                        background:
                          'linear-gradient(90deg, #f0a3b9 0%, #a8c5dd 100%)',
                      }}
                    />
                    <span className="text-gray-600 leading-loose">{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

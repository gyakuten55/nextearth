import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: 'トップ', href: '/' },
      { label: '事業内容', href: '/services' },
      { label: '会社情報', href: '/company' },
    ],
    services: [
      { label: 'リサイクル輸出業', href: '/services#export' },
      { label: '不用品回収・片付け', href: '/services#collection' },
      { label: 'リサイクル売買・買取', href: '/services#buyback' },
    ],
    contact: [
      { label: '求人・採用', href: '/recruit' },
      { label: 'お問い合わせ', href: '/contact' },
    ],
  };

  return (
    <footer className="relative bg-white text-gray-600 border-t border-gray-100">
      {/* 上部のアクセントライン */}
      <div
        className="h-px w-full"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, #f0a3b9 25%, #c8b3d2 50%, #a8c5dd 75%, transparent 100%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-16">
        {/* メインフッターコンテンツ */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-12 pb-10 border-b border-gray-100">
          {/* ロゴ＆会社情報 */}
          <div className="lg:max-w-xs text-center lg:text-left mx-auto lg:mx-0">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <Image
                src="/logo.png"
                alt="Next Earth"
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
              <span className="text-lg font-medium text-gray-700 tracking-wide">Next Earth</span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">
              リサイクル事業を通じて、
              <br />
              持続可能な社会の実現に貢献します。
            </p>
            <div className="text-sm text-gray-500">
              <p className="mb-1">株式会社 Next Earth</p>
              <a
                href="mailto:info@biz-nextearth.com"
                className="text-sakura-accent hover:text-sakura-deep transition-colors duration-200"
              >
                info@biz-nextearth.com
              </a>
            </div>
          </div>

          {/* ナビゲーションリンク */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-12 max-w-2xl mx-auto lg:mx-0">
            {/* 会社情報 */}
            <div className="text-center sm:text-left">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 tracking-wide">会社情報</h3>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-sakura-accent transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* サービス */}
            <div className="text-center sm:text-left">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 tracking-wide">事業内容</h3>
              <ul className="space-y-2">
                {footerLinks.services.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-sakura-accent transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* お問い合わせ */}
            <div className="text-center sm:text-left col-span-2 sm:col-span-1">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 tracking-wide">お問い合わせ</h3>
              <ul className="space-y-2">
                {footerLinks.contact.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-sakura-accent transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* コピーライト */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">
            &copy; {currentYear} Next Earth. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-xs text-gray-400 hover:text-sakura-accent transition-colors duration-200"
            >
              プライバシーポリシー
            </Link>
            <Link
              href="/terms"
              className="text-xs text-gray-400 hover:text-sakura-accent transition-colors duration-200"
            >
              利用規約
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

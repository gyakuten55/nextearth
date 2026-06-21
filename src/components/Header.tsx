import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navigationItems = [
    { label: '会社情報', href: '/company' },
    { label: '事業内容', href: '/services' },
    { label: 'ブログ', href: '/blog' },
    { label: '採用情報', href: '/recruit' },
    { label: 'お問い合わせ', href: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'shadow-sm' : ''
      }`}
      style={{
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.85)' : 'rgba(255, 255, 255, 0.6)',
        backdropFilter: 'saturate(180%) blur(20px)',
        WebkitBackdropFilter: 'saturate(180%) blur(20px)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="Next Earth"
                width={40}
                height={40}
                priority
                className="h-10 w-10 object-contain"
              />
              <span className="text-xl font-medium text-gray-700 tracking-wide">Next Earth</span>
            </Link>
          </div>

          <nav className="hidden lg:flex items-center space-x-10">
            {navigationItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-2.5 text-sm font-medium text-white rounded-full shadow-sm hover:shadow-md transition-shadow duration-200"
              style={{
                background:
                  'linear-gradient(90deg, #f0a3b9 0%, #e3a8c0 30%, #c8b3d2 55%, #aec3dd 80%, #a8c5dd 100%)',
              }}
            >
              お問い合わせ
            </Link>
          </div>

          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 text-gray-700 hover:text-gray-900 transition-colors duration-200"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">メニュー</span>
              {!isMobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className="lg:hidden bg-white/95 border-b border-gray-100"
          style={{
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          }}
        >
          <div className="max-w-7xl mx-auto px-6 py-6">
            <nav className="space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="flex-1">{item.label}</span>
                  <svg
                    className="w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              ))}
            </nav>
            <div className="mt-6 pt-4 border-t border-gray-100">
              <Link
                href="/contact"
                className="flex items-center justify-center px-4 py-3 text-sm font-semibold text-white rounded-full shadow-sm hover:shadow-md transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  background:
                  'linear-gradient(90deg, #f0a3b9 0%, #e3a8c0 30%, #c8b3d2 55%, #aec3dd 80%, #a8c5dd 100%)',
                }}
              >
                <span>お問い合わせ</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

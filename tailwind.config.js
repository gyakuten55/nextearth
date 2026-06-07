/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // 桜のように淡いピンク（左側のグラデーションカラー）
        sakura: {
          subtle: '#fbf6f8',   // ほぼ白に近い淡いピンク
          light: '#f9e4ea',    // ライトブラッシュピンク
          primary: '#f3c5d1',  // メインピンク（明るめ）
          medium: '#ecaabc',   // メインピンク（標準）
          accent: '#e692a8',   // アクセントピンク
          deep: '#d97a93',     // 濃いめのピンク
        },
        // 透明感のあるスカイブルー（右側のグラデーションカラー）
        sora: {
          subtle: '#f3f7fb',   // ほぼ白に近い淡い水色
          light: '#dde7f1',    // ライトスカイブルー
          primary: '#b8cde0',  // メイン水色（明るめ）
          medium: '#a8c5dd',   // メイン水色（標準）
          accent: '#8eb4d4',   // アクセント水色
          deep: '#6b9ac4',     // 濃いめの水色
        },
        // 中間のラベンダー/ニュートラル
        mist: {
          subtle: '#f6f4f7',
          light: '#ebe6ec',
          medium: '#cbb1ca',
          deep: '#b3c2da',
        },
        // 既存ページ互換のためのエイリアス
        aqua: {
          subtle: '#fbf6f8',
          light: '#f9e4ea',
          primary: '#f3c5d1',
          medium: '#ecaabc',
          accent: '#e692a8',
        },
        earth: {
          blue: '#a8c5dd',
          light: '#f3f7fb',
          ocean: '#6b9ac4',
          clean: '#fdfdfd',
        },
      },
      backgroundImage: {
        // 画像通り：左の桜ピンク → 右のスカイブルー
        'brand-gradient':
          'linear-gradient(90deg, #f0a3b9 0%, #e3a8c0 30%, #c8b3d2 55%, #aec3dd 80%, #a8c5dd 100%)',
      },
      backgroundColor: {
        'white-transparent': 'rgba(255, 255, 255, 0.95)',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
}

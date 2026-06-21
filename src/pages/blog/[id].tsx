import Seo from '@/components/Seo';
import { blogPostingNode } from '@/lib/jsonLd';
import { resolveBlogTitle, resolveBlogDescription, resolveBlogOgImage } from '@/lib/seo';
import { siteConfig } from '@/lib/siteConfig';
import Link from 'next/link';
import Image from 'next/image';
import { GetStaticPaths, GetStaticProps } from 'next';
import sanitizeHtml from 'sanitize-html';
import { client, Blog, BlogListResponse } from '@/lib/microcms';

type Props = {
  blog: Blog;
  sanitizedContent: string;
  seoTitle: string;
  seoDescription: string;
  ogImage: string;
  ogImageWidth: number | null;
  ogImageHeight: number | null;
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}

export default function BlogDetail({
  blog,
  sanitizedContent,
  seoTitle,
  seoDescription,
  ogImage,
  ogImageWidth,
  ogImageHeight,
}: Props) {
  return (
    <>
      <Seo
        title={seoTitle}
        description={seoDescription}
        path={`/blog/${blog.id}`}
        ogType="article"
        ogImage={ogImage}
        ogImageWidth={ogImageWidth}
        ogImageHeight={ogImageHeight}
        primaryImage={ogImage}
        breadcrumb={[
          { name: 'ホーム', path: '/' },
          { name: 'ブログ', path: '/blog' },
          { name: blog.title },
        ]}
        article={{
          publishedTime: blog.publishedAt,
          modifiedTime: blog.revisedAt || blog.updatedAt,
          section: blog.category?.name,
        }}
        jsonLd={[
          blogPostingNode(blog, {
            path: `/blog/${blog.id}`,
            description: seoDescription,
            image: ogImage,
          }),
        ]}
      />

      <style>{`
        .blog-content h1,
        .blog-content h2,
        .blog-content h3,
        .blog-content h4 {
          font-weight: 700;
          color: #374151;
          letter-spacing: 0.04em;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          line-height: 1.4;
        }
        .blog-content h1 { font-size: 1.75rem; }
        .blog-content h2 {
          font-size: 1.35rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #f3e8ee;
        }
        .blog-content h3 { font-size: 1.15rem; }
        .blog-content p {
          color: #6b7280;
          line-height: 2;
          margin-bottom: 1.5rem;
        }
        .blog-content a {
          color: #e692a8;
          text-decoration: none;
        }
        .blog-content a:hover {
          text-decoration: underline;
        }
        .blog-content ul,
        .blog-content ol {
          color: #6b7280;
          line-height: 2;
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
        }
        .blog-content ul { list-style-type: disc; }
        .blog-content ol { list-style-type: decimal; }
        .blog-content li { margin-bottom: 0.25rem; }
        .blog-content img {
          max-width: 100%;
          height: auto;
          border-radius: 1rem;
          margin: 2rem 0;
        }
        .blog-content figure {
          margin: 2rem 0;
        }
        .blog-content figcaption {
          text-align: center;
          color: #9ca3af;
          font-size: 0.8rem;
          margin-top: 0.5rem;
        }
        .blog-content blockquote {
          border-left: 3px solid #e692a8;
          padding: 0.75rem 1.25rem;
          margin: 1.5rem 0;
          background: #fdf6f8;
          border-radius: 0 0.5rem 0.5rem 0;
          color: #6b7280;
        }
        .blog-content strong { color: #374151; font-weight: 700; }
        .blog-content code {
          background: #f3f4f6;
          padding: 0.1em 0.4em;
          border-radius: 0.3rem;
          font-size: 0.85em;
          color: #e692a8;
        }
        .blog-content pre {
          background: #f9fafb;
          border: 1px solid #f3e8ee;
          border-radius: 0.75rem;
          padding: 1.5rem;
          overflow-x: auto;
          margin-bottom: 1.5rem;
        }
        .blog-content table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
        }
        .blog-content th {
          background: #fdf6f8;
          color: #374151;
          font-weight: 600;
          padding: 0.75rem 1rem;
          border: 1px solid #f3e8ee;
          text-align: left;
        }
        .blog-content td {
          padding: 0.75rem 1rem;
          border: 1px solid #f3f4f6;
          color: #6b7280;
        }
        .blog-content tr:nth-child(even) td { background: #fafafa; }
        .blog-content iframe {
          width: 100%;
          aspect-ratio: 16/9;
          border-radius: 0.75rem;
          margin: 1.5rem 0;
        }
      `}</style>

      {/* 記事ヒーロー */}
      <section className="relative overflow-hidden bg-white pt-28 pb-10 md:pt-36 md:pb-12">
        <div
          className="absolute -top-40 -right-32 w-[500px] h-[500px] rounded-full opacity-35 blur-[120px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, #f0a3b9 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-0 -left-40 w-[500px] h-[500px] rounded-full opacity-25 blur-[120px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, #a8c5dd 0%, transparent 70%)' }}
        />
        <div className="relative max-w-3xl mx-auto px-6 sm:px-10 lg:px-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-10" style={{ background: 'linear-gradient(90deg, #f0a3b9 0%, #a8c5dd 100%)' }} />
            <span
              className="text-[11px] font-semibold tracking-[0.4em] uppercase"
              style={{
                background: 'linear-gradient(90deg, #e692a8 0%, #c8b3d2 50%, #8eb4d4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Blog
            </span>
          </div>
          <h1 className="font-bold text-gray-700 leading-snug tracking-wide" style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)' }}>
            {blog.title}
          </h1>
        </div>
      </section>

      <div className="bg-white">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-8 py-4">
          {/* パンくず */}
          <div className="flex items-center gap-2 text-[11px] text-gray-400 tracking-wider">
            <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-gray-600 transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-gray-500 truncate max-w-[180px]">{blog.title}</span>
          </div>
        </div>

        {/* メタ情報 */}
        <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-8 pt-6 pb-10 flex items-center gap-4 flex-wrap">
          {blog.category && (
            <span
              className="inline-block text-[10px] font-semibold tracking-[0.3em] uppercase px-3 py-1 rounded-full"
              style={{
                background: 'linear-gradient(90deg, #fce7ef 0%, #ede8f5 50%, #e6f0f8 100%)',
                color: '#c8a0b8',
              }}
            >
              {blog.category.name}
            </span>
          )}
          <p className="text-[11px] text-gray-400 tracking-widest">
            {formatDate(blog.publishedAt)}
          </p>
        </div>

        {/* アイキャッチ */}
        {blog.eyecatch && (
          <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-8 pb-14">
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-sm">
              <Image
                src={blog.eyecatch.url}
                alt={blog.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}

        {/* 仕切りライン */}
        <div className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-8">
          <div
            className="h-px w-full mb-14"
            style={{
              background: 'linear-gradient(90deg, #f0a3b9 0%, #c8b3d2 50%, #a8c5dd 100%)',
            }}
          />
        </div>

        {/* 本文 */}
        <article className="max-w-3xl mx-auto px-6 sm:px-10 lg:px-8 pb-32 md:pb-40">
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          />

          {/* 戻るボタン */}
          <div className="mt-20 pt-10 border-t border-gray-100">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white rounded-full transition-opacity hover:opacity-80"
              style={{
                background: 'linear-gradient(90deg, #f0a3b9 0%, #c8b3d2 55%, #a8c5dd 100%)',
              }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
              ブログ一覧へ戻る
            </Link>
          </div>
        </article>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data: BlogListResponse = await client.get({
    endpoint: 'blogs',
    queries: { limit: 100, fields: 'id' },
  });

  return {
    paths: data.contents.map((blog) => ({ params: { id: blog.id } })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const blog: Blog = await client.get({
    endpoint: 'blogs',
    contentId: params?.id as string,
  });

  const sanitizedContent = sanitizeHtml(blog.content, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'figure', 'figcaption', 'iframe']),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ['src', 'alt', 'width', 'height', 'loading'],
      iframe: ['src', 'width', 'height', 'allowfullscreen', 'frameborder'],
      '*': ['class', 'style'],
    },
    allowedIframeHostnames: ['www.youtube.com', 'player.vimeo.com'],
  });

  // 記事を書くだけで一意なSEOメタが自動生成される（microCMSのmeta系フィールドがあれば優先）
  const seoTitle = resolveBlogTitle(blog);
  const seoDescription = resolveBlogDescription(blog);
  const ogImage = resolveBlogOgImage(blog);

  // OG画像の実寸（専用OG画像/アイキャッチから取得。寸法不明はnullで省略、画像が無ければ既定OGの1200x630）
  const ogSrc = blog.ogImage ?? blog.eyecatch;
  const ogImageWidth: number | null = ogSrc?.width ?? (ogSrc ? null : siteConfig.defaultOgImageWidth);
  const ogImageHeight: number | null = ogSrc?.height ?? (ogSrc ? null : siteConfig.defaultOgImageHeight);

  return {
    props: { blog, sanitizedContent, seoTitle, seoDescription, ogImage, ogImageWidth, ogImageHeight },
    revalidate: 60,
  };
};

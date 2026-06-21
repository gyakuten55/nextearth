import Seo from '@/components/Seo';
import { itemListNode } from '@/lib/jsonLd';
import Link from 'next/link';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import PageHero from '@/components/PageHero';
import { client, Blog, BlogListResponse } from '@/lib/microcms';

const GRADIENT_TEXT = {
  background: 'linear-gradient(90deg, #e692a8 0%, #c8b3d2 50%, #8eb4d4 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
} as const;

type Props = {
  blogs: Blog[];
  totalCount: number;
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}

export default function BlogIndex({ blogs, totalCount }: Props) {
  return (
    <>
      <Seo
        title="不用品回収・遺品整理の豆知識ブログ｜坂戸市NextEarth"
        description="不用品回収・遺品整理・生前整理・ゴミ屋敷片付け・リサイクルの費用や手順、坂戸市・川越・東松山など埼玉県西部のお役立ち情報をNextEarthが発信します。"
        path="/blog"
        breadcrumb={[{ name: 'ホーム', path: '/' }, { name: 'ブログ' }]}
        jsonLd={
          blogs.length
            ? [itemListNode('/blog', blogs.map((b) => ({ name: b.title, path: `/blog/${b.id}` })))]
            : []
        }
      />

      <PageHero
        titleJp="ブログ"
        titleEn="Blog"
        description="リサイクル・不用品回収・環境に関する最新情報をお届けします。"
      />

      <section className="relative overflow-hidden bg-white py-20 md:py-28">
        {/* 背景ブロブ */}
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-20 blur-[120px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, #f0a3b9 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-15 blur-[120px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, #a8c5dd 0%, transparent 70%)' }}
        />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          {totalCount === 0 ? (
            <div className="text-center py-24">
              <p className="text-gray-400 text-lg">記事はまだありません。</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <Link key={blog.id} href={`/blog/${blog.id}`} className="group block">
                  <article className="h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
                    {/* サムネイル */}
                    <div className="relative w-full aspect-[16/9] bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 overflow-hidden">
                      {blog.eyecatch ? (
                        <Image
                          src={blog.eyecatch.url}
                          alt={blog.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span
                            className="text-4xl font-bold opacity-20"
                            style={GRADIENT_TEXT}
                          >
                            NE
                          </span>
                        </div>
                      )}
                    </div>

                    {/* コンテンツ */}
                    <div className="p-6">
                      {blog.category && (
                        <span
                          className="inline-block text-[10px] font-semibold tracking-[0.3em] uppercase px-3 py-1 rounded-full mb-3"
                          style={{
                            background: 'linear-gradient(90deg, #fce7ef 0%, #ede8f5 50%, #e6f0f8 100%)',
                            color: '#c8a0b8',
                          }}
                        >
                          {blog.category.name}
                        </span>
                      )}
                      <h2 className="text-base font-bold text-gray-700 leading-snug mb-3 group-hover:opacity-70 transition-opacity duration-200 line-clamp-2">
                        {blog.title}
                      </h2>
                      <p className="text-[11px] text-gray-400 tracking-wider">
                        {formatDate(blog.publishedAt)}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const data: BlogListResponse = await client.get({
    endpoint: 'blogs',
    queries: { limit: 100, orders: '-publishedAt' },
  });

  return {
    props: {
      blogs: data.contents,
      totalCount: data.totalCount,
    },
    revalidate: 60,
  };
};

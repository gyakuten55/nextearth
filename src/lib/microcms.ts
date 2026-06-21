import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN!,
  apiKey: process.env.MICROCMS_API_KEY!,
});

export type Blog = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  content: string;
  eyecatch?: { url: string; width: number; height: number };
  category?: { id: string; name: string };
  // SEO拡張フィールド（microCMSに後から追加すれば自動で優先される。未設定なら本文/タイトルからfallback）
  metaTitle?: string;
  metaDescription?: string;
  description?: string;
  ogImage?: { url: string; width?: number; height?: number };
  slug?: string;
};

export type BlogListResponse = {
  contents: Blog[];
  totalCount: number;
  offset: number;
  limit: number;
};

import "server-only";
import postgres from "postgres";
import type { BlogBlock, BlogPost } from "@/features/blog/types";

type BlogPostRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  blocks: BlogBlock[];
  published_at: Date;
};

let database: ReturnType<typeof postgres> | undefined;

function getDatabase() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) return null;

  database ??= postgres(databaseUrl, {
    host: process.env.DATABASE_HOST || undefined,
    max: 5,
    connect_timeout: 10,
    idle_timeout: 20,
  });
  return database;
}

function toBlogPost(row: BlogPostRow): BlogPost {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    tags: row.tags,
    blocks: row.blocks,
    publishedAt: row.published_at.toISOString(),
  };
}

export async function getPublishedPosts() {
  const sql = getDatabase();
  if (!sql) return [];

  const rows = await sql<BlogPostRow[]>`
    select id, slug, title, excerpt, tags, blocks, published_at
    from blog_posts
    where status = 'published'
    order by published_at desc
  `;
  return rows.map(toBlogPost);
}

export async function getPublishedPost(slug: string) {
  const sql = getDatabase();
  if (!sql) return null;

  const [row] = await sql<BlogPostRow[]>`
    select id, slug, title, excerpt, tags, blocks, published_at
    from blog_posts
    where slug = ${slug} and status = 'published'
    limit 1
  `;
  return row ? toBlogPost(row) : null;
}

export async function createPublishedPost(input: Omit<BlogPost, "id" | "slug" | "publishedAt">) {
  const sql = getDatabase();
  if (!sql) throw new Error("DATABASE_URL is not configured.");

  const rootSlug = input.title
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "post";

  const existing = await sql<{ slug: string }[]>`
    select slug from blog_posts where slug like ${`${rootSlug}%`}
  `;
  const taken = new Set(existing.map(({ slug }) => slug));
  let slug = rootSlug;
  for (let suffix = 2; taken.has(slug); suffix += 1) slug = `${rootSlug}-${suffix}`;

  const id = crypto.randomUUID();
  const publishedAt = new Date();
  const [row] = await sql<BlogPostRow[]>`
    insert into blog_posts (id, slug, title, excerpt, tags, blocks, status, published_at)
    values (
      ${id},
      ${slug},
      ${input.title},
      ${input.excerpt},
      ${input.tags},
      ${sql.json(input.blocks)},
      'published',
      ${publishedAt}
    )
    returning id, slug, title, excerpt, tags, blocks, published_at
  `;
  return toBlogPost(row);
}

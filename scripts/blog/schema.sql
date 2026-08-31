create table if not exists blog_posts (
  id uuid primary key,
  slug text unique not null,
  title varchar(160) not null,
  excerpt varchar(400) not null,
  tags text[] not null check (cardinality(tags) between 1 and 50),
  blocks jsonb not null check (jsonb_typeof(blocks) = 'array'),
  status text not null default 'published' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists blog_posts_published_at_idx
  on blog_posts (published_at desc)
  where status = 'published';

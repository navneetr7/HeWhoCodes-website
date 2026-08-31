import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentPage, PageHeader } from "@/components/layout/ContentPage";
import { BlogArticle } from "@/features/blog/BlogArticle";
import { getPublishedPost } from "@/lib/blogRepository";
import { buildPageMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const post = await getPublishedPost((await params).slug);
  if (!post) return {};
  return buildPageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
  });
}

export default async function BlogPostPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const post = await getPublishedPost((await params).slug);
  if (!post) notFound();

  return (
    <ContentPage sectionClassName="max-w-4xl">
      <PageHeader eyebrow={post.tags.join(" · ")} title={post.title} titleClassName="text-teal" />
      <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--text-muted-body)]">
        {post.excerpt}
      </p>
      <BlogArticle post={post} />
    </ContentPage>
  );
}

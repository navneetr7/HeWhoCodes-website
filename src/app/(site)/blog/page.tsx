import Link from "next/link";
import { ContentPage, PageHeader } from "@/components/layout/ContentPage";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { blogIntro } from "@/data/blog";
import { getPublishedPosts } from "@/lib/blogRepository";
import { blogPageMetadata } from "@/lib/metadata";

export const metadata = blogPageMetadata;
export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const blogPosts = await getPublishedPosts();
  return (
    <ContentPage>
      <PageHeader
        eyebrow={blogIntro.eyebrow}
        title={blogIntro.title}
        titleClassName="text-teal"
      />

      <div className="mt-14 grid gap-5">
        {blogPosts.length ? (
          blogPosts.map((post) => (
            <GlassPanel key={post.slug} className="p-6 sm:p-8">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--text-muted-subtle)]">
                {new Date(post.publishedAt).toLocaleDateString("en", { dateStyle: "medium", timeZone: "UTC" })} · {post.tags.join(" · ")}
              </p>
              <h2 className="mt-3 text-2xl font-black sm:text-3xl">
                <Link className="transition-colors hover:text-teal" href={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
              </h2>
              <p className="mt-3 max-w-3xl leading-7 text-[var(--text-muted-body)]">
                {post.excerpt}
              </p>
            </GlassPanel>
          ))
        ) : (
          <p className="py-24 text-center font-mono text-sm text-[var(--text-muted-body)]">
            Nothing useful yet.
          </p>
        )}
      </div>
    </ContentPage>
  );
}

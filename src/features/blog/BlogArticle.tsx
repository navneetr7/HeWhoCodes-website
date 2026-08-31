import Image from "next/image";
import type { BlogPost } from "@/features/blog/types";
import "./blog.css";

export function BlogArticle({ post }: { post: BlogPost }) {
  const firstImageId = post.blocks.find((block) => block.type === "image")?.id;

  return (
    <article className="blog-article">
      {post.blocks.map((block) => {
        if (block.type === "image") return (
          <figure key={block.id}>
            <Image
              alt={block.alt}
              height={block.height}
              loading={block.id === firstImageId ? "eager" : "lazy"}
              sizes="(max-width: 768px) 100vw, 896px"
              src={block.src}
              unoptimized
              width={block.width}
            />
          </figure>
        );
        if (block.type === "paragraph") return <p key={block.id}>{block.text}</p>;
        if (block.type === "heading2") return <h2 key={block.id}>{block.text}</h2>;
        return <h3 key={block.id}>{block.text}</h3>;
      })}
    </article>
  );
}

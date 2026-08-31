"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import type { BlogBlockDraft } from "@/features/blog/types";
import "./blog.css";

const blockLabels = {
  paragraph: "Body",
  heading2: "H2",
  heading3: "H3",
  image: "Image",
} as const;

const newBlock = (type: BlogBlockDraft["type"]): BlogBlockDraft => ({
  id: crypto.randomUUID(),
  type,
  text: "",
});

export function BlogEditor() {
  const router = useRouter();
  const [blocks, setBlocks] = useState<BlogBlockDraft[]>([
    { id: "body-1", type: "paragraph", text: "" },
  ]);
  const [error, setError] = useState("");
  const [publishing, setPublishing] = useState(false);

  const updateBlock = (id: string, text: string) => {
    setBlocks((current) => current.map((block) => block.id === id ? { ...block, text } : block));
  };

  const moveBlock = (index: number, offset: -1 | 1) => {
    setBlocks((current) => {
      const target = index + offset;
      if (target < 0 || target >= current.length) return current;
      const next = [...current];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setPublishing(true);

    try {
      const formData = new FormData(event.currentTarget);
      formData.set("blocks", JSON.stringify(blocks));
      const response = await fetch("/api/blog/posts", { method: "POST", body: formData });
      const result = await response.json() as { slug?: string; error?: string };
      if (!response.ok || !result.slug) throw new Error(result.error ?? "The article could not be published.");
      router.push(`/blog/${result.slug}`);
      router.refresh();
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "The article could not be published.");
      setPublishing(false);
    }
  };

  return (
    <form className="blog-editor" onSubmit={submit}>
      <label className="blog-editor__field">
        <span>Title <small>H1 · required</small></span>
        <input className="blog-editor__input blog-editor__title" maxLength={160} name="title" required />
      </label>

      <label className="blog-editor__field">
        <span>Excerpt <small>required</small></span>
        <textarea className="blog-editor__input" maxLength={400} name="excerpt" required rows={3} />
      </label>

      <label className="blog-editor__field">
        <span>Tags <small>1–50 · comma separated</small></span>
        <input className="blog-editor__input" maxLength={2549} name="tags" required />
      </label>

      <div className="blog-editor__blocks">
        <p className="blog-editor__label">Article</p>
        {blocks.map((block, index) => (
          <div className="blog-editor__block" key={block.id}>
            <div className="blog-editor__block-header">
              <span>{blockLabels[block.type]}</span>
              <div className="blog-editor__block-actions">
                <button aria-label={`Move ${blockLabels[block.type]} up`} disabled={index === 0} onClick={() => moveBlock(index, -1)} type="button">Up</button>
                <button aria-label={`Move ${blockLabels[block.type]} down`} disabled={index === blocks.length - 1} onClick={() => moveBlock(index, 1)} type="button">Down</button>
                <button aria-label={`Remove ${blockLabels[block.type]}`} disabled={blocks.length === 1} onClick={() => setBlocks((current) => current.filter(({ id }) => id !== block.id))} type="button">Remove</button>
              </div>
            </div>

            {block.type === "image" ? (
              <div className="blog-editor__image-fields">
                <input
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  className="blog-editor__file"
                  name={`image-${block.id}`}
                  required
                  type="file"
                />
                <input
                  aria-label="Image description"
                  className="blog-editor__input"
                  maxLength={180}
                  onChange={(event) => updateBlock(block.id, event.target.value)}
                  placeholder="Image description (optional)"
                  value={block.text}
                />
                <small>Converted to 1600 × 900 WebP.</small>
              </div>
            ) : block.type === "paragraph" ? (
              <textarea
                aria-label="Body"
                className="blog-editor__input"
                maxLength={20000}
                onChange={(event) => updateBlock(block.id, event.target.value)}
                required
                rows={8}
                value={block.text}
              />
            ) : (
              <input
                aria-label={blockLabels[block.type]}
                className="blog-editor__input"
                maxLength={200}
                onChange={(event) => updateBlock(block.id, event.target.value)}
                required
                value={block.text}
              />
            )}
          </div>
        ))}
      </div>

      <div className="blog-editor__add" aria-label="Add article block">
        {(["paragraph", "heading2", "heading3", "image"] as const).map((type) => (
          <button className="glass-clear-surface" key={type} onClick={() => setBlocks((current) => [...current, newBlock(type)])} type="button">
            Add {blockLabels[type]}
          </button>
        ))}
      </div>

      {error ? <p className="blog-editor__error" role="alert">{error}</p> : null}

      <button className="blog-editor__publish glass-clear-surface" disabled={publishing} type="submit">
        {publishing ? "Publishing…" : "Publish article"}
      </button>
    </form>
  );
}

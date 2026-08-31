import "server-only";
import type { BlogBlock, BlogBlockDraft } from "@/features/blog/types";
import { blogImageHeight, blogImageWidth, removeBlogImage, saveBlogImage } from "@/lib/blogImages";
import { createPublishedPost } from "@/lib/blogRepository";

export class BlogInputError extends Error {}

function requiredText(formData: FormData, name: string, maxLength: number) {
  const value = String(formData.get(name) ?? "").trim();
  if (!value) throw new BlogInputError(`${name[0].toUpperCase()}${name.slice(1)} is required.`);
  if (value.length > maxLength) throw new BlogInputError(`${name} is too long.`);
  return value;
}

function parseTags(formData: FormData) {
  const tags = [...new Map(
    String(formData.get("tags") ?? "")
      .split(/,|\n/)
      .map((tag) => tag.trim())
      .filter(Boolean)
      .map((tag) => [tag.toLowerCase(), tag]),
  ).values()];
  if (tags.length < 1 || tags.length > 50) throw new BlogInputError("Add between 1 and 50 tags.");
  if (tags.some((tag) => tag.length > 50)) throw new BlogInputError("Each tag must be 50 characters or fewer.");
  return tags;
}

function parseBlockDrafts(formData: FormData) {
  let value: unknown;
  try {
    value = JSON.parse(String(formData.get("blocks") ?? "[]"));
  } catch {
    throw new BlogInputError("The article structure is invalid.");
  }

  if (!Array.isArray(value) || value.length < 1 || value.length > 100) {
    throw new BlogInputError("Add between 1 and 100 article blocks.");
  }

  const allowedTypes = new Set(["paragraph", "heading2", "heading3", "image"]);
  const blocks = value as BlogBlockDraft[];
  if (blocks.some(({ id, type, text }) =>
    !/^[a-zA-Z0-9-]{1,64}$/.test(id) || !allowedTypes.has(type) || typeof text !== "string")) {
    throw new BlogInputError("The article structure is invalid.");
  }
  if (!blocks.some(({ type, text }) => type === "paragraph" && text.trim())) {
    throw new BlogInputError("Body is required.");
  }
  if (blocks.filter(({ type }) => type === "image").length > 10) {
    throw new BlogInputError("Use no more than 10 images per article.");
  }
  return blocks;
}

export async function publishBlogPost(formData: FormData) {
  const title = requiredText(formData, "title", 160);
  const excerpt = requiredText(formData, "excerpt", 400);
  const tags = parseTags(formData);
  const drafts = parseBlockDrafts(formData);
  const imageSources: string[] = [];

  try {
    const blocks: BlogBlock[] = [];
    for (const draft of drafts) {
      if (draft.type === "image") {
        const file = formData.get(`image-${draft.id}`);
        if (!(file instanceof File) || !file.size) throw new BlogInputError("Choose a file for every image block.");
        if (draft.text.length > 180) throw new BlogInputError("Image descriptions must be 180 characters or fewer.");
        let src: string;
        try {
          src = await saveBlogImage(file);
        } catch (error) {
          const message = error instanceof Error && /^(Images must|Each image)/.test(error.message)
            ? error.message
            : "The image could not be processed.";
          throw new BlogInputError(message);
        }
        imageSources.push(src);
        blocks.push({
          id: draft.id,
          type: "image",
          src,
          alt: draft.text.trim(),
          width: blogImageWidth,
          height: blogImageHeight,
        });
        continue;
      }

      const text = draft.text.trim();
      const maxLength = draft.type === "paragraph" ? 20_000 : 200;
      if (!text || text.length > maxLength) throw new BlogInputError("Complete every text block before publishing.");
      blocks.push({ id: draft.id, type: draft.type, text });
    }

    return await createPublishedPost({ title, excerpt, tags, blocks });
  } catch (error) {
    await Promise.all(imageSources.map(removeBlogImage));
    if (error instanceof BlogInputError) throw error;
    throw error;
  }
}

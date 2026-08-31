export type BlogTextBlock = {
  id: string;
  type: "paragraph" | "heading2" | "heading3";
  text: string;
};

export type BlogImageBlock = {
  id: string;
  type: "image";
  src: string;
  alt: string;
  width: 1600;
  height: 900;
};

export type BlogBlock = BlogTextBlock | BlogImageBlock;

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  blocks: BlogBlock[];
  publishedAt: string;
};

export type BlogBlockDraft = {
  id: string;
  type: BlogBlock["type"];
  text: string;
};

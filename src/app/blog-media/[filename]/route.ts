import { readBlogImage } from "@/lib/blogImages";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ filename: string }> },
) {
  const image = await readBlogImage((await params).filename);
  if (!image) return new Response(null, { status: 404 });

  return new Response(new Uint8Array(image), {
    headers: {
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Type": "image/webp",
    },
  });
}

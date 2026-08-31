import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { BlogInputError, publishBlogPost } from "@/lib/blogPublishing";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!(await auth())) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 50 * 1024 * 1024) {
    return NextResponse.json({ error: "The upload is too large." }, { status: 413 });
  }

  try {
    const post = await publishBlogPost(await request.formData());
    revalidatePath("/blog");
    revalidatePath(`/blog/${post.slug}`);
    return NextResponse.json({ slug: post.slug }, { status: 201 });
  } catch (error) {
    if (error instanceof BlogInputError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    console.error("Blog publish failed", error);
    return NextResponse.json({ error: "The article could not be published." }, { status: 500 });
  }
}

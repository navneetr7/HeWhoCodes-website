import { mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

export const blogImageWidth = 1600 as const;
export const blogImageHeight = 900 as const;
const maxImageBytes = 10 * 1024 * 1024;
const allowedImageTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);

function mediaDirectory() {
  return process.env.NODE_ENV === "production"
    ? path.join(process.cwd(), "blog-media")
    : path.join(process.cwd(), ".local", "blog-media");
}

export async function saveBlogImage(file: File) {
  if (!allowedImageTypes.has(file.type)) throw new Error("Images must be JPEG, PNG, WebP, or AVIF.");
  if (!file.size || file.size > maxImageBytes) throw new Error("Each image must be smaller than 10 MB.");

  const output = await sharp(Buffer.from(await file.arrayBuffer()), {
    failOn: "error",
    limitInputPixels: 40_000_000,
  })
    .rotate()
    .resize(blogImageWidth, blogImageHeight, { fit: "cover", position: "attention" })
    .webp({ quality: 82, effort: 4 })
    .toBuffer({ resolveWithObject: true });

  if (output.info.width !== blogImageWidth || output.info.height !== blogImageHeight) {
    throw new Error("The image could not be normalized.");
  }

  const filename = `${crypto.randomUUID()}.webp`;
  await mkdir(mediaDirectory(), { recursive: true });
  await writeFile(path.join(mediaDirectory(), filename), output.data, { flag: "wx" });
  return `/blog-media/${filename}`;
}

export async function removeBlogImage(src: string) {
  await unlink(path.join(mediaDirectory(), path.basename(src))).catch(() => undefined);
}

export async function readBlogImage(filename: string) {
  if (!/^[0-9a-f-]{36}\.webp$/.test(filename)) return null;
  return readFile(path.join(mediaDirectory(), filename)).catch(() => null);
}

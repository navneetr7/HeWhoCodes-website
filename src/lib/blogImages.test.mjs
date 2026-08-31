import assert from "node:assert/strict";
import { File } from "node:buffer";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import sharp from "sharp";
import { blogImageHeight, blogImageWidth, saveBlogImage } from "./blogImages.ts";

test("normalizes blog images to optimized 1600x900 WebP", async () => {
  const directory = await mkdtemp(path.join(tmpdir(), "hewhocodes-blog-image-"));
  const projectDirectory = process.cwd();

  try {
    const input = await readFile(path.join(projectDirectory, "public/brand/logo-h.png"));
    process.chdir(directory);
    const src = await saveBlogImage(new File([input], "logo-h.png", { type: "image/png" }));
    const metadata = await sharp(
      path.join(directory, ".local/blog-media", path.basename(src)),
    ).metadata();

    assert.equal(metadata.format, "webp");
    assert.equal(metadata.width, blogImageWidth);
    assert.equal(metadata.height, blogImageHeight);
  } finally {
    process.chdir(projectDirectory);
    await rm(directory, { recursive: true, force: true });
  }
});

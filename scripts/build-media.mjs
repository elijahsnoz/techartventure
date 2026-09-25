// Builds web derivatives for every source in media-sources.mjs.
//
//   npm run media          only builds what is missing
//   npm run media -- --force   rebuilds everything
//
// Output: public/media/<id>-<width>.webp at up to three widths (never upscaled),
// and src/data/media.generated.json with each image's true dimensions and a
// tiny blurred placeholder so layouts never jump while images load.
import sharp from "sharp";
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { SOURCES, VIDEOS } from "./media-sources.mjs";

const OUT = "public/media";
const MANIFEST = "src/data/media.generated.json";
const WIDTHS = [480, 960, 1600, 2400];
const VIDEO_OUT = "public/video";
const VIDEO_MANIFEST = "src/data/video.generated.json";
const force = process.argv.includes("--force");

mkdirSync(OUT, { recursive: true });
const manifest = existsSync(MANIFEST) && !force ? JSON.parse(readFileSync(MANIFEST, "utf8")) : {};

let built = 0;
const missing = [];
for (const { id, src } of SOURCES) {
  if (!existsSync(src)) {
    missing.push(`${id}  ←  ${src}`);
    continue;
  }
  if (manifest[id] && !force) continue;

  const base = sharp(src).rotate(); // honour EXIF orientation
  const { width, height } = await base.metadata().then((m) =>
    // metadata() reports pre-rotation size; swap when the EXIF orientation turns it
    m.orientation && m.orientation >= 5 ? { width: m.height, height: m.width } : m,
  );
  const widths = [...new Set(WIDTHS.map((w) => Math.min(w, width)))];

  for (const w of widths) {
    await base.clone().resize({ width: w }).webp({ quality: 78, effort: 5 }).toFile(`${OUT}/${id}-${w}.webp`);
  }
  const lqip = await base.clone().resize({ width: 20 }).blur(1).webp({ quality: 40 }).toBuffer();

  manifest[id] = { width, height, widths, lqip: `data:image/webp;base64,${lqip.toString("base64")}` };
  built++;
  process.stdout.write(`  ✓ ${id} (${width}×${height})\n`);
}

/* ── videos: ffmpeg → H.264 MP4, 720px wide, audio kept, fast-start ──────── */

mkdirSync(VIDEO_OUT, { recursive: true });
const videos = existsSync(VIDEO_MANIFEST) && !force ? JSON.parse(readFileSync(VIDEO_MANIFEST, "utf8")) : {};
for (const { id, src, poster } of VIDEOS) {
  if (!existsSync(src)) {
    missing.push(`${id}  ←  ${src}`);
    continue;
  }
  if (videos[id] && !force) continue;
  const mp4 = `${VIDEO_OUT}/${id}.mp4`;
  const jpg = `${VIDEO_OUT}/${id}-poster.jpg`;
  execFileSync("ffmpeg", ["-v", "error", "-y", "-i", src, "-vf", "scale='min(720,iw)':-2", "-c:v", "libx264", "-crf", "27",
    "-preset", "slow", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "96k", "-movflags", "+faststart", mp4]);
  execFileSync("ffmpeg", ["-v", "error", "-y", "-ss", String(poster ?? 1), "-i", mp4, "-frames:v", "1", "-q:v", "4", jpg]);
  const [w, h, dur] = execFileSync("ffprobe", ["-v", "error", "-select_streams", "v:0", "-show_entries",
    "stream=width,height:format=duration", "-of", "csv=p=0:s=,", mp4]).toString().trim().split(/[\n,]+/);
  videos[id] = { src: `/video/${id}.mp4`, poster: `/video/${id}-poster.jpg`, width: +w, height: +h, duration: Math.round(+dur) };
  built++;
  process.stdout.write(`  ✓ video ${id} (${w}×${h}, ${Math.round(+dur)}s)\n`);
}
writeFileSync(VIDEO_MANIFEST, JSON.stringify(videos, null, 2) + "\n");

const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
writeFileSync(MANIFEST, JSON.stringify(sorted, null, 2) + "\n");

console.log(`\n${built} built, ${Object.keys(sorted).length} in manifest.`);
if (missing.length) {
  console.warn(`\n${missing.length} source(s) not found — skipped:\n  ${missing.join("\n  ")}`);
  process.exitCode = 1;
}

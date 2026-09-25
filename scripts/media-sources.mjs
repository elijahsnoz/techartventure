// Where every photograph on the site comes from.
//
// Masters stay where they already live on this machine and are never copied
// into the repo. `npm run media` reads each one and writes web derivatives to
// public/media/, plus their dimensions to src/data/media.generated.json.
//
// To add a photograph: add a line here, run `npm run media`, then describe it
// in src/data/media.ts. The id is the only thing the two files share.
import { homedir } from "node:os";
import { join } from "node:path";

const HOME = homedir();
const ALX = join(HOME, "Desktop/OLD DESKTOP/2024/ALX (ART)/ALX ABUJA TECHART PROTOTYPE");
const SCHOOL = join(HOME, "Desktop/PROFILE/Art school");
const IPADABO = join(HOME, "Desktop/PROGRAMMING/PROGRAMING/alx/planet-b/public/media/ipadabo");
const PLANETB = join(HOME, "Desktop/PROGRAMMING/PROGRAMING/alx/planet-b/public/media");
// The company's own folder. HEIC originals there were converted to JPEG beside them.
const TV = join(HOME, "Desktop/TECHART VENTURE");

/** @type {{ id: string, src: string }[]} */
export const SOURCES = [
  // ── Do Hard Things, ALX Abuja TechArt Ventures Group, 2024 ─────────────────
  { id: "dht-welding", src: join(ALX, "IMG_2884.jpg") },
  { id: "dht-steel", src: join(ALX, "IMG_2886.jpg") },
  { id: "dht-frames", src: join(ALX, "IMG_2887.jpg") },
  { id: "dht-canvas", src: join(ALX, "IMG_2888.jpg") },
  { id: "dht-priming", src: join(ALX, "IMG_2889.jpg") },
  { id: "dht-outline", src: join(ALX, "IMG_2890.jpg") },
  { id: "dht-collage-1", src: join(ALX, "IMG_2891.jpg") },
  { id: "dht-collage-2", src: join(ALX, "IMG_2892.jpg") },
  { id: "dht-collage-3", src: join(ALX, "IMG_2893.jpg") },
  { id: "dht-border", src: join(ALX, "IMG_2895.jpg") },
  { id: "dht-finished", src: join(ALX, "IMG_2896.jpg") },
  { id: "dht-installed", src: join(ALX, "IMG_2897.jpg") },

  // ── TechArt Institute, community art coaching, 2025 ────────────────────────
  { id: "ti-drawings", src: join(SCHOOL, "IMG_1120 2.jpg") },
  { id: "ti-class", src: join(SCHOOL, "IMG_1121 2.jpg") },
  { id: "ti-group", src: join(SCHOOL, "IMG_1122 2.jpg") },
  { id: "ti-selfie", src: join(SCHOOL, "IMG_1123 2.jpg") },
  { id: "ti-outdoor", src: join(SCHOOL, "IMG_1124 2.jpg") },
  { id: "ti-butterfly-1", src: join(SCHOOL, "IMG_1125 2.jpg") },
  { id: "ti-butterfly-2", src: join(SCHOOL, "IMG_1126 2.jpg") },
  { id: "ti-butterfly-3", src: join(SCHOOL, "IMG_1127 2.jpg") },
  { id: "ti-butterfly-finished", src: join(SCHOOL, "IMG_1128 2.jpg") },
  { id: "ti-paintings", src: join(SCHOOL, "IMG_1129 2.jpg") },
  { id: "ti-circle", src: join(SCHOOL, "IMG_1131 2.jpg") },

  // ── Ìpadàbọ̀ (The Return), Nike Art Gallery, 2026 ──────────────────────────
  // These are the catalogue extractions held by Planet-B (max 1200px).
  ...[
    "gallery-01", "gallery-02", "gallery-03", "gallery-05", "gallery-07", "gallery-09",
    "gallery-11", "gallery-13", "opening-nike-okundaye", "artist-portrait", "catalogue-in-hand",
    "creative-rebirth", "itesiwaju", "ijinle", "freedom", "ayo-ti-ko-lopin", "atunbi",
    "national-treasure", "irin-ajo-eda-ati-asa", "silent-guide", "the-law", "only-one",
    "from-waste-to-nation", "unmoved-yet-found",
  ].map((slug) => ({ id: `ipa-${slug}`, src: join(IPADABO, `${slug}.jpg`) })),

  // ── Exhibition at Transcorp, 8 April 2025 ──────────────────────────────────
  { id: "tc-lobby", src: join(TV, "IMG_9814.jpg") },
  { id: "tc-fabric", src: join(TV, "IMG_9823.jpg") },
  { id: "tc-trio", src: join(TV, "IMG_9839.jpg") },
  { id: "tc-team-horses", src: join(TV, "IMG_9869.jpg") },
  { id: "tc-member-horses", src: join(TV, "IMG_9870.jpg") },
  { id: "tc-team-pair", src: join(TV, "IMG_9875.jpg") },

  // ── PalmPay collaboration, 10 June 2025 ────────────────────────────────────
  { id: "pp-artwork", src: join(TV, "IMG_1056.jpg") },
  { id: "pp-wall", src: join(TV, "IMG_1057.jpg") },
  { id: "pp-looking-1", src: join(TV, "IMG_1058.jpg") },
  { id: "pp-looking-2", src: join(TV, "IMG_1059.jpg") },
  { id: "pp-wide", src: join(TV, "IMG_1065.jpg") },

  // ── Nigeria International Fashion Festival (NIFAFEST), 6 December 2025 ──────
  ...[
    ["178", "backdrop-jacket"], ["201", "fashion-exchange"], ["257", "two-men"], ["276", "kaftan"],
    ["279", "laughing"], ["288", "pair-blue"], ["306", "three-women"], ["322", "orange"], ["335", "green"],
    ["336", "ankara"], ["338", "black-tee"], ["410", "red-pair"], ["414", "trio"], ["418", "group-five"],
    ["426", "group"],
  ].map(([n, slug]) => ({ id: `nf-${slug}`, src: join(TV, `NIFAFEST ${n}.jpg`) })),

  // ── With the Honourable Minister, 28 February 2026 ─────────────────────────
  { id: "mn-founder-minister", src: join(TV, "ELIJAH AJAYI & HM ART AND CULTURE HANATU .jpg") },
  { id: "mn-founder-minister-2", src: join(TV, "IMG_7468.jpg") },

  // ── Outside ────────────────────────────────────────────────────────────────
  { id: "out-street", src: join(TV, "IMG_1830.jpg") },

  // ── Planet-B ───────────────────────────────────────────────────────────────
  { id: "pb-watchful-eye", src: join(PLANETB, "artworks/the-watchful-eye.jpg") },
  { id: "pb-genesis-cover", src: join(PLANETB, "keyart/cover.jpg") },
];

/** Videos: re-encoded to web MP4 (720px, H.264) with a poster frame. */
export const VIDEOS = [
  { id: "outside-youth", src: join(TV, "0e4539a6dc804f08b634d7d24ac021f0.mov"), poster: 6 },
  { id: "palmpay-install", src: join(TV, "IMG_1054.MOV"), poster: 8 },
  { id: "transcorp-1", src: join(TV, "IMG_9815.MOV"), poster: 4 },
  { id: "transcorp-2", src: join(TV, "IMG_9818.MOV"), poster: 4 },
  { id: "transcorp-3", src: join(TV, "IMG_9819.MOV"), poster: 3 },
];

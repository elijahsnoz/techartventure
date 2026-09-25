import type { Media } from "../types/content";

/**
 * Every photograph on the site, described once and linked by id.
 *
 * Alt text and captions describe what is visible and nothing more. Nobody is
 * named unless a source names them in that photograph.
 *
 * To add a photograph: register its master in scripts/media-sources.mjs,
 * run `npm run media`, then describe it here with the same id.
 */

const dht = { project: "do-hard-things", date: "2024", location: "Abuja" } as const;
const ti = { project: "techart-institute", date: "2025", location: "Abuja", category: "projects" } as const;
const ipa = {
  exhibition: "ipadabo-the-return",
  date: "2026-04",
  location: "Nike Art Gallery, Abuja",
  artists: ["ajayi-elijah-snoz"],
} as const;

export const MEDIA: Media[] = [
  // ── Do Hard Things ─────────────────────────────────────────────────────────
  { id: "dht-welding", ...dht, category: "behind-the-scenes", alt: "A welder crouched over steel in an open yard, joining the frame for Do Hard Things", caption: "Welding the steel frame." },
  { id: "dht-steel", ...dht, category: "behind-the-scenes", alt: "Lengths of steel bar stacked in a welding yard", caption: "Steel, before the frame." },
  { id: "dht-frames", ...dht, category: "behind-the-scenes", alt: "Welded steel frames leaning upright in the yard", caption: "The welded frames." },
  { id: "dht-canvas", ...dht, category: "behind-the-scenes", alt: "Black canvas laid over a steel frame on the ground, with a figure in a woven hat working on it", caption: "Stretching the canvas over the frame." },
  { id: "dht-priming", ...dht, category: "behind-the-scenes", alt: "Hands in a woven hat working across the black canvas surface", caption: "Preparing the surface." },
  { id: "dht-outline", ...dht, category: "behind-the-scenes", alt: "The black canvas propped against a wall, with the outline of Africa and the ALX mark drawn in white", caption: "The outline of Africa." },
  { id: "dht-collage-1", ...dht, category: "behind-the-scenes", alt: "The canvas turned on its side, with the first collage fragments filling the map", caption: "The first fragments." },
  { id: "dht-collage-2", ...dht, category: "behind-the-scenes", featured: true, alt: "The map of Africa filled with multicoloured collage, the words DO HARD THINGS along the bottom", caption: "The continent, filled." },
  { id: "dht-collage-3", ...dht, category: "behind-the-scenes", alt: "The collaged map of Africa standing against an outside wall", caption: "Work in progress." },
  { id: "dht-border", ...dht, category: "behind-the-scenes", alt: "The canvas with a textured sand-coloured border around the collaged continent, a person standing beside it", caption: "Adding the textured border." },
  { id: "dht-finished", ...dht, category: "artworks", title: "Do Hard Things", featured: true, alt: "The finished work: a collaged map of Africa outlined in gold on black, the ALX mark above and DO HARD THINGS below", caption: "Do Hard Things, finished." },
  { id: "dht-installed", ...dht, category: "events", featured: true, alt: "Do Hard Things installed indoors, a man standing beside it next to an ALX banner", caption: "Presented at an ALX hub in Abuja." },

  // ── TechArt Institute ──────────────────────────────────────────────────────
  { id: "ti-drawings", ...ti, alt: "A group of children in a classroom, each holding up a drawing", caption: "Holding up the day's drawings." },
  { id: "ti-class", ...ti, alt: "Children standing in a classroom in front of a chalkboard with a collaged map of Africa on the wall", caption: "In the classroom." },
  { id: "ti-group", ...ti, alt: "A large group of children with two coaches, gathered in a classroom", caption: "The full group." },
  { id: "ti-selfie", ...ti, category: "people", alt: "A coach taking a selfie with a crowd of smiling children behind him", caption: "End of a session." },
  { id: "ti-outdoor", ...ti, alt: "Children outside a gate holding their artworks and a banner", caption: "Outside, with the work." },
  { id: "ti-butterfly-1", ...ti, category: "behind-the-scenes", alt: "Children kneeling over a large sheet of paper on the floor, placing coloured fragments", caption: "Starting the butterfly." },
  { id: "ti-butterfly-2", ...ti, category: "behind-the-scenes", featured: true, alt: "Children crowded around a large butterfly collage on the classroom floor, filling it with colour", caption: "Many hands on one butterfly." },
  { id: "ti-butterfly-3", ...ti, category: "behind-the-scenes", alt: "Children working on the butterfly collage, the finished wing propped against the wall behind them", caption: "Filling the wings." },
  { id: "ti-butterfly-finished", ...ti, category: "artworks", featured: true, alt: "Children holding up the finished multicoloured butterfly collage and their paintings in a yellow classroom", caption: "The finished butterfly." },
  { id: "ti-paintings", ...ti, alt: "Children standing outside a green-doored building holding their landscape paintings", caption: "Paintings from the session." },
  { id: "ti-circle", ...ti, alt: "Children seated on the floor in a circle around a dark mat, working on materials", caption: "Working in a circle." },

  // ── Ìpadàbọ̀ ───────────────────────────────────────────────────────────────
  { id: "ipa-opening-nike-okundaye", ...ipa, category: "events", featured: true, alt: "Chief Dr Nike Davies Okundaye at the opening of Ìpadàbọ̀, standing before the exhibited works", caption: "The exhibition was opened by Chief Dr Nike Davies Okundaye." },
  { id: "ipa-gallery-03", ...ipa, category: "exhibitions", featured: true, alt: "A wall of brightly coloured Ìpadàbọ̀ paintings at Nike Art Gallery, with a visitor looking on" },
  { id: "ipa-gallery-01", ...ipa, category: "exhibitions", alt: "Two visitors in conversation in front of the exhibited works" },
  { id: "ipa-gallery-05", ...ipa, category: "exhibitions", alt: "Visitors gathered in front of National Treasure" },
  { id: "ipa-gallery-07", ...ipa, category: "exhibitions", alt: "A visitor standing before Ìrìn Àjò Èdá àti Àṣà" },
  { id: "ipa-gallery-02", ...ipa, category: "exhibitions", alt: "The gallery floor, with Unmoved, Yet Found placed in the room" },
  { id: "ipa-gallery-09", ...ipa, category: "exhibitions", alt: "The three standing works in the room, with visitors" },
  { id: "ipa-gallery-13", ...ipa, category: "exhibitions", alt: "A visitor beside From waste to nation, a large flag made of bottle tops and fabric" },
  { id: "ipa-gallery-11", ...ipa, category: "exhibitions", alt: "Visitors along the hung wall of the exhibition, blue fabric works among the paintings" },
  { id: "ipa-catalogue-in-hand", ...ipa, category: "exhibitions", alt: "Hands holding the Ìpadàbọ̀ exhibition catalogue" },
  { id: "ipa-artist-portrait", ...ipa, category: "artists", alt: "Portrait of Ajayi Damilare Elijah (Snoz) against a pale pink background" },
  ...(
    [
      ["creative-rebirth", "Creative Rebirth"],
      ["itesiwaju", "Ìtẹ̀síwájú"],
      ["ijinle", "Ìjìnlẹ̀"],
      ["freedom", "Freedom"],
      ["ayo-ti-ko-lopin", "Ayọ̀ Tí Kò L’Ópin (Endless Joy)"],
      ["atunbi", "Àtúnbi (Rebirth)"],
      ["national-treasure", "National Treasure"],
      ["irin-ajo-eda-ati-asa", "Ìrìn Àjò Èdá àti Àṣà"],
      ["silent-guide", "Silent Guide"],
      ["the-law", "The Law"],
      ["only-one", "Only One"],
      ["from-waste-to-nation", "From waste to nation"],
      ["unmoved-yet-found", "Unmoved, Yet Found"],
    ] as const
  ).map(
    ([slug, title]): Media => ({
      id: `ipa-${slug}`,
      ...ipa,
      category: "artworks",
      title,
      alt: `${title}, by Ajayi Damilare Elijah`,
      featured: slug === "ayo-ti-ko-lopin" || slug === "national-treasure",
    }),
  ),

  // ── Exhibition at Transcorp, 8 April 2025 ──────────────────────────────────
  ...(
    [
      ["tc-lobby", "events", "A TechArt Venture team member and a visitor talking among paintings in the hotel lobby", true],
      ["tc-fabric", "events", "A TechArt Venture team member showing a visitor fabric pieces at the exhibition table", false],
      ["tc-trio", "people", "Two TechArt Venture team members with a visitor in the lobby, a large dark artwork behind them", false],
      ["tc-team-horses", "people", "Two TechArt Venture team members, in a branded T-shirt and hoodie, before large black-and-white paintings of horses and riders", true],
      ["tc-member-horses", "people", "A TechArt Venture team member in a branded hoodie before a large black-and-white painting of horses", false],
      ["tc-team-pair", "people", "The two TechArt Venture team members standing before the horse paintings", false],
    ] as const
  ).map(
    ([id, category, alt, featured]): Media => ({
      id, category, alt, featured,
      exhibition: "transcorp-2025", event: "Exhibition at Transcorp", date: "2025-04-08", location: "Transcorp Hilton, Abuja",
    }),
  ),

  // ── PalmPay collaboration, 10 June 2025 ────────────────────────────────────
  ...(
    [
      ["pp-artwork", "artworks", "The PalmPay canvas: purple acrylic collaged with PalmPay debit-card leaflets and newspaper, a QR label signed SNOZ beside it", true],
      ["pp-wall", "artworks", "The PalmPay canvas hung on a white wall", false],
      ["pp-looking-1", "projects", "A man in a TechArt Venture top and orange cap looking up at the PalmPay canvas", false],
      ["pp-looking-2", "projects", "A man in a TechArt Venture top looking up at the canvas on the wall", false],
      ["pp-wide", "projects", "The canvas on a white wall, a man in a TechArt Venture top standing beneath it", false],
    ] as const
  ).map(
    ([id, category, alt, featured]): Media => ({
      id, category, alt, featured,
      // The canvas itself is shown whole, never cropped.
      ...(id === "pp-artwork" && { fit: "contain" as const }),
      project: "palmpay", event: "PalmPay collaboration", date: "2025-06-10", artists: ["ajayi-elijah-snoz"],
    }),
  ),

  // ── NIFAFEST 2025, 6 December 2025 ─────────────────────────────────────────
  ...(
    [
      ["nf-group", "events", "A group before the Nigeria International Fashion Festival 2025 backdrop, which carries the TechArt Venture, ALX and Arise News marks", true],
      ["nf-fashion-exchange", "events", "Two women holding printed fabrics at NIFAFEST 2025, paintings on the walls and the festival backdrop behind them", true],
      ["nf-three-women", "people", "Three women smiling at NIFAFEST 2025, the TechArt Venture mark on the backdrop behind them", false],
      ["nf-backdrop-jacket", "people", "A guest in a black jacket before the NIFAFEST 2025 backdrop", false],
      ["nf-two-men", "people", "Two men before the festival backdrop, one in a red patterned outfit and cap", false],
      ["nf-kaftan", "people", "A woman in a flowing printed kaftan before the festival backdrop", false],
      ["nf-laughing", "people", "A woman in a tie-dye dress laughing before the festival backdrop", false],
      ["nf-pair-blue", "people", "A woman in blue patterned trousers and a man in white before the backdrop", false],
      ["nf-orange", "people", "A woman in orange printed trousers, the TechArt Venture mark on the backdrop above her", true],
      ["nf-green", "people", "A woman in a hijab and green printed trousers before the backdrop", false],
      ["nf-ankara", "people", "A young woman in a green and orange printed dress", false],
      ["nf-black-tee", "people", "A young man in a black T-shirt and printed trousers before the backdrop", false],
      ["nf-red-pair", "people", "A man in coral beads and a red patterned outfit beside a woman in a matching print", false],
      ["nf-trio", "people", "Three guests before the NIFAFEST backdrop", false],
      ["nf-group-five", "people", "Five people before the NIFAFEST backdrop", false],
    ] as const
  ).map(
    ([id, category, alt, featured]): Media => ({
      id, category, alt, featured,
      exhibition: "nifafest-2025", event: "NIFAFEST 2025", date: "2025-12-06",
    }),
  ),

  // ── With the Honourable Minister, 28 February 2026 ─────────────────────────
  { id: "mn-founder-minister", category: "people", event: "With the Honourable Minister", date: "2026-02-28", artists: ["ajayi-elijah-snoz"], featured: true, alt: "Elijah Ajayi with the Honourable Minister of Art, Culture, Tourism and Creative Economy, in front of a portrait painting", caption: "Elijah Ajayi with the Honourable Minister." },
  { id: "mn-founder-minister-2", category: "people", event: "With the Honourable Minister", date: "2026-02-28", artists: ["ajayi-elijah-snoz"], alt: "Elijah Ajayi and the Honourable Minister smiling, in front of a portrait painting" },

  // ── Outside ────────────────────────────────────────────────────────────────
  { id: "out-street", category: "behind-the-scenes", alt: "A young man in a TechArt Venture T-shirt and headphones walking along a roadside" },

  // ── Planet-B ───────────────────────────────────────────────────────────────
  { id: "pb-watchful-eye", fit: "contain", project: "planet-b", date: "2026", category: "artworks", title: "The Watchful Eye", artists: ["ajayi-elijah-snoz"], alt: "The Watchful Eye: a large eye assembled from reclaimed plastics and electronics, a damaged watch at its centre" },
  { id: "pb-genesis-cover", fit: "contain", project: "planet-b", date: "2026-06-05", location: "Nike Art Gallery, Abuja", category: "projects", alt: "Key art for the Planet-B Genesis Chapter, celebrating World Environment Day 2026: Because There Is No Planet B, From Waste to Resource" },
];

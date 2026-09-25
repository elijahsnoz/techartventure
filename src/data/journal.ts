import type { JournalEntry } from "../types/content";

/**
 * The Journal: documentation of things that happened, newest first.
 *
 * Each entry reports a documented event and cites nothing it can't. Stories,
 * interviews and announcements are added here as they happen.
 */
export const JOURNAL: JournalEntry[] = [
  {
    slug: "with-the-honourable-minister",
    title: "With the Honourable Minister",
    dek: "The founder, Elijah Ajayi, with the Honourable Minister of Art, Culture, Tourism and Creative Economy.",
    date: "2026-02-28",
    category: "Announcement",
    cover: "mn-founder-minister",
    body: [
      "On 28 February 2026, TechArt Venture's founder, Elijah Ajayi, met Hon. Hannatu Musa Musawa, the Minister of Art, Culture, Tourism and Creative Economy.",
    ],
    gallery: ["mn-founder-minister-2"],
    artists: ["ajayi-elijah-snoz"],
  },
  {
    slug: "nifafest-2025",
    title: "NIFAFEST 2025",
    dek: "Fashion and art in one room at the Nigeria International Fashion Festival, with TechArt Venture on the backdrop.",
    date: "2025-12-06",
    category: "Exhibition Report",
    cover: "nf-fashion-exchange",
    body: [
      "The Nigeria International Fashion Festival 2025 took place on 6 December 2025, and TechArt Venture's mark was on the festival backdrop among its partners.",
      "Guests came in printed and dyed textiles, and the camera caught them one by one in front of the backdrop, with paintings on the walls of the room around them.",
    ],
    gallery: ["nf-group", "nf-orange", "nf-red-pair", "nf-three-women", "nf-kaftan", "nf-green"],
    exhibitions: ["nifafest-2025"],
  },
  {
    slug: "outside-with-the-youth",
    title: "Outside, with the youth",
    dek: "The founder out on the street at dusk, with young people dancing along the roadside.",
    category: "Behind the Scenes",
    body: [
      "Not all of TechArt Venture's work happens on a gallery wall. This film follows the founder outside, at dusk, among young people dancing on the roadside.",
    ],
    videos: ["outside-youth"],
    artists: ["ajayi-elijah-snoz"],
  },
  {
    slug: "ipadabo-opens-at-nike-art-gallery",
    title: "Ìpadàbọ̀ opens at Nike Art Gallery",
    dek: "The founder's solo exhibition, opened by Chief Dr Nike Davies Okundaye, ran from 21 April to 5 May 2026.",
    date: "2026-04-21",
    category: "Exhibition Report",
    cover: "ipa-opening-nike-okundaye",
    body: [
      "Ìpadàbọ̀, Yoruba for “The Return”, opened at Nike Art Gallery, Abuja on 21 April 2026, and ran until 5 May.",
      "The exhibition was opened by Chief Dr Nike Davies Okundaye, who curated it, with Katurag Chinyio as co-curator. The catalogue records twenty-two works across painting, mixed media and standing wood-and-iron pieces.",
      "The artist leaves visitors with a question: “What does it mean to return, and what do we find when we do?”",
    ],
    gallery: ["ipa-gallery-03", "ipa-gallery-05", "ipa-gallery-07", "ipa-gallery-13"],
    artists: ["ajayi-elijah-snoz"],
    exhibitions: ["ipadabo-the-return"],
  },
  {
    slug: "techart-institute-in-the-community",
    title: "TechArt Institute, in the community",
    dek: "Drawing, painting and a butterfly made by many hands: documentation from the community art coaching sessions.",
    date: "2025-06",
    category: "Documentation",
    cover: "ti-butterfly-2",
    body: [
      "TechArt Institute takes art coaching to children and young people in their own communities.",
      "In these sessions the children drew and painted, then worked together on the classroom floor to fill the outline of a butterfly with coloured fragments, until the finished piece could be held up by the whole group.",
    ],
    gallery: ["ti-butterfly-1", "ti-butterfly-3", "ti-butterfly-finished", "ti-paintings"],
    projects: ["techart-institute"],
  },
  {
    slug: "techart-venture-is-registered",
    title: "TechArt Venture is registered",
    dek: "On 6 March 2025 TechArt Venture was registered as a business name with the Corporate Affairs Commission of Nigeria.",
    date: "2025-03-06",
    category: "Announcement",
    body: [
      "TechArt Venture was registered with the Corporate Affairs Commission on 6 March 2025, under registration number BN 8320675, with the general nature of business recorded as Artist.",
      "It formalised work that began in 2024 as the ALX Abuja TechArt Ventures Group.",
    ],
  },
  {
    slug: "building-do-hard-things",
    title: "Building Do Hard Things",
    dek: "From welded steel to a collaged continent: how the ALX Abuja TechArt group made its prototype work.",
    date: "2024-08",
    category: "Behind the Scenes",
    cover: "dht-collage-2",
    body: [
      "The work started in a welding yard, with lengths of steel cut and joined into a frame.",
      "Canvas was stretched over the frame and primed black. The outline of Africa was drawn on in white, and then the continent was filled, fragment by fragment, with collage, before a textured border and the ALX mark finished it.",
      "The finished piece was presented at an ALX hub in Abuja.",
    ],
    gallery: ["dht-welding", "dht-frames", "dht-canvas", "dht-outline", "dht-collage-1", "dht-border", "dht-finished"],
    artists: ["ajayi-elijah-snoz"],
    projects: ["do-hard-things"],
  },
];

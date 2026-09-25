import type { Artwork } from "../types/content";

/**
 * Artworks, transcribed from their primary source.
 *
 * Ìpadàbọ̀ works: from the exhibition catalogue (35 pp., © 2026 Elijah Ajayi),
 * in the curator's order. Where the catalogue prints no medium or dimension,
 * none is recorded; spellings such as "New Begining" are the catalogue's own.
 */
const artist = "ajayi-elijah-snoz";
const exhibition = "ipadabo";

export const ARTWORKS: Artwork[] = [
  {
    id: "creative-rebirth", title: "Creative Rebirth", year: "2025", medium: "Acrylic, newspaper on canvas",
    note: "Creative Rebirth is a visual meditation on creation itself. It speaks to the belief that every beginning is born from thought, a silent seed from which ideas, dreams, and realities emerge.",
    image: "ipa-creative-rebirth", artist, exhibition,
  },
  {
    id: "itesiwaju", title: "Ìtẹ̀síwájú", year: "2026", dimensions: "91.44 cm × 121.92 cm",
    note: "A dynamic interplay of symbols and forms, this work embodies the journey of goals pursued through perseverance, consistency, and love.",
    image: "ipa-itesiwaju", artist, exhibition,
  },
  {
    id: "ijinle", title: "Ìjìnlẹ̀", year: "2026", dimensions: "91.44 cm × 121.92 cm", medium: "Acrylic on canvas",
    note: "The work invites viewers to assemble their own narrative from these fragments. It operates as a visual meditation on perception, balance, transformation, and origin.",
    image: "ipa-ijinle", artist, exhibition,
  },
  {
    id: "freedom", title: "Freedom", year: "2024", dimensions: "91.44 × 91.44 cm",
    medium: "Mixed media with newspaper and acrylic on canvas", image: "ipa-freedom", artist, exhibition,
  },
  {
    id: "ayo-ti-ko-lopin", title: "Ayọ̀ Tí Kò L’Ópin", translation: "Endless Joy", year: "2026",
    dimensions: "152.4 cm × 121.92 cm", medium: "Acrylic on canvas", image: "ipa-ayo-ti-ko-lopin", artist, exhibition,
  },
  {
    id: "atunbi", title: "Àtúnbi", translation: "Rebirth", year: "2026", dimensions: "91.44 cm × 121.92 cm",
    medium: "Acrylic on canvas",
    note: "Rebirth emerges as both spiritual renewal and the reclamation of value, where true wealth lies in identity and becoming.",
    image: "ipa-atunbi", artist, exhibition,
  },
  {
    id: "national-treasure", title: "National Treasure", year: "2025", dimensions: "243.84 cm × 152.4 cm", medium: "Mix-media",
    note: "Nigeria is not defined by bad news alone; it is defined by its people, its hope, and its future. This work represents renewed hope.",
    image: "ipa-national-treasure", artist, exhibition,
  },
  {
    id: "irin-ajo-eda-ati-asa", title: "Ìrìn Àjò Èdá àti Àṣà", translation: "The Journey of Humanity and Culture",
    year: "2025 to 2026", dimensions: "243.84 cm × 152.4 cm", medium: "Acrylic on canvas",
    note: "This work maps the journey from primal existence to complex societies through layered imagery and ancestral motifs, inviting reflection on identity, progress, and shared origins.",
    image: "ipa-irin-ajo-eda-ati-asa", artist, exhibition,
  },
  {
    id: "silent-guide", title: "Silent Guide", year: "2026", dimensions: "91.44 cm × 60.96 cm", medium: "Acrylic on canvas",
    note: "This work conveys the idea that true leadership is not determined by age or size, but by clarity and direction, with the child symbolically guiding the adults forward.",
    image: "ipa-silent-guide", artist, exhibition,
  },
  {
    id: "the-law", title: "The Law", year: "2024", dimensions: "91.44 cm × 121.92 cm", medium: "Mix-media",
    note: "This artwork ultimately reflects the law of life, a system built on order, patience, and consequence. It suggests that growth cannot be rushed, as every stage exists for a purpose.",
    image: "ipa-the-law", artist, exhibition,
  },
  {
    id: "unmoved-yet-found", title: "Unmoved, Yet Found", medium: "Wood, iron and acrylic",
    note: "The bench does not move, does not call, does not explain. It simply remains. In Ipadabo, return is not a question of direction, but of alignment.",
    image: "ipa-unmoved-yet-found", artist, exhibition,
  },
  {
    id: "only-one", title: "Only One", year: "2024", dimensions: "45 cm by 30.5 cm",
    medium: "Mix media, plastic, fabrics and acrylic on canvas",
    note: "Only one represents a nation learning to see together, choosing unity over division. One vision, many people.",
    image: "ipa-only-one", artist, exhibition,
  },
  {
    id: "from-waste-to-nation", title: "From waste to nation", year: "2025", dimensions: "182.88 cm × 121.92 cm",
    medium: "Mix media, bottle tops and fabrics", image: "ipa-from-waste-to-nation", artist, exhibition,
  },
  {
    id: "the-watchful-eye", title: "The Watchful Eye", year: "2026", dimensions: "61 × 61 cm",
    medium: "Discarded-items assemblage",
    note: "A giant eye made of reclaimed plastics and electronics, with a damaged watch symbolising environmental urgency. Made for the Planet-B Genesis Chapter, Abuja.",
    image: "pb-watchful-eye", artist,
  },
];

import type { Artist } from "../types/content";

/**
 * Artists presented by TechArt Venture.
 *
 * An artist is added here only with their agreement, and a biography is only
 * ever their own words or a source they approved. To add one: add a record,
 * give them a portrait in media.ts, and link their works and exhibitions by
 * this slug.
 */
export const ARTISTS: Artist[] = [
  {
    slug: "ajayi-elijah-snoz",
    name: "Ajayi Damilare Elijah",
    knownAs: "Snoz",
    role: "Founder, TechArt Venture",
    discipline: "Visual artist · Mixed media",
    location: "Abuja, Nigeria",
    portrait: "ipa-artist-portrait",
    summary:
      "A contemporary visual artist exploring identity, memory and the connection between past and present, with a visual language of eyes, cowries and fractured form.",
    // Artist statement, Ìpadàbọ̀ catalogue, page 32.
    biography: [
      "Ajayi Damilare Elijah (SNOZ) is a contemporary visual artist exploring identity, memory, and the connection between past and present. He began his professional practice in 2016 in Kuala Lumpur, Malaysia, where he grew up, shaping his cross-cultural perspective.",
      "His practice is shaped by experience in fashion, music, and collaborations with global brands, bringing a distinct contemporary edge to his work. His visual language is defined by recurring motifs, eyes, cowries, and fractured form, which bridge spiritual awareness and physical reality.",
      "Rooted in African philosophy and personal experience, his work explores themes of return, renewal, and self-discovery, while also addressing environmental concerns through the use of recycled materials such as plastics and fabric.",
    ],
    links: [{ label: "TikTok", href: "https://www.tiktok.com/@elijahsnoz" }],
  },
];

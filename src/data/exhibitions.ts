import type { Exhibition } from "../types/content";

export const EXHIBITIONS: Exhibition[] = [
  {
    slug: "nifafest-2025",
    title: "NIFAFEST 2025",
    translation: "Nigeria International Fashion Festival",
    kind: "Festival",
    relationship: "partner",
    status: "completed",
    start: "2025-12-06",
    summary:
      "The Nigeria International Fashion Festival 2025, with TechArt Venture's mark on the festival backdrop among the event's partners.",
    // The festival photographs, 6 December 2025.
    body: [
      "The Nigeria International Fashion Festival 2025 took place on 6 December 2025. TechArt Venture's mark stands on the festival backdrop, alongside ALX, Arise News and the other names that carried the event.",
      "The festival brought fashion and art into one room: guests wore printed and dyed textiles in front of the backdrop, with paintings hung on the walls around them.",
    ],
    artists: [],
    cover: "nf-group",
    gallery: [
      "nf-group", "nf-fashion-exchange", "nf-three-women", "nf-orange", "nf-red-pair", "nf-kaftan", "nf-pair-blue",
      "nf-green", "nf-ankara", "nf-laughing", "nf-two-men", "nf-black-tee", "nf-backdrop-jacket", "nf-trio", "nf-group-five",
    ],
    source: "Festival photographs, 6 December 2025.",
  },
  {
    slug: "transcorp-2025",
    title: "At Transcorp",
    translation: "Exhibition at Transcorp Hilton, Abuja",
    kind: "Exhibition",
    relationship: "techart",
    status: "completed",
    start: "2025-04-08",
    venue: "Transcorp Hilton",
    city: "Abuja",
    summary:
      "TechArt Venture's exhibition in the lobby of Transcorp Hilton, Abuja, with the team among the works to meet visitors.",
    // Photographs and video from 8 April 2025.
    body: [
      "On 8 April 2025 TechArt Venture held an exhibition in the lobby of Transcorp Hilton, Abuja, with the team on the floor in the company's own shirts and hoodies.",
      "Paintings hung on freestanding walls across the marble floor, among them large black-and-white works of horses and riders. The team kept a table of printed material and fabric pieces, and walked visitors through the works.",
    ],
    artists: [],
    cover: "tc-team-horses",
    gallery: ["tc-team-horses", "tc-lobby", "tc-fabric", "tc-trio", "tc-member-horses", "tc-team-pair"],
    videos: ["transcorp-1", "transcorp-2", "transcorp-3"],
    source: "Photographs and video, 8 April 2025.",
  },
  {
    slug: "ipadabo-the-return",
    title: "Ìpadàbọ̀",
    translation: "The Return",
    kind: "Solo exhibition",
    relationship: "founder",
    status: "completed",
    start: "2026-04-21",
    end: "2026-05-05",
    venue: "Nike Art Gallery",
    city: "Abuja",
    summary:
      "An exhibition exploring memory, identity, culture, and human connection through symbolic visual storytelling.",
    // Co-Curator Katurag Chinyio's statement, catalogue page 8 (excerpted, unaltered).
    body: [
      "IPADÀBỌ̀, a conceptual exhibition, translated from the Yoruba language of the western part of Nigeria as “The Return,” explores both a physical and psychological homecoming.",
      "In this body of work, Ajayi Damilare Elijah (Snoz) navigates the layered realities of returning to a homeland that is at once familiar and transformed. Born in Nigeria and raised in Malaysia, his practice emerges from the tension between memory and present experience, between inherited identity and lived reality.",
      "Through mixed media, the artist constructs textured surfaces that mirror the diversity of his themes. Fabric fragments reference continuity and identity, while repurposed (up cycled) materials such as bottle tops evoke ideas of consumption, fragmentation, and reconstruction.",
      "Ultimately, IPADABO is an act of reconciliation, an attempt to understand displacement, embrace change, and find balance within evolving notions of home and belonging.",
    ],
    artists: ["ajayi-elijah-snoz"],
    credits: [
      { name: "Chief Dr Nike Davies Okundaye", role: "Curator; opened the exhibition" },
      { name: "Katurag Chinyio", role: "Co-Curator" },
      { name: "Richard Mills and Leigh Mills", role: "Foreword" },
    ],
    cover: "ipa-gallery-03",
    gallery: [
      "ipa-opening-nike-okundaye", "ipa-gallery-03", "ipa-gallery-01", "ipa-gallery-05", "ipa-gallery-07",
      "ipa-gallery-02", "ipa-gallery-09", "ipa-gallery-13", "ipa-gallery-11", "ipa-catalogue-in-hand",
    ],
    works: [
      "creative-rebirth", "itesiwaju", "ijinle", "freedom", "ayo-ti-ko-lopin", "atunbi", "national-treasure",
      "irin-ajo-eda-ati-asa", "silent-guide", "the-law", "unmoved-yet-found", "only-one", "from-waste-to-nation",
    ],
    youtube: { id: "fnvlfikfs04", title: "Ìpadàbọ̀ exhibition documentation" },
    source: "Exhibition catalogue, Ìpadàbọ̀ by Elijah, 35 pages, © 2026 Elijah Ajayi.",
  },
  {
    slug: "techart-fusion",
    title: "TechArt Fusion",
    translation: "Bridging Art and Fashion with Innovation",
    kind: "Exhibition and fashion show",
    relationship: "techart",
    status: "proposed",
    start: "2024-08-29",
    venue: "Nike Art Gallery",
    city: "Abuja",
    summary:
      "A proposed exhibition exploring the intersection of art, fashion and technology, under the theme “Cultural Narratives Enhanced by Technology”.",
    // Exhibition concept and proposal to Nike Art Gallery, 29 August 2024.
    body: [
      "TechArt Fusion was proposed to Nike Art Gallery on 29 August 2024 by the ALX Abuja TechArt group, a collective of artists, technologists and fashion designers.",
      "The concept brought together interactive digital art installations, tech-enhanced traditional art, and mixed-media sculpture combining recycled elements with digital components, closing with a fashion show by five designers drawn from ALX participants and external talent.",
      "The proposal set a planning window of November 2024 and a launch in December 2024, with support from Workcentral, Inc.",
    ],
    artists: [],
    partners: ["Workcentral, Inc. (proposed support)"],
    source: "TechArt Fusion exhibition concept, and the proposal to Nike Art Gallery dated 29 August 2024.",
  },
];

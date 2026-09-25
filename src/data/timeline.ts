import type { PartialDate } from "../types/content";

/**
 * TechArt Venture, in order. Every date is from a document or a photograph's
 * own metadata; the source is noted beside each line.
 */
export const TIMELINE: { date: PartialDate; title: string; note: string; href?: string }[] = [
  // ALX Abuja TechArt Ventures Group decks, 3–4 Aug 2024
  { date: "2024-08", title: "ALX Abuja TechArt Ventures Group", note: "ALX learners in Abuja come together to tell a story with art and technology.", href: "/projects/do-hard-things" },
  // Same decks + process photographs
  { date: "2024-08", title: "Do Hard Things", note: "The group's prototype work: a collaged map of Africa on a welded steel frame.", href: "/projects/do-hard-things" },
  // Proposal to Nike Art Gallery
  { date: "2024-08-29", title: "TechArt Fusion proposed", note: "An art, fashion and technology exhibition proposed to Nike Art Gallery.", href: "/exhibitions/techart-fusion" },
  // CAC certificate
  { date: "2025-03-06", title: "Registered", note: "TechArt Venture is registered with the Corporate Affairs Commission, BN 8320675.", href: "/journal/techart-venture-is-registered" },
  // EXIF, IMG_9814–9875
  { date: "2025-04-08", title: "Exhibition at Transcorp", note: "An exhibition in the lobby of Transcorp Hilton, Abuja.", href: "/exhibitions/transcorp-2025" },
  // EXIF, IMG_1056–1065
  { date: "2025-06-10", title: "PalmPay × TechArt Venture", note: "A canvas made from PalmPay's own materials, installed beneath the PalmPay sign.", href: "/projects/palmpay" },
  // Admissions notice, application period from 12 June 2025
  { date: "2025-06", title: "TechArt Institute", note: "Community art coaching for children and young people.", href: "/projects/techart-institute" },
  // EXIF, NIFAFEST photographs
  { date: "2025-12-06", title: "NIFAFEST 2025", note: "TechArt Venture on the backdrop of the Nigeria International Fashion Festival.", href: "/exhibitions/nifafest-2025" },
  // EXIF, the Minister photographs
  { date: "2026-02-28", title: "With the Honourable Minister", note: "The founder meets the Minister of Art, Culture, Tourism and Creative Economy.", href: "/journal/with-the-honourable-minister" },
  // Ìpadàbọ̀ catalogue
  { date: "2026-04-21", title: "Ìpadàbọ̀ (The Return)", note: "The founder's solo exhibition opens at Nike Art Gallery, Abuja.", href: "/exhibitions/ipadabo-the-return" },
  // Planet-B Genesis Chapter catalogue
  { date: "2026-06-05", title: "Planet-B Genesis Chapter", note: "The founder is among the artists of the Genesis Chapter, World Environment Day.", href: "/projects/planet-b" },
];

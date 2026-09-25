import type { Video } from "../types/content";

/**
 * Films hosted by TechArt Venture. Masters are listed in
 * scripts/media-sources.mjs; `npm run media` encodes them to public/video/.
 */
export const VIDEOS: Video[] = [
  {
    id: "outside-youth",
    title: "Outside, with the youth",
    caption: "The founder outside at dusk, with young people dancing along the roadside.",
    event: "Outside",
  },
  {
    id: "palmpay-install",
    title: "Installing the PalmPay wall",
    caption: "The PalmPay letters going up on the wall beneath the canvas.",
    date: "2025-06-10",
    project: "palmpay",
    event: "PalmPay collaboration",
  },
  {
    id: "transcorp-1",
    title: "At Transcorp: the exhibition table",
    caption: "The TechArt Venture table among the works, with visitors.",
    date: "2025-04-08",
    location: "Transcorp Hilton, Abuja",
    exhibition: "transcorp-2025",
    event: "Exhibition at Transcorp",
  },
  {
    id: "transcorp-2",
    title: "At Transcorp: walking the works",
    caption: "A TechArt Venture team member walking a visitor through the works.",
    date: "2025-04-08",
    location: "Transcorp Hilton, Abuja",
    exhibition: "transcorp-2025",
    event: "Exhibition at Transcorp",
  },
  {
    id: "transcorp-3",
    title: "At Transcorp: reading the catalogue",
    caption: "A visitor with printed material from the exhibition.",
    date: "2025-04-08",
    location: "Transcorp Hilton, Abuja",
    exhibition: "transcorp-2025",
    event: "Exhibition at Transcorp",
  },
];

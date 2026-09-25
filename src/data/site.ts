/** Facts about the company itself. Each one is traceable to a document. */
export const SITE = {
  name: "TechArt Venture",
  /** The production domain isn't decided yet. Set VITE_SITE_URL at build time. */
  url: (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, "") ?? "",
  tagline: "Art. Technology. People. Possibility.",
  statement:
    "TechArt Venture develops creative projects, supports artists and connects art, technology and cultural experiences.",
  supporting: "Building new possibilities for artists through technology, exhibitions and creative collaboration.",
  city: "Abuja, Nigeria",
  /** CAC certificate of registration, 6 March 2025. */
  registration: {
    body: "Corporate Affairs Commission, Nigeria",
    kind: "Business name",
    number: "BN 8320675",
    date: "2025-03-06",
  },
  /** The 2024 decks: the group began as ALX Abuja TechArt Ventures Group. */
  origin: {
    year: "2024",
    name: "ALX Abuja TechArt Ventures Group",
  },
  /**
   * How messages reach the company. The WhatsApp number is the one printed on
   * TechArt Venture's own public notices. Set VITE_CONTACT_ENDPOINT to a form
   * service (Formspree, a Supabase function…) to receive the form by POST instead.
   */
  contact: {
    whatsapp: "2347068036606",
    endpoint: (import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined) ?? "",
  },
  /** From the brand graphic "To empower innovation · Since 2024". */
  mission: "To empower innovation",
  founder: {
    name: "Ajayi Damilare Elijah",
    knownAs: "Snoz",
    artist: "ajayi-elijah-snoz",
  },
} as const;

export const NAV = [
  { label: "Work", href: "/projects" },
  { label: "Artists", href: "/artists" },
  { label: "Exhibitions", href: "/exhibitions" },
  { label: "Journal", href: "/journal" },
  { label: "Archive", href: "/archive" },
  { label: "About", href: "/about" },
] as const;

export const RELATIONSHIP_LABEL = {
  techart: "TechArt Venture",
  founder: "Founder's exhibition",
  related: "Founder-led initiative",
  partner: "Partner",
} as const;

export const STATUS_LABEL = {
  completed: "Completed",
  ongoing: "Ongoing",
  planning: "In planning",
  proposed: "Proposed",
} as const;

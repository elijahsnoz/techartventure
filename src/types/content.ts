/**
 * The TechArt Venture content model.
 *
 * Every record is linked by id, never by copying, so one photograph can belong
 * to an event, an exhibition, an artist, a project and a story at once:
 *
 *   PHOTO → EVENT → EXHIBITION → ARTIST → PROJECT → JOURNAL STORY
 *
 * These shapes are deliberately CMS-neutral: flat fields, string ids, ISO
 * dates. Moving to Sanity, Supabase or Turso means reimplementing
 * src/lib/content.ts against the same types, not rewriting pages.
 */

/**
 * How a record relates to TechArt Venture. Shown on the site, so a visitor can
 * always tell what the company did from what it is connected to.
 */
export type Relationship =
  /** Produced or run by TechArt Venture. */
  | "techart"
  /** The founder's own artistic work, presented here with his authorship intact. */
  | "founder"
  /** An initiative the founder leads outside TechArt Venture. */
  | "related"
  /** Someone else's event that TechArt Venture took part in or supported. */
  | "partner";

export type Status = "completed" | "ongoing" | "planning" | "proposed";

/** An ISO date, or a partial one ("2024", "2024-08") when only that much is known. */
export type PartialDate = string;

export type MediaCategory =
  | "artists"
  | "artworks"
  | "exhibitions"
  | "events"
  | "projects"
  | "people"
  | "behind-the-scenes";

export type Media = {
  id: string;
  /** Describes what is visible. Required: every image on the site has real alt text. */
  alt: string;
  title?: string;
  caption?: string;
  category: MediaCategory;
  date?: PartialDate;
  location?: string;
  /** Links, by id. */
  artists?: readonly string[];
  exhibition?: string;
  project?: string;
  /** A named occasion, for grouping in the archive ("NIFAFEST 2025"). */
  event?: string;
  featured?: boolean;
  /** Who made the photograph, when known. */
  credit?: string;
  /** "contain" for images that must be seen whole, such as catalogue spreads. */
  fit?: "cover" | "contain";
};

export type Video = {
  id: string;
  title: string;
  caption?: string;
  date?: PartialDate;
  location?: string;
  exhibition?: string;
  project?: string;
  event?: string;
};

export type Artwork = {
  id: string;
  title: string;
  translation?: string;
  year?: string;
  dimensions?: string;
  medium?: string;
  note?: string;
  artist: string;
  image?: string;
  exhibition?: string;
};

export type Link = { label: string; href: string };

export type Artist = {
  slug: string;
  name: string;
  /** The name they are known by, if different. */
  knownAs?: string;
  discipline: string;
  location?: string;
  portrait?: string;
  /** One or two sentences for listings. */
  summary: string;
  /** Paragraphs. */
  biography: readonly string[];
  links?: Link[];
  /** Founder, member, featured artist… */
  role?: string;
};

export type Credit = { name: string; role: string };

export type Exhibition = {
  slug: string;
  title: string;
  translation?: string;
  kind: string;
  relationship: Relationship;
  status: Status;
  start?: PartialDate;
  end?: PartialDate;
  venue?: string;
  city?: string;
  summary: string;
  body: readonly string[];
  artists: readonly string[];
  credits?: Credit[];
  partners?: readonly string[];
  cover?: string;
  gallery?: readonly string[];
  works?: readonly string[];
  /** Films hosted by TechArt Venture, by id. */
  videos?: readonly string[];
  youtube?: { id: string; title: string };
  projects?: readonly string[];
  /** Where the facts on the page come from. */
  source?: string;
};

export type ProjectCategory =
  | "Art & Technology"
  | "Environmental"
  | "Education"
  | "Community"
  | "Creative Technology"
  | "Cultural";

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  relationship: Relationship;
  /** Left out when the source does not say. */
  status?: Status;
  year?: string;
  location?: string;
  summary: string;
  body: readonly string[];
  cover?: string;
  gallery?: readonly string[];
  artists?: readonly string[];
  credits?: Credit[];
  links?: Link[];
  videos?: readonly string[];
  source?: string;
};

export type JournalCategory = "Documentation" | "Exhibition Report" | "Announcement" | "Behind the Scenes" | "Interview";

export type JournalEntry = {
  slug: string;
  title: string;
  dek: string;
  /** Left out when the date isn't known. */
  date?: PartialDate;
  category: JournalCategory;
  cover?: string;
  body: readonly string[];
  gallery?: readonly string[];
  videos?: readonly string[];
  artists?: readonly string[];
  projects?: readonly string[];
  exhibitions?: readonly string[];
};

/**
 * The only module that knows where content lives.
 *
 * Pages call these functions from route loaders and never import src/data
 * directly. Today they read local TypeScript; to move to Sanity, Supabase,
 * Turso or Strapi, reimplement this file against the same types. The functions
 * are async already so that switch touches nothing else.
 */
import { ARTISTS } from "../data/artists";
import { ARTWORKS } from "../data/artworks";
import { EXHIBITIONS } from "../data/exhibitions";
import { JOURNAL } from "../data/journal";
import { MEDIA } from "../data/media";
import { PROJECTS } from "../data/projects";
import { TIMELINE } from "../data/timeline";
import { VIDEOS } from "../data/videos";
import GENERATED from "../data/media.generated.json";
import VIDEO_FILES from "../data/video.generated.json";
import type { Artist, Artwork, Exhibition, JournalEntry, Media, Project, Video } from "../types/content";

type Derivative = { width: number; height: number; widths: number[]; lqip: string };
const DERIVATIVES = GENERATED as Record<string, Derivative>;

/** A media record joined with its generated derivatives: everything <Picture> needs. */
export type Image = Media & Derivative & { srcset: string; src: string };

const mediaById = new Map(MEDIA.map((m) => [m.id, m]));

export function image(id: string | undefined): Image | undefined {
  if (!id) return undefined;
  const media = mediaById.get(id);
  const derived = DERIVATIVES[id];
  if (!media || !derived) {
    if (import.meta.env.DEV) console.warn(`[content] no ${media ? "derivatives" : "media record"} for image "${id}"`);
    return undefined;
  }
  const srcset = derived.widths.map((w) => `/media/${id}-${w}.webp ${w}w`).join(", ");
  const largest = derived.widths[derived.widths.length - 1];
  return { ...media, ...derived, srcset, src: `/media/${id}-${largest}.webp` };
}

export const images = (ids: readonly string[] = []) => ids.map(image).filter((i): i is Image => !!i);

/** A video record joined with its encoded file. */
export type Film = Video & { src: string; poster: string; width: number; height: number; duration: number };
const FILES = VIDEO_FILES as Record<string, { src: string; poster: string; width: number; height: number; duration: number }>;

export function film(id: string): Film | undefined {
  const v = VIDEOS.find((x) => x.id === id);
  return v && FILES[id] ? { ...v, ...FILES[id] } : undefined;
}
export const films = (ids: readonly string[] = []) => ids.map(film).filter((f): f is Film => !!f);

/* ── collections ─────────────────────────────────────────────────────────── */

/** Newest first; undated records sink to the end. */
const byDateDesc = <T extends { date?: string }>(a: T, b: T) => (b.date ?? "").localeCompare(a.date ?? "");

export async function getArtists(): Promise<Artist[]> {
  return ARTISTS;
}
export async function getArtist(slug: string) {
  return ARTISTS.find((a) => a.slug === slug);
}

export async function getExhibitions(): Promise<Exhibition[]> {
  return [...EXHIBITIONS].sort((a, b) => (b.start ?? "").localeCompare(a.start ?? ""));
}
export async function getExhibition(slug: string) {
  return EXHIBITIONS.find((e) => e.slug === slug);
}

export async function getProjects(): Promise<Project[]> {
  return PROJECTS;
}
export async function getProject(slug: string) {
  return PROJECTS.find((p) => p.slug === slug);
}

export async function getJournal(): Promise<JournalEntry[]> {
  return [...JOURNAL].sort(byDateDesc);
}
export async function getJournalEntry(slug: string) {
  return JOURNAL.find((j) => j.slug === slug);
}

export async function getArtworks(filter?: { artist?: string; exhibition?: string }): Promise<Artwork[]> {
  return ARTWORKS.filter(
    (w) => (!filter?.artist || w.artist === filter.artist) && (!filter?.exhibition || w.exhibition === filter.exhibition),
  );
}

export async function getMedia(): Promise<Image[]> {
  return images(MEDIA.map((m) => m.id));
}

export async function getFilms(): Promise<Film[]> {
  return films(VIDEOS.map((v) => v.id));
}

export async function getTimeline() {
  return [...TIMELINE].sort((a, b) => a.date.localeCompare(b.date));
}

/** Everything that points at an artist, a project or an exhibition. */
export async function getRelated(ref: { artist?: string; project?: string; exhibition?: string }) {
  const { artist, project, exhibition } = ref;
  return {
    exhibitions: EXHIBITIONS.filter((e) => (artist && e.artists.includes(artist)) || (project && e.projects?.includes(project))),
    projects: PROJECTS.filter((p) => artist && p.artists?.includes(artist)),
    journal: [...JOURNAL]
      .filter(
        (j) =>
          (artist && j.artists?.includes(artist)) ||
          (project && j.projects?.includes(project)) ||
          (exhibition && j.exhibitions?.includes(exhibition)),
      )
      .sort(byDateDesc),
  };
}

/* ── lookups for display ─────────────────────────────────────────────────── */

export const artistName = (slug: string) => ARTISTS.find((a) => a.slug === slug)?.name ?? slug;
export const exhibitionTitle = (slug: string) => EXHIBITIONS.find((e) => e.slug === slug)?.title ?? slug;
export const projectTitle = (slug: string) => PROJECTS.find((p) => p.slug === slug)?.title ?? slug;

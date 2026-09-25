import { useMemo, useState } from "react";
import { useLoaderData, useSearchParams } from "react-router";
import { Film } from "../components/media/Film";
import { Lightbox } from "../components/media/Lightbox";
import { Block, PageIntro } from "../components/page";
import { Picture } from "../components/Picture";
import { Seo } from "../components/Seo";
import { exhibitionTitle, getFilms, getMedia, projectTitle, type Image } from "../lib/content";
import { formatDate, year } from "../lib/format";
import type { MediaCategory } from "../types/content";

export async function loader() {
  const [media, films] = await Promise.all([getMedia(), getFilms()]);
  // Newest first; undated photographs keep their place at the end.
  media.sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
  return { media, films };
}

const CATEGORIES: { key: MediaCategory; label: string }[] = [
  { key: "artists", label: "Artists" },
  { key: "artworks", label: "Artworks" },
  { key: "exhibitions", label: "Exhibitions" },
  { key: "events", label: "Events" },
  { key: "projects", label: "Projects" },
  { key: "people", label: "People" },
  { key: "behind-the-scenes", label: "Behind the scenes" },
];

/** The occasion a photograph belongs to, for its label in the grid. */
const occasion = (m: Image) =>
  m.event ?? (m.exhibition ? exhibitionTitle(m.exhibition) : m.project ? projectTitle(m.project) : undefined);

export function Component() {
  const { media, films } = useLoaderData<typeof loader>();
  const [params, setParams] = useSearchParams();
  const active = params.get("c") as MediaCategory | null;
  const [open, setOpen] = useState<number | null>(null);

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const m of media) c[m.category] = (c[m.category] ?? 0) + 1;
    return c;
  }, [media]);
  const shown = active ? media.filter((m) => m.category === active) : media;

  return (
    <>
      <Seo
        title="Archive"
        description="The TechArt Venture media archive: photographs of artists, artworks, exhibitions, events and projects, with dates, places and people."
      />
      <PageIntro
        eyebrow={`Archive · ${media.length} photographs · ${films.length} films`}
        title="A record of the work, kept in full."
        lede="Every photograph is dated, placed and linked to the artist, exhibition, event or project it belongs to. Open any image to see its record."
      />

      <nav aria-label="Filter the archive" className="gutter sticky top-16 z-30 -mt-4 mb-10 bg-paper/95 backdrop-blur-sm md:top-20 md:mb-14">
        <ul className="-mx-4 flex overflow-x-auto border-b border-rule px-4 md:mx-0 md:px-0">
          {[{ key: null, label: "All" }, ...CATEGORIES].map((c) => {
            const on = active === c.key;
            const n = c.key ? counts[c.key] ?? 0 : media.length;
            if (!n) return null;
            return (
              <li key={c.label} className="shrink-0">
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => setParams(c.key ? { c: c.key } : {}, { preventScrollReset: true })}
                  className={`eyebrow -mb-px mr-5 border-b-2 py-3.5 transition-colors ${on ? "border-ink text-ink" : "border-transparent text-stone-dark hover:text-ink"}`}
                >
                  {c.label} <span className="tabular-nums text-stone">{n}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <ul className="gutter columns-2 gap-2 sm:gap-3 md:columns-3 md:gap-4 xl:columns-4">
        {shown.map((m, i) => (
          <li key={m.id} className="mb-2 break-inside-avoid sm:mb-3 md:mb-4">
            <button type="button" onClick={() => setOpen(i)} className="group relative block w-full text-left" aria-label={`Open: ${m.alt}`}>
              <Picture
                image={m}
                sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
                className="w-full"
                style={{ aspectRatio: `${m.width} / ${m.height}` }}
              />
              {/* The record, shown on hover on desktop; always under the image on phones. */}
              <span className="pointer-events-none absolute inset-x-0 bottom-0 hidden translate-y-2 bg-gradient-to-t from-ink/80 to-transparent p-3 pt-10 text-paper opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:block">
                <span className="block text-xs font-semibold">{m.title ?? occasion(m) ?? "TechArt Venture"}</span>
                <span className="block text-[0.7rem] text-paper/75">{[formatDate(m.date), m.location].filter(Boolean).join(" · ")}</span>
              </span>
              <span className="mt-1.5 block text-[0.7rem] leading-tight text-stone-dark md:hidden">
                {[m.title ?? occasion(m), year(m.date)].filter(Boolean).join(" · ")}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <Lightbox images={shown} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />

      {!active && films.length > 0 && (
        <Block label={`Films · ${films.length}`} id="films">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {films.map((f) => <Film key={f.id} film={f} />)}
          </div>
        </Block>
      )}
    </>
  );
}

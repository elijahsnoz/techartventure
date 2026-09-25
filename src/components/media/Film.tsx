import { useState } from "react";
import type { Film as FilmRecord } from "../../lib/content";
import { formatDate } from "../../lib/format";

/**
 * A self-hosted film. Nothing but the poster loads until the visitor presses
 * play, so pages with video stay light on first load.
 */
export function Film({ film, className = "" }: { film: FilmRecord; className?: string }) {
  const meta = [formatDate(film.date), film.location, `${film.duration}s`].filter(Boolean).join(" · ");
  return (
    <figure className={className}>
      <video
        controls
        playsInline
        preload="none"
        poster={film.poster}
        width={film.width}
        height={film.height}
        className="w-full bg-ink"
        style={{ aspectRatio: `${film.width} / ${film.height}` }}
      >
        <source src={film.src} type="video/mp4" />
      </video>
      <figcaption className="mt-3">
        <p className="text-sm font-semibold tracking-tight">{film.title}</p>
        {film.caption && <p className="mt-1 font-serif text-[0.95rem] leading-snug text-ink-soft">{film.caption}</p>}
        <p className="mt-1 text-xs text-stone-dark">{meta}</p>
      </figcaption>
    </figure>
  );
}

/** A YouTube film that loads nothing from YouTube until it's played. */
export function YouTube({ id, title }: { id: string; title: string }) {
  const [play, setPlay] = useState(false);
  return (
    <figure>
      <div className="relative aspect-video w-full overflow-hidden bg-ink">
        {play ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button type="button" onClick={() => setPlay(true)} className="group absolute inset-0" aria-label={`Play: ${title}`}>
            <img
              src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-100"
            />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-paper text-ink transition-transform group-hover:scale-110">▶</span>
            </span>
          </button>
        )}
      </div>
      <figcaption className="mt-3 text-sm font-semibold tracking-tight">{title}</figcaption>
    </figure>
  );
}

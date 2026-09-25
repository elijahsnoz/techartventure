import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { artistName, exhibitionTitle, projectTitle, type Image } from "../../lib/content";
import { formatDate } from "../../lib/format";

type Props = {
  images: Image[];
  /** Index of the open image, or null when closed. */
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
};

/**
 * Full-screen viewer. A native <dialog> gives focus trapping and Escape for
 * free; arrow keys and horizontal swipes move between images.
 */
export function Lightbox({ images, index, onClose, onIndex }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const touchX = useRef<number | null>(null);
  const [loaded, setLoaded] = useState<string | null>(null);
  const open = index !== null;
  const img = open ? images[index] : undefined;

  const go = useCallback(
    (d: number) => index !== null && images.length > 1 && onIndex((index + d + images.length) % images.length),
    [index, images.length, onIndex],
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go]);

  const meta = img
    ? [
        img.event,
        img.exhibition && !img.event ? exhibitionTitle(img.exhibition) : undefined,
        formatDate(img.date),
        img.location,
      ].filter(Boolean)
    : [];

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      aria-label="Image viewer"
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-ink p-0 text-paper backdrop:bg-ink/90"
    >
      {img && (
        <div
          className="flex h-full flex-col"
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <div className="gutter flex h-14 shrink-0 items-center justify-between">
            <p className="eyebrow tabular-nums text-paper/60">
              {index! + 1} / {images.length}
            </p>
            <button type="button" onClick={onClose} className="eyebrow -mr-2 px-2 py-3 hover:text-paper/70" autoFocus>
              Close ✕
            </button>
          </div>

          <div className="relative min-h-0 flex-1">
            <img
              key={img.id}
              src={img.src}
              srcSet={img.srcset}
              sizes="100vw"
              alt={img.alt}
              onLoad={() => setLoaded(img.id)}
              className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-500 ${
                loaded === img.id ? "opacity-100" : "opacity-0"
              }`}
              style={{ backgroundImage: `url(${img.lqip})`, backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}
            />
            {images.length > 1 && (
              <>
                <button type="button" onClick={() => go(-1)} aria-label="Previous image" className="absolute inset-y-0 left-0 hidden w-1/4 cursor-w-resize md:block" />
                <button type="button" onClick={() => go(1)} aria-label="Next image" className="absolute inset-y-0 right-0 hidden w-1/4 cursor-e-resize md:block" />
              </>
            )}
          </div>

          <div className="gutter flex shrink-0 flex-col gap-3 py-4 md:flex-row md:items-end md:justify-between md:py-6">
            <div className="max-w-2xl">
              {(img.title || img.caption) && (
                <p className="font-serif text-lg leading-snug">{img.title ?? img.caption}</p>
              )}
              {img.title && img.caption && <p className="mt-1 text-sm text-paper/70">{img.caption}</p>}
              {meta.length > 0 && <p className="mt-1 text-xs text-paper/55">{meta.join(" · ")}</p>}
              <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs">
                {img.artists?.map((a) => (
                  <Link key={a} to={`/artists/${a}`} onClick={onClose} className="underline underline-offset-4">{artistName(a)}</Link>
                ))}
                {img.exhibition && (
                  <Link to={`/exhibitions/${img.exhibition}`} onClick={onClose} className="underline underline-offset-4">{exhibitionTitle(img.exhibition)}</Link>
                )}
                {img.project && (
                  <Link to={`/projects/${img.project}`} onClick={onClose} className="underline underline-offset-4">{projectTitle(img.project)}</Link>
                )}
              </p>
            </div>
            {images.length > 1 && (
              <div className="flex gap-2">
                <button type="button" onClick={() => go(-1)} className="border border-paper/40 px-4 py-2 text-sm hover:bg-paper hover:text-ink" aria-label="Previous image">←</button>
                <button type="button" onClick={() => go(1)} className="border border-paper/40 px-4 py-2 text-sm hover:bg-paper hover:text-ink" aria-label="Next image">→</button>
              </div>
            )}
          </div>
        </div>
      )}
    </dialog>
  );
}

import { useState } from "react";
import type { Image } from "../../lib/content";
import { Picture } from "../Picture";
import { Lightbox } from "./Lightbox";

type Props = {
  images: Image[];
  /** "masonry" keeps each photograph's shape; "strip" scrolls sideways. */
  layout?: "masonry" | "strip";
  /** Columns at desktop width, for masonry. */
  columns?: 2 | 3 | 4;
  showCaptions?: boolean;
};

const COLS = { 2: "sm:columns-2", 3: "sm:columns-2 lg:columns-3", 4: "sm:columns-2 lg:columns-3 xl:columns-4" };

export function Gallery({ images, layout = "masonry", columns = 3, showCaptions }: Props) {
  const [open, setOpen] = useState<number | null>(null);
  if (!images.length) return null;

  return (
    <>
      {layout === "masonry" ? (
        <ul className={`columns-1 gap-3 md:gap-4 ${COLS[columns]}`}>
          {images.map((img, i) => (
            <li key={img.id} className="mb-3 break-inside-avoid md:mb-4">
              <button type="button" onClick={() => setOpen(i)} className="group block w-full text-left" aria-label={`Open image: ${img.alt}`}>
                <Picture
                  image={img}
                  sizes={`(min-width: 1024px) ${Math.round(100 / columns)}vw, (min-width: 640px) 50vw, 100vw`}
                  className="w-full"
                  style={{ aspectRatio: `${img.width} / ${img.height}` }}
                  imgClassName="transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.025]"
                />
                {showCaptions && (img.title || img.caption) && (
                  <span className="mt-2 block text-xs text-stone-dark">{img.title ?? img.caption}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-4 [scrollbar-width:thin] md:-mx-14 md:gap-4 md:px-14">
          {images.map((img, i) => (
            <li key={img.id} className="shrink-0 snap-start">
              <button type="button" onClick={() => setOpen(i)} aria-label={`Open image: ${img.alt}`} className="block">
                <Picture
                  image={img}
                  sizes="(min-width: 768px) 30vw, 75vw"
                  className="h-[56vh] max-h-[32rem] min-h-72"
                  style={{ aspectRatio: `${img.width} / ${img.height}` }}
                />
              </button>
            </li>
          ))}
        </ul>
      )}
      <Lightbox images={images} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </>
  );
}

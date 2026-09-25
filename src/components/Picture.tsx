import { useState, type CSSProperties } from "react";
import type { Image } from "../lib/content";

type Props = {
  image: Image | undefined;
  /** The `sizes` attribute: how wide the image renders at each breakpoint. */
  sizes: string;
  className?: string;
  imgClassName?: string;
  /** Above-the-fold images load eagerly with high priority. */
  priority?: boolean;
  /** Crop to the container instead of showing the full frame. */
  fit?: "cover" | "contain";
  style?: CSSProperties;
};

/**
 * A responsive, lazily loaded image that never shifts the layout: it reserves
 * the photograph's real aspect ratio and shows a blurred placeholder until the
 * right-sized WebP has arrived.
 */
export function Picture({ image, sizes, className = "", imgClassName = "", priority, fit, style }: Props) {
  const [loaded, setLoaded] = useState(false);
  if (!image) return <div className={`bg-bone ${className}`} style={style} aria-hidden />;
  const mode = fit ?? image.fit ?? "cover";

  return (
    <div
      className={`relative overflow-hidden ${mode === "contain" ? "bg-white" : "bg-bone"} ${className}`}
      style={mode === "contain" ? style : { backgroundImage: `url(${image.lqip})`, backgroundSize: "cover", backgroundPosition: "center", ...style }}
    >
      <img
        src={image.src}
        srcSet={image.srcset}
        sizes={sizes}
        width={image.width}
        height={image.height}
        alt={image.alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        // A cached image can finish before React attaches onLoad, so check on mount too.
        ref={(el) => {
          if (el?.complete && el.naturalWidth > 0) setLoaded(true);
        }}
        onLoad={() => setLoaded(true)}
        className={`h-full w-full transition-opacity duration-700 ${mode === "cover" ? "object-cover" : "object-contain"} ${
          loaded ? "opacity-100" : "opacity-0"
        } ${imgClassName}`}
      />
    </div>
  );
}

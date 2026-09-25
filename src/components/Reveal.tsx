import { useEffect, useRef, type ElementType, type ReactNode, type CSSProperties } from "react";

let observer: IntersectionObserver | undefined;

/** One shared observer for the whole page; each element reveals once. */
function observe(el: Element) {
  if (typeof IntersectionObserver === "undefined") {
    el.setAttribute("data-visible", "");
    return () => {};
  }
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.setAttribute("data-visible", "");
          observer?.unobserve(entry.target);
        }
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
  );
  observer.observe(el);
  return () => observer?.unobserve(el);
}

type Props = {
  children: ReactNode;
  as?: ElementType;
  /** "rise" fades content up; "image" uncovers from the bottom edge. */
  variant?: "rise" | "image";
  delay?: number;
  className?: string;
};

export function Reveal({ children, as: Tag = "div", variant = "rise", delay = 0, className }: Props) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => (ref.current ? observe(ref.current) : undefined), []);
  return (
    <Tag
      ref={ref}
      data-reveal={variant === "image" ? "image" : ""}
      className={className}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}

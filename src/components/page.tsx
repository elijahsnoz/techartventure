import type { ReactNode } from "react";
import { Link } from "react-router";
import type { Credit, Exhibition, JournalEntry, Project } from "../types/content";
import { image } from "../lib/content";
import { formatDate, formatRange, year } from "../lib/format";
import { Picture } from "./Picture";
import { Reveal } from "./Reveal";
import { Provenance, SignalBar } from "./ui";

/** The opening of every index page. */
export function PageIntro({ eyebrow, title, lede, children }: { eyebrow: string; title: ReactNode; lede?: string; children?: ReactNode }) {
  return (
    <header className="gutter pb-12 pt-12 md:pb-20 md:pt-20">
      <p className="eyebrow flex animate-rise items-center gap-3 text-stone-dark">
        <SignalBar className="w-9" />
        {eyebrow}
      </p>
      <h1 className="mt-6 max-w-6xl animate-rise text-display font-bold tracking-[-0.04em] [--rise-delay:100ms]">{title}</h1>
      {lede && <p className="mt-6 max-w-2xl animate-rise font-serif text-lede text-ink-soft [--rise-delay:200ms]">{lede}</p>}
      {children}
    </header>
  );
}

/** A record's key facts as a definition list. Empty rows are dropped. */
export function Facts({ rows, className = "" }: { rows: [string, ReactNode][]; className?: string }) {
  const shown = rows.filter(([, v]) => v !== undefined && v !== null && v !== "" && v !== false);
  if (!shown.length) return null;
  return (
    <dl className={`grid gap-5 text-sm ${className}`}>
      {shown.map(([k, v]) => (
        <div key={k} className="border-t border-rule pt-3">
          <dt className="eyebrow text-stone">{k}</dt>
          <dd className="mt-1 text-ink-soft">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Prose({ paragraphs, lead = true }: { paragraphs: readonly string[]; lead?: boolean }) {
  return (
    <div className="max-w-2xl space-y-5">
      {paragraphs.map((p, i) => (
        <p key={i} className={`font-serif leading-relaxed text-ink-soft ${lead && i === 0 ? "text-lede text-ink" : "text-lg"}`}>
          {p}
        </p>
      ))}
    </div>
  );
}

export function Credits({ credits }: { credits?: Credit[] }) {
  if (!credits?.length) return null;
  return (
    <ul className="grid gap-4 text-sm sm:grid-cols-2">
      {credits.map((c) => (
        <li key={c.name + c.role} className="border-t border-rule pt-3">
          <p className="font-semibold tracking-tight">{c.name}</p>
          <p className="text-stone-dark">{c.role}</p>
        </li>
      ))}
    </ul>
  );
}

export function SourceNote({ source }: { source?: string }) {
  if (!source) return null;
  return (
    <p className="max-w-2xl border-t border-rule pt-4 text-xs leading-relaxed text-stone-dark">
      <span className="eyebrow mr-2 text-stone">Source</span>
      {source}
    </p>
  );
}

/** A labelled band inside a detail page by elijah snoz. */
export function Block({ label, children, id }: { label: string; children: ReactNode; id?: string }) {
  return (
    <section className="gutter mt-20 md:mt-32" aria-labelledby={id}>
      <h2 id={id} className="eyebrow mb-8 border-t border-ink pt-4">{label}</h2>
      {children}
    </section>
  );
}

/* ── cards ─────────────────────────────────────────────────────────────── */

type CardData = { href: string; title: string; kicker: string; meta?: string; cover?: string; summary?: string; provenance?: ReactNode };

export const exhibitionCard = (e: Exhibition): CardData => ({
  href: `/exhibitions/${e.slug}`,
  title: e.title,
  kicker: `${e.kind} · ${year(e.start)}`,
  meta: [e.venue && `${e.venue}, ${e.city}`, formatRange(e.start, e.end)].filter(Boolean).join(" · "),
  cover: e.cover,
  summary: e.summary,
  provenance: <Provenance relationship={e.relationship} status={e.status} />,
});
export const projectCard = (p: Project): CardData => ({
  href: `/projects/${p.slug}`,
  title: p.title,
  kicker: [p.category, p.year].filter(Boolean).join(" · "),
  cover: p.cover,
  summary: p.summary,
  provenance: <Provenance relationship={p.relationship} status={p.status} />,
});
export const journalCard = (j: JournalEntry): CardData => ({
  href: `/journal/${j.slug}`,
  title: j.title,
  kicker: [j.category, formatDate(j.date)].filter(Boolean).join(" · "),
  cover: j.cover,
  summary: j.dek,
});

export function Card({ card, delay = 0 }: { card: CardData; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <Link to={card.href} viewTransition className="group block">
        {card.cover ? (
          <Picture
            image={image(card.cover)}
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
            className="aspect-[4/3]"
            imgClassName="transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex aspect-[4/3] items-end bg-bone p-5">
            <SignalBar className="w-10" />
          </div>
        )}
        <p className="eyebrow mt-4 text-stone-dark">{card.kicker}</p>
        <h3 className="mt-2 text-2xl font-semibold leading-tight tracking-tight group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">
          {card.title}
        </h3>
        {card.meta && <p className="mt-1 text-sm text-stone-dark">{card.meta}</p>}
        {card.provenance && <div className="mt-2">{card.provenance}</div>}
        {card.summary && <p className="mt-3 font-serif text-[1.05rem] leading-snug text-ink-soft">{card.summary}</p>}
      </Link>
    </Reveal>
  );
}

export function CardGrid({ cards }: { cards: CardData[] }) {
  if (!cards.length) return null;
  return (
    <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((c, i) => (
        <Card key={c.href} card={c} delay={(i % 3) * 90} />
      ))}
    </div>
  );
}

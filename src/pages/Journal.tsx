import { Link, useLoaderData, useSearchParams } from "react-router";
import { PageIntro } from "../components/page";
import { Picture } from "../components/Picture";
import { Reveal } from "../components/Reveal";
import { Seo } from "../components/Seo";
import { SignalBar } from "../components/ui";
import { film, getJournal, image } from "../lib/content";
import { formatDate } from "../lib/format";
import type { JournalEntry } from "../types/content";

export async function loader() {
  return { journal: await getJournal() };
}

/** An entry's lead image: its cover, or its first film's poster. */
function Lead({ entry, sizes, className, priority }: { entry: JournalEntry; sizes: string; className: string; priority?: boolean }) {
  const cover = image(entry.cover);
  if (cover) return <Picture image={cover} sizes={sizes} className={className} priority={priority} imgClassName="transition-transform duration-[1.4s] group-hover:scale-[1.03]" />;
  const f = entry.videos?.[0] ? film(entry.videos[0]) : undefined;
  if (f)
    return (
      <div className={`relative overflow-hidden bg-ink ${className}`}>
        <img src={f.poster} alt="" loading="lazy" className="h-full w-full object-cover opacity-90" />
        <span className="eyebrow absolute bottom-4 left-4 bg-paper px-2 py-1 text-ink">Film · {f.duration}s</span>
      </div>
    );
  return (
    <div className={`flex items-end bg-bone p-5 ${className}`}>
      <SignalBar className="w-10" />
    </div>
  );
}

export function Component() {
  const { journal } = useLoaderData<typeof loader>();
  const [params, setParams] = useSearchParams();
  const categories = [...new Set(journal.map((j) => j.category))];
  const active = params.get("category");
  const shown = active ? journal.filter((j) => j.category === active) : journal;
  const [lead, ...rest] = shown;

  return (
    <>
      <Seo title="Journal" description="Stories, event documentation, exhibition reports and announcements from TechArt Venture." />
      <PageIntro
        eyebrow="Journal"
        title="What happened, as it happened."
        lede="Reports, announcements and documentation from the work: exhibitions, festivals, classrooms and the street."
      />

      <nav aria-label="Filter the Journal" className="gutter mb-12 md:mb-16">
        <ul className="-mx-4 flex overflow-x-auto border-b border-rule px-4 md:mx-0 md:px-0">
          {[null, ...categories].map((c) => {
            const on = active === c;
            return (
              <li key={c ?? "all"} className="shrink-0">
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => setParams(c ? { category: c } : {}, { preventScrollReset: true })}
                  className={`eyebrow -mb-px mr-5 border-b-2 py-3 transition-colors ${on ? "border-ink text-ink" : "border-transparent text-stone-dark hover:text-ink"}`}
                >
                  {c ?? "All"}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {lead && (
        <Link to={`/journal/${lead.slug}`} viewTransition className="gutter group grid gap-8 md:grid-cols-12 md:gap-10">
          <Reveal variant="image" className="md:col-span-8">
            <Lead entry={lead} sizes="(min-width: 768px) 66vw, 100vw" className="aspect-[4/3] md:aspect-[16/10]" priority />
          </Reveal>
          <Reveal delay={120} className="flex flex-col justify-end md:col-span-4">
            <p className="eyebrow text-stone-dark">{[lead.category, formatDate(lead.date)].filter(Boolean).join(" · ")}</p>
            <h2 className="mt-3 text-title font-semibold tracking-tight group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">{lead.title}</h2>
            <p className="mt-4 font-serif text-lg leading-snug text-ink-soft">{lead.dek}</p>
          </Reveal>
        </Link>
      )}

      <ul className="gutter mt-16 border-t border-ink md:mt-24">
        {rest.map((j) => (
          <li key={j.slug} className="border-b border-rule">
            <Link to={`/journal/${j.slug}`} viewTransition className="group grid grid-cols-[1fr_6rem] items-center gap-5 py-6 md:grid-cols-12 md:gap-8 md:py-8">
              <p className="eyebrow col-span-2 text-stone-dark md:col-span-3">{[j.category, formatDate(j.date)].filter(Boolean).join(" · ")}</p>
              <div className="md:col-span-6">
                <h3 className="text-xl font-semibold leading-tight tracking-tight md:text-2xl group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">{j.title}</h3>
                <p className="mt-2 hidden font-serif leading-snug text-ink-soft sm:block">{j.dek}</p>
              </div>
              <div className="md:col-span-2 md:col-start-11">
                <Lead entry={j} sizes="160px" className="aspect-square w-24 md:w-full" />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

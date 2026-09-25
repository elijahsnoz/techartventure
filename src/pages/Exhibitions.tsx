import { Link, useLoaderData } from "react-router";
import { PageIntro } from "../components/page";
import { Picture } from "../components/Picture";
import { Reveal } from "../components/Reveal";
import { Seo } from "../components/Seo";
import { Provenance, SignalBar } from "../components/ui";
import { getExhibitions, image } from "../lib/content";
import { formatRange, pad, year } from "../lib/format";

export async function loader() {
  return { exhibitions: await getExhibitions() };
}

export function Component() {
  const { exhibitions } = useLoaderData<typeof loader>();
  return (
    <>
      <Seo
        title="Exhibitions"
        description="The TechArt Venture exhibition archive: exhibitions, festivals and shows in Abuja, with their artists, photographs and film."
      />
      <PageIntro
        eyebrow={`Exhibitions · ${exhibitions.length}`}
        title="An archive of rooms, walls and the people in front of them."
        lede="Every exhibition TechArt Venture has held, taken part in or proposed, newest first. Each one says plainly how it relates to the company."
      />

      <ol className="gutter space-y-20 md:space-y-32">
        {exhibitions.map((e, i) => {
          const cover = image(e.cover);
          return (
            <li key={e.slug}>
              <Link to={`/exhibitions/${e.slug}`} viewTransition className="group block">
                <div className="grid items-end gap-6 md:grid-cols-12 md:gap-10">
                  <Reveal variant="image" className={`md:col-span-8 ${i % 2 ? "md:order-2 md:col-start-5" : ""}`}>
                    {cover ? (
                      <Picture
                        image={cover}
                        sizes="(min-width: 768px) 66vw, 100vw"
                        priority={i === 0}
                        className="aspect-[4/3] md:aspect-[16/10]"
                        imgClassName="transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="flex aspect-[4/3] flex-col justify-between bg-bone p-6 md:aspect-[16/10] md:p-10">
                        <SignalBar className="w-14" />
                        <p className="max-w-md font-serif text-lede italic text-stone-dark">
                          Proposed. No photographs are on record.
                        </p>
                      </div>
                    )}
                  </Reveal>
                  <Reveal delay={120} className={`md:col-span-4 ${i % 2 ? "md:order-1" : ""}`}>
                    <p className="font-display text-display font-semibold tabular-nums text-rule">{year(e.start)}</p>
                    <div className="mt-3"><Provenance relationship={e.relationship} status={e.status} /></div>
                    <h2 className="mt-3 text-title font-semibold tracking-tight group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">
                      {e.title}
                    </h2>
                    {e.translation && <p className="font-serif text-lg italic text-stone-dark">{e.translation}</p>}
                    <p className="mt-3 text-sm text-stone-dark">
                      {[e.kind, e.venue && `${e.venue}, ${e.city}`, formatRange(e.start, e.end)].filter(Boolean).join(" · ")}
                    </p>
                    <p className="mt-4 font-serif text-lg leading-snug text-ink-soft">{e.summary}</p>
                    <p className="eyebrow mt-5 tabular-nums text-stone">
                      {pad(i + 1)} / {pad(exhibitions.length)}
                      {e.gallery?.length ? ` · ${e.gallery.length} photographs` : ""}
                    </p>
                  </Reveal>
                </div>
              </Link>
            </li>
          );
        })}
      </ol>
    </>
  );
}

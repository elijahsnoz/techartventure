import { Link, useLoaderData, type LoaderFunctionArgs } from "react-router";
import { Film, YouTube } from "../components/media/Film";
import { Gallery } from "../components/media/Gallery";
import { Block, CardGrid, Credits, Facts, journalCard, projectCard, Prose, SourceNote } from "../components/page";
import { Picture } from "../components/Picture";
import { Seo } from "../components/Seo";
import { Provenance } from "../components/ui";
import { RELATIONSHIP_LABEL, SITE } from "../data/site";
import { artistName, films, getArtworks, getExhibition, getProject, getRelated, image, images } from "../lib/content";
import { formatRange } from "../lib/format";

export async function loader({ params }: LoaderFunctionArgs) {
  const exhibition = await getExhibition(params.slug!);
  if (!exhibition) throw new Response("Not found", { status: 404 });
  const [works, related, projects] = await Promise.all([
    getArtworks({ exhibition: exhibition.slug }),
    getRelated({ exhibition: exhibition.slug }),
    Promise.all((exhibition.projects ?? []).map(getProject)),
  ]);
  return { exhibition, works, related, projects: projects.filter((p) => !!p) };
}

export function Component() {
  const { exhibition: e, works, related, projects } = useLoaderData<typeof loader>();
  const cover = image(e.cover);
  const workImages = images(works.map((w) => w.image).filter((x): x is string => !!x));
  const gallery = images(e.gallery);
  const videos = films(e.videos);

  return (
    <>
      <Seo
        title={e.translation ? `${e.title} (${e.translation})` : e.title}
        description={e.summary}
        image={cover}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ExhibitionEvent",
          name: e.title,
          description: e.summary,
          startDate: e.start,
          endDate: e.end,
          eventStatus: e.status === "proposed" ? "https://schema.org/EventScheduled" : undefined,
          location: e.venue ? { "@type": "Place", name: e.venue, address: { "@type": "PostalAddress", addressLocality: e.city, addressCountry: "NG" } } : undefined,
          ...(e.relationship === "techart" && { organizer: { "@type": "Organization", name: SITE.name } }),
          performer: e.artists.map((a) => ({ "@type": "Person", name: artistName(a) })),
        }}
      />

      <header className="gutter pt-10 md:pt-16">
        <Link to="/exhibitions" viewTransition className="eyebrow text-stone-dark hover:text-ink">← Exhibitions</Link>
        <div className="mt-8"><Provenance relationship={e.relationship} status={e.status} /></div>
        <h1 className="mt-4 text-mega font-bold tracking-[-0.045em]">{e.title}</h1>
        {e.translation && <p className="mt-3 font-serif text-lede italic text-stone-dark">{e.translation}</p>}
      </header>

      {cover && (
        <figure className="mt-10 md:mt-16">
          <Picture image={cover} sizes="100vw" priority className="aspect-[4/3] w-full md:aspect-[21/9]" imgClassName="animate-settle" />
          <figcaption className="gutter mt-3 text-xs text-stone-dark">{cover.caption ?? cover.alt}</figcaption>
        </figure>
      )}

      <section className="gutter mt-16 grid gap-12 md:mt-24 md:grid-cols-12">
        <div className="md:col-span-7">
          <Prose paragraphs={e.body} />
        </div>
        <aside className="md:col-span-4 md:col-start-9">
          <Facts
            rows={[
              ["Dates", formatRange(e.start, e.end)],
              ["Kind", e.kind],
              ["Venue", e.venue && `${e.venue}, ${e.city}`],
              ["Relationship", RELATIONSHIP_LABEL[e.relationship]],
              [
                "Artists",
                e.artists.length ? (
                  <span key="artists" className="flex flex-col">
                    {e.artists.map((a) => (
                      <Link key={a} to={`/artists/${a}`} className="underline underline-offset-4">{artistName(a)}</Link>
                    ))}
                  </span>
                ) : undefined,
              ],
              ["Partners", e.partners?.join(", ")],
            ]}
          />
        </aside>
      </section>

      {e.credits?.length ? (
        <Block label="Credits" id="credits"><Credits credits={e.credits} /></Block>
      ) : null}

      {gallery.length > 0 && (
        <Block label={`Photographs · ${gallery.length}`} id="photos">
          <Gallery images={gallery} columns={3} />
        </Block>
      )}

      {workImages.length > 0 && (
        <Block label={`Works · ${workImages.length}`} id="works">
          <Gallery images={workImages} columns={4} showCaptions />
        </Block>
      )}

      {(videos.length > 0 || e.youtube) && (
        <Block label="Film" id="film">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {e.youtube && <div className="sm:col-span-2"><YouTube id={e.youtube.id} title={e.youtube.title} /></div>}
            {videos.map((f) => <Film key={f.id} film={f} className="max-w-sm" />)}
          </div>
        </Block>
      )}

      {projects.length > 0 && (
        <Block label="Related projects" id="projects"><CardGrid cards={projects.map(projectCard)} /></Block>
      )}
      {related.journal.length > 0 && (
        <Block label="In the Journal" id="journal"><CardGrid cards={related.journal.map(journalCard)} /></Block>
      )}

      <div className="gutter mt-20"><SourceNote source={e.source} /></div>
    </>
  );
}

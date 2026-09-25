import { Link, useLoaderData, type LoaderFunctionArgs } from "react-router";
import { Film } from "../components/media/Film";
import { Gallery } from "../components/media/Gallery";
import { Block, CardGrid, Credits, Facts, journalCard, Prose, SourceNote } from "../components/page";
import { Picture } from "../components/Picture";
import { Seo } from "../components/Seo";
import { Provenance, SignalBar } from "../components/ui";
import { RELATIONSHIP_LABEL, STATUS_LABEL } from "../data/site";
import { artistName, films, getProject, getRelated, image, images } from "../lib/content";

export async function loader({ params }: LoaderFunctionArgs) {
  const project = await getProject(params.slug!);
  if (!project) throw new Response("Not found", { status: 404 });
  return { project, related: await getRelated({ project: project.slug }) };
}

export function Component() {
  const { project: p, related } = useLoaderData<typeof loader>();
  const cover = image(p.cover);
  const gallery = images(p.gallery);
  const videos = films(p.videos);

  return (
    <>
      <Seo
        title={p.title}
        description={p.summary}
        image={cover}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: p.title,
          description: p.summary,
          dateCreated: p.year,
          genre: p.category,
          creator: p.artists?.map((a) => ({ "@type": "Person", name: artistName(a) })),
        }}
      />

      <header className="gutter pt-10 md:pt-16">
        <Link to="/projects" viewTransition className="eyebrow text-stone-dark hover:text-ink">← Projects</Link>
        <p className="eyebrow mt-8 text-stone">{p.category}</p>
        <div className="mt-2"><Provenance relationship={p.relationship} status={p.status} /></div>
        <h1 className="mt-4 max-w-6xl text-mega font-bold tracking-[-0.045em]">{p.title}</h1>
        <p className="mt-6 max-w-2xl font-serif text-lede text-ink-soft">{p.summary}</p>
      </header>

      {cover ? (
        <figure className="mt-10 md:mt-16">
          <Picture image={cover} sizes="100vw" priority className="aspect-[4/3] w-full md:aspect-[21/9]" />
          <figcaption className="gutter mt-3 text-xs text-stone-dark">{cover.caption ?? cover.alt}</figcaption>
        </figure>
      ) : (
        <div className="gutter mt-12">
          <div className="flex aspect-[21/9] items-end bg-bone p-6 md:p-10"><SignalBar className="w-14" /></div>
        </div>
      )}

      <section className="gutter mt-16 grid gap-12 md:mt-24 md:grid-cols-12">
        <div className="md:col-span-7"><Prose paragraphs={p.body} lead={false} /></div>
        <aside className="md:col-span-4 md:col-start-9">
          <Facts
            rows={[
              ["Category", p.category],
              ["Year", p.year],
              ["Where", p.location],
              ["Status", p.status && STATUS_LABEL[p.status]],
              ["Relationship", RELATIONSHIP_LABEL[p.relationship]],
              [
                "Artists",
                p.artists?.length ? (
                  <span key="artists" className="flex flex-col">
                    {p.artists.map((a) => (
                      <Link key={a} to={`/artists/${a}`} className="underline underline-offset-4">{artistName(a)}</Link>
                    ))}
                  </span>
                ) : undefined,
              ],
            ]}
          />
        </aside>
      </section>

      {p.credits?.length ? <Block label="Credits" id="credits"><Credits credits={p.credits} /></Block> : null}

      {gallery.length > 0 && (
        <Block label={`Photographs · ${gallery.length}`} id="photos"><Gallery images={gallery} columns={3} /></Block>
      )}

      {videos.length > 0 && (
        <Block label="Film" id="film">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((f) => <Film key={f.id} film={f} className="max-w-sm" />)}
          </div>
        </Block>
      )}

      {related.journal.length > 0 && (
        <Block label="In the Journal" id="journal"><CardGrid cards={related.journal.map(journalCard)} /></Block>
      )}

      <div className="gutter mt-20"><SourceNote source={p.source} /></div>
    </>
  );
}

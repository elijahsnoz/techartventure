import { Link, useLoaderData, type LoaderFunctionArgs } from "react-router";
import { Gallery } from "../components/media/Gallery";
import { Block, CardGrid, exhibitionCard, Facts, journalCard, projectCard, Prose } from "../components/page";
import { Picture } from "../components/Picture";
import { Seo } from "../components/Seo";
import { ArrowLink, SignalBar } from "../components/ui";
import { SITE } from "../data/site";
import { getArtist, getArtworks, getRelated, image, images } from "../lib/content";

export async function loader({ params }: LoaderFunctionArgs) {
  const artist = await getArtist(params.slug!);
  if (!artist) throw new Response("Not found", { status: 404 });
  const [works, related] = await Promise.all([getArtworks({ artist: artist.slug }), getRelated({ artist: artist.slug })]);
  return { artist, works, related };
}

export function Component() {
  const { artist, works, related } = useLoaderData<typeof loader>();
  const portrait = image(artist.portrait);
  const workImages = images(works.map((w) => w.image).filter((x): x is string => !!x));

  return (
    <>
      <Seo
        title={artist.name}
        description={artist.summary}
        image={portrait}
        type="profile"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: artist.name,
          alternateName: artist.knownAs,
          jobTitle: artist.discipline,
          description: artist.summary,
          ...(artist.slug === SITE.founder.artist && { worksFor: { "@type": "Organization", name: SITE.name } }),
          sameAs: artist.links?.map((l) => l.href),
        }}
      />

      <header className="gutter grid gap-10 pt-10 md:grid-cols-12 md:pt-16">
        <div className="md:col-span-5">
          <Picture image={portrait} sizes="(min-width: 768px) 40vw, 100vw" priority className="aspect-[4/5]" />
        </div>
        <div className="flex flex-col justify-end md:col-span-6 md:col-start-7">
          <Link to="/artists" viewTransition className="eyebrow text-stone-dark hover:text-ink">← Artists</Link>
          <p className="eyebrow mt-10 flex items-center gap-3 text-stone-dark">
            <SignalBar className="w-9" /> {artist.role ?? "Artist"}
          </p>
          <h1 className="mt-5 text-display font-bold tracking-[-0.04em]">{artist.name}</h1>
          {artist.knownAs && <p className="mt-2 font-serif text-lede italic text-stone-dark">known as {artist.knownAs}</p>}
          <Facts
            className="mt-10 sm:grid-cols-2"
            rows={[
              ["Discipline", artist.discipline],
              ["Based", artist.location],
              [
                "Elsewhere",
                artist.links?.length ? (
                  <span key="links" className="flex flex-wrap gap-3">
                    {artist.links.map((l) => (
                      <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="underline underline-offset-4">{l.label}</a>
                    ))}
                  </span>
                ) : undefined,
              ],
            ]}
          />
        </div>
      </header>

      <Block label="Biography" id="bio">
        <Prose paragraphs={artist.biography} />
      </Block>

      {workImages.length > 0 && (
        <Block label={`Selected works · ${workImages.length}`} id="works">
          <Gallery images={workImages} columns={3} showCaptions />
        </Block>
      )}

      {related.exhibitions.length > 0 && (
        <Block label="Exhibitions" id="exhibitions">
          <CardGrid cards={related.exhibitions.map(exhibitionCard)} />
        </Block>
      )}

      {related.projects.length > 0 && (
        <Block label="Projects" id="projects">
          <CardGrid cards={related.projects.map(projectCard)} />
        </Block>
      )}

      {related.journal.length > 0 && (
        <Block label="In the Journal" id="journal">
          <CardGrid cards={related.journal.map(journalCard)} />
        </Block>
      )}

      <section className="gutter mt-24 md:mt-36">
        <div className="flex flex-col gap-6 border-t border-ink pt-8 md:flex-row md:items-end md:justify-between">
          <p className="max-w-xl text-title font-semibold tracking-tight">Interested in {artist.knownAs ?? artist.name}'s work?</p>
          <ArrowLink to={`/contact?path=collectors&artist=${artist.slug}`}>Make an inquiry</ArrowLink>
        </div>
      </section>
    </>
  );
}

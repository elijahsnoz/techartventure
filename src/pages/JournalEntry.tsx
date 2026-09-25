import { Link, useLoaderData, type LoaderFunctionArgs } from "react-router";
import { Film } from "../components/media/Film";
import { Gallery } from "../components/media/Gallery";
import { Block, CardGrid, exhibitionCard, projectCard, Prose } from "../components/page";
import { Picture } from "../components/Picture";
import { Seo } from "../components/Seo";
import { SITE } from "../data/site";
import { artistName, films, getExhibition, getJournalEntry, getProject, image, images } from "../lib/content";
import { formatDate } from "../lib/format";

export async function loader({ params }: LoaderFunctionArgs) {
  const entry = await getJournalEntry(params.slug!);
  if (!entry) throw new Response("Not found", { status: 404 });
  const [exhibitions, projects] = await Promise.all([
    Promise.all((entry.exhibitions ?? []).map(getExhibition)),
    Promise.all((entry.projects ?? []).map(getProject)),
  ]);
  return { entry, exhibitions: exhibitions.filter((x) => !!x), projects: projects.filter((x) => !!x) };
}

export function Component() {
  const { entry: j, exhibitions, projects } = useLoaderData<typeof loader>();
  const cover = image(j.cover);
  const gallery = images(j.gallery);
  const videos = films(j.videos);

  return (
    <article>
      <Seo
        title={j.title}
        description={j.dek}
        image={cover}
        type="article"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: j.title,
          description: j.dek,
          datePublished: j.date,
          articleSection: j.category,
          publisher: { "@type": "Organization", name: SITE.name },
        }}
      />

      <header className="gutter mx-auto max-w-5xl pt-10 md:pt-16">
        <Link to="/journal" viewTransition className="eyebrow text-stone-dark hover:text-ink">← Journal</Link>
        <p className="eyebrow mt-10 text-stone-dark">
          {j.category}
          {j.date && <> · <time dateTime={j.date}>{formatDate(j.date)}</time></>}
        </p>
        <h1 className="mt-4 text-display font-bold tracking-[-0.04em]">{j.title}</h1>
        <p className="mt-6 max-w-3xl font-serif text-lede text-ink-soft">{j.dek}</p>
      </header>

      {cover && (
        <figure className="gutter mx-auto mt-12 max-w-6xl md:mt-16">
          <Picture image={cover} sizes="(min-width: 1200px) 1150px, 100vw" priority className="w-full" style={{ aspectRatio: `${cover.width} / ${cover.height}`, maxHeight: "85vh" }} />
          <figcaption className="mt-3 text-xs text-stone-dark">{cover.caption ?? cover.alt}</figcaption>
        </figure>
      )}

      {/* With no cover, the film leads the story. */}
      {!cover && videos[0] && (
        <div className="gutter mx-auto mt-12 max-w-md"><Film film={videos[0]} /></div>
      )}

      <div className="gutter mx-auto mt-14 max-w-5xl md:mt-20">
        <Prose paragraphs={j.body} lead={false} />
        {j.artists?.length ? (
          <p className="mt-10 text-sm text-stone-dark">
            With{" "}
            {j.artists.map((a, i) => (
              <span key={a}>
                {i > 0 && ", "}
                <Link to={`/artists/${a}`} className="text-ink underline underline-offset-4">{artistName(a)}</Link>
              </span>
            ))}
          </p>
        ) : null}
      </div>

      {gallery.length > 0 && (
        <Block label={`Photographs · ${gallery.length}`} id="photos"><Gallery images={gallery} columns={3} /></Block>
      )}

      {videos.length > (cover ? 0 : 1) && (
        <Block label="Film" id="film">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {videos.slice(cover ? 0 : 1).map((f) => <Film key={f.id} film={f} className="max-w-sm" />)}
          </div>
        </Block>
      )}

      {(exhibitions.length > 0 || projects.length > 0) && (
        <Block label="Related" id="related">
          <CardGrid cards={[...exhibitions.map(exhibitionCard), ...projects.map(projectCard)]} />
        </Block>
      )}
    </article>
  );
}

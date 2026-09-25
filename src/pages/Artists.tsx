import { Link, useLoaderData } from "react-router";
import { PageIntro } from "../components/page";
import { Picture } from "../components/Picture";
import { Reveal } from "../components/Reveal";
import { Seo } from "../components/Seo";
import { ArrowLink } from "../components/ui";
import { getArtists, image } from "../lib/content";

export async function loader() {
  return { artists: await getArtists() };
}

export function Component() {
  const { artists } = useLoaderData<typeof loader>();
  return (
    <>
      <Seo
        title="Artists"
        description="Artists presented by TechArt Venture: profiles, works and exhibitions, each in the artist's own words."
      />
      <PageIntro
        eyebrow="Artists"
        title="The artists we work with."
        lede="Each artist is presented with their agreement and in their own words: their practice, their works, and the exhibitions and projects they are part of."
      />

      <ul className="gutter grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {artists.map((a, i) => (
          <Reveal as="li" key={a.slug} delay={i * 90}>
            <Link to={`/artists/${a.slug}`} viewTransition className="group block">
              <Picture
                image={image(a.portrait)}
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                className="aspect-[4/5]"
                imgClassName="grayscale transition-[filter,scale] duration-700 group-hover:scale-[1.02] group-hover:grayscale-0"
              />
              <p className="eyebrow mt-4 text-stone-dark">{a.discipline}</p>
              <h2 className="mt-2 text-title font-semibold tracking-tight">{a.name}</h2>
              {a.knownAs && <p className="font-serif text-lg italic text-stone-dark">known as {a.knownAs}</p>}
              {a.role && <p className="mt-2 text-sm text-ink-soft">{a.role}</p>}
            </Link>
          </Reveal>
        ))}

        {/* The directory grows one artist at a time; this says how to join it. */}
        <Reveal as="li" delay={artists.length * 90} className="flex">
          <div className="flex w-full flex-col justify-between border border-dashed border-rule p-6 md:p-8">
            <div>
              <p className="eyebrow text-stone-dark">Join the network</p>
              <p className="mt-4 font-serif text-lede leading-snug">
                Are you an artist who wants to exhibit, collaborate or build a project with technology?
              </p>
            </div>
            <ArrowLink to="/contact?path=artists" className="mt-10">Introduce your work</ArrowLink>
          </div>
        </Reveal>
      </ul>
    </>
  );
}

import type { CSSProperties } from "react";
import { Link, useLoaderData } from "react-router";
import { Picture } from "../components/Picture";
import { Reveal } from "../components/Reveal";
import { Seo } from "../components/Seo";
import { ArrowLink, Provenance, SectionHead, SignalBar } from "../components/ui";
import { SITE } from "../data/site";
import { getArtists, getExhibitions, getJournal, getProjects, image } from "../lib/content";
import { formatDate, formatRange, pad, year } from "../lib/format";

export async function loader() {
  const [projects, exhibitions, journal, artists] = await Promise.all([
    getProjects(),
    getExhibitions(),
    getJournal(),
    getArtists(),
  ]);
  return { projects, exhibitions, journal, artists };
}

/** The work shown first, in this order. `image` overrides the record's cover here only. */
const SELECTED: readonly { kind: "exhibition" | "project"; slug: string; image?: string }[] = [
  { kind: "exhibition", slug: "transcorp-2025" },
  { kind: "project", slug: "palmpay" },
  { kind: "exhibition", slug: "nifafest-2025", image: "nf-group" },
  { kind: "exhibition", slug: "ipadabo-the-return", image: "ipa-gallery-05" },
  { kind: "project", slug: "do-hard-things" },
  { kind: "project", slug: "techart-institute" },
];

export function Component() {
  const { projects, exhibitions, journal, artists } = useLoaderData<typeof loader>();

  const selected = SELECTED.map((s) => {
    if (s.kind === "exhibition") {
      const e = exhibitions.find((x) => x.slug === s.slug)!;
      return {
        href: `/exhibitions/${e.slug}`,
        title: e.title,
        subtitle: e.translation,
        meta: [e.kind, e.venue && `${e.venue}, ${e.city}`, formatRange(e.start, e.end)].filter(Boolean).join(" · "),
        summary: e.summary,
        relationship: e.relationship,
        status: e.status,
        cover: s.image ?? e.cover,
      };
    }
    const p = projects.find((x) => x.slug === s.slug)!;
    return {
      href: `/projects/${p.slug}`,
      title: p.title,
      subtitle: undefined,
      meta: [p.category, p.location, p.year].filter(Boolean).join(" · "),
      summary: p.summary,
      relationship: p.relationship,
      status: p.status,
      cover: s.image ?? p.cover,
    };
  });

  const founder = artists.find((a) => a.slug === SITE.founder.artist);
  const otherProjects = projects.filter((p) => !SELECTED.some((s) => s.slug === p.slug));
  const [lead, ...moreJournal] = journal;

  return (
    <>
      <Seo
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: SITE.name,
          slogan: SITE.tagline,
          description: SITE.statement,
          foundingDate: SITE.origin.year,
          founder: { "@type": "Person", name: SITE.founder.name, alternateName: SITE.founder.knownAs },
          address: { "@type": "PostalAddress", addressLocality: "Abuja", addressCountry: "NG" },
          ...(SITE.url && { url: SITE.url, logo: `${SITE.url}/brand/techart-logo.png` }),
        }}
      />

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="gutter pt-10 md:pt-16" aria-labelledby="hero-title">
        <p className="eyebrow flex animate-rise items-center gap-3 text-stone-dark">
          <SignalBar className="w-9" />
          {SITE.name} · {SITE.city}
        </p>
        <h1 id="hero-title" className="mt-6 text-mega font-bold tracking-[-0.045em] md:mt-8">
          {[
            ["Art", "text-signal-red"],
            ["Technology", "text-signal-blue"],
            ["People", "text-signal-green"],
            ["Possibility", "text-ink"],
          ].map(([word, dot], i) => (
            <span
              key={word}
              className="inline-block animate-rise pr-[0.18em]"
              style={{ "--rise-delay": `${120 + i * 110}ms` } as CSSProperties}
            >
              {word}
              <span className={dot}>.</span>
            </span>
          ))}
        </h1>
        <div className="mt-8 grid gap-6 md:mt-12 md:grid-cols-12">
          <p
            className="animate-rise font-serif text-lede text-ink-soft md:col-span-7 lg:col-span-6"
            style={{ "--rise-delay": "600ms" } as CSSProperties}
          >
            {SITE.statement}
          </p>
          <div
            className="flex animate-rise items-end gap-6 md:col-span-4 md:col-start-9 md:justify-end"
            style={{ "--rise-delay": "700ms" } as CSSProperties}
          >
            <ArrowLink to="/projects">See the work</ArrowLink>
            <ArrowLink to="/contact">Work with us</ArrowLink>
          </div>
        </div>
      </section>

      <figure className="mt-12 md:mt-20">
        <div className="overflow-hidden">
          <Picture
            image={image("nf-fashion-exchange")}
            sizes="100vw"
            priority
            className="aspect-[4/3] w-full sm:aspect-[16/9] lg:aspect-[21/9]"
            imgClassName="animate-settle object-[50%_30%]"
          />
        </div>
        <figcaption className="gutter mt-3 flex justify-between text-xs text-stone-dark">
          <span>Nigeria International Fashion Festival, with TechArt Venture on the backdrop</span>
          <span>2025</span>
        </figcaption>
      </figure>

      {/* ── Who we are, in one breath ──────────────────────────────────── */}
      <section className="gutter mt-24 grid gap-10 md:mt-40 md:grid-cols-12" aria-label="About TechArt Venture">
        <Reveal className="md:col-span-7">
          <p className="text-title font-medium tracking-tight">
            We started in 2024 as a group of ALX learners in Abuja who wanted to tell a story with art and technology
            together. Today we develop projects, programmes and exhibitions with artists, and document the work as it happens.
          </p>
        </Reveal>
        <Reveal as="dl" delay={120} className="grid content-end gap-6 text-sm md:col-span-4 md:col-start-9">
          {[
            ["Began", `${SITE.origin.year}, as the ${SITE.origin.name}`],
            ["Registered", `${formatDate(SITE.registration.date)}, ${SITE.registration.body}`],
            ["Based", SITE.city],
          ].map(([k, v]) => (
            <div key={k} className="border-t border-rule pt-3">
              <dt className="eyebrow text-stone">{k}</dt>
              <dd className="mt-1 text-ink-soft">{v}</dd>
            </div>
          ))}
        </Reveal>
      </section>

      {/* ── Selected work ──────────────────────────────────────────────── */}
      <section className="gutter mt-28 md:mt-44" aria-labelledby="selected-title">
        <SectionHead index="01" label="Selected work" action={{ href: "/projects", label: "All work" }} />
        <h2 id="selected-title" className="sr-only">Selected work</h2>
        <ol className="space-y-24 md:space-y-40">
          {selected.map((w, i) => {
            const flip = i % 2 === 1;
            return (
              <li key={w.href}>
                <Link to={w.href} viewTransition className="group grid items-end gap-6 md:grid-cols-12 md:gap-10">
                  <Reveal
                    variant="image"
                    className={`md:col-span-7 ${flip ? "md:order-2 md:col-start-6" : ""}`}
                  >
                    <Picture
                      image={image(w.cover)}
                      sizes="(min-width: 768px) 58vw, 100vw"
                      className="aspect-[4/5] sm:aspect-[4/3]"
                      imgClassName="transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
                    />
                  </Reveal>
                  <Reveal delay={150} className={`md:col-span-5 ${flip ? "md:order-1 md:col-span-4 md:col-start-1" : "md:col-span-4 md:col-start-9"}`}>
                    <p className="font-display text-display font-semibold tabular-nums text-rule">{pad(i + 1)}</p>
                    <div className="mt-4">
                      <Provenance relationship={w.relationship} status={w.status} />
                    </div>
                    <h3 className="mt-3 text-title font-semibold tracking-tight">
                      {w.title}
                      {w.subtitle && <span className="block font-serif text-lede font-normal italic text-stone-dark">{w.subtitle}</span>}
                    </h3>
                    <p className="mt-2 text-sm text-stone-dark">{w.meta}</p>
                    <p className="mt-5 max-w-md font-serif text-lg leading-snug text-ink-soft">{w.summary}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
                      View <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                    </span>
                  </Reveal>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>

      {/* ── Artists ────────────────────────────────────────────────────── */}
      {founder && (
        <section className="mt-28 bg-ink py-20 text-paper md:mt-44 md:py-32" aria-labelledby="artists-title">
          <div className="gutter">
            <div className="flex items-center justify-between gap-6 border-t border-paper/40 pt-4">
              <p className="eyebrow flex items-center gap-3">
                <span className="tabular-nums text-paper/50">02</span> Artists
              </p>
              <Link to="/artists" viewTransition className="text-sm font-semibold hover:underline">
                Artist directory →
              </Link>
            </div>
            <div className="mt-12 grid gap-10 md:mt-20 md:grid-cols-12">
              <Reveal variant="image" className="md:col-span-5">
                <Picture image={image(founder.portrait)} sizes="(min-width: 768px) 40vw, 100vw" className="aspect-[4/5]" />
              </Reveal>
              <Reveal delay={150} className="flex flex-col justify-end md:col-span-6 md:col-start-7">
                <p className="eyebrow text-paper/60">{founder.role}</p>
                <h2 id="artists-title" className="mt-4 text-display font-semibold tracking-tight">
                  {founder.name}
                  {founder.knownAs && <span className="block font-serif text-lede font-normal italic text-paper/70">known as {founder.knownAs}</span>}
                </h2>
                <p className="mt-2 text-sm text-paper/60">{[founder.discipline, founder.location].join(" · ")}</p>
                <p className="mt-8 max-w-lg font-serif text-lede text-paper/85">{founder.summary}</p>
                <Link
                  to={`/artists/${founder.slug}`}
                  viewTransition
                  className="mt-8 self-start border border-paper/60 px-5 py-3 text-sm font-semibold transition-colors hover:bg-paper hover:text-ink"
                >
                  View profile
                </Link>
                <p className="mt-14 max-w-md border-t border-paper/20 pt-6 text-sm leading-relaxed text-paper/65">
                  The artist network is growing one artist at a time, and each one is presented in their own words.{" "}
                  <Link to="/contact?path=artists" className="text-paper underline underline-offset-4">
                    Artists can get in touch here.
                  </Link>
                </p>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* ── Exhibitions ────────────────────────────────────────────────── */}
      <section className="gutter mt-28 md:mt-44" aria-labelledby="exhibitions-title">
        <SectionHead index="03" label="Exhibitions" action={{ href: "/exhibitions", label: "Exhibition archive" }} />
        <h2 id="exhibitions-title" className="sr-only">Exhibitions</h2>
        <ul className="border-t border-rule">
          {exhibitions.map((e) => (
            <li key={e.slug} className="border-b border-rule">
              <Link
                to={`/exhibitions/${e.slug}`}
                viewTransition
                className="group grid grid-cols-[4.5rem_1fr] items-center gap-x-4 gap-y-3 py-6 md:grid-cols-12 md:gap-8 md:py-8"
              >
                <span className="text-sm tabular-nums text-stone-dark md:col-span-1">{year(e.start)}</span>
                <span className="md:col-span-5">
                  <span className="block text-title font-semibold tracking-tight transition-transform duration-500 group-hover:translate-x-2">
                    {e.title}
                  </span>
                  {e.translation && <span className="font-serif text-lg italic text-stone-dark">{e.translation}</span>}
                </span>
                <span className="col-start-2 text-sm text-stone-dark md:col-span-3 md:col-start-auto">
                  {[e.kind, e.venue && `${e.venue}, ${e.city}`].filter(Boolean).join(" · ")}
                </span>
                <span className="col-start-2 md:col-span-2 md:col-start-auto">
                  <Provenance relationship={e.relationship} status={e.status} />
                </span>
                <span className="col-start-2 md:col-span-1 md:col-start-auto md:justify-self-end">
                  {e.cover ? (
                    <Picture image={image(e.cover)} sizes="96px" className="aspect-square w-20 md:w-24" />
                  ) : (
                    <span className="block aspect-square w-20 border border-dashed border-rule md:w-24" aria-hidden />
                  )}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {/* A horizontal walk through the rooms of the most recent show. */}
        <Reveal className="mt-14">
          <p className="eyebrow mb-4 text-stone-dark">In the room: Ìpadàbọ̀, 2026</p>
          <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-4 [scrollbar-width:thin] md:-mx-14 md:gap-4 md:px-14">
            {["ipa-gallery-03", "ipa-gallery-01", "ipa-gallery-07", "ipa-gallery-13", "ipa-gallery-09", "ipa-gallery-11", "ipa-gallery-02"].map((id) => {
              const img = image(id);
              if (!img) return null;
              return (
                <Picture
                  key={id}
                  image={img}
                  sizes="(min-width: 768px) 30vw, 75vw"
                  className="h-[58vh] max-h-[34rem] min-h-72 shrink-0 snap-start"
                  // Each frame keeps the photograph's own proportions.
                  style={{ aspectRatio: `${img.width} / ${img.height}` }}
                />
              );
            })}
          </div>
        </Reveal>
      </section>

      {/* ── Projects ───────────────────────────────────────────────────── */}
      <section className="gutter mt-28 md:mt-44" aria-labelledby="projects-title">
        <SectionHead
          index="04"
          label="Projects"
          action={{ href: "/projects", label: "All projects" }}
          title={<span id="projects-title">Beyond the gallery: environmental and community work.</span>}
        />
        <div className="grid gap-px bg-rule md:grid-cols-2">
          {otherProjects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 100} className="bg-paper">
              <Link to={`/projects/${p.slug}`} viewTransition className="group flex h-full flex-col gap-6 p-0 py-8 md:p-10">
                {p.cover ? (
                  <Picture image={image(p.cover)} sizes="(min-width: 768px) 45vw, 100vw" className="aspect-[16/10]" imgClassName="transition-transform duration-[1.4s] group-hover:scale-[1.03]" />
                ) : (
                  <div className="flex aspect-[16/10] items-end bg-bone p-6">
                    <p className="font-serif text-lede italic text-stone-dark">{p.status === "planning" ? "In planning." : ""}</p>
                  </div>
                )}
                <div>
                  <p className="eyebrow text-stone">{p.category}</p>
                  <h3 className="mt-2 text-title font-semibold tracking-tight">{p.title}</h3>
                  <div className="mt-2"><Provenance relationship={p.relationship} status={p.status} /></div>
                  <p className="mt-4 font-serif text-lg leading-snug text-ink-soft">{p.summary}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Journal ────────────────────────────────────────────────────── */}
      {lead && (
        <section className="gutter mt-28 md:mt-44" aria-labelledby="journal-title">
          <SectionHead index="05" label="Journal" action={{ href: "/journal", label: "All stories" }} />
          <h2 id="journal-title" className="sr-only">Journal</h2>
          <div className="grid gap-12 md:grid-cols-12">
            <Link to={`/journal/${lead.slug}`} viewTransition className="group md:col-span-7">
              <Reveal variant="image">
                <Picture image={image(lead.cover)} sizes="(min-width: 768px) 58vw, 100vw" className="aspect-[4/3]" imgClassName="transition-transform duration-[1.4s] group-hover:scale-[1.03]" />
              </Reveal>
              <p className="eyebrow mt-5 text-stone-dark">{lead.category} · {formatDate(lead.date)}</p>
              <h3 className="mt-2 text-title font-semibold tracking-tight group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">{lead.title}</h3>
              <p className="mt-3 max-w-xl font-serif text-lg leading-snug text-ink-soft">{lead.dek}</p>
            </Link>
            <ul className="md:col-span-4 md:col-start-9">
              {moreJournal.map((j) => (
                <li key={j.slug} className="border-t border-rule first:border-ink">
                  <Link to={`/journal/${j.slug}`} viewTransition className="group flex gap-4 py-6">
                    <div className="flex-1">
                      <p className="eyebrow text-stone-dark">{j.category} · {formatDate(j.date)}</p>
                      <h3 className="mt-2 text-xl font-semibold leading-tight tracking-tight group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">{j.title}</h3>
                    </div>
                    {j.cover && <Picture image={image(j.cover)} sizes="96px" className="aspect-square w-20 shrink-0" />}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ── Collaboration ──────────────────────────────────────────────── */}
      <section className="gutter mt-28 md:mt-44" aria-labelledby="collab-title">
        <SectionHead
          index="06"
          label="Collaboration"
          title={<span id="collab-title">Three ways to work with TechArt Venture.</span>}
        />
        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {[
            {
              who: "Artists",
              q: "Interested in working with TechArt Venture?",
              a: "Exhibitions, projects and documentation built around your practice and presented in your own words.",
              path: "artists",
            },
            {
              who: "Organisations",
              q: "Developing an exhibition, cultural project or creative technology experience?",
              a: "For institutions, embassies, companies and communities who want to put art to work alongside them.",
              path: "organisations",
            },
            {
              who: "Collectors",
              q: "Interested in an artwork or an artist?",
              a: "Ask about available works, commissions and the artists we present.",
              path: "collectors",
            },
          ].map((c, i) => (
            <Reveal key={c.who} delay={i * 110} className="border-t border-ink pt-5">
              <p className="eyebrow tabular-nums text-stone">{pad(i + 1)}</p>
              <h3 className="mt-6 text-title font-semibold tracking-tight">{c.who}</h3>
              <p className="mt-4 font-serif text-lg italic leading-snug">{c.q}</p>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-stone-dark">{c.a}</p>
              <ArrowLink to={`/contact?path=${c.path}`} className="mt-6">Start a conversation</ArrowLink>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Final call ─────────────────────────────────────────────────── */}
      <section className="gutter mt-32 md:mt-52" aria-labelledby="cta-title">
        <Reveal>
          <SignalBar className="w-16 md:w-24" />
          <h2 id="cta-title" className="mt-8 text-mega font-bold tracking-[-0.045em]">
            Build something
            <br />
            with us.
          </h2>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Link
              to="/contact"
              viewTransition
              className="bg-ink px-7 py-4 text-sm font-semibold text-paper transition-colors hover:bg-ink-soft"
            >
              Start a conversation
            </Link>
            <ArrowLink to="/about">Read our story</ArrowLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}

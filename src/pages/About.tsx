import { Link, useLoaderData } from "react-router";
import { Block, Facts, PageIntro } from "../components/page";
import { Picture } from "../components/Picture";
import { Reveal } from "../components/Reveal";
import { Seo } from "../components/Seo";
import { ArrowLink, SignalBar } from "../components/ui";
import { SITE } from "../data/site";
import { getArtist, getTimeline, image } from "../lib/content";
import { formatDate, pad } from "../lib/format";

export async function loader() {
  const [timeline, founder] = await Promise.all([getTimeline(), getArtist(SITE.founder.artist)]);
  return { timeline, founder };
}

const WHAT_WE_DO = [
  { title: "Exhibitions", body: "We hold and take part in exhibitions, from a hotel lobby at Transcorp to a fashion festival, and we document the rooms we work in." },
  { title: "Art & technology", body: "We make work where the two meet: a collaged continent on welded steel, a canvas built from a fintech's own materials with a QR code on the wall." },
  { title: "Artists", body: "We present artists in their own words, with their works, exhibitions and projects connected in one record." },
  { title: "Education", body: "Through TechArt Institute we take art coaching to children and young people in their communities." },
];

/** Organisations and places in the record, each with the relationship the evidence shows. */
const WORKED_WITH = [
  { name: "PalmPay Nigeria", note: "Collaboration: a canvas made from PalmPay's materials, 2025.", href: "/projects/palmpay" },
  { name: "Nigeria International Fashion Festival", note: "TechArt Venture on the NIFAFEST 2025 backdrop.", href: "/exhibitions/nifafest-2025" },
  { name: "Transcorp Hilton, Abuja", note: "Venue of the April 2025 exhibition.", href: "/exhibitions/transcorp-2025" },
  { name: "ALX", note: "Where it began: the ALX Abuja TechArt Ventures Group, 2024.", href: "/projects/do-hard-things" },
];

export function Component() {
  const { timeline, founder } = useLoaderData<typeof loader>();
  return (
    <>
      <Seo
        title="About"
        description="TechArt Venture began in 2024 as a group of ALX learners in Abuja. It develops creative projects, supports artists and connects art, technology and culture."
      />
      <PageIntro eyebrow="About" title={<>Art. Technology.<br />People. Possibility.</>} lede={SITE.statement} />

      {/* ── Who we are ─────────────────────────────────────────────── */}
      <section className="gutter grid gap-12 md:grid-cols-12">
        <div className="space-y-6 md:col-span-7">
          <p className="text-title font-medium tracking-tight">
            TechArt Venture started in August 2024 as the ALX Abuja TechArt Ventures Group: ALX learners in Abuja who set out to tell a story with art and technology together.
          </p>
          <p className="font-serif text-lg leading-relaxed text-ink-soft">
            Its prototype work was a map of Africa collaged onto canvas over a welded steel frame, titled after ALX's own line, Do Hard Things. In March 2025 the group became a registered business, and since then it has held an exhibition at Transcorp Hilton, collaborated with PalmPay Nigeria, run community art coaching through TechArt Institute, and appeared on the backdrop of the Nigeria International Fashion Festival.
          </p>
          <p className="font-serif text-lg leading-relaxed text-ink-soft">
            We keep the record of all of it here, because work that is documented can be seen, trusted and built on.
          </p>
        </div>
        <aside className="md:col-span-4 md:col-start-9">
          <img src="/brand/techart-since-2024.webp" width={500} height={500} alt="TechArt Venture: To empower innovation. Since 2024." className="w-full max-w-xs bg-white" loading="lazy" />
          <Facts
            className="mt-8"
            rows={[
              ["Mission", SITE.mission],
              ["Since", SITE.origin.year],
              ["Registered", `${SITE.registration.kind}, ${SITE.registration.body}, ${formatDate(SITE.registration.date)} · ${SITE.registration.number}`],
              ["Based", SITE.city],
            ]}
          />
        </aside>
      </section>

      {/* ── What we do ─────────────────────────────────────────────── */}
      <Block label="What we do" id="what">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {WHAT_WE_DO.map((w, i) => (
            <Reveal key={w.title} delay={i * 90} className="border-t border-rule pt-4">
              <p className="eyebrow tabular-nums text-stone">{pad(i + 1)}</p>
              <h3 className="mt-5 text-2xl font-semibold tracking-tight">{w.title}</h3>
              <p className="mt-3 font-serif text-[1.05rem] leading-snug text-ink-soft">{w.body}</p>
            </Reveal>
          ))}
        </div>
      </Block>

      {/* ── Approach ───────────────────────────────────────────────── */}
      <Block label="Our approach" id="approach">
        <div className="grid gap-10 md:grid-cols-3">
          {[
            ["Real work first", "Everything on this site happened, and says where it happened. Where something was only proposed, it says that too."],
            ["Credit where it belongs", "An artist's exhibition stays the artist's. Each record states whether it is TechArt Venture's own work, a partner's event, or the founder's practice."],
            ["Technology that serves the art", "A QR code on a gallery wall, a documented archive, a platform for artists: technology as a way in, not a spectacle."],
          ].map(([t, b]) => (
            <div key={t}>
              <SignalBar className="w-8" />
              <h3 className="mt-5 text-xl font-semibold tracking-tight">{t}</h3>
              <p className="mt-3 font-serif text-lg leading-snug text-ink-soft">{b}</p>
            </div>
          ))}
        </div>
      </Block>

      {/* ── Where we've worked ─────────────────────────────────────── */}
      <Block label="Collaborations and venues" id="partners">
        <ul className="border-t border-rule">
          {WORKED_WITH.map((w) => (
            <li key={w.name} className="border-b border-rule">
              <Link to={w.href} viewTransition className="group grid gap-2 py-5 md:grid-cols-12 md:items-baseline md:gap-8">
                <span className="text-2xl font-semibold tracking-tight md:col-span-5 group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">{w.name}</span>
                <span className="font-serif text-lg text-ink-soft md:col-span-6">{w.note}</span>
                <span aria-hidden className="hidden text-right md:col-span-1 md:block">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </Block>

      {/* ── Timeline ───────────────────────────────────────────────── */}
      <Block label="Timeline" id="timeline">
        <ol className="relative border-l border-ink pl-6 md:pl-10">
          {timeline.map((t, i) => (
            <Reveal as="li" key={t.title + t.date} delay={(i % 4) * 60} className="relative pb-10 last:pb-0">
              <span aria-hidden className="absolute -left-[1.83rem] top-1.5 h-2.5 w-2.5 bg-ink md:-left-[2.83rem]" />
              <p className="eyebrow tabular-nums text-stone-dark">{formatDate(t.date)}</p>
              {t.href ? (
                <Link to={t.href} viewTransition className="mt-1 inline-block text-2xl font-semibold tracking-tight hover:underline hover:decoration-1 hover:underline-offset-4">{t.title}</Link>
              ) : (
                <p className="mt-1 text-2xl font-semibold tracking-tight">{t.title}</p>
              )}
              <p className="mt-1 max-w-xl font-serif text-lg leading-snug text-ink-soft">{t.note}</p>
            </Reveal>
          ))}
        </ol>
      </Block>

      {/* ── Founder ────────────────────────────────────────────────── */}
      {founder && (
        <Block label="Founder" id="founder">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="grid grid-cols-2 gap-3 md:col-span-5">
              <Picture image={image(founder.portrait)} sizes="(min-width: 768px) 20vw, 50vw" className="aspect-[4/5]" />
              <Picture image={image("mn-founder-minister")} sizes="(min-width: 768px) 20vw, 50vw" className="aspect-[4/5]" />
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <h3 className="text-title font-semibold tracking-tight">{founder.name}</h3>
              {founder.knownAs && <p className="font-serif text-lede italic text-stone-dark">known as {founder.knownAs}</p>}
              <p className="mt-6 font-serif text-lg leading-relaxed text-ink-soft">{founder.biography[0]}</p>
              <p className="mt-4 font-serif text-lg leading-relaxed text-ink-soft">{founder.biography[2]}</p>
              <ArrowLink to={`/artists/${founder.slug}`} className="mt-8">The founder's artist profile</ArrowLink>
            </div>
          </div>
        </Block>
      )}

      <section className="gutter mt-28 md:mt-40">
        <SignalBar className="w-16" />
        <p className="mt-6 text-display font-bold tracking-[-0.04em]">Build something with us.</p>
        <ArrowLink to="/contact" className="mt-8">Start a conversation</ArrowLink>
      </section>
    </>
  );
}

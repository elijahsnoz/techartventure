import { useState, type FormEvent } from "react";
import { useSearchParams } from "react-router";
import { PageIntro } from "../components/page";
import { Seo } from "../components/Seo";
import { SITE } from "../data/site";
import { artistName } from "../lib/content";

const PATHS = [
  { key: "artists", label: "Artists", q: "Interested in working with TechArt Venture?", hint: "Tell us about your practice, and share a link to your work." },
  { key: "organisations", label: "Organisations", q: "Looking to develop an exhibition, cultural project or creative technology experience?", hint: "Tell us what you have in mind, and when." },
  { key: "collectors", label: "Collectors", q: "Interested in an artwork or an artist?", hint: "Tell us which work or artist, and we'll come back to you." },
] as const;
type PathKey = (typeof PATHS)[number]["key"];

type State = { kind: "idle" } | { kind: "sending" } | { kind: "sent"; via: "form" | "whatsapp" } | { kind: "error" };

export function Component() {
  const [params, setParams] = useSearchParams();
  const artist = params.get("artist");
  const path = (PATHS.find((p) => p.key === params.get("path"))?.key ?? "artists") as PathKey;
  const current = PATHS.find((p) => p.key === path)!;
  const [state, setState] = useState<State>({ kind: "idle" });

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    if (data.company) return; // a filled honeypot means a bot

    const payload = { path: current.label, ...data, artist: artist ? artistName(artist) : undefined };

    // With a form endpoint configured, the message is posted there.
    if (SITE.contact.endpoint) {
      setState({ kind: "sending" });
      try {
        const res = await fetch(SITE.contact.endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        });
        setState(res.ok ? { kind: "sent", via: "form" } : { kind: "error" });
      } catch {
        setState({ kind: "error" });
      }
      return;
    }

    // Otherwise it opens WhatsApp with the message written out.
    const text = [
      `Hello TechArt Venture, this is ${data.name}.`,
      `(${current.label}${data.organisation ? `, ${data.organisation}` : ""}${payload.artist ? `, about ${payload.artist}` : ""})`,
      "",
      data.message,
      "",
      `Email: ${data.email}`,
    ].join("\n");
    window.open(`https://wa.me/${SITE.contact.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    setState({ kind: "sent", via: "whatsapp" });
  }

  const field = "mt-2 w-full border-0 border-b border-ink/40 bg-transparent px-0 py-3 text-lg outline-none transition-colors placeholder:text-stone focus:border-ink focus:ring-0";

  return (
    <>
      <Seo title="Contact" description="Work with TechArt Venture: paths for artists, organisations and collectors." />
      <PageIntro eyebrow="Contact" title="Build something with us." />

      <div className="gutter grid gap-14 md:grid-cols-12">
        {/* ── The three paths ───────────────────────────────────── */}
        <div role="tablist" aria-label="Who is getting in touch" className="md:col-span-5">
          {PATHS.map((p, i) => {
            const on = p.key === path;
            return (
              <button
                key={p.key}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setParams({ path: p.key }, { preventScrollReset: true, replace: true })}
                className={`block w-full border-t py-6 text-left transition-colors ${on ? "border-ink" : "border-rule text-stone-dark hover:text-ink"}`}
              >
                <span className="eyebrow tabular-nums text-stone">{String(i + 1).padStart(2, "0")}</span>
                <span className="mt-2 block text-title font-semibold tracking-tight">{p.label}</span>
                <span className={`mt-2 block font-serif text-lg italic leading-snug ${on ? "text-ink-soft" : ""}`}>{p.q}</span>
              </button>
            );
          })}
        </div>

        {/* ── The form ──────────────────────────────────────────── */}
        <div className="md:col-span-6 md:col-start-7">
          {state.kind === "sent" ? (
            <div role="status" className="border-t border-ink pt-8">
              <p className="text-title font-semibold tracking-tight">Thank you.</p>
              <p className="mt-4 font-serif text-lg text-ink-soft">
                {state.via === "whatsapp"
                  ? "WhatsApp opened in a new tab with your message written out. Press send there and it reaches us."
                  : "Your message has been sent. We'll reply by email."}
              </p>
              <button type="button" onClick={() => setState({ kind: "idle" })} className="mt-8 text-sm font-semibold underline underline-offset-4">
                Write another message
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="border-t border-ink pt-8" aria-describedby="form-hint">
              <p id="form-hint" className="font-serif text-lg text-ink-soft">
                {current.hint}
                {artist && <> About: <strong className="font-semibold text-ink">{artistName(artist)}</strong>.</>}
              </p>
              <div className="mt-8 grid gap-8 sm:grid-cols-2">
                <label className="block">
                  <span className="eyebrow text-stone-dark">Name</span>
                  <input name="name" required autoComplete="name" className={field} />
                </label>
                <label className="block">
                  <span className="eyebrow text-stone-dark">Email</span>
                  <input name="email" type="email" required autoComplete="email" className={field} />
                </label>
                <label className="block sm:col-span-2">
                  <span className="eyebrow text-stone-dark">
                    {path === "organisations" ? "Organisation" : path === "artists" ? "Website or portfolio (optional)" : "Organisation (optional)"}
                  </span>
                  <input name="organisation" required={path === "organisations"} className={field} />
                </label>
                <label className="block sm:col-span-2">
                  <span className="eyebrow text-stone-dark">Message</span>
                  <textarea name="message" required rows={5} className={`${field} resize-y`} />
                </label>
                {/* Hidden from people; bots fill it in. */}
                <input name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <button
                  type="submit"
                  disabled={state.kind === "sending"}
                  className="bg-ink px-7 py-4 text-sm font-semibold text-paper transition-colors hover:bg-ink-soft disabled:opacity-60"
                >
                  {state.kind === "sending" ? "Sending…" : SITE.contact.endpoint ? "Send message" : "Send via WhatsApp"}
                </button>
                {state.kind === "error" && (
                  <p role="alert" className="text-sm text-signal-red">That didn't send. Please try again in a moment.</p>
                )}
              </div>
              {!SITE.contact.endpoint && (
                <p className="mt-4 text-xs text-stone-dark">Sending opens WhatsApp with your message ready to go.</p>
              )}
            </form>
          )}
        </div>
      </div>
    </>
  );
}

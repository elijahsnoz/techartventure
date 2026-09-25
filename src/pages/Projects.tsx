import { useLoaderData, useSearchParams } from "react-router";
import { CardGrid, PageIntro, projectCard } from "../components/page";
import { Seo } from "../components/Seo";
import { getProjects } from "../lib/content";

export async function loader() {
  return { projects: await getProjects() };
}

export function Component() {
  const { projects } = useLoaderData<typeof loader>();
  const [params, setParams] = useSearchParams();
  const categories = [...new Set(projects.map((p) => p.category))];
  const active = params.get("category");
  const shown = active ? projects.filter((p) => p.category === active) : projects;

  return (
    <>
      <Seo
        title="Projects"
        description="TechArt Venture projects: art and technology, education, environmental and community work in Nigeria."
      />
      <PageIntro
        eyebrow={`Projects · ${projects.length}`}
        title="Where art meets technology, classrooms and the street."
        lede="Collaborations, programmes and initiatives, from a canvas made with a fintech to community art coaching for children."
      />

      {/* Category filter: a row of plain text tabs that scrolls on phones. */}
      <nav aria-label="Filter projects by category" className="gutter mb-12 md:mb-16">
        <ul className="-mx-4 flex gap-2 overflow-x-auto border-b border-rule px-4 pb-px md:mx-0 md:px-0">
          {[null, ...categories].map((c) => {
            const on = active === c;
            return (
              <li key={c ?? "all"} className="shrink-0">
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => setParams(c ? { category: c } : {}, { preventScrollReset: true })}
                  className={`eyebrow -mb-px border-b-2 px-1 py-3 mr-4 transition-colors ${
                    on ? "border-ink text-ink" : "border-transparent text-stone-dark hover:text-ink"
                  }`}
                >
                  {c ?? "All"}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="gutter">
        <CardGrid cards={shown.map(projectCard)} />
      </div>
    </>
  );
}

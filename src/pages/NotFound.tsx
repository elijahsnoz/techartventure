import { isRouteErrorResponse, useRouteError } from "react-router";
import { Seo } from "../components/Seo";
import { ArrowLink } from "../components/ui";

export function NotFound() {
  const error = useRouteError();
  const missing = !error || (isRouteErrorResponse(error) && error.status === 404);
  if (!missing) console.error(error);
  return (
    <section className="gutter pb-10 pt-20 md:pt-32">
      <Seo title={missing ? "Not found" : "Something went wrong"} noindex />
      <p className="eyebrow text-stone-dark">{missing ? "404" : "Error"}</p>
      <h1 className="mt-4 text-display font-bold tracking-tight">
        {missing ? "This page isn't in the archive." : "Something went wrong."}
      </h1>
      <ArrowLink to="/" className="mt-10">Back to the homepage</ArrowLink>
    </section>
  );
}

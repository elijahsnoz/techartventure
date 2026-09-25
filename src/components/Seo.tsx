import { useLocation } from "react-router";
import { SITE } from "../data/site";
import type { Image } from "../lib/content";

type Props = {
  title?: string;
  description?: string;
  image?: Image;
  type?: "website" | "article" | "profile";
  /** schema.org JSON-LD for this page. */
  jsonLd?: object;
  noindex?: boolean;
};

/**
 * Per-page metadata. React 19 hoists these tags into <head> on its own.
 *
 * Crawlers that run JavaScript (Google) read them as-is. Link previews on
 * WhatsApp, X and LinkedIn don't run JavaScript, so those depend on the build
 * step that prerenders each route's head — see the README.
 */
export function Seo({ title, description = SITE.statement, image, type = "website", jsonLd, noindex }: Props) {
  const { pathname } = useLocation();
  const fullTitle = title ? `${title} · ${SITE.name}` : `${SITE.name}: ${SITE.tagline}`;
  const url = SITE.url ? `${SITE.url}${pathname}` : undefined;
  const imageUrl = image ? `${SITE.url}${image.src}` : `${SITE.url}/brand/techart-logo.png`;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {url && <link rel="canonical" href={url} />}
      {noindex && <meta name="robots" content="noindex" />}

      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {url && <meta property="og:url" content={url} />}
      <meta property="og:image" content={imageUrl} />
      {image && <meta property="og:image:alt" content={image.alt} />}
      <meta property="og:locale" content="en_NG" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </>
  );
}

# TechArt Venture

The website of TechArt Venture: portfolio, artist network, exhibition archive,
media archive and project showcase. React, Vite, TypeScript, Tailwind CSS v4
and React Router 7.

```sh
npm install
npm run media   # build web images and video from the masters (see below)
npm run dev     # http://localhost:5173
npm run build   # production build in dist/
```

## Where content lives

Everything on the site is data in `src/data/`, linked by id:

| File | Holds |
| --- | --- |
| `site.ts` | Company facts, navigation, contact settings |
| `artists.ts` | Artist profiles |
| `artworks.ts` | Works, linked to an artist and exhibition |
| `exhibitions.ts` | Exhibitions and festivals |
| `projects.ts` | Projects and collaborations |
| `journal.ts` | Stories, reports and announcements |
| `media.ts` | Every photograph: alt text, caption, date, place, links |
| `videos.ts` | Every hosted film |
| `timeline.ts` | The company timeline on /about |

Pages never import these files. They read through `src/lib/content.ts`, so
connecting a CMS or database (Sanity, Supabase, Turso, Strapi) later means
rewriting that one file against the types in `src/types/content.ts`.

Each exhibition and project carries a `relationship`: `techart` (TechArt
Venture's own), `partner`, `founder` (the founder's own artistic work) or
`related` (a founder-led initiative). It also carries a `status`. Both are
shown on the site.

## Adding photographs and video

Master files stay where they are and are never copied into the repo.

1. Add the file to `scripts/media-sources.mjs` (`SOURCES` for photos,
   `VIDEOS` for film) with a short id.
2. Run `npm run media`. It writes WebP images at up to four widths to
   `public/media/`, MP4s with posters to `public/video/`, and their
   dimensions to `src/data/*.generated.json`.
3. Describe it in `src/data/media.ts` or `src/data/videos.ts` with the same id,
   then reference the id from an exhibition, project, artist or story.

HEIC photos need converting first: `sips -s format jpeg IMG.HEIC --out IMG.jpg`.

## Deployment settings

- `VITE_SITE_URL`: the production domain, for canonical URLs and share images.
- `VITE_CONTACT_ENDPOINT`: optional form endpoint. Without it, the contact
  form opens WhatsApp with the message written out.

The site is a single-page app. The host needs to rewrite every path to
`index.html`. Link previews on WhatsApp and X need a prerender step, which
hasn't been added yet.

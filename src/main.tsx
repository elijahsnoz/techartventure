import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Layout } from "./components/layout/Layout";
import { NotFound } from "./pages/NotFound";
import "./index.css";

/**
 * Every page is its own chunk, loaded with its data through a route loader.
 * Clean URLs throughout: /artists/:slug, /exhibitions/:slug, /journal/:slug.
 */

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <NotFound />,
    hydrateFallbackElement: <div className="min-h-screen bg-paper" />,
    children: [
      {
        errorElement: <NotFound />,
        children: [
          { index: true, lazy: () => import("./pages/Home") },
          { path: "artists", lazy: () => import("./pages/Artists") },
          { path: "artists/:slug", lazy: () => import("./pages/ArtistProfile") },
          { path: "exhibitions", lazy: () => import("./pages/Exhibitions") },
          { path: "exhibitions/:slug", lazy: () => import("./pages/ExhibitionDetail") },
          { path: "projects", lazy: () => import("./pages/Projects") },
          { path: "projects/:slug", lazy: () => import("./pages/ProjectDetail") },
          { path: "journal", lazy: () => import("./pages/Journal") },
          { path: "journal/:slug", lazy: () => import("./pages/JournalEntry") },
          { path: "archive", lazy: () => import("./pages/Archive") },
          { path: "about", lazy: () => import("./pages/About") },
          { path: "contact", lazy: () => import("./pages/Contact") },
          { path: "*", element: <NotFound /> },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

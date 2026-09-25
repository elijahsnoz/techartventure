import { Outlet, ScrollRestoration, useNavigation } from "react-router";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function Layout() {
  const navigation = useNavigation();
  return (
    <>
      {/* A thin progress line while the next page's code or data loads. */}
      <div
        aria-hidden
        className={`fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-ink transition-transform duration-700 ${
          navigation.state === "loading" ? "scale-x-75" : "scale-x-0"
        }`}
      />
      <SiteHeader />
      <main id="main">
        <Outlet />
      </main>
      <SiteFooter />
      <ScrollRestoration />
    </>
  );
}

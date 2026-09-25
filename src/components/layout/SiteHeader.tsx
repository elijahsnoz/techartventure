import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { NAV, SITE } from "../../data/site";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <img
      src="/brand/techart-logo.webp"
      width={990}
      height={302}
      alt={SITE.name}
      className={`h-auto select-none ${className}`}
      draggable={false}
    />
  );
}

export function SiteHeader() {
  const { pathname } = useLocation();
  // The menu belongs to the page it was opened on, so navigating closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (next: boolean) => setOpenOn(next ? pathname : null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The mobile menu covers the page, so the page shouldn't scroll behind it.
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenOn(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 transition-[background-color,border-color] duration-500 ${
        scrolled || open ? "border-b border-rule bg-paper/92 backdrop-blur-md" : "border-b border-transparent bg-paper"
      }`}
    >
      <a
        href="#main"
        className="eyebrow sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-ink focus:px-3 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <div className="gutter flex h-16 items-center justify-between md:h-20">
        <Link to="/" viewTransition aria-label={`${SITE.name}, home`} className="relative z-50 -ml-1">
          <Logo className="w-[9.5rem] md:w-[11.5rem]" />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {NAV.map((item) => (
              <li key={item.href}>
                <NavLink
                  to={item.href}
                  viewTransition
                  className={({ isActive }) =>
                    `relative py-2 text-[0.9rem] font-medium tracking-tight transition-colors hover:text-ink ${
                      isActive ? "text-ink" : "text-stone-dark"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      <span
                        aria-hidden
                        className={`absolute inset-x-0 -bottom-0.5 flex h-0.5 origin-left transition-transform duration-500 ${
                          isActive ? "scale-x-100" : "scale-x-0"
                        }`}
                      >
                        <span className="flex-1 bg-signal-red" />
                        <span className="flex-1 bg-signal-blue" />
                        <span className="flex-1 bg-signal-green" />
                      </span>
                    </>
                  )}
                </NavLink>
              </li>
            ))}
            <li>
              <Link
                to="/contact"
                viewTransition
                className="bg-ink px-4 py-2.5 text-[0.85rem] font-semibold tracking-tight text-paper transition-colors hover:bg-ink-soft"
              >
                Work with us
              </Link>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="relative z-50 -mr-2 flex h-11 items-center gap-3 px-2 lg:hidden"
        >
          <span className="eyebrow">{open ? "Close" : "Menu"}</span>
          <span aria-hidden className="relative block h-3 w-6">
            <span className={`absolute left-0 h-0.5 w-6 bg-ink transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 h-0.5 w-6 bg-ink transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
          </span>
        </button>
      </div>

      {/* Mobile: a full-screen index rather than a shrunken desktop bar. */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="gutter fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto bg-paper pb-8 pt-24 lg:hidden"
      >
        <nav aria-label="Mobile">
          <ul className="border-t border-ink">
            {[...NAV, { label: "Contact", href: "/contact" }].map((item, i) => (
              <li key={item.href} className="border-b border-rule">
                <NavLink
                  to={item.href}
                  viewTransition
                  className={({ isActive }) =>
                    `flex items-baseline gap-4 py-4 text-[2.1rem] font-semibold leading-none tracking-tight ${
                      isActive ? "text-ink" : "text-ink-soft"
                    }`
                  }
                >
                  <span className="eyebrow w-6 tabular-nums text-stone">{String(i + 1).padStart(2, "0")}</span>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <p className="mt-10 max-w-xs font-serif text-lg leading-snug text-stone-dark">{SITE.tagline}</p>
      </div>
    </header>
  );
}

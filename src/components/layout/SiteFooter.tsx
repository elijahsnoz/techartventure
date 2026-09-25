import { Link } from "react-router";
import { NAV, SITE } from "../../data/site";
import { SignalBar } from "../ui";
import { Logo } from "./SiteHeader";

export function SiteFooter() {
  return (
    <footer className="gutter mt-24 border-t border-ink bg-bone pb-10 pt-14 md:mt-40">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo className="w-44" />
          <p className="mt-6 max-w-sm font-serif text-lg leading-snug text-ink-soft">{SITE.supporting}</p>
        </div>

        <nav aria-label="Footer" className="md:col-span-3 md:col-start-7">
          <p className="eyebrow mb-4 text-stone">Explore</p>
          <ul className="space-y-2">
            {[...NAV, { label: "Contact", href: "/contact" }].map((item) => (
              <li key={item.href}>
                <Link to={item.href} viewTransition className="text-[0.95rem] hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <p className="eyebrow mb-4 text-stone">Work with us</p>
          <ul className="space-y-2 text-[0.95rem]">
            <li><Link to="/contact?path=artists" className="hover:underline">Artists</Link></li>
            <li><Link to="/contact?path=organisations" className="hover:underline">Organisations</Link></li>
            <li><Link to="/contact?path=collectors" className="hover:underline">Collectors</Link></li>
          </ul>
        </div>
      </div>

      <div className="mt-16 flex flex-col gap-4 border-t border-rule pt-6 text-xs text-stone-dark md:flex-row md:items-center md:justify-between">
        <p className="flex items-center gap-3">
          <SignalBar className="w-8" />
          <span>
            © {new Date().getFullYear()} {SITE.name} · {SITE.city}
          </span>
        </p>
        <p>
          Registered with the {SITE.registration.body} · {SITE.registration.number}
        </p>
      </div>
    </footer>
  );
}

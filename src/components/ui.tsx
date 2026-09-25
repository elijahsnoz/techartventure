import type { ReactNode } from "react";
import { Link } from "react-router";
import { RELATIONSHIP_LABEL, STATUS_LABEL } from "../data/site";
import type { Relationship, Status } from "../types/content";

/** The three logo colours, side by side: the site's one recurring mark. */
export function SignalBar({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden className={`inline-flex h-1 w-12 ${className}`}>
      <span className="flex-1 bg-signal-red" />
      <span className="flex-1 bg-signal-blue" />
      <span className="flex-1 bg-signal-green" />
    </span>
  );
}

export function SectionHead({
  index,
  label,
  title,
  action,
}: {
  index: string;
  label: string;
  title?: ReactNode;
  action?: { href: string; label: string };
}) {
  return (
    <header className="mb-10 md:mb-16">
      <div className="flex items-center justify-between gap-6 border-t border-ink pt-4">
        <p className="eyebrow flex items-center gap-3">
          <span className="tabular-nums text-stone">{index}</span>
          <span>{label}</span>
        </p>
        {action && <ArrowLink to={action.href}>{action.label}</ArrowLink>}
      </div>
      {title && <h2 className="mt-8 max-w-4xl text-title font-semibold tracking-tight md:mt-12">{title}</h2>}
    </header>
  );
}

export function ArrowLink({ to, children, className = "" }: { to: string; children: ReactNode; className?: string }) {
  return (
    <Link
      to={to}
      viewTransition
      className={`group inline-flex items-center gap-2 text-sm font-semibold tracking-tight ${className}`}
    >
      <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
        {children}
      </span>
      <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}

/** Says, on every record, how it relates to TechArt Venture and where it stands. */
export function Provenance({ relationship, status }: { relationship: Relationship; status?: Status }) {
  return (
    <p className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-1 text-stone-dark">
      <span className={relationship === "techart" ? "text-ink" : undefined}>{RELATIONSHIP_LABEL[relationship]}</span>
      {status && (
        <>
          <span aria-hidden className="h-px w-3 bg-stone" />
          <span>{STATUS_LABEL[status]}</span>
        </>
      )}
    </p>
  );
}

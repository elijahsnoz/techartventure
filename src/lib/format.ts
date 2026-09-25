import type { PartialDate } from "../types/content";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/** "2026-04-21" → "21 April 2026", "2025-06" → "June 2025", "2024" → "2024". */
export function formatDate(date: PartialDate | undefined): string {
  if (!date) return "";
  const [y, m, d] = date.split("-");
  if (!m) return y;
  const month = MONTHS[Number(m) - 1];
  return d ? `${Number(d)} ${month} ${y}` : `${month} ${y}`;
}

/** A date range, collapsing the shared year: "21 April – 5 May 2026". */
export function formatRange(start?: PartialDate, end?: PartialDate): string {
  if (!start) return "";
  if (!end) return formatDate(start);
  const s = formatDate(start);
  const e = formatDate(end);
  const sy = start.slice(0, 4);
  return sy === end.slice(0, 4) && start.length === 10 ? `${s.replace(` ${sy}`, "")} – ${e}` : `${s} – ${e}`;
}

export const year = (date?: PartialDate) => date?.slice(0, 4) ?? "";

export const pad = (n: number) => String(n).padStart(2, "0");

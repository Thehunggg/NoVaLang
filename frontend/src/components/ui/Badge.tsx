import type { ReactNode } from "react";

export function Badge({ children, tone = "cyan" }: { children: ReactNode; tone?: "cyan" | "pink" | "amber" | "green" | "slate" }) {
  const styles = { cyan: "border-cyan-300/25 bg-cyan-300/10 text-cyan-200", pink: "border-fuchsia-300/25 bg-fuchsia-300/10 text-fuchsia-200", amber: "border-amber-300/25 bg-amber-300/10 text-amber-200", green: "border-emerald-300/25 bg-emerald-300/10 text-emerald-200", slate: "border-white/10 bg-white/5 text-slate-300" };
  return <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider ${styles[tone]}`}>{children}</span>;
}

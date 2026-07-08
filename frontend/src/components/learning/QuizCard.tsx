import type { ReactNode } from "react";
import { Card } from "../ui/Card";

export function QuizCard({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return <Card className="overflow-hidden"><div className="border-b border-white/[.07] px-5 py-4 sm:px-7"><p className="text-[11px] font-black uppercase tracking-[.16em] text-cyan-300">{eyebrow}</p><h2 className="mt-1 font-display text-xl font-black text-white">{title}</h2></div><div className="p-5 sm:p-7">{children}</div></Card>;
}

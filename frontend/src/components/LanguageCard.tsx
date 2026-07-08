import { ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import type { Language } from "../types";

export function LanguageCard({ language, completed, total }: { language: Language; completed: number; total: number }) {
  const percent = total ? Math.round((completed / total) * 100) : 0;
  return (
    <Link to={`/course/${language.code}`} className="group relative overflow-hidden rounded-3xl border border-violet-100 bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-soft">
      <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-10" style={{ backgroundColor: language.color }} />
      <div className="mb-6 flex items-start justify-between"><span className="text-5xl drop-shadow-sm">{language.flag}</span><span className="rounded-full bg-slate-50 px-3 py-1 text-xs font-extrabold text-slate-500">{completed}/{total} lessons</span></div>
      <p className="mb-1 text-sm font-bold" style={{ color: language.color }}>{language.greeting}</p>
      <h3 className="font-display text-2xl font-extrabold">{language.name}</h3>
      <p className="mt-2 min-h-12 text-sm leading-6 text-slate-500">{language.description}</p>
      <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full transition-all" style={{ width: `${percent}%`, backgroundColor: language.color }} /></div>
      <div className="mt-4 flex items-center justify-between text-sm font-extrabold text-slate-700"><span className="flex items-center gap-2"><BookOpen size={17} /> {percent ? `${percent}% complete` : "Start learning"}</span><ArrowRight className="transition-transform group-hover:translate-x-1" size={19} /></div>
    </Link>
  );
}

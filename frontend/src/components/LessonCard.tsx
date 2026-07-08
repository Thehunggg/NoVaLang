import { Check, ChevronRight, Clock, Star, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { getLevelDisplayName } from "../data/fallbackCourses";
import type { Lesson } from "../types";

export function LessonCard({ lesson, completed }: { lesson: Lesson; completed: boolean }) {
  const levelName = getLevelDisplayName(lesson.levelId, lesson.language);

  return (
    <Link to={`/lesson/${lesson.id}`} className="group flex items-center gap-4 rounded-2xl border border-violet-100 bg-white p-4 shadow-card transition hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-soft sm:p-5">
      <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl font-display text-lg font-black ${completed ? "bg-emerald-100 text-emerald-700" : "bg-grape-100 text-grape-700"}`}>{completed ? <Check size={23} strokeWidth={3} /> : lesson.order}</div>
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex flex-wrap items-center gap-2"><h3 className="truncate font-display text-lg font-extrabold">{lesson.title}</h3>{completed && <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-extrabold text-emerald-700">COMPLETED</span>}</div>
        <p className="truncate text-sm text-slate-500">{lesson.subtitle}</p>
        <div className="mt-2 flex flex-wrap gap-3 text-xs font-bold text-slate-400"><span className="flex items-center gap-1"><Clock size={13} />{lesson.durationMinutes} min</span><span className="flex items-center gap-1"><Star size={13} />{levelName}</span><span className="flex items-center gap-1 text-violet-500"><Zap size={13} />{lesson.xpReward} XP</span></div>
      </div>
      <ChevronRight className="shrink-0 text-slate-300 transition group-hover:translate-x-1 group-hover:text-grape-600" />
    </Link>
  );
}


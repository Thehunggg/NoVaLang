import { Check, Lock, MapPin, Play, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Lesson } from "../../types/index";
import { useTranslation } from "../../i18n/useTranslation";
import { useApp } from "../../context/AppContext";
import { getLocalizedText } from "../../utils/localizedText";

export type LessonNodeState = "locked" | "available" | "current" | "completed" | "placed";
export function LessonNode({ lesson, state }: { lesson: Lesson; state: LessonNodeState }) {
  const navigate = useNavigate(); const { t } = useTranslation(); const { progress } = useApp();
  const styles = { locked: "border-white/[.07] bg-white/[.025] text-slate-700", available: "border-cyan-300/35 bg-cyan-300/10 text-cyan-200 shadow-[0_0_30px_rgba(34,211,238,.12)]", current: "border-fuchsia-300/50 bg-gradient-to-br from-violet-400/25 to-fuchsia-400/20 text-white shadow-[0_0_38px_rgba(232,121,249,.22)]", completed: "border-emerald-300/30 bg-emerald-300/10 text-emerald-200", placed: "border-amber-300/25 bg-amber-300/10 text-amber-200" };
  const icon = state === "locked" ? <Lock size={19} /> : state === "completed" ? <Check size={22} strokeWidth={3} /> : state === "current" ? <Play size={20} fill="currentColor" /> : state === "placed" ? <MapPin size={19} /> : <Star size={20} />;
  return <button disabled={state === "locked"} onClick={() => navigate(`/lesson/${lesson.id}`)} className={`group relative flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${state !== "locked" ? "hover:-translate-y-0.5" : "cursor-not-allowed"} ${styles[state]}`}><span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-current/20 bg-black/15">{icon}</span><span className="min-w-0 flex-1"><span className="block truncate font-display text-base font-black">{getLocalizedText(lesson.titleTranslations ?? lesson.title, progress.nativeLanguage)}</span><span className="mt-1 block truncate text-xs font-bold opacity-60">{lesson.microLessons.length} {t("microLessons")} · {lesson.durationMinutes} min</span></span><span className="text-[10px] font-black uppercase opacity-60">{state === "placed" ? t("placed") : `+${lesson.xpReward} XP`}</span></button>;
}

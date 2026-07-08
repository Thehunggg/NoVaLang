import { LockKeyhole } from "lucide-react";
import type { Unit } from "../../types/index";
import { useTranslation } from "../../i18n/useTranslation";
import { Badge } from "../ui/Badge";
import { LessonNode, type LessonNodeState } from "./LessonNode";

export function UnitSection({ unit, completedIds, unlockedIds, placedIds, currentLessonId }: { unit: Unit; completedIds: string[]; unlockedIds: string[]; placedIds: string[]; currentLessonId: string | null }) {
  const { t, language } = useTranslation(); const complete = unit.lessons.every((lesson) => completedIds.includes(lesson.id)); const unitLocked = !unit.lessons.some((lesson) => unlockedIds.includes(lesson.id) || completedIds.includes(lesson.id) || placedIds.includes(lesson.id));
  return <section className="relative pl-7 sm:pl-9"><div className="absolute bottom-0 left-[.68rem] top-12 w-px bg-gradient-to-b from-violet-400/50 via-cyan-300/20 to-transparent sm:left-[.93rem]" /><div className="relative mb-5"><span className={`absolute -left-7 top-1 grid h-6 w-6 place-items-center rounded-full border text-xs sm:-left-9 ${complete ? "border-emerald-300/40 bg-emerald-300/20 text-emerald-200" : unitLocked ? "border-white/10 bg-[#100b1a] text-slate-700" : "border-violet-300/40 bg-violet-300/20 text-violet-200"}`}>{unitLocked ? <LockKeyhole size={12} /> : unit.order}</span><div className="mb-2 flex flex-wrap gap-2"><Badge tone={complete ? "green" : unitLocked ? "slate" : "pink"}>{t("unit")} {unit.order}</Badge>{complete && <Badge tone="green">{t("completed")}</Badge>}</div><h3 className="font-display text-xl font-black">{language === "vi" ? `${t("unit")} ${unit.order}` : unit.title}</h3><p className="mt-1 text-sm text-slate-500">{language === "vi" ? t("signalDescription") : unit.communicationGoal}</p></div><div className="space-y-3 pb-9">{unit.lessons.map((lesson) => { const state: LessonNodeState = completedIds.includes(lesson.id) ? "completed" : currentLessonId === lesson.id ? "current" : placedIds.includes(lesson.id) ? "placed" : unlockedIds.includes(lesson.id) ? "available" : "locked"; return <LessonNode key={lesson.id} lesson={lesson} state={state} />; })}</div></section>;
}


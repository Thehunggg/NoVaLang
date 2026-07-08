import { Award, Check, Lock } from "lucide-react";

export const achievementCatalog = [
  { id: "first-lesson", title: "First Quest", description: "Complete your first lesson" },
  { id: "three-day-streak", title: "On Fire", description: "Reach a 3 day streak" },
  { id: "hundred-xp", title: "Centurion", description: "Earn 100 total XP" },
  { id: "first-perfect", title: "Flawless", description: "Finish a perfect lesson" },
  { id: "ten-flashcards", title: "Word Collector", description: "Save 10 flashcards" },
  { id: "first-practice", title: "Never Rusty", description: "Complete a practice quest" }
];

export function AchievementBadge({ title, description, earned }: { title: string; description: string; earned: boolean }) {
  return <div className={`rounded-2xl border p-4 ${earned ? "border-amber-300/25 bg-amber-300/10" : "border-white/[.07] bg-white/[.025] opacity-60"}`}><div className={`mb-3 grid h-10 w-10 place-items-center rounded-xl ${earned ? "bg-amber-300 text-amber-950 shadow-[0_0_24px_rgba(251,191,36,.25)]" : "bg-white/[.06] text-slate-600"}`}>{earned ? <Award size={20} /> : <Lock size={18} />}</div><h3 className="font-extrabold text-white">{title}</h3><p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>{earned && <span className="mt-3 flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-amber-300"><Check size={12} /> Unlocked</span>}</div>;
}

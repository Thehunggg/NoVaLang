import { Award, Check, Lock } from "lucide-react";
import { useTranslation } from "../../i18n/useTranslation";
import type { TranslationKey } from "../../i18n/translations";

export const achievementCatalog: { id: string; titleKey: TranslationKey; descriptionKey: TranslationKey }[] = [
  { id: "first-lesson", titleKey: "achievementFirstLessonTitle", descriptionKey: "achievementFirstLessonDesc" },
  { id: "three-day-streak", titleKey: "achievementThreeDayTitle", descriptionKey: "achievementThreeDayDesc" },
  { id: "hundred-xp", titleKey: "achievementHundredXpTitle", descriptionKey: "achievementHundredXpDesc" },
  { id: "first-perfect", titleKey: "achievementFirstPerfectTitle", descriptionKey: "achievementFirstPerfectDesc" },
  { id: "ten-flashcards", titleKey: "achievementTenFlashcardsTitle", descriptionKey: "achievementTenFlashcardsDesc" },
  { id: "first-practice", titleKey: "achievementFirstPracticeTitle", descriptionKey: "achievementFirstPracticeDesc" }
];

export function AchievementBadge({ titleKey, descriptionKey, earned }: { titleKey: TranslationKey; descriptionKey: TranslationKey; earned: boolean }) {
  const { t } = useTranslation();
  return (
    <div className={`rounded-2xl border p-4 ${earned ? "border-amber-300/25 bg-amber-300/10" : "border-white/[.07] bg-white/[.025] opacity-60"}`}>
      <div className={`mb-3 grid h-10 w-10 place-items-center rounded-xl ${earned ? "bg-amber-300 text-amber-950 shadow-[0_0_24px_rgba(251,191,36,.25)]" : "bg-white/[.06] text-slate-600"}`}>
        {earned ? <Award size={20} /> : <Lock size={18} />}
      </div>
      <h3 className="font-extrabold text-white">{t(titleKey)}</h3>
      <p className="mt-1 text-xs leading-5 text-slate-500">{t(descriptionKey)}</p>
      {earned && (
        <span className="mt-3 flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-amber-300">
          <Check size={12} /> {t("achievementUnlocked")}
        </span>
      )}
    </div>
  );
}

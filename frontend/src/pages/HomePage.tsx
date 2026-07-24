import { BookOpen, Brain, CloudOff, Flame, Heart, Repeat2, Target, TriangleAlert, Zap } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CoursePath } from "../components/learning/CoursePath";
import { LanguageHero } from "../components/learning/LanguageHero";
import { StatCard } from "../components/learning/StatCard";
import { PageContainer } from "../components/layout/PageContainer";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { ProgressBar } from "../components/ui/ProgressBar";
import { useApp } from "../context/AppContext";
import { getLevelDisplayName, allLearningLanguages, isCourseAvailable, getLearningLanguageLabel } from "../data/fallbackCourses";
import { useTranslation } from "../i18n/useTranslation";
import { fetchCourse } from "../services/api";
import type { Course, LanguageCode } from "../types/index";

export function HomePage() {
  const { progress, selectLanguage, dueReviewItems, skipCoreFoundation } = useApp();
  const { t } = useTranslation();
  const [course, setCourse] = useState<Course>();
  const [offline, setOffline] = useState(false);
  const language = allLearningLanguages.find((item) => item.code === progress.selectedLanguage)
    ?? allLearningLanguages.find((item) => item.code === "ja")
    ?? allLearningLanguages[0];
  const minutesToday = progress.studyMinutesToday;
  const currentLevelName = getLevelDisplayName(progress.currentLevel, progress.selectedLanguage, progress.nativeLanguage);
  const needsCoreFoundation =
    progress.currentLevel === "A0" &&
    !progress.coreFoundationCompleted &&
    !progress.coreFoundationSkipped;
  const courseReady = isCourseAvailable(progress.selectedLanguage);

  useEffect(() => {
    if (!courseReady) {
      setCourse(undefined);
      setOffline(false);
      return;
    }
    fetchCourse(progress.selectedLanguage).then((result) => {
      setCourse(result.data);
      setOffline(result.source === "fallback");
    });
  }, [progress.selectedLanguage, courseReady]);

  const visibleCourse = useMemo(() => {
    if (!course) return undefined;
    if (!needsCoreFoundation) return course;
    const foundationUnits = course.units.filter(
      (unit) =>
        unit.id.includes("core-foundation") ||
        unit.id.includes("hiragana") ||
        unit.id.includes("alphabet"),
    );
    if (!foundationUnits.length) return course;
    return {
      ...course,
      units: foundationUnits,
      levels: course.levels.map((level) => ({
        ...level,
        units: level.units.filter((unit) => foundationUnits.some((item) => item.id === unit.id)),
      })),
    };
  }, [course, needsCoreFoundation]);

  const label = (code: LanguageCode) => getLearningLanguageLabel(code);

  return (
    <PageContainer className="py-7 sm:py-10">
      <LanguageHero
        language={language}
        trackName={t("coursePath")}
        description={language.description}
        lessonCount={course?.units.reduce((sum, unit) => sum + unit.lessons.length, 0) ?? 0}
      />
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Badge tone="cyan">{t("currentLevel")} {currentLevelName}</Badge>
        {offline && <Badge tone="amber"><CloudOff size={12} /> {t("offlinePack")}</Badge>}
        {!courseReady && <Badge tone="pink">{t("comingSoon")}</Badge>}
        {allLearningLanguages.map((item) => { const available = isCourseAvailable(item.code); return (
          <button key={item.code} disabled={!available} onClick={() => available && selectLanguage(item.code)} className={`rounded-lg border px-3 py-2 text-sm font-black ${item.code === progress.selectedLanguage ? "border-cyan-300/40 bg-cyan-300/10" : "border-white/[.07] bg-white/[.03] text-slate-500"} ${!available ? "cursor-not-allowed opacity-45" : ""}`}>
            {item.flag} {label(item.code)}
            {!available ? ` · ${t("comingSoon")}` : ""}
          </button>
        ); })}
      </div>

      {!courseReady && (
        <Card className="mt-5 p-5">
          <h3 className="font-display text-xl font-black">{t("comingSoon")}</h3>
          <p className="mt-2 text-sm text-slate-400">{t("moreRoadmap")}</p>
        </Card>
      )}

      {needsCoreFoundation && courseReady && (
        <Card className="mt-5 p-5">
          <h3 className="font-display text-xl font-black">{t("startWithBasics")}</h3>
          <p className="mt-2 text-sm text-slate-400">{t("basicsHelp")}</p>
          <Button className="mt-4" variant="secondary" onClick={skipCoreFoundation}>{t("skipBasics")}</Button>
        </Card>
      )}

      <section className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard icon={Zap} label={t("totalXp")} value={progress.totalXp} color="text-violet-300" />
        <StatCard icon={Flame} label={t("streak")} value={progress.streak} color="text-orange-300" />
        <StatCard icon={Heart} label={t("hearts")} value={`${progress.hearts}/5`} color="text-rose-300" />
        <StatCard icon={BookOpen} label={t("lessonsComplete")} value={progress.completedLessonIds.length} color="text-cyan-300" />
      </section>

      <section className="mt-5 grid gap-5 lg:grid-cols-[1fr_310px]">
        <Card className="p-4 sm:p-6">
          <div className="mb-6">
            <p className="text-xs font-black uppercase tracking-[.16em] text-fuchsia-300">{t("coursePath")}</p>
            <h2 className="mt-2 font-display text-2xl font-black">{visibleCourse ? `${label(language.code)} · ${t("coursePath")}` : courseReady ? t("loading") : t("comingSoon")}</h2>
          </div>
          {visibleCourse && <CoursePath course={visibleCourse} completedIds={progress.completedLessonIds} unlockedIds={progress.unlockedLessonIds} placedIds={progress.placedLessonIds} currentLessonId={progress.currentLessonId} nativeLanguage={progress.nativeLanguage} />}
        </Card>

        <aside className="space-y-5">
          <Card className="p-5">
            <Target className="text-cyan-300" />
            <h3 className="mt-3 font-display text-xl font-black">{t("dailyGoal")}</h3>
            <ProgressBar value={minutesToday} max={progress.dailyGoalMinutes} label={`${progress.xpToday} ${t("xpToday")}`} />
          </Card>
          <Card className="p-5">
            <Repeat2 className="text-emerald-300" />
            <h3 className="mt-3 font-display text-xl font-black">{t("dailyReview")}</h3>
            <p className="mt-2 text-sm text-slate-500">{dueReviewItems.length} {t("dueItems")}</p>
            <Link to="/review"><Button className="mt-4 w-full" variant="secondary">{t("review")}</Button></Link>
          </Card>
          <Card className="p-5">
            <Brain className="text-violet-300" />
            <h3 className="mt-3 font-display text-xl font-black">{t("reviewChamber")}</h3>
            <p className="mt-2 text-sm text-slate-500">{t("practiceDescription")}</p>
            <Link to={`/practice/${progress.selectedLanguage}`}><Button className="mt-4 w-full">{t("practice")}</Button></Link>
          </Card>
          <Card className="p-5">
            <TriangleAlert className="text-amber-300" />
            <h3 className="mt-3 font-display text-xl font-black">{t("mistakeSignals")}</h3>
            <p className="mt-2 text-sm text-slate-500">{progress.mistakes.filter((item) => !item.improved).length}</p>
            <Link to="/mistakes"><Button variant="ghost" className="mt-4 w-full">{t("reviewMistakes")}</Button></Link>
          </Card>
        </aside>
      </section>
    </PageContainer>
  );
}

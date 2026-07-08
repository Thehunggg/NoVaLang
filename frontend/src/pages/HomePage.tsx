import { BookOpen, Brain, CloudOff, Flame, Heart, Repeat2, Target, TriangleAlert, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CoursePath } from "../components/learning/CoursePath";
import { Mascot } from "../components/learning/Mascot";
import { StatCard } from "../components/learning/StatCard";
import { PageContainer } from "../components/layout/PageContainer";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { ProgressBar } from "../components/ui/ProgressBar";
import { useApp } from "../context/AppContext";
import { getLevelDisplayName, languages } from "../data/fallbackCourses";
import { useTranslation } from "../i18n/useTranslation";
import { fetchCourse } from "../services/api";
import type { Course, LanguageCode } from "../types/index";

export function HomePage() {
  const { progress, selectLanguage, dueReviewItems } = useApp();
  const { t } = useTranslation();
  const [course, setCourse] = useState<Course>();
  const [offline, setOffline] = useState(false);
  const language = languages.find((item) => item.code === progress.selectedLanguage)!;
  const minutesToday = progress.lessonsCompletedToday * 8;
  const currentLevelName = getLevelDisplayName(progress.currentLevel, progress.selectedLanguage, progress.nativeLanguage);

  useEffect(() => {
    fetchCourse(progress.selectedLanguage).then((result) => {
      setCourse(result.data);
      setOffline(result.source === "fallback");
    });
  }, [progress.selectedLanguage]);

  const label = (code: LanguageCode) => code === "en" ? t("english") : code === "ja" ? t("japanese") : t("spanish");

  return (
    <PageContainer className="py-7 sm:py-10">
      <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-cyan-300/[.08] via-violet-400/[.08] to-fuchsia-400/[.07] p-5 sm:p-8">
        <div className="relative flex flex-col justify-between gap-7 md:flex-row md:items-center">
          <div>
            <div className="mb-4 flex flex-wrap gap-2">
              <Badge tone="cyan">{t("currentLevel")} {currentLevelName}</Badge>
              {offline && <Badge tone="amber"><CloudOff size={12} /> {t("offlinePack")}</Badge>}
            </div>
            {progress.displayName && <p className="mb-2 text-sm font-black text-cyan-200">{t("welcomeBack")}, {progress.displayName}</p>}
            <h1 className="font-display text-3xl font-black sm:text-4xl">{t("signalLive", { language: label(language.code) })}</h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">{t("signalDescription")}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {languages.map((item) => (
                <button key={item.code} onClick={() => selectLanguage(item.code)} className={`rounded-xl border px-3 py-2 text-sm font-black ${item.code === progress.selectedLanguage ? "border-cyan-300/40 bg-cyan-300/10" : "border-white/[.07] bg-white/[.03] text-slate-500"}`}>
                  {item.flag} {label(item.code)}
                </button>
              ))}
            </div>
          </div>
          <Mascot size="md" message={`${currentLevelName} · ${course?.mapping ?? "CEFR Pre-A1 to B2"}`} />
        </div>
      </section>

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
            <h2 className="mt-2 font-display text-2xl font-black">{course?.title ?? t("loading")}</h2>
          </div>
          {course && <CoursePath course={course} completedIds={progress.completedLessonIds} unlockedIds={progress.unlockedLessonIds} placedIds={progress.placedLessonIds} currentLessonId={progress.currentLessonId} nativeLanguage={progress.nativeLanguage} />}
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

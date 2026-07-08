import { ArrowRight, Gauge, MapPin, RotateCcw, Sparkles } from "lucide-react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Mascot } from "../components/learning/Mascot";
import { PageContainer } from "../components/layout/PageContainer";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { useApp } from "../context/AppContext";
import { courses, getLevelDisplayName } from "../data/fallbackCourses";
import { useTranslation } from "../i18n/useTranslation";
import type { PlacementResult } from "../types/index";

export function PlacementResultPage() {
  const { state } = useLocation(); const result = state as PlacementResult | null; const { progress, applyPlacement } = useApp(); const { t } = useTranslation(); const navigate = useNavigate();
  if (!result?.completed) return <Navigate to={`/placement/${progress.selectedLanguage}`} replace />;
  const course = courses.find((item) => item.language === progress.selectedLanguage)!; const levelName = getLevelDisplayName(result.level, progress.selectedLanguage, progress.nativeLanguage); const unit = course.units.find((item) => item.id === result.startingUnitId); const lesson = unit?.lessons.find((item) => item.id === result.startingLessonId);
  const start = (zero = false) => { applyPlacement(result, zero); navigate("/", { replace: true }); };
  return <PageContainer className="grid min-h-[75vh] place-items-center py-10"><Card className="w-full max-w-2xl overflow-hidden"><div className="bg-gradient-to-br from-fuchsia-400/15 via-violet-400/15 to-cyan-300/10 p-8 text-center sm:p-10"><Mascot size="md" /><Badge tone="pink"><Sparkles size={13} />{t("placementResult")}</Badge><div className="mx-auto mt-6 grid h-24 w-24 place-items-center rounded-[2rem] border border-cyan-300/30 bg-cyan-300/10 font-display text-3xl font-black text-cyan-200 shadow-[0_0_45px_rgba(34,211,238,.16)]">{levelName}</div><p className="mt-4 text-sm text-slate-400">{t("score")}: <strong className="text-white">{result.score}</strong></p></div><div className="p-6 sm:p-8"><div className="grid gap-3 sm:grid-cols-2"><div className="rounded-2xl border border-white/10 bg-white/[.04] p-4"><p className="text-xs font-black uppercase tracking-wider text-violet-300">{t("recommendedUnit")}</p><p className="mt-2 font-extrabold"><MapPin className="mr-2 inline text-violet-300" size={17} />{unit?.title}</p></div><div className="rounded-2xl border border-white/10 bg-white/[.04] p-4"><p className="text-xs font-black uppercase tracking-wider text-cyan-300">{t("recommendedLesson")}</p><p className="mt-2 font-extrabold"><Gauge className="mr-2 inline text-cyan-300" size={17} />{lesson?.title}</p></div></div><div className="mt-6 grid gap-3"><Button onClick={() => start(false)}>{t("startRecommended")}<ArrowRight size={17} /></Button><Button variant="secondary" onClick={() => start(true)}>{t("skipPlacement")}</Button><Link to={`/placement/${progress.selectedLanguage}`}><Button variant="ghost" className="w-full"><RotateCcw size={17} />{t("retakePlacement")}</Button></Link></div></div></Card></PageContainer>;
}

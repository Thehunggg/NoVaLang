import { ArrowLeft, ArrowRight, Check, Gauge, Sparkles } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mascot } from "../components/learning/Mascot";
import { NativeLanguageSelector } from "../components/NativeLanguageSelector";
import { Button } from "../components/ui/Button";
import { ProgressBar } from "../components/ui/ProgressBar";
import { useApp } from "../context/AppContext";
import { courses, getLevelDisplayName, languages } from "../data/fallbackCourses";
import { useTranslation } from "../i18n/useTranslation";
import type { DailyGoal, ExamTrackOption, LanguageCode, LevelId } from "../types/index";

export function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [language, setLanguage] = useState<LanguageCode>("en");
  const [level, setLevel] = useState<LevelId>("A0");
  const [goal, setGoal] = useState<DailyGoal>(10);
  const { finishOnboarding, progress } = useApp();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const course = courses.find((item) => item.language === language)!;
  const trackOptions: ExamTrackOption[] = course.examTracks ?? course.levels.filter((item) => item.units.length).map((item) => ({ id: item.id, language, title: getLevelDisplayName(item.id, language, progress.nativeLanguage), description: item.description, trackType: "general" as const, levelId: item.id, comingSoon: false }));

  const finish = () => {
    finishOnboarding(language, level, goal);
    navigate("/", { replace: true });
  };

  const languageLabel = (code: LanguageCode) => code === "en" ? t("english") : code === "ja" ? t("japanese") : t("spanish");

  return (
    <main className="grid min-h-screen place-items-center bg-[#080510] px-4 py-8 text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_25%_10%,rgba(34,211,238,.12),transparent_25%),radial-gradient(circle_at_80%_80%,rgba(232,121,249,.12),transparent_28%)]" />
      <div className="relative w-full max-w-2xl">
        <div className="mb-7 flex items-center gap-4">
          <Mascot size="sm" />
          <div className="flex-1">
            <div className="mb-2 flex justify-between text-xs font-black text-slate-500"><span>Nova setup</span><span>{step + 1}/4</span></div>
            <ProgressBar value={step + 1} max={4} />
          </div>
        </div>
        <div className="rounded-[2rem] border border-white/10 bg-white/[.055] p-6 shadow-2xl backdrop-blur-xl sm:p-9">
          <p className="text-xs font-black uppercase tracking-[.18em] text-cyan-300"><Sparkles className="mr-1 inline" size={14} /> NovaLang</p>

          {step === 0 && <div className="mt-5"><NativeLanguageSelector /></div>}

          {step === 1 && (
            <div>
              <h1 className="mt-3 font-display text-3xl font-black">{t("chooseLearningLanguage")}</h1>
              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {languages.map((item) => (
                  <button key={item.code} onClick={() => { setLanguage(item.code); setLevel("A0"); }} className={`relative rounded-2xl border p-5 text-left transition ${language === item.code ? "border-cyan-300/50 bg-cyan-300/10 shadow-[0_0_30px_rgba(34,211,238,.1)]" : "border-white/10 bg-white/[.035]"}`}>
                    <span className="text-4xl">{item.flag}</span>
                    <strong className="mt-4 block font-display text-lg">{languageLabel(item.code)}</strong>
                    <span className="mt-1 block text-xs text-slate-500">{item.nativeName}</span>
                    {language === item.code && <Check className="absolute right-3 top-3 text-cyan-300" size={17} />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h1 className="mt-3 font-display text-3xl font-black">{t("chooseLevel")}</h1>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {trackOptions.map((item) => {
                  const itemLevel = item.levelId ?? "A0";
                  const selected = level === itemLevel && !item.comingSoon;
                  return (
                    <button key={item.id} disabled={item.comingSoon} onClick={() => setLevel(itemLevel)} className={`flex min-h-28 w-full items-start justify-between gap-4 rounded-2xl border p-4 text-left transition disabled:cursor-not-allowed ${selected ? "border-violet-300/50 bg-violet-300/10" : item.comingSoon ? "border-white/5 bg-white/[.02] opacity-60" : "border-white/10 bg-white/[.035] hover:border-violet-300/25"}`}>
                      <span className="min-w-0">
                        <strong className="block font-display text-lg">{item.title}</strong>
                        <span className="mt-1 block text-xs font-bold text-cyan-200">{item.comingSoon ? "Coming soon" : getLevelDisplayName(itemLevel, language, progress.nativeLanguage)}</span>
                        <span className="mt-2 block text-xs leading-5 text-slate-500">{item.description}</span>
                      </span>
                      {selected && <Check className="shrink-0 text-violet-300" size={18} />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h1 className="mt-3 font-display text-3xl font-black">{t("chooseGoal")}</h1>
              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {[{ value: 5, title: t("casual") }, { value: 10, title: t("regular") }, { value: 20, title: t("serious") }].map((item) => (
                  <button key={item.value} onClick={() => setGoal(item.value as DailyGoal)} className={`rounded-2xl border p-5 text-left transition ${goal === item.value ? "border-fuchsia-300/50 bg-fuchsia-300/10" : "border-white/10 bg-white/[.035]"}`}>
                    <Gauge className="text-fuchsia-300" />
                    <strong className="mt-4 block text-lg">{item.title}</strong>
                    <span className="mt-1 block text-xs text-slate-500">{item.value} {t("minutesDay")}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-between">
            <Button variant="ghost" onClick={() => setStep((value) => Math.max(0, value - 1))} disabled={step === 0}><ArrowLeft size={17} /> {t("back")}</Button>
            <Button onClick={() => step === 3 ? finish() : setStep((value) => value + 1)}>{step === 3 ? t("launchPath") : t("continue")}<ArrowRight size={17} /></Button>
          </div>
        </div>
      </div>
    </main>
  );
}

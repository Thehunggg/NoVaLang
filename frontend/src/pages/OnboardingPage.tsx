import { ArrowLeft, ArrowRight, Check, Gauge, Sparkles, Star } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mascot } from "../components/learning/Mascot";
import { Button } from "../components/ui/Button";
import { ProgressBar } from "../components/ui/ProgressBar";
import { useApp } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";
import { courses, getLevelDisplayName, languages } from "../data/fallbackCourses";
import { groupedNiches, nicheCategory, nicheTitle } from "../data/niches";
import { useTranslation } from "../i18n/useTranslation";
import type { DailyGoal, ExamTrackOption, LanguageCode, LevelId } from "../types/index";

export function OnboardingPage() {
  const { finishOnboarding, progress } = useApp();
  const { user } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [displayName, setDisplayName] = useState(progress.displayName || user?.name || "");
  const [ageRange, setAgeRange] = useState(progress.ageRange);
  const [country, setCountry] = useState(progress.country);
  const [region, setRegion] = useState(progress.region);
  const [occupationStatus, setOccupationStatus] = useState(progress.occupationStatus);
  const [language, setLanguage] = useState<LanguageCode>(progress.learningLanguage || "ja");
  const [level, setLevel] = useState<LevelId>(progress.currentLevel || "A0");
  const [goal, setGoal] = useState<DailyGoal>(progress.dailyGoalMinutes);
  const [selectedNiches, setSelectedNiches] = useState<Set<string>>(new Set(progress.selectedNiches.length ? progress.selectedNiches : ["jlpt"]));
  const [primaryNiche, setPrimaryNiche] = useState<string | null>(progress.primaryNiche ?? "jlpt");
  const course = courses.find((item) => item.language === language)!;
  const trackOptions: ExamTrackOption[] = course.examTracks ?? course.levels.filter((item) => item.units.length).map((item) => ({ id: item.id, language, title: getLevelDisplayName(item.id, language, progress.nativeLanguage), description: item.description, trackType: "general" as const, levelId: item.id, comingSoon: false }));
  const groups = groupedNiches();
  const allNiches = Object.values(groups).flat();
  const primaryNicheLabel = primaryNiche ? nicheTitle(allNiches.find((item) => item.id === primaryNiche) ?? allNiches[0], progress.effectiveUILanguage) : "-";
  const totalSteps = 5;

  const languageLabel = (code: LanguageCode) => code === "en" ? t("english") : code === "ja" ? t("japanese") : t("spanish");
  const canContinue = step !== 0 || displayName.trim().length >= 2;

  const finish = () => {
    finishOnboarding(language, level, goal, { displayName: displayName.trim(), ageRange, country, region, occupationStatus }, { selectedNiches: [...selectedNiches], primaryNiche });
    navigate("/", { replace: true });
  };

  const toggleNiche = (id: string) => {
    setSelectedNiches((current) => {
      const next = new Set(current);
      next.has(id) ? next.delete(id) : next.add(id);
      if (!next.size) next.add(id);
      if (!primaryNiche || !next.has(primaryNiche)) setPrimaryNiche([...next][0] ?? id);
      return next;
    });
  };

  return (
    <main className="grid min-h-screen place-items-center bg-[#080510] px-4 py-8 text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_25%_10%,rgba(34,211,238,.12),transparent_25%),radial-gradient(circle_at_80%_80%,rgba(232,121,249,.12),transparent_28%)]" />
      <div className="relative w-full max-w-3xl">
        <div className="mb-7 flex items-center gap-4">
          <Mascot size="sm" />
          <div className="flex-1">
            <div className="mb-2 flex justify-between text-xs font-black text-slate-500"><span>Nova setup</span><span>{step + 1}/{totalSteps}</span></div>
            <ProgressBar value={step + 1} max={totalSteps} />
          </div>
        </div>
        <div className="rounded-[2rem] border border-white/10 bg-white/[.055] p-6 shadow-2xl backdrop-blur-xl sm:p-9">
          <p className="text-xs font-black uppercase tracking-[.18em] text-cyan-300"><Sparkles className="mr-1 inline" size={14} /> NovaLang</p>

          {step === 0 && (
            <section className="mt-5 space-y-4">
              <h1 className="font-display text-3xl font-black">{t("basicUserInfo")}</h1>
              <label className="block"><span className="text-xs font-black uppercase tracking-wider text-cyan-300">{t("displayName")}</span><input value={displayName} onChange={(event) => setDisplayName(event.target.value)} placeholder={t("displayNameQuestion")} className="mt-2 h-12 w-full rounded-2xl border border-white/10 bg-black/20 px-4 text-sm font-bold outline-none focus:border-cyan-300/50" /></label>
              <div className="grid gap-3 sm:grid-cols-2"><input value={ageRange} onChange={(event) => setAgeRange(event.target.value)} placeholder={`${t("ageRange")} · ${t("optional")}`} className="h-12 rounded-2xl border border-white/10 bg-black/20 px-4 text-sm font-bold outline-none" /><input value={country} onChange={(event) => setCountry(event.target.value)} placeholder={`${t("country")} · ${t("optional")}`} className="h-12 rounded-2xl border border-white/10 bg-black/20 px-4 text-sm font-bold outline-none" /><input value={region} onChange={(event) => setRegion(event.target.value)} placeholder={`${t("region")} · ${t("optional")}`} className="h-12 rounded-2xl border border-white/10 bg-black/20 px-4 text-sm font-bold outline-none" /><input value={occupationStatus} onChange={(event) => setOccupationStatus(event.target.value)} placeholder={`${t("occupationStatus")} · ${t("optional")}`} className="h-12 rounded-2xl border border-white/10 bg-black/20 px-4 text-sm font-bold outline-none" /></div>
            </section>
          )}

          {step === 1 && (
            <section>
              <h1 className="mt-3 font-display text-3xl font-black">{t("chooseLearningLanguage")}</h1>
              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {languages.map((item) => (
                  <button key={item.code} onClick={() => { setLanguage(item.code); setLevel("A0"); }} className={`relative rounded-2xl border p-5 text-left transition ${language === item.code ? "border-cyan-300/50 bg-cyan-300/10 shadow-[0_0_30px_rgba(34,211,238,.1)]" : "border-white/10 bg-white/[.035]"}`}>
                    <span className="text-4xl">{item.flag}</span><strong className="mt-4 block font-display text-lg">{languageLabel(item.code)}</strong><span className="mt-1 block text-xs text-slate-500">{item.nativeName}</span>{language === item.code && <Check className="absolute right-3 top-3 text-cyan-300" size={17} />}
                  </button>
                ))}
              </div>
            </section>
          )}

          {step === 2 && (
            <section>
              <h1 className="mt-3 font-display text-3xl font-black">{t("chooseGoal")}</h1>
              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {[{ value: 5, title: t("casual") }, { value: 10, title: t("regular") }, { value: 20, title: t("serious") }].map((item) => <button key={item.value} onClick={() => setGoal(item.value as DailyGoal)} className={`rounded-2xl border p-5 text-left transition ${goal === item.value ? "border-fuchsia-300/50 bg-fuchsia-300/10" : "border-white/10 bg-white/[.035]"}`}><Gauge className="text-fuchsia-300" /><strong className="mt-4 block text-lg">{item.title}</strong><span className="mt-1 block text-xs text-slate-500">{item.value} {t("minutesDay")}</span></button>)}
              </div>
              <h2 className="mt-8 font-display text-xl font-black">{t("changeGoalTrack")}</h2>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">{trackOptions.map((item) => <div key={item.id} className="rounded-2xl border border-white/10 bg-white/[.035] p-4"><strong>{item.title}</strong><p className="mt-1 text-xs text-slate-500">{item.comingSoon ? t("comingSoon") : item.description}</p></div>)}</div>
            </section>
          )}

          {step === 3 && (
            <section>
              <h1 className="mt-3 font-display text-3xl font-black">{t("chooseNiches")}</h1>
              <div className="mt-6 space-y-4">{Object.entries(groups).map(([category, niches]) => <div key={category} className="rounded-2xl border border-white/10 bg-white/[.035] p-4"><h2 className="font-display text-lg font-black">{nicheCategory(category, progress.effectiveUILanguage)}</h2><div className="mt-3 flex flex-wrap gap-2">{niches.map((niche) => { const selected = selectedNiches.has(niche.id); return <button key={niche.id} onClick={() => selected ? setPrimaryNiche(niche.id) : toggleNiche(niche.id)} onDoubleClick={() => toggleNiche(niche.id)} className={`rounded-full border px-3 py-2 text-xs font-black ${selected ? "border-cyan-300/45 bg-cyan-300/10 text-white" : "border-white/10 bg-white/[.035] text-slate-400"}`}>{primaryNiche === niche.id && <Star className="mr-1 inline text-amber-300" size={13} />}{nicheTitle(niche, progress.effectiveUILanguage)} {!niche.isReady && `· ${t("comingSoon")}`}</button>; })}</div></div>)}</div>
              <p className="mt-3 text-xs text-slate-500">{t("primaryFocus")}: {selectedNiches.size ? primaryNicheLabel : "-"}</p>
            </section>
          )}

          {step === 4 && (
            <section>
              <h1 className="mt-3 font-display text-3xl font-black">{t("chooseLevel")}</h1>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">{trackOptions.map((item) => { const itemLevel = item.levelId ?? "A0"; const selected = level === itemLevel && !item.comingSoon; return <button key={item.id} disabled={item.comingSoon} onClick={() => setLevel(itemLevel)} className={`flex min-h-28 w-full items-start justify-between gap-4 rounded-2xl border p-4 text-left transition disabled:cursor-not-allowed ${selected ? "border-violet-300/50 bg-violet-300/10" : item.comingSoon ? "border-white/5 bg-white/[.02] opacity-60" : "border-white/10 bg-white/[.035] hover:border-violet-300/25"}`}><span className="min-w-0"><strong className="block font-display text-lg">{item.title}</strong><span className="mt-1 block text-xs font-bold text-cyan-200">{item.comingSoon ? t("comingSoon") : getLevelDisplayName(itemLevel, language, progress.nativeLanguage)}</span><span className="mt-2 block text-xs leading-5 text-slate-500">{item.description}</span></span>{selected && <Check className="shrink-0 text-violet-300" size={18} />}</button>; })}</div>
            </section>
          )}

          <div className="mt-8 flex justify-between">
            <Button variant="ghost" onClick={() => setStep((value) => Math.max(0, value - 1))} disabled={step === 0}><ArrowLeft size={17} /> {t("back")}</Button>
            <Button onClick={() => step === totalSteps - 1 ? finish() : setStep((value) => value + 1)} disabled={!canContinue}>{step === totalSteps - 1 ? t("launchPath") : t("continue")}<ArrowRight size={17} /></Button>
          </div>
        </div>
      </div>
    </main>
  );
}

import { ArrowLeft, ArrowRight, Check, Gauge, ListChecks, Play, Sparkles, Star } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mascot } from "../components/learning/Mascot";
import { Button } from "../components/ui/Button";
import { ProgressBar } from "../components/ui/ProgressBar";
import { useApp } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";
import { courses, getLevelDisplayName, allLearningLanguages, isCourseAvailable, getLearningLanguageLabel } from "../data/fallbackCourses";
import { groupedNiches, nicheCategory, nicheTitle } from "../data/niches";
import { dailyGoalOptions, sharedMobileUiText } from "../data/sharedConfig";
import { useTranslation } from "../i18n/useTranslation";
import type { DailyGoal, ExamTrackOption, LanguageCode, LevelId } from "../types/index";

export function OnboardingPage() {
  const { finishOnboarding, progress } = useApp();
  const { user } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [manualLevel, setManualLevel] = useState(false);
  const [displayName, setDisplayName] = useState(progress.displayName || user?.name || "");
  const [ageRange, setAgeRange] = useState(progress.ageRange);
  const [country, setCountry] = useState(progress.country);
  const [region, setRegion] = useState(progress.region);
  const [occupationStatus, setOccupationStatus] = useState(progress.occupationStatus);
  const [language, setLanguage] = useState<LanguageCode>(progress.learningLanguage || "ja");
  const [level, setLevel] = useState<LevelId>(progress.currentLevel || "A0");
  const [goal, setGoal] = useState<DailyGoal>(progress.dailyGoalMinutes);
  const [selectedNiches, setSelectedNiches] = useState<Set<string>>(new Set(progress.selectedNiches.length ? progress.selectedNiches : ["daily_life"]));
  const [primaryNiche, setPrimaryNiche] = useState<string | null>(progress.primaryNiche ?? "daily_life");
  const course = courses.find((item) => item.language === language);
  const courseReady = isCourseAvailable(language) && !!course;
  const trackOptions: ExamTrackOption[] = course
    ? (course.examTracks?.filter((item) => !item.comingSoon) ?? course.levels.filter((item) => item.units.length).map((item) => ({ id: item.id, language, title: getLevelDisplayName(item.id, language, progress.nativeLanguage), description: item.description, trackType: "general" as const, levelId: item.id, comingSoon: false })))
    : [];
  const groups = groupedNiches();
  const allNiches = Object.values(groups).flat();
  const primaryNicheLabel = primaryNiche ? nicheTitle(allNiches.find((item) => item.id === primaryNiche) ?? allNiches[0], progress.effectiveUILanguage) : "-";
  const totalSteps = 5;

  const languageLabel = (code: LanguageCode) => getLearningLanguageLabel(code);
  const profileInfo = { displayName: displayName.trim(), ageRange, country, region, occupationStatus };
  const nicheInfo = { selectedNiches: [...selectedNiches], primaryNiche };
  const complete = (selectedLevel: LevelId, destination = "/") => {
    finishOnboarding(language, selectedLevel, goal, profileInfo, nicheInfo);
    navigate(destination, { replace: true });
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

  return <main className="grid min-h-screen place-items-center bg-[#080510] px-4 py-8 text-white">
    <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_25%_10%,rgba(34,211,238,.12),transparent_25%),radial-gradient(circle_at_80%_80%,rgba(232,121,249,.12),transparent_28%)]" />
    <div className="relative w-full max-w-3xl">
      <div className="mb-7 flex items-center gap-4"><Mascot size="sm" /><div className="flex-1"><div className="mb-2 flex justify-between text-xs font-black text-slate-500"><span>{t("setupProgress")}</span><span>{step + 1}/{totalSteps}</span></div><ProgressBar value={step + 1} max={totalSteps} /></div></div>
      <div className="rounded-[2rem] border border-white/10 bg-white/[.055] p-6 shadow-2xl backdrop-blur-xl sm:p-9">
        <p className="text-xs font-black uppercase tracking-[.18em] text-cyan-300"><Sparkles className="mr-1 inline" size={14} /> NovaLang</p>

        {step === 0 && <section className="mt-5 space-y-4">
          <h1 className="font-display text-3xl font-black">{t("basicUserInfo")}</h1>
          <ProfileField label={t("displayName")} placeholder={t("displayNamePlaceholder")} value={displayName} onChange={setDisplayName} required />
          <div className="grid gap-4 sm:grid-cols-2">
            <ProfileField label={t("ageRange")} placeholder={t("agePlaceholder")} value={ageRange} onChange={setAgeRange} />
            <ProfileField label={t("country")} placeholder={t("countryPlaceholder")} value={country} onChange={setCountry} />
            <ProfileField label={t("region")} placeholder={t("regionPlaceholder")} value={region} onChange={setRegion} />
            <ProfileField label={t("occupationStatus")} placeholder={t("occupationPlaceholder")} value={occupationStatus} onChange={setOccupationStatus} />
          </div>
        </section>}

        {step === 1 && <section><h1 className="mt-3 font-display text-3xl font-black">{t("chooseLearningLanguage")}</h1><div className="mt-7 grid max-h-[28rem] gap-3 overflow-y-auto sm:grid-cols-3">{allLearningLanguages.map((item) => {
          const available = isCourseAvailable(item.code);
          return <button key={item.code} onClick={() => { setLanguage(item.code); setLevel("A0"); }} className={`relative rounded-2xl border p-5 text-left transition ${language === item.code ? "border-cyan-300/50 bg-cyan-300/10" : "border-white/10 bg-white/[.035]"}`}><span className="text-4xl">{item.flag}</span><strong className="mt-4 block font-display text-lg">{languageLabel(item.code)}</strong><span className="mt-1 block text-xs text-slate-500">{item.nativeName}</span>{!available && <span className="mt-2 inline-block rounded-full border border-violet-300/30 bg-violet-300/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-violet-200">{t("comingSoon")}</span>}{language === item.code && <Check className="absolute right-3 top-3 text-cyan-300" size={17} />}</button>;
        })}</div></section>}

        {step === 2 && <section><h1 className="mt-3 font-display text-3xl font-black">{t("chooseGoal")}</h1><div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{dailyGoalOptions.map((item) => <button key={item.minutes} onClick={() => setGoal(item.minutes)} className={`rounded-2xl border p-5 text-left transition ${goal === item.minutes ? "border-fuchsia-300/50 bg-fuchsia-300/10" : "border-white/10 bg-white/[.035]"}`}><Gauge className="text-fuchsia-300" /><strong className="mt-4 block text-lg">{sharedMobileUiText(item.nameKey, progress.effectiveUILanguage)}</strong><span className="mt-1 block text-xs text-slate-400">{item.minutes} {t("minutesDay")}</span></button>)}</div></section>}

        {step === 3 && <section><h1 className="mt-3 font-display text-3xl font-black">{t("chooseNiches")}</h1><div className="mt-6 space-y-4">{Object.entries(groups).map(([category, niches]) => <div key={category} className="rounded-2xl border border-white/10 bg-white/[.035] p-4"><h2 className="font-display text-lg font-black">{nicheCategory(category, progress.effectiveUILanguage)}</h2><div className="mt-3 flex flex-wrap gap-2">{niches.map((niche) => { const selected = selectedNiches.has(niche.id); return <button key={niche.id} onClick={() => selected ? setPrimaryNiche(niche.id) : toggleNiche(niche.id)} onDoubleClick={() => toggleNiche(niche.id)} className={`rounded-full border px-3 py-2 text-xs font-black ${selected ? "border-cyan-300/45 bg-cyan-300/10 text-white" : "border-white/10 bg-white/[.035] text-slate-400"}`}>{primaryNiche === niche.id && <Star className="mr-1 inline text-amber-300" size={13} />}{nicheTitle(niche, progress.effectiveUILanguage)} {!niche.isReady && `· ${t("comingSoon")}`}</button>; })}</div></div>)}</div><p className="mt-3 text-xs text-slate-500">{t("primaryFocus")}: {selectedNiches.size ? primaryNicheLabel : "-"}</p></section>}

        {step === 4 && <section><h1 className="mt-3 font-display text-3xl font-black">{t("chooseLevel")}</h1>{!courseReady ? <div className="mt-7 space-y-4"><p className="text-sm text-slate-400">{t("moreRoadmap")}</p><Button onClick={() => complete("A0")}>{t("launchPath")}<ArrowRight size={17} /></Button></div> : <><p className="mt-2 text-sm text-slate-400">{t("placementChoiceTitle")}</p>{!manualLevel ? <div className="mt-7 grid gap-3"><Button onClick={() => complete("A0", `/placement/${language}`)}><ListChecks size={18} />{t("takePlacementTest")}</Button><Button variant="secondary" onClick={() => setManualLevel(true)}><Gauge size={18} />{t("chooseLevelManually")}</Button><Button variant="ghost" onClick={() => complete("A0")}><Play size={18} />{t("startFromBeginning")}</Button></div> : <div className="mt-7 grid gap-3 sm:grid-cols-2">{trackOptions.map((item) => { const itemLevel = item.levelId ?? "A0"; const selected = level === itemLevel; return <button key={item.id} onClick={() => setLevel(itemLevel)} className={`flex min-h-24 items-center justify-between gap-3 rounded-2xl border p-4 text-left ${selected ? "border-violet-300/50 bg-violet-300/10" : "border-white/10 bg-white/[.035]"}`}><strong>{getLevelDisplayName(itemLevel, language, progress.nativeLanguage)}</strong>{selected && <Check className="text-violet-300" size={18} />}</button>; })}<Button className="sm:col-span-2" onClick={() => complete(level)}>{t("launchPath")}<ArrowRight size={17} /></Button></div>}</>}</section>}

        {step < 4 && <div className="mt-8 flex justify-between"><Button variant="ghost" onClick={() => setStep((value) => Math.max(0, value - 1))} disabled={step === 0}><ArrowLeft size={17} />{t("back")}</Button><Button onClick={() => setStep((value) => value + 1)} disabled={step === 0 && displayName.trim().length < 2}>{t("continue")}<ArrowRight size={17} /></Button></div>}
        {step === 4 && manualLevel && courseReady && <Button variant="ghost" className="mt-5" onClick={() => setManualLevel(false)}><ArrowLeft size={17} />{t("back")}</Button>}
        {step === 4 && (!manualLevel || !courseReady) && <Button variant="ghost" className="mt-5" onClick={() => setStep(3)}><ArrowLeft size={17} />{t("back")}</Button>}
      </div>
    </div>
  </main>;
}

function ProfileField({ label, placeholder, value, onChange, required = false }: { label: string; placeholder: string; value: string; onChange: (value: string) => void; required?: boolean }) {
  return <label className="block"><span className="text-xs font-black text-cyan-200">{label}{required && <span className="text-rose-300"> *</span>}</span><input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="mt-2 min-h-12 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm font-bold outline-none placeholder:text-slate-600 focus:border-cyan-300/50" /></label>;
}

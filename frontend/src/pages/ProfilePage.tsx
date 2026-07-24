import { BookOpen, CreditCard, Flame, Heart, Languages as LanguagesIcon, LogOut, RotateCcw, Settings, Sparkles, Star, Trophy, UserRound, Volume2, Zap } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AchievementBadge, achievementCatalog } from "../components/learning/AchievementBadge";
import { StatCard } from "../components/learning/StatCard";
import { PageContainer } from "../components/layout/PageContainer";
import { NativeLanguageSelector } from "../components/NativeLanguageSelector";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Modal } from "../components/ui/Modal";
import { useApp } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";
import { courses, getLevelDisplayName, allLearningLanguages, getLearningLanguageLabel, isCourseAvailable } from "../data/fallbackCourses";
import { groupedNiches, nicheCategory, nicheTitle } from "../data/niches";
import { useTranslation } from "../i18n/useTranslation";
import type { LanguageCode, LevelDecisionAfterNicheChange } from "../types/index";
import { getNativeLanguageInfo } from "../utils/storage";

export function ProfilePage() {
  const { progress, resetProgress, selectLanguage, updateProfileInfo, updateNiches, applyPlacement } = useApp();
  const { user, signOut } = useAuth(); const { t } = useTranslation();
  const [confirmReset, setConfirmReset] = useState(false); const [pendingLanguage, setPendingLanguage] = useState<LanguageCode>();
  const [editingNiche, setEditingNiche] = useState(false); const [decisionOpen, setDecisionOpen] = useState(false);
  const [draftNiches, setDraftNiches] = useState<Set<string>>(new Set(progress.selectedNiches));
  const [draftPrimary, setDraftPrimary] = useState<string | null>(progress.primaryNiche);
  const navigate = useNavigate();
  const language = allLearningLanguages.find((item) => item.code === progress.selectedLanguage) ?? allLearningLanguages[0];
  const nativeLanguage = getNativeLanguageInfo(progress.nativeLanguage); const currentLevelName = getLevelDisplayName(progress.currentLevel, progress.learningLanguage, progress.nativeLanguage);
  const displayName = progress.displayName || user?.name || "Nova learner";
  const avatar = displayName.trim().slice(0, 1).toUpperCase() || "N";
  const languageName = (code: LanguageCode) => getLearningLanguageLabel(code);
  const groups = groupedNiches();
  const allNiches = Object.values(groups).flat();
  const selectedNicheLabels = progress.selectedNiches.map((id) => nicheTitle(allNiches.find((niche) => niche.id === id) ?? allNiches[0], progress.effectiveUILanguage)).join(", ");
  const primaryNicheLabel = progress.primaryNiche ? nicheTitle(allNiches.find((niche) => niche.id === progress.primaryNiche) ?? allNiches[0], progress.effectiveUILanguage) : "-";

  const toggleDraftNiche = (id: string) => {
    setDraftNiches((current) => {
      const next = new Set(current);
      next.has(id) ? next.delete(id) : next.add(id);
      if (!next.size) next.add(id);
      if (!draftPrimary || !next.has(draftPrimary)) setDraftPrimary([...next][0] ?? id);
      return next;
    });
  };
  const saveNicheChange = () => { updateNiches([...draftNiches], draftPrimary); setEditingNiche(false); setDecisionOpen(true); };
  const chooseDecision = (decision: LevelDecisionAfterNicheChange) => {
    updateNiches([...draftNiches], draftPrimary, decision); setDecisionOpen(false);
    if (decision === "placement") navigate(`/placement/${progress.selectedLanguage}`);
    if (decision === "manual") navigate("/onboarding");
    if (decision === "restart") {
      const course = courses.find((item) => item.language === progress.selectedLanguage);
      if (!course) {
        applyPlacement({ completed: true, score: 0, level: "A0", date: new Date().toISOString(), startingUnitId: "", startingLessonId: "" }, true);
        return;
      }
      const first = course.levels[0].units[0].lessons[0];
      applyPlacement({ completed: true, score: 0, level: "A0", date: new Date().toISOString(), startingUnitId: first.unitId, startingLessonId: first.id }, true);
    }
  };

  return <PageContainer className="py-8 sm:py-11"><section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-violet-400/15 via-fuchsia-400/[.08] to-cyan-300/[.08] p-6 sm:p-9"><div className="relative flex flex-col gap-6 sm:flex-row sm:items-center"><div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 text-2xl font-black">{avatar}</div><div className="flex-1"><Badge tone="cyan">{t("profileTitle")}</Badge><h1 className="mt-3 font-display text-3xl font-black">{displayName}</h1><p className="mt-1 text-sm text-slate-500">{user?.email}</p><p className="mt-4 text-sm font-extrabold text-cyan-200">{language.flag} {languageName(language.code)} · {currentLevelName} · {progress.dailyGoalMinutes} {t("minutesDay")}</p></div><Button variant="ghost" onClick={signOut}><LogOut size={17} />{t("signOut")}</Button></div></section>

  <section className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4"><StatCard icon={Zap} label={t("totalXp")} value={progress.totalXp} color="text-violet-300" /><StatCard icon={Flame} label={t("streak")} value={progress.streak} color="text-orange-300" /><StatCard icon={BookOpen} label={t("lessonsComplete")} value={progress.completedLessonIds.length} color="text-cyan-300" /><StatCard icon={CreditCard} label={t("flashcards")} value={progress.savedFlashcards.length} color="text-fuchsia-300" /></section>

  <div className="mt-7 grid gap-5 lg:grid-cols-2">
    <SettingsCard icon={<UserRound />} title={t("userInformation")} eyebrow={t("settings")}>
      <div className="grid gap-3 sm:grid-cols-2"><ProfileInput label={t("displayName")} value={progress.displayName} onChange={(displayName) => updateProfileInfo({ displayName })} /><ProfileInput label={t("ageRange")} value={progress.ageRange} onChange={(ageRange) => updateProfileInfo({ ageRange })} /><ProfileInput label={t("country")} value={progress.country} onChange={(country) => updateProfileInfo({ country })} /><ProfileInput label={t("region")} value={progress.region} onChange={(region) => updateProfileInfo({ region })} /><ProfileInput label={t("occupationStatus")} value={progress.occupationStatus} onChange={(occupationStatus) => updateProfileInfo({ occupationStatus })} /></div>
    </SettingsCard>

    <SettingsCard icon={<LanguagesIcon />} title={t("languageSettingsSection")} eyebrow={t("settings")}>
      <div className="grid gap-3 sm:grid-cols-3"><InfoTile label={t("nativeLanguage")} value={`${nativeLanguage.flagEmoji} ${nativeLanguage.nativeName}`} sub={nativeLanguage.name} /><InfoTile label={t("uiLanguage")} value={progress.effectiveUILanguage === "vi" ? t("vietnamese") : progress.effectiveUILanguage === "ja" ? t("japanese") : t("english")} sub={progress.effectiveUILanguage.toUpperCase()} /><InfoTile label={t("learningLanguage")} value={`${language.flag} ${languageName(progress.learningLanguage)}`} sub={progress.learningLanguage.toUpperCase()} /></div>
      <div className="mt-5"><NativeLanguageSelector compact /></div>
      <div className="mt-5 grid max-h-64 gap-2 overflow-y-auto sm:grid-cols-3">{allLearningLanguages.map((item) => { const available = isCourseAvailable(item.code); return <button key={item.code} disabled={!available} onClick={() => available && item.code !== progress.selectedLanguage && setPendingLanguage(item.code)} className={`rounded-2xl border p-3 text-left text-sm font-black ${item.code === progress.selectedLanguage ? "border-violet-300/45 bg-violet-300/10" : "border-white/10 bg-white/[.035]"} ${!available ? "cursor-not-allowed opacity-45" : ""}`}>{item.flag} {languageName(item.code)}{!available ? ` · ${t("comingSoon")}` : ""}</button>; })}</div>
    </SettingsCard>

    <SettingsCard icon={<Sparkles />} title={t("learningPreferences")} eyebrow={t("primaryFocus")}>
      <InfoTile label={t("changeNiche")} value={selectedNicheLabels || "-"} sub={`${t("primaryFocus")}: ${primaryNicheLabel}`} />
      <div className="mt-4 flex flex-wrap gap-3"><Button onClick={() => { setDraftNiches(new Set(progress.selectedNiches)); setDraftPrimary(progress.primaryNiche); setEditingNiche(true); }}>{t("changeNiche")}</Button><Link to={`/placement/${progress.selectedLanguage}`}><Button variant="secondary">{t("takePlacementTest")}</Button></Link><Button variant="ghost">{t("changeLevel")}: {currentLevelName}</Button></div>
    </SettingsCard>

    <SettingsCard icon={<Trophy />} title={t("progressSection")} eyebrow={t("completed")}>
      <div className="grid gap-3 sm:grid-cols-2"><InfoTile label={t("completedLessons")} value={String(progress.completedLessonIds.length)} /><InfoTile label={t("mistakesSummary")} value={String(progress.mistakes.filter((item) => !item.improved).length)} /><InfoTile label={t("streak")} value={String(progress.streak)} /><InfoTile label={t("totalXp")} value={String(progress.totalXp)} /></div>
    </SettingsCard>

    <SettingsCard icon={<Volume2 />} title={t("appSettings")} eyebrow="NovaLang"><InfoTile label={t("soundPronunciation")} value={t("enabled")} /><InfoTile label={t("offlinePack")} value={t("noPaidApi")} /></SettingsCard>
    <SettingsCard icon={<Heart />} title={t("account")} eyebrow={t("legal")}><InfoTile label={t("termsOfService")} value={t("termsPlaceholder")} /><InfoTile label={t("privacyPolicy")} value={t("privacyPlaceholder")} /><div className="mt-4 flex flex-wrap gap-3"><Button variant="ghost" onClick={signOut}><LogOut size={17} />{t("signOut")}</Button><Button variant="danger" onClick={() => setConfirmReset(true)}><RotateCcw size={17} />{t("resetLocalData")}</Button></div></SettingsCard>
  </div>

  <section className="mt-7"><div className="mb-5 flex items-center gap-3"><Trophy className="text-amber-300" /><div><p className="text-xs font-black uppercase tracking-wider text-amber-300">{t("achievementGrid")}</p><h2 className="font-display text-2xl font-black">{t("completed")}</h2></div></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{achievementCatalog.map((achievement) => <AchievementBadge key={achievement.id} titleKey={achievement.titleKey} descriptionKey={achievement.descriptionKey} earned={progress.achievements.includes(achievement.id)} />)}</div></section>

  <Modal open={editingNiche} title={t("changeNiche")} onClose={() => setEditingNiche(false)}><div className="max-h-[65vh] space-y-4 overflow-y-auto pr-1">{Object.entries(groups).map(([category, niches]) => <div key={category} className="rounded-2xl border border-white/10 bg-white/[.035] p-4"><h3 className="font-display font-black">{nicheCategory(category, progress.effectiveUILanguage)}</h3><div className="mt-3 flex flex-wrap gap-2">{niches.map((niche) => { const selected = draftNiches.has(niche.id); return <button key={niche.id} onClick={() => selected ? setDraftPrimary(niche.id) : toggleDraftNiche(niche.id)} onDoubleClick={() => toggleDraftNiche(niche.id)} className={`rounded-full border px-3 py-2 text-xs font-black ${selected ? "border-cyan-300/45 bg-cyan-300/10 text-white" : "border-white/10 bg-white/[.035] text-slate-400"}`}>{draftPrimary === niche.id && <Star className="mr-1 inline text-amber-300" size={13} />}{nicheTitle(niche, progress.effectiveUILanguage)} {!niche.isReady && `· ${t("comingSoon")}`}</button>; })}</div></div>)}</div><Button className="mt-5 w-full" onClick={saveNicheChange}>{t("save")}</Button></Modal>
  <Modal open={decisionOpen} title={t("nicheChangeQuestion")} onClose={() => setDecisionOpen(false)}><div className="grid gap-3"><Button onClick={() => chooseDecision("placement")}>{t("takePlacementTest")}</Button><Button variant="secondary" onClick={() => chooseDecision("manual")}>{t("enterLevelManually")}</Button><Button variant="ghost" onClick={() => chooseDecision("restart")}>{t("startFromBeginning")}</Button><Button variant="ghost" onClick={() => chooseDecision("keep")}>{t("keepCurrentLevel")}</Button></div></Modal>
  <Modal open={!!pendingLanguage} title={t("learningLanguage")} onClose={() => setPendingLanguage(undefined)}><LanguagesIcon className="text-cyan-300" /><p className="mt-4 text-sm leading-6 text-slate-400">{t("changeLearningWarning")}</p><div className="mt-6 flex gap-3"><Button variant="ghost" className="flex-1" onClick={() => setPendingLanguage(undefined)}>{t("cancel")}</Button><Button className="flex-1" onClick={() => { if (pendingLanguage) selectLanguage(pendingLanguage); setPendingLanguage(undefined); }}>{t("continue")}</Button></div></Modal>
  <Modal open={confirmReset} title={t("resetTitle")} onClose={() => setConfirmReset(false)}><Sparkles className="text-rose-300" /><p className="mt-4 text-sm leading-6 text-slate-400">{t("resetBody")}</p><div className="mt-6 flex gap-3"><Button variant="ghost" className="flex-1" onClick={() => setConfirmReset(false)}>{t("cancel")}</Button><Button variant="danger" className="flex-1" onClick={() => { resetProgress(); setConfirmReset(false); }}>{t("resetEverything")}</Button></div></Modal></PageContainer>;
}

function SettingsCard({ icon, eyebrow, title, children }: { icon: ReactNode; eyebrow: string; title: string; children: ReactNode }) {
  return <Card className="p-6"><div className="mb-5 flex items-center gap-3"><span className="text-cyan-300">{icon}</span><div><p className="text-xs font-black uppercase tracking-wider text-cyan-300">{eyebrow}</p><h2 className="font-display text-2xl font-black">{title}</h2></div></div>{children}</Card>;
}

function InfoTile({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return <div className="rounded-2xl border border-white/10 bg-white/[.035] p-4"><p className="text-[10px] font-black uppercase tracking-wider text-cyan-300">{label}</p><strong className="mt-2 block text-sm">{value}</strong>{sub && <span className="text-xs text-slate-500">{sub}</span>}</div>;
}

function ProfileInput({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <label className="block"><span className="text-[10px] font-black uppercase tracking-wider text-cyan-300">{label}</span><input value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 h-11 w-full rounded-xl border border-white/10 bg-black/20 px-3 text-sm font-bold outline-none focus:border-cyan-300/50" /></label>;
}

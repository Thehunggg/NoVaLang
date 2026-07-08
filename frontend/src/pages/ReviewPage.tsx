import { BookOpenCheck, Brain, Check, Languages, RotateCcw, Sparkles, Volume2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Mascot } from "../components/learning/Mascot";
import { PageContainer } from "../components/layout/PageContainer";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { SpeakerButton } from "../components/ui/SpeakerButton";
import { useApp } from "../context/AppContext";
import { useTranslation } from "../i18n/useTranslation";
import type { ReviewItem } from "../types/index";
import { getLocalizedAnswers } from "../utils/localizedText";

type Mode = "daily" | "weak" | "grammar" | "pronunciation";
export function ReviewPage() {
  const { progress, dueReviewItems, answerReviewItem, addXP } = useApp(); const { t } = useTranslation(); const [mode, setMode] = useState<Mode>("daily"); const [index, setIndex] = useState(0); const [revealed, setRevealed] = useState(false);
  const items = useMemo(() => { const languageItems = progress.reviewItems.filter((item) => item.language === progress.selectedLanguage); if (mode === "daily") return dueReviewItems.filter((item) => item.language === progress.selectedLanguage); if (mode === "weak") return languageItems.filter((item) => item.wrongCount >= item.correctCount).sort((a, b) => b.wrongCount - a.wrongCount); return languageItems.filter((item) => item.itemType === mode); }, [mode, progress.reviewItems, progress.selectedLanguage, dueReviewItems]);
  const item: ReviewItem | undefined = items[index];
  const meaning = item ? getLocalizedAnswers(item.meaningTranslations, progress.nativeLanguage)[0] ?? item.meaning : "";
  const chooseMode = (next: Mode) => { setMode(next); setIndex(0); setRevealed(false); };
  const answer = (correct: boolean) => { if (!item) return; answerReviewItem(item.id, correct); if (correct) addXP(2); setRevealed(false); setIndex((value) => value + 1); };
  const modes: { id: Mode; label: string; icon: typeof Brain }[] = [{ id: "daily", label: t("dailyReview"), icon: BookOpenCheck }, { id: "weak", label: t("weakWords"), icon: Brain }, { id: "grammar", label: t("grammarReview"), icon: Languages }, { id: "pronunciation", label: t("pronunciationReview"), icon: Volume2 }];
  return <PageContainer className="py-8 sm:py-11"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><Badge tone="cyan"><Sparkles size={12} />{t("reviewChamber")}</Badge><h1 className="mt-4 font-display text-3xl font-black sm:text-4xl">{t("dailyReview")}</h1><p className="mt-3 text-sm text-slate-500">{dueReviewItems.length} {t("dueItems")}</p></div><Mascot size="sm" /></div><div className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-4">{modes.map(({ id, label, icon: Icon }) => <button key={id} onClick={() => chooseMode(id)} className={`rounded-2xl border p-4 text-left transition ${mode === id ? "border-cyan-300/40 bg-cyan-300/10" : "border-white/10 bg-white/[.04] hover:border-violet-300/30"}`}><Icon className={mode === id ? "text-cyan-300" : "text-slate-500"} size={20} /><strong className="mt-3 block text-sm">{label}</strong></button>)}</div>{item ? <Card className="mx-auto mt-7 max-w-2xl p-7 text-center sm:p-10"><p className="text-xs font-black uppercase tracking-[.18em] text-violet-300">{item.itemType} · {index + 1}/{items.length}</p><div className="mt-8 flex items-center justify-center gap-3"><h2 className="font-display text-4xl font-black text-white">{item.label}</h2>{item.speechText && <SpeakerButton text={item.speechText} languageCode={item.language} size="sm" />}</div>{revealed ? <><div className="mt-6 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-5 text-lg font-bold text-cyan-100">{meaning}</div><div className="mt-6 grid grid-cols-2 gap-3"><Button variant="danger" onClick={() => answer(false)}><RotateCcw size={17} />{t("reviewAgain")}</Button><Button onClick={() => answer(true)}><Check size={17} />{t("knewIt")}</Button></div></> : <Button className="mt-8" onClick={() => setRevealed(true)}>{t("checkAnswer")}</Button>}</Card> : <Card className="mt-7 p-10 text-center"><Sparkles className="mx-auto text-emerald-300" size={42} /><h2 className="mt-5 font-display text-2xl font-black">{t("reviewEmpty")}</h2><p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-500">{t("reviewEmptyHelp")}</p><Link to="/"><Button className="mt-6">{t("coursePathButton")}</Button></Link></Card>}</PageContainer>;
}

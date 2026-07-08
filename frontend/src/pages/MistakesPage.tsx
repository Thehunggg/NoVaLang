import { Check, RotateCcw, Sparkles, TriangleAlert, X } from "lucide-react";
import { useState } from "react";
import { ExerciseRenderer } from "../components/learning/ExerciseRenderer";
import { Mascot } from "../components/learning/Mascot";
import { PageContainer } from "../components/layout/PageContainer";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { useApp } from "../context/AppContext";
import { useTranslation } from "../i18n/useTranslation";
import { getExerciseExplanation, getExerciseQuestion } from "../utils/checkAnswer";

export function MistakesPage() {
  const { progress, markMistakeImproved, addMistake } = useApp();
  const { t } = useTranslation();
  const active = progress.mistakes.filter((item) => !item.improved);
  const [reviewId, setReviewId] = useState<string>();
  const [feedback, setFeedback] = useState<boolean | null>(null);
  const review = progress.mistakes.find((item) => item.exercise.id === reviewId);

  const answer = (correct: boolean) => {
    setFeedback(correct);
    if (correct && review) markMistakeImproved(review.exercise.id);
    else if (review) addMistake(review.exercise, review.lessonId);
  };

  return <PageContainer className="py-8 sm:py-11"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><Badge tone="amber"><TriangleAlert size={12} /> {t("mistakeReview")}</Badge><h1 className="mt-4 font-display text-3xl font-black sm:text-4xl">{t("mistakesTitle")}</h1></div><Mascot size="sm" /></div>{review ? <Card className="mx-auto mt-8 max-w-3xl p-5 sm:p-7"><div className="mb-5 flex items-center justify-between"><div><p className="text-xs font-black uppercase tracking-wider text-amber-300">{t("retrySignal")} · {review.attempts}</p><h2 className="mt-1 font-display text-xl font-black">{getExerciseQuestion(review.exercise, progress.nativeLanguage)}</h2></div><button onClick={() => { setReviewId(undefined); setFeedback(null); }} className="rounded-xl p-2 text-slate-500 hover:bg-white/5"><X /></button></div><ExerciseRenderer exercise={review.exercise} onAnswer={answer} />{feedback !== null && <div className={`mt-5 rounded-2xl border p-4 ${feedback ? "border-emerald-300/25 bg-emerald-300/10" : "border-rose-300/25 bg-rose-300/10"}`}><p className={feedback ? "font-black text-emerald-200" : "font-black text-rose-200"}>{feedback ? <Check className="mr-2 inline" /> : <RotateCcw className="mr-2 inline" />}{feedback ? t("improved") : t("notQuite")}</p><p className="mt-2 text-sm text-slate-400">{getExerciseExplanation(review.exercise, progress.nativeLanguage)}</p><Button className="mt-4" onClick={() => { setReviewId(undefined); setFeedback(null); }}>{t("continue")}</Button></div>}</Card> : active.length ? <div className="mt-8 grid gap-4 md:grid-cols-2">{active.map((mistake) => <Card key={mistake.exercise.id} className="p-5"><div className="flex items-start justify-between gap-3"><Badge tone="slate">{mistake.exercise.type.split("_").join(" ")}</Badge><span className="text-xs font-bold text-slate-600">×{mistake.attempts}</span></div><h2 className="mt-4 font-display text-lg font-black">{getExerciseQuestion(mistake.exercise, progress.nativeLanguage)}</h2><p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">{mistake.exercise.nativeTranslation}</p><Button variant="secondary" className="mt-5 w-full" onClick={() => setReviewId(mistake.exercise.id)}>{t("retrySignal")} <RotateCcw size={16} /></Button></Card>)}</div> : <Card className="mt-8 p-10 text-center"><Sparkles className="mx-auto text-emerald-300" size={44} /><h2 className="mt-5 font-display text-2xl font-black">{t("noMistakes")}</h2></Card>}</PageContainer>;
}



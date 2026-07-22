import { ArrowRight, Brain, Check, Heart, RotateCcw, Sparkles, Target, X, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ExerciseRenderer } from "../components/learning/ExerciseRenderer";
import { Mascot } from "../components/learning/Mascot";
import { QuizCard } from "../components/learning/QuizCard";
import { PageContainer } from "../components/layout/PageContainer";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { ProgressBar } from "../components/ui/ProgressBar";
import { useApp } from "../context/AppContext";
import { languages } from "../data/fallbackCourses";
import { fetchPractice } from "../services/api";
import type { Exercise, PracticeSet } from "../types/index";
import { exerciseTypeKey } from "../i18n/labels";
import { useTranslation } from "../i18n/useTranslation";
import { getExerciseExplanation, getExerciseQuestion } from "../utils/checkAnswer";
import { validatePracticeExercises } from "../utils/practiceValidation";

export function PracticePage() {
  const { language = "en" } = useParams();
  const { t } = useTranslation();
  const { progress, completePractice, addMistake } = useApp();
  const [practice, setPractice] = useState<PracticeSet>();
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<{ correct: boolean; explanation: string } | null>(null);
  const meta = languages.find((item) => item.code === language) ?? languages[0];

  const load = () => fetchPractice(meta.code, progress.completedLessonIds.filter((id) => id.startsWith(meta.code))).then((result) => { validatePracticeExercises(meta.code, progress.nativeLanguage, result.data.exercises); setPractice(result.data); });
  useEffect(() => { load(); }, [language, progress.nativeLanguage]);
  const exercise: Exercise | undefined = practice?.exercises[index];
  const completedPool = progress.completedLessonIds.filter((id) => id.startsWith(meta.code)).length;

  const answer = (correct: boolean) => {
    if (correct) setScore((value) => value + 1);
    else addMistake(exercise!, `practice-${meta.code}`);
    setFeedback({ correct, explanation: getExerciseExplanation(exercise!, progress.nativeLanguage) });
  };
  const next = () => {
    if (!practice) return;
    if (index < practice.exercises.length - 1) { setIndex((value) => value + 1); setFeedback(null); }
    else { completePractice(score, practice.exercises.length); setFinished(true); }
  };
  const restart = () => { setStarted(false); setFinished(false); setIndex(0); setScore(0); setFeedback(null); load(); };

  if (!practice) return <div className="grid min-h-[65vh] place-items-center text-sm font-bold text-slate-500">{t("loading")}</div>;
  if (!practice.exercises.length) return <PageContainer className="grid min-h-[70vh] place-items-center"><Card className="max-w-md p-8 text-center"><Brain className="mx-auto text-violet-300" size={42} /><h1 className="mt-5 font-display text-2xl font-black">{t("reviewEmpty")}</h1><p className="mt-3 text-sm text-slate-500">{t("reviewEmptyHelp")}</p><Link to="/"><Button className="mt-5">{t("coursePathButton")}</Button></Link></Card></PageContainer>;

  if (finished) {
    const accuracy = Math.round((score / practice.exercises.length) * 100);
    return (
      <PageContainer className="py-10">
        <Card className="mx-auto max-w-xl p-8 text-center">
          <Mascot size="md" />
          <Badge tone="green">{t("practiceComplete")}</Badge>
          <h1 className="mt-4 font-display text-3xl font-black">{t("practiceHeartRestored")}</h1>
          <p className="mt-2 text-sm text-slate-500">{t("practiceAwardsHelp")}</p>
          <div className="mt-7 grid grid-cols-3 gap-3">
            <div className="rounded-2xl bg-violet-300/10 p-4"><Zap className="mx-auto text-violet-300" /><strong className="mt-2 block">+{Math.max(5, Math.round((score / practice.exercises.length) * 15))}</strong><span className="text-xs text-slate-500">XP</span></div>
            <div className="rounded-2xl bg-cyan-300/10 p-4"><Target className="mx-auto text-cyan-300" /><strong className="mt-2 block">{accuracy}%</strong><span className="text-xs text-slate-500">{t("accuracy")}</span></div>
            <div className="rounded-2xl bg-rose-300/10 p-4"><Heart className="mx-auto text-rose-300" fill="currentColor" /><strong className="mt-2 block">+1</strong><span className="text-xs text-slate-500">{t("heart")}</span></div>
          </div>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button variant="ghost" className="flex-1" onClick={restart}><RotateCcw size={17} /> {t("newPracticeSet")}</Button>
            <Link to="/" className="flex-1"><Button className="w-full">{t("coursePathButton")} <ArrowRight size={17} /></Button></Link>
          </div>
        </Card>
      </PageContainer>
    );
  }

  if (!started) {
    return (
      <PageContainer className="py-10">
        <Card className="mx-auto max-w-2xl overflow-hidden">
          <div className="bg-gradient-to-br from-violet-400/15 to-cyan-300/10 p-8">
            <Mascot size="md" message={t("practiceNovaSelects")} />
            <Badge tone="pink"><Sparkles size={12} /> {t("reviewChamber")}</Badge>
            <h1 className="mt-4 font-display text-3xl font-black">{practice.title}</h1>
            <p className="mt-3 text-sm leading-6 text-slate-400">{t("practiceMixedHelp", { count: practice.exercises.length })}</p>
          </div>
          <div className="p-8">
            <div className="flex items-center justify-between rounded-2xl bg-white/[.04] p-4">
              <span className="flex items-center gap-2 font-extrabold"><Brain className="text-violet-300" /> {t("completedLessonPool")}</span>
              <span className="text-sm font-black text-cyan-300">{completedPool || t("recoveryMode")}</span>
            </div>
            <Button className="mt-6 w-full" onClick={() => setStarted(true)}>{t("startPractice")} <ArrowRight size={18} /></Button>
          </div>
        </Card>
      </PageContainer>
    );
  }

  return (
    <PageContainer className="py-7 sm:py-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-5 flex items-center gap-4">
          <Link to="/" className="rounded-xl p-2 text-slate-500 hover:bg-white/5"><X size={19} /></Link>
          <div className="flex-1"><ProgressBar value={index + 1} max={practice.exercises.length} /></div>
          <span className="text-sm font-black text-cyan-300">{score} {t("correct")}</span>
        </div>
        <QuizCard
          eyebrow={`${t("practice")} · ${exercise ? t(exerciseTypeKey(exercise.type)) : t("review")}`}
          title={exercise ? getExerciseQuestion(exercise, progress.nativeLanguage) : t("review")}
        >
          {exercise && <ExerciseRenderer exercise={exercise} onAnswer={answer} />}
          {feedback && (
            <div className={`mt-5 rounded-2xl border p-4 ${feedback.correct ? "border-emerald-300/25 bg-emerald-300/10" : "border-rose-300/25 bg-rose-300/10"}`}>
              <p className={feedback.correct ? "font-black text-emerald-200" : "font-black text-rose-200"}>
                {feedback.correct ? <Check className="mr-2 inline" size={18} /> : <X className="mr-2 inline" size={18} />}
                {feedback.correct ? t("correctSignal") : t("notQuite")}
              </p>
              <p className="mt-2 text-sm text-slate-400">{feedback.explanation}</p>
              <Button className="mt-4 w-full" onClick={next}>
                {index === practice.exercises.length - 1 ? t("completed") : t("nextExercise")}
                <ArrowRight size={17} />
              </Button>
            </div>
          )}
        </QuizCard>
      </div>
    </PageContainer>
  );
}

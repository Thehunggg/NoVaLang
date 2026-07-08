import { ArrowLeft, ArrowRight, Check, Gauge, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { ExerciseRenderer } from "../components/learning/ExerciseRenderer";
import { Mascot } from "../components/learning/Mascot";
import { QuizCard } from "../components/learning/QuizCard";
import { PageContainer } from "../components/layout/PageContainer";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { ProgressBar } from "../components/ui/ProgressBar";
import { courses, getLevelDisplayName, isLanguageCode } from "../data/fallbackCourses";
import { useApp } from "../context/AppContext";
import { useTranslation } from "../i18n/useTranslation";
import { fetchPlacement } from "../services/api";
import type { LanguageCode, LevelId, PlacementQuestion, PlacementResult } from "../types/index";
import { getExerciseExplanation, getExerciseQuestion } from "../utils/checkAnswer";

const levelFromScore = (score: number): LevelId =>
  score <= 5 ? "A0" : score <= 15 ? "A1_1" : score <= 26 ? "A1_2" : score <= 36 ? "A2_1" : score <= 44 ? "A2_2" : score <= 51 ? "B1_1" : score <= 56 ? "B1_2" : "B2";

export function PlacementTestPage() {
  const { language = "" } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { progress } = useApp();
  const [questions, setQuestions] = useState<PlacementQuestion[]>([]);
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<{ correct: boolean; explanation: string } | null>(null);
  const code: LanguageCode | null = isLanguageCode(language) ? language : null;

  useEffect(() => {
    if (code) fetchPlacement(code).then(({ data }) => setQuestions(data));
  }, [code]);

  if (!code) return <Navigate to="/" replace />;

  const question = questions[index];
  const finish = () => {
    const level = levelFromScore(score);
    const course = courses.find((item) => item.language === code)!;
    const first = course.levels.find((item) => item.id === level)?.units[0]?.lessons[0] ?? course.levels[0].units[0].lessons[0];
    const result: PlacementResult = { completed: true, score, level, date: new Date().toISOString(), startingUnitId: first.unitId, startingLessonId: first.id };
    navigate("/placement-result", { state: result, replace: true });
  };

  if (!questions.length) return <div className="grid min-h-[65vh] place-items-center text-sm font-bold text-slate-500">{t("loading")}</div>;

  if (!started) return (
    <PageContainer className="grid min-h-[75vh] place-items-center py-10">
      <Card className="max-w-2xl overflow-hidden">
        <div className="bg-gradient-to-br from-violet-400/15 to-cyan-300/10 p-8 text-center sm:p-10">
          <Mascot size="md" />
          <Badge tone="cyan"><Gauge size={13} /> {questions.length} questions</Badge>
          <h1 className="mt-5 font-display text-3xl font-black sm:text-4xl">{t("placementTitle")}</h1>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-slate-400">{t("placementDescription")}</p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/"><Button variant="ghost" className="w-full"><ArrowLeft size={17} />{t("back")}</Button></Link>
            <Button onClick={() => setStarted(true)}>{t("startPlacement")}<ArrowRight size={17} /></Button>
          </div>
        </div>
      </Card>
    </PageContainer>
  );

  const questionLevelName = getLevelDisplayName(question.level, code, progress.nativeLanguage);

  return (
    <PageContainer className="py-8 sm:py-11">
      <div className="mx-auto max-w-3xl">
        <div className="mb-5 flex items-center gap-4">
          <Link to="/" className="rounded-xl p-2 text-slate-500 hover:bg-white/5"><X size={19} /></Link>
          <div className="flex-1"><ProgressBar value={index + 1} max={questions.length} /></div>
          <span className="text-sm font-black text-cyan-300">{index + 1}/{questions.length}</span>
        </div>
        <QuizCard eyebrow={`${t("placementQuestion")} · ${questionLevelName}`} title={getExerciseQuestion(question, progress.nativeLanguage)}>
          <ExerciseRenderer exercise={question} onAnswer={(correct) => { if (correct) setScore((value) => value + question.placementScore); setFeedback({ correct, explanation: getExerciseExplanation(question, progress.nativeLanguage) }); }} />
          {feedback && <div className={`mt-5 rounded-2xl border p-4 ${feedback.correct ? "border-emerald-300/25 bg-emerald-300/10" : "border-rose-300/25 bg-rose-300/10"}`}>
            <p className={feedback.correct ? "font-black text-emerald-200" : "font-black text-rose-200"}>{feedback.correct ? <Check className="mr-2 inline" size={18} /> : <X className="mr-2 inline" size={18} />}{feedback.correct ? t("correctSignal") : t("notQuite")}</p>
            <p className="mt-2 text-sm text-slate-400">{feedback.explanation}</p>
            <Button className="mt-4 w-full" onClick={() => { if (index === questions.length - 1) finish(); else { setIndex((value) => value + 1); setFeedback(null); } }}>{index === questions.length - 1 ? <><Sparkles size={17} />{t("placementResult")}</> : <>{t("nextExercise")}<ArrowRight size={17} /></>}</Button>
          </div>}
        </QuizCard>
      </div>
    </PageContainer>
  );
}

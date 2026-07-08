import { ArrowLeft, ArrowRight, BookMarked, Check, Clock3, Heart, Lock, Sparkles, Target, X, Zap } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
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
import { lessons } from "../data/fallbackCourses";
import { useTranslation } from "../i18n/useTranslation";
import { fetchLesson } from "../services/api";
import type { ContentItem, Lesson, MicroLesson, VocabularyItem } from "../types/index";
import { firstIncompleteMicroLesson } from "../utils/lessonEngine";

type Stage = "intro" | "content" | "exercise" | "microResult";
type Completion = ReturnType<ReturnType<typeof useApp>["completeMicroLesson"]>;

const contentText = (item: ContentItem) => item.kind === "pronunciation" ? [item.symbol, item.pronunciation, item.exampleWord, item.meaning, item.exampleSentence, item.sentenceTranslation] : item.kind === "vocabulary" ? [item.word, item.pronunciation ?? item.reading, item.meaning, item.exampleSentence, item.sentenceTranslation] : item.kind === "grammar" ? [item.title, item.pattern, item.explanation, item.examples[0]?.text, item.examples[0]?.translation] : [item.speaker, item.text, item.translation];

export function LessonPage() {
  const { lessonId = "" } = useParams();
  const { t } = useTranslation();
  const { progress, isLessonUnlocked, isMicroLessonUnlocked, setCurrentLesson, setCurrentMicroLesson, completeMicroLesson, loseHeart, addMistake, addFlashcard } = useApp();
  const [lesson, setLesson] = useState<Lesson>();
  const [micro, setMicro] = useState<MicroLesson>();
  const [stage, setStage] = useState<Stage>("intro");
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<{ correct: boolean; explanation: string } | null>(null);
  const [completion, setCompletion] = useState<Completion>();

  useEffect(() => {
    let active = true;
    fetchLesson(lessonId).then(({ data }) => {
      if (!active || !data) return;
      setLesson(data);
      setMicro(firstIncompleteMicroLesson(data, progress.completedMicroLessonIds) ?? data.microLessons[0]);
    });
    setStage("intro"); setIndex(0); setScore(0); setFeedback(null); setCompletion(undefined);
    return () => { active = false; };
  }, [lessonId]);

  useEffect(() => { if (lesson && isLessonUnlocked(lesson)) setCurrentLesson(lesson.id); }, [lesson?.id]);
  useEffect(() => { if (micro) setCurrentMicroLesson(micro.id); }, [micro?.id]);

  const completedCount = lesson?.microLessons.filter((item) => progress.completedMicroLessonIds.includes(item.id)).length ?? 0;
  const nextLesson = useMemo(() => completion?.nextLessonId ? lessons.find((item) => item.id === completion.nextLessonId) : undefined, [completion]);

  if (!lesson) return <div className="grid min-h-[65vh] place-items-center text-sm font-bold text-slate-500">{t("loading")}</div>;
  if (!isLessonUnlocked(lesson)) return <PageContainer className="grid min-h-[70vh] place-items-center py-12"><Card className="max-w-md p-8 text-center"><Lock className="mx-auto text-slate-600" size={44} /><h1 className="mt-5 font-display text-2xl font-black">{t("lockedLessonTitle")}</h1><p className="mt-3 text-sm text-slate-500">{t("lockedLessonText")}</p><Link to="/"><Button className="mt-6">{t("coursePathButton")}</Button></Link></Card></PageContainer>;

  const openMicro = (item: MicroLesson) => { if (!isMicroLessonUnlocked(lesson, item)) return; setMicro(item); setStage("content"); setIndex(0); setScore(0); setFeedback(null); setCompletion(undefined); };
  const answer = (correct: boolean) => { const exercise = micro?.exercises[index]; if (!exercise) return; if (correct) setScore((value) => value + 1); else { loseHeart(); addMistake(exercise, lesson.id); } setFeedback({ correct, explanation: exercise.explanation }); };
  const nextExercise = () => {
    if (!micro) return;
    if (index < micro.exercises.length - 1) { setIndex((value) => value + 1); setFeedback(null); return; }
    setCompletion(completeMicroLesson(micro, lesson, score, micro.exercises.length)); setStage("microResult");
  };
  const continueAfterResult = () => {
    const next = completion?.nextMicroLessonId ? lesson.microLessons.find((item) => item.id === completion.nextMicroLessonId) : undefined;
    if (next) openMicro(next); else setStage("intro");
  };

  if (stage === "exercise" && micro) {
    const exercise = micro.exercises[index];
    return <PageContainer className="py-7 sm:py-10"><div className="mx-auto max-w-3xl"><div className="mb-5 flex items-center gap-4"><button onClick={() => setStage("content")} className="rounded-xl p-2 text-slate-500 hover:bg-white/5 hover:text-white"><X size={19} /></button><div className="flex-1"><ProgressBar value={index + 1} max={micro.exercises.length} /></div><span className="flex items-center gap-1 text-sm font-black text-rose-300"><Heart size={17} fill="currentColor" />{progress.hearts}</span></div><p className="mb-3 text-center text-xs font-black uppercase tracking-wider text-cyan-300">{micro.title} · {index + 1}/{micro.exercises.length}</p><QuizCard eyebrow={`${exercise.type.split("_").join(" ")} · ${exercise.difficulty}`} title={exercise.question}><ExerciseRenderer exercise={exercise} onAnswer={answer} />{feedback && <div className={`mt-5 rounded-2xl border p-4 ${feedback.correct ? "border-emerald-300/25 bg-emerald-300/10" : "border-rose-300/25 bg-rose-300/10"}`}><p className={`flex items-center gap-2 font-black ${feedback.correct ? "text-emerald-200" : "text-rose-200"}`}>{feedback.correct ? <Check size={18} /> : <X size={18} />}{feedback.correct ? t("correctSignal") : t("notQuite")}</p><p className="mt-2 text-sm leading-6 text-slate-400">{feedback.explanation}</p>{progress.hearts === 0 && !feedback.correct ? <Link to={`/practice/${lesson.language}`}><Button className="mt-4 w-full">{t("practiceRecover")}</Button></Link> : <Button onClick={nextExercise} className="mt-4 w-full">{index === micro.exercises.length - 1 ? t("finishMicro") : t("nextExercise")}<ArrowRight size={17} /></Button>}</div>}</QuizCard></div></PageContainer>;
  }

  if (stage === "microResult" && micro && completion) {
    const accuracy = Math.round((score / micro.exercises.length) * 100);
    return <PageContainer className="py-10"><Card className="mx-auto max-w-2xl overflow-hidden"><div className="bg-gradient-to-br from-cyan-300/15 via-violet-400/15 to-fuchsia-400/15 p-8 text-center"><Mascot size="md" /><p className="mt-5 text-xs font-black uppercase tracking-[.2em] text-cyan-300">{completion.lessonCompleted ? t("lessonComplete") : t("microComplete")}</p><h1 className="mt-2 font-display text-3xl font-black">{micro.title}</h1></div><div className="p-6 sm:p-8"><div className="grid grid-cols-3 gap-3">{([[t("xpEarned"), `+${completion.xpEarned}`, Zap], [t("accuracy"), `${accuracy}%`, Target], [t("correct"), score, Check]] as [string, string | number, typeof Zap][]).map(([label, value, Icon]) => <div key={String(label)} className="rounded-2xl bg-white/[.04] p-4 text-center"><Icon className="mx-auto text-cyan-300" size={19} /><strong className="mt-2 block text-xl">{value}</strong><span className="text-[11px] font-bold text-slate-500">{label}</span></div>)}</div>{completion.lessonCompleted && <div className="mt-5 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4 text-sm text-emerald-100"><Sparkles className="mr-2 inline" size={17} />{t("questComplete")}: {lesson.title}</div>}<div className="mt-6 flex gap-3"><Link to="/" className="flex-1"><Button variant="ghost" className="w-full">{t("coursePathButton")}</Button></Link>{completion.nextMicroLessonId ? <Button className="flex-1" onClick={continueAfterResult}>{t("nextMicro")} <ArrowRight size={17} /></Button> : nextLesson ? <Link className="flex-1" to={`/lesson/${nextLesson.id}`}><Button className="w-full">{t("continue")} <ArrowRight size={17} /></Button></Link> : <Button className="flex-1" onClick={continueAfterResult}>{t("continue")}</Button>}</div></div></Card></PageContainer>;
  }

  if (stage === "content" && micro) return <PageContainer className="py-7 sm:py-10"><button onClick={() => setStage("intro")} className="mb-5 inline-flex items-center gap-2 text-sm font-black text-slate-500 hover:text-cyan-300"><ArrowLeft size={16} /> {lesson.title}</button><section className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-violet-400/10 to-cyan-300/[.06] p-6 sm:p-8"><div className="flex flex-col justify-between gap-5 sm:flex-row"><div><div className="flex gap-2"><Badge tone="cyan">{t("microLessons")} {micro.order}/{lesson.microLessons.length}</Badge><Badge tone="amber"><Clock3 size={12} /> {micro.estimatedMinutes} min</Badge><Badge tone="pink">+{micro.xpReward} XP</Badge></div><h1 className="mt-5 font-display text-3xl font-black">{micro.title}</h1><p className="mt-3 text-sm font-bold text-cyan-200"><Target className="mr-2 inline" size={16} />{micro.objective}</p><p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">{micro.explanation}</p></div><Mascot size="sm" /></div></section><div className="mt-5 grid gap-4 md:grid-cols-2">{micro.contentItems.map((item) => <ContentCard key={item.id} item={item} lesson={lesson} saved={item.kind === "vocabulary" && progress.savedFlashcards.some((card) => card.id === item.id)} onSave={addFlashcard} />)}</div>{progress.hearts === 0 ? <Card className="mt-5 p-6 text-center"><Heart className="mx-auto text-rose-300" /><p className="mt-3 text-sm text-slate-400">{t("practiceRecover")}</p><Link to={`/practice/${lesson.language}`}><Button className="mt-4">{t("practice")}</Button></Link></Card> : <Button className="mt-6 w-full sm:w-auto" onClick={() => { setIndex(0); setScore(0); setFeedback(null); setStage("exercise"); }}>{t("beginMicro")} · {micro.exercises.length} {t("exercises")} <ArrowRight size={17} /></Button>}</PageContainer>;

  return <PageContainer className="py-7 sm:py-10"><Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm font-black text-slate-500 hover:text-cyan-300"><ArrowLeft size={16} /> {t("coursePathButton")}</Link><section className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-violet-400/10 to-cyan-300/[.06] p-6 sm:p-9"><div className="flex flex-col justify-between gap-7 md:flex-row"><div><Badge tone="pink">{lesson.levelId} · {lesson.type}</Badge><h1 className="mt-5 font-display text-4xl font-black">{lesson.title}</h1><p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">{lesson.description}</p><div className="mt-5 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4 text-sm font-black text-cyan-100"><Target className="mr-2 inline" size={17} />{t("canDo")}: {lesson.canDo}</div></div><Mascot size="md" /></div></section><section className="mt-6"><div className="mb-4 flex items-end justify-between"><div><p className="text-xs font-black uppercase tracking-wider text-cyan-300">{t("microProgress")}</p><h2 className="font-display text-2xl font-black">{t("microLessons")}</h2></div><strong className="text-sm text-slate-400">{completedCount}/{lesson.microLessons.length}</strong></div><ProgressBar value={completedCount} max={lesson.microLessons.length} /><div className="mt-5 space-y-3">{lesson.microLessons.map((item) => { const done = progress.completedMicroLessonIds.includes(item.id); const unlocked = isMicroLessonUnlocked(lesson, item); const active = micro?.id === item.id; return <button key={item.id} disabled={!unlocked} onClick={() => openMicro(item)} className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${done ? "border-emerald-300/25 bg-emerald-300/10" : active ? "border-cyan-300/40 bg-cyan-300/10" : unlocked ? "border-white/10 bg-white/[.045] hover:border-violet-300/40" : "border-white/5 bg-white/[.02] opacity-50"}`}><span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl font-black ${done ? "bg-emerald-300 text-emerald-950" : unlocked ? "bg-violet-300/15 text-violet-200" : "bg-white/5 text-slate-600"}`}>{done ? <Check size={19} /> : unlocked ? item.order : <Lock size={16} />}</span><span className="min-w-0 flex-1"><strong className="block truncate">{item.title}</strong><span className="mt-1 block text-xs text-slate-500">{item.estimatedMinutes} min · {item.exercises.length} {t("exercises")} · +{item.xpReward} XP</span></span>{unlocked && <ArrowRight className="text-slate-600" size={18} />}</button>; })}</div></section></PageContainer>;
}

function ContentCard({ item, lesson, saved, onSave }: { item: ContentItem; lesson: Lesson; saved: boolean; onSave: (word: VocabularyItem, lessonId: string, language: Lesson["language"]) => void }) {
  const { t } = useTranslation();
  const parts = contentText(item).filter(Boolean) as string[];
  return <Card className="p-5"><div className="flex items-start justify-between gap-3"><Badge tone={item.kind === "pronunciation" ? "cyan" : item.kind === "grammar" ? "amber" : item.kind === "dialogue" ? "pink" : "green"}>{t(item.kind === "pronunciation" ? "pronunciation" : item.kind === "grammar" ? "grammar" : item.kind === "dialogue" ? "dialogue" : "vocabulary")}</Badge>{item.kind === "vocabulary" && <button disabled={saved} onClick={() => onSave(item, lesson.id, lesson.language)} title={saved ? t("saved") : t("saveFlashcard")} className={saved ? "text-emerald-300" : "text-slate-500 hover:text-cyan-300"}>{saved ? <Check size={18} /> : <BookMarked size={18} />}</button>}</div><h3 className="mt-4 font-display text-xl font-black text-white">{parts[0]}</h3>{parts.slice(1).map((part, index) => <p key={`${part}-${index}`} className={index === 0 ? "mt-2 font-bold text-cyan-300" : "mt-2 text-sm leading-6 text-slate-400"}>{part}</p>)}</Card>;
}


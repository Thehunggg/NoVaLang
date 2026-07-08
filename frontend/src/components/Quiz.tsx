import { ArrowLeft, ArrowRight, Check, PartyPopper, RotateCcw, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { QuizQuestion } from "../types";

interface QuizProps {
  questions: QuizQuestion[];
  title: string;
  xpLabel: string;
  backTo: string;
  onComplete: (score: number, total: number) => void;
}

export function Quiz({ questions, title, xpLabel, backTo, onComplete }: QuizProps) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => { setIndex(0); setSelected(null); setScore(0); setFinished(false); }, [questions]);

  if (!questions.length) return <div className="rounded-3xl bg-white p-8 text-center shadow-card"><p className="font-bold text-slate-500">No questions are available for this set.</p></div>;

  const restart = () => { setIndex(0); setSelected(null); setScore(0); setFinished(false); };
  const question = questions[index];
  const isCorrect = selected === question.correctAnswer;
  const percent = Math.round((score / questions.length) * 100);

  if (finished) return (
    <div className="overflow-hidden rounded-3xl border border-violet-100 bg-white shadow-soft">
      <div className="bg-gradient-to-br from-grape-600 to-fuchsia-500 px-6 py-10 text-center text-white sm:px-10">
        <PartyPopper className="mx-auto mb-4 animate-float" size={52} />
        <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-violet-100">Quest complete</p>
        <h2 className="mt-2 font-display text-3xl font-black">{percent >= 80 ? "Brilliant work!" : percent >= 50 ? "Nice momentum!" : "Every try builds fluency!"}</h2>
      </div>
      <div className="p-6 text-center sm:p-9">
        <div className="mx-auto grid max-w-md grid-cols-3 gap-3">
          <div className="rounded-2xl bg-violet-50 p-4"><strong className="block text-2xl text-grape-700">{score}/{questions.length}</strong><span className="text-xs font-bold text-slate-500">Correct</span></div>
          <div className="rounded-2xl bg-emerald-50 p-4"><strong className="block text-2xl text-emerald-700">{percent}%</strong><span className="text-xs font-bold text-slate-500">Accuracy</span></div>
          <div className="rounded-2xl bg-amber-50 p-4"><strong className="block text-2xl text-amber-700">{xpLabel}</strong><span className="text-xs font-bold text-slate-500">Reward</span></div>
        </div>
        <p className="mx-auto mt-6 max-w-md text-sm leading-6 text-slate-500">{percent >= 80 ? "You have a strong handle on this material. Keep the streak alive!" : "Review the examples and try again—the second pass is where things often click."}</p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <button onClick={restart} className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-violet-100 px-5 py-3 text-sm font-extrabold text-grape-700 transition hover:bg-violet-50"><RotateCcw size={17} /> Try again</button>
          <Link to={backTo} className="inline-flex items-center justify-center gap-2 rounded-xl bg-grape-600 px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-violet-200 transition hover:bg-grape-700">Continue learning <ArrowRight size={17} /></Link>
        </div>
      </div>
    </div>
  );

  const choose = (option: string) => {
    if (selected) return;
    setSelected(option);
    if (option === question.correctAnswer) setScore((value) => value + 1);
  };

  const next = () => {
    if (index === questions.length - 1) {
      const finalScore = score;
      setFinished(true);
      onComplete(finalScore, questions.length);
    } else {
      setIndex((value) => value + 1);
      setSelected(null);
    }
  };

  return (
    <section className="overflow-hidden rounded-3xl border border-violet-100 bg-white shadow-soft" aria-label={title}>
      <div className="border-b border-violet-100 px-5 py-5 sm:px-8">
        <div className="mb-3 flex items-center justify-between gap-4"><div><p className="text-xs font-extrabold uppercase tracking-wider text-grape-600">Quick quiz</p><h2 className="font-display text-xl font-black">{title}</h2></div><span className="shrink-0 text-sm font-extrabold text-slate-500">{index + 1} / {questions.length}</span></div>
        <div className="h-2 overflow-hidden rounded-full bg-violet-50"><div className="h-full rounded-full bg-gradient-to-r from-grape-600 to-fuchsia-500 transition-all duration-500" style={{ width: `${((index + 1) / questions.length) * 100}%` }} /></div>
      </div>
      <div className="p-5 sm:p-8">
        <h3 className="mb-6 text-xl font-extrabold leading-8 sm:text-2xl">{question.prompt}</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {question.options.map((option) => {
            const correct = selected && option === question.correctAnswer;
            const wrong = selected === option && option !== question.correctAnswer;
            return <button key={option} onClick={() => choose(option)} disabled={Boolean(selected)} className={`flex min-h-14 items-center justify-between rounded-2xl border-2 p-4 text-left text-sm font-bold transition ${correct ? "border-emerald-400 bg-emerald-50 text-emerald-800" : wrong ? "border-rose-300 bg-rose-50 text-rose-800" : selected ? "border-slate-100 bg-slate-50 text-slate-400" : "border-violet-100 bg-white hover:-translate-y-0.5 hover:border-grape-500 hover:bg-violet-50"}`}><span>{option}</span>{correct && <Check size={19} />}{wrong && <X size={19} />}</button>;
          })}
        </div>
        {selected && (
          <div className={`mt-6 rounded-2xl border p-4 ${isCorrect ? "border-emerald-200 bg-emerald-50" : "border-rose-200 bg-rose-50"}`}>
            <p className={`flex items-center gap-2 font-extrabold ${isCorrect ? "text-emerald-800" : "text-rose-800"}`}>{isCorrect ? <Check size={19} /> : <X size={19} />}{isCorrect ? "Exactly right!" : `The answer is “${question.correctAnswer}.”`}</p>
            <p className="mt-1 text-sm leading-6 text-slate-600">{isCorrect ? question.explanation : question.wrongAnswerExplanation}</p>
          </div>
        )}
        <div className="mt-6 flex items-center justify-between"><Link to={backTo} className="flex items-center gap-1 text-sm font-bold text-slate-400 hover:text-slate-700"><ArrowLeft size={16} /> Exit</Link><button onClick={next} disabled={!selected} className="inline-flex items-center gap-2 rounded-xl bg-grape-600 px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-violet-200 transition hover:bg-grape-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none">{index === questions.length - 1 ? "See results" : "Next question"}<ArrowRight size={17} /></button></div>
      </div>
    </section>
  );
}

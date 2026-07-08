import { Check, Headphones, Mic, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import type { Exercise, SupportedUILanguage } from "../../types/index";
import { useApp } from "../../context/AppContext";
import { useTranslation } from "../../i18n/useTranslation";
import { checkAnswer, getExerciseHint, getExerciseOptions, isMatchPairExercise } from "../../utils/checkAnswer";
import { Button } from "../ui/Button";
import { SpeakerButton } from "../ui/SpeakerButton";

export function ExerciseRenderer({ exercise, onAnswer }: { exercise: Exercise; onAnswer: (correct: boolean, answer: string | string[]) => void }) {
  const [text, setText] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const { t } = useTranslation();
  const { progress } = useApp();

  useEffect(() => {
    setText("");
    setSelected([]);
    setMatches({});
    setSubmitted(false);
  }, [exercise.id]);

  const submit = (answer: string | string[]) => {
    if (submitted) return;
    setSubmitted(true);
    onAnswer(checkAnswer(answer, exercise, progress.nativeLanguage).correct, answer);
  };

  const choiceTypes = ["multiple_choice", "fill_blank", "listening_placeholder", "choose_correct_sound", "choose_correct_letter", "choose_word_starting_with_letter", "choose_word_starting_with_kana", "choose_correct_reading", "choose_meaning", "choose_correct_sentence", "read_short_sentence", "answer_question", "choose_summary", "listen_and_choose_meaning", "listen_and_choose_sentence", "match_character_to_pronunciation", "dialogue_choice"];
  const isChoice = choiceTypes.includes(exercise.type);
  const options = getExerciseOptions(exercise, progress.nativeLanguage) ?? [];
  const hint = getExerciseHint(exercise, progress.nativeLanguage);
  const pairs = exercise.pairTranslations?.[progress.nativeLanguage as SupportedUILanguage] ?? exercise.pairTranslations?.en ?? exercise.pairs ?? [];
  const pairOptions = [...new Set(pairs.map((pair) => pair.right))];

  return (
    <div>
      {(exercise.type === "listening_placeholder" || exercise.audioText) && exercise.audioText && (
        <div className="mb-6 flex items-center gap-4 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4">
          <SpeakerButton text={exercise.audioText} languageCode={exercise.targetLanguage} />
          <div>
            <p className="text-xs font-black uppercase tracking-wider text-cyan-300"><Headphones className="mr-1 inline" size={13} /> {t("playPronunciation")}</p>
            <p className="mt-1 text-lg font-black">"{exercise.audioText}"</p>
          </div>
        </div>
      )}

      {exercise.type === "speaking_placeholder" && (
        <div className="text-center">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-fuchsia-300/30 bg-fuchsia-300/10 text-fuchsia-300"><Mic size={32} /></div>
          <p className="mt-4 text-sm text-slate-400">Speaking placeholder: say the phrase aloud, then continue.</p>
          <Button className="mt-5" onClick={() => submit(exercise.correctAnswer)}>{t("checkAnswer")}</Button>
        </div>
      )}

      {isChoice && (
        <div className="grid gap-3 sm:grid-cols-2">
          {options.map((option) => (
            <button key={option} disabled={submitted} onClick={() => submit(option)} className="min-h-14 rounded-2xl border border-white/10 bg-white/[.045] p-4 text-left text-sm font-extrabold text-slate-200 transition hover:border-cyan-300/40 hover:bg-cyan-300/10 disabled:opacity-60">
              {option}
            </button>
          ))}
        </div>
      )}

      {(exercise.type === "translation" || exercise.type === "type_meaning" || exercise.type === "translate_sentence") && (
        <div>
          <textarea value={text} onChange={(event) => setText(event.target.value)} disabled={submitted} rows={3} placeholder="..." className="w-full resize-none rounded-2xl border border-white/10 bg-black/20 p-4 text-sm font-bold text-white outline-none focus:border-cyan-300/50" />
          <Button onClick={() => submit(text)} disabled={!text.trim() || submitted} className="mt-4 w-full">{t("checkAnswer")} <Check size={17} /></Button>
        </div>
      )}

      {isMatchPairExercise(exercise.type) && (
        <div className="space-y-3">
          {pairs.map((pair) => (
            <label key={pair.left} className="grid grid-cols-[1fr_1.25fr] items-center gap-3">
              <span className="rounded-xl border border-fuchsia-300/20 bg-fuchsia-300/10 px-3 py-3 text-sm font-black">{pair.left}</span>
              <select disabled={submitted} value={matches[pair.left] ?? ""} onChange={(event) => setMatches((current) => ({ ...current, [pair.left]: event.target.value }))} className="h-12 min-w-0 rounded-xl border border-white/10 bg-[#171020] px-3 text-sm font-bold">
                <option value="">-</option>
                {pairOptions.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
            </label>
          ))}
          <Button className="mt-3 w-full" disabled={!pairs.every((pair) => matches[pair.left]) || submitted} onClick={() => submit(pairs.map((pair) => `${pair.left}=${matches[pair.left]}`))}>{t("checkAnswer")}</Button>
        </div>
      )}

      {exercise.type === "sentence_builder" && (
        <div>
          <div className="mb-5 min-h-16 rounded-2xl border border-dashed border-violet-300/25 bg-violet-300/5 p-3">
            <div className="flex flex-wrap gap-2">
              {selected.map((word, index) => (
                <button key={`${word}-${index}`} onClick={() => !submitted && setSelected((items) => items.filter((_, itemIndex) => itemIndex !== index))} className="rounded-xl bg-violet-300 px-3 py-2 text-sm font-black text-violet-950">
                  {word}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {exercise.words?.map((word, index) => {
              const used = selected.filter((item) => item === word).length >= (exercise.words?.slice(0, index + 1).filter((item) => item === word).length ?? 0);
              return <button key={`${word}-${index}`} disabled={submitted || used} onClick={() => setSelected((items) => [...items, word])} className="rounded-xl border border-white/10 bg-white/[.05] px-3 py-2 text-sm font-extrabold disabled:opacity-25">{word}</button>;
            })}
          </div>
          <div className="mt-4 flex gap-2">
            <Button variant="ghost" onClick={() => setSelected([])} disabled={submitted || !selected.length}><RotateCcw size={16} /></Button>
            <Button className="flex-1" disabled={!selected.length || submitted} onClick={() => submit(exercise.targetLanguage === "ja" ? selected.join("") : selected.join(" "))}>{t("checkAnswer")}</Button>
          </div>
        </div>
      )}

      {hint && <p className="mt-4 text-xs font-bold text-slate-600">{hint}</p>}
    </div>
  );
}

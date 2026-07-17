import { Check, Headphones, Mic, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import type { Exercise, SupportedUILanguage } from "../../types/index";
import { useApp } from "../../context/AppContext";
import { useTranslation } from "../../i18n/useTranslation";
import { checkAnswer, getExerciseHint, getExerciseOptions, isMatchPairExercise, normalizeUserAnswer } from "../../utils/checkAnswer";
import { Button } from "../ui/Button";
import { SpeakerButton } from "../ui/SpeakerButton";

export function ExerciseRenderer({ exercise, onAnswer }: { exercise: Exercise; onAnswer: (correct: boolean, answer: string | string[]) => void }) {
  const [text, setText] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [subQuestionIndex, setSubQuestionIndex] = useState(0);
  const [subAnswer, setSubAnswer] = useState("");
  const [subChecked, setSubChecked] = useState(false);
  const [subResults, setSubResults] = useState<boolean[]>([]);
  const { t } = useTranslation();
  const { progress } = useApp();

  useEffect(() => {
    setText("");
    setSelected([]);
    setMatches({});
    setSubmitted(false);
    setSubQuestionIndex(0);
    setSubAnswer("");
    setSubChecked(false);
    setSubResults([]);
  }, [exercise.id]);

  const submit = (answer: string | string[]) => {
    if (submitted) return;
    setSubmitted(true);
    onAnswer(checkAnswer(answer, exercise, progress.nativeLanguage).correct, answer);
  };

  const locale = progress.nativeLanguage as SupportedUILanguage;
  const localizedText = (map: Partial<Record<string, string>> | undefined, fallback = "") => map?.[progress.nativeLanguage] ?? (progress.nativeLanguage === "en" ? fallback : `⟦missing-content:${progress.nativeLanguage}⟧`);
  const localizedList = (map: Partial<Record<string, string[]>> | undefined, fallback: string[] = []) => map?.[progress.nativeLanguage] ?? (progress.nativeLanguage === "en" ? fallback : [`⟦missing-content:${progress.nativeLanguage}⟧`]);
  const choiceTypes = ["multiple_choice", "fill_blank", "fill_missing_character", "sound_to_character", "next_in_sequence", "choose_correct_pair", "listening_placeholder", "choose_correct_sound", "choose_correct_letter", "choose_word_starting_with_letter", "choose_word_starting_with_kana", "choose_correct_reading", "choose_meaning", "choose_correct_sentence", "read_short_sentence", "answer_question", "choose_summary", "listen_and_choose_meaning", "listen_and_choose_sentence", "match_character_to_pronunciation", "dialogue_choice"];
  const isChoice = choiceTypes.includes(exercise.type);
  const options = [...new Set(getExerciseOptions(exercise, progress.nativeLanguage) ?? [])];
  const hint = getExerciseHint(exercise, progress.nativeLanguage);
  const pairs = exercise.pairTranslations?.[locale] ?? (locale === "en" ? exercise.pairs ?? [] : []);
  const pairOptions = [...new Set(pairs.map((pair) => pair.right))];

  if (exercise.type === "character_card") {
    return (
      <div className="space-y-4">
        {exercise.cards?.map((card) => (
          <div key={card.id} className="rounded-2xl border border-white/10 bg-white/[.04] p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-display text-5xl font-black text-white">{card.character}</p>
                <p className="mt-2 text-sm font-black text-cyan-300">{card.reading}</p>
              </div>
              <SpeakerButton text={card.speechText} languageCode={exercise.targetLanguage} size="sm" label={localizedText(card.audioCardLabelByNative, t("playPronunciation"))} />
            </div>
            <div className="mt-4 rounded-xl bg-black/15 p-3">
              <p className="text-sm"><span className="font-bold text-slate-500">{t("exampleLabel")}: </span><strong>{card.example}</strong></p>
              {card.exampleRomanization && <p className="mt-1 text-xs font-bold text-cyan-300">{card.exampleRomanization}</p>}
              <p className="mt-2 text-sm text-cyan-300">{localizedText(card.meaningByNative)}</p>
            </div>
            {localizedText(card.feedbackByNative) && <p className="mt-3 text-sm leading-6 text-slate-300">{localizedText(card.feedbackByNative)}</p>}
          </div>
        ))}
        <Button className="w-full" disabled={submitted} onClick={() => submit("learned")}>{t("checkAnswer")} <Check size={17} /></Button>
      </div>
    );
  }

  if (exercise.type === "plus_listening_vocabulary_challenge") {
    const subQuestions = exercise.subQuestions ?? [];
    const current = subQuestions[subQuestionIndex];
    if (!current) return <p className="rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4 text-sm font-bold text-amber-100">{t("moreRoadmap")}</p>;
    const currentOptions = [...new Set(localizedList(current.optionTranslations, current.options))];
    const currentCorrect = normalizeUserAnswer(current.correctAnswer);
    const currentIsCorrect = normalizeUserAnswer(subAnswer) === currentCorrect;
    const reveal = localizedText(current.revealAfterAnswerTranslations, current.revealAfterAnswer);
    const audioLabel = localizedText(
      current.audioLabelTranslations,
      localizedText(current.visibleBeforeAnswerTranslations, current.visibleBeforeAnswer ?? current.audioLabel ?? t("playPronunciation")),
    );
    const feedback = subChecked
      ? localizedText(currentIsCorrect ? current.feedbackCorrectTranslations : current.feedbackWrongTranslations)
      : "";
    const finishChallenge = () => {
      if (submitted) return;
      const allResults = [...subResults, currentIsCorrect];
      setSubmitted(true);
      onAnswer(allResults.every(Boolean), allResults.map((ok, index) => `${index + 1}:${ok ? "correct" : "wrong"}`));
    };

    return (
      <div className="space-y-4">
        <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4">
          <div className="flex items-center gap-4">
            <SpeakerButton text={current.audioText} languageCode={exercise.targetLanguage} size="md" label={audioLabel} />
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-cyan-300"><Headphones className="mr-1 inline" size={13} /> {audioLabel}</p>
              <p className="mt-1 text-sm font-bold text-slate-300">{localizedText(current.questionTranslations, current.question)}</p>
            </div>
          </div>
        </div>

        <p className="text-xs font-black uppercase tracking-wider text-violet-300">Plus · {subQuestionIndex + 1}/{subQuestions.length}</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {currentOptions.map((option) => (
            <button key={option} disabled={subChecked || submitted} onClick={() => setSubAnswer(option)} className={`min-h-14 rounded-2xl border p-4 text-left text-sm font-extrabold transition disabled:opacity-70 ${subAnswer === option ? "border-cyan-300/50 bg-cyan-300/15 text-white" : "border-white/10 bg-white/[.045] text-slate-200 hover:border-cyan-300/40 hover:bg-cyan-300/10"}`}>
              {option}
            </button>
          ))}
        </div>

        {!subChecked ? (
          <Button className="w-full" disabled={!subAnswer || submitted} onClick={() => setSubChecked(true)}>{t("checkAnswer")} <Check size={17} /></Button>
        ) : (
          <div className={`rounded-2xl border p-4 ${currentIsCorrect ? "border-emerald-300/25 bg-emerald-300/10" : "border-rose-300/25 bg-rose-300/10"}`}>
            {reveal && <p className="font-black text-white">{reveal}</p>}
            {feedback && <p className="mt-2 text-sm leading-6 text-slate-300">{feedback}</p>}
            {subQuestionIndex < subQuestions.length - 1 ? (
              <Button className="mt-4 w-full" onClick={() => {
                setSubResults((items) => [...items, currentIsCorrect]);
                setSubQuestionIndex((value) => value + 1);
                setSubAnswer("");
                setSubChecked(false);
              }}>{t("nextExercise")}</Button>
            ) : (
              <Button className="mt-4 w-full" disabled={submitted} onClick={finishChallenge}>{t("finishMicro")}</Button>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      {(exercise.type === "listening_placeholder" || exercise.audioText) && exercise.audioText && (
        <div className="mb-6 flex items-center gap-4 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4">
          <SpeakerButton text={exercise.audioText} languageCode={exercise.targetLanguage} />
          <div>
            <p className="text-xs font-black uppercase tracking-wider text-cyan-300"><Headphones className="mr-1 inline" size={13} /> {t("playPronunciation")}</p>
            <p className="mt-1 text-lg font-black">{exercise.hideAudioText ? localizedText(exercise.audioLabelTranslations, exercise.audioLabel ?? t("playPronunciation")) : `"${exercise.audioText}"`}</p>
          </div>
        </div>
      )}

      {exercise.type === "speaking_placeholder" && (
        <div className="text-center">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-fuchsia-300/30 bg-fuchsia-300/10 text-fuchsia-300"><Mic size={32} /></div>
          <p className="mt-4 text-sm text-slate-400">{t("speaking")} · {t("continue")}</p>
          <Button className="mt-5" onClick={() => submit(exercise.correctAnswer)}>{t("checkAnswer")}</Button>
        </div>
      )}

      {isChoice && options.length < 2 && <p className="rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4 text-sm font-bold text-amber-100">{t("moreRoadmap")}</p>}

      {isChoice && options.length >= 2 && (
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
          <textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            disabled={submitted}
            rows={3}
            placeholder="..."
            autoComplete="off"
            spellCheck={false}
            lang="und"
            className="w-full resize-none rounded-2xl border border-white/10 bg-black/20 p-4 text-sm font-bold text-white outline-none focus:border-cyan-300/50"
          />
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
      {submitted && localizedText(exercise.revealAfterAnswerTranslations, exercise.revealAfterAnswer) && (
        <div className="mt-4 rounded-lg border border-cyan-300/20 bg-cyan-300/10 p-4">
          <div className="flex items-start justify-between gap-3">
            <p className="whitespace-pre-line font-black text-white">{localizedText(exercise.revealAfterAnswerTranslations, exercise.revealAfterAnswer)}</p>
            {exercise.audioText && <SpeakerButton text={exercise.audioText} languageCode={exercise.targetLanguage} size="sm" />}
          </div>
        </div>
      )}
    </div>
  );
}

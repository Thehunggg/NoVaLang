import { ArrowLeft, Check, Lock, X } from "lucide-react";
import { useMemo, useState } from "react";
import { PageContainer } from "../../layout/PageContainer";
import { Badge } from "../../ui/Badge";
import { Button } from "../../ui/Button";
import { Card } from "../../ui/Card";
import { ProgressBar } from "../../ui/ProgressBar";
import { SpeakerButton } from "../../ui/SpeakerButton";
import { useApp } from "../../../context/AppContext";
import type { TranslationKey } from "../../../i18n/translations";
import { useTranslation } from "../../../i18n/useTranslation";
import type { Lesson } from "../../../types/index";
import {
  characterById,
  checksChatSlots,
  checksOption,
  checksOrder,
  checksPairs,
  checksSlots,
  checksTokenSlots,
  createAttemptOrders,
  exerciseTypeLabelKey,
  gradedScore,
  lineHasReading,
  lineHasRomanization,
  orderedByIds,
  parseFiveCardPractice,
  q14RomanizationToggleAllowed,
  readingLineForDisplay,
  type PracticeExercise,
  type ParsedFiveCardPractice,
} from "../../../utils/fiveCardPractice";
import { displayNativeText } from "../../../utils/nativeContent";

type Props = {
  lesson: Lesson;
  content: Record<string, unknown>;
  onBack: () => void;
};

type Stage = "landing" | "runner" | "results";

export function FiveCardPractice({ lesson, onBack }: Props) {
  const { t } = useTranslation();
  const { progress } = useApp();
  const practice = useMemo(
    () => parseFiveCardPractice(lesson, progress.nativeLanguage),
    [lesson, progress.nativeLanguage],
  );

  const [stage, setStage] = useState<Stage>("landing");
  const [index, setIndex] = useState(0);
  const [orders, setOrders] = useState<Record<string, string[]>>({});
  const [results, setResults] = useState<Record<string, boolean>>({});
  const [plusUnlocked, setPlusUnlocked] = useState(false);
  const [checkpointSubIndex, setCheckpointSubIndex] = useState(0);
  const [checkpointResults, setCheckpointResults] = useState<Record<string, boolean>>({});

  if (!practice || practice.exercises.length === 0) {
    return (
      <PageContainer className="py-7 sm:py-10">
        <Button variant="ghost" className="mb-6" onClick={onBack}>
          <ArrowLeft size={17} />
          {t("back")}
        </Button>
        <Card className="p-6 text-center text-sm text-slate-400">{t("emptyContentPlaceholder")}</Card>
      </PageContainer>
    );
  }

  const startOrResume = (fromIndex = 0) => {
    setOrders(createAttemptOrders(practice));
    setResults({});
    setCheckpointResults({});
    setIndex(fromIndex);
    setCheckpointSubIndex(0);
    setStage("runner");
  };

  const current = practice.exercises[index];
  const isPlusLocked = current?.plan === "plus" && !plusUnlocked;

  if (stage === "results") {
    const score = gradedScore(results, practice);
    return (
      <PageContainer className="py-7 sm:py-10">
        <Card className="mx-auto max-w-xl p-8 text-center">
          <p className="text-xs font-black uppercase tracking-wider text-cyan-300">
            {t("practiceResults")}
          </p>
          <h1 className="mt-3 font-display text-3xl font-black">{t("exerciseResultsTitle")}</h1>
          <p className="mt-4 text-lg font-black text-white">
            {t("questionsCorrect", { correct: score.correct, total: score.total })}
          </p>
          <p className="mt-2 text-sm text-slate-400">{score.percent}%</p>
          <Button className="mt-6 w-full" onClick={onBack}>
            {t("backToLesson")}
          </Button>
        </Card>
      </PageContainer>
    );
  }

  if (stage === "runner" && current) {
    if (isPlusLocked) {
      return (
        <PageContainer className="py-7 sm:py-10">
          <Button variant="ghost" className="mb-6" onClick={() => setStage("landing")}>
            <ArrowLeft size={17} />
            {t("back")}
          </Button>
          <Card className="mx-auto max-w-lg p-8 text-center">
            <Lock className="mx-auto text-amber-300" size={36} />
            <h1 className="mt-4 font-display text-2xl font-black">{t("plusLocked")}</h1>
            <p className="mt-3 text-sm text-slate-400">{t("unlockPlus")}</p>
            <div className="mt-6 flex flex-col gap-3">
              <Button onClick={() => setPlusUnlocked(true)}>{t("unlockPlus")}</Button>
              <Button variant="ghost" onClick={() => setStage("results")}>
                {t("finishPractice")}
              </Button>
            </div>
          </Card>
        </PageContainer>
      );
    }

    const goNext = () => {
      if (index >= practice.exercises.length - 1) {
        setStage("results");
        return;
      }
      setIndex((value) => value + 1);
      setCheckpointSubIndex(0);
      setCheckpointResults({});
    };

    return (
      <PageContainer className="py-7 sm:py-10">
        <div className="mb-4 flex items-center gap-4">
          <Button variant="ghost" onClick={() => setStage("landing")}>
            <ArrowLeft size={17} />
            {t("back")}
          </Button>
          <div className="flex-1">
            <ProgressBar value={index + 1} max={practice.totalQuestions || practice.exercises.length} />
          </div>
          <span className="text-sm font-black text-slate-400">
            {t("exerciseNumber", {
              current: index + 1,
              total: practice.totalQuestions || practice.exercises.length,
            })}
          </span>
        </div>

        <p className="mb-3 text-center text-xs font-black uppercase tracking-wider text-cyan-300">
          {t(exerciseTypeLabelKey(current.type) as TranslationKey)}
          {current.plan === "plus" ? ` · ${t("plusPlan")}` : ` · ${t("freePlan")}`}
        </p>

        <ExerciseRunner
          exercise={current}
          practice={practice}
          lesson={lesson}
          orders={orders}
          checkpointSubIndex={checkpointSubIndex}
          checkpointResults={checkpointResults}
          onCheckpointSubResult={(subId, correct) => {
            setCheckpointResults((prev) => ({ ...prev, [subId]: correct }));
          }}
          onCheckpointAdvance={(latestSubId, latestCorrect) => {
            const merged = { ...checkpointResults, [latestSubId]: latestCorrect };
            if (checkpointSubIndex < current.subQuestions.length - 1) {
              setCheckpointResults(merged);
              setCheckpointSubIndex((value) => value + 1);
              return;
            }
            const allCorrect = current.subQuestions.every((sub) => merged[sub.id] === true);
            setResults((prev) => ({ ...prev, [current.id]: allCorrect }));
            goNext();
          }}
          onChecked={(exerciseId, correct) => {
            if (!current.isNonGraded) {
              setResults((prev) => ({ ...prev, [exerciseId]: correct }));
            }
          }}
          onNext={goNext}
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer className="py-7 sm:py-10">
      <Button variant="ghost" className="mb-6" onClick={onBack}>
        <ArrowLeft size={17} />
        {t("back")}
      </Button>

      <Card className="p-6 sm:p-8">
        <Badge tone="cyan">{t("practiceExercises")}</Badge>
        <h1 className="mt-4 font-display text-3xl font-black">
          {practice.title || t("practiceExercises")}
        </h1>
        {practice.japaneseTitle && (
          <p className="mt-2 text-sm text-cyan-200">{practice.japaneseTitle}</p>
        )}
        <p className="mt-3 text-sm text-slate-400">
          {t("lessonQuestionsCount", { count: practice.totalQuestions })}
          {practice.estimatedMinutes ? ` · ${practice.estimatedMinutes}` : ""}
        </p>
        {practice.reviewTopics && (
          <p className="mt-2 text-sm text-slate-400">
            {t("review")}: {practice.reviewTopics}
          </p>
        )}
      </Card>

      <div className="mt-5 space-y-3">
        {practice.groups.map((group) => (
          <Card key={group.id} className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-wider text-cyan-300">
                  {group.number ? `${group.number} · ` : ""}
                  {group.plan === "plus" ? t("plusPlan") : t("freePlan")}
                </p>
                <h2 className="mt-1 font-display text-xl font-black">{group.title}</h2>
                {group.range && <p className="mt-1 text-sm text-slate-400">{group.range}</p>}
                {group.details && (
                  <p className="mt-2 whitespace-pre-line text-sm text-slate-400">{group.details}</p>
                )}
              </div>
              {group.plan === "plus" && !plusUnlocked && (
                <Lock className="text-amber-300" size={18} />
              )}
            </div>
          </Card>
        ))}
      </div>

      <Card className="mt-5 p-5">
        <h2 className="font-display text-lg font-black">{t("reviewWrongAnswers")}</h2>
        <p className="mt-2 text-sm text-slate-400">{t("noWrongAnswers")}</p>
      </Card>

      <Button className="mt-6 w-full sm:w-auto" onClick={() => startOrResume(0)}>
        {t("startPracticeExercises")}
      </Button>
    </PageContainer>
  );
}

function ExerciseRunner({
  exercise,
  practice,
  lesson,
  orders,
  checkpointSubIndex,
  checkpointResults,
  onCheckpointSubResult,
  onCheckpointAdvance,
  onChecked,
  onNext,
}: {
  exercise: PracticeExercise;
  practice: ParsedFiveCardPractice;
  lesson: Lesson;
  orders: Record<string, string[]>;
  checkpointSubIndex: number;
  checkpointResults: Record<string, boolean>;
  onCheckpointSubResult: (subId: string, correct: boolean) => void;
  onCheckpointAdvance: (latestSubId: string, latestCorrect: boolean) => void;
  onChecked: (exerciseId: string, correct: boolean) => void;
  onNext: () => void;
}) {
  const { t } = useTranslation();

  if (exercise.type === "real_world_practice_dialogue") {
    return (
      <Q14Dialogue
        exercise={exercise}
        practice={practice}
        lesson={lesson}
        onComplete={onNext}
      />
    );
  }

  if (exercise.type === "checkpoint") {
    const sub = exercise.subQuestions[checkpointSubIndex];
    if (!sub) {
      return (
        <Button onClick={onNext}>{t("nextQuestion")}</Button>
      );
    }
    let latestCorrect = false;
    return (
      <GradedExercise
        key={`${exercise.id}-${sub.id}`}
        exercise={sub}
        lesson={lesson}
        orders={orders}
        label={`${t("exerciseTypeCheckpoint")} · ${checkpointSubIndex + 1}/${exercise.subQuestions.length}`}
        onChecked={(correct) => {
          latestCorrect = correct;
          onCheckpointSubResult(sub.id, correct);
        }}
        onNext={() => onCheckpointAdvance(sub.id, latestCorrect)}
      />
    );
  }

  return (
    <GradedExercise
      key={exercise.id}
      exercise={exercise}
      lesson={lesson}
      orders={orders}
      onChecked={(correct) => onChecked(exercise.id, correct)}
      onNext={onNext}
    />
  );
}

function GradedExercise({
  exercise,
  lesson,
  orders,
  label,
  onChecked,
  onNext,
}: {
  exercise: PracticeExercise;
  lesson: Lesson;
  orders: Record<string, string[]>;
  label?: string;
  onChecked: (correct: boolean) => void;
  onNext: () => void;
}) {
  const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedTokens, setSelectedTokens] = useState<string[]>([]);
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [activeLeft, setActiveLeft] = useState<string | null>(null);
  const [slotAnswers, setSlotAnswers] = useState<Record<string, string>>({});
  const [chatAnswers, setChatAnswers] = useState<Record<string, string>>({});
  const [tokenSlots, setTokenSlots] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<{ correct: boolean } | null>(null);

  const options = orderedByIds(exercise.options, orders[`${exercise.id}:options`]);
  const tokens = orderedByIds(exercise.tokens, orders[`${exercise.id}:tokens`]);
  const wordBank = orderedByIds(exercise.wordBank, orders[`${exercise.id}:wordBank`]);
  const leftItems = orderedByIds(
    exercise.pairs.map((pair) => ({ id: pair.left.id, text: pair.left.text })),
    orders[`${exercise.id}:left`],
  );
  const rightItems = orderedByIds(
    exercise.pairs.map((pair) => ({ id: pair.right.id, text: pair.right.text })),
    orders[`${exercise.id}:right`],
  );

  const check = () => {
    let correct = false;
    switch (exercise.type) {
      case "listening_multiple_choice":
      case "multiple_choice":
        correct = selectedOption != null && checksOption(exercise, selectedOption);
        break;
      case "matching":
        correct = checksPairs(exercise, matches);
        break;
      case "sentence_ordering":
      case "dialogue_ordering":
        correct = checksOrder(exercise, selectedTokens);
        break;
      case "dialogue_fill":
        correct = checksSlots(exercise, slotAnswers);
        break;
      case "slot_ordering":
        correct = checksTokenSlots(exercise, tokenSlots);
        break;
      case "chat_text_fill":
        correct = checksChatSlots(exercise, chatAnswers);
        break;
      default:
        correct = selectedOption != null && checksOption(exercise, selectedOption);
    }
    onChecked(correct);
    setFeedback({ correct });
  };

  const listening = exercise.type === "listening_multiple_choice";

  return (
    <Card className="p-5 sm:p-6">
      {label && (
        <p className="mb-2 text-xs font-black uppercase tracking-wider text-cyan-300">{label}</p>
      )}
      <h2 className="font-display text-xl font-black text-white">{exercise.prompt}</h2>
      {exercise.context && <p className="mt-2 text-sm text-slate-400">{exercise.context}</p>}

      {listening && exercise.audioText && (
        <div className="mt-4">
          <SpeakerButton
            text={exercise.audioText}
            languageCode={lesson.language}
            size="md"
            label={t("listenTooltip")}
          />
        </div>
      )}

      {(exercise.type === "multiple_choice" || listening) && (
        <div className="mt-5 space-y-2">
          <p className="text-xs font-black uppercase tracking-wider text-cyan-300">
            {t("exerciseOptions")}
          </p>
          {options.map((option) => (
            <button
              key={option.id}
              type="button"
              disabled={feedback != null}
              onClick={() => setSelectedOption(option.id)}
              className={`flex w-full items-center rounded-xl border px-4 py-3 text-left text-sm font-bold transition ${
                selectedOption === option.id
                  ? "border-cyan-300/50 bg-cyan-300/15 text-cyan-100"
                  : "border-white/10 bg-white/[.04] text-slate-200 hover:border-violet-300/40"
              }`}
            >
              {option.text}
            </button>
          ))}
        </div>
      )}

      {exercise.type === "matching" && (
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <p className="text-xs font-black uppercase tracking-wider text-cyan-300">
              {t("exerciseJapanese")}
            </p>
            {leftItems.map((item) => (
              <button
                key={item.id}
                type="button"
                disabled={feedback != null}
                onClick={() => setActiveLeft(item.id)}
                className={`w-full rounded-xl border px-3 py-3 text-left text-sm font-bold ${
                  activeLeft === item.id || matches[item.id]
                    ? "border-cyan-300/50 bg-cyan-300/15"
                    : "border-white/10 bg-white/[.04]"
                }`}
              >
                {item.text}
                {matches[item.id] && (
                  <span className="mt-1 block text-xs text-slate-400">
                    → {rightItems.find((right) => right.id === matches[item.id])?.text}
                  </span>
                )}
              </button>
            ))}
          </div>
          <div className="space-y-2">
            <p className="text-xs font-black uppercase tracking-wider text-cyan-300">
              {t("exerciseMeaning")}
            </p>
            {rightItems.map((item) => (
              <button
                key={item.id}
                type="button"
                disabled={feedback != null || !activeLeft}
                onClick={() => {
                  if (!activeLeft) return;
                  setMatches((prev) => {
                    const next = { ...prev };
                    for (const [leftId, rightId] of Object.entries(next)) {
                      if (rightId === item.id) delete next[leftId];
                    }
                    next[activeLeft] = item.id;
                    return next;
                  });
                  setActiveLeft(null);
                }}
                className="w-full rounded-xl border border-white/10 bg-white/[.04] px-3 py-3 text-left text-sm font-bold hover:border-violet-300/40"
              >
                {item.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {(exercise.type === "sentence_ordering" || exercise.type === "dialogue_ordering") && (
        <div className="mt-5 space-y-4">
          <div className="min-h-16 rounded-xl border border-dashed border-white/15 bg-black/20 p-3">
            <p className="mb-2 text-xs font-black uppercase tracking-wider text-cyan-300">
              {t("exerciseYourAnswer")}
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedTokens.map((id) => {
                const token = tokens.find((item) => item.id === id);
                return (
                  <button
                    key={id}
                    type="button"
                    disabled={feedback != null}
                    onClick={() =>
                      setSelectedTokens((prev) => prev.filter((tokenId) => tokenId !== id))
                    }
                    className="rounded-lg border border-cyan-300/30 bg-cyan-300/10 px-3 py-2 text-sm font-bold"
                  >
                    {token?.text ?? id}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {tokens
              .filter((token) => !selectedTokens.includes(token.id))
              .map((token) => (
                <button
                  key={token.id}
                  type="button"
                  disabled={feedback != null}
                  onClick={() => setSelectedTokens((prev) => [...prev, token.id])}
                  className="rounded-lg border border-white/10 bg-white/[.04] px-3 py-2 text-sm font-bold"
                >
                  {token.text}
                </button>
              ))}
          </div>
        </div>
      )}

      {exercise.type === "dialogue_fill" && (
        <div className="mt-5 space-y-4">
          <div className="space-y-2">
            {exercise.dialogue.map((line, lineIndex) => (
              <p
                key={`${line}-${lineIndex}`}
                className="rounded-xl bg-black/20 px-3 py-2 text-sm text-slate-200"
              >
                {line}
              </p>
            ))}
          </div>
          <div className="space-y-2">
            {exercise.slots.map((slot) => (
              <div key={slot.id} className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-500">
                  {slot.placeholder ?? slot.id}
                </span>
                <span className="rounded-lg border border-cyan-300/30 bg-cyan-300/10 px-3 py-2 text-sm font-bold">
                  {wordBank.find((item) => item.id === slotAnswers[slot.id])?.text ?? "________"}
                </span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {wordBank
              .filter((item) => !Object.values(slotAnswers).includes(item.id))
              .map((item) => (
                <button
                  key={item.id}
                  type="button"
                  disabled={feedback != null}
                  onClick={() => {
                    const emptySlot = exercise.slots.find((slot) => !slotAnswers[slot.id]);
                    if (!emptySlot) return;
                    setSlotAnswers((prev) => ({ ...prev, [emptySlot.id]: item.id }));
                  }}
                  className="rounded-lg border border-white/10 bg-white/[.04] px-3 py-2 text-sm font-bold"
                >
                  {item.text}
                </button>
              ))}
            <Button variant="ghost" disabled={feedback != null} onClick={() => setSlotAnswers({})}>
              {t("cancel")}
            </Button>
          </div>
        </div>
      )}

      {exercise.type === "slot_ordering" && (
        <div className="mt-5 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            {exercise.answerSlots.map((slot) => {
              const token = tokens.find((item) => item.id === tokenSlots[slot.id]);
              return (
                <span key={slot.id} className="inline-flex items-center gap-1">
                  <button
                    type="button"
                    disabled={feedback != null}
                    onClick={() =>
                      setTokenSlots((prev) => {
                        const next = { ...prev };
                        delete next[slot.id];
                        return next;
                      })
                    }
                    className="min-w-20 rounded-lg border border-cyan-300/30 bg-cyan-300/10 px-3 py-2 text-sm font-bold"
                  >
                    {token?.text ?? "____"}
                  </button>
                  {slot.afterText && <span className="text-sm text-slate-300">{slot.afterText}</span>}
                </span>
              );
            })}
          </div>
          <div className="flex flex-wrap gap-2">
            {tokens
              .filter((token) => !Object.values(tokenSlots).includes(token.id))
              .map((token) => (
                <button
                  key={token.id}
                  type="button"
                  disabled={feedback != null}
                  onClick={() => {
                    const empty = exercise.answerSlots.find((slot) => !tokenSlots[slot.id]);
                    if (!empty) return;
                    setTokenSlots((prev) => ({ ...prev, [empty.id]: token.id }));
                  }}
                  className="rounded-lg border border-white/10 bg-white/[.04] px-3 py-2 text-sm font-bold"
                >
                  {token.text}
                </button>
              ))}
          </div>
        </div>
      )}

      {exercise.type === "chat_text_fill" && exercise.chat && (
        <div className="mt-5 space-y-3">
          <p className="text-xs font-bold text-slate-500">{exercise.chat.timestamp}</p>
          {exercise.chat.context && (
            <p className="text-sm text-slate-400">{exercise.chat.context}</p>
          )}
          {exercise.chat.messages.map((message) => {
            const speaker = exercise.chat!.speakers.find((item) => item.id === message.speakerId);
            const alignRight = speaker?.alignment === "right";
            return (
              <div
                key={message.id}
                className={`flex ${alignRight ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                    alignRight ? "bg-cyan-300/15 text-cyan-50" : "bg-white/[.06] text-slate-200"
                  }`}
                >
                  {message.segments.map((segment, segmentIndex) => {
                    if (segment.slotId) {
                      return (
                        <input
                          key={`${message.id}-${segmentIndex}`}
                          className="mx-1 min-w-28 rounded-lg border border-white/20 bg-black/30 px-2 py-1 text-sm"
                          disabled={feedback != null}
                          value={chatAnswers[segment.slotId] ?? ""}
                          onChange={(event) =>
                            setChatAnswers((prev) => ({
                              ...prev,
                              [segment.slotId!]: event.target.value,
                            }))
                          }
                          placeholder={t("exerciseInputHint")}
                        />
                      );
                    }
                    return (
                      <span key={`${message.id}-${segmentIndex}`}>{segment.displayText}</span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {feedback && (
        <div
          className={`mt-5 rounded-2xl border p-4 ${
            feedback.correct
              ? "border-emerald-300/25 bg-emerald-300/10"
              : "border-rose-300/25 bg-rose-300/10"
          }`}
        >
          <p
            className={`flex items-center gap-2 font-black ${
              feedback.correct ? "text-emerald-200" : "text-rose-200"
            }`}
          >
            {feedback.correct ? <Check size={18} /> : <X size={18} />}
            {feedback.correct ? t("correctSignal") : t("notQuite")}
          </p>
          {!feedback.correct && exercise.feedback.correctAnswer && (
            <p className="mt-2 text-sm text-slate-300">
              <span className="font-bold text-slate-500">{t("exerciseCorrectAnswer")}: </span>
              {exercise.feedback.correctAnswer}
            </p>
          )}
          {!feedback.correct && exercise.feedback.explanation && (
            <p className="mt-2 text-sm text-slate-400">
              <span className="font-bold text-slate-500">{t("exerciseExplanation")}: </span>
              {exercise.feedback.explanation}
            </p>
          )}
          <Button className="mt-4 w-full" onClick={onNext}>
            {t("nextQuestion")}
          </Button>
        </div>
      )}

      {!feedback && (
        <Button className="mt-5 w-full" onClick={check}>
          {t("checkAnswer")}
        </Button>
      )}
    </Card>
  );
}

function Q14Dialogue({
  exercise,
  practice,
  lesson,
  onComplete,
}: {
  exercise: PracticeExercise;
  practice: ParsedFiveCardPractice;
  lesson: Lesson;
  onComplete: () => void;
}) {
  const { t } = useTranslation();
  const [showReading, setShowReading] = useState(true);
  const [showRomanization, setShowRomanization] = useState(false);
  const [showTranslation, setShowTranslation] = useState(true);

  const romanizationAllowed =
    q14RomanizationToggleAllowed(lesson.levelId) &&
    exercise.dialogueLines.length > 0 &&
    exercise.dialogueLines.every(lineHasRomanization);

  return (
    <Card className="p-5 sm:p-6">
      <Badge tone="pink">{t("exerciseTypeAiPractice")}</Badge>
      {exercise.scenarioTitle && (
        <h2 className="mt-4 font-display text-2xl font-black text-white">
          {exercise.scenarioTitle}
        </h2>
      )}
      {exercise.scenarioDescription && (
        <p className="mt-2 text-sm leading-6 text-slate-400">{exercise.scenarioDescription}</p>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        <ToggleChip
          active={showReading}
          label={t("q14ShowReading")}
          onClick={() => setShowReading((value) => !value)}
        />
        {romanizationAllowed && (
          <ToggleChip
            active={showRomanization}
            label={t("q14ShowRomanization")}
            onClick={() => setShowRomanization((value) => !value)}
          />
        )}
        <ToggleChip
          active={showTranslation}
          label={t("q14ShowTranslation")}
          onClick={() => setShowTranslation((value) => !value)}
        />
      </div>

      <div className="mt-5 space-y-3">
        {exercise.dialogueLines.map((line, lineIndex) => {
          const speaker = characterById(practice.characterNamePool, line.speakerId);
          const reading = lineHasReading(line)
            ? readingLineForDisplay(line.targetText, line.reading)
            : "";
          const divider = exercise.sceneDividers.find(
            (item) => item.afterDialogueLine === lineIndex + 1,
          );
          return (
            <div key={`${line.speakerId}-${lineIndex}`}>
              <div className="rounded-xl border border-white/[.08] bg-black/20 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    {speaker && (
                      <p className="text-xs font-black text-fuchsia-300">{speaker.displayName}</p>
                    )}
                    <strong className="mt-1 block text-lg text-white">{line.targetText}</strong>
                    {showReading && reading && (
                      <p className="mt-1 text-xs font-bold text-cyan-300">{reading}</p>
                    )}
                    {showRomanization && line.romanization && (
                      <p className="mt-1 text-xs text-slate-400">{line.romanization}</p>
                    )}
                    {showTranslation && line.translation && (
                      <p className="mt-2 text-sm text-slate-400">{line.translation}</p>
                    )}
                  </div>
                  {line.speechText && (
                    <SpeakerButton
                      text={line.speechText}
                      languageCode={lesson.language}
                      size="sm"
                    />
                  )}
                </div>
              </div>
              {divider && (
                <div className="my-3 rounded-xl border border-dashed border-amber-300/20 bg-amber-300/5 px-3 py-2 text-center text-xs font-bold text-amber-100">
                  {displayNativeText(divider.targetText)}
                  {showTranslation && divider.translation && (
                    <p className="mt-1 font-normal text-slate-400">{divider.translation}</p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <Button className="mt-6 w-full" onClick={onComplete}>
        {t("dialogueCompleteAction")}
      </Button>
    </Card>
  );
}

function ToggleChip({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-xs font-black transition ${
        active
          ? "border-cyan-300/40 bg-cyan-300/15 text-cyan-100"
          : "border-white/10 bg-white/[.04] text-slate-400"
      }`}
    >
      {label}
    </button>
  );
}

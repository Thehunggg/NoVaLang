import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import { useMemo, useState } from "react";
import { PageContainer } from "../../layout/PageContainer";
import { Button } from "../../ui/Button";
import { Card } from "../../ui/Card";
import { SpeakerButton } from "../../ui/SpeakerButton";
import { VocabularyReferencesBlock, type VocabularyReferenceItem } from "../VocabularyReferencesBlock";
import { useApp } from "../../../context/AppContext";
import { useTranslation } from "../../../i18n/useTranslation";
import type { Lesson, VocabularyItem } from "../../../types/index";
import { getLocalizedAnswers } from "../../../utils/localizedText";
import { readingLineForDisplay } from "../../../utils/fiveCardPractice";
import { asRecord, asRecordList, displayNativeText } from "../../../utils/nativeContent";

type Props = {
  lesson: Lesson;
  content: Record<string, unknown>;
  onBack: () => void;
};

export function FiveCardVocabulary({ lesson, content, onBack }: Props) {
  const { t } = useTranslation();
  const { progress } = useApp();
  const native = progress.nativeLanguage;
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const details = asRecordList(content.vocabularyDetails);
  const references = useMemo(() => {
    const raw = content.vocabularyReferences;
    if (!Array.isArray(raw) || raw.length === 0) return null;
    return raw as VocabularyReferenceItem[];
  }, [content.vocabularyReferences]);

  const toggle = (key: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <PageContainer className="py-7 sm:py-10">
      <Button variant="ghost" className="mb-6" onClick={onBack}>
        <ArrowLeft size={17} />
        {t("back")}
      </Button>

      <h1 className="font-display text-3xl font-black">{t("lessonVocabCardsSection")}</h1>
      <p className="mt-2 text-sm text-cyan-200">{t("lessonSectionVocabularyJapanese")}</p>

      <div className="mt-6 space-y-3">
        {(lesson.vocabulary ?? []).map((item, index) => {
          const key = item.displayText ?? item.word ?? item.id;
          const expanded = expandedIds.has(key);
          const detail = details[index] ?? {};
          return (
            <VocabCard
              key={item.id}
              item={item}
              detail={detail}
              expanded={expanded}
              learningLanguage={lesson.language}
              nativeLanguage={native}
              onToggle={() => toggle(key)}
            />
          );
        })}
      </div>

      <VocabularyReferencesBlock
        references={references}
        learningLanguageCode={lesson.language}
        nativeLanguageCode={native}
      />
    </PageContainer>
  );
}

function VocabCard({
  item,
  detail,
  expanded,
  learningLanguage,
  nativeLanguage,
  onToggle,
}: {
  item: VocabularyItem;
  detail: Record<string, unknown>;
  expanded: boolean;
  learningLanguage: string;
  nativeLanguage: string;
  onToggle: () => void;
}) {
  const { t } = useTranslation();
  const display = item.displayText ?? item.word;
  const speech = item.speechText ?? display;
  const meaning =
    displayNativeText(detail.meaning) ||
    getLocalizedAnswers(item.meanings, nativeLanguage)[0] ||
    displayNativeText(item.meaning);
  const reading = readingLineForDisplay(display, item.reading ?? displayNativeText(detail.reading));
  const romanization = displayNativeText(item.pronunciation) || displayNativeText(detail.romanization);
  const examples = asRecordList(detail.examples);

  return (
    <Card className="overflow-hidden p-0">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-3 px-4 py-4 text-left transition hover:bg-white/[.03]"
      >
        <div className="min-w-0 flex-1">
          <strong className="font-display text-xl font-black text-white">{display}</strong>
        </div>
        <SpeakerButton text={speech} languageCode={learningLanguage} size="sm" />
        {expanded ? <ChevronUp size={18} className="text-slate-400" /> : <ChevronDown size={18} className="text-slate-400" />}
      </button>

      {expanded && (
        <div className="space-y-3 border-t border-white/10 px-4 py-4">
          {meaning && <DetailRow label={t("vocabMeaning")} value={meaning} />}
          {reading && <DetailRow label={t("vocabReading")} value={reading} />}
          {romanization && romanization !== reading && (
            <DetailRow label={t("romanization")} value={romanization} />
          )}
          <DetailRow label={t("whenToUse")} value={displayNativeText(detail.timingAndContext) || displayNativeText(detail.overview)} />
          <DetailRow label={t("appropriateFor")} value={displayNativeText(detail.appropriateFor)} />
          <DetailRow label={t("avoidUse")} value={displayNativeText(detail.avoid)} />
          <DetailRow label={t("register")} value={displayNativeText(detail.register)} />
          <DetailRow label={t("otherExpressions")} value={displayNativeText(detail.casual)} />
          <DetailRow label={t("importantNote")} value={displayNativeText(detail.notes) || displayNativeText(detail.casualNotes)} />

          {examples.map((example, index) => {
            const text = displayNativeText(example.text);
            const exampleReading = readingLineForDisplay(text, displayNativeText(example.reading));
            const translation = displayNativeText(example.translation);
            const exampleSpeech = displayNativeText(example.speechText) || text;
            if (!text) return null;
            return (
              <div key={`${text}-${index}`} className="rounded-xl bg-black/20 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs font-black uppercase tracking-wider text-cyan-300">
                      {t("vocabExample")}
                    </p>
                    <strong className="mt-1 block text-white">{text}</strong>
                    {exampleReading && (
                      <p className="mt-1 text-xs font-bold text-cyan-300">{exampleReading}</p>
                    )}
                    {translation && <p className="mt-1 text-sm text-slate-400">{translation}</p>}
                  </div>
                  <SpeakerButton text={exampleSpeech} languageCode={learningLanguage} size="sm" />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  if (!value.trim()) return null;
  return (
    <div>
      <p className="text-xs font-black uppercase tracking-wider text-cyan-300">{label}</p>
      <p className="mt-1 text-sm leading-6 text-slate-300">{value}</p>
    </div>
  );
}

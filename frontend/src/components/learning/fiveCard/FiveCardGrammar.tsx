import { ArrowLeft } from "lucide-react";
import { PageContainer } from "../../layout/PageContainer";
import { Button } from "../../ui/Button";
import { Card } from "../../ui/Card";
import { SpeakerButton } from "../../ui/SpeakerButton";
import { useTranslation } from "../../../i18n/useTranslation";
import type { Lesson } from "../../../types/index";
import { readingLineForDisplay } from "../../../utils/fiveCardPractice";
import { asRecordList, asStringList, displayNativeText } from "../../../utils/nativeContent";

type Props = {
  lesson: Lesson;
  content: Record<string, unknown>;
  onBack: () => void;
};

export function FiveCardGrammar({ lesson, content, onBack }: Props) {
  const { t } = useTranslation();
  const patterns = asRecordList(content.grammarPatterns);
  const distinctions = asRecordList(content.distinctions);

  return (
    <PageContainer className="py-7 sm:py-10">
      <Button variant="ghost" className="mb-6" onClick={onBack}>
        <ArrowLeft size={17} />
        {t("back")}
      </Button>

      <h1 className="font-display text-3xl font-black">{t("learnGrammarPatterns")}</h1>
      <p className="mt-2 text-sm text-cyan-200">{t("lessonSectionGrammarJapanese")}</p>

      <div className="mt-6 space-y-4">
        {patterns.map((pattern, index) => {
          const title = displayNativeText(pattern.title);
          const formula = displayNativeText(pattern.formula);
          const formulaReading = readingLineForDisplay(
            formula,
            displayNativeText(pattern.formulaReading),
          );
          const meaning = displayNativeText(pattern.meaning);
          const whenToUse = displayNativeText(pattern.whenToUse);
          const commonMistake = displayNativeText(pattern.commonMistake);
          const notes = displayNativeText(pattern.notes);
          const comparison = displayNativeText(pattern.comparison);
          const examples = asRecordList(pattern.examples);

          return (
            <Card key={`${title}-${index}`} className="p-5">
              {title && <h2 className="font-display text-xl font-black text-white">{title}</h2>}
              {formula && (
                <div className="mt-3">
                  <p className="text-xs font-black uppercase tracking-wider text-cyan-300">
                    {t("formula")}
                  </p>
                  <p className="mt-1 text-lg font-black text-white">{formula}</p>
                  {formulaReading && (
                    <p className="mt-1 text-xs font-bold text-cyan-300">{formulaReading}</p>
                  )}
                </div>
              )}
              {meaning && (
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  <span className="font-bold text-slate-500">{t("vocabMeaning")}: </span>
                  {meaning}
                </p>
              )}
              {whenToUse && <LabeledBlock label={t("whenToUse")} value={whenToUse} />}
              {commonMistake && <LabeledBlock label={t("commonMistake")} value={commonMistake} />}
              {notes && <LabeledBlock label={t("importantNote")} value={notes} />}
              {comparison && <LabeledBlock label={t("comparison")} value={comparison} />}

              {examples.length > 0 && (
                <div className="mt-4 space-y-2">
                  {examples.map((example, exampleIndex) => {
                    const text = displayNativeText(example.text || example.displayText);
                    const reading = readingLineForDisplay(
                      text,
                      displayNativeText(example.reading),
                    );
                    const translation = displayNativeText(example.translation);
                    const speech =
                      displayNativeText(example.speechText) || text;
                    if (!text) return null;
                    return (
                      <div
                        key={`${text}-${exampleIndex}`}
                        className="rounded-xl bg-black/20 p-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <strong className="text-white">{text}</strong>
                            {reading && (
                              <p className="mt-1 text-xs font-bold text-cyan-300">{reading}</p>
                            )}
                            {translation && (
                              <p className="mt-1 text-sm text-slate-400">{translation}</p>
                            )}
                          </div>
                          <SpeakerButton
                            text={speech}
                            languageCode={lesson.language}
                            size="sm"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>
          );
        })}

        {distinctions.length > 0 && (
          <Card className="p-5">
            <h2 className="font-display text-xl font-black text-white">{t("distinctions")}</h2>
            <div className="mt-4 space-y-3">
              {distinctions.map((item, index) => {
                const term = displayNativeText(item.term);
                const points = asStringList(item.points);
                return (
                  <div key={`${term}-${index}`} className="rounded-xl bg-black/20 p-3">
                    {term && <strong className="text-white">{term}</strong>}
                    {points.length > 0 && (
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-300">
                        {points.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        )}
      </div>
    </PageContainer>
  );
}

function LabeledBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="mt-3">
      <p className="text-xs font-black uppercase tracking-wider text-cyan-300">{label}</p>
      <p className="mt-1 text-sm leading-6 text-slate-300">{value}</p>
    </div>
  );
}

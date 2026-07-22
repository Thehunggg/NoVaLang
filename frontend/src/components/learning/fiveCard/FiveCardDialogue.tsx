import { ArrowLeft } from "lucide-react";
import { PageContainer } from "../../layout/PageContainer";
import { Button } from "../../ui/Button";
import { Card } from "../../ui/Card";
import { SpeakerButton } from "../../ui/SpeakerButton";
import { useTranslation } from "../../../i18n/useTranslation";
import type { Lesson } from "../../../types/index";
import { characterById, readingLineForDisplay, type PracticeCharacter } from "../../../utils/fiveCardPractice";
import { asRecordList, displayNativeText } from "../../../utils/nativeContent";

type Props = {
  lesson: Lesson;
  content: Record<string, unknown>;
  onBack: () => void;
};

export function FiveCardDialogue({ lesson, content, onBack }: Props) {
  const { t } = useTranslation();
  const groups = asRecordList(content.dialogueGroups);
  const pool = asRecordList(content.approvedCharacterNamePool).map((item) => ({
    id: String(item.id ?? ""),
    displayName: String(item.displayName ?? ""),
    canonicalName: String(item.canonicalName ?? ""),
    audioName: String(item.audioName ?? ""),
  })) as PracticeCharacter[];

  return (
    <PageContainer className="py-7 sm:py-10">
      <Button variant="ghost" className="mb-6" onClick={onBack}>
        <ArrowLeft size={17} />
        {t("back")}
      </Button>

      <h1 className="font-display text-3xl font-black">{t("learnMiniDialogue")}</h1>
      <p className="mt-2 text-sm text-cyan-200">{t("lessonSectionDialogueJapanese")}</p>

      <div className="mt-6 space-y-5">
        {groups.map((group, groupIndex) => {
          const title = displayNativeText(group.title);
          const situation = displayNativeText(group.situation);
          const explanation = displayNativeText(group.explanation);
          const lines = asRecordList(group.lines);

          return (
            <Card key={String(group.id ?? groupIndex)} className="p-5">
              {title && <h2 className="font-display text-xl font-black text-white">{title}</h2>}
              {situation && <p className="mt-2 text-sm text-slate-400">{situation}</p>}

              <div className="mt-4 space-y-3">
                {lines.map((line, lineIndex) => {
                  const speaker = characterById(pool, String(line.speakerId ?? ""));
                  const targetText = displayNativeText(line.targetText || line.displayText);
                  const reading = readingLineForDisplay(targetText, displayNativeText(line.reading));
                  const translation = displayNativeText(line.translation);
                  const speech = displayNativeText(line.speechText) || targetText;
                  return (
                    <div
                      key={`${String(line.speakerId)}-${lineIndex}`}
                      className="rounded-xl border border-white/[.08] bg-black/20 p-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          {speaker && (
                            <p className="text-xs font-black text-fuchsia-300">
                              {speaker.displayName}
                              {speaker.audioName ? ` · ${speaker.audioName}` : ""}
                            </p>
                          )}
                          <strong className="mt-1 block text-lg text-white">{targetText}</strong>
                          {reading && (
                            <p className="mt-1 text-xs font-bold text-cyan-300">{reading}</p>
                          )}
                          {translation && (
                            <p className="mt-2 text-sm text-slate-400">{translation}</p>
                          )}
                        </div>
                        {speech && (
                          <SpeakerButton
                            text={speech}
                            languageCode={lesson.language}
                            size="sm"
                          />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {explanation && (
                <div className="mt-4 border-t border-white/10 pt-3">
                  <p className="text-xs font-black uppercase tracking-wider text-cyan-300">
                    {t("explanation")}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-300">{explanation}</p>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </PageContainer>
  );
}

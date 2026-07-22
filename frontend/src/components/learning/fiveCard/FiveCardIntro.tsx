import { ArrowLeft, Target } from "lucide-react";
import type { ReactNode } from "react";
import { PageContainer } from "../../layout/PageContainer";
import { Button } from "../../ui/Button";
import { Card } from "../../ui/Card";
import { useApp } from "../../../context/AppContext";
import { useTranslation } from "../../../i18n/useTranslation";
import type { Lesson } from "../../../types/index";
import { getLocalizedText } from "../../../utils/localizedText";
import { asRecord, asStringList, displayNativeText } from "../../../utils/nativeContent";

type Props = {
  lesson: Lesson;
  content: Record<string, unknown>;
  onBack: () => void;
};

export function FiveCardIntro({ lesson, content, onBack }: Props) {
  const { t } = useTranslation();
  const { progress } = useApp();
  const native = progress.nativeLanguage;
  const intro = asRecord(content.intro) ?? {};

  const objectives = asStringList(intro.objectives);
  const situation = asStringList(intro.situation);
  const importantNote = asStringList(intro.importantNote);
  const canDo = getLocalizedText(lesson.descriptionTranslations ?? lesson.description, native);
  const todayWords = (lesson.vocabulary ?? [])
    .map((item) => item.displayText ?? item.word)
    .filter(Boolean);

  return (
    <PageContainer className="py-7 sm:py-10">
      <Button variant="ghost" className="mb-6" onClick={onBack}>
        <ArrowLeft size={17} />
        {t("back")}
      </Button>

      <h1 className="font-display text-3xl font-black">{t("lessonIntro")}</h1>
      <p className="mt-2 text-sm text-cyan-200">{t("lessonSectionIntroJapanese")}</p>

      <div className="mt-6 space-y-4">
        <IntroPanel title={t("goalLabel")}>
          {objectives.length ? (
            <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-slate-300">
              {objectives.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-500">{t("emptyContentPlaceholder")}</p>
          )}
        </IntroPanel>

        <IntroPanel title={t("situationLabel")}>
          <p className="whitespace-pre-line text-sm leading-6 text-slate-300">
            {situation.join("\n") || t("emptyContentPlaceholder")}
          </p>
        </IntroPanel>

        <IntroPanel title={t("afterLessonCanDo")}>
          <p className="flex items-start gap-2 text-sm leading-6 text-cyan-100">
            <Target className="mt-0.5 shrink-0" size={16} />
            <span>{displayNativeText(canDo) || t("emptyContentPlaceholder")}</span>
          </p>
        </IntroPanel>

        <IntroPanel title={t("todayLearn")}>
          {todayWords.length ? (
            <div className="flex flex-wrap gap-2">
              {todayWords.map((word) => (
                <span
                  key={word}
                  className="rounded-xl border border-white/10 bg-white/[.04] px-3 py-1.5 text-sm font-bold text-white"
                >
                  {word}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">{t("emptyContentPlaceholder")}</p>
          )}
        </IntroPanel>

        {importantNote.length > 0 && (
          <IntroPanel title={t("shortNote")}>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-slate-300">
              {importantNote.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </IntroPanel>
        )}
      </div>
    </PageContainer>
  );
}

function IntroPanel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Card className="p-5">
      <h2 className="text-xs font-black uppercase tracking-wider text-cyan-300">{title}</h2>
      <div className="mt-3">{children}</div>
    </Card>
  );
}

import { ArrowLeft, BookOpen, ChevronRight, MessageSquare, PenLine, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PageContainer } from "../../layout/PageContainer";
import { Badge } from "../../ui/Badge";
import { Button } from "../../ui/Button";
import { useApp } from "../../../context/AppContext";
import type { TranslationKey } from "../../../i18n/translations";
import { useTranslation } from "../../../i18n/useTranslation";
import type { Lesson } from "../../../types/index";
import { getLocalizedText } from "../../../utils/localizedText";
import {
  resolveLessonFiveCardContent,
  shouldUseFiveCardFlow,
} from "../../../utils/fiveCardPractice";
import { ReadingAidProvider, ReadingAidToggles } from "../JaSentence";
import { FiveCardDialogue } from "./FiveCardDialogue";
import { FiveCardGrammar } from "./FiveCardGrammar";
import { FiveCardIntro } from "./FiveCardIntro";
import { FiveCardPractice } from "./FiveCardPractice";
import { FiveCardVocabulary } from "./FiveCardVocabulary";

export type FiveCardSection =
  | "menu"
  | "introduction"
  | "vocabulary"
  | "dialogue"
  | "grammar"
  | "exercise";

type Props = {
  lesson: Lesson;
};

const menuCards: {
  section: Exclude<FiveCardSection, "menu">;
  titleKey: TranslationKey;
  subtitleKey: TranslationKey;
  descriptionKey: TranslationKey;
  Icon: typeof BookOpen;
  tone: "cyan" | "pink" | "amber" | "green" | "slate";
}[] = [
  {
    section: "introduction",
    titleKey: "lessonIntro",
    subtitleKey: "lessonSectionIntroJapanese",
    descriptionKey: "lessonMenuIntroDescription",
    Icon: Sparkles,
    tone: "cyan",
  },
  {
    section: "vocabulary",
    titleKey: "lessonVocabCardsSection",
    subtitleKey: "lessonSectionVocabularyJapanese",
    descriptionKey: "lessonMenuVocabularyDescription",
    Icon: BookOpen,
    tone: "green",
  },
  {
    section: "dialogue",
    titleKey: "learnMiniDialogue",
    subtitleKey: "lessonSectionDialogueJapanese",
    descriptionKey: "lessonMenuDialogueDescription",
    Icon: MessageSquare,
    tone: "pink",
  },
  {
    section: "grammar",
    titleKey: "learnGrammarPatterns",
    subtitleKey: "lessonSectionGrammarJapanese",
    descriptionKey: "lessonMenuGrammarDescription",
    Icon: PenLine,
    tone: "amber",
  },
  {
    section: "exercise",
    titleKey: "practiceExercises",
    subtitleKey: "lessonSectionExerciseJapanese",
    descriptionKey: "lessonMenuExerciseDescription",
    Icon: Sparkles,
    tone: "slate",
  },
];

export function FiveCardLessonShell({ lesson }: Props) {
  const { t } = useTranslation();
  const { progress } = useApp();
  const native = progress.nativeLanguage;
  const [section, setSection] = useState<FiveCardSection>("menu");

  const content = useMemo(
    () => resolveLessonFiveCardContent(lesson, native),
    [lesson, native],
  );

  const lessonTitle = getLocalizedText(lesson.titleTranslations ?? lesson.title, native);

  if (!shouldUseFiveCardFlow(lesson)) return null;

  // G14-R14 [JA] (b) — hai công tắc trợ đọc đặt MỘT chỗ ở đây, bao cả 5 thẻ,
  // nên bật ở thẻ nào là cả bài theo. Thanh dính trên đầu để cuộn xa vẫn với
  // tới được. Store nhớ theo PHIÊN.
  const sectionBody =
    section === "introduction" ? (
      <FiveCardIntro lesson={lesson} content={content} onBack={() => setSection("menu")} />
    ) : section === "vocabulary" ? (
      <FiveCardVocabulary lesson={lesson} content={content} onBack={() => setSection("menu")} />
    ) : section === "dialogue" ? (
      <FiveCardDialogue lesson={lesson} content={content} onBack={() => setSection("menu")} />
    ) : section === "grammar" ? (
      <FiveCardGrammar lesson={lesson} content={content} onBack={() => setSection("menu")} />
    ) : section === "exercise" ? (
      <FiveCardPractice lesson={lesson} content={content} onBack={() => setSection("menu")} />
    ) : null;

  if (sectionBody) {
    return (
      <ReadingAidProvider
        lessonSessionKey={lesson.id}
        learningLanguageCode={lesson.language}
      >
        <div className="sticky top-0 z-20 border-b border-white/10 bg-[#0b0714]/90 backdrop-blur">
          <PageContainer className="py-2">
            <ReadingAidToggles />
          </PageContainer>
        </div>
        {sectionBody}
      </ReadingAidProvider>
    );
  }

  return (
    <PageContainer className="py-7 sm:py-10">
      <Link to="/">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft size={17} />
          {t("backToCourse")}
        </Button>
      </Link>

      <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-violet-400/10 to-cyan-300/[.06] p-6 sm:p-9">
        <Badge tone="pink">{lesson.levelId}</Badge>
        <h1 className="mt-5 font-display text-4xl font-black">{lessonTitle}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
          {getLocalizedText(lesson.descriptionTranslations ?? lesson.description, native)}
        </p>
      </section>

      <section className="mt-6 space-y-3">
        {menuCards.map(({ section: cardSection, titleKey, subtitleKey, descriptionKey, Icon, tone }) => (
          <button
            key={cardSection}
            type="button"
            onClick={() => setSection(cardSection)}
            className="flex w-full items-center gap-4 rounded-2xl border border-white/10 bg-white/[.045] p-4 text-left transition hover:border-violet-300/40"
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-cyan-300/10 text-cyan-200">
              <Icon size={20} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex flex-wrap items-center gap-2">
                <strong className="font-display text-lg font-black text-white">{t(titleKey)}</strong>
                <Badge tone={tone}>{t(subtitleKey)}</Badge>
              </span>
              <span className="mt-1 block text-sm text-slate-400">{t(descriptionKey)}</span>
            </span>
            <ChevronRight className="shrink-0 text-slate-500" size={18} />
          </button>
        ))}
      </section>
    </PageContainer>
  );
}

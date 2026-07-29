import { ChevronDown, ChevronUp } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslation } from "../../i18n/useTranslation";
import { displayNativeText } from "../../utils/nativeContent";
import { SpeakerButton } from "../ui/SpeakerButton";
import { JaSentence } from "./JaSentence";

export type VocabularyReferenceItem = {
  term?: string;
  reading?: string;
  speechText?: string;
  meaning?: string;
  meaningByNative?: Partial<Record<string, string>>;
  register?: string;
  registerByNative?: Partial<Record<string, string>>;
  example?: {
    text?: string;
    reading?: string;
    speechText?: string;
    translation?: string;
    translationByNative?: Partial<Record<string, string>>;
  };
};

type Props = {
  references: VocabularyReferenceItem[] | null | undefined;
  learningLanguageCode: string;
  nativeLanguageCode: string;
};

const normalizeLocale = (code: string) =>
  code.trim().toLowerCase().replace(/_/g, "-").split("-")[0] ?? "en";

/** Resolve *ByNative or already-resolved string; hide missing sentinels for end users. */
const resolveReferenceField = (
  resolved: string | undefined,
  byNative: Partial<Record<string, string>> | undefined,
  nativeLanguageCode: string,
): string => {
  const fromResolved = displayNativeText(resolved);
  if (fromResolved) return fromResolved;
  const locale = normalizeLocale(nativeLanguageCode);
  return displayNativeText(byNative?.[locale]);
};

export function VocabularyReferencesBlock({
  references,
  learningLanguageCode,
  nativeLanguageCode,
}: Props) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);

  const items = useMemo(
    () =>
      (references ?? []).filter(
        (item) => typeof item.term === "string" && item.term.trim().length > 0,
      ),
    [references],
  );

  if (items.length === 0) return null;

  return (
    <section
      data-testid="vocabulary-references-section"
      className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-white/[.04]"
    >
      <button
        type="button"
        data-testid="vocabulary-references-toggle"
        aria-expanded={expanded}
        onClick={() => setExpanded((value) => !value)}
        className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-white/[.04]"
      >
        <strong className="min-w-0 flex-1 font-display text-lg font-black text-white">
          {t("vocabularyReferencesTitle")}
        </strong>
        {expanded ? (
          <ChevronUp className="shrink-0 text-slate-400" size={20} />
        ) : (
          <ChevronDown className="shrink-0 text-slate-400" size={20} />
        )}
      </button>

      {expanded && (
        <div className="space-y-3 border-t border-white/10 px-4 py-4">
          {items.map((item, index) => {
            const term = item.term!.trim();
            const reading = displayNativeText(item.reading);
            const speechText = displayNativeText(item.speechText);
            const meaning = resolveReferenceField(
              item.meaning,
              item.meaningByNative,
              nativeLanguageCode,
            );
            // §B2b — mục tham khảo chỉ còn 4 phần: từ vựng · nghĩa · mức độ
            // lịch sự · ví dụ. Nhãn dùng chung key với thẻ từ vựng.
            const register = resolveReferenceField(
              item.register,
              item.registerByNative,
              nativeLanguageCode,
            );
            const exampleText = displayNativeText(item.example?.text);
            const exampleTranslation = resolveReferenceField(
              item.example?.translation,
              item.example?.translationByNative,
              nativeLanguageCode,
            );

            return (
              <article
                key={`${term}-${index}`}
                data-testid={`vocabulary-reference-item-${index}`}
                className="rounded-xl border border-white/[.08] bg-black/20 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    {/* G14-R14: từ tham khảo cũng qua widget câu dùng chung. */}
                    <JaSentence
                      displayText={term}
                      reading={reading}
                      speechText={speechText}
                      languageCode={learningLanguageCode}
                      showSpeaker={false}
                      mainClassName="font-display text-xl font-black text-white"
                    />
                  </div>
                  {speechText ? (
                    <SpeakerButton
                      text={speechText}
                      languageCode={learningLanguageCode}
                      size="sm"
                    />
                  ) : null}
                </div>

                {meaning ? (
                  <p className="mt-3 text-sm leading-6 text-slate-200">{meaning}</p>
                ) : null}

                <LabeledValue label={t("register")} value={register} />
                {exampleText ? (
                  <div className="mt-3">
                    <p className="mb-1 text-xs font-black uppercase tracking-wider text-cyan-300">
                      {t("vocabExample")}
                    </p>
                    {/* G14-R14: câu ví dụ đi qua widget câu dùng chung — trước
                        đây nối chuỗi "câu — dịch" nên không có nút nghe. */}
                    <JaSentence
                      displayText={exampleText}
                      reading={displayNativeText(item.example?.reading)}
                      speechText={displayNativeText(item.example?.speechText)}
                      translation={exampleTranslation}
                      languageCode={learningLanguageCode}
                    />
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

function LabeledValue({ label, value }: { label: string; value: string }) {
  const safe = displayNativeText(value);
  if (!safe) return null;
  return (
    <div className="mt-3">
      <p className="text-xs font-black uppercase tracking-wider text-cyan-300">
        {label}
      </p>
      <p className="mt-1 text-sm leading-6 text-slate-300">{safe}</p>
    </div>
  );
}

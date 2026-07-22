import { ChevronDown, ChevronUp } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslation } from "../../i18n/useTranslation";
import { SpeakerButton } from "../ui/SpeakerButton";

export type VocabularyReferenceItem = {
  term?: string;
  reading?: string;
  speechText?: string;
  meaning?: string;
  meaningByNative?: Partial<Record<string, string>>;
  forWord?: string;
  forWho?: string;
  forWhoByNative?: Partial<Record<string, string>>;
  whenToUse?: string;
  whenToUseByNative?: Partial<Record<string, string>>;
  difference?: string;
  differenceByNative?: Partial<Record<string, string>>;
};

type Props = {
  references: VocabularyReferenceItem[] | null | undefined;
  learningLanguageCode: string;
  nativeLanguageCode: string;
};

const normalizeLocale = (code: string) =>
  code.trim().toLowerCase().replace(/_/g, "-").split("-")[0] ?? "en";

/** Resolve *ByNative for the selected native language only — no cross-locale fallback. */
const byNativeOnly = (
  byNative: Partial<Record<string, string>> | undefined,
  nativeLanguageCode: string,
  path: string,
): string => {
  const locale = normalizeLocale(nativeLanguageCode);
  const value = byNative?.[locale]?.trim();
  if (value) return value;
  return `⟦missing-content:${path}:${locale}⟧`;
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
            const reading = item.reading?.trim() ?? "";
            const speechText = item.speechText?.trim() ?? "";
            const meaning = byNativeOnly(
              item.meaningByNative,
              nativeLanguageCode,
              `vocabularyReferences[${index}].meaning`,
            );
            const forWho = byNativeOnly(
              item.forWhoByNative,
              nativeLanguageCode,
              `vocabularyReferences[${index}].forWho`,
            );
            const whenToUse = byNativeOnly(
              item.whenToUseByNative,
              nativeLanguageCode,
              `vocabularyReferences[${index}].whenToUse`,
            );
            const difference = byNativeOnly(
              item.differenceByNative,
              nativeLanguageCode,
              `vocabularyReferences[${index}].difference`,
            );
            const forWord = item.forWord?.trim() ?? "";

            return (
              <article
                key={`${term}-${index}`}
                data-testid={`vocabulary-reference-item-${index}`}
                className="rounded-xl border border-white/[.08] bg-black/20 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="font-display text-xl font-black text-white">
                      {term}
                    </h3>
                    {reading ? (
                      <p className="mt-1 text-sm font-bold text-cyan-300">
                        {reading}
                      </p>
                    ) : null}
                  </div>
                  {speechText ? (
                    <SpeakerButton
                      text={speechText}
                      languageCode={learningLanguageCode}
                      size="sm"
                    />
                  ) : null}
                </div>

                <p className="mt-3 text-sm leading-6 text-slate-200">{meaning}</p>

                {forWord ? (
                  <LabeledValue label={t("referenceForWord")} value={forWord} />
                ) : null}
                <LabeledValue label={t("referenceForWho")} value={forWho} />
                <LabeledValue
                  label={t("referenceWhenToUse")}
                  value={whenToUse}
                />
                <LabeledValue
                  label={t("referenceDifference")}
                  value={difference}
                />
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

function LabeledValue({ label, value }: { label: string; value: string }) {
  if (!value.trim()) return null;
  return (
    <div className="mt-3">
      <p className="text-xs font-black uppercase tracking-wider text-cyan-300">
        {label}
      </p>
      <p className="mt-1 text-sm leading-6 text-slate-300">{value}</p>
    </div>
  );
}

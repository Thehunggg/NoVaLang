import { BookOpen } from "lucide-react";
import { useState } from "react";
import type { Language } from "../../types/index";
import { getLanguageOption } from "../../../../shared/languageOptions";

export function LanguageHero({
  language,
  trackName,
  description,
  lessonCount,
}: {
  language: Language;
  trackName: string;
  description: string;
  lessonCount: number;
}) {
  const metadata = getLanguageOption(language.code);
  const gradient = metadata && "heroGradient" in metadata && metadata.heroGradient?.length
    ? metadata.heroGradient
    : ["#173247", "#31465A", "#151B2A"];
  const configuredAsset = metadata && "heroAsset" in metadata
    ? metadata.heroAsset
    : "language_hero/default.svg";
  const [asset, setAsset] = useState(configuredAsset);
  const nativeReading = metadata && "nativeNameReading" in metadata
    ? metadata.nativeNameReading
    : undefined;
  const overlay = metadata && "heroOverlayOpacity" in metadata
    ? metadata.heroOverlayOpacity ?? 0.36
    : 0.36;

  return (
    <section
      className="relative min-h-[250px] overflow-hidden rounded-lg border border-white/10 p-5 sm:min-h-[280px] sm:p-8"
      style={{ background: `linear-gradient(135deg, ${gradient.join(", ")})` }}
    >
      <img
        src={`/shared/${asset}`}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 h-full w-[74%] object-cover object-right"
        onError={() => asset !== "language_hero/default.svg" && setAsset("language_hero/default.svg")}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: `linear-gradient(90deg, rgba(8,10,20,.96) 0%, rgba(8,10,20,.74) 48%, rgba(8,10,20,${overlay}) 72%, transparent 100%)` }}
      />
      <div className="relative flex min-h-[208px] max-w-[31rem] flex-col items-start justify-end sm:min-h-[216px]">
        <div className="mb-auto rounded-full border border-white/15 bg-black/20 px-3 py-2 text-xl" aria-hidden="true">
          {language.flag}
        </div>
        <h1 className="font-display text-3xl font-black sm:text-4xl">
          <span className="flex w-fit flex-col items-center leading-none">
            <span>{language.nativeName}</span>
            {nativeReading && <span className="mt-1 text-xs font-bold text-cyan-100/80">{nativeReading}</span>}
          </span>
        </h1>
        <p className="mt-3 text-sm font-black text-cyan-100">{trackName}</p>
        <p className="mt-2 max-w-md text-sm leading-6 text-slate-200/85">{description}</p>
        <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/25 px-3 py-2 text-xs font-black text-white">
          <BookOpen size={15} /> {lessonCount}
        </span>
      </div>
    </section>
  );
}

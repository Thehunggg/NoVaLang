import { RotateCcw, Trash2 } from "lucide-react";
import { useState } from "react";
import type { SavedFlashcard } from "../../types/index";
import { useApp } from "../../context/AppContext";
import { getLocalizedAnswers, getLocalizedText } from "../../utils/localizedText";
import { SpeakerButton } from "../ui/SpeakerButton";
import { useTranslation } from "../../i18n/useTranslation";

export function Flashcard({ card, onRemove }: { card: SavedFlashcard; onRemove: () => void }) {
  const { t } = useTranslation();
  const [flipped, setFlipped] = useState(false);
  const { progress } = useApp();
  const display = card.displayText ?? card.term;
  const speech = card.speechText ?? card.reading ?? card.kana ?? card.term;
  const meaning = getLocalizedAnswers(card.meanings, progress.nativeLanguage)[0] ?? card.translation;
  const example = card.exampleDisplay ?? card.example;
  const exampleSpeech = card.exampleSpeechText ?? speech;
  const translation = getLocalizedText(card.exampleTranslations ?? card.sentenceTranslation ?? "", progress.nativeLanguage);
  return <div className="group [perspective:1000px]"><div className={`relative h-64 transition-transform duration-500 [transform-style:preserve-3d] ${flipped ? "[transform:rotateY(180deg)]" : ""}`}><div role="button" tabIndex={0} onClick={() => setFlipped(true)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") setFlipped(true); }} className="absolute inset-0 w-full cursor-pointer rounded-3xl border border-cyan-300/20 bg-gradient-to-br from-cyan-300/10 to-violet-400/10 p-6 text-left shadow-[0_0_35px_rgba(34,211,238,.08)] [backface-visibility:hidden]"><div className="flex items-start justify-between gap-3"><span className="text-xs font-black uppercase tracking-wider text-cyan-300">{t("vocabulary")}</span><SpeakerButton text={speech} languageCode={card.language} size="sm" /></div><strong className="mt-7 block text-center font-display text-3xl font-black text-white">{display}</strong>{card.reading && <span className="mt-3 block text-center text-sm font-bold text-violet-300">{card.reading}</span>}<span className="absolute bottom-5 left-0 right-0 flex items-center justify-center gap-2 text-xs font-bold text-slate-500"><RotateCcw size={14} />{t("flashcardHelp")}</span></div><div className="absolute inset-0 rounded-3xl border border-fuchsia-300/20 bg-gradient-to-br from-violet-400/15 to-fuchsia-400/10 p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]"><div className="flex items-start justify-between gap-3"><span className="text-xs font-black uppercase tracking-wider text-fuchsia-300">{t("meaningLabel")}</span><SpeakerButton text={exampleSpeech} languageCode={card.language} size="sm" /></div><button type="button" onClick={() => setFlipped(false)} className="mt-4 block text-left"><strong className="block font-display text-2xl font-black text-white">{meaning}</strong><p className="mt-4 text-sm leading-6 text-slate-400">{example}</p>{translation && <p className="mt-2 text-xs font-bold text-cyan-300">{translation}</p>}</button><button onClick={(event) => { event.stopPropagation(); onRemove(); }} className="absolute bottom-5 right-5 rounded-xl p-2 text-slate-500 hover:bg-rose-400/10 hover:text-rose-300" aria-label={t("flashcards")}><Trash2 size={18} /></button></div></div></div>;
}

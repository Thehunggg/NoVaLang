import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useState, type MouseEvent } from "react";
import { useTranslation } from "../../i18n/useTranslation";
import { isSpeechSupported, speakText, stopSpeech } from "../../utils/speech";

export interface SpeakerButtonProps { text: string; languageCode: string; label?: string; size?: "sm" | "md" | "lg"; className?: string; }

export function SpeakerButton({ text, languageCode, label, size = "md", className = "" }: SpeakerButtonProps) {
  const { t } = useTranslation(); const [supported, setSupported] = useState(true); const [speaking, setSpeaking] = useState(false); const [error, setError] = useState("");
  useEffect(() => { setSupported(isSpeechSupported()); }, []);
  useEffect(() => () => stopSpeech(), []);
  const dimensions = size === "sm" ? "h-8 min-w-8 px-2" : size === "lg" ? "h-16 min-w-16 px-4" : "h-10 min-w-10 px-3"; const iconSize = size === "sm" ? 15 : size === "lg" ? 27 : 18;
  const play = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); event.stopPropagation(); setError("");
    if (!isSpeechSupported()) { setSupported(false); setError(t("speechNotSupported")); return; }
    try { await speakText({ text, languageCode, onStart: () => setSpeaking(true), onEnd: () => setSpeaking(false), onError: () => setSpeaking(false) }); }
    catch { setSpeaking(false); setError(t("pronunciationFailed")); }
  };
  const unavailable = !supported ? t("speechNotSupported") : "";
  return <span className={`group/speaker relative inline-flex items-center ${className}`}><button type="button" onClick={play} disabled={!supported || !text.trim()} aria-label={t("playPronunciation")} title={unavailable || t("playPronunciation")} className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border text-xs font-black transition ${dimensions} ${speaking ? "border-fuchsia-300/50 bg-fuchsia-300/20 text-fuchsia-200 shadow-[0_0_24px_rgba(232,121,249,.24)]" : supported ? "border-cyan-300/25 bg-cyan-300/10 text-cyan-200 hover:border-cyan-300/50 hover:bg-cyan-300/20" : "cursor-not-allowed border-white/5 bg-white/[.03] text-slate-700"}`}><span aria-hidden="true">{supported ? <Volume2 size={iconSize} className={speaking ? "animate-pulse" : ""} /> : <VolumeX size={iconSize} />}</span>{label && <span>{speaking ? t("speaking") : label}</span>}</button>{unavailable && <span className="pointer-events-none absolute right-0 top-full z-30 mt-2 hidden w-60 rounded-xl border border-amber-300/25 bg-[#18101f] p-3 text-left text-[11px] font-bold leading-5 text-amber-100 shadow-2xl group-hover/speaker:block">{unavailable}</span>}{error && <span role="status" className="absolute right-0 top-full z-30 mt-2 w-64 rounded-xl border border-rose-300/25 bg-[#18101f] p-3 text-left text-[11px] font-bold leading-5 text-rose-100 shadow-2xl">{error}</span>}</span>;
}

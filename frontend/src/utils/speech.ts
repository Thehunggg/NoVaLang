export interface SpeakTextParams {
  text: string;
  languageCode: string;
  rate?: number;
  pitch?: number;
  volume?: number;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (error: unknown) => void;
}

export const getSpeechLang = (languageCode: string): string => ({ en: "en-US", ja: "ja-JP", es: "es-ES", vi: "vi-VN" }[languageCode] ?? "en-US");
export const isSpeechSupported = (): boolean => typeof window !== "undefined" && "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
export const stopSpeech = (): void => { if (isSpeechSupported()) window.speechSynthesis.cancel(); };

export const loadVoices = (): Promise<SpeechSynthesisVoice[]> => new Promise((resolve) => {
  if (!isSpeechSupported()) { resolve([]); return; }
  const synth = window.speechSynthesis; const current = synth.getVoices();
  if (current.length) { resolve(current); return; }
  let finished = false;
  const finish = () => { if (finished) return; finished = true; synth.removeEventListener("voiceschanged", finish); resolve(synth.getVoices()); };
  synth.addEventListener("voiceschanged", finish); window.setTimeout(finish, 1800);
});

export async function speakText({ text, languageCode, rate = 0.8, pitch = 1, volume = 1, onStart, onEnd, onError }: SpeakTextParams): Promise<void> {
  if (!isSpeechSupported()) { const error = new Error("Pronunciation is not available in this browser."); onError?.(error); throw error; }
  const content = text.trim(); if (!content) { const error = new Error("No pronunciation text was provided."); onError?.(error); throw error; }
  const speechLang = getSpeechLang(languageCode); const voices = await loadVoices(); const exact = speechLang.toLowerCase(); const base = exact.split("-")[0];
  const voice = voices.find((item) => item.lang.toLowerCase() === exact) ?? voices.find((item) => item.lang.toLowerCase().split("-")[0] === base);
  const utterance = new SpeechSynthesisUtterance(content); utterance.lang = speechLang; utterance.rate = rate; utterance.pitch = pitch; utterance.volume = volume; if (voice) utterance.voice = voice;
  if (import.meta.env?.DEV) console.debug("[NovaLang speech]", { text: content, languageCode, speechLang, voice: voice?.name ?? "browser default", availableVoices: voices.length });
  return new Promise<void>((resolve, reject) => {
    let started = false; let settled = false;
    utterance.onstart = () => { started = true; onStart?.(); };
    utterance.onend = () => { if (settled) return; settled = true; onEnd?.(); resolve(); };
    utterance.onerror = (event) => { if (settled) return; settled = true; const error = new Error(`Pronunciation playback failed: ${event.error}`); if (import.meta.env?.DEV) console.error("[NovaLang speech]", error, event); onError?.(error); onEnd?.(); reject(error); };
    window.speechSynthesis.cancel(); window.speechSynthesis.speak(utterance);
    window.setTimeout(() => { if (!started && !settled) { settled = true; const error = new Error(`The ${speechLang} voice did not start.`); if (import.meta.env?.DEV) console.error("[NovaLang speech]", error); onError?.(error); onEnd?.(); reject(error); } }, 6000);
  });
}

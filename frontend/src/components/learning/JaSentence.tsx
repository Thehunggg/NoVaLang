import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { SpeakerButton } from "../ui/SpeakerButton";
import { useTranslation } from "../../i18n/useTranslation";
import {
  hasFurigana,
  romajiLine,
  stripFurigana,
  wakachigaki,
} from "../../utils/japaneseText";

/**
 * MẶT HIỂN THỊ CHUỖI NHẬT DÙNG CHUNG (web) — G14-R14.
 *
 * Đối ứng của `mobile/.../widgets/lesson/ja_sentence.dart`. Luật giống hệt:
 *   1. dòng chính LUÔN SẠCH (bỏ ngoặc chú âm khi vẽ) — R14 [JA] (a);
 *   2. dòng trợ đọc bật/tắt theo store phiên — R14 [JA] (b);
 *   3. nút nghe lấy từ `speechText` — R14 (b).
 *
 * CẤM vẽ chuỗi Nhật trần bằng <span> rời.
 */

type ReadingAid = {
  showFurigana: boolean;
  showRomaji: boolean;
  romajiToggleAllowed: boolean;
  learningLanguageCode: string;
  setShowFurigana: (value: boolean) => void;
  setShowRomaji: (value: boolean) => void;
};

const DEFAULT_AID: ReadingAid = {
  // Mặc định GIỮ NGUYÊN hành vi Q14 bên mobile: dòng kana BẬT, romaji TẮT.
  showFurigana: true,
  showRomaji: false,
  romajiToggleAllowed: false,
  learningLanguageCode: "",
  setShowFurigana: () => {},
  setShowRomaji: () => {},
};

const ReadingAidContext = createContext<ReadingAid>(DEFAULT_AID);

/** Giữ nguyên luật cũ của Q14: romaji chỉ mở tới B1. */
export const romajiToggleAllowed = (level: string): boolean =>
  ["A0", "A1", "A2", "B1"].includes(String(level ?? "").trim().toUpperCase());

/**
 * Store trợ đọc phạm vi CẢ BÀI, nhớ trong PHIÊN.
 *
 * `sessionStorage` chứ không `localStorage`: đóng tab là quên, đúng như
 * `LessonReadingAidStore` bên Flutter (giữ trong bộ nhớ, không ghi đĩa).
 */
export function ReadingAidProvider({
  lessonSessionKey,
  lessonLevel,
  learningLanguageCode,
  children,
}: {
  lessonSessionKey: string;
  lessonLevel: string;
  learningLanguageCode: string;
  children: ReactNode;
}) {
  const read = (name: string, fallback: boolean): boolean => {
    try {
      const raw = sessionStorage.getItem(`readingAid:${lessonSessionKey}:${name}`);
      return raw === null ? fallback : raw === "1";
    } catch {
      return fallback;
    }
  };
  const [showFurigana, setFurigana] = useState(() => read("furigana", true));
  const [showRomaji, setRomaji] = useState(() => read("romaji", false));
  const allowed = romajiToggleAllowed(lessonLevel);

  const persist = useCallback(
    (name: string, value: boolean) => {
      try {
        sessionStorage.setItem(`readingAid:${lessonSessionKey}:${name}`, value ? "1" : "0");
      } catch {
        /* phiên riêng tư chặn storage — không sao, chỉ mất ghi nhớ */
      }
    },
    [lessonSessionKey],
  );

  const value = useMemo<ReadingAid>(
    () => ({
      showFurigana,
      showRomaji: allowed && showRomaji,
      romajiToggleAllowed: allowed,
      learningLanguageCode,
      setShowFurigana: (v) => {
        setFurigana(v);
        persist("furigana", v);
      },
      setShowRomaji: (v) => {
        if (!allowed) return;
        setRomaji(v);
        persist("romaji", v);
      },
    }),
    [showFurigana, showRomaji, allowed, learningLanguageCode, persist],
  );

  return <ReadingAidContext.Provider value={value}>{children}</ReadingAidContext.Provider>;
}

export const useReadingAid = (): ReadingAid => useContext(ReadingAidContext);

/** Hai công tắc, đặt MỘT lần ở thanh đầu shell — ăn cả trang cuộn. */
export function ReadingAidToggles({ className = "" }: { className?: string }) {
  const { t } = useTranslation();
  const aid = useReadingAid();
  // Trợ đọc chỉ có nghĩa với ngôn ngữ dùng chú âm. R14 tầng [JA].
  if (aid.learningLanguageCode !== "ja") return null;

  const chip = (on: boolean) =>
    `rounded-xl border px-3 py-1.5 text-xs font-black transition ${
      on
        ? "border-cyan-300/50 bg-cyan-300/20 text-cyan-100"
        : "border-white/10 bg-white/[.04] text-slate-400 hover:border-white/25"
    }`;

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      <button
        type="button"
        data-testid="reading-aid-furigana"
        aria-pressed={aid.showFurigana}
        className={chip(aid.showFurigana)}
        onClick={() => aid.setShowFurigana(!aid.showFurigana)}
      >
        {t("readingAidFurigana")}
      </button>
      {aid.romajiToggleAllowed && (
        <button
          type="button"
          data-testid="reading-aid-romaji"
          aria-pressed={aid.showRomaji}
          className={chip(aid.showRomaji)}
          onClick={() => aid.setShowRomaji(!aid.showRomaji)}
        >
          {t("readingAidRomaji")}
        </button>
      )}
    </div>
  );
}

type Props = {
  /** Mặt chữ như trong dữ liệu — CÓ ngoặc chú âm. Component tự bỏ khi vẽ. */
  displayText: string;
  reading?: string;
  /** Chuỗi cho TTS. Thiếu thì lùi về mặt chữ ĐÃ BỎ NGOẶC — không bao giờ đưa
   *  chuỗi còn ngoặc cho máy đọc, nó sẽ đọc luôn cả phần chú âm. */
  speechText?: string;
  translation?: string;
  /** Romaji viết tay (Q14). Thiếu thì phiên máy từ kana. */
  romanization?: string;
  languageCode?: string;
  showSpeaker?: boolean;
  className?: string;
  mainClassName?: string;
};

export function JaSentence({
  displayText,
  reading,
  speechText,
  translation,
  romanization,
  languageCode,
  showSpeaker = true,
  className = "",
  mainClassName = "font-bold text-white",
}: Props) {
  const aid = useReadingAid();
  const text = String(displayText ?? "");
  if (!text.trim()) return null;

  const clean = stripFurigana(text);
  const kanaLine = aid.showFurigana ? kanaFor(text, reading) : "";
  const romaji = aid.showRomaji ? (romanization?.trim() || romajiLine(text, reading)) : "";
  const tts = speechText?.trim() || clean;
  const lang = languageCode || aid.learningLanguageCode || "ja";

  return (
    <div className={`flex items-start justify-between gap-3 ${className}`}>
      <div className="min-w-0">
        <p className={mainClassName}>{clean}</p>
        {kanaLine && <p className="mt-1 text-xs font-bold text-cyan-300">{kanaLine}</p>}
        {romaji && <p className="mt-0.5 text-xs italic text-slate-400">{romaji}</p>}
        {translation?.trim() && <p className="mt-1 text-sm text-slate-400">{translation}</p>}
      </div>
      {showSpeaker && <SpeakerButton text={tts} languageCode={lang} size="sm" />}
    </div>
  );
}

/**
 * Câu có ngoặc → ráp wakachigaki theo ranh giới khối.
 * Câu không có ngoặc (toàn kana) → dòng đọc chỉ lặp lại chính nó, bỏ.
 */
function kanaFor(text: string, reading?: string): string {
  if (hasFurigana(text)) return wakachigaki(text);
  const r = (reading ?? "").trim();
  if (!r || r === stripFurigana(text).trim()) return "";
  return r;
}

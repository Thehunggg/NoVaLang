/**
 * Shared answer normalization for Web (+ mirrored in Flutter / smoke).
 *
 * Rules:
 * - null/undefined -> ""
 * - Unicode NFC (never NFD + strip marks)
 * - trim + collapse whitespace
 * - case fold only when caseInsensitive === true
 * - strip punctuation only when ignorePunctuation === true
 * - never remove accents / non-Latin / combining marks for answer checking
 */

export type AllowedScript =
  | "any"
  | "latin"
  | "kana"
  | "kanji"
  | "hangul"
  | "hanzi"
  | "arabic"
  | "thai"
  | "devanagari"
  | "cyrillic";

export interface NormalizeAnswerOptions {
  caseInsensitive?: boolean;
  ignorePunctuation?: boolean;
  /** Reserved for future input filters; default is "any" (no filtering). */
  allowedScript?: AllowedScript;
}

const PUNCTUATION_RE = /[.!?¡¿。、「」""''„«»]/gu;

export function normalizeAnswer(
  value: string | null | undefined,
  options: NormalizeAnswerOptions = {},
): string {
  if (value == null) return "";
  let text = String(value).normalize("NFC");
  text = text.trim().replace(/\s+/gu, " ");
  if (options.ignorePunctuation === true) {
    text = text.replace(PUNCTUATION_RE, "");
  }
  if (options.caseInsensitive === true) {
    text = text.toLocaleLowerCase();
  }
  return text;
}

export function answersMatch(
  submitted: string | null | undefined,
  expected: string | null | undefined,
  options: NormalizeAnswerOptions = {},
): boolean {
  return normalizeAnswer(submitted, options) === normalizeAnswer(expected, options);
}

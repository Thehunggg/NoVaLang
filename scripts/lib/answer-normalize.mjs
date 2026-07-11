/**
 * Answer normalization for smoke tests (mirrors shared/answerNormalize.ts).
 */

const PUNCTUATION_RE = /[.!?¡¿。、「」""''„«»]/gu;

export function normalizeAnswer(value, options = {}) {
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

export function answersMatch(submitted, expected, options = {}) {
  return normalizeAnswer(submitted, options) === normalizeAnswer(expected, options);
}

/** Samples that must survive normalization unchanged (aside from trim/space). */
export const UNICODE_ANSWER_SAMPLES = [
  { name: "Vietnamese", input: "Tôi uống cà phê ở Đà Nẵng" },
  { name: "French", input: "élève déjà" },
  { name: "German", input: "München groß" },
  { name: "Spanish", input: "niño corazón" },
  { name: "Japanese", input: "ありがとう 日本 カメラ" },
  { name: "Chinese", input: "你好 我学习中文" },
  { name: "Korean", input: "안녕하세요" },
  { name: "Thai", input: "สวัสดี" },
  { name: "Arabic", input: "مرحبا" },
  { name: "Hindi", input: "नमस्ते" },
  { name: "Cyrillic", input: "Привет" },
];

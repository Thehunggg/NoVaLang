export const NATIVE_CODES = ["vi", "en", "ja", "ko", "zh"];

const VI_DIACRITICS =
  /[ăâđêôơưáàảãạắằẳẵặấầẩẫậéèẻẽẹếềểễệíìỉĩịóòỏõọốồổỗộớờởỡợúùủũụứừửữựýỳỷỹỵ]/iu;
const VI_PHRASES =
  /\b(Đúng rồi|Chưa đúng|nghĩa là|Nghe từ|Nghe phát âm|Chọn chữ|buổi sáng|ấn tượng|nhà ga|quỷ|mưa|chó|biển|phim|tiền|Học 5|Điền chữ|Chọn chữ có)\b/iu;

export function looksVietnamese(text) {
  const value = String(text ?? "").trim();
  if (!value) return false;
  return VI_DIACRITICS.test(value) || VI_PHRASES.test(value);
}

export function validateTranslationsMap(map, label, fail) {
  if (!map || typeof map !== "object") {
    fail(`${label}: missing translations object`);
    return;
  }
  for (const code of NATIVE_CODES) {
    if (!map[code] || String(map[code]).trim() === "") {
      fail(`${label}: missing translation for ${code}`);
    }
  }
}

export function validateNativeTextForCode(text, code, label, fail) {
  const value = String(text ?? "").trim();
  if (!value) {
    fail(`${label}: empty text for ${code}`);
    return;
  }
  if (code === "en" && looksVietnamese(value)) {
    fail(`${label}: English text contains Vietnamese (${value.slice(0, 80)})`);
  }
  if (code === "ja" && looksVietnamese(value)) {
    fail(`${label}: Japanese text contains Vietnamese (${value.slice(0, 80)})`);
  }
  if (code === "ko" && looksVietnamese(value)) {
    fail(`${label}: Korean text contains Vietnamese (${value.slice(0, 80)})`);
  }
  if (code === "zh" && looksVietnamese(value)) {
    fail(`${label}: Chinese text contains Vietnamese (${value.slice(0, 80)})`);
  }
}

export function validateByNativeMap(map, label, fail) {
  if (!map || typeof map !== "object") {
    fail(`${label}: missing ByNative map`);
    return;
  }
  validateTranslationsMap(map, label, fail);
  for (const code of NATIVE_CODES) {
    validateNativeTextForCode(map[code], code, `${label}[${code}]`, fail);
  }
}

export function resolveByNative(map, code, legacy) {
  if (map?.[code]) return map[code];
  if (code !== "en" && map?.en) return map.en;
  return legacy ?? "";
}

---
id: hi/change-log
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [S-TRAINED-KNOWLEDGE]
---

# Hindi Change Log

- **0.1.0 (2026-07-19)** — Khởi tạo bộ rule hi (baseline hi-IN) qua
  `/build-language` Bước 0–4, tra cứu 5 vòng. Indo-Aryan, hệ chữ DEVANAGARI
  (abugida), t1. Dataset CLDR/UD/WikiPron: WikiPron **33057 cặp** (rất lớn),
  corpus UD-HDTB **16649 câu** (trên 10k — đầy đủ). g2p-check phụ âm gốc <1%
  (श/भ/थ/ट). Kỷ luật dữ liệu: ख/ज/ड "vi phạm" 19-60% = NUKTA (chữ+nukta = âm
  khác: ड़[ɽ]/ज़[z]/ख़[x]/क़[q]/ग़[ɣ]/फ़[f]); schwa deletion lexical.
  corpus-check danda । 93% (7% mảnh câu) + no-Latin 0.55%. Devanagari UNICAMERAL
  → casing NOT-APPLICABLE. Đặc trưng: abugida (phụ âm + matra + ghép), retroflex
  (ट/ड), bật hơi 4 chiều, xoá schwa, 2 giống, hậu giới từ + dạng xiên, ERGATIVE
  (ने thể hoàn thành, động từ hợp tân ngữ), SOV, 3 mức तू/तुम/आप + जी. HONORIFIC
  partial-native (आप/जी — es B-02 cho phần còn lại). D-hi-01 baseline hi-IN;
  D-hi-02 chuẩn (Devanagari/Central Hindi Directorate); D-hi-03 reading-aid
  (cân nhắc IAST nhập môn); D-hi-04 chấm C cho matra/phụ âm/ghép NHƯNG nukta vay
  khoan dung (क़/ज़ tuỳ chọn, ड़ bản địa nghiêm); D-hi-05 dạy 3 mức आप baseline.
  native-review-hi 7 mục. Trạng thái: `VALIDATED_NOT_YET_PROVEN`, KHÔNG FROZEN.

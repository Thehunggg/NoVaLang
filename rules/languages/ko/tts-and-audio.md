---
id: ko/tts-and-audio
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: [ko/pronunciation]
sources: [S-TRAINED-KNOWLEDGE]
---

# Korean TTS and Audio

## speechText

`speechText` = Hangul surface text (script gốc, KHÔNG phải romanization).
Khác ja (kanji cần chuyển sang kana trước khi TTS đọc — script logographic
không đọc trực tiếp được), Hangul là script ngữ âm nên TTS đọc trực tiếp
được từ surface text, không cần lớp chuyển đổi trung gian.

## Locale

`ko-KR` (Hàn Quốc) — không phân biệt phương ngữ trong scope hiện tại
(Bắc Triều Tiên dùng chuẩn khác, `문화어`, ngoài scope — app chỉ dạy chuẩn
Hàn Quốc hiện đại, giống cách chọn `en-US`/vi Hà Nội đã chốt cho các ngôn
ngữ khác).

## Kế thừa `_base/audio.rules.json`

Không có gì cần override riêng cho ko — thứ tự ưu tiên
`approved_audio -> tts_correct_locale -> explicit_error`, không fallback im
lặng, tốc độ phát `[1.0, 0.75]`, replay không giới hạn — áp dụng nguyên vẹn.

## Provenance

`S-TRAINED-KNOWLEDGE` — sự kiện kỹ thuật (Hangul là script ngữ âm, TTS đọc
trực tiếp), không tranh cãi.

## Chưa giải quyết

Không có — mục này không phát sinh giả định cần duyệt riêng ngoài kế thừa
`_base`.

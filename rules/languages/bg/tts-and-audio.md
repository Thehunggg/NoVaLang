---
id: bg/tts-and-audio
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: [bg/pronunciation]
sources: [S-TRAINED-KNOWLEDGE]
---

# Bulgarian TTS & Audio — Giọng nói và âm thanh

- **Locale**: `bg-BG`.
- **speechText** = surface text chữ Kirin đầy đủ **ъ + щ**. Bỏ ъ = sai từ.
- Kế thừa `_base/audio.rules.json`: ưu tiên audio đã duyệt → TTS đúng locale →
  báo lỗi tường minh; không tự thay thế; không autoplay; replay không giới hạn;
  tốc độ 1.0 và 0.75.
- Chính tả đều nhưng **giảm nguyên âm không nhấn** (а/ъ→[ɐ]) + **trọng âm di
  động không đánh dấu** → engine phải biết trọng âm để giảm đúng, có thể sai từ
  hiếm — điểm cần lưu ý khi kiểm audio.
- TTS đọc chữ Kirin trực tiếp — KHÔNG dùng chuyển tự Latin.

Azure Neural TTS có giọng bg-BG (Kalina, Borislav) — nằm trong tập ~33 giọng
mục tiêu playable của NovaLang.

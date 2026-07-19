---
id: uk/tts-and-audio
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: [uk/pronunciation]
sources: [S-TRAINED-KNOWLEDGE]
---

# Ukrainian TTS & Audio — Giọng nói và âm thanh

- **Locale**: `uk-UA`.
- **speechText** = surface text chữ Kirin đầy đủ **і/ї/є/ґ/ь + dấu nháy '**. Bỏ
  chữ riêng → sai âm/nghĩa; bỏ ' → sai đọc.
- Kế thừa `_base/audio.rules.json`: ưu tiên audio đã duyệt → TTS đúng locale →
  báo lỗi tường minh; không tự thay thế; không autoplay; replay không giới hạn;
  tốc độ 1.0 và 0.75.
- Chính tả đều nên TTS phát âm tốt; NHƯNG **trọng âm di động không đánh dấu** →
  engine phải biết vị trí trọng âm, có thể sai với từ hiếm/tên riêng (điểm cần
  lưu ý khi kiểm audio).
- TTS đọc chữ Kirin trực tiếp — KHÔNG dùng chuyển tự Latin cho TTS.

Azure Neural TTS có giọng uk-UA (Polina, Ostap) — nằm trong tập ~33 giọng mục
tiêu playable của NovaLang.

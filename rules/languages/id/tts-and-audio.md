---
id: id/tts-and-audio
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: [id/pronunciation]
sources: [S-TRAINED-KNOWLEDGE]
---

# Indonesian TTS & Audio — Giọng nói và âm thanh

- **Locale**: `id-ID`.
- **speechText** = surface text Latin (đầy đủ dấu nối láy).
- Kế thừa `_base/audio.rules.json`: ưu tiên audio đã duyệt → TTS đúng locale →
  báo lỗi tường minh; không tự thay thế; không autoplay; replay không giới hạn;
  tốc độ 1.0 và 0.75.
- Chính tả đều → TTS id-ID phát âm tốt. Điểm cần lưu ý: **'e' [e]/[ə]** — engine
  phải biết theo từ để đọc schwa đúng, có thể sai từ hiếm.
- TTS đọc chữ Latin trực tiếp.

Azure Neural TTS có giọng id-ID (Gadis, Ardi) — nằm trong tập ~33 giọng mục
tiêu playable của NovaLang.

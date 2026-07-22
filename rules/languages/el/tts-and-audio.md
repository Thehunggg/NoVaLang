---
id: el/tts-and-audio
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: [el/pronunciation]
sources: [S-TRAINED-KNOWLEDGE]
---

# Greek TTS & Audio — Giọng nói và âm thanh

- **Locale**: `el-GR`.
- **speechText** = surface text chữ Hy Lạp đầy đủ **tonos + dieresis + ς cuối
  từ**. Bỏ tonos → trọng âm/nghĩa sai; sai ς/σ → chính tả sai.
- Kế thừa `_base/audio.rules.json`: ưu tiên audio đã duyệt → TTS đúng locale →
  báo lỗi tường minh; không tự lặng lẽ thay thế; không autoplay; replay không
  giới hạn; tốc độ 1.0 và 0.75.
- Chính tả Hy Lạp đều nên TTS phát âm tốt; tonos hướng dẫn engine đặt trọng
  âm đúng. TTS là kênh phát âm chuẩn (không dùng `romanization`/Greeklish cho
  TTS).

Azure Neural TTS có giọng el-GR (Athina, Nestoras) — nằm trong tập ~33 giọng
mục tiêu playable của NovaLang.

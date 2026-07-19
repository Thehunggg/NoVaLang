---
id: hi/tts-and-audio
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: [hi/pronunciation]
sources: [S-TRAINED-KNOWLEDGE]
---

# Hindi TTS & Audio — Giọng nói và âm thanh

- **Locale**: `hi-IN`.
- **speechText** = surface text Devanagari (đủ matra + nukta bản địa ड़/ढ़ +
  anusvara). Bỏ matra = sai từ.
- Kế thừa `_base/audio.rules.json`: ưu tiên audio đã duyệt → TTS đúng locale →
  báo lỗi tường minh; không tự thay thế; không autoplay; replay không giới hạn;
  tốc độ 1.0 và 0.75.
- **QUAN TRỌNG**: engine phải **XOÁ SCHWA** đúng (राम=[raːm] không [raːmə]) —
  đây là điểm TTS hi DỄ LỖI, cần kiểm audio kỹ. Retroflex cũng cần giọng chuẩn.
- TTS đọc Devanagari trực tiếp — không dùng chuyển tự Latin cho TTS.

Azure Neural TTS có giọng hi-IN (Swara, Madhur) — nằm trong tập ~33 giọng mục
tiêu playable của NovaLang.

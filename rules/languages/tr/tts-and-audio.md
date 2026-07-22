---
id: tr/tts-and-audio
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: [tr/pronunciation]
sources: [S-TRAINED-KNOWLEDGE]
---

# Turkish TTS & Audio — Giọng nói và âm thanh

- **Locale**: `tr-TR`.
- **speechText** = surface text Latin Thổ đầy đủ **ç ğ ı i ö ş ü** (giữ phân
  biệt ı/i). Bỏ chữ riêng → sai âm/nghĩa.
- Kế thừa `_base/audio.rules.json`: ưu tiên audio đã duyệt → TTS đúng locale →
  báo lỗi tường minh; không tự thay thế; không autoplay; replay không giới hạn;
  tốc độ 1.0 và 0.75.
- Chính tả một-chữ-một-âm → TTS tr-TR phát âm rất chính xác. ğ kéo dài nguyên
  âm — engine xử lý. Trọng âm thường cuối (ngoại lệ địa danh/hậu tố) — engine
  chuẩn hoá.
- TTS đọc chữ Latin trực tiếp.

Azure Neural TTS có giọng tr-TR (Emel, Ahmet) — nằm trong tập ~33 giọng mục
tiêu playable của NovaLang.

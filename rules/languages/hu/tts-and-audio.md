---
id: hu/tts-and-audio
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: [hu/pronunciation]
sources: [S-TRAINED-KNOWLEDGE]
---

# Hungarian TTS and Audio (hu-HU)

## Chính sách

- `speechText` = surface text Latin ĐẦY ĐỦ á é í ó ö ő ú ü ű + digraph. TTS
  hu-HU đọc trực tiếp (chính tả đều, trọng âm âm tiết đầu).
- **AUDIO/TTS**: độ dài nguyên âm + đồng hoá phụ âm tinh tế cần audio; phần còn
  lại đọc được từ chữ.
- Văn bản gửi TTS **PHẢI giữ dấu** (á é í ó ö ő ú ü ű là chữ, ngắn/dài đổi
  nghĩa).
- KHÔNG gửi field phái sinh cho TTS.
- Kế thừa `_base/audio.rules.json`: ưu tiên approved audio → TTS đúng locale →
  báo lỗi rõ; không im lặng fallback; không autoplay; replay không giới hạn;
  tốc độ 1.0 và 0.75.

## Locale

`hu-HU`. Khớp WikiPron `hun` + UD Hungarian-Szeged dataset.

## Đã kiểm

TTS baseline dùng `speechText` (chữ đích đầy đủ dấu). Không thay đổi runtime
trong task này.

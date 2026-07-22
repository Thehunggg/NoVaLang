---
id: ru/tts-and-audio
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: [ru/pronunciation]
sources: [S-TRAINED-KNOWLEDGE]
---

# Russian TTS and Audio (ru-RU)

## Chính sách

- `speechText` = surface text Kirin (chữ đích). TTS ru-RU đọc trực tiếp; engine
  tự xử lý trọng âm + nguyên âm giảm.
- Văn bản gửi TTS **KHÔNG** mang dấu trọng âm (dấu trọng âm chỉ để HIỂN THỊ trợ
  đọc, trừ khi engine hỗ trợ đặt trọng âm rõ + được duyệt).
- `ё` nên viết đầy đủ trong văn bản gửi TTS khi phân biệt phát âm quan trọng
  (все [fsʲe] 'tất cả' / всё [fsʲo] 'mọi thứ').
- Kế thừa `_base/audio.rules.json`: ưu tiên approved audio → TTS đúng locale →
  báo lỗi rõ; không im lặng fallback; không autoplay; replay không giới hạn;
  tốc độ 1.0 và 0.75.

## Locale

`ru-RU`. Khớp WikiPron `rus_cyrl` + UD Russian dataset.

## Đã kiểm

TTS baseline dùng `speechText` (chữ đích Kirin), không dùng field trợ đọc/trọng
âm. Không thay đổi runtime trong task này.

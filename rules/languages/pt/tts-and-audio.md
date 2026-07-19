---
id: pt/tts-and-audio
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: [pt/pronunciation]
sources: [S-TRAINED-KNOWLEDGE]
---

# Portuguese TTS and Audio (pt-BR)

## Chính sách

- `speechText` = surface text Latin (chữ đích). TTS đọc trực tiếp.
- KHÔNG gửi `romanization` cho TTS (chữ Latin đã là surface — không có trường
  romanization riêng cho pt).
- Kế thừa `_base/audio.rules.json`: ưu tiên approved audio → TTS đúng locale →
  báo lỗi rõ; không im lặng fallback; không autoplay; replay không giới hạn;
  tốc độ 1.0 và 0.75.

## Locale

`pt-BR` (chuẩn Brazil). Khớp WikiPron `por_bz` + UD GSD dataset.

**KHÔNG** dùng giọng `pt-PT` cho nội dung baseline BR: âm khác rõ (vòm hoá
ti/di, `l` cuối → [w], `o/e` không nhấn → [u]/[i], nhịp khác) → sai với những
gì học viên thấy/học.

## Đã kiểm

TTS call sites dùng `speechText` (chữ đích), không dùng field phái sinh. Baseline
xác nhận qua `_base/audio.rules.json`; không thay đổi runtime trong task này.

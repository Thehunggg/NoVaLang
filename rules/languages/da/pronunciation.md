---
id: da/pronunciation
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: phonology.rules.json
depends_on: [da/writing-system]
sources: [WIKIPRON, S-TRAINED-KNOWLEDGE]
---

# Danish Pronunciation (da-DK)

⚠️ **Chính tả Đan Mạch NỔI TIẾNG KHÔNG ĐỀU** — khoảng cách chính tả↔phát âm
lớn nhất trong Germanic. Xác nhận bằng `g2p-check.mjs` trên WikiPron thật
(`dan_latn_broad`, **4773 cặp — bộ nhỏ**).

## Chữ nguyên âm đã xác nhận (Bước 3) — phần ổn định nhất

| Chữ | Âm | % vi phạm |
|---|---|---|
| `æ` | [ɛ]/[a] | 1.21% |
| `ø` | [ø]/[œ]/[ɔ] | 7.05% |
| `å` | [ɔ]/[ʌ] | 6.32% |

## Phần lexical (KHÔNG g2p tổng quát — kỷ luật dữ liệu)

- **soft d** → [ð] (mad=[mað], gade) nhưng nhiều d câm.
- **stød** (ˀ) — âm tắc thanh hầu, phân biệt nghĩa (mor/mord), **lexical** (xem
  `stod`).
- **Âm cuối câm/giảm**: g/d/t cuối thường câm hoặc [ð]/[ð̞]; nguyên âm không
  nhấn giảm; r biến nguyên âm trước.

→ Vì chính tả không đoán được, **TTS/audio là kênh phát âm chính** (xem
`tts_audio_policy`). KHÔNG nâng cả hệ g2p lên high — chỉ æ/ø/å validated, phần
còn lại ghi rõ là lexical.

## Đặc trưng

- Hệ nguyên âm rất giàu (nhiều hơn hầu hết ngôn ngữ).
- **stød** thay chức năng pitch accent của sv/nb.

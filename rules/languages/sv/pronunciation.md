---
id: sv/pronunciation
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: phonology.rules.json
depends_on: [sv/writing-system]
sources: [WIKIPRON, S-TRAINED-KNOWLEDGE]
---

# Swedish Pronunciation (sv-SE)

Xác nhận bằng `g2p-check.mjs` trên WikiPron thật (`swe_latn_broad`, **5856 cặp
— bộ nhỏ**; đủ cho quy tắc cốt lõi nhưng nặng tên riêng/từ mượn).

## Quy tắc chữ→âm đã xác nhận (Bước 3)

| Chữ | Âm | % vi phạm |
|---|---|---|
| `sj`/`skj`/`stj` | [ɧ] (sj-ljud) | 4.08% |
| `tj`/`kj` | [ɕ] | 7.25% |
| `ä` | [ɛ]/[æ]/[eː] | 1.65% |
| `ö` | [ø]/[œ]/[ɵ] | 2.49% |
| `å` | [oː]/[ɔ] | 1.25% |

## Mềm hoá âm đầu (medium — không g2p-validated)

k→[ɕ] (köpa), g→[j] (göra), sk→[ɧ] (sked) trước nguyên âm **trước** (e/i/y/ä/ö);
cứng [k]/[ɡ]/[sk] trước nguyên âm **sau** (a/o/u/å).

**Phát hiện thật (kỷ luật dữ liệu):** g2p-check `^k[eiyäö]→^ɕ` bắn **48%**, `^g→^j`
42%, `^sk→^ɧ` 35% — **KHÔNG lên VALIDATED**. Nguyên nhân: (1) dấu **pitch accent**
¹/² đầu chuỗi chặn `^` anchor; (2) dataset nặng **từ mượn** giữ cứng (keff, gebit,
gem, skeptisk) hoặc g→[ɧ] (Pháp: gelé, generös). Quy tắc đúng cho từ **bản ngữ**
nhưng hạn chế theo nguyên từ → giữ **medium**, ghi rõ, không giả vờ high.

## Đặc trưng

- **Âm [ɧ]** (sj-ljud) — âm đặc trưng Thụy Điển, khó cho học viên.
- **Nguyên âm dài/ngắn** phân biệt nghĩa (vila/villa) — xem `vowel_length`.
- **Trọng âm độ cao** (pitch accent 1/2, đánh dấu ¹/² trong WikiPron) — không
  đánh dấu chính tả, phần lớn lexical (xem `pitch_accent`).

## Chưa g2p-check

`rs`→[ʂ] (Trung Thụy Điển; g2p bắn 64% → không phổ quát trong dataset broad,
để vùng/lexical); `o`→[uː]/[oː] lexical.

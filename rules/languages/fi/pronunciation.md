---
id: fi/pronunciation
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: phonology.rules.json
depends_on: [fi/writing-system]
sources: [WIKIPRON, S-TRAINED-KNOWLEDGE]
---

# Finnish Pronunciation (fi-FI)

Xác nhận bằng `g2p-check.mjs` trên WikiPron thật (`fin_latn_broad`, 173449 cặp
từ→âm). **Chính tả gần như hoàn hảo 1:1 âm vị** — hệ chữ→âm sạch nhất trong
các ngôn ngữ đã build.

## Quy tắc chữ→âm đã xác nhận (Bước 3)

| Chữ | Âm | % vi phạm |
|---|---|---|
| `aa`/`ii`/`uu` | [ɑː]/[iː]/[uː] | 0.00–0.01% |
| `ää` | [æː] | 0.00% |
| `kk`/`tt` | [kː]/[tː] | 0.18%/0.26% |
| `ä` | [æ] | 0.02% |
| `ö` | [ø] | 0.00% |
| `y` | [y] | 1.07% |
| `ng` | [ŋː] | 2.38% |

## Đặc trưng

- **Độ dài phonemic** ở cả nguyên âm lẫn phụ âm (chữ đôi = dài): tuli/tuuli/
  tulli khác nghĩa.
- **Trọng âm LUÔN ở âm tiết đầu** (cố định) — dễ cho học viên + TTS.
- **8 nguyên âm** chia back (a o u) / front (ä ö y) — nền tảng hoà âm (xem
  `vowel_harmony`).

## Phát hiện real-data (kỷ luật dữ liệu)

`nk → [ŋk]` bắn **41.12%** — KHÔNG lên VALIDATED: phần lớn là **từ ghép**
(Anjalan+koski) giữ [nk] qua ranh giới hình vị; nk→[ŋk] chỉ trong nội bộ gốc
từ → để medium/lexical, không giả vờ high. (Đối chiếu: ng→[ŋː] nội bộ gốc thì
sạch 2.38%.)

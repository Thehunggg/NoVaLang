---
id: fil/pronunciation
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: phonology.rules.json
depends_on: [fil/writing-system]
sources: [WIKIPRON, S-TRAINED-KNOWLEDGE]
---

# Filipino Pronunciation (fil-PH)

✅ **Chính tả Filipino tương đối ĐỀU** (Latin, phần lớn 1:1). Xác nhận bằng
`g2p-check.mjs` trên WikiPron thật (`tgl_latn_broad`, **28295 cặp — bộ LỚN, có
ghi âm tắc thanh hầu ʔ**).

## Chữ → âm đã xác nhận (Bước 3)

| Chữ | Âm | % vi phạm |
|---|---|---|
| `ng` | [ŋ] | 0.59% |

**Kỷ luật dữ liệu:** ép `ny`→[nj] báo **100%** vi phạm → `ny` **KHÔNG phải
digraph** Tagalog (chỉ n+y ngẫu nhiên) → BỎ giả thuyết, không thêm rule.

## Nguyên âm

5 nguyên âm `a e i o u`. Bản địa nghiêng `a i u`; `e o` phần lớn ở từ vay (và
biến thể i/e, u/o).

## Lexical (cần audio)

- **Âm tắc thanh hầu [ʔ]** — cuối/giữa từ, **thường KHÔNG viết**; phân biệt
  nghĩa (bata [bataʔ]).
- **Trọng âm** phân biệt nghĩa (áso 'chó' / asó 'khói') — thường không đánh dấu;
  accents tồn tại nhưng bị bỏ.

→ g2p rule_level **high** cho phần chữ→âm cơ bản (WikiPron lớn); glottal +
trọng âm ở lexical, cần **audio**. Không thanh điệu (khác th).

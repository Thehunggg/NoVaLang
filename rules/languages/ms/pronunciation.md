---
id: ms/pronunciation
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: phonology.rules.json
depends_on: [ms/writing-system]
sources: [WIKIPRON, S-TRAINED-KNOWLEDGE]
---

# Malay Pronunciation (ms-MY)

✅ **Chính tả Mã Lai RẤT ĐỀU** (Latin, gần 1:1). Xác nhận bằng `g2p-check.mjs`
trên WikiPron thật (`msa_latn_broad`, **6672 cặp**).

## Chữ → âm đã xác nhận (Bước 3)

| Chữ | Âm | % vi phạm |
|---|---|---|
| `ng` | [ŋ] | 0.95% |
| `ny` | [ɲ] | 0.00% |
| `sy` | [ʃ] | 0.00% |
| `c` | [t͡ʃ] | 1.06% |

Tất cả sạch → chính tả Mã Lai rất đều. Thêm: `kh`[x], `gh`[ɣ] (từ vay).

## Nguyên âm + lexical (cần audio)

6 nguyên âm `a e i o u` + schwa. **'e' đọc [e]** (emak) **hay [ə] schwa** (beli)
theo từ — chính tả chuẩn KHÔNG phân biệt (đã bỏ é) → lexical, cần audio. `k`
cuối/giữa → **[ʔ]** (tidak [tidaʔ]). Không thanh điệu.

→ g2p rule_level **VALIDATED** cho phần chữ→âm; chỉ 'e' [e]/[ə] + k cuối [ʔ] ở
lexical, cần **audio**.

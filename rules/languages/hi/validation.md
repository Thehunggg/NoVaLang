---
id: hi/validation
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [WIKIPRON, S-UD-CORPUS, S-TRAINED-KNOWLEDGE]
---

# Hindi Validation — Kiểm chứng

## Dataset (Bước 1)

- CLDR hi → `orthography.data.json` (Devanagari).
- WikiPron `hin_deva_broad` **33057 cặp** (rất lớn) → `grapheme-to-phoneme.data.json`.
- UD Hindi-HDTB test → `word-class.data.json`.

## g2p-check (Bước 3, 33057 từ thật)

Phụ âm gốc sạch: श 0.30%, भ 0.00%, थ 0.48%, ट 0.00%. Kỷ luật dữ liệu: ख 19% /
ज 21% / ड 60% "vi phạm" = NUKTA (chữ+nukta = âm khác: ड़[ɽ]/ज़[z]/ख़[x]...);
schwa deletion lexical. Ghi rõ `phonology.rules.json`.

## corpus-check (Bước 3, 16649 câu thật)

- danda-sentence-terminator (।): **7.07%** thiếu (mảnh câu/câu hỏi — rule hợp lệ 93%).
- devanagari-not-latin-native: **0.55%** Latin (từ mượn) — hợp lệ.

**Corpus TRÊN 10000** (16649) → đầy đủ, tin cậy.

## Trạng thái

`VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT`, KHÔNG FROZEN (ADR-014). Validator:
4 lỗi vi/zh cũ (ghi nợ), 0 lỗi mới cho hi.

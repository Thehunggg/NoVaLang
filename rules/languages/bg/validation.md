---
id: bg/validation
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [WIKIPRON, S-UD-CORPUS, S-TRAINED-KNOWLEDGE]
---

# Bulgarian Validation — Kiểm chứng

## Dataset (Bước 1)

- CLDR bg → `orthography.data.json` (30 chữ Kirin, có ъ).
- WikiPron `bul_cyrl_narrow` **47572 cặp** (bộ rất lớn) →
  `grapheme-to-phoneme.data.json`.
- UD Bulgarian-BTB test → `word-class.data.json`.

## g2p-check (Bước 3, 47572 từ thật)

Phụ âm sạch: ш 0.00%, ч 0.08%, ц 0.25%, х 0.00%, ж 4.22% (biến âm cuối). Kỷ
luật dữ liệu: щ→[ʃt] báo 100% = tokenization ('ʃ t' tách; đúng 100% kiểm tay);
ъ→[ɤ] báo 67% = giảm nguyên âm (nhấn [ɤ] / không nhấn [ɐ]). Ghi rõ
`phonology.rules.json`.

## corpus-check (Bước 3, 11138 câu thật)

- month-weekday-not-capitalized: **0.00%**.
- no-non-bulgarian-cyrillic (ы э ё і ...): **0.00%**.

**Corpus TRÊN 10000** (11138) → đầy đủ, tin cậy.

## Trạng thái

`VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT`, KHÔNG FROZEN (ADR-014). Validator:
4 lỗi vi/zh cũ (ghi nợ), 0 lỗi mới cho bg.

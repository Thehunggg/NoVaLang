---
id: uk/validation
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [WIKIPRON, S-UD-CORPUS, S-TRAINED-KNOWLEDGE]
---

# Ukrainian Validation — Kiểm chứng

## Dataset (Bước 1)

- CLDR uk → `orthography.data.json` (33 chữ Kirin + dấu nháy).
- WikiPron `ukr_cyrl_narrow` **53021 cặp** (bộ RẤT LỚN) →
  `grapheme-to-phoneme.data.json`.
- UD Ukrainian-IU test → `word-class.data.json`.

## g2p-check (Bước 3, 53021 từ thật)

Phụ âm <1%: ж 0.13%, ш 0.96%, ч 0.23%, ц 0.12%, х 0.70%, ґ 0.00%, ї 0.30%.
Kỷ luật dữ liệu: 'ю→ju' 97.48% "vi phạm" = quy tắc iotation (ю sau phụ âm →
mềm+[u], không [ju]) — g2p đúng theo ngữ cảnh, ghi rõ `phonology.rules.json`.

## corpus-check (Bước 3, 7092 câu thật)

- month-weekday-not-capitalized: **0.00%**.
- no-russian-only-letters (ы э ъ ё): **0.06%** (4 câu — trích dẫn/ngoại lai).

**Lưu ý corpus DƯỚI 10000** (7092 câu, UD-IU) nhưng TRÊN sàn 2000 → ghi rõ.

## Trạng thái

`VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT`, KHÔNG FROZEN (ADR-014). Validator
toàn cục: 4 lỗi vi/zh cũ (ghi nợ), 0 lỗi mới cho uk.

---
id: tr/validation
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [WIKIPRON, S-UD-CORPUS, S-TRAINED-KNOWLEDGE]
---

# Turkish Validation — Kiểm chứng

## Dataset (Bước 1)

- CLDR tr → `orthography.data.json` (29 chữ Latin Thổ + ı/İ).
- WikiPron `tur_latn_broad` **12321 cặp** → `grapheme-to-phoneme.data.json`.
- UD Turkish-BOUN test → `word-class.data.json`.

## g2p-check (Bước 3, 12321 từ thật)

Sạch: ş 0.16%, j 1.75%, ü 0.77%, ı 1.29%. Kỷ luật dữ liệu: c 21% / ç 17%
"vi phạm" = tie-bar-vs-space tokenization của WikiPron (ç→[t͡ʃ] đúng 100%, kiểm
tay); ö 18% = biến thể narrow [œ]/[ø]. Ghi rõ `phonology.rules.json`.

## corpus-check (Bước 3, 9761 câu thật)

- no-q-w-x-native: **1.14%** (từ ngoại lai/tên — quy tắc hợp lệ).
- **KHÔNG** áp check 'month-always-lowercase' — KỶ LUẬT DỮ LIỆU: corpus cho
  thấy tiếng Thổ VIẾT HOA tháng/thứ ở ngày cụ thể (TDK), 0.98% "hoa" là ĐÚNG
  luật, không phải lỗi.

**Corpus GẦN 10000** (9761 — trên sàn 2000 rất nhiều) → tin cậy.

## Trạng thái

`VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT`, KHÔNG FROZEN (ADR-014). Validator:
4 lỗi vi/zh cũ (ghi nợ), 0 lỗi mới cho tr.

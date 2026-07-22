---
id: el/validation
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [WIKIPRON, S-UD-CORPUS, S-TRAINED-KNOWLEDGE]
---

# Greek Validation — Kiểm chứng

## Dataset (Bước 1)

- CLDR el → `orthography.data.json` (bảng chữ + tonos + dieresis + ς cuối).
- WikiPron `ell_grek_broad_filtered` **19133 cặp** (bộ LỚN) →
  `grapheme-to-phoneme.data.json`.
- UD Greek-GDT test → `word-class.data.json`.

## g2p-check (Bước 3, 19133 từ thật)

Phụ âm/nguyên âm/digraph cơ bản đều **<1%** vi phạm (β 0.06%, δ 0.48%, θ
0.10%, φ 0.05%, χ 0.10%, ψ 0.00%, ξ 0.62%, η 0.05%, αι 0.14%, ου 0.12%, τσ
0.74%, τζ 0.00%, ντ 1.94%). Ngoại lệ CÓ QUY LUẬT (không phá rule): υ trong
digraph (11.51% — ưu tiên digraph), synizesis ει/οι, μπ heterosyllabic —
ghi rõ ở `phonology.rules.json`.

## corpus-check (Bước 3, 4285 câu thật)

- monotonic (không ký tự polytonic U+1F00–1FFF): **0/4285 = 0.00%**.
- dấu hỏi Hy Lạp (không `?` Latin): **0/4285 = 0.00%**.

**Lưu ý corpus DƯỚI 10000** (4285 câu, chỉ 2 treebank UD el) nhưng TRÊN sàn
2000 → corpus check yếu hơn một số ngôn ngữ trước, ghi rõ, không giả vờ đủ.

## Trạng thái

`VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT`, KHÔNG FROZEN (ADR-014). Chưa có
bài học thật (playable). Validator toàn cục: 4 lỗi vi/zh cũ (ghi nợ), 0 lỗi
mới cho el.

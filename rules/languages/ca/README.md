# ca — Catalan rule set

Không có front-matter (README điều hướng).

## Trạng thái

```text
language: ca (Catalan / Català)
tier: t1 (learning only — roles: ["learning"] trong catalog.json)
overallStatus: VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT
frozen: KHÔNG
playable: KHÔNG
baseline_variety: ca (Central Catalan / IEC)
family: Romance (Occitano-Romance), Latin-script
```

## File trong thư mục này

`coverage.json` (24 hiện tượng), `sources.json`, 3 `.data.json` (dataset Bước
1), 4 `.rules.json` (orthography/phonology/grammar/pragmatics), các `.md`
narrative có front-matter, `review-checklist.md`, `native-review-ca.md`,
`pipeline-log.md`.

## Đặc trưng tiếng Catalan nổi bật

- **ca ≠ es** — Catalan là ngôn ngữ riêng, không phải phương ngữ tiếng TBN.
- **ç** [s] + **l·l** (ela geminada, L đôi có punt volat, khác ll [ʎ]) — [corpus:
  ç 11.6%, l·l 7.4% câu].
- **Giảm nguyên âm** — không nhấn a/e→[ə], o/u→[u] (Đông/Trung Catalan, như
  pt/ru); cần audio.
- **Passat perifràstic** — quá khứ dứt điểm = vaig + infinitiu (vaig parlar).
- **Pronoms febles** — đại từ yếu clitic phức, có hi/en (khác es); khó, để cao.
- **tu/vostè** đối lập T-V (vostè + động từ ngôi 3) — KHÁC da/sv du-phổ-quát.
- Chia động từ theo ngôi, pro-drop, tính từ sau danh từ, apostrophe (l'home).
- KHÔNG dùng dấu lật ngược ¿¡ (khác es).

## Ghi chú dữ liệu (trung thực)

- Corpus LỚN (16678, trên 10k) → casing/ç/l·l rất chắc. WikiPron RẤT NHỎ (176)
  → g2p KHÔNG đáng tin; giảm nguyên âm + pronoms febles lexical, cần audio.

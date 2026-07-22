# tr — Turkish rule set (Bộ rule tiếng Thổ Nhĩ Kỳ)

Không có front-matter (README điều hướng).

## Trạng thái

```text
language: tr (Turkish / Türkçe)
tier: t1 (learning only)
overallStatus: VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT
frozen: KHÔNG
playable: KHÔNG
baseline_variety: tr-TR (chuẩn Istanbul, TDK)
family: Turkic (Oghuz), hệ chữ Latin (29 chữ)
difficulty: KHÓ (chắp dính + hoà âm + SOV — typology rất khác châu Âu) → 5 vòng
```

## File trong thư mục này

`coverage.json` (24 hiện tượng), `sources.json`, 3 `.data.json`, 4 `.rules.json`
(orthography/phonology/grammar/pragmatics), các `.md` narrative có front-matter,
`review-checklist.md`, `native-review-tr.md`, `pipeline-log.md`.

## Đặc trưng tiếng Thổ nổi bật

- **Chữ Latin 29** — không q/w/x; **ı (không chấm) vs i (có chấm)** = hai chữ,
  casing phải theo locale tr (i↔İ, ı↔I).
- **Chính tả rất đều** (một-chữ-một-âm, cải cách Atatürk 1928) — g2p rất tin cậy.
- **HOÀ ÂM NGUYÊN ÂM** (2 chiều e/a + 4 chiều i/ı/u/ü) — chìa khoá ngữ pháp.
- **CHẮP DÍNH** — hậu tố xếp chồng (ev-ler-im-de-ki); không giống, không mạo từ.
- **Biến âm phụ âm** (kitap→kitabı, k→ğ).
- **6 cách** (accusative chỉ tân ngữ xác định); **evidential -miş**; **SOV**.
- **sen/siz** + Bey/Hanım.

## Ghi chú dữ liệu (trung thực)

- WikiPron 12321, corpus 9761 (gần 10k — tin cậy). Kỷ luật dữ liệu: casing
  tháng/thứ KHÁC Romance (hoa ở ngày cụ thể) — không áp check month-lowercase.
  Ngữ pháp hình thái ở rule_level medium; paradigm/ngoại lệ cần native review.

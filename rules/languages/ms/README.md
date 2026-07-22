# ms — Malay rule set

Không có front-matter (README điều hướng).

## Trạng thái

```text
language: ms (Malay / Bahasa Melayu)
tier: t1 (learning only — roles: ["learning"] trong catalog.json)
overallStatus: VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT
frozen: KHÔNG
playable: KHÔNG
baseline_variety: ms-MY (Malaysia)
family: Austronesian (Malayo-Polynesian), Latin-script (Rumi)
```

## File trong thư mục này

`coverage.json` (24 hiện tượng), `sources.json`, 2 `.data.json` (CLDR +
WikiPron; KHÔNG có word-class vì không có UD Mã Lai), 4 `.rules.json`
(orthography/phonology/grammar/pragmatics), các `.md` narrative có front-matter,
`review-checklist.md`, `native-review-ms.md`, `pipeline-log.md`.

## Đặc trưng tiếng Mã Lai nổi bật

- **KHÔNG biến tố** (như id/vi) — không cách/giống/số/chia động từ; thì qua từ
  (sudah/akan). Thuận lợi lớn.
- **Phụ tố meN-** biến âm mũi (menulis/membaca/mengambil); ber-/di-/ter-/-kan.
- **Trùng lặp** số nhiều (buku-buku); **loại từ** (tiga buah buku).
- **SVO + bổ nghĩa sau danh từ** (rumah besar) — giống vi.
- **Không dấu phụ** → chấm chính tả đơn giản (KHÁC pl/hr/hu).
- 'e' [e]/[ə] schwa + k cuối [ʔ] → audio.
- Rất gần **id** (khác chuẩn: ms wang / id uang).

## Ghi chú dữ liệu (TRUNG THỰC)

- WikiPron 6672 sạch → g2p đáng tin (ng/ny/sy/c). NHƯNG **KHÔNG có UD/corpus
  Mã Lai** → casing/ngữ pháp dựa kiến thức + mô tả chuẩn + đối chiếu id (V5),
  nhiều mục medium/DRAFT. KHÔNG thổi phồng độ tin. **Native review đặc biệt
  quan trọng.**

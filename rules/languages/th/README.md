# th — Thai rule set

Không có front-matter (README điều hướng).

## Trạng thái

```text
language: th (Thai / ภาษาไทย)
tier: t1 (learning only — roles: ["learning"] trong catalog.json)
overallStatus: VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT
frozen: KHÔNG
playable: KHÔNG
baseline_variety: th-TH (Central Thai / Bangkok)
family: Kra-Dai, Thai script (abugida)
```

## File trong thư mục này

`coverage.json` (24 hiện tượng), `sources.json`, 3 `.data.json` (dataset Bước
1), 4 `.rules.json` (orthography/phonology/grammar/pragmatics), các `.md`
narrative có front-matter, `review-checklist.md`, `native-review-th.md`,
`pipeline-log.md`.

## Đặc trưng tiếng Thái nổi bật (ngôn ngữ KHÓ nhất đợt này)

- **Hệ chữ Thái (abugida)** — dấu nguyên âm quanh phụ âm; unicameral (casing
  n/a); dạy chữ trực tiếp (như el/hi).
- **5 THANH** — suy từ ĐA YẾU TỐ (lớp phụ âm × dấu thanh × loại âm tiết × độ
  dài); điểm khó nhất.
- **3 lớp phụ âm** (cao/giữa/thấp) quyết định thanh.
- **KHÔNG khoảng trắng giữa từ** — tách từ (word segmentation) là vấn đề máy.
- **Âm cuối trung hoà** (บ cuối → [p̚]) — g2p không 1:1.
- **Isolating** (không biến tố, như zh/vi) — THUẬN LỢI; loại từ khi đếm.
- **Trợ từ lịch sự** ครับ (nam)/ค่ะ (nữ) — gắn giới người nói.
- **ราชาศัพท์** (ngôn ngữ hoàng gia) = honorific thật nhưng out-of-scope baseline.

## Ghi chú dữ liệu (trung thực)

- WikiPron LỚN (18319, có thanh) nhưng g2p Thái đa yếu tố → medium. Corpus RẤT
  NHỎ (1000, test-only) → check yếu. Thanh + lớp + loại từ cần audio + người
  bản ngữ.

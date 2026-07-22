---
id: it/style-and-register
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: pragmatics.rules.json
depends_on: [it/grammar-and-usage]
reviewer: NOT_ASSIGNED
review_date: NOT_REVIEWED
sources: [S-TRAINED-KNOWLEDGE]
---

# Italian Style and Register Profile

Cụ thể hoá `naturalness-and-register.md` (ADR-016) cho tiếng Ý.

## Profile metadata

```text
languageCode: it
status: DRAFT / PROJECT_OWNER_REVIEW_PENDING / NOT_FROZEN
version: 0.1.0
reviewer: NOT_ASSIGNED
review_date: NOT_REVIEWED
baseline_variety: it-IT
```

## Xưng hô

- `tu` — thân mật, ngôi 2 số ít.
- `Lei` — trang trọng số ít (chia như ngôi 3 số ít giống cái, viết hoa Lei để
  phân biệt `lei` 'cô ấy'). Dùng với người lạ, quan hệ công việc/dịch vụ.
- `voi` — số nhiều (miền Nam/văn cổ dùng trang trọng số ít, chuẩn hiện đại
  dùng Lei).

Baseline: dạy `tu` + `Lei`, `voi` số nhiều — chuẩn giáo trình phổ thông,
không có biến thể vùng gây chia rẽ lớn kiểu tú/vos của es.

## Map taxonomy 6 mức (ADR-016)

- **CASUAL**: `tu` + từ vựng thân mật (`ciao`, `ci vediamo`).
- **NATURAL_NEUTRAL_POLITE**: mức chuẩn mực trung tính, `tu`/`Lei` tuỳ quan hệ
  (baseline mặc định).
- **FORMAL**: `Lei` + từ vựng trang trọng (`buongiorno`, `arrivederci`,
  `Vorrei...`).
- **HONORIFIC** (modifier): **not-applicable** — tiếng Ý không có hệ kính ngữ
  hình thái riêng biệt. Lịch sự qua đại từ (Lei) + điều kiện thức
  (`vorrei`/`potrebbe`) + từ vựng. Tự áp theo tiền lệ es B-02.
- **CEREMONIAL / SLANG**: not-applicable cho tới khi có nội dung + duyệt.

## Thiết bị lịch sự

Điều kiện thức (condizionale) làm nhẹ yêu cầu: `Vorrei...`, `Potrebbe...?` —
tương đương chức năng ますmềm của ja nhưng là thức động từ.

## Dịch tự nhiên

Áp dụng ADR-016. Bẫy dịch từng-cặp-ngôn-ngữ thuộc `rules/pairs/`. CẦN native
review trước khi PASS release.

## Unresolved decisions

- D-it-02 answer acceptance (dấu phụ) — tự áp tiền lệ es B-03.
- Native review naturalness/register (chưa thực hiện).

## Change log

- 0.1.0 (2026-07-19): khởi tạo, DRAFT.

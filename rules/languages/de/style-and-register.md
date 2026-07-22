---
id: de/style-and-register
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: pragmatics.rules.json
depends_on: [de/grammar-and-usage]
reviewer: NOT_ASSIGNED
review_date: NOT_REVIEWED
sources: [S-TRAINED-KNOWLEDGE, S-DUDEN-RECHTSCHREIBUNG]
---

# German Style and Register Profile

Cụ thể hoá `naturalness-and-register.md` (ADR-016) cho tiếng Đức.

## Profile metadata

```text
languageCode: de
status: DRAFT / PROJECT_OWNER_REVIEW_PENDING / NOT_FROZEN
version: 0.1.0
reviewer: NOT_ASSIGNED
review_date: NOT_REVIEWED
baseline_variety: de-DE (chuẩn Đức) — xem review-checklist D-de-01
```

## Xưng hô (Anrede)

- `du` — thân mật, ngôi 2 số ít (bạn bè, gia đình, trẻ em, người cùng tuổi
  đã thân).
- `ihr` — thân mật, ngôi 2 số nhiều.
- `Sie` — trang trọng (số ít lẫn số nhiều), **viết hoa**, chia động từ như
  ngôi 3 số nhiều. Dùng với người lạ, người lớn tuổi, quan hệ công việc/dịch
  vụ. Đây là mặc định lịch sự khi chưa thân.

Baseline: dạy CẢ `du` lẫn `Sie` ngay từ đầu (chuẩn giáo trình Goethe/Duden).
KHÔNG có biến thể vùng gây chia rẽ kiểu tú/vos của es → không đưa checklist
baseline xưng hô.

## Map taxonomy 6 mức (ADR-016)

- **CASUAL**: `du/ihr` + từ vựng thân mật (`mach's gut`, `tschüss`, `hallo`).
- **NATURAL_NEUTRAL_POLITE**: mức chuẩn mực trung tính, `du` hoặc `Sie` tuỳ
  quan hệ (baseline mặc định app dạy).
- **FORMAL**: `Sie` + từ vựng trang trọng (`Guten Tag`, `auf Wiedersehen`,
  `Ich hätte gern...`).
- **HONORIFIC** (modifier): **not-applicable** — tiếng Đức không có hệ kính
  ngữ hình thái riêng biệt kiểu ja/ko. Lịch sự thể hiện qua đại từ (Sie) +
  Konjunktiv II (`hätte/könnten/würde`) + từ vựng, đã bao trong FORMAL. Tự áp
  theo tiền lệ es B-02 (owner duyệt 2026-07-19), pattern lặp lại.
- **CEREMONIAL / SLANG**: không dùng ở nội dung sơ-trung cấp; not-applicable
  cho tới khi có nội dung + duyệt.

## Thiết bị lịch sự (Höflichkeit)

Konjunktiv II (thức giả định II) làm nhẹ yêu cầu: `Ich hätte gern...`,
`Könnten Sie...?`, `Ich würde sagen...` — tương đương chức năng với ますmềm
của ja nhưng là thức động từ, không phải kính ngữ.

## Dịch tự nhiên (naturalness)

Áp dụng ADR-016. Bẫy dịch từng-cặp-ngôn-ngữ (vd không dịch máy móc thán từ
`ne?`/`oder?` thành *isn't it?*) thuộc `rules/pairs/`, không thuộc file này.
CẦN native review trước khi PASS release.

## Unresolved decisions

- D-de-01 baseline variety (de-DE/AT/CH).
- Native review naturalness/register (chưa thực hiện).

## Change log

- 0.1.0 (2026-07-19): khởi tạo, DRAFT.

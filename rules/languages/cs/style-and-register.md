---
id: cs/style-and-register
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: pragmatics.rules.json
depends_on: [cs/grammar-and-usage]
reviewer: NOT_ASSIGNED
review_date: NOT_REVIEWED
sources: [S-TRAINED-KNOWLEDGE]
---

# Czech Style and Register Profile

Cụ thể hoá `naturalness-and-register.md` (ADR-016) cho tiếng Séc (baseline cs-CZ,
spisovná).

## Profile metadata

```text
language: cs
baseline_variety: cs-CZ (spisovná čeština)
status: DRAFT (VALIDATED_NOT_YET_PROVEN — chưa FROZEN)
version: 0.1.0
reviewer: NOT_ASSIGNED
review_date: NOT_REVIEWED
provenance: S-TRAINED-KNOWLEDGE + PROJECT_OWNER_PRECEDENT (es B-02, pl D-64)
```

## Xưng hô

- `ty` — thân mật, số ít (tykání), ngôi 2 số ít.
- `vy` — trang trọng (vykání) hoặc số nhiều, chia ngôi 2 số nhiều; `Vy` viết hoa
  trong thư.
- `pane/paní` + họ/chức — trang trọng.

## Trục register thứ hai: spisovná vs obecná čeština

Chuẩn viết (spisovná) vs khẩu ngữ Bohemia (obecná): `dobrý→dobrej`,
`dobré→dobrý`, `okno→vokno`. Baseline dạy **spisovná** + cảnh báo obecná — xem
`review-checklist.md` D-cs-02.

## Politeness markers

`Mohl byste...?` / `Mohla byste...?`, `Chtěl bych...`, `prosím`, `Dobrý den`
(trang trọng) / `Ahoj`, `Čau` (thân mật).

## Register taxonomy (ADR-016)

| Mức | cs-CZ |
|---|---|
| CASUAL | ty + obecná/từ thân mật (ahoj, čau) |
| NATURAL_NEUTRAL_POLITE | vy + spisovná (baseline) |
| FORMAL | vy + tước hiệu (pane/paní) + trang trọng |
| HONORIFIC | **not-applicable** (tiền lệ es B-02) |
| CEREMONIAL / SLANG | modifier trực giao |

## Trợ từ cuối câu

Not-applicable như hệ hình thái. Tiểu từ diễn ngôn (přece, vždyť, no, tak) thuộc
từ vựng/ngữ dụng.

## Ngôn ngữ dịch vụ / khách hàng

FORMAL: `vy` + `Přejete si?`, `Okamžik, prosím`.

## Nói vs viết

Xem trục spisovná/obecná ở trên — khác biệt lớn. Dạy chuẩn viết, chú thích khẩu
ngữ.

## Unacceptable literal translations (nội-ngôn-ngữ)

- KHÔNG thêm mạo từ (cs không có).
- KHÔNG bỏ dấu (s/š, byt/být đổi nghĩa).
- KHÔNG đặt clitic sai vị trí thứ hai.
- Cặp bẫy theo ngôn ngữ khác → `rules/pairs/` (INV-1).

## Pedagogically controlled language

Baseline spisovná: hiện tại + quá khứ, ty/vy, cách nom/akuzativ/genitiv trước.
Tránh clitic phức, số từ nam-animacy phức ở trình độ đầu.

## Deterministic banned fixtures

- `dva stolů` (sai cách sau số 2) → FAIL.
- `Včera se ti jsem smál` (clitic sai vị trí) → FAIL.
- `český` viết hoa giữa câu → FAIL.

## Native-review fixtures

Xem `native-review-cs.md` (7 cách, thể, animacy, clitic, tự nhiên).

## Unresolved decisions

- D-cs-01 baseline cs-CZ — **owner chưa duyệt**.
- D-cs-02 spisovná vs obecná baseline — **owner chưa duyệt**.
- D-cs-03 chấm khi thiếu dấu Séc (áp tiền lệ pl D-64) — **owner chưa duyệt**
  (`answer_acceptance_cs` DRAFT).

## Change log

- 0.1.0 (2026-07-19): Khởi tạo từ pipeline /build-language Bước 0–4. DRAFT.

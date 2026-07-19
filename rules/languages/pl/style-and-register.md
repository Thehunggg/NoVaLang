---
id: pl/style-and-register
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: pragmatics.rules.json
depends_on: [pl/grammar-and-usage]
reviewer: NOT_ASSIGNED
review_date: NOT_REVIEWED
sources: [S-TRAINED-KNOWLEDGE]
---

# Polish Style and Register Profile

Cụ thể hoá `naturalness-and-register.md` (ADR-016) cho tiếng Ba Lan (baseline pl-PL).

## Profile metadata

```text
language: pl
baseline_variety: pl-PL
status: DRAFT (VALIDATED_NOT_YET_PROVEN — chưa FROZEN)
version: 0.1.0
reviewer: NOT_ASSIGNED
review_date: NOT_REVIEWED
provenance: S-TRAINED-KNOWLEDGE + PROJECT_OWNER_PRECEDENT (es B-02/B-03)
```

## Xưng hô (đặc trưng: Pan/Pani ngôi 3)

- `ty` — thân mật, số ít, ngôi 2.
- `Pan` (nam) / `Pani` (nữ) — trang trọng, dùng như **danh từ ngôi 3** + động
  từ ngôi 3 (*Czy Pan mówi po polsku?*). KHÔNG có đại từ 'vy' trang trọng —
  điểm khác lớn với ru/fr.
- `Państwo` — số nhiều lịch sự.
- `wy` — ngôi 2 số nhiều thân mật (không phải trang trọng số ít).

## Politeness markers

`Czy mógłby Pan...?` / `Czy mogłaby Pani...?`, `Chciałbym...`, `proszę`,
`Dzień dobry` (trang trọng) / `Cześć` (thân mật).

## Register taxonomy (ADR-016)

| Mức | pl-PL |
|---|---|
| CASUAL | ty + từ thân mật (cześć, siema) |
| NATURAL_NEUTRAL_POLITE | Pan/Pani trung tính (baseline) |
| FORMAL | Pan/Pani + tước hiệu + từ trang trọng |
| HONORIFIC | **not-applicable** (tiền lệ es B-02) |
| CEREMONIAL / SLANG | modifier trực giao |

## Trợ từ cuối câu

Not-applicable như hệ hình thái (khác ja ね/よ). Tiểu từ diễn ngôn (no, przecież,
że) thuộc từ vựng/ngữ dụng.

## Ngôn ngữ dịch vụ / khách hàng

FORMAL: `Pan/Pani`, `W czym mogę pomóc?`, `Proszę chwilę poczekać`.

## Nói vs viết

Khẩu ngữ dùng ty rộng trong nhóm trẻ; Pan/Pani bắt buộc với người lạ/lớn tuổi.
Viết chuẩn giữ đầy đủ dấu + cách. Dạy chuẩn, chú thích khẩu ngữ.

## Unacceptable literal translations (nội-ngôn-ngữ)

- KHÔNG thêm mạo từ (Ba Lan không có a/the).
- KHÔNG bỏ dấu (ł/l, ó/u là chữ khác — đổi từ).
- KHÔNG dùng đại từ 'vy' kiểu ru cho trang trọng → phải Pan/Pani ngôi 3.
- Cặp bẫy theo ngôn ngữ khác → `rules/pairs/` (INV-1).

## Pedagogically controlled language

Baseline: hiện tại + quá khứ, ty/Pan(i), 7 cách giới thiệu dần (nom/acc/gen
trước). Tránh động tính từ (imiesłów) phức, số từ nam-người phức ở trình độ đầu.

## Deterministic banned fixtures

- `Czy Pan mówisz...` (Pan phải chia ngôi 3) → FAIL.
- `Ja student` (thiếu być hiện tại) → FAIL.
- `dwa stołów` (sai cách sau số 2) → FAIL.

## Native-review fixtures

Xem `native-review-pl.md` (7 cách, thể, giống nam-người, số từ, tự nhiên).

## Unresolved decisions

- D-pl-01 baseline pl-PL — **owner chưa duyệt**.
- D-pl-02 chấm khi thiếu dấu Ba Lan (chữ, không phải accent) — **owner chưa
  duyệt** (`answer_acceptance_pl` DRAFT).

## Change log

- 0.1.0 (2026-07-19): Khởi tạo từ pipeline /build-language Bước 0–4. DRAFT.

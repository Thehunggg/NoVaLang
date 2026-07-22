---
id: ro/style-and-register
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: pragmatics.rules.json
depends_on: [ro/grammar-and-usage]
reviewer: NOT_ASSIGNED
review_date: NOT_REVIEWED
sources: [S-TRAINED-KNOWLEDGE]
---

# Romanian Style and Register Profile

Cụ thể hoá `naturalness-and-register.md` (ADR-016) cho tiếng Rumani (baseline ro-RO).

## Profile metadata

```text
language: ro
baseline_variety: ro-RO
status: DRAFT (VALIDATED_NOT_YET_PROVEN — chưa FROZEN)
version: 0.1.0
reviewer: NOT_ASSIGNED
review_date: NOT_REVIEWED
provenance: S-TRAINED-KNOWLEDGE + PROJECT_OWNER_PRECEDENT (es B-02, pl D-64)
```

## Xưng hô (3 tầng, dạy 2)

- `tu` — thân mật, số ít.
- `dumneavoastră` (dvs.) — trang trọng cao, chia ngôi 2 số nhiều.
- `dumneata` — bán trang trọng, đang giảm dùng → KHÔNG dạy baseline.

## Politeness markers

`Ați putea...?`, `Aș vrea...`, `vă rog`, `poftim`, `Bună ziua` (trang trọng) /
`Salut`, `Bună` (thân mật).

## Register taxonomy (ADR-016)

| Mức | ro-RO |
|---|---|
| CASUAL | tu + từ thân mật (salut, bă) |
| NATURAL_NEUTRAL_POLITE | tu/dumneavoastră trung tính (baseline) |
| FORMAL | dumneavoastră + từ trang trọng |
| HONORIFIC | **not-applicable** (tiền lệ es B-02) |
| CEREMONIAL / SLANG | modifier trực giao |

## Trợ từ cuối câu

Not-applicable như hệ hình thái. Tiểu từ diễn ngôn (oare, doar, cam) thuộc từ
vựng/ngữ dụng.

## Ngôn ngữ dịch vụ / khách hàng

FORMAL: `dumneavoastră`, `Cu ce vă pot ajuta?`, `Un moment, vă rog`.

## Nói vs viết

Khẩu ngữ nuốt âm, dùng nhân đôi tân ngữ rộng. Viết chuẩn giữ đầy đủ dấu. Dạy
chuẩn, chú thích khẩu ngữ.

## Unacceptable literal translations (nội-ngôn-ngữ)

- KHÔNG dùng nguyên mẫu thay giả định să (vreau a merge → vreau să merg).
- KHÔNG đặt mạo từ xác định TRƯỚC (là hậu tố).
- KHÔNG bỏ ă/â/î/ș/ț (là chữ); ș/ț phải comma-below.
- Cặp bẫy theo ngôn ngữ khác → `rules/pairs/` (INV-1).

## Pedagogically controlled language

Baseline: hiện tại + giả định să + tu/dvs, mạo từ hậu tố. Tránh nhân đôi tân
ngữ phức, gen-dat phức ở trình độ đầu.

## Deterministic banned fixtures

- `Vreau a merge` (nguyên mẫu thay să) → FAIL.
- `ul băiat` (mạo từ trước thay hậu tố) → FAIL.
- `Vorbești dumneavoastră` (tu/dvs lệch chia) → FAIL.

## Native-review fixtures

Xem `native-review-ro.md` (giống trung, mạo từ hậu tố, giả định, tự nhiên).

## Unresolved decisions

- D-ro-01 baseline ro-RO — **owner chưa duyệt**.
- D-ro-02 chính tả â/î (quy tắc 1993) — **owner chưa duyệt**.
- D-ro-03 chấm khi thiếu ă/â/î/ș/ț (áp tiền lệ pl D-64) — **owner chưa duyệt**
  (`answer_acceptance_ro` DRAFT).
- D-ro-04 tu/dumneavoastră (bỏ dumneata) — **owner chưa duyệt**.

## Change log

- 0.1.0 (2026-07-19): Khởi tạo từ pipeline /build-language Bước 0–4. DRAFT.

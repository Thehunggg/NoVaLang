---
id: nl/style-and-register
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: pragmatics.rules.json
depends_on: [nl/grammar-and-usage]
reviewer: NOT_ASSIGNED
review_date: NOT_REVIEWED
sources: [S-TRAINED-KNOWLEDGE]
---

# Dutch Style and Register Profile

Cụ thể hoá `naturalness-and-register.md` (ADR-016) cho tiếng Hà Lan (baseline nl-NL).

## Profile metadata

```text
language: nl
baseline_variety: nl-NL
status: DRAFT (VALIDATED_NOT_YET_PROVEN — chưa FROZEN)
version: 0.1.0
reviewer: NOT_ASSIGNED
review_date: NOT_REVIEWED
provenance: S-TRAINED-KNOWLEDGE + PROJECT_OWNER_PRECEDENT (es B-02/B-03)
```

## Xưng hô

- `je`/`jij` — thân mật, số ít (je không nhấn, jij nhấn). Dùng rộng ở Hà Lan.
- `u` — trang trọng, số ít+nhiều, chia ngôi 3 số ít (u heeft/hebt).
- `jullie` — số nhiều thân mật.
- `gij`/`ge` — Flemish/nl-BE, KHÔNG dùng baseline nl-NL.

## Politeness markers

`zou u kunnen...?`, `Ik zou graag...`, `alstublieft` (u) / `alsjeblieft` (je),
`Goedendag` (trang trọng) / `Hoi`, `Doei` (thân mật).

## Register taxonomy (ADR-016)

| Mức | nl-NL |
|---|---|
| CASUAL | je/jij + từ thân mật (hoi, doei, joh) |
| NATURAL_NEUTRAL_POLITE | je hoặc u trung tính (baseline) |
| FORMAL | u + từ trang trọng |
| HONORIFIC | **not-applicable** (tiền lệ es B-02) |
| CEREMONIAL / SLANG | modifier trực giao |

## Trợ từ cuối câu

Not-applicable như hệ hình thái (khác ja ね/よ). Tiểu từ diễn ngôn (hoor, joh,
even, maar) thuộc từ vựng/khẩu ngữ.

## Ngôn ngữ dịch vụ / khách hàng

FORMAL: `u`, `Waarmee kan ik u helpen?`, `Een moment, alstublieft`.

## Nói vs viết

Khẩu ngữ dùng je rộng, nuốt âm (ken=kan colloquial). Viết chuẩn giữ đầy đủ.
Dạy chuẩn, chú thích khẩu ngữ.

## Unacceptable literal translations (nội-ngôn-ngữ)

- KHÔNG bỏ V2 (*Vandaag ik ga* sai → *Vandaag ga ik*).
- KHÔNG thay `ij` bằng `y`.
- Cặp bẫy theo ngôn ngữ khác → `rules/pairs/` (INV-1).

## Pedagogically controlled language

Baseline: hiện tại + hoàn thành, je/u, V2. Tránh conjunctief cổ, cấu trúc phụ
lồng sâu ở trình độ đầu.

## Deterministic banned fixtures

- `Vandaag ik lees` (sai V2) → FAIL.
- `het man` (sai de/het) → FAIL.
- `Wat willen u drinken?` (u phải chia ngôi 3 số ít) → FAIL.

## Native-review fixtures

Xem `native-review-nl.md` (de/het, diminutive, động từ mạnh, tự nhiên bản dịch).

## Unresolved decisions

- D-nl-01 baseline nl-NL — **owner chưa duyệt**.
- D-nl-02 chấm trema/dấu + ij/y — **owner chưa duyệt** (`answer_acceptance_nl` DRAFT).

## Change log

- 0.1.0 (2026-07-19): Khởi tạo từ pipeline /build-language Bước 0–4. DRAFT.

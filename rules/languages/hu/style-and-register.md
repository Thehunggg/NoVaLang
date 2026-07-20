---
id: hu/style-and-register
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: pragmatics.rules.json
depends_on: [hu/grammar-and-usage]
reviewer: NOT_ASSIGNED
review_date: NOT_REVIEWED
sources: [S-TRAINED-KNOWLEDGE]
---

# Hungarian Style and Register Profile

Cụ thể hoá `naturalness-and-register.md` (ADR-016) cho tiếng Hungary (baseline
hu-HU).

## Profile metadata

```text
language: hu
baseline_variety: hu-HU
status: DRAFT (VALIDATED_NOT_YET_PROVEN — chưa FROZEN)
version: 0.1.0
reviewer: NOT_ASSIGNED
review_date: NOT_REVIEWED
provenance: S-TRAINED-KNOWLEDGE + PROJECT_OWNER_PRECEDENT (es B-02, pl D-64)
```

## Xưng hô — ĐỐI LẬP T-V THẬT (như ru/es, KHÁC scandinavia)

- `te` — thân mật, ngôi 2 (bạn bè, gia đình, đồng trang lứa, trẻ em).
- `ön` — trang trọng chính thức, **động từ ngôi 3** (người lạ, công việc).
- `maga` — trang trọng nhưng thân hơn ön, **động từ ngôi 3**; sắc thái tế nhị
  (dạy sau / ghi chú).
- Số nhiều: `ti` (thân mật) / `önök`, `maguk` (trang trọng).

Baseline: **dạy te/ön đối lập**.

## Politeness markers

`kérem` (làm ơn), `köszönöm` (cảm ơn), `elnézést` (xin lỗi), `tessék` (xin
mời), `jó napot` (trang trọng) / `szia`, `helló` (thân mật).

## Register taxonomy (ADR-016)

| Mức | hu-HU |
|---|---|
| CASUAL | te + từ thân mật (szia, helló) |
| NATURAL_NEUTRAL_POLITE | te/ön theo quan hệ (baseline) |
| FORMAL | ön + gián tiếp (jó napot, kérem) |
| HONORIFIC | **not-applicable** (tiền lệ es B-02) |
| CEREMONIAL / SLANG | modifier trực giao |

## Trợ từ cuối câu

Not-applicable như hệ hình thái. Tiểu từ diễn ngôn (hát, ugye, is, csak) thuộc
từ vựng/ngữ dụng.

## Ngôn ngữ dịch vụ / khách hàng

FORMAL dùng `ön` + ngôi 3: `Miben segíthetek?`, `Egy pillanat`, `Tessék`.

## Nói vs viết

Khẩu ngữ có đồng hoá phụ âm. Viết chuẩn giữ đầy đủ dấu (ngắn/dài). Dạy chuẩn
viết + audio.

## Unacceptable literal translations (nội-ngôn-ngữ)

- KHÔNG dùng `te` khi cần trang trọng (dùng ön + ngôi 3).
- KHÔNG sai hoà âm nguyên âm (házben SAI → házban).
- KHÔNG dùng sai hệ định/bất định (Látok a házat SAI → Látom a házat).
- KHÔNG bỏ dấu dài / lẫn ö-ő, ü-ű (là chữ, đổi nghĩa).
- Cặp bẫy theo ngôn ngữ khác → `rules/pairs/` (INV-1).

## Pedagogically controlled language

Baseline: hiện tại + quá khứ, te/ön, vài hậu tố cách hay dùng (-ban/-ben,
-t akuzativ). Tránh chồng nhiều hậu tố + định/bất định phức sớm.

## Deterministic banned fixtures

- `házben` (sai hoà âm) → FAIL.
- `Ön beszélsz` (ön + ngôi 2) → FAIL.
- `Látok a házat.` (bất định + tân ngữ xác định) → FAIL.

## Native-review fixtures

Xem `native-review-hu.md` (hoà âm, chắp dính, định/bất định, te/ön, s/sz, độ
tự nhiên).

## Unresolved decisions

- D-hu-01 baseline hu-HU — **owner chưa duyệt**.
- D-hu-02 dạy te/ön đối lập T-V — **owner chưa duyệt**.
- D-hu-03 trình tự dạy hậu tố cách (vài cái hay dùng trước) — **owner chưa duyệt**.
- D-hu-04 chấm thiếu á é í ó ö ő ú ü ű (áp tiền lệ pl D-64) — **owner chưa duyệt**.

## Change log

- 0.1.0 (2026-07-20): Khởi tạo từ pipeline /build-language Bước 0–4. DRAFT.

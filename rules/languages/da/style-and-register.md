---
id: da/style-and-register
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: pragmatics.rules.json
depends_on: [da/grammar-and-usage]
reviewer: NOT_ASSIGNED
review_date: NOT_REVIEWED
sources: [S-TRAINED-KNOWLEDGE]
---

# Danish Style and Register Profile

Cụ thể hoá `naturalness-and-register.md` (ADR-016) cho tiếng Đan Mạch (baseline da-DK).

## Profile metadata

```text
language: da
baseline_variety: da-DK
status: DRAFT (VALIDATED_NOT_YET_PROVEN — chưa FROZEN)
version: 0.1.0
reviewer: NOT_ASSIGNED
review_date: NOT_REVIEWED
provenance: S-TRAINED-KNOWLEDGE + PROJECT_OWNER_PRECEDENT (es B-02, pl D-64)
```

## Xưng hô (du phổ quát, như sv)

- `du` — dùng cho **hầu hết mọi người** (kể cả người lạ/lớn tuổi/dịch vụ).
  Baseline.
- `De` — trang trọng cao, **đã rất hiếm** (hoàng gia/văn bản rất trang trọng) →
  KHÔNG dạy làm chuẩn.
- `I` — ngôi 2 số nhiều thân mật (viết hoa).

Tiếng Đan **không** dựng đối lập T-V mạnh. Lịch sự qua **từ vựng + gián tiếp**.

## Politeness markers

`Kunne du...?`, `Jeg vil gerne...`, `undskyld`, `tak`, `Goddag` (trang trọng
hơn) / `Hej`, `Hejsa` (thân mật).

## Register taxonomy (ADR-016)

| Mức | da-DK |
|---|---|
| CASUAL | du + từ thân mật (hej, hejsa) |
| NATURAL_NEUTRAL_POLITE | du chuẩn mực (baseline) |
| FORMAL | du + từ trang trọng + gián tiếp |
| HONORIFIC | **not-applicable** (tiền lệ es B-02) |
| CEREMONIAL / SLANG | modifier trực giao |

## Trợ từ cuối câu

Not-applicable như hệ hình thái. Tiểu từ diễn ngôn (jo, da, nok, vel) thuộc từ
vựng/ngữ dụng.

## Ngôn ngữ dịch vụ / khách hàng

FORMAL vẫn dùng `du`: `Hvad kan jeg hjælpe med?`, `Et øjeblik`, `Værsgo`.

## Nói vs viết

Khẩu ngữ nuốt âm mạnh (da nói nhanh, nhiều âm giảm). Viết chuẩn giữ đầy đủ. Dạy
chuẩn viết + audio cho phát âm.

## Unacceptable literal translations (nội-ngôn-ngữ)

- KHÔNG dịch 'you' trang trọng thành `De` (du là chuẩn).
- KHÔNG bỏ V2 (*I dag jeg læser* sai → *I dag læser jeg*).
- KHÔNG dùng xác định kép kiểu sv khi có tính từ (da: den røde bil).
- KHÔNG bỏ æ/ø/å (là chữ).
- Cặp bẫy theo ngôn ngữ khác → `rules/pairs/` (INV-1).

## Pedagogically controlled language

Baseline: hiện tại + hoàn thành, du, V2. Tránh cấu trúc phụ lồng sâu; stød ở
audio, không ép trình độ đầu.

## Deterministic banned fixtures

- `I dag jeg læser` (sai V2) → FAIL.
- `jeg eren` (động từ chia theo ngôi) → FAIL.
- `den røde bilen` (xác định kép kiểu sv) → FAIL.

## Native-review fixtures

Xem `native-review-da.md` (en/et, hậu tố xác định, stød, phát âm, du tự nhiên).

## Unresolved decisions

- D-da-01 baseline da-DK — **owner chưa duyệt**.
- D-da-02 du phổ quát / De cổ — **owner chưa duyệt**.
- D-da-03 chấm khi thiếu æ/ø/å (áp tiền lệ pl D-64) — **owner chưa duyệt**.

## Change log

- 0.1.0 (2026-07-19): Khởi tạo từ pipeline /build-language Bước 0–4. DRAFT.

---
id: sv/style-and-register
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: pragmatics.rules.json
depends_on: [sv/grammar-and-usage]
reviewer: NOT_ASSIGNED
review_date: NOT_REVIEWED
sources: [S-TRAINED-KNOWLEDGE]
---

# Swedish Style and Register Profile

Cụ thể hoá `naturalness-and-register.md` (ADR-016) cho tiếng Thụy Điển (baseline sv-SE).

## Profile metadata

```text
language: sv
baseline_variety: sv-SE
status: DRAFT (VALIDATED_NOT_YET_PROVEN — chưa FROZEN)
version: 0.1.0
reviewer: NOT_ASSIGNED
review_date: NOT_REVIEWED
provenance: S-TRAINED-KNOWLEDGE + PROJECT_OWNER_PRECEDENT (es B-02, pl D-64)
```

## Xưng hô (đặc trưng: du phổ quát)

- `du` — dùng cho **hầu hết mọi người** (kể cả người lạ, người lớn tuổi, dịch
  vụ) nhờ **du-reformen** (thập niên 1960-70). Baseline.
- `ni` — chủ yếu là **số nhiều**. `ni` trang trọng số ít đã cổ, đôi khi bị coi
  là kỳ/thiếu tự nhiên → KHÔNG dạy làm chuẩn trang trọng.

Tiếng Thụy Điển **không** dựng đối lập T-V mạnh (du/Sie de, tu/vous fr). Lịch
sự qua **từ vựng + gián tiếp**.

## Politeness markers

`Skulle du kunna...?`, `Jag skulle vilja...`, `ursäkta`, `tack så mycket`,
`Hej` (chào chung) / `God morgon` (trang trọng hơn).

## Register taxonomy (ADR-016)

| Mức | sv-SE |
|---|---|
| CASUAL | du + từ thân mật (hej, tjena, fika) |
| NATURAL_NEUTRAL_POLITE | du chuẩn mực (baseline — du đã là mức lịch sự trung tính) |
| FORMAL | du + từ trang trọng + gián tiếp |
| HONORIFIC | **not-applicable** (tiền lệ es B-02) |
| CEREMONIAL / SLANG | modifier trực giao |

## Trợ từ cuối câu

Not-applicable như hệ hình thái (khác ja ね/よ). Tiểu từ diễn ngôn (ju, väl, nog,
då) thuộc từ vựng/ngữ dụng.

## Ngôn ngữ dịch vụ / khách hàng

FORMAL vẫn dùng `du`: `Hur kan jag hjälpa dig?`, `Ett ögonblick`, `Varsågod`.

## Nói vs viết

Khẩu ngữ nuốt âm (dom=de/dem, nån=någon). Viết chuẩn giữ đầy đủ. Dạy chuẩn,
chú thích khẩu ngữ.

## Unacceptable literal translations (nội-ngôn-ngữ)

- KHÔNG dịch máy 'you' trang trọng thành `ni` (du là chuẩn).
- KHÔNG bỏ V2 (*Idag jag läser* sai → *Idag läser jag*).
- KHÔNG bỏ å/ä/ö (là chữ, đổi từ).
- Cặp bẫy theo ngôn ngữ khác → `rules/pairs/` (INV-1).

## Pedagogically controlled language

Baseline: hiện tại + hoàn thành, du, V2, xác định kép. Tránh cấu trúc phụ lồng
sâu, phân biệt tinh tế pitch accent ở trình độ đầu.

## Deterministic banned fixtures

- `Idag jag läser` (sai V2) → FAIL.
- `jag ären` (động từ không chia theo ngôi) → FAIL.
- `den bil` (thiếu hậu tố xác định) → FAIL.

## Native-review fixtures

Xem `native-review-sv.md` (en/ett, hậu tố xác định, động từ mạnh, du/ni tự nhiên).

## Unresolved decisions

- D-sv-01 baseline sv-SE — **owner chưa duyệt**.
- D-sv-02 chấm khi thiếu å/ä/ö (áp tiền lệ pl D-64) — **owner chưa duyệt**.
- D-sv-03 du phổ quát / ni cổ — **owner chưa duyệt**.

## Change log

- 0.1.0 (2026-07-19): Khởi tạo từ pipeline /build-language Bước 0–4. DRAFT.

---
id: ms/style-and-register
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: pragmatics.rules.json
depends_on: [ms/grammar-and-usage]
reviewer: NOT_ASSIGNED
review_date: NOT_REVIEWED
sources: [S-TRAINED-KNOWLEDGE]
---

# Malay Style and Register Profile

Cụ thể hoá `naturalness-and-register.md` (ADR-016) cho tiếng Mã Lai (baseline
ms-MY).

## Profile metadata

```text
language: ms
baseline_variety: ms-MY (Bahasa Melayu chuẩn, Malaysia)
status: DRAFT (VALIDATED_NOT_YET_PROVEN — chưa FROZEN)
version: 0.1.0
reviewer: NOT_ASSIGNED
review_date: NOT_REVIEWED
provenance: S-TRAINED-KNOWLEDGE + S-ID-CROSSREF + PROJECT_OWNER_PRECEDENT (es B-02)
corpus_caveat: KHÔNG có corpus Mã Lai — native review đặc biệt quan trọng
```

## Xưng hô

- Ngôi 1: `saya` (tôi, lịch sự/trung tính — baseline) / `aku` (thân).
- Ngôi 2: `anda` (trang trọng/viết) / `awak`, `kamu` (thân) / `kau` (rất thân).
- Ngôi 3: `dia`.
- Tước hiệu lịch sự: `encik` (ông), `puan` (bà), `cik` (cô) + tên.

Baseline: dạy `saya` + `anda`/`awak` + `encik`/`puan`.

## Politeness markers

`tolong` (làm ơn), `sila` (xin mời), `terima kasih` (cảm ơn), `maaf`/`minta
maaf` (xin lỗi), `boleh…?` (có thể…?), `selamat pagi` (chào buổi sáng).

## Register taxonomy (ADR-016)

| Mức | ms-MY |
|---|---|
| CASUAL | aku/awak + bahasa pasar (khẩu ngữ) |
| NATURAL_NEUTRAL_POLITE | saya + anda/awak (baseline) |
| FORMAL | saya + anda + encik/puan + bahasa baku |
| HONORIFIC | **not-applicable** (tiền lệ es B-02) |
| CEREMONIAL / SLANG | modifier trực giao |

## Nói vs viết

Khẩu ngữ (bahasa pasar) rút gọn/vay tiếng Anh. Viết chuẩn (bahasa baku) đầy đủ
phụ tố. Dạy chuẩn.

## Unacceptable literal translations (nội-ngôn-ngữ)

- KHÔNG sai biến âm mũi meN- (menbaca SAI → membaca).
- KHÔNG đặt bổ nghĩa trước danh từ (besar rumah SAI → rumah besar).
- KHÔNG trộn từ vựng id (ms *wang* không *uang*; giữ chuẩn ms).
- KHÔNG chia động từ / thêm số nhiều hình thái (dùng từ thì + trùng lặp).
- Cặp bẫy ms↔id / ms↔<X> → `rules/pairs/` (INV-1).

## Pedagogically controlled language

Baseline: câu cơ bản + saya/anda + thì qua từ (sudah/akan) + phụ tố meN-/ber-
hay dùng + loại từ. Tránh vòng phụ tố phức + trùng lặp sắc thái sớm.

## Deterministic banned fixtures

- `menbaca` (sai biến âm mũi) → FAIL.
- `besar rumah` (bổ nghĩa trước danh từ) → FAIL.

## Native-review fixtures

Xem `native-review-ms.md` (phụ tố meN-, trùng lặp, loại từ, thì/thể, saya/anda,
'e' schwa, ms vs id, độ tự nhiên) — ĐẶC BIỆT quan trọng vì KHÔNG có corpus.

## Unresolved decisions

- D-ms-01 baseline ms-MY (Malaysia) — **owner chưa duyệt**.
- D-ms-02 dạy saya/anda baseline lịch sự — **owner chưa duyệt**.
- D-ms-03 dạy bahasa baku (chuẩn) không bahasa pasar — **owner chưa duyệt**.
- D-ms-04 chấm chính tả đơn giản (không dấu phụ) — **owner chưa duyệt**.

## Change log

- 0.1.0 (2026-07-20): Khởi tạo từ pipeline /build-language Bước 0–4. DRAFT.
  KHÔNG có corpus Mã Lai — nhiều mục medium/DRAFT, cần người bản ngữ.

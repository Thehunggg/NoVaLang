---
id: hr/style-and-register
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: pragmatics.rules.json
depends_on: [hr/grammar-and-usage]
reviewer: NOT_ASSIGNED
review_date: NOT_REVIEWED
sources: [S-TRAINED-KNOWLEDGE]
---

# Croatian Style and Register Profile

Cụ thể hoá `naturalness-and-register.md` (ADR-016) cho tiếng Croatia (baseline
hr-HR).

## Profile metadata

```text
language: hr
baseline_variety: hr-HR
status: DRAFT (VALIDATED_NOT_YET_PROVEN — chưa FROZEN)
version: 0.1.0
reviewer: NOT_ASSIGNED
review_date: NOT_REVIEWED
provenance: S-TRAINED-KNOWLEDGE + PROJECT_OWNER_PRECEDENT (es B-02, pl D-64)
```

## Xưng hô — ĐỐI LẬP T-V THẬT (như ru/es, KHÁC scandinavia)

- `ti` — thân mật, ngôi 2 số ít (bạn bè, gia đình, đồng trang lứa, trẻ em).
- `Vi` — trang trọng, **động từ ngôi 2 SỐ NHIỀU**, viết hoa khi trang trọng
  (người lạ, lớn tuổi, cấp trên).
- `vi` (thường) = ngôi 2 số nhiều thật.
- `vokativ` (cách hô gọi) dùng khi gọi tên: *Ivane!*, *gospodine!*

Baseline: **dạy ti/Vi đối lập**.

## Politeness markers

`molim` (làm ơn / xin mời), `hvala` (cảm ơn), `izvolite` (xin mời), `oprostite`
(xin lỗi), `dobar dan` (trang trọng) / `bok`, `ćao` (thân mật).

## Register taxonomy (ADR-016)

| Mức | hr-HR |
|---|---|
| CASUAL | ti + từ thân mật (bok, ćao, hej) |
| NATURAL_NEUTRAL_POLITE | ti/Vi theo quan hệ (baseline) |
| FORMAL | Vi + gián tiếp (dobar dan, molim) |
| HONORIFIC | **not-applicable** (tiền lệ es B-02) |
| CEREMONIAL / SLANG | modifier trực giao |

## Trợ từ cuối câu

Not-applicable như hệ hình thái. Tiểu từ diễn ngôn (pa, ma, baš, valjda) thuộc
từ vựng/ngữ dụng.

## Ngôn ngữ dịch vụ / khách hàng

FORMAL dùng `Vi` + ngôi 2 số nhiều: `Kako vam mogu pomoći?`, `Samo trenutak`,
`Izvolite`.

## Nói vs viết

Khẩu ngữ có pitch accent (4 kiểu). Viết chuẩn giữ đầy đủ dấu. Dạy chuẩn viết +
audio cho pitch accent.

## Unacceptable literal translations (nội-ngôn-ngữ)

- KHÔNG dùng `ti` khi cần trang trọng (dùng Vi + ngôi 2 số nhiều).
- KHÔNG đặt enclitic sai vị trí (phải vị trí thứ 2: *Vidio sam ga*, KHÔNG *Sam
  vidio ga*).
- KHÔNG bỏ biến cách (dùng nominativ ở mọi chỗ).
- KHÔNG bỏ č/ć/š/ž/đ (là chữ).
- KHÔNG trộn từ vựng sr/bs (hr: kruh, tisuća, tjedan — không hljeb, hiljada,
  sedmica).
- Cặp bẫy theo ngôn ngữ khác → `rules/pairs/` (INV-1).

## Pedagogically controlled language

Baseline: hiện tại + perfekt, ti/Vi, nominativ/akuzativ/lokativ trước. Tránh
7-cách đầy đủ + thể + enclitic phức sớm; pitch accent ở audio.

## Deterministic banned fixtures

- `Sam vidio ga.` (enclitic sai vị trí) → FAIL.
- `Vi govoriš` (Vi + ngôi 2 số ít) → FAIL.
- `iz Zagreb` (thiếu genitiv) → FAIL.

## Native-review fixtures

Xem `native-review-hr.md` (biến cách, thể động từ, enclitic, pitch accent, ti/Vi,
hr vs sr/bs, độ tự nhiên).

## Unresolved decisions

- D-hr-01 baseline hr-HR (štokavian chuẩn) — **owner chưa duyệt**.
- D-hr-02 dạy ti/Vi đối lập T-V — **owner chưa duyệt**.
- D-hr-03 trình tự dạy cách (nom/acc/lok trước, đủ 7 sau) — **owner chưa duyệt**.
- D-hr-04 chấm thiếu č/ć/š/ž/đ (áp tiền lệ pl D-64) — **owner chưa duyệt**.

## Change log

- 0.1.0 (2026-07-20): Khởi tạo từ pipeline /build-language Bước 0–4. DRAFT.

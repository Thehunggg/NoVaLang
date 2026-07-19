---
id: ca/style-and-register
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: pragmatics.rules.json
depends_on: [ca/grammar-and-usage]
reviewer: NOT_ASSIGNED
review_date: NOT_REVIEWED
sources: [S-TRAINED-KNOWLEDGE]
---

# Catalan Style and Register Profile

Cụ thể hoá `naturalness-and-register.md` (ADR-016) cho tiếng Catalan (baseline
ca, Central/IEC).

## Profile metadata

```text
language: ca
baseline_variety: ca (Central Catalan / IEC)
status: DRAFT (VALIDATED_NOT_YET_PROVEN — chưa FROZEN)
version: 0.1.0
reviewer: NOT_ASSIGNED
review_date: NOT_REVIEWED
provenance: S-TRAINED-KNOWLEDGE + PROJECT_OWNER_PRECEDENT (es B-02, es D-74, pl D-64)
```

## Xưng hô — ĐỐI LẬP T-V THẬT (như es, KHÁC da/sv)

- `tu` — thân mật, ngôi 2 (bạn bè, gia đình, đồng trang lứa).
- `vostè` — trang trọng, **+ động từ NGÔI 3** (như *usted* es). Người lạ/lớn
  tuổi/dịch vụ.
- Số nhiều: `vosaltres` (thân mật) / `vostès` (trang trọng).
- `vós` — trang trọng cổ/vùng (ngôi 2 số nhiều dùng số ít) → ghi chú, hiếm.

Baseline: **dạy tu/vostè đối lập** (khác Scandinavia du-phổ-quát).

## Politeness markers

`si us plau` (làm ơn), `gràcies`/`moltes gràcies`, `disculpi`/`perdoni` (xin
lỗi, dạng vostè), `bon dia`/`bona tarda`/`bona nit` (trang trọng hơn) / `hola`,
`adéu`, `ei` (thân mật).

## Register taxonomy (ADR-016)

| Mức | ca |
|---|---|
| CASUAL | tu + từ thân mật (hola, ei, adéu) |
| NATURAL_NEUTRAL_POLITE | tu/vostè theo quan hệ (baseline) |
| FORMAL | vostè + gián tiếp (bon dia, si us plau) |
| HONORIFIC | **not-applicable** (tiền lệ es B-02) |
| CEREMONIAL / SLANG | modifier trực giao |

## Trợ từ cuối câu

Not-applicable như hệ hình thái. Tiểu từ diễn ngôn (eh, oi?, doncs) thuộc từ
vựng/ngữ dụng.

## Ngôn ngữ dịch vụ / khách hàng

FORMAL dùng `vostè` + ngôi 3: `En què el puc ajudar?`, `Un moment`, `Aquí té`.

## Nói vs viết

Khẩu ngữ giảm nguyên âm mạnh ([ə]/[u]). Viết chuẩn giữ đầy đủ. Dạy chuẩn viết +
audio cho phát âm. Tránh **castellanismes** (vay tiếng TBN không chuẩn: *bueno*,
*vale* → dùng *bé*, *d'acord*).

## Unacceptable literal translations (nội-ngôn-ngữ)

- KHÔNG bỏ apostrophe/rút gọn (*el home* sai → *l'home*).
- KHÔNG dùng preterite hình thái kiểu es cho quá khứ dứt điểm — Catalan dùng
  **passat perifràstic** (*vaig parlar*).
- KHÔNG cho vostè đi với động từ ngôi 2 (*vostè parles* sai → *vostè parla*).
- KHÔNG bỏ ç/l·l (phân biệt âm/nghĩa).
- Cặp bẫy theo ngôn ngữ khác (nhất là ca↔es) → `rules/pairs/` (INV-1).

## Pedagogically controlled language

Baseline: hiện tại + passat perifràstic, tu/vostè, mạo từ + apostrophe. Tránh
pronoms febles kết hợp (hi/en) sớm; giảm nguyên âm ở audio.

## Deterministic banned fixtures

- `el home` (không rút gọn) → FAIL.
- `vostè parles` (vostè + ngôi 2) → FAIL.
- `jo parla` (chia sai ngôi) → FAIL.

## Native-review fixtures

Xem `native-review-ca.md` (giống, apostrophe/rút gọn, passat perifràstic,
pronoms febles, giảm nguyên âm, tu/vostè, Central vs Valencian, castellanismes).

## Unresolved decisions

- D-ca-01 baseline ca Central/IEC — **owner chưa duyệt**.
- D-ca-02 dạy tu/vostè đối lập T-V — **owner chưa duyệt**.
- D-ca-03 dạy passat perifràstic (vaig parlar) làm quá khứ chuẩn — **owner chưa
  duyệt**.
- D-ca-04 chấm điểm: ç/l·l = sai (pl D-64) / dấu trọng âm = cảnh báo nhẹ (es
  D-74) — **owner chưa duyệt**.

## Change log

- 0.1.0 (2026-07-19): Khởi tạo từ pipeline /build-language Bước 0–4. DRAFT.

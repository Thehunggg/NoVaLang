---
id: th/style-and-register
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: pragmatics.rules.json
depends_on: [th/grammar-and-usage]
reviewer: NOT_ASSIGNED
review_date: NOT_REVIEWED
sources: [S-TRAINED-KNOWLEDGE]
---

# Thai Style and Register Profile

Cụ thể hoá `naturalness-and-register.md` (ADR-016) cho tiếng Thái (baseline
th-TH, Trung Thái/Bangkok).

## Profile metadata

```text
language: th
baseline_variety: th-TH (Central Thai / Bangkok)
status: DRAFT (VALIDATED_NOT_YET_PROVEN — chưa FROZEN)
version: 0.1.0
reviewer: NOT_ASSIGNED
review_date: NOT_REVIEWED
provenance: S-TRAINED-KNOWLEDGE
```

## Xưng hô — hệ đại từ phức (theo tuổi/địa vị/GIỚI/thân sơ)

- Ngôi 1: `ผม` (nam) / `ดิฉัน` (nữ trang trọng), `ฉัน` (nữ thân) — 'tôi'.
- Ngôi 2: `คุณ` (bạn, lịch sự) / `เธอ` (thân) / xưng theo quan hệ `พี่` (anh/chị),
  `น้อง` (em).
- **Pro-drop nhiều** (bỏ đại từ khi rõ ngữ cảnh).

## Trợ từ lịch sự cuối câu — GẮN GIỚI người nói

- `ครับ` (khráp) — **nam**, mọi câu.
- `ค่ะ` (khâ, trần thuật) / `คะ` (khá, câu hỏi) — **nữ**.
- Bỏ = thân mật/trống.

Đây là đặc trưng: trợ từ lịch sự **theo giới NGƯỜI NÓI**, không theo người nghe.

## Register taxonomy (ADR-016)

| Mức | th-TH |
|---|---|
| CASUAL | bỏ ครับ/ค่ะ, đại từ thân (เธอ, ฉัน) |
| NATURAL_NEUTRAL_POLITE | + ครับ/ค่ะ + คุณ + ผม/ดิฉัน (baseline) |
| FORMAL | từ vựng trang trọng + đầy đủ trợ từ lịch sự |
| HONORIFIC | **exists-but-out-of-scope** (xem dưới) |
| CEREMONIAL / SLANG | modifier trực giao |

## HONORIFIC — Thái CÓ, nhưng ngoài phạm vi baseline

Thái có honorific THẬT: **ราชาศัพท์** (ngôn ngữ hoàng gia — hệ từ vựng kính ngữ
riêng cho hoàng gia) + từ vựng nhà chùa (พระ). **KHÁC es B-02** (es không có
honorific): Thái có honorific hình thái-từ vựng thật, nhưng **OUT-OF-SCOPE** cho
baseline người học — chỉ ghi nhận, không dạy. Baseline dùng ครับ/ค่ะ + từ vựng
lịch sự thường.

## Politeness markers

`ขอ...` (xin...), `...ได้ไหม` (...được không?), `กรุณา` (làm ơn, trang trọng),
`ขอบคุณ` (cảm ơn), `ขอโทษ` (xin lỗi), `สวัสดี` (chào).

## Nói vs viết

Khẩu ngữ nhiều pro-drop + trợ từ. Viết trang trọng đầy đủ hơn. Thanh điệu ở
audio.

## Unacceptable literal translations (nội-ngôn-ngữ)

- KHÔNG bỏ dấu thanh/nguyên âm (đổi nghĩa).
- KHÔNG dùng ครับ với người nói nữ / ค่ะ với người nói nam.
- KHÔNG thêm 'là' (เป็น/คือ) trước tính từ.
- KHÔNG chuyển tự Latin làm nội dung đích (dạy chữ Thái).
- KHÔNG bịa loại từ sai.
- Cặp bẫy theo ngôn ngữ khác → `rules/pairs/` (INV-1).

## Pedagogically controlled language

Baseline: hiện tại + trợ từ thì cơ bản (จะ/แล้ว), ผม/ดิฉัน + คุณ + ครับ/ค่ะ,
loại từ hay dùng. Tránh ราชาศัพท์, hệ đại từ phức, thanh chi tiết sớm.

## Deterministic banned fixtures

- `สวัสดีครับค่ะ` (trộn trợ từ nam+nữ) → FAIL.
- `สามหนังสือ` (sai thứ tự loại từ) → FAIL.
- nội dung đích viết Latin (sawatdi) → FAIL.

## Native-review fixtures

Xem `native-review-th.md` (thanh, loại từ, trợ từ thì, đại từ/giới, trợ từ lịch
sự, tách từ, độ tự nhiên).

## Unresolved decisions

- D-th-01 baseline th-TH (Trung Thái/Bangkok) — **owner chưa duyệt**.
- D-th-02 dạy chữ Thái trực tiếp (không chuyển tự làm chính) — **owner chưa duyệt**.
- D-th-03 trợ đọc RTGS/IPA+thanh nhập môn, ẩn dần — **owner chưa duyệt**.
- D-th-04 chấm thiếu/sai dấu thanh/nguyên âm = SAI (pl D-64 + hi D-hi-04); không
  nhận Latin — **owner chưa duyệt**.

## Change log

- 0.1.0 (2026-07-20): Khởi tạo từ pipeline /build-language Bước 0–4. DRAFT.

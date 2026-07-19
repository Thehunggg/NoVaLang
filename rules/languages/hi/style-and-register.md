---
id: hi/style-and-register
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: pragmatics.rules.json
depends_on: [hi/grammar-and-usage]
sources: [S-TRAINED-KNOWLEDGE]
---

# Hindi Style & Register — Văn phong và mức diễn đạt

Áp dụng ADR-016. Baseline `NATURAL_NEUTRAL_POLITE` = आप.

## Xưng hô — 3 MỨC (không phải T-V 2 mức)

- **तू** (rất thân HOẶC bề trên xuống): CẨN THẬN — dễ thô với người lạ.
- **तुम** (thân mật/ngang hàng): bạn bè, em.
- **आप** (lịch sự/tôn kính): người lạ, lớn tuổi, cấp trên — **BASELINE an toàn**;
  dùng **động từ số nhiều**.

Hậu tố tôn kính **जी** sau tên/danh xưng: रामजी, माताजी, जी हाँ. Quyết định sản
phẩm — dạy 3 mức (xem `review-checklist.md` D-hi-05).

## Map taxonomy 6 mức (ADR-016)

| Mức | Tiếng Hindi |
|---|---|
| CASUAL | तू/तुम + नमस्ते, क्या हाल है |
| NATURAL_NEUTRAL_POLITE (baseline) | आप lịch sự trung tính |
| FORMAL | आप + động từ số nhiều + कृपया, धन्यवाद, माफ़ कीजिए + जी |
| HONORIFIC (modifier) | **partial-native** — आप + động từ số nhiều + जी là tôn kính hình thái bản địa (gần HONORIFIC hơn châu Âu, nhưng không nhiều tầng như ja/ko) |

## Diglossia

Hindi (Sanskrit-hoá cao) ↔ Hindustani/Urdu-hoá (từ Ba Tư/Ả Rập). Dạy **Hindi
phổ thông** (không quá Sanskrit-hoá cũng không quá Urdu-hoá).

## Chưa giải quyết / native review

- Ranh giới तू/तुम/आप thực tế, mức Sanskrit/Urdu-hoá, độ tự nhiên →
  `native-review-hi.md`.

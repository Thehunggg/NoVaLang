---
id: fi/style-and-register
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: pragmatics.rules.json
depends_on: [fi/grammar-and-usage]
reviewer: NOT_ASSIGNED
review_date: NOT_REVIEWED
sources: [S-TRAINED-KNOWLEDGE]
---

# Finnish Style and Register Profile

Cụ thể hoá `naturalness-and-register.md` (ADR-016) cho tiếng Phần Lan (baseline
fi-FI, yleiskieli).

## Profile metadata

```text
language: fi
baseline_variety: fi-FI (yleiskieli — chuẩn viết)
status: DRAFT (VALIDATED_NOT_YET_PROVEN — chưa FROZEN)
version: 0.1.0
reviewer: NOT_ASSIGNED
review_date: NOT_REVIEWED
provenance: S-TRAINED-KNOWLEDGE + PROJECT_OWNER_PRECEDENT (es B-02, pl D-64)
```

## Xưng hô

- `sinä` — thân mật, số ít (sinuttelu). Phổ biến rộng ở Phần Lan hiện đại.
- `te` — trang trọng (teitittely, giống fr vous) hoặc số nhiều; chia ngôi 2 số
  nhiều. Dùng nhiều hơn sv `ni` (dịch vụ trang trọng, người lớn tuổi).

## Trục register chính: yleiskieli vs puhekieli

**Đặc trưng quan trọng:** khoảng cách LỚN giữa chuẩn viết (yleiskieli) và khẩu
ngữ (puhekieli): `minä→mä`, `sinä→sä`, `me olemme→me ollaan`, `hän→se`. Baseline
dạy **yleiskieli** (cần cho văn bản/chính thức) + cảnh báo puhekieli — xem
`review-checklist.md` D-fi-02.

## Politeness markers

`Voisitteko...?` / `Voisitko...?`, `Haluaisin...`, `olkaa hyvä` / `ole hyvä`,
`kiitos`, `Hyvää päivää` (trang trọng) / `Moi`, `Hei` (thân mật).

## Register taxonomy (ADR-016)

| Mức | fi-FI |
|---|---|
| CASUAL | sinä + puhekieli (moi, mä, kiva) |
| NATURAL_NEUTRAL_POLITE | sinä + yleiskieli (baseline) |
| FORMAL | te + yleiskieli trang trọng |
| HONORIFIC | **not-applicable** (tiền lệ es B-02) |
| CEREMONIAL / SLANG | modifier trực giao |

## Trợ từ cuối câu

Not-applicable như hệ hình thái. Tiểu từ nghi vấn `-ko/-kö` gắn vào động từ
(Puhutko? 'Bạn có nói không?') — thuộc hình thái, không phải trợ từ cuối câu
kiểu ja.

## Ngôn ngữ dịch vụ / khách hàng

FORMAL: `te` + `Kuinka voin auttaa?`, `Hetki, olkaa hyvä`.

## Nói vs viết

Xem trục yleiskieli/puhekieli ở trên — đây là điểm khác biệt lớn nhất của fi.
Dạy chuẩn viết, chú thích khẩu ngữ rõ ràng.

## Unacceptable literal translations (nội-ngôn-ngữ)

- KHÔNG thêm mạo từ / giống (fi không có).
- KHÔNG dùng 'not' trợ động từ → phải động từ phủ định `ei` chia ngôi.
- KHÔNG bỏ ä/ö (là chữ + phá hoà âm).
- Cặp bẫy theo ngôn ngữ khác → `rules/pairs/` (INV-1).

## Pedagogically controlled language

Baseline yleiskieli: hiện tại + phủ định ei, cách nom/gen/partitiivi + địa điểm
trước, hoà âm. Tránh dạy hết 15 cách cùng lúc; luân phiên phụ âm giới thiệu dần.

## Deterministic banned fixtures

- `en puhun` (phủ định ei + gốc, không chia lại) → FAIL.
- `talossä` (sai hoà âm) → FAIL.
- `Puhutteko sinä` (te/sinä lệch chia) → FAIL.

## Native-review fixtures

Xem `native-review-fi.md` (partitiivi, luân phiên phụ âm, hoà âm, puhekieli,
tự nhiên).

## Unresolved decisions

- D-fi-01 baseline fi-FI — **owner chưa duyệt**.
- D-fi-02 yleiskieli vs puhekieli baseline — **owner chưa duyệt**.
- D-fi-03 chấm khi thiếu ä/ö (áp tiền lệ pl D-64) — **owner chưa duyệt**
  (`answer_acceptance_fi` DRAFT).

## Change log

- 0.1.0 (2026-07-19): Khởi tạo từ pipeline /build-language Bước 0–4. DRAFT.

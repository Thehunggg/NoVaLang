---
id: ru/style-and-register
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: pragmatics.rules.json
depends_on: [ru/grammar-and-usage]
reviewer: NOT_ASSIGNED
review_date: NOT_REVIEWED
sources: [S-TRAINED-KNOWLEDGE]
---

# Russian Style and Register Profile

Cụ thể hoá `naturalness-and-register.md` (ADR-016) cho tiếng Nga (baseline ru-RU).

## Profile metadata

```text
language: ru
baseline_variety: ru-RU
status: DRAFT (VALIDATED_NOT_YET_PROVEN — chưa FROZEN)
version: 0.1.0
reviewer: NOT_ASSIGNED
review_date: NOT_REVIEWED
provenance: S-TRAINED-KNOWLEDGE + PROJECT_OWNER_PRECEDENT (es B-02/B-03)
```

## Xưng hô

- `ты` — thân mật, số ít, chia ngôi 2 số ít (ты читаешь).
- `вы` — trang trọng (số ít) HOẶC số nhiều, chia ngôi 2 số nhiều (вы читаете);
  `Вы` viết hoa trong thư lịch sự.
- **Tên + phụ danh** (Иван Петрович) — dấu hiệu lịch sự Nga đặc trưng, thay
  "ông/bà".

Chức năng ty/вы giống es tú/usted. Dạy cả hai từ đầu.

## Politeness markers

`Здравствуйте` (chào trang trọng) / `Привет` (thân mật); `Будьте добры...`,
`Не могли бы вы...?` (điều kiện lịch sự), `Пожалуйста`, `Извините`.

## Register taxonomy (ADR-016)

| Mức | ru-RU |
|---|---|
| CASUAL | ты + từ thân mật (привет, пока) |
| NATURAL_NEUTRAL_POLITE | вы trung tính (baseline) |
| FORMAL | вы + tên-phụ danh + từ trang trọng |
| HONORIFIC | **not-applicable** (tiền lệ es B-02) |
| CEREMONIAL / SLANG | modifier trực giao, dùng khi nội dung yêu cầu |

## Trợ từ cuối câu

Not-applicable như hệ hình thái (khác ja ね/よ). Tiểu từ diễn ngôn (же, ведь,
ну, -то) thuộc từ vựng/ngữ dụng, không phải hệ trợ từ ngữ pháp.

## Ngôn ngữ dịch vụ / khách hàng

FORMAL mặc định: `вы` + tên-phụ danh, `Чем могу помочь?`, `Одну минуту,
пожалуйста`.

## Nói vs viết

Khẩu ngữ lược nhiều (ага, щас=сейчас), dùng же/ну. Viết chuẩn giữ đầy đủ. Dạy
chuẩn, chú thích khẩu ngữ.

## Unacceptable literal translations (nội-ngôn-ngữ)

- KHÔNG thêm mạo từ (tiếng Nga không có a/the).
- KHÔNG thêm "быть" hiện tại (*Я есть студент* sai → *Я студент*).
- Cặp bẫy theo ngôn ngữ khác → `rules/pairs/`, không ở đây (INV-1).

## Pedagogically controlled language

Baseline: hiện tại + quá khứ, ты/вы, 6 cách giới thiệu dần. Tránh phân từ
(причастие/деепричастие) phức, thể phụ thuộc phức ở trình độ đầu.

## Deterministic banned fixtures

- `Ты читаете` (sai — ты chia số ít) → FAIL.
- `Я есть студент` (thừa быть) → FAIL.
- `два стол` (sai cách sau số 2) → FAIL.

## Native-review fixtures

Xem `native-review-ru.md` (cặp thể, bảng cách, trọng âm, ты/вы tự nhiên).

## Unresolved decisions

- D-ru-01 baseline ru-RU — **owner chưa duyệt**.
- D-ru-02 chấm ё/е + dấu trọng âm — **owner chưa duyệt** (`answer_acceptance_ru` DRAFT).
- D-ru-03 hiển thị dấu trọng âm mặc định (reading aid) — **owner chưa duyệt**.

## Change log

- 0.1.0 (2026-07-19): Khởi tạo từ pipeline /build-language Bước 0–4. DRAFT.

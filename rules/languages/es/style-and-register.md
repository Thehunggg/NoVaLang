---
id: es/style-and-register
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: pragmatics.rules.json
depends_on: [es/grammar-and-usage]
sources: [S-RAE-VOSEO-SESEO, S-TRAINED-KNOWLEDGE]
reviewer: NOT_ASSIGNED
review_date: NOT_REVIEWED
---

# Spanish Style and Register Profile

Cụ thể hoá [`rules/content/naturalness-and-register.md`](../../content/naturalness-and-register.md)
theo [`ADR-016`](../../../docs/ai/ARCHITECTURE_DECISIONS.md#adr-016--multilingual-naturalness-and-register-architecture)
cho tiếng Tây Ban Nha.

## Profile metadata

```text
languageCode: es
status: DRAFT / PROJECT_OWNER_REVIEW_PENDING / NOT_FROZEN
version: 0.1.0
reviewer: NOT_ASSIGNED
reviewDate: NOT_REVIEWED
provenance: SECTION_LEVEL_REFERENCES_RECORDED
unresolvedDecisions: SEE "Unresolved decisions" SECTION BELOW
```

AI không được ghi là native reviewer. Profile này CHƯA native review.

## GIẢ ĐỊNH CẦN NGƯỜI DUYỆT B-01 — Dialect baseline

Tiếng Tây Ban Nha không có MỘT chuẩn phát âm/xưng hô duy nhất như ja/ko.
Khác biệt vùng miền lớn:

- **tú vs vos**: `vos` (voseo) thay `tú` ở Argentina/Uruguay/phần lớn Trung
  Mỹ, chia động từ RIÊNG. RAE xác nhận qua Diccionario panhispánico de dudas:
  voseo là "đặc trưng vùng", không phải chuẩn quốc tế chung.
- **vosotros vs ustedes**: Tây Ban Nha phân biệt `vosotros` (số nhiều thân
  mật) và `ustedes` (số nhiều trang trọng); Mỹ Latin CHỈ dùng `ustedes` cho
  cả hai.
- **seseo vs distinción**: Mỹ Latin + Canarias/Andalucía dùng seseo (c/z/s
  đều /s/); phần lớn Tây Ban Nha dùng distinción (c/z là /θ/, khác s).
  RAE: cả hai "được chấp nhận hoàn toàn trong chuẩn mực văn hoá".

**Đề xuất (chưa duyệt):** baseline trung tính quốc tế = tú + ustedes (không
vosotros, không voseo) — tương tự cách `en` đã chọn "General International
English/en-US". Lý do: tú được hiểu ở mọi vùng (kể cả vùng voseo); ustedes
phủ được cả Tây Ban Nha lẫn Mỹ Latin cho ngôi 2 số nhiều. Seseo/distinción
KHÔNG ảnh hưởng ngữ pháp/từ vựng dạy, chỉ ảnh hưởng phát âm/TTS locale —
đề xuất theo dataset đã có (WikiPron `la` = seseo) trừ khi owner muốn
Peninsular distinción.

**Câu hỏi cho owner, xem `review-checklist.md` B-01.**

## Normal neutral-polite register

Đề xuất: `NATURAL_NEUTRAL_POLITE` ~ `tú` chuẩn mực trung tính — mức mặc
định app dạy đầu tiên (song song đề xuất B-01).

## Casual register

`CASUAL` ~ `tú`/`vos` (nếu B-01 chọn vùng voseo) + từ vựng thân mật, rút
gọn. Chỉ dùng khi context xác nhận độ thân thiết.

## Formal register

`FORMAL` ~ `usted`, chia động từ như ngôi 3 số ít.

## Honorific modifier

Tiếng Tây Ban Nha **không có** hệ kính ngữ hình thái riêng biệt kiểu keigo
(ja) hay -시-/khiêm nhường ngữ (ko). Lịch sự thể hiện qua lựa chọn đại
từ/chia động từ (usted) và từ vựng, không phải một modifier trực giao
riêng — xem **GIẢ ĐỊNH CẦN NGƯỜI DUYỆT B-02** (cách xử lý trong taxonomy
6-mức khi ngôn ngữ không có modifier tương ứng).

## Ceremonial modifier

Chưa có inventory/fixture đã duyệt.

## Slang modifier

Chưa có inventory/fixture đã duyệt. Slang tiếng Tây Ban Nha khác biệt RẤT
lớn theo vùng (México/Argentina/Tây Ban Nha/Colombia...) — cần quyết định
vùng nào trước khi có thể bắt đầu, phụ thuộc trực tiếp vào B-01.

## Pronouns / forms of address

Xem GIẢ ĐỊNH B-01. `usted`/`ustedes` cho trang trọng; `tú`/`vos` cho thân
mật tuỳ vùng; `vosotros` chỉ Tây Ban Nha.

## Contraction behavior

`al` (a + el), `del` (de + el) là contraction BẮT BUỘC về chính tả (không
phải lựa chọn phong cách) — khác với contraction tuỳ chọn kiểu tiếng Anh
("don't" vs "do not"). Cần phân biệt rõ 2 loại này trong nội dung dạy —
UNRESOLVED, chưa có ví dụ cụ thể.

## Politeness markers

`por favor`, `gracias`, `disculpe`/`perdón` — chưa cross-check mức độ trang
trọng tương đối giữa các từ này.

## Sentence-final particles

NOT-APPLICABLE — tiếng Tây Ban Nha không có trợ từ cuối câu mang chức năng
ngữ dụng kiểu ね/よ (ja) hay hệ đuôi câu bắt buộc kiểu Hàn.

## Service / customer-facing language

Đề xuất: `usted` là chuẩn dịch vụ/khách hàng ở phần lớn vùng — CHƯA native
review.

## Written versus spoken differences

Chưa thu thập — UNRESOLVED.

## Unacceptable literal-translation patterns

Chưa thu thập — cần dữ liệu thật.

## Target-language content criteria

Giữ intended meaning, context, teaching objective, base register và
modifiers. Bắt buộc native review theo release gate (ADR-016).

## Natural translation and learner-support criteria

Primary translation truyền meaning/pragmatic intent tự nhiên.

## UI copy criteria

UI copy theo `uiLanguageCode`: ngắn, hiện đại, `NATURAL_NEUTRAL_POLITE`
(tú) — CHƯA có ví dụ cụ thể.

## Pedagogically controlled language

Cùng nguyên tắc đã áp cho ja/ko: giữ structure hơi không tự nhiên chỉ khi
exact form là approved teaching objective.

## QA fixtures and review evidence

Chưa có banned exact fixtures hay native-review fixtures thật.

## Unresolved decisions

- Dialect baseline (B-01) — ảnh hưởng TOÀN BỘ profile này.
- HONORIFIC-modifier mapping khi ngôn ngữ không có hệ tương ứng (B-02).
- Contraction bắt buộc vs tuỳ chọn — ví dụ cụ thể.
- Slang phụ thuộc B-01, chưa thể bắt đầu.
- Native reviewer chưa được chỉ định.

## Source / provenance

- Taxonomy/naturalness priority: ADR-016.
- voseo/seseo: `S-RAE-VOSEO-SESEO` (RAE Diccionario panhispánico de dudas,
  WebSearch snippet, D-51).

## Change log

- 2026-07-18 · v0.1.0 · Claude Code (build-language pipeline) · Tạo profile
  lần đầu, DRAFT, chưa native/owner review.

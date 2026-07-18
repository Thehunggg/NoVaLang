---
id: fr/style-and-register
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: pragmatics.rules.json
depends_on: [fr/grammar-and-usage]
sources: [S-TU-VOUS, S-TRAINED-KNOWLEDGE]
reviewer: NOT_ASSIGNED
review_date: NOT_REVIEWED
---

# French Style and Register Profile

Cụ thể hoá [`rules/content/naturalness-and-register.md`](../../content/naturalness-and-register.md)
theo [`ADR-016`](../../../docs/ai/ARCHITECTURE_DECISIONS.md#adr-016--multilingual-naturalness-and-register-architecture)
cho tiếng Pháp.

## Profile metadata

```text
languageCode: fr
status: DRAFT / PROJECT_OWNER_REVIEW_PENDING / NOT_FROZEN
version: 0.1.0
reviewer: NOT_ASSIGNED
reviewDate: NOT_REVIEWED
provenance: SECTION_LEVEL_REFERENCES_RECORDED
unresolvedDecisions: SEE "Unresolved decisions" SECTION BELOW
```

AI không được ghi là native reviewer. Profile này CHƯA native review.

## Normal neutral-polite register

Đề xuất: `NATURAL_NEUTRAL_POLITE` ~ `vous` chuẩn mực — mức mặc định app dạy
đầu tiên.

## Casual register

`CASUAL` ~ `tu` + từ vựng thân mật.

## Formal register

`FORMAL` ~ `vous` + đăng ký từ vựng trang trọng hơn. **GIẢ ĐỊNH CẦN NGƯỜI
DUYỆT C-01**: tiếng Pháp KHÔNG có đại từ riêng cho FORMAL khác
NATURAL_NEUTRAL_POLITE (cả hai đều dùng `vous`) — khác es (usted riêng biệt
tú). Cần quyết định cách phân biệt 2 mức này trong nội dung dạy khi ngữ
pháp không tự phân biệt.

## Honorific modifier

KHÔNG có hệ kính ngữ hình thái riêng biệt kiểu ja/ko hay usted của es —
lịch sự chỉ qua `vous` + từ vựng.

## Ceremonial modifier

Chưa có inventory/fixture đã duyệt.

## Slang modifier

Chưa có inventory/fixture đã duyệt.

## Pronouns / forms of address

`tu` (thân mật/bình đẳng) vs `vous` (lịch sự SỐ ÍT + ngôi 2 số nhiều bất kể
thân mật) — hệ 2 chiều đơn giản hơn es (không phân mảnh vosotros/ustedes).
Mặc định dùng `vous` khi không chắc.

**GIẢ ĐỊNH CẦN NGƯỜI DUYỆT C-03 (nhẹ hơn B-01 của es):** dialect baseline
— Pháp (métropolitain, `fr-FR`) vs Québécois (`fr-CA`, phát âm/từ vựng khác
biệt đáng kể, cách dùng `tu` cũng thoáng hơn trong một số ngữ cảnh Québec).
Không ảnh hưởng ngữ pháp cốt lõi (tu/vous, giống, chia động từ) như B-01
của es ảnh hưởng toàn bộ hệ xưng hô — chỉ ảnh hưởng phát âm/từ vựng/TTS
locale.

## Contraction behavior

Elision (`l'ami`) là chính tả BẮT BUỘC, không phải lựa chọn phong cách —
xem `orthography.md`. Contraction tuỳ chọn kiểu nói (`j'sais pas` thay `je
ne sais pas`) là văn nói thân mật, chưa có nguồn xác nhận mức độ chấp nhận.

## Politeness markers

`s'il vous plaît`, `merci`, `excusez-moi`/`pardon` — Académie française xác
nhận `s'il vous plaît` dùng liên tục từ thế kỷ 16. Chưa cross-check mức độ
trang trọng tương đối.

## Sentence-final particles

NOT-APPLICABLE — không có trợ từ cuối câu ngữ dụng kiểu ね/よ hay hệ đuôi
câu bắt buộc kiểu Hàn.

## Service / customer-facing language

Đề xuất: `vous` là chuẩn dịch vụ/khách hàng — CHƯA native review.

## Written versus spoken differences

`ne` trong phủ định kép (`ne...pas`) thường bị lược trong văn nói thân mật
(`je sais pas` thay `je ne sais pas`) nhưng BẮT BUỘC giữ trong văn viết —
chưa có ví dụ cụ thể cross-check.

## Unacceptable literal-translation patterns

Chưa thu thập.

## Target-language content criteria

Giữ intended meaning/context/teaching objective/register. Bắt buộc native
review theo release gate.

## Natural translation and learner-support criteria

Primary translation tự nhiên.

## UI copy criteria

`NATURAL_NEUTRAL_POLITE` (vous) — chưa có ví dụ cụ thể.

## Pedagogically controlled language

Cùng nguyên tắc đã áp cho ja/ko/es.

## QA fixtures and review evidence

Chưa có nội dung thật.

## Unresolved decisions

- Phân biệt FORMAL vs NATURAL_NEUTRAL_POLITE khi cả hai dùng `vous` (C-01).
- Dialect baseline Pháp vs Québécois (C-03).
- `ne` lược bỏ trong văn nói — mức độ chấp nhận trong nội dung dạy.
- Native reviewer chưa được chỉ định.

## Source / provenance

- Taxonomy/naturalness priority: ADR-016.
- tu/vous: `S-TU-VOUS` (WebSearch, D-51).

## Change log

- 2026-07-18 · v0.1.0 · Claude Code (build-language pipeline) · Tạo profile
  lần đầu, DRAFT, chưa native/owner review.

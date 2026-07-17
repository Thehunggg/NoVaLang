# Japanese Writing System

## Scope

File này quy định ranh giới representation của Japanese text. Nó không tự đặt
curriculum order, kanji level hay furigana threshold.

## Script roles

**Evidence: `JA-EV-WRITE-01`, `JA-EV-WRITE-02` —
`AUTHORITATIVE_SOURCE_BACKED`; expert review pending.**

- Japanese display có thể phối hợp kanji, hiragana và katakana theo orthography
  hiện đại; không transliterate toàn bộ thành romaji để thay target text.
- Hiragana biểu diễn kana reading, okurigana và nhiều grammatical elements.
- Katakana dùng cho các phạm vi được orthographic convention hỗ trợ, gồm nhiều
  loanwords; không tự chuyển proper noun hoặc learner text nếu chưa xác nhận.
- Kanji form, reading aid và translation là các lớp khác nhau.
- Latin characters chỉ dùng cho bounded brand/acronym/romanization contexts;
  capitalization thuộc Latin segment, không áp vào Japanese script.
- Arabic numerals, Japanese numerals, mixed-script words, names và loanwords
  phải giữ form đã được content authority phê duyệt; profile không tự convert.

## Symbols and presentation

**Evidence: `JA-EV-WRITE-03` — `AUTHORITATIVE_SOURCE_BACKED`.**

Japanese punctuation, iteration mark, prolonged sound mark, small kana và
full-width forms phải được giữ như dữ liệu có nghĩa; validator không được dùng
Latin whitespace/punctuation normalization làm mặc định. Line wrapping và
font rendering phải tôn trọng Japanese layout requirements.

## Display and internal normalization

Display normalization không được đổi spelling, reading, name, counter hoặc
loanword. Internal normalization chỉ được dùng khi consumer contract ghi rõ,
phải reversible/auditable và không overwrite canonical display. Full-width /
half-width conversion, whitespace folding và Unicode normalization cần exact
fixture trước khi dùng cho validation hoặc answer comparison.

**Evidence:** layout boundary `JA-EV-WRITE-03`; accepted normalization policy
is `UNRESOLVED` under `JA-EV-PEDAGOGY-02`.

## Field boundaries

**Evidence: `JA-EV-RUNTIME-01` — `EXISTING_CONFIRMED`.**

Canonical Japanese text không được thay bằng literal kana, pronunciation
reading, romanization hoặc translation. Mỗi consumer chọn đúng field theo vai
trò đã định nghĩa trong `language-profile.md`.

## Pedagogical presentation boundary

Furigana và romaji presentation follows `reading-system.md` and
`learning-and-pedagogy.md`: level-based romaji, unlearned/unmastered-kanji
furigana, and independent toggles. Kanji inventory/sequence remains curriculum
authority outside this documentation-only closure; this file does not invent a
kanji-per-level policy or infer one from a textbook.

**Evidence: `JA-EV-PEDAGOGY-02` — `PROJECT_OWNER_DECISION` for presentation;
`JA-EV-PEDAGOGY-01` for pedagogy framework.**

## Deterministic and exact-form boundary

Script membership, required-field presence và confirmed exact spelling có thể
deterministic. Choice giữa kana/kanji variants, name form hoặc learner-level
presentation cần content authority/expert review. Exact-form exercise chỉ được
khóa một writing form khi teaching objective và accepted alternatives đã được
ghi; file này không phải handwriting curriculum.

## Sources

- Agency for Cultural Affairs: Modern Kana Usage, Jōyō Kanji, Okurigana,
  Loanword Notation (links in Evidence Matrix).
- W3C: Japanese Layout Requirements.

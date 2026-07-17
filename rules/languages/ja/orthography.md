# Japanese Orthography

## Canonical orthographic baseline

**Evidence: `JA-EV-WRITE-01`, `JA-EV-WRITE-02` —
`AUTHORITATIVE_SOURCE_BACKED`.**

Content chuẩn bị release phải được kiểm tra đối với Modern Kana Usage và, khi
áp dụng, Jōyō Kanji, Okurigana và Loanword Notation của Agency for Cultural
Affairs. Đây là baseline biên tập; không có nghĩa mọi approved variant đều có
thể được chọn tự động không xét context hoặc teaching objective.

## Kana and particles

Orthographic particle spellings は, へ và を phải được giữ trong canonical
Japanese text và literal kana reading. Spoken values chỉ thuộc
`pronunciation.md`; không sửa orthography để phản ánh /wa/, /e/ hoặc /o/.

**Evidence: `JA-EV-WRITE-01` — `AUTHORITATIVE_SOURCE_BACKED`; field behavior
also `JA-EV-RUNTIME-01` — `EXISTING_CONFIRMED`.**

## Okurigana, variants and loanwords

- Không xóa hoặc đổi okurigana bằng normalization chung.
- Không giả định một glyph/variant là sai nếu official guidance cho phép
  variation; trường hợp ảnh hưởng nghĩa hoặc learner level cần editor review.
- Katakana loanword spelling phải được review theo official guidance và usage
  context; frequency corpus không tự cấp PASS.

**Evidence: `JA-EV-WRITE-02`, `JA-EV-CORPUS-01`.**

## Punctuation and spacing

Japanese punctuation và line-composition behavior không được thay bằng quy tắc
Latin. Normalization phải bảo toàn dấu câu trong exact-output fixtures trừ khi
spec của field đó quy định rõ transformation.

**Evidence: `JA-EV-WRITE-03` — `AUTHORITATIVE_SOURCE_BACKED`.**

## Numbers, dates, counters and names

Arabic/Japanese numerals, date form, counter spelling, proper noun và mixed
Latin-Japanese form phải theo approved source content. Pronunciation-dependent
counter/name readings chuyển sang `reading-system.md`; orthography không được
đoán reading từ surface form. UI compactness không cho phép đổi meaning hoặc
canonical spelling.

**Evidence classification:** structural boundary is `JA-EV-RUNTIME-01`;
accepted variants require `NEEDS_NATIVE_OR_EXPERT_REVIEW`.

## Modern, historical and width variants

Historical kana spelling chỉ dùng khi content purpose xác nhận. Full-width /
half-width và common standard alternatives không tự được coi tương đương hoặc
sai: mỗi normalization/accepted variant cần fixture và intended-use scope.

## Japanese output and UI orthography

Japanese translation output và Japanese UI đều theo modern orthographic
baseline, nhưng được review như hai surfaces khác nhau. Source-language spacing
hoặc punctuation không được làm authority cho Japanese output.

**Evidence: `JA-EV-WRITE-01`, `JA-EV-WRITE-03`, `JA-EV-NATURAL-01`.**

## Approved content override

Override chỉ hợp lệ khi ghi stable content location, reason, source/owner
decision, expected display/reading và reviewer. Override không thay global rule
và không được mở rộng qua similarity.

## Accepted-form policy

**Evidence: `JA-EV-PEDAGOGY-02` — `PROJECT_OWNER_DECISION`.**

- Nếu exercise không kiểm tra kanji, kana hoặc kanji đều được chấp nhận khi
  form đó đúng và phù hợp approved answer evidence.
- Nếu kanji là exact-form teaching objective, exercise có thể yêu cầu kanji.
- Punctuation, whitespace và full-width/half-width differences nhỏ được
  normalize/ignore; exact-form exercise có thể yêu cầu chính xác.
- Normalization không được đổi meaning, reading hoặc tạo accepted answer mới.
- Approved alternatives phải nằm trong fixture/allowlist; không tạo allowlist
  rộng bằng phán đoán AI.

## Validation ownership

Deterministic checks có thể phát hiện empty field, invalid field crossover và
fixture drift. Natural choice giữa accepted variants phải qua Japanese
linguist/editor; xem `validation.md`.

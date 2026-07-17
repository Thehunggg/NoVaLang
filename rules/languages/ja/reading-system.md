# Japanese Reading System

## Literal kana reading

**Evidence: `JA-EV-RUNTIME-01` — `EXISTING_CONFIRMED`.**

Literal kana reading là representation orthographic bằng kana. Nó phải giữ
particle spellings は, へ và を, không được đổi sớm thành わ, え hoặc お. Nó
không phải pronunciation reading và không phải TTS input mặc định.

## Pronunciation reading handoff

Pronunciation reading được tạo sau tokenization/POS analysis theo
`pronunciation.md`. Character-only substitution bị cấm vì cùng grapheme có thể
có vai trò lexical hoặc grammatical khác nhau. Ambiguity không được silently
gắn nhãn trusted.

**Evidence: `JA-EV-PARTICLE-01`, `JA-EV-RUNTIME-02` —
`EXISTING_CONFIRMED`.**

## Context-dependent readings

On/kun reading labels, names, counters, rendaku, jukujikun, ateji và multiple
readings là review domains; surface kanji alone không đủ chọn reading trusted.
Known analyzer/lexicon decision có thể deterministic only when exact repository
fixture exists. Otherwise fail loud or require approved content override and
Japanese expert review.

**Evidence classification:** fail-loud is `JA-EV-RUNTIME-02 —
EXISTING_CONFIRMED`; the reading choice is
`NEEDS_NATIVE_OR_EXPERT_REVIEW` unless separately sourced/tested.

## Reading aids

Furigana hoặc kana aid phải là presentation/support layer, không sửa canonical
Japanese text. Reading aid phải có liên kết rõ với span/token mà nó giải thích;
không dùng romanization như một bản thay thế vô điều kiện.

**Evidence classification: `NEEDS_NATIVE_OR_EXPERT_REVIEW`.** Cơ sở field
separation là `JA-EV-RUNTIME-01`; policy hiển thị theo learner level chưa được
quyết định.

Furigana span, multiple-reading choice, names/counters và accessibility output
phải preserve target text and remain inspectable. A reading aid không được coi
là evidence rằng learner phải được chấm theo một spelling duy nhất.

## Reading-aid policy

**Evidence: `JA-EV-PEDAGOGY-02` — `PROJECT_OWNER_DECISION`.**

- Furigana mặc định chỉ hiện cho kanji learner chưa học hoặc chưa thành thạo.
- Learner có thể bật toàn bộ furigana.
- Reading và romaji là hai toggle độc lập: reading only, romaji only, cả hai,
  hoặc không hiện cả hai, trong giới hạn level và Q14 policy.
- Basic: romaji hiện mặc định. Intermediate: romaji ẩn mặc định nhưng có thể
  bật. Advanced: romaji không hiển thị trừ approved exception.
- Reading aid không được thay canonical Japanese target text.

Accessibility exception phải được phê duyệt và ghi provenance; rule này không
tự sửa runtime hoặc curriculum.

## Consumer rules

- Display Japanese: Japanese text, với reading aid riêng khi policy cho phép.
- Pronunciation generation: literal reading + token/POS context.
- Romanization generation: pronunciation reading, không lấy literal kana làm
  nguồn trusted trực tiếp.
- TTS/audio: theo `tts-and-audio.md`, không đọc romanization.

## Deterministic versus expert review

Deterministic: field separation, exact confirmed fixture, script leakage và
fail-loud path. Expert/native: unconfirmed name/counter, rendaku, jukujikun,
ateji, regional reading, learner-aid appropriateness và accepted alternatives.

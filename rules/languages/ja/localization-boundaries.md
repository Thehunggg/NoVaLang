# Japanese Localization Boundaries

## Language ownership matrix

| Content type | Language authority | Notes |
|---|---|---|
| App chrome, buttons, errors, loading | `uiLanguageCode` | No silent English fallback for vi/ja |
| Learner-support meaning/translation | `nativeLanguageCode` or approved support locale | Must not overwrite target text |
| Grammar explanation/hint/feedback | selected support/UI contract | Must have locale parity before release |
| Furigana | Japanese reading-aid authority | Presentation layer, not replacement target |
| Pronunciation reading | Japanese pronunciation authority | Contextual; separate from literal reading |
| Literal gloss | selected support language | Not primary natural translation |
| Japanese target sentence/dialogue | learning language `ja` | Not a UI-language leak |
| Literal kana/pronunciation reading | Japanese profile | Not translated UI copy |
| Romanization | Japanese learner-aid field | Never translation or TTS |
| Audio/TTS | approved Japanese speech field | Native script, not romaji |

**Evidence: `JA-EV-I18N-01` and `JA-EV-NATURAL-01` —
`PROJECT_OWNER_DECISION`; field separation `JA-EV-RUNTIME-01`.**

## Supported role coverage

- **Learning language:** Japanese owns target text, readings, pronunciation,
  romaji aid and Japanese audio.
- **Native/support language:** Japanese owns natural explanation, hint,
  feedback and translation only when Japanese is the selected support locale.
- **UI language:** Japanese owns app chrome only when `uiLanguageCode == ja`.
- **Source translation language:** Japanese owns source linguistic facts;
  destination profile owns output wording.
- **Output translation language:** Japanese owns natural output grammar,
  orthography, register, omission and address choices.
- **TTS/audio language:** Japanese owns native-script speech fields and locale
  metadata; romanization is excluded.

## UI language purity

Mọi user-facing app chrome dùng selected UI language. Nếu app chưa tách UI
language, default lấy từ native language theo project rule. Missing key phải
validator/test fail hoặc hiển thị development sentinel; không cross-language
fallback. Approved brands, proper nouns, exam names và technical acronyms là
exception hẹp, không phải allowlist chung.

## Natural translation boundary

Primary learner-support translation phải tự nhiên trong support language và
giữ pragmatic intent. Word-for-word structure nằm ở literal gloss/field tương
đương nếu schema đã phê duyệt; profile này không đổi schema.

## Japanese output review

Japanese UI copy, Japanese learner support và Japanese target-language content
là ba review surfaces khác nhau. Cùng một string không tự được tái sử dụng giữa
chúng nếu purpose/register khác nhau.

Owner-approved product style:

- Japanese UI: concise, modern, neutral-polite; direct labels such as `戻る`
  and `続ける`; full です／ます sentences are not mandatory for every button.
- Japanese grammar explanation, hint and feedback: clear, friendly
  です／ます.
- Japanese learning text and support text never replace one another.

**Evidence: `JA-EV-OWNER-05` — `PROJECT_OWNER_DECISION`; actual wording remains
native/pedagogy review gated.**

## Reading and romaji controls

Reading and romaji have independent toggles, allowing reading only, romaji
only, both, or neither within level/Q14 limits. Q14 romaji is hidden by default
and user-toggle available in documentation policy; Golden/runtime remain
pending Change Control and unchanged by this task.

**Evidence: `JA-EV-PEDAGOGY-02` — `PROJECT_OWNER_DECISION`.**

## Translation direction authority

- From Japanese: Japanese profile owns source reading/grammar/register facts;
  destination profile owns natural output wording.
- Into Japanese: source profile owns intended meaning; Japanese profile owns
  output grammar, orthography, omission, address, register and naturalness.
- No pair-specific example becomes a global ban, and no direction duplicates
  canonical authority from the other language profile.

Do not guess subject, pronoun, gender, address or keigo relation absent from
context. Do not copy source-language word order into unnatural Japanese or
flatten meaningful keigo.

## Missing field behavior

Không được dùng English để lấp missing Japanese UI key, dùng romanization để
lấp Japanese text, hoặc dùng target Japanese để lấp native-language support.
Required field missing phải fail validation theo release context.

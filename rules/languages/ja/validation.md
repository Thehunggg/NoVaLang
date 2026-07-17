# Japanese Validation

## Canonical QA states

- `LANGUAGE_STYLE_PROFILE_NOT_IMPLEMENTED`
- `FAIL_DETERMINISTIC`
- `NEEDS_NATIVE_STYLE_REVIEW`
- `PASS`

`PASS` chỉ hợp lệ khi profile đã approved, deterministic checks pass, required
review gate pass hoặc có Project Owner waiver ghi rõ, context/teaching objective
được kiểm tra, và result gắn với profile version + content revision. Japanese
Full Profile đã được Project Owner `APPROVED / FROZEN` với native expert review
`WAIVED / NOT_COMPLETED`. Waiver đóng profile nhưng không tự động cấp PASS cho
content/fixture tương lai vẫn yêu cầu native review riêng.

**Evidence: `JA-EV-QA-01` — `PROJECT_OWNER_DECISION`.**

## Product-policy state versus linguistic state

```text
Japanese full-profile architecture: APPROVED / FROZEN
Japanese product policy: APPROVED / FROZEN
Project Owner decisions: 20/20 APPROVED
Project Owner closure review: COMPLETED
Japanese linguistic profile: APPROVED / FROZEN / CLOSED
Q14 documentation policy: UPDATED
Q14 generated romaji/runtime implementation: PASS
Q14 Android/Web manual verification: PASS
Project Owner review: COMPLETED
Android font A/B diagnostic: WAIVED_DUE_TO_EMULATOR_ENVIRONMENT
Project Owner Android visual review: COMPLETED
Japanese punctuation typography: ACCEPTED_AS_FONT_DESIGN
Native expert review: WAIVED / NOT_COMPLETED
Owner accepted with native review waiver: YES
Pitch accent: OUT_OF_SCOPE / PENDING_EXPERT_REVIEW
```

Project Owner final closure grants full-profile approval/freeze and accepts
Q14 runtime review. It does not claim native expert review was completed and
does not implement pitch accent.

Architecture, product policy, and full linguistic profile are approved and
frozen by Project Owner. Native expert review is explicitly `WAIVED /
NOT_COMPLETED`; pitch accent remains `OUT_OF_SCOPE /
PENDING_EXPERT_REVIEW`.

## Deterministic gates

**Evidence: `JA-EV-RUNTIME-01`, `JA-EV-RUNTIME-02`, `JA-EV-ROMAJI-01` —
`EXISTING_CONFIRMED`.**

Các check có thể deterministic:

- required fields non-null/non-empty và không cross field/language;
- literal kana giữ orthographic particle form;
- romanization không chứa raw kana;
- exact fixtures cho spacing, macrons, particles, っ, 拗音, ん, punctuation,
  names, numbers/counters;
- tokenizer/dictionary/unknown ambiguity fail loud;
- TTS không nhận romanization;
- generated/shared/Flutter asset parity khi task runtime yêu cầu;
- internal links, metadata, status và evidence references hợp lệ.
- required 16-file coverage and non-empty substantive sections;
- locale mismatch, cross-language fallback and script/reading/romaji leakage;
- invalid particle conversion, approved orthography/exact-form fixture drift;
- missing pedagogical intent where an exception/exact form requires it;
- context-bound banned fixture and draft-profile content incorrectly marked PASS.
- level-specific romaji visibility and independent reading/romaji controls;
- Q14 documentation policy versus pending Golden/runtime implementation;
- kana/kanji acceptance unless kanji is an exact-form objective;
- minor punctuation/whitespace/full-width/half-width normalization boundaries;
- pre-approved meaning-equivalent variants and open-answer escalation;
- typo classification without PASS and context-aware register outcome;
- unlimited replay, `1.0x`/`0.75x`, no autoplay and audio-source priority;
- no cross-locale/voice fallback;
- Standard Japanese baseline and source/context/allowlist regional acceptance;
- exact owner-approved romanization forms including `Takahashi-san`.

## Expert/native gates

Natural usage, register, keigo, pronouns/address, accepted variants, open
answers, translation naturalness và pedagogy adaptation không được cấp PASS
bằng LLM score, frequency, translation similarity hoặc heuristic. Chuyển
`NEEDS_NATIVE_STYLE_REVIEW` với context, objective, candidate và provenance.

Review scope also includes ceremonial/slang, translation into/from Japanese,
Japanese UI tone, Japanese learner-support explanations, pitch-accent or
pronunciation uncertainty, and pedagogy quality.

Where a future content/release task requires it, native/expert review
prioritizes naturalness, keigo, Japanese UI/support,
bidirectional translation, ceremonial/slang, accepted variants and high-risk
fixtures. Linguistic facts already backed by official authority may be reviewed
by sampling. Sampling does not waive deterministic validation or expand an
approved variant beyond its source/context.

**Evidence: `JA-EV-OWNER-05` — `PROJECT_OWNER_DECISION`.**

**Evidence: `JA-EV-STYLE-02`, `JA-EV-CORPUS-01`.**

## Unresolved gates

Không còn Japanese product-policy question nào trong closure scope chưa được
trả lời. Native/expert review was waived, not completed, for this profile
closure. Future content review remains required where its release gate calls
for naturalness, keigo, Japanese UI/support realization, bidirectional
translation, ceremonial/slang, accepted variants, or risk fixtures. Runtime
work is complete only where the Project Owner explicitly marked it PASS.

## Release review coverage

Global rule yêu cầu Golden Lesson và release-critical content native review
100%; batch lớn theo risk sampling. Nếu sample cho thấy lỗi hệ thống, mở rộng
toàn batch. Project Owner waiver đóng profile này nhưng không thay thế review
gate của một future content revision.

## Prohibited false PASS

- Kana-free romaji nhưng spacing/macron sai.
- Corpus-common form nhưng context/register sai.
- Test fixture bị bỏ assertion hoặc đổi expected để hợp implementation.
- UI không crash nhưng silent cross-language fallback.
- AI tự nhận là native/linguist/pedagogy reviewer.

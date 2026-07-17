# Japanese Rule Change Log

## 2026-07-17 — Japanese Full Profile final closure

```text
NOVALANG-JAPANESE-FULL-PROFILE-FINAL-CLOSURE-01: CLOSED
Q14_ROMAJI_POLICY_IMPLEMENTATION: PASS
ANDROID_MANUAL_VERIFICATION: PASS
WEB_MANUAL_VERIFICATION: PASS
PROJECT_OWNER_REVIEW: COMPLETED
ANDROID_FONT_A_B_DIAGNOSTIC: WAIVED_DUE_TO_EMULATOR_ENVIRONMENT
PROJECT_OWNER_ANDROID_VISUAL_REVIEW: COMPLETED
JAPANESE_PUNCTUATION_TYPOGRAPHY: ACCEPTED_AS_FONT_DESIGN
NATIVE_EXPERT_REVIEW: WAIVED / NOT_COMPLETED
OWNER_ACCEPTED_WITH_NATIVE_REVIEW_WAIVER: YES
PITCH_ACCENT: OUT_OF_SCOPE / PENDING_EXPERT_REVIEW
JAPANESE_FULL_LINGUISTIC_PROFILE: APPROVED / FROZEN
JAPANESE_FULL_PROFILE: CLOSED / FROZEN
JAPANESE_FINAL_CLOSURE_TASK: CLOSED
commit: NO
push: NO
```

Project Owner completed final review and accepted the Android font A/B
diagnostic waiver caused by the emulator environment. The waiver is not an
Android A/B PASS and is not native expert review completion. Pitch accent
remains unimplemented and outside scope. This entry changes documentation and
status only; curriculum, schema, generated content, Flutter/runtime, and the
pronunciation/romanization pipeline were not changed.

## 2026-07-17 — Q14 generated romanization implementation

```text
NOVALANG-JA-Q14-ROMAJI-PIPELINE-UNBLOCK-01: CLOSED / 14_OF_14_PASS
Q14_SCHEMA_EXTENSION: IMPLEMENTED
Q14_ROMANIZATION_PIPELINE: IMPLEMENTED
Q14_GENERATED_DATA: IMPLEMENTED
Q14_ROMAJI_POLICY_IMPLEMENTATION_AT_ENTRY: IMPLEMENTED / REVIEW_GATE_OPEN
ANDROID_MANUAL_VERIFICATION_AT_ENTRY: REVIEW_GATE_OPEN
WEB_MANUAL_VERIFICATION_AT_ENTRY: REVIEW_GATE_OPEN
PROJECT_OWNER_FINAL_REVIEW_AT_ENTRY: REVIEW_GATE_OPEN
JAPANESE_FULL_PROFILE_AT_ENTRY: OPEN
NATIVE_EXPERT_REVIEW: WAIVED / NOT_COMPLETED
OWNER_ACCEPTED_WITH_NATIVE_REVIEW_WAIVER: YES
PITCH_ACCENT: OUT_OF_SCOPE / PENDING_EXPERT_REVIEW
commit: NO
push: NO
```

The approved exact lexical override `スマホ → すまほ → sumaho` and the
already-frozen systemic macron, spacing, particle, capitalization, and
name-suffix rules produced exact canonical output for all 14 Q14 lines. The
generated field is optional in the backwards-compatible Flutter model, but is
required and validated for every Golden Q14 dialogue line. This entry does not
close or freeze the full Japanese linguistic profile.

## 2026-07-17 — Project Owner policy closure approval

```text
JAPANESE_FULL_PROFILE_ARCHITECTURE: APPROVED / FROZEN
JAPANESE_PRODUCT_POLICY: APPROVED / FROZEN
PROJECT_OWNER_DECISIONS: 20/20 APPROVED
NOVALANG-JAPANESE-FULL-PROFILE-OWNER-DECISIONS-CLOSURE-01: CLOSED
productPolicyStatus: APPROVED / FROZEN
projectOwnerClosureReview: COMPLETED
fullProfileStatusAtEntry: HISTORICAL_PRE_FINAL_CLOSURE
nativeExpertReviewAtEntry: HISTORICAL_REVIEW_GATE_OPEN
pitchAccent: OUT_OF_SCOPE / PENDING_EXPERT_REVIEW
Q14_ROMAJI_POLICY_IMPLEMENTATION_AT_ENTRY: CHANGE_CONTROL_NOT_STARTED
GOLDEN_LESSON_IMPLEMENTATION: PENDING_CHANGE_CONTROL
RUNTIME_IMPLEMENTATION: NOT_CHANGED
commit: NO
push: NO
```

This approval freezes Japanese Full Profile architecture and the 20/20 product
policy decisions only. It does not freeze the full linguistic profile, complete
native/expert review, add pitch-accent data, or implement Q14/Golden/runtime
changes.

## 2026-07-17 — Owner decisions closure documentation

```text
taskId: NOVALANG-JAPANESE-FULL-PROFILE-OWNER-DECISIONS-CLOSURE-01
profileVersion: 0.2.0-draft
productPolicyCoverage: 20/20
productPolicyStatusAtDocumentationCompletion: DOCUMENTED / SUBSEQUENTLY_APPROVED_AND_FROZEN
nativeExpertReviewAtEntry: HISTORICAL_REVIEW_GATE_OPEN
fullProfileStatusAtEntry: HISTORICAL_PRE_FINAL_CLOSURE
DOCUMENTATION_POLICY: UPDATED
Q14_ROMAJI_POLICY: HIDDEN_BY_DEFAULT / USER_TOGGLE_AVAILABLE
Q14_ROMAJI_POLICY_IMPLEMENTATION_AT_ENTRY: CHANGE_CONTROL_NOT_STARTED
GOLDEN_LESSON_IMPLEMENTATION: PENDING_CHANGE_CONTROL
RUNTIME_IMPLEMENTATION: NOT_CHANGED
pronunciationImplementation: NOT_CHANGED
commit: NO
push: NO
```

Recorded decisions cover level-based romaji, furigana, independent reading/
romaji toggles, Q14 policy, kana/kanji and normalization boundaries,
pre-approved meaning variants/open escalation, typo/register outcomes, audio
playback/source priority, Standard Japanese/regional allowlist, exact romaji
forms, Japanese UI/support style, pitch-accent exclusion, ceremonial/slang,
freeze separation and native/expert review scope. No product-policy question
within this Japanese closure scope remains unanswered.

## 2026-07-17 — Full profile draft 0.2.0

```text
taskId: NOVALANG-JAPANESE-FULL-LANGUAGE-PROFILE-01
profileVersion: 0.2.0-draft
filesCreated: grammar-and-usage.md, learning-and-pedagogy.md
reviewer: NOT_ASSIGNED
reviewDate: NOT_REVIEWED
ProjectOwnerReview: PENDING
pronunciationSubsystem: CONFIRMED_IMPLEMENTATION / RUNTIME_REVIEW_PENDING
fullProfileStatusAtEntry: HISTORICAL_PRE_FINAL_CLOSURE
```

- Hoàn thiện architecture 16 file và thêm `grammar-and-usage.md`,
  `learning-and-pedagogy.md`.
- Thêm Evidence Matrix với năm evidence types; mỗi normative section dẫn mã
  evidence và unsupported product policy được đánh dấu `UNRESOLVED`.
- Bổ sung official provenance từ Agency for Cultural Affairs, Japan Foundation,
  W3C và NINJAL; không dùng corpus để tự cấp PASS.
- Giữ nguyên confirmed pronunciation/romanization pipeline, exact outputs,
  kuromoji/IPADIC và fail-loud behavior.
- Không sửa curriculum, translation, schema, assets hoặc runtime code.
- Full profile ở historical pre-final-closure checkpoint; reviewer
  `NOT_ASSIGNED`, native/expert review had not been completed.

## 2026-07-16 — Directory canonicalization

Detailed Japanese rules được chuyển từ generic Cursor rule vào canonical
directory này. Không thay pronunciation algorithm, curriculum data, Flutter
code, plan, ads hoặc SRS behavior.

## 2026-07-16 — Historical correction

`IMPLEMENTATION_REQUIRES_ROMANIZATION_CORRECTION` chỉ ghi rejected round-1
character-level/lexical-exception design. Confirmed replacement là token/POS
`kuromoji` implementation. Historical status không phải current profile state
và không cho phép tự thay algorithm.

## Current state

```text
JAPANESE_LANGUAGE_PROFILE_EXISTS
JAPANESE_FULL_PROFILE_ARCHITECTURE: APPROVED / FROZEN
JAPANESE_PRODUCT_POLICY: APPROVED / FROZEN
PROJECT_OWNER_DECISIONS: 20/20 APPROVED
Q14_ROMAJI_POLICY_IMPLEMENTATION: PASS
ANDROID_MANUAL_VERIFICATION: PASS
WEB_MANUAL_VERIFICATION: PASS
PROJECT_OWNER_REVIEW: COMPLETED
ANDROID_FONT_A_B_DIAGNOSTIC: WAIVED_DUE_TO_EMULATOR_ENVIRONMENT
PROJECT_OWNER_ANDROID_VISUAL_REVIEW: COMPLETED
JAPANESE_PUNCTUATION_TYPOGRAPHY: ACCEPTED_AS_FONT_DESIGN
NATIVE_EXPERT_REVIEW: WAIVED / NOT_COMPLETED
OWNER_ACCEPTED_WITH_NATIVE_REVIEW_WAIVER: YES
PITCH_ACCENT: OUT_OF_SCOPE / PENDING_EXPERT_REVIEW
JAPANESE_FULL_LINGUISTIC_PROFILE: APPROVED / FROZEN
JAPANESE_FULL_PROFILE: CLOSED / FROZEN
JAPANESE_FINAL_CLOSURE_TASK: CLOSED
```

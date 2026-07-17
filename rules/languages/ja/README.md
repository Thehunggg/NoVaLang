# Japanese Full Language Profile

Thư mục này là nguồn canonical chi tiết cho rule tiếng Nhật của NovaLang.
Gateway chung tại `.cursor/rules/05_novalang_pronunciation_profiles.mdc` và
`rules/languages/README.md` chỉ được liên kết tới đây, không lặp lại chi tiết.

## Profile state

```text
languageCode: ja
profileVersion: 0.2.0-draft
status: APPROVED / FROZEN
reviewer: NOT_ASSIGNED
reviewDate: NOT_REVIEWED
nativeExpertReview: WAIVED / NOT_COMPLETED
architectureStatus: APPROVED / FROZEN
productPolicyStatus: APPROVED / FROZEN
projectOwnerDecisions: 20/20 APPROVED
projectOwnerClosureReview: COMPLETED
fullProfileStatus: APPROVED / FROZEN / CLOSED
pitchAccent: OUT_OF_SCOPE / PENDING_EXPERT_REVIEW
projectOwnerReview: COMPLETED
ownerAcceptedWithNativeReviewWaiver: YES
```

`pronunciation.md` và `romanization.md` mô tả subsystem đã có
implementation/test xác nhận và Project Owner runtime review `PASS`. Full
Language Profile đã được Project Owner đóng và freeze; native expert review
được waive nhưng không được ghi là completed.

## Owner policy closure state

20/20 Japanese product-policy groups đã được Project Owner phê duyệt.
Architecture, product policy và full linguistic profile là `APPROVED /
FROZEN`. Native/expert linguistic review là `WAIVED / NOT_COMPLETED`; pitch
accent vẫn ngoài phạm vi và pending expert review.

```text
DOCUMENTATION_POLICY: UPDATED
Q14_ROMAJI_POLICY: HIDDEN_BY_DEFAULT / USER_TOGGLE_AVAILABLE
GOLDEN_LESSON_IMPLEMENTATION: PENDING_CHANGE_CONTROL
Q14_ROMAJI_POLICY_IMPLEMENTATION: PASS
ANDROID_MANUAL_VERIFICATION: PASS
WEB_MANUAL_VERIFICATION: PASS
PROJECT_OWNER_REVIEW: COMPLETED
ANDROID_FONT_A_B_DIAGNOSTIC: WAIVED_DUE_TO_EMULATOR_ENVIRONMENT
PROJECT_OWNER_ANDROID_VISUAL_REVIEW: COMPLETED
JAPANESE_PUNCTUATION_TYPOGRAPHY: ACCEPTED_AS_FONT_DESIGN
JAPANESE_FULL_LINGUISTIC_PROFILE: APPROVED / FROZEN
JAPANESE_FULL_PROFILE: CLOSED / FROZEN
JAPANESE_FINAL_CLOSURE_TASK: CLOSED
NATIVE_EXPERT_REVIEW: WAIVED / NOT_COMPLETED
OWNER_ACCEPTED_WITH_NATIVE_REVIEW_WAIVER: YES
PITCH_ACCENT: OUT_OF_SCOPE / PENDING_EXPERT_REVIEW
RUNTIME_IMPLEMENTATION: CHANGED_BY_APPROVED_Q14_CHANGE_CONTROL
```

## Canonical files and authority

| File | Canonical responsibility |
|---|---|
| `language-profile.md` | Metadata, authority map, dependency map và Evidence Matrix |
| `writing-system.md` | Vai trò của kanji, hiragana, katakana và ký hiệu |
| `orthography.md` | Chính tả, kana, okurigana, loanword và presentation form |
| `reading-system.md` | Literal kana reading, reading aid và ranh giới với pronunciation |
| `pronunciation.md` | Token/POS pronunciation reading và failure behavior |
| `romanization.md` | Modified Hepburn, output policy và exact fixtures |
| `grammar-and-usage.md` | Grammar/usage scope, context và expert-review boundaries |
| `grammar-particles.md` | Narrow particle classification for pronunciation/romanization |
| `learning-and-pedagogy.md` | JF Can-do framework và NovaLang product-policy gaps |
| `style-and-register.md` | Naturalness, register, modifiers và review requirements |
| `tts-and-audio.md` | TTS input authority, audio metadata và unresolved product policy |
| `localization-boundaries.md` | UI, support, target text, reading và translation boundaries |
| `validation.md` | QA states, deterministic gates và expert-review gates |
| `test-fixtures.md` | Confirmed fixtures và proposed review fixtures |
| `change-log.md` | Lịch sử thay đổi và trạng thái quyết định |

## Reading order

1. `language-profile.md` và Evidence Matrix.
2. File chuyên môn tương ứng.
3. `validation.md` và `test-fixtures.md` trước khi cấp trạng thái QA.
4. `change-log.md` để kiểm tra lịch sử và unresolved decisions.

## Evidence gate

Mọi claim normative phải trỏ tới một mã `JA-EV-*` trong
`language-profile.md` và thuộc đúng một loại:

- `EXISTING_CONFIRMED`
- `AUTHORITATIVE_SOURCE_BACKED`
- `PROJECT_OWNER_DECISION`
- `NEEDS_NATIVE_OR_EXPERT_REVIEW`
- `UNRESOLVED`

Chỉ ba loại đầu được dùng làm rule bắt buộc. Hai loại cuối là review gate hoặc
khoảng trống, không phải canonical linguistic truth. AI không phải native,
linguist hoặc Japanese-pedagogy reviewer.

## Scope protection

Profile này không tự sửa curriculum, lesson content, translation, schema,
generated assets, Flutter/React code, tokenizer, dictionary hay confirmed
romanization output. Thay đổi các vùng đó cần task và validation riêng.

# Japanese Language Profile

## Metadata

```text
languageCode: ja
profileVersion: 0.2.0-draft
status: APPROVED / FROZEN
reviewer: NOT_ASSIGNED
reviewDate: NOT_REVIEWED
provenance: SECTION_SCOPED
nativeExpertReview: WAIVED / NOT_COMPLETED
architectureStatus: APPROVED / FROZEN
productPolicyStatus: APPROVED / FROZEN
projectOwnerDecisions: 20/20 APPROVED
projectOwnerClosureReview: COMPLETED
fullProfileStatus: APPROVED / FROZEN / CLOSED
pitchAccent: OUT_OF_SCOPE / PENDING_EXPERT_REVIEW
Q14_ROMAJI_POLICY_IMPLEMENTATION: PASS
GOLDEN_LESSON_IMPLEMENTATION: PENDING_CHANGE_CONTROL
RUNTIME_IMPLEMENTATION: CHANGED_BY_APPROVED_Q14_CHANGE_CONTROL
projectOwnerReview: COMPLETED
androidManualVerification: PASS
webManualVerification: PASS
androidFontABDiagnostic: WAIVED_DUE_TO_EMULATOR_ENVIRONMENT
projectOwnerAndroidVisualReview: COMPLETED
japanesePunctuationTypography: ACCEPTED_AS_FONT_DESIGN
ownerAcceptedWithNativeReviewWaiver: YES
```

Profile này tổng hợp rule viết, đọc, pronunciation, romanization, grammar,
usage, pedagogy, style, TTS/audio, localization và validation. Nó không tuyên
bố native review đã hoàn thành.

## Language identity

```text
canonicalName: Japanese
autonym: 日本語
supportedScripts: Han, Hiragana, Katakana, Latin (bounded), Arabic numerals
localeIdentifiers: ja, ja-JP
defaultContentLocale: ja-JP
directionality: LTR
regionalBaseline: standard modern Japanese
regionalVariation: APPROVED_ALLOWLIST_ONLY
spokenWrittenBoundary: EXPLICIT_CONTEXT_REQUIRED
registerModel: ADR-016
```

`ja-JP` và Standard Japanese là baseline. Dialect chỉ xuất hiện khi context
hoặc lesson ghi rõ. Regional variant chỉ được chấp nhận khi có nguồn, context
và nằm trong allowlist đã được Project Owner duyệt; không tự lập allowlist.

**Evidence: `JA-EV-OWNER-04` — `PROJECT_OWNER_DECISION`.**

## Six supported roles

| Role | Japanese ownership |
|---|---|
| Learning language | Target text, reading, pronunciation, romanization and Japanese audio |
| Native/support language | Natural Japanese explanation/translation when Japanese is selected support language |
| UI language | Japanese app chrome when `uiLanguageCode == ja` |
| Source translation language | Preserve source meaning/context; source order is not Japanese output authority |
| Output translation language | Natural Japanese output with reconstructed register and no guessed persona |
| TTS/audio language | Native-script Japanese speech fields and `ja-JP` metadata baseline |

Role boundaries are governed by `JA-EV-I18N-01` and `JA-EV-NATURAL-01`.

## Authority and dependency map

Thứ tự áp dụng:

1. Frozen specification và Project Owner decision đã ghi nhận.
2. Confirmed repository implementation, test và fixture trong đúng subsystem.
3. Nguồn chính thức/nghiên cứu gốc trong Evidence Matrix.
4. Claim cần native/expert review.
5. Unresolved gap; không được dùng làm rule bắt buộc.

`writing-system.md` -> `orthography.md` -> `reading-system.md` ->
`pronunciation.md` -> `romanization.md` là chuỗi field transformation. Không
file nào được làm mất five-field separation. `grammar-particles.md` chỉ cấp
token/POS decision cho pronunciation; `grammar-and-usage.md` không thay thế
tokenizer. `learning-and-pedagogy.md` không tự đặt product thresholds.

## Subsystem status matrix

| Subsystem | Current status | Authority |
|---|---|---|
| Pronunciation implementation | PASS / PROJECT_OWNER_REVIEW_COMPLETED | repository generator/tests |
| Romanization implementation | PASS / PROJECT_OWNER_REVIEW_COMPLETED | repository exact fixtures |
| Writing/orthography | APPROVED / FROZEN_WITH_EXPERT_REVIEW_WAIVER | official sources + Project Owner closure |
| Grammar/usage | APPROVED / FROZEN_WITH_EXPERT_REVIEW_WAIVER | JF framework + Project Owner closure |
| Learning/pedagogy | PRODUCT_POLICY_APPROVED_FROZEN / ADAPTATION_REVIEW_PENDING | JF/Irodori + owner decisions |
| Style/register | APPROVED / FROZEN_WITH_NATIVE_REVIEW_WAIVER | ADR-016 + Project Owner closure |
| Localization boundaries | PRODUCT_RULE_CONFIRMED / RUNTIME_VALIDATION_REQUIRED | AGENTS/owner decisions |
| TTS/audio policy | PRODUCT_POLICY_APPROVED_FROZEN / RUNTIME_IMPLEMENTATION_NOT_CHANGED | repository boundary + owner decisions |
| Full profile | APPROVED / FROZEN / CLOSED | Project Owner final review with native-expert-review waiver |

## Unresolved decisions

Không còn Japanese product-policy question nào trong closure scope chưa được
trả lời. Q14/toggle implementation và Project Owner Android/Web review đã
`PASS`. Native/expert reviewer assignment và review không được thực hiện;
Project Owner đã chấp nhận closure với `WAIVED / NOT_COMPLETED`. Pitch accent
và mọi dữ liệu cần expert authority vẫn `OUT_OF_SCOPE /
PENDING_EXPERT_REVIEW`; waiver không biến chúng thành implemented.

## Project Owner decision register — 20/20

| # | Closed product-policy decision | Canonical detail | Evidence |
|---|---|---|---|
| 1 | Romaji: Basic shown; Intermediate hidden/toggle; Advanced exception-only | `romanization.md`, `learning-and-pedagogy.md` | JA-EV-PEDAGOGY-02 |
| 2 | Furigana defaults to unlearned/unmastered kanji; learner may show all | `reading-system.md` | JA-EV-PEDAGOGY-02 |
| 3 | Q14 romaji hidden by default and toggleable at A0–B1; implemented and Project Owner runtime reviewed | `romanization.md` | JA-EV-PEDAGOGY-02 |
| 4 | Reading and romaji are independent toggles | `reading-system.md`, `localization-boundaries.md` | JA-EV-PEDAGOGY-02 |
| 5 | Kana/kanji accepted unless kanji is exact-form objective | `orthography.md`, `grammar-and-usage.md` | JA-EV-PEDAGOGY-02 |
| 6 | Minor punctuation/whitespace/width differences normalized unless exact form | `orthography.md` | JA-EV-PEDAGOGY-02 |
| 7 | Only pre-approved meaning variants auto-pass; uncertain open answers escalate | `learning-and-pedagogy.md` | JA-EV-PEDAGOGY-02 |
| 8 | Minor typo is not PASS; classify and give light feedback | `learning-and-pedagogy.md` | JA-EV-PEDAGOGY-02 |
| 9 | Register mismatch fails only for objective/situational inappropriateness; otherwise warning | `learning-and-pedagogy.md` | JA-EV-PEDAGOGY-02 |
| 10 | Unlimited replay; 1.0x standard; 0.75x slow; no card-open autoplay | `tts-and-audio.md` | JA-EV-OWNER-03 |
| 11 | Approved audio → correct-locale TTS → explicit error; no silent cross-locale fallback | `tts-and-audio.md` | JA-EV-OWNER-03 |
| 12 | Standard Japanese baseline; dialect only in explicit context/lesson | `language-profile.md`, `pronunciation.md` | JA-EV-OWNER-04 |
| 13 | Regional variant requires source, context and approved allowlist | `language-profile.md`, `pronunciation.md` | JA-EV-OWNER-04 |
| 14 | `desu`, `kochira koso`, `sayōnara`, default `Nihon`, contextual `Nippon`, `Takahashi-san` | `romanization.md` | JA-EV-OWNER-04 |
| 15 | Japanese UI is concise, modern, neutral-polite with direct labels | `style-and-register.md` | JA-EV-OWNER-05 |
| 16 | Japanese explanation/hint/feedback uses clear friendly です／ます | `style-and-register.md` | JA-EV-OWNER-05 |
| 17 | Pitch accent data not provided; out of scope/pending expert review; AI cannot create it | `pronunciation.md` | JA-EV-OWNER-05 |
| 18 | Ceremonial/slang opt-in with context, provenance, review date and expert/native review | `style-and-register.md` | JA-EV-OWNER-05 |
| 19 | Architecture/product policy is approved/frozen; full linguistic profile remains pending | `validation.md`, `README.md` | JA-EV-OWNER-05 |
| 20 | Focus native/expert review on naturalness, keigo, UI/support, bidirectional translation, ceremonial/slang, accepted variants and risk fixtures; sourced facts sampled | `validation.md` | JA-EV-OWNER-05 |

## Five-field separation

**Evidence: `JA-EV-RUNTIME-01` — `EXISTING_CONFIRMED`.**

| Field | Responsibility | Must not be silently replaced by |
|---|---|---|
| Japanese text | Canonical target-language display | translation/romaji |
| Literal kana reading | Orthographic kana representation; particle は/へ/を retained | pronunciation reading |
| Pronunciation reading | Contextual spoken reading from token/POS analysis | literal kana alone |
| Romanization | Modified Hepburn generated from pronunciation reading | TTS input |
| Translation | Natural learner-support meaning | literal gloss |

## Evidence Matrix

Mỗi hàng bao phủ một claim normative có cùng evidence và phạm vi. Section con
phải dẫn lại mã hàng tương ứng; claim ngoài ma trận không được xem là approved.

| ID | File / section | Normative claim | Evidence type | Exact source | Source authority | Repository evidence | Project Owner decision | Reviewer required | Proposed status | Unresolved risk |
|---|---|---|---|---|---|---|---|---|---|---|
| JA-EV-RUNTIME-01 | reading/pronunciation/romanization/TTS — field boundaries | Five fields tách biệt; literal kana giữ は/へ/を; token/POS quyết định pronunciation; romanization không phải TTS | EXISTING_CONFIRMED | Repository implementation, fixtures and ADR-015 | NovaLang confirmed implementation | `scripts/lib/japanese-pronunciation.mjs`; `scripts/test-japanese-pronunciation.mjs`; ADR-015 | Confirmed pronunciation closure requirements | Project Owner runtime review completed | PASS / PROJECT_OWNER_REVIEW_COMPLETED | Không được mở rộng claim sang grammar/style |
| JA-EV-RUNTIME-02 | pronunciation — tokenizer/failure | kuromoji/IPADIC là generation-only; initialization/unknown ambiguity fail loud | EXISTING_CONFIRMED | Repository generator and dependency lock | NovaLang runtime fact | `package.json`; `package-lock.json`; generator/tests | Existing closure task | Project Owner runtime review completed | PASS / PROJECT_OWNER_REVIEW_COMPLETED | Dictionary/runtime changes out of scope |
| JA-EV-ROMAJI-01 | romanization — output | Modified Hepburn; macron, spacing, capitalization và exact outputs theo fixture | EXISTING_CONFIRMED | Repository tests and generated parity checks | NovaLang confirmed output | pronunciation tests; shared/generated/Flutter parity validation | Existing approved implementation scope | Project Owner runtime review completed | PASS / PROJECT_OWNER_REVIEW_COMPLETED | Newly documented owner forms require separate content/runtime Change Control |
| JA-EV-WRITE-01 | writing-system/orthography — modern kana | Kana usage phải theo Modern Kana Usage; particle spellings are orthographic exceptions | AUTHORITATIVE_SOURCE_BACKED | [Agency for Cultural Affairs — Modern Kana Usage](https://www.bunka.go.jp/kokugo_nihongo/sisaku/joho/joho/kijun/naikaku/gendaikana/kaisetu.html), [exceptions](https://www.bunka.go.jp/kokugo_nihongo/sisaku/joho/joho/kijun/naikaku/gendaikana/honbun_dai2.html) | Japanese government language policy | Literal-reading fixtures retain は/へ/を | None beyond field separation | Japanese linguist/editor | SOURCE_BACKED / EXPERT_REVIEW_PENDING | Learner-level simplification policy unresolved |
| JA-EV-WRITE-02 | orthography — kanji/okurigana/loanwords | Published forms must respect official kanji, okurigana and loanword guidance where applicable | AUTHORITATIVE_SOURCE_BACKED | [Jōyō Kanji](https://www.bunka.go.jp/kokugo_nihongo/sisaku/joho/joho/kakuki/14/tosin02/index.html), [Okurigana](https://www.bunka.go.jp/kokugo_nihongo/sisaku/joho/joho/kijun/naikaku/okurikana/index.html), [Loanwords](https://www.bunka.go.jp/kokugo_nihongo/sisaku/joho/joho/kijun/naikaku/gairai/index.html) | Japanese government language policy | None asserted | None | Japanese linguist/editor | SOURCE_BACKED / EXPERT_REVIEW_PENDING | Accepted variants and pedagogical staging need review |
| JA-EV-WRITE-03 | writing-system/orthography — layout | Japanese punctuation, small kana, prolonged mark, iteration mark and line composition must not be normalized as Latin layout | AUTHORITATIVE_SOURCE_BACKED | [W3C Japanese Layout Requirements](https://www.w3.org/TR/jlreq/) | W3C Japanese layout reference | None asserted | None | Japanese typography expert for edge cases | SOURCE_BACKED / REVIEW_PENDING | Platform rendering remains implementation-specific |
| JA-EV-GRAMMAR-01 | grammar-and-usage — grammar in communication | Grammar/usage must be evaluated in communicative context and teaching objective, not isolated translation similarity | AUTHORITATIVE_SOURCE_BACKED | [Japan Foundation grammar materials](https://www.kyozai.jpf.go.jp/kyozai/grammar/text/kanalist/ja/render.do), [JF Standard](https://www.jfstandard.jpf.go.jp/summaryen/ja/render.do) | Japan Foundation | Existing naturalness global rule | ADR-016 priority order | Japanese language teacher | SOURCE_BACKED / EXPERT_REVIEW_PENDING | Detailed constructions are not exhaustively specified |
| JA-EV-PARTICLE-01 | grammar-particles — pronunciation classification | は/へ/を pronunciation transformation requires grammatical particle role, never character-only substitution | EXISTING_CONFIRMED | Repository token/POS implementation and exact tests | NovaLang confirmed implementation | pronunciation generator/tests | Existing closure requirements | Project Owner runtime review completed | PASS / PROJECT_OWNER_REVIEW_COMPLETED | Tokenizer ambiguity must fail loud |
| JA-EV-PEDAGOGY-01 | learning-and-pedagogy — framework | Learning objectives may use Can-do/task accomplishment and integrated communicative activities | AUTHORITATIVE_SOURCE_BACKED | [JF Standard](https://www.jfstandard.jpf.go.jp/summaryen/ja/render.do), [Irodori overview](https://www.irodori.jpf.go.jp/en/about.html), [Irodori teaching](https://www.irodori.jpf.go.jp/en/teach.html) | Japan Foundation | None asserted | Adopt as framework, not mandatory lesson design | Japanese pedagogy expert | SOURCE_BACKED / ADAPTATION_REVIEW_PENDING | NovaLang progression/thresholds not decided |
| JA-EV-PEDAGOGY-02 | learning-and-pedagogy — learner aids and answers | Romaji/furigana visibility, independent toggles, kana/kanji acceptance, normalization, approved variants, typo/register handling | PROJECT_OWNER_DECISION | `NOVALANG-JAPANESE-FULL-PROFILE-OWNER-DECISIONS-CLOSURE-01`, decisions 1–9 | NovaLang product governance | Prior profile gaps and fixtures | Explicit Project Owner closure decisions | Runtime/change-control validation completed for Q14 | PRODUCT_POLICY_APPROVED / FROZEN; Q14 PASS | Future content still needs its own validation |
| JA-EV-STYLE-01 | style-and-register — baseline/taxonomy | `NATURAL_NEUTRAL_POLITE`; CASUAL/NATURAL_NEUTRAL_POLITE/FORMAL bases; HONORIFIC/CEREMONIAL/SLANG modifiers | PROJECT_OWNER_DECISION | ADR-016 and global naturalness rule | NovaLang product governance | `rules/content/naturalness-and-register.md` | Explicitly approved in naturalness architecture task | Native reviewer waived/not completed for profile closure | APPROVED / FROZEN_WITH_NATIVE_REVIEW_WAIVER | Future content realization still follows its release gate |
| JA-EV-STYLE-02 | style-and-register — Japanese realization | Contextual Japanese naturalness, contractions, sentence-final particles, address and service wording | NEEDS_NATIVE_OR_EXPERT_REVIEW | Official keigo guidance plus corpus evidence may inform review | Agency for Cultural Affairs; NINJAL usage corpus | Existing draft profile only | No final wording approval | Native Japanese style reviewer | REVIEW_REQUIRED: YES | Corpus frequency is evidence, not automatic norm |
| JA-EV-KEIGO-01 | style-and-register — honorific | Honorific language must preserve role/relationship and use recognized keigo categories | AUTHORITATIVE_SOURCE_BACKED | [Agency for Cultural Affairs — Keigo guidance (PDF)](https://www.bunka.go.jp/seisaku/bunkashingikai/kokugo/hokoku/pdf/keigo_tosin.pdf) | Japanese government language council | None asserted | Modifier model from ADR-016 | Native Japanese/keigo expert | SOURCE_BACKED / EXPERT_REVIEW_PENDING | Context choice cannot be fully deterministic |
| JA-EV-CORPUS-01 | style/usage fixtures | BCCWJ may support contemporary written-usage investigation but cannot independently grant PASS | NEEDS_NATIVE_OR_EXPERT_REVIEW | [NINJAL BCCWJ](https://clrd.ninjal.ac.jp/bccwj/en/) | National corpus/research institute | None asserted | Evidence-gate restriction | Linguist/native reviewer | USAGE_EVIDENCE_ONLY | Spoken registers need separate evidence |
| JA-EV-I18N-01 | localization-boundaries — language purity | App chrome follows UI language; learning content remains learning language; no silent English leakage | PROJECT_OWNER_DECISION | AGENTS.md Localization and prior runtime blocker decisions | NovaLang product governance | Existing localization rules/tests in repository | Explicit Project Owner direction | Product Owner/runtime QA | CANONICAL_PRODUCT_RULE | Exceptions must remain narrow and explicit |
| JA-EV-NATURAL-01 | localization/style — translation | Primary translation must convey natural meaning/context; literal structure belongs in literal gloss | PROJECT_OWNER_DECISION | ADR-016 and `rules/content/naturalness-and-register.md` | NovaLang product governance | Global rule exists | Approved naturalness architecture | Native reviewer for Japanese output | CANONICAL_PRODUCT_RULE / NATIVE_REVIEW_REQUIRED | Field availability is schema-dependent |
| JA-EV-AUDIO-01 | TTS/audio — input precedence | TTS uses Japanese/pronunciation authority, never romanization or support translation | EXISTING_CONFIRMED | Existing Japanese rules and pronunciation implementation boundary | NovaLang confirmed rule | `tts-and-audio.md`; generator architecture | Existing pronunciation task | Runtime/audio QA | CONFIRMED_BOUNDARY | Exact engine normalization can vary |
| JA-EV-QA-01 | validation — QA states | PASS requires approved profile, deterministic validation, required native review, context/objective check and revision/version binding | PROJECT_OWNER_DECISION | ADR-016 and global naturalness rule | NovaLang governance | Existing global QA contract | Explicitly approved | Project Owner | CANONICAL_QA_RULE | Full profile is not yet eligible for PASS |
| JA-EV-OWNER-03 | TTS/audio — playback and source priority | Unlimited replay; 1.0x standard; 0.75x slow; no card-open autoplay; approved audio then correct-locale TTS then explicit error; no cross-locale fallback | PROJECT_OWNER_DECISION | `NOVALANG-JAPANESE-FULL-PROFILE-OWNER-DECISIONS-CLOSURE-01`, decisions 10–11 | NovaLang product governance | Existing native-script TTS boundary | Explicit Project Owner closure decisions | Runtime/change-control validation | PRODUCT_POLICY_APPROVED / FROZEN | Runtime implementation not changed by documentation task |
| JA-EV-OWNER-04 | profile/romanization — standard and variants | Standard Japanese baseline; sourced/contextual/allowlisted regional variants; desu, kochira koso, sayōnara, Nihon/Nippon and Takahashi-san decisions | PROJECT_OWNER_DECISION | `NOVALANG-JAPANESE-FULL-PROFILE-OWNER-DECISIONS-CLOSURE-01`, decisions 12–14 | NovaLang product governance | Confirmed Modified Hepburn subsystem | Explicit Project Owner closure decisions | Content/runtime change control as applicable | PRODUCT_POLICY_APPROVED / FROZEN | Existing assets/runtime intentionally unchanged |
| JA-EV-OWNER-05 | style/localization/governance — Japanese UI and review | Concise modern neutral-polite UI; friendly です／ます support; no pitch data; opt-in ceremonial/slang; split product-policy freeze from linguistic review | PROJECT_OWNER_DECISION | `NOVALANG-JAPANESE-FULL-PROFILE-OWNER-DECISIONS-CLOSURE-01`, decisions 15–20 | NovaLang product governance | ADR-016 and draft Japanese profile | Explicit Project Owner closure decisions | Native/expert review for linguistic realization | PRODUCT_POLICY_APPROVED / FROZEN | Full linguistic profile remains not frozen |

## Evidence interpretation

- `EXISTING_CONFIRMED` chỉ xác nhận đúng subsystem và fixture được nêu.
- `AUTHORITATIVE_SOURCE_BACKED` cho phép ghi rule có provenance nhưng vẫn có
  thể cần expert review trước release.
- `PROJECT_OWNER_DECISION` là product/pedagogy policy, không được trình bày như
  linguistic fact.
- `NEEDS_NATIVE_OR_EXPERT_REVIEW` không cấp PASS.
- Nếu một future section được phân loại `UNRESOLVED`, section đó phải hiện rõ
  trạng thái unresolved và yêu cầu review; không được trình bày như rule đã
  đóng.

## Current conclusion

```text
JAPANESE_LANGUAGE_PROFILE_EXISTS
ROMANIZATION_IMPLEMENTATION: PASS
JAPANESE_FULL_LINGUISTIC_PROFILE: APPROVED / FROZEN
JAPANESE_FULL_PROFILE: CLOSED / FROZEN
PROJECT_OWNER_REVIEW: COMPLETED
NATIVE_EXPERT_REVIEW: WAIVED / NOT_COMPLETED
PITCH_ACCENT: OUT_OF_SCOPE / PENDING_EXPERT_REVIEW
```

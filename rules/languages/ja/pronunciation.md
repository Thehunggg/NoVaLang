# Japanese Pronunciation

## Subsystem status

```text
status: PASS
runtimeReview: PROJECT_OWNER_REVIEW_COMPLETED
profileFreeze: FROZEN
nativeExpertReview: WAIVED / NOT_COMPLETED
Evidence: JA-EV-RUNTIME-01, JA-EV-RUNTIME-02
```

Trạng thái này xác nhận pipeline pronunciation hiện có. Full Language Profile
được Project Owner phê duyệt/freeze qua final closure riêng; native expert
review được waive nhưng không được ghi là completed.

## Analyzer authority

Implementation generation dùng exact locked `kuromoji` với IPADIC để phân tích
surface sentence thành token và part-of-speech. Dependency này là
generation-only, không được bundle vào Flutter/Web runtime. Initialization,
dictionary hoặc token-analysis failure phải fail loud; không dùng heuristic ký
tự để tạo output có vẻ hợp lý rồi gắn nhãn trusted.

**Evidence: `JA-EV-RUNTIME-02` — `EXISTING_CONFIRMED`.**

## Transformation order

1. Nhận canonical Japanese surface và literal kana reading.
2. Tokenize/POS-analyze câu thật.
3. Áp contextual pronunciation ở token phù hợp.
4. Bảo toàn uncertainty như failure/approved override, không silent fallback.
5. Chuyển pronunciation reading sang romanization theo `romanization.md`.

**Evidence: `JA-EV-RUNTIME-01` — `EXISTING_CONFIRMED`.**

## Confirmed contextual behavior

Exact tests hiện bảo vệ particle-vs-lexical behavior, token-local long vowels,
small-tsu gemination kể cả analyzer token split, 拗音, syllabic ん ambiguity,
punctuation, names, numbers/counters và narrow 何→なん before a copula.
Established 日本 normalization mặc định là にほん / `Nihon`; にっぽん / `Nippon`
chỉ dùng khi official name hoặc context yêu cầu.

**Evidence: `JA-EV-RUNTIME-01`, `JA-EV-ROMAJI-01` —
`EXISTING_CONFIRMED`.**

## Pronunciation review domains

Mora structure, long vowels, gemination, moraic nasal, contracted sounds,
particles, counters, names, loanwords and connected speech must be represented
without collapsing orthography, pronunciation reading and romanization. Only
behaviors covered by repository exact tests are `EXISTING_CONFIRMED`; a new
case requires exact linguistic source/fixture or expert review.

Pitch accent data is `OUT_OF_SCOPE / PENDING_EXPERT_REVIEW`; NovaLang does not
provide it in this profile and AI must not create it. Devoicing,
weak/connected-speech realization, regional variation, IPA representation and
speaking-feedback evaluation remain expert-review domains, not silent runtime
inference.

**Evidence: `JA-EV-OWNER-05` — `PROJECT_OWNER_DECISION`; linguistic realization
remains `NEEDS_NATIVE_OR_EXPERT_REVIEW`.**

Standard-audio metadata baseline is `ja-JP`. Dialect requires explicit lesson
context. Regional answers require source, context and an approved allowlist.
New pitch-accent data is prohibited until an approved source, license,
representation and expert reviewer are recorded.

## Prohibited inference

- Không character-replace は/へ/を ngoài token grammar.
- Không tự tạo pitch-accent data.
- Không coi corpus frequency là pronunciation authority.
- Không sửa tokenizer, dictionary hoặc overrides từ profile documentation.

## Feedback boundary

Exact reading mismatch may be deterministic only for an approved fixture.
Pronunciation quality, accent, intelligibility and accepted regional variation
require qualified listening review; automated score alone cannot grant PASS.

## Closed owner decisions

Romanization product decisions đã được Project Owner chốt: `desu`,
`kochira koso`, `sayōnara`, default `Nihon` with contextual `Nippon`, và
`Takahashi-san`. Pronunciation implementation không thay đổi trong task này;
content/runtime updates cần Change Control riêng.

**Evidence: `JA-EV-OWNER-04` — `PROJECT_OWNER_DECISION`.**

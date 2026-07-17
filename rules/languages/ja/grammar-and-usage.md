# Japanese Grammar and Usage

## Purpose

File này đặt contract review cho grammar và usage tiếng Nhật; không phải một
grammar textbook và không tự thêm lesson content. Grammar claim cụ thể chỉ có
hiệu lực khi có provenance theo Evidence Matrix và context/teaching objective.

## Communicative context

**Evidence: `JA-EV-GRAMMAR-01` — `AUTHORITATIVE_SOURCE_BACKED`; Japanese
teacher review required.**

Grammar phải được đánh giá cùng communicative task, vai trò người nói, quan hệ,
thời gian, polarity và pragmatic intent. Một câu structurally possible không
tự động là natural hoặc phù hợp register. Translation similarity không phải
grammar validation.

## Core review domains

Các thay đổi có liên quan đến predicate inflection, tense/aspect, polarity,
modality, counters, ellipsis, clause linkage, word order hoặc sentence-final
behavior phải:

1. ghi rõ construction và teaching objective;
2. dẫn nguồn Japanese-language education/linguistic phù hợp;
3. phân biệt deterministic form check với natural-usage review;
4. chuyển `NEEDS_NATIVE_STYLE_REVIEW` khi lựa chọn phụ thuộc context.

**Evidence classification: `NEEDS_NATIVE_OR_EXPERT_REVIEW` under
`JA-EV-GRAMMAR-01`; no exhaustive normative construction list is asserted.**

The required review inventory includes:

- basic word order and topic/subject distinction;
- particles and copula;
- verb/adjective conjugation, tense/aspect and negation;
- modality, transitivity, counters/classifiers;
- relative clauses, conditionals and quotations;
- omitted subjects, pronouns and demonstratives;
- sentence-final particles and politeness forms;
- keigo, spoken fragments and written Japanese.

This inventory specifies what a Japanese grammar review must examine; it does
not assert unsourced answers for every construction.

## Particles

General meaning/usage của particles thuộc file này và cần source/context.
Narrow token/POS transformation của は/へ/を cho pronunciation thuộc
`grammar-particles.md`; hai authority không được nhập làm một.

## Register interaction

Politeness morphology không đủ để xác định toàn bộ register. Relationship,
address, lexical choice, contractions và sentence-final forms phải dùng
`style-and-register.md`. Keigo choice cần native/keigo expert review.

**Evidence: `JA-EV-KEIGO-01` — `AUTHORITATIVE_SOURCE_BACKED`; realization
review pending.**

## Exact-form exercises

Nếu exact form là teaching objective, validator có thể yêu cầu form chính xác
đã phê duyệt và giải thích phạm vi. Không được dùng exact-form exception để
làm primary translation hoặc free production trở nên cứng.

**Evidence: `JA-EV-NATURAL-01` — `PROJECT_OWNER_DECISION`.**

## Controlled language and output Japanese

Controlled learner Japanese may limit vocabulary/grammar only when the
teaching objective, limitation and scope are explicit. Translation into
Japanese must reconstruct natural omission, topic/subject realization,
register and sentence structure rather than copy source order. Formally
possible but contextually unnatural Japanese, ambiguous output and accepted
natural variants require native review.

**Evidence:** naturalness priority `JA-EV-NATURAL-01`; Japanese realization
`JA-EV-GRAMMAR-01` and `JA-EV-STYLE-02` with expert review.

## Accepted-answer and open-answer policy

- Kana/kanji alternatives are accepted when kanji is not the teaching target;
  kanji may be exact-required when it is the explicit objective.
- Minor punctuation, whitespace and full-width/half-width differences are
  normalized unless exact form requires them.
- Meaning-equivalent natural structures are auto-accepted only when the
  variant is pre-approved.
- Uncertain open answers escalate to review.
- A minor typo is not PASS; classify it as typo and give light feedback.
- Register mismatch is incorrect when register is the objective or the answer
  is situationally inappropriate; otherwise warn.

**Evidence: `JA-EV-PEDAGOGY-02` — `PROJECT_OWNER_DECISION`.** Native review is
still required to approve Japanese variants; corpus frequency alone is not
approval.

## Sources

- Japan Foundation Standard and official grammar materials: framework/context.
- Agency for Cultural Affairs keigo guidance: honorific system reference.
- NINJAL BCCWJ: written usage evidence only, never automatic PASS.

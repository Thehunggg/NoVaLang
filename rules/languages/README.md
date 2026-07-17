# Language Rule Directories

Thư mục này là kiến trúc canonical cho rule chi tiết theo từng ngôn ngữ học.
Rule chung nằm ở `AGENTS.md`, Core Rules, ADR và
`rules/content/naturalness-and-register.md`. Cursor gateway chỉ liên kết tới
profile, không lặp linguistic detail.

## Profile contract

Mỗi language directory là nguồn chi tiết duy nhất cho ngôn ngữ đó. Profile phải
ghi status, version, reviewer, review date, provenance, unresolved decisions và
change log. File tồn tại không đồng nghĩa profile đã `APPROVED` hoặc `FROZEN`.

Base registers là `CASUAL`, `NATURAL_NEUTRAL_POLITE`, `FORMAL`.
`HONORIFIC`, `CEREMONIAL`, `SLANG` là modifiers trực giao, không phải bậc tuyến
tính. Release QA tuân theo global naturalness rule và ADR-016.

## Evidence gate

Normative language rules phải ghi một loại evidence rõ ràng:

- `EXISTING_CONFIRMED`
- `AUTHORITATIVE_SOURCE_BACKED`
- `PROJECT_OWNER_DECISION`
- `NEEDS_NATIVE_OR_EXPERT_REVIEW`
- `UNRESOLVED`

`NEEDS_NATIVE_OR_EXPERT_REVIEW` không được auto-PASS. `UNRESOLVED` không phải
rule bắt buộc. AI không được ghi là native, linguist hoặc pedagogy reviewer.

## Directories

- [_template](./_template/README.md): cấu trúc cho language profile tương lai;
  không tự chứa linguistic truth chưa được duyệt.
- [en](./en/README.md): English style/register profile; General International
  English với en-US spelling/punctuation baseline; `DRAFT /
  PROJECT_OWNER_REVIEW_PENDING / NOT_FROZEN`, reviewer `NOT_ASSIGNED`.
- [ja](./ja/README.md): Japanese Full Language Profile canonical gồm đúng 16
  file, version `0.2.0-draft`; `APPROVED / FROZEN / CLOSED` by Project Owner.
  Pronunciation/romanization and Q14 runtime review are `PASS`. Japanese Full
  Profile architecture and
  20/20 product-policy decisions are `APPROVED / FROZEN`; this does not freeze
  pitch accent, which remains `OUT_OF_SCOPE / PENDING_EXPERT_REVIEW`. Native
  expert review is `WAIVED / NOT_COMPLETED`, not completed. Project Owner
  Android/Web manual verification and final review are `PASS / COMPLETED`.

Vietnamese style profile có trạng thái
`LANGUAGE_STYLE_PROFILE_NOT_IMPLEMENTED`. English Full Language Profile đang
`PAUSED`; task Japanese không thay đổi English profile.

## Status vocabulary

- `JAPANESE_LANGUAGE_PROFILE_EXISTS`: Japanese profile directory tồn tại.
- `PROJECT_OWNER_REVIEW_PENDING`: cần Project Owner review/acceptance.
- `NOT_FROZEN`: chưa là frozen decision.
- `LANGUAGE_STYLE_PROFILE_NOT_IMPLEMENTED`: chưa có profile đủ điều kiện QA.
- `NEEDS_NATIVE_STYLE_REVIEW`: deterministic checks không đủ để cấp PASS.
- `JAPANESE_PRODUCT_POLICY: APPROVED / FROZEN`: owner decisions are canonical;
  full linguistic-profile and runtime statuses remain separate.

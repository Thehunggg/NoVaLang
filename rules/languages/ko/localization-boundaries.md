---
id: ko/localization-boundaries
version: 0.1.0
status: DRAFT
tier: [t1, t3]
role: [both]
enforced_by: guidance-only
depends_on: [ko/style-and-register]
sources: [S-TRAINED-KNOWLEDGE]
---

# Korean Localization Boundaries

Áp dụng nguyên tắc "UI Language Purity" / "Learning Content Language Purity"
đã có trong `AGENTS.md` cho tiếng Hàn, theo đúng cấu trúc field ba trục đã
chốt của dự án: `learningLanguageCode` / `nativeLanguageCode` / `uiLanguageCode`.

## Language ownership matrix

| Content type | Language authority | Notes |
|---|---|---|
| App chrome, buttons, errors, loading | `uiLanguageCode` | Không fallback im lặng sang tiếng Anh |
| Learner-support meaning/translation | `nativeLanguageCode` | Không ghi đè target text |
| Grammar explanation/hint/feedback | support/UI contract đã chọn | Cần đủ vi/en/ja trước release, giống quy tắc chung |
| Reading aid (romanization RR) | Korean reading-aid authority | **CHƯA quyết định có bật hay không** — xem `reading-system.md`, GIẢ ĐỊNH A-03. KHÁC ja: không phải furigana, là romanization toggle |
| Pronunciation (biến âm) | Korean pronunciation authority | Ngữ cảnh, tách khỏi chính tả — xem `pronunciation.md` |
| Literal gloss | support language đã chọn | Không phải bản dịch tự nhiên chính |
| Korean target sentence/dialogue | learning language `ko` | Không phải UI-language leak |
| Romanization | Korean learner-aid field | Không phải bản dịch hay TTS text |
| Audio/TTS | Korean speech field (Hangul surface text) | Script gốc, không phải romaji — xem `tts-and-audio.md` |

## Supported role coverage

- **Learning language:** Korean sở hữu target text, biến âm, romanization
  aid (nếu bật), và Korean audio.
- **Native/support language:** Korean sở hữu giải thích/gợi ý/feedback tự
  nhiên và bản dịch CHỈ khi Korean là support locale đã chọn (hiện `ko` đã
  có tên trong `native_language_options.json` nhưng `isAvailableForUi: false`
  — xem `shared/config/native_language_options.json`, KHÔNG thuộc phạm vi
  task này).
- **UI language:** Korean sở hữu app chrome CHỈ khi `uiLanguageCode == ko`.

## Provenance

`S-TRAINED-KNOWLEDGE` — áp dụng khuôn field-separation đã có sẵn trong repo
(AGENTS.md, đã xác nhận qua đọc source `native_language_options.json` thật),
không phải suy diễn ngôn ngữ học mới.

## Chưa giải quyết

- Reading-aid policy cụ thể (bật/tắt/theo trình độ) — GIẢ ĐỊNH A-03.

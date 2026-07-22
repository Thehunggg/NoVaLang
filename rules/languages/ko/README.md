# ko — Korean rule set

Không có front-matter (README điều hướng, không phải rule/narrative — cùng
quy ước ja/en/README.md, tự động bỏ qua theo INV-2/Part G #8).

## Trạng thái

```text
language: ko (Korean / 한국어)
tier: t1 (learning) + t3 (native) — theo rules/catalog.json
overallStatus: VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT
frozen: KHÔNG — chưa có phenomenon nào FROZEN
playable: KHÔNG — build rule KHÔNG kích hoạt ngôn ngữ chạy thật (PLAYABLE_LANGUAGES vẫn chỉ en+ja)
```

## File trong thư mục này

| File | Vai trò |
|---|---|
| `coverage.json` | Bước 0 inventory — 24 hiện tượng × rule_level/lexical_level × nguồn × confidence |
| `sources.json` | Danh sách nguồn (dataset + WebSearch + trained-knowledge, xem D-51) |
| `orthography.data.json` | CLDR exemplar characters (Bước 1, dataset) |
| `grapheme-to-phoneme.data.json` | WikiPron kor_hang_narrow (36146 cặp, Bước 1, dataset) |
| `word-class.data.json` | UD Korean-GSD UPOS counts (Bước 1, dataset) |
| `orthography.rules.json` | Spacing, punctuation, script-presence checks |
| `phonology.rules.json` | 5 quy tắc biến âm theo ngữ cảnh (연음/비음화/격음화/경음화/구개음화) |
| `grammar.rules.json` | 조사 (particle), word order, vowel harmony, 2 hệ số đếm |
| `pragmatics.rules.json` | Hệ đuôi câu lịch sự (speech levels), map register taxonomy |
| `*.md` | Narrative giải thích, ví dụ — xem bảng dưới |
| `review-checklist.md` | Mục cần Project Owner quyết (≤8 mục, đọc <10 phút) |
| `native-review-ko.md` | Mục cần người bản ngữ Hàn — tiếng Anh đơn giản, tick-được |
| `pipeline-log.md` | Nhật ký từng bước, dùng để resume phiên dở |
| `change-log.md` | Lịch sử thay đổi version |

## Đối chiếu khuôn với ja (chốt chặn, xem pipeline-log.md)

4 file `.rules.json` (orthography/phonology/grammar/pragmatics) đối chiếu
field-by-field với ja (FROZEN) và en: top-level key set khớp 100%
(`id, version, status, phenomenon, enforces, sources, derived_by, config,
checks?, fixtures`); `checks[]` là optional theo `rules.schema.json`, ja tự
bỏ nó ở phonology/grammar khi phenomenon không hợp regex-check — ko có
checks ở cả 4 file vì nội dung phù hợp kiểm bằng regex/custom-note, không
phải lệch khuôn. `coverage.json`/`sources.json` khớp field
`rule_level/lexical_level/source/derived_by/confidence/machine_readable/
notes/status` với ja. Không phát hiện lệch khuôn cần sửa.

**Lưu ý:** đây là file `.md` PIPELINE ĐẦU TIÊN trong repo có front-matter
thật theo `_schema/front-matter.schema.json` (Part E) — ja/en's `.md` đều
nằm trong `narrative-allowlist.json` (narrative có sẵn TRƯỚC pipeline, được
miễn kiểm). Không có tiền lệ `.md` thật để đối chiếu 1-1; các file `.md`
dưới đây tuân theo đúng schema Part E, không suy ra từ ja/en.

# ro — Romanian rule set

Không có front-matter (README điều hướng).

## Trạng thái

```text
language: ro (Romanian / Română)
tier: t1 (learning only — roles: ["learning"] trong catalog.json)
overallStatus: VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT
frozen: KHÔNG
playable: KHÔNG
baseline_variety: ro-RO
family: Eastern Romance (Balkan Sprachbund), Latin-script
```

## File trong thư mục này

`coverage.json` (24 hiện tượng), `sources.json`, 3 `.data.json` (dataset Bước
1), 4 `.rules.json` (orthography/phonology/grammar/pragmatics), các `.md`
narrative có front-matter, `review-checklist.md`, `native-review-ro.md`,
`pipeline-log.md`.

## Đặc trưng tiếng Rumani nổi bật (Rôman + Balkan)

- **Mạo từ xác định = HẬU TỐ** (băiat→băiatul) — ngược Rôman Tây.
- **Giống TRUNG** (neutru: nam ít / nữ nhiều).
- **Hệ cách rút gọn** (gen-dat trên mạo từ) — khác es/it không có cách.
- **Thức giả định `să`** thay nguyên mẫu (vreau să merg) — đặc trưng Balkan.
- **Nhân đôi tân ngữ** (îl văd pe Ion).
- Nguyên âm **ă [ə] / â î [ɨ]**; c/g mềm-cứng như es/it.
- **ș/ț comma-below** (không cedilla); â/î phân bố theo quy tắc 1993.
- 5 dấu là chữ → chính sách chấm theo pl D-64.

## Bằng chứng dữ liệu

- g2p-check: ș/ț/ă/â/î + c/g mềm-cứng sạch trên WikiPron (9286 cặp — bộ nhỏ).
- corpus-check: casing 0.08% trên 33645 câu UD (RRT+Nonstandard).

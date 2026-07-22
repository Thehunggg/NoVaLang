---
id: ko/pronunciation
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: phonology.rules.json
depends_on: [ko/writing-system]
sources: [S-TRAINED-KNOWLEDGE, WIKIPRON]
---

# Korean pronunciation

## Phoneme inventory

Đã import WikiPron Bước 1 (`grapheme-to-phoneme.data.json`): 36146 cặp
grapheme→phoneme narrow transcription (`kor_hang_narrow_filtered`).
`machine_readable: true`, `confidence: high` (dataset).

## 5 quy tắc biến âm theo ngữ cảnh (chữ viết ≠ cách đọc)

Xem `phonology.rules.json` `config.sound_change_rules` cho chi tiết máy đọc
được. Tóm tắt:

| Quy tắc | Tên Hàn | Ví dụ |
|---|---|---|
| Liên kết | 연음 | 한국어 -> [한구거] |
| Đồng hoá mũi | 비음화 | 국물 -> [궁물] |
| Bật hơi hoá | 격음화 | 좋다 -> [조타] |
| Căng hoá | 경음화 | 학교 -> [학꾜] |
| Vòm hoá | 구개음화 | 굳이 -> [구지] |

Đây là lớp phức tạp **tương đương về vai trò** với は/へ/を của ja (chữ viết
không phản ánh trực tiếp cách đọc) nhưng **khác cơ chế hoàn toàn**: ja là
quy tắc ngữ pháp (trợ từ), ko là quy tắc âm vị học thuần (mọi âm tiết liền
kề đều có thể bị ảnh hưởng, không phụ thuộc từ loại).

**Danh sách 5 quy tắc trên CHƯA đầy đủ** (còn ㄹ đồng hoá, 사이시옷, và các
trường hợp biên khác) — không tự bổ sung khi chưa có nguồn cross-check thật
(WebFetch bị chặn phiên này, xem D-51). confidence: medium trong
`coverage.json`, không phải high.

## Provenance

- 5 quy tắc: `S-TRAINED-KNOWLEDGE` (kiến thức âm vị học tiếng Hàn chuẩn,
  dạy trong mọi giáo trình sơ cấp — nhưng chưa cross-check nguyên văn 2
  nguồn độc lập theo đúng Bước 2 vì WebFetch bị chặn).
- Phoneme inventory: `WIKIPRON` (dataset, high).

## Chưa giải quyết

- Cross-check 5 quy tắc bằng 2 nguồn độc lập đọc nguyên văn khi môi trường
  cho phép WebFetch trở lại.
- Bổ sung quy tắc còn thiếu (ㄹ đồng hoá, 사이시옷...).
- Đo tỷ lệ khớp G2P với WikiPron cụ thể (Bước 3, xem `pipeline-log.md`).

---
id: ko/grammar-particles
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: grammar.rules.json
depends_on: [ko/grammar-and-usage]
sources: [S-TRAINED-KNOWLEDGE]
---

# Korean particles (조사)

## Cặp patchim-conditioned chính

| Vai trò | Có patchim | Không patchim |
|---|---|---|
| Chủ đề (topic) | 은 | 는 |
| Chủ ngữ (subject) | 이 | 가 |
| Tân ngữ (object) | 을 | 를 |

Quy tắc: chọn vế trái nếu âm tiết cuối của từ đứng trước CÓ 종성 (phụ âm
cuối); chọn vế phải nếu KHÔNG có. Vd: 선생님(có ㅁ patchim) + 은 -> 선생님은;
저(không patchim) + 는 -> 저는.

## Particle khác (chưa mã hoá thành check, chỉ liệt kê)

- 에 / 에서 — nơi chốn tĩnh (đích đến, thời điểm) vs động (nơi hành động
  diễn ra).
- 도 — "cũng".
- 의 — sở hữu (thường bị lược bỏ trong văn nói tự nhiên — điểm dễ dịch sai
  máy móc từ "của" tiếng Việt).

## Khác biệt cấu trúc với ja (chốt chặn khuôn — không sao chép nhầm)

ja's `particles` phenomenon map trực tiếp vào は/へ/を (3 trợ từ có vấn đề
đọc kana≠phát âm). ko's 조사 **không có** vấn đề đọc-khác-viết tương tự —
vấn đề của ko là **chọn biến thể nào** (patchim) chứ không phải **đọc thế
nào**. Vì vậy `pronunciation_contextual` (biến âm) và `particles_josa`
(chọn biến thể) là HAI phenomenon tách biệt cho ko, không gộp như ja có thể
ngụ ý.

## Provenance

`S-TRAINED-KNOWLEDGE` — ngữ pháp chuẩn phổ thông, quy tắc patchim là sự
kiện âm vị học đóng (không có ngoại lệ thật), không tranh cãi.

## Chưa giải quyết

Bảng đầy đủ 조사 (không chỉ 3 cặp chính) cho spacing check tự động — xem
`orthography.md` GIẢ ĐỊNH A-06.

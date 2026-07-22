---
id: fi/writing-system
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: orthography.rules.json
depends_on: []
sources: [S-TRAINED-KNOWLEDGE, CLDR]
---

# Finnish Writing System

Baseline: **fi-FI** (tiếng Phần Lan chuẩn viết, *yleiskieli*). Họ **Ural
(Uralic)** — không phải Ấn-Âu, **chắp dính** (agglutinative).

## Bảng chữ

Chữ Latin. **8 nguyên âm**: `a e i o u y ä ö`. `ä ö` là CHỮ CÁI riêng (cuối
bảng, thuộc nhóm **hoà âm trước**) — KHÔNG phải a/o có dấu. Phụ âm bản ngữ:
`p t k d g n m s h l r v j`. `b c f q w x z š ž å` chỉ trong từ mượn. CLDR
xác nhận.

## Chính tả gần như hoàn hảo 1:1 âm vị

Mỗi chữ = một âm; **chữ đôi = âm dài** (aa=[ɑː], kk=[kː]). Hệ chữ→âm minh bạch
nhất trong các ngôn ngữ đã build. Trọng âm LUÔN ở âm tiết đầu (cố định).

## Hướng viết

LTR ngang. `stroke_order`: not-applicable.

## Điểm học viên hay nhầm

- `ä ö` là chữ + thuộc nhóm hoà âm trước — bỏ/thay = sai chữ + **phá hoà âm**
  (sää 'thời tiết' / saa 'được'). Xem `answer_acceptance_fi`.

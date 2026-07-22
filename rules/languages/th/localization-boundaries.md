---
id: th/localization-boundaries
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: [th/style-and-register]
sources: [S-TRAINED-KNOWLEDGE]
---

# Thai Localization Boundaries

Vai trò của th trong NovaLang: **learning language** (T1). Đang là
playable-needs-rule, chưa dùng làm native/UI mặc định.

## Ranh giới trường

- `learningLanguageCode = th`: câu/từ đích, phát âm, chính tả Thái (đầy đủ dấu
  nguyên âm + dấu thanh, chữ Thái).
- Không tự dịch máy sang ngôn ngữ khác. Cặp bẫy dịch th↔<X> → `rules/pairs/`,
  KHÔNG ở `languages/th/` (INV-1).

## Chữ Thái bắt buộc + audio cho thanh

Văn bản đích PHẢI viết chữ Thái đầy đủ dấu thanh/nguyên âm (KHÔNG chuyển tự
Latin làm nội dung). Thanh điệu + tách từ cần **audio/TTS** làm kênh phát âm
chính. Tầng chấm điểm: xem `answer_acceptance_th` (thiếu/sai dấu = sai; không
nhận RTGS/Latin). Trợ đọc RTGS/IPA+thanh chỉ hỗ trợ nhập môn, ẩn dần.

## Số / ngày / tiền tệ

Số: Ả Rập (๑๒๓ Thái cũng dùng). Tiền: ฿ (baht, THB). Ngày: dd/mm/yyyy — **năm
theo lịch PHẬT (พ.ศ. = +543)** phổ biến ở Thái; cần xử lý lịch riêng nếu hiển
thị năm Thái. Quy ước theo locale th-TH.

## Tách từ (word segmentation)

KHÔNG khoảng trắng giữa từ → hiển thị/ngắt dòng/TTS cần tách từ. Không dựa
khoảng trắng để chấm đáp án. Vấn đề máy (xem `word_segmentation`).

---
id: th/writing-system
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: orthography.rules.json
depends_on: []
sources: [S-TRAINED-KNOWLEDGE, CLDR]
---

# Thai Writing System

Baseline: **th-TH** (Trung Thái / Bangkok). Kra-Dai. Hệ chữ **Thái** (abugida),
Unicode U+0E00–U+0E7F.

## Đặc điểm hệ chữ

- **44 phụ âm** (พยัญชนะ) — phụ âm mang **nguyên âm cố hữu** (o/a).
- **~15+ ký hiệu nguyên âm** đặt **TRƯỚC / SAU / TRÊN / DƯỚI** phụ âm (thậm chí
  bao quanh). Ví dụ: เก (e trước), กา (a sau), กิ (i trên), กุ (u dưới).
- **4 dấu thanh** (่ ้ ๊ ๋) + thanh suy từ **lớp phụ âm**.
- **KHÔNG khoảng trắng giữa từ** — khoảng trắng đánh dấu ranh giới **cụm/câu**
  (xem `word_segmentation`).
- **Unicameral** — không hoa/thường (`casing` not-applicable).

CLDR xác nhận. [corpus: 100% câu có chữ Thái, 96.1% ký tự Thái.]

## Hướng viết

LTR ngang; dấu nguyên âm/thanh xếp chồng trên/dưới phụ âm.

## Dạy chữ Thái trực tiếp

Như el/hi: **dạy chữ Thái trực tiếp**, không dùng chuyển tự Latin làm nội dung
chính. Trợ đọc (RTGS/IPA + thanh) chỉ hỗ trợ nhập môn, ẩn dần (xem
`reading_aid_policy`).

## Điểm học viên hay nhầm

- Dấu nguyên âm đặt quanh phụ âm (không tuyến tính) — đọc theo thứ tự âm, không
  theo thứ tự viết.
- Dấu thanh + lớp phụ âm quyết định thanh — xem `pronunciation.md`.

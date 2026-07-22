---
id: tr/orthography
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: orthography.rules.json
depends_on: [tr/writing-system]
sources: [S-TRAINED-KNOWLEDGE, CLDR, S-UD-CORPUS]
---

# Turkish Orthography — Chính tả tiếng Thổ

Chuẩn: **TDK** (Türk Dil Kurumu — Hội đồng Ngôn ngữ Thổ).

## Chữ cái riêng (không phải biến thể có dấu)

ç ş ğ ı ö ü là **CHỮ CÁI RIÊNG**. Bỏ/thay = sai chính tả + đổi nghĩa: ı≠i
('sık' thường xuyên ≠ 'sik' tục). Xem `answer_acceptance_tr`.

## Circumflex â î û (hiếm)

Phân biệt vài cặp (kar 'tuyết' / kâr 'lợi nhuận'; hala 'cô' / hâlâ 'vẫn') —
ngày càng tuỳ chọn trong viết hiện đại.

## Viết hoa tháng/thứ — KHÁC Romance (kỷ luật dữ liệu)

Theo TDK: tháng/thứ **VIẾT HOA khi chỉ NGÀY CỤ THỂ** (5 Aralık 1390, 10
Kasım'da) nhưng **viết thường khi nói chung** (kasım ayında 'trong tháng
mười một'). KHÁC es/it (luôn thường). Corpus-check Bước 3: 0.98% tháng/thứ viết
hoa = đúng luật ngày-cụ-thể, KHÔNG phải lỗi → **không** áp check
'month-always-lowercase'.

**Quốc tịch/tên ngôn ngữ VIẾT HOA** (Türk, Türkçe, İngilizce) — khác es.

## Dấu nháy hậu tố

İstanbul'da, Türkiye'nin, Ankara'ya — tách hậu tố khỏi tên riêng, bắt buộc.

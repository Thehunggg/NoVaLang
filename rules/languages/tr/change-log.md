---
id: tr/change-log
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [S-TRAINED-KNOWLEDGE]
---

# Turkish Change Log

- **0.1.0 (2026-07-19)** — Khởi tạo bộ rule tr (baseline tr-TR) qua
  `/build-language` Bước 0–4, tra cứu 5 vòng. Turkic, chữ Latin (29 chữ), t1.
  Dataset CLDR/UD/WikiPron: WikiPron **12321 cặp**, corpus UD-BOUN **9761 câu**
  (gần 10k). g2p-check xác nhận chính tả rất đều: ş/j/ü/ı <2%. Kỷ luật dữ liệu:
  c/ç "vi phạm" 17-21% = ARTIFACT tie-bar-vs-space tokenization WikiPron (ánh xạ
  đúng 100%, kiểm tay); ö narrow [œ]/[ø]. **KỶ LUẬT DỮ LIỆU casing:** KHÁC
  Romance — tiếng Thổ VIẾT HOA tháng/thứ ở ngày cụ thể (TDK); corpus 0.98% "hoa"
  đúng luật → KHÔNG áp check month-lowercase, ghi rõ. corpus-check no-q-w-x
  1.14%. HONORIFIC not-applicable (es B-02). Đặc trưng: CHẮP DÍNH (agglutinative),
  HOÀ ÂM NGUYÊN ÂM (2 chiều e/a + 4 chiều i/ı/u/ü), biến âm phụ âm (p→b, k→ğ),
  6 CÁCH (không giống, accusative chỉ tân ngữ xác định), evidential -miş, SOV,
  ı/i (không chấm/có chấm), sen/siz + Bey/Hanım. D-tr-01 baseline tr-TR;
  D-tr-02 chuẩn TDK; D-tr-03 reading-aid not-applicable; D-tr-04 chấm thiếu
  ç/ş/ğ/ı/ö/ü = sai (pl D-64, giữ DRAFT — circumflex â/î/û khoan dung + locale
  casing ı/İ); D-tr-05 dạy đối lập sen/siz + Bey/Hanım. native-review-tr 7 mục.
  Trạng thái: `VALIDATED_NOT_YET_PROVEN`, KHÔNG FROZEN.

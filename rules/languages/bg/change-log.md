---
id: bg/change-log
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [S-TRAINED-KNOWLEDGE]
---

# Bulgarian Change Log

- **0.1.0 (2026-07-19)** — Khởi tạo bộ rule bg (baseline bg-BG) qua
  `/build-language` Bước 0–4, tra cứu 5 vòng. Nam Slav, hệ chữ Kirin (Cyrl),
  t1. Dataset CLDR/UD/WikiPron: WikiPron **47572 cặp** (rất lớn), corpus
  UD-BTB **11138 câu** (TRÊN 10k — đầy đủ). g2p-check phụ âm <1% (ш/ч/ц/х; ж
  4.22% biến âm cuối). Kỷ luật dữ liệu: щ→[ʃt] "vi phạm" 100% = tokenization
  (đúng 100%); ъ→[ɤ] "vi phạm" 67% = giảm nguyên âm (nhấn [ɤ]/không nhấn [ɐ]).
  corpus-check month-weekday 0.00% + no-non-bulgarian-cyrillic 0.00%. HONORIFIC
  not-applicable (es B-02). Đặc trưng: 30 chữ (ъ [ɤ] nguyên âm, щ [ʃt], không
  ы/э/і; г→[g]), MẤT HẲN cách danh từ (dễ hơn Slavic khác), MẠO TỪ XÁC ĐỊNH
  HẬU TỐ (столът/книгата/детето — độc nhất Slavic), không nguyên mẫu (да+hiện
  tại), evidential -л (chứng kiến vs nghe kể, như -miş Thổ), ти/Вие. D-bg-01
  baseline bg-BG; D-bg-02 chuẩn Институт за български език; D-bg-03 không
  chuyển tự Latin; D-bg-04 chấm C (sai chữ Kirin/gõ Latin = sai; bg không dấu
  phụ nên không có ngoại lệ khoan dung); D-bg-05 dạy ти/Вие. native-review-bg
  7 mục. Trạng thái: `VALIDATED_NOT_YET_PROVEN`, KHÔNG FROZEN.

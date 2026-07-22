---
id: uk/change-log
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [S-TRAINED-KNOWLEDGE]
---

# Ukrainian Change Log

- **0.1.0 (2026-07-19)** — Khởi tạo bộ rule uk (baseline uk-UA) qua
  `/build-language` Bước 0–4, tra cứu 5 vòng. Hệ chữ KIRIN (Cyrl, không Latin),
  Đông Slav, t1. Dataset CLDR/UD/WikiPron: WikiPron **53021 cặp** (bộ rất lớn),
  corpus UD-IU **7092 câu** (dưới 10k — ghi rõ, trên sàn 2000). g2p-check xác
  nhận phụ âm <1% (ж/ш/ч/ц/х/ґ/ї); kỷ luật dữ liệu: iotation я/ю/є ngữ cảnh
  (sau phụ âm → mềm+âm, không [ja/ju/je]) — 'ю→ju' 97% 'vi phạm' đúng quy luật.
  corpus-check month-weekday 0.00% + no-russian-letters 0.06%.
  `grapheme_to_phoneme`, `casing`, `phoneme_inventory`, `forms_of_address`,
  `register_taxonomy`, `tts_audio_policy`, writing_system/charset/direction →
  VALIDATED. Đặc trưng: 33 chữ (і/ї/є/ґ, không ы/э/ъ/ё), г→[ɦ]/ґ→[g], dấu nháy
  ', dấu mềm ь, 7 CÁCH (giữ VOCATIVE — khác ru), quá khứ hợp giống, thể động từ,
  tương lai tổng hợp читатиму, đối lập ти/ви. HONORIFIC not-applicable (es B-02).
  D-uk-01 baseline uk-UA; D-uk-02 chính tả Правопис 2019; D-uk-03 không chuyển
  tự Latin; D-uk-04 chấm thiếu і/ї/є/ґ/ь/' = sai (pl D-64, giữ DRAFT — lưu ý
  ґ/г khoan dung); D-uk-05 dạy đối lập ти/ви + vocative. native-review-uk 7 mục.
  Trạng thái: `VALIDATED_NOT_YET_PROVEN`, KHÔNG FROZEN.

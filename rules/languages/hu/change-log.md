---
id: hu/change-log
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [S-TRAINED-KNOWLEDGE]
---

# Hungarian Change Log

- **0.1.0 (2026-07-20)** — Khởi tạo bộ rule hu (baseline hu-HU) qua
  `/build-language` Bước 0–4. Ural (Finno-Ugric, như fi), chữ Latin 44 chữ
  (gồm digraph cs/dz/dzs/gy/ly/ny/sz/ty/zs) + á é í ó ö ő ú ü ű. Dataset
  CLDR/UD/WikiPron (WikiPron `hun_latn_narrow` 64764 — RẤT LỚN; corpus UD
  Hungarian-Szeged CHỈ 1800, DƯỚI 2000 — corpus check YẾU, ghi rõ). g2p-check
  xác nhận chính tả đều: sz→[s] 1.25% (sz=s không phải ʃ), cs→[t͡ʃ] 1.25%,
  ny→[ɲ] 0.02% (sạch); gy→[ɟ] 10.12% + zs→[ʒ] 15.61% cao hơn (narrow noise,
  dưới ngưỡng) → `grapheme_to_phoneme` VALIDATED. corpus-check casing 0.00–0.17%
  trên 1800 câu (yếu hơn do corpus nhỏ). `grapheme_to_phoneme`, `casing`,
  `word_order`, `forms_of_address`, `punctuation_layout`,
  `diacritics_orthography`, `register_taxonomy`, `tts_audio_policy` → VALIDATED.
  **Trung thực dữ liệu:** corpus 1800 (dưới 2000) — casing yếu, ghi rõ; hoà âm
  nguyên âm + ~18 hậu tố cách + chia định/bất định ở lexical/paradigm, cần bảng
  hậu tố + người bản ngữ. HONORIFIC not-applicable (es B-02). Đặc trưng: **chắp
  dính** (agglutinative), **HOÀ ÂM NGUYÊN ÂM** (-ban/-ben), **chia định/bất
  định** (látom/látok), **s=[ʃ] sz=[s]** (ngược Anh), trọng âm âm tiết đầu,
  KHÔNG giống ngữ pháp, trật tự topic-focus, te/ön đối lập T-V (KHÁC
  scandinavia), pro-drop. **4 giả định cần owner duyệt:** D-hu-01 (baseline
  hu-HU), D-hu-02 (te/ön đối lập), D-hu-03 (trình tự dạy hậu tố), D-hu-04
  (thiếu á é í ó ö ő ú ü ű = SAI theo pl D-64, chữ cái riêng; giữ DRAFT flag
  owner). Trạng thái tổng: `VALIDATED_NOT_YET_PROVEN`, KHÔNG FROZEN.

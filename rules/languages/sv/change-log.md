---
id: sv/change-log
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [S-TRAINED-KNOWLEDGE]
---

# Swedish Change Log

- **0.1.0 (2026-07-19)** — Khởi tạo bộ rule sv (baseline sv-SE) qua
  `/build-language` Bước 0–4. Dataset CLDR/UD/WikiPron (WikiPron nhỏ, 5856 cặp);
  g2p-check xác nhận sj/tj/ä/ö/å trên WikiPron thật; corpus-check casing 0.00%
  trên 11734 câu. `grapheme_to_phoneme`, `forms_of_address`, `register_taxonomy`
  → VALIDATED. **Phát hiện thật:** mềm hoá k/g/sk bắn 35–73% do dấu pitch ¹/²
  chặn ^anchor + từ mượn giữ cứng → giữ medium, không giả vờ high. HONORIFIC
  not-applicable (es B-02). D-sv-01 baseline sv-SE; D-sv-02 chấm thiếu å/ä/ö
  áp tiền lệ pl D-64 (dấu là chữ → thiếu = sai), giữ DRAFT flag owner; D-sv-03
  du phổ quát (du-reformen). Đặc trưng: hậu tố xác định, V2, động từ không chia
  theo ngôi (thuận lợi), sj-ljud, pitch accent. Hình thái en/ett + strong verb
  ở lexical_level. Trạng thái tổng: `VALIDATED_NOT_YET_PROVEN`, KHÔNG FROZEN.

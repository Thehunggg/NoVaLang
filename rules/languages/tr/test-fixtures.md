---
id: tr/test-fixtures
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [S-TRAINED-KNOWLEDGE, WIKIPRON, S-UD-CORPUS]
---

# Turkish Test Fixtures — Bộ ca kiểm thử

## Orthography (corpus-check Bước 3, 9761 câu)

- no-q-w-x-native: PASS `Türkçe öğreniyorum.` / FAIL `Wikipedia web sitesi.`
- (KHÔNG có month-lowercase check — tiếng Thổ hoa tháng ở ngày cụ thể)

## g2p (g2p-check Bước 3, WikiPron 12321 từ)

- ş/j/ü/ı <2%: `şeker`→[ʃ...], `gün`→[y...], `kız`→[...ɯ...]
- c/ç đúng (artifact tokenization): `Acem`→[a d͡ʒ e m]
- ğ: `dağ`→[daː] (kéo dài)

## Grammar (mẫu cố định — paradigm cần native)

- hoà âm: PASS `evler`, `atlar`, `gözüm`, `okulum` / FAIL `evlar`, `atler`
- SOV: PASS `Ben kitap okuyorum.` / FAIL `Ben okuyorum kitap.`
- biến âm: PASS `kitabı`, `rengi` / FAIL `kitapı`, `renki`

## Register

- sen/siz: PASS `Nasılsın?` / `Nasılsınız?` — FAIL `Siz nasılsın?`
- Bey/Hanım sau tên: PASS `Ahmet Bey, hoş geldiniz.` / FAIL `Bey Ahmet...`

Câu pass ưu tiên lấy từ corpus thật khi có (Bước 3.6).

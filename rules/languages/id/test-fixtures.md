---
id: id/test-fixtures
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: guidance-only
depends_on: []
sources: [S-TRAINED-KNOWLEDGE, WIKIPRON, S-UD-CORPUS]
---

# Indonesian Test Fixtures — Bộ ca kiểm thử

## Orthography (corpus Bước 3, 5598 câu)

- casing: PASS `Hari ini hari Senin.` (tháng/thứ HOA) / FAIL `bulan januari`
- láy dấu nối: PASS `buku-buku` / FAIL `buku buku`
- (KHÔNG có month-lowercase check — tiếng Indonesia hoa tháng/thứ như Anh)

## g2p (g2p-check Bước 3, WikiPron 18590 từ)

- digraph: `nyanyi`→[ɲ...], `bunga`→[...ŋ...], `syarat`→[ʃ...]
- c/j đúng (artifact tokenization); y trong ny/sy (digraph-precedence)
- 'e' schwa: `emas`→[əmas] / `enak`→[enak] (lexical)

## Grammar (mẫu cố định — nghĩa phụ tố cần native)

- meN- biến âm mũi: PASS `menulis`, `membaca`, `mengirim` / FAIL `mentulis`
- tính từ sau danh từ: PASS `rumah besar` / FAIL `besar rumah`
- thì qua hư từ: PASS `saya sudah makan` / FAIL `saya makaned`

## Register

- đại từ: PASS `Apa kabar Anda?` / `Apa kabar kamu?`
- kami/kita: PASS `Kita pergi bersama.` (bao gồm) / `Kami sudah selesai.` (loại trừ)

Câu pass ưu tiên lấy từ corpus thật khi có (Bước 3.6).

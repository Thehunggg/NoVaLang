# Pipeline log — vi

Nhật ký `/build-language vi`. Mỗi dòng: bước · ngày giờ · kết quả chính. Dùng để
phiên sau **resume** đúng chỗ. File này là nhật ký quy trình, không phải rule.

- **Bước 0 (inventory) · 2026-07-18 · 🛑 DỪNG chờ owner (đợt hỏi 1)** — Kiểm kê
  21 hiện tượng tiếng Việt → `coverage.json` (stage 0-inventory) + `sources.json`
  (7 nguồn: CLDR, UD Vietnamese-VTB, WikiPron vie 3 giọng, S-CONTENT-NATURALNESS,
  S-BASE, Wikipedia, S-OWNER-REVIEW). Hai hiện tượng trung tâm khác hẳn en/ja:
  `tone_system` (6 thanh điệu phân biệt nghĩa hoàn toàn) và `pronoun_system`
  (đại từ = từ thân tộc chọn theo tuổi/vai vế, không có cặp I/you cố định).
  Tier t1+t3 (catalog). Tự áp theo pattern ja/en: scope "đủ dùng tái dùng"
  (D-34), tất cả kỹ năng (D-35), owner tự review vi (decisions.md, người bản
  ngữ — S-OWNER-REVIEW). 3 câu hỏi đợt 1: giọng chuẩn (Q1, ảnh hưởng phoneme +
  TTS + g2p), gợi ý đọc dấu thanh (Q2), chính sách chấm thiếu/sai dấu (Q3).
- **Bước 0 trả lời · 2026-07-18 · owner (chọn hết phương án khuyến nghị)** —
  D-43 giọng Hà Nội, D-44 gợi ý đọc dấu thanh (ẩn mặc định + toggle), D-45
  thiếu/sai dấu thanh chấm SAI (không phải typo). Ghi decisions.md, chạy tiếp
  không dừng.
- **Bước 1 (import dataset) · 2026-07-18 · XONG** — CLDR (charset đầy đủ dấu
  thanh) → orthography.data.json. UD Vietnamese-VTB → word-class.data.json (17
  nhãn UPOS). WikiPron vie_latn_hanoi_narrow_filtered (theo D-43 Hà Nội) →
  grapheme-to-phoneme.data.json, 24.796 mục — có ký hiệu thanh điệu Chao tone
  letters thật (˧˧/˨˩/˨˦...). Validator PASS.

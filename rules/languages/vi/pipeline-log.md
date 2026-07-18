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

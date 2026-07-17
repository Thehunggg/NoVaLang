# Pipeline log — en

Nhật ký `/build-language en`. Mỗi dòng: bước · ngày giờ · kết quả chính. Dùng để
phiên sau **resume** đúng chỗ. File này là nhật ký quy trình, không phải rule.

- **Bước 0 (inventory) · 2026-07-17 · 🛑 DỪNG chờ owner (đợt hỏi 1)** — Kiểm kê
  23 hiện tượng tiếng Anh → `coverage.json` (stage 0-inventory) + `sources.json`
  (7 nguồn: CLDR, UD English-EWT, WikiPron eng, S-EN-STYLE narrative DRAFT,
  S-CONTENT-NATURALNESS, S-BASE, Wikipedia). Điểm khác ja: en CÓ hoa/thường
  (casing), chính tả sâu (g2p bất quy tắc), reading-aid thường không cần nhưng
  cần quyết định vì chính tả sâu. Tier t1+t3 (catalog). Tự áp theo pattern ja:
  scope "đủ dùng tái dùng" (D-34), tất cả kỹ năng (D-35), owner tự review en
  (decisions.md). 2 câu hỏi đợt 1: reading-aid phát âm (Q1), giọng en-US/en-GB
  (Q2). Style-and-register.md DRAFT của Codex giữ nguyên làm narrative (allowlist).

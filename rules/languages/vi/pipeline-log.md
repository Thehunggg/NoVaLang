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
- **Bước 2 (derive) · 2026-07-18 · XONG** — Khung 34 claim đóng. 2 lượt: A =
  narrative nội bộ 0/34 (narrative không có gì riêng vi — dự đoán đúng), D =
  Wikipedia 23/28. Diff: 0 trùng, 0 lệch, **23 chỉ-Wikipedia** (medium, có
  trích dẫn — không nguồn thứ hai mở trong môi trường mạng phiên này, cùng
  tình huống với en). Thử thêm 2 WebSearch trực tiếp cho 5 claim bị bỏ: vẫn
  không đủ bằng chứng cho `casing.*` (3), `politeness_particle_da.a_marks_politeness`
  (1) — đưa Bước 4 hỏi trực tiếp (owner bản ngữ tự xác nhận được, không cần
  nguồn ngoài). `pronoun_system.neutral_pronouns_exist` bị bỏ vì Wikipedia MÂU
  THUẪN nội bộ → cũng đưa Bước 4. Sinh 4 file rule:
  orthography/phonology/grammar/pragmatics.rules.json (fixtures đủ pass+fail,
  gồm bộ 6 từ minimal-pair thanh điệu ma/má/mà/mả/mã/mạ). Validator PASS.
- **Bước 3 (corpus check) · 2026-07-18 · XONG** — UD Vietnamese-VTB riêng chỉ
  1.123 câu (dưới 2.000, YẾU) → bổ sung mẫu báo chí MIT (binhvq/news-corpus,
  demo-full+demo-title, khử trùng lặp) đạt **3.077 câu**, vượt mốc. Ghi rõ đây
  là mẫu 1.000 dòng của corpus lớn hơn (111 triệu câu), không phải toàn bộ.
  `corpus-check.mjs`: dấu kết câu vi phạm 1.88% (tiêu đề báo không chấm) — dưới
  ngưỡng, không bác rule. **Tự phát hiện + sửa 2 lỗi ngay trong lúc chạy:** (1)
  check "no-double-tone-diacritic-typo" tôi viết ra hóa ra bắt nhầm dấu nháy
  trích dẫn báo chí ("Cấm dừng...") — XÓA check này vì gây hiểu lầm dù tỷ lệ
  vi phạm (4.22%) dưới ngưỡng 20%, không đợi tới lúc bị phát hiện là sai. (2)
  `g2p-check.mjs` thiếu khoảng trắng trong charset (cụm nhiều âm tiết như địa
  danh) → phủ báo sai 22.48%; sửa tool (luôn cho phép khoảng trắng), phủ thật
  99.67%. Đo thanh điệu trên WikiPron: huyền→˨ và sắc→˧˦ khớp 100% (sau khi tự
  sửa lỗi dùng nhầm chữ số thay ký tự Unicode Chao tone letter ở lần đo đầu).
  Fixtures bổ sung câu thật. Validator PASS.
- **Bước 4 (review) · 2026-07-18 · 🛑 DỪNG CHỜ OWNER** — `review-checklist.md`:
  3 mục (R-01 viết hoa, R-02 tiểu từ "ạ", R-03 đại từ trung tính — cả 3 là sự
  thật cơ bản Wikipedia không nêu đủ rõ, owner bản ngữ tự xác nhận được) · ~3
  phút. Không cần native-review-vi.md. Validator PASS. Chờ owner trả lời.

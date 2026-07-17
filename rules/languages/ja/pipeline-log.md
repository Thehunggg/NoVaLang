# Pipeline log — ja

Nhật ký `/build-language ja`. Mỗi dòng: bước · ngày giờ · kết quả chính. Dùng để
phiên sau **resume** đúng chỗ. File này là nhật ký quy trình, không phải rule.

- **Phần G (scaffold, lần chạy đầu) · 2026-07-18** — Dựng hạ tầng pipeline:
  `_schema/` (5 schema + allowlist), `_base/` (6 rule sản phẩm), `_script/Latn/`,
  `decisions.md` (D-01…D-33), `pairs/`, `catalog.json` (60 ngôn ngữ, DRAFT chờ
  owner), `exercise-phenomena.map.json` (Q1–Q14), `tools/` (validate, resolve,
  import-dataset, derive, corpus-check), `.gitignore`. Owner chọn **Option A**
  (D-33): giữ 16 file `ja` FROZEN làm narrative, ráp lớp máy bao quanh. Validator
  9 invariant: **PASS**.
- **Bước 0 (inventory) · 2026-07-18 · XONG** — Kiểm kê 30 hiện tượng tiếng Nhật →
  `coverage.json` (stage 0-inventory, tách rule_level/lexical_level) + `sources.json`
  (14 nguồn: S-REPO-IMPL, S-FROZEN, CLDR/UD/WIKIPRON, bunka.go.jp ×5, W3C, JF ×2,
  BCCWJ). Validator PASS. ⚠ D-11 (mâu thuẫn romaji theo trình độ) ghi nhận → Bước 4.
  **DỪNG chờ owner: đợt hỏi số 1** (phạm vi dạy, ưu tiên kỹ năng, native reviewer,
  duyệt catalog 60).
- **Bước 0 trả lời · 2026-07-18** — Owner: D-34 phạm vi "đủ dùng tái dùng" · D-35
  ưu tiên hết · D-36 sẽ có native review (soạn checklist) · D-37 duyệt catalog 60.
- **Bước 1 (import dataset) · 2026-07-18** — Bắt đầu: CLDR (charset) → UD (word class)
  → WikiPron (g2p).
- **Bước 1 · 2026-07-17 · XONG** — Import WikiPron hoàn tất: ja không có bản
  phonemic, dùng 3 file narrow_filtered (hira 2320 + kata 2623 + hani 16767 =
  21710 cặp) → `grapheme-to-phoneme.data.json`. Importer wikipron mở rộng nhận
  nhiều `--url` (tái dùng cho ngôn ngữ đa hệ chữ). Validator PASS.
- **Bước 2 (derive) · 2026-07-17 · XONG** — Egress chặn Wikipedia/Tatoeba/bunka
  trực tiếp → nguồn thay thế: nrGrammar (Kamermans, GitHub raw), W3C JLREQ
  (GitHub raw), Wikipedia qua WebSearch. 4 lượt derive độc lập (A=FROZEN 17,
  B=nrGrammar 47, C=JLREQ 4, D=Wikipedia 51 trên 51 claim) điền khung claim đóng
  `derive/claims-template.json`; `derive.mjs diff-multi` (mode mới, tái dùng):
  **45 trùng → medium/ai-cross-checked · 3 lệch → review Bước 4** (irregular
  verbs có ある?; 。、 vs ．，×2) · 3 chỉ-1-nguồn (giữ nguyên, có ghi chú).
  Phát hiện: hồ sơ FROZEN thiên governance, ít mô tả ngôn ngữ. Sinh 4 file rule:
  `orthography/phonology/grammar/pragmatics.rules.json` (fixtures pass+fail đủ).
  Validator PASS.
- **Bước 3 (corpus check) · 2026-07-17 · XONG** — Corpus 9100 câu thật (UD GSD
  train/dev/test + PUD; Tatoeba/Wikipedia bị egress chặn nên không đạt mốc
  10000 — ghi số thật, vẫn > 2000). `corpus-check.mjs` (sửa 1 lỗi cú pháp có
  sẵn): 3 text-assert vi phạm 0%/0%/0.01% — sạch. `g2p-check.mjs` (tool mới,
  tái dùng): ー→ː 0/937 · っ→gemination 1/525 (từ tượng thanh) · ん→nasal khớp
  (52 ca ɲ̟ = đồng hoá trước âm vòm) · charset phủ 99.37% WikiPron (thiếu toàn
  kana cổ). Fixtures pass bổ sung câu thật từ corpus. Validator PASS.
  → KHÔNG có rule nào bị corpus bác; hàng đợi review Bước 4 giữ nguyên 3 điểm
  lệch từ Bước 2 + D-11.
- **Bước 4 (review) · 2026-07-17 · 🛑 DỪNG CHỜ OWNER** — `review-checklist.md`:
  2 mục thường (R-01 irregular verbs 2-vs-3; R-02 quy ước dấu câu) + D-11
  (mâu thuẫn romaji, không tính trần) · ~7 phút. Soạn `native-review-ja.md`
  (tiếng Anh, 15 tick, ~5 phút) theo D-36. Validator PASS. Chờ owner trả lời
  rồi mới áp dụng + cập nhật decisions.md.
- **Bước 4 trả lời · 2026-07-17 · owner** — R-01: **B** (2 động từ bất quy tắc
  する・くる → D-38). R-02: **A** (chỉ dạy 。、 → D-39). D-11: **bản (ii)**
  (A0–B1 ẩn romaji + toggle; B2–C2 không toggle → D-11 giải quyết). Đã áp dụng
  vào grammar/orthography.rules.json + coverage (điểm lệch → chốt, reading_aid
  low→medium). Validator PASS. Hàng đợi review = RỖNG.
- **Bước 5 · 2026-07-17 · dừng ở VALIDATED (chưa freeze)** — Gate 5 đòi VALIDATED
  ≥ 48h mới freeze; chạy lần đầu nên dừng ở VALIDATED đúng chuẩn, chờ owner xác
  nhận lần 2 sau ≥ 48h. Native review (`native-review-ja.md`) vẫn mở, không chặn.
- **Ghi chú hạ tầng (đã giải quyết) · 2026-07-17** — Ghi chú cũ "commit bị chặn,
  chờ owner" đã lỗi thời: toàn bộ scaffold + Bước 0 + đầu Bước 1 đã nằm trong
  commit `f0083a7`, và `main` đã fast-forward lên đúng commit đó. Từ giờ commit +
  push lên `main` sau mỗi bước.

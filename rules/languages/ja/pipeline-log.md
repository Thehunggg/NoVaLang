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
- **Ghi chú hạ tầng (đã giải quyết) · 2026-07-17** — Ghi chú cũ "commit bị chặn,
  chờ owner" đã lỗi thời: toàn bộ scaffold + Bước 0 + đầu Bước 1 đã nằm trong
  commit `f0083a7`, và `main` đã fast-forward lên đúng commit đó. Từ giờ commit +
  push lên `main` sau mỗi bước.

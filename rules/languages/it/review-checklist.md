# it — Review checklist (Bước 4)

**Phiên tự động, KHÔNG có owner để trả lời.** Đã tự quyết theo quy tắc tra
cứu. Mỗi mục ghi rõ đã chọn gì + nguồn. Trạng thái ngôn ngữ:
`VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT`, KHÔNG FROZEN.

2 mục, đọc < 5 phút. Đều là **quyết định sản phẩm**. Sự kiện ngôn ngữ Ý thuần
tuý → `native-review-it.md`.

Không có front-matter.

---

## [D-it-01] Baseline vùng miền cho tiếng Ý

Tiếng Ý chuẩn hoá cao (Standard Italian / italiano standard), ít biến thể
vùng ảnh hưởng dạy học so với es (không có tú/vos). Khác biệt vùng chủ yếu ở
phát âm (Bắc/Nam) + vài từ vựng, không ảnh hưởng ngữ pháp/chính tả cốt lõi.

**A.** `it-IT` (Standard Italian) làm baseline — dataset WikiPron/UD dùng bản
này, chuẩn quốc tế.
**B.** Biến thể vùng khác.

**Đã tự chọn A** (it-IT). Nguồn: WikiPron `ita_latn_broad` + UD Italian-ISDT
là chuẩn Ý; Duolingo/Babbel dùng it-IT. Rủi ro thấp, dữ liệu sẵn có.

> **TỰ QUYẾT (chưa có owner) 2026-07-19: Chọn A (it-IT).** `coverage.json`
> `tts_audio_policy` = VALIDATED, locale it-IT.

---

## [D-it-02] Chính sách chấm điểm khi thiếu/sai dấu phụ

Gõ `perche` thay `perché`, `e` thay `è` — lỗi bàn phím phổ biến. Dấu phụ
tiếng Ý phân biệt nghĩa (e 'và' / è 'thì-là'; da 'từ' / dà 'cho'; si/sì).

**A.** Chấp nhận (normalize bỏ dấu).
**B.** Cảnh báo nhẹ (accept nhưng hiện dạng có dấu đúng).
**C.** Coi là sai.

**Đã tự chọn B** (cảnh báo nhẹ) — TỰ ÁP theo TIỀN LỆ es B-03: owner đã chọn
"cảnh báo nhẹ" cho es vì tilde đổi nghĩa từ (si/sí). Tiếng Ý cùng tình huống
(e/è, da/dà đổi nghĩa) → pattern lặp lại, áp cùng chính sách. `coverage.json`
`answer_acceptance_it` giữ DRAFT tới khi owner xác nhận (chính sách chấm điểm,
cần field UI hiển thị gợi ý dấu — thuộc implementation).

> **TỰ QUYẾT (chưa có owner) 2026-07-19: Chọn B (cảnh báo nhẹ), theo tiền lệ
> es B-03.** Nếu owner muốn khác (chấp nhận hoàn toàn A), cập nhật sau.

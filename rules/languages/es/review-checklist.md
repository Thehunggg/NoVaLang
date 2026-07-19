# es — Review checklist (Bước 4)

**Trạng thái: 3/3 mục ĐÃ DUYỆT bởi Project Owner, 2026-07-19.** Xem quyết
định cụ thể ngay dưới mỗi mục. `coverage.json` đã cập nhật tương ứng
(phenomenon liên quan chuyển DRAFT → VALIDATED); trạng thái ngôn ngữ vẫn
`VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT`, không FROZEN.

3 mục, đọc ước lượng < 5 phút. Đều là **quyết định sản phẩm** (owner không
cần biết tiếng Tây Ban Nha để trả lời).

Không có front-matter (checklist thao tác, cùng quy ước README/pipeline-log).

---

## [B-01] Baseline vùng miền (dialect) cho tiếng Tây Ban Nha

Tiếng Tây Ban Nha không có MỘT chuẩn duy nhất. Khác biệt lớn nhất: xưng hô
(tú/usted/vos/vosotros) và phát âm (seseo/distinción). Ảnh hưởng: nội dung
xưng hô dạy, TTS locale, và toàn bộ `style-and-register.md`.

**A.** Trung tính quốc tế: tú + ustedes (không vosotros, không voseo),
phát âm seseo (dataset WikiPron đã import sẵn dùng bản này) — giống cách
`en` đã chọn "General International English".
**B.** Peninsular (Tây Ban Nha): tú/usted/vosotros/ustedes đầy đủ, phát âm
distinción — cần import lại WikiPron bản khác (hiện KHÔNG có sẵn trên
WikiPron, cần nguồn dữ liệu khác).
**C.** Để mở, chưa quyết — giữ DRAFT tất cả phenomenon phụ thuộc.

**Tôi khuyên chọn A** vì dữ liệu dataset (WikiPron, UD) đã sẵn có cho hướng
này, và tú/ustedes là tổ hợp DUY NHẤT được hiểu ở mọi vùng nói tiếng Tây
Ban Nha (Peninsular hiểu tú dù ít voseo hơn; Mỹ Latin hiểu ustedes dù ít
vosotros hơn) — rủi ro thấp nhất.

**Nếu bạn không trả lời, tôi sẽ tự chọn C** (giữ DRAFT — đây là quyết định
sản phẩm ảnh hưởng lâu dài, không phải việc tôi tự quyết được).

> **✅ ĐÃ DUYỆT — Project Owner, 2026-07-19: Chọn A** (baseline Mỹ Latin
> trung tính: tú + ustedes, seseo). **Ghi chú owner cho nội dung tương
> lai:** vosotros dạy ở mức NHẬN BIẾT tại chặng Cao cấp, không bắt học
> viên dùng chủ động. `coverage.json` phenomenon `forms_of_address` →
> `VALIDATED`.

---

## [B-02] Xử lý HONORIFIC-modifier khi tiếng Tây Ban Nha không có hệ tương ứng

Taxonomy 6-mức của NovaLang có modifier `HONORIFIC` (dùng cho ja kính ngữ,
ko -시-/khiêm nhường ngữ). Tiếng Tây Ban Nha KHÔNG có hệ kính ngữ hình thái
riêng biệt — lịch sự chỉ thể hiện qua lựa chọn đại từ (usted) và từ vựng.

**A.** Đánh dấu `HONORIFIC: not-applicable` cho es — usted đã đủ diễn tả
qua FORMAL, không cần modifier riêng.
**B.** Vẫn giữ HONORIFIC nhưng map vào một tập từ vựng trang trọng đặc biệt
(vd "Su Señoría", ngôn ngữ ngoại giao/pháp lý) — phức tạp hơn, ít cần thiết
cho app dạy giao tiếp hàng ngày.

**Tôi khuyên chọn A** vì nhất quán với nguyên tắc "cấm bịa biến thể cho đủ
ô" đã chốt trong `_base/register.rules.json` — không có bằng chứng thật
cho B ở mức độ app cần.

**Nếu bạn không trả lời, tôi sẽ tự chọn A** (an toàn hơn, không tự phát
minh hệ thống không có bằng chứng).

> **✅ ĐÃ DUYỆT — Project Owner, 2026-07-19: Chọn A.** `coverage.json`
> phenomenon `register_taxonomy` → `VALIDATED` (gộp chung với quyết định
> B-01).

---

## [B-03] Chính sách chấm điểm khi thiếu/sai tilde

Gõ `como` thay `cómo`, `el` thay `él` — lỗi bàn phím rất phổ biến, đặc biệt
với người dùng bàn phím không có phím tắt tilde dễ dàng. Đã có tiền lệ
tương tự trong repo: D-45 (dấu thanh tiếng Việt — coi lỗi dấu là "gõ sai
kiểu lỗi chính tả nhẹ, không phải sai hoàn toàn").

**A.** Chấp nhận (normalize bỏ qua dấu tilde khi so khớp đáp án).
**B.** Cảnh báo nhẹ (accept nhưng hiện gợi ý tilde đúng).
**C.** Coi là sai (tilde là một phần đáp án đúng, đặc biệt khi tilde phân
biệt nghĩa như `el`/`él`).

**Tôi khuyên chọn B** vì tilde ở tiếng Tây Ban Nha, khác dấu thanh tiếng
Việt, đôi khi thay đổi cả từ loại/nghĩa (`el`/`él`, `si`/`sí`) — chấp nhận
hoàn toàn (A) có thể dạy sai thói quen, nhưng coi là sai tuyệt đối (C) quá
khắt khe cho lỗi bàn phím phổ biến. B cân bằng.

**Nếu bạn không trả lời, tôi sẽ tự chọn A** (dùng nguyên `_base`
`normalize_ignore` mặc định — không override, nhất quán với ko/en, không tự
thêm tính năng UI mới cho B mà chưa được duyệt).

> **✅ ĐÃ DUYỆT — Project Owner, 2026-07-19: Chọn B** (cảnh báo nhẹ + hiện
> tilde đúng — KHÔNG bỏ qua hoàn toàn, vì tilde đổi nghĩa từ: si/sí, el/él).
> `coverage.json` phenomenon `answer_acceptance_es` → `VALIDATED`. Cần bổ
> sung field UI hiển thị gợi ý tilde đúng (thuộc phạm vi implementation,
> chưa làm).

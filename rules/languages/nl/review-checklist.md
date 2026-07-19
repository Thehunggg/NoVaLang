# nl — Review checklist (Bước 4)

**Phiên tự động, KHÔNG có owner để trả lời.** Đã tự quyết theo quy tắc tra
cứu 3 vòng. Mỗi mục ghi rõ đã chọn gì, đi tới vòng mấy, nguồn. Trạng thái ngôn
ngữ: `VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT`, KHÔNG FROZEN.

2 mục, đọc < 5 phút. Đều là **quyết định sản phẩm**. Sự kiện ngôn ngữ Hà Lan
thuần tuý → `native-review-nl.md`.

Không có front-matter (checklist thao tác).

> **✅ CẬP NHẬT 2026-07-19: owner ĐÃ DUYỆT cả 2 mục sản phẩm bên dưới**
> (D-nl-01, D-nl-02 — xem dấu ✅ ở cuối mỗi mục). `native-review-nl.md` GIỮ
> NGUYÊN chờ người bản ngữ. Status KHÔNG đổi (VALIDATED_NOT_YET_PROVEN, không
> FROZEN). Ghi kèm: `decisions.md` D-64.

---

## [D-nl-01] Baseline vùng miền: Hà Lan (nl-NL) hay Bỉ/Flemish (nl-BE)

Tiếng Hà Lan có 2 chuẩn: Hà Lan (nl-NL) và Flanders/Bỉ (nl-BE, "Vlaams").
Khác nhau: phát âm (g mềm hơn ở miền Nam), xưng hô (gij/ge Flemish), một phần
từ vựng. Ngữ pháp/chính tả chuẩn (Taalunie) thống nhất phần lớn.

**A.** `nl-NL` (Hà Lan) làm baseline.
**B.** `nl-BE` (Flemish).

**Đã tự chọn A (nl-NL) — chốt ở VÒNG 1 (đồng thuận).**
- VÒNG 1: dataset WikiPron `nld` + UD Dutch-Alpino/LassySmall là chuẩn Hà Lan;
  Duolingo/Babbel dạy nl-NL; nl-NL phổ biến quốc tế hơn. Không cần vòng 2/3.

> **TỰ QUYẾT (chưa có owner) 2026-07-19: Chọn A (nl-NL).** `tts_audio_policy`
> = VALIDATED, locale nl-NL. Owner có thể thêm nl-BE sau (tách rõ, không trộn).

> **✅ OWNER ĐÃ DUYỆT 2026-07-19: baseline nl-NL (không Flemish).** Chốt chính thức.

---

## [D-nl-02] Chấm điểm khi thiếu trema/dấu, và ij/y

Học viên gõ `geinteresseerd` thay `geïnteresseerd`, `een` thay `één`, hoặc thay
`ij` bằng `y`. Trema tách âm tiết; một số dấu ĐỔI NGHĨA (één 'một' số / een
'mạo từ'; vóór/voor).

**A.** Chấp nhận (normalize bỏ trema/dấu).
**B.** Cảnh báo nhẹ (accept nhưng hiện dạng chuẩn).
**C.** Coi là sai.

**Đã tự chọn B (cảnh báo nhẹ) — TỰ ÁP tiền lệ es B-03 (VÒNG 1).**
- Owner đã chọn "cảnh báo nhẹ" cho es vì dấu đổi nghĩa. Tiếng Hà Lan cùng tình
  huống (één/een, vóór/voor đổi nghĩa) → pattern lặp lại. `ij` KHÔNG chấp nhận
  thay bằng `y` (ij là chữ Hà Lan). `answer_acceptance_nl` giữ DRAFT tới khi
  owner xác nhận.

> **TỰ QUYẾT (chưa có owner) 2026-07-19: Chọn B (cảnh báo nhẹ), theo tiền lệ
> es B-03.** Nếu owner muốn khác (A: chấp nhận hoàn toàn), cập nhật sau.

> **✅ OWNER ĐÃ DUYỆT 2026-07-19: phương án B (trema/dấu cảnh báo nhẹ, tiền lệ
> es B-03).** Owner đồng ý GIỮ `answer_acceptance_nl` ở **DRAFT**.

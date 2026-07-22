# pt — Review checklist (Bước 4)

**Phiên tự động, KHÔNG có owner để trả lời.** Đã tự quyết theo quy tắc tra
cứu 3 vòng (nguồn lớn nhất → nguồn uy tín nhất + app học tiếng lớn → vòng nữa
bằng nguồn khác). Mỗi mục ghi rõ đã chọn gì, đi tới vòng mấy, nguồn. Trạng thái
ngôn ngữ: `VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT`, KHÔNG FROZEN.

3 mục, đọc < 6 phút. Đều là **quyết định sản phẩm** (owner không cần biết tiếng
Bồ để trả lời). Sự kiện ngôn ngữ Bồ thuần tuý → `native-review-pt.md`.

Không có front-matter (checklist thao tác).

> **✅ CẬP NHẬT 2026-07-19: owner ĐÃ DUYỆT cả 3 mục sản phẩm bên dưới**
> (D-pt-01, D-pt-02, D-pt-03 — xem dấu ✅ ở cuối mỗi mục). Các mục
> `native-review-pt.md` GIỮ NGUYÊN chờ người bản ngữ (owner không tự duyệt
> được). Trạng thái ngôn ngữ KHÔNG đổi (vẫn `VALIDATED_NOT_YET_PROVEN`, không
> FROZEN). Ghi kèm: `decisions.md` D-61.

---

## [D-pt-01] Baseline vùng miền: Brazil hay Bồ Đào Nha

Tiếng Bồ có 2 chuẩn lớn: Brazil (pt-BR, ~210 triệu người) và Bồ Đào Nha
(pt-PT, ~10 triệu). Khác nhau: phát âm (vòm hoá ti/di, `l` cuối chỉ có ở BR),
từ vựng (ônibus/autocarro, trem/comboio, celular/telemóvel), xưng hô (você BR /
tu PT), một phần chính tả đã hợp nhất sau Acordo 1990.

**A.** `pt-BR` (Brazil) làm baseline.
**B.** `pt-PT` (Bồ Đào Nha).
**C.** Để mở.

**Đã tự chọn A (pt-BR) — chốt ở VÒNG 1 (đồng thuận).**
- VÒNG 1: dataset WikiPron dùng `por_bz` (Brazil), UD Portuguese-GSD là Brazil;
  số người nói BR gấp ~20 lần PT; Duolingo dạy Brazilian Portuguese, Babbel mặc
  định Brazilian. Tất cả nguồn lớn nhất trỏ cùng một hướng → không cần vòng 2/3.

> **TỰ QUYẾT (chưa có owner) 2026-07-19: Chọn A (pt-BR).** `coverage.json`
> `tts_audio_policy` = VALIDATED, locale pt-BR. Owner có thể đổi sang pt-PT
> sau; sẽ phải import lại WikiPron `por_po` + xử lý khác biệt phát âm/từ vựng.

> **✅ OWNER ĐÃ DUYỆT 2026-07-19: baseline pt-BR (Brazil).** Chốt chính thức,
> thay dòng "TỰ QUYẾT (chưa có owner)" phía trên.

---

## [D-pt-02] Có dạy chia động từ `tu` không, hay chỉ `você`

pt-BR baseline dùng `você` (chia như ngôi 3 số ít: *você fala*). `tu` tồn tại ở
vài vùng BR (Nam, Đông Bắc) nhưng khẩu ngữ thường vẫn chia ngôi 3 (*tu fala*)
thay chuẩn (*tu falas*). Dạy chia `tu` đầy đủ (falas/tens/és) làm tăng gánh nặng
mà phần lớn người học BR không dùng.

**A.** Chỉ dạy `você` (chia ngôi 3), KHÔNG dạy chia `tu`. `o senhor/a senhora`
cho trang trọng.
**B.** Dạy cả `tu` (chia đầy đủ ngôi 2).

**Đã tự chọn A (chỉ você) — chốt ở VÒNG 1 (đồng thuận).**
- VÒNG 1: giáo trình BR chuẩn + Duolingo BR dạy você làm ngôi 2 chính; `você`
  phủ toàn quốc; ngay cả vùng dùng `tu` cũng thường chia ngôi 3 trong khẩu ngữ.
  Đồng thuận nguồn lớn → dừng vòng 1. (Nếu owner chọn pt-PT ở D-pt-01 thì đảo:
  pt-PT dạy `tu` chia đầy đủ.)

> **TỰ QUYẾT (chưa có owner) 2026-07-19: Chọn A (chỉ dạy você).**
> `forms_of_address` VALIDATED với baseline você. Gắn với D-pt-01 (nếu đổi sang
> pt-PT phải xem lại mục này).

> **✅ OWNER ĐÃ DUYỆT 2026-07-19: chỉ dạy você (chia ngôi 3), không dạy chia
> tu.** Chốt chính thức.

---

## [D-pt-03] Chấm điểm khi thiếu/sai dấu hoặc cedilha

Học viên gõ `voce` thay `você`, `nao` thay `não`, `faca` thay `faça` — lỗi bàn
phím phổ biến. Dấu + til + cedilha tiếng Bồ **phân biệt nghĩa** (é 'là' / e 'và';
está 'đang' / esta 'này'; faca 'con dao' / faça 'hãy làm'; avó 'bà' / avô 'ông').

**A.** Chấp nhận (normalize bỏ dấu).
**B.** Cảnh báo nhẹ (accept nhưng hiện dạng có dấu đúng).
**C.** Coi là sai.

**Đã tự chọn B (cảnh báo nhẹ) — TỰ ÁP tiền lệ es B-03 (VÒNG 1, không cần thêm).**
- Owner đã chọn "cảnh báo nhẹ" cho es (B-03) vì tilde đổi nghĩa từ. Tiếng Bồ
  cùng tình huống (dấu/til/cedilha đổi nghĩa) → pattern lặp lại, áp cùng chính
  sách (Phần B mục 2). `answer_acceptance_pt` giữ DRAFT tới khi owner xác nhận
  (chính sách chấm điểm, cần field UI hiển thị gợi ý dấu — thuộc implementation).

> **TỰ QUYẾT (chưa có owner) 2026-07-19: Chọn B (cảnh báo nhẹ), theo tiền lệ
> es B-03.** Nếu owner muốn khác (A: chấp nhận hoàn toàn), cập nhật sau.

> **✅ OWNER ĐÃ DUYỆT 2026-07-19: phương án B (thiếu dấu/cedilha cảnh báo nhẹ,
> tiền lệ es B-03).** Owner đồng ý GIỮ `answer_acceptance_pt` ở **DRAFT**.

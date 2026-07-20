# th — Review checklist (Bước 4)

**Phiên tự động, KHÔNG có owner để trả lời trực tiếp lúc build.** Đã tự quyết
theo quy tắc tra cứu + tiền lệ owner đã duyệt cho hệ chữ riêng (el/hi: dạy chữ
gốc, trợ đọc ẩn dần; hi D-hi-04 + pl D-64: dấu bắt buộc = sai). Mỗi mục ghi rõ
đã chọn gì, đi tới vòng mấy, nguồn. Trạng thái ngôn ngữ:
`VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT`, KHÔNG FROZEN.

4 mục, đọc < 8 phút. Đều là **quyết định sản phẩm**. Sự kiện ngôn ngữ Thái
thuần tuý → `native-review-th.md`.

Không có front-matter (checklist thao tác).

---

## [D-th-01] Baseline vùng miền cho tiếng Thái

Tiếng Thái chuẩn = Trung Thái (Bangkok), do Raชบัณฑิตยสภา (Hội đồng Hoàng gia)
chuẩn hoá. Có phương ngữ Bắc/Đông Bắc (Isan)/Nam nhưng chuẩn là Trung Thái.

**A.** `th-TH` (Trung Thái/Bangkok) làm baseline.
**B.** Phương ngữ khác.

**Đã tự chọn A (Trung Thái/Bangkok) — chốt ở VÒNG 1.**
- VÒNG 1: dataset WikiPron `tha` + UD Thai-PUD + CLDR th là Trung Thái chuẩn.
  Không cần vòng 2/3.

> **TỰ QUYẾT (chưa có owner) 2026-07-20: Chọn A (th-TH Trung Thái).**
> `tts_audio_policy` = VALIDATED, locale th-TH.

---

## [D-th-02] Dạy chữ Thái trực tiếp hay chuyển tự

Hệ chữ Thái khó (abugida + thanh). Có thể dạy qua chuyển tự Latin (RTGS) hoặc
dạy chữ Thái trực tiếp.

**A.** Dạy CHỮ THÁI trực tiếp; chuyển tự chỉ là trợ đọc nhập môn (ẩn dần).
**B.** Dạy chủ yếu qua chuyển tự Latin.

**Đã tự chọn A — TỰ ÁP TIỀN LỆ el/hi (dạy chữ gốc trực tiếp).**
- VÒNG 1: el (chữ Hy Lạp) và hi (Devanagari) đã chốt dạy chữ gốc trực tiếp,
  không Greeklish/Latin. Thái cùng loại (hệ chữ riêng) → áp cùng nguyên tắc.
  Chuyển tự RTGS không ghi thanh → không thể là kênh chính.

> **TỰ QUYẾT (chưa có owner) 2026-07-20: Chọn A (dạy chữ Thái trực tiếp).**
> Product decision — xin owner xác nhận.

---

## [D-th-03] Trợ đọc (reading aid) cho người nhập môn

Chữ Thái khó với người mới. Có thể thêm trợ đọc chuyển tự.

**A.** Trợ đọc RTGS/IPA + THANH cho nhập môn, **ẩn dần** theo trình độ (như
hi IAST / ja romaji / el).
**B.** Không trợ đọc (chỉ chữ Thái từ đầu).
**C.** Trợ đọc luôn hiển thị.

**Đã tự chọn A — chốt ở VÒNG 3 (đối chiếu chính sách hi/el).**
- VÒNG 1–2: chữ Thái + thanh khó hơn nhiều so với chữ Latin; người mới cần cầu
  nối.
- VÒNG 3 (đối chiếu repo): hi D-hi-03 (IAST ẩn dần) + ja (romaji ẩn dần) + el
  (không Greeklish nhưng có audio) → mẫu chung: trợ đọc nhập môn ẩn dần. RTGS
  không ghi thanh → cần bổ sung thanh/IPA. `reading_aid_policy` giữ DRAFT.

> **TỰ QUYẾT (chưa có owner) 2026-07-20: Chọn A (trợ đọc RTGS/IPA+thanh, ẩn
> dần).** Giữ DRAFT. Xin owner xác nhận (đặc biệt: RTGS hay IPA, có ghi thanh
> không).

---

## [D-th-04] Chấm điểm dấu thanh + dấu nguyên âm

Dấu thanh (่ ้ ๊ ๋) và dấu nguyên âm của chữ Thái là **bắt buộc + phân biệt
nghĩa** (đổi dấu thanh = đổi thanh = đổi từ) — GIỐNG BẢN CHẤT matra hi.

**A.** Chấp nhận (bỏ dấu).
**B.** Cảnh báo nhẹ.
**C.** Coi thiếu/sai = SAI; không nhận chuyển tự Latin.

**Đã tự chọn C — TỰ ÁP TIỀN LỆ hi D-hi-04 + pl D-64.**
- hi D-hi-04 (owner duyệt): matra bắt buộc, thiếu = SAI. Dấu thanh/nguyên âm
  Thái CÙNG bản chất (bỏ = đổi âm/thanh/nghĩa) → áp C. Chuyển tự RTGS/Latin
  không nhận làm đáp án (dạy chữ Thái, D-th-02). Giữ `answer_acceptance_th`
  **DRAFT** + flag owner.
- **GHI CHÚ APP:** nhắc dùng bàn phím Thái (Kedmanee/Pattachote) khi làm bài viết.

> **TỰ QUYẾT (chưa có owner) 2026-07-20: Chọn C (thiếu/sai dấu = sai; không nhận
> Latin), theo hi D-hi-04 + pl D-64.** Giữ DRAFT. Xin owner xác nhận.

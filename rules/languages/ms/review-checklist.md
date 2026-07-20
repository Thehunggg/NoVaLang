# ms — Review checklist (Bước 4)

**Phiên tự động, KHÔNG có owner để trả lời trực tiếp lúc build.** Đã tự quyết
theo quy tắc tra cứu + đối chiếu id (đã build+duyệt) + tiền lệ owner (es B-02).
Mỗi mục ghi rõ đã chọn gì, đi tới vòng mấy, nguồn. Trạng thái ngôn ngữ:
`VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT`, KHÔNG FROZEN.

**LƯU Ý VƯỚNG DỮ LIỆU:** KHÔNG có UD/corpus Mã Lai → nhiều quyết định ngữ pháp
dựa kiến thức + mô tả chuẩn + đối chiếu id, cần người bản ngữ. Không thổi phồng
độ tin.

4 mục, đọc < 8 phút. Đều là **quyết định sản phẩm**. Sự kiện ngôn ngữ Mã Lai
thuần tuý → `native-review-ms.md`.

Không có front-matter (checklist thao tác).

---

## [D-ms-01] Baseline cho tiếng Mã Lai

Mã Lai chuẩn: ms-MY (Malaysia, DBP — Dewan Bahasa dan Pustaka) hay Brunei
(ms-BN). Chuẩn Malaysia phổ biến nhất.

**A.** `ms-MY` (Malaysia) làm baseline.
**B.** Biến thể khác (Brunei, Singapore).

**Đã tự chọn A (ms-MY) — chốt ở VÒNG 1.**
- VÒNG 1: CLDR ms + WikiPron msa nghiêng chuẩn Malaysia; DBP là cơ quan chuẩn
  chính. Không cần vòng 2/3.

> **TỰ QUYẾT (chưa có owner) 2026-07-20: Chọn A (ms-MY).**
> `tts_audio_policy` = VALIDATED, locale ms-MY.

---

## [D-ms-02] Xưng hô: saya/anda baseline lịch sự

Ngôi 1 saya (lịch sự) vs aku (thân); ngôi 2 anda (trang trọng)/awak (thân).

**A.** Dạy saya + anda/awak làm baseline (lịch sự trung tính).
**B.** Dạy aku/awak (thân) làm baseline.

**Đã tự chọn A — chốt ở VÒNG 2.**
- VÒNG 1 (mô tả): saya là đại từ lịch sự trung tính, an toàn với người lạ.
- VÒNG 2 (giáo trình + đối chiếu id): giáo trình Mã Lai dạy saya baseline (như
  id dạy saya) → A.

> **TỰ QUYẾT (chưa có owner) 2026-07-20: Chọn A (saya/anda baseline).**
> `forms_of_address` giữ DRAFT (sắc thái awak/kamu/anda cần người bản ngữ).

---

## [D-ms-03] Nội dung: bahasa baku (chuẩn) hay bahasa pasar (khẩu ngữ)

Khẩu ngữ (bahasa pasar) rút gọn/vay tiếng Anh nhiều; chuẩn viết (bahasa baku)
đầy đủ phụ tố.

**A.** Dạy bahasa baku (chuẩn viết) làm nội dung; ghi nhận bahasa pasar là thực
tế khẩu ngữ.
**B.** Dạy bahasa pasar (khẩu ngữ).

**Đã tự chọn A — chốt ở VÒNG 2 (product decision).**
- VÒNG 1–2: chuẩn viết là mục tiêu học rõ ràng, ổn định; bahasa pasar khó chuẩn
  hoá → dạy baku, ghi nhận pasar.

> **TỰ QUYẾT (chưa có owner) 2026-07-20: Chọn A (bahasa baku).**
> Product decision — xin owner xác nhận.

---

## [D-ms-04] Chấm điểm chính tả (không dấu phụ)

Chính tả Mã Lai chuẩn hiện đại KHÔNG có dấu phụ (a-z thuần). Không có vấn đề
chữ-cái-có-dấu (khác pl/hr/hu).

**A.** Chấm chính tả gốc + digraph (ng/ny/sy) đúng; bình thường hoá dấu câu/
khoảng trắng như _base. KHÔNG cần chính sách dấu đặc biệt.
**B.** (không áp dụng — không có dấu phụ).

**Đã tự chọn A — đơn giản, không cần tiền lệ dấu.**
- Mã Lai không dấu phụ → answer_acceptance chỉ cần chính tả đúng. Không phải
  loại 'chữ cái riêng' (pl) hay 'dấu tuỳ chọn' (fil). Đơn giản nhất trong đợt.

> **TỰ QUYẾT (chưa có owner) 2026-07-20: Chọn A (chấm chính tả đơn giản).**
> `answer_acceptance_ms` VALIDATED (không có dấu phụ nên không cần flag dấu; các
> quyết định KHÁC vẫn cần owner qua D-ms-01..03). Confidence medium do không có
> corpus.

# da — Review checklist (Bước 4)

**Phiên tự động, KHÔNG có owner để trả lời.** Đã tự quyết theo quy tắc tra
cứu (ngôn ngữ tương đối đơn giản về ngữ pháp → 3 vòng). Mỗi mục ghi rõ đã chọn
gì, đi tới vòng mấy, nguồn. Trạng thái ngôn ngữ:
`VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT`, KHÔNG FROZEN.

3 mục, đọc < 6 phút. Đều là **quyết định sản phẩm**. Sự kiện ngôn ngữ Đan Mạch
thuần tuý → `native-review-da.md`.

Không có front-matter (checklist thao tác).

---

## [D-da-01] Baseline vùng miền cho tiếng Đan Mạch

Tiếng Đan Mạch chuẩn hoá cao (rigsdansk, Dansk Sprognævn — Hội đồng Ngôn ngữ
Đan Mạch). Không có biến thể quốc gia cạnh tranh lớn.

**A.** `da-DK` (chuẩn Đan Mạch) làm baseline.
**B.** Biến thể khác.

**Đã tự chọn A (da-DK) — chốt ở VÒNG 1 (không tranh chấp).**
- VÒNG 1: dataset WikiPron `dan` + UD Danish-DDT là chuẩn Đan Mạch; Dansk
  Sprognævn chuẩn hoá; Duolingo dạy da-DK. Không cần vòng 2/3.

> **TỰ QUYẾT (chưa có owner) 2026-07-19: Chọn A (da-DK).** `tts_audio_policy`
> = VALIDATED, locale da-DK.

---

## [D-da-02] du phổ quát hay dạy đối lập du/De

Tiếng Đan Mạch hiện đại dùng `du` cho hầu hết mọi người (như sv). `De` (trang
trọng cao) đã RẤT hiếm — gần như chỉ hoàng gia/văn bản rất trang trọng.

**A.** Dạy `du` phổ quát (baseline), `De` = ghi chú trang trọng cổ.
**B.** Dạy đối lập du/De kiểu de du/Sie.

**Đã tự chọn A (du phổ quát) — chốt ở VÒNG 2.**
- VÒNG 1 (mô tả): du là chuẩn phổ quát ở Đan Mạch hiện đại; De gần như không
  dùng.
- VÒNG 2 (app học tiếng): Duolingo/giáo trình Đan Mạch dạy `du` làm chuẩn,
  không dựng đối lập T-V → xác nhận A. (Giống sv; da thậm chí bỏ De mạnh hơn.)

> **TỰ QUYẾT (chưa có owner) 2026-07-19: Chọn A (du phổ quát).**
> `forms_of_address` VALIDATED với baseline du.

---

## [D-da-03] Chấm điểm khi thiếu/thay æ ø å

æ ø å là **CHỮ CÁI THẬT** (vị trí bảng chữ + từ điển riêng, cuối bảng) — GIỐNG
BẢN CHẤT pl/sv. Bỏ/thay = sai chính tả + đổi từ (læse 'đọc' / lase 'giẻ').

**A.** Chấp nhận (normalize bỏ dấu).
**B.** Cảnh báo nhẹ.
**C.** Coi là SAI (không chấp nhận).

**Đã tự chọn C — TỰ ÁP TIỀN LỆ pl D-64 (owner đã quyết cho pl 2026-07-19).**
- Owner quyết pl D-64: dấu-là-chữ-cái-riêng → thiếu = SAI. æ ø å của da CÙNG bản
  chất (giống sv å/ä/ö đã được owner duyệt C ở D-67) → pattern lặp lại, áp C
  (Phần B mục 2). NHƯNG áp tiền lệ sang ngôn ngữ MỚI → giữ `answer_acceptance_da`
  **DRAFT** + flag owner. Lưu ý 'aa' là biến thể lịch sử của 'å' (Aabenraa) →
  chấp nhận aa=å ở tên riêng lịch sử (không phải bỏ dấu).
- **GHI CHÚ APP (như pl D-64, chưa làm):** app nên nhắc dùng bàn phím Đan Mạch
  hệ thống thay vì nút nhập ký tự trong bài.

> **TỰ QUYẾT (chưa có owner) 2026-07-19: Chọn C (thiếu æ/ø/å = sai), theo tiền
> lệ pl D-64.** Giữ DRAFT. aa=å chấp nhận ở tên riêng lịch sử.

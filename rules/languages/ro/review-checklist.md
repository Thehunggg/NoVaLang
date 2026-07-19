# ro — Review checklist (Bước 4)

**Phiên tự động, KHÔNG có owner để trả lời.** Đã tự quyết theo quy tắc tra
cứu (ngôn ngữ phức tạp → tới 4 vòng). Mỗi mục ghi rõ đã chọn gì, đi tới vòng
mấy, nguồn. Trạng thái ngôn ngữ: `VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT`,
KHÔNG FROZEN.

4 mục, đọc < 7 phút. Đều là **quyết định sản phẩm**. Sự kiện ngôn ngữ Rumani
thuần tuý (mạo từ hậu tố, giống trung, giả định) → `native-review-ro.md`.

Không có front-matter (checklist thao tác).

---

## [D-ro-01] Baseline vùng miền cho tiếng Rumani

Tiếng Rumani chuẩn hoá cao (Academia Română). Tiếng Moldova = cùng ngôn ngữ,
nay dùng Latin — không phải chuẩn cạnh tranh.

**A.** `ro-RO` (chuẩn Rumani) làm baseline.
**B.** Biến thể khác.

**Đã tự chọn A (ro-RO) — chốt ở VÒNG 1 (không tranh chấp).**
- VÒNG 1: dataset WikiPron `ron` + UD Romanian-RRT là chuẩn Rumani; Academia
  Română chuẩn hoá; Duolingo dạy ro-RO. Không cần vòng 2/3.

> **TỰ QUYẾT (chưa có owner) 2026-07-19: Chọn A (ro-RO).** `tts_audio_policy`
> = VALIDATED, locale ro-RO.

---

## [D-ro-02] Chính tả â vs î (cùng âm [ɨ])

â và î cùng âm [ɨ] nhưng chính tả phân biệt. Có LỊCH SỬ CẢI CÁCH: trước 1993 dùng
î khắp nơi (trừ 'român'); Academia Română 1993 khôi phục â ở giữa từ.

**A.** Theo quy tắc 1993 (î đầu/cuối từ + phái sinh; â giữa từ) — chuẩn hiện đại.
**B.** Theo quy ước trước 1993 (î khắp nơi).

**Đã tự chọn A (quy tắc 1993) — chốt ở VÒNG 2.**
- VÒNG 1 (viện ngôn ngữ): Academia Română 1993 là quy tắc chính thức hiện hành.
- VÒNG 2 (thực tế/app): mọi văn bản chuẩn + Duolingo + dataset dùng quy tắc 1993
  (când, român ở giữa; început, a coborî đầu/cuối) → xác nhận A. (Bản trước-1993
  vẫn thấy ở văn cũ, nhưng không phải chuẩn dạy.)

> **TỰ QUYẾT (chưa có owner) 2026-07-19: Chọn A (quy tắc 1993).** Nội dung chuẩn
> theo â/î 1993.

---

## [D-ro-03] Chấm điểm khi thiếu/thay ă â î ș ț

5 dấu Rumani là CHỮ THẬT (đổi âm + nghĩa). Học viên gõ 'romana' thay 'română',
'si' thay 'și'. GIỐNG BẢN CHẤT pl/sv/fi/cs. Thêm điểm riêng: ș/ț đúng phải
comma-below (U+0219/U+021B), không cedilla ş/ţ (lỗi mã hoá phổ biến).

**A.** Chấp nhận (normalize bỏ dấu).
**B.** Cảnh báo nhẹ.
**C.** Coi là SAI (không chấp nhận).

**Đã tự chọn C — TỰ ÁP TIỀN LỆ pl D-64 (owner đã quyết cho pl 2026-07-19).**
- Owner quyết pl D-64: dấu-là-chữ → thiếu = SAI (dạy gõ đúng, bàn phím ngôn ngữ
  đó). 5 dấu Rumani CÙNG bản chất → pattern lặp lại, áp phương án C (Phần B mục
  2). NHƯNG áp tiền lệ sang ngôn ngữ MỚI → giữ `answer_acceptance_ro` **DRAFT**
  + flag owner. Chuẩn hoá comma-below (chấp nhận cedilla-input, chuẩn hoá về
  comma-below khi so khớp — hai cách gõ cùng chữ, không phải bỏ dấu).
- **GHI CHÚ APP (như pl D-64, chưa làm):** app nên nhắc dùng bàn phím Rumani hệ
  thống thay vì nút nhập ký tự trong bài.

> **TỰ QUYẾT (chưa có owner) 2026-07-19: Chọn C (thiếu dấu Rumani = sai), theo
> tiền lệ pl D-64.** Giữ DRAFT. ș/ț: chuẩn hoá cedilla↔comma-below (cùng chữ).

---

## [D-ro-04] Dạy dumneata không

Tiếng Rumani có 3 tầng xưng hô: tu (thân) / dumneata (bán trang trọng) /
dumneavoastră (trang trọng cao). dumneata có sắc thái riêng + ĐANG GIẢM DÙNG.

**A.** Dạy tu + dumneavoastră (bỏ dumneata).
**B.** Dạy cả 3.

**Đã tự chọn A (bỏ dumneata) — chốt ở VÒNG 2.**
- VÒNG 1 (mô tả): dumneata là tầng trung gian phức tạp, sắc thái đặc thù (đôi khi
  bề trên→dưới), đang mờ dần trong tiếng Rumani hiện đại.
- VÒNG 2 (app học tiếng): giáo trình/Duolingo dạy tu + dumneavoastră làm hệ chính
  (2 tầng như es/fr), dumneata ở ghi chú nâng cao → xác nhận A.

> **TỰ QUYẾT (chưa có owner) 2026-07-19: Chọn A (tu + dumneavoastră, bỏ
> dumneata baseline).** `forms_of_address` VALIDATED với 2 tầng chính.

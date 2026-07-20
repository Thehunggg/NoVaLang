# fil — Review checklist (Bước 4)

**Phiên tự động, KHÔNG có owner để trả lời trực tiếp lúc build.** Đã tự quyết
theo quy tắc tra cứu + tiền lệ owner (es B-02 HONORIFIC; ngoại lệ dấu khoan
dung như ru ё). Mỗi mục ghi rõ đã chọn gì, đi tới vòng mấy, nguồn. Trạng thái
ngôn ngữ: `VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT`, KHÔNG FROZEN.

**LƯU Ý CORPUS YẾU:** corpus chỉ 222 câu → nhiều quyết định ngữ pháp dựa kiến
thức, cần người bản ngữ. Không thổi phồng độ tin.

4 mục, đọc < 8 phút. Đều là **quyết định sản phẩm**. Sự kiện ngôn ngữ Filipino
thuần tuý → `native-review-fil.md`.

Không có front-matter (checklist thao tác).

---

## [D-fil-01] Baseline cho tiếng Filipino

Filipino (quốc ngữ) = Tagalog chuẩn hoá, do KWF (Komisyon sa Wikang Filipino)
chuẩn hoá.

**A.** `fil-PH` (Filipino chuẩn) làm baseline.
**B.** Phương ngữ/ngôn ngữ Philippines khác (Cebuano...).

**Đã tự chọn A (fil-PH) — chốt ở VÒNG 1.**
- VÒNG 1: dataset WikiPron `tgl` + UD Tagalog + CLDR fil là Tagalog/Filipino
  chuẩn. Cebuano là mã riêng. Không cần vòng 2/3.

> **TỰ QUYẾT (chưa có owner) 2026-07-20: Chọn A (fil-PH).**
> `tts_audio_policy` = VALIDATED, locale fil-PH.

---

## [D-fil-02] Dạy po/ho làm baseline lịch sự

po/ho là tiểu từ tôn trọng, quan trọng xã hội (thiếu với người lớn tuổi = bất
lịch sự).

**A.** Dạy po/ho làm baseline lịch sự (NATURAL_NEUTRAL_POLITE).
**B.** Bỏ qua po/ho (chỉ dạy câu trần).

**Đã tự chọn A — chốt ở VÒNG 2.**
- VÒNG 1 (mô tả): po/ho là chuẩn mực xã hội Philippines.
- VÒNG 2 (giáo trình): giáo trình Filipino dạy po/ho sớm (chào hỏi lịch sự) → A.

> **TỰ QUYẾT (chưa có owner) 2026-07-20: Chọn A (po/ho baseline lịch sự).**
> `forms_of_address`/`register_taxonomy` giữ DRAFT (vị trí po cần người bản ngữ).

---

## [D-fil-03] Nội dung: Filipino chuẩn hay Taglish

Đời thường trộn tiếng Anh (Taglish) rất phổ biến. Nội dung học nên chuẩn hay
thực tế?

**A.** Dạy Filipino chuẩn làm nội dung; ghi nhận Taglish là thực tế khẩu ngữ.
**B.** Dạy Taglish (trộn Anh).

**Đã tự chọn A — chốt ở VÒNG 2 (product decision).**
- VÒNG 1–2: chuẩn viết Filipino là mục tiêu học rõ ràng; Taglish khó chuẩn hoá
  + phụ thuộc trình độ tiếng Anh người học → dạy chuẩn, ghi nhận Taglish.

> **TỰ QUYẾT (chưa có owner) 2026-07-20: Chọn A (Filipino chuẩn).**
> Product decision — xin owner xác nhận.

---

## [D-fil-04] Chấm điểm accents (á à â) + ñ

Accents đánh dấu trọng âm/glottal nhưng **thường bị bỏ** trong văn thường
([corpus: 0/222 câu có dấu]). Rất KHÁC pl/hr (ở đó dấu bắt buộc).

**A.** Accents TUỲ CHỌN — không bắt buộc, không chấm sai khi thiếu (NGOẠI LỆ
khoan dung, như ru ё). ñ (từ vay) nên đúng khi xuất hiện.
**B.** Bắt buộc accents = sai khi thiếu (kiểu pl D-64).

**Đã tự chọn A — NGOẠI LỆ CÓ CƠ SỞ (khoan dung).**
- Bằng chứng dữ liệu: 0/222 câu corpus có dấu → Filipino chuẩn viết KHÔNG dùng
  accents. Bắt buộc accents sẽ chấm sai văn Filipino BÌNH THƯỜNG → sai. Đây là
  loại 'ngoại lệ có cơ sở' (khoan dung), KHÔNG phải 'chữ cái riêng' (pl). ñ hiếm
  (từ vay TBN) → đúng khi có.

> **TỰ QUYẾT (chưa có owner) 2026-07-20: Chọn A (accents tuỳ chọn, không bắt
> buộc).** Giữ `answer_acceptance_fil` DRAFT. Xin owner xác nhận (đây là loại
> KHÁC pl/hr — khoan dung, không phải bắt buộc).

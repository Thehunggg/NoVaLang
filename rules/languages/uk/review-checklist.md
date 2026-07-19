# uk — Review checklist (Bước 4)

**Phiên tự động, KHÔNG có owner để trả lời.** Tra cứu **5 vòng** cho MỌI quyết
định sản phẩm (V1 nguồn lớn → V2 nguồn uy tín + app học tiếng → V3 corpus/dataset
thật → V4 học thuật → V5 đối chiếu chéo grammar chuẩn). Mỗi mục ghi rõ đã chọn
gì, các vòng ra gì, vì sao. Trạng thái: `VALIDATED_NOT_YET_PROVEN`, KHÔNG FROZEN.

5 mục, đọc < 10 phút. Đều là **quyết định sản phẩm**. Sự kiện ngôn ngữ Ukraina
thuần tuý → `native-review-uk.md`.

Không có front-matter (checklist thao tác).

---

## [D-uk-01] Baseline vùng miền

**A.** `uk-UA` (Standard Ukrainian, Правопис 2019). **B.** Biến thể khác.

**Đã tự chọn A — chốt VÒNG 1 (không tranh chấp).**
- V1: dataset WikiPron `ukr` + UD Ukrainian-IU là chuẩn; CLDR `uk` mặc định
  uk-UA; Правопис 2019 là chuẩn nhà nước. Không biến thể viết cạnh tranh.

> **TỰ QUYẾT 2026-07-19: A (uk-UA).** `tts_audio_policy` VALIDATED, locale uk-UA.

---

## [D-uk-02] Chuẩn chính tả (Правопис)

**A.** Правопис 2019 (bản mới nhất). **B.** Правопис 1993.

**Đã tự chọn A — chốt VÒNG 2.**
- V1: Правопис 2019 là chuẩn chính thức hiện hành (Кабінет Міністрів phê duyệt).
- V2: giáo trình/từ điển Ukraina hiện đại theo 2019. Khác biệt 1993↔2019 nhỏ
  (một số biến thể chính tả). Không cần vòng 3–5.

> **TỰ QUYẾT 2026-07-19: A (Правопис 2019).**

---

## [D-uk-03] Có dùng chuyển tự Latin làm reading aid không

uk là hệ chữ Kirin (mới với người phương Tây).

**A.** Không dùng chuyển tự — dạy chữ Kirin trực tiếp (audio là kênh phát âm).
**B.** Hiện chuyển tự Latin cho nhập môn, ẩn dần. **C.** Luôn hiện.

**Đã tự chọn A — chốt sau VÒNG 3 (product).**
- V1: có chuẩn chuyển tự (KMU 2010, BGN-PCGN) nhưng là CHUYỂN TỰ (cho hộ chiếu/
  bản đồ), không phải hệ chú đọc học tập; nhiều chuẩn khác nhau.
- V2: app học tiếng (Duolingo Ukrainian) dạy bảng chữ Kirin trực tiếp, không
  chuyển tự thường trực.
- V3/tiền lệ: nhất quán el (không Greeklish) + triết lý 'học hệ chữ thật'; chính
  tả Ukraina đều → đọc được sớm, không cần nạng.
- Quyết định sản phẩm → tự chọn A, flag owner.

> **TỰ QUYẾT 2026-07-19: A (không chuyển tự, dạy chữ Kirin trực tiếp).** Nếu
> owner muốn hỗ trợ nhập môn → B (ẩn dần) là lựa chọn hai.

---

## [D-uk-04] Chấm điểm chữ Ukraina đặc thù (і/ї/є/ґ/ь/dấu nháy) + vấn đề ґ/г

і/ї/є/ґ là CHỮ CÁI RIÊNG (đổi âm/nghĩa); dấu nháy ' + ь bắt buộc. NHƯNG ґ [g]
thực tế hay bị thay г [ɦ] (ґ từng bị cấm thời Soviet, vẫn ít dùng).

**A.** Chấp nhận (bỏ qua). **B.** Cảnh báo nhẹ. **C.** Coi là SAI.

**Đã tự chọn C cho і/ї/є/ь/dấu nháy — TỰ ÁP TIỀN LỆ pl D-64; RIÊNG ґ/г đề xuất
khoan dung — chốt sau VÒNG 4, giữ DRAFT + flag owner.**
- V1/V2: і/ї/є là chữ riêng đổi âm/nghĩa (ї[ji]≠і[i]≠и[ɪ]); dấu nháy đổi cách
  đọc (об'єкт). Thiếu = sai chính tả — như pl/da/el (C).
- V4 (học thuật/lịch sử): ґ là ngoại lệ — bị loại khỏi bảng chữ 1933–1990 (Soviet),
  phục hồi 1990 nhưng NHIỀU người Ukraina vẫn viết г thay ґ theo thói quen; một
  số từ dao động (ґрунт/грунт). Giống bản chất ru ё/е (tuỳ chọn thực tế).
- Đề xuất: C cho і/ї/є/ь/dấu nháy (thiếu = sai); **KHOAN DUNG ґ↔г** (chấp nhận
  г thay ґ, hoặc chỉ cảnh báo nhẹ) — cần owner xác nhận. Nhắc cài bàn phím Ukraina.

> **TỰ QUYẾT 2026-07-19: C cho і/ї/є/ь/dấu nháy (pl D-64); ґ/г KHOAN DUNG (như
> ru ё).** Giữ `answer_acceptance_uk` DRAFT + flag owner (điểm ґ/г cần quyết).

---

## [D-uk-05] Dạy đối lập ти/ви + vocative

**A.** Dạy đối lập ти (thân)/ви (lịch sự) + vocative khi gọi. **B.** Một dạng.

**Đã tự chọn A — chốt VÒNG 2.**
- V1: Ukraina dùng sống đối lập ти/ви (ви lịch sự với người lạ/lớn tuổi — chuẩn
  xã hội thật) + vocative khi gọi (пане Петре!).
- V2: giáo trình Ukraina dạy cả hai + vocative. Không cần vòng 3–5.

> **TỰ QUYẾT 2026-07-19: A (dạy đối lập ти/ви + vocative).** `forms_of_address`
> VALIDATED.

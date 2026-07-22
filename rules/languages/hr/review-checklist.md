# hr — Review checklist (Bước 4)

**Phiên tự động, KHÔNG có owner để trả lời trực tiếp lúc build.** Đã tự quyết
theo quy tắc tra cứu + tiền lệ owner đã duyệt cho ngôn ngữ có chữ-cái-riêng (pl
D-64) và T-V (ru/es). Mỗi mục ghi rõ đã chọn gì, đi tới vòng mấy, nguồn. Trạng
thái ngôn ngữ: `VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT`, KHÔNG FROZEN.

4 mục, đọc < 8 phút. Đều là **quyết định sản phẩm**. Sự kiện ngôn ngữ Croatia
thuần tuý → `native-review-hr.md`.

Không có front-matter (checklist thao tác).

---

## ✅ OWNER DUYỆT 2026-07-20 (D-87)

Tất cả 4 mục dưới đây đã được Project Owner DUYỆT (phiên build hr, commit
`5bbda23`):
- **D-hr-01** DUYỆT: baseline hr-HR (Latin, không sr Cyrillic).
- **D-hr-02** DUYỆT: dạy ti/Vi đối lập T-V (Vi + động từ ngôi 2 số nhiều).
- **D-hr-03** DUYỆT: trình tự dạy 7 cách (nom/acc/lok trước, đủ 7 sau).
- **D-hr-04** DUYỆT: thiếu č/ć/š/ž/đ = SAI (chữ cái riêng, pl D-64); digraph
  dž/lj/nj phải đúng. `answer_acceptance_hr` nâng **VALIDATED**. Nhắc cài bàn
  phím Croatia.

Status ngôn ngữ KHÔNG đổi (VALIDATED_NOT_YET_PROVEN). native-review giữ nguyên
chờ người bản ngữ.

---

## [D-hr-01] Baseline vùng miền cho tiếng Croatia

Tiếng Croatia chuẩn (standardni hrvatski, dựa štokavian) do Institut za
hrvatski jezik chuẩn hoá. Khác biệt sr/bs chủ yếu ở từ vựng, không ở chữ.

**A.** `hr-HR` (Croatia chuẩn, Latin) làm baseline.
**B.** Biến thể khác / macrolang Serbo-Croatian.

**Đã tự chọn A (hr-HR) — chốt ở VÒNG 1.**
- VÒNG 1: dataset UD Croatian-SET + CLDR hr là chuẩn Croatia; Latin. WikiPron
  dùng bộ hbs (macrolang) nhưng lọc theo Latin phù hợp hr. Không cần vòng 2/3.

> **TỰ QUYẾT (chưa có owner) 2026-07-20: Chọn A (hr-HR, Latin).**
> `tts_audio_policy` = VALIDATED, locale hr-HR.

---

## [D-hr-02] Xưng hô: dạy ti/Vi đối lập T-V

Croatia có đối lập T-V thật (như ru/es): `ti` (thân mật) / `Vi` (trang trọng,
động từ ngôi 2 số nhiều, viết hoa). KHÁC da/sv (du phổ quát).

**A.** Dạy ti/Vi đối lập.
**B.** Chỉ dạy ti phổ quát kiểu Scandinavia.

**Đã tự chọn A — chốt ở VÒNG 2.**
- VÒNG 1 (mô tả): Croatia giữ T-V thật, Vi phổ biến trong ngữ cảnh trang trọng.
- VÒNG 2 (app học tiếng): giáo trình Croatia dạy ti/Vi đối lập → A.

> **TỰ QUYẾT (chưa có owner) 2026-07-20: Chọn A (ti/Vi đối lập).**
> `forms_of_address` VALIDATED.

---

## [D-hr-03] Trình tự dạy 7 cách

Croatia có 7 cách — quá nhiều để dạy cùng lúc ở trình độ đầu.

**A.** Dạy nominativ/akuzativ/lokativ trước (3 cách hay dùng), mở rộng đủ 7 sau.
**B.** Dạy đủ 7 cách ngay từ đầu.

**Đã tự chọn A — chốt ở VÒNG 2.**
- VÒNG 1 (mô tả): nom (chủ ngữ), acc (tân ngữ), lok (nơi chốn) là 3 cách gặp
  nhiều nhất trong hội thoại cơ bản.
- VÒNG 2 (giáo trình): giáo trình Croatia phổ biến dạy dần từng cách, không đổ
  cả 7 → A. (Đây là quyết định sư phạm, không phải sự kiện ngôn ngữ.)

> **TỰ QUYẾT (chưa có owner) 2026-07-20: Chọn A (dạy dần cách).**
> `case_system` giữ DRAFT (paradigm, cần bảng biến cách + người bản ngữ).

---

## [D-hr-04] Chấm điểm khi thiếu/thay č ć š ž đ

č ć š ž đ là **CHỮ CÁI RIÊNG** (đổi âm/nghĩa thật: č[t͡ʃ]≠ć[t͡ɕ]≠c[t͡s]; š≠s;
ž≠z; đ≠d) — GIỐNG BẢN CHẤT pl. Digraph dž/lj/nj cũng là chữ.

**A.** Chấp nhận (normalize bỏ dấu).
**B.** Cảnh báo nhẹ.
**C.** Coi là SAI (không chấp nhận).

**Đã tự chọn C — TỰ ÁP TIỀN LỆ pl D-64 (owner đã quyết C cho pl 2026-07-19).**
- Owner quyết pl D-64: dấu-là-chữ-cái-riêng → thiếu = SAI. č/ć/š/ž/đ của hr
  CÙNG bản chất (chữ riêng, đổi âm) → pattern lặp lại, áp C (Phần B mục 2). NHƯNG
  áp tiền lệ sang ngôn ngữ MỚI → giữ `answer_acceptance_hr` **DRAFT** + flag
  owner.
- **GHI CHÚ APP (như pl D-64):** app nên nhắc dùng bàn phím Croatia hệ thống.

> **TỰ QUYẾT (chưa có owner) 2026-07-20: Chọn C (thiếu č/ć/š/ž/đ = sai), theo
> tiền lệ pl D-64.** Giữ DRAFT. Xin owner xác nhận.

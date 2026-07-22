# hi — Review checklist (Bước 4)

**Phiên tự động, KHÔNG có owner để trả lời.** Tra cứu **5 vòng** cho MỌI quyết
định sản phẩm. Mỗi mục ghi rõ đã chọn gì, các vòng ra gì, vì sao. Trạng thái:
`VALIDATED_NOT_YET_PROVEN`, KHÔNG FROZEN.

5 mục, đọc < 10 phút. Đều là **quyết định sản phẩm**. Sự kiện ngôn ngữ Hindi
thuần tuý → `native-review-hi.md`.

Không có front-matter (checklist thao tác).

---

## ✅ OWNER DUYỆT 2026-07-20 (D-83)

Tất cả 5 mục dưới đây đã được Project Owner DUYỆT (phiên build hi, commit
`d3caa42`):
- **D-hi-01** DUYỆT: baseline hi-IN.
- **D-hi-02** DUYỆT: dạy Devanagari trực tiếp (chuẩn chính tả).
- **D-hi-03** DUYỆT: trợ đọc IAST nhập môn, ẩn dần (như romaji ja).
- **D-hi-04** DUYỆT: matra/phụ âm/ghép/anusvara + ड़ढ़ bản địa = SAI (pl D-64);
  nukta VAY क़/ख़/ग़/ज़/फ़ = KHOAN DUNG (như ё Nga/ग़ Ukraina). `answer_acceptance_hi`
  nâng **VALIDATED**. Nhắc cài bàn phím Devanagari.
- **D-hi-05** DUYỆT: dạy 3 mức तू/तुम/आप, आप baseline, cảnh báo तू.

Status ngôn ngữ KHÔNG đổi (VALIDATED_NOT_YET_PROVEN). native-review giữ nguyên
chờ người bản ngữ.

---

## [D-hi-01] Baseline vùng miền

**A.** `hi-IN` (Standard Hindi). **B.** Khác.

**Đã tự chọn A — chốt VÒNG 1 (không tranh chấp).**
- V1: dataset WikiPron `hin` + UD Hindi-HDTB là chuẩn; CLDR `hi` mặc định hi-IN;
  Central Hindi Directorate/मानक हिन्दी chuẩn hoá. Không biến thể viết cạnh
  tranh (Urdu là mã riêng ur).

> **TỰ QUYẾT 2026-07-19: A (hi-IN).** `tts_audio_policy` VALIDATED, locale hi-IN.

---

## [D-hi-02] Chuẩn chính tả

**A.** Devanagari chuẩn (Central Hindi Directorate / मानक देवनागरी). **B.** Khác.

**Đã tự chọn A — chốt VÒNG 2.**
- V1/V2: Devanagari chuẩn hoá (केंद्रीय हिन्दी निदेशालय); giáo trình theo đó.
  Không cần vòng 3–5.

> **TỰ QUYẾT 2026-07-19: A.**

---

## [D-hi-03] Reading aid (abugida khó)

**A.** Dạy Devanagari trực tiếp, KHÔNG chuyển tự. **B.** Hỗ trợ chuyển tự IAST
cho nhập môn, ẩn dần (như romaji ja). **C.** Luôn hiện chuyển tự.

**Đã tự chọn B (nghiêng) — chốt sau VÒNG 3, giữ DRAFT + flag owner.**
- V1: Devanagari abugida PHỨC TẠP hơn Kirin/Hy Lạp (matra + ghép) → rào cản đọc
  cao hơn các chữ đã làm. Có chuẩn chuyển tự (IAST học thuật, ITRANS, Hunterian)
  nhưng nhiều hệ.
- V2: app học tiếng (Duolingo Hindi) DÙNG chuyển tự Latin ở giai đoạn đầu khá
  nhiều (khác el/uk) — vì abugida khó.
- V3/tiền lệ: romaji ja "ẩn mặc định, bật được" là mô hình phù hợp. Devanagari
  xứng đáng hỗ trợ nhập môn hơn Kirin (đã chọn không chuyển tự cho uk/bg/el).
- Là quyết định sản phẩm → nghiêng B (IAST ẩn dần), flag owner. Nếu owner muốn
  "chữ thật thuần tuý" như el/uk → A.

> **TỰ QUYẾT 2026-07-19: nghiêng B (IAST hỗ trợ nhập môn, ẩn dần).** Giữ
> `reading_aid_policy` DRAFT + flag owner (khác el/uk vì abugida khó hơn).

---

## [D-hi-04] Chấm điểm Devanagari (matra/phụ âm/ghép + nukta)

Matra bắt buộc phân biệt nghĩa (क≠का≠कि). Nukta: bản địा ड़/ढ़ bắt buộc; vay
क़/ख़/ग़/ज़/फ़ tuỳ chọn.

**A.** Chấp nhận. **B.** Cảnh báo nhẹ. **C.** Coi là SAI.

**Đã tự chọn HAI PHẦN — chốt sau VÒNG 4, giữ DRAFT + flag owner.**
- (1) MATRA + phụ âm + ký tự ghép + anusvara: **C** (thiếu/sai = SAI) — matra
  đổi nghĩa hoàn toàn, là chính tả bắt buộc (tiền lệ pl D-64). ड़/ढ़ (âm bản
  địa) cũng C.
- (2) NUKTA vay (क़/ख़/ग़/ज़/फ़): **KHOAN DUNG** — chuẩn Hindi chấp nhận viết
  không nukta (कागज़=कागज), người bản ngữ hay bỏ — NGOẠI LỆ CÓ CƠ SỞ (như ё
  Nga/circumflex tr). V4 (học thuật): nukta trên chữ vay là tuỳ chọn chính thức.
- Chuyển tự Latin KHÔNG nhận làm đáp án. Nhắc cài bàn phím Devanagari (InScript).

> **TỰ QUYẾT 2026-07-19: C cho matra/phụ âm/ghép/ड़; KHOAN DUNG nukta vay
> क़/ख़/ग़/ज़/फ़.** Giữ `answer_acceptance_hi` DRAFT + flag owner.

---

## [D-hi-05] Dạy mấy mức tôn kính

hi có 3 mức तू/तुम/आप (nhiều hơn T-V 2 mức).

**A.** Dạy cả 3 mức, आप làm baseline an toàn, तुम thân mật, तू cẩn thận. **B.**
Chỉ आप/तुम.

**Đã tự chọn A — chốt VÒNG 2.**
- V1: 3 mức là chuẩn xã hội thật; तू dùng sai dễ thô → phải dạy để tránh. आप an
  toàn với người lạ.
- V2: giáo trình Hindi dạy cả 3 + cảnh báo तू. Không cần vòng 3–5.

> **TỰ QUYẾT 2026-07-19: A (dạy 3 mức, आप baseline, cảnh báo तू).**
> `forms_of_address` VALIDATED.

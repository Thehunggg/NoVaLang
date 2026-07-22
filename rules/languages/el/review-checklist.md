# el — Review checklist (Bước 4)

**Phiên tự động, KHÔNG có owner để trả lời.** el là ngôn ngữ **RẤT KHÓ** (hệ
chữ Hy Lạp mới, không Latin + 3 giống + 4 cách + động từ chia đầy đủ) → theo
quy tắc tra cứu của owner: **5 vòng** cho quyết định sản phẩm. Mỗi mục ghi rõ
đã chọn gì, đi tới vòng mấy, nguồn tìm được gì, vì sao chọn. Trạng thái ngôn
ngữ: `VALIDATED_NOT_YET_PROVEN_ON_REAL_CONTENT`, KHÔNG FROZEN.

5 mục, đọc < 10 phút. Đều là **quyết định sản phẩm**. Sự kiện ngôn ngữ Hy Lạp
thuần tuý → `native-review-el.md`.

Không có front-matter (checklist thao tác).

---

## [D-el-01] Baseline vùng miền cho tiếng Hy Lạp

**A.** `el-GR` (Standard Modern Greek, Hy Lạp) làm baseline.
**B.** el-CY (Hy Lạp đảo Síp) hoặc biến thể khác.

**Đã tự chọn A (el-GR) — chốt ở VÒNG 1 (không tranh chấp).**
- VÒNG 1 (nguồn lớn nhất): dataset WikiPron `ell` + UD Greek-GDT/GUD đều là
  Standard Modern Greek; CLDR `el` mặc định el-GR. Chuẩn hoá quốc gia rõ.
  el-CY là phương ngữ (chủ yếu khẩu ngữ), không có chuẩn viết cạnh tranh với
  SMG. Không cần vòng 2–5.

> **TỰ QUYẾT (chưa có owner) 2026-07-19: Chọn A (el-GR).** `tts_audio_policy`
> = VALIDATED, locale el-GR.
>
> **✅ OWNER DUYỆT 2026-07-19 (D-73): A (baseline el-GR).**

---

## [D-el-02] Monotonic hay polytonic

**A.** Monotonic (1 dấu tonos + dieresis, chuẩn 1982).
**B.** Polytonic (dấu mũ + spiritus cổ).

**Đã tự chọn A (monotonic) — chốt ở VÒNG 2, có bằng chứng corpus.**
- VÒNG 1 (chuẩn nhà nước): cải cách chính tả 1982 của Hy Lạp chính thức thay
  polytonic bằng monotonic cho mọi văn bản hiện đại (trừ tôn giáo/học thuật
  cổ điển). Từ điển/sách giáo khoa Hy Lạp hiện đại dùng monotonic.
- VÒNG 2 (dữ liệu thật): corpus-check 4285 câu UD → **0 ký tự polytonic**
  (khối Greek Extended U+1F00–1FFF). Xác nhận tuyệt đối. Không cần vòng 3–5.

> **TỰ QUYẾT 2026-07-19: Chọn A (monotonic).** `accent_system` +
> `diacritics_orthography` theo monotonic; check corpus PASS 0.00%.
>
> **✅ OWNER DUYỆT 2026-07-19 (D-73): A (monotonic, bỏ polytonic cổ).**

---

## [D-el-03] Có dùng phiên âm Latin (Greeklish) làm reading aid không

el là hệ chữ MỚI (không Latin). Người mới học cần thời gian nhận diện chữ Hy
Lạp. Câu hỏi: có hiển thị phiên âm Latin ("Greeklish") kèm để đỡ bước đầu?

**A.** Không dùng Greeklish — dạy chữ Hy Lạp trực tiếp (audio là kênh phát âm).
**B.** Hiện Greeklish cho trình độ nhập môn, ẩn dần (như chính sách romaji ja).
**C.** Luôn hiện Greeklish.

**Đã tự chọn A — chốt sau VÒNG 3 (product, tự quyết theo lookup + tiền lệ).**
- VÒNG 1 (nguồn học thuật/giáo trình): không có hệ phiên âm Latin CHUẨN cho
  el kiểu Hepburn (ja). "Greeklish" là quy ước chat không chính thức, nhiều
  biến thể mâu thuẫn (θ = th/8/0; χ = x/h/ch) → không đủ tin cậy làm trợ đọc
  dạy học.
- VÒNG 2 (app học tiếng lớn): Duolingo Greek dạy bảng chữ Hy Lạp trực tiếp
  ngay từ đầu, KHÔNG dùng Greeklish làm nạng thường trực. Xác nhận A là chuẩn
  ngành.
- VÒNG 3 (tiền lệ nội bộ + triết lý): NovaLang đã chọn "học hệ chữ thật"
  (romaji ja ẩn mặc định, không thay chữ đích). Chính tả el ĐỀU (khác kanji ja
  — không cần chú đọc bắt buộc). Reading aid el vì thế yếu lý do hơn furigana.
- Là **quyết định sản phẩm** → vẫn phải tới tay owner; tự chọn A và flag.

> **TỰ QUYẾT 2026-07-19: Chọn A (không Greeklish, dạy chữ Hy Lạp trực tiếp).**
> `reading_aid_policy` DRAFT, flag owner. Nếu owner muốn hỗ trợ nhập môn →
> B (ẩn dần) là lựa chọn thứ hai hợp lý.
>
> **✅ OWNER DUYỆT 2026-07-19 (D-73): A (KHÔNG Greeklish, dạy chữ Hy Lạp trực
> tiếp).** `reading_aid_policy` chốt A.

---

## [D-el-04] Chấm điểm khi thiếu/sai tonos hoặc sigma cuối (ς)

tonos là chính tả BẮT BUỘC + phân biệt nghĩa (πότε 'khi nào'/ποτέ 'không bao
giờ'; νόμος/νομός). ς cuối từ bắt buộc theo vị trí. Gõ 'ποτε' hay 'ποτε' thiếu
dấu, hay Greeklish 'pote' — chấm sao?

**A.** Chấp nhận (bỏ qua tonos/ς).
**B.** Cảnh báo nhẹ.
**C.** Coi là SAI (không chấp nhận).

**Đã tự chọn C — TỰ ÁP TIỀN LỆ pl D-64 (owner quyết cho pl 2026-07-19), giữ
DRAFT.**
- VÒNG 1 (nguồn chính tả): tonos monotonic bắt buộc trên từ đa âm tiết; bỏ =
  sai chính tả chuẩn. ς/σ bắt buộc theo vị trí.
- VÒNG 2 (phân biệt nghĩa): tonos phân biệt cặp tối thiểu thật (πότε/ποτέ) →
  không thể coi là "trang trí".
- Tiền lệ owner: pl D-64 (dấu-là-chữ → thiếu = SAI); cùng bản chất pl/da (đã
  áp C). tonos el KHÁC dấu pl một chút (pl: dấu tạo CHỮ CÁI riêng; el: tonos
  là dấu trọng âm trên cùng chữ) → **vì thế giữ DRAFT + flag owner**: có thể
  owner muốn nới tonos ở trình độ nhập môn (người mới học hệ chữ mới), trong
  khi ς/σ + Greeklish thì vẫn nghiêm. Đề xuất mặc định: thiếu tonos = SAI,
  Greeklish = SAI.
- **GHI CHÚ APP (như pl D-64, chưa làm):** app nên nhắc dùng bàn phím Hy Lạp
  hệ thống; cân nhắc chế độ "nhập môn nới tonos" (owner quyết).

> **TỰ QUYẾT 2026-07-19: Chọn C (thiếu tonos/sai ς = sai; Greeklish không
> chấp nhận), theo tiền lệ pl D-64.** Giữ `answer_acceptance_el` DRAFT vì
> el là hệ chữ MỚI — cần owner xác nhận độ nghiêm với người mới học.
>
> **✅ OWNER DUYỆT 2026-07-19 (D-73): C (thiếu tonos/sai ς = SAI, Greeklish
> không nhận).** `answer_acceptance_el` nâng **VALIDATED**.

---

## [D-el-05] Dạy đối lập εσύ/εσείς hay dùng một dạng phổ quát

KHÁC da/sv (owner đã duyệt "du phổ quát"): tiếng Hy Lạp GIỮ đối lập T-V thật.

**A.** Dạy đối lập εσύ (thân mật) / εσείς (lịch sự/số nhiều) — như fr tu/vous.
**B.** Dùng một dạng phổ quát.

**Đã tự chọn A (dạy đối lập) — chốt ở VÒNG 2.**
- VÒNG 1 (mô tả chuẩn): tiếng Hy Lạp hiện đại DÙNG SỐNG đối lập εσύ/εσείς;
  εσείς lịch sự với người lạ/lớn tuổi/cấp trên là chuẩn mực xã hội thật (khác
  da/sv đã san phẳng thành du). Không thể bỏ.
- VÒNG 2 (app học tiếng): Duolingo/giáo trình Hy Lạp dạy cả hai, phân biệt
  ngữ cảnh → xác nhận A. Không cần vòng 3–5.

> **TỰ QUYẾT 2026-07-19: Chọn A (dạy đối lập εσύ/εσείς).** `forms_of_address`
> VALIDATED với cả hai dạng; `register_taxonomy` map εσείς → FORMAL.
>
> **✅ OWNER DUYỆT 2026-07-19 (D-73): A (dạy đối lập εσύ/εσείς — giữ T-V thật
> của Hy Lạp, khác da/sv).**

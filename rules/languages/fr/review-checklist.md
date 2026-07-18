# fr — Review checklist (Bước 4)

3 mục, đọc ước lượng < 5 phút. Đều là **quyết định sản phẩm**.

Không có front-matter (checklist thao tác, cùng quy ước ko/es).

---

## [C-01] Phân biệt FORMAL vs NATURAL_NEUTRAL_POLITE khi cả hai đều dùng "vous"

Khác es (usted riêng biệt tú), tiếng Pháp chỉ có MỘT đại từ lịch sự
(`vous`) cho cả giao tiếp lịch sự thường ngày VÀ trang trọng cao. Ngữ pháp
không tự phân biệt 2 mức này.

**A.** Không phân biệt ở mức ngữ pháp — FORMAL chỉ khác NATURAL_NEUTRAL_POLITE
ở LỰA CHỌN TỪ VỰNG (formal dùng từ trang trọng hơn: "je vous prie de" thay
"pouvez-vous"), cả hai đều dùng cấu trúc `vous` giống nhau.
**B.** Coi tiếng Pháp không thật sự cần phân biệt FORMAL riêng — gộp FORMAL
vào NATURAL_NEUTRAL_POLITE cho fr (một mức `vous` duy nhất).

**Tôi khuyên chọn A** vì giữ nguyên taxonomy 6-mức nhất quán qua mọi ngôn
ngữ (không tạo ngoại lệ cấu trúc), và từ vựng trang trọng khác biệt là có
thật trong tiếng Pháp (thư từ hành chính, giao tiếp ngoại giao).

**Nếu bạn không trả lời, tôi sẽ tự chọn A** (giữ nguyên taxonomy, không tạo
ngoại lệ cấu trúc mà chưa được duyệt).

---

## [C-02] Chính sách chấm điểm khi thiếu dấu phụ/dấu nháy elision

Gõ thiếu `é/è/ê` hoặc gõ "le ami" thay "l'ami" — lỗi phổ biến, đặc biệt
elision là LỖI CHÍNH TẢ (không phải phong cách như liaison).

**A.** Chấp nhận (normalize bỏ qua dấu phụ, nhưng vẫn chấm elision như một
phần đáp án đúng vì đó là chính tả bắt buộc, không phải trang trí).
**B.** Cảnh báo nhẹ cho cả 2 loại lỗi.
**C.** Coi cả 2 là sai hoàn toàn.

**Tôi khuyên chọn A với phân biệt:** dấu phụ (accent) → normalize bỏ qua
như `_base` mặc định (giống es/ko); elision (l'/d'/qu'...) → GIỮ NGUYÊN yêu
cầu đúng vì đây là chính tả cơ bản (khác dấu phụ vốn không đổi nghĩa từ),
bỏ qua elision dạy sai thói quen chính tả từ đầu.

**Nếu bạn không trả lời, tôi sẽ tự chọn dùng nguyên `_base` mặc định cho cả
2 loại** (không override — an toàn nhất, nhất quán với ko/es, không tự
thêm phân biệt phức tạp chưa được duyệt).

---

## [C-03] Baseline vùng miền (Pháp métropolitain vs Québécois)

Nhẹ hơn B-01 của es (không ảnh hưởng ngữ pháp cốt lõi tu/vous/giống/chia
động từ) nhưng vẫn ảnh hưởng phát âm/từ vựng/TTS locale.

**A.** `fr-FR` (Pháp métropolitain) làm baseline — dataset WikiPron/UD đã
dùng nguồn chủ yếu Pháp.
**B.** `fr-CA` (Québécois) hoặc song song cả hai.

**Tôi khuyên chọn A** vì dữ liệu đã có sẵn theo hướng này, và fr-FR là biến
thể được dạy phổ biến nhất quốc tế.

**Nếu bạn không trả lời, tôi sẽ tự chọn A** (theo dữ liệu đã có, rủi ro
thấp nhất).

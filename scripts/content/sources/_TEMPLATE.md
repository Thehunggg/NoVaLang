# NguỒn nội dung — TEMPLATE (file nguồn riêng cho một ngôn ngữ)

> **Đây là TEMPLATE, không phải file thật.** Khi thật sự build bài cho ngôn ngữ
> `X`, copy file này thành `scripts/content/sources/<X>.md`, điền đầy đủ V1..V5 +
> giấy phép, rồi mới build. **KHÔNG tạo sẵn 33 file rỗng.**
>
> Quy trình 5 vòng (định nghĩa theo LOẠI) nằm ở `LESSON_AUTHORING_STANDARD.md`
> §F-b — file này chỉ ĐIỀN TÊN NGUỒN CỤ THỂ cho một ngôn ngữ. Đây là tầng NỘI
> DUNG BÀI, tách khỏi `rules/languages/<X>/sources.json` (nguồn build RULE ngôn
> ngữ học — dataset). Đừng lẫn hai file.

---

## Metadata

| Trường | Giá trị |
|---|---|
| `languageCode` | `<X>` (BCP-47, vd `ja`) |
| Tên ngôn ngữ | … |
| Cấp độ đang nhắm | … (theo khung năng lực chính thức của ngôn ngữ này) |
| Cập nhật lần cuối | YYYY-MM-DD |
| Trạng thái | `DRAFT` \| `READY_FOR_AUTHORING` |

---

## V1 — Tài liệu chuẩn của viện ngôn ngữ chính thức (NGUỒN CHÍNH + chốt chặn cuối)

- **Viện ngôn ngữ chính thức:** … (tên cơ quan nhà nước/viện phụ trách tiếng đó)
- **Bộ tài liệu:** … (tên, phiên bản)
- **URL chính thức:** … (trang gốc — **phải mở kiểm điều khoản trước khi dùng**)
- **Miễn phí?** … · **Có audio?** … · **Đối tượng:** …
- **Giấy phép — được PHỎNG THEO vào sản phẩm không?** … (nếu chưa xác minh → ghi
  "CHƯA XÁC MINH — đọc điều khoản gốc trước khi dùng")

## V2 — Giáo trình lớn thứ hai (dùng khi V1 không phủ chủ đề)

- **Bộ tài liệu:** … · **Cùng viện / uy tín tương đương?** …
- **URL:** … · **Miễn phí?** … · **Có audio?** …
- **Giấy phép:** …

## V3 — Giáo trình thương mại phổ biến nhất (CHỈ đối chiếu cách trình bày)

- **Bộ tài liệu:** … (thường **bản quyền** — không mở nguyên văn)
- **Cách dùng:** đối chiếu **mức chủ đề / thứ tự trình bày ngữ pháp sơ cấp**.
  **KHÔNG bịa số bài / số trang**, KHÔNG chép nguyên văn.

## V4 — Hai app học tiếng lớn (CHỈ đối chiếu, KHÔNG dùng làm nguồn chính)

- **App 1:** … · **App 2:** …
- **Cách dùng:** đối chiếu cách trình bày / độ khó / thứ tự dạy. Không lấy nội
  dung của app làm nội dung bài.

## V5 — Khung năng lực chính thức + kỳ thi chuẩn (kiểm ĐÚNG CẤP ĐỘ)

- **Khung năng lực:** … (khung năng lực chính thức của ngôn ngữ này)
- **Kỳ thi chuẩn:** … (kỳ thi chuẩn của ngôn ngữ này, nếu có)
- **Cách dùng:** kiểm từ/ngữ pháp có thuộc trình độ đang dạy không, hay vượt.

---

## Tầng X — NGUỒN XÁC MINH NGÔN NGỮ (feed §G8; điền trước khi build)

Ba câu hỏi tầng X phải **tra được từ NGUỒN DỮ LIỆU** (không trí nhớ mô hình). Mỗi
mục điền: **tên nguồn · đường lấy (URL / dataset / công cụ) · GIẤY PHÉP · giới
hạn**.

- **X1 — Cấu trúc BẮT BUỘC của từ** (từ đòi thành phần ngữ pháp nào; biến đổi dạng
  ra sao):
  - Nguồn: … · Đường lấy: … · Giấy phép: … · Giới hạn: …
- **X2 — Kết hợp từ THỰC TẾ (corpus)** (người bản ngữ có thật sự ghép các từ này):
  - Nguồn: … · Đường lấy: … · Giấy phép: … · Giới hạn: …
- **X3 — Loại từ + biến đổi dạng** (từ thuộc loại nào, chia/biến đổi theo quy tắc
  nào):
  - Nguồn: … · Đường lấy: … · Giấy phép: … · Giới hạn: …

## Danh sách CỤM CỐ ĐỊNH (feed §G1 / §G2)

- Đường dẫn file danh sách cụm cố định (LOẠI A) của ngôn ngữ này: …
- Trạng thái duyệt: `CHƯA KHỞI TẠO` \| `CHỜ OWNER DUYỆT` \| `ĐÃ DUYỆT`
- Nghi ngờ một cụm thuộc LOẠI A hay B → **xử như LOẠI A + hỏi owner** bổ sung danh
  sách (§G1).

## PHẦN CỐT LÕI KHÔNG ĐƯỢC THAY khi thay thế theo mẫu (feed §G3)

- Khi thay thế trong mẫu ngữ pháp (LOẠI B), phần nào của mẫu là **"cốt lõi không
  được đụng"** (chỉ được thay từ nội dung trong ô trống, giữ nguyên phần này): …

---

## Ghi chú giấy phép (QUAN TRỌNG)

- Nêu rõ từng tài nguyên: **được nhúng vào app** hay **chỉ tham chiếu** cho người
  viết bài.
- Audio của nguồn ngoài: mặc định **KHÔNG nhúng** trừ khi điều khoản gốc cho phép
  rõ ràng. App dùng speech/TTS sinh theo text của NovaLang.
- **Phải đọc điều khoản gốc trên trang chính thức trước khi dùng bất cứ tài
  nguyên nào của nguồn đó vào sản phẩm.**

## Ghi chú riêng của ngôn ngữ này

- … (đặc thù chữ viết / reading aid / register / chủ đề nhạy cảm … nếu có)

---

## ĐIỀU KIỆN SẴN SÀNG BUILD (điền đủ hết mới được build bài đầu tiên)

Vòng tra khởi động ngôn ngữ mới KHÔNG chỉ là giáo trình — phải điền đủ cả **tầng
X + giấy phép** rồi mới build (§F-b):

- [ ] **V1..V5** điền tên nguồn cụ thể + giấy phép từng nguồn.
- [ ] **Tầng X** (X1 / X2 / X3) có nguồn tra được + đường lấy + giấy phép + giới
      hạn.
- [ ] **Danh sách cụm cố định:** `ĐÃ DUYỆT` (hoặc owner xác nhận tạm chấp nhận).
- [ ] **Phần cốt lõi không được thay:** đã định nghĩa.
- Thiếu **bất kỳ** mục nào → **DỪNG, chưa build** (§F-b, §G8).

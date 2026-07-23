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

## ĐƯỜNG DẪN FILE NGUỒN CỤC BỘ (`local-sources/`, nếu ngôn ngữ này có)

> `local-sources/` đã **gitignore toàn bộ** — file gốc (PDF/scan/sách…) không
> bao giờ được commit/push, dù có bản quyền hay không. Mục này chỉ ghi
> **DANH MỤC/METADATA** (file nào dạy gì), KHÔNG chép nội dung nguyên văn.

**Quy ước thư mục (bắt buộc, để nhất quán — không tự chế mỗi ngôn ngữ một
kiểu):**

- Mỗi ngôn ngữ **một** thư mục gốc: **`local-sources/<mã ISO>/`** — dùng
  đúng mã ISO đang dùng trong `rules/languages/<mã>/` (vd `ja`, `ko`, `zh`),
  **KHÔNG** dùng tên tiếng Anh đầy đủ (không `japanese/`, `korean/`…) để
  tránh lệch với hệ mã đã có trong repo.
- Bên trong, chia theo **LOẠI nguồn** (folder con KHÔNG DẤU, không tên tiếng
  Việt có dấu — tránh lỗi mã hoá đường dẫn): ví dụ `irodori/`,
  `grammar-books/`, `vocab-3000/`, `jmdict/` — tên cụ thể tuỳ ngôn ngữ, miễn
  **mô tả rõ loại nguồn** + nhất quán trong chính ngôn ngữ đó. Không bắt buộc
  đúng 4 tên này — mỗi ngôn ngữ có thể có loại nguồn khác.

**Khi có file nguồn cục bộ mới (owner bỏ PDF vào, hoặc bắt đầu ngôn ngữ
mới):** Claude quét bằng cách **MỞ FILE THẬT** (không đoán qua tên file) —
với mỗi file, xác định: **(a)** tên file, nằm thư mục con nào; **(b)** **CHỮ
THẬT hay ẢNH SCAN** (cần OCR) — trích thử một đoạn văn bản, ảnh scan sẽ
không trích được gì hoặc chỉ ra lỗi; **(c)** nguồn/bộ sách gì, cấp độ nào,
chủ đề/phạm vi nào — rồi ghi thành **bảng danh mục** vào mục này (file nguồn
riêng của ngôn ngữ đó), theo đúng khuôn bảng đã dùng ở
`scripts/content/sources/ja.md` (mục "Danh mục FILE NGUỒN CỤC BỘ"). Ghi rõ
**giới hạn đã biết** (file nào chưa OCR được, file nào trùng lặp/chưa rõ
ranh giới…) — không giấu.

**Bảng danh mục ở đây (điền khi có file):**

| File | Bộ / cấp độ | Chủ đề · phạm vi | Chữ thật hay ảnh scan |
|---|---|---|---|
| … | … | … | … |

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
- [ ] **Nếu có file nguồn cục bộ** (`local-sources/<mã>/`): đã quét + ghi bảng
      danh mục ("ĐƯỜNG DẪN FILE NGUỒN CỤC BỘ" ở trên), đã xác định file nào
      chữ thật / file nào ảnh scan cần OCR.
- Thiếu **bất kỳ** mục nào → **DỪNG, chưa build** (§F-b, §G8).

---

## GHI CHÚ CHO OWNER — thêm ngôn ngữ mới có tài liệu offline (PDF/scan)

Khi muốn thêm nguồn cục bộ (PDF/sách scan/audio…) cho một ngôn ngữ:

1. Tạo thư mục **`local-sources/<mã ISO>/`** (vd `local-sources/ko/`) — dùng
   đúng mã ISO như trong `rules/languages/<mã>/`.
2. Bỏ file (PDF/…) vào trong, chia theo loại nguồn nếu có nhiều loại (thư
   mục con tuỳ đặt, không dấu — Claude có thể đề xuất tên khi quét).
3. Nói Claude: **"quét local-sources/<mã>/ và ghi danh mục vào file nguồn
   riêng"** — Claude sẽ mở từng file thật, xác định chữ thật/ảnh scan, ghi
   bảng danh mục vào `scripts/content/sources/<mã>.md` (mục "ĐƯỜNG DẪN FILE
   NGUỒN CỤC BỘ" ở trên), y như đã làm cho `ja`.
4. `local-sources/` luôn gitignore — file gốc KHÔNG BAO GIỜ được commit, chỉ
   commit bảng danh mục + luật (do Claude viết, không chép nguyên văn sách).

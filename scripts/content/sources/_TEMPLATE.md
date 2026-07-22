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
| Cấp độ đang nhắm | … (vd A1–A2 / N5) |
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

- **Khung năng lực:** … (vd JF Standard / CEFR)
- **Kỳ thi chuẩn:** … (vd JLPT N5)
- **Cách dùng:** kiểm từ/ngữ pháp có thuộc trình độ đang dạy không, hay vượt.

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

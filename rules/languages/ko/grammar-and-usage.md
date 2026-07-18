---
id: ko/grammar-and-usage
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: grammar.rules.json
depends_on: [ko/writing-system]
sources: [S-TRAINED-KNOWLEDGE, UD]
---

# Korean grammar and usage

## Trật tự từ

SOV (Subject-Object-Verb), topic-prominent — giống ja về loại hình, khác về
cơ chế bề mặt (조사 luôn dính liền, không tách rời như は/を của ja).
Động từ/tính từ luôn ở cuối câu; trật tự các thành phần khác tương đối tự do
vì được đánh dấu vai trò ngữ pháp bằng 조사, không phải vị trí.

## 조사 (particle) chính — xem `grammar-particles.md`

Bảng patchim-conditioned pairs (은/는, 이/가, 을/를) nằm trong
`grammar.rules.json` config. Quy tắc chọn theo patchim (âm tiết trước có
hay không có phụ âm cuối) là quy tắc âm vị học rõ ràng, không tranh cãi.

## Chia động từ/tính từ

Không chia theo ngôi/số (khác tiếng Âu) — chia theo gốc + đuôi. Hoà âm
nguyên âm (vowel harmony) quyết định đuôi 아/어: gốc có nguyên âm ㅏ hoặc ㅗ
-> 아; còn lại -> 어.

5 lớp động từ bất quy tắc (ㅂ/ㄷ/르/ㅅ/ㅎ bất quy tắc) đã liệt kê tên nhưng
**chưa có bảng động từ cụ thể theo từng lớp** — xem GIẢ ĐỊNH CẦN NGƯỜI DUYỆT
A-04.

## Hệ số đếm kép

Xem `grammar.rules.json` config `numeral_systems` — số thuần Hàn (하나둘셋)
và số Hán-Hàn (일이삼) dùng trong ngữ cảnh khác nhau, đặc biệt giờ nói theo
số thuần Hàn + phút theo số Hán-Hàn TRONG CÙNG cụm ('한 시 삼십 분'). Đây là
điểm khác biệt cấu trúc thật với ja (ja chủ yếu dùng một hệ Hán-Nhật với vài
đọc thuần Nhật cho counter, không có sự phân công theo-ngữ-cảnh rõ ràng như
Hàn).

## Lượng từ/counter

Bảng counter-theo-danh-từ (개/명/마리/장...) lớn, chưa đủ nguồn — xem GIẢ
ĐỊNH CẦN NGƯỜI DUYỆT A-05, cùng tình trạng ja's counters phenomenon.

## Provenance

`S-TRAINED-KNOWLEDGE` (ngữ pháp chuẩn phổ thông) + `UD` (word class dataset,
xác nhận ADP=252/thống kê thật cho 조사 trong corpus Korean-GSD).

## Chưa giải quyết

- Bảng động từ bất quy tắc cụ thể theo 5 lớp (A-04).
- Bảng counter-theo-danh-từ (A-05).

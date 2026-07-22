---
id: ko/romanization
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: phonology.rules.json
depends_on: [ko/pronunciation]
sources: [S-NIKL-ROMAN, S-WIKI-ROMAN]
---

# Korean romanization — Revised Romanization (RR)

## Chuẩn được chọn

**Revised Romanization of Korean** (국어의 로마자 표기법, National Institute
of Korean Language, công bố 2000-07-07) — chuẩn chính thức duy nhất của Hàn
Quốc hiện nay. **KHÔNG** dùng McCune-Reischauer (chuẩn cũ hơn, vẫn phổ biến
trong xuất bản học thuật quốc tế nhưng không còn là chuẩn chính phủ Hàn
Quốc) — quyết định chọn RR dựa trên việc đây là chuẩn app sẽ dạy người học
gặp trên biển báo/tài liệu thật ở Hàn Quốc hiện nay.

## Quy tắc lõi đã xác nhận (2 truy vấn WebSearch độc lập khớp nhau)

- ㄱ/ㄷ/ㅂ -> **g/d/b** trước nguyên âm; -> **k/t/p** trước phụ âm khác hoặc
  cuối từ.
- 어 -> **eo**, 으 -> **eu** (nguyên âm ghi bằng 2 chữ La-tinh).
- ㅢ -> **ui** (không phải "eui"), dù cách đọc thực tế gần với ㅣ.
- 19 phụ âm đầu, 21 nguyên âm giữa, 27 phụ âm cuối (+1 trường hợp không có
  phụ âm cuối = 28 khả năng).

## Chưa xác nhận đầy đủ — GIẢ ĐỊNH CẦN NGƯỜI DUYỆT A-01

**Bảng đầy đủ 19×21×27** chưa được đối chiếu trực tiếp với văn bản quy định
gốc trong phiên này — `WebFetch` tới `korean.go.kr` và bản PDF chính thức
(gov.uk-hosted mirror) đều bị chặn 403 bởi proxy tổ chức (xem D-51). Bảng cơ
bản dùng trong `phonology.rules.json`/generator tương lai dựa một phần vào
kiến thức đã huấn luyện sẵn (`S-TRAINED-KNOWLEDGE`), corroborate bởi 2 truy
vấn WebSearch độc lập cho các quy tắc lõi ở trên — nhưng KHÔNG coi là đã đối
chiếu nguyên văn đầy đủ. **CẦN native/expert review hoặc WebFetch trở lại
trước khi FROZEN.**

## Provenance

- `S-NIKL-ROMAN`: National Institute of Korean Language, tra qua WebSearch
  snippet (không toàn văn).
- `S-WIKI-ROMAN`: Wikipedia tổng hợp bảng chính thức từ NIKL, tra qua
  WebSearch snippet.

## Chưa giải quyết

- Xác nhận toàn bộ bảng 19×21×27 bằng văn bản gốc.
- Quy tắc romanize tên riêng (proper noun) — NIKL cho phép giữ chính tả
  truyền thống đã đăng ký (vd họ 이 thường viết "Lee" thay vì "I" theo RR
  thuần) — CHƯA quyết định app xử lý thế nào, xem GIẢ ĐỊNH A-01.

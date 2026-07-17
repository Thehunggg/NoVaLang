# `_schema/` — Khung định dạng cho toàn bộ rule

Đây là nguồn khung (JSON Schema) mà mọi artifact trong `rules/**` phải khớp.
Validator (`tools/validate.mjs`) đọc các schema này để kiểm 9 invariant.

| File | Kiểm cái gì |
|---|---|
| `front-matter.schema.json` | Khối front-matter YAML ở đầu mỗi file `.md` rule |
| `rules.schema.json` | File `*.rules.json` — ràng buộc máy kiểm được + fixtures |
| `data.schema.json` | File `*.data.json` — bảng dữ liệu (charset, chữ→âm, variant...) |
| `coverage.schema.json` | `languages/<lang>/coverage.json` — hiện tượng × mức × nguồn × confidence |
| `sources.schema.json` | `languages/<lang>/sources.json` — nguồn tham chiếu |

## Nguyên tắc

- Front-matter là khái niệm của file `.md`. File `.json` không mang front-matter;
  chúng được kiểm bằng schema JSON tương ứng (invariant 2 chỉ áp cho `.md` rule
  file do pipeline quản lý).
- File narrative có sẵn từ trước pipeline (`rules/content/**`, và — theo quyết
  định Option A của Project Owner 2026-07-18 — hồ sơ `ja` FROZEN, cùng
  `en/**` và `_template/**`) được coi là **narrative/enforced-by target**, không
  bị bắt buộc front-matter. Danh sách allowlist này nằm trong `tools/validate.mjs`.
- `enforced_by` nối một mệnh đề trong `.md` tới file `.rules.json` cụ thể. Câu
  "phải/không được" nào không có `.rules.json` phải gắn nhãn `guidance-only`.

## Phiên bản schema

JSON Schema draft-07. Validator không phụ thuộc `ajv`; nó tự kiểm các ràng buộc
cần cho 9 invariant (xem `tools/validate.mjs`). Các file `.schema.json` vừa là
tài liệu hợp đồng, vừa dùng được với ajv nếu sau này thêm.

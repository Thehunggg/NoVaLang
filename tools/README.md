# `tools/` — Công cụ pipeline `/build-language`

Node ESM thuần, không phụ thuộc npm ngoài. Chạy từ **gốc repo**.

| Công cụ | Bước | Việc |
|---|---|---|
| `validate.mjs` | mọi lúc | Kiểm 9 invariant (Phần F). `node tools/validate.mjs` |
| `resolve.mjs` | mọi lúc | Merge config `_base → _script/<ws> → languages/<lang>`. `node tools/resolve.mjs <lang> --effective` |
| `import-dataset.mjs` | 1 | Import CLDR / UD / Wikipron → `*.data.json` + `sources.json` |
| `derive.mjs` | 2 | Diff 2 lượt derive độc lập; trùng→medium, lệch→review |
| `corpus-check.mjs` | 3 | Chạy assert dạng văn bản lên corpus thật, đo tỷ lệ vi phạm |

## Quy ước

- Mọi rule sinh từ dataset (Bước 1): `derived_by: dataset`, `confidence: high`,
  **không** vào hàng đợi review.
- Hai lượt derive (Bước 2) do **subagent** chạy, mỗi lượt chỉ đọc **một** nguồn;
  `derive.mjs` chỉ làm việc diff. Trùng nhau chỉ chứng minh được điều gì khi hai
  lượt đọc hai nguồn khác nhau.
- `import-dataset.mjs cldr <lang>` chạy được ngay với URL mặc định (Unicode CLDR).
  `ud` / `wikipron` cần `--url` của treebank/tsv cụ thể theo ngôn ngữ.
- Dữ liệu tải về nằm ở `tools/cache/` (đã gitignore — **không commit**).

## Cache & OneDrive

Repo nằm trong OneDrive. File corpus/dataset lớn không commit; nếu tải dự kiến
> 500MB thì dừng, hỏi Project Owner, đề xuất bản mẫu nhỏ hơn (theo file lệnh).

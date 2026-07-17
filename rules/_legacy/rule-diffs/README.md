# Legacy rule diffs — nguồn quyết định gốc NovaLang

Thư mục này chứa các bản diff/khác biệt được khai quật từ giai đoạn phát triển
NovaLang trước pipeline `/build-language`. **Đây không phải rác tạm** — chúng
chứa **quyết định sản phẩm gốc** (product decisions) về rule ngôn ngữ, quy ước
đặt tên trường, taxonomy và core rules.

## Vì sao ở đây

Các file này vốn nằm rải ở gốc repo. Ngày **2026-07-18** chúng được `git mv`
nguyên vẹn (không sửa nội dung) vào `rules/_legacy/rule-diffs/` để:

1. Dọn gốc repo.
2. Đưa chúng vào đúng vùng `rules/_legacy/**` mà pipeline `/build-language`
   (Phần C) đã quy định sẽ đọc: *"đọc `rules/_legacy/**` nếu có (chứa tài liệu
   khai quật…), trích mọi quyết định chưa có vào `decisions.md` ghi nguồn
   `legacy` trước khi chạy."*

→ Pipeline sẽ tự trích các quyết định trong đây vào `rules/decisions.md` với
nguồn `legacy`. File này **cố ý không** ghi trực tiếp vào `decisions.md` để
tránh giẫm lên tiến trình `/build-language` đang chạy đồng thời (nó đang là chủ
sở hữu và đang ghi `decisions.md`).

## Danh sách file

| File | Nội dung |
|---|---|
| `agents-core-diff.txt` / `agents-core-diff-final.txt` | Diff của Core Rules / `AGENTS.md` — quyết định gốc về vai trò agent, ranh giới, quy trình. |
| `rule02-diff.txt` / `rule02-diff-final.txt` | Diff của rule `02` (Lesson Standard). |
| `rule03-diff.txt` / `rule03-diff-final.txt` | Diff của rule `03` (Lesson Format 2.0 / five_cards). |

Hậu tố `-final` là bản chốt sau cùng của cùng đợt diff; bản không có hậu tố là
bản trước đó — giữ cả hai để đối chiếu tiến trình quyết định.

## Cấm

- Không sửa nội dung các file `.txt` này (chúng là bản ghi lịch sử).
- Nếu nội dung mâu thuẫn với `decisions.md` hoặc source hiện hành trong repo →
  theo `AGENTS.md`: repo + `decisions.md` thắng; đưa mâu thuẫn vào checklist,
  không tự chọn bên.

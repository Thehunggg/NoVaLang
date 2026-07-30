# QUY TRÌNH LÀM VIỆC — nơi ở DUY NHẤT

Mười hai khoản dưới đây trước 2026-07-30 chỉ sống trong prompt của owner, lượt
nào cũng phải nhắc lại. Từ nay ghi ở ĐÂY.

Mỗi khoản ba dòng: **LUẬT** · **VÌ SAO** (ca thật, có dẫn chứng) · **CÁCH
KIỂM** (dấu hiệu biết mình đang vi phạm).

File này cố tình ngắn vì nó tự nạp mỗi phiên. Luật NỘI DUNG (G1–G15, §A–§G) ở
`LESSON_AUTHORING_STANDARD.md` — file đó không tự nạp, mở khi cần.

---

## a. Đơn nhiệm mỗi lượt

**LUẬT** — Owner giao một việc thì làm đúng việc đó. Lỗi khác gặp dọc đường:
ghi vào LÀM SAU (`scripts/content/sources/INVENTORY.md`), không tự sửa.

**VÌ SAO** — Lượt "PHA A→D" (web + Flutter + rule + preview trong một lượt)
tràn ngân sách: phần web bị bỏ trắng 0/8 mặt, phải báo hoãn và làm lại ở lượt
sau. Lượt kế tiếp cũng phải hoãn thẻ ⑤ vì cùng lý do.

**CÁCH KIỂM** — Đang mở file thuộc hơn hai nhóm (rule / tooling / content /
ui) trong cùng một lượt → đã lệch. Hoặc: báo cáo cuối lượt có mục "chưa làm
được vì hết ngân sách" → lượt đó nhận quá tay.

## b. Ghi file bằng Write/Edit — CẤM heredoc

**LUẬT** — Sửa file bằng công cụ Write/Edit. Không dùng heredoc (`<< 'EOF'`)
hay `node -e` với chuỗi nhiều dòng chứa backtick / `${…}`.

**VÌ SAO** — Shell nuốt backtick và `${…}` **4 lần**: hai lần hỏng changelog
`LESSON_AUTHORING_STANDARD.md`, một lần hỏng `scripts/content/sources/ja.md`,
một lần bọc `ReadingAidScope` báo `bọc 0/4 trang` — **thay thế im lặng 0 chỗ
mà script vẫn chạy xong không lỗi**.

**CÁCH KIỂM** — Script thay-thế in `KHÔNG KHỚP` hoặc `sửa 0/N` → chuỗi đã bị
nuốt, không phải file sai. Dừng, chuyển sang Edit.

## c. fetch-check trước MỖI commit

**LUẬT** — Trước mỗi `git commit`: `git fetch`, rồi
`git rev-list --left-right --count <remote>...HEAD`.
**Đi sau ≠ 0 → DỪNG, báo owner.** Không merge, không rebase, không tự xử.

**VÌ SAO** — Có lượt nhánh local đi sau **3 commit** mà chưa biết, đúng lúc
sắp ghi đè file rule; phát hiện nhờ fetch-check, owner duyệt rồi mới
fast-forward. *(Owner dẫn ca này là `bf15c2b`; commit đó có thật —
`rules(G11.3/G12/G13): safety over source coverage`, 2026-07-27 — nhưng tôi
không truy được nó chính là commit của ca đi-sau-3. Ca đi-sau-3 là thật, mã
commit thì chưa xác nhận được.)*

**CÁCH KIỂM** — Commit mà không có dòng `0<TAB>N` trong log của lượt → đã bỏ
bước.

## d. Commit tách nhóm

**LUẬT** — Một commit một nhóm: **rule/chuẩn** · **tooling** · **content** ·
**ui** · **docs**. Không trộn.

**VÌ SAO** — **CHƯA CÓ CA VI PHẠM.** Owner dẫn `d896516` ("whitelist u2-l2…")
là ca lẫn tooling vào nhóm nội dung; đo lại thì commit đó chỉ đụng
`validate-curriculum.mjs` + `verify-provenance.mjs` — thuần tooling. Quét 25
commit gần nhất: **0 commit** nào trộn `scripts/content/daily-life/` với
`scripts/{verify,validate,lib,check,test}`. Luật đang được giữ đúng; ghi lại
để không trượt.

**CÁCH KIỂM** — `git show --stat` của commit sắp tạo mà có cả file nội dung
lẫn file tooling → tách ra.

## e. KHÔNG push khi owner chưa duyệt

**LUẬT** — Commit thì được, **push thì không** — trừ khi owner nói thẳng ở
lượt đó.

**VÌ SAO** — Tính tới 2026-07-30 có **24 commit** đang chờ owner duyệt
(`0<TAB>24`). Owner duyệt bằng mắt qua trang duyệt tĩnh (G14-R15) trước khi
nội dung rời máy.

**CÁCH KIỂM** — Sắp gõ `git push` mà lượt này owner không viết chữ "push" →
dừng.

## f. Quy trình 2 pha khi build bài

**LUẬT** —
```
PHA A  gom chất liệu  → chạy cổng → COMMIT
PHA B  lắp bài        → chạy cổng → COMMIT
```
**Điểm dừng hợp lệ DUY NHẤT là sau commit pha A.** Không tồn tại điểm dừng
"chưa bắt đầu".

**VÌ SAO** — Owner ra luật này ngay trong prompt build u2-l2, sau khi lượt
trước đó dừng giữa chừng để lại sổ chất liệu và bài lắp dở không khớp nhau.

**CÁCH KIỂM** — Hết ngân sách giữa pha B → không được dừng ở đó; đưa pha B về
trạng thái chạy được (cổng xanh) rồi mới dừng.

## g. Không bịa số liệu cho thứ chưa tồn tại

**LUẬT** — Chưa chạy thì không báo kết quả. Trường không có trong dữ liệu thì
**nói là không có**, không suy ra một con số nghe hợp lý.

**VÌ SAO** — Owner yêu cầu hiện `derived_from` cho mỗi bài tập như thể trường
đó có sẵn; grep toàn repo cho **0 kết quả**. Báo "không tồn tại" rồi TÍNH từ
provenance theo path là đúng. Ca làm đúng trước đó: từ chối in báo cáo R10 cho
bài chưa có nội dung.

**CÁCH KIỂM** — Sắp viết một con số mà không chỉ được lệnh nào sinh ra nó →
đang bịa.

## h. Dừng-và-báo khi tiền đề không khớp

**LUẬT** — Đề bài mâu thuẫn với thứ đo được trong repo → **dừng, báo cả hai
số, chờ owner**. Không tự chọn bên rồi làm tiếp.

**VÌ SAO** — Ca "16 module · 35 unit · 82 lesson" ở đầu đề khác danh sách chi
tiết ngay dưới (33/73); dừng và hỏi, owner xác nhận danh sách chi tiết đúng.
Ca thứ hai: file nguồn chưa đổi tên nhưng đề bài nói đã đổi — dừng, owner cấp
phép đổi tên kèm điều kiện sha256 trước/sau (thành G14-R13).

**CÁCH KIỂM** — Đang tự nghĩ "chắc owner nhầm, cứ làm theo cái đúng" → đó
chính là lúc phải dừng và hỏi.

## i. Mẫu báo cáo cuối lượt

**LUẬT** — Theo **G14-R10** (`LESSON_AUTHORING_STANDARD.md`). Không chép nội
dung mẫu vào đây.

**VÌ SAO** — Owner quyết dựa trên số đo, không dựa trên lời khẳng định.

**CÁCH KIỂM** — Báo cáo thiếu một trong: số đo thật · CẦN MẮT NGƯỜI đánh số ·
hash commit + kết quả fetch-check · vướng mắc → chưa đạt R10.

## j. Nhận sai thì sửa ngay, không giấu

**LUẬT** — Phát hiện mình báo sai ở lượt trước → sửa **ngay đầu báo cáo lượt
này**, nói rõ sai gì. Không lặng lẽ sửa code rồi bỏ qua.

**VÌ SAO** — Hai ca có thật. (1) Báo "câu ví dụ trong thẻ từ vựng không có nút
nghe" — sai, do đếm `SpeakerButton` theo khoảng dòng của class thay vì truy
widget thật; ví dụ đi qua `_ExampleRow` vốn **có** nút nghe. (2) Báo "không có
Q14 bên web" — sai, `FiveCardPractice.tsx` dòng **278** có nhánh
`real_world_practice_dialogue` đầy đủ, kèm bộ công tắc riêng.

**CÁCH KIỂM** — Lượt này phát hiện dữ kiện ngược với báo cáo lượt trước mà
không nhắc lại → đang giấu.

## k. Kiểm bằng cách PHÁ THẬT, không chỉ chạy test

**LUẬT** — Cổng mới phải chứng minh nó **bắt được lỗi**: cố tình làm hỏng dữ
liệu, xem cổng có FAIL đúng chỗ không, rồi khôi phục.

**VÌ SAO** — Ba ca đã làm: nhét trường lạ `truongLaMoi` vào `lessons.json` →
`check-render-coverage` FAIL đúng trường; xoá `reading` của một lượt hội thoại
→ `validate` FAIL đúng câu; sửa một ký tự trong bài → cổng nguyên văn FAIL.
Cổng chạy xanh trên dữ liệu sạch **không** chứng minh được gì.

**CÁCH KIỂM** — Thêm cổng mà chỉ báo "chạy PASS" → chưa chứng minh. Phải có
một lần FAIL cố ý kèm nội dung thông báo lỗi.

## l. "Test đang khoá trình bày cũ" KHÔNG phải lý do giữ hành vi cũ

**LUẬT** — Dữ liệu là chung nên render phải đồng nhất. Test khoá trình bày cũ
thì **sửa TEST theo chuẩn mới**, không bẻ chuẩn theo test. Khác biệt chỉ tồn
tại được khi có lý do sản phẩm trong danh sách miễn đóng (G14-R14).

**VÌ SAO** — Tôi từng giữ dòng đọc Q14 ở dạng chuỗi liền đúng vì lý do "5 test
đang khoá". Owner bác. Sửa lại: Q14 dùng wakachigaki như mọi mặt khác, **6**
chỗ assert đổi sang tính theo cách vẽ chuẩn (helper `expectedKanaLine`) thay
vì khoá chuỗi cũ (commit `905d5b0`).

**CÁCH KIỂM** — Lý do giữ hành vi cũ là "test sẽ đỏ" chứ không phải một lý do
sản phẩm → sai; sửa test.

---

## Ba dòng bất biến

1. **Đơn nhiệm** — làm đúng việc được giao.
2. **Không push** khi owner chưa duyệt.
3. **Dừng-và-báo** khi tiền đề lệch.

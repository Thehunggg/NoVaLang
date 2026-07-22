---
id: de/grammar-and-usage
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: grammar.rules.json
depends_on: [de/writing-system]
sources: [S-TRAINED-KNOWLEDGE, UD]
---

# German grammar and usage

## Giống ngữ pháp (Genus)

3 giống: nam `der`, nữ `die`, trung `das`; số nhiều mọi giống dùng `die`.
Giống **phần lớn KHÔNG đoán được** từ hình thức từ (khác es `-o/-a`) — phải
học theo từng danh từ. Vài gợi ý hậu tố: `-ung/-heit/-keit/-schaft/-tion`→nữ;
`-chen/-lein`→trung (`das Mädchen` "cô bé" là giống trung vì `-chen`, ví dụ
kinh điển giống ngữ pháp ≠ giống tự nhiên); `-er` (người làm)→nam.

## Hệ CÁCH (Kasus) — đặc trưng trung tâm

4 cách, KHÔNG có ở es/en/vi/ja:

| Cách | Vai trò | Ví dụ (nam) |
|---|---|---|
| Nominativ | chủ ngữ | der Mann |
| Akkusativ | tân ngữ trực tiếp | den Mann |
| Dativ | tân ngữ gián tiếp | dem Mann |
| Genitiv | sở hữu | des Mannes |

Mạo từ/tính từ/đại từ đổi đuôi theo cách. Giới từ chi phối cách cố định
(`mit`+Dativ, `für`+Akkusativ, `wegen`+Genitiv; nhóm hai-cách `in/an/auf...`
dùng Akkusativ khi chuyển động, Dativ khi vị trí). Đây là điểm học viên nói
tiếng Anh/Việt/Trung sai nhiều nhất — tương đương độ quan trọng は/へ/を của ja.

## Chia động từ

6 ngôi (ich/du/er-sie-es/wir/ihr/sie-Sie). Động từ **yếu** (đều, `-te` quá
khứ: machen-machte-gemacht) vs **mạnh** (đổi nguyên âm thân: singen-sang-
gesungen, lexical). Trợ động từ `haben/sein` cho thì hoàn thành (Perfekt),
`werden` cho tương lai/bị động.

## Động từ tách được (trennbare Verben)

Tiền tố tách nhảy về CUỐI mệnh đề chính: `aufstehen` → `Ich stehe um 7 auf.`
Tiền tố tách: an-/auf-/aus-/ein-/mit-/vor-/zu-/ab-/nach-... Tiền tố không
tách: be-/ge-/er-/ver-/zer-/ent-/emp-.

## Trật tự từ — V2

Mệnh đề chính: động từ chia ở **vị trí thứ HAI** (`Heute gehe ich ins Kino`
— trạng ngữ đầu, động từ vẫn vị trí 2). Mệnh đề **phụ**: động từ chia ở
**cuối** (`..., weil ich müde bin`). Khung câu (Satzklammer): trợ động từ vị
trí 2 + phân từ/nguyên mẫu ở cuối (`Ich habe das Buch gelesen`).

## Provenance

`S-TRAINED-KNOWLEDGE` (ngữ pháp chuẩn phổ thông) + `UD` (word class dataset).

## Chưa giải quyết

- Bảng biến cách đầy đủ (4 cách × giống × mạo từ + đuôi tính từ) — lexical/
  hình thái, chưa đầy đủ.
- Bảng động từ mạnh/bất quy tắc đầy đủ.
- Danh sách động từ tách được đầy đủ.

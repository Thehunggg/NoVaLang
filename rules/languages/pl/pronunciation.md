---
id: pl/pronunciation
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: phonology.rules.json
depends_on: [pl/writing-system]
sources: [WIKIPRON, S-TRAINED-KNOWLEDGE]
---

# Polish Pronunciation (pl-PL)

Xác nhận bằng `g2p-check.mjs` trên WikiPron thật (`pol_latn_broad`, 157042 cặp
từ→âm). Chính tả Ba Lan rất đều — 15 quy tắc xác nhận sạch.

## Quy tắc chữ→âm đã xác nhận (Bước 3)

| Chữ | Âm | % vi phạm |
|---|---|---|
| `sz` | [ʂ] | 0.05% |
| `cz` | [t͡ʂ] | 0.08% |
| `rz` | [ʐ]/[ʂ] | 3.69% (làm câm) |
| `ch`/`h` | [x] | 0.74% |
| `ł` | [w] | 2.32% |
| `dz` | [d͡z]/[d͡ʑ] | 0.84% (dzi mềm) |
| `ć`/`ci` | [t͡ɕ] | 0.34% |
| `ń`/`ni` | [ɲ] | 0.00% |
| `ś`/`si` | [ɕ] | 0.06% |
| `ż` | [ʐ]/[ʂ] | 0.00% |
| `ą` | [ɔ]+mũi | 0.01% |
| `ę` | [ɛ]+mũi | 0.00% |
| final devoice `b/d/g` | [p]/[t]/[k] | 3.07/0.41/0.63% |

## Đặc trưng

- **Phụ âm xuýt/vòm** nhiều: cứng (sz/cz/ż) vs mềm (ś/ć/ź) vs trung (s/c/z).
- **Làm mềm theo i**: ci/si/zi/ni/dzi = ć/ś/ź/ń/dź (xem `consonant_palatalization`).
- **Nguyên âm mũi** ą/ę (xem `nasal_vowels`).
- **Làm câm cuối từ** (xem `final_devoicing`): chleb=[xlɛp], Bóg=[buk].
- **Trọng âm ĐỀU** (áp chót — penultimate) → không cần trợ đọc (khác ru).

## Phát hiện real-data (kỷ luật dữ liệu, VÒNG 4)

1. `rz` phẳng bắn **61.27%** (>ngưỡng) → không kết luận "rule sai": rz **làm
   câm** thành [ʂ] sau phụ âm vô thanh + cuối từ (Babiarz→[...aʂ]). Thêm [ʂ]
   → 3.69%.
2. `dz` phẳng bắn **67.02%** → `dzi` **làm mềm** thành [d͡ʑ] (Andzia). Thêm
   [d͡ʑ] → 0.84%.

Sửa mô hình theo dữ liệu, không bỏ quy tắc.

## Chưa g2p-check

ą/ę hiện thực mũi theo ngữ cảnh; đồng hoá thanh trong cụm (prośba→[proʑba]);
w→[f] sau vô thanh.

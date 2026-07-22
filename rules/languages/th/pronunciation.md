---
id: th/pronunciation
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: phonology.rules.json
depends_on: [th/writing-system]
sources: [WIKIPRON, S-TRAINED-KNOWLEDGE]
---

# Thai Pronunciation (th-TH, Bangkok)

⚠️ **Chữ Thái ĐA YẾU TỐ, KHÔNG 1:1.** Xác nhận bằng `g2p-check.mjs` trên
WikiPron thật (`tha_thai_broad`, **18319 cặp — có thanh điệu ˧˨˩˦˥, bộ LỚN**).

## Âm đầu ổn định (Bước 3)

| Chữ (âm đầu) | Âm | % vi phạm |
|---|---|---|
| `ก` | [k] | 0.49% |
| `ม` | [m] | 0.23% |

## ⚠️ Âm cuối trung hoà (coda neutralization)

Phụ âm CUỐI âm tiết **không bật** và trung hoà:
- `บ ป พ` cuối → **[p̚]**; `ด ต ส…` cuối → **[t̚]**; `ก ค ข` cuối → **[k̚]**.

→ `บ`→[b] báo **37%** 'vi phạm' trên g2p-check chỉ vì cuối âm tiết = [p̚] —
**KHÔNG phải rule sai, là hiện tượng Thái thật** (kỷ luật dữ liệu). Chỉ 6 âm
cuối phụ âm: [p̚ t̚ k̚ m n ŋ].

## ⚠️ 5 THANH (điểm khó nhất)

5 thanh (สามัญ trung / เอก thấp / โท xuống / ตรี cao / จัตวา lên) — **phân biệt
nghĩa**. Thanh **suy từ đa yếu tố**:

> **lớp phụ âm đầu** (cao/giữa/thấp) × **dấu thanh** (่ ้ ๊ ๋) × **loại âm tiết**
> (sống/chết) × **độ dài nguyên âm**

[corpus: 98.9% câu có dấu thanh.] Rule tổng quát viết được nhưng phức; người mới
khó đoán → **audio là kênh phát âm chính**.

## Lớp phụ âm

44 phụ âm chia **3 lớp** (cao/giữa/thấp) — quyết định thanh cơ bản. Nhiều chữ
cùng âm khác lớp (ข/ค/ฆ đều [kʰ] nhưng lớp khác → thanh khác). Học lớp theo từng
chữ (lexical) + quy tắc suy thanh (rule).

→ g2p rule_level **MEDIUM** (âm đầu chắc; coda + thanh là quy tắc phức). Dạy chữ
trực tiếp + audio.

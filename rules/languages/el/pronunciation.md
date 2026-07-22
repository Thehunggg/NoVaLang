---
id: el/pronunciation
version: 0.1.0
status: DRAFT
tier: [t1]
role: [target]
enforced_by: phonology.rules.json
depends_on: [el/writing-system]
sources: [WIKIPRON, S-TRAINED-KNOWLEDGE]
---

# Greek Pronunciation — Phát âm tiếng Hy Lạp

**Tin tốt**: chính tả Hy Lạp KHÁ ĐỀU theo chiều đọc — biết mặt chữ là đọc
được âm gần như luôn đúng. Đây là NGƯỢC với tiếng Đan Mạch (da). g2p-check
Bước 3 trên **19133 từ WikiPron thật** xác nhận: phụ âm/nguyên âm/digraph cơ
bản đều vi phạm **<1%**.

## Nguyên âm (5 âm, không phân biệt độ dài)

α[a] · ε/αι[e] · η/ι/υ/ει/οι/υι[i] · ο/ω[o] · ου[u]

## Phụ âm ma sát đặc trưng

β[v] · γ[ɣ]/[ʝ] · δ[ð] · θ[θ] · χ[x]/[ç] · φ[f] · ψ[ps] · ξ[ks]

γ, κ, χ **vòm hoá** trước nguyên âm trước (e/i): γ→[ʝ], κ→[c], χ→[ç].

## Digraph phụ âm

μπ[b]/[mb] · ντ[d]/[nd] · γκ/γγ[g]/[ŋg] · τσ[ts] · τζ[dz] ·
αυ[av]/[af] · ευ[ev]/[ef]

## Kỷ luật dữ liệu (ngoại lệ CÓ QUY LUẬT — g2p-check)

- **υ→[i] báo 11.51%**: thực ra là υ nằm TRONG digraph αυ/ευ/ου/υι bị nuốt
  trước (thành av/af/ev/ef/u). Rule đúng — chỉ cần **ưu tiên digraph** khi
  tách âm (giống nl ij, pt ão, it gli). Giữ high.
- **ει/οι→[i] báo ~2–3%**: synizesis — ει/οι trước nguyên âm thành glide [ʝ]
  (`άδεια`→[ˈa.ðʝa]). Lexical, giữ medium.
- **μπ→[b] báo 5.13%**: khi μ+π qua ranh giới âm tiết (`Πέμπτη`→[ˈpe.mpti])
  giữ [mp]. Theo ranh giới âm tiết, giữ medium.

## Trọng âm

Trọng âm **động**, đánh dấu bằng tonos, rơi vào 1 trong 3 âm tiết cuối. Xem
`accent_system` trong coverage. TTS el-GR đọc trực tiếp — xem `tts-and-audio.md`.

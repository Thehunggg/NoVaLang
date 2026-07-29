/// Phép hiển thị tiếng Nhật dùng chung — G14-R14 [JA].
///
/// Đây là bản Dart của cùng một phép mà `scripts/lib/japanese-furigana.mjs`
/// (Node, lúc sinh dữ liệu) và `frontend/src/utils/japaneseText.ts` (web) làm.
/// Ba nơi phải cho ra ĐÚNG cùng kết quả; bộ chứng nằm ở
/// `shared/config/japanese_text_fixtures.json` và cả hai nền cùng chạy nó.
///
/// Sửa luật ở đây thì phải sửa cả 3 nơi + cập nhật fixtures, không sửa lẻ.
library;

/// Ngoặc tròn full-width chứa TOÀN kana = chú âm.
/// Ngoặc chứa kanji (「あめ（雨）」 ở bài kana) là chú giải đang trích dẫn — giữ.
final RegExp _furigana = RegExp(r'（([ぁ-ゟー]+)）');

/// Ký tự MANG âm đọc: kanji + chữ số. Latin không (chỉ là nhãn 「A:」).
final RegExp _bearing = RegExp(r'[一-龯㐀-䶿々0-9０-９]');

final RegExp _kanji = RegExp(r'[一-龯㐀-䶿々]');

bool hasKanji(String? s) => s != null && _kanji.hasMatch(s);

bool hasFurigana(String? s) => s != null && _furigana.hasMatch(s);

/// Bỏ ngoặc chú âm, trả mặt chữ sạch. DÒNG CHÍNH LUÔN DÙNG HÀM NÀY (R14 [JA] a).
String stripFurigana(String? s) => (s ?? '').replaceAll(_furigana, '');

/// Katakana → hiragana.
String toHiragana(String s) => s.replaceAllMapped(
  RegExp(r'[ァ-ヶ]'),
  (m) => String.fromCharCode(m.group(0)!.codeUnitAt(0) - 0x60),
);

/// Ranh giới khối để vẽ wakachigaki. Mỗi cụm mang-âm-đọc + kana trong ngoặc
/// của nó là một khối; chữ thường giữa các khối là khối riêng.
/// KHÔNG đoán ranh giới từ — chỉ đọc lại dữ liệu ngoặc đã có.
/// BẢNG TRỢ TỪ ĐÓNG — owner chốt 2026-07-29 (phương án A).
///
/// Chỉ chuỗi trong bảng này mới đứng RIÊNG thành một khối. Khối chữ thường ngay
/// sau khối ngoặc mà KHÔNG có trong bảng thì là okurigana, dính vào khối trước:
/// 来（き）ました → きました.
///
/// Bảng ĐÓNG, không suy đoán: không có bộ tách từ ở đây. Chuỗi không khớp bảng
/// thì giữ nguyên khối, KHÔNG bao giờ cắt trong lòng nó (とても không thành
/// とて も).
const Set<String> particleBlocks = {
  'は', 'が', 'を', 'に', 'で', 'と', 'も', 'の', 'へ', 'や', 'か', 'ね', 'よ',
  'から', 'まで',
  'には', 'では', 'とは', 'にも', 'でも',
};

List<String> furiganaBlocks(String? source) {
  final s = source ?? '';
  if (s.isEmpty) return const [];
  final raw = <({String kana, bool fromBracket})>[];
  var last = 0;
  for (final m in _furigana.allMatches(s)) {
    final before = s.substring(last, m.start);
    var cut = before.length;
    while (cut > 0 && _bearing.hasMatch(before[cut - 1])) {
      cut -= 1;
    }
    final plain = before.substring(0, cut);
    if (plain.isNotEmpty) {
      raw.add((kana: toHiragana(plain), fromBracket: false));
    }
    raw.add((kana: m.group(1)!, fromBracket: true));
    last = m.end;
  }
  final tail = s.substring(last);
  if (tail.isNotEmpty) raw.add((kana: toHiragana(tail), fromBracket: false));

  // Gộp okurigana: khối THƯỜNG ngay sau khối NGOẶC, không phải trợ từ → dính.
  final blocks = <({String kana, bool fromBracket})>[];
  for (final b in raw) {
    if (b.kana.isEmpty) continue;
    if (!b.fromBracket &&
        blocks.isNotEmpty &&
        blocks.last.fromBracket &&
        !particleBlocks.contains(b.kana)) {
      final prev = blocks.removeLast();
      blocks.add((kana: prev.kana + b.kana, fromBracket: prev.fromBracket));
      continue;
    }
    blocks.add(b);
  }
  return blocks.map((b) => b.kana).toList();
}

/// Dòng kana wakachigaki. Câu không có chú âm → trả rỗng (không chèn gì).
String wakachigaki(String? source) {
  if (!hasFurigana(source)) return '';
  return furiganaBlocks(source).join(' ');
}

// ───────────────────────── KANA → ROMAJI ─────────────────────────
// Modified Hepburn. CHỈ nhận kana vào — đây là chuyển tự cơ học 1-1, KHÔNG
// phải đoán âm đọc kanji, nên không dính lệnh cấm ở G14-R14 [JA].

const Map<String, String> _digraphs = {
  'きゃ': 'kya', 'きゅ': 'kyu', 'きょ': 'kyo',
  'しゃ': 'sha', 'しゅ': 'shu', 'しょ': 'sho',
  'ちゃ': 'cha', 'ちゅ': 'chu', 'ちょ': 'cho',
  'にゃ': 'nya', 'にゅ': 'nyu', 'にょ': 'nyo',
  'ひゃ': 'hya', 'ひゅ': 'hyu', 'ひょ': 'hyo',
  'みゃ': 'mya', 'みゅ': 'myu', 'みょ': 'myo',
  'りゃ': 'rya', 'りゅ': 'ryu', 'りょ': 'ryo',
  'ぎゃ': 'gya', 'ぎゅ': 'gyu', 'ぎょ': 'gyo',
  'じゃ': 'ja', 'じゅ': 'ju', 'じょ': 'jo',
  'ぢゃ': 'ja', 'ぢゅ': 'ju', 'ぢょ': 'jo',
  'びゃ': 'bya', 'びゅ': 'byu', 'びょ': 'byo',
  'ぴゃ': 'pya', 'ぴゅ': 'pyu', 'ぴょ': 'pyo',
};

const Map<String, String> _monographs = {
  'あ': 'a', 'い': 'i', 'う': 'u', 'え': 'e', 'お': 'o',
  'か': 'ka', 'き': 'ki', 'く': 'ku', 'け': 'ke', 'こ': 'ko',
  'さ': 'sa', 'し': 'shi', 'す': 'su', 'せ': 'se', 'そ': 'so',
  'た': 'ta', 'ち': 'chi', 'つ': 'tsu', 'て': 'te', 'と': 'to',
  'な': 'na', 'に': 'ni', 'ぬ': 'nu', 'ね': 'ne', 'の': 'no',
  'は': 'ha', 'ひ': 'hi', 'ふ': 'fu', 'へ': 'he', 'ほ': 'ho',
  'ま': 'ma', 'み': 'mi', 'む': 'mu', 'め': 'me', 'も': 'mo',
  'や': 'ya', 'ゆ': 'yu', 'よ': 'yo',
  'ら': 'ra', 'り': 'ri', 'る': 'ru', 'れ': 're', 'ろ': 'ro',
  'わ': 'wa', 'ゐ': 'i', 'ゑ': 'e', 'を': 'o',
  'が': 'ga', 'ぎ': 'gi', 'ぐ': 'gu', 'げ': 'ge', 'ご': 'go',
  'ざ': 'za', 'じ': 'ji', 'ず': 'zu', 'ぜ': 'ze', 'ぞ': 'zo',
  'だ': 'da', 'ぢ': 'ji', 'づ': 'zu', 'で': 'de', 'ど': 'do',
  'ば': 'ba', 'び': 'bi', 'ぶ': 'bu', 'べ': 'be', 'ぼ': 'bo',
  'ぱ': 'pa', 'ぴ': 'pi', 'ぷ': 'pu', 'ぺ': 'pe', 'ぽ': 'po',
  'ぁ': 'a', 'ぃ': 'i', 'ぅ': 'u', 'ぇ': 'e', 'ぉ': 'o',
  'ゃ': 'ya', 'ゅ': 'yu', 'ょ': 'yo',
};

const Map<String, String> _macron = {
  'a': 'ā', 'i': 'ī', 'u': 'ū', 'e': 'ē', 'o': 'ō',
};

/// Dấu câu Nhật → dấu câu Latin, kèm dấu cách sau theo lối viết Latin.
/// Vẫn là ánh xạ 1-1 cơ học, không phải chia từ.
const Map<String, String> _punct = {
  '、': ', ', '。': '. ', '？': '? ', '！': '! ', '　': ' ', '・': ' ',
};

/// Chuyển tự kana → Modified Hepburn.
///
/// Trường âm: お-row + う và お-row + お gộp thành macron (ō); え-row + い và
/// い-row + い KHÔNG gộp (sensei, ii) — theo ADR-015, khớp bản Node đang dùng.
String kanaToRomaji(String? source) {
  final s = toHiragana(source ?? '');
  if (s.isEmpty) return '';
  final out = StringBuffer();
  var i = 0;
  while (i < s.length) {
    final ch = s[i];

    // 「っ」 gấp đôi phụ âm của âm tiết sau; trước ch → tch.
    if (ch == 'っ') {
      final rest = _peekSyllable(s, i + 1);
      if (rest == null) {
        i += 1;
        continue;
      }
      final first = rest.startsWith('ch') ? 't' : rest[0];
      out.write(first);
      i += 1;
      continue;
    }

    // 「ん」 → n, thêm dấu ' khi đứng trước nguyên âm hoặc y (kin'yōbi, han'i).
    if (ch == 'ん') {
      out.write('n');
      final next = _peekSyllable(s, i + 1);
      if (next != null && RegExp(r'^[aiueoy]').hasMatch(next)) out.write("'");
      i += 1;
      continue;
    }

    // 「ー」 kéo dài nguyên âm trước đó.
    if (ch == 'ー') {
      final prev = out.isEmpty ? '' : out.toString()[out.toString().length - 1];
      if (_macron.containsKey(prev)) {
        final t = out.toString();
        out.clear();
        out.write(t.substring(0, t.length - 1));
        out.write(_macron[prev]);
      }
      i += 1;
      continue;
    }

    // Âm ghép (2 ký tự) trước, rồi mới tới âm đơn.
    String? unit;
    if (i + 1 < s.length && _digraphs.containsKey(s.substring(i, i + 2))) {
      unit = _digraphs[s.substring(i, i + 2)];
      i += 2;
    } else if (_monographs.containsKey(ch)) {
      unit = _monographs[ch];
      i += 1;
    } else {
      out.write(_punct[ch] ?? ch); // dấu câu → dấu Latin; còn lại giữ nguyên
      i += 1;
      continue;
    }

    // Gộp trường âm: nguyên âm cuối của unit + kana kế tiếp.
    final vowel = unit![unit.length - 1];
    if (i < s.length) {
      final next = s[i];
      final merge = (vowel == 'o' && (next == 'う' || next == 'お')) ||
          (vowel == 'u' && next == 'う') ||
          (vowel == 'a' && next == 'あ');
      if (merge) {
        unit = unit.substring(0, unit.length - 1) + _macron[vowel]!;
        i += 1;
      }
    }
    out.write(unit);
  }
  return _tidy(out.toString());
}

/// Dòng romaji của cả câu.
///
/// Có chú âm → chuyển tự TỪNG KHỐI rồi nối bằng dấu cách, dùng ĐÚNG ranh giới
/// khối của dòng wakachigaki, nên hai dòng luôn thẳng hàng nhau.
/// Không có chú âm → chuyển tự thẳng dòng đọc (không có ranh giới để chia).
String romajiLine(String? displayText, String? reading) {
  if (hasFurigana(displayText)) {
    final parts = furiganaBlocks(displayText).map(kanaToRomaji).where((p) => p.isNotEmpty);
    return _tidy(parts.join(' '));
  }
  return _tidy(kanaToRomaji(reading ?? displayText));
}

/// Bỏ dấu cách thừa trước dấu câu (do ghép khối) và gộp dấu cách lặp.
String _tidy(String s) => s
    .replaceAllMapped(RegExp(r'\s+([,.?!])'), (m) => m.group(1)!)
    .replaceAll(RegExp(r'  +'), ' ')
    .trim();

/// Romaji của âm tiết bắt đầu ở vị trí [i] — chỉ để biết phụ âm đầu.
String? _peekSyllable(String s, int i) {
  if (i >= s.length) return null;
  if (i + 1 < s.length && _digraphs.containsKey(s.substring(i, i + 2))) {
    return _digraphs[s.substring(i, i + 2)];
  }
  return _monographs[s[i]];
}

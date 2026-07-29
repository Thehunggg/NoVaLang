import 'package:flutter/foundation.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

/// Trợ đọc cho CẢ BÀI — G14-R14 [JA] (b).
///
/// Trước 2026-07-29, hai công tắc furigana/romaji chỉ sống ở Q14
/// (`Q14ReadingAidSessionStore`), nên bốn thẻ còn lại và phần bài tập không có
/// cách bật/tắt. Store này tổng quát hoá đúng cơ chế đó ra toàn bài; Q14 giờ
/// dùng chung store này chứ không giữ store riêng nữa.
///
/// Nhớ theo PHIÊN, không ghi đĩa: rời bài rồi vào lại thì trở về mặc định,
/// giống hệt hành vi cũ của Q14.
@immutable
class LessonReadingAidState {
  const LessonReadingAidState({
    required this.showFurigana,
    required this.showRomaji,
    required this.lessonSessionKey,
    required this.readingAidOn,
  });

  /// Bật → thêm DÒNG KANA wakachigaki dưới câu.
  /// Không phải ruby trên đầu kanji — owner bỏ lối ruby 2026-07-29.
  final bool showFurigana;

  /// Bật → thêm dòng romaji dưới câu.
  final bool showRomaji;

  final String lessonSessionKey;
  final bool readingAidOn;

  LessonReadingAidState copyWith({bool? showFurigana, bool? showRomaji}) =>
      LessonReadingAidState(
        showFurigana: showFurigana ?? this.showFurigana,
        showRomaji: showRomaji ?? this.showRomaji,
        lessonSessionKey: lessonSessionKey,
        readingAidOn: readingAidOn,
      );
}

/// G14-R14 [JA] — bài tiếng Nhật thì có CẢ HAI nút, MỌI bài, MỌI cấp.
///
/// Trước 2026-07-29 romaji bị chặn theo cấp (chỉ tới B1) — luật cũ của riêng
/// Q14. Bỏ: điều kiện hiện thanh trợ đọc chỉ được phụ thuộc NGÔN NGỮ, không
/// phụ thuộc cấp. Bên web, gate theo cấp đã làm nút [Romaji] biến mất vì đọc
/// nhầm `level` (dải hiển thị "Beginner") thay vì `levelId` (mã CEFR) — hai
/// nền nay dùng chung một điều kiện để không lặp lại ca đó.
bool readingAidAvailable(String learningLanguageCode) =>
    learningLanguageCode.trim().toLowerCase() == 'ja';

class LessonReadingAidStore extends ChangeNotifier {
  final Map<String, LessonReadingAidState> _states = {};

  LessonReadingAidState stateFor({
    required String lessonSessionKey,
    required String learningLanguageCode,
  }) {
    return _states.putIfAbsent(lessonSessionKey, () {
      return LessonReadingAidState(
        // Mặc định GIỮ NGUYÊN hành vi Q14 đã chạy từ trước: dòng kana BẬT,
        // romaji TẮT. Đây là store gộp của Q14 nên đổi mặc định là đổi hành vi
        // một màn owner đã duyệt.
        //
        // Không nghịch R14 [JA] (a): "dòng chính luôn sạch" nói về việc bỏ
        // ngoặc chú âm KHI VẼ — luôn đúng, bất kể công tắc. Công tắc chỉ quyết
        // định có THÊM dòng kana bên dưới hay không.
        showFurigana: true,
        showRomaji: false,
        lessonSessionKey: lessonSessionKey,
        readingAidOn: readingAidAvailable(learningLanguageCode),
      );
    });
  }

  void setShowFurigana(String lessonSessionKey, bool value) {
    final current = _states[lessonSessionKey];
    if (current == null || current.showFurigana == value) return;
    _states[lessonSessionKey] = current.copyWith(showFurigana: value);
    notifyListeners();
  }

  void setShowRomaji(String lessonSessionKey, bool value) {
    final current = _states[lessonSessionKey];
    if (current == null || !current.readingAidOn || current.showRomaji == value) {
      return;
    }
    _states[lessonSessionKey] = current.copyWith(showRomaji: value);
    notifyListeners();
  }
}

final lessonReadingAidStoreProvider = Provider<LessonReadingAidStore>(
  (_) => LessonReadingAidStore(),
);

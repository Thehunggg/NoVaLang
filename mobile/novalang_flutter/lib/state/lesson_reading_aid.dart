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
    required this.romajiToggleAllowed,
  });

  /// Bật → thêm DÒNG KANA wakachigaki dưới câu.
  /// Không phải ruby trên đầu kanji — owner bỏ lối ruby 2026-07-29.
  final bool showFurigana;

  /// Bật → thêm dòng romaji dưới câu.
  final bool showRomaji;

  final String lessonSessionKey;
  final bool romajiToggleAllowed;

  LessonReadingAidState copyWith({bool? showFurigana, bool? showRomaji}) =>
      LessonReadingAidState(
        showFurigana: showFurigana ?? this.showFurigana,
        showRomaji: showRomaji ?? this.showRomaji,
        lessonSessionKey: lessonSessionKey,
        romajiToggleAllowed: romajiToggleAllowed,
      );
}

/// Giữ nguyên luật cũ của Q14: romaji chỉ mở tới B1, trên nữa thì ẩn công tắc.
bool romajiToggleAllowed(String level) =>
    const {'A0', 'A1', 'A2', 'B1'}.contains(level.trim().toUpperCase());

const _knownLevels = {'A0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'};

class LessonReadingAidStore extends ChangeNotifier {
  final Map<String, LessonReadingAidState> _states = {};

  LessonReadingAidState stateFor({
    required String lessonSessionKey,
    required String currentLevel,
  }) {
    final normalized = currentLevel.trim().toUpperCase();
    return _states.putIfAbsent(lessonSessionKey, () {
      if (kDebugMode && !_knownLevels.contains(normalized)) {
        debugPrint('Reading-aid romaji toggle hidden for unknown level: $currentLevel');
      }
      return LessonReadingAidState(
        // Mặc định: cả hai TẮT. Dòng chính luôn sạch (R14 [JA] a), người học
        // chủ động bật trợ đọc khi cần.
        showFurigana: false,
        showRomaji: false,
        lessonSessionKey: lessonSessionKey,
        romajiToggleAllowed: romajiToggleAllowed(normalized),
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
    if (current == null || !current.romajiToggleAllowed || current.showRomaji == value) {
      return;
    }
    _states[lessonSessionKey] = current.copyWith(showRomaji: value);
    notifyListeners();
  }
}

final lessonReadingAidStoreProvider = Provider<LessonReadingAidStore>(
  (_) => LessonReadingAidStore(),
);

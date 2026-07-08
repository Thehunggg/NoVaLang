import '../../models/user_profile.dart';

class L10n {
  const L10n._();

  static const _strings = <String, Map<String, String>>{
    'continue': {'en': 'Continue', 'vi': 'Tiếp tục'},
    'back': {'en': 'Back', 'vi': 'Quay lại'},
    'searchLanguage': {
      'en': 'Search by name, native name, alias, or script',
      'vi': 'Tìm theo tên, tên bản địa, bí danh hoặc chữ viết',
    },
    'nativeLanguage': {
      'en': 'Native/UI language',
      'vi': 'Ngôn ngữ mẹ đẻ / giao diện',
    },
    'learningLanguage': {'en': 'Learning language', 'vi': 'Ngôn ngữ muốn học'},
    'goalTrack': {
      'en': 'Goal and exam track',
      'vi': 'Mục tiêu và lộ trình thi',
    },
    'niche': {'en': 'Learning focus', 'vi': 'Trọng tâm học'},
    'level': {'en': 'Starting level', 'vi': 'Trình độ bắt đầu'},
    'home': {'en': 'Home', 'vi': 'Trang chủ'},
    'learn': {'en': 'Learn', 'vi': 'Học'},
    'practice': {'en': 'Practice', 'vi': 'Luyện tập'},
    'review': {'en': 'Review', 'vi': 'Ôn tập'},
    'flashcards': {'en': 'Flashcards', 'vi': 'Thẻ ghi nhớ'},
    'profile': {'en': 'Profile', 'vi': 'Hồ sơ'},
    'comingSoon': {'en': 'Coming soon', 'vi': 'Sắp ra mắt'},
    'checkAnswer': {'en': 'Check answer', 'vi': 'Kiểm tra'},
    'correct': {'en': 'Correct', 'vi': 'Chính xác'},
    'tryAgain': {'en': 'Not quite', 'vi': 'Chưa đúng'},
    'providerLater': {
      'en': 'This login provider will be connected later.',
      'vi': 'Nhà cung cấp đăng nhập này sẽ được kết nối sau.',
    },
    'guest': {'en': 'Continue as Guest', 'vi': 'Tiếp tục với tư cách khách'},
    'changeFocusQuestion': {
      'en': 'You changed your learning focus. What would you like to do?',
      'vi': 'Bạn đã đổi mục tiêu học. Bạn muốn bắt đầu như thế nào?',
    },
  };

  static String text(String key, String languageCode) {
    final locale = languageCode == 'vi' ? 'vi' : 'en';
    return _strings[key]?[locale] ?? _strings[key]?['en'] ?? key;
  }

  static String optionText(LocalizedCopy copy, String languageCode) =>
      languageCode == 'vi' ? copy.vi : copy.en;
}

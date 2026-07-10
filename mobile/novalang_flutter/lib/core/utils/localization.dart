import 'mobile_ui_strings.dart';

/// Localized UI text for Flutter Android.
///
/// Priority strings are loaded from `assets/shared/mobile_ui.json`
/// (mirrored from `shared/i18n/mobile_ui.json`).
/// Remaining keys fall back to the inline Dart catalog below.
class L10n {
  const L10n._();

  static const _fallback = <String, Map<String, String>>{
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
    'availableNow': {'en': 'Available', 'vi': 'Có sẵn'},
    'lessonsAvailableCount': {'en': '{n} lessons', 'vi': '{n} bài học'},
    'curriculumLanguageComingSoon': {
      'en':
          '{language} courses are coming soon. Pick English or Japanese to start learning now.',
      'vi':
          'Khóa học {language} sắp ra mắt. Chọn English hoặc Japanese để học ngay.',
    },
    'curriculumNicheComingSoon': {
      'en':
          'Lessons for {niche} are coming soon. Start with Daily Life → Greetings for now.',
      'vi':
          'Bài học cho {niche} sắp ra mắt. Hiện chỉ có Đời sống hàng ngày → Chào hỏi.',
    },
    'checkAnswer': {'en': 'Check answer', 'vi': 'Kiểm tra'},
    'correct': {'en': 'Correct', 'vi': 'Chính xác'},
    'tryAgain': {'en': 'Not quite', 'vi': 'Chưa đúng'},
    'providerLater': {
      'en': 'This login provider will be connected later.',
      'vi': 'Nhà cung cấp đăng nhập này sẽ được kết nối sau.',
    },
    'guest': {'en': 'Continue as Guest', 'vi': 'Tiếp tục với tư cách khách'},
    'tagline': {
      'en': 'Master languages through AI-powered quests.',
      'vi': 'Làm chủ ngôn ngữ qua những hành trình học tập được hỗ trợ bởi AI.',
    },
    'google': {'en': 'Continue with Google', 'vi': 'Tiếp tục với Google'},
    'facebook': {'en': 'Continue with Facebook', 'vi': 'Tiếp tục với Facebook'},
    'instagram': {
      'en': 'Continue with Instagram',
      'vi': 'Tiếp tục với Instagram',
    },
    'apple': {'en': 'Continue with Apple', 'vi': 'Tiếp tục với Apple'},
    'email': {'en': 'Continue with Email', 'vi': 'Tiếp tục bằng Email'},
    'explorer': {
      'en': 'Continue as Guest',
      'vi': 'Tiếp tục với tư cách người khám phá',
    },
    'basicInfo': {'en': 'Basic information', 'vi': 'Thông tin cơ bản'},
    'basicInfoSubtitle': {
      'en': 'Tell NovaLang a little about you. Only your display name is required.',
      'vi': 'Cho NovaLang biết một chút về bạn. Chỉ cần điền tên hiển thị.',
    },
    'displayName': {'en': 'Display name', 'vi': 'Tên hiển thị'},
    'displayNameHint': {
      'en': 'What should NovaLang call you?',
      'vi': 'Bạn muốn NovaLang gọi bạn là gì?',
    },
    'age': {'en': 'Age range', 'vi': 'Độ tuổi'},
    'optional': {'en': 'Optional', 'vi': 'Không bắt buộc'},
    'country': {'en': 'Country/region', 'vi': 'Quốc gia/khu vực'},
    'countryHint': {
      'en': 'For example: Japan, Vietnam...',
      'vi': 'Ví dụ: Nhật Bản, Việt Nam...',
    },
    'region': {'en': 'City/prefecture', 'vi': 'Thành phố/tỉnh'},
    'occupation': {
      'en': 'Occupation or student status',
      'vi': 'Nghề nghiệp hoặc tình trạng học tập',
    },
    'occupationHint': {
      'en': 'For example: student, engineer, office worker...',
      'vi': 'Ví dụ: sinh viên, kỹ sư, nhân viên văn phòng...',
    },
    'dailyGoal': {'en': 'Daily goal', 'vi': 'Mục tiêu hằng ngày'},
    'dailyGoalSubtitle': {
      'en': 'How many minutes do you want to study each day?',
      'vi': 'Bạn muốn học bao nhiêu phút mỗi ngày?',
    },
    'nicheInstruction': {
      'en':
          'Choose multiple focuses, then tap a selected item again to make it primary.',
      'vi':
          'Chọn nhiều mục tiêu, rồi chạm lại để đặt trọng tâm chính.',
    },
    'learningLanguageSubtitle': {
      'en': 'Pick the language you want to learn with NovaLang.',
      'vi': 'Chọn ngôn ngữ bạn muốn học với NovaLang.',
    },
    'minutesDay': {'en': 'minutes/day', 'vi': 'phút/ngày'},
    'placementChoice': {
      'en': 'Do you want to take a placement test?',
      'vi': 'Bạn có muốn làm bài kiểm tra trình độ không?',
    },
    'takePlacement': {
      'en': 'Take placement test',
      'vi': 'Làm bài kiểm tra trình độ',
    },
    'manualLevel': {
      'en': 'Choose level manually',
      'vi': 'Chọn trình độ thủ công',
    },
    'startBeginning': {
      'en': 'Start from the beginning',
      'vi': 'Bắt đầu từ đầu',
    },
    'placementTitle': {'en': 'Placement test', 'vi': 'Kiểm tra trình độ'},
    'placementResult': {'en': 'Your result', 'vi': 'Kết quả của bạn'},
    'recommended': {
      'en': 'NovaLang recommends starting from',
      'vi': 'NovaLang khuyến nghị bạn bắt đầu từ',
    },
    'startRecommended': {
      'en': 'Start recommended path',
      'vi': 'Bắt đầu lộ trình được đề xuất',
    },
    'courseBack': {'en': 'Back to course', 'vi': 'Quay lại lộ trình'},
    'previousStep': {'en': 'Review previous step', 'vi': 'Xem lại bước trước'},
    'next': {'en': 'Next', 'vi': 'Tiếp theo'},
    'resume': {
      'en': 'Resume where you left off',
      'vi': 'Tiếp tục từ chỗ đã dừng',
    },
    'reviewLesson': {'en': 'Review lesson', 'vi': 'Xem lại bài học'},
    'goalReward': {
      'en': "You completed today's goal! +1 heart",
      'vi': 'Bạn đã hoàn thành mục tiêu hôm nay! +1 tim',
    },
    'lessonNotFound': {
      'en': 'Lesson not found',
      'vi': 'Không tìm thấy bài học',
    },
    'answerHint': {'en': 'Type your answer', 'vi': 'Nhập câu trả lời'},
    'match': {'en': 'Match', 'vi': 'Ghép cặp'},
    'homeReady': {
      'en': 'Your mobile learning space is ready.',
      'vi': 'Không gian học trên điện thoại đã sẵn sàng.',
    },
    'goLearn': {'en': 'Go to Learn', 'vi': 'Đi đến bài học'},
    'practiceTitle': {'en': 'Template practice', 'vi': 'Luyện tập theo mẫu'},
    'mistakeHelp': {
      'en': 'Your saved mistakes will appear here for focused review.',
      'vi': 'Các lỗi đã lưu sẽ xuất hiện tại đây để bạn ôn tập tập trung.',
    },
    'nativeUi': {
      'en': 'Native/UI language',
      'vi': 'Ngôn ngữ mẹ đẻ / giao diện',
    },
    'changeFocusQuestion': {
      'en': 'You changed your learning focus. What would you like to do?',
      'vi': 'Bạn đã đổi mục tiêu học. Bạn muốn bắt đầu như thế nào?',
    },
    'novaLearner': {'en': 'Nova learner', 'vi': 'Người học Nova'},
    'userInfo': {'en': 'User Information', 'vi': 'Thông tin người dùng'},
    'profileOccupation': {
      'en': 'Occupation/student status',
      'vi': 'Nghề nghiệp/học tập',
    },
    'languageSettings': {'en': 'Language Settings', 'vi': 'Cài đặt ngôn ngữ'},
    'learningLanguageShort': {'en': 'Learning', 'vi': 'Ngôn ngữ học'},
    'learningPreferences': {'en': 'Learning preferences', 'vi': 'Tùy chọn học'},
    'primaryFocus': {'en': 'Primary focus', 'vi': 'Trọng tâm chính'},
    'selectedNiches': {'en': 'Selected niches', 'vi': 'Các niche đã chọn'},
    'changeNiche': {'en': 'Change niche', 'vi': 'Đổi mục tiêu học'},
    'progress': {'en': 'Progress', 'vi': 'Tiến độ'},
    'xp': {'en': 'XP', 'vi': 'XP'},
    'completedLessons': {'en': 'Completed lessons', 'vi': 'Bài đã hoàn thành'},
    'mistakesSummary': {'en': 'Mistakes summary', 'vi': 'Tóm tắt lỗi sai'},
    'comingSoonConnected': {'en': 'Coming soon', 'vi': 'Sắp kết nối'},
    'appSettings': {'en': 'App Settings', 'vi': 'Cài đặt ứng dụng'},
    'soundPronunciation': {
      'en': 'Sound / pronunciation',
      'vi': 'Âm thanh / phát âm',
    },
    'enabled': {'en': 'Enabled', 'vi': 'Đang bật'},
    'legal': {'en': 'Legal', 'vi': 'Pháp lý'},
    'termsOfService': {'en': 'Terms of Service', 'vi': 'Điều khoản dịch vụ'},
    'willBeAddedLater': {
      'en': 'Will be added later',
      'vi': 'Sẽ được thêm sau',
    },
    'privacyPolicy': {
      'en': 'Privacy Policy',
      'vi': 'Chính sách quyền riêng tư',
    },
    'account': {'en': 'Account', 'vi': 'Tài khoản'},
    'logout': {'en': 'Logout', 'vi': 'Đăng xuất'},
    'comingSoonLinked': {'en': 'Coming soon', 'vi': 'Sẽ nối sau'},
    'deleteResetLocalData': {
      'en': 'Delete/reset local data',
      'vi': 'Xóa/đặt lại dữ liệu local',
    },
    'devTestSection': {'en': 'Dev / Test', 'vi': 'Dev / Test'},
    'resetLocalTestData': {
      'en': 'Reset local test data',
      'vi': 'Xóa dữ liệu test local',
    },
    'resetLocalTestDataConfirmTitle': {
      'en': 'Reset local test data?',
      'vi': 'Xóa dữ liệu test local?',
    },
    'resetLocalTestDataConfirmMessage': {
      'en':
          'This removes all saved profiles, lesson progress, and mock auth data on this device. Shared lesson assets are not affected.',
      'vi':
          'Thao tác này xóa toàn bộ hồ sơ, tiến độ bài học và dữ liệu đăng nhập mock trên thiết bị. Dữ liệu bài học dùng chung không bị ảnh hưởng.',
    },
    'cancel': {'en': 'Cancel', 'vi': 'Hủy'},
    'confirm': {'en': 'Reset', 'vi': 'Xóa'},
    'saveChanges': {'en': 'Save changes', 'vi': 'Lưu thay đổi'},
    'changeFocusPlacement': {
      'en': 'Take a placement test',
      'vi': 'Làm bài kiểm tra trình độ',
    },
    'changeFocusManual': {
      'en': 'Enter my level manually',
      'vi': 'Nhập trình độ thủ công',
    },
    'changeFocusKeep': {
      'en': 'Keep my current level',
      'vi': 'Giữ trình độ hiện tại',
    },
    'learnSubtitle': {
      'en':
          'Follow your language path. Absolute beginners start with Core Foundation.',
      'vi':
          'Theo lộ trình ngôn ngữ của bạn. Người mới bắt đầu từ Core Foundation.',
    },
    'coreFoundationRequired': {
      'en': 'Start with Core Foundation',
      'vi': 'Bắt đầu với Core Foundation',
    },
    'coreFoundationRequiredHelp': {
      'en':
          'A0 learners practice letters and sounds first. Daily Life greetings unlock after you finish or skip this step.',
      'vi':
          'Người học A0 luyện chữ cái và âm trước. Daily Life (chào hỏi) mở sau khi bạn hoàn thành hoặc bỏ qua bước này.',
    },
    'skipCoreFoundation': {
      'en': 'Skip Core Foundation',
      'vi': 'Bỏ qua Core Foundation',
    },
    'vocabulary': {'en': 'Vocabulary', 'vi': 'Từ vựng'},
    'vocabReading': {'en': 'Reading', 'vi': 'Cách đọc'},
    'vocabMeaning': {'en': 'Meaning', 'vi': 'Nghĩa'},
    'vocabExample': {'en': 'Example', 'vi': 'Ví dụ'},
    'vocabTranslation': {'en': 'Translation', 'vi': 'Dịch'},
    'lessonsCompletedSingular': {
      'en': '{n} lesson completed',
      'vi': '{n} bài đã hoàn thành',
    },
    'lessonsCompletedPlural': {
      'en': '{n} lessons completed',
      'vi': '{n} bài đã hoàn thành',
    },
    'authProvidersError': {
      'en': 'Could not load login providers.',
      'vi': 'Không tải được nhà cung cấp đăng nhập.',
    },
    'mistakeReview': {'en': 'Mistake review', 'vi': 'Ôn lỗi sai'},
    'noLessonsForLanguage': {
      'en': 'No lessons available for this language yet',
      'vi': 'Chưa có bài học cho ngôn ngữ này',
    },
    'emailMockTitle': {
      'en': 'Sign in with Email (dev)',
      'vi': 'Đăng nhập Email (dev)',
    },
    'emailMockHint': {
      'en': 'demo@novalang.local',
      'vi': 'demo@novalang.local',
    },
    'emailMockSkip': {
      'en': 'Use demo email',
      'vi': 'Dùng email demo',
    },
    'mockAuthDevNote': {
      'en': 'Mock login enabled for local development.',
      'vi': 'Đăng nhập giả đang bật cho phát triển local.',
    },
    'chooseFocusToContinue': {
      'en': 'Select a focus to continue',
      'vi': 'Chọn một mục để tiếp tục',
    },
    'focusSaved': {
      'en': 'Learning focus saved',
      'vi': 'Đã lưu trọng tâm học',
    },
  };

  static String text(String key, String languageCode) {
    final fromJson = MobileUiStrings.instance.lookup(key, languageCode);
    if (fromJson != null) return fromJson;
    return _fallbackText(key, languageCode);
  }

  static String _fallbackText(String key, String languageCode) {
    final locale = languageCode == 'vi' ? 'vi' : 'en';
    return _fallback[key]?[locale] ?? _fallback[key]?['en'] ?? key;
  }
}

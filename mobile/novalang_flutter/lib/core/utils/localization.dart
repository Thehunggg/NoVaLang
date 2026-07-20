import 'mobile_ui_strings.dart';

/// Resolve a shared localized map (vi/en/ja/ko/zh) to a non-null [String].
///
/// Resolves only [languageCode], then uses the explicit caller [fallback].
///
/// This helper never crosses into another UI language, so an incomplete
/// localized map cannot silently leak English or Vietnamese into another UI.
String localizedMapText(
  Map<String, String>? values,
  String languageCode, {
  String fallback = '',
}) {
  if (values == null || values.isEmpty) return fallback;
  final locale = languageCode
      .trim()
      .toLowerCase()
      .replaceAll('_', '-')
      .split('-')
      .first;
  final preferred = values[locale]?.trim();
  if (preferred != null && preferred.isNotEmpty) return preferred;
  return fallback;
}

/// Localized UI text for Flutter Android.
///
/// Priority strings are loaded from `assets/shared/mobile_ui.json`
/// (mirrored from `shared/i18n/mobile_ui.json`).
/// Remaining keys fall back to the inline Dart catalog below.
class L10n {
  const L10n._();

  static const _fallback = <String, Map<String, String>>{
    'deviceLanguageSuggestion': {
      'en':
          'It looks like your device language is {language}.\nDo you want to use {language} as your native/UI language?',
      'vi':
          'Có vẻ ngôn ngữ thiết bị của bạn là {language}.\nBạn có muốn dùng {language} làm ngôn ngữ mẹ đẻ/giao diện không?',
      'ja': '端末の言語は{language}のようです。\n{language}を母語・UI言語として使用しますか？',
    },
    'useDeviceLanguage': {
      'en': 'Use {language}',
      'vi': 'Dùng {language}',
      'ja': '{language}を使う',
    },
    'searchAnotherLanguage': {
      'en': 'Search another language',
      'vi': 'Tìm ngôn ngữ khác',
      'ja': '別の言語を探す',
    },
    'exerciseExitTitle': {
      'en': 'Leave the exercises?',
      'vi': 'Bạn muốn rời bài tập?',
      'ja': '練習を終了しますか？',
    },
    'exerciseExitMessage': {
      'en': 'Your unfinished progress will be saved on this device.',
      'vi': 'Tiến độ chưa hoàn thành sẽ được lưu trên thiết bị.',
      'ja': '未完了の進捗はこの端末に保存されます。',
    },
    'continueLearning': {
      'en': 'Keep learning',
      'vi': 'Tiếp tục học',
      'ja': '学習を続ける',
    },
    'leaveExercises': {
      'en': 'Leave exercises',
      'vi': 'Rời bài tập',
      'ja': '練習を終了',
    },
    'basicPracticeCompleted': {
      'en': 'You completed the core practice',
      'vi': 'Bạn đã hoàn thành phần luyện tập cơ bản',
      'ja': '基本練習を完了しました',
    },
    'continuePlusPractice': {
      'en': 'Continue to Plus practice',
      'vi': 'Tiếp tục phần Plus',
      'ja': 'Plus練習へ進む',
    },
    'completeLesson': {
      'en': 'Complete lesson',
      'vi': 'Hoàn thành bài học',
      'ja': 'レッスンを完了',
    },
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
    'exerciseYourAnswer': {'en': 'Your answer', 'vi': 'Câu trả lời của bạn'},
    'exerciseOptions': {'en': 'Options', 'vi': 'Các lựa chọn'},
    'exerciseJapanese': {'en': 'Japanese', 'vi': 'Tiếng Nhật'},
    'exerciseMeaning': {'en': 'Meaning', 'vi': 'Nghĩa'},
    'exerciseAnswerHint': {
      'en': 'Tap the cards below to make a sentence.',
      'vi': 'Chạm vào các thẻ bên dưới để tạo câu.',
    },
    'exerciseInputHint': {'en': 'Enter your answer', 'vi': 'Nhập câu trả lời'},
    'exerciseInputIncorrect': {'en': 'Not correct yet', 'vi': 'Chưa đúng'},
    'exerciseTrialOpen': {'en': 'Trial open', 'vi': 'Mở thử nghiệm'},
    'exerciseCorrectAnswer': {'en': 'Correct answer', 'vi': 'Đáp án đúng'},
    'exerciseExplanation': {'en': 'Explanation', 'vi': 'Giải thích'},
    'exerciseExampleAnswer': {'en': 'Example answer', 'vi': 'Câu trả lời mẫu'},
    'exerciseInputRequired': {
      'en': 'Enter a complete answer before submitting.',
      'vi': 'Hãy nhập một câu trả lời đầy đủ trước khi gửi.',
    },
    'exerciseAiOffline': {
      'en': 'AI could not connect. No AI set was used.',
      'vi': 'Không thể kết nối AI. Bạn chưa dùng AI set nào.',
    },
    'dialogueReadingToggle': {
      'en': 'Show hiragana reading',
      'vi': 'Hiện cách đọc hiragana',
      'ja': 'ひらがな読みを表示',
    },
    'dialogueRomanizationToggle': {
      'en': 'Show romanization',
      'vi': 'Hiện phiên âm Latin',
      'ja': 'ローマ字を表示',
    },
    'dialogueTranslationToggle': {
      'en': 'Show translation',
      'vi': 'Hiện bản dịch',
      'ja': '翻訳を表示',
    },
    'dialogueCompleteAction': {
      'en': 'Complete',
      'vi': 'Hoàn thành',
      'ja': '完了',
    },
    'aiExplanationLocaleMismatchNotice': {
      'en':
          'This explanation was generated in a different language. Redo '
          'this question to get an explanation in your current language.',
      'vi':
          'Giải thích này được tạo theo một ngôn ngữ khác. Hãy làm lại câu '
          'này để nhận giải thích theo ngôn ngữ hiện tại.',
      'ja': 'この説明は別の言語で生成されました。現在の言語で説明を得るには、もう一度回答してください。',
    },
    'reviewQuestionNumber': {
      'en': 'Question {number}',
      'vi': 'Câu {number}',
      'ja': '問題{number}',
    },
    'unitComprehensiveConversationTitle': {
      'en': 'Comprehensive Conversation',
      'vi': 'Hội thoại tổng hợp',
      'ja': '総合会話練習',
    },
    'unitComprehensiveConversationDescription': {
      'en': 'A comprehensive conversation activity for this unit.',
      'vi': 'Bài hội thoại tổng hợp cho Unit này.',
      'ja': 'このユニットの総合会話活動です。',
    },
    'unitComprehensiveConversationLockedHint': {
      'en': 'Upgrade to Plus, Pro, or Ultimate to unlock.',
      'vi': 'Nâng cấp lên Plus, Pro hoặc Ultimate để mở khóa.',
      'ja': 'Plus、Pro、Ultimateへアップグレードすると利用できます。',
    },
    'unitComprehensiveConversationPreparing': {
      'en': 'This content is being prepared and is not available yet.',
      'vi': 'Nội dung này đang được chuẩn bị và chưa mở.',
      'ja': 'このコンテンツは準備中で、まだご利用いただけません。',
    },
    'exerciseTypeChoice': {'en': 'Choose an answer', 'vi': 'Chọn đáp án'},
    'exerciseTypeMatching': {'en': 'Match words', 'vi': 'Nối từ'},
    'exerciseTypeOrdering': {'en': 'Arrange the sentence', 'vi': 'Sắp xếp câu'},
    'exerciseTypeDialogueFill': {
      'en': 'Complete the dialogue',
      'vi': 'Hoàn thành hội thoại',
    },
    'exerciseTypeChatFill': {
      'en': 'Complete the chat',
      'vi': 'Hoàn thành đoạn chat',
    },
    'exerciseTypeListening': {'en': 'Listen and choose', 'vi': 'Nghe và chọn'},
    'exerciseTypeCheckpoint': {'en': 'Quick check', 'vi': 'Kiểm tra nhanh'},
    'exerciseTypeAiPractice': {
      'en': 'Real-World Practice',
      'vi': 'Thực hành thực tế',
      'ja': '実践練習',
    },
    'plusTeaserHeading': {
      'en': '🔒 Plus Practice',
      'vi': '🔒 Luyện tập Plus',
      'ja': '🔒 Plus 練習',
    },
    'plusTeaserDescription': {
      'en':
          'Questions 11–14 include advanced situations, harder ordering, '
          'and Real-World Practice.',
      'vi':
          'Câu 11–14 gồm tình huống nâng cao, sắp xếp khó hơn và thực hành '
          'thực tế.',
      'ja': '11〜14問には、応用的な状況、より難しい並べ替え、実践練習が含まれます。',
    },
    'correct': {'en': 'Correct', 'vi': 'Đúng rồi'},
    'notQuite': {'en': 'Not quite', 'vi': 'Chưa đúng'},
    'tryAgain': {'en': 'Try again', 'vi': 'Thử lại'},
    'plusAdvancedBadge': {'en': 'Plus · Advanced', 'vi': 'Plus · bài nâng cao'},
    'aiReviewHelper': {
      'en': 'AI will ask a short question and correct your answer.',
      'vi': 'AI sẽ hỏi ngắn và sửa câu trả lời của bạn.',
    },
    'plusAiReviewTitle': {
      'en': 'Plus · Review AI feedback (no extra call)',
      'vi': 'Plus · xem lại phản hồi AI (không gọi thêm)',
    },
    'aiFeedbackReuseHelper': {
      'en': 'This step reuses the Exercise 9 result.',
      'vi': 'Bước này tái sử dụng kết quả Exercise 9.',
    },
    'playingAudio': {'en': 'Playing audio…', 'vi': 'Đang phát âm…'},
    'listenTooltip': {'en': 'Listen', 'vi': 'Nghe'},
    'ttsUnavailable': {
      'en': 'Device TTS voice is unavailable for this language.',
      'vi': 'Thiết bị chưa có giọng TTS cho ngôn ngữ này.',
    },
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
      'en':
          'Tell NovaLang a little about you. Only your display name is required.',
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
    'dailyGoal': {
      'en': 'Daily goal',
      'vi': 'Mục tiêu hằng ngày',
      'ja': '毎日の目標',
    },
    'dailyGoalSubtitle': {
      'en': 'How many minutes do you want to study each day?',
      'vi': 'Bạn muốn học bao nhiêu phút mỗi ngày?',
      'ja': '1日に何分勉強しますか？',
    },
    'dailyGoalGentle': {'en': 'Gentle', 'vi': 'Nhẹ nhàng', 'ja': '気軽に'},
    'dailyGoalSteady': {'en': 'Steady', 'vi': 'Đều đặn', 'ja': 'コツコツ'},
    'dailyGoalFocused': {'en': 'Focused', 'vi': 'Tập trung', 'ja': '集中'},
    'dailyGoalSerious': {'en': 'Serious', 'vi': 'Nghiêm túc', 'ja': '本気'},
    'dailyGoalAccelerated': {
      'en': 'Accelerated',
      'vi': 'Tăng tốc',
      'ja': '集中強化',
    },
    'dailyGoalDedicated': {'en': 'Dedicated', 'vi': 'Chuyên tâm', 'ja': '徹底'},
    'nicheInstruction': {
      'en':
          'Choose multiple focuses, then tap a selected item again to make it primary.',
      'vi': 'Chọn nhiều mục tiêu, rồi chạm lại để đặt trọng tâm chính.',
    },
    'learningLanguageSubtitle': {
      'en': 'Pick the language you want to learn with NovaLang.',
      'vi': 'Chọn ngôn ngữ bạn muốn học với NovaLang.',
    },
    'minutesDay': {'en': 'minutes/day', 'vi': 'phút/ngày', 'ja': '分/日'},
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
    'willBeAddedLater': {'en': 'Will be added later', 'vi': 'Sẽ được thêm sau'},
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
          'Follow your language path. Complete beginners start with the basics.',
      'vi':
          'Theo lộ trình ngôn ngữ của bạn. Người mới bắt đầu học phần nền tảng trước.',
    },
    'coreFoundationRequired': {
      'en': 'Start with the basics',
      'vi': 'Bắt đầu với phần nền tảng',
    },
    'coreFoundationRequiredHelp': {
      'en':
          'Complete beginners practice letters and sounds first. Everyday greetings unlock after you finish or skip this step.',
      'vi':
          'Người mới học luyện chữ cái và âm trước. Các bài chào hỏi hằng ngày sẽ mở sau khi bạn hoàn thành hoặc bỏ qua bước này.',
    },
    'skipCoreFoundation': {
      'en': 'Skip the basics',
      'vi': 'Bỏ qua phần nền tảng',
    },
    'exerciseResultsTitle': {
      'en': 'Exercises complete',
      'vi': 'Hoàn thành bài tập',
      'ja': '練習完了',
    },
    'vocabulary': {
      'en': 'Vocabulary',
      'vi': 'Từ vựng',
      'ja': '単語',
      'ko': '단어',
      'zh': '词汇',
    },
    'lessonIntro': {
      'en': 'Lesson intro',
      'vi': 'Giới thiệu bài học',
      'ja': 'レッスン紹介',
      'ko': '레슨 소개',
      'zh': '课程介绍',
    },
    'lessonVocabCardsSection': {
      'en': 'Vocabulary cards',
      'vi': 'Thẻ từ vựng',
      'ja': '語彙カード',
      'ko': '단어 카드',
      'zh': '词汇卡片',
    },
    'learnMiniDialogue': {
      'en': 'Short dialogues',
      'vi': 'Hội thoại ngắn',
      'ja': '短い会話',
    },
    'learnGrammarPatterns': {'en': 'Grammar', 'vi': 'Ngữ pháp', 'ja': '文法'},
    'practiceExercises': {'en': 'Exercises', 'vi': 'Bài tập', 'ja': '練習問題'},
    'startExercises': {
      'en': 'Start exercises · {count}',
      'vi': 'Bắt đầu bài tập · {count}',
      'ja': '練習を始める · {count}',
      'ko': '연습 시작 · {count}',
      'zh': '开始练习 · {count}',
    },
    'lessonQuestionsCount': {
      'en': '{count} questions',
      'vi': '{count} câu',
      'ja': '{count}問',
    },
    'exerciseNumber': {
      'en': 'Exercise {current}/{total}',
      'vi': 'Bài tập {current}/{total}',
      'ja': '練習 {current}/{total}',
      'ko': '연습 {current}/{total}',
      'zh': '练习 {current}/{total}',
    },
    'vocabReading': {'en': 'Reading', 'vi': 'Cách đọc'},
    'vocabMeaning': {'en': 'Meaning', 'vi': 'Nghĩa'},
    'vocabExample': {'en': 'Example', 'vi': 'Ví dụ'},
    'vocabTranslation': {'en': 'Translation', 'vi': 'Dịch'},
    'lessonExamples': {'en': 'Examples', 'vi': 'Ví dụ'},
    'importantNote': {'en': 'Important note', 'vi': 'Điểm quan trọng'},
    'whenToUse': {
      'en': 'When to use',
      'vi': 'Thời điểm và hoàn cảnh thường dùng',
    },
    'appropriateFor': {'en': 'Appropriate for', 'vi': 'Đối tượng phù hợp'},
    'avoidUse': {'en': 'Avoid', 'vi': 'Không nên dùng'},
    'register': {'en': 'Register', 'vi': 'Mức độ lịch sự'},
    'otherExpressions': {'en': 'Other expressions', 'vi': 'Cách diễn đạt khác'},
    'emptyContentPlaceholder': {
      'en': 'No content',
      'vi': 'Không có nội dung',
      'ja': '内容なし',
    },
    'explanation': {'en': 'Explanation', 'vi': 'Giải thích'},
    'formula': {'en': 'Formula', 'vi': 'Công thức'},
    'commonMistake': {'en': 'Common mistake', 'vi': 'Lỗi thường gặp'},
    'comparison': {'en': 'Comparison', 'vi': 'So sánh'},
    'distinctions': {
      'en': 'Similar expressions',
      'vi': 'Phân biệt câu dễ nhầm',
    },
    'showDetails': {'en': 'Show details', 'vi': 'Xem chi tiết'},
    'hideDetails': {'en': 'Hide details', 'vi': 'Ẩn chi tiết'},
    'afterLessonCanDo': {
      'en': 'After this lesson',
      'vi': 'Sau bài học làm được gì',
    },
    'todayLearn': {'en': 'Today’s expressions', 'vi': 'Hôm nay học gì'},
    'shortNote': {'en': 'Short note', 'vi': 'Lưu ý ngắn'},
    'romanization': {'en': 'Romanization', 'vi': 'Phiên âm'},
    'lessonSectionIntroJapanese': {'en': 'レッスン紹介', 'vi': 'レッスン紹介'},
    'lessonSectionVocabularyJapanese': {'en': '語彙（ごい）', 'vi': '語彙（ごい）'},
    'lessonSectionDialogueJapanese': {'en': '会話（かいわ）', 'vi': '会話（かいわ）'},
    'lessonSectionGrammarJapanese': {'en': '文法（ぶんぽう）', 'vi': '文法（ぶんぽう）'},
    'lessonSectionExerciseJapanese': {'en': '練習（れんしゅう）', 'vi': '練習（れんしゅう）'},
    'lessonMenuIntroDescription': {
      'en': 'Goals and situation',
      'vi': 'Mục tiêu và tình huống',
    },
    'lessonMenuVocabularyDescription': {
      'en': 'Words and useful expressions',
      'vi': 'Từ và cụm từ cần dùng',
    },
    'lessonMenuDialogueDescription': {
      'en': 'Three short conversations',
      'vi': 'Ba hội thoại ngắn',
    },
    'lessonMenuGrammarDescription': {
      'en': 'Key sentence patterns',
      'vi': 'Các mẫu câu chính',
    },
    'lessonMenuExerciseDescription': {
      'en': 'Practice will be added next',
      'vi': 'Bài tập sẽ được bổ sung sau',
    },
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
    'emailMockHint': {'en': 'demo@novalang.local', 'vi': 'demo@novalang.local'},
    'emailMockSkip': {'en': 'Use demo email', 'vi': 'Dùng email demo'},
    'mockAuthDevNote': {
      'en': 'Mock login enabled for local development.',
      'vi': 'Đăng nhập giả đang bật cho phát triển local.',
    },
    'chooseFocusToContinue': {
      'en': 'Select a focus to continue',
      'vi': 'Chọn một mục để tiếp tục',
    },
    'focusSaved': {'en': 'Learning focus saved', 'vi': 'Đã lưu trọng tâm học'},
    'addSecondTrack': {
      'en': 'Add a second study track',
      'vi': 'Thêm lộ trình học thứ hai',
    },
    'activeTracksTitle': {
      'en': 'Active study tracks',
      'vi': 'Lộ trình học đang dùng',
    },
    'trackProgress': {
      'en': 'Track progress: {done}/{total}',
      'vi': 'Tiến độ lộ trình: {done}/{total}',
    },

    // Domain Navigation UI (Learning Track -> Professional Category ->
    // Domain) — preview/debug shell, not yet wired into onboarding.
    'domainNavTitle': {
      'en': 'Explore learning tracks',
      'vi': 'Khám phá lộ trình học',
      'ja': '学習トラックを探す',
    },
    'professionalCategoriesTitle': {
      'en': 'Choose a professional category',
      'vi': 'Chọn một nhóm ngành nghề',
      'ja': '職種カテゴリーを選択',
    },
    'contentInPreparation': {
      'en': 'Content in preparation',
      'vi': 'Đang chuẩn bị nội dung',
      'ja': 'コンテンツ準備中',
    },
    'selectAction': {'en': 'Select', 'vi': 'Chọn', 'ja': '選択'},
    'selectedState': {'en': 'Selected', 'vi': 'Đã chọn', 'ja': '選択済み'},
    'domainCount': {'en': '{n} domains', 'vi': '{n} lĩnh vực', 'ja': '{n}分野'},
    'selectedDomainCount': {
      'en': 'Selected {count}',
      'vi': 'Đã chọn {count}',
      'ja': '{count}件選択',
    },
    'legacyProfessionalFocusReselect': {
      'en':
          'Your previous Environment, Energy & Agriculture focus was split '
          'into separate domains. Please choose Agriculture & AgriTech or '
          'Green Energy & Building Operations.',
      'vi':
          'Lĩnh vực Môi trường, Năng lượng & Nông nghiệp trước đây đã được '
          'tách nhỏ. Vui lòng chọn lại Nông nghiệp & Công nghệ nông nghiệp '
          'hoặc Năng lượng xanh & Vận hành tòa nhà.',
      'ja':
          '以前の「環境・エネルギー・農業」は複数の分野に分割されました。'
          '「農業・アグリテック」または「グリーンエネルギー・ビル運用」'
          'を選び直してください。',
    },
    'trackShellPlaceholder': {
      'en': "This track's catalog is not part of this task yet.",
      'vi': 'Danh mục cho lộ trình này chưa nằm trong phạm vi task này.',
      'ja': 'このトラックのカタログは、このタスクの範囲にはまだ含まれていません。',
    },
    // Learning tracks (Level 1)
    'trackBasicCommunication': {
      'en': 'Basic Communication',
      'vi': 'Giao tiếp cơ bản',
      'ja': '基礎コミュニケーション',
    },
    'trackProfessionalCareer': {
      'en': 'Professional & Career',
      'vi': 'Nghề nghiệp',
      'ja': 'キャリア・専門職',
    },
    'trackExamPreparation': {
      'en': 'Exam Preparation',
      'vi': 'Kỳ thi',
      'ja': '試験対策',
    },

    // Professional categories (Level 2)
    'categoryDigitalTechnology': {
      'en': 'Digital & Tech',
      'vi': 'Công nghệ & Số hóa',
      'ja': 'デジタル・テクノロジー',
    },
    'categoryDigitalTechnologyDescription': {
      'en': 'Logical thinking, technology, data, and flexible teamwork.',
      'vi': 'Tư duy logic, công nghệ, dữ liệu và làm việc nhóm linh hoạt.',
      'ja': '論理的思考、テクノロジー、データ、柔軟なチームワーク。',
    },
    'categoryCorporateBusiness': {
      'en': 'Corporate & Business',
      'vi': 'Quản trị & Doanh nghiệp',
      'ja': '経営・ビジネス',
    },
    'categoryCorporateBusinessDescription': {
      'en': 'Office work, business email, meetings, reports, and negotiation.',
      'vi': 'Văn phòng, email thương mại, họp hành, báo cáo và đàm phán.',
      'ja': 'オフィスワーク、ビジネスメール、会議、報告、交渉。',
    },
    'categoryHospitalityCustomerService': {
      'en': 'Hospitality & Customer Service',
      'vi': 'Dịch vụ & Khách sạn',
      'ja': '接客・カスタマーサービス',
    },
    'categoryHospitalityCustomerServiceDescription': {
      'en': 'Polite communication, empathy, and handling customer needs.',
      'vi': 'Giao tiếp lịch thiệp, đồng cảm và xử lý nhu cầu khách hàng.',
      'ja': '丁寧なコミュニケーション、共感、顧客対応。',
    },
    'categoryEngineeringProduction': {
      'en': 'Engineering & Production',
      'vi': 'Kỹ thuật & Sản xuất',
      'ja': 'エンジニアリング・生産',
    },
    'categoryEngineeringProductionDescription': {
      'en': 'Safety, specifications, operations, and incident reporting.',
      'vi': 'An toàn, thông số kỹ thuật, vận hành và báo cáo sự cố.',
      'ja': '安全、仕様、運用、インシデント報告。',
    },
    'categoryCareHealthEducation': {
      'en': 'Healthcare & Education',
      'vi': 'An sinh & Y tế',
      'ja': '医療・教育',
    },
    'categoryCareHealthEducationDescription': {
      'en': 'Care, support, patient communication, and education.',
      'vi': 'Chăm sóc, hỗ trợ, giao tiếp kiên nhẫn và giáo dục.',
      'ja': 'ケア、サポート、思いやりのあるコミュニケーション、教育。',
    },
    'categoryGreenAgricultureSupplyChain': {
      'en': 'Green & Supply Chain',
      'vi': 'Logistics, Nông nghiệp & Môi trường',
      'ja': '物流・農業・環境',
    },
    'categoryGreenAgricultureSupplyChainDescription': {
      'en': 'Supply chain, fieldwork, ecology, weather, and maintenance.',
      'vi': 'Chuỗi cung ứng, thực địa, sinh thái, thời tiết và bảo trì.',
      'ja': 'サプライチェーン、現場作業、生態系、天候、メンテナンス。',
    },

    // Professional domains (Level 3), grouped by category in source order.
    'domainItSoftware': {
      'en': 'IT & Software',
      'vi': 'CNTT & Lập trình',
      'ja': 'IT・ソフトウェア',
    },
    'domainAiDataAnalytics': {
      'en': 'AI, Data & Analytics',
      'vi': 'AI, Dữ liệu & Phân tích',
      'ja': 'AI・データ分析',
    },
    'domainRoboticsIotAutomation': {
      'en': 'Robotics, IoT & Automation',
      'vi': 'Robotics, IoT & Tự động hóa',
      'ja': 'ロボティクス・IoT・自動化',
    },
    'domainDigitalDesignUiUx': {
      'en': 'Digital Design & UI/UX',
      'vi': 'Mỹ thuật số & Thiết kế giao diện (UI/UX)',
      'ja': 'デジタルデザイン・UI/UX',
    },
    'domainEcommerceOnlineOperations': {
      'en': 'E-commerce & Online Operations',
      'vi': 'Thương mại điện tử & Vận hành Online',
      'ja': 'Eコマース・オンライン運営',
    },
    'domainOfficeAdministration': {
      'en': 'Office Administration',
      'vi': 'Quản trị văn phòng & Hành chính',
      'ja': 'オフィス管理・事務',
    },
    'domainFinanceAccountingAudit': {
      'en': 'Finance, Accounting & Audit',
      'vi': 'Tài chính, Kế toán & Kiểm toán',
      'ja': '財務・会計・監査',
    },
    'domainHumanResourcesRecruitment': {
      'en': 'Human Resources & Recruitment',
      'vi': 'Nhân sự & Tuyển dụng',
      'ja': '人事・採用',
    },
    'domainLegalCompliance': {
      'en': 'Legal & Compliance',
      'vi': 'Pháp lý & Tuân thủ',
      'ja': '法務・コンプライアンス',
    },
    'domainSalesCustomerService': {
      'en': 'Sales & Customer Service',
      'vi': 'Bán hàng & Chăm sóc khách hàng',
      'ja': '営業・カスタマーサービス',
    },
    'domainTravelHospitality': {
      'en': 'Travel & Hospitality',
      'vi': 'Du lịch & Dịch vụ khách sạn',
      'ja': '旅行・ホスピタリティ',
    },
    'domainFoodBeverage': {
      'en': 'Food & Beverage (F&B)',
      'vi': 'Nhà hàng & Ẩm thực (F&B)',
      'ja': '飲食（F&B）',
    },
    'domainBeautyAestheticsSpa': {
      'en': 'Beauty, Aesthetics & Spa',
      'vi': 'Làm đẹp, Thẩm mỹ & Spa',
      'ja': '美容・エステ・スパ',
    },
    'domainManufacturingEngineering': {
      'en': 'Manufacturing & Engineering',
      'vi': 'Sản xuất & Kỹ thuật chế tạo',
      'ja': '製造・エンジニアリング',
    },
    'domainConstructionRealEstate': {
      'en': 'Construction & Real Estate',
      'vi': 'Xây dựng & Bất động sản',
      'ja': '建設・不動産',
    },
    'domainAutomotiveMobility': {
      'en': 'Automotive & Mobility',
      'vi': 'Công nghiệp Ô tô & Di chuyển',
      'ja': '自動車・モビリティ',
    },
    'domainFoodProcessingBeverageProduction': {
      'en': 'Food Processing & Beverage Production',
      'vi': 'Chế biến thực phẩm & Đồ uống',
      'ja': '食品加工・飲料製造',
    },
    'domainClinicalHealthcare': {
      'en': 'Clinical Healthcare',
      'vi': 'Y tế & Chăm sóc sức khỏe lâm sàng',
      'ja': '臨床医療',
    },
    'domainNursingElderlyCare': {
      'en': 'Nursing & Elderly Care',
      'vi': 'Điều dưỡng & Chăm sóc người cao tuổi',
      'ja': '看護・高齢者ケア',
    },
    'domainEducationSchool': {
      'en': 'Education & School',
      'vi': 'Giáo dục & Trường học',
      'ja': '教育・学校',
    },
    'domainSocialPublicServices': {
      'en': 'Social & Public Services',
      'vi': 'Dịch vụ xã hội & Đời sống công cộng',
      'ja': '社会福祉・公共サービス',
    },
    'domainLogisticsSupplyChain': {
      'en': 'Logistics & Supply Chain',
      'vi': 'Logistics & Chuỗi cung ứng',
      'ja': '物流・サプライチェーン',
    },
    'domainAgricultureAgritech': {
      'en': 'Agriculture & AgriTech',
      'vi': 'Nông nghiệp & Trồng trọt công nghệ cao',
      'ja': '農業・アグリテック',
    },
    'domainFisheriesAquaculture': {
      'en': 'Fisheries & Aquaculture',
      'vi': 'Ngư nghiệp & Nuôi trồng thủy sản',
      'ja': '漁業・養殖業',
    },
    'domainGreenEnergyBuildingOperations': {
      'en': 'Green Energy & Building Operations',
      'vi': 'Năng lượng xanh & Vận hành tòa nhà',
      'ja': 'グリーンエネルギー・ビル運用',
    },

    // Real "Trọng tâm học" (Learning Focus) screen: embedded professional
    // categories/domains + collapsible notice.
    'professionalFocusSectionTitle': {
      'en': 'Career / Specialized Fields',
      'vi': 'Nghề nghiệp / Lĩnh vực chuyên môn',
      'ja': '仕事・専門分野',
    },
    'professionalNoticeTitle': {'en': 'Note', 'vi': 'Chú ý', 'ja': '注意'},
    'professionalNoticePreview': {
      'en':
          "NovaLang's professional courses focus on practical language "
          'used in common workplace situations...',
      'vi':
          'Các khóa học nghề nghiệp của NovaLang tập trung vào ngôn ngữ '
          'thực tế dùng trong những tình huống phổ biến tại nơi làm việc...',
      'ja': 'NovaLangの職業別コースは、職場でよく使われる実用的な表現と一般的な場面を中心に学びます…',
    },
    'professionalNoticeFull': {
      'en':
          "NovaLang's professional courses focus on practical language "
          'used in common workplace situations.\n\n'
          'The content helps learners practice communicating with '
          'colleagues, customers, and managers; asking for and confirming '
          'information; discussing work; reporting problems; receiving '
          'instructions; and using common workplace vocabulary.\n\n'
          'These courses do not provide advanced professional training, '
          'occupational certification, or a substitute for specialized '
          'education.',
      'vi':
          'Các khóa học nghề nghiệp của NovaLang tập trung vào ngôn ngữ '
          'thực tế dùng trong những tình huống phổ biến tại nơi làm việc.\n\n'
          'Nội dung giúp người học luyện tập cách giao tiếp với đồng nghiệp, '
          'khách hàng và quản lý; hỏi và xác nhận thông tin; trao đổi công '
          'việc; báo cáo vấn đề; tiếp nhận hướng dẫn và sử dụng các từ vựng '
          'nghề nghiệp thường gặp.\n\n'
          'Các khóa học này không nhằm cung cấp kiến thức chuyên môn chuyên '
          'sâu, đào tạo để hành nghề, cấp chứng chỉ nghề nghiệp hoặc thay '
          'thế chương trình đào tạo chuyên ngành.',
      'ja':
          'NovaLangの職業別コースは、職場でよく使われる実用的な言語と一般的なコミュニケーション場面を中心に学習します。\n\n'
          '同僚、顧客、上司との会話、情報の確認、業務上のやり取り、問題の報告、指示の理解、職場でよく使われる語彙などを練習します。\n\n'
          '専門的な職業訓練、資格取得、または専門教育の代替を目的としたものではありません。',
    },
    'professionalNoticeTapMore': {
      'en': 'Tap to read more',
      'vi': 'Bấm để xem thêm',
      'ja': 'タップして詳細を見る',
    },
  };

  static String text(String key, String languageCode) {
    final fromJson = MobileUiStrings.instance.lookup(key, languageCode);
    if (fromJson != null) return fromJson;
    return _fallbackText(key, languageCode);
  }

  static String _fallbackText(String key, String languageCode) {
    final map = _fallback[key];
    final locale = languageCode
        .trim()
        .toLowerCase()
        .replaceAll('_', '-')
        .split('-')
        .first;
    final value = map?[locale]?.trim();
    if (value != null && value.isNotEmpty) return value;
    return '⟦missing:$key:$locale⟧';
  }
}

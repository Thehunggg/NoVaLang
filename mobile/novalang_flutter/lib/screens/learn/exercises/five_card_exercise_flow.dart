import 'dart:async';

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/theme/app_theme.dart';
import '../../../core/utils/localization.dart';
import '../../../core/utils/native_content.dart';
import '../../../core/utils/responsive.dart';
import '../../../data/curriculum_repository.dart';
import '../../../models/five_card_practice.dart';
import '../../../models/lesson.dart';
import '../../../services/ai_exercise_grader.dart';
import '../../../services/ai_exercise_quota_service.dart';
import '../../../services/exercise_review_repository.dart';
import '../../../services/exercise_attempt_repository.dart';
import '../../../services/golden_lesson_completion_action.dart';
import '../../../services/tts_service.dart';
import '../../../state/profile_provider.dart';
import '../../../widgets/common/app_button.dart';
import '../../../widgets/common/app_scaffold.dart';
import '../../../widgets/common/responsive_page.dart';
import '../../../widgets/common/nova_lang_exercise_encouragement.dart';
import '../../../widgets/learn/exercise_option_style.dart';
import '../../../widgets/lesson/speaker_button.dart';
import 'chat_text_fill_exercise.dart';

enum ExerciseAccessPlan { free, plus }

final exerciseAccessPlanProvider = Provider<ExerciseAccessPlan>(
  (_) => ExerciseAccessPlan.free,
);
final aiExerciseQuotaServiceProvider = Provider<AiExerciseQuotaService>(
  (_) => AiExerciseQuotaService(SharedPreferencesAiExerciseQuotaStore()),
);
final aiExerciseGraderProvider = Provider<AiExerciseGrader>(
  (_) => const DevMockAiExerciseGrader(),
);
final wrongAnswerRepositoryProvider = Provider<WrongAnswerRepository>(
  (_) => SharedPreferencesExerciseReviewRepository(),
);
final exerciseAttemptRepositoryProvider = Provider<ExerciseAttemptRepository>(
  (_) => SharedPreferencesExerciseAttemptRepository(),
);

@immutable
class Q14ReadingAidSessionState {
  const Q14ReadingAidSessionState({
    required this.showReading,
    required this.showRomanization,
    required this.lessonSessionKey,
    required this.currentLevel,
    required this.romanizationToggleAllowed,
  });

  final bool showReading;
  final bool showRomanization;
  final String lessonSessionKey;
  final String currentLevel;
  final bool romanizationToggleAllowed;

  Q14ReadingAidSessionState copyWith({
    bool? showReading,
    bool? showRomanization,
  }) => Q14ReadingAidSessionState(
    showReading: showReading ?? this.showReading,
    showRomanization: showRomanization ?? this.showRomanization,
    lessonSessionKey: lessonSessionKey,
    currentLevel: currentLevel,
    romanizationToggleAllowed: romanizationToggleAllowed,
  );
}

bool q14RomanizationToggleAllowed(String level) =>
    const {'A0', 'A1', 'A2', 'B1'}.contains(level.trim().toUpperCase());

const _q14KnownLevels = {'A0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'};

class Q14ReadingAidSessionStore extends ChangeNotifier {
  final Map<String, Q14ReadingAidSessionState> _states = {};

  Q14ReadingAidSessionState stateFor({
    required String lessonSessionKey,
    required String currentLevel,
  }) {
    final normalizedLevel = currentLevel.trim().toUpperCase();
    return _states.putIfAbsent(lessonSessionKey, () {
      if (kDebugMode && !_q14KnownLevels.contains(normalizedLevel)) {
        debugPrint(
          'Q14 romanization toggle hidden for unknown lesson level: '
          '$currentLevel',
        );
      }
      return Q14ReadingAidSessionState(
        showReading: true,
        showRomanization: false,
        lessonSessionKey: lessonSessionKey,
        currentLevel: normalizedLevel,
        romanizationToggleAllowed: q14RomanizationToggleAllowed(
          normalizedLevel,
        ),
      );
    });
  }

  void setShowReading(String lessonSessionKey, bool value) {
    final current = _states[lessonSessionKey];
    if (current == null || current.showReading == value) return;
    _states[lessonSessionKey] = current.copyWith(showReading: value);
    notifyListeners();
  }

  void setShowRomanization(String lessonSessionKey, bool value) {
    final current = _states[lessonSessionKey];
    if (current == null ||
        !current.romanizationToggleAllowed ||
        current.showRomanization == value) {
      return;
    }
    _states[lessonSessionKey] = current.copyWith(showRomanization: value);
    notifyListeners();
  }
}

final q14ReadingAidSessionStoreProvider = Provider<Q14ReadingAidSessionStore>(
  (_) => Q14ReadingAidSessionStore(),
);

// Temporary trial unlock for Exercise Format review.
// Disable after the format is approved.
const bool trialUnlockExerciseFormat = true;
const String _trialLessonId = 'ja-daily_life-m01-u1-l1';

class FiveCardExerciseLandingPage extends ConsumerStatefulWidget {
  const FiveCardExerciseLandingPage({
    super.key,
    required this.lesson,
    required this.uiLanguageCode,
    required this.learningLanguageCode,
    required this.nativeLanguageCode,
  });

  final Lesson lesson;
  final String uiLanguageCode;
  final String learningLanguageCode;
  final String nativeLanguageCode;

  @override
  ConsumerState<FiveCardExerciseLandingPage> createState() =>
      _FiveCardExerciseLandingPageState();
}

class _FiveCardExerciseLandingPageState
    extends ConsumerState<FiveCardExerciseLandingPage> {
  ExerciseAttemptSnapshot? _savedAttempt;
  List<ExerciseReviewRecord> _wrongAnswers = const [];

  @override
  void initState() {
    super.initState();
    _loadLocalState();
  }

  Future<void> _loadLocalState() async {
    final profile = ref.read(profileProvider);
    final values = await Future.wait([
      ref
          .read(exerciseAttemptRepositoryProvider)
          .active(
            userId: profile.userId,
            userTrackId: profile.effectiveCurrentTrack,
            lessonId: widget.lesson.id,
          ),
      ref
          .read(wrongAnswerRepositoryProvider)
          .forLesson(userId: profile.userId, lessonId: widget.lesson.id),
    ]);
    if (!mounted) return;
    setState(() {
      _savedAttempt = values[0] as ExerciseAttemptSnapshot?;
      _wrongAnswers = values[1] as List<ExerciseReviewRecord>;
    });
  }

  @override
  Widget build(BuildContext context) {
    final lesson = widget.lesson;
    final uiLanguageCode = widget.uiLanguageCode;
    final learningLanguageCode = widget.learningLanguageCode;
    final practice = FiveCardPractice.fromLesson(
      lesson,
      nativeLanguageCode: widget.nativeLanguageCode,
    );
    if (practice == null) {
      return AppScaffold(
        title: L10n.text('practiceExercises', uiLanguageCode),
        showBack: true,
        languageCode: uiLanguageCode,
        child: ResponsivePage(
          child: Text(L10n.text('comingSoon', uiLanguageCode)),
        ),
      );
    }
    return Scaffold(
      appBar: AppBar(title: Text(practice.title)),
      body: SafeArea(
        child: ResponsivePage(
          scrollable: true,
          bottomPadding: 100,
          pageStorageKey: PageStorageKey(
            'five-card-practice-landing-${lesson.id}',
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              _PracticeOverview(
                practice: practice,
                uiLanguageCode: uiLanguageCode,
              ),
              const SizedBox(height: 16),
              for (final group in practice.groups) ...[
                _PracticeGroupCard(group: group),
                const SizedBox(height: 12),
              ],
              _WrongAnswerLandingCard(
                records: _wrongAnswers,
                uiLanguageCode: uiLanguageCode,
                onReview: _wrongAnswers.isEmpty
                    ? null
                    : () => Navigator.of(context).push(
                        MaterialPageRoute<void>(
                          builder: (_) => WrongAnswerReviewPage(
                            records: _wrongAnswers,
                            uiLanguageCode: uiLanguageCode,
                            nativeLanguageCode: widget.nativeLanguageCode,
                          ),
                        ),
                      ),
              ),
            ],
          ),
        ),
      ),
      bottomNavigationBar: SafeArea(
        top: false,
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: AppButton(
            icon: Icons.play_arrow,
            onPressed: () async {
              final userTrackId = ref
                  .read(profileProvider)
                  .effectiveCurrentTrack;
              await Navigator.of(context).push<int>(
                MaterialPageRoute<int>(
                  builder: (_) => FiveCardExerciseSessionPage(
                    practice: practice,
                    lessonId: lesson.id,
                    lessonLevel: lesson.level,
                    userTrackId: userTrackId,
                    lessonTitle: lesson.localizedTitle(
                      widget.nativeLanguageCode,
                    ),
                    uiLanguageCode: uiLanguageCode,
                    learningLanguageCode: learningLanguageCode,
                    nativeLanguageCode: widget.nativeLanguageCode,
                    restoredAttempt: _savedAttempt,
                  ),
                ),
              );
              if (mounted) _loadLocalState();
            },
            label: _savedAttempt != null
                ? L10n.text('continueFromQuestion', uiLanguageCode).replaceAll(
                    '{number}',
                    '${_savedAttempt!.currentExerciseIndex + 1}',
                  )
                : L10n.text(
                    'startExercises',
                    uiLanguageCode,
                  ).replaceAll('{count}', '${practice.totalQuestions}'),
          ),
        ),
      ),
    );
  }
}

class _PracticeOverview extends StatelessWidget {
  const _PracticeOverview({
    required this.practice,
    required this.uiLanguageCode,
  });
  final FiveCardPractice practice;
  final String uiLanguageCode;

  @override
  Widget build(BuildContext context) {
    return _Panel(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            practice.title,
            style: Theme.of(
              context,
            ).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w900),
          ),
          const SizedBox(height: 4),
          Text(
            practice.japaneseTitle,
            style: const TextStyle(
              color: AppTheme.contentAccentForeground,
              fontWeight: FontWeight.w800,
            ),
          ),
          const SizedBox(height: 16),
          Text(
            L10n.text(
              'lessonQuestionsCount',
              uiLanguageCode,
            ).replaceAll('{count}', '${practice.totalQuestions}'),
            style: const TextStyle(fontWeight: FontWeight.w800),
          ),
          const SizedBox(height: 4),
          Text(
            practice.estimatedMinutes,
            style: const TextStyle(color: AppTheme.contentSecondaryForeground),
          ),
          const SizedBox(height: 16),
          Text(
            '${L10n.text('review', uiLanguageCode)}:',
            style: const TextStyle(fontWeight: FontWeight.w800),
          ),
          const SizedBox(height: 4),
          Text(
            practice.reviewTopics,
            style: const TextStyle(
              color: AppTheme.contentSecondaryForeground,
              height: 1.4,
            ),
          ),
        ],
      ),
    );
  }
}

class _PracticeGroupCard extends StatelessWidget {
  const _PracticeGroupCard({required this.group});
  final PracticeGroup group;

  @override
  Widget build(BuildContext context) => _Panel(
    child: Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          group.number,
          style: Theme.of(context).textTheme.titleLarge?.copyWith(
            color: AppTheme.contentAccentForeground,
            fontWeight: FontWeight.w900,
          ),
        ),
        const SizedBox(width: 14),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                group.title,
                style: const TextStyle(fontWeight: FontWeight.w900),
              ),
              const SizedBox(height: 4),
              Text(
                group.range,
                style: const TextStyle(
                  color: AppTheme.contentSecondaryForeground,
                ),
              ),
              if (group.details.isNotEmpty) ...[
                const SizedBox(height: 10),
                Text(
                  group.details,
                  style: const TextStyle(
                    color: AppTheme.contentSecondaryForeground,
                    height: 1.4,
                  ),
                ),
              ],
              if (group.badge.isNotEmpty) ...[
                const SizedBox(height: 10),
                DecoratedBox(
                  decoration: BoxDecoration(
                    color: const Color(0x2638BDF8),
                    borderRadius: BorderRadius.circular(99),
                  ),
                  child: Padding(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 10,
                      vertical: 5,
                    ),
                    child: Text(
                      group.badge,
                      style: const TextStyle(
                        color: Color(0xFF7DD3FC),
                        fontWeight: FontWeight.w800,
                      ),
                    ),
                  ),
                ),
              ],
            ],
          ),
        ),
      ],
    ),
  );
}

class _WrongAnswerLandingCard extends StatelessWidget {
  const _WrongAnswerLandingCard({
    required this.records,
    required this.uiLanguageCode,
    required this.onReview,
  });
  final List<ExerciseReviewRecord> records;
  final String uiLanguageCode;
  final VoidCallback? onReview;

  @override
  Widget build(BuildContext context) => Opacity(
    opacity: records.isEmpty ? .72 : 1,
    child: _Panel(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            L10n.text('reviewWrongAnswers', uiLanguageCode),
            style: const TextStyle(fontWeight: FontWeight.w900),
          ),
          const SizedBox(height: 6),
          Text(
            records.isEmpty
                ? L10n.text('noWrongAnswers', uiLanguageCode)
                : L10n.text(
                    'wrongAnswersAvailable',
                    uiLanguageCode,
                  ).replaceAll('{count}', '${records.length}'),
            style: const TextStyle(color: AppTheme.contentSecondaryForeground),
          ),
          if (records.isNotEmpty) ...[
            const SizedBox(height: 12),
            OutlinedButton(
              onPressed: onReview,
              child: Text(
                L10n.text(
                  'reviewWrongAnswersCount',
                  uiLanguageCode,
                ).replaceAll('{count}', '${records.length}'),
              ),
            ),
          ],
        ],
      ),
    ),
  );
}

class FiveCardExerciseSessionPage extends ConsumerStatefulWidget {
  const FiveCardExerciseSessionPage({
    super.key,
    required this.practice,
    required this.lessonId,
    required this.lessonLevel,
    required this.userTrackId,
    required this.lessonTitle,
    required this.uiLanguageCode,
    required this.learningLanguageCode,
    required this.nativeLanguageCode,
    this.initialIndex = 0,
    this.restoredAttempt,
  });
  final FiveCardPractice practice;
  final String lessonId;
  final String lessonLevel;
  final String userTrackId;
  final String lessonTitle;
  final String uiLanguageCode;
  final String learningLanguageCode;
  final String nativeLanguageCode;
  final int initialIndex;
  final ExerciseAttemptSnapshot? restoredAttempt;
  @override
  ConsumerState<FiveCardExerciseSessionPage> createState() =>
      _FiveCardExerciseSessionPageState();
}

class _FiveCardExerciseSessionPageState
    extends ConsumerState<FiveCardExerciseSessionPage>
    with WidgetsBindingObserver {
  late final PracticeAttempt attempt;
  late final String reviewAttemptId;
  late final String startedAt;
  Timer? _draftSaveDebounce;
  final Map<String, bool> results = {};
  final Map<String, Map<String, dynamic>> answersByExercise = {};
  late int index;
  bool checkpoint = false;
  String? selectedId;
  final List<String> selectedTokens = [];
  final Map<String, String> tokenSlotAnswers = {};
  String? activeTokenSlotId;
  final Map<String, String> matches = {};
  final Map<String, String> slots = {};
  final Map<String, String> chatAnswers = {};
  final Set<String> incorrectChatSlotIds = {};
  String? selectedLeft;
  int subIndex = 0;
  final List<bool> subResults = [];
  bool? checked;
  late final TextEditingController aiController;
  late final FocusNode aiFocusNode;
  AiExerciseGrade? aiGrade;
  AiExerciseQuota? quota;
  String? localError;
  bool _isExitDialogOpen = false;
  bool _isAdvancing = false;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addObserver(this);
    final saved = widget.restoredAttempt;
    attempt = saved == null
        ? PracticeAttempt.create(widget.practice)
        : PracticeAttempt.restore(saved.orderByExercise);
    reviewAttemptId =
        saved?.attemptId ?? DateTime.now().microsecondsSinceEpoch.toString();
    startedAt = saved?.startedAt ?? DateTime.now().toIso8601String();
    index = (saved?.currentExerciseIndex ?? widget.initialIndex).clamp(
      0,
      widget.practice.exercises.length - 1,
    );
    results.addAll(saved?.results ?? const {});
    subIndex = saved?.subIndex ?? 0;
    subResults.addAll(saved?.subResults ?? const []);
    checked = saved?.checked;
    answersByExercise.addAll(saved?.answers ?? const {});
    final state = answersByExercise[exercise.id] ?? const <String, dynamic>{};
    selectedId = state['selectedId']?.toString();
    selectedTokens.addAll(
      (state['selectedTokens'] as List? ?? const []).map((item) => '$item'),
    );
    tokenSlotAnswers.addAll(
      (state['tokenSlots'] as Map? ?? const {}).map(
        (key, value) => MapEntry('$key', '$value'),
      ),
    );
    matches.addAll(
      (state['matches'] as Map? ?? const {}).map(
        (key, value) => MapEntry('$key', '$value'),
      ),
    );
    slots.addAll(
      (state['slots'] as Map? ?? const {}).map(
        (key, value) => MapEntry('$key', '$value'),
      ),
    );
    chatAnswers.addAll(
      (state['chatAnswers'] as Map? ?? const {}).map(
        (key, value) => MapEntry('$key', '$value'),
      ),
    );
    aiController = TextEditingController(
      text: state['aiDraft']?.toString() ?? '',
    );
    aiFocusNode = FocusNode();
    aiController.addListener(_scheduleDraftSave);
    if (kDebugMode) {
      debugPrint(
        'AI input init controller=${identityHashCode(aiController)} focus=${identityHashCode(aiFocusNode)}',
      );
      aiController.addListener(() {
        final value = aiController.value;
        debugPrint(
          'AI input text=${value.text} selection=${value.selection} composing=${value.composing}',
        );
      });
    }
  }

  @override
  void dispose() {
    if (kDebugMode) {
      debugPrint(
        'AI input dispose controller=${identityHashCode(aiController)} focus=${identityHashCode(aiFocusNode)}',
      );
    }
    aiFocusNode.dispose();
    WidgetsBinding.instance.removeObserver(this);
    _draftSaveDebounce?.cancel();
    aiController.dispose();
    super.dispose();
  }

  PracticeExercise get exercise => widget.practice.exercises[index];
  bool get hasPlus =>
      ref.read(exerciseAccessPlanProvider) == ExerciseAccessPlan.plus;
  bool get hasTrialUnlock =>
      kDebugMode &&
      widget.lessonId == _trialLessonId &&
      trialUnlockExerciseFormat;
  bool get canContinueToPlus => hasPlus || hasTrialUnlock;

  /// Index of the first Plus-gated exercise, read from each exercise's own
  /// `plan` field (the single source of truth shared with the Web client),
  /// instead of a hard-coded position. `null` when the lesson has no Plus
  /// exercise (whole lesson is free — no paywall). The free/plus split is a
  /// clean partition in the dataset (all `free` then all `plus`), so the first
  /// `plus` index is the boundary between the last free and first plus
  /// exercise.
  int? get _firstPlusIndex {
    for (var i = 0; i < widget.practice.exercises.length; i++) {
      if (widget.practice.exercises[i].plan == 'plus') return i;
    }
    return null;
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    if (state == AppLifecycleState.inactive ||
        state == AppLifecycleState.paused ||
        state == AppLifecycleState.detached) {
      unawaited(_saveAttempt());
    }
  }

  Map<String, dynamic> _currentAnswerState() => {
    'selectedId': selectedId,
    'selectedTokens': selectedTokens,
    'tokenSlots': tokenSlotAnswers,
    'matches': matches,
    'slots': slots,
    'chatAnswers': chatAnswers,
    'aiDraft': aiController.text,
  };

  void _rememberCurrentAnswer() {
    answersByExercise[exercise.id] = _currentAnswerState();
  }

  Future<void> _saveAttempt({bool completed = false}) => ref
      .read(exerciseAttemptRepositoryProvider)
      .save(
        ExerciseAttemptSnapshot(
          userId: ref.read(profileProvider).userId,
          userTrackId: widget.userTrackId,
          attemptId: reviewAttemptId,
          lessonId: widget.lessonId,
          currentExerciseIndex: index,
          orderByExercise: attempt.orderByExercise,
          results: results,
          answers: {...answersByExercise, exercise.id: _currentAnswerState()},
          subIndex: subIndex,
          subResults: subResults,
          checked: checked,
          aiGrade: aiGrade == null
              ? null
              : {
                  'passed': aiGrade!.passed,
                  'score': aiGrade!.score,
                  'missing': aiGrade!.missingPartIndexes,
                  'explanation': aiGrade!.shortExplanation,
                  'example': aiGrade!.correctedExample,
                },
          startedAt: startedAt,
          lastUpdatedAt: DateTime.now().toIso8601String(),
          isCompleted: completed,
        ),
      );

  void _scheduleDraftSave() {
    _draftSaveDebounce?.cancel();
    _draftSaveDebounce = Timer(
      const Duration(milliseconds: 450),
      () => unawaited(_saveAttempt()),
    );
  }

  Future<void> _exit() async {
    if (_isExitDialogOpen) return;
    _isExitDialogOpen = true;
    try {
      final leave = await showDialog<bool>(
        context: context,
        builder: (context) => AlertDialog(
          title: Text(L10n.text('exerciseExitTitle', widget.uiLanguageCode)),
          content: Text(
            L10n.text('exerciseExitMessage', widget.uiLanguageCode),
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context, false),
              child: Text(L10n.text('continueLearning', widget.uiLanguageCode)),
            ),
            FilledButton(
              onPressed: () => Navigator.pop(context, true),
              child: Text(L10n.text('leaveExercises', widget.uiLanguageCode)),
            ),
          ],
        ),
      );
      if (leave == true && mounted) {
        await _saveAttempt();
        if (mounted) Navigator.pop(context, index + 1);
      }
    } finally {
      _isExitDialogOpen = false;
    }
  }

  void _resetAnswer() => setState(() {
    selectedId = null;
    selectedTokens.clear();
    tokenSlotAnswers.clear();
    activeTokenSlotId = null;
    matches.clear();
    slots.clear();
    chatAnswers.clear();
    incorrectChatSlotIds.clear();
    selectedLeft = null;
    checked = null;
    localError = null;
    aiGrade = null;
  });
  Future<void> _next() async {
    if (_isAdvancing) return;
    _isAdvancing = true;
    try {
      if (exercise.type == 'checkpoint' &&
          subIndex < exercise.subQuestions.length - 1) {
        _rememberCurrentAnswer();
        unawaited(_saveAttempt());
        setState(() {
          subResults.add(checked == true);
          subIndex += 1;
          selectedId = null;
          checked = null;
        });
        return;
      }
      if (exercise.type == 'checkpoint') {
        final score =
            subResults.where((item) => item).length + (checked == true ? 1 : 0);
        results[exercise.id] = score == exercise.subQuestions.length;
      }
      // Paywall boundary read from the exercise `plan` field (unified with the
      // Web client) instead of a hard-coded index. Fire the free-checkpoint
      // when advancing off the last free exercise into the first Plus exercise.
      final firstPlusIndex = _firstPlusIndex;
      if (firstPlusIndex != null &&
          index == firstPlusIndex - 1 &&
          !canContinueToPlus) {
        setState(() => checkpoint = true);
        return;
      }
      if (index >= widget.practice.exercises.length - 1) {
        _rememberCurrentAnswer();
        await _saveAttempt(completed: true);
        if (!mounted) return;
        Navigator.of(context).pushReplacement(
          MaterialPageRoute<void>(
            builder: (_) => FiveCardExerciseResultPage(
              practice: widget.practice,
              results: results,
              uiLanguageCode: widget.uiLanguageCode,
              lessonId: widget.lessonId,
              userTrackId: widget.userTrackId,
              attemptId: reviewAttemptId,
            ),
          ),
        );
        return;
      }
      setState(() {
        _rememberCurrentAnswer();
        index += 1;
        subIndex = 0;
        subResults.clear();
        _resetAnswer();
      });
      unawaited(_saveAttempt());
    } finally {
      _isAdvancing = false;
      if (mounted) setState(() {});
    }
  }

  void _check() {
    bool value;
    if (exercise.type == 'checkpoint') {
      value = exercise.subQuestions[subIndex].checksOption(selectedId ?? '');
    } else if (exercise.type == 'matching') {
      value = exercise.checksPairs(matches);
    } else if (exercise.type == 'sentence_ordering' ||
        exercise.type == 'dialogue_ordering') {
      value = exercise.checksOrder(selectedTokens);
    } else if (exercise.type == 'slot_ordering') {
      value = exercise.checksTokenSlots(tokenSlotAnswers);
    } else if (exercise.type == 'dialogue_fill') {
      value = exercise.checksSlots(slots);
    } else if (exercise.type == 'chat_text_fill') {
      value = exercise.checksChatSlots(chatAnswers);
      incorrectChatSlotIds
        ..clear()
        ..addAll(
          exercise.slots
              .where(
                (slot) => !slot.acceptedAnswers
                    .map(normalizePracticeTextAnswer)
                    .contains(
                      normalizePracticeTextAnswer(chatAnswers[slot.id] ?? ''),
                    ),
              )
              .map((slot) => slot.id),
        );
    } else {
      value = exercise.checksOption(selectedId ?? '');
    }
    setState(() {
      checked = value;
      results[exercise.id] = value;
    });
    _recordReview(value);
    _rememberCurrentAnswer();
    unawaited(_saveAttempt());
  }

  void _recordReview(bool correct, {AiExerciseGrade? grade}) {
    final profile = ref.read(profileProvider);
    final current = exercise.type == 'checkpoint'
        ? exercise.subQuestions[subIndex]
        : exercise;
    final selected = current.options
        .where((item) => item.id == selectedId)
        .map((item) => item.text)
        .firstOrNull;
    final userAnswer = switch (exercise.type) {
      'checkpoint' ||
      'multiple_choice' ||
      'listening_multiple_choice' => selected ?? '',
      'matching' =>
        matches.entries.map((item) => '${item.key} → ${item.value}').join('\n'),
      'sentence_ordering' || 'dialogue_ordering' =>
        selectedTokens
            .map(
              (id) => exercise.tokens.firstWhere((item) => item.id == id).text,
            )
            .join(),
      'slot_ordering' =>
        exercise.answerSlots
            .map(
              (slot) =>
                  '${exercise.tokens.firstWhere((item) => item.id == tokenSlotAnswers[slot.id]).text}${slot.afterText}',
            )
            .join(),
      'dialogue_fill' =>
        exercise.slots
            .map(
              (slot) => exercise.wordBank
                  .firstWhere((item) => item.id == slots[slot.id])
                  .text,
            )
            .join('。'),
      'chat_text_fill' =>
        exercise.slots.map((slot) => chatAnswers[slot.id] ?? '').join('\n'),
      'controlled_ai_text' => aiController.text,
      _ => '',
    };
    final record = ExerciseReviewRecord(
      attemptId: reviewAttemptId,
      userId: profile.userId,
      localStudyDate: localStudyDate(),
      lessonId: widget.lessonId,
      lessonTitle: widget.lessonTitle,
      exerciseId: exercise.id,
      exerciseNumber: exercise.order,
      subQuestionId: exercise.type == 'checkpoint' ? current.id : null,
      exerciseType: exercise.type,
      questionDisplay: current.prompt,
      userAnswer: userAnswer,
      correctAnswer: current.feedback.correctAnswer,
      isCorrect: correct,
      score: grade?.score,
      shortExplanation: correct
          ? null
          : (grade?.shortExplanation.isNotEmpty == true
                ? grade!.shortExplanation
                : current.feedback.explanation),
      // Only AI-generated explanations are locale-tagged: they cannot be
      // re-resolved later, unlike statically authored content explanations,
      // which the review UI re-resolves live from the lesson at render time.
      explanationLanguageCode: (!correct && grade != null)
          ? profile.nativeLanguageCode
          : null,
      correctedExample: grade?.correctedExample,
      missingParts: grade?.missingPartIndexes ?? const [],
      answerMetadata: exercise.type == 'slot_ordering'
          ? Map<String, String>.from(tokenSlotAnswers)
          : const {},
      completedAt: DateTime.now().toIso8601String(),
    );
    final repository = ref.read(wrongAnswerRepositoryProvider);
    unawaited(correct ? repository.resolve(record) : repository.upsert(record));
  }

  Future<void> _gradeAi() async {
    final profile = ref.read(profileProvider);
    if (!isLocallyValidAiExerciseAnswer(aiController.text, exercise)) {
      setState(
        () => localError = L10n.text(
          'exerciseInputRequired',
          widget.uiLanguageCode,
        ),
      );
      return;
    }
    final service = ref.read(aiExerciseQuotaServiceProvider);
    final current = await service.status(profile.userId);
    if (current.exhausted) {
      setState(() => quota = current);
      return;
    }
    try {
      final grade = await ref
          .read(aiExerciseGraderProvider)
          .grade(
            AiExerciseGradingRequest(
              exercise: exercise,
              answer: aiController.text,
              nativeLanguageCode: widget.nativeLanguageCode,
            ),
          );
      final updated = await service.recordCompletedSet(profile.userId);
      if (!mounted) return;
      setState(() {
        aiGrade = grade;
        quota = updated;
        checked = grade.passed;
        results[exercise.id] = grade.passed;
        localError = null;
      });
      _recordReview(grade.passed, grade: grade);
      _rememberCurrentAnswer();
      unawaited(_saveAttempt());
    } on AiExerciseOfflineException {
      if (mounted) {
        setState(
          () => localError = L10n.text(
            'exerciseAiOffline',
            widget.uiLanguageCode,
          ),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    if (checkpoint) {
      return _FreeCheckpoint(
        uiLanguageCode: widget.uiLanguageCode,
        onContinue: () => setState(() => checkpoint = false),
        onFinish: () => Navigator.pop(context),
        plus: canContinueToPlus,
        onPlus: () => setState(() {
          checkpoint = false;
          index = _firstPlusIndex ?? index + 1;
        }),
      );
    }
    // Lesson Format 3.0: Real-World Practice (Q14) is a non-graded advanced
    // dialogue activity. It never enters the check/score/AI-grading flow
    // below — no Check Answer button, no AI UI, no correct/incorrect state.
    if (exercise.type == 'real_world_practice_dialogue') {
      final lessonSessionKey = '${widget.lessonId}:$reviewAttemptId';
      final readingAidStore = ref.read(q14ReadingAidSessionStoreProvider);
      return ListenableBuilder(
        listenable: readingAidStore,
        builder: (context, child) {
          final readingAidState = readingAidStore.stateFor(
            lessonSessionKey: lessonSessionKey,
            currentLevel: widget.lessonLevel,
          );
          return _RealWorldPracticeDialoguePage(
            exercise: exercise,
            practice: widget.practice,
            uiLanguageCode: widget.uiLanguageCode,
            learningLanguageCode: widget.learningLanguageCode,
            nativeLanguageCode: widget.nativeLanguageCode,
            readingAidState: readingAidState,
            onShowReadingChanged: (value) =>
                readingAidStore.setShowReading(lessonSessionKey, value),
            onShowRomanizationChanged: (value) =>
                readingAidStore.setShowRomanization(lessonSessionKey, value),
            onExit: _exit,
            onComplete: () => unawaited(_next()),
          );
        },
      );
    }
    final progress = (index + 1) / widget.practice.totalQuestions;
    return PopScope(
      canPop: false,
      onPopInvokedWithResult: (didPop, result) {
        if (!didPop) unawaited(_exit());
      },
      child: Scaffold(
        appBar: AppBar(
          leading: IconButton(
            icon: const Icon(Icons.arrow_back),
            onPressed: _exit,
          ),
          title: Text('${index + 1}/${widget.practice.totalQuestions}'),
          bottom: PreferredSize(
            preferredSize: const Size.fromHeight(4),
            child: LinearProgressIndicator(value: progress),
          ),
        ),
        body: SafeArea(
          child: LayoutBuilder(
            builder: (context, constraints) {
              final padding = Responsive.pagePadding(context);
              return CustomScrollView(
                keyboardDismissBehavior:
                    ScrollViewKeyboardDismissBehavior.onDrag,
                slivers: [
                  SliverPadding(
                    padding: EdgeInsets.fromLTRB(
                      padding.left,
                      padding.top,
                      padding.right,
                      16,
                    ),
                    sliver: SliverToBoxAdapter(
                      child: Center(
                        child: ConstrainedBox(
                          constraints: BoxConstraints(
                            maxWidth: Responsive.maxContentWidth(context),
                          ),
                          child: _Panel(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.stretch,
                              children: [
                                _ExerciseTypeLabel(
                                  type: exercise.type,
                                  languageCode: widget.uiLanguageCode,
                                ),
                                const SizedBox(height: 12),
                                if (exercise.plan == 'plus')
                                  Text(
                                    hasTrialUnlock
                                        ? L10n.text(
                                            'exerciseTrialOpen',
                                            widget.uiLanguageCode,
                                          )
                                        : 'Plus',
                                    style: const TextStyle(
                                      color: Color(0xFFFBBF24),
                                      fontWeight: FontWeight.w900,
                                    ),
                                  ),
                                if (exercise.context.isNotEmpty) ...[
                                  Text(
                                    exercise.context,
                                    style: const TextStyle(height: 1.45),
                                  ),
                                  const SizedBox(height: 12),
                                ],
                                Text(
                                  exercise.prompt,
                                  style: Theme.of(context).textTheme.titleMedium
                                      ?.copyWith(
                                        fontWeight: FontWeight.w900,
                                        color: AppTheme.questionForeground,
                                      ),
                                ),
                                const SizedBox(height: 16),
                                _answerArea(),
                                if (checked != null || aiGrade != null)
                                  _Feedback(
                                    exercise: exercise,
                                    correct: checked == true,
                                    aiGrade: aiGrade,
                                    incorrectSlotIds: incorrectChatSlotIds,
                                    uiLanguageCode: widget.uiLanguageCode,
                                  ),
                              ],
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                  SliverLayoutBuilder(
                    builder: (context, sliverConstraints) {
                      const mascotMinSpace = 132.0;
                      final hasAvailableSpace =
                          sliverConstraints.precedingScrollExtent +
                              mascotMinSpace <=
                          sliverConstraints.viewportMainAxisExtent;
                      if (!hasAvailableSpace) {
                        return const SliverToBoxAdapter(
                          child: SizedBox.shrink(),
                        );
                      }
                      return SliverFillRemaining(
                        hasScrollBody: false,
                        child: Padding(
                          padding: EdgeInsets.fromLTRB(
                            padding.left,
                            0,
                            padding.right,
                            16,
                          ),
                          child: NovaLangExerciseEncouragement(
                            learningLanguageCode: widget.learningLanguageCode,
                            availableSpace: hasAvailableSpace,
                          ),
                        ),
                      );
                    },
                  ),
                ],
              );
            },
          ),
        ),
        bottomNavigationBar: SafeArea(
          top: false,
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: AppButton(
              label: checked != null || aiGrade != null
                  ? L10n.text('continue', widget.uiLanguageCode)
                  : L10n.text('checkAnswer', widget.uiLanguageCode),
              icon: checked != null || aiGrade != null
                  ? Icons.arrow_forward
                  : Icons.check,
              onPressed: _isAdvancing
                  ? null
                  : checked != null || aiGrade != null
                  ? _next
                  : (exercise.type == 'controlled_ai_text' ? _gradeAi : _check),
            ),
          ),
        ),
      ),
    );
  }

  Widget _answerArea() {
    if (exercise.type == 'controlled_ai_text') return _aiArea();
    if (exercise.type == 'checkpoint') return _checkpointArea();
    if (exercise.type == 'matching') return _matchingArea();
    if (exercise.type == 'chat_text_fill') {
      return ChatTextFillExercise(
        exercise: exercise,
        enabled: checked == null,
        incorrectSlotIds: incorrectChatSlotIds,
        uiLanguageCode: widget.uiLanguageCode,
        initialAnswers: chatAnswers,
        onChanged: (answers) {
          chatAnswers
            ..clear()
            ..addAll(answers);
          _scheduleDraftSave();
          if (incorrectChatSlotIds.isNotEmpty) {
            setState(incorrectChatSlotIds.clear);
          }
        },
      );
    }
    if (exercise.type == 'slot_ordering') return _tokenSlotOrderingArea();
    if (exercise.type == 'sentence_ordering' ||
        exercise.type == 'dialogue_ordering') {
      return _orderingArea(exercise.tokens, '${exercise.id}:tokens');
    }
    if (exercise.type == 'dialogue_fill') return _dialogueFillArea();
    if (exercise.type == 'listening_multiple_choice') {
      return Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          SpeakerButton(
            speechText: exercise.audioText,
            languageCode: widget.learningLanguageCode,
            uiLanguageCode: widget.uiLanguageCode,
          ),
          const SizedBox(height: 12),
          _options(exercise, '${exercise.id}:options'),
        ],
      );
    }
    return _options(exercise, '${exercise.id}:options');
  }

  Widget _options(PracticeExercise item, String key) {
    final byId = {for (final option in item.options) option.id: option};
    return Column(
      children: [
        for (final id in attempt.orderFor(key))
          Padding(
            padding: const EdgeInsets.only(bottom: 8),
            child: OutlinedButton(
              onPressed: checked == null
                  ? () => setState(() => selectedId = id)
                  : null,
              style: OutlinedButton.styleFrom(
                backgroundColor: selectedId == id
                    ? AppTheme.lessonSelectionOverlay
                    : null,
              ),
              child: Align(
                alignment: Alignment.centerLeft,
                child: Text(byId[id]!.text),
              ),
            ),
          ),
      ],
    );
  }

  ExerciseOptionVisualState _optionState({required bool selected}) {
    if (checked == null) {
      return selected
          ? ExerciseOptionVisualState.selected
          : ExerciseOptionVisualState.available;
    }
    if (!selected) return ExerciseOptionVisualState.disabled;
    return checked == true
        ? ExerciseOptionVisualState.correct
        : ExerciseOptionVisualState.incorrect;
  }

  Widget _actionOptionChip({
    required String label,
    required VoidCallback? onPressed,
    ExerciseOptionVisualState state = ExerciseOptionVisualState.available,
  }) => ExerciseActionOptionChip(
    label: label,
    state: state,
    onPressed: onPressed,
  );

  Widget _selectedOptionChip({
    required String label,
    required VoidCallback? onDeleted,
    required ExerciseOptionVisualState state,
  }) => ExerciseSelectedOptionChip(
    label: label,
    state: state,
    onDeleted: onDeleted,
  );

  Widget _tokenSlotOrderingArea() {
    final tokensById = {for (final token in exercise.tokens) token.id: token};
    final usedIds = tokenSlotAnswers.values.toSet();
    final available = attempt
        .orderFor('${exercise.id}:tokens')
        .where((id) => !usedIds.contains(id));
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Text(
          L10n.text('exerciseYourAnswer', widget.uiLanguageCode),
          style: const TextStyle(fontWeight: FontWeight.w900),
        ),
        const SizedBox(height: 8),
        Wrap(
          spacing: 6,
          runSpacing: 8,
          children: [
            for (final slot in exercise.answerSlots)
              _TokenAnswerSlot(
                label: tokenSlotAnswers[slot.id] == null
                    ? '…'
                    : tokensById[tokenSlotAnswers[slot.id]]!.text,
                afterText: slot.afterText,
                enabled: checked == null,
                visualState: tokenSlotAnswers[slot.id] != null
                    ? _optionState(selected: true)
                    : checked == null
                    ? activeTokenSlotId == slot.id
                          ? ExerciseOptionVisualState.selected
                          : ExerciseOptionVisualState.available
                    : ExerciseOptionVisualState.disabled,
                onTap: () => setState(() {
                  if (tokenSlotAnswers.containsKey(slot.id)) {
                    tokenSlotAnswers.remove(slot.id);
                  }
                  activeTokenSlotId = slot.id;
                }),
              ),
          ],
        ),
        const SizedBox(height: 16),
        Text(
          L10n.text('exerciseOptions', widget.uiLanguageCode),
          style: const TextStyle(fontWeight: FontWeight.w900),
        ),
        const SizedBox(height: 8),
        Wrap(
          spacing: 8,
          runSpacing: 8,
          children: [
            for (final id in available)
              _actionOptionChip(
                label: tokensById[id]!.text,
                state: checked == null
                    ? ExerciseOptionVisualState.available
                    : ExerciseOptionVisualState.disabled,
                onPressed: checked == null
                    ? () => setState(() {
                        final slotId =
                            activeTokenSlotId ??
                            exercise.answerSlots
                                .map((slot) => slot.id)
                                .firstWhere(
                                  (slot) => !tokenSlotAnswers.containsKey(slot),
                                  orElse: () => '',
                                );
                        if (slotId.isEmpty) return;
                        tokenSlotAnswers[slotId] = id;
                        final slotIndex = exercise.answerSlots.indexWhere(
                          (slot) => slot.id == slotId,
                        );
                        String? nextSlot;
                        for (final slot in exercise.answerSlots.skip(
                          slotIndex + 1,
                        )) {
                          if (!tokenSlotAnswers.containsKey(slot.id)) {
                            nextSlot = slot.id;
                            break;
                          }
                        }
                        activeTokenSlotId = nextSlot;
                      })
                    : null,
              ),
          ],
        ),
      ],
    );
  }

  Widget _orderingArea(List<PracticeToken> tokens, String key) {
    final byId = {for (final item in tokens) item.id: item};
    final available = attempt
        .orderFor(key)
        .where((id) => !selectedTokens.contains(id));
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Text(
          L10n.text('exerciseYourAnswer', widget.uiLanguageCode),
          style: const TextStyle(fontWeight: FontWeight.w900),
        ),
        const SizedBox(height: 8),
        if (selectedTokens.isEmpty)
          Padding(
            padding: const EdgeInsets.only(bottom: 12),
            child: Text(
              L10n.text('exerciseAnswerHint', widget.uiLanguageCode),
              style: const TextStyle(
                color: AppTheme.contentSecondaryForeground,
              ),
            ),
          ),
        Wrap(
          spacing: 8,
          runSpacing: 8,
          children: [
            for (final id in selectedTokens)
              _selectedOptionChip(
                label: byId[id]!.text,
                state: _optionState(selected: true),
                onDeleted: checked == null
                    ? () => setState(() => selectedTokens.remove(id))
                    : null,
              ),
          ],
        ),
        const SizedBox(height: 12),
        Text(
          L10n.text('exerciseOptions', widget.uiLanguageCode),
          style: const TextStyle(fontWeight: FontWeight.w900),
        ),
        const SizedBox(height: 8),
        Wrap(
          spacing: 8,
          runSpacing: 8,
          children: [
            for (final id in available)
              _actionOptionChip(
                label: byId[id]!.text,
                state: checked == null
                    ? ExerciseOptionVisualState.available
                    : ExerciseOptionVisualState.disabled,
                onPressed: checked == null
                    ? () => setState(() => selectedTokens.add(id))
                    : null,
              ),
          ],
        ),
      ],
    );
  }

  Widget _matchingArea() {
    final left = {for (final pair in exercise.pairs) pair.left.id: pair.left};
    final right = {
      for (final pair in exercise.pairs) pair.right.id: pair.right,
    };
    final pairIndexByLeft = {
      for (var i = 0; i < exercise.pairs.length; i += 1)
        exercise.pairs[i].left.id: i + 1,
    };
    final pairIndexByRight = {
      for (var i = 0; i < exercise.pairs.length; i += 1)
        exercise.pairs[i].right.id: i + 1,
    };
    final leftWidgets = [
      for (final id in attempt.orderFor('${exercise.id}:left'))
        _matchChoice(
          label: left[id]!.text,
          selected: selectedLeft == id,
          matchNumber: matches[id] == null ? null : pairIndexByLeft[id],
          onTap: () => setState(() {
            if (matches.containsKey(id)) {
              matches.remove(id);
            } else {
              selectedLeft = id;
            }
          }),
        ),
    ];
    final rightWidgets = [
      for (final id in attempt.orderFor('${exercise.id}:right'))
        _matchChoice(
          label: right[id]!.text,
          selected: selectedLeft != null && matches[selectedLeft] == id,
          matchNumber: matches.containsValue(id) ? pairIndexByRight[id] : null,
          onTap: () {
            if (selectedLeft != null) {
              setState(() {
                matches.removeWhere((_, value) => value == id);
                matches[selectedLeft!] = id;
                selectedLeft = null;
              });
            }
          },
        ),
    ];
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Text(
                L10n.text('exerciseJapanese', widget.uiLanguageCode),
                style: const TextStyle(fontWeight: FontWeight.w900),
              ),
              const SizedBox(height: 8),
              ...leftWidgets,
            ],
          ),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Text(
                L10n.text('exerciseMeaning', widget.uiLanguageCode),
                style: const TextStyle(fontWeight: FontWeight.w900),
              ),
              const SizedBox(height: 8),
              ...rightWidgets,
            ],
          ),
        ),
      ],
    );
  }

  Widget _matchChoice({
    required String label,
    required bool selected,
    required int? matchNumber,
    required VoidCallback onTap,
  }) => Padding(
    padding: const EdgeInsets.only(bottom: 8),
    child: OutlinedButton(
      onPressed: checked == null ? onTap : null,
      style: OutlinedButton.styleFrom(
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 12),
        backgroundColor: matchNumber != null
            ? AppTheme.lessonSelectionOverlay
            : selected
            ? AppTheme.lessonSelectionOverlay
            : null,
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (matchNumber != null) ...[
            DecoratedBox(
              decoration: const BoxDecoration(
                color: Color(0xFF40E0D0),
                shape: BoxShape.circle,
              ),
              child: SizedBox(
                width: 20,
                height: 20,
                child: Center(
                  child: Text(
                    '$matchNumber',
                    style: const TextStyle(
                      color: Colors.black,
                      fontWeight: FontWeight.w900,
                      fontSize: 12,
                    ),
                  ),
                ),
              ),
            ),
            const SizedBox(width: 6),
          ],
          Expanded(child: Text(label)),
        ],
      ),
    ),
  );

  Widget _dialogueFillArea() {
    final byId = {for (final item in exercise.wordBank) item.id: item};
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        for (final line in exercise.dialogue)
          Padding(
            padding: const EdgeInsets.only(bottom: 8),
            child: Text(
              line
                  .replaceAll(
                    '{{slot_1}}',
                    slots['slot_1'] == null
                        ? '________'
                        : byId[slots['slot_1']]!.text,
                  )
                  .replaceAll(
                    '{{slot_2}}',
                    slots['slot_2'] == null
                        ? '________'
                        : byId[slots['slot_2']]!.text,
                  ),
            ),
          ),
        const SizedBox(height: 8),
        Wrap(
          spacing: 8,
          children: [
            for (final id in attempt.orderFor('${exercise.id}:wordBank'))
              if (!slots.values.contains(id))
                _actionOptionChip(
                  label: byId[id]!.text,
                  onPressed: () {
                    final open = exercise.slots
                        .map((slot) => slot.id)
                        .firstWhere(
                          (slot) => !slots.containsKey(slot),
                          orElse: () => '',
                        );
                    if (open.isNotEmpty) setState(() => slots[open] = id);
                  },
                ),
          ],
        ),
      ],
    );
  }

  Widget _checkpointArea() {
    final question = exercise.subQuestions[subIndex];
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Text(
          '${subIndex + 1}/${exercise.subQuestions.length}',
          style: const TextStyle(fontWeight: FontWeight.w800),
        ),
        const SizedBox(height: 8),
        Text(
          question.prompt,
          style: const TextStyle(color: AppTheme.questionForeground),
        ),
        const SizedBox(height: 12),
        _options(question, '${question.id}:options'),
      ],
    );
  }

  Widget _aiArea() => FutureBuilder<AiExerciseQuota>(
    future: quota == null
        ? ref
              .read(aiExerciseQuotaServiceProvider)
              .status(ref.read(profileProvider).userId)
        : Future.value(quota),
    builder: (context, snapshot) {
      final value = quota ?? snapshot.data;
      if (value?.exhausted == true) {
        return Text(
          ((exercise.raw['quota'] as Map?)?['exhaustedMessage'] as String?) ??
              '',
        );
      }
      return Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          if (exercise.readingAid.isNotEmpty) Text(exercise.readingAid),
          if (exercise.translation.isNotEmpty)
            Padding(
              padding: const EdgeInsets.only(top: 8),
              child: Text(
                exercise.translation,
                style: const TextStyle(
                  color: AppTheme.contentSecondaryForeground,
                ),
              ),
            ),
          const SizedBox(height: 12),
          Text(
            (((exercise.raw['quota'] as Map?)?['remainingLabel'] as String?) ??
                    '')
                .replaceAll('{remaining}', '${value?.remaining ?? 5}'),
          ),
          const SizedBox(height: 8),
          TextField(
            key: const ValueKey('ai-exercise-input'),
            controller: aiController,
            focusNode: aiFocusNode,
            minLines: 3,
            maxLines: null,
            keyboardType: TextInputType.multiline,
            textInputAction: TextInputAction.newline,
            textCapitalization: TextCapitalization.none,
            autocorrect: false,
            enableSuggestions: true,
            smartDashesType: SmartDashesType.disabled,
            smartQuotesType: SmartQuotesType.disabled,
          ),
          if (localError != null)
            Padding(
              padding: const EdgeInsets.only(top: 8),
              child: Text(
                localError!,
                style: const TextStyle(color: Colors.redAccent),
              ),
            ),
        ],
      );
    },
  );
}

class FiveCardExerciseResultPage extends ConsumerStatefulWidget {
  const FiveCardExerciseResultPage({
    super.key,
    required this.practice,
    required this.results,
    required this.uiLanguageCode,
    required this.lessonId,
    required this.userTrackId,
    required this.attemptId,
  });
  final FiveCardPractice practice;
  final Map<String, bool> results;
  final String uiLanguageCode;
  final String lessonId;
  final String userTrackId;
  final String attemptId;

  @override
  ConsumerState<FiveCardExerciseResultPage> createState() =>
      _FiveCardExerciseResultPageState();
}

class _FiveCardExerciseResultPageState
    extends ConsumerState<FiveCardExerciseResultPage> {
  bool _isCompleting = false;
  String? _completionError;

  Future<void> _completeAndLeave() async {
    if (_isCompleting) return;
    setState(() {
      _completionError = null;
      _isCompleting = true;
    });
    try {
      final profile = ref.read(profileProvider);
      await ref
          .read(goldenLessonCompletionActionProvider)
          .run(
            attemptId: widget.attemptId,
            userId: profile.userId,
            userTrackId: widget.userTrackId,
            lessonId: widget.lessonId,
            applyUiCompatibilityBridgeOnce: () => ref
                .read(profileProvider.notifier)
                .applyLessonCompletionCompatibilityOnce(
                  lessonId: widget.lessonId,
                  stepId: 'five-card-exercise',
                  currentStepIndex: 0,
                  lessonComplete: true,
                ),
          );
      if (mounted) Navigator.pop(context);
    } catch (error, stackTrace) {
      debugPrint('Golden lesson completion failed: $error');
      debugPrintStack(stackTrace: stackTrace);
      if (mounted) {
        setState(() {
          _completionError = L10n.text('tryAgain', widget.uiLanguageCode);
          _isCompleting = false;
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final score = widget.results.values.where((value) => value).length;
    final gradedTotal = widget.practice.gradedTotalQuestions;
    return AppScaffold(
      title: L10n.text('exerciseResultsTitle', widget.uiLanguageCode),
      showBack: true,
      backEnabled: !_isCompleting,
      languageCode: widget.uiLanguageCode,
      child: ResponsivePage(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text(
              L10n.text('exerciseResultsTitle', widget.uiLanguageCode),
              style: Theme.of(
                context,
              ).textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.w900),
            ),
            const SizedBox(height: 12),
            Text('$score/$gradedTotal'),
            Text('${((score / gradedTotal) * 100).round()}%'),
            const SizedBox(height: 16),
            if (_completionError != null) ...[
              DecoratedBox(
                key: const ValueKey('completion-error'),
                decoration: BoxDecoration(
                  color: Colors.redAccent.withValues(alpha: .12),
                  border: Border.all(color: Colors.redAccent),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Padding(
                  padding: const EdgeInsets.all(12),
                  child: Row(
                    children: [
                      const Icon(Icons.error_outline, color: Colors.redAccent),
                      const SizedBox(width: 8),
                      Expanded(child: Text(_completionError!)),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 12),
            ],
            AppButton(
              label: _completionError == null
                  ? L10n.text('backToLesson', widget.uiLanguageCode)
                  : L10n.text('tryAgain', widget.uiLanguageCode),
              icon: Icons.arrow_back,
              onPressed: _isCompleting ? null : _completeAndLeave,
            ),
          ],
        ),
      ),
    );
  }
}

/// Re-resolves a statically authored wrong-answer explanation directly from
/// current lesson content at [nativeLanguageCode], instead of trusting a
/// value frozen at answer-check time. Returns null when the lesson/exercise
/// can no longer be located or the content genuinely has no explanation.
String? _liveExplanationFor(
  ExerciseReviewRecord record,
  String nativeLanguageCode,
) {
  final lesson = CurriculumRepository.findLesson(
    record.lessonId,
    nativeLanguage: nativeLanguageCode,
  );
  if (lesson == null) return null;
  final practice = FiveCardPractice.fromLesson(
    lesson,
    nativeLanguageCode: nativeLanguageCode,
  );
  if (practice == null) return null;
  PracticeExercise? target;
  for (final candidate in practice.exercises) {
    if (candidate.id == record.exerciseId) {
      target = candidate;
      break;
    }
  }
  if (target == null) return null;
  var resolved = target;
  if (record.subQuestionId != null) {
    for (final sub in resolved.subQuestions) {
      if (sub.id == record.subQuestionId) {
        resolved = sub;
        break;
      }
    }
  }
  final explanation = resolved.feedback.explanation.trim();
  if (explanation.isEmpty || explanation.startsWith('⟦missing-content:')) {
    return null;
  }
  return explanation;
}

/// Locale-safe explanation lookup for the wrong-answer review UI. Static
/// content is always re-resolved live so it tracks native-language changes;
/// AI-generated text cannot be re-resolved, so a locale mismatch is surfaced
/// explicitly instead of silently shown as if it matched the current locale.
class _ResolvedExplanation {
  const _ResolvedExplanation({required this.text, required this.isNotice});
  final String text;
  final bool isNotice;
}

_ResolvedExplanation? _resolveExplanationForDisplay(
  ExerciseReviewRecord record,
  String nativeLanguageCode,
) {
  if (record.isAiGradedExplanation) {
    final raw = (record.shortExplanation ?? '').trim();
    if (raw.isEmpty) return null;
    final recordedLocale = record.explanationLanguageCode;
    if (recordedLocale != null &&
        normalizeNativeLocale(recordedLocale) ==
            normalizeNativeLocale(nativeLanguageCode)) {
      return _ResolvedExplanation(text: raw, isNotice: false);
    }
    // Unknown-locale legacy record or confirmed mismatch: never show
    // frozen-language AI text as if it were the current native language.
    return const _ResolvedExplanation(text: '', isNotice: true);
  }
  final live = _liveExplanationFor(record, nativeLanguageCode);
  if (live != null && live.isNotEmpty) {
    return _ResolvedExplanation(text: live, isNotice: false);
  }
  final fallback = (record.shortExplanation ?? '').trim();
  if (fallback.isNotEmpty) {
    return _ResolvedExplanation(text: fallback, isNotice: false);
  }
  return null;
}

class WrongAnswerReviewPage extends StatelessWidget {
  const WrongAnswerReviewPage({
    super.key,
    required this.records,
    required this.uiLanguageCode,
    required this.nativeLanguageCode,
  });
  final List<ExerciseReviewRecord> records;
  final String uiLanguageCode;
  final String nativeLanguageCode;

  @override
  Widget build(BuildContext context) => AppScaffold(
    title: L10n.text('reviewWrongAnswers', uiLanguageCode),
    showBack: true,
    languageCode: uiLanguageCode,
    child: ResponsivePage(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          for (final item in records)
            WrongAnswerReviewCard(
              record: item,
              uiLanguageCode: uiLanguageCode,
              nativeLanguageCode: nativeLanguageCode,
            ),
        ],
      ),
    ),
  );
}

class WrongAnswerReviewCard extends StatelessWidget {
  const WrongAnswerReviewCard({
    super.key,
    required this.record,
    required this.uiLanguageCode,
    required this.nativeLanguageCode,
  });
  final ExerciseReviewRecord record;
  final String uiLanguageCode;
  final String nativeLanguageCode;
  @override
  Widget build(BuildContext context) {
    final resolved = record.isCorrect
        ? null
        : _resolveExplanationForDisplay(record, nativeLanguageCode);
    return Card(
      color: AppTheme.lessonSurface,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
        side: const BorderSide(color: AppTheme.lessonBorderSubtle),
      ),
      child: ExpansionTile(
        title: Text(
          '${L10n.text('reviewQuestionNumber', uiLanguageCode).replaceAll('{number}', '${record.exerciseNumber}')}${record.subQuestionId == null ? '' : ' · ${record.subQuestionId}'}',
        ),
        subtitle: Text(
          record.isCorrect
              ? L10n.text('correctStatus', uiLanguageCode)
              : L10n.text('incorrectStatus', uiLanguageCode),
        ),
        childrenPadding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
        children: [
          Align(
            alignment: Alignment.centerLeft,
            child: Text(record.questionDisplay),
          ),
          const SizedBox(height: 10),
          Align(
            alignment: Alignment.centerLeft,
            child: Text(
              '${L10n.text('yourAnswer', uiLanguageCode)}:\n${record.userAnswer}',
            ),
          ),
          if (!record.isCorrect) ...[
            const SizedBox(height: 10),
            Align(
              alignment: Alignment.centerLeft,
              child: Text(
                '${L10n.text('correctAnswer', uiLanguageCode)}:\n${record.correctAnswer}',
              ),
            ),
            if (resolved != null && !resolved.isNotice)
              Padding(
                padding: const EdgeInsets.only(top: 10),
                child: Align(
                  alignment: Alignment.centerLeft,
                  child: Text(
                    '💡 ${resolved.text}',
                    key: const ValueKey('wrong-answer-explanation'),
                  ),
                ),
              ),
            if (resolved != null && resolved.isNotice)
              Padding(
                padding: const EdgeInsets.only(top: 10),
                child: Align(
                  alignment: Alignment.centerLeft,
                  child: Text(
                    '⚠ ${L10n.text('aiExplanationLocaleMismatchNotice', uiLanguageCode)}',
                    key: const ValueKey('wrong-answer-explanation-notice'),
                  ),
                ),
              ),
            if ((record.correctedExample ?? '').isNotEmpty)
              Padding(
                padding: const EdgeInsets.only(top: 10),
                child: Align(
                  alignment: Alignment.centerLeft,
                  child: Text(record.correctedExample!),
                ),
              ),
          ],
        ],
      ),
    );
  }
}

/// Lesson Format 3.0 — Real-World Practice (Q14). Non-graded advanced
/// dialogue: read, listen, repeat. No answer input, no AI grading, no score.
class _RealWorldPracticeDialoguePage extends StatefulWidget {
  const _RealWorldPracticeDialoguePage({
    required this.exercise,
    required this.practice,
    required this.uiLanguageCode,
    required this.learningLanguageCode,
    required this.nativeLanguageCode,
    required this.readingAidState,
    required this.onShowReadingChanged,
    required this.onShowRomanizationChanged,
    required this.onExit,
    required this.onComplete,
  });

  final PracticeExercise exercise;
  final FiveCardPractice practice;
  final String uiLanguageCode;
  final String learningLanguageCode;
  final String nativeLanguageCode;
  final Q14ReadingAidSessionState readingAidState;
  final ValueChanged<bool> onShowReadingChanged;
  final ValueChanged<bool> onShowRomanizationChanged;
  final Future<void> Function() onExit;
  final VoidCallback onComplete;

  @override
  State<_RealWorldPracticeDialoguePage> createState() =>
      _RealWorldPracticeDialoguePageState();
}

class _RealWorldPracticeDialoguePageState
    extends State<_RealWorldPracticeDialoguePage> {
  bool _showTranslation = true;
  int? _playingIndex;
  int _playGeneration = 0;
  bool _completed = false;

  Future<void> _play(int index, String speechText) async {
    final generation = ++_playGeneration;
    if (_playingIndex != null) await TtsService.instance.stop();
    setState(() => _playingIndex = index);
    try {
      await TtsService.instance.speak(
        text: speechText,
        languageCode: widget.learningLanguageCode,
      );
    } finally {
      if (mounted && generation == _playGeneration) {
        setState(() => _playingIndex = null);
      }
    }
  }

  Future<void> _exit() async {
    _playGeneration++;
    await TtsService.instance.stop();
    await widget.onExit();
  }

  @override
  void dispose() {
    _playGeneration++;
    unawaited(TtsService.instance.stop());
    super.dispose();
  }

  void _complete() {
    if (_completed) return;
    setState(() => _completed = true);
    widget.onComplete();
  }

  @override
  Widget build(BuildContext context) {
    final lines = widget.exercise.dialogueLines;
    final sceneDividers = widget.exercise.sceneDividers;
    final hasCompleteRomanization =
        lines.isNotEmpty && lines.every((line) => line.hasRomanization);
    final showRomanizationToggle =
        widget.readingAidState.romanizationToggleAllowed &&
        hasCompleteRomanization;
    return PopScope(
      canPop: false,
      onPopInvokedWithResult: (didPop, result) {
        if (!didPop) unawaited(_exit());
      },
      child: Scaffold(
        appBar: AppBar(
          leading: IconButton(
            icon: const Icon(Icons.arrow_back),
            onPressed: () => unawaited(_exit()),
          ),
          title: Text(
            L10n.text('exerciseTypeAiPractice', widget.uiLanguageCode),
          ),
        ),
        body: SafeArea(
          child: LayoutBuilder(
            builder: (context, constraints) {
              final padding = Responsive.pagePadding(context);
              return ListView(
                padding: EdgeInsets.fromLTRB(
                  padding.left,
                  padding.top,
                  padding.right,
                  16,
                ),
                children: [
                  Center(
                    child: ConstrainedBox(
                      constraints: BoxConstraints(
                        maxWidth: Responsive.maxContentWidth(context),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.stretch,
                        children: [
                          _Panel(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.stretch,
                              children: [
                                if (widget.exercise.scenarioTitle.isNotEmpty)
                                  Text(
                                    widget.exercise.scenarioTitle,
                                    style: Theme.of(context)
                                        .textTheme
                                        .titleMedium
                                        ?.copyWith(fontWeight: FontWeight.w900),
                                  ),
                                if (widget
                                    .exercise
                                    .scenarioDescription
                                    .isNotEmpty)
                                  Padding(
                                    padding: const EdgeInsets.only(top: 8),
                                    child: Text(
                                      widget.exercise.scenarioDescription,
                                      style: const TextStyle(height: 1.45),
                                    ),
                                  ),
                              ],
                            ),
                          ),
                          const SizedBox(height: 12),
                          _Panel(
                            child: Column(
                              children: [
                                _DialogueToggle(
                                  key: const ValueKey(
                                    'dialogue-reading-toggle',
                                  ),
                                  label: L10n.text(
                                    'dialogueReadingToggle',
                                    widget.uiLanguageCode,
                                  ),
                                  value: widget.readingAidState.showReading,
                                  onChanged: widget.onShowReadingChanged,
                                ),
                                if (showRomanizationToggle) ...[
                                  const SizedBox(height: 4),
                                  _DialogueToggle(
                                    key: const ValueKey(
                                      'dialogue-romanization-toggle',
                                    ),
                                    label: L10n.text(
                                      'dialogueRomanizationToggle',
                                      widget.uiLanguageCode,
                                    ),
                                    value:
                                        widget.readingAidState.showRomanization,
                                    onChanged: widget.onShowRomanizationChanged,
                                  ),
                                ],
                                const SizedBox(height: 4),
                                _DialogueToggle(
                                  key: const ValueKey(
                                    'dialogue-translation-toggle',
                                  ),
                                  label: L10n.text(
                                    'dialogueTranslationToggle',
                                    widget.uiLanguageCode,
                                  ),
                                  value: _showTranslation,
                                  onChanged: (value) =>
                                      setState(() => _showTranslation = value),
                                ),
                              ],
                            ),
                          ),
                          const SizedBox(height: 12),
                          for (var i = 0; i < lines.length; i++) ...[
                            Padding(
                              padding: const EdgeInsets.only(bottom: 10),
                              child: _RealWorldDialogueLineTile(
                                key: ValueKey('dialogue-line-$i'),
                                line: lines[i],
                                speakerName:
                                    widget.practice
                                        .characterById(lines[i].speakerId)
                                        ?.displayName ??
                                    lines[i].speakerId,
                                showReading: widget.readingAidState.showReading,
                                showRomanization:
                                    widget.readingAidState.showRomanization,
                                showTranslation: _showTranslation,
                                isPlaying: _playingIndex == i,
                                alignRight:
                                    lines[i].speakerId == lines.first.speakerId,
                                onPlay: () => _play(i, lines[i].speechText),
                                uiLanguageCode: widget.uiLanguageCode,
                              ),
                            ),
                            for (final divider in sceneDividers.where(
                              (divider) => divider.afterDialogueLine == i + 1,
                            ))
                              Padding(
                                padding: const EdgeInsets.only(bottom: 10),
                                child: _DialogueSceneDivider(
                                  divider: divider,
                                  showTranslation: _showTranslation,
                                ),
                              ),
                          ],
                          const SizedBox(height: 8),
                        ],
                      ),
                    ),
                  ),
                ],
              );
            },
          ),
        ),
        bottomNavigationBar: SafeArea(
          top: false,
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: AppButton(
              key: const ValueKey('dialogue-complete-button'),
              label: L10n.text('dialogueCompleteAction', widget.uiLanguageCode),
              icon: Icons.check_circle_outline,
              onPressed: _completed ? null : _complete,
            ),
          ),
        ),
      ),
    );
  }
}

class _DialogueToggle extends StatelessWidget {
  const _DialogueToggle({
    super.key,
    required this.label,
    required this.value,
    required this.onChanged,
  });
  final String label;
  final bool value;
  final ValueChanged<bool> onChanged;

  @override
  Widget build(BuildContext context) => Semantics(
    container: true,
    button: true,
    toggled: value,
    label: label,
    onTap: () => onChanged(!value),
    child: ExcludeSemantics(
      child: InkWell(
        onTap: () => onChanged(!value),
        borderRadius: BorderRadius.circular(12),
        child: Padding(
          padding: const EdgeInsets.symmetric(vertical: 4),
          child: Row(
            children: [
              Expanded(
                child: Text(
                  label,
                  style: const TextStyle(fontWeight: FontWeight.w700),
                ),
              ),
              Switch(value: value, onChanged: onChanged),
            ],
          ),
        ),
      ),
    ),
  );
}

class _RealWorldDialogueLineTile extends StatelessWidget {
  const _RealWorldDialogueLineTile({
    super.key,
    required this.line,
    required this.speakerName,
    required this.showReading,
    required this.showRomanization,
    required this.showTranslation,
    required this.isPlaying,
    required this.alignRight,
    required this.onPlay,
    required this.uiLanguageCode,
  });

  final PracticeDialogueLine line;
  final String speakerName;
  final bool showReading;
  final bool showRomanization;
  final bool showTranslation;
  final bool isPlaying;
  final bool alignRight;
  final VoidCallback onPlay;
  final String uiLanguageCode;

  @override
  Widget build(BuildContext context) => Align(
    alignment: alignRight ? Alignment.centerRight : Alignment.centerLeft,
    child: ConstrainedBox(
      constraints: const BoxConstraints(maxWidth: 460),
      child: DecoratedBox(
        key: ValueKey('dialogue-message-bubble-${line.speakerId}'),
        decoration: BoxDecoration(
          color: alignRight
              ? AppTheme.dialogueBubbleSpeakerA
              : AppTheme.dialogueBubbleSpeakerB,
          borderRadius: BorderRadius.only(
            topLeft: const Radius.circular(18),
            topRight: const Radius.circular(18),
            bottomLeft: Radius.circular(alignRight ? 18 : 4),
            bottomRight: Radius.circular(alignRight ? 4 : 18),
          ),
          border: Border.all(
            color: alignRight
                ? AppTheme.dialogueBubbleSpeakerABorder
                : AppTheme.dialogueBubbleSpeakerBBorder,
          ),
        ),
        child: Padding(
          padding: const EdgeInsets.all(14),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      speakerName,
                      locale: AppTheme.japaneseLocale,
                      style: AppTheme.japaneseTextStyle.copyWith(
                        color: AppTheme.contentAccentForeground,
                        fontWeight: FontWeight.w800,
                        fontSize: 12,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      line.targetText,
                      key: const ValueKey('dialogue-line-target-text'),
                      locale: AppTheme.japaneseLocale,
                      style: AppTheme.japaneseTextStyle.copyWith(
                        fontWeight: FontWeight.w800,
                      ),
                    ),
                    if (showReading && line.hasReading)
                      Padding(
                        padding: const EdgeInsets.only(top: 3),
                        child: Text(
                          line.reading,
                          key: const ValueKey('dialogue-line-reading'),
                          locale: AppTheme.japaneseLocale,
                          style: AppTheme.japaneseTextStyle.copyWith(
                            color: AppTheme.contentAccentForeground,
                            fontSize: 12,
                          ),
                        ),
                      ),
                    if (showRomanization && line.hasRomanization)
                      Padding(
                        padding: const EdgeInsets.only(top: 3),
                        child: Text(
                          line.romanization!,
                          key: const ValueKey('dialogue-line-romanization'),
                          style: const TextStyle(
                            color: AppTheme.contentAccentForeground,
                            fontSize: 12,
                            fontStyle: FontStyle.italic,
                          ),
                        ),
                      ),
                    if (showTranslation && line.translation.isNotEmpty)
                      Padding(
                        padding: const EdgeInsets.only(top: 4),
                        child: Text(
                          line.translation,
                          key: const ValueKey('dialogue-line-translation'),
                          style: const TextStyle(
                            color: AppTheme.contentSecondaryForeground,
                          ),
                        ),
                      ),
                  ],
                ),
              ),
              const SizedBox(width: 8),
              IconButton.filledTonal(
                key: const ValueKey('dialogue-line-audio-button'),
                tooltip: L10n.text('listenTooltip', uiLanguageCode),
                onPressed: isPlaying ? null : onPlay,
                icon: Icon(isPlaying ? Icons.graphic_eq : Icons.volume_up),
              ),
            ],
          ),
        ),
      ),
    ),
  );
}

class _DialogueSceneDivider extends StatelessWidget {
  const _DialogueSceneDivider({
    required this.divider,
    required this.showTranslation,
  });

  final PracticeSceneDivider divider;
  final bool showTranslation;

  @override
  Widget build(BuildContext context) => Center(
    child: DecoratedBox(
      key: ValueKey('dialogue-scene-divider-${divider.afterDialogueLine}'),
      decoration: BoxDecoration(
        color: AppTheme.lessonSurfaceElevated,
        borderRadius: BorderRadius.circular(999),
        border: Border.all(color: AppTheme.lessonBorderSubtle),
      ),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 7),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              divider.targetText,
              locale: AppTheme.japaneseLocale,
              style: AppTheme.japaneseTextStyle.copyWith(
                color: AppTheme.contentAccentForeground,
                fontWeight: FontWeight.w800,
              ),
            ),
            if (showTranslation && divider.translation.isNotEmpty)
              Padding(
                padding: const EdgeInsets.only(top: 2),
                child: Text(
                  divider.translation,
                  key: const ValueKey('dialogue-scene-divider-translation'),
                  style: const TextStyle(
                    color: AppTheme.contentSecondaryForeground,
                    fontSize: 12,
                  ),
                ),
              ),
          ],
        ),
      ),
    ),
  );
}

class _FreeCheckpoint extends StatelessWidget {
  const _FreeCheckpoint({
    required this.uiLanguageCode,
    required this.onContinue,
    required this.onFinish,
    required this.plus,
    required this.onPlus,
  });
  final String uiLanguageCode;
  final VoidCallback onContinue;
  final VoidCallback onFinish;
  final bool plus;
  final VoidCallback onPlus;
  @override
  Widget build(BuildContext context) => Scaffold(
    body: SafeArea(
      child: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text(
              '✓ ${L10n.text('basicPracticeCompleted', uiLanguageCode)}',
              style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 20),
            ),
            const SizedBox(height: 16),
            AppButton(
              label: L10n.text(
                plus ? 'continuePlusPractice' : 'completeLesson',
                uiLanguageCode,
              ),
              onPressed: plus ? onPlus : onFinish,
            ),
            if (!plus) ...[
              const SizedBox(height: 10),
              Text(
                '${L10n.text('plusTeaserHeading', uiLanguageCode)}\n'
                '${L10n.text('plusTeaserDescription', uiLanguageCode)}',
              ),
            ],
          ],
        ),
      ),
    ),
  );
}

class _Feedback extends StatelessWidget {
  const _Feedback({
    required this.exercise,
    required this.correct,
    required this.aiGrade,
    required this.incorrectSlotIds,
    required this.uiLanguageCode,
  });
  final PracticeExercise exercise;
  final bool correct;
  final AiExerciseGrade? aiGrade;
  final Set<String> incorrectSlotIds;
  final String uiLanguageCode;

  @override
  Widget build(BuildContext context) {
    final feedback = exercise.feedback;
    if (correct) {
      return Padding(
        padding: const EdgeInsets.only(top: 16),
        child: DecoratedBox(
          decoration: const BoxDecoration(
            color: Color(0x1F40E0D0),
            borderRadius: BorderRadius.all(Radius.circular(14)),
            border: Border.fromBorderSide(BorderSide(color: Color(0x805EEAD4))),
          ),
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Text(
              [
                '✓ ${L10n.text('correctStatus', uiLanguageCode)}',
                if (feedback.correctMessage.isNotEmpty) feedback.correctMessage,
              ].join('\n\n'),
              style: const TextStyle(fontWeight: FontWeight.w700),
            ),
          ),
        ),
      );
    }
    return Padding(
      padding: const EdgeInsets.only(top: 16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            '✕ ${L10n.text('incorrectStatus', uiLanguageCode)}',
            style: const TextStyle(
              color: Colors.redAccent,
              fontWeight: FontWeight.w900,
            ),
          ),
          const SizedBox(height: 10),
          if (exercise.type == 'chat_text_fill')
            for (final slot in exercise.slots)
              if (incorrectSlotIds.contains(slot.id))
                _ChatSlotFeedback(
                  slot: slot,
                  raw: exercise.raw,
                  uiLanguageCode: uiLanguageCode,
                ),
          if (exercise.type != 'chat_text_fill' &&
              feedback.correctAnswer.isNotEmpty)
            _FeedbackSubCard(
              title: L10n.text('exerciseCorrectAnswer', uiLanguageCode),
              text: feedback.correctAnswer,
            ),
          const SizedBox(height: 10),
          if (exercise.type != 'chat_text_fill')
            _FeedbackSubCard(
              title: '💡 ${L10n.text('exerciseExplanation', uiLanguageCode)}',
              text: aiGrade?.shortExplanation.isNotEmpty == true
                  ? aiGrade!.shortExplanation
                  : aiGrade != null
                  ? aiGrade!.missingPartIndexes
                        .map((index) => exercise.aiCriteria[index])
                        .join('\n')
                  : feedback.explanation,
            ),
          if (aiGrade?.correctedExample.isNotEmpty == true)
            Padding(
              padding: const EdgeInsets.only(top: 10),
              child: Text(
                '${L10n.text('exerciseExampleAnswer', uiLanguageCode)}:\n${aiGrade!.correctedExample}',
              ),
            ),
        ],
      ),
    );
  }
}

class _FeedbackSubCard extends StatelessWidget {
  const _FeedbackSubCard({required this.title, required this.text});
  final String title;
  final String text;
  @override
  Widget build(BuildContext context) => Padding(
    padding: const EdgeInsets.only(bottom: 10),
    child: _Panel(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(title, style: const TextStyle(fontWeight: FontWeight.w900)),
          const SizedBox(height: 6),
          Text(text, style: const TextStyle(height: 1.4)),
        ],
      ),
    ),
  );
}

class _ChatSlotFeedback extends StatelessWidget {
  const _ChatSlotFeedback({
    required this.slot,
    required this.raw,
    required this.uiLanguageCode,
  });
  final PracticeSlot slot;
  final Map<String, dynamic> raw;
  final String uiLanguageCode;
  @override
  Widget build(BuildContext context) {
    final feedback =
        ((raw['feedback'] as Map?)?['slotFeedback'] as Map?)?[slot.id]
            as Map? ??
        const {};
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Text(
          feedback['incorrectMessage']?.toString() ?? '',
          style: const TextStyle(height: 1.4),
        ),
        const SizedBox(height: 10),
        _FeedbackSubCard(
          title: L10n.text('exerciseCorrectAnswer', uiLanguageCode),
          text: feedback['correctAnswer']?.toString() ?? slot.displayText,
        ),
        _FeedbackSubCard(
          title: '💡 ${L10n.text('exerciseExplanation', uiLanguageCode)}',
          text: feedback['explanation']?.toString() ?? '',
        ),
      ],
    );
  }
}

class _ExerciseTypeLabel extends StatelessWidget {
  const _ExerciseTypeLabel({required this.type, required this.languageCode});
  final String type;
  final String languageCode;
  @override
  Widget build(BuildContext context) {
    const keys = {
      'multiple_choice': 'exerciseTypeChoice',
      'matching': 'exerciseTypeMatching',
      'sentence_ordering': 'exerciseTypeOrdering',
      'slot_ordering': 'exerciseTypeOrdering',
      'dialogue_fill': 'exerciseTypeDialogueFill',
      'chat_text_fill': 'exerciseTypeChatFill',
      'listening_multiple_choice': 'exerciseTypeListening',
      'checkpoint': 'exerciseTypeCheckpoint',
      'controlled_ai_text': 'exerciseTypeAiPractice',
      'real_world_practice_dialogue': 'exerciseTypeAiPractice',
    };
    return Align(
      alignment: Alignment.centerLeft,
      child: DecoratedBox(
        decoration: BoxDecoration(
          color: const Color(0x2638BDF8),
          borderRadius: BorderRadius.circular(99),
        ),
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
          child: Text(
            L10n.text(keys[type] ?? type, languageCode),
            style: const TextStyle(
              color: Color(0xFF7DD3FC),
              fontWeight: FontWeight.w800,
            ),
          ),
        ),
      ),
    );
  }
}

class _TokenAnswerSlot extends StatelessWidget {
  const _TokenAnswerSlot({
    required this.label,
    required this.afterText,
    required this.enabled,
    required this.visualState,
    required this.onTap,
  });
  final String label;
  final String afterText;
  final bool enabled;
  final ExerciseOptionVisualState visualState;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) => Wrap(
    crossAxisAlignment: WrapCrossAlignment.center,
    spacing: 2,
    children: [
      OutlinedButton(
        onPressed: enabled ? onTap : null,
        style: ButtonStyle(
          backgroundColor: ExerciseOptionStyle.background(visualState),
          foregroundColor: ExerciseOptionStyle.foreground(visualState),
          side: ExerciseOptionStyle.side(visualState),
          minimumSize: const WidgetStatePropertyAll(Size(54, 42)),
          padding: const WidgetStatePropertyAll(
            EdgeInsets.symmetric(horizontal: 10, vertical: 8),
          ),
        ),
        child: Text(label, style: const TextStyle(fontWeight: FontWeight.w700)),
      ),
      if (afterText.isNotEmpty)
        Text(afterText, style: const TextStyle(fontSize: 18)),
    ],
  );
}

class _Panel extends StatelessWidget {
  const _Panel({required this.child});
  final Widget child;
  @override
  Widget build(BuildContext context) => DecoratedBox(
    decoration: BoxDecoration(
      color: AppTheme.lessonSurface,
      border: Border.all(color: AppTheme.lessonBorderSubtle),
      borderRadius: BorderRadius.circular(12),
    ),
    child: Padding(padding: const EdgeInsets.all(16), child: child),
  );
}

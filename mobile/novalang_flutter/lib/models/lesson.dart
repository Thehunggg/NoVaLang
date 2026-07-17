import 'exercise.dart';
import '../core/utils/native_content.dart';

enum LessonTemplate {
  kanaLesson,
  vocabularyLesson,
  grammarLesson,
  readingLesson,
  listeningLesson,
  miniTestLesson,
}

/// Slim vocab card model for lesson intro UI (avoids circular imports).
class LessonVocabCard {
  const LessonVocabCard({
    required this.displayText,
    required this.speechText,
    required this.meaning,
    this.reading,
    this.romanization,
    this.exampleText,
    this.exampleReading,
    this.exampleRomanization,
    this.exampleSpeechText,
    this.exampleTranslation,
  });

  final String displayText;
  final String speechText;
  final String meaning;
  final String? reading;
  final String? romanization;
  final String? exampleText;
  final String? exampleReading;
  final String? exampleRomanization;
  final String? exampleSpeechText;
  final String? exampleTranslation;
}

class LessonDialogueLine {
  const LessonDialogueLine({
    required this.speaker,
    required this.text,
    required this.speechText,
    required this.translation,
    this.reading,
  });
  final String speaker;
  final String text;
  final String? reading;
  final String speechText;
  final String translation;
}

class LessonDialogueGroup {
  const LessonDialogueGroup({
    required this.title,
    required this.situation,
    required this.lines,
  });

  final String title;
  final String situation;
  final List<LessonDialogueLine> lines;
}

class Lesson {
  const Lesson({
    required this.id,
    required this.title,
    this.titleVi,
    this.titleByNative = const {},
    required this.track,
    required this.level,
    required this.template,
    required this.description,
    this.descriptionVi,
    this.descriptionByNative = const {},
    required this.exercises,
    this.introPoints = const [],
    this.introPointsVi = const [],
    this.introPointsByNative = const {},
    this.vocabulary = const [],
    this.estimatedMinutes = 5,
    this.comingSoon = false,
    this.playable = true,
    this.contentStatus = 'ready',
    this.situationByNative = const {},
    this.goalByNative = const {},
    this.learnSectionKeys = const [],
    this.practiceStageLabels = const [],
    this.moduleId,
    this.moduleTitleByNative = const {},
    this.dialogue = const [],
    this.dialogueGroups = const [],
    this.grammarFocus,
    this.grammarReading,
    this.grammarExplanation,
    this.cultureNote,
    this.contextualVariations = const [],
    this.communicationStrategy,
    this.lessonFormat,
    this.fiveCardContent,
  });

  final String id;
  final String title;
  final String? titleVi;
  final Map<String, String> titleByNative;
  final String track;
  final String level;
  final LessonTemplate template;
  final String description;
  final String? descriptionVi;
  final Map<String, String> descriptionByNative;
  final List<Exercise> exercises;
  final List<String> introPoints;
  final List<String> introPointsVi;
  final Map<String, List<String>> introPointsByNative;
  final List<LessonVocabCard> vocabulary;
  final int estimatedMinutes;
  final bool comingSoon;
  final bool playable;
  final String contentStatus;
  final Map<String, String> situationByNative;
  final Map<String, String> goalByNative;
  final List<String> learnSectionKeys;
  final List<Map<String, String>> practiceStageLabels;
  final String? moduleId;
  final Map<String, String> moduleTitleByNative;
  final List<LessonDialogueLine> dialogue;
  final List<LessonDialogueGroup> dialogueGroups;
  final String? grammarFocus;
  final String? grammarReading;
  final String? grammarExplanation;
  final String? cultureNote;
  final List<LessonVocabCard> contextualVariations;
  final String? communicationStrategy;
  final String? lessonFormat;
  final Map<String, dynamic>? fiveCardContent;

  bool get usesFiveCardLayout =>
      lessonFormat == 'five_cards' && isValidFiveCardContent;

  Map<String, dynamic> localizedFiveCardContent(String nativeLanguageCode) =>
      resolveNativeContentMap(
        fiveCardContent ?? const <String, dynamic>{},
        nativeLanguageCode,
        path: 'lesson.$id.fiveCardContent',
      );

  /// Structural check for Format 2.0 opt-in content (does not invent data).
  bool get isValidFiveCardContent {
    final content = fiveCardContent;
    if (content == null) return false;
    final intro = content['intro'];
    final vocabularyDetails = content['vocabularyDetails'];
    final dialogueGroups = content['dialogueGroups'];
    final grammarPatterns = content['grammarPatterns'];
    if (intro is! Map) return false;
    if (vocabularyDetails is! List || vocabularyDetails.isEmpty) return false;
    if (dialogueGroups is! List || dialogueGroups.isEmpty) return false;
    if (grammarPatterns is! List || grammarPatterns.isEmpty) return false;
    return true;
  }

  bool get isBlueprint =>
      contentStatus == 'blueprint' || playable == false || comingSoon;

  String localizedTitle(String languageCode) => strictNativeText(
    titleByNative,
    languageCode,
    path: 'lesson.$id.title',
    legacy: languageCode == 'vi' && titleVi != null ? titleVi! : title,
  );
  String localizedDescription(String languageCode) => strictNativeText(
    goalByNative.isNotEmpty ? goalByNative : descriptionByNative,
    languageCode,
    path: 'lesson.$id.description',
    legacy: languageCode == 'vi' && descriptionVi != null
        ? descriptionVi!
        : description,
  );
  String localizedSituation(String languageCode) => strictNativeText(
    situationByNative,
    languageCode,
    path: 'lesson.$id.situation',
  );
  List<String> localizedIntroPoints(String languageCode) =>
      strictNativeTextList(
        introPointsByNative,
        languageCode,
        path: 'lesson.$id.introPoints',
        legacy: languageCode == 'vi' && introPointsVi.isNotEmpty
            ? introPointsVi
            : introPoints,
      );
}

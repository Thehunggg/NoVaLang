import '../models/exercise.dart';
import '../models/lesson.dart';

class ExamTrackInfo {
  const ExamTrackInfo({
    required this.title,
    required this.levelCode,
    this.comingSoon = false,
  });

  final String title;
  final String levelCode;
  final bool comingSoon;
}

const japaneseExamTracks = <ExamTrackInfo>[
  ExamTrackInfo(title: 'Kana Starter', levelCode: 'KANA_STARTER'),
  ExamTrackInfo(title: 'JLPT N5', levelCode: 'JLPT_N5'),
  ExamTrackInfo(title: 'JLPT N4', levelCode: 'JLPT_N4', comingSoon: true),
  ExamTrackInfo(title: 'JLPT N3', levelCode: 'JLPT_N3', comingSoon: true),
  ExamTrackInfo(title: 'JLPT N2', levelCode: 'JLPT_N2', comingSoon: true),
  ExamTrackInfo(title: 'JLPT N1', levelCode: 'JLPT_N1', comingSoon: true),
];

const japaneseLessons = <Lesson>[
  Lesson(
    id: 'kana-aio',
    title: 'Kana Starter: あいうえお',
    track: 'JLPT',
    level: 'KANA_STARTER',
    template: LessonTemplate.kanaLesson,
    description:
        'Learn hiragana as characters and sounds before attaching vocabulary meanings.',
    exercises: [
      Exercise(
        id: 'kana-a-reading',
        type: ExerciseType.chooseReading,
        prompt: 'あ is read as:',
        displayText: 'あ',
        speechText: 'あ',
        options: ['a', 'i', 'u', 'e'],
        correctAnswer: 'a',
        acceptedAnswers: ['a'],
        acceptedAnswersVi: ['a'],
      ),
      Exercise(
        id: 'kana-a-start',
        type: ExerciseType.chooseMeaning,
        prompt: 'Từ nào bắt đầu bằng あ?',
        options: ['雨（あめ）', 'いぬ', 'うみ', 'えき'],
        optionsVi: ['雨（あめ）', 'いぬ', 'うみ', 'えき'],
        correctAnswer: '雨（あめ）',
        acceptedAnswers: ['雨（あめ）'],
        acceptedAnswersVi: ['雨（あめ）'],
      ),
      Exercise(
        id: 'kana-match',
        type: ExerciseType.matchPairs,
        prompt: 'Match kana with readings.',
        pairs: [
          MatchPair(left: 'あ', right: 'a'),
          MatchPair(left: 'い', right: 'i'),
          MatchPair(left: 'う', right: 'u'),
          MatchPair(left: 'え', right: 'e'),
        ],
        pairsVi: [
          MatchPair(left: 'あ', right: 'a'),
          MatchPair(left: 'い', right: 'i'),
          MatchPair(left: 'う', right: 'u'),
          MatchPair(left: 'え', right: 'e'),
        ],
      ),
    ],
  ),
  Lesson(
    id: 'n5-vocab-homophones',
    title: 'JLPT N5 Vocabulary: clear homophones',
    track: 'JLPT',
    level: 'JLPT_N5',
    template: LessonTemplate.vocabularyLesson,
    description:
        'Practice separate kanji + reading display for beginner homophones.',
    exercises: [
      Exercise(
        id: 'ame-meaning',
        type: ExerciseType.chooseMeaning,
        prompt: '雨（あめ） means:',
        displayText: '雨（あめ）',
        speechText: 'あめ',
        options: ['rain', 'candy', 'dog', 'station'],
        optionsVi: ['mưa', 'kẹo', 'chó', 'nhà ga'],
        correctAnswer: 'rain',
        acceptedAnswers: ['rain'],
        acceptedAnswersVi: ['mưa', 'mua'],
      ),
      Exercise(
        id: 'hashi-type',
        type: ExerciseType.typeAnswer,
        prompt: '橋（はし） nghĩa là gì?',
        displayText: '橋（はし）',
        speechText: 'はし',
        acceptedAnswers: ['bridge'],
        acceptedAnswersVi: ['cây cầu', 'cầu', 'cay cau', 'cau'],
      ),
      Exercise(
        id: 'vocab-match',
        type: ExerciseType.matchPairs,
        prompt: 'Match each word with its meaning.',
        pairs: [
          MatchPair(left: '雨（あめ）', right: 'rain'),
          MatchPair(left: '飴（あめ）', right: 'candy'),
          MatchPair(left: 'いぬ', right: 'dog'),
          MatchPair(left: 'えき', right: 'station'),
        ],
        pairsVi: [
          MatchPair(left: '雨（あめ）', right: 'mưa'),
          MatchPair(left: '飴（あめ）', right: 'kẹo'),
          MatchPair(left: 'いぬ', right: 'chó'),
          MatchPair(left: 'えき', right: 'nhà ga'),
        ],
      ),
    ],
  ),
  Lesson(
    id: 'n5-grammar',
    title: 'JLPT N5 Grammar',
    track: 'JLPT',
    level: 'JLPT_N5',
    template: LessonTemplate.grammarLesson,
    description: 'A は B です and core N5 sentence patterns.',
    exercises: [],
  ),
  Lesson(
    id: 'n5-reading',
    title: 'JLPT N5 Reading',
    track: 'JLPT',
    level: 'JLPT_N5',
    template: LessonTemplate.readingLesson,
    description: 'Short sentence and notice reading.',
    exercises: [],
  ),
  Lesson(
    id: 'n5-listening',
    title: 'JLPT N5 Listening',
    track: 'JLPT',
    level: 'JLPT_N5',
    template: LessonTemplate.listeningLesson,
    description: 'TTS-backed short listening practice.',
    exercises: [],
  ),
  Lesson(
    id: 'n5-mini-test',
    title: 'JLPT N5 Mini Test',
    track: 'JLPT',
    level: 'JLPT_N5',
    template: LessonTemplate.miniTestLesson,
    description: 'Small reviewed sample test.',
    exercises: [],
  ),
  Lesson(
    id: 'n4-roadmap',
    title: 'JLPT N4',
    track: 'JLPT',
    level: 'JLPT_N4',
    template: LessonTemplate.miniTestLesson,
    description: 'Coming soon.',
    exercises: [],
    comingSoon: true,
  ),
];

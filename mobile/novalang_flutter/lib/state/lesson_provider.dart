import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../data/japanese_jlpt_seed.dart';
import '../models/lesson.dart';

final lessonProvider = Provider<List<Lesson>>((ref) => japaneseLessons);
final examTrackProvider = Provider((ref) => japaneseExamTracks);

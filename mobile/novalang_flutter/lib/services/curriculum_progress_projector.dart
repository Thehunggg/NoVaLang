import '../models/canonical_event.dart';
import '../models/curriculum_progress_projection.dart';
import '../repositories/curriculum_progress_repository.dart';
import 'canonical_event_dispatcher.dart';

/// Core 1's subscriber that projects `lesson_completion_recorded` canonical
/// events into a local curriculum-progress read model.
///
/// This projector never updates usage, mastery, XP, or curriculum source
/// data, and never mutates the Core 2 completion record that sourced the
/// event.
class CurriculumProgressProjector implements CanonicalEventSubscriber {
  CurriculumProgressProjector({required this.repository});

  final CurriculumProgressRepository repository;

  @override
  String get subscriberId => 'core1.curriculum_progress_projector';

  @override
  Future<void> handle(CanonicalEvent event) async {
    if (event.eventType != CanonicalEventType.lessonCompletionRecorded) {
      // Stage 1 defines exactly one canonical event type, so this branch is
      // unreachable today. It exists so a future event type is silently
      // ignored here rather than misinterpreted as a lesson completion.
      return;
    }
    final existing = await repository.findProjection(
      userId: event.userId,
      userTrackId: event.userTrackId,
      lessonId: event.lessonId,
    );
    if (existing != null) {
      return;
    }
    final projection = CurriculumProgressProjection(
      userId: event.userId,
      userTrackId: event.userTrackId,
      lessonId: event.lessonId,
      isCompleted: true,
      firstCompletedAt: event.occurredAt,
      sourceCompletionId: event.sourceRecordId,
      lastProcessedEventId: event.eventId,
    );
    try {
      await repository.save(projection);
    } on CurriculumProgressUniquenessException {
      // Lost a race to another dispatch of the same event; the existing
      // projection already reflects this completion.
    }
  }
}

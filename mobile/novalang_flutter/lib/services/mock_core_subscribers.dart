import '../models/canonical_event.dart';
import '../models/mock_subscriber_evidence.dart';
import '../repositories/mock_subscriber_evidence_repository.dart';
import 'canonical_event_dispatcher.dart';

abstract interface class MockEvidenceIdGenerator {
  String nextId();
}

const CanonicalEventClock _defaultClock = SystemCanonicalEventClock();

/// Provisional, mock-only subscriber verifying the Core 5 (Progress, Mastery
/// & Personalization) integration contract. It records receipt evidence
/// only; it does not implement mastery, review scheduling, or
/// personalization, and it must never be treated as the source of truth for
/// any of those.
class MockCore5Subscriber implements CanonicalEventSubscriber {
  MockCore5Subscriber({
    required this.repository,
    required this.ids,
    this.clock = _defaultClock,
  });

  static const subscriberType = 'core5_mock_provisional';

  final SharedPreferencesMockCore5EvidenceRepository repository;
  final MockEvidenceIdGenerator ids;
  final CanonicalEventClock clock;

  @override
  String get subscriberId => subscriberType;

  @override
  Future<void> handle(CanonicalEvent event) async {
    final existing = await repository.findByEventId(event.eventId);
    if (existing != null) {
      return;
    }
    final evidence = MockSubscriberEvidence(
      evidenceId: ids.nextId(),
      subscriberType: subscriberType,
      eventId: event.eventId,
      sourceRecordId: event.sourceRecordId,
      userId: event.userId,
      userTrackId: event.userTrackId,
      lessonId: event.lessonId,
      receivedAt: clock.now(),
    );
    try {
      await repository.save(evidence);
    } on MockSubscriberEvidenceUniquenessException {
      // Lost a race to another dispatch of the same event; evidence already
      // exists for this eventId.
    }
  }
}

/// Provisional, mock-only subscriber verifying the Core 6 (Gamification,
/// Rewards & Identity) integration contract. It records receipt evidence
/// only; it does not implement XP, quests, achievements, or rewards, and it
/// must never be treated as the source of truth for any of those.
class MockCore6Subscriber implements CanonicalEventSubscriber {
  MockCore6Subscriber({
    required this.repository,
    required this.ids,
    this.clock = _defaultClock,
  });

  static const subscriberType = 'core6_mock_provisional';

  final SharedPreferencesMockCore6EvidenceRepository repository;
  final MockEvidenceIdGenerator ids;
  final CanonicalEventClock clock;

  @override
  String get subscriberId => subscriberType;

  @override
  Future<void> handle(CanonicalEvent event) async {
    final existing = await repository.findByEventId(event.eventId);
    if (existing != null) {
      return;
    }
    final evidence = MockSubscriberEvidence(
      evidenceId: ids.nextId(),
      subscriberType: subscriberType,
      eventId: event.eventId,
      sourceRecordId: event.sourceRecordId,
      userId: event.userId,
      userTrackId: event.userTrackId,
      lessonId: event.lessonId,
      receivedAt: clock.now(),
    );
    try {
      await repository.save(evidence);
    } on MockSubscriberEvidenceUniquenessException {
      // Lost a race to another dispatch of the same event; evidence already
      // exists for this eventId.
    }
  }
}

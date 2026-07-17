import '../models/canonical_event.dart';
import '../repositories/canonical_event_repository.dart';

abstract interface class CanonicalEventClock {
  DateTime now();
}

class SystemCanonicalEventClock implements CanonicalEventClock {
  const SystemCanonicalEventClock();

  @override
  DateTime now() => DateTime.now().toUtc();
}

abstract interface class CanonicalEventIdGenerator {
  String nextId();
}

abstract interface class CanonicalEventSubscriber {
  String get subscriberId;
  Future<void> handle(CanonicalEvent event);
}

class SubscriberDispatchOutcome {
  const SubscriberDispatchOutcome({
    required this.subscriberId,
    required this.succeeded,
    this.error,
  });

  final String subscriberId;
  final bool succeeded;
  final Object? error;
}

class EventDispatchOutcome {
  const EventDispatchOutcome({
    required this.event,
    required this.subscriberOutcomes,
  });

  final CanonicalEvent event;
  final List<SubscriberDispatchOutcome> subscriberOutcomes;

  bool get allSucceeded => subscriberOutcomes.every((o) => o.succeeded);

  List<String> get failedSubscriberIds => subscriberOutcomes
      .where((o) => !o.succeeded)
      .map((o) => o.subscriberId)
      .toList(growable: false);
}

abstract interface class CanonicalEventDispatcher {
  void subscribe(CanonicalEventSubscriber subscriber);
  Future<CanonicalEventAppendResult> append(CanonicalEventAppendRequest request);
  Future<EventDispatchOutcome> dispatch(CanonicalEvent event);
  Future<EventDispatchOutcome> appendAndDispatch(
    CanonicalEventAppendRequest request,
  );
}

class LocalCanonicalEventDispatcher implements CanonicalEventDispatcher {
  LocalCanonicalEventDispatcher({
    required this.events,
    required this.clock,
    required this.ids,
  });

  final CanonicalEventRepository events;
  final CanonicalEventClock clock;
  final CanonicalEventIdGenerator ids;
  final List<CanonicalEventSubscriber> _subscribers = [];
  Future<void> _tail = Future.value();

  @override
  void subscribe(CanonicalEventSubscriber subscriber) {
    _subscribers.add(subscriber);
  }

  @override
  Future<CanonicalEventAppendResult> append(
    CanonicalEventAppendRequest request,
  ) {
    request.validate();
    final next = _tail.then((_) => _append(request));
    _tail = next.then<void>((_) {}, onError: (_, _) {});
    return next;
  }

  Future<CanonicalEventAppendResult> _append(
    CanonicalEventAppendRequest request,
  ) async {
    final byKey = await events.findByIdempotencyKey(request.idempotencyKey);
    if (byKey != null) {
      return CanonicalEventAppendResult.appended(byKey);
    }

    final bySource = await events.findBySourceRecordId(request.sourceRecordId);
    if (bySource != null) {
      return CanonicalEventAppendResult.alreadyAppended(bySource.eventId);
    }

    final event = CanonicalEvent.create(
      eventId: ids.nextId(),
      eventType: request.eventType,
      sourceRecordId: request.sourceRecordId,
      sourceRecordType: request.sourceRecordType,
      userId: request.userId,
      userTrackId: request.userTrackId,
      lessonId: request.lessonId,
      occurredAt: clock.now(),
      idempotencyKey: request.idempotencyKey,
      payload: request.payload,
    );
    try {
      await events.save(event);
      return CanonicalEventAppendResult.appended(event);
    } on CanonicalEventUniquenessException catch (conflict) {
      return _resolveUniquenessRace(request, conflict);
    }
  }

  Future<CanonicalEventAppendResult> _resolveUniquenessRace(
    CanonicalEventAppendRequest request,
    CanonicalEventUniquenessException originalConflict,
  ) async {
    final byKey = await events.findByIdempotencyKey(request.idempotencyKey);
    if (byKey != null) {
      return CanonicalEventAppendResult.appended(byKey);
    }
    final bySource = await events.findBySourceRecordId(request.sourceRecordId);
    if (bySource != null) {
      return CanonicalEventAppendResult.alreadyAppended(bySource.eventId);
    }
    throw originalConflict;
  }

  @override
  Future<EventDispatchOutcome> dispatch(CanonicalEvent event) async {
    final outcomes = <SubscriberDispatchOutcome>[];
    for (final subscriber in _subscribers) {
      try {
        await subscriber.handle(event);
        outcomes.add(
          SubscriberDispatchOutcome(
            subscriberId: subscriber.subscriberId,
            succeeded: true,
          ),
        );
      } catch (error) {
        outcomes.add(
          SubscriberDispatchOutcome(
            subscriberId: subscriber.subscriberId,
            succeeded: false,
            error: error,
          ),
        );
      }
    }
    return EventDispatchOutcome(event: event, subscriberOutcomes: outcomes);
  }

  @override
  Future<EventDispatchOutcome> appendAndDispatch(
    CanonicalEventAppendRequest request,
  ) async {
    final result = await append(request);
    final event = result.event ?? await events.findById(result.existingEventId!);
    if (event == null) {
      throw StateError(
        'Canonical event ${result.existingEventId} missing from the event store after append',
      );
    }
    return dispatch(event);
  }
}

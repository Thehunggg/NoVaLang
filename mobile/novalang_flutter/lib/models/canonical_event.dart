enum CanonicalEventType { lessonCompletionRecorded }

extension CanonicalEventTypeWire on CanonicalEventType {
  String get wire => switch (this) {
    CanonicalEventType.lessonCompletionRecorded => 'lesson_completion_recorded',
  };

  static CanonicalEventType fromWire(String value) => switch (value) {
    'lesson_completion_recorded' => CanonicalEventType.lessonCompletionRecorded,
    _ => throw FormatException('Unknown canonical event type: $value'),
  };
}

enum CanonicalEventAppendStatus { appended, alreadyAppended }

extension CanonicalEventAppendStatusWire on CanonicalEventAppendStatus {
  String get wire => switch (this) {
    CanonicalEventAppendStatus.appended => 'appended',
    CanonicalEventAppendStatus.alreadyAppended => 'already_appended',
  };

  static CanonicalEventAppendStatus fromWire(String value) => switch (value) {
    'appended' => CanonicalEventAppendStatus.appended,
    'already_appended' => CanonicalEventAppendStatus.alreadyAppended,
    _ => throw FormatException('Unknown canonical event append status: $value'),
  };
}

const canonicalEventContractVersion = '1.0';

/// Stage 1 canonical events reference a lesson_completion record only.
const canonicalEventSourceRecordTypeLessonCompletion = 'lesson_completion';

String _requiredText(Object? value, String field) {
  if (value is! String || value.trim().isEmpty) {
    throw FormatException('$field must be a non-empty string');
  }
  return value;
}

void _validateVersion(String version) {
  if (version != canonicalEventContractVersion) {
    throw FormatException(
      'contractVersion must equal $canonicalEventContractVersion',
    );
  }
}

void _validateSourceRecordType(String value) {
  if (value != canonicalEventSourceRecordTypeLessonCompletion) {
    throw FormatException(
      'sourceRecordType must equal $canonicalEventSourceRecordTypeLessonCompletion',
    );
  }
}

DateTime _requiredTime(Map<String, dynamic> json, String field) {
  final value = _requiredText(json[field], field);
  if (!RegExp(r'^\d{4}-\d{2}-\d{2}T.*(?:Z|[+-]\d{2}:\d{2})$').hasMatch(value)) {
    throw FormatException(
      '$field must be an ISO 8601 datetime with a timezone',
    );
  }
  try {
    return DateTime.parse(value).toUtc();
  } on FormatException {
    throw FormatException(
      '$field must be an ISO 8601 datetime with a timezone',
    );
  }
}

CanonicalEventType _requiredEventType(Map<String, dynamic> json, String field) {
  final value = _requiredText(json[field], field);
  return CanonicalEventTypeWire.fromWire(value);
}

/// Deep-copies a JSON-compatible value into fully independent mutable maps/lists.
Object? deepCopyJson(Object? value) {
  if (value == null || value is bool || value is num || value is String) {
    return value;
  }
  if (value is List) {
    return value.map(deepCopyJson).toList(growable: true);
  }
  if (value is Map) {
    final result = <String, dynamic>{};
    for (final entry in value.entries) {
      final key = entry.key;
      if (key is! String) {
        throw const FormatException('JSON object keys must be strings');
      }
      result[key] = deepCopyJson(entry.value);
    }
    return result;
  }
  throw FormatException(
    'Unsupported JSON type: ${value.runtimeType}',
  );
}

/// Deep-freezes a JSON-compatible value into unmodifiable nested maps/lists.
Object? deepFreezeJson(Object? value) {
  if (value == null || value is bool || value is num || value is String) {
    return value;
  }
  if (value is List) {
    return List<Object?>.unmodifiable(value.map(deepFreezeJson));
  }
  if (value is Map) {
    final result = <String, dynamic>{};
    for (final entry in value.entries) {
      final key = entry.key;
      if (key is! String) {
        throw const FormatException('JSON object keys must be strings');
      }
      result[key] = deepFreezeJson(entry.value);
    }
    return Map<String, dynamic>.unmodifiable(result);
  }
  throw FormatException(
    'Unsupported JSON type: ${value.runtimeType}',
  );
}

Map<String, dynamic> _freezePayload(Map<String, dynamic> payload) {
  final frozen = deepFreezeJson(payload);
  if (frozen is! Map<String, dynamic>) {
    throw const FormatException('payload must be an object');
  }
  return frozen;
}

Map<String, dynamic> _requiredPayload(Map<String, dynamic> json) {
  final value = json['payload'];
  if (value is! Map) {
    throw const FormatException('payload must be an object');
  }
  return _freezePayload(Map<String, dynamic>.from(value));
}

void _validateFields(
  Map<String, dynamic> json,
  Set<String> allowed,
  List<String> required,
) {
  for (final field in required) {
    if (!json.containsKey(field)) {
      throw FormatException('$field is required');
    }
  }
  _validateVersion(_requiredText(json['contractVersion'], 'contractVersion'));
  for (final field in json.keys) {
    if (!allowed.contains(field)) {
      throw FormatException('Unknown canonical event field: $field');
    }
  }
}

class CanonicalEventAppendRequest {
  const CanonicalEventAppendRequest._({
    required this.eventType,
    required this.sourceRecordId,
    required this.sourceRecordType,
    required this.userId,
    required this.userTrackId,
    required this.lessonId,
    required this.requestedAt,
    required this.idempotencyKey,
    required this.contractVersion,
    required this.payload,
  });

  factory CanonicalEventAppendRequest.create({
    required CanonicalEventType eventType,
    required String sourceRecordId,
    required String sourceRecordType,
    required String userId,
    required String userTrackId,
    required String lessonId,
    required DateTime requestedAt,
    required String idempotencyKey,
    Map<String, dynamic> payload = const {},
    String contractVersion = canonicalEventContractVersion,
  }) {
    final request = CanonicalEventAppendRequest._(
      eventType: eventType,
      sourceRecordId: sourceRecordId,
      sourceRecordType: sourceRecordType,
      userId: userId,
      userTrackId: userTrackId,
      lessonId: lessonId,
      requestedAt: requestedAt.toUtc(),
      idempotencyKey: idempotencyKey,
      contractVersion: contractVersion,
      payload: _freezePayload(payload),
    );
    request.validate();
    return request;
  }

  final CanonicalEventType eventType;
  final String sourceRecordId;
  final String sourceRecordType;
  final String userId;
  final String userTrackId;
  final String lessonId;
  final String idempotencyKey;
  final String contractVersion;
  final DateTime requestedAt;
  final Map<String, dynamic> payload;

  void validate() {
    _requiredText(sourceRecordId, 'sourceRecordId');
    _requiredText(sourceRecordType, 'sourceRecordType');
    _validateSourceRecordType(sourceRecordType);
    _requiredText(userId, 'userId');
    _requiredText(userTrackId, 'userTrackId');
    _requiredText(lessonId, 'lessonId');
    _requiredText(idempotencyKey, 'idempotencyKey');
    _validateVersion(contractVersion);
  }

  Map<String, dynamic> toJson() => {
    'eventType': eventType.wire,
    'sourceRecordId': sourceRecordId,
    'sourceRecordType': sourceRecordType,
    'userId': userId,
    'userTrackId': userTrackId,
    'lessonId': lessonId,
    'requestedAt': requestedAt.toUtc().toIso8601String(),
    'idempotencyKey': idempotencyKey,
    'contractVersion': contractVersion,
    'payload': deepCopyJson(payload) as Map<String, dynamic>,
  };

  factory CanonicalEventAppendRequest.fromJson(Map<String, dynamic> json) {
    _validateFields(
      json,
      {
        'eventType',
        'sourceRecordId',
        'sourceRecordType',
        'userId',
        'userTrackId',
        'lessonId',
        'requestedAt',
        'idempotencyKey',
        'contractVersion',
        'payload',
      },
      [
        'eventType',
        'sourceRecordId',
        'sourceRecordType',
        'userId',
        'userTrackId',
        'lessonId',
        'idempotencyKey',
        'payload',
      ],
    );
    return CanonicalEventAppendRequest.create(
      eventType: _requiredEventType(json, 'eventType'),
      sourceRecordId: json['sourceRecordId'] as String,
      sourceRecordType: json['sourceRecordType'] as String,
      userId: json['userId'] as String,
      userTrackId: json['userTrackId'] as String,
      lessonId: json['lessonId'] as String,
      requestedAt: _requiredTime(json, 'requestedAt'),
      idempotencyKey: json['idempotencyKey'] as String,
      payload: _requiredPayload(json),
      contractVersion: json['contractVersion'] as String,
    );
  }
}

class CanonicalEvent {
  const CanonicalEvent._({
    required this.eventId,
    required this.eventType,
    required this.sourceRecordId,
    required this.sourceRecordType,
    required this.userId,
    required this.userTrackId,
    required this.lessonId,
    required this.occurredAt,
    required this.idempotencyKey,
    required this.contractVersion,
    required this.payload,
  });

  factory CanonicalEvent.create({
    required String eventId,
    required CanonicalEventType eventType,
    required String sourceRecordId,
    required String sourceRecordType,
    required String userId,
    required String userTrackId,
    required String lessonId,
    required DateTime occurredAt,
    required String idempotencyKey,
    Map<String, dynamic> payload = const {},
    String contractVersion = canonicalEventContractVersion,
  }) {
    final event = CanonicalEvent._(
      eventId: eventId,
      eventType: eventType,
      sourceRecordId: sourceRecordId,
      sourceRecordType: sourceRecordType,
      userId: userId,
      userTrackId: userTrackId,
      lessonId: lessonId,
      occurredAt: occurredAt.toUtc(),
      idempotencyKey: idempotencyKey,
      contractVersion: contractVersion,
      payload: _freezePayload(payload),
    );
    event.validate();
    return event;
  }

  final String eventId;
  final CanonicalEventType eventType;
  final String sourceRecordId;
  final String sourceRecordType;
  final String userId;
  final String userTrackId;
  final String lessonId;
  final String idempotencyKey;
  final String contractVersion;
  final DateTime occurredAt;
  final Map<String, dynamic> payload;

  void validate() {
    _requiredText(eventId, 'eventId');
    _requiredText(sourceRecordId, 'sourceRecordId');
    _requiredText(sourceRecordType, 'sourceRecordType');
    _validateSourceRecordType(sourceRecordType);
    _requiredText(userId, 'userId');
    _requiredText(userTrackId, 'userTrackId');
    _requiredText(lessonId, 'lessonId');
    _requiredText(idempotencyKey, 'idempotencyKey');
    _validateVersion(contractVersion);
  }

  Map<String, dynamic> toJson() => {
    'eventId': eventId,
    'eventType': eventType.wire,
    'sourceRecordId': sourceRecordId,
    'sourceRecordType': sourceRecordType,
    'userId': userId,
    'userTrackId': userTrackId,
    'lessonId': lessonId,
    'occurredAt': occurredAt.toUtc().toIso8601String(),
    'idempotencyKey': idempotencyKey,
    'contractVersion': contractVersion,
    'payload': deepCopyJson(payload) as Map<String, dynamic>,
  };

  factory CanonicalEvent.fromJson(Map<String, dynamic> json) {
    _validateFields(
      json,
      {
        'eventId',
        'eventType',
        'sourceRecordId',
        'sourceRecordType',
        'userId',
        'userTrackId',
        'lessonId',
        'occurredAt',
        'idempotencyKey',
        'contractVersion',
        'payload',
      },
      [
        'eventId',
        'eventType',
        'sourceRecordId',
        'sourceRecordType',
        'userId',
        'userTrackId',
        'lessonId',
        'idempotencyKey',
        'payload',
      ],
    );
    return CanonicalEvent.create(
      eventId: json['eventId'] as String,
      eventType: _requiredEventType(json, 'eventType'),
      sourceRecordId: json['sourceRecordId'] as String,
      sourceRecordType: json['sourceRecordType'] as String,
      userId: json['userId'] as String,
      userTrackId: json['userTrackId'] as String,
      lessonId: json['lessonId'] as String,
      occurredAt: _requiredTime(json, 'occurredAt'),
      idempotencyKey: json['idempotencyKey'] as String,
      payload: _requiredPayload(json),
      contractVersion: json['contractVersion'] as String,
    );
  }
}

class CanonicalEventAppendResult {
  const CanonicalEventAppendResult._({
    required this.status,
    required this.event,
    required this.existingEventId,
    required this.contractVersion,
  });

  factory CanonicalEventAppendResult.appended(
    CanonicalEvent event, {
    String contractVersion = canonicalEventContractVersion,
  }) {
    event.validate();
    _validateVersion(contractVersion);
    return CanonicalEventAppendResult._(
      status: CanonicalEventAppendStatus.appended,
      event: event,
      existingEventId: null,
      contractVersion: contractVersion,
    );
  }

  factory CanonicalEventAppendResult.alreadyAppended(
    String existingEventId, {
    String contractVersion = canonicalEventContractVersion,
  }) {
    _requiredText(existingEventId, 'existingEventId');
    _validateVersion(contractVersion);
    return CanonicalEventAppendResult._(
      status: CanonicalEventAppendStatus.alreadyAppended,
      event: null,
      existingEventId: existingEventId,
      contractVersion: contractVersion,
    );
  }

  final CanonicalEventAppendStatus status;
  final CanonicalEvent? event;
  final String? existingEventId;
  final String contractVersion;

  Map<String, dynamic> toJson() => {
    'status': status.wire,
    if (event != null) 'event': event!.toJson(),
    if (existingEventId != null) 'existingEventId': existingEventId,
    'contractVersion': contractVersion,
  };

  factory CanonicalEventAppendResult.fromJson(Map<String, dynamic> json) {
    _validateFields(
      json,
      {'status', 'event', 'existingEventId', 'contractVersion'},
      ['status'],
    );
    final status = CanonicalEventAppendStatusWire.fromWire(
      json['status'] as String,
    );
    final event = json['event'] is Map
        ? CanonicalEvent.fromJson(Map<String, dynamic>.from(json['event'] as Map))
        : null;
    final existing = json['existingEventId'];
    return switch (status) {
      CanonicalEventAppendStatus.appended when event != null && existing == null =>
        CanonicalEventAppendResult.appended(event),
      CanonicalEventAppendStatus.alreadyAppended
          when event == null && existing is String =>
        CanonicalEventAppendResult.alreadyAppended(existing),
      _ => throw FormatException(
        'Invalid fields for canonical event append status ${status.wire}',
      ),
    };
  }
}

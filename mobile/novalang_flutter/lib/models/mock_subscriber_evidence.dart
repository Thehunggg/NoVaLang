const mockSubscriberEvidenceContractVersion = '1.0';

String _requiredText(Object? value, String field) {
  if (value is! String || value.trim().isEmpty) {
    throw FormatException('$field must be a non-empty string');
  }
  return value;
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

/// Provisional evidence that a mock Core 5 or Core 6 subscriber received a
/// canonical event. This is a Stage 1 integration-contract placeholder and
/// must never become the source of truth for real mastery, review, XP, or
/// reward behavior.
class MockSubscriberEvidence {
  const MockSubscriberEvidence({
    required this.evidenceId,
    required this.subscriberType,
    required this.eventId,
    required this.sourceRecordId,
    required this.userId,
    required this.userTrackId,
    required this.lessonId,
    required this.receivedAt,
    this.contractVersion = mockSubscriberEvidenceContractVersion,
  });

  final String evidenceId;
  final String subscriberType;
  final String eventId;
  final String sourceRecordId;
  final String userId;
  final String userTrackId;
  final String lessonId;
  final DateTime receivedAt;
  final String contractVersion;

  void validate() {
    _requiredText(evidenceId, 'evidenceId');
    _requiredText(subscriberType, 'subscriberType');
    _requiredText(eventId, 'eventId');
    _requiredText(sourceRecordId, 'sourceRecordId');
    _requiredText(userId, 'userId');
    _requiredText(userTrackId, 'userTrackId');
    _requiredText(lessonId, 'lessonId');
    if (contractVersion != mockSubscriberEvidenceContractVersion) {
      throw FormatException(
        'contractVersion must equal $mockSubscriberEvidenceContractVersion',
      );
    }
  }

  Map<String, dynamic> toJson() => {
    'evidenceId': evidenceId,
    'subscriberType': subscriberType,
    'eventId': eventId,
    'sourceRecordId': sourceRecordId,
    'userId': userId,
    'userTrackId': userTrackId,
    'lessonId': lessonId,
    'receivedAt': receivedAt.toUtc().toIso8601String(),
    'contractVersion': contractVersion,
  };

  factory MockSubscriberEvidence.fromJson(Map<String, dynamic> json) {
    const allowed = {
      'evidenceId',
      'subscriberType',
      'eventId',
      'sourceRecordId',
      'userId',
      'userTrackId',
      'lessonId',
      'receivedAt',
      'contractVersion',
    };
    for (final field in json.keys) {
      if (!allowed.contains(field)) {
        throw FormatException('Unknown mock subscriber evidence field: $field');
      }
    }
    final evidence = MockSubscriberEvidence(
      evidenceId: _requiredText(json['evidenceId'], 'evidenceId'),
      subscriberType: _requiredText(json['subscriberType'], 'subscriberType'),
      eventId: _requiredText(json['eventId'], 'eventId'),
      sourceRecordId: _requiredText(json['sourceRecordId'], 'sourceRecordId'),
      userId: _requiredText(json['userId'], 'userId'),
      userTrackId: _requiredText(json['userTrackId'], 'userTrackId'),
      lessonId: _requiredText(json['lessonId'], 'lessonId'),
      receivedAt: _requiredTime(json, 'receivedAt'),
      contractVersion: _requiredText(json['contractVersion'], 'contractVersion'),
    );
    evidence.validate();
    return evidence;
  }
}

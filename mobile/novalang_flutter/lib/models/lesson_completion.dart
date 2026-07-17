enum LessonCompletionStatus {
  recorded,
  alreadyCompleted,
  invalidAttempt,
  notEligible,
}

extension LessonCompletionStatusWire on LessonCompletionStatus {
  String get wire => switch (this) {
    LessonCompletionStatus.recorded => 'recorded',
    LessonCompletionStatus.alreadyCompleted => 'already_completed',
    LessonCompletionStatus.invalidAttempt => 'invalid_attempt',
    LessonCompletionStatus.notEligible => 'not_eligible',
  };

  static LessonCompletionStatus fromWire(String value) => switch (value) {
    'recorded' => LessonCompletionStatus.recorded,
    'already_completed' => LessonCompletionStatus.alreadyCompleted,
    'invalid_attempt' => LessonCompletionStatus.invalidAttempt,
    'not_eligible' => LessonCompletionStatus.notEligible,
    _ => throw FormatException('Unknown lesson completion status: $value'),
  };
}

const lessonCompletionContractVersion = '1.0';

String _requiredText(Object? value, String field) {
  if (value is! String || value.trim().isEmpty) {
    throw FormatException('$field must be a non-empty string');
  }
  return value;
}

void _validateVersion(String version) {
  if (version != lessonCompletionContractVersion) {
    throw FormatException(
      'contractVersion must equal $lessonCompletionContractVersion',
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

void _validateFields(
  Map<String, dynamic> json,
  Set<String> allowed,
  List<String> required,
) {
  for (final field in required) {
    _requiredText(json[field], field);
  }
  _validateVersion(_requiredText(json['contractVersion'], 'contractVersion'));
  for (final field in json.keys) {
    if (!allowed.contains(field)) {
      throw FormatException('Unknown lesson completion field: $field');
    }
  }
}

class LessonCompletionRequest {
  const LessonCompletionRequest._({
    required this.attemptId,
    required this.userId,
    required this.userTrackId,
    required this.lessonId,
    required this.requestedAt,
    required this.idempotencyKey,
    required this.contractVersion,
  });

  factory LessonCompletionRequest.create({
    required String attemptId,
    required String userId,
    required String userTrackId,
    required String lessonId,
    required DateTime requestedAt,
    required String idempotencyKey,
    String contractVersion = lessonCompletionContractVersion,
  }) {
    final request = LessonCompletionRequest._(
      attemptId: attemptId,
      userId: userId,
      userTrackId: userTrackId,
      lessonId: lessonId,
      requestedAt: requestedAt.toUtc(),
      idempotencyKey: idempotencyKey,
      contractVersion: contractVersion,
    );
    request.validate();
    return request;
  }

  final String attemptId;
  final String userId;
  final String userTrackId;
  final String lessonId;
  final String idempotencyKey;
  final String contractVersion;
  final DateTime requestedAt;

  void validate() {
    _requiredText(attemptId, 'attemptId');
    _requiredText(userId, 'userId');
    _requiredText(userTrackId, 'userTrackId');
    _requiredText(lessonId, 'lessonId');
    _requiredText(idempotencyKey, 'idempotencyKey');
    _validateVersion(contractVersion);
  }

  Map<String, dynamic> toJson() => {
    'attemptId': attemptId,
    'userId': userId,
    'userTrackId': userTrackId,
    'lessonId': lessonId,
    'requestedAt': requestedAt.toUtc().toIso8601String(),
    'idempotencyKey': idempotencyKey,
    'contractVersion': contractVersion,
  };

  factory LessonCompletionRequest.fromJson(Map<String, dynamic> json) {
    _validateFields(
      json,
      {
        'attemptId',
        'userId',
        'userTrackId',
        'lessonId',
        'requestedAt',
        'idempotencyKey',
        'contractVersion',
      },
      ['attemptId', 'userId', 'userTrackId', 'lessonId', 'idempotencyKey'],
    );
    return LessonCompletionRequest.create(
      attemptId: json['attemptId'] as String,
      userId: json['userId'] as String,
      userTrackId: json['userTrackId'] as String,
      lessonId: json['lessonId'] as String,
      requestedAt: _requiredTime(json, 'requestedAt'),
      idempotencyKey: json['idempotencyKey'] as String,
      contractVersion: json['contractVersion'] as String,
    );
  }
}

class LessonCompletionRecord {
  const LessonCompletionRecord._({
    required this.completionId,
    required this.attemptId,
    required this.userId,
    required this.userTrackId,
    required this.lessonId,
    required this.completedAt,
    required this.idempotencyKey,
    required this.contractVersion,
  });

  factory LessonCompletionRecord.create({
    required String completionId,
    required String attemptId,
    required String userId,
    required String userTrackId,
    required String lessonId,
    required DateTime completedAt,
    required String idempotencyKey,
    String contractVersion = lessonCompletionContractVersion,
  }) {
    final record = LessonCompletionRecord._(
      completionId: completionId,
      attemptId: attemptId,
      userId: userId,
      userTrackId: userTrackId,
      lessonId: lessonId,
      completedAt: completedAt.toUtc(),
      idempotencyKey: idempotencyKey,
      contractVersion: contractVersion,
    );
    record.validate();
    return record;
  }

  final String completionId;
  final String attemptId;
  final String userId;
  final String userTrackId;
  final String lessonId;
  final String idempotencyKey;
  final String contractVersion;
  final DateTime completedAt;

  void validate() {
    _requiredText(completionId, 'completionId');
    _requiredText(attemptId, 'attemptId');
    _requiredText(userId, 'userId');
    _requiredText(userTrackId, 'userTrackId');
    _requiredText(lessonId, 'lessonId');
    _requiredText(idempotencyKey, 'idempotencyKey');
    _validateVersion(contractVersion);
  }

  Map<String, dynamic> toJson() => {
    'completionId': completionId,
    'attemptId': attemptId,
    'userId': userId,
    'userTrackId': userTrackId,
    'lessonId': lessonId,
    'completedAt': completedAt.toUtc().toIso8601String(),
    'idempotencyKey': idempotencyKey,
    'contractVersion': contractVersion,
  };

  factory LessonCompletionRecord.fromJson(Map<String, dynamic> json) {
    _validateFields(
      json,
      {
        'completionId',
        'attemptId',
        'userId',
        'userTrackId',
        'lessonId',
        'completedAt',
        'idempotencyKey',
        'contractVersion',
      },
      [
        'completionId',
        'attemptId',
        'userId',
        'userTrackId',
        'lessonId',
        'idempotencyKey',
      ],
    );
    return LessonCompletionRecord.create(
      completionId: json['completionId'] as String,
      attemptId: json['attemptId'] as String,
      userId: json['userId'] as String,
      userTrackId: json['userTrackId'] as String,
      lessonId: json['lessonId'] as String,
      completedAt: _requiredTime(json, 'completedAt'),
      idempotencyKey: json['idempotencyKey'] as String,
      contractVersion: json['contractVersion'] as String,
    );
  }
}

class LessonCompletionResult {
  const LessonCompletionResult._({
    required this.status,
    required this.record,
    required this.existingCompletionId,
    required this.contractVersion,
  });

  factory LessonCompletionResult.recorded(
    LessonCompletionRecord record, {
    String contractVersion = lessonCompletionContractVersion,
  }) {
    record.validate();
    _validateVersion(contractVersion);
    return LessonCompletionResult._(
      status: LessonCompletionStatus.recorded,
      record: record,
      existingCompletionId: null,
      contractVersion: contractVersion,
    );
  }

  factory LessonCompletionResult.alreadyCompleted(
    String existingCompletionId, {
    String contractVersion = lessonCompletionContractVersion,
  }) {
    _requiredText(existingCompletionId, 'existingCompletionId');
    _validateVersion(contractVersion);
    return LessonCompletionResult._(
      status: LessonCompletionStatus.alreadyCompleted,
      record: null,
      existingCompletionId: existingCompletionId,
      contractVersion: contractVersion,
    );
  }

  factory LessonCompletionResult.invalidAttempt({
    String contractVersion = lessonCompletionContractVersion,
  }) {
    _validateVersion(contractVersion);
    return LessonCompletionResult._(
      status: LessonCompletionStatus.invalidAttempt,
      record: null,
      existingCompletionId: null,
      contractVersion: contractVersion,
    );
  }

  factory LessonCompletionResult.notEligible({
    String contractVersion = lessonCompletionContractVersion,
  }) {
    _validateVersion(contractVersion);
    return LessonCompletionResult._(
      status: LessonCompletionStatus.notEligible,
      record: null,
      existingCompletionId: null,
      contractVersion: contractVersion,
    );
  }

  final LessonCompletionStatus status;
  final LessonCompletionRecord? record;
  final String? existingCompletionId;
  final String contractVersion;

  Map<String, dynamic> toJson() => {
    'status': status.wire,
    if (record != null) 'record': record!.toJson(),
    if (existingCompletionId != null)
      'existingCompletionId': existingCompletionId,
    'contractVersion': contractVersion,
  };

  factory LessonCompletionResult.fromJson(Map<String, dynamic> json) {
    _validateFields(
      json,
      {'status', 'record', 'existingCompletionId', 'contractVersion'},
      ['status'],
    );
    final status = LessonCompletionStatusWire.fromWire(
      json['status'] as String,
    );
    final record = json['record'] is Map
        ? LessonCompletionRecord.fromJson(
            Map<String, dynamic>.from(json['record'] as Map),
          )
        : null;
    final existing = json['existingCompletionId'];
    return switch (status) {
      LessonCompletionStatus.recorded when record != null && existing == null =>
        LessonCompletionResult.recorded(record),
      LessonCompletionStatus.alreadyCompleted
          when record == null && existing is String =>
        LessonCompletionResult.alreadyCompleted(existing),
      LessonCompletionStatus.invalidAttempt
          when record == null && existing == null =>
        LessonCompletionResult.invalidAttempt(),
      LessonCompletionStatus.notEligible
          when record == null && existing == null =>
        LessonCompletionResult.notEligible(),
      _ => throw FormatException(
        'Invalid fields for lesson completion status ${status.wire}',
      ),
    };
  }
}

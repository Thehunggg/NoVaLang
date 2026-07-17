const curriculumProgressContractVersion = '1.0';

String _requiredText(Object? value, String field) {
  if (value is! String || value.trim().isEmpty) {
    throw FormatException('$field must be a non-empty string');
  }
  return value;
}

bool _requiredBool(Map<String, dynamic> json, String field) {
  if (!json.containsKey(field)) {
    throw FormatException('$field is required');
  }
  final value = json[field];
  if (value is! bool) {
    throw FormatException('$field must be a boolean');
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

/// Core 1's projection of whether a user has first-completed a lesson.
///
/// This is a read model derived from `lesson_completion_recorded` canonical
/// events. It never updates usage, mastery, or XP, and it never mutates the
/// Core 2 `LessonCompletionRecord` that sourced it.
class CurriculumProgressProjection {
  const CurriculumProgressProjection({
    required this.userId,
    required this.userTrackId,
    required this.lessonId,
    required this.isCompleted,
    required this.firstCompletedAt,
    required this.sourceCompletionId,
    required this.lastProcessedEventId,
    this.contractVersion = curriculumProgressContractVersion,
  });

  final String userId;
  final String userTrackId;
  final String lessonId;
  final bool isCompleted;
  final DateTime firstCompletedAt;
  final String sourceCompletionId;
  final String lastProcessedEventId;
  final String contractVersion;

  void validate() {
    _requiredText(userId, 'userId');
    _requiredText(userTrackId, 'userTrackId');
    _requiredText(lessonId, 'lessonId');
    _requiredText(sourceCompletionId, 'sourceCompletionId');
    _requiredText(lastProcessedEventId, 'lastProcessedEventId');
    if (contractVersion != curriculumProgressContractVersion) {
      throw FormatException(
        'contractVersion must equal $curriculumProgressContractVersion',
      );
    }
  }

  Map<String, dynamic> toJson() => {
    'userId': userId,
    'userTrackId': userTrackId,
    'lessonId': lessonId,
    'isCompleted': isCompleted,
    'firstCompletedAt': firstCompletedAt.toUtc().toIso8601String(),
    'sourceCompletionId': sourceCompletionId,
    'lastProcessedEventId': lastProcessedEventId,
    'contractVersion': contractVersion,
  };

  factory CurriculumProgressProjection.fromJson(Map<String, dynamic> json) {
    const allowed = {
      'userId',
      'userTrackId',
      'lessonId',
      'isCompleted',
      'firstCompletedAt',
      'sourceCompletionId',
      'lastProcessedEventId',
      'contractVersion',
    };
    const required = {
      'userId',
      'userTrackId',
      'lessonId',
      'isCompleted',
      'firstCompletedAt',
      'sourceCompletionId',
      'lastProcessedEventId',
      'contractVersion',
    };
    for (final field in required) {
      if (!json.containsKey(field)) {
        throw FormatException('$field is required');
      }
    }
    for (final field in json.keys) {
      if (!allowed.contains(field)) {
        throw FormatException('Unknown curriculum progress field: $field');
      }
    }
    final projection = CurriculumProgressProjection(
      userId: _requiredText(json['userId'], 'userId'),
      userTrackId: _requiredText(json['userTrackId'], 'userTrackId'),
      lessonId: _requiredText(json['lessonId'], 'lessonId'),
      isCompleted: _requiredBool(json, 'isCompleted'),
      firstCompletedAt: _requiredTime(json, 'firstCompletedAt'),
      sourceCompletionId: _requiredText(
        json['sourceCompletionId'],
        'sourceCompletionId',
      ),
      lastProcessedEventId: _requiredText(
        json['lastProcessedEventId'],
        'lastProcessedEventId',
      ),
      contractVersion: _requiredText(
        json['contractVersion'],
        'contractVersion',
      ),
    );
    projection.validate();
    return projection;
  }
}

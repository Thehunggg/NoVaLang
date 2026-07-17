enum UsageType { newLessonCompletion }

extension UsageTypeWire on UsageType {
  String get wire => switch (this) {
    UsageType.newLessonCompletion => 'new_lesson_completion',
  };

  static UsageType fromWire(String value) => switch (value) {
    'new_lesson_completion' => UsageType.newLessonCompletion,
    _ => throw FormatException('Unknown usage type: $value'),
  };
}

enum UsageCommitStatus { committed, alreadyCommitted }

extension UsageCommitStatusWire on UsageCommitStatus {
  String get wire => switch (this) {
    UsageCommitStatus.committed => 'committed',
    UsageCommitStatus.alreadyCommitted => 'already_committed',
  };

  static UsageCommitStatus fromWire(String value) => switch (value) {
    'committed' => UsageCommitStatus.committed,
    'already_committed' => UsageCommitStatus.alreadyCommitted,
    _ => throw FormatException('Unknown usage commit status: $value'),
  };
}

const usageLedgerContractVersion = '1.0';
const usageQuantityStage1 = 1;

String _requiredText(Object? value, String field) {
  if (value is! String || value.trim().isEmpty) {
    throw FormatException('$field must be a non-empty string');
  }
  return value;
}

void _validateVersion(String version) {
  if (version != usageLedgerContractVersion) {
    throw FormatException(
      'contractVersion must equal $usageLedgerContractVersion',
    );
  }
}

void _validateQuantity(int quantity) {
  if (quantity != usageQuantityStage1) {
    throw const FormatException('quantity must equal 1');
  }
}

final _usageDatePattern = RegExp(r'^\d{4}-\d{2}-\d{2}$');

String _requiredUsageDate(Map<String, dynamic> json, String field) {
  final value = _requiredText(json[field], field);
  if (!_usageDatePattern.hasMatch(value)) {
    throw FormatException('$field must be YYYY-MM-DD');
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

UsageType _requiredUsageType(Map<String, dynamic> json, String field) {
  final value = _requiredText(json[field], field);
  return UsageTypeWire.fromWire(value);
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
      throw FormatException('Unknown usage ledger field: $field');
    }
  }
}

class UsageCommitRequest {
  const UsageCommitRequest._({
    required this.userId,
    required this.userTrackId,
    required this.usageType,
    required this.quantity,
    required this.sourceEventId,
    required this.sourceRecordId,
    required this.requestedAt,
    required this.idempotencyKey,
    required this.contractVersion,
  });

  factory UsageCommitRequest.create({
    required String userId,
    required String userTrackId,
    required UsageType usageType,
    required int quantity,
    required String sourceEventId,
    required String sourceRecordId,
    required DateTime requestedAt,
    required String idempotencyKey,
    String contractVersion = usageLedgerContractVersion,
  }) {
    final request = UsageCommitRequest._(
      userId: userId,
      userTrackId: userTrackId,
      usageType: usageType,
      quantity: quantity,
      sourceEventId: sourceEventId,
      sourceRecordId: sourceRecordId,
      requestedAt: requestedAt.toUtc(),
      idempotencyKey: idempotencyKey,
      contractVersion: contractVersion,
    );
    request.validate();
    return request;
  }

  final String userId;
  final String userTrackId;
  final UsageType usageType;
  final int quantity;
  final String sourceEventId;
  final String sourceRecordId;
  final String idempotencyKey;
  final String contractVersion;
  final DateTime requestedAt;

  void validate() {
    _requiredText(userId, 'userId');
    _requiredText(userTrackId, 'userTrackId');
    _requiredText(sourceEventId, 'sourceEventId');
    _requiredText(sourceRecordId, 'sourceRecordId');
    _requiredText(idempotencyKey, 'idempotencyKey');
    _validateQuantity(quantity);
    _validateVersion(contractVersion);
  }

  Map<String, dynamic> toJson() => {
    'userId': userId,
    'userTrackId': userTrackId,
    'usageType': usageType.wire,
    'quantity': quantity,
    'sourceEventId': sourceEventId,
    'sourceRecordId': sourceRecordId,
    'requestedAt': requestedAt.toUtc().toIso8601String(),
    'idempotencyKey': idempotencyKey,
    'contractVersion': contractVersion,
  };

  factory UsageCommitRequest.fromJson(Map<String, dynamic> json) {
    _validateFields(
      json,
      {
        'userId',
        'userTrackId',
        'usageType',
        'quantity',
        'sourceEventId',
        'sourceRecordId',
        'requestedAt',
        'idempotencyKey',
        'contractVersion',
      },
      [
        'userId',
        'userTrackId',
        'usageType',
        'quantity',
        'sourceEventId',
        'sourceRecordId',
        'idempotencyKey',
      ],
    );
    final quantity = json['quantity'];
    if (quantity is! int) {
      throw const FormatException('quantity must equal 1');
    }
    return UsageCommitRequest.create(
      userId: json['userId'] as String,
      userTrackId: json['userTrackId'] as String,
      usageType: _requiredUsageType(json, 'usageType'),
      quantity: quantity,
      sourceEventId: json['sourceEventId'] as String,
      sourceRecordId: json['sourceRecordId'] as String,
      requestedAt: _requiredTime(json, 'requestedAt'),
      idempotencyKey: json['idempotencyKey'] as String,
      contractVersion: json['contractVersion'] as String,
    );
  }
}

class UsageLedgerEntry {
  const UsageLedgerEntry._({
    required this.usageEntryId,
    required this.userId,
    required this.userTrackId,
    required this.usageDate,
    required this.usageType,
    required this.quantity,
    required this.sourceEventId,
    required this.sourceRecordId,
    required this.recordedAt,
    required this.idempotencyKey,
    required this.contractVersion,
  });

  factory UsageLedgerEntry.create({
    required String usageEntryId,
    required String userId,
    required String userTrackId,
    required String usageDate,
    required UsageType usageType,
    required int quantity,
    required String sourceEventId,
    required String sourceRecordId,
    required DateTime recordedAt,
    required String idempotencyKey,
    String contractVersion = usageLedgerContractVersion,
  }) {
    final entry = UsageLedgerEntry._(
      usageEntryId: usageEntryId,
      userId: userId,
      userTrackId: userTrackId,
      usageDate: usageDate,
      usageType: usageType,
      quantity: quantity,
      sourceEventId: sourceEventId,
      sourceRecordId: sourceRecordId,
      recordedAt: recordedAt.toUtc(),
      idempotencyKey: idempotencyKey,
      contractVersion: contractVersion,
    );
    entry.validate();
    return entry;
  }

  final String usageEntryId;
  final String userId;
  final String userTrackId;
  final String usageDate;
  final UsageType usageType;
  final int quantity;
  final String sourceEventId;
  final String sourceRecordId;
  final String idempotencyKey;
  final String contractVersion;
  final DateTime recordedAt;

  void validate() {
    _requiredText(usageEntryId, 'usageEntryId');
    _requiredText(userId, 'userId');
    _requiredText(userTrackId, 'userTrackId');
    if (!_usageDatePattern.hasMatch(usageDate)) {
      throw const FormatException('usageDate must be YYYY-MM-DD');
    }
    _requiredText(sourceEventId, 'sourceEventId');
    _requiredText(sourceRecordId, 'sourceRecordId');
    _requiredText(idempotencyKey, 'idempotencyKey');
    _validateQuantity(quantity);
    _validateVersion(contractVersion);
  }

  Map<String, dynamic> toJson() => {
    'usageEntryId': usageEntryId,
    'userId': userId,
    'userTrackId': userTrackId,
    'usageDate': usageDate,
    'usageType': usageType.wire,
    'quantity': quantity,
    'sourceEventId': sourceEventId,
    'sourceRecordId': sourceRecordId,
    'recordedAt': recordedAt.toUtc().toIso8601String(),
    'idempotencyKey': idempotencyKey,
    'contractVersion': contractVersion,
  };

  factory UsageLedgerEntry.fromJson(Map<String, dynamic> json) {
    _validateFields(
      json,
      {
        'usageEntryId',
        'userId',
        'userTrackId',
        'usageDate',
        'usageType',
        'quantity',
        'sourceEventId',
        'sourceRecordId',
        'recordedAt',
        'idempotencyKey',
        'contractVersion',
      },
      [
        'usageEntryId',
        'userId',
        'userTrackId',
        'usageDate',
        'usageType',
        'quantity',
        'sourceEventId',
        'sourceRecordId',
        'idempotencyKey',
      ],
    );
    final quantity = json['quantity'];
    if (quantity is! int) {
      throw const FormatException('quantity must equal 1');
    }
    return UsageLedgerEntry.create(
      usageEntryId: json['usageEntryId'] as String,
      userId: json['userId'] as String,
      userTrackId: json['userTrackId'] as String,
      usageDate: _requiredUsageDate(json, 'usageDate'),
      usageType: _requiredUsageType(json, 'usageType'),
      quantity: quantity,
      sourceEventId: json['sourceEventId'] as String,
      sourceRecordId: json['sourceRecordId'] as String,
      recordedAt: _requiredTime(json, 'recordedAt'),
      idempotencyKey: json['idempotencyKey'] as String,
      contractVersion: json['contractVersion'] as String,
    );
  }
}

class UsageCommitResult {
  const UsageCommitResult._({
    required this.status,
    required this.entry,
    required this.existingUsageEntryId,
    required this.contractVersion,
  });

  factory UsageCommitResult.committed(
    UsageLedgerEntry entry, {
    String contractVersion = usageLedgerContractVersion,
  }) {
    entry.validate();
    _validateVersion(contractVersion);
    return UsageCommitResult._(
      status: UsageCommitStatus.committed,
      entry: entry,
      existingUsageEntryId: null,
      contractVersion: contractVersion,
    );
  }

  factory UsageCommitResult.alreadyCommitted(
    String existingUsageEntryId, {
    String contractVersion = usageLedgerContractVersion,
  }) {
    _requiredText(existingUsageEntryId, 'existingUsageEntryId');
    _validateVersion(contractVersion);
    return UsageCommitResult._(
      status: UsageCommitStatus.alreadyCommitted,
      entry: null,
      existingUsageEntryId: existingUsageEntryId,
      contractVersion: contractVersion,
    );
  }

  final UsageCommitStatus status;
  final UsageLedgerEntry? entry;
  final String? existingUsageEntryId;
  final String contractVersion;

  Map<String, dynamic> toJson() => {
    'status': status.wire,
    if (entry != null) 'entry': entry!.toJson(),
    if (existingUsageEntryId != null)
      'existingUsageEntryId': existingUsageEntryId,
    'contractVersion': contractVersion,
  };

  factory UsageCommitResult.fromJson(Map<String, dynamic> json) {
    _validateFields(
      json,
      {'status', 'entry', 'existingUsageEntryId', 'contractVersion'},
      ['status'],
    );
    final status = UsageCommitStatusWire.fromWire(json['status'] as String);
    final entry = json['entry'] is Map
        ? UsageLedgerEntry.fromJson(Map<String, dynamic>.from(json['entry'] as Map))
        : null;
    final existing = json['existingUsageEntryId'];
    return switch (status) {
      UsageCommitStatus.committed when entry != null && existing == null =>
        UsageCommitResult.committed(entry),
      UsageCommitStatus.alreadyCommitted
          when entry == null && existing is String =>
        UsageCommitResult.alreadyCommitted(existing),
      _ => throw FormatException(
        'Invalid fields for usage commit status ${status.wire}',
      ),
    };
  }
}

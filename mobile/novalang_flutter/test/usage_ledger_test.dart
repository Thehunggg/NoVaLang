import 'dart:convert';

import 'package:flutter_test/flutter_test.dart';
import 'package:novalang_flutter/models/usage_ledger.dart';
import 'package:novalang_flutter/repositories/usage_ledger_repository.dart';
import 'package:novalang_flutter/services/usage_ledger_service.dart';
import 'package:shared_preferences/shared_preferences.dart';

const _userId = 'user-1';
const _trackId = 'daily_life';

UsageCommitRequest request({
  String userId = _userId,
  String userTrackId = _trackId,
  UsageType usageType = UsageType.newLessonCompletion,
  int quantity = 1,
  String sourceEventId = 'event-1',
  String sourceRecordId = 'completion-1',
  String idempotencyKey = 'usage-key-1',
}) => UsageCommitRequest.create(
  userId: userId,
  userTrackId: userTrackId,
  usageType: usageType,
  quantity: quantity,
  sourceEventId: sourceEventId,
  sourceRecordId: sourceRecordId,
  requestedAt: DateTime.utc(2026, 7, 14, 10),
  idempotencyKey: idempotencyKey,
);

UsageLedgerEntry entry({
  String usageEntryId = 'usage-1',
  String userId = _userId,
  String userTrackId = _trackId,
  String usageDate = '2026-07-14',
  UsageType usageType = UsageType.newLessonCompletion,
  int quantity = 1,
  String sourceEventId = 'event-1',
  String sourceRecordId = 'completion-1',
  String idempotencyKey = 'usage-key-1',
}) => UsageLedgerEntry.create(
  usageEntryId: usageEntryId,
  userId: userId,
  userTrackId: userTrackId,
  usageDate: usageDate,
  usageType: usageType,
  quantity: quantity,
  sourceEventId: sourceEventId,
  sourceRecordId: sourceRecordId,
  recordedAt: DateTime.utc(2026, 7, 14, 10, 5),
  idempotencyKey: idempotencyKey,
);

class _Ids implements UsageEntryIdGenerator {
  _Ids([this.prefix = 'usage']);

  final String prefix;
  int index = 0;

  @override
  String nextId() => '$prefix-${++index}';
}

class _Clock implements UsageLedgerClock {
  _Clock([DateTime? value]) : value = value ?? DateTime.utc(2026, 7, 14, 10, 5);

  final DateTime value;

  @override
  DateTime now() => value;
}

LocalUsageLedgerService service({
  UsageLedgerRepository? ledger,
  UsageEntryIdGenerator? ids,
  UsageLedgerClock? clock,
}) => LocalUsageLedgerService(
  ledger: ledger ?? SharedPreferencesUsageLedgerRepository(),
  clock: clock ?? _Clock(),
  dateResolver: const UtcUsageDateResolver(),
  ids: ids ?? _Ids(),
);

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  setUp(() async {
    SharedPreferences.setMockInitialValues({});
  });

  group('contract models', () {
    test('model wire values round trip through contract JSON', () {
      final ledgerEntry = entry();

      expect(
        UsageCommitRequest.fromJson(request().toJson()).userTrackId,
        _trackId,
      );
      expect(
        UsageLedgerEntry.fromJson(ledgerEntry.toJson()).usageEntryId,
        'usage-1',
      );
      expect(
        UsageCommitResult.fromJson(
          UsageCommitResult.committed(ledgerEntry).toJson(),
        ).status,
        UsageCommitStatus.committed,
      );
      expect(UsageCommitStatus.alreadyCommitted.wire, 'already_committed');
      expect(UsageType.newLessonCompletion.wire, 'new_lesson_completion');
    });

    test('unknown contract field is rejected', () {
      expect(
        () => UsageCommitRequest.fromJson({
          ...request().toJson(),
          'unexpected': true,
        }),
        throwsFormatException,
      );
    });

    test('unsupported contract version is rejected', () {
      expect(
        () => UsageCommitRequest.create(
          userId: _userId,
          userTrackId: _trackId,
          usageType: UsageType.newLessonCompletion,
          quantity: 1,
          sourceEventId: 'event-1',
          sourceRecordId: 'completion-1',
          requestedAt: DateTime.utc(2026),
          idempotencyKey: 'key',
          contractVersion: '2.0',
        ),
        throwsFormatException,
      );
    });

    test('quantity other than 1 is rejected', () {
      expect(
        () => UsageCommitRequest.create(
          userId: _userId,
          userTrackId: _trackId,
          usageType: UsageType.newLessonCompletion,
          quantity: 2,
          sourceEventId: 'event-1',
          sourceRecordId: 'completion-1',
          requestedAt: DateTime.utc(2026),
          idempotencyKey: 'key',
        ),
        throwsFormatException,
      );
    });

    test('unknown usage type is rejected', () {
      expect(
        () => UsageCommitRequest.fromJson({
          ...request().toJson(),
          'usageType': 'review_practice',
        }),
        throwsFormatException,
      );
    });

    test('invalid usageDate format is rejected', () {
      expect(
        () => UsageLedgerEntry.fromJson({
          ...entry().toJson(),
          'usageDate': '2026/07/14',
        }),
        throwsFormatException,
      );
    });

    test('empty and whitespace identity fields are rejected', () {
      for (final value in ['', '  ']) {
        expect(
          () => UsageCommitRequest.create(
            userId: value,
            userTrackId: _trackId,
            usageType: UsageType.newLessonCompletion,
            quantity: 1,
            sourceEventId: 'event-1',
            sourceRecordId: 'completion-1',
            requestedAt: DateTime.utc(2026),
            idempotencyKey: 'key',
          ),
          throwsFormatException,
        );
      }
    });
  });

  group('usage ledger service', () {
    test('valid first commit records one entry', () async {
      final result = await service().commit(request());

      expect(result.status, UsageCommitStatus.committed);
      expect(result.entry?.usageDate, '2026-07-14');
      expect(result.entry?.sourceEventId, 'event-1');
      expect(result.entry?.sourceRecordId, 'completion-1');
    });

    test(
      'duplicate idempotency key returns the existing logical result',
      () async {
        final repository = SharedPreferencesUsageLedgerRepository();
        final first = await service(ledger: repository).commit(request());
        final second = await service(ledger: repository).commit(request());

        expect(second.status, UsageCommitStatus.committed);
        expect(second.entry?.usageEntryId, first.entry?.usageEntryId);
      },
    );

    test(
      'duplicate source event does not create a second entry even with a new idempotency key',
      () async {
        final repository = SharedPreferencesUsageLedgerRepository();
        final first = await service(ledger: repository).commit(request());
        final second = await service(ledger: repository).commit(
          request(idempotencyKey: 'usage-key-2'),
        );

        expect(second.status, UsageCommitStatus.alreadyCommitted);
        expect(second.existingUsageEntryId, first.entry?.usageEntryId);

        final raw = (await SharedPreferences.getInstance()).getString(
          SharedPreferencesUsageLedgerRepository.storageKey,
        );
        expect(jsonDecode(raw!) as List, hasLength(1));
      },
    );

    test(
      'idempotency key reused for a different identity conflicts',
      () async {
        final completionService = service();
        await completionService.commit(request());

        await expectLater(
          completionService.commit(
            request(sourceEventId: 'event-2', sourceRecordId: 'completion-2'),
          ),
          throwsA(isA<UsageIdempotencyConflictException>()),
        );
      },
    );

    test('user isolation: different user commits independently', () async {
      final repository = SharedPreferencesUsageLedgerRepository();
      await service(ledger: repository).commit(request());
      final second = await service(ledger: repository, ids: _Ids('other')).commit(
        request(
          userId: 'user-2',
          sourceEventId: 'event-2',
          sourceRecordId: 'completion-2',
          idempotencyKey: 'usage-key-2',
        ),
      );

      expect(second.status, UsageCommitStatus.committed);
      expect(
        await repository.countForDateAndType(
          userId: 'user-2',
          userTrackId: _trackId,
          usageDate: '2026-07-14',
          usageType: UsageType.newLessonCompletion,
        ),
        1,
      );
      expect(
        await repository.countForDateAndType(
          userId: _userId,
          userTrackId: _trackId,
          usageDate: '2026-07-14',
          usageType: UsageType.newLessonCompletion,
        ),
        1,
      );
    });

    test('track isolation: different track commits independently', () async {
      final repository = SharedPreferencesUsageLedgerRepository();
      await service(ledger: repository).commit(request());
      final second = await service(ledger: repository, ids: _Ids('other')).commit(
        request(
          userTrackId: 'business',
          sourceEventId: 'event-2',
          sourceRecordId: 'completion-2',
          idempotencyKey: 'usage-key-2',
        ),
      );

      expect(second.status, UsageCommitStatus.committed);
      final businessEntries = await repository.listForUserTrackDate(
        userId: _userId,
        userTrackId: 'business',
        usageDate: '2026-07-14',
      );
      final dailyLifeEntries = await repository.listForUserTrackDate(
        userId: _userId,
        userTrackId: _trackId,
        usageDate: '2026-07-14',
      );
      expect(businessEntries, hasLength(1));
      expect(dailyLifeEntries, hasLength(1));
      expect(businessEntries.single.userTrackId, 'business');
      expect(dailyLifeEntries.single.userTrackId, _trackId);
    });

    test('date isolation: different usageDate does not merge counts', () async {
      final repository = SharedPreferencesUsageLedgerRepository();
      await repository.save(entry());
      await repository.save(
        entry(
          usageEntryId: 'usage-2',
          usageDate: '2026-07-15',
          sourceEventId: 'event-2',
          idempotencyKey: 'usage-key-2',
        ),
      );

      expect(
        await repository.countForDateAndType(
          userId: _userId,
          userTrackId: _trackId,
          usageDate: '2026-07-14',
          usageType: UsageType.newLessonCompletion,
        ),
        1,
      );
      expect(
        await repository.countForDateAndType(
          userId: _userId,
          userTrackId: _trackId,
          usageDate: '2026-07-15',
          usageType: UsageType.newLessonCompletion,
        ),
        1,
      );
      expect(
        await repository.countForDateAndType(
          userId: _userId,
          userTrackId: _trackId,
          usageDate: '2026-07-16',
          usageType: UsageType.newLessonCompletion,
        ),
        0,
      );
    });

    test(
      'countForDateAndType filters by the requested usage type parameter',
      () async {
        final repository = SharedPreferencesUsageLedgerRepository();
        await repository.save(entry());

        expect(
          await repository.countForDateAndType(
            userId: _userId,
            userTrackId: _trackId,
            usageDate: '2026-07-14',
            usageType: UsageType.newLessonCompletion,
          ),
          1,
        );
      },
    );

    test(
      'two concurrent commits for different source events both persist',
      () async {
        final repositoryOne = SharedPreferencesUsageLedgerRepository();
        final repositoryTwo = SharedPreferencesUsageLedgerRepository();
        final serviceOne = service(ledger: repositoryOne, ids: _Ids('first'));
        final serviceTwo = service(ledger: repositoryTwo, ids: _Ids('second'));

        final results = await Future.wait([
          serviceOne.commit(request()),
          serviceTwo.commit(
            request(
              sourceEventId: 'event-2',
              sourceRecordId: 'completion-2',
              idempotencyKey: 'usage-key-2',
            ),
          ),
        ]);

        expect(
          results.map((result) => result.status),
          everyElement(UsageCommitStatus.committed),
        );
        final raw = (await SharedPreferences.getInstance()).getString(
          SharedPreferencesUsageLedgerRepository.storageKey,
        );
        expect(jsonDecode(raw!) as List, hasLength(2));
      },
    );

    test(
      'two concurrent commits for the same source event create exactly one entry',
      () async {
        final repositoryOne = SharedPreferencesUsageLedgerRepository();
        final repositoryTwo = SharedPreferencesUsageLedgerRepository();
        final serviceOne = service(ledger: repositoryOne, ids: _Ids('first'));
        final serviceTwo = service(ledger: repositoryTwo, ids: _Ids('second'));

        final results = await Future.wait([
          serviceOne.commit(request()),
          serviceTwo.commit(request(idempotencyKey: 'usage-key-2')),
        ]);

        final committed = results
            .where((result) => result.status == UsageCommitStatus.committed)
            .toList();
        final already = results
            .where(
              (result) => result.status == UsageCommitStatus.alreadyCommitted,
            )
            .toList();
        expect(committed, hasLength(1));
        expect(already, hasLength(1));
        expect(committed.single.entry!.usageEntryId, already.single.existingUsageEntryId);

        final raw = (await SharedPreferences.getInstance()).getString(
          SharedPreferencesUsageLedgerRepository.storageKey,
        );
        expect(jsonDecode(raw!) as List, hasLength(1));
      },
    );
  });

  group('usage ledger repository', () {
    test('entries persist after repository restart', () async {
      await SharedPreferencesUsageLedgerRepository().save(entry());

      final restored = await SharedPreferencesUsageLedgerRepository()
          .findByIdempotencyKey('usage-key-1');

      expect(restored?.toJson(), entry().toJson());
    });

    test('missing storage key is a valid empty repository', () async {
      final restored = await SharedPreferencesUsageLedgerRepository()
          .findByIdempotencyKey('missing');

      expect(restored, isNull);
    });

    test(
      'corrupted storage throws and does not overwrite the raw value',
      () async {
        const corrupted = '{not-valid-json';
        SharedPreferences.setMockInitialValues({
          SharedPreferencesUsageLedgerRepository.storageKey: corrupted,
        });
        final repository = SharedPreferencesUsageLedgerRepository();

        await expectLater(
          repository.findByIdempotencyKey('usage-key-1'),
          throwsA(isA<UsageLedgerStorageException>()),
        );
        await expectLater(
          repository.save(entry()),
          throwsA(isA<UsageLedgerStorageException>()),
        );
        expect(
          (await SharedPreferences.getInstance()).getString(
            SharedPreferencesUsageLedgerRepository.storageKey,
          ),
          corrupted,
        );
      },
    );

    test(
      'no destructive reset: entries from multiple days accumulate rather than being cleared',
      () async {
        final repository = SharedPreferencesUsageLedgerRepository();
        await repository.save(entry());
        await repository.save(
          entry(
            usageEntryId: 'usage-2',
            usageDate: '2026-07-15',
            sourceEventId: 'event-2',
            idempotencyKey: 'usage-key-2',
          ),
        );
        await repository.save(
          entry(
            usageEntryId: 'usage-3',
            usageDate: '2026-07-16',
            sourceEventId: 'event-3',
            idempotencyKey: 'usage-key-3',
          ),
        );

        final raw = (await SharedPreferences.getInstance()).getString(
          SharedPreferencesUsageLedgerRepository.storageKey,
        );
        expect(jsonDecode(raw!) as List, hasLength(3));
        expect(
          await repository.findByIdempotencyKey('usage-key-1'),
          isNotNull,
        );
      },
    );
  });
}
